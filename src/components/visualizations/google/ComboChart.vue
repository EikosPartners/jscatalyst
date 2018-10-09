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

    /** Combo Chart Google Chart Component
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
                default: 'container-combo-chart'
            }
        },
        mounted: function () {
            this.load(['corechart']);
        },
        methods: {
            /**
             * @function draw - function to draw the combo chart            
             */
            draw: function () {
                let localThis = this;
                let themeColorsArray = Object.values(this.themeColors);
                //Check if colors have been defined for the series yet, if not add theme colors.
                if (localThis.config.series) {
                    Object.keys(localThis.config.series).forEach( (s, idx) => {
                        localThis.config.series[s].color = themeColorsArray[(idx + 1) % 7];
                    });
                }

                if (!this.disableCustomThemeing) {
                    if (this.$store.state.themeMod.displayTheme === 'light') {
                        this.config.backgroundColor = 'white';
                    } else {
                        this.config.backgroundColor = this.themeColors.vuetifyDark;
                    }
                }
               

                this.drawChart('ComboChart');

                this.addListenerBatch([
                    { name: 'onmouseover', handler: this.mouseover },
                    { name: 'select', handler: this.click }
                ])
            },
            mouseover: function (e) {
                let row = this.dataModel.rows[e.row];

                this.$emit('jsc_mouseover', row);
            },
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