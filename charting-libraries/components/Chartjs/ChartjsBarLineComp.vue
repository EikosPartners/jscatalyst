<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-bar-line
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-bar-line>
  </div>

</template>

<script>
  import ChartjsBarLineMixed from './base/ChartjsBarLineMixed';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** BarLine Chart Chart.js component
  * @module Chartjs BarLine Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-barline
  * :dataModel='barLineData'
  * propID='exampleBarLineChart'
  * ></chartjs-barline>
  *
  */

  export default {
    name: 'ChartjsBarLineChart',
    components: {
      'chartjs-bar-line': ChartjsBarLineMixed,
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
        default: 'chartjs-barline'
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
        this.chartData = dataFormatter.barLineParser(this.dataModel, this.colors)
      }
    },
    created() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : null;
      var dataFormatter = new ChartjsHelper()
      this.chartData = dataFormatter.barLineParser(this.dataModel, this.colors)
    },
    methods: {
      setDarkOptions: function() {
        this.options = new ChartjsHelper().baseDarkOptions('barline')
      }
    }
  }
</script>

<style lang="css">
</style>
