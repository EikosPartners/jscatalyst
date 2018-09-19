<template>
  <div style="width:100%;height:100%; ">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  import $ from 'jquery';
  import { ResizeObserver } from 'vue-resize';
  import * as d3 from 'd3';
  import * as topojson from 'topojson-client';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper'

  /** World Map D3 component
  * @module World Map
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {Array} colorDomain - determines the threshhold points for where the graph changes color; should always be 5 values
  *
  * @example
  * usage on a page:
  * <world-map
  *   :dataModel="worldMapData"
  *   propID="container-worldmap"
  * ></world-map>
  *
  */

  export default {
    name: 'D3WorldMap',
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
       * @property {string} id - "3 digit country code", see https://en.wikipedia.org/wiki/ISO_3166-1_numeric
       * @property {string} value - value for that country (as a float percent)
       * @property {string} name - country name
       */
      dataModel: {
        type: Array,
        default: () => { return []}
      },
      propID: {
        type: String,
        default: 'container-worldmap'
      },
      colorDomain: {
        type: Array,
        default: () => ([2,4,6,8,10])
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
        let localThis = this

        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);

        var margin = {top: 20, right: 20, bottom: 0, left: 50},
          width = element.width(),
          height = element.height() - margin.top - margin.bottom;

        // Account for panel-heading height if the title exists.
        if (this.title) {
          height -= 40;
        }

          var color = d3.scaleThreshold()
              .domain(this.colorDomain)
              .range(this.colors.slice().reverse());

        var projection = d3.geoMercator()
            .scale(120)
            .translate([width / 2, height-150])
            .precision(.1);

        var path = d3.geoPath()
            .projection(projection);

        var graticule = d3.geoGraticule();

        var svg = d3.select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg")
            .call(d3.zoom().scaleExtent([1,10]).on("zoom", function () {
                svg.attr("transform", d3.event.transform)
            }))
             .append("g")

        svg.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path);


        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);

        var data = this.dataModel;
        d3.json("https://unpkg.com/world-atlas@1.1.4/world/50m.json").then((world) => {

          var valueById = {};
          data.forEach(function(d) { valueById[d.id] = +d.value; });

          var countries = topojson.feature(world, world.objects.countries).features,
              neighbors = topojson.neighbors(world.objects.countries.geometries);

          svg.selectAll(".country")
              .data(countries)
            .enter().insert("path", ".graticule")
              .attr("class", "country")
              .attr("d", path)
              .style("fill", function(d, i) { return color(valueById[d.id]*100);})
              .on("mouseover", function(d) {
                tooltip.transition()
                  .duration(100)
                  .style("opacity", 1);
                var selected = data.find(el => parseInt(el.id) === parseInt(d.id))
                tooltip
                  .html(
                    "Country: " + selected.name + "<br/>" + "Value: " + Math.round(selected.value * 100) + '%'
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
              .on("click", (d)=>{
                var selected = data.find(el => parseInt(el.id) === parseInt(d.id))
                localThis.$emit("jsc_click", selected)
              })


          svg.insert("path", ".graticule")
              .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr("class", "boundary")
              .attr("d", path);
        });

        d3.select(self.frameElement).style("height", height + "px");
      },
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        this.draw()
      }
    }
  }
</script>

<style>

body {
  background: #fcfcfa;
}
.country {
  stroke: black;
  stroke-width: .2px;
}
.stroke {
  fill: none;
  stroke: #000;
  stroke-width: 3px;
}

.fill {
  fill: #fff;
}

.graticule {
  fill: none;
  stroke: #777;
  stroke-width: .5px;
  stroke-opacity: .5;
}

.land {
  fill: #222;
}

.boundary {
  fill: none;
  stroke: black;
  stroke-width: .2px;
}
</style>
