<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  import $ from 'jquery'
  import * as d3 from 'd3';
  import moment from 'moment'
  import formatTimeMixin from '@/mixins/formatTimeMixin.js'
  import { ResizeObserver } from 'vue-resize'
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Difference Chart D3 component
  * @module Difference Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} metric - y-axis label
  * @param {string} dateFormat - 'YYYY-MM-DD'
  * @param {Array} keys - overwrite what the displayed labels will be for the data, instead of expected and actual
  *
  * @example
  * usage on a page:
  * <difference-chart
  *   :dataModel="differenceChartData"
  *   propID="container-differencechart"
  *   metric="Volume"
  *   dateFormat="YYYY-DD-MM"
  * ></difference-chart>
  *
  */

  export default {
    name: 'D3DifferenceChart',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    mixins: [formatTimeMixin],
    props: {

      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Object} dataModel
       * @property {string} date - 'date string' (ex. '2017-01-01')
       * @property {Number} expected - expected value number
       * @property {Number} actual - actual value number
       */

      dataModel: {
        type: Array,
        default: () => {return [{"date": "2017-1-1", "expected": 100, "actual": 50}]}
      },
      propID: {
        type: String,
        default: 'container-differencechart'
      },
      metric: {
        type: String
      },
      dateFormat: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      keys: {
        type: Array,
        default: ()=> (["expected", "actual"])
      },
      title: {
        type: String
      }
    },
    data: function(){
      return {
        internalData: []
      }
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData) {
          this.internalData = data
          this.internalData.length !== 0 ? this.draw(data) : null;
        }
      }
    },
    mounted() {
      this.dataModel.length !== 0 ? this.draw(this.dataModel) : null;
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
			* @function draw - function that draws the graphic
			*/
      draw: function(allData) {
        let localThis = this;
        
        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);
        // copy the data array so that we do not mutate the original data (ex. change data value to date object)
        var data = [];
        allData.forEach(el => data.push(Object.assign({}, el)))

        var margin = {top: 20, right: 20, bottom: 40, left: 50},
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

        // var parseDate = d3.timeParse(this.d3Time[this.dateFormat])
        const formatDate = d3.timeParse(this.d3Time[this.dateFormat]);

  			if (typeof data[0].date == 'string') {
  				data = data.map(function(d) {
  					d.date = formatDate(d.date);
            return d
  				});
  			}

        data.sort(function(a,b) {
          return a.date - b.date
        })

        // console.log(data)

        var x = d3.scaleTime()
            .range([0, width]);

            // console.log(data)

            var ticks = data.slice().map(function (d) {
              return d.date;
            })
            // console.log(ticks)

            if (ticks.length > 365) {
              ticks = ticks.filter(function(t, i) { return i % 120 === 0; })
            } else if(ticks.length > 60){
              ticks = ticks.filter(function(t, i) { return i % 25 === 0; })
            } else if(ticks.length > 31){
              ticks = ticks.filter(function(t, i) { return i % 15 === 0; })
            } else {
              ticks = ticks.filter(function(t, i) { return i % 5 === 0; })
            }

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom()
            .scale(x)
            .tickValues(ticks)
            .tickFormat(d3.timeFormat(this.d3Time[this.dateFormat]))

        var yAxis = d3.axisLeft()
            .scale(y)




        // create main line
        var line = d3.area()
            .curve(d3.curveCardinal)
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d[localThis.keys[1]]); });

        // create area between lines
        var area = d3.area()
            .curve(d3.curveCardinal)
            .x(function(d) { return x(d.date); })
            .y1(function(d) { return y(d[localThis.keys[1]]); });


        var tooltip = d3.select("body")
  				.append("div")
  				.attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
  				.style("opacity", 0);

        var svg = d3.select(selection_string).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // format date


        x.domain(d3.extent(data, function(d) { return d.date; }));

        // find min and max values for y axis
        y.domain([
          d3.min(data, function(d) { return Math.min(d[localThis.keys[1]], d[localThis.keys[0]]); }),
          d3.max(data, function(d) { return Math.max(d[localThis.keys[1]], d[localThis.keys[0]]); })
        ]);

        svg.datum(data);

        // clip path below the 'actual' line
        // green color
        svg.append("clipPath")
            .attr("id", "clip-below")
          .append("path")
            .attr("d", area.y0(height));

        // clip path above the 'actual' line
        // red color
        svg.append("clipPath")
            .attr("id", "clip-above")
          .append("path")
            .attr("d", area.y0(0));

        svg.append("path")
            .attr("class", 'area above')
            .attr("clip-path", "url(#clip-above)")
            .attr("d", area.y0(function(d) { return y(d[localThis.keys[0]]); }))


        svg.append("path")
            .attr("class", 'area below')
            .attr("clip-path", "url(#clip-below)")
            .attr("d", area)

        svg.append("path")
            .attr("class", "difference-line")
            .attr("d", line);

        svg.append("g")
            .attr("class", "x axis x-axis-label")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis y-axis-label")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("class", "difference-chart-metric")
            .text(this.metric);

        svg
          .selectAll(".dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("r", 5)
          .attr("cx", function(d){return x(d.date)})
          .attr("cy", function(d){return y(d[localThis.keys[1]])})
          .attr("opacity", 1)
          .on("mouseover", function(d) {
            tooltip.transition()
              .duration(100)
              .style("opacity", 1);
            tooltip
              .html(
                'Date: ' + moment(d.date).format('MMMM Do YYYY') + '<br/>' + localThis.keys[0] + ': ' + d[localThis.keys[0]] + '<br/>' + localThis.keys[1] + ': ' + d[localThis.keys[1]]
              )
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + "px");
              d3
                .select(this)
                .transition()
                .duration(50)
                .style("fill", 'steelblue')
                .attr("opacity", 1);

            localThis.$emit('jsc_mouseover', d);
          })
          .on("mouseout", function(d) {
            tooltip.transition()
              .duration(300)
              .style("opacity", 0);
              d3
                .select(this)
                .transition()
                .duration(50)
                .style("fill", 'black');
          })
          .on("click", function (d) {
            localThis.$emit('jsc_click', d);
          });
      },
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        this.dataModel.length !== 0 ? this.draw(this.dataModel) : null;
      }
    },
  }
</script>

<style>

  .area.above {
  fill: var(--eighth);
  }

  .area.below {
  fill: var(--sixth);
  }

  .difference-chart-metric {
    font-size: 16px;
  }

  .x-axis-label {
    font-size: 14px;
  }

  .y-axis-label {
    font-size: 14px;
  }

  .difference-line {
    stroke-width: 3px;
    stroke: var(--fifth);
  }

</style>
