import Component from '@/components/visualizations/Chartjs/base/ChartjsPieChart'
import { mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'

// added to suppress the errors from chartjs lib
global.console.error = function() {}

const data = [{"value": 24,"label": "Bubble"},{"value": 22,"label": "Bar"},{"value": 20,"label": "Line"},{"value": 15,"label": "Scatter Plot"},{"value": 30,"label": "Pie"},{"value": 10,"label": "Area"}]
const props = new ChartjsHelper().polarChartParser(data, ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]);
const mockOptionsWatch = (newOptions) => {
  if (this.internalOptions !== newOptions) {
    this.renderChart(this.chartData, newOptions)
    this.internalOptions = newOptions
  }
}

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

describe('Chartjs Pie Chart, changing options', () => {
    let wrapper, spy;
    beforeEach(() => {
      wrapper = mount(Component, {
          propsData: {
              chartData: props,
              options: {maintainAspectRatio:true}
         },
         watch: {
           options: mockOptionsWatch
         },
         attachToDocument: true
      })
      spy = jest.spyOn(wrapper.vm, 'renderChart')
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it updates the chart when options are changed', () => {
        wrapper.setProps({
          chartData: props,
          options: {maintainAspectRatio:false}
        })
        expect(spy).toHaveBeenCalled();
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
