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

export default {
  name: 'LoaderComponent',
  computed: {
    componentLoader () {
        // get the actual file name because the this.chartName is not always correct
        var fileName = this.filePath ? this.filePath.split('/').slice(-1)[0] : '';
        if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("d3")) {
          if (fileName === 'SankeyDiagram.vue') return;
          return () => import('./visualizations/d3/' + fileName)
        } else if (this.filePath && this.filePath.includes("universal")) {
          // return () => import('./universal/' + fileName)
        } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Chartjs")) {
          return () => import('./visualizations/Chartjs/' + fileName)
        } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Chartist")) {
          return () => import('./visualizations/Chartist/' + fileName)
        } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Plotly")) {
          return () => import('./visualizations/Plotly/' + fileName)
        } else {
          return
        }
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
