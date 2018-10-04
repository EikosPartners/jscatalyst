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
            chartName: "",
            packages: []
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
            if (!this.packges || this.packages.length === 0) { this.packages = packages; }

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
         * @param {String} chartName - the name of the chart to draw.
         */
        drawChart (chartName) {
            if (!chartName || chartName === "") {
                console.error("[googleChartsMixin] must provide chartName");
                return;
            }

            this.chartName = chartName;

            // Create the dataTable from the dataModel.
            this.dataTable = this.createDataTable();

            this.config.colors = Object.values(this.themeColors);

            let current = this.$store.state.themeMod.displayTheme;

            if (current === 'dark') {
                this.config.backgroundColor = this.themeColors.vuetifyDark;
            } else {
                this.config.backgroundColor = this.themeColors.vuetifyLight;
            }

            // Find the element to attach the chart to.
            let elem = document.querySelector('#' + this.propID);

            this.chart = new GoogleCharts.api.visualization[chartName](elem);
            this.chart.draw(this.dataTable, this.config);
        },
        /**
         * @function createDataTable
         * 
         * Method to create and populate the chart's datatable from the dataModel.
         * This method can be overriden by the component. Just create a method with 
         * the same name and have it return the dataTable and drawChart will 
         * use that method instead. 
         * 
         * @return 
         */
        createDataTable () {
            let dataTable = new GoogleCharts.api.visualization.DataTable();

            // Add the columns to the dataTable.
            this.dataModel.columns.forEach( (col) => {
                dataTable.addColumn(col);
            });

            // Add the rows.
            dataTable.addRows(this.dataModel.rows);

            return dataTable;
        },
        /**
         * @function redraw
         * 
         * Method to reload the chart when a change is required.
         */
        redraw () {
            this.load(this.packages);
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