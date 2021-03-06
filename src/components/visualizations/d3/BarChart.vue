<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" style="width:100%;height:100%"/>
    </div>
</template>

<script>
  import * as d3 from "d3";
  import $ from "jquery";
  import Vue from 'vue';
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import basePropsMixin from '@/mixins/basePropsMixin.js';

  /** Bar Chart D3 component
  * @module Bar chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} xaxisvalue - label for x-axis, optional
  * @param {string} yaxisvalue - label for y-axis, optional
  * @param {string} title - The title of the chart
  * @param {Number} xAxisAngle - the angle at which to rotate the x-axis labels, either 45 or 90 degrees
  *
  *
  * The data for this component can be customized; it currently contains:
  * @typedef {Array} dataModel
  * @property {string} date - date string on x-axis ("5/15 - 6/14")
  * @property {Number} value - y-axis value
  *
  * @example
  * usage on a page:
  * <bar-chart
  * :dataModel='barChartData'
  * propID='exampleBarChart'
  * :xaxisLabel='time'
  * :yaxisLabel='distance'
  * ></bar-chart>
  *
  */

export default {
  name: 'D3BarChart',
  components: {
    'resize-observer': ResizeObserver,
    'panel-heading': PanelHeading
  },
  mixins: [basePropsMixin],
  props: {
    propID: {
      type: String,
      default: "container-barchart"
    },
    xAxisAngle: {
        type: Number,
        default: 0
    }
  },
  data: function() {
    return {
      update: false,
      internalData: []
    };
  },
  mounted: function() {
    this.drawBarPlot(
      this._props.dataModel,
      this._props.propID,
      this._props.yaxisLabel,
      this._props.xaxisLabel
    );
    this.update = true
  },
  watch: {
    dataModel: function(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      let localThis = this
      Vue.nextTick(()=>{
        localThis.drawBarPlot()
      })
    }
  },
  destroyed() {
    d3.selectAll(`.${this.propID}_tooltip`).remove()
  },
  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function(){
      this.drawBarPlot()
    },

    /**
    * @function drawBarPlot - function that draws the barchart
    * @param {Array} data
    * the dataModel
    * @param {string} propID
    * the ID for the visualization, optional
    * @param {string} xaxisvalue
    * label for x-axis, optional
    * @param {string} yaxisvalue
    * label for y-axis, optional
    * @param {function} mouseover_callback
    * callback for mouseover function
    */

    drawBarPlot: function(
      data = this.dataModel,
      id =  this._props.propID,
      yaxisvalue = this._props.yAxisLabel,
      xaxisvalue = this._props.xAxisLabel,
      mouseover_callback = function(x) {
        return x;
      }
    ) {
        let localThis = this;
        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + id;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);
        var margin = { top: 20, right: 30, bottom: 15, left: 40 };
        if (this.xAxisAngle > 0) {
          margin.bottom += (this.xAxisAngle / 2)
        }
        let width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

        // If there is a title, account for the height of the panel heading.
        // Height can be found in the PanelHeading.vue file
        if (this.title) {
          height -= 40;
        }

        var x = d3.scaleBand()
          .range([0, width])
          .paddingInner(.2)
          .paddingOuter(.2);

        var y = d3.scaleLinear()
          .range([height - margin.bottom, 0]);

        var xAxis = d3.axisBottom()
          .scale(x)
          .tickSizeOuter(0);

        var yAxis = d3.axisLeft()
          .scale(y)
          .tickSizeInner(-width)
          .tickSizeOuter(0);

        var tooltip = d3
          .select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        var chart = d3
          .select(selection_string)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if (data.length > 0) {
          y.domain([
            0,
            d3.max(data, function(d) {
              return d.y;
            })
          ]);
          x.domain(
            data.map(function(d) {
              return d.x;
            })
          );
        }

        chart
          .append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," +  (height - margin. bottom) + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width / 2 + margin.right)
          .attr("y", 30)
          .style("text-anchor", "middle")
          .text(xaxisvalue);

        let text = chart.selectAll("text");

        if (this.xAxisAngle > 0) {
            text
                .attr("transform", `rotate(${this.xAxisAngle}) translate(0, ${margin.top})`)
                .style("text-anchor", "middle")

            let dimensions = text.node().getBBox();

            if (this.xAxisAngle === 45) {
              text.attr("x", 15)
                  .attr("y", dimensions.height * 2);
            }

            if (this.xAxisAngle === 90) {
              text.attr("x", dimensions.width - 10)
                  .attr("y", 0);
            }

        }


        chart
          .append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(yaxisvalue);

        if (data.length > 0) {
          chart
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
              return x(d.x);
            })
            .attr("y", function(d) {
              return y(d.y);
            })
            .attr("height", function(d) {
              return height - y(d.y) - margin.bottom;
            })
            .attr("width", x.bandwidth()-x.paddingInner())
            .style("fill", "var(--fifth)")
            .on("mouseover", function(d) {
              localThis.$emit('jsc_mouseover', d);
              var yval = mouseover_callback(d.y);
              tooltip
                .transition()
                .duration(100)
                .style("opacity", 1);
              tooltip
                .html(
                  xaxisvalue +
                    ": <b>" +
                    d.x + "</b><br>" +
                  yaxisvalue +
                    ": <b>" +
                    yval + "</b>"
                )
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px");
              d3
                .select(this)
                .transition()
                .duration(50)
                .style("fill", "var(--fourth)");
            })
            .on("mouseout", function(d) {
              d3
                .select(this)
                .transition()
                .duration(100)
                .style("fill", "var(--fifth)");
              tooltip
                .transition()
                .duration(300)
                .style("opacity", 0);
            }).
            on("click", function (d) {
              localThis.$emit('jsc_click', {data: d, event: d3.event});
            });
        }

        // Emit ready event.
				this.$emit('ready');
    }
  }
};
</script>

<style>
</style>
