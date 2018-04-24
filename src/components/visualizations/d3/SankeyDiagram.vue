<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  var d3Sankey = require('d3-sankey');
  import $ from 'jquery';
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Sankey Diagram D3 component
  * @module Sankey Diagram
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <sankey
  *   :dataModel="sankeyData"
  *   propID="container-sankey"
  * ></sankey>
  */

  export default {
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Object} dataModel
       * @property {Array} links - objects containg a source(string), target(string), value(string)
       */
      dataModel: {
        type: Object,
        default: () => ({})
      },
      propID: {
        type: String,
        default: 'container-sankey'
      },
      title: {
        type: String
      }
    },
    mounted() {
      this.draw()
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
      * @function draw - function that draws the graphic
      */
      draw: function() {

        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);
        var margin = { top: 20, right: 30, bottom: 60, left: 50 },
            width = element.width() - margin.left - margin.right,
            height = element.height() - margin.top - margin.bottom;

        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var format = function(d) { return formatNumber(d) + " units"; }
        var formatNumber = d3.format(",.0f")

        var svg = d3.select(selection_string).append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = this.dataModel

        var sankeyGraph = d3Sankey.sankey()
          .nodes(function() {
            return data.nodes
          })
          .links(function() {
            return data.links
          })
          .nodeId(function(d){
            return d.name
          })
          .size([width,height]);
        sankeyGraph()

      // add in the links
        var link = svg.append("g").selectAll(".link")
            .data(data.links)
          .enter().append("path")
            .attr("class", "sankey-link")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .style("stroke-width", function(d) { return Math.max(1, +d.width); })
            .sort(function(a, b) { return b.y1 - a.y1; });

        var tooltip = d3.select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);
        link.on('mouseover', function(d) {
            tooltip.transition()
                .duration(100)
            .style("opacity", 1);
                  tooltip.html(d.source.name + " → " +
                          d.target.name + "\n" + format(d.value))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
              })
          .on("mouseout", function(d) {
              tooltip.transition()
                  .duration(300)
                  .style("opacity", 0);
          });


      // add in the nodes
        var node = svg.append("g").selectAll(".node")
            .data(data.nodes)
          .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
      		      return "translate(" + d.x0 + "," + d.y0 + ")";
            })
          // .call(d3.drag()
          //   // .origin(function(d) { return d; })
          //   .on("start", function() {
      		//   this.parentNode.appendChild(this); })
          //   .on("end", dragmove));

      // add the rectangles for the nodes
        node.append("rect")
            .attr("height", function(d) { return d.y1 -d.y0; })
            .attr("width", sankeyGraph.nodeWidth())
            .style("fill", function(d) {
      		  return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function(d) {
      		  return d3.rgb(d.color).darker(2); })
          .append("title")
            .text(function(d) {
      		  return d.name + "\n" + format(d.value); });

      // add in the title for the nodes
        node.append("text")
            .attr("x", -6)
            .attr("y", function(d) { return (d.y1-d.y0) / 2; })
            .attr("dy", ".5em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) { return d.name; })
          .filter(function(d) { return d.x0 < width / 2; })
            .attr("x", 6 + sankeyGraph.nodeWidth())
            .attr("text-anchor", "start");

        //
        // function dragmove(d) {
        //   d3.select(this).attr("transform",
        //       "translate(" + (
        //       	   d.x0 = Math.max(0, Math.min(width - d.x0, d3.event.x))
        //       	) + "," + (
        //                  d.y0 = Math.max(0, Math.min(height - d.y0, d3.event.y))
        //           ) + ")");
        //   sankeyGraph.update();
        //   link.attr("d", path);
        // }
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
.node rect {
  cursor: move;
  fill-opacity: .9;
  shape-rendering: crispEdges;
}

.node text {
  pointer-events: none;
  text-shadow: 0 1px 0 #fff;
}

.sankey-link {
  fill: none;
  stroke: grey;
  stroke-opacity: .2;
}

.sankey-link:hover {
  stroke-opacity: .5;
}

</style>
