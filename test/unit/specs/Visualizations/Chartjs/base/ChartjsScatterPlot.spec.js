import Component from '@/components/Visualizations/Chartjs/base/ChartjsScatterChart'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'


const data = [{"x": 4,"y": 10,"label": "value 1"},{"x": 8,"y": 5,"label": "value 2"},{"x": 10,"y": 10,"label": "value 3"}]
const props = new ChartjsHelper().scatterParser(data, ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]);


describe('Chartjs Scatter Plot', () => {
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
      expect(wrapper.props()).toHaveProperty('chartData.datasets')
      expect(wrapper.props().chartData.datasets).toHaveLength(3)
      expect(wrapper.props().chartData.datasets[0].data).toContainEqual({"x": 4, "y": 10})
    })
})

describe('Chartjs Scatter Plot, snapshot', ()=>{
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
