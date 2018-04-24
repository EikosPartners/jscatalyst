import Component from '@/components/Visualizations/d3/DifferenceChart.vue'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import { ResizeObserver } from 'vue-resize';
const propData = [
  {"date": "2017-01-01", "expected": 100, "actual": 50},
  {"date": "2017-01-05", "expected": 30, "actual": 50},
  {"date": "2017-01-10", "expected": 45, "actual": 90},
  {"date": "2017-01-15", "expected": 110, "actual": 150},
  {"date": "2017-01-20", "expected": 90, "actual": 130},
  {"date": "2017-01-25", "expected": 80, "actual": 50},
  {"date": "2017-01-30", "expected": 150, "actual": 60},
  {"date": "2017-02-04", "expected": 100, "actual": 30}
]

describe('DifferenceChart, default props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component)
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('<div id="container-differencechart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })

    it('emits the draw event', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted('draw')).toBeTruthy()
    })
})

describe('DifferenceChart, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar'
           }, attachToDocument: true
        })

    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all, with SVG', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar"')
        expect(wrapper.html()).toContain('<svg width="')
        expect(wrapper.html()).toContain('<clippath id="clip-above"')
        expect(wrapper.html()).toContain('<clippath id="clip-below"')
        expect(wrapper.html()).toContain('<path class="area below"')
        expect(wrapper.html()).toContain('<circle class="dot"')
    })


    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(8)
    })


})
