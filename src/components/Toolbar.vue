<template>
  <div class="window-drag">
      <v-toolbar class="nav-toolbar window-drag"
        app
        clipped-left
        fixed
        style="z-index:5;"
        color="info"
      >
        <!-- DROP A LOGO HERE -->
        <template v-if="displayTheme === 'light'">
          <img class="responsive-img" id="logo" :src="logoLight" style="cursor: pointer;" title="Home" alt="Back To Homepage">
        </template>
        <template v-else>
          <img class="responsive-img" id="logo" :src="logoDark" style="cursor: pointer;" title="Home" alt="Back To Homepage">
        </template>
        <h1 id="headerText">{{ title }}</h1>
        <v-spacer></v-spacer>

        <!-- Full nav menu for larger screens -->
        <v-toolbar-items class="hidden-md-and-down">
          <v-tooltip bottom>
            <v-btn icon @click="toggleLightDark" slot="activator">
              <v-icon class="">lightbulb_outline</v-icon>
            </v-btn>
            <span>Toggle light/dark</span>
          </v-tooltip>
          <!-- <v-tooltip bottom>
            <v-btn icon @click.stop="toggleLightDark" slot="activator">
              share function when available: @click="shareURL" 
              <v-icon class="">share</v-icon>
            </v-btn>
            <span>Share</span>
          </v-tooltip> --> 
          <v-tooltip bottom>
            <v-btn icon @click.stop="refreshScreen" slot="activator">
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>Refresh</span>
          </v-tooltip>

          <!-- <v-btn small flat @click.stop="aboutModal = true" class="navBtn">About</v-btn> -->
          <theme-chooser @jsc_theme_change="bubbleUp"></theme-chooser>
        </v-toolbar-items>

        <!-- Collapsed nav menu for mobile -->
        <v-toolbar-items class="hidden-lg-and-up">
          <v-tooltip bottom>
            <v-btn icon @click="toggleLightDark" slot="activator">
              <v-icon class="">lightbulb_outline</v-icon>
            </v-btn>
            <span>Toggle light/dark</span>
          </v-tooltip>
          <theme-chooser @jsc_theme_change="bubbleUp"></theme-chooser>
        </v-toolbar-items>

      </v-toolbar>


    <v-card-title>
        <div class="headline" style="width:100%;">
          <span style="margin-top: 2px; float: left;">Ticket Detail</span>
          <v-icon small id="onHoverBtn" style="float:right; margin-right:0px; margin-top: 6px;" @click.stop="closeModal">close</v-icon>
      </div>
    </v-card-title>
  </div>
</template>

<script>
  import ThemeChooserComponent from '@/components/ThemeChooserComponent.vue';
  import styleTogglerMixin from '@/mixins/styleTogglerMixin.js';

  /**
   * Toolbar Component
   * 
   * @module Toolbar
   * 
   * @param {String} title - the title of the toolbar
   * @param {String} logoLight - the URL for the image to use as the logo during light theme
   * @param {String} logoDark - the URL for the image to use as the logo during dark theme
   * 
   * @event jsc_ld_change - Emits a string with either 'light' or 'dark' when that changes
   * @event jsc_theme_change - Emits an object that describes the current theme
   * 
   */
  export default {
    components: {
      'theme-chooser': ThemeChooserComponent
    },
    mixins: [styleTogglerMixin],
    props: {
      title: {
        type: String,
        default: "JS Catalyst"
      },
      logoLight: {
        type: String,
        default: "/static/ep-logo-black.png"
      },
      logoDark: {
        type: String,
        default: "/static/ep-logo-yellow.png"
      }
    },
    methods: {
      refreshScreen: function(){
        location.reload();
      },
      toggleLightDark: function () {
        this.toggleDark();

        this.$emit('jsc_ld_change', this.displayTheme);
      },
      bubbleUp: function (theme) {
        this.$emit('jsc_theme_change', theme);
      }
    },
    computed: {
      displayTheme: function() {
          if (this.$store.state.themeMod) return this.$store.state.themeMod.displayTheme;
          return 'light'
      },
    }
  }
</script>


<style>
  .navBtn {
    width: 50px!important;
  }

  .responsive-img{
      max-height: 46px!important;
      padding-top: 5px;
  }

  .nav-toolbar{
      -webkit-box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1);
      -moz-box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1);
      box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1);
  }

  .list__tile__title{
      font-size: 12px;
  }

  i.material-icons{
      color: black;
  }
  .onHoverBtn:hover{
      background-color: #D3D3D3;
      cursor: pointer;
  }
  
  #homeButton{
      text-decoration: none;
  }

  #headerText{
      padding-left: 10px;
      font-size: 28px;
      font-weight: normal;
  }

</style>
