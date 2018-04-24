import Component from '@/components/visualizations/d3/PunchCard.vue'
import { createLocalVue, shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import { ResizeObserver } from 'vue-resize'
import Vuex from 'vuex'
import Vue from 'vue'
import moment from 'moment'
const propData = [{"day_of_week": "0","hour_volumes": [5, 3, 3, 4, 6, 5, 2, 4, 5, 7, 6, 7, 4, 3, 2, 5, 5, 11, 6, 10, 7, 7, 8, 5]}, {"day_of_week": "1","hour_volumes": [5, 6, 6, 7, 9, 5, 8, 2, 7, 7, 8, 2, 6, 5, 10, 7, 6, 11, 4, 5, 6, 3, 10, 5]}, {"day_of_week": "2","hour_volumes": [2, 11, 4, 6, 3, 9, 6, 6, 3, 7, 5, 3, 8, 7, 8, 3, 5, 11, 5, 8, 1, 9, 5, 8]}, {"day_of_week": "3","hour_volumes": [4, 10, 7, 4, 5, 9, 8, 3, 6, 5, 3, 7, 12, 6, 5, 9, 6, 8, 5, 7, 8, 3, 7, 10]}, {"day_of_week": "4","hour_volumes": [7, 7, 5, 5, 5, 7, 4, 4, 6, 10, 6, 8, 1, 9, 8, 8, 6, 4, 3, 4, 5, 11, 6, 9]}, {"day_of_week": "5","hour_volumes": [6, 7, 6, 6, 6, 6, 5, 6, 4, 10, 5, 8, 5, 6, 4, 1, 4, 11, 4, 5, 9, 2, 2, 6]}, {"day_of_week": "6","hour_volumes": [4, 2, 5, 10, 10, 6, 4, 5, 3, 7, 4, 7, 9, 8, 5, 7, 0, 6, 4, 2, 6, 10, 10, 4]}]

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

describe('PunchCard', () => {
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
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('<div id="container-punchcard">')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(0)
    })

})


describe('PunchCard, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar',
           },
           methods: {
                moment: function() {
                    return moment()
                }
           },
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
        expect(wrapper.html()).toContain('<div id="foobar">')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(7)
    })

})

describe('PunchCard, draw SVG', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'punchcard',
           },
           attachToDocument: true,
           localVue,
           store
        })
        spy = jest.spyOn(wrapper.vm, 'drawPunchCard')
    })

    it('renders the SVG components', ()=>{
      expect(wrapper.html()).toContain('<circle cy="')
      expect(wrapper.html()).toContain('<circle r="')
      expect(wrapper.html()).toContain('<g class="sums-x-value"')
      expect(wrapper.html()).toContain('<g class="sums-y-value"')
      expect(wrapper.html()).toContain('<line class="vert"')
      expect(wrapper.html()).toContain('<line class="horiz"')
    })

    it('works with a spy function', ()=>{
        wrapper.vm.drawPunchCard()
        expect(spy).toHaveBeenCalled();
    })

    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawPunchCard')
        expect(wrapper.emitted().drawPunchCard).toBeTruthy()
    })
})
