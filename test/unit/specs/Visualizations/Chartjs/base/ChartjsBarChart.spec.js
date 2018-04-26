import Component from '@/components/visualizations/Chartjs/base/ChartjsBarChart'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'

// added to suppress the errors from chartjs lib
global.console.error = function() {}

const data = [ {"x": "5/15 - 6/14", "y": 13.3},
{"x": "6/14 - 7/14", "y": 12.08},
{"x": "7/14 - 8/13", "y": 14.62},
{"x": "8/13 - 9/12", "y": 17.57},
{"x": "9/12 - 10/12", "y": 14.35}  ]

const props = new ChartjsHelper().barChartParser(data, 'Bars', ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]);
const mockOptionsWatch = (newOptions) => {
  if (this.internalOptions !== newOptions) {
    this.renderChart(this.chartData, newOptions)
    this.internalOptions = newOptions
  }
}


describe('Chartjs Bar Chart', () => {
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
      expect(wrapper.props().chartData.labels).toHaveLength(5)
    })

})

describe('Chartjs Bar Chart, changing options', () => {
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

describe('Chartjs Bar chart, snapshot', ()=>{
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
