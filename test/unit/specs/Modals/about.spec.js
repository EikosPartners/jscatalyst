import Vue from 'vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/Modals/About.vue'

describe('About', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Component)
    })

    it('it renders at all', () => {
        expect(wrapper.html()).toContain('href="#dashboards">Dashboards</v-tab>')
        expect(wrapper.html()).toContain('<v-tabs-items><v-tab-item id="overview" class="aboutTabClass">')
    })

    it('changes tabs', () => {
        wrapper.setData({aboutTabs: 'contact'})
        expect(wrapper.vm.aboutTabs).toBe('contact')
    })
})
