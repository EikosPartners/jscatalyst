## Steps for creating a new component with a Google Chart

1. Make your Vue file with template, script, and style tags
2. Create a div with id=propID
3. Import/add the googleChartsMixin to your component
4. Call this.load(packages) with the packages you need in mounted
5. Implement a method called draw
    * If you want/need to create a custom DataTable for your chart, implement
      another method called createDataTable that returns the DataTable created
    * Call this.drawChart("name of chart")
    * Add any event listeners via this.addListener or this.addListenerBatch