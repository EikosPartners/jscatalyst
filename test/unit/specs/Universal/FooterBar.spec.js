import Component from '@/components/universal/FooterBar.vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify';
Vue.use(Vuetify);

describe('FooterBar', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Component)
    })

    it('has the right default prop', ()=>{
        // expect(wrapper.findAll('i')).toHaveLength(4)
        expect(wrapper.html()).toContain('Back to top')
        expect(wrapper.html()).toContain('href="#app"')
    })

    it('works with a given prop', ()=>{
        wrapper.setProps({topTagId: '#top'})
        expect(wrapper.html()).toContain('href="#top"')
    })

})
