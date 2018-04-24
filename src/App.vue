<template>
  <v-app id="app" class='blue-theme'>
    <session-extender v-if='expiresSoon'></session-extender>
    <main-toolbar></main-toolbar>
    <main-menu></main-menu>
    <v-content style="padding-bottom: 0px;">
      <router-view></router-view>
    </v-content>
    <v-spacer />
    <footer-bar />
  </v-app>
</template>

<script>
import FooterBar from './components/universal/FooterBar.vue'
import Toolbar from './components/universal/MainToolbar.vue'
import SessionExtender from './components/SessionExtender.vue'
import MainMenu from './pages/MainMenu.vue'

export default {
  name: 'app',
  components: {
    'footer-bar': FooterBar,
    'main-toolbar': Toolbar,
    'session-extender': SessionExtender,
    'main-menu': MainMenu
  },
  computed: {
    authenticated: function() {
      return this.$store.state.authenticated
    },
    expiresSoon: function() {
      return this.$store.state.expiresSoon
    }
  },
  watch: {
    authenticated: function(value) {
      value === false ? this.$router.replace('/') : null;
    }
  }
}
</script>

<style lang="stylus">
  .content
    padding-top 0px !important
</style>
