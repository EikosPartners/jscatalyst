<template>
<v-list class="mt-3 pa-3 display-3" three-line color="transparent">
    <v-list-tile class="tallerList"> <v-list-tile-avatar> <v-icon>border_clear</v-icon> </v-list-tile-avatar>
        <v-list-tile-content>            
            <v-list-tile-title>  <router-link to='/blotters/memory'>In Memory Blotter</router-link> </v-list-tile-title>
            <v-list-tile-sub-title>
                Sort and filter handled by Ag-Grid. Includes live update example and full row editing. <a href="https://www.ag-grid.com/javascript-grid-in-memory/">Documentation</a>. 
            </v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
    
    <v-list-tile class="tallerList"> <v-list-tile-avatar> <v-icon>border_inner</v-icon> </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title>  <router-link to='/blotters/enterprise'>Enterprise Blotter - Client Side Sort/Filter</router-link> </v-list-tile-title>
            <v-list-tile-sub-title>
                Uses EnterpriseDataSource.js. Sort and filter handled by custom functions. <a href="https://www.ag-grid.com/javascript-grid-enterprise-model/">Documentation</a>.
            </v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
    
     <v-list-tile class="tallerList"> <v-list-tile-avatar> <v-icon>border_outer</v-icon> </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title>  <router-link to='/blotters/serverside'>Enterprise Blotter - Server Side Sort/Filter</router-link> </v-list-tile-title>
            <v-list-tile-sub-title>
                Uses JSONDataSource.js. Sort and filter handled by <a href="https://github.com/typicode/json-server">json_server</a> url parameters. <a href="https://www.ag-grid.com/javascript-grid-enterprise-model/">Documentation</a>.
            </v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
    
     <v-list-tile class="tallerList"> <v-list-tile-avatar> <v-icon>border_all</v-icon></v-list-tile-avatar>
         <v-list-tile-content>
            <v-list-tile-title>  <router-link to='/blotters/viewport'>Viewport Blotter</router-link> </v-list-tile-title>
            <v-list-tile-sub-title>
                Uses ViewportDataSource.js and mockServer.js. Sort and filter not yet implemented. <a href="https://www.ag-grid.com/javascript-grid-viewport">Documentation</a>.
            </v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</v-list>

</template>

<script>
export default {
	data: function(){	
		return {}
	}
}
</script>
<style scoped>
/*.tallerList { 
    height: 9vh !important;

 }
 v-list-tile, div.list_ {
    height: 9vh !important;
 }
*/

.list__tile__sub-title {
    font-size: 20px;
}
.list__tile__title {
	font-size: 30px; 
    line-height: 24px;
    height: 32px;
}

.list__tile__title > a {
	text-decoration: none;
}

.list {
    background: transparent !important;
}
</style>