import Vue from 'vue'
import Component from '@/components/Visualizations/d3/Dendrogram.vue'
import * as d3 from "d3";
import { shallow, mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
const propData = [{"children":[{"children":[{"children":[],"name":"f"},{"children":[{"children":[],"name":"b"},{"children":[{"children":[{"children":[],"name":"c"},{"children":[],"name":"d"}],"name":"c-d"},{"children":[{"children":[],"name":"a"},{"children":[],"name":"e"}],"name":"a-e"}],"name":"a-c-d-e"}],"name":"a-b-c-d-e"}],"name":"a-b-c-d-e-f"}],"name":"Root1"}]

describe('Dendrogram', () => {
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
        expect(wrapper.html()).toContain('class="dendrogram"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(0)
    })

})

describe('Dendrogram, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'dendrogram',
           }
        })

    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.html()).toContain('id="dendrogram"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })
})

describe('Dendrogram, draw SVG', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'dendrogram',
           },
           attachToDocument: true
        })
        spy = jest.spyOn(wrapper.vm, 'drawDendrogram')
    })

    it('renders the SVG components', ()=>{
        expect(wrapper.html()).toContain('path class="link"')
        expect(wrapper.html()).toContain('g class="node"')
        expect(wrapper.html()).toContain('circle class="dot"')
    })

    it('works with a spy function', ()=>{
        wrapper.vm.drawDendrogram()
        expect(spy).toHaveBeenCalled();
    })
    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawDendrogram')
        expect(wrapper.emitted().drawDendrogram).toBeTruthy()
    })

})
