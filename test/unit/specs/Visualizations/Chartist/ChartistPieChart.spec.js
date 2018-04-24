import Component from '@/components/visualizations/Chartist/ChartistPieChart'
import Vue from 'vue'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import ChartistHelper from '@/common/chartistHelper.js'

const data = [ {"value": 24,"label": "Bubble"}, {"value": 22,"label": "Bar"}, {"value": 20,"label": "Line"}, {"value": 15,"label": "Scatter Plot"}, {"value": 30,"label": "Pie"}, {"value": 10,"label": "Area"}]

describe('Chartist Pie', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(Component, {
          propsData: {
              dataModel: data
         },
         attachToDocument: true
      })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('chartist')).toBe(true)
        expect(wrapper.html()).toContain('<chartist type="Pie"')
    })

    it('has the right prop data', () => {
      expect(wrapper.props().dataModel).toContainEqual({"value": 24,"label": "Bubble"})
      expect(wrapper.vm.propID).toBe('chartist-pie-chart')
    })

    it('has the right computed chart data', () => {
        expect(wrapper.vm.chartData).toHaveProperty('labels')
        expect(wrapper.vm.chartData).toHaveProperty('series')
    })


})

describe('Chartist Pie chart, snapshot', ()=>{
    let wrapper

    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: data
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
