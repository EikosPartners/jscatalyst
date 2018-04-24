<template>
  <div style='height:100%; width:100%; position: relative;'>
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartjs-bubble-chart
      :chart-data='chartData'
      :options='options'
      :chart-id='propID'
    ></chartjs-bubble-chart>
  </div>

</template>

<script>
  import ChartjsBubbleChart from './base/ChartjsBubbleChart';
  import ChartjsHelper from '@/common/chartjsHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper.js'

  /** Bubble Chart Chart.js component
  * @module Chartjs Bubble Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <chartjs-bubble
  * :dataModel='bubbleData'
  * propID='exampleBubbleChart'
  * ></chartjs-bubble>
  *
  */
  export default {
    components: {
      'chartjs-bubble-chart': ChartjsBubbleChart,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {Number} x - x-axis value
       * @property {Number} y - y-axis value
       * @property {Number} value - value of datapoint (determines the diameter of the bubble)
       * @property {String} label - label for datapoint
       */
      dataModel: {
        type: Array,
        required: true
      },
      propID: {
        type: String,
        default: 'chartjs-bubble'
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        options: {maintainAspectRatio:false},
        chartData: {},
        maxBubY: 0,
        maxBubX: 0
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
        this.chartData = dataFormatter.bubbleChartParser(this.dataModel.slice(), this.colors)
      }
    },
    created() {
      this.setOptions();
      this.displayTheme === 'dark' ? this.setDarkOptions() : null;
      var dataFormatter = new ChartjsHelper()
      this.chartData = dataFormatter.bubbleChartParser(this.dataModel.slice(), this.colors)
    },
    methods: {
      setOptions: function() {
        var maxX = Math.max(...this.dataModel.map(item=>{return item.x}))
        var maxY = Math.max(...this.dataModel.map(item=>{return item.y}))
        this.maxBubX = maxX + maxX/4
        this.maxBubY = maxY + maxY/4
        var options = new ChartjsHelper().scatterBubbleOptions(this.maxBubX, this.maxBubY)
        options.elements = {
          point: {
            radius: function(context) {
              var index = context.dataIndex;
              var data = context.dataset.data[index];
              var size = context.chart.width;
              var base = data.value / 100;
              return (size / 10) * base;
            }
          }
        }
        this.options = options;
      },
      setDarkOptions: function() {
        var options = new ChartjsHelper().baseDarkOptions('bubble', this.maxBubX, this.maxBubY)
        options.elements = {
          point: {
            radius: function(context) {
              var index = context.dataIndex;
              var data = context.dataset.data[index];
              var size = context.chart.width;
              var base = data.value / 100;
              return (size / 10) * base;
            },
            borderColor: 'lightgrey'
          }
        }
        this.options = options
      }
    }
  }
</script>

<style lang="css">
</style>
