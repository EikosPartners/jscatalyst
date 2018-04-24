<template>
    <div class='center' :style="{height: propHeight}">
<!--         <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div> -->
        <div>
          <v-progress-linear color="blue darken-3" :indeterminate="true"></v-progress-linear>
            <p>Loading Data ...</p>
        </div>
<!--         <v-progress-circular indeterminate :size="circleSize" color="purple"></v-progress-circular>
 -->
    </div>
</template>
<!-- HTK we should consider swapping for the vuetify progress component -->
<!-- https://vuetifyjs.com/components/progress -->

<script>
export default {
    data: function() {
        return {
        }
    },
    props: {
        circleSize: {
            type: Number,
            default: 250
        },
        propHeight: {
            type: String,
            default: "250 px"
        }
    }
}
</script>

<style>
</style>
