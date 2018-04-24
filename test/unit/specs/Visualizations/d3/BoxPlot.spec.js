import Component from '@/components/visualizations/d3/BoxPlot.vue'
import { shallow, mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
const propData = [ { "Q1": 20000, "Q2": 15000, "Q3": 8000, "Q4": 20000}, { "Q1": 9879, "Q2": 9323, "Q3": 3294, "Q4": 5629}, { "Q1": 5070, "Q2": 9395, "Q3": 17633, "Q4": 5752}, { "Q1": 7343, "Q2": 8675, "Q3": 12121, "Q4": 7557}, { "Q1": 9136, "Q2": 5354, "Q3": 4319, "Q4": 5125}, { "Q1": 7943, "Q2": 6725, "Q3": 18712, "Q4": 5116}, { "Q1": 10546, "Q2": 10899, "Q3": 17270, "Q4": 5828}, { "Q1": 9385, "Q2": 9365, "Q3": 13676, "Q4": 6014}, { "Q1": 8669, "Q2": 8238, "Q3": 6587, "Q4": 5995}, { "Q1": 4000, "Q2": 7446, "Q3": 16754, "Q4": 8905}]


describe('Box Plot, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar',
                metric: "Amount in $"
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
        expect(wrapper.props().dataModel).toHaveLength(10)
    })


})

describe('Box Plot, draw SVG', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar'
           },
           attachToDocument: true
        })
        spy = jest.spyOn(wrapper.vm, 'render')
    })

    it('renders the SVG components', ()=>{
        expect(wrapper.html()).toContain('<g class="x axis"')
        expect(wrapper.html()).toContain('<g class="tick"')
        expect(wrapper.html()).toContain('<rect class="box"')
        expect(wrapper.html()).toContain('<line class="whisker"')
    })

    it('works with a spy function', ()=>{
        wrapper.vm.render()
        expect(spy).toHaveBeenCalled();
    })
    it('works with an emit function', ()=>{
        wrapper.vm.$emit('render')
        expect(wrapper.emitted().render).toBeTruthy()
    })


})

// describe('BoxPlot, snapshot', ()=>{
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
