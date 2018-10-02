import { GoogleCharts } from 'google-charts';
import { mapGetters } from 'vuex';

/**
 * Mixin for making it easy to create a component that uses a Google Chart.
 * 
 * Your method for drawing the chart must be named draw.
 */
const googleChartsMixin = {
    /**
     * this.chart - reference to the created chart
     * this.dataTable - reference to the chart's DataTable
     */
    data: function () {
        return {
            chart: {},
            dataTable: {}
        }
    },
    methods: {
        /** 
         * Mounted hook to ensure draw function exists.
         */
        mounted () {
            if (!this.draw) {
                console.error("[googleChartsMixin] this.draw must be defined");
            }
        },
        /**
         * Function to load the GoogleCharts library with the necessary packages
         * 
         * @param {Array} packages - array of chart packages to load
         */
        load (packages) {
            GoogleCharts.load(this.draw, { 'packages': packages });
        },
        /**
         * Function add event listeners to the created chart.
         * 
         * @param {String} eventName - the name of the event to listen to
         * @param {Function} handler - the function to call when the event is raised
         * 
         * handler should accept one parameter which is an object containing
         * the target of the event
         */
        addListener (eventName, handler) {
            if (!handler) {
                console.error("[googleChartsMixin] Must provide handler to addListener");
                return;
            }

            let validEvents = ["select", "onmouseover", "onmouseout", "ready", "error"];

            if (!validEvents.includes(eventName)) {
                console.error("[googleChartsMixin] valid events are " + validEvents.join(", "));
                return;
            }

            GoogleCharts.api.visualization.events.addListener(this.chart, eventName, handler);
        },
        /**
         * Function to batch add event listeners at once.
         * 
         * @param {Array} events - array of event objects to handle
         * 
         * each event object is of the form:
         * {
         *      name: 'event name',
         *      handler: function to handle the event.
         * }
         */
        addListenerBatch (events) {
            if (!events || events.length === 0){
                console.error("[googleChartsMixin] events must not be empty");
                return;
            }

            let localThis = this;

            events.forEach( (evt) => {
                localThis.addListener(evt.name, evt.handler);
            });
        },
        /**
         * Function to draw the chart.
         * 
         * @param {String} chartName - the name of the chart to draw
         * @param {Object} dataTable - the dataTable for the chart
         * @param {String} el - selector for the element to draw the chart in
         * @param {Object} chartOpts - configuration object for the chart.
         */
        drawChart (chartName, dataTable, el, chartOpts) {
            if (!chartName || chartName === "") {
                console.error("[googleChartsMixin] must provide chartName");
                return;
            }

            if (!dataTable) {
                console.warn("[googleChartsMixin] empty dataTable provided");
                this.dataTable = new GoogleCharts.api.visualization.DataTable();
            } 

            if (!this.dataTable) {
                this.dataTable = dataTable;
            }

            if (!el || el === "") {
                console.error("[googleChartsMixin] must provide el selection string to attach to");
                return;
            }

            if (!chartOpts) {
                chartOpts = {};
            }

            // Automatically pass the current theme colors to the chart.
            if (!chartOpts.colors || chartOpts.colors.length === 0) {
                chartOpts.colors = Object.values(this.themeColors);
            }

            let elem = document.querySelector(el);

            this.chart = new GoogleCharts.api.visualization[chartName](elem);
            this.chart.draw(this.dataTable, chartOpts);
        }
    },
    // 
    computed: {
        ...mapGetters(['themeColors'])
    },
    watch: {
        themeColors: function (newVal, oldVal) {
            this.draw();
        }
    }
}

export default googleChartsMixin;