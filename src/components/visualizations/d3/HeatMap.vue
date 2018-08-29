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
			 * The data for this component can be customized; it currently contains:
			 * @typedef {Array} dataModel
			 * @property {string} date - date string
			 * @property {string} volume - the number of incidents on a particular day
			 */
	    dataModel: {
	      type: Array,
	      default: ()=>{return[{"date": "2017-11-30","volume": 2},{"date": "2017-11-29","volume": 0},{"date": "2017-11-30","volume": 0},{"date": "2017-11-28","volume": 1}]}
	    },
	    propID: {
	      type: String,
	      default: "heatMap"
	    },
			alertText: {
				type: String,
				default: "Incident"
			},
	    title: {
	      type: String
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
	        height = 105,
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

	      let min_year = 9999;
	      let max_year = 0;

	      if ( data !== undefined && data.length > 0) {
	        data.forEach(function(datum) {
	          let date_year = parseDate(datum.date).getFullYear();
	          min_year = date_year < min_year ? date_year : min_year;
	          max_year = date_year > max_year ? date_year : max_year;
	        })
	      }

				d3.selectAll(`.${this.propID}_tooltip`).remove()
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

	      var svg = d3
	        .select(selection_string)
	        .selectAll("svg")
	        .data(d3.range(min_year, max_year + 1))
	        .enter()
	        .append("svg")
	        .attr("width", "100%")
	        .attr("data-height", "0.5678")
	        .attr("viewBox", "0 0 900 105")
	        .attr("preserveAspectRatio", "xMaxYMax meet")
	        // http://tutorials.jenkov.com/svg/svg-viewport-view-box.html
	        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
	        // http://jonibologna.com/svg-viewbox-and-viewport/
	        .attr("class", "RdYlGn")
					// .style('fill', 'black')
	        .append("g")
	        .attr(
	          "transform",
	          "translate(" +
	            (width - cellSize * 53) / 2 +
	            "," +
	            (height - cellSize * 7 - 1) +
	            ")"
	        );

	      svg
	        .append("text")
	        .attr("transform", "translate(-38," + cellSize * 3.5 + ")rotate(-90)")
	        .style("text-anchor", "middle")
	        .text(function(d) {
	          return d;
	        });

				var maxColor = this.colors[4]
				var color = d3.scaleLinear()
	        .range(['#ebedf0', maxColor])
	        .domain([0, 1]);

	      let tooltip = d3
	        .select("body")
	        .append("div")
	        .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
	        .style("opacity", 0);

	      for (var i = 0; i < 7; i++) {
	        svg
	          .append("text")
						.style("font-size", "12px")
	          .attr("transform", "translate(-5," + cellSize * (i + 1) + ")")
	          .style("text-anchor", "end")
	          .attr("dy", "-.25em")
	          .text(function(d) {
	            return week_days[i];
	          });
	      }

	      var rect = svg
	        .selectAll(".day")
	        .data(function(d) {
	          return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1));
	        })
	        .enter()
	        .append("rect")
					.attr("stroke-width", ".5")
	        .attr("class", "day")
					.style("font-size", "12px")
	        .attr("width", cellSize)
	        .attr("height", cellSize)
	        .attr("x", function(d) {
	          return week(d) * cellSize;
	        })
	        .attr("y", function(d) {
	          return day(d) * cellSize;
	        })
	        .attr("fill", '#D3D3D3')
	        .datum(format);

	      var legend = svg
	        .selectAll(".legend")
	        .data(month)
	        .enter()
	        .append("g")
	        .attr("class", "legend")
	        .attr("transform", function(d, i) {
	          return "translate(" + ((i + 1) *55 + 8) + ",0)";
	        });



	      legend
	        .append("text")
	        .attr("class", function(d, i) {
	          return month[i];
	        })
	        .style("text-anchor", "end")
	        .attr("dy", "-.25em")
					.style("font-size", "12px")
	        .text(function(d, i) {
	          return month[i];
	        });

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
	        return d.volume;
	      });

	      var ndata = d3
	        .nest()
	        .key(function(d) {
	          return d.date;
	        })
	        .rollup(function(d) {
	          return Math.sqrt(d[0].volume / count_Max);
	        })
	        .map(data);

	      rect
	        .filter(function(d) {
	          return ('$'+d in ndata) && (ndata['$'+d] != 0);
	        })
					.attr("class", "hasData")
	        .attr("fill", function(d) {
	          return color(ndata['$'+d]);
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
	              return color(ndata['$'+d]);
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
	      let item = this.dataModel.filter(function(item) {
	        return item.date == d;
	      });

	      tooltip
	        .html(localThis.alertText + ": " + "<b>" + item[0].volume + "</b>" + "<br>Date: " + "<b>" + d + "</b>")
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

				this.$emit('jsc_mouseover', item[0]);
	    },
			click: function (d) {
				let item = this.dataModel.filter( function (item) {
					return item.date == d;
				});

				this.$emit('jsc_click', item[0]);
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
