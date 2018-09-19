import defaultThemes from './themeObjects.js'

const themes = {
  install(Vue, options) {
    let {store, defaultThemeOptions, custom, customThemes} = options
    let themes
    if (!store) {
         throw new Error("Please provide vuex store.");
    }
    if (!defaultThemeOptions) {
        themes = defaultThemes
    } else {
      themes = defaultThemeOptions.map(item=>item.toLowerCase())
      themes = themes.map(item=>{
        return defaultThemes.filter(theme=>{return theme.name === item})[0]
      }).filter(item=>item)
    }
    if (!custom) {
      custom = false
    }
    if (customThemes){
      themes = [...themes, ...customThemes]
    }
    store.registerModule('themeMod', {
      state: {
        colorTheme: 'blue',
        displayTheme: 'light',
        allThemes: themes,
        customEnabled: custom
      },
      mutations: {
        changeColor: function(state, payload) {
          state.colorTheme = payload;
        },
        changeDisplay: function(state, payload) {
          state.displayTheme = payload;
        },
        // changeColorArray: function(state, payload) {
        //   state.themeColors = payload
        // },
        saveCustomTheme: function (state, payload) {
          state.allThemes = [...state.allThemes, payload]
          state.customThemes = [...state.customThemes, payload]
        },
        toggleAllowCustom: function(state, payload){
          state.customEnabled = !state.customEnabled
        }
      },
      getters: {
        getCustomTheme: function (state, getters) {
          return state.customThemes.filter( (theme) => { return theme.name.toLowerCase() === state.colorTheme })[0];
        },
        themeColors: function (state, getters) {
          let currentTheme = state.allThemes.filter(theme=>{ return theme.name.toLowerCase() === state.colorTheme }) [0] || {}
          return currentTheme.themeColors 
        },
        customThemes: function (state, getters) {
          state.allThemes.filter(theme=>{return theme.isCustom == true})
        }
      }
    })
  },
}

export default themes;
