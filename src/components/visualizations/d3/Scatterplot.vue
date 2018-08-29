<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" style="width:100%;height:100%" class="scatterplot"/>
    </div>
</template>

<script>

  import * as d3 from 'd3';
  import $ from "jquery";
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Scatterplot D3 component
  * @module Scatterplot
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <scatterplot
  *   :dataModel="scatterplotData"
  *   propID="scatterplot"
  * ></scatterplot>
  *
  */

  export default {
    name: 'D3ScatterPlot',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {string} Value1 - description
       * @property {string} Value2 - description
       * @property {Number} x - x-axis value
       * @property {Number} y - y-axis value
       */
      dataModel: {
        type: Array,
        default: ()=>{return []}
      },
      propID: {
    		 type: String,
    		 default: 'scatterplot'
  	  },
      title: {
        type: String
      }
    },
    data: function() {
        return {
  		      name: "Scatterplot",
            update: false,
            internalData : [],
        }
    },
  	watch: {
  		dataModel: function(data) {
  			// console.log('BarChart dataModel changed')
  			if (this.internalData.length === 0) {
  				this.update = false
  			} else {
  				this.update = true
  			}
  			this.internalData = data
  			this.drawScatterplot(data, this.propID)
  		}
  	},
    mounted: function() {
  		this.drawScatterplot(
        this._props.dataModel,
        this._props.propID
      )
  	},
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function(){
        this.drawScatterplot()
      },
      /**
      * @function drawScatterplot - function that draws the graphic
      * @param {Array} data
      * the dataModel
      * @param {string} propID - ID of the component
      */
      drawScatterplot: function (
        data = this._props.dataModel,
        id = this._props.propID
      ) {
        let localThis = this;
        let selection_string = "#" + id;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }
        d3.selectAll(`.${this.propID}_tooltip`).remove()

        var element = $(selection_string);

        //set margins
        //leave room in right margin for legend
        var margin = {top: 20, right: 60, bottom: 30, left: 40},
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

        //make tooltips
        var tooltip = d3.select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        // setup x
        var xValue = function(d) { return d.x;}, // data -> value
          xScale = d3.scaleLinear().range([0, width]), // value -> display
          xMap = function(d) { return xScale(xValue(d));}, // data -> display
          xAxis = d3.axisBottom().scale(xScale);

        // setup y
        var yValue = function(d) { return d.y;}, // data -> value
          yScale = d3.scaleLinear().range([height, 0]), // value -> display
          yMap = function(d) { return yScale(yValue(d));}, // data -> display
          yAxis = d3.axisLeft().scale(yScale);

        // setup fill color
        var cValue = function(d) { return d.Value2;},
          color = d3.scaleOrdinal(d3.schemeCategory10);

        // add the graph canvas to the body of the webpage
        var svg = d3.select(selection_string).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
        yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("x-axis label");

        // y-axis
         svg.append("g")
             .attr("class", "y axis")
             .call(yAxis)
           .append("text")
             .attr("class", "label")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text("y-axis label");

          // draw dots
         svg.selectAll(".dot")
             .data(data)
           .enter().append("circle")
             .attr("class", "dot")
             .attr("r", 3.5)
             .attr("cx", xMap)
             .attr("cy", yMap)
             .style("fill", function(d) { return color(cValue(d));})

            //tooltips
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(100)
            .style("opacity", 1);
                tooltip.html(d.Value1 + "<br/> (" + xValue(d)
              + ", " + yValue(d) + ")")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

            localThis.$emit('jsc_mouseover', d);
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                  .duration(300)
                  .style("opacity", 0);
          })
          .on("click", function (d) {
            localThis.$emit('jsc_click', d);
          });

          // draw legend
         var legend = svg.selectAll(".legend")
           .data(color.domain())
           .enter()
           .append("g")
             .attr("class", "legend")
             .attr("transform", function(d, i) { return "translate(30," + 25 * i + ")"; });

         // draw legend colored rectangles
         legend.append("rect")
             .attr("x", width - 20)
             .attr("width", 20)
             .attr("height", 20)
             .style("fill", color);

          //append legend text using Value2
         legend.append("text")
           .attr("x", width + 5)
           .attr("y", 9)
           .attr("dy", ".35em")
           .style("text-anchor", "start")
           .text(function(d) {
             return d;
           });

        }
      }
    }
</script>

<style>

  .legend {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 60%;
  }

</style>
