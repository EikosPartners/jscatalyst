<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartist
      type="Line"
      :data="chartData"
      :options="options"
      style="height:100%"
      :id='propID'
      ></chartist>
  </div>
</template>

<script>
  import Chartist from 'vue-chartist';
  import ChartistHelper from '@/common/chartistHelper';
  import moment from 'moment';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Line Chart Chartist component
  * @module Chartist Line Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {String} propID - the ID for the component
  * @param {Object} options - an object containing options for configuring the chart
  *
  * @example
  * usage on a page:
  * <chartist-line-chart
  *  :dataModel='lineChartData'
  * ></chartist-line-chart>
  *
  */

  export default {
    components: {
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {string} date - date string on x-axis
       * @property {string} value - y-axis value
       */
      dataModel: {
        type: Array
      },
      propID: {
        type: String,
        default: 'chartist-line-chart'
      },
      title: {
        type: String
      },
      options: {
        type: Object,
        default: () => {
          return {
            // Options for X-Axis
            axisX: {
              // The offset of the labels to the chart area
              offset: 30,
              // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
              position: 'end',
              // Allows you to correct label positioning on this axis by positive or negative x and y offset.
              labelOffset: {
                x: 0,
                y: 0
              },
              // If labels should be shown or not
              showLabel: true,
              // If the axis grid should be drawn or not
              showGrid: true,
              // Interpolation function that allows you to intercept the value from the axis label
              labelInterpolationFnc: function(value, index, labels) {
                return moment(value, 'YYY-MM-DD').format('MMM DD')
              },
              // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
              type: Chartist.AutoScaleAxis
            },
            // Options for Y-Axis
            axisY: {
              // The offset of the labels to the chart area
              offset: 40,
              // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
              position: 'start',
              // Allows you to correct label positioning on this axis by positive or negative x and y offset.
              labelOffset: {
                x: 0,
                y: 0
              },
              // If labels should be shown or not
              showLabel: true,
              // If the axis grid should be drawn or not
              showGrid: true,
              // Interpolation function that allows you to intercept the value from the axis label

              // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
              type: Chartist.AutoScaleAxis,
              // This value specifies the minimum height in pixel of the scale steps
              scaleMinSpace: 20,
              // Use only integer values (whole numbers) for the scale steps
              onlyInteger: false
            },
            // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
            width: undefined,
            // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
            height: undefined,
            // If the line should be drawn or not
            showLine: true,
            // If dots should be drawn or not
            showPoint: true,
            // If the line chart should draw an area
            showArea: false,
            // The base for the area chart that will be used to close the area shape (is normally 0)
            areaBase: 0,
            // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
            lineSmooth: true,
            // If the line chart should add a background fill to the .ct-grids group.
            showGridBackground: false,
            // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
            low: undefined,
            // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
            high: undefined,
            // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
            chartPadding: {
              top: 15,
              right: 15,
              bottom: 5,
              left: 10
            },
            // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
            fullWidth: false,
            // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
            reverseData: false,
            // Override the class names that get used to generate the SVG structure of the chart
            classNames: {
              chart: 'ct-chart-line',
              label: 'ct-label',
              labelGroup: 'ct-labels',
              series: 'ct-series',
              line: 'ct-line',
              point: 'ct-point',
              area: 'ct-area',
              grid: 'ct-grid',
              gridGroup: 'ct-grids',
              gridBackground: 'ct-grid-background',
              vertical: 'ct-vertical',
              horizontal: 'ct-horizontal',
              start: 'ct-start',
              end: 'ct-end'
            }
          }
        }
      }
    },
    computed: {
      chartData: function() {
        return new ChartistHelper().lineChartParser(this.dataModel)
      }
    }
  }
</script>

<style>
  .ct-series-a .ct-line {
    stroke: var(--second);
  }
  .ct-series-a .ct-point {
    stroke: var(--fourth);
  }
</style>
