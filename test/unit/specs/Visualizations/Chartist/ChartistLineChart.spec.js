import Component from '@/components/Visualizations/Chartist/ChartistLineChart'
import Vue from 'vue'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import ChartistHelper from '@/common/chartistHelper.js'
import PanelHeading from '@/components/universal/PanelHeading.vue'

const data = [ { "date": '2017-11-23', "value": 7 }, { "date": '2017-11-22', "value": 2 }, { "date": '2017-11-21', "value": 4 }, { "date": '2017-11-20', "value": 1 }, { "date": '2017-11-19', "value": 1 }, { "date": '2017-11-18', "value": 1 }, { "date": '2017-11-17', "value": 1 }, { "date": '2017-11-16', "value": 1 }, { "date": '2017-11-15', "value": 2 }, { "date": '2017-11-14', "value": 0 } ]

describe('Chartist Line', () => {
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
        expect(wrapper.html()).toContain('<chartist type="Line"')
    })

    it('has the right prop data', () => {
      expect(wrapper.props().dataModel).toContainEqual({"date": '2017-11-23', "value": 7})
      expect(wrapper.vm.propID).toBe('chartist-line-chart')
    })

    it('has the right computed chart data', () => {
        expect(wrapper.vm.chartData).toHaveProperty('labels')
        expect(wrapper.vm.chartData).toHaveProperty('series')
    })


})

describe('Chartist Line chart, snapshot', ()=>{
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
