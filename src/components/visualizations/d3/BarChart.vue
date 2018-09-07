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

  /** Bar Chart D3 component
  * @module Bar chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} xaxisvalue - label for x-axis, optional
  * @param {string} yaxisvalue - label for y-axis, optional
  * @param {Number} xAxisAngle - the angle at which to rotate the x-axis labels
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
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} date - date string on x-axis ("5/15 - 6/14")
     * @property {Number} value - y-axis value
     */
    dataModel: {
      type: Array,
      default: ()=>{return []}
    },
    xaxisLabel: {
      type: String,
      default: ""
    },
    yaxisLabel: {
      type: String,
      default: ""
    },
    propID: {
      type: String,
      default: "container-barchart"
    },
    title: {
      type: String
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
      yaxisvalue = this._props.yaxisLabel,
      xaxisvalue = this._props.xaxisLabel,
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
        var margin = { top: 20, right: 30, bottom: 40, left: 40 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

        var x = d3.scaleBand()
          .range([0, width])
          .paddingInner(.2)
          .paddingOuter(.2);

        var y = d3.scaleLinear()
          .range([height, 0]);

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
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width / 2 + margin.right)
          .attr("y", 30)
          .style("text-anchor", "end")
          .text(xaxisvalue);
        
        let text = chart.selectAll("text");

        if (this.xAxisAngle != 0) {
            text
                .attr("transform", `rotate(${this.xAxisAngle})`)
                .style("text-anchor", "middle")
                .attr("y", 45);
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
              return height - y(d.y);
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
              localThis.$emit('jsc_click', d);
            });
        }
    }
  }
};
</script>

<style>
</style>
