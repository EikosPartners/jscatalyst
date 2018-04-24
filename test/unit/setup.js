import Vue from 'vue'
import moment from 'moment'
// var windowmanager = require('../../windowmanager/windowmanager.min.js')

Vue.config.productionTip = false
Vue.prototype.moment = moment
HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
  return {
    // mock functions for the d3 horizon chart
    clearRect: function() {},
    fillRect: function() {},
    translate: function() {},
    scale: function() {}
  }
};
global.CanvasRenderingContext2D = () => ('');
global.URL.createObjectURL = () => {}
// global.windowmanager = windowmanager
