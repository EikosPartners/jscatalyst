<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeChart"></resize-observer>
      <div style="width:100%;height:100%" :id="propID"/>
    </div>
</template>

<script>
import Plotly from 'plotly.js/dist/plotly';
import $ from "jquery";
import Vue from 'vue';
import { ResizeObserver } from 'vue-resize';
import PanelHeading from '@/components/universal/PanelHeading.vue';
import themeHelper from '@/common/themeHelper.js'

export default {
  props: {
    propID: {
      type: String,
      default: "container-plotlyanimatedgraph"
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
    this.drawAnimatedLineGraph()
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
      this.drawAnimatedLineGraph();
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
    resizeChart: function() {
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
    //note that this visualization doesn't have an associated dataModel. The data is being computed below.
    drawAnimatedLineGraph: function(){
      var n = 100;
      var x = [], y = [], z = [];
      var dt = 0.015;

      for (var i = 0; i < n; i++) {
        x[i] = Math.random() * 2 - 1;
        y[i] = Math.random() * 2 - 1;
        z[i] = 30 + Math.random() * 10;
      }


      Plotly.plot(this.propID, [{
        x: x,
        y: z,
        mode: 'markers',
        marker: {color: this.colors[4]}
      }], {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {range: [-40, 40]},
        yaxis: {range: [0, 60]},
        title: 'Example Animated Line Graph',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      {displayModeBar: false}
    )
      this.setDisplayTheme()

      function compute () {
        var s = 10, b = 8/3, r = 28;
        var dx, dy, dz;
        var xh, yh, zh;
        for (var i = 0; i < n; i++) {
          dx = s * (y[i] - x[i]);
          dy = x[i] * (r - z[i]) - y[i];
          dz = x[i] * y[i] - b * z[i];

          xh = x[i] + dx * dt * 0.5;
          yh = y[i] + dy * dt * 0.5;
          zh = z[i] + dz * dt * 0.5;

          dx = s * (yh - xh);
          dy = xh * (r - zh) - yh;
          dz = xh * yh - b * zh;

          x[i] += dx * dt;
          y[i] += dy * dt;
          z[i] += dz * dt;
        }
      }
      var localThis = this;
      function update () {
        compute();
        Plotly.animate(localThis.propID, {
          data: [{x: x, y: z}]
        }, {
          transition: {
            duration: 0
          },
          frame: {
            duration: 0,
            redraw: false
          }
        });


        requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }
  }

};
</script>

<style>


</style>
