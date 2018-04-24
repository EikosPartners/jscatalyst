<!-- example - built out -->

<template>
  <div class='wrapper-example-dashboard'>

    <div class="chart-1">
        <panel-heading headerText="Line Plot" />
      <line-plot
        :dataModel='linePlotData'
        propID='example-line-plot'
        metric='Last Sale Price'
      ></line-plot>
    </div>

    <div class="chart-2">
        <panel-heading headerText="Two Line Plot" />
        <two-line-plot
          :dataModel="linePlotData"
          :dataModel2="twoLinePlotData"
          propID='example-twolineplot'
          metric="Last Sale Price"
          metric2="Ask Price"
        ></two-line-plot>
    </div>

    <div class="chart-3">
      <panel-heading headerText="Heat Map" />
      <heat-map
        :dataModel="heatMapData"
        alertText="Incident"
        propID='example-heatMap'
      ></heat-map>
    </div>

    <div class="chart-6">
      <panel-heading headerText="Pie Chart" />
      <pie-chart
        :dataModel="pieChartData"
        propID="example-piechart"
      ></pie-chart>
    </div>

    <div class="chart-5">
      <panel-heading headerText="Bullet Chart" />
      <bullet-chart
        :dataModel="bulletChartData"
        propID="example-bulletchart"
      ></bullet-chart>
    </div>

    <div class="chart-4">
      <panel-heading headerText="Stacked Bar Chart" />
      <stacked-bar-chart
        :dataModel='stackedBarChartData'
        propID='example-stacked-barchart'
        dateFormat='M/D/YY'
      ></stacked-bar-chart>
    </div>

    <div class="table-1">
      <panel-heading headerText="Data Table" />
      <data-table
        :gridOptions='gridOptions'
      ></data-table>
    </div>

  </div>
</template>


<script>

  //import components onto page
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  import LinePlot from '@/components/visualizations/d3/LinePlot.vue'
  import TwoLinePlot from '@/components/visualizations/d3/TwoLinePlot.vue'
  import HeatMap from '@/components/visualizations/d3/HeatMap.vue'
  import PieChart from '@/components/visualizations/d3/PieChart.vue'
  import BulletChart from '@/components/visualizations/d3/BulletChart.vue'
  import StackedBarChart from '@/components/visualizations/d3/StackedBarChart.vue'
  import AgTable from '@/components/Tables/AgTable.vue'

  //import data
  import linePlotData from '../assets/mocks/d3/linePlotMock.json'
  import twoLinePlotData from '../assets/mocks/d3/twoLinePlotMock.json'
  import heatMapData from '../assets/mocks/d3/heatmapMock.json'
  import { pieChartData } from '../assets/mocks/d3/pieChartMock'
  import bulletChartData from '../assets/mocks/d3/bulletChartMock.json'
  import stackedBarChartData from '../assets/mocks/d3/stackedbarchartMock.json'
  import TableData from '../assets/mocks/demoTableData.json'
  import TableHeaders from '../assets/mocks/demoTableHeaders.json'

  export default {
    //Data function returns all data properties for the component. Also makes the data properties 'reactive'.
    data: function() {
      return {
        linePlotData: [],
        twoLinePlotData: [],
        heatMapData: [],
        pieChartData: [],
        stackedBarChartData: [],
        bulletChartData: [],
        //  data in table
        rowDataAg: [],
        // column headers
        columnDefsAg: [],
      }
    },
    //Locally register components, which makes them custom elements.
    components: {
      'panel-heading': PanelHeading,
      'line-plot': LinePlot,
      'two-line-plot': TwoLinePlot,
      'heat-map': HeatMap,
      'pie-chart': PieChart,
      'bullet-chart': BulletChart,
      'stacked-bar-chart': StackedBarChart,
      'data-table': AgTable
    },
    created() {
      //set the imported data to the reactive property in each chart
      this.linePlotData = linePlotData
      this.twoLinePlotData = twoLinePlotData
      this.heatMapData = heatMapData
      this.pieChartData = pieChartData()
      this.bulletChartData = bulletChartData
      this.stackedBarChartData = stackedBarChartData
      this.columnDefsAg = TableHeaders
      this.gridOptions.rowData = TableData
      console.log(this.rowDataAg, this.columnDefsAg)
    },
    computed: {
      gridOptions: function () {
          let gridOptions = {};
          gridOptions.rowHeight = 48;
          gridOptions.rowData = this.rowDataAg;
          gridOptions.columnDefs = this.columnDefsAg;
          gridOptions.pagination = true;
          //how many rows are displayed on one page
          gridOptions.paginationPageSize = 10;
          return gridOptions
      }
    }
  }
</script>


<style>

  /* set CSS Grid layout in wrapper class */
  .wrapper-example-dashboard {
    display: grid;
    margin: 50px 0px 20px 0px;
    grid-gap: 50px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      ". c1 c1 c1 c1 c1 c1 c1 c1 c1 c1 ."
      ". c2 c2 c2 c2 c2 c2 c2 c2 c2 c2 ."
      ". c3 c3 c3 c3 c3 c3 c3 c3 c3 c3 ."
      ". c4 c4 c4 c4 c4 c4 c4 c4 c4 c4 ."
      ". c5 c5 c5 c5 c5 c5 c5 c5 c5 c5 ."
      ". c6 c6 c6 c6 c6 c6 c6 c6 c6 c6 ."
      ". t1 t1 t1 t1 t1 t1 t1 t1 t1 t1 ."
  }

  /* Use media queries to declare layouts for different size viewports */
  @media (min-width: 800px) {
    .wrapper-example-dashboard {
      display: grid;
      grid-gap: 50px;
      grid-template-columns: repeat(12, 1fr);
      grid-template-areas:
        ". c1 c1 c1 c1 c1 c2 c2 c2 c2 c2 ."
        ". c3 c3 c3 c3 c3 c3 c3 c3 c3 c3 ."
        ". c4 c4 c4 c4 c4 c4 c4 c4 c4 c4 ."
        ". c5 c5 c5 c5 c5 c6 c6 c6 c6 c6 ."
        ". t1 t1 t1 t1 t1 t1 t1 t1 t1 t1 ."
    }
  }

  /* use classes for each grid area to style components and declare names of grid areas */
  .chart-1 {
    height: 400px;
    padding-bottom: 10px;
    grid-area: c1;
  }

  .chart-2 {
    height: 400px;
    padding-bottom: 10px;
    grid-area: c2;
  }

  .chart-3 {
    height: 320px;
    grid-area: c3;
  }

  .chart-4 {
    height: 400px;
    grid-area: c4;
  }

  .chart-5 {
    height: 450px;
    grid-area: c5;
  }

  .chart-6 {
    height: 450px;
    grid-area: c6;
  }

  .table-1 {
    height: 400px;
    grid-area: t1;
  }

</style>
