import Component from '@/components/visualizations/Chartjs/ChartjsRadarComp'
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex)
// added to suppress the errors from chartjs lib
global.console.error = function() {}

const data = [
  {
    "Radar1": [
      {
        "value": 15,
        "label": "Scatter Plot"
      },
      {
        "value": 30,
        "label": "Pie"
      },
      {
        "value": 20,
        "label": "Area"
      }
    ]
  },
  {
    "Radar2": [
      {
        "value": 20,
        "label": "Scatter Plot"
      },
      {
        "value": 20,
        "label": "Pie"
      },
      {
        "value": 9,
        "label": "Area"
      }
    ]
  }
]
// mock colors because the css stylesheets cannot be loaded into the test environment
var mockBaseColors = jest.fn(() => ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])
var mockColors = jest.fn(() => ['#351850', '#4F1E71', '#7C388E','#A93B8D', '#BA5288', '#DD7C91', '#F38595', '#EDB7A7'])


var store;

describe('Chartjs Radar Component light theme', () => {
    let wrapper
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          themeMod: {
            colorTheme: 'blue'
          }
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
        expect(wrapper.contains('canvas')).toBe(true)
        expect(wrapper.html()).toContain('<canvas')
    })

    it('has the right prop data', () => {
      expect(wrapper.props()).toHaveProperty('dataModel')
      expect(wrapper.props().dataModel).toHaveLength(2)
    })

    it('has the right options', () => {
      expect(wrapper.vm.options).toHaveProperty('maintainAspectRatio', false)
      expect(wrapper.vm.options).toEqual({maintainAspectRatio: false})
    })

})

describe('Chartjs Radar Component dark theme', () => {
    let wrapper
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          themeMod: {
            colorTheme: 'blue',
            displayTheme: 'dark'
          }
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
        expect(wrapper.contains('canvas')).toBe(true)
        expect(wrapper.html()).toContain('<canvas')
    })

    it('has the right prop data', () => {
      expect(wrapper.props()).toHaveProperty('dataModel')
      expect(wrapper.props().dataModel).toHaveLength(2)
    })

    it('has the right options', () => {
      expect(wrapper.vm.options).toHaveProperty('maintainAspectRatio', false)
      expect(wrapper.vm.options).toHaveProperty('scale')
      expect(wrapper.vm.options.scale).toHaveProperty('angleLines.color', 'lightgrey')
      expect(wrapper.vm.options.scale).toHaveProperty('gridLines.color', 'lightgrey')
      expect(wrapper.vm.options.scale).toHaveProperty('ticks.color', 'lightgrey')
    })

    it('has the right colors', () => {
      expect(wrapper.vm.colors).toHaveLength(8)
      expect(wrapper.vm.colors).toEqual(["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])
    })

})

describe('Chartjs Radar Component different colorTheme', () => {
    let wrapper
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          themeMod: {
            colorTheme: 'pink'
          }
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
           colors: mockColors
         }
      })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('canvas')).toBe(true)
        expect(wrapper.html()).toContain('<canvas')
    })

    it('has the right prop data', () => {
      expect(wrapper.props()).toHaveProperty('dataModel')
      expect(wrapper.props().dataModel).toHaveLength(2)
    })

    it('has the right colors array', () => {
      expect(wrapper.vm.colors).toHaveLength(8)
      expect(wrapper.vm.colors).toEqual(['#351850', '#4F1E71', '#7C388E','#A93B8D', '#BA5288', '#DD7C91', '#F38595', '#EDB7A7'])
    })

})

// describe('Chartjs Radar Comp, snapshot', ()=>{
//     let wrapper

//     beforeEach(() => {
//         wrapper = mount(Component, {
//           propsData: {
//               dataModel: data
//          },
//          attachToDocument: true,
//          store,
//          localVue,
//          computed: {
//            colors: mockBaseColors
//          }
//         })
//     })

//     it('matches snapshot', () => {
//         let renderer = createRenderer()
//         return Vue.nextTick()
//             .then(function(){
//                 renderer.renderToString(wrapper.vm, (err, str) => {
//                   if (err) throw new Error(err)
//                   expect(str).toMatchSnapshot()
//                 })
//             })

//     })

// })
