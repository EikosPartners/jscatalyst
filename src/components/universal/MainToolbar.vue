<template>
  <div class="window-drag">
      <v-toolbar class="nav-toolbar window-drag"
        app
        clipped-left
        fixed
        style="z-index:5;"
      >
        <!-- DROP A LOGO HERE -->
        <router-link to="/"><img class="responsive-img" id="logo" src="/static/img/ep-logo-black.png" style="cursor: pointer;" title="Home" alt="Back To Homepage"></router-link>
        <h1 id="headerText">JS Catalyst</h1>
        <v-spacer></v-spacer>

        <!-- Full nav menu for larger screens -->
        <v-toolbar-items class="hidden-md-and-down">
          <v-tooltip bottom>
            <v-btn icon @click="toggleDark" slot="activator">
              <v-icon class="">lightbulb_outline</v-icon>
            </v-btn>
            <span>Toggle light/dark</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn icon @click.stop="" slot="activator">
              <!-- share function when available: @click="shareURL" -->
              <v-icon class="">share</v-icon>
            </v-btn>
            <span>Share</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn icon @click.stop="refreshScreen" slot="activator">
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>Refresh</span>
          </v-tooltip>

          <!-- <v-btn small flat @click.stop="aboutModal = true" class="navBtn">About</v-btn> -->
          <v-btn flat :to='{name: "About"}' class="navBtn">About</v-btn>
          <v-menu offset-y open-on-hover max-height="400px">
            <v-btn flat slot="activator" class="navBtn">Themes
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in themes" :key="item" @click="chooseTheme(item)">
                <v-list-tile-title>{{ item }}</v-list-tile-title>
                  <v-icon :color="item.toLowerCase()">brightness_1</v-icon>

              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu v-if='authenticated' offset-y open-on-hover max-height="400px">
            <v-btn flat slot="activator" class="navBtn">User
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in userMenu" :key="item.title" @click="item.action">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu v-else>
            <v-btn flat :to='{name: "Login"}' slot="activator" class="navBtn">Login</v-btn>
            <v-btn flat :to='{name: "Signup"}' slot="activator" class="navBtn">Signup</v-btn>
          </v-menu>

        </v-toolbar-items>

        <!-- Collapsed nav menu for mobile -->
        <v-toolbar-items class="hidden-lg-and-up">
          <v-menu max-height="400px">
            <v-icon slot="activator">menu</v-icon>
            <v-list>
              <v-list-tile v-for="item in collapsedUserMenu" :key="item.title" @click.stop="item.action">
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile>
              <template v-if='authenticated'>
                <v-list-tile v-for="item in userMenu" :key="item.title" @click.stop="item.action">
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile>
              </template>
              <template v-else>
                <v-list-tile class='list__tile--link'>
                  <v-list-tile-title><router-link :to='{name: "Login"}' style='text-decoration: none'>Login</router-link></v-list-tile-title>
                </v-list-tile>
                <v-list-tile class='list__tile--link'>
                  <v-list-tile-title><router-link :to='{name: "Signup"}' style='text-decoration: none'>Signup</router-link></v-list-tile-title>
                </v-list-tile>
              </template>
            </v-list>
          </v-menu>
        </v-toolbar-items>

      </v-toolbar>


    <v-card-title>
        <div class="headline" style="width:100%;">
          <span style="margin-top: 2px; float: left;">Ticket Detail</span>
          <v-icon small id="onHoverBtn" style="float:right; margin-right:0px; margin-top: 6px;" @click.stop="closeModal">close</v-icon>
      </div>
    </v-card-title>

    <!-- About Modal -->
    <!-- <v-dialog v-model="aboutModal" scrollable max-width="60%">
      <v-card>
        <v-card-title class="pb-0">
          <div class="headline" style="width:100%;">
            <span style="float: left;">About JS Catalyst</span>
            <v-icon small class="onHoverBtn" style="float:right; margin-right:0px; margin-top: 6px;" @click.stop="closeModal">close</v-icon>
          </div>
        </v-card-title>
        <about :aboutModal="aboutModal" />
      </v-card>
    </v-dialog> -->

  </div>
</template>

<script>

import About from '@/pages/About.vue'
import styleTogglerMixin from '@/mixins/styleTogglerMixin.js'

  export default {
    components: {
      'About': About
    },
    props: [

    ],
    mixins: [styleTogglerMixin],
    data: function () {
      return {
        // aboutModal: false,
        //dashboards:['catstats', 'process', 'alerts', 'kpi', 'chasing','css','executive', 'example', 'scorecard'],
        dashboards:[],
        userMenu: [
        { title: 'Help & Feedback', action: () => {alert('Help And feedback')}},
        { title: 'User Preferences', action: () => {alert('User Preferences')}},
        { title: 'Password Reset', action: () => {alert('password Reset')}},
        { title: 'Logout', action: () => { this.logout()}}
        ],
        collapsedUserMenu: [
          { title: 'Share'},
          { title: 'Refresh', action: () => {this.refreshScreen}},
          { title: 'About', action: () => {this.openModal }}
          ],
        showTabs: false,
        windowTabs: {},
        shareLink: '',
        falseParam: false,
        activeTab: '',
        windowLocaton: window.location.href,
        themes: [],
        isFin: windowmanager.runtime.isOpenFin
      }
    },
    mounted() {
      if (this.isFin) {
        document.getElementsByClassName('toolbar__content')[0].classList.add('window-drag')
      }
      this.themes = this.allThemes
    },
    created() {
      if (this.$store.state.themeMod) this.chooseTheme(this.colorTheme);
    },
    computed: {
      authenticated: function() {
        if (!this.$store.state.authMod) {
          return false
        }
        return this.$store.state.authMod.authenticated
      },
      colorTheme: function() {
        if(this.$store.state.themeMod) return this.$store.state.themeMod.colorTheme;
        return 'blue'
      },
      displayTheme: function() {
        if (this.$store.state.themeMod) return this.$store.state.themeMod.displayTheme;
        return 'light'
      },
      allThemes: function() {
        if (this.$store.state.themeMod) return this.$store.state.themeMod.allThemes;
        return ['Blue']
      }
    },
    methods: {
      tbd: function(){
        alert('feature not yet implemented')
      },
      closeModal: function(){
          this.aboutModal = false
      },
      openModal: function(){
          this.aboutModal = true
      },
      refreshScreen: function(){
        location.reload();
      },
      logout: function() {
        this.$store.dispatch('logout')
        this.$router.replace('/')
      }
    },
  }
</script>


<style lang="stylus">
  .navBtn
    width: 50px!important

  .responsive-img
      max-height: 46px!important
      padding-top: 5px

  .nav-toolbar
    -webkit-box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1)
    -moz-box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1)
    box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1)

  .list__tile__title
    font-size: 12px

  i.material-icons
    color: black

  .onHoverBtn:hover
    background-color: #D3D3D3
		cursor: pointer

  #homeButton
    text-decoration: none

  #headerText
    padding-left: 10px
    font-size: 28px
    font-family: 'Roboto'
    font-weight: normal
</style>
