import Component from '@/components/Visualizations/d3/USMap.vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import { ResizeObserver } from 'vue-resize';
import Vuex from 'vuex'
import 'isomorphic-fetch'
const countyPropData = [ {"id":"01001","value":0.097}, {"id":"01003","value":0.091}, {"id":"01005","value":0.134}, {"id":"01007","value":0.121}, {"id":"01009","value":0.099}, {"id":"01011","value":0.164}, {"id":"01013","value":0.167}, {"id":"01015","value":0.108} ]
const statePropData = [{ "state": "Alabama", "value":0.079, "id": "01"}, {"state": "Alaska","value":0.014,"id": "02"}, {"state": "Arkansas","value": 0.147,"id": "05"}, {"state": "Arizona","value": 0.134,"id": "04"}]

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

describe('USMap, default props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
          localVue,
          store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="container-usmap"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(0)
    })

    it('emits the draw event', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted('draw')).toBeTruthy()
    })
})

describe('USMap, custom county props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: countyPropData,
                propID: 'foobar'
           },
           attachToDocument: true,
           localVue,
           store
        })

    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all, with SVG', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar"')
        expect(wrapper.html()).toContain('<g class="key"')
        // expect(wrapper.html()).toContain('<g class="counties"')
        // expect(wrapper.html()).toContain('<path class="state-boundaries"')
    })


    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(8)
    })


})

describe('USMap, custom state props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: statePropData,
                propID: 'foobar'
           },
           attachToDocument: true,
           localVue,
           store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all, with SVG', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar"')
        expect(wrapper.html()).toContain('<g class="key"')
        // expect(wrapper.html()).toContain('<g class="states"')
        // expect(wrapper.html()).toContain('<path class="state-borders"')
    })


    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(4)
    })


})
