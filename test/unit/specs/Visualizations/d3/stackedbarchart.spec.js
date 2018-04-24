import Component from '@/components/visualizations/d3/StackedBarChart.vue'
import { shallow, mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
const propData = [{"month":"Jan", "A":20, "B": 5,  "C": 10}, {"month":"Feb", "A":25, "B": 10, "C": 20}, {"month":"March", "A":2, "B": 7, "C": 18}]

describe('StackedBarChart', () => {
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
        expect(wrapper.html()).toContain('id="stackedBarChart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })

})

describe('StackedBarChart, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'stackedBarChart',
                xaxisLabel: "xAxis",
                yaxisLabel: "yAxis"
           }
        })

    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('id="stackedBarChart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(3)
    })
})

describe('StackedBarChart, draw SVG', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'stackedBarChart',
                xaxisLabel: "xAxis",
                yaxisLabel: "yAxis"
           },
           attachToDocument: true
        })
        spy = jest.spyOn(wrapper.vm, 'drawStackedBarChart')
    })

    it('renders the SVG components', ()=>{
        expect(wrapper.html()).toContain('<g class="x axis-stacked"')
        expect(wrapper.html()).toContain('<g class="tick"')
        expect(wrapper.html()).toContain('<rect class="stackedBar"')
    })

    it('works with a spy function', ()=>{
        wrapper.vm.drawStackedBarChart()
        expect(spy).toHaveBeenCalled();
    })
    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawStackedBarChart')
        expect(wrapper.emitted().drawStackedBarChart).toBeTruthy()
    })


})
