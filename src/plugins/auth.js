import axios from 'axios'

const auth = {
  install(Vue, options) {
    let {router, store, baseURL} = options;
    if (!store) {
         throw new Error("Please provide vuex store.");
    }
    if (!router) {
         throw new Error("Please provide vue router.");
    }
    router.beforeEach((to, from, next) => {
      var path = to.path
      if (store.state.authMod.authenticated === false || store.state.authMod.expiresSoon === false) {
        store.dispatch('checkAuth').then(auth => {
          if (!auth.authenticated && (path !== '/' && path !== '/auth/login' && path !== '/auth/signup')) {
            store.commit('isAuthenticated', false)
            next('/')
          } else if (auth.expiresSoon) {
            store.commit('expiresSoon', auth.expiresSoon)
            next()
          } else {
            next()
          }
        });
      } else {
        next()
      }
    })

    store.registerModule('authMod', {
      state: {
        authenticated: false,
        authMessage: '',
        expiresSoon: false
      },
      mutations: {
        authMessage: function(state, payload) {
          state.authMessage = payload;
        },
        isAuthenticated: function(state, payload) {
          state.authenticated = payload;
        },
        expiresSoon: function(state, payload) {
          state.expiresSoon = payload
        }
      },
      actions: {
        // login action for authentication
        login: function({commit}, user) {
          axios.post(baseURL + '/auth/login', {
              username: user.username,
              password: user.password
          })
          .then(res => {
            if (res.data.success) {
              commit('isAuthenticated', true)
              router.replace('/')
            }
            commit('authMessage', res.data.message)
            commit('expiresSoon', res.data.expiresSoon)
          })
        },
        signup: function({commit}, user) {
          axios.post(baseURL + '/auth/signup', {
              username: user.username,
              password: user.password
          })
          .then(res => {
            if (res.data.success) {
              commit('isAuthenticated', true)
              router.replace('/')
            }
            commit('authMessage', res.data.message)
            commit('expiresSoon', res.data.expiresSoon)
          })
        },
        checkAuth: function({commit}) {
          return axios.get(baseURL + '/checkAuth')
            .then(res => {
              commit('isAuthenticated', res.data.authenticated)
              return res.data
            })
        },
        logout: function({commit}) {
          axios.post(baseURL + '/auth/logout')
            .then(res => {
              commit('isAuthenticated', res.data.authenticated)
            })
        }
      }
    })

  }
}
export default auth;
