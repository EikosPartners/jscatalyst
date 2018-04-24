import Component from '@/components/universal/PanelHeading.vue'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify';
Vue.use(Vuetify);

describe('PanelHeading', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Component, {
          propsData: {
            headerText:'Example Header',
            dataModel: null,
            propID: 'panelheading'
          }
        })
    })

    it('renders with correct props', () => {
        expect(wrapper.find('#panelheading').exists()).toBe(true)
        expect(wrapper.html()).toContain('Example Header')
    })

})
