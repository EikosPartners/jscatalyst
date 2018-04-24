import Component from '@/components/visualizations/d3/SankeyDiagram.vue'
import { shallow, mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
import { createRenderer } from 'vue-server-renderer'
import sankeyData from '@/assets/mocks/d3/sankeyMock.json'
import Vue from 'vue'
const propData = sankeyData


describe('Sankey, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar'
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
      expect(wrapper.props().dataModel).toHaveProperty('nodes')
      expect(wrapper.props().dataModel).toHaveProperty('links')
    })


})

describe('Sankey, draw SVG', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar'
           },
           attachToDocument: true
        })
        spy = jest.spyOn(wrapper.vm, 'draw')
    })

    it('draws the SVG components', ()=>{
        expect(wrapper.html()).toContain('<g class="node"')
        expect(wrapper.html()).toContain('<rect ')
    })

    it('works with a spy function', ()=>{
        wrapper.vm.draw()
        expect(spy).toHaveBeenCalled();
    })
    it('works with an emit function', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted().draw).toBeTruthy()
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
