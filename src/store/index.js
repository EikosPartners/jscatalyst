import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    gridEndpoint: 'http://localhost:8080/data',
    menu: null
  },
  mutations: {
    //Vue Socket.IO allows for direct interaction with the Vuex store if it is instantiated with the store as a argument
    SOCKET_USERS: function(state, payload) {
      console.log(payload);
      // state.allUsers = payload
    },
    SOCKET_SHARECHARTS: function(state, payload) {
      console.log(state, payload);
    },
    toggleMenu: function(state, payload) {
      state.menu = !state.menu
    }
  }
})
