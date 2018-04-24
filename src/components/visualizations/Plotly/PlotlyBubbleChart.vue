<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeChart"></resize-observer>
      <div style="width:100%;height:100%" :id="propID"/>
      <div :id="propID + 'tooltip'" class="d3_visuals_tooltip" style="position:absolute;z-index:1000;opacity:0"></div>
    </div>
</template>

<script>
import Plotly from 'plotly.js/dist/plotly';
import { ResizeObserver } from 'vue-resize';
import PlotlyHelper from '@/common/plotlyHelper'
import PanelHeading from '@/components/universal/PanelHeading.vue';
import themeHelper from '@/common/themeHelper.js'

/** Bubble Chart Plotly component
* @module Plotly Bubble Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-bubblechart
*  :dataModel="bubbleChartData"
* ></plotly-bubblechart>
*
*/

export default {
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Array} x - x value for that bubble
     * @property {Array} y - y value for that bubble
     * @property {Number} value - number value that determines the size of bubble
     * @property {String} label - label for that bubble, which will appear in the tooltip
     */
    dataModel: {
      type: Array,
      default: ()=>{return []}
    },
    propID: {
      type: String,
      default: "container-plotlybubblechart"
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
    // console.log(this.dataModel)
  },
  mounted: function() {
    this.drawBubbleChart()
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
      this.drawBubbleChart();
    },
    displayTheme: function() {
      this.setDisplayTheme()
    },
    colors: function() {
      var update = {
        'marker.color': [this.colors]
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
    drawBubbleChart: function(){
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Bubble Chart',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        },
        bargap: 0.05
      };

    var plotlyBubbleChart = document.getElementById(this.propID);
    // make a copy of the datamodel and then add set the colors of the chart based on the current color theme
    var data = new PlotlyHelper().bubbleChartParser(this.dataModel, this.colors)
    //draw plot
      Plotly.newPlot(
        plotlyBubbleChart,
        data,
        layout,
        {displayModeBar: false}
      )
      this.setDisplayTheme()
      //make custom tooltip
      var localThis = this;
      plotlyBubbleChart.on('plotly_hover', function(eventData){
          var infotext = eventData.points[0].text + '<br/>' + eventData.points[0].x + ', ' + eventData.points[0].y

         var customTooltip = document.getElementById(localThis.propID + 'tooltip');
         // debugger
         customTooltip.innerHTML = infotext
         customTooltip.style.left = +eventData.points[0].xaxis.d2p(eventData.points[0].x) + eventData.points[0].xaxis._offset + 'px'
         customTooltip.style.top = +eventData.points[0].yaxis.d2p(eventData.points[0].y)+eventData.points[0].yaxis._offset+550+'px';
         customTooltip.style.opacity = 1
      })
      .on('plotly_unhover', function(data){
        document.getElementById(localThis.propID + 'tooltip').style.opacity = 0;
      })
    }
  }

};
</script>

<style>

  #plotlybubblechart {
    cursor: pointer;
  }

</style>
