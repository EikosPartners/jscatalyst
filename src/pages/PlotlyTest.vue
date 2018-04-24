<template>
    <div class='wrapper-plotlytest'>

      <div class="chart-sender">
        <chart-sender></chart-sender>
      </div>

      <div class="documentation">
        <documentation-container
          :docs='plotlyDocs'
        ></documentation-container>
      </div>

      <div class="chart">
        <plotly-bargraph
        :dataModel="barData"
        ></plotly-bargraph>
      </div>

      <div class="chart">
        <plotly-bubblechart
        :dataModel="bubbleChartData"
        ></plotly-bubblechart>
      </div>

      <div class="chart">
        <plotly-scatterplot
        :dataModel="scatterplotData"
        ></plotly-scatterplot>
      </div>

      <div class="chart">
        <plotly-donutchart
        :dataModel="donutChartData"
        ></plotly-donutchart>
      </div>

      <div class="chart">
        <plotly-heatmap
        :dataModel="heatMapData"
        ></plotly-heatmap>
      </div>

      <div class="chart">
        <plotly-areachart
        :dataModel="areaChartData"
        ></plotly-areachart>
      </div>

      <div class="chart">
        <plotly-surfaceplot
        :dataModel="surfacePlotData"
        ></plotly-surfaceplot>
      </div>

      <!-- <div class="chart">
        <plotly-animatedlinegraph></plotly-animatedLineGraph>
      </div>

      <div class="chart">
        <plotly-streaminggraphic></plotly-streaminggraphic>
      </div> -->

    </div>
</template>

<script>
  import plotlyBarGraph from '@/components/visualizations/Plotly/PlotlyBarGraph.vue'
  import plotlyBubbleChart from '@/components/visualizations/Plotly/PlotlyBubbleChart.vue'
  import plotlyScatterplot from '@/components/visualizations/Plotly/PlotlyScatterplot.vue'
  import plotlyDonutChart from '@/components/visualizations/Plotly/PlotlyDonutChart.vue'
  import plotlyHeatMap from '@/components/visualizations/Plotly/PlotlyHeatMap.vue'
  import plotlyAreaChart from '@/components/visualizations/Plotly/PlotlyAreaChart.vue'
  import plotlySurfacePlot from '@/components/visualizations/Plotly/PlotlySurfacePlot.vue'
  import plotlyAnimatedLineGraph from '@/components/visualizations/Plotly/PlotlyAnimatedLineGraph.vue'
  import plotlyStreamingGraphic from '@/components/visualizations/Plotly/PlotlyStreamingGraphic.vue'
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  import ChartSender from '@/components/ChartSenderComponent.vue'
  import DocumentationContainer from '@/components/universal/DocumentationContainer.vue'


  import barChartData from '@/assets/mocks/plotly/plotlybargraphMock.json'
  import bubbleChartData from '@/assets/mocks/plotly/plotlybubblechartMock.json'
  import scatterplotData from '@/assets/mocks/plotly/plotlyscatterplotMock.json'
  import donutChartData from '@/assets/mocks/plotly/plotlyDonutChartMock.json'
  import heatMapData from '@/assets/mocks/plotly/plotlyheatmapMock.json'
  import areaChartData from '@/assets/mocks/plotly/plotlyareachartMock.json'
  import surfacePlotData from '@/assets/mocks/plotly/plotlysurfaceplotMock.json'
  import plotlyDocs from 'docs/plotlyDocs.json'

  export default {
    name: 'PlotlyTest',
    data () {
      return {
        barChartData: [],
        bubbleChartData: [],
        scatterplotData: [],
        donutChartData: [],
        heatMapData: [],
        surfacePlotData: [],
        areaChartData: [],
        shareableChart: null,
        plotlyDocs: plotlyDocs
      }
    },
    components: {
      'plotly-bargraph': plotlyBarGraph,
      'plotly-bubblechart': plotlyBubbleChart,
      'plotly-scatterplot': plotlyScatterplot,
      'plotly-donutchart': plotlyDonutChart,
      'plotly-heatmap': plotlyHeatMap,
      'plotly-areachart': plotlyAreaChart,
      'plotly-surfaceplot': plotlySurfacePlot,
      'plotly-animatedlinegraph': plotlyAnimatedLineGraph,
      'plotly-streaminggraphic': plotlyStreamingGraphic,
      'panel-heading': PanelHeading,
      'chart-sender': ChartSender,
      'documentation-container': DocumentationContainer
    },
    created() {
      //get data for each chart
      this.barData = barChartData
      this.bubbleChartData = bubbleChartData
      this.scatterplotData = scatterplotData
      this.donutChartData = donutChartData
      this.heatMapData = heatMapData
      this.surfacePlotData = surfacePlotData
      this.areaChartData = areaChartData
    },
    mounted() {

    }
  }
</script>
<style lang='stylus'>
@supports (display: grid) {
  .wrapper-plotlytest {
    display: grid;
    grid-row-gap: 50px;
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
    & .documentation {
      grid-column: 8 / 13;
      grid-row: 1 / 9;
    }
  }


  @media (min-width: 800px) {
    .wrapper-plotlytest {

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
        grid-row: 1 / 9;
      }
    }

  }

  @media (min-width: 1500px) {
    .wrapper-plotlytest {
      margin-left: 305px;

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
    }

  }

}
@supports not (display: grid) {

}
</style>
