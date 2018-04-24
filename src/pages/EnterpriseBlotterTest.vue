<template>
  <main class="page">
    <!-- <v-btn-toggle v-model="selectedSource">
      <v-btn @click="createMongoDataSource('trades/local/paginate')">Local</v-btn>
      <v-btn @click="createMongoDataSource('trades/mongo/paginate')">Mongo</v-btn>
      <v-btn @click="createMongoDataSource('trades/mongo/paginate2')">Mongo2</v-btn>
      <v-btn @click="createMongoDataSource('trades/postgres/paginate')">Postgres</v-btn>
    </v-btn-toggle> -->
    <section>
      <h1 class="display-1 mt-5 mb-1">Enterprise Client</h1>
      <p class="body-1 mt-3">
        In laoreet convallis porttitor. Donec vel lacus magna. Suspendisse eu elementum orci. Ut felis ante, lacinia vel placerat eu, cursus ut ante. Aenean eleifend dolor vulputate, interdum lectus a, tristique lorem. Nullam ut felis finibus, consequat sapien nec, consequat quam. In auctor neque felis, at interdum nulla efficitur ut. Integer ultrices ligula at augue sollicitudin, id sollicitudin ligula laoreet. Nullam id massa id arcu venenatis bibendum.
      </p>
    </section>
    <section class='enterprise-table'>
      <ag-table :gridOptions="gridOptions"></ag-table>
    </section>
  </main>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import PanelHeading from '@/components/universal/PanelHeading.vue'
//base Ag-Grid stuff
import AgTable from '@/components/Tables/AgTable.vue'
import "ag-grid-enterprise/main";

// cell editor framework components - does not work as .vue single-file component
import NumericEditorComponent from '@/components/Tables/NumericEditorComponent.js'
import ValidationEditorComponent from '@/components/Tables/ValidationEditorComponent.js'

// server-side data functions (sort, filter)
import EnterpriseDataSource from '@/components/Tables/EnterpriseDataSource.js'
import JSONDataSource from '@/components/Tables/JSONDataSource.js'
import LocalDataSource from '@/components/Tables/LocalDataSource.js'
import MongoDataSource from '@/components/Tables/MongoDataSource.js'
//mixins
// import {randomizeBlotterMixin} from '../mixins.js'


export default {
  data: function() {
    return {
      selectedSource: 0,
      perPage: this.initialPageSize,
      pageValues: [25, 50, 100, 250, 500, 1000],
      // search: '',
      columnDefs: [ { headerName: 'Row #', field: 'id', suppressFilter: true, editable: false, width: 100},
                    { headerName: 'Account', field: 'account', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest , width: 100 },
                    { headerName: 'Trader', field: 'trader', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest, width: 100},
                    { headerName: 'Strategy', field: 'strategy', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest, width: 100 },
                    { headerName: 'Counterparty', field: 'counterparty', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest, width: 150 },
                    { headerName: 'CID', field: 'cid', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent },
                    { headerName: 'Ticker', field: 'ticker', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest, width: 150 },
                    { headerName: 'RIC', field: 'ric', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: ValidationEditorComponent, width: 55 },
                    { headerName: 'BBG', field: 'bbg', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: ValidationEditorComponent, width: 55 },
                    { headerName: 'Type', field: 'type', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, width: 150 }, // dropdown
                    { headerName: 'Order ID', field: 'orderId', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent, width: 100 },
                    { headerName: 'Quantity', field: 'quantity', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent, width: 100 },
                    { headerName: 'Price', field: 'price', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent, width: 150 },
                    { headerName: 'Filled', field: 'filled', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent, width: 100 },
                    { headerName: 'Open', field: 'open', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent, width: 100 },
                    { headerName: 'Limit Price', field: 'limitPrice', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent, width: 150  },
                    { headerName: 'Filled Price', field: 'filledPrice', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent, width: 150  },
                    { headerName: 'Venue', field: 'venue', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest, width: 75 },
                    { headerName: 'Gateway', field: 'gateway', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'Currency', field: 'currency', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest, width: 100 },
                    { headerName: 'Side', field: 'side', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['BUY', 'SELL']}, onCellValueChanged: this.submitChangeToRest, width: 55 },
                    { headerName: 'Original Order ID', field: 'originalOrderId', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: false, width: 150 },
                    { headerName: 'Rejected', field: 'rejected', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['FALSE', 'TRUE']}, onCellValueChanged: this.submitChangeToRest, width: 100 },
                    { headerName: 'Rejected Reason', field: 'rejectedReason', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'State', field: 'state', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['CANCELLED', 'FILLED', 'INIT', 'NEW', 'PART_FILLED', 'REJECTED']}, onCellValueChanged: this.submitChangeToRest, width: 155},  // dropdown
                    { headerName: 'Entry Method', field: 'entryMethod', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['INTERACTIVE_CLIENT', 'PROGRAMATIC_EMS_API']}, onCellValueChanged: this.submitChangeToRest }, // dropdown
                    { headerName: 'Transact Time', field: 'transactTime', suppressFilter: true },
                    { headerName: 'Placement Time', field: 'placementTime', suppressFilter: true },
                    { headerName: 'Ems Time', field: 'emsTime', suppressFilter: true }
                  ],
        rowData: [],
        dataSource: null
    }
  },
  components: {
    'panel-heading': PanelHeading,
    'ag-table': AgTable
  },
  computed: {
    gridEndpoint: function(){
      return this.$store.state.gridEndpoint
    },
    gridOptions: function () {
        let gridOptions = {};
        // gridOptions.floatingFilter = true;
        gridOptions.debug = true;
        gridOptions.rowHeight = 48;
        gridOptions.columnDefs = this.columnDefs;
        gridOptions.enableFilter = true;
        gridOptions.enableSorting = true;
        gridOptions.singleClickEdit = false;
        // gridOptions.showToolPanel = true;
        gridOptions.suppressScrollOnNewData = true;
        // gridOptions.pagination = true;

        gridOptions.rowModelType = 'enterprise';
        // gridOptions.editType = 'fullRow'; // cannot have both 'fullRow' and select based cell edits
        gridOptions.enableServerSideSorting = true;
        gridOptions.enableServerSideFilter = true;
        // gridOptions.rowModelType = 'infinite';
        gridOptions.rowBuffer = 100;
        gridOptions.debug = true;
        gridOptions.deltaRowDataMode = true
        // gridOptions.onCellClicked = this.onClicked;
        // gridOptions.infiniteInitialRowCount = true;
        return gridOptions
    },
    initialPageSize: function(){
      if (this.gridOptions.api) {
        return this.gridOptions.api.paginationGetPageSize().toString()
      } else {
        return "100"
      }
    },
  },
  created() {

  },
  mounted(){
    axios.get(this.gridEndpoint).then(response => {
      this.createEnterpriseDataSource(response.data);
    });
    // this.createMongoDataSource('/trades/local/paginate')
  },
  methods: {
    createDataSource(data) {
      let dataSource = new LocalDataSource(data);
      this.gridOptions.api.setEnterpriseDatasource(dataSource);
    },
    createEnterpriseDataSource: function(data){
      let dataSource = new EnterpriseDataSource(data)
      this.gridOptions.api.setEnterpriseDatasource(dataSource)
    },
    createMongoDataSource: function(url) {
      let dataSource = new MongoDataSource(url)
      this.gridOptions.api.setEnterpriseDatasource(dataSource)
    },
    createJSONdataSource: function(url) {
      let dataSource = new JSONDataSource(url)
      this.gridOptions.api.setEnterpriseDatasource(dataSource)
    },
    submitChangeToRest: function(params){
        let data = {},
         colID = params.column.colId.toString(),
         rowID = params.node.id,
         config = {headers: {'Content-Type': 'application/json'}};
        data[colID] = params.newValue;
        axios.patch(this.gridEndpoint + rowID, data, config)
    },

  },

}


</script>

<style lang="stylus" scoped>
  .page > section
    grid-column 1 / 13

  .page-description
    grid-row 2 / 3

  /* .wrapper-enterprise {
    display: grid;
    grid-row-gap: 70px;
    grid-column-gap: 20px;
    grid-template-columns: repeat(12, 1fr);
    margin: 20px;
  } */

  // .table-area {
  //   grid-column: 1 / 13;
  // }

  .enterprise-table {
    height: 85vh;
  }
</style>
