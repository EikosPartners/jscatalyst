const themes = {
  install(Vue, options) {
    let {store, themes} = options
    if (!store) {
         throw new Error("Please provide vuex store.");
    }
    if (!themes) {
         throw new Error("Please provide themes.");
    }
    store.registerModule('themeMod', {
      state: {
        colorTheme: 'blue',
        displayTheme: 'light',
        allThemes: themes,
        themeColors: [],
        customThemes: []
      },
      mutations: {
        changeColor: function(state, payload) {
          state.colorTheme = payload;
        },
        changeDisplay: function(state, payload) {
          state.displayTheme = payload;
        },
        changeEndpoint: function(state, payload) {
          state.gridEndpoint = payload;
        },
        changeColorArray: function(state, payload) {
          state.themeColors = payload
        },
        saveCustomTheme: function (state, payload) {
          state.allThemes = [...state.allThemes, payload.name]
          state.customThemes = [...state.customThemes, payload]
        }
      },
      getters: {
        getCustomTheme: function (state, getters) {
          return state.customThemes.filter( (theme) => { return theme.name.toLowerCase() === state.colorTheme })[0];
        }
      }
    })

  }
}

export default themes;
