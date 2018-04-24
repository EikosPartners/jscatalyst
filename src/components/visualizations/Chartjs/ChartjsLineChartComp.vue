<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-line-chart
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-line-chart>
  </div>

</template>

<script>
  import ChartjsLineChart from './base/ChartjsLineChart';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Line Chart Chart.js component
  * @module Chartjs Line Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-line
  * :dataModel='lineChartData'
  * propID='exampleLineChart'
  * ></chartjs-line>
  *
  */
  export default {
    components: {
      'chartjs-line-chart': ChartjsLineChart,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {String} date - date string on x-axis
       * @property {Number} value - y-axis value
       */
      dataModel: {
        type: Array,
        required: true
      },
      propID: {
        type: String,
        default: 'chartjs-line'
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
        this.chartData = dataFormatter.lineChartParser(this.dataModel, 'Line', this.colors.slice(2,6), false);
      }
    },
    created() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : null;
      var dataFormatter = new ChartjsHelper()
      this.chartData = dataFormatter.lineChartParser(this.dataModel, 'Line', this.colors.slice(2,6), false);
    },
    methods: {
      setDarkOptions: function() {
        this.options = new ChartjsHelper().baseDarkOptions('line')
      }
    }
  }
</script>

<style lang="css">
</style>
