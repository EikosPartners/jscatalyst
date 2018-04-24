<template>
  <v-layout row justify-center>
    <v-card>
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model='username' label="Username" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model='password'label="Password" type="password" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="login">Login</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      :timeout="3000"
      color="success"
      v-model="snackbar"
      top
    >
      {{ message }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
  export default {
    data: function() {
      return {
        username: '',
        password: '',
        email: '',
        snackbar: false
      }
    },
    computed: {
      authenticated: function() {
        return !this.$store.state.authMod.authenticated
      },
      message: function() {
        return this.$store.state.authMod.authMessage
      }
    },
    methods: {
      login: function() {
        var username = this.username
        var password = this.password
        this.$store.dispatch('login', {username, password})
        this.snackbar = true;
      }
    }
  }
</script>

<style lang="css">
</style>
