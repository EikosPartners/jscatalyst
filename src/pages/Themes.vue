<template>
  <div class="grey lighten-2 wrapper-themes">
    <div class='alert-bar'>
      <v-alert color="success" icon="check_circle" value="true">
        This is a success alert.
      </v-alert>
    </div>
    <div class='theme-chart'>

      <theme-toolbar/>
      <v-card style="height: 420px">
        <stacked-bar-chart
        :dataModel="stackedBarChartData"
        propID='stackedBarChart'
        dateFormat='M/D/YY'></stacked-bar-chart>
      </v-card>
    </div>
    <div class='table'>
      <theme-table/>
    </div>
    <div class='cards'>
      <div v-for="n in 4" :key="n">
          <theme-card/>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/Themes/Card.vue'
  import Drawer from '@/components/Themes/Drawer.vue'
  import Table from '@/components/Themes/Table.vue'
  import Toolbar from '@/components/Themes/Toolbar.vue'
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  import StackedBarChart from '@/components/visualizations/d3/StackedBarChart.vue'

  import stackedBarChartData from '@/assets/mocks/d3/stackedbarchartMock.json'

  export default {
    name: 'themes',
    data: () => ({
      stackedBarChartData: [],
      possibleThemes: [
        ['#FBEA85', '#EFC26C', '#E29755', '#D86E40', '#AC5033', '#643C30'],
        ['#EDB7A7', '#DD7C91', '#BA5288', '#7C388E', '#50257A', '#351850'],
        ['#45503B', '#747572', '#B090A4', '#DBD9DB', '#E5EBEA'],
        ['#21313E','#20575F','#268073','#53A976','#98CF6F','#EFEE69']
      ]
    }),
    components: {
      'theme-card': Card,
      'theme-drawer': Drawer,
      'theme-toolbar': Toolbar,
      'theme-table': Table,
      'panel-heading': PanelHeading,
      'stacked-bar-chart': StackedBarChart
    },
    created() {
      this.stackedBarChartData = stackedBarChartData
    },
    mounted: function(){
    },
    methods: {

    }
  }
</script>

<style>
  .wrapper-themes {
    display:grid;
    grid-template-columns: 1fr 10fr 1fr;
    grid-gap: 20px;
    grid-template-areas:
      '. al .'
      '. tc .'
      '. tb .'
      '. cd .';
  }

  .cards {
    display: flex;
    grid-area: cd;
  }

  .alert-bar {
    grid-area: al;
  }

  .theme-chart {
    grid-area: tc;
  }

  .table {
    grid-area: tb;
  }
</style>
