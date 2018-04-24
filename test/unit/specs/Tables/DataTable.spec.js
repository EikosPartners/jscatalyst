import Vue from 'vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/Tables/DataTable.vue'
import Vuetify from 'vuetify'
import axios from 'axios'
Vue.use(Vuetify)

//We don't have server tables in repo yet, so commenting out these tests for now.

// let fakePropsServer = {
//   columns: [ "incidentset", "ci", "total", "description", "last", "active" ],
//   options: {
//     headings: { incidentset: "Incident Set", ci: "CI (Asset ID)", total: "Total", description: "Sample Description", last: "Last Reported Alert", active: "Active" },
//     filterable: false,
//     dateColumns: [ "last" ],
//     orderBy: { column: "last", ascending: "false" },
//     requestFunction: data => {return axios.get("http://127.0.0.1:2333/dashboards/datatable/alert_overview/AlertCluster/Company-1/All?draw=0&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=true", {params: data}).then(response => { return Promise.resolve(response.data); }) },
//     responseAdapter: response => { return { "data": [{"incidentset": "EE089BD09D9ED340","ci": "SERVER_4","total": 1000,"description": "","last": null,"active": "Yes"}], "count": 1} }
//   },
//   isClientSide: false,
//   name: "alertClusterName",
//   actions: [ { field: "ci" }, { field: "agent" }, { field: "incidentset" } ],
// }

let fakePropsClient = {
  columns: ["agentid","agent","avgacw","avgcallshr","avgHandleTime","callcount","holdtime","utilization"],
  clientData: [
    {agentid: 24, agent: "Agent_4", avgacw: "12m 33s", avgcallshr: "560.00", avgHandleTime: "16m 9s", callcount: "618", holdtime: "-", utilization: "17300%"},
    {agentid: 25, agent: "Agent_5", avgacw: "16m 33s", avgcallshr: "178.00", avgHandleTime: "4m 58s", callcount: "-", holdtime: "60800%", utilization: "-"},
    {agentid: 26, agent: "Agent_6", avgacw: "-", avgcallshr: "892.00", avgHandleTime: "12m 49s", callcount: "-", holdtime: "92300%", utilization: "67200%"}
  ],
  "options": {
    headings: {agentid: "Agent ID", agent: "Name", avgacw: "Avg ACW", avgcallshr: "Avg Calls/Hr", avgHandleTime: "Avg Handle Time", callcount: "Call Count", holdtime: "% Hold Time", utilization: "Utilization"},
    perPage: 10,
    perPageValues: [10, 25, 50, 100],
    sortable: true,
    sortIcon: {is: "materialIconSort", base: "fa fa-lg fa-sort", up: "coloredIcon", down: "coloredIcon"},
    "orderBy": {column: "agentid", ascending: "true"}
  },
  isClientSide: "true",
  name: "teamdatatable",
  actions: [{field: "ci"},{field: "agent"},{field: "incidentset"}
  ]
}

// describe('DataTable, server table', () => {
//     let wrapper
//     beforeEach(() => {
//         wrapper = mount(Component, {propsData: fakePropsServer})
//     })
//
//     it('it renders at all', () => {
//           return Vue.nextTick()
//             .then(function(){
//                 expect(wrapper.html()).toEqual('<div id="tables"><div class="VueTables VueTables--server"><div class="row"><div class="col-md-6"></div><div class="col-md-6"></div></div><div class="table-responsive"><table class="VueTables__table table table-striped table-bordered table-hover"><thead><tr><th class="VueTables__sortable "><span title="" class="VueTables__heading">Incident Set</span><span class="VueTables__sort-icon pull-right glyphicon glyphicon-sort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">CI (Asset ID)</span><span class="VueTables__sort-icon pull-right glyphicon glyphicon-sort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Total</span><span class="VueTables__sort-icon pull-right glyphicon glyphicon-sort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Sample Description</span><span class="VueTables__sort-icon pull-right glyphicon glyphicon-sort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Last Reported Alert</span><span class="VueTables__sort-icon pull-right glyphicon glyphicon-chevron-down"></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Active</span><span class="VueTables__sort-icon pull-right glyphicon glyphicon-sort "></span></th></tr></thead><tbody><tr class="VueTables__no-results"><td colspan="6" class="text-center">Loading...</td></tr></tbody></table></div><div class="VuePagination"><ul class="pagination VuePagination__pagination" style="display: none;"><li class="VuePagination__pagination-item page-item VuePagination__pagination-item-prev-chunk disabled"><a href="javascript:void(0);" class="page-link">&lt;&lt;</a></li><li class="VuePagination__pagination-item page-item VuePagination__pagination-item-prev-page disabled"><a href="javascript:void(0);" class="page-link">&lt;</a></li><li class="VuePagination__pagination-item page-item VuePagination__pagination-item-next-page disabled"><a href="javascript:void(0);" class="page-link">&gt;</a></li><li class="VuePagination__pagination-item page-item VuePagination__pagination-item-next-chunk disabled"><a href="javascript:void(0);" class="page-link">&gt;&gt;</a></li></ul><p class="VuePagination__count" style="display: none;">0 records</p></div></div></div>')
//             })
//
//         // this is showing a No Results table, don't know how to invoke the async call to get the one result table
//     })
//
// })

describe('DataTable, client table', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {propsData: fakePropsClient})
    })

    it('it renders at all', () => {
        expect(wrapper.html()).toContain('<thead><tr><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">Agent ID</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort coloredIcon\"></span></th><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">Name</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort materialIconSort \"></span></th><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">Avg ACW</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort materialIconSort \"></span></th><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">Avg Calls/Hr</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort materialIconSort \"></span></th><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">Avg Handle Time</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort materialIconSort \"></span></th><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">Call Count</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort materialIconSort \"></span></th><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">% Hold Time</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort materialIconSort \"></span></th><th class=\"VueTables__sortable \"><span title=\"\" class=\"VueTables__heading\">Utilization</span><span class=\"VueTables__sort-icon pull-right fa fa-lg fa-sort materialIconSort \"></span></th></tr></thead>')
        expect(wrapper.html()).toContain('<tr class=\"\"><td class=\"\">24</td><td class=\"\">Agent_4</td><td class=\"\">12m 33s</td><td class=\"\">560.00</td><td class=\"\">16m 9s</td><td class=\"\">618</td><td class=\"\">-</td><td class=\"\">17300%</td> </tr><!----><tr class=\"\"><td class=\"\">25</td><td class=\"\">Agent_5</td><td class=\"\">16m 33s</td><td class=\"\">178.00</td><td class=\"\">4m 58s</td><td class=\"\">-</td><td class=\"\">60800%</td><td class=\"\">-</td> </tr>')
    })

})
