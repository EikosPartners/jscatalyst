import defaultThemes from './themeObjects.js'

const themes = {
  /*
  installtion options
    store - provide the store so the module can be registered 
    defaultThemeOptions - if the user would like to use a subset of the seven initially provided themes
      array of names a la ['blue', 'Pink', 'yEllow'] 
    custom - boolean to determine if the themeChooser will allow creating themes from the UI
    customThemes - if the user wants to provide an initial custom theme 
      array of objects each object like {name: 'Custom Theme', themeColors: {first: , second:, ...etc }}
  */
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
      customThemes = customThemes.map(item=>{
        item.isCustom = true
        item.name = item.name.toLowerCase()
        return item
      })
      themes = [...themes, ...customThemes]
    }

    let initialTheme = themes[0]

    let themeCSS = `
                    .current-theme { 
                        --first: ${initialTheme.themeColors.first};
                        --second: ${initialTheme.themeColors.second};
                        --third: ${initialTheme.themeColors.third};
                        --fourth: ${initialTheme.themeColors.fourth};
                        --fifth: ${initialTheme.themeColors.fifth};
                        --sixth: ${initialTheme.themeColors.sixth};
                        --seventh: ${initialTheme.themeColors.seventh};
                        --eighth: ${initialTheme.themeColors.eighth};

                        --vuetify-light: ${initialTheme.themeColors.vuetifyLight};
                        --vuetify-dark: ${initialTheme.themeColors.vuetifyDark};
                    }
                `

      let style = document.createElement("style");
      style.type = "text/css";
      style.id = "current-theme";
      style.appendChild(document.createTextNode(themeCSS));
      document.head.appendChild(style);


    store.registerModule('themeMod', {
      state: {
        colorTheme: initialTheme.name,
        displayTheme: 'light',
        allThemes: themes,
        customEnabled: custom,
      },
      mutations: {
        changeColor: function(state, payload) {
          state.colorTheme = payload;
        },
        changeDisplay: function(state, payload) {
          state.displayTheme = payload;
        },
        saveCustomTheme: function (state, payload) {
          state.allThemes = [...state.allThemes, payload]
        },
        toggleAllowCustom: function(state, payload){
          state.customEnabled = !state.customEnabled
        }
      },
      getters: {
        themeColors: function (state, getters) {
          let currentTheme = state.allThemes.filter(theme=>{ return theme.name.toLowerCase() === state.colorTheme }) [0] || {}
          return currentTheme.themeColors 
        },
        customThemes: function (state, getters) {
          return state.allThemes.filter(theme=>{return theme.isCustom == true})
        }
      },
    })
  } 
  
}

export default themes;
