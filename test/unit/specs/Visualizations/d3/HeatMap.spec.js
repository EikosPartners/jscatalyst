import Component from '@/components/visualizations/d3/HeatMap.vue'
import { mount, createLocalVue } from '@vue/test-utils'
const propData = [ { date: '2017-11-23', volume: 7 }, { date: '2017-11-22', volume: 2 }, { date: '2017-11-21', volume: 4 }, { date: '2017-11-20', volume: 1 }, { date: '2017-11-19', volume: 1 }, { date: '2017-11-18', volume: 1 }, { date: '2017-11-17', volume: 1 }, { date: '2017-11-16', volume: 1 }, { date: '2017-11-15', volume: 2 }, { date: '2017-11-14', volume: 0 } ]
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

describe('HeatMap', () => {
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
        expect(wrapper.html()).toContain('id="heatMap"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(4)
    })

})

describe('HeatMap, custom props', () => {
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

    it('renders the SVG component on manual draw', ()=>{
        wrapper.vm.$emit('draw', propData, '#foobar')
        expect(wrapper.emitted().draw).toBeTruthy()
        expect(wrapper.html()).toContain('<svg width="100%"')
        expect(wrapper.html()).toContain('<path class="month"')
        expect(wrapper.html()).toContain('<rect stroke-width=".5" class="day"')
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(10)
    })

})
