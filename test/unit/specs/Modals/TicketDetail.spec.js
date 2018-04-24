import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/Modals/TicketDetail.vue'
Vue.use(Vuetify)

let fakeProps = {
  rowProps: {
    "Category": "tier_1_cat_1 - tier_2_cat_3 - tier_3_cat_2",
    "Agent": "Agent_6",
    "Incident": "INC100641",
    "Priority": "Priority_2",
    "Escalation": "Yes",
    "First Call Duration": "16m 49s",
    "Description": "",
    "Date Reported": "Tue, Nov 01, 2016 20:46 PM UTC"
  }
}
describe('TicketDetail, default props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component)
    })

    it('it renders at all', () => {
        expect(wrapper.html()).toEqual('<div class="card" style="height: auto;"><div class="card__title" style="display: flex;"><span class="title" style="margin-top: 2px;">Ticket Detail</span> <button type="button" class="btn btn--flat btn--floating btn--small black--text" title="Close"><div class="btn__content"><i aria-hidden="true" class="icon material-icons" style="font-size: 28px;">close</i></div></button></div> <div class="card__text pt-0"></div></div>')
    })


})


describe('TicketDetail, given props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {propsData: fakeProps})
    })

    it('it renders at all', () => {
        expect(wrapper.html()).toContain('<ul class="list"><div class="list__tile__title">Category</div> <div class="list__tile__content">tier_1_cat_1 - tier_2_cat_3 - tier_3_cat_2</div></ul>')
        expect(wrapper.html()).toContain('<div class="list__tile__content"></div></ul><ul class="list"><div class="list__tile__title">Date Reported</div> <div class="list__tile__content">Tue, Nov 01, 2016 20:46 PM UTC</div></ul></div></div>')
    })


})
