import moment from 'moment'

export default class ChartjsHelper {
  /* The data needed for Line graph can be in two forms
    (1) an array with of data points
      {
        date: 'date string',
        value: number value on that date
      }
    (2) an array of objects, each corresponding to a separate line.
      the key of each object will be the label for that line, the value
      at that key should be the array of data points like above
      [
        {
          'line1': [
            {
              date: 'date string',
              value: number value on that date
            }, ...
          ]
        },
        {
          'line2': [
            {
              date: 'date string',
              value: number value on that date
            }, ...
          ]
        }
      ]
  */
  lineChartParser(data, chartLabel, lineColors, area) {
    // loop over the data to separate out the label for x axis
    // and the datapoint value
    var labels = [];
    var dataset = [];
    // If dataModel is an array of data for only one line
    if (Object.keys(data[0]).indexOf('value') !== -1) {
      data.sort((a,b) => {
        return moment(a.date, 'YYYY-MM-DD') - moment(b.date, 'YYYY-MM-DD')
      })
      var lineData = {
        data: [],
        label: chartLabel,
        fill: area,
        borderColor: lineColors[0],
        backgroundColor: lineColors[0]
      }
      data.forEach(el => {
        labels.push(moment(el.date, 'YYY-MM-DD').format('MMM Do YY'))
        lineData.data.push(el.value)
      })
      // put the single line's data into an array so it can be used by chartjs
      dataset = [lineData]
    } else {
      // If dataModel is an array of objects, each corresponding to a line
      data.forEach((el, ind) => {
        var key = Object.keys(el)[0];
        // The key of the line data object will be its label
        el[key].sort((a,b) => {
          return moment(a.date, 'YYYY-MM-DD') - moment(b.date, 'YYYY-MM-DD')
        })
        var lineData = {
          label: [key],
          data: [],
          fill: area,
          // set color of line depending on index
          borderColor: lineColors[ind],
          backgroundColor: lineColors[ind]
        }
        el[key].forEach(datapoint => {
          // only copy the labels of the x-axis once
          if (labels.length < el[key].length) {
            labels.push(moment(datapoint.date, 'YYYY-MM-DD').format('MMM Do YY'))
          }
          // push the individual line's data point into it's data array
          lineData.data.push(datapoint.value)
        })
        // add the line's data to the dataset array
        dataset.push(lineData)
      })
    }
    return {labels: labels, datasets: dataset}
  }

  barChartParser(data, metric, colors) {
    var labels = [];
    var bars = [];
    data.forEach(el => {
      labels.push(el.x);
      bars.push(el.y);
    })
    return {labels: labels, datasets: [{data: bars, label: metric, backgroundColor: colors}]}
  }

  polarChartParser(data, colors) {
    var labels = [];
    var slices = [];
    data.forEach(el => {
      labels.push(el.label);
      slices.push(el.value);
    })
    return {labels:labels, datasets: [{data: slices, backgroundColor: colors}]}
  }

  bubbleChartParser(data, colors) {
    var datasets = [];
    data.forEach((el, ind) => {
      var bubbleData = {
        label: el.label,
        data: [{
          x: el.x,
          y: el.y,
          value: el.value
        }],
        backgroundColor: colors[ind]
      };
      datasets.push(bubbleData)
    })
    return {datasets: datasets}
  }

  scatterParser(data, colors) {
    var datasets = [];
    data.forEach((el, ind) => {
      var scatterData = {
        label: el.label,
        data: [{
          x: el.x,
          y: el.y,
        }],
        backgroundColor: colors[ind]
      };
      datasets.push(scatterData)
    })
    return {datasets: datasets}
  }

  barLineParser(data, colors) {
    data.sort((a,b) => {
      return moment(a.date, 'YYYY-MM-DD') - moment(b.date, 'YYYY-MM-DD')
    })
    var datapoints = [];
    var labels = [];
    for (var i = 0; i < data.length/colors.length; i++) {
      colors = colors.concat(colors.slice(1))
    }

    data.forEach(el => {
      labels.push(moment(el.date, 'YYYY-MM-DD').format('MMM DD YY'));
      datapoints.push(el.value);
    })
    var lineData = {
      type:'line',
      data: datapoints,
      borderColor: colors[0],
      backgroundColor: colors[0],
      fill: false,
      label: 'Line Data'
    };
    var barData = {
      type: 'bar',
      data: datapoints,
      backgroundColor: colors.slice(1),
      label: 'Bar Data'
    };
    return {labels: labels, datasets: [barData, lineData]}
  }


  radarChartParser(data, colors) {
    var labels = [];
    var datasets = [];

    data.forEach((el, ind) => {
      var radar = {
        label: Object.keys(el)[0],
        data: [],
        backgroundColor: colors[ind]
      }
      el[radar.label].forEach(datapoint => {
        if (labels.length < el[radar.label].length) {
          labels.push(datapoint.label)
        }
        radar.data.push(datapoint.value)
      })
      datasets.push(radar)
    })
    return {labels: labels, datasets: datasets}
  }

  baseDarkOptions(chart, maxX, maxY) {
    var options = {scales: {}, legend:{labels:{}}};
    if (chart === 'radar' || chart === 'polar') {
      options = {scale: {gridLines: {}, ticks:{}}, legend: {labels:{}}};
      options.scale = {
        gridLines: {color: 'lightgrey'},
        angleLines: {color: 'lightgrey'},
        // options.scale.ticks.backdropColor ='rgba(0,0,0,0),
        ticks: {color: 'lightgrey'}
      }
      options.legend.labels.fontColor = 'lightgrey'
      options.maintainAspectRatio = false
    } else if (chart === 'pie') {
      options = {legend: {labels:{}}};
      options.legend.labels.fontColor = 'lightgrey'
      options.maintainAspectRatio = false
    } else if (chart === 'bubble' || chart === 'scatter') {
      options =  {
        maintainAspectRatio: false,
        legend: {
          labels: {fontColor: 'lightgrey'}
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'lightgrey'
            },
            ticks: {
              "beginAtZero": true,
              max: maxX,
              fontColor: 'lightgrey'
            }
          }],
          yAxes: [{
            gridLines: {
              color: 'lightgrey'
            },
            ticks: {
              "beginAtZero": true,
              max: maxY,
              fontColor: 'lightgrey'
            }
          }]
        }
      }
    } else {
      options.scales = {
        xAxes: [{
          gridLines: {
            color: 'lightgrey'
          },
          ticks: {
            fontColor: 'lightgrey'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'lightgrey'
          },
          ticks: {
            fontColor: 'lightgrey'
          }
        }],
        gridLines: {color: 'lightgrey'},
        angleLines: {color: 'lightgrey'},
        ticks: {color: 'lightgrey'}
      }
      options.legend.labels.fontColor = 'lightgrey'
      options.maintainAspectRatio = false
    }
    return options
  }

  scatterBubbleOptions(maxX, maxY) {
    return {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            "beginAtZero": true,
            max: maxX
          }
        }],
        yAxes: [{
          ticks: {
            "beginAtZero": true,
            max: maxY
          }
        }]
      }
    }
  }


}
