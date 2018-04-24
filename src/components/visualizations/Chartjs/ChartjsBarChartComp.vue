<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-bar-chart
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-bar-chart>
  </div>

</template>

<script>
  import ChartjsBarChart from './base/ChartjsBarChart';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Bar Chart Chart.js component
  * @module Chartjs Bar Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-bar
  * :dataModel='barChartData'
  * propID='exampleBarChart'
  * ></chartjs-bar>
  *
  */

  export default {
    components: {
      'chartjs-bar-chart': ChartjsBarChart,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {String} date - date string on x-axis ("5/15 - 6/14")
       * @property {Number} value - y-axis value
       */
      dataModel: {
        type: Array,
        required: true
      },
      propID: {
        type: String,
        default: 'chartjs-bar'
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
        this.chartData = dataFormatter.barChartParser(this.dataModel, 'Bars', this.colors);
      }
    },
    created() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : null;
      var dataFormatter = new ChartjsHelper()
      this.chartData = dataFormatter.barChartParser(this.dataModel, 'Bars', this.colors);
    },
    methods: {
      setDarkOptions: function() {
        this.options = new ChartjsHelper().baseDarkOptions('bar')
      }
    }
  }
</script>

<style lang="css">
</style>
