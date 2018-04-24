import Component from '@/components/visualizations/d3/WorldMap.vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import { ResizeObserver } from 'vue-resize';
import Vuex from 'vuex';
import 'isomorphic-fetch'
const propData = [ {"name":"Afghanistan","alpha-3":"AFG","id":"004","value":0.02},{"name":"Åland Islands","alpha-3":"ALA","id":"248","value":0.02},{"name":"Albania","alpha-3":"ALB","id":"008","value":0.02},{"name":"Algeria","alpha-3":"DZA","id":"012","value":0.06} ]

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

describe('WorldMap, default props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
          attachToDocument: true,
          localVue,
          store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="container-worldmap"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(0)
    })

    it('emits the draw event', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted('draw')).toBeTruthy()
    })
})

describe('WorldMap, custom country props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar',
                colorDomain: [2,4,6,8,10]
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
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(4)
    })


})
