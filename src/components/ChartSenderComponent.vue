<template>
  <div id='chart-sender'>
    <template v-if='components'>
      <v-select
        :items="components"
        v-model='shareableChart'
        label="Select Single Chart to Share"
        single-line
        bottom
        append-icon='trending_up'
        style="width: 50%;"
      ></v-select>
    </template>
    <template v-else>
      <v-select
        :items="chartList"
        v-model='shareableChart'
        label="Select Single Chart to Share"
        single-line
        bottom
        append-icon='trending_up'
        style="width: 50%;"
      ></v-select>
    </template>
    <div style="display: inline;">
      <v-btn color="primary" @click="submit">Share Chart</v-btn>
      <v-btn color="primary" @click="shareAll">Share Dashboard</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChartSender',
    props: ['components'],
    screenshare: true,
    data: function() {
      return {
        chartList: []
      }
    },
    mounted() {
      this.chartList = this.charts()
    }
  }
</script>

<style lang="css">
</style>
