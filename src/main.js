// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import VueResize from 'vue-resize'
import moment from 'moment'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import screensharePlugin from './plugins/screenshare'
import authPlugin from './plugins/auth'
import themePlugin from './plugins/themes'
Vue.config.productionTip = false
import '../node_modules/vuetify/dist/vuetify.min.css'
import './assets/stylus/main.styl'
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueResize)
Vue.use(Vuelidate)

Vue.use(require('vue-chartist'))
Vue.use(screensharePlugin)
Vue.config.devtools = true
Vue.config.performance = true

import PanelHeading from "@/components/universal/PanelHeading.vue";

Vue.use(VueChartkick, { Chartkick })
/* eslint-disable no-new */

Vue.prototype.moment = moment


import "ag-grid-enterprise/main";
import {LicenseManager} from "ag-grid-enterprise/main";

LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_2_May_2018__MTUyNTIxNTYwMDAwMA==d28c879e6375efc8359d943382f12d02");
import { store } from './store/index.js'
// If we add VueSocketio to Vue instance with the store as an argument the websockets can interact directly with the store
// ie. we wouldn't need to define sockets attributes on components
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:8000', store)

// Comment this in if auth is wanted
// Vue.use(authPlugin, {store, router, baseURL: 'http://localhost:8080'})
Vue.use(themePlugin, {store, themes: ['Blue', 'Pink', 'Brown', 'Green', 'Red', 'Grey']})

window.Vue = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})


Vue.component('panel-heading', PanelHeading)
