<template>
  <span class="loaderComponent" style="height:100%; width:100%">
    <component
      :is="componentLoader"
      v-bind="props"
      :style="inlineStyles"
    ></component>
  </span>
</template>

<script>
import ChartistBarChart from '@/components/visualizations/Chartist/ChartistBarChart.vue'
import ChartistLineChart from '@/components/visualizations/Chartist/ChartistLineChart.vue'
import ChartistPieChart from '@/components/visualizations/Chartist/ChartistPieChart.vue'

import ChartjsBarChart from '@/components/visualizations/Chartjs/ChartjsBarChartComp.vue'
import ChartjsBarLineChart from '@/components/visualizations/Chartjs/ChartjsBarLineComp.vue'
import ChartjsBubbleChart from '@/components/visualizations/Chartjs/ChartjsBubbleComp.vue'
import ChartjsLineChart from '@/components/visualizations/Chartjs/ChartjsLineChartComp.vue'
import ChartjsPieChart from '@/components/visualizations/Chartjs/ChartjsPieComp.vue'
import ChartjsPolarChart from '@/components/visualizations/Chartjs/ChartjsPolarComp.vue'
import ChartjsRadarChart from '@/components/visualizations/Chartjs/ChartjsRadarComp.vue'
import ChartjsScatterChart from '@/components/visualizations/Chartjs/ChartjsScatterComp.vue'

import D3BarChart from '@/components/visualizations/d3/BarChart.vue'
import D3BoxPlot from '@/components/visualizations/d3/BoxPlot.vue'
import D3BubbleChart from '@/components/visualizations/d3/BubbleChart.vue'
import D3BulletChart from '@/components/visualizations/d3/BulletChart.vue'
import D3Dendrogram from '@/components/visualizations/d3/Dendrogram.vue'
import D3DifferenceChart from '@/components/visualizations/d3/DifferenceChart.vue'
import D3ForceGraph from '@/components/visualizations/d3/ForceDirectedGraph.vue'
import D3GanttChart from '@/components/visualizations/d3/GanttChart.vue'
import D3HeatMap from '@/components/visualizations/d3/HeatMap.vue'
import D3Histogram from '@/components/visualizations/d3/Histogram.vue'
import D3HorizonChart from '@/components/visualizations/d3/HorizonChart.vue'
import D3LineChart from '@/components/visualizations/d3/LineChart.vue'
import D3ZoomableLineChart from '@/components/visualizations/d3/LineChartZoomable.vue'
import D3LinePlot from '@/components/visualizations/d3/LinePlot.vue'
import D3PieChart from '@/components/visualizations/d3/PieChart.vue'
import D3PunchCard from '@/components/visualizations/d3/PunchCard.vue'
import D3ScatterPlot from '@/components/visualizations/d3/Scatterplot.vue'
import D3StackedBarChart from '@/components/visualizations/d3/StackedBarChart.vue'
import D3StreamGraph from '@/components/visualizations/d3/StreamGraph.vue'
import D3Sunburst from '@/components/visualizations/d3/Sunburst.vue'
import D3TwoLinePlot from '@/components/visualizations/d3/TwoLinePlot.vue'
import D3USMap from '@/components/visualizations/d3/USMap.vue'
import D3WorldMap from '@/components/visualizations/d3/WorldMap.vue'

import PlotlyAreaChart from '@/components/visualizations/Plotly/PlotlyAreaChart.vue'
import PlotlyBarGraph from '@/components/visualizations/Plotly/PlotlyBarGraph.vue'
import PlotlyBubbleChart from '@/components/visualizations/Plotly/PlotlyBubbleChart.vue'
import PlotlyDonutChart from '@/components/visualizations/Plotly/PlotlyDonutChart.vue'
import PlotlyHeatMap from '@/components/visualizations/Plotly/PlotlyHeatMap.vue'
import PlotlyScatterPlot from '@/components/visualizations/Plotly/PlotlyScatterplot.vue'
import PlotlySurfacePlot from '@/components/visualizations/Plotly/PlotlySurfacePlot.vue'

export default {
  name: 'LoaderComponent',
  components: {
    'chartist-bar-chart': ChartistBarChart,
    'chartist-line-chart': ChartistLineChart,
    'chartist-pie-chart': ChartistPieChart,
    'chartjs-bar-chart': ChartjsBarChart,
    'chartjs-barline': ChartjsBarLineChart,
    'chartjs-bubble': ChartjsBubbleChart,
    'chartjs-line': ChartjsLineChart,
    'chartjs-pie': ChartjsPieChart,
    'chartjs-polar': ChartjsPolarChart,
    'chartjs-radar': ChartjsRadarChart,
    'chartjs-scatter': ChartjsScatterChart,
    'd3-bar': D3BarChart,
    'd3-box-plot': D3BoxPlot,
    'd3-bubble': D3BubbleChart,
    'd3-bullet': D3BulletChart,
    'd3-dendrogram': D3Dendrogram,
    'd3-difference': D3DifferenceChart,
    'd3-force': D3ForceGraph,
    'd3-gantt': D3GanttChart,
    'd3-heat': D3HeatMap,
    'd3-hist': D3Histogram,
    'd3-horizon': D3HorizonChart,
    'd3-line': D3LineChart,
    'd3-zoomable': D3ZoomableLineChart,
    'd3-line-plot': D3LinePlot,
    'd3-pie': D3PieChart,
    'd3-punch': D3PunchCard,
    'd3-scatter': D3ScatterPlot,
    'd3-stacked': D3StackedBarChart,
    'd3-stream': D3StreamGraph,
    'd3-suburst': D3Sunburst,
    'd3-two-line': D3TwoLinePlot,
    'd3-us-map': D3USMap,
    'd3-world': D3WorldMap,
    'plotly-area': PlotlyAreaChart,
    'plotly-bar': PlotlyBarGraph,
    'plotly-bubble': PlotlyBubbleChart,
    'plotly-donut': PlotlyDonutChart,
    'plotly-heat': PlotlyHeatMap,
    'plotly-scatter': PlotlyScatterPlot,
    'plotly-surface': PlotlySurfacePlot
  },
  computed: {
    componentLoader () {
        // get the actual file name because the this.chartName is not always correct
        var key = {
          'ChartistBarChart': 'chartist-bar-chart',
          'ChartistLineChart': 'chartist-line-chart',
          'ChartistPieChart': 'chartist-pie-chart',
          'ChartjsBarChart': 'chartjs-bar-chart',
          'ChartjsBarLineChart': 'chartjs-barline',
          'ChartjsBubbleChart': 'chartjs-bubble',
          'ChartjsLineChart': 'chartjs-line',
          'ChartjsPieChart': 'chartjs-pie',
          'ChartjsPolarChart': 'chartjs-polar',
          'ChartjsRadarChart': 'chartjs-radar',
          'ChartjsScatterChart': 'chartjs-scatter',
          'D3BarChart': 'd3-bar',
          'D3BoxPlot': 'd3-box-plot',
          'D3BubbleChart': 'd3-bubble',
          'D3BulletChart': 'd3-bullet',
          'D3Dendrogram': 'd3-dendrogram',
          'D3DifferenceChart': 'd3-difference',
          'D3ForceGraph': 'd3-force',
          'D3GanttChart': 'd3-gantt',
          'D3HeatMap': 'd3-heat',
          'D3Histogram': 'd3-hist',
          'D3HorizonChart': 'd3-horizon',
          'D3LineChart': 'd3-line',
          'D3ZoomableLineChart': 'd3-zoomable',
          'D3LinePlot': 'd3-line-plot',
          'D3PieChart': 'd3-pie',
          'D3PunchCard': 'd3-punch',
          'D3ScatterPlot': 'd3-scatter',
          'D3StackedBarChart': 'd3-stacked',
          'D3StreamGraph': 'd3-stream',
          'D3Sunburst': 'd3-suburst',
          'D3TwoLinePlot': 'd3-two-line',
          'D3USMap': 'd3-us-map',
          'D3WorldMap': 'd3-world',
          'PlotlyAreaChart': 'plotly-area',
          'PlotlyBarGraph': 'plotly-bar',
          'PlotlyBubbleChart': 'plotly-bubble',
          'PlotlyDonutChart': 'plotly-donut',
          'PlotlyHeatMap': 'plotly-heat',
          'PlotlyScatterPlot': 'plotly-scatter',
          'PlotlySurfacePlot': 'plotly-surface'
        }
        return key[this.chartName]
        // var fileName = this.filePath ? this.filePath.split('/').slice(-1)[0] : '';
        // if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("d3")) {
        //   if (fileName === 'SankeyDiagram.vue') return;
        //   return () => import('./visualizations/d3/' + fileName)
        // } else if (this.filePath && this.filePath.includes("universal")) {
        //   // return () => import('./universal/' + fileName)
        // } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Chartjs")) {
        //   return () => import('./visualizations/Chartjs/' + fileName)
        // } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Chartist")) {
        //   return () => import('./visualizations/Chartist/' + fileName)
        // } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Plotly")) {
        //   return () => import('./visualizations/Plotly/' + fileName)
        // } else {
        //   return
        // }
        // HTK need to deal with other locations
    }
  },
  updated (){
    // debugger
  },
  props: ['props', 'filePath', 'chartName', 'height', 'inlineStyles'],
  watch: {
    componentLoader: function(data){
      this.$options.components[this.chartName] = data
    }
  },

}
</script>

<style scoped>
@supports (display: grid) {

}
@supports not (display: grid) {

}
</style>
