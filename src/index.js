import formatTimeMixin from '@/mixins/formatTimeMixin'
import styleTogglerMixin from '@/mixins/styleTogglerMixin'

import authPlugin from '@/plugins/auth'
import screensharePlugin from '@/plugins/screenshare'
import themePlugin from '@/plugins/themes'

import ChartSender from '@/components/ChartSenderComponent.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import ReceiverComponent from '@/components/ReceiverComponent.vue'
import DynamicComponent from '@/components/DynamicComponent.vue'
import UIBuilderComponent from '@/components/UIBuilderComponent.vue'

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
import D3AreaChart from '@/components/visualizations/d3/LineChart.vue'
import D3ZoomableLineChart from '@/components/visualizations/d3/LineChartZoomable.vue'
import D3LineChart from '@/components/visualizations/d3/LinePlot.vue'
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

import './assets/stylus/main.styl'

const charts = {
  formatTimeMixin,
  styleTogglerMixin,
  authPlugin,
  screensharePlugin,
  themePlugin,
  ChartSender,
  LoaderComponent,
  ReceiverComponent,
  DynamicComponent,
  UIBuilderComponent,
  PlotlyAreaChart,
  PlotlyBarGraph,
  PlotlyBubbleChart,
  PlotlyDonutChart,
  PlotlyHeatMap,
  PlotlyScatterPlot,
  PlotlySurfacePlot,
  D3BarChart,
  D3BoxPlot,
  D3BubbleChart,
  D3BulletChart,
  D3Dendrogram,
  D3DifferenceChart,
  D3ForceGraph,
  D3GanttChart,
  D3HeatMap,
  D3Histogram,
  D3HorizonChart,
  D3AreaChart,
  D3ZoomableLineChart,
  D3LineChart,
  D3PieChart,
  D3PunchCard,
  D3ScatterPlot,
  D3StackedBarChart,
  D3StreamGraph,
  D3Sunburst,
  D3TwoLinePlot,
  D3USMap,
  D3WorldMap,
  ChartjsBarChart,
  ChartjsBarLineChart,
  ChartjsBubbleChart,
  ChartjsLineChart,
  ChartjsPieChart,
  ChartjsPolarChart,
  ChartjsRadarChart,
  ChartjsScatterChart,
  ChartistBarChart,
  ChartistLineChart,
  ChartistPieChart
}

export default charts
export {
  formatTimeMixin,
  styleTogglerMixin,
  authPlugin,
  screensharePlugin,
  themePlugin,
  ChartSender,
  LoaderComponent,
  ReceiverComponent,
  DynamicComponent,
  UIBuilderComponent,
  PlotlyAreaChart,
  PlotlyBarGraph,
  PlotlyBubbleChart,
  PlotlyDonutChart,
  PlotlyHeatMap,
  PlotlyScatterPlot,
  PlotlySurfacePlot,
  D3BarChart,
  D3BoxPlot,
  D3BubbleChart,
  D3BulletChart,
  D3Dendrogram,
  D3DifferenceChart,
  D3ForceGraph,
  D3GanttChart,
  D3HeatMap,
  D3Histogram,
  D3HorizonChart,
  D3AreaChart,
  D3ZoomableLineChart,
  D3LineChart,
  D3PieChart,
  D3PunchCard,
  D3ScatterPlot,
  D3StackedBarChart,
  D3StreamGraph,
  D3Sunburst,
  D3TwoLinePlot,
  D3USMap,
  D3WorldMap,
  ChartjsBarChart,
  ChartjsBarLineChart,
  ChartjsBubbleChart,
  ChartjsLineChart,
  ChartjsPieChart,
  ChartjsPolarChart,
  ChartjsRadarChart,
  ChartjsScatterChart,
  ChartistBarChart,
  ChartistLineChart,
  ChartistPieChart
}
