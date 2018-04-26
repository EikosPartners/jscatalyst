import Component from '@/components/visualizations/d3/Scatterplot.vue'
import { mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
const propData = [{"Value1":"Office 1", "Value2":"AL", "x":70, "y":4}, {"Value1":"Office 2", "Value2": "MA", "x":120, "y":3}, {"Value1":"Office 3", "Value2":"CA", "x":70, "y":4}, {"Value1":"Office 4", "Value2":"AL", "x":50, "y":4},{"Value1":"Office 5", "Value2":"AL", "x":110, "y":2}]

describe('Scatterplot', () => {
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
        expect(wrapper.html()).toContain('class="scatterplot"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(0)
    })

})

describe('Scatterplot, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'scatterplot',
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
        expect(wrapper.html()).toContain('id="scatterplot"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(5)
    })
})

describe('Scatterplot, draw SVG', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'scatterplot',
                xaxisLabel: "xAxis",
                yaxisLabel: "yAxis"
           },
           attachToDocument: true
        })
        spy = jest.spyOn(wrapper.vm, 'drawScatterplot')
    })

    it('renders the SVG components', ()=>{
        expect(wrapper.html()).toContain('<g class="x axis"')
        expect(wrapper.html()).toContain('<g class="tick"')
        expect(wrapper.html()).toContain('<circle class="dot"')
    })

    it('works with a spy function', ()=>{
        wrapper.vm.drawScatterplot()
        expect(spy).toHaveBeenCalled();
    })
    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawScatterplot')
        expect(wrapper.emitted().drawScatterplot).toBeTruthy()
    })

})
