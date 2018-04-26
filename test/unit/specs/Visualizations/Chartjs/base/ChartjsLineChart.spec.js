import Component from '@/components/visualizations/Chartjs/base/ChartjsLineChart'
import { mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'

// added to suppress the errors from chartjs lib
global.console.error = function() {}

const data = [ { "date": '2017-11-23', "value": 7 }, { "date": '2017-11-22', "value": 2 }, { "date": '2017-11-21', "value": 4 }, { "date": '2017-11-20', "value": 1 }, { "date": '2017-11-19', "value": 1 }, { "date": '2017-11-18', "value": 1 }, { "date": '2017-11-17', "value": 1 }, { "date": '2017-11-16', "value": 1 }, { "date": '2017-11-15', "value": 2 }, { "date": '2017-11-14', "value": 0 } ]
const twoLineData = [{line1: [{ "date": '2017-11-23', "value": 7 }, { "date": '2017-11-22', "value": 2 }, { "date": '2017-11-21', "value": 4 }]}, {line2: [{ "date": '2017-11-23', "value": 3 }, { "date": '2017-11-22', "value": 4 }, { "date": '2017-11-21', "value": 8 }]}]
const props = new ChartjsHelper().lineChartParser(data, 'Line', ['rgba(243, 126, 33, .9)', 'rgb(33, 150, 243)', '#CC0000'], false)
const twoLineProps = new ChartjsHelper().lineChartParser(twoLineData, 'Line', ['rgba(243, 126, 33, .9)', 'rgb(33, 150, 243)', '#CC0000'], false)
const mockOptionsWatch = (newOptions) => {
  if (this.internalOptions !== newOptions) {
    this.renderChart(this.chartData, newOptions)
    this.internalOptions = newOptions
  }
}

describe('LineChart, default props', () => {
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
        expect(wrapper.props().chartData.datasets).toHaveLength(1)
        expect(wrapper.props().chartData.labels).toHaveLength(10)
    })

})

describe('Chartjs Line Chart, changing options', () => {
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

describe('LineChart, two line data', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(Component, {
          propsData: {
              chartData: twoLineProps
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
        expect(wrapper.props().chartData.datasets).toHaveLength(2)
        expect(wrapper.props().chartData.labels).toHaveLength(3)
    })

})

describe('Chartjs Line chart, snapshot', ()=>{
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
