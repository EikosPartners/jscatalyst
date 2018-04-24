import Component from '@/components/Visualizations/d3/HorizonChart.vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import AAPL from '@/assets/mocks/stockData/AAPL.json'
const propData = {stockData: AAPL}
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex)

var store;

beforeAll(() => {
  store = new Vuex.Store({
    state: {
      colorTheme: 'blue-theme',
      themeColors: ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"]
    }
  })
})

describe('Horizon Chart', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
          attachToDocument: true,
          localVue,
          store
        })
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('id="container-horizonchart"')
    })

})

describe('Horizon Chart, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar'
           },
           attachToDocument: true,
           localVue,
           store
        })
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar"')
        expect(wrapper.html()).toContain('<g class="horizon"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveProperty('stockData')
    })

})
