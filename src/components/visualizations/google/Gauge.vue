<template>
    <div style="height: 100%; width: 100%">
        <panel-heading v-if="title" :headerText="title"></panel-heading>
        <resize-observer @notify="redraw"></resize-observer>
        <div :id="propID" class="gauge"></div>
    </div>
</template>

<script>
    import PanelHeading from '@/components/universal/PanelHeading.vue';
    import { ResizeObserver } from 'vue-resize';
    import { GoogleCharts } from 'google-charts';
    import googleChartsMixin from '@/mixins/googleChartsMixin.js';

    /** Gauge Chart Component
     * @module gauge
     * 
     * @param {Array} dataModel - the dataModel for the component
     * @param {string} propID - the ID for the component
     * @param {string} title - the title of the chart
     * @param {Object} config - the configuration object for the timeline, see google charts API for options
     * 
     */
    export default {
        name: 'Gauge',
        components: {
            'panel-heading': PanelHeading,
            'resize-observer': ResizeObserver
        },
        mixins: [googleChartsMixin],
        props: {
            propID: {
                type: String,
                default: 'container-gauge'
            }
        },
        mounted: function () {
            this.load(['gauge']);
        },
        methods: {
            /**
             * @function draw - function to draw the gauge(s)
             */
            draw: function () {
                this.drawChart('Gauge');
            }
        }
    }
</script>