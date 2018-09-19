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
Vue.use(ThemePlugin, {store, customThemes: [{name: 'Brian', themeColors:  {
        first: '#F57F17', 
        second: '#FFB300', 
        third: '#FFD740', 
        fourth: '#FFEB3B', 
        fifth: '#FFFF20', 
        sixth: '#FFEE58', 
        seventh: '#FFF176', 
        eighth: '#FFE57F', 
        vuetifyLight: '#FFD600', 
        vuetifyDark: '#FFC107'
    } }

	], custom: true})
Vue.use(ScreensharePlugin)

window.Vue = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
