<template>
  <div class='wrapper-chartkicktest'>

    <div class="documentation">
      <documentation-container
        :docs='chartkickDocs'
      ></documentation-container>
    </div>

    <div class="chart">
      <panel-heading headerText="Chartkick Line Chart" />
      <line-chart
        :data='lineData'
        :download="true"
        :colors='colors'
        ></line-chart>
    </div>

    <div class="chart">
      <panel-heading headerText="Chartkick Bar Chart" />
      <column-chart
        :data="barData"
        :colors='colors'
        ></column-chart>
    </div>

    <div class="chart">
      <panel-heading headerText="Chartkick Pie Chart" />
      <pie-chart
        :data="pieData"
        :colors='colors'
        ></pie-chart>
    </div>

    <div class="chart">
      <panel-heading headerText="Chartkick Horizontal Bar Chart" />
      <bar-chart
        :data="barData"
        :colors='colors'
        ></bar-chart>
    </div>

    <div class="chart">
      <panel-heading headerText="Chartkick Area Chart" />
      <area-chart :legend='true'
        :data="lineData"
        :colors='colors'
        ></area-chart>
    </div>

    <div class="chart">
      <panel-heading headerText="Chartkick Scatter Plot" />
      <scatter-chart
        :data="scatterData"
        xtitle="Size"
        ytitle="Population"
        :colors='colors'
        ></scatter-chart>
    </div>
    <!-- <div class="chart">
      <panel-heading headerText="ToastUI Line Chart" />
      <toast-line :dataModel="toastLine" label='line data' ></toast-line>
    </div> -->

  </div>


</template>

<script>
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  // Import the data
  import lineChartData from '@/assets/mocks/d3/lineChartMock.json'
  import barChartData from '@/assets/mocks/d3/barchartMock.json'
  import { pieChartData } from '@/assets/mocks/d3/pieChartMock'
  import scatterData from '@/assets/mocks/chartjs/chartjsScatterMock.json'
  import ToastLine from '@/components/visualizations/ToastuiCharts/ToastLineChart.vue'
  import chartkickDocs from 'docs/chartkickDocs.json'
  import DocumentationContainer from '@/components/universal/DocumentationContainer.vue'
  import themeHelper from '@/common/themeHelper'

  export default {
    components: {
      'panel-heading': PanelHeading,
      'toast-line': ToastLine,
      'documentation-container': DocumentationContainer
    },
    data: function() {
      return {
        lineData: [],
        barData: [],
        pieData: [],
        scatterData: [],
        toastLine: [],
        chartkickDocs: chartkickDocs
      }
    },
    computed: {
      ...themeHelper
    },
    created() {
      this.lineData = lineChartData.slice().map(el => Object.values(el))
      this.barData = barChartData.slice().map(el => Object.values(el))
      this.pieData = pieChartData().slice().map(el => Object.values(el)).slice(1)
      this.scatterData = scatterData.slice().map(el => Object.values(el))
      this.toastLine = lineChartData
    }
  }
</script>

<style lang='stylus'>
@supports (display: grid) {
  .wrapper-chartkicktest {
    display: grid;
    grid-row-gap: 100px;
    grid-column-gap: 20px;
    grid-template-columns: repeat(12, 1fr);
    margin: 20px;

    & .chart {
      height: 300px;
      grid-column-start: 1;
      grid-column-end: 13;
    }

    & .chart-sender {
      height: 100px;
      grid-column-start: 1;
      grid-column-end: 13;
    }
  }


  @media (min-width: 800px) {
    .wrapper-chartkicktest {
      & .chart {
        height: 400px;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .chart-sender {
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .documentation {
        grid-column: 8 / 13;
        grid-row: 1 / 7;
      }
    }

  }

  @media (min-width: 1500px) {
    .wrapper-chartkicktest {

      & .chart {
        height: 500px;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .chart-sender {
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .documentation {
        grid-column: 8 / 13;
        grid-row: 1 / 7;
      }
    }

  }

}

</style>
