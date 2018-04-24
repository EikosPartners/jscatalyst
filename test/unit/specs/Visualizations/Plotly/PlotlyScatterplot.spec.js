import Component from '@/components/visualizations/Plotly/PlotlyScatterplot.vue'
import Vue from 'vue'
import { ResizeObserver } from 'vue-resize';
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex)

const data =
[
  {
  "x": [1, 2, 3, 4, 5],
  "y": [1, 6, 3, 6, 1],
  "mode": "markers+text",
  "type": "scatter",
  "name": "Team A",
  "text": ["A-1", "A-2", "A-3", "A-4", "A-5"],
  "textposition": "top center",
  "textfont": {
    "family":  "Raleway, sans-serif"
    },
  "marker": { "size": 12,
    "color": "rgb(9, 35, 105)"
    }
  },

  {
    "x": [1.5, 2.5, 3.5, 4.5, 5.5],
    "y": [4, 1, 7, 1, 4],
    "mode": "markers+text",
    "type": "scatter",
    "name": "Team B",
    "text": ["B-a", "B-b", "B-c", "B-d", "B-e"],
    "textfont" : {
      "family":"Times New Roman"
    },
    "textposition": "bottom center",
    "marker": { "size": 12,
      "color": "rgb(45, 168, 201)"
     }
  }
]
// mock colors because the css stylesheets cannot be loaded into the test environment
var mockBaseColors = jest.fn(() => ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])
var store;

describe('Plotly Scatterplot', () => {

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
      expect(wrapper.html()).toContain('div id="container-plotlyscatterplot"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(2)
    })

})


describe('Plotly Scatterplot, draw SVG', ()=>{
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: data,
                propID: 'plotlyScatterplot'
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
        wrapper.vm.$emit('drawScatterplot')
        expect(wrapper.emitted().drawScatterplot).toBeTruthy()
    })

})


describe('Plotly Scatterplot, snapshot', ()=>{
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
