import Component from '@/components/universal/PanelHeading.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify';
import themePlugin from '@/plugins/themes.js'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  
})

localVue.use(Vuetify);
localVue.use(themePlugin, {store})

describe('PanelHeading', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Component, {
          propsData: {
            headerText:'Example Header',
            titleText: null,
            propID: 'panelheading'
          },
          store, localVue
        })
        console.log(wrapper)
    })

    it('renders with correct props', () => {
        expect(wrapper.find('#panelheading').exists()).toBe(true)
        expect(wrapper.html()).toContain('Example Header')
    })

})
