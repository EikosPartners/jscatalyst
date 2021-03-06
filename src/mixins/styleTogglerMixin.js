import { mapGetters } from "vuex";

function hex2rgb(hex) {
  return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}


const styleTogglerMixin = {

methods: {
    toggleDark: function(newDarkness) {
        let current, opposite
        if (!newDarkness || typeof newDarkness !== 'string') {
          current = Array.from(this.$root.$el.classList).filter(el => el.includes('theme--'))
          opposite = 'theme--' + (current[0].split('--')[1] === 'light' ? 'dark' : 'light');
        } else {
          current = 'theme--' + (newDarkness === 'light' ? 'dark' : 'light')
          opposite = 'theme--' + newDarkness
        }
        this.$root.$el.className = this.$root.$el.className.replace(current, opposite)
        this.$store.commit('changeDisplay', opposite.split('--')[1])
        let otherElements = document.querySelectorAll('.' + current)
        Array.from(otherElements).forEach(element=>{
          element.classList.remove(current)
          element.classList.add(opposite)
        })
        if (opposite === 'theme--dark') {
          this.$vuetify.theme.info = this.$store.getters.themeColors.vuetifyDark
        } else if (opposite === 'theme--light')  {
          this.$vuetify.theme.info = this.$store.getters.themeColors.vuetifyLight
        }

      },
      chooseTheme: function(theme) {
        this.$store.commit('changeColor', theme)
        let themeColors = this.$store.getters.themeColors
        let themeCSS = `
                    .current-theme {
                        --first: ${themeColors.first};
                        --second: ${themeColors.second};
                        --third: ${themeColors.third};
                        --fourth: ${themeColors.fourth};
                        --fifth: ${themeColors.fifth};
                        --sixth: ${themeColors.sixth};
                        --seventh: ${themeColors.seventh};
                        --eighth: ${themeColors.eighth};

                        --vuetify-light: ${themeColors.vuetifyLight};
                        --vuetify-dark: ${themeColors.vuetifyDark};
                    }
                `


      if (this.$store.state.themeMod.displayTheme === 'light') {
        this.$vuetify.theme.info = themeColors.vuetifyLight
      } else {
        this.$vuetify.theme.info = themeColors.vuetifyDark
      }
        document.querySelectorAll('style#current-theme')[0].innerText = themeCSS
      }
  },
  mounted(){
  	  this.$root.$el.classList.add('current-theme')
  }


		//
}
export default styleTogglerMixin;
