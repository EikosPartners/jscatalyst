import Component from '@/components/visualizations/Plotly/PlotlyBubbleChart.vue'
import Vue from 'vue'
import { ResizeObserver } from 'vue-resize';
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex)

const data =
[
  {"x":[1,2,3,4],
    "y":[10,11,12,13],
    "mode":"markers",
    "marker":{
      "color": ["rgb(93, 193, 208)", "rgb(26, 100, 159)",
               "rgb(9, 35, 105)", "rgb(8, 26, 78)"],
      "size":[40,60,80,100]
    }
  }
]
// mock colors because the css stylesheets cannot be loaded into the test environment
var mockBaseColors = jest.fn(() => ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])
var store;

describe('Plotly Bubble Chart', () => {

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
      expect(wrapper.html()).toContain('div id="container-plotlybubblechart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })

})


describe('Plotly Bubble Chart, draw SVG', ()=>{
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: data,
                propID: 'plotlyBubbleChart'
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
        wrapper.vm.$emit('drawBubbleChart')
        expect(wrapper.emitted().drawBubbleChart).toBeTruthy()
    })

})


describe('Plotly BubbleChart, snapshot', ()=>{
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
