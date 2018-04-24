<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <chartist
      type="Pie"
      :data="chartData"
      :options="options"
      style="height:100%"
      :responsiveOptions="responsiveOptions"
      :id='propID'
      ></chartist>
  </div>
</template>

<script>
  import Chartist from 'vue-chartist';
  import ChartistHelper from '@/common/chartistHelper';
  import moment from 'moment';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Pie Chart Chartist component
  * @module Chartist Pie Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {String} propID - the ID for the component
  * @param {Object} options - an object containing options for configuring the chart
  *
  * @example
  * usage on a page:
  * <chartist-pie-chart
  *  :dataModel='pieChartData'
  * ></chartist-pie-chart>
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
       * @property {Number} value - value of datapoint
       * @property {String} label - label for datapoint
       */
      dataModel: {
        type: Array
      },
      propID: {
        type: String,
        default: 'chartist-pie-chart'
      },
      title: {
        type: String
      },
      options: {
        type: Object,
        default: () => {
          return {
            // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
            width: undefined,
            // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
            height: '100%',
            // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
            chartPadding: 5,
            // Override the class names that are used to generate the SVG structure of the chart
            classNames: {
              chartPie: 'ct-chart-pie',
              chartDonut: 'ct-chart-donut',
              series: 'ct-series',
              slicePie: 'ct-slice-pie',
              sliceDonut: 'ct-slice-donut',
              sliceDonutSolid: 'ct-slice-donut-solid',
              label: 'ct-label'
            },
            // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
            startAngle: 0,
            // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
            total: undefined,
            // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
            donut: false,
            // If specified the donut segments will be drawn as shapes instead of strokes.
            donutSolid: false,
            // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
            // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
            donutWidth: 60,
            // If a label should be shown or not
            showLabel: true,
            // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
            labelOffset: 0,
            // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
            labelPosition: 'inside',
            // An interpolation function for the label value
            labelInterpolationFnc: function(value, index, labels) {
            },
            // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
            labelDirection: 'neutral',
            // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
            reverseData: false,
            // If true empty values will be ignored to avoid drawing unncessary slices and labels
            ignoreEmptyValues: false
          }
        }
      },
      responsiveOptions: {
        type: Array,
        default: () => {
          return [
            ['screen and (min-width: 640px)', {
              chartPadding: 30,
              labelOffset: 100,
              labelDirection: 'explode',
              labelInterpolationFnc: function(value,index) {
                return value;
              }
            }]
          ]
        }
      }
    },
    computed: {
      chartData: function() {
        return new ChartistHelper().pieChartParser(this.dataModel)
      }
    }
  }
</script>

<style>

  .ct-series-a .ct-slice-pie {
    fill: var(--first);
  }
  .ct-series-b .ct-slice-pie {
    fill: var(--second);
  }
  .ct-series-c .ct-slice-pie {
    fill: var(--third);
  }
  .ct-series-d .ct-slice-pie {
    fill: var(--fourth);
  }
  .ct-series-e .ct-slice-pie {
    fill: var(--fifth);
  }
  .ct-series-f .ct-slice-pie {
    fill: var(--sixth);
  }
  .ct-series-g .ct-slice-pie {
    fill: var(--seventh);
  }
  .ct-series-h .ct-slice-pie {
    fill: var(--eighth);
  }
  .ct-label {
    font-size: 14px;
  }

</style>
