<template>
  <div class="main-page">
    <div class="header-image">
      <img src="/static/img/header-image.png">
      <!-- <img src="/static/svg/green-line.svg" class="green-line">
      <img src="/static/svg/red-line.svg" class="red-line">
      <img src="/static/svg/chart-line.svg" class="chart-line">
      <img src="/static/svg/chart-line.svg" class="chart-line">
      <img src="/static/svg/chart-line.svg" class="chart-line">
      <img src="/static/svg/chart-line.svg" class="chart-line">
      <img src="/static/svg/chart-line.svg" class="chart-line">
      <img src="/static/svg/code.svg" class="code">
      <img src="/static/svg/documentation.svg" class="documentation">
      <img src="/static/svg/chart.svg" class="chart">
      <img src="/static/svg/navbar.svg" class="nav-bar">
      <img src="/static/svg/footer.svg" class="footer-bar">
      <img src="/static/svg/layer-middle.svg" class="layer-middle">
      <img src="/static/svg/layer-bottom.svg" class="layer-bottom"> -->
    </div>
    <div class="header-title" style="z-index: 1;">
      <h1 class="display-2">JS Catalyst</h1>
      <p class="headline my-3">
        An open source platform to support development and lifecycle management of high impact full-stack JavaScript applications in a CI/CD world.
      </p>
      <div>
        <router-link to='get-started' style="text-decoration:none;"><v-btn color="primary" class="ml-0">Get Started</v-btn></router-link>
        <v-btn color="info" outline>Github</v-btn>
        <v-btn color="info" outline>Get help</v-btn>
      </div>
    </div>
    <div class="feature-card-image graph mt-3"><img src="/static/img/graph.png"></div>
    <div class="feature-card-1">
      <v-card class="feature-card">
        <v-card-title primary-title>
          <h3 class="headline">Visualizations</h3>
          <div class="subheading">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mb-4 info">View More</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
    <div class="feature-card-image blotter mt-3"><img src="/static/img/blotter.png"></div>
    <div class="feature-card-2">
      <v-card class="feature-card">
        <v-card-title primary-title>
          <h3 class="headline">Blotters</h3>
          <div class="subheading">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mb-4 info">View More</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
    <div class="feature-card-image sendtest mt-3"><img src="/static/img/test.png"></div>
    <div class="feature-card-3">
      <v-card class="feature-card">
        <v-card-title primary-title>
          <h3 class="headline">Send &amp; Receive Test</h3>
          <div class="subheading">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mb-4 info">View More</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
    <div class="footer py-5 text-xs-center justify-space-around">
      <div class="white--text">
        <div class="pb-4">
          <v-icon class="mx-2" color="white" large>mdi-github-circle</v-icon>
          <v-icon class="mx-2" color="white" large>mdi-twitter</v-icon>
          <v-icon class="mx-2" color="white" large>mdi-linkedin</v-icon>
        </div>
        <h3 class="headline">Get updates for JS Catalyst</h3>
        <v-form>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="email"
          >
          </v-text-field>
          <v-btn
            @click="submit"
          >
            submit
          </v-btn>
        </v-form>
      </div>
    </div>
    <div id="rectangle"></div>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  methods: {
    getStarted: function(){
      alert('get started')
    }
  },
  mounted(){
    // debugger
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #rectangle {
    width: 600px;
    height: 600px;
    left: -260px;
    top: 50px;
    background: radial-gradient(ellipse farthest-side at 100% 100%, #3D59FF 20%, #30398a 75%, #1A247D 110%);
    position: absolute;
    transform: skew(60deg, -35deg);
    /* grid-column: 1 / 5; */
    grid-area: rec;
    grid-row: 1 / 2;
    z-index: 0;
  }

  .header-image {
    grid-area: hi;
    margin-top: 140px;
    z-index: 1;
  }

  .header-image > img {
    margin-left: 200px;
  }

  .header-title {
    grid-area: ht;
    padding: 120px 0px;
  }

  .feature-card {
    padding: 40px 40px 20px 40px;
  }

  .graph {
    grid-area: gp;
    position: relative;
    right: 80px;
  }

  .blotter {
    grid-area: bl;
  }

  .sendtest {
   grid-area: st;
   position: relative;
   right: 80px;
  }

  .feature-card-1 {
    grid-area: fc1;
    z-index: 1;
  }

  .feature-card-2 {
    grid-area: fc2;
  }

  .feature-card-3 {
    grid-area: fc3;
  }

  .feature-card-1, .feature-card-2, .feature-card-3 {
    margin: 40px 0px;
  }

  .footer {
    grid-area: ft;
  }

  .main-page {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 80px 20px;
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas:
      ". . hi hi hi hi ht ht ht ht . ."
      ". . . fc1 fc1 fc1 gp gp . . . ."
      ". . . bl bl bl fc2 fc2 fc2 . . ."
      ". . . fc3 fc3 fc3 st st . . . ."
      "ft ft ft ft ft ft ft ft ft ft ft ft";
  }

  .footer {
    background-image: radial-gradient(ellipse farthest-side at 100% 100%, #3D59FF 30%, #30398a 50%, #1A247D 110%);
  }

  @media (max-width: 1440px) {
    .main-page {
      /* background-color: blue; */
      grid-template-areas:
        ". hi hi hi hi . ht ht ht ht ht ."
        ". . fc1 fc1 fc1 fc1 gp gp  . . . ."
        ". . bl bl bl bl fc2 fc2 fc2 fc2 . ."
        ". . fc3 fc3 fc3 fc3 st st . . . ."
        "ft ft ft ft ft ft ft ft ft ft ft ft";
    }
    .header-image > img {
      margin-left: 160px;
    }
    #rectangle {
      left: -500px;
    }
  }

  @media (max-width: 1024) {
    .main-page {
      /* background-color: pink; */
    }
    .header-image > img {
      margin-left: -30px;
    }
    #rectangle {
      left: -730px;
    }
  }

  @media (max-width: 768px) {
    .main-page {
      /* background-color: red; */
      grid-template-areas:
        "hi hi hi hi hi hi ht ht ht ht ht ."
        "ht ht ht ht ht ht ht ht ht ht ht ht"
        "fc1 fc1 fc1 gp gp gp gp gp gp . . ."
        ". . bl bl bl bl . fc2 fc2 fc2 fc2 ."
        ". . fc3 fc3 fc3 fc3 st st . . . ."
        "ft ft ft ft ft ft ft ft ft ft ft ft";
    }
    .header-image > img {
      width: 110%;
      margin: 60px 0px 0px -20px;
    }
    /* .feature-card-image > img {
      width: 100%;
    } */
    #rectangle {
      left: -820px;
    }
  }

  @media (max-width: 480px) {
    .main-page {
      /* background-color: orange; */
      grid-gap: 0px 20px;
      grid-template-areas:
        ". ht ht ht ht ht ht ht ht ht ht ."
        ". hi hi hi hi hi hi hi hi hi hi ."
        ". fc1 fc1 fc1 fc1 fc1 fc1 fc1 fc1 fc1 fc1 ."
        ". fc2 fc2 fc2 fc2 fc2 fc2 fc2 fc2 fc2 fc2 ."
        ". fc3 fc3 fc3 fc3 fc3 fc3 fc3 fc3 fc3 fc3 ."
        "ft ft ft ft ft ft ft ft ft ft ft ft";
    }
    #rectangle, .feature-card-image {
      display: none;
    }
    .header-image {
      margin-top: 0px;
    }
    .header-image > img {
      width: 100%;
      margin: 0 auto;
    }
    .header-title {
      grid-area: ht;
      padding: 40px 0px;
    }
  }
</style>
