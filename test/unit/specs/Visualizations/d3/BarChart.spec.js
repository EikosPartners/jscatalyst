import Component from '@/components/visualizations/d3/BarChart.vue'
import { shallow, mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
const propData = [{"x": "5/15 - 6/14", "y": 13.3}, {"x": "6/14 - 7/14", "y": 12.08}, {"x": "7/14 - 8/13", "y": 14.62}, {"x": "8/13 - 9/12", "y": 17.57}, {"x": "9/12 - 10/12", "y": 14.35} ]

describe('BarChart', () => {
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
        expect(wrapper.html()).toContain('<div id="container-barchart" style="width: 100%; height: 100%;">')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(0)
    })

})


describe('BarChart, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar',
                xaxisLabel: "Interval",
                yaxisLabel: "Volume (Incidents)"
           }
        })

    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar" style="width: 100%; height: 100%;">')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(5)
    })


})

describe('BarChart, draw SVG', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar',
                xaxisLabel: "Interval",
                yaxisLabel: "Volume (Incidents)"
           },
           attachToDocument: true
        })
        spy = jest.spyOn(wrapper.vm, 'drawBarPlot')
    })

    it('renders the SVG components', ()=>{

        expect(wrapper.html()).toContain('<g class="x axis"')
        expect(wrapper.html()).toContain('<g class="tick"')
        expect(wrapper.html()).toContain('<rect class="bar"')
    })

    it('works with a spy function', ()=>{
        wrapper.vm.drawBarPlot()
        expect(spy).toHaveBeenCalled();

        // expect(wrapper.html()).toContain('<g class="x axis"')
        // expect(wrapper.html()).toContain('<g class="tick"')
        // expect(wrapper.html()).toContain('<rect class="bar"')
    })
    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawBarPlot')
        expect(wrapper.emitted().drawBarPlot).toBeTruthy()
    })


})

// describe('BarChart, snapshot', ()=>{
//     let wrapper

//     beforeEach(() => {
//         wrapper = mount(Component, {
//             propsData: {
//                 dataModel: propData,
//                 propID: 'foobar'
//            },
//            attachToDocument: true
//         })
//     })

//     it('matches snapshot', ()=>{
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
