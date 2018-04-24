<template>
  <v-layout row wrap>
     <v-flex xs2>
      <v-menu ref="thisMenu" offset-y open-on-hover :close-on-content-click="false" class="pr-1" max-height="500px">
        <v-btn slot="activator" style="padding-left:5px">
          <span v-if="selectedTime.length > 1">
            {{selectedTime[0]}} to {{selectedTime[1]}}
          </span>
          <span v-else>
            Any Last Reported Alerts
          </span>
          <v-icon>arrow_drop_down</v-icon>

        </v-btn>
        <v-list>
          <v-list-tile v-for="time in timeOptions" :value="time" @click="selectTime" v-bind:key="time">
            <v-list-tile-title class="black--text">{{ time }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="customTimeRange" @click="showPickers" v-bind:key="pickersVis">
            <v-list-tile-title class="black--text">Custom Range</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>


    <v-menu v-model="pickersVis" absolute :position-x="x" :position-y="y" :close-on-content-click="false">
      <v-card style="width:700px">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex sm12 lg6>
              <v-date-picker v-model="startDate"></v-date-picker>
            </v-flex>
            <v-flex sm12 lg6>
              <v-date-picker v-model="endDate"></v-date-picker>
            </v-flex>
            <v-flex xs12>
              <v-card-actions>
                <v-btn @click="applyTime">Apply</v-btn>
                <v-btn @click="closePickers">Cancel</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-menu>

  </v-layout>
</template>

<script>
export default {
    data: function(){
        return{
            startDate: null,
            endDate: null,
            pickersVis: false,
            x: 0,
            y: 0,
        }
    },
    props: {
      timeOptions: {
        type: Array,
        default: ()=>{return ['Today', 'Last Week', 'Last Month', 'Last 3 Months', 'Reset']}
      },
      selectTime: {
        type: Function,
        default: () => {}
      },
      selectedTime: {
        type: Array,
        default: ()=>{return []}
      },
      propID: {
        type: String,
        default: 'datePickerMenu'
      },
      customTimeRange: {
        type: Boolean,
        default: false
      }
    },
    mounted: function(){
      this.$refs.thisMenu.$refs.content.id = this.propID
    },
    watch: {
      startDate: function(data){

      },
      endDate: function(data){

      },
      selectedTime: function(data){

      }
    },
    methods: {
      showPickers: function(event){
        this.x = 320
        this.y = event.clientY - 300
        this.$nextTick(() => {
          this.pickersVis = true
        })

      },
      closePickers: function(){
        this.pickersVis = false
      },
      applyTime: function(){
        if (this.endDate == null){
          this.endDate = this.moment().format('YYYY-MM-DD')
        }
        this.selectTime([this.startDate, this.endDate])
        this.closePickers()

      }
    }

}

</script>

<style>
</style>
