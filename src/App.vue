<template>
  <v-app id="app" class='blue-theme'>
    <tool-bar></tool-bar>

    <div class='sandbox'>
      <div class="description">
        <v-alert type="info" :value="true">
          This alert demonstrates the Vuetify Theming addition to the color theme plugin!
        </v-alert>
        <h1 style='text-align:center;'>Test New Components Here!</h1>
        <p>
            This page should be used to test new components that will be added to the JS Catalyst repo. The sections below have sizes of 300px, 500px, and 700px in order to test how the new chart looks and performs in varios environments. Please comment out the bar examples below and import your new component. Place one in each of the test divs. Please also check to make sure the chart is responsive by resizing the window. Theming is built into this sandbox environment so please also make sure that your component responds to changes in light/dark themes and in color theme changes. If you need more information on how to do this please check the JS Catalyst docs or contact one of the main developers on the JS Catalyst repo. Thanks for contributing!!
        </p>
      </div>

      <div class="test1">
        <!-- Place Component here -->
        <pie-chart
          :dataModel='pieData'
        ></pie-chart>
      </div>

<!--       <div class="test2">
 -->        <!-- Place Component here -->
        <!-- <bar-chart
          propID='bar2'
          :dataModel='barData'
        ></bar-chart> -->
<!--         <chart-sender></chart-sender>
      </div>
 -->
<!--       <div class="test3">
 -->        <!-- Place Component here -->
<!--         <bar-chart
          propID='bar3'
          :dataModel='barData'
        ></bar-chart>
      </div>
 -->
    </div>
  </v-app>
</template>

<script>
import PieChart from '@/components/visualizations/d3/PieChart.vue'
import Toolbar from '@/sandbox/Toolbar.vue'
import ChartSenderComponent from '@/components/ChartSenderComponent.vue'
// import PieData from '@/assets/mocks/d3/pieChartMock.js'

export default {
  name: 'app',
  components: {
    'pie-chart': PieChart,
    'tool-bar': Toolbar,
    'chart-sender': ChartSenderComponent
  },
  data: function() {
    return {
      barData: [
        {"x": "5/15 - 6/14", "y": 13.3},
        {"x": "6/14 - 7/14", "y": 12.08},
        {"x": "7/14 - 8/13", "y": 14.62},
        {"x": "8/13 - 9/12", "y": 17.57},
        {"x": "9/12 - 10/12", "y": 14.35}
      ],
      pieData: [{"label":"Cambridge","value":55},{"label":"Gloves","value":48},{"label":"Auto","value":45},{"label":"Planner","value":50},{"label":"Granite","value":55},{"label":"Canterbury","value":54},{"label":"Architect","value":48},{"label":"Markets","value":46},{"label":"Cotton","value":52},{"label":"Agent","value":47}]
    }
  }
}
</script>

<style>
  .sandbox {
    display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-gap: 20px;
  }
  .description {
    grid-column: 2/12;
  }
  .test1 {
    border: solid 1px;
    height: 600px;
    grid-column: 2/12;
  }
  .test2 {
    border: solid 1px;
    height: 500px;
    grid-column: 2/12;
  }
  .test3 {
    border: solid 1px;
    height: 700px;
    grid-column: 2/12;
  }

  .theme--light .alert.info {
    color: black !important;
  }

  .theme--dark .alert.info {
    color: white;
  }
</style>
