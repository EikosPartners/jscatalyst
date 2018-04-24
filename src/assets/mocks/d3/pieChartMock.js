import tablesMockData from '../tablesMockData.json'
export const pieChartData = function() {
  var count = {}
  var finalData = []
  tablesMockData.forEach(el => {
    if (count[el["agent"]]) {
      count[el["agent"]] = count[el["agent"]] + 1
    } else {
      count[el["agent"]] = 1
    }
  })
  for(var key in count) {
    finalData.push({
      'label': key,
      'value': count[key]
    })
  }
  return finalData;
}
