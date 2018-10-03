## Steps for creating a new component with a Google Chart

1. Make your Vue file with template, script, and style tags
2. Create a div with id=propID
3. Import/add the googleChartsMixin to your component
4. Call this.load(packages) with the packages you need in mounted
5. Implement a method called draw
    * Create your DataTable by adding rows/columns or whatever your data format your chart needs
    * Call this.drawChart(chartName, dataTable, propID, chartOptions)
    * Add any event listeners via this.addListener or this.addListenerBatch