import Component from '@/components/Visualizations/Chartist/ChartistBarChart'
import Vue from 'vue'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import ChartistHelper from '@/common/chartistHelper.js'

const data = [ {"x": "5/15 - 6/14", "y": 13.3},
{"x": "6/14 - 7/14", "y": 12.08},
{"x": "7/14 - 8/13", "y": 14.62},
{"x": "8/13 - 9/12", "y": 17.57},
{"x": "9/12 - 10/12", "y": 14.35}  ]

describe('Chartist Bar', () => {
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
        expect(wrapper.html()).toContain('<chartist type="Bar"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toContainEqual({"x": "5/15 - 6/14", "y": 13.3})
        expect(wrapper.vm.propID).toBe('chartist-bar-chart')
    })

    it('has the correct computed chart data', () => {
      expect(wrapper.vm.chartData).toHaveProperty('labels')
      expect(wrapper.vm.chartData).toHaveProperty('series')
    })

})

describe('Chartist Bar chart, snapshot', ()=>{
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
