import Component from '@/components/visualizations/Plotly/PlotlyDonutChart.vue'
import Vue from 'vue'
import { ResizeObserver } from 'vue-resize';
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex)

const data =
[
  {
    "values":[16,15,12,6,5,4,42],
    "labels":["US","China","European Union","Russian Federation","Brazil","India","Rest of World"],
    "domain":{"x":[0,0.48]},
    "name":"GHG Emissions",
    "marker": {
      "colors": ["#081A4E", "#092369", "#081A4E", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"]
    },
    "hoverinfo":"label+percent+name",
    "hole":0.4,
    "type":"pie"
  },
  {
    "values":[27,11,25,8,1,3,25],
    "labels":["US","China","European Union","Russian Federation","Brazil","India","Rest of World"],
    "text":"CO2",
    "textposition":"inside",
    "domain":{"x":[0.52,1]},
    "name":"CO2 Emissions",
    "marker": {
      "colors": ["#081A4E", "#092369", "#081A4E", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"]
    },
    "hoverinfo":"label+percent+name",
    "hole":0.4,
    "type":"pie"
  }
]
// mock colors because the css stylesheets cannot be loaded into the test environment
var mockBaseColors = jest.fn(() => ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])
var store;

describe('Plotly Donut Chart', () => {

    let wrapper
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          colorTheme: 'blue'
        }
      })
      wrapper = mount(Component, {
          propsData: {
              dataModel: data
         },
         attachToDocument: true,
         store,
         localVue,
         computed: {
           colors: mockBaseColors
         }
      })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
      // console.log(wrapper.html())
      expect(wrapper.contains('div')).toBe(true)
      expect(wrapper.contains(ResizeObserver)).toBe(true)
      expect(wrapper.html()).toContain('div id="container-plotlydonutchart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(2)
    })

})


describe('Plotly Donut Chart, draw SVG', ()=>{
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: data,
                propID: 'plotlyDonutChart'
           },
           attachToDocument: true,
           store,
           localVue,
           computed: {
             colors: mockBaseColors
           }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('renders the SVG components', ()=>{
      // console.log(wrapper.html())
        expect(wrapper.html()).toContain('<g class="bglayer">')
        expect(wrapper.html()).toContain('<g class="slice">')
        expect(wrapper.html()).toContain('class="surface"')
    })

    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawDonutChart')
        expect(wrapper.emitted().drawDonutChart).toBeTruthy()
    })

})


describe('Plotly DonutChart, snapshot', ()=>{
    let wrapper

    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: data,
                propID: 'foobar'
           },
           attachToDocument: true,
           store,
           localVue,
           computed: {
             colors: mockBaseColors
           }
        })
    })

    it('matches snapshot', ()=>{
        let renderer = createRenderer()
        return Vue.nextTick()
            .then(function(){
                renderer.renderToString(wrapper.vm, (err, str) => {
                  if (err) throw new Error(err)
                  expect(str).toMatchSnapshot()
                })
            })

    })

})
