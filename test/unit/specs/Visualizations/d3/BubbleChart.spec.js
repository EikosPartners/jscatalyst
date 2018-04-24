import Vue from 'vue'
import Component from '@/components/visualizations/d3/BubbleChart.vue'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import { ResizeObserver } from 'vue-resize';
const propDataModel = [{"description_words": "","escalated_med": 0.25,"duration_med": 945,"category_3": "all","created": "2017-11-30","category_2": "all","category_1": "all","volume": 4,"agent": "Agent_9","pk": 10836}, {"description_words": "","escalated_med": 0.5,"duration_med": 917,"category_3": "all","created": "2017-11-30","category_2": "all","category_1": "all","volume": 2,"agent": "Agent_8","pk": 10835}, {"description_words": "","escalated_med": 0.875,"duration_med": 807.5,"category_3": "all","created": "2017-11-30","category_2": "all","category_1": "all","volume": 8,"agent": "Agent_7","pk": 10834}]


describe('BubbleChart, test SVG', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {attachToDocument: true})
    })

    it('draws the SVG on dataModel watch', () => {
        wrapper.setProps({
                dataModel: propDataModel,
                currentCategories: ["all", "all", "all"],
                yAxisLabel: "Escalation",
           })
        expect(wrapper.html()).toContain('<svg width="100" height="100"><g transform="translate(20,20)">')
        expect(wrapper.html()).toContain('Escalation')
        expect(wrapper.html()).toContain('<circle class="dot" ')

    })

})

describe('BubbleChart, default props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component)
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('class="bubbleChart"')
    })

    it('emits the draw function on dataModel watch', ()=>{
        const spy = jest.spyOn(wrapper.vm, 'drawTopPlotX')
        wrapper.setProps({dataModel: propDataModel})
        expect(spy).toHaveBeenCalled();
    })
})


describe('BubbleChart, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propDataModel,
                currentCategories: ["all", "all", "all"],
                axisLabel: "Escalation",
           },
        })
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('class="bubbleChart"')
    })

    it('has the right prop data', () => {
        expect(wrapper.vm.dataModel).toHaveLength(3)
    })

    it('emits the draw function', ()=>{
        wrapper.vm.$emit('drawTopPlotX', wrapper.vm.processedData)
        expect(wrapper.emitted().drawTopPlotX).toBeTruthy()
    })

    it('emits a helper function, correctly', ()=>{
        wrapper.vm.$emit('get_bubble_sizes', 8)
        expect(wrapper.emitted().get_bubble_sizes).toBeTruthy()
        expect(wrapper.vm.get_bubble_sizes(8)).toEqual({ min: 8, max: 89 })
    })

})
