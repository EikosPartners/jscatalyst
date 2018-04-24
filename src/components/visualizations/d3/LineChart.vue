<template>
    <div style="width:100%; height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" style="height:100%;" />
    </div>
</template>
<script>
  import * as d3 from 'd3';
  import $ from 'jquery'
  import { ResizeObserver } from 'vue-resize';
  import formatTimeMixin from '@/mixins/formatTimeMixin.js';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  /** Line Chart D3 component
  * @module Line Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} dateFormat - default: 'YYYY-MM-DD'
  * @param {string} alertText - name of the data being displayed ('Incident', etc.)
  *
  * @example
  * usage on a page:
  * <line-chart
  *   :dataModel="lineChartData"
  *   propID="container-linechart"
  *   dateFormat='YYYY-MM-DD'
  * ></line-chart>
  *
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
       * @property {string} date - date string on x-axis
       * @property {string} value - y-axis value
       */
      dataModel: {
          type: Array,
          default: ()=>{return[{"date": "2017-11-30","value": 2}]}
      },
      propID: {
          type: String,
          default: "container-linechart"
      },
      dateFormat: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      alertText: {
        type: String,
        default: "Incidents Volume",
      },
      title: {
        type: String
      }
    },
    data: function() {
          return {
              internalData: []
          }
      },
    watch: {
          dataModel: function(data) {
              if (this.internalData !== data) {
          this.internalData = data
                this.draw();
              }
          }
      },
    mounted: function() {
         this.draw()
      },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
      methods: {
      /**
      * @function drawd3 - function that draws the line chart -
      * called in mounted
      * @param {Array} dataArray
            * the dataModel
            * @param {string} selection_string
            * the div where the svg is to be mounted
      */
          drawd3: function(dataArray, selection_string) {
              if ( dataArray === undefined ) return;
              if ( dataArray.length === 0 ) return;

              d3.selectAll(`.${this.propID}_tooltip`).remove()
              if ($(selection_string + ' svg') != null) {
                  $(selection_string + ' svg').remove();
              }
              // make copy of dataArray so we do not mutate the original data
              var data = [];
              dataArray.forEach(el => data.push(Object.assign({}, el)))

              const formatDate = d3.timeParse(this.d3Time[this.dateFormat]);
              if (typeof data[0].date == 'string') {
                  data = data.map(function(d) {
                      d.date = formatDate(d.date);
                      return d;
                  });
              }

              data.sort(function(x, y) {
                  return d3.ascending(x.date, y.date);
              });
              const element = $(selection_string)
              var margin = { top: 20, right: 20, bottom: 30, left: 50 };
              var width = element.width() - margin.left - margin.right;
              var height = element.height() - margin.top - margin.bottom;
              var xValue = function(d) { return d.date; };
              var xScale = d3.scaleTime().range([0, width]);
              var xMap = function(d) { return xScale(xValue(d)); };
              var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickSizeInner(-height)
                  .tickSizeOuter(0)
                  .ticks(6);
              xAxis.tickFormat(d3.timeFormat("%b %d, %Y"));
              var yValue = function(d) { return d.value; };
              var yScale = d3.scaleLinear().range([height, 0]);
              var yMap = function(d) { return yScale(yValue(d)); };
              var yAxis = d3.axisLeft()
                  .scale(yScale)
                  .tickSizeInner(-width)
                  .tickSizeOuter(0)
                  .ticks(4);
              xScale.domain(d3.extent(data, xValue));
              yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
              var clip_orig_x = 0
              var clip_orig_y = 0
              var line = d3.line()
                  .x(xMap)
                  .y(yMap);
              var area = d3.area()
                  .x(xMap)
                  .y0(height)
                  .y1(yMap);
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
              let component = this
              var clip_id = "clip-" + selection_string;
              var clip = svg.append("clipPath")
                  .attr("id", clip_id)
                  .append("rect")
                  .attr("x", clip_orig_x)
                  .attr("y", clip_orig_y)
                  .attr("width", width)
                  .attr("height", height);
              svg.append("g")
                  .attr("class", "x axis xaxis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);
              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text(component.alertText);
              svg.append("path")
                  .datum(data)
                  .attr("class", "area")
                  .attr("d", area)
                  .attr("clip-path", "url(#" + clip_id + ")")
                  .attr("opacity", 0.5)
              svg.append("path")
                  .datum(data)
                  .attr("class", "line")
          .attr("fill", "none")
                  .attr("clip-path", "url(#" + clip_id + ")")
                  .attr("d", line);
              svg.selectAll(".dot")
                  .data(data)
                  .enter().append("circle")
                  .attr("class", "dot")
                  .attr("r", 5)
                  .attr("cx", xMap)
                  .attr("cy", yMap)
                  .attr("clip-path", "url(#" + clip_id + ")")
                  .attr("fill", "steelblue")
                  .attr("opacity", 0)
              var dot_mtd,
                  vertical_bar,
                  bisectDate = d3.bisector(function(d) { return d.date; }).left; // check if elements are ordered
              svg.on("mousemove", function() {
                  if (dot_mtd) {
                      dot_mtd.remove();
                      vertical_bar.remove();
                  }
                  var x = d3.mouse(this)[0],
                      x0 = xScale.invert(x),
                      i = bisectDate(data, x0, 1),
                      d = data[i];
                  vertical_bar = svg.append("rect")
                      .attr("x", xMap(d))
                      .attr("y", 0)
                      .attr("height", height)
                      .attr("fill", "#555")
                      .attr("width", 1);
                  dot_mtd = svg.append("circle")
                      .attr("class", "dot")
                      .attr("r", 5)
                      .attr("cx", xMap(d))
                      .attr("cy", yMap(d))
                      .attr("fill", "blue");
                  var formattedDate = xValue(d).toString().split(" ").slice(0, 4).join(" ")
                  tooltip.html("Date: " + "<b>" + formattedDate + "</b>" + "<br>" + component.alertText + ": <b>" + yValue(d) + "</b>")
                      .style("left", (d3.event.pageX + 5) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  tooltip.transition()
                      .duration(100)
                      .style("opacity", 1);
              }).on("mouseout", function() {
                  if (dot_mtd) {
                      dot_mtd.remove();
                      vertical_bar.remove();
                      tooltip.transition()
                          .duration(500)
                          .style("opacity", 0);
                  }
              });
          },
          draw: function() {
              this.drawd3(this.dataModel, '#' + this._props.propID)
          },
      /**
            * @function resizeSVG - redraws the SVG on window resize
            */
          resizeSVG: function() {
              this.draw()
          }
      }
  }
</script>
<style>
  .area {
    fill: var(--fourth)
  }
  #container-linechart .line {
    stroke: var(--fifth)
  }
  .bar {
      fill: steelblue;
  }

</style>
