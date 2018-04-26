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
import PanelHeading from '@/components/universal/PanelHeading.vue';
import themeHelper from '@/common/themeHelper.js'

/** Surface Plot Plotly component
* @module Plotly Surface Plot
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-surfaceplot
*  :dataModel="surfacePlotData"
* ></plotly-surfaceplot>
*
*/

export default {
  props: {
    dataModel: {
      type: Array,
      default: ()=>{return []}
    },
    propID: {
      type: String,
      default: "container-plotlysurfaceplot"
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
    this.drawSurfacePlot()
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
      this.drawSurfacePlot();
    },
    displayTheme: function() {
      this.setDisplayTheme()
    },
    colors: function() {
      var graph = document.getElementById(this.propID);
      var data = JSON.parse(JSON.stringify(graph.data));
      var colorscale = data[0].colorscale.map((el, i) => {
        this.colors[i] ? el[1] = this.colors[i] : null;
        return el
      })
      Plotly.restyle(this.propID, {colorscale: [colorscale]})
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
    drawSurfacePlot: function(){
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Zoomable 3D Surface Plot',
        autosize: true,
        font: {
          family: 'Courier New, monospace',
          size: 12,
          color: '#7f7f7f'
        }
      };
      var data = JSON.parse(JSON.stringify(this.dataModel.slice()));
      data[0].colorscale = data[0].colorscale.map((el, i) => {
        this.colors[i] ? el[1] = this.colors[i] : null;
        return el
      })
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
