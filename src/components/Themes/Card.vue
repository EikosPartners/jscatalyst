<template>
  <v-card>
    <v-card-media src="http://via.placeholder.com/420x200" height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Card Title Text</h3>
        <div>Integer posuere, mi et commodo pretium, eros mi volutpat dolor, et malesuada enim tellus quis augue...</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange">Action</v-btn>
      <v-btn flat color="orange">View</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'theme-card',
    data () {
      return {
        card_text: 'Integer posuere, mi et commodo pretium, eros mi volutpat dolor, et malesuada enim tellus quis augue.'
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
