<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-radar-chart
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-radar-chart>
  </div>

</template>

<script>
  import ChartjsRadarChart from './base/ChartjsRadarChart';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Radar Chart Chart.js component
  * @module Chartjs Radar Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-radar
  * :dataModel='radarChartData'
  * propID='exampleRadarChart'
  * ></chartjs-radar>
  *
  */
  export default {
    components: {
      'chartjs-radar-chart': ChartjsRadarChart,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {Number} x - x-axis value
       * @property {Number} y - y-axis value
       * @property {String} label - label for datapoint
       */
      dataModel: {
        type: Array,
        required: true
      },
      propID: {
        type: String,
        default: 'chartjs-radar'
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
        this.chartData = dataFormatter.radarChartParser(this.dataModel, this.colors)
      }
    },
    created() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : null;
      var dataFormatter = new ChartjsHelper()
      this.chartData = dataFormatter.radarChartParser(this.dataModel, this.colors)
    },
    methods: {
      setDarkOptions: function() {
        this.options = new ChartjsHelper().baseDarkOptions('radar')
      }
    }
  }
</script>

<style lang="css">
</style>
