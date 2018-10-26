<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" style="width:100%;height:100%" class="forcedirected"/>
    </div>
</template>

<script>

  import * as d3 from 'd3';
  import $ from "jquery";
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Force Directed Graph D3 component
  * @module Force Directed Graph
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <forcedirected-graph
  *   :dataModel="forceDirectedGraphData"
  *   propID="container-forcedirectedgraph"
  * ></forcedirected-graph>
  *
  */

export default {
  name: 'D3ForceGraph',
  components: {
    'resize-observer': ResizeObserver,
    'panel-heading': PanelHeading
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Object} dataModel
     * @property {Array} nodes - array of objects noting id(string) and group(string)
     */
    dataModel: {
      type: Object,
      default: ()=>{return {}}
    },
    propID: {
  		 type: String,
  		 default: 'forcedirected'
	  },
    title: {
      type: String
    }
  },
  data: function() {
      return {
		      name: "ForceDirected",
          update: false,
          internalData : []
      }
  },
  watch: {
		dataModel: function(data) {
			if (this.internalData.length === 0) {
				this.update = false
			} else {
				this.update = true
			}
			this.internalData = data
			this.drawForceDirected(data, this.propID)
		}
	},
	mounted: function() {
		this.drawForceDirected(
      this._props.dataModel,
      this._props.propID
    )
	},
  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function(){
      this.drawForceDirected()
    },

    /**
    * @function drawForceDirectedGraph - function that draws the graph
    * @param {Array} data
    * the dataModel
    * @param {string} propID
    * the ID for the visualization, optional
    */

    drawForceDirected: function (
      data = this._props.dataModel,
      id = this._props.propID
    ) {
        let localThis = this;
        let selection_string = "#" + id;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);
        var width = element.width(),
        height = element.height();

        // Account for the panel heading height if the title exists.
        if (this.title) {
          height -= 40;
        }

        var svg = d3.select(".forcedirected").append("svg")
        .attr("width", width)
        .attr("height", height)

        var color = d3.scaleOrdinal(d3.schemePaired);

        var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

        var link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(data.links)
          .enter().append("line")
          .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

        var tooltip = d3.select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        var node = svg.append("g")
            .attr("class", "nodes")
          .selectAll("circle")
          .data(data.nodes)
          .enter().append("circle")
            .attr("r", 8)
            .attr("fill", function(d) { return color(d.group); })
            .on('click', function (d) {
              localThis.$emit('jsc_click', {data: d, event: d3.event});
            })
            .on('mouseover', function (d) {
              tooltip.transition()
                .duration(100)
                .style("opacity", 1);

              tooltip
                .html(`ID: ${d.id} <br/> Group: ${d.group} <br/> Index: ${d.index}`)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")

              localThis.$emit('jsc_mouseover', d);
            })
            .on('mouseout', function (d) {
              tooltip
                .transition()
                .duration(300)
                .style("opacity", 0);
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

            node.append("title")
                .text(function(d) { return d.id; });

            simulation
                .nodes(data.nodes)
                .on("tick", ticked);

          simulation.force("link")
              .links(data.links);

          function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
          }


        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        // Emit ready event.
				this.$emit('ready');
      }

    }
  }

</script>

<style>

  .links line {
    stroke: #999;
    stroke-opacity: 0.6;
  }

  .nodes circle {
    stroke: #fff;
    stroke-width: 1.5px;
  }

</style>
