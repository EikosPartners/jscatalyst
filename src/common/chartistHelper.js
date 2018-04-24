export default class ChartistHelper {

  barChartParser(data) {
    var labels = [];
    var series = [];
    data.forEach(el => {
      labels.push(el.x)
      series.push(el.y)
    })
    return {labels: labels, series: [series]}
  }

  lineChartParser(data) {
    var labels = [];
    var series = [];
    data.forEach(el => {
      labels.push(el.date)
      series.push(el.value)
    })
    return {labels: labels, series: [series]}
  }

  pieChartParser(data) {
    var formattedData = []
    var labels = []
    var series = []
    data.forEach(el => {
      labels.push(el.label)
      series.push(el.value)
    })
    return {labels: labels, series: series}
  }
}
