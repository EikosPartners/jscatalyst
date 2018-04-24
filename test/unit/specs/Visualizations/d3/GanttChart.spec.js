import Component from '@/components/Visualizations/d3/GanttChart.vue'
import { shallow, mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'

const propData = [
  {"startDate":new Date("Dec 09 00:00:45 EST 2017"),"endDate":new Date("Dec 13 02:36:45 EST 2017"),"taskName":"E Job","status":"RUNNING", "label": "sample"},
  {"startDate":new Date("Nov 09 06:34:04 EST 2017"),"endDate":new Date("Nov 23 08:49:53 EST 2017"),"taskName":"D Job","status":"RUNNING", "label": "sample"},
  {"startDate":new Date("Oct 03 03:27:35 EST 2017"),"endDate":new Date("Nov 15 03:58:43 EST 2017"),"taskName":"P Job","status":"SUCCEEDED", "label": "sample"},
  {"startDate":new Date("Oct 09 03:27:35 EST 2017"),"endDate":new Date("Dec 20 03:58:43 EST 2017"),"taskName":"N Job","status":"KILLED", "label": "sample"}
]

describe('GanttChart', () => {
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
        expect(wrapper.html()).toContain('<div id="container-ganttchart" style="height: 100%;">')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(1)
    })

})

describe('drawGantt works', ()=>{
    let wrapper, spy
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar'
           },
           attachToDocument: true
        })
        spy = jest.spyOn(wrapper.vm, 'drawGantt').mockImplementation()
    })

    it('renders the SVG components', () => {
        wrapper.vm.$emit('render', propData, '#foobar')
        expect(wrapper.emitted().render).toBeTruthy()
        // issue using Vue.nextTick()
        setTimeout(() => {
          expect(wrapper.html()).toContain('<g class="x axis"')
          expect(wrapper.html()).toContain('<g class="tick"')
          expect(wrapper.html()).toContain('<rect class="gantt-chart"')
        }, 10)


        // Vue.nextTick(() => {
        //   expect(wrapper.html()).toContain('<g class="x axis"')
        //   expect(wrapper.html()).toContain('<g class="tick"')
        //   expect(wrapper.html()).toContain('<rect class="gantt-chart"')
        // })


    })

    it('works with a spy function', ()=>{
        wrapper.vm.drawGantt()
        expect(spy).toHaveBeenCalled();

        // expect(wrapper.html()).toContain('<g class="x axis"')
        // expect(wrapper.html()).toContain('<g class="tick"')
        // expect(wrapper.html()).toContain('<rect class="bar"')
    })
    it('works with an emit function', ()=>{
        wrapper.vm.$emit('drawGantt')
        expect(wrapper.emitted().drawGantt).toBeTruthy()
    })


})

describe('GanttChart, snapshot', ()=>{
    let wrapper

    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                propID: 'foobar'
           },
           attachToDocument: true
        })
    })

    it('matches snapshot', () => {
        let renderer = createRenderer()
        return Vue.nextTick()
            .then(function(){
                renderer.renderToString(wrapper.vm, (err, str) => {
                  if (err) throw new Error(err)
                  expect(str).toMatchSnapshot()
                })
            })

    })

})
