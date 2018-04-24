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
      ></v-select>
    </template>
    <template v-else>
      <v-select
        :items="charts()"
        v-model='shareableChart'
        label="Select Single Chart to Share"
        single-line
        bottom
        append-icon='trending_up'
      ></v-select>
    </template>
    <div>
      <v-btn color="primary" @click="submit">Share Chart</v-btn>
      <v-btn color="primary" @click="shareAll">Share Dashboard</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['components'],
    screenshare: true
  }
</script>

<style lang="css">
</style>
