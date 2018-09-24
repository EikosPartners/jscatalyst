import Component from '@/components/visualizations/d3/PieChart.vue'
import { mount, createLocalVue } from '@vue/test-utils'
const propData = [{label: 'test 1', value: 10}, {label: 'test 7', value: 30}, {label: 'test 2', value: 20}, {label: 'test 3', value: 10}, {label: 'test 4', value: 10}, {label: 'test 5', value: 10}, {label: 'test 6', value: 10}]
import themePlugin from '@/plugins/themes.js'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(Vuex)
var store;
// localVue.use(Vuetify);
localVue.use(Vuex)

var mockBaseColors = jest.fn(() => ["#081A4E", "#092369", "#1A649F", "#2485B4", "#2DA8C9", "#5DC1D0", "#9AD5CD", "#D5E9CB"])

describe('Pie Chart', () => {
    let wrapper;
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          themeMod: {
            colorTheme: 'blue'
          }
        }
      })
      localVue.use(themePlugin, {store})      
      wrapper = mount(Component, {
        store,
        localVue,
        computed: {
          colors: mockBaseColors
        },
        attachToDocument: true,
      })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('renders without props', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="container-piechart" class="piechart-wrapper"')
        expect(wrapper.html()).not.toContain('svg')
    })

    it('has the right prop data', () => {
      expect(wrapper.props().dataModel).toBeUndefined()
    })

})


describe('Pie Chart, custom props', () => {
    let wrapper;
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          themeMod: {
            colorTheme: 'blue'
          }
        }
      })
      localVue.use(themePlugin, {store})      
      wrapper = mount(Component, {
          propsData: {
              dataModel: propData,
              propID: 'foobar',
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
        wrapper.vm.drawPieChart()
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar" class="piechart-wrapper"')
        expect(wrapper.html()).toContain('svg')

    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(7)
        expect(wrapper.props().dataModel[0]).toEqual({label: 'test 1', value: 10})
    })


})

describe('Pie Chart, draw SVG', () => {
    let wrapper, spy;
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
              dataModel: propData,
              propID: 'piechart'
         },
         attachToDocument: true,
         store,
         localVue,
         computed: {
           colors: mockBaseColors
         }
      })
      spy = jest.spyOn(wrapper.vm, 'drawPieChart')
    })

    it('renders the SVG components', () => {
        wrapper.vm.drawPieChart()
        expect(wrapper.html()).toContain('<g class="slice"')
        expect(wrapper.html()).toContain('<div id="piechart"')
    })

    it('works with a spy function', () => {
        wrapper.vm.drawPieChart()
        expect(spy).toHaveBeenCalled();
    })
    it('works with an emit function', () => {
        wrapper.vm.$emit('drawPieChart')
        expect(wrapper.emitted().drawPieChart).toBeTruthy()
    })

})
