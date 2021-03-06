<template>
    <div style="height: 100%; width: 100%;">
        <panel-heading v-if="title" :headerText="title"></panel-heading>
        <resize-observer @notify="redraw"></resize-observer>
        <div :id="propID" class="timeline"></div>
    </div>
</template>

<script>
    import PanelHeading from '@/components/universal/PanelHeading.vue';
    import { ResizeObserver } from 'vue-resize';
    import googleChartsMixin from '@/mixins/googleChartsMixin.js';


    /** Timeline Google Chart Component
     * @module Timeline chart
     *
     * @param {Array} dataModel - the dataModel for the component
     * @param {string} propID - the ID for the component
     * @param {string} title - the title of the chart
     * @param {Object} config - the configuration object for the timeline, see google charts API for options
     */

    export default {
        name: 'Timeline',
        components: {
            'panel-heading': PanelHeading,
            'resize-observer': ResizeObserver
        },
        mixins: [googleChartsMixin],
        props: {
            propID: {
                type: String,
                default: 'container-timeline'
            }
        },
        mounted: function () {
            // Must load the googlecharts library before attempting to draw the timeline.
            this.load(['timeline']);
        },
        methods: {
            /**
             * @function draw - function to draw the timeline
             */
            draw: function () {
                // Options to pass to the timeline.
                if (!this.config.height) {
                    this.config.height = 500;
                }

                if (!this.disableCustomThemeing) {
                    if (this.$store.state.themeMod.displayTheme === 'light') {
                        this.config.backgroundColor = 'white';
                    } else {
                        this.config.backgroundColor = this.themeColors.vuetifyDark;
                    }
                }
                // Draw the chart after the DataTable and options have been defined.
                this.drawChart('Timeline');

                // Add event listeners for click and mouseover.
                this.addListenerBatch([
                    { name: 'select', handler: this.click },
                    { name: 'onmouseover', handler: this.mouseover }
                ]);
            },
            /**
             * @function mouseover - function to handle mouseover event
             * @param {Object} e - the triggered event object containing the hovered row
             */
            mouseover: function (e) {
                let row = this.dataModel.rows[e.row];

                this.$emit('jsc_mouseover', row);
            },
            /**
             * @function click - function to handle click event
             */
            click: function () {
                let selection = this.chart.getSelection();

                if (selection.length > 0) {
                    let row = this.dataModel.rows[selection[0].row];

                    this.$emit('jsc_click', {data: row, event: d3.event});
                }
            }
        }
    }
</script>

<style scoped>
    .timeline {
        padding: 10px;
    }
</style>
