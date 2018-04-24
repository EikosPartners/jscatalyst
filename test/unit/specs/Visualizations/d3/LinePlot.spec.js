import Component from '@/components/visualizations/d3/LinePlot.vue'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import { ResizeObserver } from 'vue-resize';
const propData = [{"id": 2922, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-06-01", "value": 120, "period": 604800, "time": null, "object_type": 9}, {"id": 2952, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-06-01", "value": 21, "period": 2592000, "time": null, "object_type": 9}, {"id": 2938, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-04-01", "value": 193, "period": 604800, "time": null, "object_type": 9}, {"id": 2581, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-01-01", "value": 313, "period": 86400, "time": null, "object_type": 9}]

describe('LinePlot, default props', () => {
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
        expect(wrapper.html()).toContain('id="lineplot"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })
})

describe('LinePlot, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: "foobar",
                metric: "Ticket Volume",
                startDate: "April 01, 2017"
           }, attachToDocument: true
        })
        wrapper.element.setAttribute('style', "height: 400px;")
        wrapper.element.children[1].setAttribute('style', "height: 200px;")
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar" ')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(4)
    })

    it('emits the draw event', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted('draw')).toBeTruthy()
    })

})

describe('LinePlot, test SVG', () => {

    it('draws the SVG on dataModel watch', () => {
        let wrapper = mount(Component, {attachToDocument: true})
        // console.log(wrapper.html())
        wrapper.setProps({
                dataModel: propData,
                propID: "lineplot",
                metric: "Ticket Volume"
           })
        expect(wrapper.html()).toContain('<svg width="100" height="100">')
        expect(wrapper.html()).toContain('<g class=\"y axis axis-line-plot\"')
        expect(wrapper.html()).toContain('<circle class="dot" r="5" cx="0" cy="0" ')
        expect(wrapper.html()).toContain('<line')
        wrapper.destroy()
    })

})
