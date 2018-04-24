import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/universal/MainToolbar.vue'
var windowmanager = require('../../../../windowmanager/windowmanager.min.js')
const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)
Vue.config.debug = false
Vue.config.devtools = false
var store;

describe('Toolbar', () => {
    let wrapper, store
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          colorTheme: 'blue',
          displayTheme: 'light',
          allThemes: ['Blue', 'Pink', 'Brown', 'Green', 'Red', 'Grey']
        }
      })
      // code to remove warning message *[Vuetify] Unable to locate target [data-app] in "v-menu"*
      var app = document.createElement('div')
      app.setAttribute('data-app', true)
      document.body.appendChild(app)
        wrapper = mount(Component, { store, localVue, attachToDocument: true})
    })

    it('it renders at all', () => {
        expect(wrapper.is('div')).toBe(true)
        // console.log(wrapper.html())
        expect(wrapper.html()).toContain('<div class="toolbar__content"')
        expect(wrapper.html()).toContain('nav-toolbar')
        expect(wrapper.html()).toContain('<div class="menu__activator">')
    })

    it('has the right prop data', () => {
        wrapper.setProps({company: 'JS Catalyst'})
        expect(wrapper.html()).toContain('<h1 id=\"headerText\">JS Catalyst</h1>')
    })
})
