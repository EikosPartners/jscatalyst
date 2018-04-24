<template>
  <div>
    <v-btn
      style='background-color: var(--fifth)'
      @click.stop="toggleMenu"
      left
      small
      id='menu-button'
    >
      <v-icon>menu</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-model='menu'
      clipped
      fixed
      app
      stateless
    >
      <v-toolbar flat class="transparent">
        <v-btn
          block
          @click.stop="toggleMenu"
          style='background-color: var(--fifth)'
          id='close-menu'
        >
          <v-icon>chevron_left</v-icon> Close
        </v-btn>
      </v-toolbar>
      <v-list class="mt-3">
        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content><v-list-tile-title class="sidebar-menu parent-page"><router-link :to="{name: 'GetStarted'}">Get Started</router-link></v-list-tile-title></v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <!-- <v-list-tile-avatar><v-icon></v-icon></v-list-tile-avatar> -->
            <v-list-tile-title><router-link :to="{name: 'GetStarted'}" class="sidebar-menu">Overview</router-link></v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <!-- <v-list-tile-avatar><v-icon></v-icon></v-list-tile-avatar> -->
            <v-list-tile-title><router-link :to="{name: 'GetStarted'}" class="sidebar-menu">Dependencies</router-link></v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <!-- <v-list-tile-avatar><v-icon></v-icon></v-list-tile-avatar> -->
            <v-list-tile-title><router-link :to="{name: 'GetStarted'}" class="sidebar-menu">Code Structure</router-link></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="sidebar-menu parent-page">Data Visualizations</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>insert_chart</v-icon> </v-list-tile-avatar>
           <v-list-tile-title>  <router-link :to="{name: 'ComponentTest'}" class="sidebar-menu">Vanilla D3</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>pie_chart</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'PlotlyTest'}" class="sidebar-menu">Plotly</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>bubble_chart</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ChartjsTest'}" class="sidebar-menu">Chartjs</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>trending_down</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ChartkickTest'}" class="sidebar-menu">Chartkick</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>multiline_chart</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ChartistTest'}" class="sidebar-menu">Chartist</router-link> </v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="sidebar-menu">App Communication</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>chat_bubble_outline</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'WindowManagerTest'}" class="sidebar-menu">Window Manager/Chat</router-link> </v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content><v-list-tile-title class="sidebar-menu parent-page"><router-link :to="{name: 'Blotters'}">Blotter Tests</router-link></v-list-tile-title></v-list-tile-content>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>grid_on</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'BlotterTest'}" class="sidebar-menu">In Memory</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>grid_on</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'EnterpriseBlotterTest'}" class="sidebar-menu">Enterprise Client</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>grid_on</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ServerSideBlotterTest'}" class="sidebar-menu">Enterprise Server</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>grid_on</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ViewportBlotterTest'}" class="sidebar-menu">Viewport</router-link> </v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content><v-list-tile-title class="sidebar-menu parent-page">UI Demos</v-list-tile-title></v-list-tile-content>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>settings</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'LiveDashboard'}" class="sidebar-menu">Live Dashboard</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>trending_up</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'SendStockTest'}" class="sidebar-menu">Send Stock Test</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>phone</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'ReceiverTest'}" class="sidebar-menu">Receiver Test</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>web</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'Example'}" class="sidebar-menu">Example Sandbox</router-link> </v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="sidebar-menu">UI Builder</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>build</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'UIBuilder'}" class="sidebar-menu">UI Builder</router-link> </v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="sidebar-menu">Styles</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>palette</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'Themes'}" class="sidebar-menu">Themes</router-link> </v-list-tile-title>
          </v-list-tile>
          <v-list-tile> <v-list-tile-avatar> <v-icon>palette</v-icon> </v-list-tile-avatar>
            <v-list-tile-title>  <router-link :to="{name: 'Themes'}" class="sidebar-menu">CSS Grids</router-link> </v-list-tile-title>
          </v-list-tile>
        </v-list-group>

      </v-list>
    </v-navigation-drawer>
  </div>


</template>

<script>

export default {
  name: 'main-nav-drawer',
  data () {
    return {
    }
  },
  computed: {
    menu: {
      get: function() {
        return this.$store.state.menu
      },
      set: function() {
      }
    }
  },
  methods: {
    toggleMenu: function() {
      this.$store.commit('toggleMenu')
    }
  }
}
</script>

<style lang="stylus" scoped>
  #menu-button {
    position: fixed;
    z-index: 2;
  }

  a {
    text-decoration: none;
  }

  .sidebar-menu {
    font-family: Roboto;
    font-size: 18px;
    line-height: 1.4;
    text-align: left;
    color: #212b36;
    margin-left: 5px;
  }

</style>
