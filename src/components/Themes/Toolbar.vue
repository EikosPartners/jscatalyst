<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-menu :nudge-width="100">
      <v-toolbar-title slot="activator">
        <span>Actions</span>
        <v-icon>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="item in items" :key="item" @click="">
          <v-list-tile-title v-text="item"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu :nudge-width="100">
      <v-toolbar-title slot="activator">
        <span>Color</span>
        <v-icon>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="color in colors" :key="color" @click="changeThemeColor">
          <v-list-tile-title v-text="color"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  import colors from 'vuetify/es5/util/colors'

  export default {
    name: 'theme-toolbar',
    data: () => ({
      items: [
        'All', 'Option 1', 'Option 2', 'Option 3'
      ],
      colors: [
        'Red', 'Orange', 'Dark Yellow', 'Green', 'Blue', 'Purple', 'Dark Ink', 'Black'
      ],
    }),
    methods: {
      changeThemeColor: function(event){
        console.log('this changes color')
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
