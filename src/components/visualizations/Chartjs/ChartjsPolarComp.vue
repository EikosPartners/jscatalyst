<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-polar-chart
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-polar-chart>
  </div>

</template>

<script>
  import ChartjsPolarChart from './base/ChartjsPolarArea';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Polar Area Chart Chart.js component
  * @module Chartjs Polar Area Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-polar
  * :dataModel='polarChartData'
  * propID='examplePolarChart'
  * ></chartjs-polar>
  *
  */
  export default {
    components: {
      'chartjs-polar-chart': ChartjsPolarChart,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {Number} value - value of datapoint
       * @property {String} label - label for datapoint
       */
      dataModel: {
        type: Array,
        required: true
      },
      propID: {
        type: String,
        default: 'chartjs-polar'
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        options: {maintainAspectRatio:false},
        chartData: {}
      }
    },
    computed: {
      ...themeHelper
    },
    watch: {
      displayTheme: function() {
        this.displayTheme === 'dark' ? this.setDarkOptions() : this.options = {maintainAspectRatio: false};
      },
      colors: function() {
        var dataFormatter = new ChartjsHelper()
        this.chartData = dataFormatter.polarChartParser(this.dataModel, this.colors)
      }
    },
    created() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : null;
      var dataFormatter = new ChartjsHelper()
      this.chartData = dataFormatter.polarChartParser(this.dataModel, this.colors)
    },
    methods: {
      setDarkOptions: function() {
        this.options = new ChartjsHelper().baseDarkOptions('polar')
      }
    }
  }
</script>

<style lang="css">
</style>
