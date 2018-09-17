<template>
	<div style="width:100%;height:100%">
		<panel-heading v-if='title' :headerText='title'></panel-heading>
		<resize-observer @notify="resizeSVG"></resize-observer>
		<div :id="propID" class="bubbleChart" style="width:100%;height:100%"></div>
	</div>
</template>

<script>
	import * as d3 from 'd3';
	import $ from 'jquery'
	import * as moment from 'moment'
	import 'moment-duration-format'
	import { ResizeObserver } from 'vue-resize';
	import formatTimeMixin from '@/mixins/formatTimeMixin.js';
	import PanelHeading from '@/components/universal/PanelHeading.vue';

	/** Bubble Chart D3 component
  * @module Bubble Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} xAxisLabel - x-axis label
  * @param {string} yAxisLabel - y-axis label
  * @param {string} dateFormat - default: 'YYYY-MM-DD'
  * @param {boolean} isDate - true/false for whether x-axis will be date values
  *
  * @example
  * usage on a page:
  * <bubble-chart
  * :dataModel='bubbleChartData'
  * propID='exampleBubbleChart'
  * :xaxisLabel='time'
  * :yaxisLabel='distance'
  * ></bubble-chart>
  *
  */

export default {
	name: 'D3BubbleChart',
	components: {
    	'resize-observer': ResizeObserver,
    	'panel-heading': PanelHeading
  	},
  	mixins: [formatTimeMixin],
	props: {
		type: {
			type: String,
			default: 'category'
		},
		dataModel: {
			type: Array,
			default: () => ([{}, {}])
		},
		propID: {
			type: String,
			default: "bubble-chart"
		},
		currentCategories: {
			type: Array,
			default: ()=>{return  ["all", "all", "all"]}
		},
		xAxisLabel: {
			type: String,
			default: "Duration"
		},
		yAxisLabel: {
			type: String,
			default: "Escalation"
		},
		isTime: {
			type: Boolean,
			default: false
		},
		title: {
			type: String
		},
		dateFormat: {
			type: String,
			default: 'YYYY-MM-DD'
		},
		isDate: {
			type: Boolean,
			default: false
		}
	},
	data: function() {
		return {
			margin: { top: 20, right: 10, bottom: 30, left: 20 },
			updateGraph: false,
			internalData: [],
			moment: null,
			firstDraw: true,
			countingDots: 0,
			zooming: false
		}
	},
	computed: {
		processedData: function() {
			var data = this.dataModel;
			try {
			data.sort(function(x, y) {
				return d3.descending(x.value, y.value);
			});
			} catch (err) {
				console.log(err)
			}
			return data
		},
		themeColors() {
			return this.$store.state.themeMod.themeColors
		}
	},
	watch: {
		zooming: function(data) {
			console.log(data)
		},
		themeColors(data){
			this.drawTopPlotX(this.dataModel)
		},
		dataModel: function(data) {
			// debugger
			if ( this.internalData.length === 0) {
				this.updateGraph = false
			} else {
				this.updateGraph = true
			}
			if (this.internalData !== data) {
				// why is this called twice for each graph on initial load? HTK
				this.internalData = data
				this.drawTopPlotX(data);
			}
		}
	},
	mounted: function() {
		this.processedData ? this.drawTopPlotX(this.processedData) : null;
	},
	destroyed() {
	    d3.selectAll(`.${this.propID}_tooltip`).remove()
	},
	methods: {
		xValue: function(d) {
			return d.x;
		},
		yValue: function(d) {
			return d.y;
		},
		zValue: function(d) {
			return d.value;
		},
		/**
		* @function drawTopPlotX - function that draws the box chart
		* called in mounted
		* @param {Array} data - the data model
		*/
		drawTopPlotX: function(data) {
			if (!data){
				return
				}
			let localThis = this;
			let selection_string = "#" + this.propID;
			var pretty_duration = this.pretty_duration;
			var xValue = this.xValue;
			var yValue = this.yValue;
			var zValue = this.zValue;
			var element = $(selection_string);
			var margin = this.margin;
			var elementWidth = element.width()
			var elementHeight = element.height()
			var ternaryWidth = elementWidth > 0 ? elementWidth : 400
			var width = ternaryWidth - margin.left - margin.right
			var ternaryHeight = elementHeight > 0 ? elementHeight : 400
			var height = ternaryHeight - margin.top - margin.bottom;
			//retrieving globals
			var colors = this.themeColors

			var svg,
				category = this.currentCategories.join(' '),
				containerId = "#" + this._props.propID,
				containerIdSvg = containerId + " svg",
				containerIdG = containerIdSvg + " g";

			d3.selectAll(`.${this.propID}_tooltip`).remove()
			if ($(containerIdSvg) != null) {
				$(containerIdSvg).remove();
			}

			const formatDate = d3.timeParse(this.d3Time[this.dateFormat]);

			var xScale;

			if (this.isDate) {
				xScale = d3.scaleTime().range([0, width]);
			} else {
				xScale = d3.scaleLinear().range([0, width]);
			}

			data = data.map(function (d) {
				if (d.mapped) { return d; }
				d.x = formatDate(d.x);
				d.mapped = true;
				return d;
			});
			

			var xMap = function(d) {
					return xScale(xValue(d));
				},
				xAxis = d3.axisBottom()
					.scale(xScale)
					.tickSizeInner(-height)
					.ticks(6)
				
				if (this.isDate) {
					xAxis.tickFormat(d3.timeFormat(this.d3Time[this.dateFormat]));
				} else {
					xAxis.tickFormat(function(d) {
						return localThis.isTime ? pretty_duration(60*d) : d;
					});
				}

			var yScale = d3.scaleLinear()
					.range([height, 0]),
				yMap = function(d) {
					return yScale(yValue(d));
				},
				yAxis = d3.axisLeft()
					.scale(yScale)
					.tickSizeInner(-width)
					.ticks(4);

			var max_value_size = Math.sqrt(d3.max(data, function(d) {
				return +d.value
			}));
			var bubble_sizes = this.get_bubble_sizes(max_value_size);
			var min_bubble_size = bubble_sizes['min'];
			var max_bubble_size = bubble_sizes['max'];

			var zScale = d3.scaleLinear().domain([1, max_value_size]).range([
				min_bubble_size,
				max_bubble_size
			]),
				zMap = function(d) { return zScale(Math.sqrt(zValue(d))); }

			var cValue = function(d) {
				return d.value
			}

			var valMin = d3.min(data, zValue);
			var valMax = d3.max(data, zValue);

			debugger
			var color = d3.scaleQuantize().range(colors).domain([valMin, valMax]);

			d3.select("body")
				.append("div")
				.attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
				.style("opacity", 0);

			// var zoom = d3.zoom()
			// 	.scaleExtent(this.get_x_zoom_range(data, xValue))
			// 	// .on("zoom", null)
			// 	.on("zoom", zoomBehavior)

			// Get min and max values for x and y axis
			var xMin = d3.min(data, xValue);
			var xMax = d3.max(data, xValue);
			var yMin = d3.min(data, yValue);
			var yMax = d3.max(data, yValue);

			// Determine padding for x-axis if it's dates.
			if (this.isDate) {
				let min = xScale(xMin);
				let max = xScale(xMax);

				xMin = xScale.invert(min - (min * .001));
				xMax = xScale.invert((max * .001) + max);
			} else {
				xMin = xMin - (xMin / 2);
				xMax = xMax + (xMax / 4);
			}


			// Subtract half the min value from min and add one fourth
			// of the max to the max so that the bubbles never go outside of the graph
			xScale.domain([xMin, xMax]);
			yScale.domain([yMin - yMin/2, yMax + yMax/4]);
			svg = d3.select(containerId)
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				// .call(zoom)
				// .on("wheel.zoom", function(){
				// 	if (localThis.zooming) {
				// 		svg.call(zoom.x(xScale))
				// 	}
				// });

			svg.append("rect")
				.attr("fill-opacity", "0")
				.attr("width", width)
				.attr("height", height);

			svg.append("g")
				.attr("class", "x axis")
				.attr("id", "top-x")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.append("text")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", -10)
				.style("text-anchor", "end")
				.text(this.xAxisLabel);

			svg.append("g")
				.attr("class", "y axis")
				.attr("id", "top-y")
				.call(yAxis)
				.append("text")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text(this.yAxisLabel);

/*
DLG: this is not needed should be the responsibility of the user of the component to title the plot

			if (this.type === 'agent' ) {
			    svg.append("text")
			        .attr("class", "plot-title")
			        .attr("x", width/2)
			        .attr("y", 0)
			        .style("text-anchor", "middle")
			        .text("Category: " + category + ", Overall value: " + d3.sum(data, function(d) { return d.value; }) + ", Agents: "+ data.length);
			} else {
				svg.append("text")
					.attr("class", "plot-title")
					.attr("x", width / 2)
					.attr("y", -3)
					.style("text-anchor", "middle")
					.text("Category: " + category + ", Overall value: " + d3.sum(data, function(d) {
						return d.value;
					}));
			}
*/

		let mouseOver = this.mouseOverBubble
		if ( this.type.includes('agent')) {mouseOver = this.agentMouseOverBubble}
			// HTK if we want to rewrite the tooltips on the agent's tab to match the original we would insert that new function call here

		let click = this.clickedOnBubble;
		if ( this.type.includes('agent')) {click = this.agentClickedOnBubble}

			svg.selectAll(".dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("r", zMap)
				.attr("cx", xMap)
				.attr("cy", yMap)
				.attr("stroke", "gray")
				.attr("stroke-width", 1)
				.style("fill", function(d) {
					let saveThisColor = color(cValue(d))
					return saveThisColor;
				})
				.style("opacity", 0.75)
				.on("mouseover", mouseOver)
				.on("mouseout", this.mouseOutBubble)
				.on("click", click);
		},
		mouseOverBubble: function(d) {
			var tooltip = d3.select(`.${this.propID}_tooltip`);
			tooltip.transition()
				.duration(100)
				.style("opacity", 1);
			tooltip.html('<b class="tooltip-header">' + d.label + '</b>' + "<br/><b>"+ this.xAxisLabel + "</b> " + (this.isTime ? this.pretty_duration(60 * this.xValue(d)) : this.xValue(d)) + "<br/><b>" + this.yAxisLabel + ": </b>" + this.yValue(d)
				.toFixed(2) + "<br> <b>value:</b> " + this.zValue(d))
				.style("left", (d3.event.pageX + 5) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
			d3.select(tooltip[0])
				.transition()
				.duration(50)
				.style("opacity", 1);

			this.$emit('jsc_mouseover', d);
		},
		mouseOutBubble: function(d) {
			var tooltip = d3.select(`.${this.propID}_tooltip`);
			tooltip.transition().duration(300).style("opacity", 0);
			d3.select(tooltip[0])
				.transition()
				.duration(200)
				.style("opacity", 0);
		},
		clickedOnBubble: function(d) {
			var click_cats = [d.category_1, d.category_2, d.category_3];
			if (click_cats.indexOf('NULL') < 0) {
				d3.select(".d3_visuals_tooltip").transition().style('opacity', 0);
			}

			this.$emit('jsc_click', d);
		},
		agentClickedOnBubble: function(d) {
			var tooltip = d3.select(".d3_visuals_tooltip");
			tooltip.transition()
					.style("opacity", 0);
		},
		pretty_duration: function(d) {
			return moment.duration(d, "seconds").format("h[h] m[m] s[s]"); //this.moment??
		},
		get_min_bubble_size: function(max_value_size, cutoff, min_pixels) {
			return (max_value_size >= cutoff) ? min_pixels : max_value_size;
		},
		get_max_bubble_size: function(max_value_size, min_bubble_size, cutoff, max_pixels) {
			return (max_value_size >= cutoff) ? max_pixels : min_bubble_size * max_value_size + 25;
		},
		get_bubble_sizes: function(max_value_size) {
			var cutoff = 10,
				min_pixels = 5,
				max_pixels = 125;
			var min_bubble_size = (max_value_size < min_pixels) ? min_pixels : this.get_min_bubble_size(max_value_size, cutoff, min_pixels);
			return {
				'min': min_bubble_size,
				'max': this.get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels)
			};
		},
		get_duration_zoom_range: function(max_value_mins, min_zoom_mins = 1) {
			return [1, max_value_mins / min_zoom_mins]
		},
		get_x_zoom_range: function(asrs, xval, min_zoom_mins = 1) {
			return this.get_duration_zoom_range(d3.max(asrs, xval), min_zoom_mins)
		},
		/**
		* @function resizeSVG - redraws the SVG on window resize
		*/
		resizeSVG: function() {
			setTimeout(this.drawTopPlotX, 1000, this.processedData)
		},
		toggleZooming: function() {
			this.zooming = !this.zooming
		},
	}

}

</script>
<style>
</style>
