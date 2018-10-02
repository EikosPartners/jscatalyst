<template>
    <div style="height: 100%; width: 100%;">
        <panel-heading v-if="title" :headerText="title"></panel-heading>
        <resize-observer @notify="draw"></resize-observer>
        <div :id="propID" class="timeline"></div>
    </div>
</template>

<script>
    import PanelHeading from '@/components/universal/PanelHeading.vue';
    import { ResizeObserver } from 'vue-resize';
    import { GoogleCharts }  from 'google-charts';
    import basePropsMixin from '@/mixins/basePropsMixin.js';
    import googleChartsMixin from '@/mixins/googleChartsMixin.js';
    import { mapGetters } from 'vuex'


    /** Timeline Google Chart Component
     * @module Timeline chart
     * 
     * @param {Array} dataModel - the dataModel for the component
     * @param {string} propID - the ID for the component
     * @param {string} title - the title of the chart
     * @param {Number} height - the height of the timeline, default 500px
     * 
     */

    export default {
        name: 'Timeline',
        components: {
            'panel-heading': PanelHeading,
            'resize-observer': ResizeObserver
        },
        mixins: [basePropsMixin, googleChartsMixin],
        props: {
            /**
             * @typedef dataModel
             * @property {Array} columns - object definition of the columns, of the form { type: "", id: "" }
             * @property {Array} rows - the rows of data to display, each row is an array where the 
             *                          elements are in the value to display in the same order as their 
             *                          corresponding column definitions
             */
            dataModel: {
                type: Object,
                default: { columns: [], rows: []}
            },
            propID: {
                type: String,
                default: 'container-timeline'
            },
            height: {
                type: Number,
                default: 500
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
                const timelineOpts = {
                    height: this.height
                }

                this.dataTable = new GoogleCharts.api.visualization.DataTable();
                
                let localThis = this;
                // Add the columns to the dataTable.
                this.dataModel.columns.forEach( (col) => {
                    localThis.dataTable.addColumn(col);
                });
                
                // Add the rows of data to the dataTable.
                this.dataTable.addRows(this.dataModel.rows);

                // Draw the chart after the DataTable and options have been defined.
                this.drawChart('Timeline', this.dataTable, '#' + this.propID, timelineOpts);

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
             * @param {Object} e - the triggered event object containing the clicked row
             */
            click: function () {
                let selection = this.chart.getSelection();

                if (selection.length > 0) {
                    let row = this.dataModel.rows[selection[0].row];

                    this.$emit('jsc_click', row);
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