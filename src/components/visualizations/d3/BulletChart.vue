<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="width:100%;height:100%; margin-top:15px;"/>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from 'jquery'
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Bullet Chart D3 component
  * @module Bullet Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {Boolean} isStock - used to visualize live stock, default false
  *
  * @example
  * usage on a page:
  * <bullet-chart
  *   :dataModel="bulletChartData"
  *   propID="container-bulletchart"
  * ></bullet-chart>
  *
  */

  export default {
    name: 'D3BulletChart',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {

    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Object} dataModel
     * @property {string} title - 'title of a bullet chart'
     * @property {string} subtitle - 'subtitle of chart, usaully to show the units'
     * @property {Array} ranges - [array of 3 values to show the y-value limit of the bad, ok, and good performance]; the last value will be the limit of the chart
     * @property {Array} measures - [array of 1 or 2 values to show the actual value of this bullet chart]; if two values are used they can show expected and actual values
     * @property {Array} markers - [array of one or more values to show a tick marker that is used to show the target value of the data] values
     */

      dataModel: {
        type: Array,
        default: () => {return [{"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220,270],"markers":[250]}]}
      },
      propID: {
        type: String,
        default: 'container-bulletchart'
      },
      isStock: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        internalData: []
      }
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData && data.length !== 0) {
          this.internalData = data
          this.internalData[0].measures !== undefined ? this.draw() : null
        }
      }
    },
    mounted() {
      this.dataModel[0].measures !== undefined ? this.draw() : null
    },
    methods: {
      /**
			* @function draw - function that draws the bullet chart
			*/
      draw: function() {
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);

        // sets height and with of each individual bullet chart
        var margin = {top: 5, right: 40, bottom: 25, left: 200},
          width = element.width() - margin.left - margin.right,
          height = 75 - margin.top - margin.bottom;
        var localThis = this;

        var svg = d3.select(selection_string).selectAll("svg")
          .data(this.dataModel)
        .enter().append("svg")
          .attr("class", "bullet")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          // renders each individual bullet chart for each object in the data array
          .each(function(d, i) {
                // duration controls the intial load animation
            var duration = 0;

            var ranges = d.ranges.slice().sort(d3.descending),
                markers = d.markers.slice().sort(d3.descending),
                measures = d.measures.slice().sort(d3.descending),
                g = d3.select(this);

            // If visualizing live stock data then set the bottom of range to 10 less than the min of data
            var xMin = localThis.isStock ? Math.min(ranges[0], markers[0], measures[0]) -10 : 0

            // Compute the new x-scale.
            var x1 = d3.scaleLinear()
                .domain([xMin, Math.max(ranges[0], markers[0], measures[0])])
                .range([0, width]);

            // Derive width-scales from the x-scales.
            var w1 = function(d) {
                  return Math.abs(x1(d) - x1(xMin));
                };

            // Update the range rects.
            var range = g.selectAll("rect.range")
                .data(ranges);

            range.enter().append("rect")
                .attr("class", function(d, i) { return "range s" + i; })
                .attr("width", w1)
                .attr("height", height)
                .attr("x",  0)


            // Update the measure rects.
            var measure = g.selectAll("rect.measure")
                .data(measures);

            measure.enter().append("rect")
                .attr("class", function(d, i) { return "measure s" + i; })
                .attr("width", w1)
                .attr("height", height / 3)
                .attr("x", 0)
                .attr("y", height / 3)


            // Update the marker lines.
            var marker = g.selectAll("line.marker")
                .data(markers);

            marker.enter().append("line")
                .attr("class", "marker")
                .attr("x1", x1)
                .attr("x2", x1)
                .attr("y1", height / 6)
                .attr("y2", height * 5 / 6)

            // Compute the tick format.
            var format = x1.tickFormat(8);

            // Update the tick groups.
            var tick = g.selectAll("g.tick")
                .data(x1.ticks(8), function(d) {
                  return this.textContent || format(d);
                });

            // Initialize the ticks with the old scale, x0.
            var tickEnter = tick.enter().append("g")
                .attr("class", "tick")
                .attr("transform", bulletTranslate(x1))
                .style("opacity", 1e-6);

            tickEnter.append("line")
                .attr("y1", height)
                .attr("y2", height * 7 / 6);

            tickEnter.append("text")
                .attr("text-anchor", "middle")
                .attr("class", "anchor-text")
                .attr("dy", "1em")
                .attr("y", height * 7 / 6)
                .text(format);

            // Transition the entering ticks to the new scale, x1.
            tickEnter.transition()
                .duration(duration)
                .attr("transform", bulletTranslate(x1))
                .style("opacity", 1);

            // responsible for moving the ticks as the data updates
            function bulletTranslate(x) {
              return function(d) {
                return "translate(" + x(d) + ",0)";
              };
            }
          });

        // add all the titles to the bullet charts
        var title = svg.append("g")
            .style("text-anchor", "end") .attr("transform", "translate(-6," + height / 2 + ")");

        title.append("text")
            .attr("class", "title")
            .text(function(d) { return d.title; });

        title.append("text")
            .attr("class", "subtitle")
            .attr("dy", "1em")
            .text(function(d) { return d.subtitle; });
      },

      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        // added to make resizing smooth
        // without setTimeout the graph flashes while being resized
        if (this.dataModel[0].measures){
          var localThis = this;
          setTimeout(function() {
            localThis.draw()
          },10)
        }
      }
    }
  }
</script>

<style>
  .bullet .marker { stroke: #000; stroke-width: 2px; }
  .bullet .tick line { stroke: #666; stroke-width: .5px; }
  .bullet .range.s0 { fill: #eee; }
  .bullet .range.s1 { fill: #ddd; }
  .bullet .range.s2 { fill: #ccc; }
  .bullet .measure.s0 { fill: var(--fifth); }
  .bullet .measure.s1 { fill: #1a649f; }
  .bullet .title { font-size: 14px; font-weight: bold; }
  .bullet .subtitle { fill: #999; }

  .subtitle {
    font-size: 16px;
  }

  .anchor-text {
    font-size: 14px;
  }
</style>
