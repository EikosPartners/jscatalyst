import Vue from 'vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/Tables/DateFilter.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

let fakeProps = {selectedTime: ["2018-01-01","2018-01-08"]}

describe('DateFilter, default props', () => {
    let wrapper
    beforeEach(() => {
        var app = document.createElement('div')
        app.setAttribute('data-app', true)
        document.body.appendChild(app)
        wrapper = mount(Component)
    })

    it('it renders at all', () => {
        expect(wrapper.html()).toContain('Any Last Reported Alerts')
        expect(wrapper.html()).toContain('arrow_drop_down')
        expect(wrapper.html()).toContain('<div class="menu"')
        expect(wrapper.html()).toContain('<div class="menu__activator">')
        expect(wrapper.html()).toContain('<button type="button" class="btn"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().timeOptions).toHaveLength(5)
    })

})


describe('DateFilter, given props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {propsData: fakeProps})
    })

    it('has the right prop data', () => {
        expect(wrapper.html()).toContain('2018-01-01 to 2018-01-08')
    })

})
