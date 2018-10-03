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
            /** 
             * @typedef dataModel
             * @property {Array} columns - object definition of the columns, of the form { type: "", id: "" }
             * @property {Array} rows - the rows of data to display, each row is an array where the elements
             *                          are in the same order as their corresponding column definitions 
             */
            dataModel: {
                type: Object,
                default: function () {
                    return { columns: [], rows: [] }
                }
            },
            propID: {
                type: String,
                default: 'container-orgchart'
            },
            config: {
                type: Object, 
                default: function () {
                    return {};
                }
            },
            title: {
                type: String
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
                this.dataTable = new GoogleCharts.api.visualization.DataTable();

                let localThis = this;

                this.dataModel.columns.forEach( (col) => {
                    localThis.dataTable.addColumn(col);
                });

                this.dataTable.addRows(this.dataModel.rows);

                this.drawChart('Gauge', this.dataTable, '#' + this.propID, this.config);
            },
            redraw () {
                this.load(['gauge'])
            }
        }
    }
</script>