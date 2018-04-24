<template>
  <div class="receiver">
    <v-alert type="warning" :value="!connected && !isFin" style="font-size: 16px; font-weight:bold">
      You are not connected to the server! Please ask your colleague to resend data once this message disappears.
    </v-alert>
    <main class="page">
      <section>
          <h1 class="display-1 mt-5 mb-1">Send Stock Test</h1>
          <p class="body-1 mt-3">
            In laoreet convallis porttitor. Donec vel lacus magna. Suspendisse eu elementum orci. Ut felis ante, lacinia vel placerat eu, cursus ut ante. Aenean eleifend dolor vulputate, interdum lectus a, tristique lorem. Nullam ut felis finibus, consequat sapien nec, consequat quam. In auctor neque felis, at interdum nulla efficitur ut. Integer ultrices ligula at augue sollicitudin, id sollicitudin ligula laoreet. Nullam id massa id arcu venenatis bibendum.
          </p>
      </section>
      <section>
        <panel-heading :headerText="headerText" />
      </section>
      <receiver-comp></receiver-comp>
    </main>
  </div>
</template>

<script>

import PanelHeading from "@/components/universal/PanelHeading.vue";
import ReceiverComponent from '@/components/ReceiverComponent.vue'
export default {
  watch: {
    connected: function(data){

    }
  },
  components: {
    "panel-heading": PanelHeading,
    'receiver-comp': ReceiverComponent
  },
  name: 'Receiver',
  data () {
    return {
      connected: false,
      dataSource: null,
      isFin: windowmanager.runtime.isOpenFin
    }
  },
  computed: {
      headerText (){
        if (this.dataSource){
          return this.dataSource + " Info"
        } else {
          return "Receive a Chart/Dashboard From Someone Else"
        }
      }
  }
}
</script>

<style lang="stylus" scoped>


.page > section
  grid-column 1 / 13

.receiver
  grid-column 1 / 13
</style>
