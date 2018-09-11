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
          <img class="responsive-img" id="logo" src="/static/ep-logo-black.png" style="cursor: pointer;" title="Home" alt="Back To Homepage">
        </template>
        <template v-else>
          <img class="responsive-img" id="logo" src="/static/ep-logo-yellow.png" style="cursor: pointer;" title="Home" alt="Back To Homepage">
        </template>
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

          <v-menu offset-y open-on-hover max-height="400px">
            <v-btn flat slot="activator" class="navBtn">Themes
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in themes" :key="item" @click="chooseTheme(item)">
                <v-list-tile-title>{{ item }}</v-list-tile-title>
                  <v-icon :color="item.toLowerCase()">brightness_1</v-icon>
              </v-list-tile>
              <v-list-tile @click="addColor()">
                <v-list-tile-title>New</v-list-tile-title>
                <v-icon>add</v-icon>
              </v-list-tile>
            </v-list>
          </v-menu>

        </v-toolbar-items>

        <!-- Collapsed nav menu for mobile -->
        <v-toolbar-items class="hidden-lg-and-up">
          <v-tooltip bottom>
            <v-btn icon @click="toggleDark" slot="activator">
              <v-icon class="">lightbulb_outline</v-icon>
            </v-btn>
            <span>Toggle light/dark</span>
          </v-tooltip>
          <v-menu max-height="400px">
            <v-icon slot="activator">menu</v-icon>
            <v-list>
              <v-list-tile v-for="item in themes" :key="item" @click="chooseTheme(item)">
                <v-list-tile-title>{{ item }}</v-list-tile-title>
                  <v-icon :color="item.toLowerCase()">brightness_1</v-icon>
              </v-list-tile>
              <v-list-tile @click="addColor()">
                <v-list-tile-title>New</v-list-tile-title>
                <v-icon>add</v-icon>
              </v-list-tile>
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

    <v-dialog v-model="showColorPicker" max-width="600">
      <v-card>
        <v-card-title class="headline text-leg-center text-md-center text-sm-center">
          Choose New Theme Color
        </v-card-title>
        
        <v-card-text>
          <v-layout row>
            <v-text-field placeholder="Enter theme name..." v-model="newThemeName"></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              Choose a primary color:
              <color-picker v-model="newPrimaryColor"></color-picker>
            </v-flex>
            <v-flex>
              Choose an accent color:
              <color-picker v-model="newAccentColor"></color-picker>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-btn color="success" @click="saveTheme()">Save Theme</v-btn>
          <v-btn color="error" @click="showColorPicker = !showColorPicker">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

import styleTogglerMixin from '@/mixins/styleTogglerMixin.js'
import { Chrome } from 'vue-color';

  export default {
    components: {
      'color-picker': Chrome
    },
    props: [

    ],
    mixins: [styleTogglerMixin],
    data: function () {
      return {
        showColorPicker: false,
        newPrimaryColor: {},
        newAccentColor: {},
        newThemeName: ""
      }
    },
    mounted() {
      if (this.$store.state.themeMod) this.chooseTheme(this.colorTheme);
    },
    computed: {
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
      },
      themes () {
        return this.allThemes;
      }
    },
    methods: {
      refreshScreen: function(){
        location.reload();
      },
      addColor () {
        this.showColorPicker = true;
      },
      saveTheme() {
        let payload = {
          primary: this.newPrimaryColor.hex,
          accent: this.newAccentColor.hex,
          name: this.newThemeName
        };

        this.$store.commit("saveCustomTheme", payload)

        let themeCSS = `
          .${this.newThemeName}-theme { 
            --first: ${this.newPrimaryColor.hex};
            --second: ${this.newAccentColor.hex};
            --third: ${this.newPrimaryColor.hex};
            --fourth: ${this.newAccentColor.hex};
            --fifth: ${this.newPrimaryColor.hex};
            --sixth: ${this.newAccentColor.hex};
            --seventh: ${this.newPrimaryColor.hex};
            --eighth: ${this.newAccentColor.hex};
          }
        `
        let style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(themeCSS));
        document.head.appendChild(style);

        this.showColorPicker = false;
        this.newPrimaryColor = {};
        this.newAccentColor = {};
        this.newThemeName = "";
      }
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
      font-family: 'Roboto';
      font-weight: normal;
  }

  .picker-container { 
    display: flex;
  }

  .picker {
    flex-grow: 1;
    margin-left: 5%;
  }

</style>
