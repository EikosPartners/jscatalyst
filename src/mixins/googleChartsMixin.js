import { GoogleCharts } from 'google-charts';
import { mapGetters, mapState } from 'vuex';

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
            dataTable: {},
            chartName: ""
        }
    },
    /**
     * @param {Array} dataModel - the dataModel for the component
     * @param {string} title - the title of the chart
     * @param {Object} config - the configuration object for the timeline, see google charts API for options
     */
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

            chartOpts.colors = Object.values(this.themeColors);


            let current = this.$store.state.themeMod.displayTheme;

            if (current === 'dark') {
                chartOpts.backgroundColor = this.themeColors.vuetifyDark;
            } else {
                chartOpts.backgroundColor = this.themeColors.vuetifyLight;
            }

            let elem = document.querySelector(el);

            this.chart = new GoogleCharts.api.visualization[chartName](elem);
            this.chart.draw(this.dataTable, chartOpts);
        }
    },
    // 
    computed: {
        ...mapGetters(['themeColors']),
        displayTheme: function () {
            return this.$store.state.themeMod.displayTheme;
        }
    },
    watch: {
        themeColors: function (newVal, oldVal) {
            this.draw();
        },
        displayTheme: function (newVal, oldVal) {
            this.draw();
        }
    }
}

export default googleChartsMixin;