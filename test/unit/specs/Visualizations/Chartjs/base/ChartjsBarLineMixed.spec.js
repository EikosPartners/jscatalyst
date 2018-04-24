import Component from '@/components/visualizations/Chartjs/base/ChartjsBarLineMixed'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'


const data = [ { "date": '2017-11-23', "value": 7 }, { "date": '2017-11-22', "value": 2 }, { "date": '2017-11-21', "value": 4 }, { "date": '2017-11-20', "value": 1 }, { "date": '2017-11-19', "value": 1 }, { "date": '2017-11-18', "value": 1 }, { "date": '2017-11-17', "value": 1 }, { "date": '2017-11-16', "value": 1 }, { "date": '2017-11-15', "value": 2 }, { "date": '2017-11-14', "value": 0 } ]
const props = new ChartjsHelper().barLineParser(data, ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]);


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

describe('Chartjs BarLine chart, snapshot', ()=>{
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
