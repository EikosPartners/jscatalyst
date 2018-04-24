<template id='incident-set'>
 <v-card-text height="100%">
   <v-container fluid grid-list-xs grid-list-sm grid-list-md grid-list-lg grid-list-xl>
     <v-layout row wrap>
       <resize-observer @notify="resizeSVG" />
       <v-flex xs12>
        <panel-heading :headerText="uititle"></panel-heading>
        <v-container fluid grid-list-xs grid-list-sm grid-list-md grid-list-lg grid-list-xl >
          <v-layout>
            <v-flex xs12 v-if="volumeData.length > 0">
              <heat-map
              :dataModel="volumeData"
              alertText="Incident"
              propID='dialog-container-heatmap' />
            </v-flex>
            <v-flex xs12 v-else>
                <v-progress-linear color="blue darken-3" :indeterminate="true"></v-progress-linear>
            </v-flex>
        </v-layout>
        </v-container>
      </v-flex>

      <v-flex xs12>
        <panel-heading headerText="Monitoring Incident Hourly Volume By Day" />
        <v-container fluid grid-list-xs grid-list-sm grid-list-md grid-list-lg grid-list-xl >
          <v-layout>
              <v-flex xs12 v-if="hourlyVolumeData.length > 0">
                <punch-card
                :onClick="punchCardClicked"
                :dataModel="hourlyVolumeData"
                alertText="Incident"
                propID='dialog-container-punchcard' />
              </v-flex>
            <v-flex v-else>
              <v-progress-linear color="blue darken-3" :indeterminate="true"></v-progress-linear>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex xs12>
        <panel-heading headerText="Detailed Monitoring Incident Information"></panel-heading>
        <date-filter
          propID="incidentFilter"
          :selectedTime="selectedTime"
          :customTimeRange="true"
          ></date-filter>

        <data-table
          ref='incidenttable'
          :columns="options.columns"
          :options="options"
          name="options.name"
          :action="selectAction"
          :action2="action2"
          isClientSide="true"
          :clientData="tableData"/>
      </v-flex>

  	  </v-layout>
    </v-container>
  </v-card-text>
</template>

<script>
import { tableDataParser } from "@/common/tableDataParser.js";
import formatTimeMixin from '@/mixins/formatTimeMixin.js'
import DataTable from '@/components/Tables/DataTable.vue'
import { ResizeObserver } from "vue-resize";
import DateFilter from '@/components/Tables/DateFilter.vue'
import HeatMap from '@/components/visualizations/d3/HeatMap.vue'
import PanelHeading from '@/components/universal/PanelHeading.vue'
import PunchCard from '@/components/visualizations/d3/PunchCard.vue'

//temp data
import punchCardData from '@/assets/mocks/d3/punchCardMock.json'
import heatMapData from '@/assets/mocks/d3/heatmapMock.json'
import incidentSetTableMock from '@/assets/mocks/incidentSetTableMock.json'

export default {

  mixins: [formatTimeMixin],
  components: {
    'date-filter': DateFilter,
    'resize-observer': ResizeObserver,
    'data-table': DataTable,
    'heat-map': HeatMap,
    'panel-heading': PanelHeading,
    'punch-card': PunchCard,
  },
  props: {
    company: {
      type: String,
      default: ""
    },
    asset: {
      type: String,
      default: ""
    },
    punchCardClicked: {
      type: Function,
      default: () => {}
    },
    action2: {
      type: Function,
      default: () => {}
    }
  },
  created: function() {
    this.getData();
  },
  updated: function(){
  },
  computed: {
    uititle: function() {
      return (
        this.company +
        " Monitoring Incidents for Incident Set " +
        this.asset
      );
    }
  },
  data: function() {
    return {
      name: "MonitoringIncidents",
      tableData: [],
      hourlyVolumeData: [],
      volumeData: [],
      selectedTime: [],
      // options used for the data table
      options: {
        name: "assetData",
        // list of columns in the data
        columns: [
          "incidentnumber",
          "ci",
          "_",
          "submitter",
          "reportdate",
          "lastResolvedDate",
          "priority",
          "description",
          "detailedDescription",
          "resolution",
          "lastassignee",
          "matchedscore"
        ],
        // list of headers for the corresponding column key
        headings: {
          incidentnumber: "Monitoring Incident Number",
          ci: "CI (Asset)",
          submitter: "Submitter",
          reportdate: "Reported Date",
          lastResolvedDate: "Last Resolved Date",
          priority: "Priority",
          description: "Description",
          detailedDescription: "Detailed Description",
          resolution: "Resolution",
          lastassignee: "Last Assignee",
          matchedscore: "Matched Score"
        },
        filterByColumn: false,
        fitlerable: false,
        dateColumns: ["reportdate"],
        orderBy: {
          column: "reportdate",
          ascending: "false"
        },
        sortIcon: {
            is: "materialIconSort",
            base: "fa fa-sort",
            up: "coloredIcon",
            down: "coloredIcon"
        },
        // request function for retrieving table data from an
        // external API, uses axios to fetch data
        requestFunction: data => {
          //
          // let columns = ["incidentnumber", "ci",
          // "_", "submitter", "reportdate", "lastResolvedDate", "priority", "description", "detailedDescription", "resolution", "lastassignee", "matchedscore"]
          //
          // let parsedParams = new helper().requestFormater(columns, data)
          //
          // let requestURL = new helper().alertClusterURL(parsedParams, this.company, this.asset, this.selectedTime, 'reported_date')
          //
          //
          // return axios.get(requestURL, { params: data }).then(response => {
          //   return Promise.resolve(response.data);
          // });
        },
        // response function to format the data from the
        // API request
        responseAdapter: function(response) {
          // let data = [];
          // let parsedData = new tableDataParser().parse(
          //   ["incidentnumber", "ci", "_", "submitter", "reportdate", "lastResolvedDate", "priority", "description", "detailedDescription", "resolution", "lastassignee", "matchedscore"],
          //   response
          // );
          //
          // for (let i = 0; i < parsedData.length; i++) {
          //   data.push(parsedData[i]);
          // }
          // let returnObj = { data: data, count: response.recordsFiltered };
          // return returnObj;
        }
      }
    };
  },
  methods: {
    selectTime: function(event) {
      if (!event.target) {
        this.selectedTime = event
      } else {
        this.selectedTime = this.formatTime(event.target.innerText)
      }
      this.$refs.incidenttable.$refs.dataTableComponentActual.refresh()
    },
    selectAction: function(e){
      this.$root.$emit('ckm-incident-set-action', e)
    },
    resizeSVG: function() {
      this.getData();
    },
    getData: function() {
      this.hourlyVolumeData = punchCardData;
      this.volumeData = heatMapData;
      // formats the sample data for the table
      var data = []
      let parsedData = new tableDataParser().parse(
        ["incidentnumber", "ci", "_", "submitter", "reportdate", "lastResolvedDate", "priority", "description", "detailedDescription", "resolution", "lastassignee", "matchedscore"],
        {data: incidentSetTableMock}
      );
      for (let i = 0; i < parsedData.length; i++) {
        data.push(parsedData[i]);
      }
      this.tableData = data;

      // get heat map and punch card data from external API
      // const localThis = this;
      //
      // if (
      //   this.company === undefined ||
      //   this.company.length === 0
      // )
      //   return;
      // if (
      //   this.asset === undefined ||
      //   this.asset.length === 0
      // )
      //   return;
      //
      // new restAPI().hourlyVolumeByIncidentSet(
      //   data => {
      //     localThis.hourlyVolumeData = data;
      //   },
      //   {
      //     company: this.company,
      //     asset: this.asset
      //   }
      // );
      //
      // new restAPI().alertsByIncidentSet(
      //   data => {
      //     localThis.volumeData = data;
      //   },
      //   {
      //     company: this.company,
      //     asset: this.asset
      //   }
      // );
      //
      // this.$refs.incidenttable.$refs.dataTableComponentActual.refresh();
    },

  },
  watch: {
    asset: function(data) {
      this.getData();
    },
    company: function(data) {
      this.getData();
    }
  }
};
</script>

<style>

</style>
