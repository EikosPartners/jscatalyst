export default {
  displayTheme: function() {
    if (this.$store.state.themeMod) return this.$store.state.themeMod.displayTheme;
     return 'light'
  },
  colors: function() {
    if (this.$store.state.themeMod) return this.$store.state.themeMod.themeColors;
    return ['#081A4E', '#092369','#1A649F','#2485B4','#2DA8C9','#5DC1D0','#9AD5CD','#D5E9CB']
  },
  theme: function() {
    if(this.$store.state.themeMod) return this.$store.state.themeMod.colorTheme;
    return 'blue'
  }
}
