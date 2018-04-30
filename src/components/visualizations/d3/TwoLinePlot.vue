<template>
    <div style="height:100%; width:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" style="height:100%; width:100%"/>
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  import moment from "moment";
  import { ResizeObserver } from "vue-resize";
  import formatTimeMixin from '@/mixins/formatTimeMixin.js';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Two Line Plot D3 component
  * @module Two Line Plot
  *
  * @param {Array} dataModel - the dataModel for one line
  * @param {Array} dataModel2 - the dataModel for the other line
  * @param {string} propID - the ID for the component
  * @param {string} metric1 - the name for first set of data you are measuring
  * @param {string} metric2 - the name for the second set of data you are measuring
  * @param {string} dateFormat - 'YYYY-MM-DD'
  *
  * @example
  * usage on a page:
  * <two-line-plot
  *   :dataModel="linePlotData"
  *   :dataModel2="lineData"
  *   metric="Open Tickets"
  *   metric2="Resolved Tickets"
  *   propID='container-twolineplot'
  *   dateFormat='YYYY-MM-DD'
  * ></two-line-plot>
  *
  */

  export default {
    name: 'D3TwoLinePlot',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    mixins: [formatTimeMixin],
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {string} date - date String'(ex. "2017-06-01")
       * @property {string} value - the value at the date
       */
      dataModel: {
        type: Array,
        default: ()=>{return["data", "data"]}
      },
      dataModel2: {
        type: Array,
        default: ()=>{return["data", "data"]}
      },
      propID: {
        type: String,
        default: "container-twolineplot"
      },
      metric: {
        type: String,
        default: ""
      },
      metric2: {
        type: String,
        default: ""
      },
      dateFormat: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        internalData: [],
        internalData2: [],
      };
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData && data.length !== 0) {
          this.internalData = data;
          this.internalData.length !== 0 ? this.drawd3(data, this.dataModel2, this.metric, this.metric2, "#" + this.propID) : null;
        }
      },
      dataModel2: function(data) {
         if (data !== this.internalData2 && data.length !== 0) {
          this.internalData2 = data;
          this.internalData2.length !== 0 ? this.drawd3(this.dataModel, data, this.metric, this.metric2, "#" + this.propID) : null;
        }
      },
      displayTheme: function(data){
        this.drawd3(this.dataModel, this.dataModel2, this.metric, this.metric2, "#" + this.propID)
      }
    },
    mounted: function() {
      this.dataModel.length === 0 ? null : this.draw();
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    computed: {
      displayTheme: function(){
        return this.$store.state.displayTheme
      }
    },
    methods: {
      drawd3: function(dataArray, dataArray2, metric, metric2, selection_string) {
        d3.selectAll(`.${this.propID}_tooltip`).remove()
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }
        var data = [];
        var data2 = [];
        dataArray.forEach((el, i) => {
          data.push(Object.assign({}, el));
          data2.push(Object.assign({}, dataArray2[i]))
        })

        var localThis = this;
        const formatDate = d3.timeParse(this.d3Time[this.dateFormat]);

        if (typeof data[data.length-1].date == 'string') {
          data.forEach(function(d) {
            if (typeof d.date == 'string') {
              d.date = formatDate(d.date);
            }
          });
        }
        data.sort(function(a,b) {
          return a.date - b.date
        })

        if (typeof data2[data2.length-1].date == 'string') {
          data2.forEach(function(d) {
            if (typeof d.date == 'string') {
              d.date = formatDate(d.date);
            }
          });
        }
        data2.sort(function(a,b) {
          return a.date - b.date
        })

        var detected_percent = function(d) {
          let detected =
            d3.max(d, function(obj) {
              return obj.value;
            }) <= 1
              ? "%"
              : "";
          return detected;
        };

        var margin = { top: 20, right: 50, bottom: 30, left: 75 },
          width = $(selection_string).width() - margin.left - margin.right,
          height = $(selection_string).height() - margin.top - margin.bottom;

        var xValue = function(d) {
            return d.date;
          },
          xScale = d3.scaleTime().range([0, width]),
          xMap = function(d) {
            return xScale(xValue(d));
          },
          xAxis = d3.axisBottom()
            .scale(xScale)
            .tickSizeInner(-height)
            .ticks(6);

        var format_attribute = d3.format(detected_percent(data));
        var format_attribute2 = d3.format(detected_percent(data2));

        var yValue = function(d) {
            return d.value;
          },
          yScale = d3.scaleLinear().range([height, 0]),
          yScale2 = d3.scaleLinear().range([height, 0]),
          yMap = function(d) {
            return yScale(yValue(d));
          },
          yMap2 = function(d) {
            return yScale2(yValue(d));
          };

        let y_max, y_max2;
        y_max = d3.max(data, yValue);
        y_max2 = d3.max(data2, yValue);

        let y_min, y_min2;
        y_min = d3.min(data, yValue);
        y_min2 = d3.min(data2, yValue);

        var x_domain = d3.extent(data, xValue);

        xScale.domain(x_domain);
        yScale.domain([y_min, y_max]);
        yScale2.domain([y_min2, y_max2]);

        let yAxis2 = d3.axisRight()
          .scale(yScale2)
          .ticks(6)
          .tickFormat(format_attribute2);

        let yAxis = d3.axisLeft()
          .scale(yScale)
          .ticks(6)
          .tickSizeInner(-width)
          .tickFormat(format_attribute);

        var line = d3.line()
          .x(xMap)
          .y(yMap);

        var line2 = d3.line()
          .x(xMap)
          .y(yMap2);

        var svg = d3.select(selection_string)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tooltip = d3.select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        svg
          .append("g")
          .attr("class", "x axis xaxis axis-two-plot")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg
          .append("g")
          .attr("class", "y axis axis-two-plot")
          .style("fill", "black")
          .call(yAxis)
          .append("foreignObject")
          .attr("class", "metric-label-two-plot")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("x", -height)
          .attr("width", height)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(metric);

        svg
          .append("g")
          .attr("class", "y axis yaxis2 axis-two-plot")
          .attr("transform", "translate(" + width + " ,0)")
          .style("fill", "black")
          .call(yAxis2)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("dy", "-.71em")
          .style("text-anchor", "end")
          .style("font-size", "16px")
          .text(metric2);

        var displayTheme = this.displayTheme
        svg
          .append("path")
          .datum(data)
          .attr("class", "twoplotline")
          .attr('stroke',function(){
            if (displayTheme === "light") {
              return "var(--first)"
            } else {
              return "var(--sixth)"
            }
          })
          .attr("d", line)
          .attr('stroke-width', '3');

        svg
          .append("path")
          .datum(data2)
          .attr("class", "line-2")
          .attr("d", line2)
          .attr('stroke-width', '3')
          .attr('stroke', "var(--fifth)")
          .attr('fill', 'none');

        svg
          .selectAll(".dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("r", 5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .attr("fill", "steelblue")
          .attr("opacity", 0)
          .on("mouseover", function(d) {
            tooltip
              .transition()
              .duration(100)
              .style("opacity", 1);
            tooltip
              .html(
                "Date: " +
                  moment(d.date).format(localThis.dateFormat) +
                  "<br>" +
                  metric +
                  ": " +
                  format_attribute(yValue(d))
              )
              .style("left", d3.event.pageX + 5 + "px")
              .style("top", d3.event.pageY - 28 + "px");
            d3
              .select(this)
              .transition()
              .duration(50)
              .style("fill", "blue")
              .attr("opacity", 1);
          })
          .on("mouseout", function(d) {
            tooltip
              .transition()
              .duration(300)
              .style("opacity", 0);
            d3
              .select(this)
              .transition()
              .duration(50)
              .attr("opacity", 0);
          });

        svg
          .selectAll(".dot2")
          .data(data2)
          .enter()
          .append("circle")
          .attr("class", "dot2")
          .attr("r", 5)
          .attr("cx", xMap)
          .attr("cy", yMap2)
          .attr("fill", "#222222")
          .attr("opacity", 0)
          .on("mouseover", function(d) {
            tooltip
              .transition()
              .duration(100)
              .style("opacity", 1);
            tooltip
              .html(
                "Date: " +
                  moment(d.date).format(localThis.dateFormat) +
                  "<br>" +
                  metric2 +
                  ": " +
                  format_attribute2(yValue(d))
              )
              .style("left", d3.event.pageX + 5 + "px")
              .style("top", d3.event.pageY - 28 + "px");
            d3
              .select(this)
              .transition()
              .duration(50)
              .style("fill", "blue")
              .attr("opacity", 1);
          })
          .on("mouseout", function(d) {
            tooltip
              .transition()
              .duration(300)
              .style("opacity", 0);
            d3
              .select(this)
              .transition()
              .duration(50)
              .attr("opacity", 0);
          });

        svg
          .selectAll(".tick")
          .filter(function(d) {
            return d === 0;
          })
          .remove();
      },
      /**
      * @function draw - function that draws the graphic
      * @param {Array} dataModel - the first dataModel
      * @param {Array} dataModel2 - the second dataModel
      * @param {string} metric - name of the first set of data
      * @param {string} metric2 - name for the second set of data
      * @param {string} propID - the ID of the component
      */
      draw: function() {
        this.drawd3(this.dataModel, this.dataModel2, this.metric, this.metric2, "#" + this.propID);
      },
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        this.propWidth = window.innerWidth - 30;
        this.dataModel.length !== 0 ? this.draw() : null;
      }
    }
  };
</script>
<style>

  .axis-two-plot {
    font-size: 14px;
  }

  .metric-label-two-plot {
    font-size: 16px;
    padding-left: 10px;
  }

  .twoplotline {
    stroke-width: 3px;
    fill:none;
  }

</style>
