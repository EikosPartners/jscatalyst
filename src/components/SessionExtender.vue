<template>
  <v-layout row justify-center>
    <v-dialog v-model='expiresSoon' persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Your session will expire soon please verify your credentials</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model='username' label="Username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='password' label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data: function() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      expiresSoon: function() {
        return this.$store.state.expiresSoon;
      }
    },
    methods: {
      login: function() {
        var username = this.username;
        var password = this.password;
        this.username = '';
        this.password = '';
        this.$store.dispatch('login', {username, password});
      }
    }
  }
</script>

<style lang="css">
</style>
