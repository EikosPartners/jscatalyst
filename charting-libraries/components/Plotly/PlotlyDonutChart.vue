<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeChart"></resize-observer>
      <div style="width:100%;height:100%" :id="propID"/>
    </div>
</template>

<script>
import Plotly from 'plotly.js/dist/plotly';
import { ResizeObserver } from 'vue-resize';
import PlotlyHelper from '@/common/plotlyHelper'
import PanelHeading from '@/components/universal/PanelHeading.vue';
import themeHelper from '@/common/themeHelper.js'

/** Donut Chart Plotly component
* @module Plotly Donut Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-donutchart
*  :dataModel="donutChartData"
* ></plotly-donutchart>
*
*/

export default {
  name: 'PlotlyDonutChart',
  props: {
    /**
     * The data for this component consists of chart, value, and label keys. If you would like to draw multiple donuts in one chart specify different chart values and the data points will be grouped accordingly.
     * @typedef {Array} dataModel
     * @property {Array} chart - the name of the chart this data belongs to
     * @property {Number} value - number value that for the given label
     * @property {String} label - label for the section of the donut, corresponds to the value
     */
    dataModel: {
      type: Array,
      default: ()=>{return []}
    },
    propID: {
      type: String,
      default: "container-plotlydonutchart"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': ResizeObserver,
    'panel-heading': PanelHeading
  },
  data: function() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function() {
  },
  mounted: function() {
    this.drawDonutChart()
    this.update = true
  },
  watch: {
    dataModel: function(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawDonutChart();
    },
    displayTheme: function() {
      this.setDisplayTheme()
    },
    colors: function() {
      var update = {
        'marker.colors': [this.colors]
      }
      Plotly.restyle(this.propID, update)
    }
  },
  computed: {
    ...themeHelper
  },
  methods: {
    resizeChart: function(){
      Plotly.Plots.resize(this.propID)
    },
    setDisplayTheme: function() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      }
      Plotly.relayout(this.propID, update)
    },
    drawDonutChart: function(){
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Donut Chart',
        annotations: [
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'GHG',
          x: 0.17,
          y: 0.5
        },
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'CO2',
          x: 0.82,
          y: 0.5
        }
        ],
        // height: 600,
        // width: 600,
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      };
      var data = new PlotlyHelper().donutChartParser(this.dataModel, this.colors)

    //draw plot
      Plotly.newPlot(
        this.propID,
        data,
        layout,
        {displayModeBar: false}
      )
      this.setDisplayTheme()
    }
  }

};
</script>

<style>


</style>
