<template>
    <div style="height:100%; width:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG" />
      <div :id="propID" style="height:100%; width:100%"/>
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import { ResizeObserver } from "vue-resize";
  import $ from 'jquery';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper'

  /** Histogram D3 component
  * @module Histogram
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <histogram
  *   :dataModel="histogramData"
  *   propID="container-histogram"
  * ></histogram>
  */

  export default {
    name: 'D3Histogram',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Object} dataModel
       * @property {Array} - array of numbers
       */
      dataModel: {
        type: Array
      },
      propID: {
        type: String,
        default: 'container-histogram'
      },
      title: {
        type: String
      }
    },
    watch: {
      dataModel: function() {
        this.drawHistogram()
      },
      theme: function(data) {
        this.drawHistogram()
      }
    },
    computed: {
      ...themeHelper
    },
    mounted: function() {
      this.drawHistogram();
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
			* @function resizeSVG - redraws the SVG on window resize
			*/
      resizeSVG: function() {
        this.drawHistogram()
      },
      formatMinutes: function(d) {
        // debugger
        let formatTime = d3.timeFormat("%H:%M")
        return formatTime(new Date(2018, 0, 1, 0, d));
      },

      // formatMonths: function(d) {
      //   let formatTime = d3.time.format("%m:%Y")
      // },
      // formatTime: function(d){
      //   switch (this.units.toLowerCase()){
      //     case 'minutes':
      //       return this.formatMinutes(d)
      //       break;
      //     case 'months':
      //       return this.formatMonths(d)
      //       break;
      //     default:
      //       return this.formatMinutes(d)
      //   }
      // },

      /**
      * @function drawHistogram - function that draws the histogram
      * called in mounted
      */
      drawHistogram: function() {

        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var formatCount = d3.format(",.0f")
        var element = $(selection_string)
        var data = this.dataModel

        var margin = {top: 30, right: 30, bottom: 30, left: 30},
            width = element.width() - margin.left - margin.right,
            height = element.height()   - margin.top - margin.bottom;

        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        // Generate a histogram using twenty uniformly-spaced bins.
        var bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))
            (data);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(this.formatMinutes);

        var yMax = d3.max(bins, function(d){return d.length});
        var yMin = d3.min(bins, function(d){return d.length});
        y.domain([0, yMax]);

        var yAxis = d3.axisLeft()
            .scale(y)

        var colorScale = d3.scaleLinear()
              .domain([yMin, yMax])
              .range([d3.rgb(this.colors[7]), d3.rgb(this.colors[0])]);

        var svg = d3.select(selection_string).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(bins)
          .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
            .attr("height", function(d) { return height - y(d.length); })
            .attr("fill", function(d) { return colorScale(d.length) });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.length); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var tooltip = d3
          .select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        var rect = svg.selectAll('rect')

        rect.on('mouseover', function(d, a, b, c, e){
          tooltip.transition()
            .duration(100)
            .style("opacity", 1);
          tooltip
            .html(
              d.length + " values - see console"
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px");
        })
          .on("mouseout", function(d) {
            tooltip.transition()
              .duration(300)
              .style("opacity", 0);
          });

      }
    }
  }
</script>

<style>
  svg {
    font: 14px sans-serif;
  }
</style>
