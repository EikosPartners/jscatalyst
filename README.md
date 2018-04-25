<span>
  <img style='float:left' width='70' height='70' src='/ep-logo-black.png' />
</span>

## JS Catalyst

[![Build Status](https://travis-ci.org/EikosPartners/jscatalyst.svg?branch=master)](https://travis-ci.org/EikosPartners/jscatalyst)

> An open source Vue component toolkit to quickly build realtime dashboards and allow for instant sharing of dashboards and charts

## What is JS Catalyst for?
JS Catalyst was built to allow both designers and developers to create feature-rich and sleek dashboards. By creating charting components that accept flexible data it is easy to just drop a component in on any page and feed it the data.

## Install
- **yarn**: ` yarn add jscatalyst `
- **npm**: ` npm install jscatalyst`

To use it directly in the browser please use the unpkg link. This will automatically load in the jscatalst.min.js file. Please also include the css for the project so that all charts and components will be styled correctly.

```html
<script src="https://unpkg.com/jscatalyst"></script>
<script src="https://unpkg.com/jscatalyst/dist/jscatalyst.min.css"></script>
```

## Usage
To use any of the charts or components in the package just import them and place them in a view. If the component is a chart it is important to wrap it in a div and give it a set height. All charts render based on the size of their parent container.

```html
<template>
  <div class='example-page'>
    <div class="chart">
      <area-chart
        :dataModel='areaChartData'
        propID='example-area-chart'
        metric='Last Sale Price'
        header='Example Area Chart'
      ></area-chart>
    </div>
  </div>
</template>


<script>

  import { D3AreaChart } from 'jscatalyst'

  export default {
    data: function() {
      return {
        areaChartData:
      }
    },
    components: {
      'area-chart': AreaChart
    }
  }
</script>

<style>
  .chart-1 {
    height: 400px;
  }
</style>
```
