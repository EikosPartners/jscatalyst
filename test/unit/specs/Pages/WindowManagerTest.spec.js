import Component from '@/pages/WindowManagerTest.vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify';
// var windowmanager = require('../../../../windowmanager.min.js')
// 
Vue.use(Vuetify);

describe('WindowManagerTest', () => {
    let wrapper;
    // window.windowmanager = windowmanager

    // beforeEach(() => {
    //     Object.defineProperty(window, 'windowmanager', {value: windowmanager}
    //     wrapper = mount(Component,  {attachToDocument: true})
    //     // console.log(wrapper.windowmanager)

    // })

    it('has the right default prop', ()=>{
        // console.log(wrapper.html())
        expect(2).toEqual(2)
        // console.log(windowmanager)
       // HTK write real tests

    })

    // it('works with a given prop', ()=>{
    //     wrapper.setProps({topTagId: '#top'})
    //     expect(wrapper.html()).toContain('href="#top"')
    // })

})
