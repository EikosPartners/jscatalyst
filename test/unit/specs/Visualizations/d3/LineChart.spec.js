import Component from '@/components/visualizations/d3/LineChart.vue'
import { mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
const propData = [ { "date": '2017-11-23', "volume": 7 }, { "date": '2017-11-22', "volume": 2 }, { "date": '2017-11-21', "volume": 4 }, { "date": '2017-11-20', "volume": 1 }, { "date": '2017-11-19', "volume": 1 }, { "date": '2017-11-18', "volume": 1 }, { "date": '2017-11-17', "volume": 1 }, { "date": '2017-11-16', "volume": 1 }, { "date": '2017-11-15', "volume": 2 }, { "date": '2017-11-14', "volume": 0 } ]



describe('LineChart, default props', () => {
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
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })

    it('emits the draw event', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted('draw')).toBeTruthy()
    })
})

describe('LineChart, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar',
                dateFormat: 'YYYY-MM-DD'
           }, attachToDocument: true
        })

    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all, with SVG', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('<svg width="')
        // expect(wrapper.html()).toContain('<text fill="#000" y="53" dy="0.71em">Nov 23, 2017</text>')
        expect(wrapper.html()).toContain('<path class="domain"')
        expect(wrapper.html()).toContain('<line ')
    })


    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(10)
    })


})
