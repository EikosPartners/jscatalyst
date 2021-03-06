<span>
  <img style='float:left' width='70' height='70' src='static/ep-logo-black.png' />
</span>

## JS Catalyst

[![Build Status](https://travis-ci.org/EikosPartners/jscatalyst.svg?branch=master)](https://travis-ci.org/EikosPartners/jscatalyst)
[![DeepScan grade](https://deepscan.io/api/projects/2298/branches/13338/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2298&bid=13338)
[![Coverage Status](https://coveralls.io/repos/github/EikosPartners/jscatalyst/badge.svg?branch=master)](https://coveralls.io/github/EikosPartners/jscatalyst?branch=master)


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

## Generator
JSCatalyst has a Yeoman generator to make getting started a breeze.
Install `yo` and the generator package `generator-jscatalyst`.
```
npm install -g yo
npm install -g generator-jscatalyst
```

Make a new directory and cd into it.

```
mkdir myproject && cd myproject
```

Run the generator

```
yo jscatalyst
```


## Using Charts
In your main.js file where your app is created please make sure to import the minified css for JS Catalyst.
```js
  import 'jscatalyst/dist/jscatalyst.min.css'
```
To use any of the charts or components in the package just import them and place them in a view. If the component is a chart it is important to wrap it in a div and give it a set height. All charts render based on the size of their parent container.

```html
<template>
  <div class='example-page'>
    <div class="chart">
      <line-chart
        :dataModel='lineChartData'
        propID='example-line-chart'
        metric='Last Sale Price'
        title='Example Line Chart'
      ></line-chart>
    </div>
  </div>
</template>


<script>
  import { D3LineChart } from 'jscatalyst'

  export default {
    data: function() {
      return {
        lineChartData: [
          {"date": "2017-1-1", "value": 2},
          {"date": "2017-4-1", "value": 5},
          {"date": "2017-2-1", "value": 1},
          {"date": "2017-3-1", "value": 6},
          {"date": "2017-1-10", "value": 1}
        ]
      }
    },
    components: {
      'line-chart': D3LineChart
    }
  }
</script>

<style>
  .chart {
    height: 400px;
  }
</style>
```
## Using Plugins
There are three plugins that are included in JS Catalyst. The encapsulate all the logic needed to add theming, screen-sharing, and authentication to your project. To use any of these plugins, import them in your main.js file and call Vue.use().

```js
  import { ScreensharePlugin } from 'jscatalyst'

  Vue.use(ScreensharePlugin)
```
Both the authentication, and theme plugin require extra options to be passed to them. They rely on having a Vuex store and the Vue Router to be present and in use in your project.
```js
  import { ThemePlugin, AuthPlugin } from 'jscatalyst'

  // pass in the Vuex store and an array of your themes
  Vue.use(ThemePlugin, {store, themes: ['Blue', 'Red', 'Grey']})

  // pass in the Vuex store, Vue Router, and the base URL of your api
  Vue.use(AuthPlugin, {store, router, baseURL: 'yourApiURL'})
```

## Contributing
JS Catalyst is an open source project so we gladly accept help with adding new features and new components! To contribute please follow these steps,
- Fork the JS Catalyst repo
- Create a new branch for your feature (`git checkout -b your-new-feature`)
- Test your new feature/component in our sandbox environment by placing it in the **App.vue** file and running **npm start**
- **Please make sure to include tests for your component or feature**
- Commit your changes (`git commit -am 'Add new feature/component'`)
- Push your code to your branch on Github (`git push origin your-new-feature`)
- Create a pull request to be reviewed by our team

For guidelines on how to create a new component please see the JS Catalyst docs. Thanks for your help!
