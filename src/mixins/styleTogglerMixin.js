function hex2rgb(hex) {
  return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}


const styleTogglerMixin = {

	methods: {
		toggleDark: function() {
		    var current = Array.from(this.$root.$el.classList).filter(el => el.includes('theme--'))
		    var opposite = 'theme--' + (current[0].split('--')[1] === 'light' ? 'dark' : 'light');
		  	this.$root.$el.className = this.$root.$el.className.replace(current, opposite)
		  	this.$store.commit('changeDisplay', opposite.split('--')[1])

		  	if (opposite === 'theme--dark') {
		  		this.$vuetify.theme.info = this.$store.state.themeMod.themeColors[9]
		  	} else if (opposite === 'theme--light')  {
		  		this.$vuetify.theme.info = this.$store.state.themeMod.themeColors[8]
		  	}

	  	},
	    chooseTheme: function(theme) {
	    	var newTheme = theme.toLowerCase() + '-theme'
		    var classes = this.$root.$el.className.slice().split(' ').filter(el => !el.includes('-theme'))
		    classes.push(newTheme)
		    classes = classes.join(' ')
		    this.$root.$el.className = classes
		    this.$store.commit('changeColor', newTheme.split('-')[0])
				this.$store.commit('changeColorArray', this.themeColorArray(newTheme))

	    },
		themeColorArray: function(theme) {
			var styleSheets = Array.from(document.getElementsByTagName("STYLE")).map(el => el.sheet.cssRules).filter(el => el.length)
		    var themeStyles
		    styleSheets.forEach(el => {
		      var style = Array.from(el).filter(rule => rule.selectorText ===`.${theme}`)
		      style.length ? themeStyles = style[0].cssText : null;
		    })
		    var colors = themeStyles.split(':').slice(1).map(hex => hex.slice(0,8).trim())
		    console.log(colors)
		    var vuetifyLightColor = themeStyles.split('--vuetify-light: ')[1].split(';')[0]
		    console.log(vuetifyLightColor)
		    var vuetifyDarkColor = themeStyles.split('--vuetify-dark: ')[1].split(';')[0]
		    console.log(vuetifyDarkColor)

		    if (this.$store.state.themeMod.displayTheme === 'light') {
		   		this.$vuetify.theme.info = vuetifyLightColor
		    } else {
		   		this.$vuetify.theme.info = vuetifyDarkColor
		    }

		    return colors
		}
	}
}
export default styleTogglerMixin;
