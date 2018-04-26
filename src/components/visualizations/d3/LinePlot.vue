<template>
    <div style="height:100%; width:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" style="height:100%; width:100%" />
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  import moment from "moment";
  import { ResizeObserver } from 'vue-resize';
  import formatTimeMixin from '@/mixins/formatTimeMixin.js';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Line Plot D3 component
  * @module Line Plot
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} metric - what you are measuring
  * @param {string} color - color of the chart
  * @param {string} dateFormat - default: 'YYYY-MM-DD'
  *
  * @example
  * usage on a page:
  * <line-plot
  *   :dataModel='linePlotData'
  *   propID='line-plot1'
  *   metric='Ticket Volume'
  *   dateFormat='YYYY-MM-DD'
  * ></line-plot>
  */

  export default {
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    mixins: [formatTimeMixin],
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {string} date - 'YYYY-MM-DD'
       * @property {string} value - the value at that date
       */
      dataModel: {
        type: Array,
        default: ()=>{return [{"id": 2922, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-06-01", "value": 120, "period": 604800, "time": null, "object_type": 9}]}
      },
      propID: {
        type: String,
        default: "lineplot"
      },
      metric: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "black"
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
      }
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData) {
          this.internalData = data
          this.internalData.length !== 0 ? this.draw() : null
        }
      }
    },
    mounted: function() {
      this.dataModel.length === 0 ? null : this.draw()
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
      * @function drawd3 - function that draws the graphic
      * @param {Array} dataArray
      * the dataModel
      * @param {string} metric - what you are measuring
      * @param {string} selection_string - the id of the div where the svg will be mounted
      * @param {string} color - color of the chart
      */
      drawd3: function(dataArray, metric, selection_string, color) {
        d3.selectAll(`.${this.propID}_tooltip`).remove()
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }
        // make copy of the original data so we do not mutate it
        var data = [];
        dataArray.forEach(el => data.push(Object.assign({}, el)))

        var localThis = this;
        const formatDate = d3.timeParse(this.d3Time[this.dateFormat]);

        if (typeof data[0].date == 'string') {
          data.forEach(function(d) {
            d.date = formatDate(d.date);
          });
        }

        data.sort(function(a,b) {
          return a.date - b.date
        })

        var detected_percent =
          d3.max(data, function(d) {
            return d.value;
          }) <= 1
            ? true
            : false;
        let element = $(selection_string);

        var margin = { top: 20, right: 30, bottom: 30, left: 40 },
          width = $(element).width() - margin.left - margin.right,
          height = $(element).height() - margin.top - margin.bottom;

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
        var format_attribute;
        if (detected_percent) {
          format_attribute = d3.format("%");
        } else {
          format_attribute = d3.format("");
        }

        let yValue = function(d) {
            return d.value;
          },
          yScale = d3.scaleLinear().range([height, 0]),
          yMap = function(d) {
            return yScale(yValue(d));
          };

        xScale.domain(d3.extent(data, xValue));
        yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);

        let yAxis = d3.axisLeft()
          .scale(yScale)
          .tickSizeInner(-width)
          .ticks(4)
          .tickFormat(format_attribute);

        let line = d3.line()
          .x(xMap)
          .y(yMap);

        var svg = d3
          .select(selection_string)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tooltip = d3
          .select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        svg.style("fill", "transparent")
        svg
          .append("g")
          .attr("class", "x axis xaxis axis-line-plot1")
          .attr("transform", "translate(0," + height + ")")
          .style('fill', 'black')
          .style("font-size", "14px")
          .call(xAxis);

        svg
          .append("g")
          .attr("class", "y axis axis-line-plot")
          .style("fill", "black")
          .call(yAxis)
          .append("foreignObject")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("x", -height)
          .attr("width", height)
          .attr("dy", ".71em")
          .html(
            "<div class=metric-label>" +
              metric +
              "</div>"
          );

        var clip_id = "clip-" + this._props.propID;

        svg
          .append("clipPath")
          .attr("id", clip_id)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width > 0 ? width : 0)
          .attr("height", height > 0 ? height : 0);

        svg
          .append("rect")
          .attr("class", "pane")
          .attr("width", element.width())
          .attr("height", height)
          .attr("clip-path", "url(#" + clip_id + ")")

        svg
          .append("path")
          .datum(data)
          .attr("class", "line lineplotline")
          .attr("d", line)
          .attr("clip-path", "url(#" + clip_id + ")")
          .attr("stroke", color);

        svg
          .selectAll(".dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("r", 5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .attr("clip-path", "url(#" + clip_id + ")")
          .attr("fill", "black")
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
              .style("fill", "black")
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

      draw: function() {
          this.drawd3(
            this.dataModel,
            this.metric,
            "#" + this.propID,
            this.color
          )
      },
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        this.dataModel.length === 0 ? null : this.draw()
      }
    }
  };
</script>

<style>

  .dot, .rect, svg, rect.pane {
    cursor: default !important;
  }

  rect.pane, .rect {
    pointer-events: none !important;
  }

  .dot {
    pointer-events: all !important;
  }

  .axis-line-plot {
    font-size: 14px;
  }

  .metric-label {
    padding-left: 10px;
    font-size: 16px;
  }

  .lineplotline {
    stroke-width: 3px;
    stroke: var(--sixth);
  }

</style>
