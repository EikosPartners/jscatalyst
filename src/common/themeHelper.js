export default {
  displayTheme: function() {
    return this.$store.state.themeMod ? this.$store.state.themeMod.displayTheme : 'light';
  },
  colors: function() {
    return this.$store.state.themeMod ? this.$store.state.themeMod.themeColors : ['#081A4E', '#092369','#1A649F','#2485B4','#2DA8C9','#5DC1D0','#9AD5CD','#D5E9CB'];
  },
  theme: function() {
    return this.$store.state.themeMod ?  this.$store.state.themeMod.colorTheme : 'blue';
  }
}
