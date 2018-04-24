<template>
  <div class='wrapper-chartisttest'>

    <div class="chart-sender">
      <chart-sender></chart-sender>
    </div>

    <div class="documentation">
      <documentation-container
        :docs='chartistDocs'
      ></documentation-container>
    </div>

    <div class="chart">
      <chartist-line-chart
        :dataModel='lineChartData'
        title='Chartist Line Chart'
        ></chartist-line-chart>
    </div>

    <div class="chart">
      <chartist-bar-chart
        :dataModel='barChartData'
        title='Chartist Bar Chart'
        ></chartist-bar-chart>
    </div>

    <div class="chart">
      <chartist-pie-chart
        :dataModel='pieChartData'
        title='Chartist Pie Chart'
        ></chartist-pie-chart>
    </div>

  </div>
</template>

<script>
  // Import visualizations
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  import ChartistLineChart from '@/components/visualizations/Chartist/ChartistLineChart.vue'
  import ChartistBarChart from '@/components/visualizations/Chartist/ChartistBarChart.vue'
  import ChartistPieChart from '@/components/visualizations/Chartist/ChartistPieChart.vue'
  import ChartistHelper from '@/common/chartistHelper'
  import ChartSender from '@/components/ChartSenderComponent.vue'
  import DocumentationContainer from '@/components/universal/DocumentationContainer.vue'


  // Import the data
  import lineChartData from '@/assets/mocks/d3/lineChartMock.json'
  import barChartData from '@/assets/mocks/d3/barchartMock.json'
  import pieChartData from '@/assets/mocks/chartjs/chartjsPolarAreaMock.json'
  import chartistDocs from 'docs/chartistDocs.json'
  require('chartist/dist/chartist.min.css')
  import moment from 'moment'

  export default {
    components: {
      'panel-heading': PanelHeading,
      'chartist-line-chart': ChartistLineChart,
      'chartist-bar-chart': ChartistBarChart,
      'chartist-pie-chart': ChartistPieChart,
      'chart-sender': ChartSender,
      'documentation-container': DocumentationContainer
    },
    data: function() {
      return {
        lineChartData: [],
        barChartData: [],
        pieChartData: [],
        shareableChart: null,
        chartistDocs: chartistDocs
      }
    },
    created() {
      var dataFormatter = new ChartistHelper()
      this.lineChartData = lineChartData.sort((a,b) => moment(a.date,'YYYY-MM-DD')-moment(b.date,'YYYY-MM-DD'))
      this.barChartData = barChartData
      this.pieChartData = pieChartData
    }
  }
</script>

<style lang='stylus'>
@supports (display: grid) {
  .wrapper-chartisttest {
    display: grid;
    grid-row-gap: 70px;
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
    .wrapper-chartisttest {
      & .chart {
        height: 400px;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .chart-sender {
        height: 400px;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .documentation {
        grid-column: 8 / 13;
        grid-row: 1 / 5;
      }
    }

  }

  @media (min-width: 1500px) {
    .wrapper-chartisttest {

      & .chart {
        height: 500px;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .chart-sender {
        height: 500px;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .documentation {
        grid-column: 8 / 13;
        grid-row: 1 / 5;
      }
    }

  }

}

@supports not (display: grid) {

}
</style>
