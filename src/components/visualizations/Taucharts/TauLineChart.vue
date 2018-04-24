<template>
  <div style="width:100%;height:100%">
      <div :id="propID" style="width:100%;height:100%"/>
  </div>

</template>

<script>
  import tauCharts from 'taucharts'
  import moment from 'moment'
  export default {
    props: {
      dataModel: {
        type: Array
      },
      type: {
        type: String,
        default: 'type'
      },
      propID: {
        type: String,
        default: 'tauline'
      }
    },
    methods: {
      draw: function() {
        var chart = new tauCharts.Chart({
          data: this.dataModel,
          dimensions: {
            date: {
              type: 'measure',
              scale: 'time'
            },
            value: {
              type: 'measure'
            }
          },
          type: 'line',
          x: 'date',
          y: 'value',
          color: this.type
        })
        chart.renderTo(`#${this.propID}`)
      }
    },
    mounted() {
      this.draw()
    }
  }
</script>

<style>
</style>
