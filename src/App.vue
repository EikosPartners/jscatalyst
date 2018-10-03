<template>
  <v-app id="app">
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

     <!-- <div class="test1">
     </div> -->
    
        <!-- Place Component here -->
        <!-- <chartist-pie
          :title="testTitle"
          :dataModel='bubbleData'
        ></chartist-pie>
      </div> -->

<!--       <v-btn @click="testButton"> Test Button </v-btn> -->
<!--       <div class="test2">
 -->        <!-- Place Component here -->
        <!-- <bar-chart
          propID='bar2'
          :dataModel='barData'
        ></bar-chart> -->
<!--         <chart-sender></chart-sender>
      </div>
 -->

      <div class="test2">
        <timeline
          :dataModel="tlData"
          :title="'Presidents'">

        </timeline>
      </div>

      <div class="test2">
          <orgchart
           :dataModel="orgChartData"
           :config="{'allowHtml': true}"/>
      </div>


      <div class="test3">
      <!-- Place Component here -->
        <heatmap
          :dataModel="heatData"
          :dataType="'calendar'"
        ></heatmap>
      </div>

    </div>
  </v-app>
</template>

<script>
import BubbleChart from '@/components/visualizations/d3/BubbleChart.vue'
import BarChart from '@/components/visualizations/d3/BarChart.vue'
import ThemeChooserComponent from '@/components/ThemeChooserComponent.vue'
import ChartistPieChart from '@/components/visualizations/chartist/ChartistPieChart.vue'
import HeatMap from '@/components/visualizations/d3/HeatMap.vue';
import heatData from '@/assets/mocks/d3/dateHeatmapMock.json';

import PieChart from '@/components/visualizations/d3/PieChart.vue'
import Toolbar from '@/components/Toolbar.vue'
import ChartSenderComponent from '@/components/ChartSenderComponent.vue'

import Timeline from '@/components/visualizations/google/Timeline.vue';
import tlData from '@/assets/mocks/google/timelineMock.js';

import OrgChart from '@/components/visualizations/google/OrgChart.vue';
import orgChartData from '@/assets/mocks/google/orgChartMock.js';

export default {
  name: 'app',
  components: {
    'pie-chart': PieChart,
    'tool-bar': Toolbar,
    'chart-sender': ChartSenderComponent,
    'bar-chart': BarChart,
    'bubble-chart': BubbleChart,
    'theme-chooser': ThemeChooserComponent,
    'chartist-pie': ChartistPieChart,
    'heatmap': HeatMap,
    'timeline': Timeline,
    'orgchart': OrgChart
  },
  data: function() {
    return {
      angle: 0,
      tlData: tlData,
      orgChartData, orgChartData,
      testTitle: "Hello World",
      barData: [
        {"x": "5/15 - 6/14", "y": 13.3},
        {"x": "6/14 - 7/14", "y": 12.08},
        {"x": "7/14 - 8/13", "y": 14.62},
        {"x": "8/13 - 9/12", "y": 17.57},
        {"x": "9/12 - 10/12", "y": 14.35}
      ],
      heatData,
      pieData: [{"label":"Cambridge","value":55},{"label":"Gloves","value":48},{"label":"Auto","value":45},{"label":"Planner","value":50},{"label":"Granite","value":55},{"label":"Canterbury","value":54},{"label":"Architect","value":48},{"label":"Markets","value":46},{"label":"Cotton","value":52},{"label":"Agent","value":47}
      ],
      bubbleData: [ {mapped: true, x: 2.1333333333333333, y: 83.3333333333333, value: 6, "label": "tier_1_cat_9" }, {mapped: true, x: 2.5833333333333335, y: 50, value: 2, label: "tier_1_cat_8" }, {mapped: true, x: 1.9333333333333333, y: 80, value: 5, label: "tier_1_cat_7" }, {mapped: true, x: 0.75, y: 28.571428571428598, value: 7, label: "tier_1_cat_6" }, {mapped: true, x: 0.8166666666666667, y: 50, value: 8, label: "tier_1_cat_5" }, {mapped: true, x: 1.9666666666666666, y: 55.5555555555556, value: 9, label: "tier_1_cat_4" }, {mapped: true, x: 1.2333333333333334, y: 57.142857142857096, value: 7, label: "tier_1_cat_3" }, {mapped: true, x: 1.0166666666666666, y: 66.6666666666667, value: 6, label: "tier_1_cat_2" }, {mapped: true, x: 1.4666666666666666, y: 60, value: 5, label: "tier_1_cat_10" }, {mapped: true, x: 1.2333333333333334, y: 25, value: 8, label: "tier_1_cat_1" }]
    }
  },
  mounted(){
  },
  methods: {
    testButton(){
      // this.$store.commit('toggleAllowCustom')

    }

  }, 
  // computed: {
  //   themeColors(){
  //     return this.$store.state.themeMod.themeColors
  //   }
  // }
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
