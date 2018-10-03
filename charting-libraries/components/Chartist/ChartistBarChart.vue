<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartist
      type="Bar"
      :data="chartData"
      :options="options"
      style="height:100%"
      :id='propID'
      ></chartist>
  </div>
</template>

<script>
  import ChartistHelper from '@/common/chartistHelper';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Bar Chart Chartist component
  * @module Chartist Bar Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {String} propID - the ID for the component
  * @param {Object} options - an object containing options for configuring the chart
  *
  * @example
  * usage on a page:
  * <chartist-bar-chart
  *  :dataModel='barChartData'
  * ></chartist-bar-chart>
  *
  */

  export default {
    name:'ChartistBarChart',
    components: {
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
        type: Array
      },
      propID: {
        type: String,
        default: 'chartist-bar-chart'
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
                return value
              },
              // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
              type: undefined
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
              type: undefined,
              // This value specifies the minimum height in pixel of the scale steps
              scaleMinSpace: 20,
              // Use only integer values (whole numbers) for the scale steps
              onlyInteger: false
            },
            // Specify the distance in pixel of bars in a group
            seriesBarDistance: 15,
            // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
            stackBars: false,
            // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
            // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
            stackMode: 'accumulate',
            // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
            horizontalBars: false,
            // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
            distributeSeries: false,
            // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
            reverseData: false,
            // If the bar chart should add a background fill to the .ct-grids group.
            showGridBackground: false,
            // Override the class names that get used to generate the SVG structure of the chart
            classNames: {
              chart: 'ct-chart-bar',
              horizontalBars: 'ct-horizontal-bars',
              label: 'ct-label',
              labelGroup: 'ct-labels',
              series: 'ct-series',
              bar: 'ct-bar',
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
        return new ChartistHelper().barChartParser(this.dataModel)
      }
    }
  }
</script>

<style>
.ct-series-a .ct-bar {
  stroke: var(--third);
  stroke-width: 30px;
}
</style>
