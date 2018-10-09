<template>
	<div style="height:100%; width:100%">
		<panel-heading v-if='title' :headerText='title'></panel-heading>
		<div :id="propID" class="heatmap-wrappper"/>
	</div>
</template>

<script>
	import * as d3 from 'd3';
	import $ from "jquery";
	import { ResizeObserver } from 'vue-resize';
	import PanelHeading from '@/components/universal/PanelHeading.vue';
	import themeHelper from '@/common/themeHelper.js'

	/** Heat Map D3 component
	* @module Heat Map
	*
	* @param {Array} dataModel - the dataModel for the component
	* @param {string} propID - the ID for the component
	* @param {string} alertText - name of the data being displayed ('Incident', etc.)
	*
	* @example
	* usage on a page:
	* <heat-map
	* 	:dataModel="heatMapData"
	* 	alertText="Incident"
	* 	propID='heatMap'
	* ></heat-map>
	*
	*/

	export default {
		name: 'D3HeatMap',
		components: {
	    'resize-observer': ResizeObserver,
	    'panel-heading': PanelHeading
	  },
	  props: {
			/**
			 * The data for this component can be customized. It currently contains:
			 * @typedef {Array} dataModel
			 * @property {string|number} x - the value for the x-axis
			 * @property {string|number} y - the value for the y-axis
			 * @property {number} magnitude - the value to determine the color/intensity of the data point
			 */
	    dataModel: {
	      type: Array,
	      default: ()=>{return[{"x": "2017-11-30","magnitude": 2},{"x": "2017-11-29","magnitude": 0},{"x": "2017-11-30","magnitude": 0},{"x": "2017-11-28","magnitude": 1}]}
	    },
	    propID: {
	      type: String,
	      default: "heatMap"
	    },
			alertText: {
				type: String,
				default: "Magnitude"
			},
	    title: {
	      type: String
			},
			/**
			 * Specifies which type of data the x values will be
			 * Possible values are
			 * "calendar" - date time string
			 * "other" - any number, string, etc.
			 */
			dataType: {
				type: String,
				default: "calendar"
			},
			xAxisAngle: {
				type: Number,
				default: 0
			}
	  },
		data: function() {
	    return {
	      internalData: []
	    };
	  },
		watch: {
	    dataModel: function(data) {
	      this.internalData = data;
	      this.draw(this.internalData, "#" + this._props.propID);
	    },
			theme: function(data) {
				this.draw(this.dataModel, "#" + this._props.propID);
			}
	  },
		computed: {
			...themeHelper
		},
		mounted: function() {
	      this.draw(this.dataModel, "#" + this._props.propID);
	  },
		destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
	  methods: {
			/**
			* @function draw - function that draws the heat map -
			* called in mounted
			* @param {Array} data
			* the dataModel
			* @param {string} selection_string
			* the div where the svg is to be mounted
			*/
	    draw: function(data, selection_string) {
			  let component = this
	      var width = 900,
	        height = 150,
	        cellSize = 13; // cell size
	      let week_days = [ ,"Mon", ,"Wed", ,"Fri"];
	      let month = [
	        "Jan",
	        "Feb",
	        "Mar",
	        "Apr",
	        "May",
	        "Jun",
	        "Jul",
	        "Aug",
	        "Sep",
	        "Oct",
	        "Nov",
	        "Dec"
	      ];
	      let localThis = this
	      let day = d3.timeFormat("%w"),
	        week = d3.timeFormat("%U"),
	        //percent = d3.format(".1%"),
	        format = d3.timeFormat("%Y-%m-%d");
	      let parseDate = d3.timeParse("%Y-%m-%d");

	      let min_value = 9999;
				let max_value = 0;

				let x_elems, y_elems;

				// calendar, get the range of years to display
	      if ( data !== undefined && data.length > 0 && this.dataType === 'calendar') {
	        data.forEach(function(datum) {
	          let date_year = parseDate(datum.x).getFullYear();
	          min_value = date_year < min_value ? date_year : min_value;
	          max_value = date_year > max_value ? date_year : max_value;
					});

					x_elems = month;
					y_elems = week_days;
				} else {
					// Get the range if not calendar.
					x_elems = d3.set(data.map( function (item) { return item.x })).values();
					y_elems = d3.set(data.map( function (item) { return item.y })).values();
				}

				d3.selectAll(`.${this.propID}_tooltip`).remove()
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
				}

				let xScale = d3.scaleBand()
											.domain(x_elems)
											.range([0, x_elems.length * cellSize]);

				let yScale = d3.scaleBand()
											.domain(y_elems)
											.range([0, y_elems.length * cellSize]);

	      var svg = d3
	        .select(selection_string)
	        .selectAll("svg")
	        .data(this.dataType === 'calendar' ? d3.range(min_value, max_value + 1) : [0])
	        .enter()
	        .append("svg")
	        .attr("width", "100%")
	        .attr("data-height", "0.5678")
	        .attr("viewBox", "0 0 900 300")
	        .attr("preserveAspectRatio", "xMaxYMax meet")
	        // http://tutorials.jenkov.com/svg/svg-viewport-view-box.html
	        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
	        // http://jonibologna.com/svg-viewbox-and-viewport/
	        .attr("class", "RdYlGn")
					// .style('fill', 'black')
	        .append("g")
	        .attr(
	          "transform",
	          "translate(100,100)"
	        );

	      svg
	        .append("text")
	        .attr("transform", "translate(-38," + cellSize * 3.5 + ")rotate(-90)")
	        .style("text-anchor", "middle")
	        .text(function(d) {
						if (this.dataType === "calendar") { return d; }
	        });

	      let tooltip = d3
	        .select("body")
	        .append("div")
	        .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
	        .style("opacity", 0);

				// "y" axis values
	      for (var i = 0; i < y_elems.length; i++) {
	        svg
	          .append("text")
						.style("font-size", "12px")
	          .attr("transform", "translate(-5," + cellSize * (i + 1) + ")")
	          .style("text-anchor", "end")
	          .attr("dy", "-.25em")
	          .text(function(d) {
	            return y_elems[i];
	          });
	      }

				// "magnitudes"
	      var rect = svg
	        .selectAll(".day")
	        .data(function(d) {
						if (localThis.dataType === 'calendar') {
							return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1));
						} else {
							return data;
						}
	        })
	        .enter()
	        .append("rect")
					.attr("stroke-width", ".5")
	        .attr("class", "day")
					.style("font-size", "12px")
	        .attr("width", cellSize)
	        .attr("height", cellSize)
	        .attr("x", function(d, i) {
						if (localThis.dataType === 'calendar') {
							return week(d) * cellSize;
						} else {
							//return xScale(d.x)
							return xScale(d.x);
						}
	        })
	        .attr("y", function(d, i) {
						if (localThis.dataType === 'calendar') {
							return day(d) * cellSize;
						} else {
							return yScale(d.y);
						}
	        })
					.attr("fill", '#D3D3D3')

				if (this.dataType === 'calendar') {
					rect.datum(format);
				}

				// "x" axis values
	      var legend = svg
	        .selectAll(".legend")
	        .data(x_elems)
	        .enter()
	        .append("g")
	        .attr("class", "legend")
	        .attr("transform", function(d, i) {
						if (localThis.dataType === 'calendar') {
							return "translate(" + ((i + 1) * 53) + ",0)";
						} else {
							let size = i * cellSize;
							if (localThis.xAxisAngle < 0 || localThis.xAxisAngle === 270) {
								size += 13;
							}

							return "translate(" + size + ",0)";
						}

	        })
	        .append("text")
	        .attr("class", function(d, i) {
	          return x_elems[i];
	        })
					.style("text-anchor", `${(this.xAxisAngle < 0 || this.xAxisAngle === 270) ? 'start' : 'end'}`)
					.attr("transform", `rotate(${this.xAxisAngle})`)
	        .attr("dy", "-.25em")
					.style("font-size", "12px")
	        .text(function(d, i) {
	          return x_elems[i];
					})

	      svg
	        .selectAll(".month")
	        .data(function(d) {
	          return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
	        })
	        .enter()
	        .append("path")
	        .attr("class", "month")
	        // .attr("id", function(d, i) {
	        //   return month[i];
	        // })
	        // .attr("d", this.monthPath);

	      // data
	      var count_Max = d3.max(data, function(d) {
						return d.magnitude;
				});

				var maxColor = this.colors[7]
				var color = d3.scaleLinear()
	        .range([localThis.colors[6], localThis.colors[0]])
					.domain([0, count_Max]);


	      var ndata = d3
	        .nest()
	        .key(function(d) {
						return d.x
	        })
	        .rollup(function(d) {
	          return d[0].magnitude;
	        })
	        .map(data);

				// Filling in the boxes with data.
	      rect
	        .filter(function(d) {
						if (localThis.dataType === 'calendar') {
							return ('$'+d in ndata) && (ndata['$'+d] != 0);
						} else {
							return ('$'+d.x in ndata) && (ndata['$'+d] != 0);
						}
	        })
					.attr("class", "hasData")
	        .attr("fill", function(d) {
						if (localThis.dataType === 'calendar') {
							return color(ndata['$'+d]);
						} else {
							return color(d.magnitude);
						}

	        })
					.attr('stroke', '#666')
	        .attr("data-title", function(d) {
	          return localThis.alertText + " : " + ndata[d];
	        })
	        .on("mouseover", function (d) {
	    			component.mouseOver(tooltip, d)
	      		d3
	      			.select(this)
	      			.transition()
	      			.duration(50)
	      			.attr("fill", maxColor)
	  		  })
	        .on("mouseout", function(d) {
	          d3
	            .select(this)
	            .transition()
	            .duration(100)
	            .attr("fill", function(d) {
	              if (localThis.dataType === 'calendar') {
									return color(ndata['$'+d]);
								} else {
									return color(d.magnitude);
								}
	            });
	          tooltip
	            .transition()
	            .duration(300)
	            .style("opacity", 0);
	        })
					.on('click', component.click);
	    },
	    numberWithCommas: function(x) {
	      x = x.toString();
	      var pattern = /(-?\d+)(\d{3})/;
	      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
	      return x;
	    },

	    mouseOver: function(tooltip, d) {
				var localThis = this;
				if (typeof d === 'string') {
					d = { x: d }
				}

	      let item = this.dataModel.filter(function(item) {
						return item.x === d.x && item.y === d.y
				});
				
				console.log(item);
				let tooltipText = "Occurrences: " + "<b>" + item.length + "</b>" + "<br>X: " + "<b>" + d.x + "</b></br>";
			 
			 tooltip
	        .html(tooltipText)
	        .style("left", d3.event.pageX + 5 + "px")
	        .style("top", d3.event.pageY - 28 + "px");

	      tooltip
	        .transition()
	        .duration(100)
	        .style("opacity", 1);

	      d3
	        .select(tooltip[0])
	        .transition()
	        .duration(50)
	        .style("opacity", 1);

				this.$emit('jsc_mouseover', item);
	    },
			click: function (d) {
				let localThis = this;
				let item = this.dataModel.filter( function (item) {
					if (localThis.dataType === 'calendar') {
						return item.x === d;
					} else {
						return item.x === d.x && item.y === d.y;
					}
				});

				this.$emit('jsc_click', item);
			},
	    monthPath: function(t0) {
	      let day = d3.timeFormat("%w");
	      let week = d3.timeFormat("%U");
	      let cellSize = 12; // cell size

	      var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
	        d0 = +day(t0),
	        w0 = +week(t0),
	        d1 = +day(t1),
	        w1 = +week(t1);
	      return (
	        "M" +
	        (w0 + 1) * cellSize +
	        "," +
	        d0 * cellSize +
	        "H" +
	        w0 * cellSize +
	        "V" +
	        7 * cellSize +
	        "H" +
	        w1 * cellSize +
	        "V" +
	        (d1 + 1) * cellSize +
	        "H" +
	        (w1 + 1) * cellSize +
	        "V" +
	        0 +
	        "H" +
	        (w0 + 1) * cellSize +
	        "Z"
	      );
	    },
			/**
			* @function resizeSVG - redraws the SVG on window resize
			*/
	    resizeSVG: function() {
	      this.draw(this.dataModel, "#" + this._props.propID);
	    },
	  }
	};
</script>

<style>

	.heatmap-wrappper{
		padding: 10px;
	}

</style>
