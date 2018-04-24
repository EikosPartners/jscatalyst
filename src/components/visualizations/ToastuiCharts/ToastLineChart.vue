<template>
  <div style="width:100%;height:100%; ">
      <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  var chart = require('tui-chart')
  import $ from 'jquery'
  import moment from 'moment'
  export default {
    props: {
      dataModel: {
        type: Array
      },
      propID: {
        type: String,
        default: 'tui-linechart'
      },
      label: {
        type: String
      }
    },
    mounted() {
      this.draw()
    },
    methods: {
      draw: function() {
        var data = this.dataModel.slice().sort((a,b) => {
          return moment(a.date,'YYYY-M-D') - moment(b.date,'YYYY-M-D')
        })
        /*categories array of x axis values */
        /* series array of objects, each object is a line data with name key and data key with array*/
        var categories = data.map(el => el.date)
        var series = [{name:this.label, data: data.map(el => el.value)}]
        var chartData = {categories, series}
        var options = {
          chart: {
              width: 600,
              height: 400,
              title: '24-hr Average Temperature'
          },
          yAxis: {
              title: 'Temperature (Celsius)',
              pointOnColumn: true
          },
          xAxis: {
              title: 'Month',
              type: 'datetime',
              dateFormat: 'M/D'
          },
          series: {
              showDot: false,
              zoomable: true
          },
          tooltip: {
              suffix: '°C'
          }
        };
        var container = document.getElementById(this.propID)
        var theme = {
          series: {
              colors: [
                  '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
                  '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
              ]
          }
        };

        // For apply theme

        chart.registerTheme('myTheme', theme);
        options.theme = 'myTheme';

        var tchart = chart.lineChart(container, chartData, options);
      }
    }
  }
</script>

<style lang="css">
</style>
