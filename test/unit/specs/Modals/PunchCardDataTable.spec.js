import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/Modals/PunchCardDataTable.vue'
Vue.use(Vuetify)

let fakeProps = {
  type: "point", day: 5, hour: 12, company: "Company-1", downloadURL: "http://127.0.0.1:5000/dashboards/api/alerts/alerts_download/?company__name=Company-1&reported_date__hour=12&reported_date__week_day=5", actions: [{"title": "Download to Excel", "icon": "file_download"},{"title": "Do something else", "icon": "vertical_align_top"}],
  action: () => {console.log("action")}, action2: () => {console.log("action2")}
}
describe('PunchCardDataTable', () => {
    let wrapper
    beforeEach(() => {
      // code to remove warning message *[Vuetify] Unable to locate target [data-app] in "v-menu"*
      var app = document.createElement('div')
      app.setAttribute('data-app', true)
      document.body.appendChild(app)
      // attach to DOM to remove warning
      wrapper = mount(Component, {propsData: fakeProps, attachToDocument: true})
    })

    it('it renders at all', () => {
        // expect(wrapper.html()).toContain('<a href="http://127.0.0.1:5000/dashboards/api/alerts/alerts_download/?company__name=Company-1&amp;reported_date__hour=12&amp;reported_date__week_day=5" target="blank" id="downloadExcel" title="Download to Excel" style="float: right;"><i aria-hidden="true" class="material-icons icon">file_download</i></a></span></div></span>')
        expect(wrapper.html()).toContain('<th class="VueTables__sortable "><span title="" class="VueTables__heading">Reported Date</span><span class="VueTables__sort-icon pull-right fa fa-sort coloredIcon"></span>')
    })

    it('does a method', () => {
        expect(wrapper.vm.getTag()).toEqual('/None/None/All/5/12')
        expect(wrapper.vm.getHour(fakeProps.hour)).toEqual('12 PM UTC')
    })
})
