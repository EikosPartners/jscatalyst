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

/** Area Chart Plotly component
* @module Plotly Area Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-areachart
*  :dataModel="areaChartData"
* ></plotly-areachart>
*
*/

export default {
  name: 'PlotlyAreaChart',
  props: {
    /**
     * The data for this consists of an x key, which is the x-axis value for that point, and any key after that is a line to be drawn on the graph with its value as the data for that line (ex. 'myLine': 4) it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} x - x-axis label for that point
     * @property {Number} nameOfYourLine - key will be used as the line's name, number value is the value at that x
     */
    dataModel: {
      type: Array,
      default: ()=>{return []}
    },
    propID: {
      type: String,
      default: "container-plotlyareachart"
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
    this.drawAreaChart()
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
      this.drawAreaChart();
    },
    displayTheme: function() {
      this.setDisplayTheme()
    },
    colors: function() {
      var update = {
        'line.color': this.colors
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
    drawAreaChart: function(){
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Area Chart',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      };
      var data = new PlotlyHelper().areaChartParser(this.dataModel, this.colors)

    //draw plot
      Plotly.plot(
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
