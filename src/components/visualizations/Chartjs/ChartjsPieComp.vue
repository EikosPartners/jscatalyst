<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-pie-chart
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-pie-chart>
  </div>

</template>

<script>
  import ChartjsPieChart from './base/ChartjsPieChart';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Pie Chart Chart.js component
  * @module Chartjs Pie Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-pie
  * :dataModel='pieChartData'
  * propID='examplePieChart'
  * ></chartjs-pie>
  *
  */
  export default {
    components: {
      'chartjs-pie-chart': ChartjsPieChart,
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
        default: 'chartjs-pie'
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
        this.options = new ChartjsHelper().baseDarkOptions('pie')
      }
    }
  }
</script>

<style lang="css">
</style>
