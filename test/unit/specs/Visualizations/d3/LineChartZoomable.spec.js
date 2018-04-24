import Component from '@/components/visualizations/d3/LineChartZoomable.vue'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import { ResizeObserver } from 'vue-resize';
const propData = [ { "date": '2017-11-23', "volume": 7 }, { "date": '2017-11-22', "volume": 2 }, { "date": '2017-11-21', "volume": 4 }, { "date": '2017-11-20', "volume": 1 }, { "date": '2017-11-19', "volume": 1 }, { "date": '2017-11-18', "volume": 1 }, { "date": '2017-11-17', "volume": 1 }, { "date": '2017-11-16', "volume": 1 }, { "date": '2017-11-15', "volume": 2 }, { "date": '2017-11-14', "volume": 0 } ]



describe('LineChartZoomable, default props', () => {
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
        expect(wrapper.html()).toContain('<div id="container-linechartzoomable"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })

    it('emits the draw event', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted('draw')).toBeTruthy()
    })
})

describe('LineChartZoomable, custom props', () => {
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
        // check that it has the brush at the bottom
        expect(wrapper.html()).toContain('<g class="brush"')

    })


    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(10)
    })


})
