<template>
    <div style="width: 100%; height: 100%">
        <ag-grid-vue style="width: 100%; height: 100%;" :class="gridTheme"
                     :gridOptions="gridOptions">
        </ag-grid-vue>
    </div>
</template>

<script>
import "@@/ag-grid/dist/styles/ag-grid.css";
import "@@/ag-grid/dist/styles/theme-material.css";
import "@@/ag-grid/dist/styles/theme-dark.css";

import {AgGridVue} from "ag-grid-vue";

export default {
    props: {
        gridOptions: {
            required: true
        }
    },
    data() {
        return {

        }
    },
    components: {
        'ag-grid-vue': AgGridVue,
    },
    mounted(){

    },
    computed: {
        appTheme: function() { 
            return this.$store.state.displayTheme 
        },
        gridTheme: function(){
            if (this.appTheme === 'light') {
                return 'ag-material ag-theme-material'
            } else if (this.appTheme === 'dark') {
                return 'ag-dark ag-theme-dark' 
                // HTK we could potentially set up our own fork of the material theme with dark colors instead of this guy
            }
        } 

    }
}
</script>

<style>
.ag-row-editing {
    background-color: var(--sixth) !important;
    color: black !important;
    font-weight: bold !important;
}
</style>
