<template>
  <v-card-text style="padding-top:5px;width=75%" height="100%">
    <v-flex xs12>
        <panel-heading
          :downloadURL="downloadURL"
          :headerText="uititle"
        ></panel-heading>
        <date-filter
          propID="punchFilter"
          :selectTime="selectTime"
          :selectedTime="selectedTime"
          :customTimeRange="true"
        ></date-filter>
        <data-table
          style="overflow-x: scroll!important"
          ref='punchtable'
          :columns="options.columns"
          :options="options"
          :action2="action2"
          :name="name"
          :action="action"
          isClientSide="true"
          :clientData="tableData"/>
      </v-flex>
  </v-card-text>
</template>

<script>
// import axios from "axios";
// import { restAPI } from "@/common/restAPI.js";
import { tableDataParser } from "@/common/tableDataParser.js";
import { referenceData } from "@/common/referenceData.js";
import formatTimeMixin from '@/mixins/formatTimeMixin.js'
import DateFilter from '@/components/Tables/DateFilter.vue'
import DataTable from '@/components/Tables/DataTable.vue'
import PanelHeading from '@/components/universal/PanelHeading.vue'

export default {
  components: {
    'date-filter': DateFilter,
    'data-table': DataTable,
    'panel-heading': PanelHeading,
  },
  mixins: [formatTimeMixin],
  props: {
    type: {
      type: String
    },
    day: {
      type: Number
    },
    hour: {
      type: Number
    },
    title: {
      type: String
    },
    action: {
      type: Function
    },
    company: {
      type: String,
      default: "Sample Company"
    },
    downloadURL: {
      type: String
    },
    actions: {
      type: Array
    },
    action2: {
      type: Function
    },
  },
  data: function() {
    return {
      selectedTime: [],
      hourlyVolumeData: [],
      volumeData: [],
      tableData: [
        ["INC100972", "SERVER_4", "EE089BD09D9ED340", "Agent_7", "Mon, Jan 04, 2016 02:43 AM UTC", "Tue, Sep 13, 2016 10:37 AM UTC", "Priority_3", "", "", "", "", 1, "No"],
        ["INC100568", "SERVER_4", "EE089BD09D9ED340", "Agent_9", "Mon, Jan 04, 2016 02:14 PM UTC", "Mon, Jun 27, 2016 18:01 PM UTC", "Priority_2", "", "", "", "", 1, "No"],
        ["INC100021", "SERVER_4", "EE089BD09D9ED340", "Agent_2", "Mon, Jan 04, 2016 02:24 PM UTC", "Thu, Sep 07, 2017 05:29 AM UTC", "Priority_1", "", "", "", "", 1, "No"]
      ],
      name: "punchcardData",
      options: {
        columns: [
          "incidentnumber",
          "ci",
          "incidentset",
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
        headings: {
          incidentnumber: "Monitoring Incident Number",
          ci: "CI (Asset ID)",
          incidentset: "Incident Set",
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
        filterable: true,
        dateColumns: ["reportdate"],
        orderBy: {
          column: "reportdate",
          ascending: "false"
        },
        sortIcon: {is: 'materialIconSort', base: 'fa fa-sort', up: 'coloredIcon', down: 'coloredIcon'},
        // requestFunction: data => {
        //   let columns = ["incidentnumber", "ci", "incidentset", "submitter", "reportdate", "lastResolvedDate", "priority", "description", "detailedDescription", "resolution", "lastassignee", "matchedscore"]
        //   let parsedParams = new helper().requestFormater(columns, data)
        //
        //   let requestURL = new helper().alertPunchURL(parsedParams, this.company, this.getTag(), this.selectedTime, 'reported_date')
        //
        //   return axios.get(requestURL, { params: data }).then(response => {
        //     return Promise.resolve(response.data);
        //   });
        // },
        // responseAdapter: function(response) {
        //   let data = [];
        //   let parsedData = new tableDataParser().parse(
        //     [
        //   "incidentnumber", "ci", "incidentset", "submitter", "reportdate", "lastResolvedDate", "priority", "description", "detailedDescription", "resolution", "lastassignee", "matchedscore"],  response
        //   );
        //   for (let i = 0; i < parsedData.length; i++) {
        //     data.push(parsedData[i]);
        //   }
        //   let returnObj = { data: data, count: response.recordsFiltered };
        //   return returnObj;
        // }
      }
    };
  },
  computed: {
    uititle: function() {
      const result = new referenceData().getDays().filter(d => {
        return d.value == this.day;
      });

      if (result.length > 0 && this.hour >= 0)
        return (
          this.company +
          " Monitoring Incidents on " +
          result[0].description +
          " at " +
          this.getHour(this.hour)
        );
      else if (result.length > 0)
        return (
          this.company +
          " Monitoring Incidents on " +
          result[0].description
        );
      else if (result.length == 0 && this.hour >= 0)
        return (
          this.company +
          " Monitoring Incidents at " +
          this.getHour(this.hour)
        );
      else
      return this.company + " Monitoring Incidents";
    }
  },
  updated: function() {

  },
  methods: {
    selectTime: function(event) {
      if (!event.target) {
        this.selectedTime = event
      } else {
        this.selectedTime = this.formatTime(event.target.innerText)
      }
      this.$refs.punchtable.$refs.dataTableComponentActual.refresh()
    },
    getHour: function(hour) {
      if (hour == 0) {
          return '12 AM UTC'
      } else if ( hour < 12 ){
          return hour + ' AM UTC'
      } else if ( hour == 12 ){
          return hour + ' PM UTC'
      } else {
        return (hour-12) + ' PM UTC'
      }
    },

    getTag: function() {
      if (this.type === "point")
        return "/None/None/All/" + this.day + "/" + this.hour;
      else if (this.type === "hour") return "/None/None/All/None/" + this.hour;
      else if (this.type === "day") return "/None/None/All/" + this.day + "/-1";

      // Default
      return "/None/None/All/0/0";
    },
    refresh() {
      // this.$refs.punchtable.$refs.dataTableComponentActual.refresh();
    },
  },
  watch: {
    hour: function(value) {
      this.refresh();
    },
    company: function(data) {
    }
  },
  created() {
    var final = this.tableData.map(el => {
      var obj = {}
      el.map((val, i) => {
        var key = this.options.columns[i]
        obj[key] = val
      })
      return obj
    })
    this.tableData = final
  }
};
</script>

<style>

</style>
