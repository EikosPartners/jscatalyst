<template>
    <div style="height: 100%; width: 100%">
        <panel-heading v-if="title" :headerText="title"></panel-heading>
        <resize-observer @notify="redraw"></resize-observer>
        <div :id="propID" class="sankey-diagram"></div>
    </div>
</template>

<script>
    import PanelHeading from '@/components/universal/PanelHeading.vue';
    import { ResizeObserver } from 'vue-resize';
    import googleChartsMixin from '@/mixins/googleChartsMixin.js';

    /** Sankey Diagram Google Chart Component
     * @module SankeyDiagram
     * 
     * @param {Array} dataModel - the dataModel for the component
     * @param {string} propID - the ID for the component
     * @param {string} title - the title of the chart
     * @param {Object} config - the configuration object for the chart, see google charts API for options
     * 
     */
    export default {
        name: 'SankeyDiagram',
        components: {
            'panel-heading': PanelHeading,
            'resize-observer': ResizeObserver
        },
        mixins: [googleChartsMixin],
        props: {
            propID: {
                type: String,
                default: 'container-sankey-diagram'
            }
        },
        data () { 
            return {
                toIdx: -1,
                fromIdx: -1
            }
        },
        mounted: function () {
            this.load(['sankey'])
        },
        methods: {
            /**
             * @function draw - function to draw the timeline
             */
            draw: function () {
                let fromIdx = -1,
                    toIdx = -1;
                // Determine the from and to columns for use in click handler.
                this.dataModel.columns.forEach( (col, idx) => {
                    if (col.id === 'From') { fromIdx = idx; }

                    if (col.id === 'To') { toIdx = idx; }
                });

                this.fromIdx = fromIdx;
                this.toIdx = toIdx;

                this.config.sankey = {
                    link: {
                        color: {
                            stroke: 'black',
                            strokeWidth: 0.3
                        },
                        colors: Object.values(this.themeColors)
                    },
                    node: {
                        colors: Object.values(this.themeColors),
                        interactivity: true
                    }
                }

                this.drawChart('Sankey');

                // Add event listeners for mouseover and click.
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
                    let name = selection[0].name;

                    let nodes = this.findNodes(name);
                    
                    this.$emit('jsc_click', nodes);
                }
            },
            /**
             * @function findNodes - function to find the nodes that have name as to or from
             * 
             * @return Returns an array of all nodes containing name as to or from
             */
            findNodes: function (name) {
                let nodes = [];

                this.dataModel.rows.forEach( (row) => {
                    if (row[this.toIdx] === name || row[this.fromIdx] === name) {
                        nodes.push(row);
                    }
                });

                return nodes;
            }
        }
    }
</script>