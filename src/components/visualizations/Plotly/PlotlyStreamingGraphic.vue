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

export default {
  props: {
    propID: {
      type: String,
      default: "container-plotlystreaminggraphic"
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
    this.drawStreamingGraphic()
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
      this.drawStreamingGraphic();
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
    //note that this visualization doesn't have an associated dataModel. The data is being computed below.
    drawStreamingGraphic: function(){
      function rand() {
        return Math.random();
      }

      Plotly.plot(this.propID, [{
        y: [1,2,3].map(rand),
        mode: 'lines',
        line: {color: this.colors[4]}
      }],
      {title: 'Example Streaming Graphic',
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)'},
      {displayModeBar: false}
    );
      this.setDisplayTheme()
      var cnt = 0;
      var localThis = this;
      var interval = setInterval(function() {
        Plotly.extendTraces(localThis.propID, {
          y: [[rand()]]
        }, [0])

        if(cnt === 100) clearInterval(interval);
      }, 300);
    }
  }

};
</script>

<style>


</style>
