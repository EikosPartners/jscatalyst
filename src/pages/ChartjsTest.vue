<template>
  <div class='wrapper-chartjstest'>

    <div class="chart-sender">
      <chart-sender></chart-sender>
    </div>

    <div class="documentation">
      <documentation-container
        :docs='chartjsDocs'
      ></documentation-container>
    </div>

    <div class="chart">
      <line-chart-comp
        ref="line"
        :dataModel="lineChartData"
        title="Line Graph"
        ></line-chart-comp>
    </div>

    <div class="chart">
      <line-chart-comp
        :dataModel="multiLineChartData"
        title="Multi-Dataset Line Graph"
        ></line-chart-comp>
    </div>

    <div class="chart">
      <bar-chart-comp
        :dataModel='barChartData'
        title="Bar Graph"
        ></bar-chart-comp>
    </div>

    <div class="chart">
      <polar-comp
        :dataModel='polarAreaData'
        title="Polar Area Chart"
        ></polar-comp>
    </div>

    <div class="chart">
      <bubble-comp
        :dataModel='bubbleChartData'
        title="Bubble Chart"
        ></bubble-comp>
    </div>

    <div class="chart">
      <scatter-comp
        :dataModel='scatterData'
        title="Scatter Plot Chart"
        ></scatter-comp>
    </div>

    <div class="chart">
      <pie-comp
        :dataModel='pieChartData'
        title="Pie Chart"
        ></pie-comp>
    </div>

    <div class="chart">
      <bar-line-comp
        :dataModel='barLineData'
        title="Bar Line Graph"
        ></bar-line-comp>
    </div>

    <div class="chart">
      <radar-comp
        :dataModel='radarChartData'
        title="Radar Chart"
        ></radar-comp>
    </div>

  </div>


</template>

<script>
  // Import visualizations
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  import TauLineChart from '@/components/visualizations/Taucharts/TauLineChart.vue'
  import BarChartComp from '@/components/visualizations/Chartjs/ChartjsBarChartComp.vue'
  import LineChartComp from '@/components/visualizations/Chartjs/ChartjsLineChartComp.vue'
  import BarLineComp from '@/components/visualizations/Chartjs/ChartjsBarLineComp.vue'
  import BubbleComp from '@/components/visualizations/Chartjs/ChartjsBubbleComp.vue'
  import PieChartComp from '@/components/visualizations/Chartjs/ChartjsPieComp.vue'
  import PolarChartComp from '@/components/visualizations/Chartjs/ChartjsPolarComp.vue'
  import RadarChartComp from '@/components/visualizations/Chartjs/ChartjsRadarComp.vue'
  import ScatterComp from '@/components/visualizations/Chartjs/ChartjsScatterComp.vue'
  import ChartSender from '@/components/ChartSenderComponent.vue'
  import DocumentationContainer from '@/components/universal/DocumentationContainer.vue'



  // Import the data
  import chartjsLineData from '@/assets/mocks/chartjs/chartjsLineMock.json'
  import lineChartData from '@/assets/mocks/d3/lineChartMock.json'
  import barChartData from '@/assets/mocks/d3/barchartMock.json'
  import polarAreaData from '@/assets/mocks/chartjs/chartjsPolarAreaMock.json'
  import chartjsBubbleData from '@/assets/mocks/chartjs/chartjsBubbleMock.json'
  import pieChartData from '@/assets/mocks/d3/pieChartMock'
  import scatterData from '@/assets/mocks/chartjs/chartjsScatterMock.json'
  import radarChartMock from '@/assets/mocks/chartjs/chartjsRadarMock.json'
  import chartjsDocs from 'docs/chartjsDocs.json'

  export default {
    components: {
      'panel-heading': PanelHeading,
      'bar-chart-comp': BarChartComp,
      'line-chart-comp': LineChartComp,
      'bar-line-comp': BarLineComp,
      'bubble-comp': BubbleComp,
      'pie-comp': PieChartComp,
      'polar-comp': PolarChartComp,
      'radar-comp': RadarChartComp,
      'scatter-comp': ScatterComp,
      'chart-sender': ChartSender,
      'documentation-container': DocumentationContainer
    },
    data: function() {
      return {
        multiLineChartData: [],
        barChartData: [],
        lineChartData: [],
        polarAreaData: [],
        bubbleChartData: [],
        bubbleOptions: [],
        scatterData: [],
        pieChartData: [],
        barLineData: [],
        scatterOptions: [],
        radarChartData: [],
        lineChartData: [],
        options: {maintainAspectRatio:false},
        chartkickData: [],
        shareableChart: null,
        chartjsDocs: chartjsDocs
      }
    },
    created() {
      this.multiLineChartData = chartjsLineData
      this.barChartData =barChartData
      this.lineChartData = lineChartData
      this.polarAreaData = polarAreaData
      this.bubbleChartData = chartjsBubbleData
      this.scatterData = scatterData
      this.pieChartData = polarAreaData
      this.barLineData = lineChartData
      this.radarChartData = radarChartMock
      this.lineChartData = lineChartData
      this.chartkickData = lineChartData.slice().map(el => Object.values(el))

      var count = 0
      // There are two wasy of updating the data dyanmically
      setInterval(() =>{
        // The first way of updating the chart is by using the mixin provided by vue-chartjs
        // in order for this to work you must create a new data object and set that equalto the dataModel
        // so that the chart will know the data has changed
        // var newLabels = this.lineChartData.labels
        // newLabels.push(`2018-${count +1}-1`)
        // var newData = this.lineChartData.datasets
        // newData[0].data.push(Math.random()*6)
        // this.lineChartData = Object.assign({}, this.lineChartData, {labels: newLabels}, {datasets: newData} )

        // The second way of updating the data is by adding a ref to the chart and defining an update method on it
        // When new data is added in the parent, it needs to push that data on to the data arrays and then trigger
        // the chart's update function through the ref
        // example update function can be seen on ChartjsLineChart.js
        // this.updateLineExample(count)
        count++
      },1000)

    },

  }
</script>

<style lang='stylus'>
@supports (display: grid) {
  .wrapper-chartjstest {
    display: grid;
    grid-row-gap: 100px;
    grid-column-gap: 20px;
    grid-template-columns: repeat(12, 1fr);
    margin: 20px;

    & .chart {
      height: 400px;
      grid-column: 1 / 13;
    }

    & .chart-sender {
      height: 100px;
      grid-column: 1 / 13;
    }
  }


  @media (min-width: 800px) {
    .wrapper-chartjstest {

      & .chart {
        height: 400px;
        width:100%;
        grid-column: 1 / 8;
      }
      & .chart-sender {
        height: 400px;
        grid-column: 1 / 8;
      }
      & .documentation {
        grid-column: 8 / 13;
        grid-row: 1 / 11;
      }
    }

  }

  @media (min-width: 1500px) {
    .wrapper-chartjstest {

      & .chart {
        height: 500px;
        width:100%;
        grid-column: 1 / 8;
      }
      & .chart-sender {
        height: 500px;
        grid-column: 1 / 8;
      }
      & .documentation {
        grid-column: 8 / 13;
        grid-row: 1 / 11;
      }
    }

  }

}
@supports not (display: grid) {

}
</style>
