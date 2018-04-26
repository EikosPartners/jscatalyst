<template>
    <div style="width:100%; height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" class="liceChart" style="height:100%"/>
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from 'jquery';
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Sunburst D3 component
  * @module Sunburst
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <sunburst
  *   v-on:click="clicked"
  *   :dataModel="flareData"
  *   propID="sunburst"
  * ></sunburst>
  *
  */

  export default {
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {string} name
       * @property {Array} children - array of objects consisting of names and values.
       */
      dataModel: {
        type: Array
      },
			propID: {
				type: String,
				default: 'sunburst'
			},
      title: {
        type: String
      }
    },
    watch: {
    	dataModel: function(data) {
    		this.draw()
    	},
    },
    mounted: function(){
     	this.draw()
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
      * @function draw - function that draws the graphic
      */
  		draw: function(){

        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);

  			var	width = element.width()
  			var	height = element.height()

  			if ( height === undefined || height === 0 ) height = width/4

  			var radius = Math.min(width, height) / 2;
  			var color = d3.scaleOrdinal(d3.schemePaired);

        var formatNumber = d3.format(",d");

        var x = d3.scaleLinear()
            .range([0, 2 * Math.PI]);

        var y = d3.scaleSqrt()
            .range([0, radius]);

        var partition = d3.partition();

        var arc = d3.arc()
            .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
            .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
            .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
            .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


        var svg = d3.select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);

        var root = d3.hierarchy(this.dataModel[0])
        root.sum(function(d) { return d.size })
        var nodes = partition(root).descendants()

        svg.selectAll("path")
            .data(nodes)
          .enter().append("path")
            .attr("d", arc)
            .attr('class', 'segment')
            .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
            .on("click", click)
            .on("mouseover", function(d) {
              tooltip.transition()
                .duration(100)
                .style("opacity", 1);
              tooltip
                .html(
                   "Name: " + d.data.name + "<br/>" +  (d.data.size ? "Value: " + d.data.size : "")
                )
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px");
            })
            .on("mouseout", function(d) {
              tooltip.transition()
                .duration(300)
                .style("opacity", 0);
            })
          .append("title")
            .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });



        function click(d) {
          svg.transition()
              .duration(750)
              .tween("scale", function() {
                var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                    yd = d3.interpolate(y.domain(), [d.y0, 1]),
                    yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
              })
            .selectAll("path")
              .attrTween("d", function(d) { return function() { return arc(d); }; });
        }

        d3.select(self.frameElement).style("height", height + "px");


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

.segment {
  stroke: white;
  stroke-width:1;
}

</style>
