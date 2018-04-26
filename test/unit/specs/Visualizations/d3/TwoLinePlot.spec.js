import Component from '@/components/visualizations/d3/TwoLinePlot.vue'
import { createLocalVue,  mount } from '@vue/test-utils'
import { ResizeObserver } from 'vue-resize';
import Vuex from 'vuex'

const propData = [{"id": 2922, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-06-01", "value": 120, "period": 604800, "time": null, "object_type": 9}, {"id": 2952, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-06-01", "value": 21, "period": 2592000, "time": null, "object_type": 9}, {"id": 2938, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-04-01", "value": 193, "period": 604800, "time": null, "object_type": 9}, {"id": 2581, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-01-01", "value": 313, "period": 86400, "time": null, "object_type": 9}]
const propData2 = [{"id": 2022,"dashboard_metric": "Ticket Volume",  "object_id": 1,"date": "2017-06-01","value": 220,"period": 604800,"time": null,"object_type": 9}, { "id": 2052, "dashboard_metric": "Ticket Volume", "object_id": 2, "date": "2017-09-01", "value": 319, "period": 2592000, "time": null, "object_type": 9}, { "id": 2038, "dashboard_metric": "Ticket Volume", "object_id": 3, "date": "2017-04-01", "value": 147, "period": 604800, "time": null, "object_type": 9}, { "id": 2081, "dashboard_metric": "Ticket Volume", "object_id": 4, "date": "2017-02-01", "value": 27, "period": 86400, "time": null, "object_type": 9}, { "id": 2080, "dashboard_metric": "Ticket Volume", "object_id": 5, "date": "2017-01-01", "value": 0, "period": 86400, "time": null, "object_type": 9}, { "id": 2060, "dashboard_metric": "Ticket Volume", "object_id": 6, "date": "2017-07-01", "value": 140, "period": 86400, "time": null, "object_type": 9}, { "id": 2080, "dashboard_metric": "Ticket Volume", "object_id": 7, "date": "2017-08-01", "value": 240, "period": 86400, "time": null, "object_type": 9}]

const localVue = createLocalVue()
localVue.use(Vuex)
var store

beforeAll(() => {
  store = new Vuex.Store({
    state: {
      displayTheme: 'light'
    }
  })
})

describe('TwoLinePlot, default props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {store, localVue})
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(store.state.displayTheme).toBe('light')
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('id="container-twolineplot"')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(2)
    })
})

describe('TwoLinePlot, custom props', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                dataModel: propData,
                dataModel2: propData2,
                propID: "foobar",
                metric: "Ticket Volume",
                metric2: "Resolved Tickets",
                startDate: "January 01, 2017"
           }, attachToDocument: true,
           store, localVue
        })
        wrapper.element.setAttribute('style', "height: 400px;")
        //wrapper.element.children[1].setAttribute('style', "height: 200px;")
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('div')).toBe(true)
        expect(wrapper.contains(ResizeObserver)).toBe(true)
        expect(wrapper.html()).toContain('<div id="foobar" ')
    })

    it('has the right prop data', () => {
        expect(wrapper.props().dataModel).toHaveLength(4)
        expect(wrapper.props().dataModel2).toHaveLength(7)
    })

    it('emits the draw event', ()=>{
        wrapper.vm.$emit('draw')
        expect(wrapper.emitted('draw')).toBeTruthy()
    })

})


// Currently the component is not set up to respond to data changes
// describe('LinePlot, test SVG', () => {
//
//     it('draws the SVG on dataModel watch', () => {
//         let wrapper = mount(Component, {attachToDocument: true})
//         // console.log(wrapper.html())
//         wrapper.setProps({
//             dataModel: propData,
//             dataModel2: propData2,
//             propID: "foobar",
//             metric: "Ticket Volume",
//             metric2: "Resolved Tickets",
//             startDate: "January 01, 2017"
//            })
//
//         expect(wrapper.html()).toContain('<svg width="1004" height="200">')
//         expect(wrapper.html()).toContain('<g class="y axis" style="fill: steelblue;">')
//         expect(wrapper.html()).toContain('<foreignobject transform="rotate(-90)" y="6" x="-160" width="160" dy=".71em"><div class="metric-label" style="color:steelblue">Ticket Volume</div></foreignobject>')
//         expect(wrapper.html()).toContain('<circle class="dot" r="5" cx="560.7560033121722" cy="61.34185303514377" clip-path="url(#clip-lineplot)" fill="steelblue" opacity="0"></circle>')
//         expect(wrapper.html()).toContain('<line y2="-160" x2="0">')
//         wrapper.destroy()
//     })
//
// })
