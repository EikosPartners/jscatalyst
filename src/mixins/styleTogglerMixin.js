const styleTogglerMixin = {

	methods: {
		toggleDark: function() {
		    var current = Array.from(this.$root.$el.classList).filter(el => el.includes('theme--'))
		    var opposite = 'theme--' + (current[0].split('--')[1] === 'light' ? 'dark' : 'light');
		  	this.$root.$el.className = this.$root.$el.className.replace(current, opposite)
		  	this.$store.commit('changeDisplay', opposite.split('--')[1])
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
		    var colors = themeStyles.split(': ').slice(1).map(hex => hex.slice(0,7))
		    return colors
		}
	}
}
export default styleTogglerMixin;
