// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import './assets/stylus/main.styl'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import { store } from './sandbox/store.js'
import ThemePlugin from './plugins/themes.js'
import ScreensharePlugin from './plugins/screenshare.js'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true

Vue.use(Vuetify)
Vue.use(ThemePlugin, {store, custom: true})
Vue.use(ScreensharePlugin)

window.Vue = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
