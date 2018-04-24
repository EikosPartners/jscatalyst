import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/Modals/IncidentSet.vue'
import moment from 'moment'
import { fixMoment } from '../../support/testingUtils.js'
Vue.use(Vuetify)
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex)

var store;

beforeAll(() => {
  store = new Vuex.Store({
    state: {
      colorTheme: 'blue',
      themeColors: ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"]
    }
  })
})

let fakeProps = {
  "company": "Company-1",
  "asset": "EE089BD09D9ED340"
}
describe('IncidentsSet, default props', () => {
    let wrapper
    beforeEach(() => {
      fixMoment(window)
      // removes Vuetify warning *[Vuetify] Unable to locate target [data-app] in "v-menu"*
      var app = document.createElement('div')
      app.setAttribute('data-app', true)
      document.body.appendChild(app)

      wrapper = mount(Component, {store, localVue})
      fixMoment(wrapper)
        // wrapper = mount(Component, {propsData: fakeProps})
    })

    it('it renders at all', () => {
        expect(wrapper.html()).toContain('Monitoring Incidents for Incident Set')
        expect(wrapper.html()).toContain('<thead><tr><th class="VueTables__sortable "><span title="" class="VueTables__heading">Monitoring Incident Number</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">CI (Asset)</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading"> </span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Submitter</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Reported Date</span><span class="VueTables__sort-icon pull-right fa fa-sort coloredIcon"></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Last Resolved Date</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Priority</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Description</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Detailed Description</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Resolution</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Last Assignee</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Matched Score</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th></tr></thead>')
    })


})



describe('IncidentsSet, default props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {propsData: fakeProps, store, localVue})
    })

    it('it renders at all', () => {
        expect(wrapper.html()).toContain('Company-1 Monitoring Incidents for Incident Set EE089BD09D9ED340')
        expect(wrapper.html()).toContain('<thead><tr><th class="VueTables__sortable "><span title="" class="VueTables__heading">Monitoring Incident Number</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">CI (Asset)</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading"> </span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Submitter</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Reported Date</span><span class="VueTables__sort-icon pull-right fa fa-sort coloredIcon"></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Last Resolved Date</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Priority</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Description</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Detailed Description</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Resolution</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Last Assignee</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th><th class="VueTables__sortable "><span title="" class="VueTables__heading">Matched Score</span><span class="VueTables__sort-icon pull-right fa fa-sort materialIconSort "></span></th></tr></thead>')
    })

})
