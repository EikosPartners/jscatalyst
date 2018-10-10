<template>
  <div style="width:100%;height:110%; overflow-x: scroll!important;">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  import { ResizeObserver } from 'vue-resize';
  import * as d3 from 'd3';
  import $ from 'jquery';
  import * as topojson from 'topojson-client';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper'

  /** US Map D3 component
  * @module US Map
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} county - By passing County the map is split by counties; by passing State the map is split by states
  * @param {string} metric - title of the data for the chart
  * @param {Array} colorDomain - determines the threshhold points for where the graph changes color; should always be 5 values
  * @param {Array} legendDomain - determines the number of colored rectangles in the legend; should always be one step more than the colorDomains final value
  *
  * @example
  * usage on a page:
  * <us-map
  *   :dataModel="usMapCountyData"
  *   propID="container-usmap"
  * ></us-map>
  *
  */

  export default {
    name: 'D3USMap',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    computed: {
      ...themeHelper
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {string} id - the state or county id depending on the format
       * @property {string} value - the value for that id (passed in as a float percent)
       * @property {string} state - optional name of state if rendering the state map
       */
      dataModel: {
        type: Array,
        default: () => {return []}
      },
      propID: {
        type: String,
        default: 'container-usmap'
      },
      // By passing County the map is split by counties
      // By passing State the map is split by states
      format: {
        type: String,
        default: 'County'
      },
      // the title of the data for the chart
      metric: {
        type: String,
        default: 'Unemployment rate'
      },
      // the colorDomain determines the threshhold points for where the graph changes color
      // should always be 5 values
      colorDomain: {
        type: Array,
        default: () => ([2,4,6,8,10])
      },
      // the legendDomain is what determines the number of colored rectangles in the legend
      // should always be one step more than the colorDomains final value
      legendDomain: {
        type: Array,
        default: () => ([1,12])
      },
      title: {
        type: String
      }
    },
    mounted() {
      this.draw()
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    watch: {
      theme: function(data) {
        this.draw()
      }
    },
    methods: {
      /**
      * @function draw - function that draws the graphic
      */
      draw: function() {
        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);

        var width = element.width(),
          height = element.height();

        var color = d3.scaleThreshold()
            .domain(this.colorDomain)
            .range(this.colors.slice().reverse());

        // scales the chart to fit within a box with 400px height
        function scale (scaleFactor) {
            return d3.geoTransform({
                point: function(x, y) {
                    this.stream.point(x * scaleFactor, y  * scaleFactor);
                }
            });
        }

        var path = d3.geoPath()
            .projection(scale(0.7));

        var svg = d3.select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height);

        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);

        var x = d3.scaleLinear()
            .domain(this.legendDomain)
            .rangeRound([500, 700]);

        var g = svg.append("g")
            .attr("class", "key")
            .attr("transform", "translate(-100,30)");

        g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] === undefined && d[1] === undefined) return null;
              if (d[0] === undefined) d[0] = 0;
              if (d[1] === undefined) d[1] = x.domain()[1];
              return d;
            }).filter(d => d !== null))
          .enter().append("rect")
            .attr("height", 8)
            .attr("x", function(d) { return x(d[0]); })
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })
            .attr("fill", function(d) { return color(d[0]); })

        g.append("text")
            .attr("class", "caption")
            .attr("x", x.range()[0])
            .attr("y", -6)
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(this.metric);


        g.call(d3.axisBottom(x)
            .tickSize(10)
            .tickFormat(function(x, i) { return i ? x : x + "%"; })
            .tickValues(color.domain()))
            .attr('x', 500)
          .select(".domain")
            .remove();

        g.selectAll('.tick')
          .each(function(d,i) {
            d3.select(this).attr('transform', 'translate(' + (520 + i*36) + ',0)')
          })


        var data = this.dataModel;
        // fetches the json for the US map from d3
        d3.json('https://d3js.org/us-10m.v1.json').then( (us) => {
          var valueById = {};
          data.forEach(function(d) { valueById[d.id] = +d.value; });

          // sets the correct classes for the map and chooses the correct
          // data depending ont whether the map shopuld display counties or states
          var attributes = {}
          if (this.format === 'County') {
            attributes = {
              class1: 'counties',
              class2: 'state-boundaries',
              feature: us.objects.counties
            }
          } else {
            attributes = {
              class1: 'states',
              class2: 'state-borders',
              feature: us.objects.states
            }
          }
          let localThis = this

          svg.append("g")
              .attr("class", attributes['class1'])
            .selectAll("path")
              .data(topojson.feature(us, attributes['feature']).features)
            .enter().append("path")
              .attr("d", path)
              .style("fill", function(d) { return color(valueById[d.id]*100); })
              .on("mouseover", function(d) {
                tooltip.transition()
                  .duration(100)
                  .style("opacity", 1);
                var selected = data.find(el => parseInt(el.id) === parseInt(d.id))
                tooltip
                  .html(
                    (d.id < 60 ? "State: " + selected.state + "<br/>": "") + "Value: " + Math.round(selected.value * 100) + '%'
                  )
                  .style("left", d3.event.pageX + 5 + "px")
                  .style("top", d3.event.pageY - 28 + "px");
                localThis.$emit("jsc_mouseover", selected)
              })
              .on("mouseout", function(d) {
                tooltip.transition()
                  .duration(300)
                  .style("opacity", 0);
              })
              .on('click', (d)=>{
                var selected = data.find(el => parseInt(el.id) === parseInt(d.id))
                localThis.$emit("jsc_click", d)
              });

          svg.append("path")
              .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; }))
              .attr("class", attributes['class2'])
              .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; })));
            
          // Emit ready event.
				  this.$emit('jsc_ready');

        })
      },
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        this.draw()
      }
    },
  }
</script>

<style>

.state-boundaries {
  fill: none;
  stroke:#fff;
  stroke-linejoin: round;
}

.states {
  fill: none;
  stroke: black;
  stroke-linejoin: round;
}

.state-borders {
  fill: none;
  stroke: black;
  stroke-width: 0.5px;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}
</style>
