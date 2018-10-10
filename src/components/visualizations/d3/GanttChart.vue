<template>
    <div class="gantt-container">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
  	  <resize-observer @notify="resizeSVG" />
      <div :id="propID" style="height:100%"/>
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  import * as moment from "moment";
  import { ResizeObserver } from "vue-resize";
  import formatTimeMixin from '@/mixins/formatTimeMixin.js'
  import PanelHeading from '@/components/universal/PanelHeading.vue';


  /** Gantt Chart D3 component
  * @module Gantt Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {Object} taskStatuses - statuses of tasks (SUCCEEDED, FAILED, etc.)
  * @param {string} dateFormat - format of the x-axis ex HH:MM
  *
  * @example
  * usage on a page:
  * <gantt-chart
  *   style="height:100%"
  *   :dataModel="ganttChartData"
  *   propID='container-ganttchart'
  * ></gantt-chart>
  *
  */

  export default {
    name: 'D3GanttChart',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    mixins: [formatTimeMixin],
    props: {
        /**
         * The data for this component can be customized; it currently contains:
         * @typedef {Array} dataModel
         * @property {Object} startDate - JS dateObject
         * @property {Object} endDate - JS dateObject
         * @property {string} taskStatuses - statuses of tasks (SUCCEEDED, FAILED, etc.)
         * @property {string} actual - class that determines color
         */
      dataModel: {
        type: Array,
        default: ()=>{return [{"startDate":new Date("Sun Dec 09 00:00:45 EST 2012"),"endDate":new Date("Sun Dec 09 02:36:45 EST 2012"),"taskName":"E Job","status":"RUNNING"}]}
      },
      propID: {
        type: String,
        default: "container-ganttchart"
      },
      // classes for styling
      // could be changed in the future
      taskStatuses: {
        type: Object,
        default: () => {return {"SUCCEEDED" : "bar-succeeded", "FAILED" : "bar-failed", "RUNNING" : "bar-running", "KILLED" : "bar-killed"} }
      },
      // format of the date string being passed in
      dateFormat: {
        type: String,
        default: "MMM DD YYYY HH:mm:ss"
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        updateVisual: false,
        internalData: [],
        chart: {}
      };
    },
    watch: {
      // this could be used in the future to update
      // the chart data dynamically
      //dataModel: function(data) {
        //this.render()
        //this.internalData = data;
      //}
    },
    mounted: function() {
  	  this.render();
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        this.render()
      },
      render: function() {

        var data = this.dataModel
        var tasks = [];

        data.forEach(el => tasks.push(Object.assign({}, el)))
        const formatDate = d3.timeParse(this.d3Time[this.dateFormat]);
        if (typeof tasks[0].startDate == 'string') {
            tasks = tasks.map(function(d) {
                d.startDate = formatDate(d.startDate);
                d.endDate = formatDate(d.endDate)
                return d;
            });
        }

        // sort tasks to determing the max value on the x-axis
        tasks.sort(function(a, b) {
            return a.endDate - b.endDate;
        });
        var maxDate = tasks[tasks.length - 1].endDate;

        // sort tasks to determine the min value on thex- axis
        tasks.sort(function(a, b) {
            return a.startDate - b.startDate;
        });
        var minDate = tasks[0].startDate;

        // array of all task names (labels for the y-axis)
        var taskNames = tasks.map(el => el.taskName);

        // supply drawGantt() with all of the arguments
        this.drawGantt(tasks, taskNames, this.taskStatuses, this.dateFormat, [minDate, maxDate])
      },

      /**
      * @function drawGantt - function that draws the graph
      * @param {Array} tasks - the dataModel
      * @param {string} taskNames
      * @param {string} taskStatuses
      * @param {string} dateFormat
      * @param {string} timeDomain
      */

      drawGantt: function(tasks, taskNames, taskStatuses, dateFormat, timeDomain) {
        let localThis = this;
        
        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);

        var margin = {top: 10, right: 40, bottom: 20, left: 40},
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;
        // declares all variables used to create gantt
        var timeDomainStart = timeDomain[0];
        var timeDomainEnd = timeDomain[1];
        var x, y, xAxis, yAxis;

        // Account for panel heading height if title exists.
        if (this.title) {
          height -= 40;
        }

        var keyFunction = function(d) {
          return d.startDate + d.taskName + d.endDate;
        };

        var rectTransform = function(d) {
          return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
        };

        // creates x and y axis with ticks
          x = d3.scaleTime()
            .domain([ timeDomainStart, timeDomainEnd ])
            .range([ 0, width ])
            .clamp(true);

          y = d3.scaleBand()
            .domain(taskNames)
            .range([ 0, height ], .6);

          xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(d3.timeFormat('%m/%d'))
            // .tickSubdivide(true)
            .tickSize(8)
            .tickPadding(8)
            .tickSizeInner(-height);

          yAxis = d3.axisLeft()
            .scale(y)
            .ticks(taskNames.length)
            .tickSizeInner(-width);

        // function that actually draws the gantt chart

          var svg = d3.select(selection_string)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "gantt-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .transition()
            .call(xAxis);

          svg.append("g")
            .attr("class", "y axis")
            .transition()
            .call(yAxis);

          var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);

          var rectHeight = height / taskNames.length * 1.0 - margin.top - margin.bottom

          svg.selectAll(".gantt-chart")
            .data(tasks, keyFunction).enter()
            .append("rect")
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("class", function(d){
              if(taskStatuses[d.status] == null){ return "bar";}
              return taskStatuses[d.status];
            })
            .attr("y", -((rectHeight - y.step()) / 2))
            .attr("transform", rectTransform)
            .attr("height", function(d) { return rectHeight })
            .attr("width", function(d) {
              return (x(d.endDate) - x(d.startDate));
            })
            .on("mouseover", function(d) {
              tooltip.transition()
                .duration(100)
                .style("opacity", 1);

              tooltip
                .html(
                  "<b>" + d.taskName + "</b><br/>" + "Status: " + "<b>" + d.status + "</b><br/>" + moment(d.startDate).format('MMMM Do YYYY, h:mm:ss a') + " - " + moment(d.endDate).format('MMMM Do YYYY, h:mm:ss a')
                )
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px");

              localThis.$emit('jsc_mouseover', d);
            })
            .on("mouseout", function(d) {
              tooltip.transition()
                .duration(300)
                .style("opacity", 0);
            })
            .on('click', function (d) {
              localThis.$emit('jsc_click', d);
            });

          // Emit ready event.
				  this.$emit('ready');
      }
    }
  };
</script>

<style>

.chart {
	font-family: Arial, sans-serif;
	font-size: 12px;
}

.gantt-container {
  height: 100%;
}

.bar {
	fill: var(--fourth);
}

.bar-failed {
	fill: var(--third) ;
}

.bar-running {
	fill: var(--fifth);
}

.bar-succeeded {
	fill: var(--seventh);
}

.bar-killed {
	fill: var(--first);
}
</style>
