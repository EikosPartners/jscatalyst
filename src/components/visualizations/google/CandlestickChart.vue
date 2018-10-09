<template>
    <div style="height: 100%; width: 100%">
        <panel-heading v-if="title" :headerText="title"></panel-heading>
        <resize-observer @notify="redraw"></resize-observer>
        <div :id="propID" class="candlestick"></div>
    </div>
</template>

<script>
    import PanelHeading from '@/components/universal/PanelHeading.vue';
    import { ResizeObserver } from 'vue-resize';
    import googleChartsMixin from '@/mixins/googleChartsMixin.js';

    /** Candlestick Google Chart Component
     * @module Candlestick chart
     * 
     * @param {Array} dataModel - the dataModel for the component
     * @param {string} propID - the ID for the component
     * @param {string} title - the title of the chart
     * @param {Object} config - the configuration object for the candlestick, see google charts API for options
     */

    export default {
        name: 'Candlestick',
        components: {
            'panel-heading': PanelHeading,
            'resize-observer': ResizeObserver
        },
        mixins: [googleChartsMixin],
        props: {
            propID: {
                type: String,
                default: 'container-candlestick'
            }
        },
        mounted: function () {
            this.load(['corechart'])
        },
        methods: {
            /**
             * @function draw - function to draw the candlestick chart
             */
            draw: function () {
                if(!this.disableCustomThemeing) {
                    if (this.$store.state.themeMod.displayTheme === 'light') {
                        this.config.backgroundColor = 'white';
                    } else {
                        this.config.backgroundColor = this.themeColors.vuetifyDark;
                    }
                }

                this.drawChart('CandlestickChart');
            }
        }
    }
</script>