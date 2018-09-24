<template>
  <span :id="propID" >
    <div :class=" {'panel-heading': !collapsed, 'collapsedBar': collapsed}" :style="{backgroundColor: displayTheme == 'light' ? themeColors.vuetifyLight : themeColors.vuetifyDark, color: displayTheme == 'light' ? 'black' : 'white'}">

    <span v-if="collapsed">
      <v-tooltip right allow-overflow>
        <i color="" class="iconHover" slot="activator">{{icon}}</i>
        <span>{{collapsedTooltip}}</span>
      </v-tooltip>
    </span>

    <span v-else>
      <i color="">{{icon}}</i>
        {{headerText}}
      <v-tooltip right v-if="titleText">
         <img slot="activator" src="/src/assets/img/info.png" style="width:16px;height:16px;" alt="info" ></img>
         <span>{{titleText}}</span>
      </v-tooltip>
      <span v-if="resetFunction">
        <a v-on:click="resetFunction" v-if="headerText.toLowerCase().includes('interval')" id="reset-interval">Default</a>
        <a v-else v-on:click="resetFunction" id="reset-filter">Reset</a>
      </span>
    </span>

    <span v-if="actions" v-for="action in actions">
      <a v-on:click="action.click" target="blank" style="float:right" :title="action.title"><i color="black">{{action.icon}}</i></a>
    </span>

    <span v-if="downloadURL">
      <a :href="downloadURL" target="blank" style="float:right;" id="downloadExcel" title="Download to Excel"><i color="">file_download</i></a>
    </span>
    </div>
  </span>
</template>

<script>
import moment from 'moment'
import themeHelper from '@/common/themeHelper'
import {mapGetters} from 'vuex'

export default {
    data: function(){
        return{
          showReset : false,
        }
    },
    props: {
      tooltipInfo: {
        required: false,
        default: "Tooltip TBD"
      },
    	headerText:{
    		type: String,
    		required: true
    	},
    	titleText:{
    		type: String
      },
      reset : {
        type: Function,
        default: undefined
      },
      icon: {
        type: String
      },
      collapsed: {
        type: Boolean
      },
      resetFunction: {
        type: Function
      },
      tableOptions: {
        required: false
      },
      downloadURL: {
        type: String
      },
      actions: {
        Type: Array
      },
      propID: {
        type: String,
        required: false,
        default: 'panelHeadingID'
      }
    },
    mounted: function() {
      if ( this._props.reset !== undefined) {
        this.showReset = true
      }
    },
    methods: {
      onreset: function() {
        if ( this._props.reset.default !== undefined) {
          this._props.reset()
        }

        alert('reset clicked')
      }
    },
    computed: {
      ...themeHelper,
      ...mapGetters(['themeColors']),
      collapsedTooltip: function(){
        if (this.headerText === "Interval Selector") {
          let useableStart = moment(this.tooltipInfo.start_date)
          let useableEnd = moment(this.tooltipInfo.end_date)
          // + "\n" + " Start: " + " End: "
          return  "Interval: " + useableStart.format("M/D/YYYY") + " - " + useableEnd.format("M/D/YYYY")
        } else if (this.headerText === "Volume Selector") {
          return "Volume: " + this.tooltipInfo
        } else if (this.headerText === "Category Controls"){
          return "Category 1: " + this.tooltipInfo[0] + " - " + "Category 2: " + this.tooltipInfo[1]+ " - " + "Category 3: "+ this.tooltipInfo[2]
        } else {
          return this.tooltipInfo
        }

      },


    }
}

</script>

<style>
  .collapsedBar {
    height: 100px;
    font-size: 16px;
    padding: 50px 10px;
    background-color: #e2e2e2;
    cursor: pointer;
    /*margin-right:20px;*/
  }

  .panel-heading {
    height: 40px;
    font-size: 20px;
    padding: 6px 10px 5px 10px;
/*    background-color: #e2e2e2;*/
    border-radius: 4px;
    /*cursor: pointer;*/
    /*margin-right:20px;*/
  }

  #reset-filter, #reset-interval {
    font-size: 10px;
    cursor: pointer;
    text-decoration: underline;
    float: right;
  }

  #downloadExcel:hover {
    background-color: #E1E1E1;
    cursor: pointer;
  }

  .tooltip {
    white-space: pre-wrap;
  }

  .iconHover:hover {
    background-color: rgb(220, 220, 220);
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
  }

  .theme--dark .panel-heading {
      background-color: #282828;
  }

  .theme--dark .collapsedBar {
      background-color: #282828;
  }

</style>
