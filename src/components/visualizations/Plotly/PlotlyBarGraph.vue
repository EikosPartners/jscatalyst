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

/** Bar Chart Plotly component
* @module Plotly Bar Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-barchart
*  :dataModel="barChartData"
* ></plotly-barchart>
*
*/

export default {
  name: 'PlotlyBarGraph',
  props: {
    /**
     * The data for this consists of an x key, which is the x-axis value for that point, and any key after that is a bar to be drawn on the graph with its value as the data for that bar (ex. 'myBar': 4) it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} x - x-axis label for that point
     * @property {Number} nameOfYourBar - key will be used as the bar's name, number value is the value at that x
     */
    dataModel: {
      type: Array,
      default: ()=>{return []}
    },
    propID: {
      type: String,
      default: "container-barchart"
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
    this.drawBarPlot()
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
      this.drawBarPlot();
    },
    displayTheme: function() {
      this.setDisplayTheme()
    },
    colors: function() {
      var update = {
        'marker.color': this.colors
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
    drawBarPlot: function(){
      //example styling
      var layout = {
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      hoverinfo: 'none',
      title: 'Example Bar Chart',
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      },
        bargap: 0.05
      };

      var plotlyBarGraph = document.getElementById(this.propID);
      var data = new PlotlyHelper().barChartParser(this.dataModel, this.colors)

    //draw plot
      Plotly.plot(
        plotlyBarGraph,
        data,
        layout,
        {
          barmode: 'group',
          margin: { t: 0, l: 0, b: 0, r: 0 },
          displayModeBar: false
        }
      )
      this.setDisplayTheme();
      //make custom tooltip
      var localThis = this;
      plotlyBarGraph.on('plotly_hover', function(eventData){
          var infotext = eventData.points[0].x + '<br/>'
          eventData.points.forEach(function(d){
            infotext += d.data.name + ': ' + d.y + '<br/>'
          });

         var customTooltip = document.getElementById(localThis.propID + 'tooltip');
         customTooltip.innerHTML = infotext
         customTooltip.style.left = +eventData.points[0].xaxis.d2p(eventData.points[0].x) + eventData.points[0].xaxis._offset + 'px'
         customTooltip.style.top = +eventData.points[0].yaxis.d2p(eventData.points[0].y)+eventData.points[0].yaxis._offset+'px';
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


</style>
