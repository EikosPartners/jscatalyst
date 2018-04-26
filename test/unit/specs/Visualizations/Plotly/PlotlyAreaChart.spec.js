import Component from '@/components/visualizations/Plotly/PlotlyAreaChart.vue'
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
    "x":[1,2,3,4],
    "y":[0,2,3,5],
    "fill": "tonexty",
    "line":{"color": "rgb(93, 193, 208)"},
    "type":"scatter"
  },
  {
    "x":[1,2,3,4],
    "y":[3,5,1,7],
    "fill": "tonexty",
    "line":{"color": "rgb(8, 26, 78)"},
    "type":"scatter"
  }
]
// mock colors because the css stylesheets cannot be loaded into the test environment
var mockBaseColors = jest.fn(() => ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])
var mockColors = jest.fn(() => ['#351850', '#4F1E71', '#7C388E','#A93B8D', '#BA5288', '#DD7C91', '#F38595', '#EDB7A7'])

var store;

describe('Plotly Area Chart', () => {

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
      expect(wrapper.html()).toContain('div id="container-plotlyareachart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(2)
    })

})


describe('Plotly Area Chart, draw SVG', ()=>{
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

    it('renders the SVG components', ()=>{
      // console.log(wrapper.html())
        expect(wrapper.html()).toContain('<g class="bglayer">')
        expect(wrapper.html()).toContain('<g class="x">')
        expect(wrapper.html()).toContain('<g class="y">')
    })

    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawAreaChart')
        expect(wrapper.emitted().drawAreaChart).toBeTruthy()
    })

})


describe('Plotly Area Chart, snapshot', ()=>{
    let wrapper

    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          colorTheme: 'blue'
        }
      })
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
