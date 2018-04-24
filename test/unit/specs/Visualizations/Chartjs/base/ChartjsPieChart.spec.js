import Component from '@/components/Visualizations/Chartjs/base/ChartjsPieChart'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'


const data = [{"value": 24,"label": "Bubble"},{"value": 22,"label": "Bar"},{"value": 20,"label": "Line"},{"value": 15,"label": "Scatter Plot"},{"value": 30,"label": "Pie"},{"value": 10,"label": "Area"}]
const props = new ChartjsHelper().polarChartParser(data, ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]);


describe('Chartjs Pie Chart', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(Component, {
          propsData: {
              chartData: props
         },
         attachToDocument: true
      })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('canvas')).toBe(true)
        expect(wrapper.html()).toContain('<canvas')
    })

    it('has the right prop data', () => {
      expect(wrapper.props()).toHaveProperty('chartData.labels')
      expect(wrapper.props()).toHaveProperty('chartData.datasets')
      expect(wrapper.props().chartData.labels).toHaveLength(6)
      expect(wrapper.props().chartData.labels).toContain('Bar')
    })
})

describe('Chartjs Pie chart, snapshot', ()=>{
    let wrapper

    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                chartData: props
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
