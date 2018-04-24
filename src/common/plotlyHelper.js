export default class PlotlyHelper {

  barChartParser(data, colors) {
    var xValues = data.map(el => el.x)
    var barsData = {}

    Object.keys(data[0]).filter(el => el !== 'x').forEach(key => barsData[key] = [])
    data.forEach(el => {
      for (var bar in barsData) {
        barsData[bar].push(el[bar])
      }
    })

    return Object.keys(barsData).map((bar, i) => {
      return {
        x: xValues,
        name: bar,
        y: barsData[bar],
        type: 'bar',
        marker: {
          color: colors[i]
        },
        hoverinfo: 'none'
      }
    })
  }

  areaChartParser(data, colors) {
    var xValues = data.map(el => el.x)
    var linesData = {}
    Object.keys(data[0]).filter(el => el !== 'x').forEach(key => linesData[key] = [])
    data.forEach(el => {
      for (var line in linesData) {
        linesData[line].push(el[line])
      }
    })

    return Object.keys(linesData).map((line, i) => {
      return {
        x: xValues,
        name: line,
        y: linesData[line],
        type: 'scatter',
        line: {
          color: colors[i]
        },
        fill: 'tonexty'
        //hoverinfo: 'none'
      }
    })

  }

  scatterChartParser(data, colors) {
    var categories = data.map(el => el.category)
    var seen = {}
    var categoryData = {}
    categories = categories.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    }).forEach(category => categoryData[category] = {x: [], y: [], labels: []})

    data.forEach(el => {
      categoryData[el.category].x.push(el.x)
      categoryData[el.category].y.push(el.y)
      categoryData[el.category].labels.push(el.label)

    })
    return Object.keys(categoryData).map((category, i) => {
     var color = i % 2 === 1 ? colors[colors.length - i] : colors[i]
     return {
       name: category,
       x: categoryData[category].x,
       y: categoryData[category].y,
       mode: 'markers+text',
       type: 'scatter',
       text: categoryData[category].labels,
       textposition: 'top center',
       marker: {
         color: color,
         size: '12'
       },
       hoverinfo: 'none'
     }
   })
  }

  donutChartParser(data, colors) {
    var charts = data.map(el => el.chart)
    var seen = {};
    var chartData = {}
    var charts = charts.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    }).forEach(chart => chartData[chart] = {labels: [], values: []})

    data.forEach(el => {
      chartData[el.chart].labels.push(el.label)
      chartData[el.chart].values.push(el.value)
    })

    var numOfCharts = Object.keys(chartData).length
    var range = 1.0/numOfCharts

    return Object.keys(chartData).map((chart, i) => {
      var start, finish;
      i === 0 ? start = 0 : start = i * range + .02;
      finish = (i + 1) * range - .02

      return {
        name: chart,
        values: chartData[chart].values,
        labels: chartData[chart].labels,
        marker: {
          colors: colors
        },
        hoverinfo: 'label+percent+name',
        hole: 0.4,
        type: 'pie',
        domain: {
          x: [start, finish]
        }
      }
    })
  }

  bubbleChartParser(data, colors) {
    var bubbleData = {
      x: [],
      y: [],
      text: [],
      mode: 'markers',
      marker: {
        size: [],
        color: colors
      },
      hoverinfo: 'none'
    }
    data.forEach(el => {
      bubbleData.x.push(el.x)
      bubbleData.y.push(el.y)
      bubbleData.text.push(el.label)
      bubbleData.marker.size.push(el.value)
    })
    return [bubbleData]
  }

}
