import Component from '@/components/visualizations/Plotly/PlotlyBarGraph.vue'
import Vue from 'vue'
import { ResizeObserver } from 'vue-resize';
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex)

const data =
[{
  "x": ["giraffes", "orangutans", "monkeys"],
  "y": [20, 14, 23],
  "name": "SF Zoo",
  "type": "bar",
  "marker": {
    "color": "rgb(9, 35, 105)"
  },
  "hoverinfo": "none"
},
{
  "x": ["giraffes", "orangutans", "monkeys"],
  "y": [12, 18, 29],
  "name": "LA Zoo",
  "type": "bar",
  "marker": {
    "color": "rgb(45, 168, 201)"
  },
  "hoverinfo": "none"
}]
// mock colors because the css stylesheets cannot be loaded into the test environment
var mockBaseColors = jest.fn(() => ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])
var store;

describe('Plotly Bar Graph', () => {

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
      expect(wrapper.html()).toContain('div id="container-barchart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(2)
    })

})


describe('Plotly BarGraph, draw SVG', ()=>{
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: data,
                propID: 'plotlyBarGraph'
           },
           attachToDocument: true,
           store,
           localVue,
           computed: {
             colors: mockBaseColors
           }
        })
        //spy = jest.spyOn(wrapper.vm, 'drawBarPlot')
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
        wrapper.vm.$emit('drawBarPlot')
        expect(wrapper.emitted().drawBarPlot).toBeTruthy()
    })

})


describe('Plotly BarGraph, snapshot', ()=>{
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
