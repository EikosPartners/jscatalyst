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
        themeColors: []
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
        }
      }
    })

  }
}

export default themes;
