<template>
    <div style="height: 100%; width: 100%">
        <panel-heading v-if="title" :headerText="title"></panel-heading>
        <resize-observer @notify="redraw"></resize-observer>
        <div :id="propID" class="org-chart"></div>
    </div>
</template>

<script>
    import PanelHeading from '@/components/universal/PanelHeading.vue';
    import { ResizeObserver } from 'vue-resize';
    import googleChartsMixin from '@/mixins/googleChartsMixin.js';
    import { GoogleCharts } from 'google-charts';

    /** Organization Chart
     * @module OrgChart
     *
     * @param {Array} dataModel - the dataModel for the component
     * @param {string} propID - the ID for the component
     * @param {string} title - the title of the chart
     * @param {Object} config - the configuration object for the timeline, see google charts API for options
     */
    export default {
        name: 'OrgChart',
        components: {
            'panel-heading': PanelHeading,
            'resize-observer': ResizeObserver
        },
        mixins: [googleChartsMixin],
        props: {
            propID: {
                type: String,
                default: 'container-orgchart'
            }
        },
        mounted: function () {
            this.load(['orgchart']);
        },
        methods: {
            /**
             * @function draw - function to draw the orgchart
             */
            draw: function () {
                if (this.displayTheme === 'dark') {
                    this.config.nodeClass = 'jsc-org-node-dark';
                } else {
                    this.config.nodeClass = "jsc-org-node-light";
                }

                this.drawChart('OrgChart');

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
                console.log(selection);

                if (selection.length > 0) {
                    let row = this.dataModel.rows[selection[0].row];

                    this.$emit('jsc_click', {data: row, event: d3.event});
                }
            }
        }
    }
</script>

<style lang="stylus">
    .jsc-org-node-light {
        background-color: var(--vuetify-light);
        border: 2px solid var(--first);
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.5) 3px 3px 3px;
        color: black;
    }

    .jsc-org-node-dark {
        background-color: var(--vuetify-dark);
        border: 2px solid var(--seventh);
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.5) 3px 3px 3px;
        color: white;
    }
</style>
