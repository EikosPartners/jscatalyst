<template>
	<div id="tables" style="overflow-x: scroll!important">
		<!-- If isClientSide is true then that means the data is
	 			already available and is passed to the v-client-table immediately -->
    <template v-if="isClientSide">
      <v-client-table ref="dataTableComponentClient" :data="clientData" :columns="columns" :options="options">
        <template slot="ticket_id" slot-scope="props">
          <span slot="activator">
              <a style="cursor:pointer; color: blue;" @click.stop="runTicket" v-bind.prop="props.row">{{props.row.ticket_id}}</a>
          </span>
        </template>

      </v-client-table>
    </template>
    <template v-else>
      <v-server-table ref="dataTableComponentActual" url="useableURL" :columns="columns" :options="options">
          <template slot="agent" slot-scope="props">
              <span v-if="action">
                  <a style="cursor:pointer;" @click.stop="runAction" v-bind.prop="props.row" name='agent'>{{props.row.agent}}</a>
              </span>
              <span v-else>
                {{props.row.agent}}
              </span>
        </template>

          <template slot="ci" slot-scope="props">
              <span>
                  <a style="cursor:pointer;" @click.stop="runAction" v-bind.prop="props.row" name='ci'>{{props.row.ci}}</a>
              </span>
        </template>


          <template slot="last" slot-scope="props">
              <span>
                {{props.row.last._i}}
              </span>
        </template>

          <template slot="incidentset" slot-scope="props">
              <span>
                  <a style="cursor:pointer;" @click.stop="runAction" v-bind.prop="props.row" name='incidentset'>{{props.row.incidentset}}</a>
              </span>
        </template>

        <template slot="ticket_id" slot-scope="props">
          <span slot="activator">
              <a style="cursor:pointer;" @click.stop="runTicket" v-bind.prop="props.row">{{props.row.ticket_id}}</a>
          </span>
        </template>

        <template slot="incidentnumber" slot-scope="props">
          <span slot="activator">
              <a style="cursor:pointer;" @click.stop="runTicket" v-bind.prop="props.row">{{props.row.incidentnumber}}</a>
          </span>
        </template>

        <template slot="avgacw" slot-scope="props">
          <span class='red'>{{props.row.avgacw}}</span>
        </template>

        <template slot="red" style='background-color:red' slot-scope="props">
          <span >{{props.row.red}}</span>
        </template>

        <template slot="amber" style='background-color:yellow' slot-scope="props">
          <span >{{props.row.amber}}</span>
        </template>
        <template slot="green" style='background-color:green' slot-scope="props">
          <span >{{props.row.green}}</span>
        </template>

        <template slot="blue" style='background-color:#4685af; align-content:left' slot-scope="props">
          <span >{{props.row.blue}}</span>
        </template>

      </v-server-table>
    </template>



	</div>

</template>

<script>
  import { ServerTable, ClientTable, Event } from 'vue-tables-2'
  import Vue from 'vue'

	// Tell this component to use ServerTable from vue-tables-2
  Vue.use(ServerTable, {
    compileTemplates: true,
    texts: {
      filter: "Search:"
    },
    datepickerOptions: {
      showDropdowns: true
    }
  })

	// Tell this component to use ClientTable from vue-tables-2
  Vue.use(ClientTable, {
    compileTemplates: true,
    texts: {
      filter: 'Search:'
    },
    datepickerOptions: {
      showDropdowns: true
    }
  })

  // https://jsfiddle.net/matfish2/f5h8xwgn/ reference HTK
  export default {
    props: {
			// Array of keys that will correspond to the data and the proper headers being passed in the options
      columns: {
        type: Array,
        required: true
      },
			// Data used if data does not need to be fetched from and API
      clientData: {
        type: Array,
        required: false
      },
			// Object containing different attributes that affecxt the behavior functionality of the table
			// see https://github.com/matfish2/vue-tables-2#options
      options: {
        type: Object,
        required: true
      },
      isClientSide: {
        Type: Boolean,
        default: false
      },
      name: {
        type: String
      },
      actions: {
        type: Array,
        default () {
          return [
          {field:'ci', action:function() {alert('inside link')}},
          {field:'agent', action:function() {alert('inside link')}},
          {field:'incidentset', action:function() {alert('inside link')}}
        ]
      }},
      action: null,
      ticketAction: null

    },
    data: function() {
      return {
        ticketDetailModal: false,
        rowProps: {},
        draw: 0
      };
    },
    created: function() {
      // window.addEventListener("keyup", event => {
      //   if (event.which === 27) {
      //     this.closeModal();
      //   }
      // });
    },
    methods: {
      refresh: function() {
        if ( this.isClientSide === false ) {
          this.$refs.dataTableComponentActual.refresh()
        }
      },
      getDefaultArray: function(){
        return [
          {field:'ci', action:function() {alert('inside link')}},
          {field:'agent', action:function() {alert('inside link')}},
          {field:'incidentset', action:function() {alert('inside link')}}
        ]
      },
      runAction: function (event ) {
      if ( this._props.action !== undefined )
          this._props.action(event.target)
      },
      runTicket: function (event ) {
      if ( this._props.ticketAction !== undefined )
          this._props.ticketAction(event)
      },
    },

    watch: {
      clientData: function(data){
        if (data.length > 0 && this.isClientSide) {
          //console.log('client table')
          //console.log(data)
        }

      }
    }
  };
</script>


<style>
	.opaque {
    z-index: 3100 !important;
    background: white;
	  position: relative;
	}

  .dialog__content__active{
    z-index: 3052 !important;
  }

  .overlay--active {
    z-index: 3000 !important;
  }
  .coloredIcon {
    color: steelblue;
  }

	a.page-link{
	  padding: 5px;
	}

	li.disabled{
	  display: none;
	}
/*
	::-webkit-scrollbar {
	  -webkit-appearance: none;
	  width: 5px;
	  height: 5px;
	}

	::-webkit-scrollbar-thumb {
	  background-color: rgba(0,0,0,.5);
	    border-radius: 5%;

	}*/
	.VueTables__limit{
	  float: left!important;
	  padding-top: 8px;
	  padding-left: 10px;
	}

	.VueTables__limit {
		padding-left: 10px;
	}

	.VueTables__limit label {
		padding-right: 5px;
	}
  .row {
    display: flex;
  }

	.VueTables__limit select {
	  display: inline;
	  width: 48px;
	  overflow-y: scroll;
	  overflow-x: hidden;
	/*  -webkit-transition: .3s cubic-bezier(.25,.8,.5,1);
	  transition: .3s cubic-bezier(.25,.8,.5,1);
	  -webkit-box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
	  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12); */
		-webkit-appearance: menulist !important;
	  -moz-appearance: menulist !important;
	  appearance: menulist !important;
	  border: 1px solid #D3D3D3;
	}

	.VueTables__search {
		padding-top: 8px;
		padding-left: 10px;
	}

	.VueTables__search input {
		padding-left: 3px;
		border: 1px solid #D3D3D3;
		border-radius: 3px;
	}

	.VueTables__search label {
		padding-right: 10px;
	}

	.VuePagination {
		border-top: 1px solid #D3D3D3;
	}

	.VuePagination__pagination {
		color: black;
		float: right;
		margin-right: 20px !important;
		font-size: 18px;
		padding: 2px;
	}

	.page-link {
		color: black !important;
		padding: 5px;
	}

  .VuePagination__pagination-item-prev-chunk{
    display: none !important;
  }

  .VuePagination__pagination-item-next-chunk{
    display: none!important;
  }
  .closeButton .btn__content{
    justify-content:flex-end!important;
  }

	.onHoverBtn:hover {
    background-color: #D3D3D3;
		cursor: pointer;
  }



  .red {
    background-color: red;
  }
  .blue {
    background-color: blue;
  }

  .green {
    background-color: green;
  }

  .metric {
    align-content: left
  }

</style>
