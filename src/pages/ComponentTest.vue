<template>
  <div class="wrapper-componenttest">

    <div class="chart-sender">
      <chart-sender></chart-sender>
      <!-- <v-btn @click="shareAll" :options="[{screenshare: true}]">Submit all</v-btn> -->
    </div>

    <div class="documentation">
      <documentation-container
        :docs='d3Docs'
      ></documentation-container>
    </div>

    <div class="chart">
      <sunburst
        v-on:click="clicked"
        :dataModel="flareData"
        propID="sunburst"
        title='Sun Burst'
      ></sunburst>
    </div>

    <div class="chart">
      <bar-chart
        :dataModel="barData"
        xaxisLabel="X-axis label"
        yaxisLabel="Y-axis label"
        propID="exampleBarChart"
        title='Bar Chart'
      ></bar-chart>
    </div>

    <div class="chart">
      <bubble-chart
      :dataModel='bubbleChartData'
      :currentCategories='currentCategories'
      :axisLabel='axisLabel'
      propID='exampleBubbleChart'
      :isTime='false'
      title='Bubble Chart'
      ></bubble-chart>
    </div>

    <div class="chart">
      <line-chart
        :dataModel="lineChartData"
        propID="container-linechart"
        dateFormat='YYYY-MM-DD'
        title='Line Chart'
      ></line-chart>
    </div>

    <div class="chart">
      <line-plot
        :dataModel='linePlotData'
        propID='line-plot1'
        metric='Ticket Volume'
        dateFormat='YYYY-MM-DD'
        title='Line Plot'
      ></line-plot>
    </div>

    <div class="chart">
      <heat-map
        :dataModel="heatMapData"
        alertText="Incident"
        propID='heatMap'
        title='Heat Map'
      ></heat-map>
    </div>

    <div class="chart">
      <punch-card
        :axisColors="punchAxisColors"
        :dataModel="punchCardData"
        alertText="Incident"
        propID='container-punchcard'
        title='Punch Card'
      ></punch-card>
    </div>

    <div class="chart">
      <stacked-bar-chart
        :dataModel="stackedBarChartData"
        propID='stackedBarChart'
        dateFormat='M/D/YY'
        title='Stacked Bar Chart'
      ></stacked-bar-chart>
    </div>

    <div class="chart">
      <gantt-chart
        style="height:100%"
        :dataModel="ganttChartData"
        propID='container-ganttchart'
        title='Gantt Chart'
      ></gantt-chart>
    </div>

    <div class="chart">
      <two-line-plot
        :dataModel="linePlotData"
        :dataModel2="lineData"
        metric="Open Tickets"
        metric2="Resolved Tickets"
        propID='container-twolineplot'
        dateFormat='YYYY-MM-DD'
        title='Two Line Plot Chart'
      ></two-line-plot>
    </div>

    <div class="chart">
      <pie-chart
        :dataModel="pieChartData"
        propID="container-piechart"
        title='Pie Chart'
      ></pie-chart>
    </div>

    <div class="chart">
      <scatterplot
        :dataModel="scatterplotData"
        propID="scatterplot"
        title='Scatter Plot'
      ></scatterplot>
    </div>

    <div class="chart">
      <difference-chart
        :dataModel="differenceChartData"
        propID="container-differencechart"
        metric="Volume"
        dateFormat="YYYY-DD-MM"
        title='Difference Chart'
      ></difference-chart>
    </div>

    <div class="chart">
      <bullet-chart
        :dataModel="bulletChartData"
        propID="container-bulletchart"
        title='Bullet Chart'
      ></bullet-chart>
    </div>

    <div class="chart">
      <dendrogram
        :dataModel="dendrogramData"
        propID="container-dendrogram"
        title='Dendrogram'
      ></dendrogram>
    </div>

    <div class="chart">
      <line-chart-zoomable
        :dataModel="lineChartZoomableData"
        propID="container-linechartzoomable"
        dateFormat='YYYY-MM-DD'
        title='Zoomable Line Chart'
      ></line-chart-zoomable>
    </div>

    <div class="chart">
      <us-map
        :dataModel="usMapCountyData"
        propID="container-usmap"
        title='US County Map'
      ></us-map>
    </div>

    <div class="chart">
      <us-map
        :dataModel="usMapStateData"
        propID="container-usmap2"
        format="State"
        title='US State Map'
      ></us-map>
    </div>

    <div class="chart">
      <histogram
        :dataModel="histogramData"
        propID="container-histogram"
        title='Histogram'
      ></histogram>
    </div>

    <div class="chart">
      <world-map
        :dataModel="worldMapData"
        propID="container-worldmap"
        title='World Map'
      ></world-map>
    </div>

    <div class="chart">
      <stream-graph
        :dataModel="stackedBarChartData"
        propID="container-streamgraph"
        dateFormat='M/D/YY'
        title='Stream Graph'
      ></stream-graph>
    </div>

    <div class="chart">
      <box-plot
        :dataModel="boxPlotData"
        propID="container-boxplot"
        title='Box Plot'
      ></box-plot>
    </div>

    <!-- <div class="sankeydiagram">
      <panel-heading headerText="Sankey Diagram" />
      <sankey
        :dataModel="sankeyData"
        propID="container-sankey"
      ></sankey>
    </div> -->

    <div class="chart">
      <horizon-chart
        :dataModel="horizonChartData"
        propID="container-horizonchart"
        title='Horizon Chart'
      ></horizon-chart>
    </div>

    <div class="chart">
      <force-directed-graph
        :dataModel="forceDirectedGraphData"
        propID="container-force-directedgraph"
        title='Force Directed Graph'
      ></force-directed-graph>
    </div>
  </div>
</template>

<script>
  //import components
  import BarChart from '@/components/visualizations/d3/BarChart.vue'
  import BubbleChart from '@/components/visualizations/d3/BubbleChart.vue'
  import LineChart from '@/components/visualizations/d3/LineChart.vue'
  import LinePlot from '@/components/visualizations/d3/LinePlot.vue'
  import HeatMap from '@/components/visualizations/d3/HeatMap.vue'
  import StackedBarChart from '@/components/visualizations/d3/StackedBarChart.vue'
  import PunchCard from '@/components/visualizations/d3/PunchCard.vue'
  import GanttChart from '@/components/visualizations/d3/GanttChart.vue'
  // import IncidentSet from '@/components/Modals/IncidentSet.vue'
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  // import PunchCardDataTable from '@/components/Modals/PunchCardDataTable.vue'
  // import TicketDetail from '@/components/Modals/TicketDetail.vue'
  import TwoLinePlot from '@/components/visualizations/d3/TwoLinePlot.vue'
  import PieChart from '@/components/visualizations/d3/PieChart.vue'
  import Sunburst from '@/components/visualizations/d3/Sunburst.vue'
  import Scatterplot from '@/components/visualizations/d3/Scatterplot.vue'
  import DifferenceChart from '@/components/visualizations/d3/DifferenceChart.vue'
  import BulletChart from '@/components/visualizations/d3/BulletChart.vue'
  import Dendrogram from '@/components/visualizations/d3/Dendrogram.vue'
  import LineChartZoomable from '@/components/visualizations/d3/LineChartZoomable.vue'
  import USMap from '@/components/visualizations/d3/USMap.vue'
  import Histogram from '@/components/visualizations/d3/Histogram.vue'
  import WorldMap from '@/components/visualizations/d3/WorldMap.vue'
  import StreamGraph from '@/components/visualizations/d3/StreamGraph.vue'
  import BoxPlot from '@/components/visualizations/d3/BoxPlot.vue'
  import Sankey from '@/components/visualizations/d3/SankeyDiagram.vue'
  import HorizonChart from '@/components/visualizations/d3/HorizonChart.vue'
  import ForceDirectedGraph from '@/components/visualizations/d3/ForceDirectedGraph.vue'
  import ChartSender from '@/components/ChartSenderComponent.vue'
  import DocumentationContainer from '@/components/universal/DocumentationContainer.vue'

  //import data
  import barChartData from '@/assets/mocks/d3/barchartMock.json'
  import bubbleChartData from '@/assets/mocks/d3/bubbleMock.json'
  import heatMapData from '@/assets/mocks/d3/heatmapMock.json'
  import stackedBarChartData from '@/assets/mocks/d3/stackedbarchartMock.json'
  import lineChartData from '@/assets/mocks/d3/lineChartMock.json'
  import linePlotData from '@/assets/mocks/d3/linePlotMock.json'
  import punchCardData from '@/assets/mocks/d3/punchCardMock.json'
  import { ganttMockData } from '@/assets/mocks/d3/ganttChartMock.js'
  import twoLinePlotData from '@/assets/mocks/d3/twoLinePlotMock.json'
  import tablesMockData from '@/assets/mocks/tablesMockData.json'
  import { pieChartData } from '@/assets/mocks/d3/pieChartMock'
  import flareData from '@/assets/mocks/d3/flare.json'
  import scatterplotData from '@/assets/mocks/d3/scatterplotMock.json'
  import differenceChartData from '@/assets/mocks/d3/differenceChartMock.json'
  import bulletChartData from '@/assets/mocks/d3/bulletChartMock.json'
  import dendrogramData from '@/assets/mocks/d3/dendrogramMock.json'
  import lineChartZoomableData from '@/assets/mocks/d3/lineChartZoomableMock.json'
  import usMapCountyData from '@/assets/mocks/d3/usMapCountyMock.json'
  import usMapStateData from '@/assets/mocks/d3/usMapStateMock.json'
  import histogramData from '@/assets/mocks/d3/histogramMock.json'
  import worldMapData from '@/assets/mocks/d3/worldMapMock.json'
  import boxPlotData from '@/assets/mocks/d3/boxPlotMock.json'
  import sankeyData from '@/assets/mocks/d3/sankeyMock.json'
  import forceDirectedGraphData from '@/assets/mocks/d3/forceDirectedGraphMock.json'
  import AAPL from '@/assets/mocks/stockData/AAPL.json'
  import ADBE from '@/assets/mocks/stockData/ADBE.json'
  import GOOG from '@/assets/mocks/stockData/GOOG.json'
  import chartjsbubbleData from '@/assets/mocks/chartjs/chartjsBubbleMock.json'
  import d3Docs from 'docs/d3Docs.json'

  export default {
    data: function() {
      return {
        barData: [],
        flareData: [],
        bubbleChartData: [],
        categoryOptions: { category1: [], category2: [], category3: [] },
        currentCategories: ['all', 'all', 'all'],
        axisLabel: 'Escalation',
        heatMapData: [],
        stackedBarChartData: [],
        lineChartData: [],
        linePlotData: [],
        lineData: [],
        punchCardData: [],
        punchAxisColors: ['#a5b9e5', '#2a63ff'],
        punchHeight: 400,
        ganttChartData: [],
        currentDialog: '',
        incidentSetModal: false,
        punchCardModal: false,
        ticketDetailModal: false,
        rowProps: {'Monitoring Incident Number': 'INC100021', 'CI (Asset ID)': 'SERVER_4', 'Incident Set': 'EE089BD09D9ED340'},
        day: 0,
        hour: 0,
        type: 'point',
        pieChartData: [],
        bulletChartData: [],
        scatterplotData: [],
        differenceChartData: [],
        dendrogramData: [],
        histogramData: [],
        lineChartZoomableData: [],
        usMapCountyData: [],
        usMapStateData: [],
        worldMapData: [],
        boxPlotData: [],
        sankeyData: {},
        horizonChartData: {},
        forceDirectedGraphData: {},
        d3Docs: d3Docs
      }
    },
    screenshare: true,
    components: {
      'sunburst': Sunburst,
      'bar-chart': BarChart,
      'bubble-chart': BubbleChart,
      'line-chart': LineChart,
      'line-plot': LinePlot,
      'histogram': Histogram,
      'heat-map': HeatMap,
      'stacked-bar-chart': StackedBarChart,
      'punch-card': PunchCard,
      'gantt-chart': GanttChart,
      // 'incident-set-modal': IncidentSet,
      'panel-heading': PanelHeading,
      // 'punchcard-datatable': PunchCardDataTable,
      // 'ticket-detail': TicketDetail,
      'two-line-plot': TwoLinePlot,
      'pie-chart': PieChart,
      'bullet-chart': BulletChart,
      'scatterplot': Scatterplot,
      'difference-chart': DifferenceChart,
      'dendrogram': Dendrogram,
      'line-chart-zoomable': LineChartZoomable,
      'us-map': USMap,
      'world-map': WorldMap,
      'stream-graph': StreamGraph,
      'box-plot': BoxPlot,
      'sankey': Sankey,
      'horizon-chart': HorizonChart,
      'force-directed-graph': ForceDirectedGraph,
      'chart-sender': ChartSender,
      'documentation-container': DocumentationContainer
    },
    created() {
      //get data for each chart
      this.barData = barChartData
      this.bubbleChartData = bubbleChartData.slice().map(el => {
        return {
          x: el.duration_med / 60,
          y: el.escalated_med *100,
          value: el.volume,
          label: el.category_1 + el.category_2 + el.category_3
        }
      })
      // this.bubbleChartData = plotlybubbleData
      this.heatMapData = heatMapData
      this.stackedBarChartData = stackedBarChartData
      this.lineChartData = lineChartData
      this.linePlotData = linePlotData
      this.punchCardData = punchCardData
      this.ganttChartData = ganttMockData()
      this.lineData = twoLinePlotData
      this.histogramData = histogramData
      this.pieChartData = pieChartData()
      this.scatterplotData = scatterplotData
      this.differenceChartData = differenceChartData
      this.bulletChartData = bulletChartData
      this.flareData = flareData
      this.dendrogramData = dendrogramData
      this.lineChartZoomableData = lineChartZoomableData
      this.usMapCountyData = usMapCountyData
      this.usMapStateData = usMapStateData
      this.worldMapData = worldMapData
      this.boxPlotData = boxPlotData
      this.sankeyData = sankeyData
      this.forceDirectedGraphData = forceDirectedGraphData
      this.horizonChartData = {'AAPL': AAPL, 'ADBE': ADBE, 'GOOG': GOOG}
    },
    mounted: function() {

    },
    methods: {
      // opens modal for the day clicked
    // punchCardClicked: function (type, day, hour) {
    //   this.incidentSetModal = false
    //   this.punchCardModal = true
    //   this.type = type
    //   this.day = day
    //   this.hour = hour
    //   // let history = JSON.parse(sessionStorage.history).map(item=>JSON.parse(item))
    //   // let historyItem = {type: type, day: day, hour: hour, currentDialog: "ckm-punchcard-datatable"}
    //   // history.push(historyItem)
    //   // sessionStorage.history = JSON.stringify(history.map(item=>JSON.stringify(item)))
    // },
    //   // changes height of punch card
    //   changeHeight: function(args){
    //     this.punchHeight = args
    //   },
      closeModal: function() {
        this.incidentSetModal = false
        this.ticketDetailModal = false
        this.punchCardModal = false
        setTimeout(() => (this.currentDialog = ""), 1000)

      },
      openModal: function(event) {
        var current = event.currentTarget.id +'Modal'
        this[current] = true;
        current === 'incidentSetModal' ? this.currentDialog = 'incident-set-modal' : null
      },
      closeTicketModal: function(){
        this.ticketDetailModal = false
        Array.from(document.getElementsByClassName('dialog__content__active')).forEach(item=>{
          item.setAttribute("style", "z-index:212;")})
      },
      clicked: function(data) {
        console.log(data, 'clicked');
      },
      //for testing purposes, if we need to check incoming data
      printData: function(data){
        console.log(data)
      }
    }

  }
</script>

<style lang='stylus'>
@supports (display: grid) {
  .wrapper-componenttest {
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
      height: 500px;
      grid-column-start: 1;
      grid-column-end: 13;
    }
  }


  @media (min-width: 800px) {
    .wrapper-componenttest {

      & .chart {
        height: 400px;
        width: 100%;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .chart-sender {
        height: 400px;
        grid-column-start: 1;
        grid-column-end: 8;
      }

      & .documentation {
        grid-column-start: 8;
        grid-column-end: 13;
        grid-row:1 / 26;
      }
    }

  }

  @media (min-width: 1500px) {
    .wrapper-componenttest {

      & .chart {
        height: 500px;
        width: 100%;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .chart-sender {
        height: 500px;
        grid-column-start: 1;
        grid-column-end: 8;
      }
      & .documentation {
        grid-column-start: 8;
        grid-column-end: 13;
        grid-row-start: 1;
        grid-row-end: 26;
      }
    }

  }

}
@supports not (display: grid) {

    .wrapper-sender {
      padding: 50px 100px;
    }

    .stock-selector {

    }

    .horizon-chart{
      height: 200px;
    }

    .difference-chart {
      height: 500px;
      min-height: 100px;
    }

    .line-zoomable{
      margin-top: 50px;
      margin-bottom: 50px;
      height: 500px;
      min-height: 100px;
    }

    .two-line {
      height: 500px;
      margin-bottom: 40px;
    }

    .heat-map{
      height: 250px;
      margin-bottom: 80px;
      /*HTK dynamic because heat-map offsetheight on send page */
    }

    .box-plot{
      height: 500px;
      margin-bottom: 50px;
    }

    .chart-sender{

    }
  }

</style>
