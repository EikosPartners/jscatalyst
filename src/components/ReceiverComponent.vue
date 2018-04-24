<template>
  <div :class="[wrapperClass, 'receiver']">
    <chart-sender v-if='componentArray.length' :components='components'></chart-sender>
    <template v-for="(item, index) in componentArray">
      <div :class="componentArray[index].class" :style="{height: ( componentArray[index].height + 'px' )}" :key="index">
        <loader-component v-bind="item"/>
      </div>
    </template>
  </div>
</template>

<script>
  import LoaderComponent from '@/components/LoaderComponent.vue'
  import styleTogglerMixin from '@/mixins/styleTogglerMixin'
  import ChartSender from '@/components/ChartSenderComponent.vue'

  export default {
    mixins: [styleTogglerMixin],
    screenshare: 'receiverComp',
    components: {
      'loader-component': LoaderComponent,
      'chart-sender': ChartSender
    },
    data: function() {
      return {
        componentArray: [],
        themes: {},
        wrapperClass: ''
      }
    },
    watch: {
      themes: function(themeObj) {
        if (this.$store.state.themeMod) {
          if (this.$store.state.themeMod.displayTheme !== themeObj.displayTheme) {
            this.toggleDark()
          }
            this.chooseTheme(themeObj.colorTheme)
          }
        }
    },
    computed: {
      components: function(){
        return this.componentArray.map(comp => comp.chartName)
      }
    }
  }
</script>

<style lang="css">
</style>
