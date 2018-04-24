import Component from '@/pages/Main.vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify';
Vue.use(Vuetify);

describe('MainPage', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Component, {attachToDocument: true})
        // console.log(wrapper.windowmanager)

    })

    it('has the right default prop', ()=>{
        // console.log(window)
        // console.log(windowmanager)
        expect(2).toEqual(2)
		// HTK write real tests
    })

    // it('works with a given prop', ()=>{
    //     wrapper.setProps({topTagId: '#top'})
    //     expect(wrapper.html()).toContain('href="#top"')
    // })

})
