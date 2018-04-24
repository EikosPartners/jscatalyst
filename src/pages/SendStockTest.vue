<template>
  <div class='wrapper-sender'>
    <div class="description">
      <h1 class="display-1 my-5">Send Stock Test</h1>
      <p class="body-1 mt-3">
        In laoreet convallis porttitor. Donec vel lacus magna. Suspendisse eu elementum orci. Ut felis ante, lacinia vel placerat eu, cursus ut ante. Aenean eleifend dolor vulputate, interdum lectus a, tristique lorem. Nullam ut felis finibus, consequat sapien nec, consequat quam. In auctor neque felis, at interdum nulla efficitur ut. Integer ultrices ligula at augue sollicitudin, id sollicitudin ligula laoreet. Nullam id massa id arcu venenatis bibendum.
      </p>
    </div>

    <div class="stock-selector">
      <v-select
        :items="stocks"
        v-model='currentData'
        label="Select"
        single-line
        bottom
        hint="Choose Stock for Analysis"
        persistent-hint
      ></v-select>
    </div>

    <div class="horizon-chart">
        <horizon-chart
          title="Horizon Chart"
          :dataModel="horizonChartData"
          propID="container-horizonchart"
        ></horizon-chart>
    </div>

    <div class="difference-chart">
      <difference-chart
        :title="'Opening and Closing values of ' + currentData + ' Stock'"
        :dataModel="differenceChart"
        propID="container-differencechart"
        metric="Stock Price"
        dateFormat="D-MMM-YY"
        :keys="['Close Price','Open Price']"
      ></difference-chart>
    </div>

    <div class="line-zoomable">
      <line-chart-zoomable
        :title="'Volume of Stock sales for ' + currentData "
        :dataModel="lineChartZoomable"
        propID="container-linechartzoomable"
        dateFormat='YYYY-MM-DD'
      ></line-chart-zoomable>
    </div>

    <div class="two-line">
      <two-line-plot
        title="Volume of Stock Sales compared to Stock High"
        :dataModel="lineChartZoomable"
        :dataModel2="stockHighs"
        metric="Volume of Sales"
        metric2="Stock High $"
        propID='container-twolineplot'
        startDate="'April 24, 2007'"
        dateFormat='YYYY-MM-DD'
      ></two-line-plot>
    </div>

    <div class="heat-map">
       <heat-map
        :title="'Volume of Trades for ' + currentData"
         :dataModel="heatMap"
         alertText="Trades"
         propID='heatMap'
       ></heat-map>
    </div>

    <div class="box-plot">
      <box-plot
        :title="'Opening Prices of ' + currentData"
        :dataModel="boxPlot"
        propID="container-boxplot"
        metric='Price $'
        :yLabel="'Opening Prices of ' + currentData"
      ></box-plot>
    </div>

    <div class="chart-sender-sst">
      <chart-sender></chart-sender>
    </div>

  </div>
</template>

<script>
// Mock Data
import AAPL from "@/assets/mocks/stockData/AAPL.json";
import GOOG from "@/assets/mocks/stockData/GOOG.json";
import ADBE from "@/assets/mocks/stockData/ADBE.json";

// Components
import PanelHeading from "@/components/universal/PanelHeading.vue";
import DifferenceChart from "@/components/visualizations/d3/DifferenceChart.vue";
import LineChartZoomable from "@/components/visualizations/d3/LineChartZoomable.vue";
import TwoLinePlot from "@/components/visualizations/d3/TwoLinePlot.vue";
import HeatMap from "@/components/visualizations/d3/HeatMap.vue";
import HorizonChart from '@/components/visualizations/d3/HorizonChart.vue'
import BoxPlot from '@/components/visualizations/d3/BoxPlot.vue'
import ChartSender from '@/components/ChartSenderComponent.vue'


// Utilities
import moment from "moment";

export default {
  components: {
    "difference-chart": DifferenceChart,
    "panel-heading": PanelHeading,
    "line-chart-zoomable": LineChartZoomable,
    "two-line-plot": TwoLinePlot,
    "heat-map": HeatMap,
    'horizon-chart': HorizonChart,
    'box-plot': BoxPlot,
    'chart-sender': ChartSender
  },
  data: function() {
    return {
      stocks: ['AAPL', 'GOOG', 'ADBE'],
      dataSources: {'AAPL': AAPL, 'GOOG': GOOG, 'ADBE': ADBE},
      currentData: 'GOOG',
      differenceChart: null,
      shareableChart: null,
      lineChartZoomable: [],
      stockHighs: [],
      heatMap: [],
      stockdata: [],
      horizonChartData: [],
      boxPlot: []
    };
  },
  mounted() {
    console.log(this.$children);
  },
  beforeMount(){
    this.setDataSource(this.currentData)
  },
  watch: {
    currentData: function(data){
      this.setDataSource(data)
    }
  },
  methods: {
    setDataSource: function(source) {
      var dataSource = this.dataSources[source]

      this.stockdata = dataSource.slice().map(el => {
        return {
          date: el.Date,
          open: el.Open,
          volume: el.Volume,
          high: el.High,
          low: el.Low,
          close: el.Close
        };
      });

      this.horizonChartData = {stockData: dataSource}

      this.differenceChart = dataSource.slice().map(el => {
        return {
          date: el.Date,
          expected: el.Close,
          actual: el.Open
        };
      });
      this.lineChartZoomable = dataSource.slice().map(el => {
        return {
          date: moment(el.Date, "DD-MMM-YY").format("YYYY-MM-DD"),
          value: el.Volume
        };
      });
      this.stockHighs = dataSource.slice().map(el => {
        return {
          date: moment(el.Date, "DD-MMM-YY").format("YYYY-MM-DD"),
          value: el.High
        };
      });
      this.heatMap = dataSource.slice()
        .map(el => {
          return {
            date: moment(el.Date, "DD-MMM-YY").format("YYYY-MM-DD"),
            volume: el.Volume
          };
        })
        .filter(el => el.date.slice(0, 4) === "2010");
      var year1 = [];
      var year2 = [];
      var year3 = [];
      var year4 = [];
      dataSource.slice().forEach(el => {
        switch (moment(el.Date, 'DD-MMM-YY').format('DD-MMM-YY').slice(-2)) {
          case '09':
            year1.push(el.Open)
          break;
          case '10':
            year2.push(el.Open)
          break;
          case '11':
            year3.push(el.Open)
          break;
          case '12':
            year4.push(el.Open)
          break;
          default:
          break;
        }
      })
      var boxData = []
      for (var i = 0; i < 83; i++) {
        boxData.push({'2009': year1[i], '2010': year2[i], '2011': year3[i], '2012':year4[i]})
      }
      this.boxPlot = boxData
    }
  }
};
</script>

<style>

@supports (display: grid) {

  .wrapper-sender {
    display: grid;
    grid-gap: 30px;
    grid-row-gap: 50px;
    justify-content: center;
    grid-template-columns: repeat(12, 1fr);
    /* margins: auto; */
    padding: 30px 0px 30px 0px;
    grid-template-areas:
      '. ds ds ds ds ds ds ds ds ds ds .'
      '. ss ss ss ss ss ss ss ss ss ss .'
      '. sd sd sd sd sd sd sd sd sd sd .'
      '. hz hz hz hz hz hz hz hz hz hz .'
      '. tl tl tl tl tl tl tl tl tl tl .'
      '. dif dif dif dif dif dif dif dif dif dif .'
      '. lz lz lz lz lz lz lz lz lz lz .'
      '. ht ht ht ht ht ht ht ht ht ht .'
      '. bp bp bp bp bp bp bp bp bp bp .';
  }

  @media (min-width: 800px) {
    .wrapper-sender {
      grid-template-areas:
        ". ds ds ds ds ds ds ds ds ds ds ."
        ". ss ss sd sd sd sd sd sd sd sd ."
        ". hz hz hz hz hz hz hz hz hz hz ."
        ". dif dif dif dif dif lz lz lz lz lz ."
        ". tl tl tl tl tl tl tl tl tl tl ."
        ". ht ht ht ht ht ht ht ht ht ht ."
        ". bp bp bp bp bp bp bp bp bp bp .";
    }
  }

  .description {
    grid-area: ds;
  }

  .stock-selector {
    grid-area: ss;
  }

  .horizon-chart {
    height: 200px;
    grid-area: hz;
  }

  .two-line {
    height: 500px;
    grid-area: tl;
  }

  .line-zoomable {
    height: 500px;
    grid-area: lz;
  }

  .heat-map {
    height: 300px;
    /* margin-bottom: 35px; */
    grid-area: ht;
  }

  .chart-sender-sst {
    grid-area: sd;
    display: grid;
    grid-template-columns: 6fr 4fr;
    grid-template-areas: 'sl bt';
  }

  .difference-chart {
    height: 500px;
    grid-area: dif;
  }

  .buttons {
    grid-area: bt;
  }

  .selector {
    grid-area: sl;
  }

  .box-plot {
    grid-area: bp;
    height: 500px
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

  .chart-sender-sst{

  }
}

</style>
