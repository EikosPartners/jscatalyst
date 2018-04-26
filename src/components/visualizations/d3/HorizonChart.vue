<template>
  <div style="height:100%; width:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="height:100%"/>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import $ from 'jquery'
  var d3HorizonChart = require('d3-horizon-chart')
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Horizon Chart D3 component
  * @module Horizon Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <horizon-chart
  *   :dataModel="horizonChartData"
  *   propID="container-horizonchart"
  * ></horizon-chart>
  *
  */

  export default {
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      dataModel: {
        type: Object,
        default: () => ({})
      },
      propID: {
        type: String,
        default: 'container-horizonchart'
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        internalData: {}
      }
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData) {
          this.internalData = data
          this.internalData.length !== 0 ? this.draw() : null
        }
      },
      theme: function(data) {
        this.draw()
      }
    },
    computed: {
      ...themeHelper
    },
    mounted() {
      this.draw()
    },
    methods: {
      /**
			* @function draw - function that draws the heat map -
			* called in mounted
			*/
      draw: function() {

        let selection_string = "#" + this.propID;
        if ($('.horizon') != null) {
          $('.horizon').remove();
        }
        var element = $(selection_string);

        var margin = {top: 30, right: 30, bottom: 30, left: 30},
            width = element.width() - margin.left - margin.right,
            height = element.height()   - margin.top - margin.bottom;


        var data = Object.assign({}, this.dataModel)
        var formattedData = []
        for (var key in data) {
          data[key] = data[key].map(function(d) {
              return [d3.timeParse(d.Date), +d.Open];
          }).filter(d => {
              return d[1] !== false
          }).reverse();

          var compare = data[key][400][1],
              values = [];

          data[key].forEach(function(d, i ) {
              values.push((d[1] - compare) / compare);
          });

          formattedData.push({name: key, values: values})
        }
        var localThis = this;
        d3.select(selection_string).selectAll('.horizon')
            .data(formattedData)
            .enter()
            .append('g')
            .attr('class', 'horizon')
            .attr('width', width)
            .attr('height', height)
            .each(function(d, i) {
                var chartHeight = height *.75 / formattedData.length;
                d3HorizonChart.horizonChart()
                    .height(chartHeight)
                    .colors(localThis.colors)
                    .title(d.name)
                    .call(this, d.values);
            });
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
  .horizon + .horizon {
      border-top: none;
  }

  .horizon canvas {
      display: block;
      width: 100%;
      image-rendering: pixelated;
      max-height: 120px;
  }
</style>
