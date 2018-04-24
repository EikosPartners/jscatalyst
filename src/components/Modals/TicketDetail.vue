<template>
	 <v-card>
        <v-card-title style="display:flex; justify-content: space-around;" v-if="backModalAvail">
           <v-btn color="white" small title="Back" flat fab @click.stop="backModal"><v-icon medium>arrow_back</v-icon ></v-btn>
              <span class="title" style="margin-top: 2px;">Ticket Detail</span>
            <v-btn color="white" small title="Close" flat fab @click.stop="closeModal"><v-icon medium>close</v-icon></v-btn>
        </v-card-title>
        <v-card-title style="display:flex; justify-content: space-between;" v-else>
            <span class="title" style="margin-top: 2px;">Ticket Detail</span>
            <v-btn color="black" small title="Close" flat fab @click.stop="closeModal"><v-icon medium>close</v-icon></v-btn>
        </v-card-title>

             <v-card-text class="pt-0">
                <v-list v-for="(value, key) in rowProps" :key="key">
                    <v-list-tile-title>{{key}}</v-list-tile-title>
                    <v-list-tile-content>{{value}}</v-list-tile-content>
                </v-list>
            </v-card-text>
     </v-card>
</template>

<script>
export default {
    data: function(){
        return{
            backModalAvail: false
        }
    },
    props: ['rowProps', 'backModal', 'closeModal'],
    watch: {
      backModal: function(data){
        if (data === "false" || data === "no") {
          this.backModalAvail = false
        } else {
          this.backModalAvail = true
        }
      }
    },
    updated: function(){

    }
}

</script>


<style>

/*  .card__title {
    padding: 16px 16px 0px 16px;
  }
*/</style>
