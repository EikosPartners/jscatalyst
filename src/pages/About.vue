<template>
  <!-- <v-card-text>
    <v-tabs slider-color="black" v-model="aboutTabs" :scrollable="false">
      <v-tab active-class="tabActive" href="#overview">Overview</v-tab>
      <v-tab active-class="tabActive" href="#contact">Contact</v-tab>
    </v-tabs>
    <v-tabs-items v-model="aboutTabs">
      <v-tab-item id="overview" >
        <p>
        JS Catalyst.
        </p>
      </v-tab-item>
      <v-tab-item id="contact">
        <p>
        JSCatalyst.
        </p>
      </v-tab-item>
    </v-tabs-items>
  </v-card-text> -->
  <v-card width="50%" class="mt-5" style="margin: 0 auto;">
    <v-card-media src="/static/img/about.jpg" height="400px"></v-card-media>
    <v-card-title class="title px-5 mt-3">About</v-card-title>
    <v-card-text class="body-2 px-5">
      JSCatalyst is an Open Source Platform to support development and lifecycle management of high impact full-stack JavaScript applications in a CI/CD world. The platform accelerates application development and provides both designers and developers with tools to declaratively build user interfaces that function across all types of devices and browsers. A tier one investment bank and top 10 hedge fund have already deployed the toolkit, with an institutional asset manager going through a POC.<br/><br/>
      JSCatalyst is owned and managed by Eikos Partners, a financial software consultancy firm that specializes in financial technology solutions and practices. If you wish to speak with a solutions specialist, contact us. Complete the form below and we will get back to you shortly.
    </v-card-text>
    <v-form class="px-5 mt-3"> <v-container grid-list-lg>
        <v-layout>
          <v-flex xs12 sm12 md6 lg6 row wrap>
            <v-text-field
              label="Name"
              v-model="name"
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md6 lg6 row wrap>
            <v-text-field
              label="Company"
              v-model="company"
              :error-messages="companyErrors"
              @input="$v.company.$touch()"
              @blur="$v.company.$touch()"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 sm12 md6 lg6 row wrap>
            <v-text-field
              dense
              label="E-mail"
              v-model="email"
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md6 lg6 row wrap>
            <v-text-field
              label="Phone Number"
              v-model="phone"
              :error-messages="phoneErrors"
              @input="$v.phone.$touch()"
              @blur="$v.phone.$touch()"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-select
              label="I'm interested in:"
              v-model="select"
              :items="items"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
              multi-line
              name="message"
              label="Please write your message here"
              :error-messages="messageErrors"
              @input="$v.message.$touch()"
              @blur="$v.message.$touch()"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="submit">submit</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
  import $ from "jquery";
  import { required, email, alphaNum } from 'vuelidate/lib/validators'

  export default {
    data: function() {
      return {
        name: '',
        company: '',
        email: '',
        phone: '',
        select: null,
        message: '',
        items: [
          'Receive general information',
          'Discuss a POC',
          'Optimize business processes',
          'Leverage JSCatalyst',
          'Partner with Eikos Partners',
          'blog for Eikos Partners'
        ]
      }
    },
    methods: {
    },
    validations: {
      name: { required, name },
      company: { required, alphaNum },
      email: { required, email },
      phone: { required },
      message: { required }
    },
    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      companyErrors () {
        const errors = []
        if (!this.$v.company.$dirty) return errors
        !this.$v.company.required && errors.push('Company name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.phone && errors.push('Must be valid phone number')
        !this.$v.phone.required && errors.push('Phone number is required')
        return errors
      },
      messageErrors () {
        const errors = []
        if (!this.$v.message.$dirty) return errors
        !this.$v.message.message && errors.push('Please enter a message here')
        !this.$v.message.required && errors.push('Message is required')
        return errors
      }
    },
    watch: {
    }
  };
</script>

<style>
</style>
