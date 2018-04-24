<template>
  <div>
    <v-spacer style="height:100px;"></v-spacer>
    <router-link to="/">
      <v-jumbotron :gradient="gradient" dark>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3">404 - Page Not Found!</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'NotFoundComponent',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      gradient: 'to bottom, #e96443, #904e95'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  /*color: #42b983;*/
  text-decoration: none;
}
</style>
