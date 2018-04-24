<template>
  <div style="display:block;">
    <!-- <v-spacer style="height:200px"></v-spacer> -->
    <v-footer app inset style="position: static;">
     <div class="copyrightInfo">
       © {{ new Date().getFullYear() }} Eikos Partners | <a href="#">Privacy Policy</a> | <a href="#">Site Map</a>
     </div>
     <v-spacer></v-spacer>
     <div class="socialIcons">
       <!-- <a target="_blank" href="https://www.facebook.com/eikosPartners/"><i class="fab fa-facebook iconColor" aria-hidden="true"></i></a> -->
       <!-- <a target="_blank" href="#"><i class="fa fa-instagram iconColor" aria-hidden="true"></i></a> -->
       <!-- <a target="_blank" href="https://twitter.com/eikospartners"><i class="fa fa-twitter-square iconColor" aria-hidden="true"></i></a> -->
       <!-- <a target="_blank" href="https://www.linkedin.com/company/eikos-partners/"><i class="fa fa-linkedin-square iconColor" aria-hidden="true"></i></a> -->
     </div>
     <v-spacer></v-spacer>
     <div class="backToTop">
       <a ref="backToTop" style="cursor:pointer; padding: 10px 12px 0px 0px;" :href="topTagId" alt="back to top" title="back to top">Back to top</a>
       <!-- arrow icon if you want it -->
       <!-- <v-icon color="black" medium id="onHover">arrow_upward</v-icon> -->
     </div>
   </v-footer>
  </div>
</template>

<script>

  export default {
    methods: {
      gotoTop : function() {
        if ( window !== undefined )
          window.scroll(0,0)
      }
    },
    props: {
      topTagId: {
        type: String,
        default: "#app"
      }
    }
  }

</script>
<style>

  a {
    color: black;
  }

  .backToTop {
    font-size: 12px;
    padding-right: 20px;
  }

  .copyrightInfo {
    margin-left: 5%;
  }

  .socialIcons {
    margin-right: 15%;
  }

  .iconColor {
    color: black;
    font-size: 1.5em;
  }

</style>
