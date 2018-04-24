<template>
  <main class="page">
      <section>
        <h1 class="display-1 mt-5 mb-1">In Memory Blotter Test</h1>
        <p class="body-1 mt-3">
          In laoreet convallis porttitor. Donec vel lacus magna. Suspendisse eu elementum orci. Ut felis ante, lacinia vel placerat eu, cursus ut ante. Aenean eleifend dolor vulputate, interdum lectus a, tristique lorem. Nullam ut felis finibus, consequat sapien nec, consequat quam. In auctor neque felis, at interdum nulla efficitur ut. Integer ultrices ligula at augue sollicitudin, id sollicitudin ligula laoreet. Nullam id massa id arcu venenatis bibendum.
        </p>
      </section>
      <section>
        <v-text-field class="search" label="Search" v-model="search"></v-text-field>
        <v-select class="records-dropdown" v-model="perPage" label="Records per Page" :placeholder="initialPageSize" :items="pageValues"></v-select>
        <v-radio-group class="radio-buttons" v-model="radios">
          <v-radio value="static">
            <span slot="label">Static Content</span>
          </v-radio>
          <v-radio value="change">
            <span slot="label">Random Updates (Add/Remove Rows, Change Cell Content)</span>
          </v-radio>
        </v-radio-group>
      </section>
      <section class='ag-grid' v-if="this.rowData.length > 1">
        <ag-table :gridOptions="gridOptions"></ag-table>
      </section>
  </main>
</template>

<script>

import ProgressIndicator from '@/components/universal/ProgressIndicator.vue'
import PanelHeading from '@/components/universal/PanelHeading.vue'
import AgTable from '@/components/Tables/AgTable.vue'
import randomizeBlotterMixin from '@/mixins/randomizeBlotterMixin.js'

var oneTestRow = [{"account":"NOTANACCOUNT","trader":"Trader3","strategy":"Strategy3","counterparty":"Counterparty2","cid":"701829","ticker":"NYSE:CMG","ric":"SEE","bbg":"XEE","type":"MARKET","orderId":"0","quantity":"272","price":"360.6745928","filled":"0","open":"272","limitPrice":"0","filledPrice":"0","venue":"VEE","gateway":"EBSD_GWY","currency":"USD","side":"BUY","originalOrderId":"114514","rejected":"FALSE","rejectedReason":"","state":"INIT","entryMethod":"PROGRAMMATIC_EMS_API","transactTime":"2016-08-09T17:35:42.777Z","placementTime":"2016-08-09T17:35:42.777Z","emsTime":"2016-08-09T17:35:42.778Z"}]

export default {
  data: function() {
    return {
      perPage: this.initialPageSize,
      pageValues: [20, 50, 100, 250],
      search: '',
      radios: 'static',
      changeAg: false,
      staticAg: true,
      columnDefs: [ { headerName: 'Account', field: 'account', editable: true },
                    { headerName: 'Trader', field: 'trader', editable: true },
                    { headerName: 'Strategy', field: 'strategy', editable: true },
                    { headerName: 'Counterparty', field: 'counterparty',editable: true },
                    { headerName: 'CID', field: 'cid', editable: true, },
                    { headerName: 'Ticker', field: 'ticker', editable: true, },
                    { headerName: 'RIC', field: 'ric', editable: true, },
                    { headerName: 'BBG', field: 'bbg', editable: true, },
                    { headerName: 'Type', field: 'type', editable: true,},
                    { headerName: 'Order ID', field: 'orderId', editable: true, },
                    { headerName: 'Quantity', field: 'quantity', editable: true, },
                    { headerName: 'Price', field: 'price', editable: true, },
                    { headerName: 'Filled', field: 'filled', editable: true, },
                    { headerName: 'Open', field: 'open', editable: true, },
                    { headerName: 'Limit Price', field: 'limitPrice', editable: true, },
                    { headerName: 'Filled Price', field: 'filledPrice', editable: true, },
                    { headerName: 'Venue', field: 'venue', editable: true, },
                    { headerName: 'Gateway', field: 'gateway', editable: true, },
                    { headerName: 'Currency', field: 'currency', editable: true, },
                    { headerName: 'Side', field: 'side', editable: true, },
                    { headerName: 'Original Order ID', field: 'originalOrderId', editable: false, },
                    { headerName: 'Rejected', field: 'rejected', editable: true, },
                    { headerName: 'Rejected Reason', field: 'rejectedReason', editable: true, },
                    { headerName: 'State', field: 'state', editable: true, },
                    { headerName: 'Entry Method', field: 'entryMethod', editable: true, }, // agSelectCellEditor if return to non-enterprise
                    { headerName: 'Transact Time', field: 'transactTime' },
                    { headerName: 'Placement Time', field: 'placementTime' },
                    { headerName: 'Ems Time', field: 'emsTime' }
                  ],
      rowData: [],
      repeatChanges: null
    }
  },
  components: {
    'progress-indicator': ProgressIndicator,
    'panel-heading': PanelHeading,
    'ag-table': AgTable
  },
  computed: {
    gridOptions: function () {
        let gridOptions = {};
        gridOptions.rowHeight = 48;
        gridOptions.rowData = this.rowData;
        gridOptions.columnDefs = this.columnDefs;
        gridOptions.enableFilter = true;
        gridOptions.enableSorting = true;
        // gridOptions.singleClickEdit = true;
        // gridOptions.showToolPanel = true;
        // gridOptions.suppressScrollOnNewData = true;
        gridOptions.pagination = true;
        gridOptions.editType = 'fullRow';
        // gridOptions.paginationAutoPageSize = true;
        // gridOptions.paginationPageSize = this.pages;
        gridOptions.rowBuffer = 100;
        gridOptions.debug = true;
        gridOptions.deltaRowDataMode = true
        // gridOptions.onCellClicked = this.onClicked;
        return gridOptions
    },
    initialPageSize: function(){
      if (this.gridOptions.api) {
        return this.gridOptions.api.paginationGetPageSize().toString()
      } else {
        return "100"
      }
    },
    columnFields: function(){
      return this.columnDefs.map(item=>{return item.field})
    }
  },
  mixins: [randomizeBlotterMixin],
  created() {
    let localThis = this
    this.loadTableData()
  },
  methods: {
    onClicked: function(context) {
      // step one: change it into a text field
      // step two: get node & context
      // step three: change it
    },
    loadTableData: async function(){
      this.rowData = await this.mock10k()
    },
    changeSomeAg: function(){
      let options = [this.addManyRows, this.removeManyRows, this.changeABunch, this.completelyChange]
      if (this.gridOptions.rowData.length > 300000) {
          options = options.slice(1)
      }
      let number = Math.floor(Math.random()*options.length)
      options[number]()
    },
    addManyRows: async function(){
      this.gridOptions.api.updateRowData({add: await this.mock25k()})
      console.log('add 25k rows')
    },
    removeManyRows: function(){
      this.gridOptions.api.updateRowData({remove: this.rowData.slice(0, 10000)})
      console.log('remove 10k rows')
    },
    removeAllRows: function(){
      this.gridOptions.api.selectAll()
      let selectedData = this.gridOptions.api.getSelectedRows();
      this.gridOptions.api.updateRowData({remove: selectedData})
    },
    addAllRows: async function(){
      this.gridOptions.api.updateRowData({add: await this.mock100k()})
    },
    completelyChange: function(){
      this.removeAllRows()
      this.addAllRows()
    },
    changeABunch: function(){
      console.log("change one column's data for 10k rows")
      Array.from(Array(10000).keys()).forEach(item=>{
        this.changeRandomThing(this.gridOptions.rowData)
      })
    },
    getRandomItem: function(array){
      let length = array.length
      return array[Math.floor(Math.random()*length)]
    },
    changeRandomThing: function(array) {
      let item = this.getRandomItem(array)
      let column = this.getRandomItem(this.columnFields)
      item[column] = 'blah blah blah'
    },

  },
  watch: {
    radios: function(data){
      if (data == 'static'){
        this.staticAg = true
        this.changeAg = false
      } else if (data == 'change') {
        this.changeAg = true
        this.staticAg = false
      }
    },
    staticAg: function(data) {
      let localThis = this
      if (data === true) {
        clearInterval(this.repeatChanges)
      }
    },
    changeAg: function(data){
      let localThis = this
      if (data === true) {
        this.repeatChanges = setInterval(function(){
          localThis.changeSomeAg()
        }, 5000)
      }
    },
    search: function(data){
      this.gridOptions.api.setQuickFilter(data)
    },
    perPage: function(data){
      this.gridOptions.api.paginationSetPageSize(parseInt(data))
    },
  },
  beforeDestroy(){
    clearInterval(this.repeatChanges)
  }
}
</script>

<style lang="stylus" scoped>
  .page > section
    grid-column 1 / 13

  section > .search
    grid-column 1 / 3
    grid-row 2 / 3

  section > .records-dropdown
    grid-column 3 / 5
    grid-row 2 / 3

  section > .radio-buttons
    grid-column 7 / 9
    grid-row 2 / 3
    // height 100px
    // margin-bottom 30px

  section.ag-grid
    grid-row 3 / 4
    height 69vh
    margin-bottom 100px
</style>
