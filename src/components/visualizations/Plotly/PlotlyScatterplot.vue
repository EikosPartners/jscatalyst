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

/** Scatterplot Chart Plotly component
* @module Plotly Scatterplot Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-scatterplot
*  :dataModel="scatterplotData"
* ></plotly-scatterplot>
*
*/

export default {
  name: 'PlotlyScatterPlot',
  /**
   * The data for this component can be customized; it currently contains:
   * @typedef {Array} dataModel
   * @property {String} category - the category value alllows you to show data from multiple sources on the same graph (ex. 'office1', 'office2'), this makes it easy to filter the graph
   * @property {Number} x - x value for that datapoint
   * @property {Number} y - y value for that datapoint
   * @property {String} label - label for that datapoint, appears by the point on the graph, will be grouped under the category specified
   */
  props: {
    dataModel: {
      type: Array,
      default: ()=>{return []}
    },
    propID: {
      type: String,
      default: "container-plotlyscatterplot"
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
    this.drawScatterplot()
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
      this.drawScatterplot();
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
    drawScatterplot: function(){
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Scatterplot',
        xaxis: {
          range: [ 0.75, 5.25 ]
        },
        yaxis: {
          range: [0, 8]
        },
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      };

    var plotlyScatterplot = document.getElementById(this.propID);
    var data = new PlotlyHelper().scatterChartParser(this.dataModel, this.colors)

    //draw plot
      Plotly.newPlot(
        this.propID,
        data,
        layout,
        {displayModeBar: false}
      )
      this.setDisplayTheme()
      //make custom tooltip
      var localThis = this;
      plotlyScatterplot.on('plotly_hover', function(eventData){
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
