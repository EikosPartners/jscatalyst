<template>
  <v-card class='doc-description'>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{title}}</h3>
    </v-card-title>
    <v-card-text class='doc-text'>
      {{text}}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      text: {
        type: String
      }
    }
  }
</script>

<style lang="css" scoped>
  .doc-description {
    width: 90%;
    margin: auto;
    background-color: lightgrey;
    height: 70%;
  }
  .doc-text {
    display: inline-block;
  }
</style>
