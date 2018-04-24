<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-scatter-chart
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-scatter-chart>
  </div>

</template>

<script>
  import ChartjsScatterChart from './base/ChartjsScatterChart';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Scatter Plot Chart.js component
  * @module Chartjs Scatter Plot
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-scatter
  * :dataModel='scatterPlotData'
  * propID='exampleScatterPlot'
  * ></chartjs-scatter>
  *
  */
  export default {
    components: {
      'chartjs-scatter-chart': ChartjsScatterChart,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {Number} value - value for the datapoint
       * @property {String} label - label for datapoint
       */
      dataModel: {
        type: Array,
        required: true
      },
      propID: {
        type: String,
        default: 'chartjs-scatter'
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        options: {maintainAspectRatio:false},
        chartData: {},
        maxScatterY: 0,
        maxScatterX: 0
      }
    },
    computed: {
      ...themeHelper
    },
    watch: {
      displayTheme: function() {
        this.displayTheme === 'dark' ? this.setDarkOptions() : this.setOptions();
      },
      colors: function() {
        var dataFormatter = new ChartjsHelper()
        this.chartData = dataFormatter.scatterParser(this.dataModel, this.colors)
      }
    },
    created() {
      this.setOptions()
      this.displayTheme === 'dark' ? this.setDarkOptions() : null;
      var dataFormatter = new ChartjsHelper()
      this.chartData = dataFormatter.scatterParser(this.dataModel, this.colors)
    },
    methods: {
      setOptions: function() {
        var maxX = Math.max(...this.dataModel.map(item=>{return item.x}))
        var maxY = Math.max(...this.dataModel.map(item=>{return item.y}))
        this.maxScatterX =  maxX + maxX/4
        this.maxScatterY =  maxY + maxY/4
        this.options = new ChartjsHelper().scatterBubbleOptions(this.maxScatterX, this.maxScatterY)
      },
      setDarkOptions: function() {
        var options = new ChartjsHelper().baseDarkOptions('scatter', this.maxScatterX, this.maxScatterY)
        options.elements = { point: {borderColor: 'lightgrey'}}
        this.options = options
      }
    }
  }
</script>

<style lang="css">
</style>
