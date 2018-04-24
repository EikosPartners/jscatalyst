<template>
  <v-layout row wrap :id='propID'>
     <v-flex xs2>
      <v-menu ref="thisMenu" offset-y open-on-hover :close-on-content-click="false" class="pr-1" max-height="500px">
        <v-btn slot="activator" style="padding-left:5px">
          <span v-if="selectedData">
            {{selectedData}}
          </span>
          <span v-else>
            Data
          </span>
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="data in options" :value="data" @click="selectChartData" v-bind:key="data">
            <v-list-tile-title class="black--text">{{ data }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>

  </v-layout>
</template>

<script>

/** Data Filter component
* @module Data FIlter
*
* @param {Array} options - the options for filtering
* @param {Function} selectData - function called to change the data being shown
* @param {string} propID - the ID for the component
* @param {string} selectedData - the current filter for the data
* @param {string} chart - the name of the chart that this filter corresponds to
*
* @example
* usage on a page:
* <data-filter
*  chart='linePlot'
*  :selectData='selectData'
*  :selectedData='linePlotFilter'
*  propID='dataPicker'
* ></data-filter>>
*
*/

  export default {
    props: {
      options: {
        type: Array,
        default: ()=>{return ['Open', 'Close', 'High', 'Low']}
      },
      selectData: {
        type: Function
      },
      selectedData: {
        type: String
      },
      propID: {
        type: String,
        default: 'dataPickerMenu'
      },
      chart: {
        type: String
      }
    },
    methods: {
      // when an option is clicked get the option that was clicked
      // through the innerText and get the chart name that this filter
      // corresponds to. Create an object and pass that to the selectData prop function
      selectChartData: function(event) {
        var selectObj = {}
        event.target.className.includes('black--text') ? selectObj.data = event.target.innerText : selectObj.data = this.selectedData
        selectObj.chart = this.chart
        this.selectData(selectObj)
      }
    }
  }
</script>

<style lang="css">
</style>
