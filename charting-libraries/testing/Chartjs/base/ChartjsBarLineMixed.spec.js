import Component from '@/components/visualizations/Chartjs/base/ChartjsBarLineMixed'
import { mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'

// added to suppress the errors from chartjs lib
global.console.error = function() {}

const data = [ { "date": '2017-11-23', "value": 7 }, { "date": '2017-11-22', "value": 2 }, { "date": '2017-11-21', "value": 4 }, { "date": '2017-11-20', "value": 1 }, { "date": '2017-11-19', "value": 1 }, { "date": '2017-11-18', "value": 1 }, { "date": '2017-11-17', "value": 1 }, { "date": '2017-11-16', "value": 1 }, { "date": '2017-11-15', "value": 2 }, { "date": '2017-11-14', "value": 0 } ]
const props = new ChartjsHelper().barLineParser(data, ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]);
const mockOptionsWatch = (newOptions) => {
  if (this.internalOptions !== newOptions) {
    this.renderChart(this.chartData, newOptions)
    this.internalOptions = newOptions
  }
}

describe('Chartjs BarLine Chart', () => {
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
      expect(wrapper.props().chartData.labels).toHaveLength(10)
      expect(wrapper.props().chartData.labels).toContain('Nov 23 17')
    })
})

describe('Chartjs BarLine Chart, changing options', () => {
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

// describe('Chartjs BarLine chart, snapshot', ()=>{
//     let wrapper

//     beforeEach(() => {
//         wrapper = mount(Component, {
//             propsData: {
//                 chartData: props
//            },
//            attachToDocument: true
//         })
//     })

//     it('matches snapshot', () => {
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
