<template>
    <div>
      <panel-heading v-if='title' :headerText='title'></panel-heading>
  	  <resize-observer @notify="resizeSVG" />
      <div :id="propID" />
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  import moment from "moment";
  // import "moment-duration-format";

  import { ResizeObserver } from "vue-resize";
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper'

  /** PunchCard D3 component
  * @module Punch Card
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {Function} bubbleSelected
  * @param {string} axisLabel - label of the axis
  * @param {Function} onClick
  * @param {Array} axisColors - color of the punchcard datapoints, currently takes two colors
  * @param {Function} changeHeight
  *
  * <punch-card
  *   :axisColors="punchAxisColors"
  *   :dataModel="punchCardData"
  *   alertText="Incident"
  *   propID='container-punchcard'
  * ></punch-card>
  */

  export default {
    name: 'D3PunchCard',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      alertText: {
        type: String,
        default: "Incident"
      },
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {Number} day_of_week - number from 0-6
       * @property {Array} value - array of number values for each hour in that day, ex. [4,6,10,...2] (24 elements)
       */
      dataModel: {
        type: Array,
        default: ()=>{return []}
      },
      propID: {
        type: String,
        default: "container-punchcard"
      },
      bubbleSelected: {
        type: Function
      },
      axisLabel: {
        type: String,
        default: ""
      },
      onClick: {
        type: Function,
        default: (a, b, c)=>{console.log(a + ': day #' + b + " hour #" + c)}
      },
      axisColors: {
        type: Array,
        default: () => {
          return ["#e5b1a5", "#ff2b2b"];
        }
      },
      changeHeight: {
        type: Function
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        margin: { top: 20, right: 20, bottom: 30, left: 40 },
        updateVisual: false,
        internalData: []
      };
    },
    computed: {
      processedData: function() {
        var data = this._props.dataModel;
        return data;
      },
      ...themeHelper
    },
    watch: {
      dataModel: function(data) {

  	   this.internalData = data;
       this.drawPunchCard(this.internalData);
     },
      theme: function(data) {
        this.drawPunchCard(this.processedData)
      }
    },
    mounted: function() {
      this.drawPunchCard(this.processedData);
    },
    methods: {
      getDay: function(day) {
        const days = [
            { name: 'Mon', value: 2, description: 'Monday' },
            { name: 'Tue', value: 3, description: 'Tuesday' },
            { name: 'Wed', value: 4, description: 'Wednesday' },
            { name: 'Thu', value: 5, description: 'Thursday' },
            { name: 'Fri', value: 6, description: 'Friday' },
            { name: 'Sat', value: 7, description: 'Saturday' },
            { name: 'Sun', value: 1, description: 'Sunday' }
        ];
        const result = days.filter(d => {
          return d.name == day;
        });
        return result[0].value;
      },
      /**
      * @function resizeSVG - redraws the SVG on window
      */
      resizeSVG: function() {
        this.drawPunchCard(this.processedData);
      },
      /**
      * @function drawPunchCard - function that draws the graphic
      * - called in mounted
      * @param {string} orig_data - data
      */
      drawPunchCard: function(orig_data) {
        if (orig_data === undefined) return;
        try {
          if (orig_data.length === 0) return;
        } catch (e) {
          return;
        }

        var localThis = this;
        // This was needed for the Incident Set Modal Test to pass.
        // localThis loses reference to moment or the reference to localThis gets lost
        localThis.moment = moment

        const elementName = "#" + this._props.propID;

        var data = JSON.parse(JSON.stringify(orig_data)); // deep copy

        let svgElement = $(elementName + " svg");

        if (svgElement != null) {
          svgElement.remove();
        }

        var margin = { top: 10, right: 5, bottom: 15, left: 15 };
        var padding = 3;
        var xLabelHeight = 30;
        var yLabelWidth = 50;
        var borderWidth = 1;
        var width = 500;
        var height = 181;
        // var width =
        //   $(elementName).width() - margin.left - margin.right - 2 * yLabelWidth;
        // var height =
        //   width / data[0]["hour_volumes"].length * data.length +
        //   2 * xLabelHeight - margin.top - margin.bottom;

  	  if (this._props.changeHeight !== undefined )
        	this._props.changeHeight(height + margin.top + margin.bottom + 2 * xLabelHeight);

        var chart = d3
          .select(elementName)
          .append("svg")
          .attr("width", "100%")
          .attr("data-height", "0.5678")
          .attr("viewBox", "0 0 650 300")
          .attr("preserveAspectRatio", "xMaxYMax meet")
          // .attr("width", width + margin.left + margin.right + 2 * yLabelWidth)
          // .attr("height", height + margin.top + margin.bottom + 2 * xLabelHeight)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //array of all values in the data, for min maxing and length calculations
        var allValues = Array.prototype.concat.apply(
          [],
          data.map(function(d) {
            return d.hour_volumes;
          })
        );
        //finds longest array in data
        var maxWidth = d3.max(
          data.map(function(d) {
            return d.hour_volumes.length;
          })
        );
        //maximum radius for bubble.
        var maxR =
          d3.min([
            (width - yLabelWidth) / maxWidth,
            (height - xLabelHeight) / data.length
          ]) / 2;

        //sort data and translate into human-readable
        data.sort(function(a, b) {
          parseInt(a["day_of_week"]) > parseInt(b["day_of_week"]);
        });

        data.push(data.shift());

        if (data[0]["day_of_week"].length == 1) {
          data = data.map(function(d) {
            let mo = localThis.moment().weekday(parseInt(d["day_of_week"]));
            d["day_of_week"] = mo.format("ddd");
            return d;
          });
        }

        //create labels
        var labelsX = [];
        for (var i = 0; i < 24; i++) {
          let mo = localThis.moment().hour(i);
          let label = mo.format("ha").slice(0, -1);
          labelsX.push(label);
        }

        //calc total volumes per day, for sumsY label
        var sumsY = [];
        for (var i = 0; i < data.length; i++) {
          let sum = data[i]["hour_volumes"].reduce(function(acc, val) {
            return acc + val;
          }, 0);
          sumsY.push(sum);
        }

        //calc total volumes per hour, for sumsX label
        var sumsX = [];
        for (var i = 0; i < data[0]["hour_volumes"].length; i++) {
          let sum = data.reduce(function(acc, val) {
            return acc + val["hour_volumes"][i];
          }, 0);
          sumsX.push(sum);
        }

        //this essentially scales radius values according to the maxR
        var sizeScale = function(d, dataset) {
          if (d === 0) return 0;
          let f = d3.scaleSqrt()
            .domain([d3.min(dataset), d3.max(dataset)])
            .rangeRound([2, maxR - padding]);
          return f(d);
        };

        var colorScale = function(d, dataset) {
          let f = d3.scaleLinear()
            .domain([d3.min(dataset), d3.max(dataset)])
            .range([localThis.colors[7], localThis.colors[0]]);

          return f(d);
        };

        var colorScaleAxes = function(d, dataset) {
          let f = d3.scaleLinear()
            .domain([d3.min(dataset), d3.max(dataset)])
            .range(localThis.axisColors);
          return f(d);
        };

        //yAxis Border
        chart
          .append("rect")
          .attr("x", yLabelWidth)
          .attr("y", xLabelHeight + 2 * maxR)
          .attr("width", 2 * maxR)
          .attr("height", height - xLabelHeight - 20)
          .attr("stroke-width", 2)
          .attr("fill", "transparent")
          .attr("shape-rendering", "crispEdges")
          .attr("class", "punch-border");
        //xAxis Border
        chart
          .append("rect")
          .attr("x", yLabelWidth + 2 * maxR)
          .attr("y", xLabelHeight)
          .attr("width", width - yLabelWidth)
          .attr("height", 2 * maxR)
          .attr("stroke-width", 2)
          .attr("fill", "transparent")
          .attr("shape-rendering", "crispEdges")
          .attr("class", "punch-border");

        //creates rows according to data labels
        var rows = chart.selectAll(".row").data(data, function(d) {
            return d.day_of_week;
          })
          .enter()
          .append("g")
          .attr("class", "row")
          .attr("transform", function(d, i) {
            return (
              "translate(" +
              (yLabelWidth + 2 * maxR) +
              "," +
              (maxR * i * 2 + 3 * maxR + xLabelHeight) +
              ")"
            );
          });

        //creating the elements that will hold and represent our data
        rows.selectAll("circle")
          .data(function(d) {
            return d.hour_volumes;
          })
          .enter()
          .append("circle")
          .attr("cy", 0)
          .style("fill", "transparent")
          .text(function(d) {
            return d;
          })
          .attr("r", function(d) {
            return sizeScale(d, allValues);
          })
          .attr("cx", function(d, i) {
            return i * maxR * 2 + maxR;
          })
          .attr("shape-rendering", "auto")
          .style("fill", function(d) {
            return colorScale(d, allValues);
          })

        //adds labels
        var dotLabels = rows.selectAll(".dot-label").data(function(d) {
          return d.hour_volumes.map(function(v) {
            return [v, d.day_of_week];
          });
        })
          .enter()
          .append("g")
          .attr("class", "dot-label")
          .on("mouseover", function(d) {
            var selection = d3.select(this);
            if (d[0] > 0) {
              selection.style("cursor", "pointer");
            }
            selection
              .select("circle")
              .transition()
              .duration(100)
              .style("opacity", 1);
            selection
              .select("text")
              .transition()
              .duration(100)
              .style("opacity", 1);
          })
          .on("mouseout", function(d) {
            var selection = d3.select(this);
            selection.style("cursor", "default");
            selection
              .select("circle")
              .transition()
              .style("opacity", 0);
            selection
              .select("text")
              .transition()
              .style("opacity", 0);
          })
          .on("click", function(d, i) {
            if (localThis.onClick !== undefined) {
              if (d[0] > 0) {
                localThis.onClick("point", localThis.getDay(d[1]), i);
              }
            }
          });


        dotLabels
          .append("circle")
          .attr("r", function(d) {
            return maxR
          })
          .attr("cx", function(d, i) {
            return maxR
            })
          .attr("cy", function(d, i) {
           return maxR
          })
          .style("fill", localThis.colors[0])
          .style("opacity", 0);

        dotLabels
          .append("text")
          .style("text-anchor", "middle")
          .style("fill", "#ffffff")
          .style("opacity", 0)
          .style('font-size', 8);

        dotLabels.exit().remove();

        //centers and resizes the text so it doesn't exceed its rect
        dotLabels
          .attr("transform", function(d, i) {
            return "translate(" + i * maxR * 2 + "," + -maxR + ")";
          })
          .select("text")
          .text(function(d) {
            return d[0];
          })
          .attr("y", maxR + 4)
          .attr("x", maxR);

        //ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
        dotLabels
          .select("rect")
          .attr("width", maxR * 2)
          .attr("height", maxR * 2);

        //creates labels for the x axis (hour)
        chart.selectAll(".xLabel")
          .data(labelsX)
        //styling for the labels
          .enter()
          .append("text")
          .attr("y", xLabelHeight)
          .attr("transform", "translate(0,-6)")
          .attr("class", "xLabel")
          .style("text-anchor", "middle")
          .style("fill-opacity", 0)
          .text(function(d) {
            return d;
          })
          .attr("x", function(d, i) {
            return maxR * i * 2 + 3 * maxR + yLabelWidth;
          })
          .style("fill-opacity", 1);

        //creates labels for the y axis (day of week)
        var yLabels = chart.selectAll(".yLabel")
          .data(data, function(d) {
            return d.day_of_week;
          })
        //y label creation
          .enter()
          .append("text")
          .text(function(d) {
            return d.day_of_week;
          })
          .attr("x", yLabelWidth)
          .attr("class", "yLabel")
          .style("text-anchor", "end")
          .style("fill-opacity", 0)
          .attr("y", function(d, i) {
            return maxR * i * 2 + 3 * maxR + xLabelHeight;
          })
          .attr("transform", "translate(-6," + maxR / 2.5 + ")")
          .style("fill-opacity", 1);

        //append sums to rows
        chart.selectAll(".sums-y")
          .data(sumsY)
          .enter()
          .append("circle")
          .text(function(d) {
            return d;
          })
          .attr("cy", 0)
          .attr("class", "sums-y")
          .style("fill", "#ffffff")
          .style("fill-opacity", 0)
          .attr("cy", function(d, i) {
            return maxR * i * 2 + 3 * maxR + xLabelHeight;
          })
          .attr("r", function(d) {
            return sizeScale(d, sumsY);
          })
          .attr("cx", yLabelWidth + maxR)
          .attr("shape-rendering", "auto")
          .style("fill", function(d) {
            return colorScaleAxes(d, sumsY);
          })
          .style("fill-opacity", 1)
          .style("stroke", "#9e9999")
          .style("stroke-width", 1);

        var sumsYValues = chart.selectAll(".sums-y-value").data(sumsY)
        // //adds mouseover transition
          .enter()
          .append("g")
          .attr("class", "sums-y-value")
          .on("mouseover", function(d) {
            var selection = d3.select(this);
            if (d > 0) {
              selection.style("cursor", "pointer");
            }
            selection
              .select("circle")
              .transition()
              .duration(0)
              .style("opacity", 1);
            selection
              .select("text")
              .transition()
              .duration(0)
              .style("opacity", 1);
          })
          .on("mouseout", function(d) {
            var selection = d3.select(this);
            selection.style("cursor", "default");
            selection
              .select("circle")
              .transition()
              .style("opacity", 0);
            selection
              .select("text")
              .transition()
              .style("opacity", 0);
          })
          .on("click", function(d, i) {
            if (d > 0) {
              if (localThis !== undefined)
                localThis.onClick(
                  "day",
                  localThis.getDay(yLabels[0][i].textContent),
                  -1
                );

              //window.location.href = redirect_url + yLabels[0][i].textContent + '/-1';
            }
          });

        //creates the needed svg and text elements to make the labels actually readable
        sumsYValues
          .append("circle")
          .attr("r", function(d) {
            return maxR
          })
          .attr("cx", function(d, i) {
            return maxR
            })
          .attr("cy", function(d, i) {
           return maxR
          })
          .style("fill", this.axisColors[1])
          .style("opacity", 0);

        sumsYValues
          .append("text")
          .style("text-anchor", "middle")
          .style("fill", "#ffffff")
          .style("opacity", 0)
          .style('font-size', 8);

        sumsYValues.exit().remove();

        //centers and resizes the text so it doesn't exceed its rect
        sumsYValues
          .attr("transform", function(d, i) {
            return (
              "translate(" +
              yLabelWidth +
              "," +
              (xLabelHeight + 2 * maxR + 2 * maxR * i) +
              ")"
            );
          })
          .select("text")
          .text(function(d) {
            return d;
          })
          .attr("y", maxR + 4)
          .attr("x", maxR);

        //ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
        sumsYValues
          .select("rect")
          .attr("width", maxR * 2)
          .attr("height", maxR * 2);

        //create top label for y
        chart
          .append("text")
          .attr("x", yLabelWidth)
          .attr("y", height + maxR * 2)
          .append("tspan")
          .attr("class", "sum-label-y")
          .style("text-anchor", "start")
          .text("Total/")
          .append("tspan")
          .attr("dy", 15)
          .attr("x", yLabelWidth)
          .text("Day")
          .attr("class", "sum-label-y")
          .style("text-anchor", "start");
        //x axis sums

        var sumsXAxis = chart.selectAll(".sums-x").data(sumsX);

        //styling for the labels
        sumsXAxis
          .enter()
          .append("circle")
          .text(function(d) {
            return d;
          })
          .attr("cy", 0)
          .attr("class", "sums-x")
          .style("fill", "#ffffff")
          .style("fill-opacity", 0)
          .attr("cy", xLabelHeight + maxR)
          .attr("r", function(d) {
            return sizeScale(d, sumsX);
          })
          .attr("cx", function(d, i) {
            return yLabelWidth + 3 * maxR + maxR * i * 2;
          })
          .attr("shape-rendering", "auto")
          .style("fill", function(d) {
            return colorScaleAxes(d, sumsX);
          })
          .style("fill-opacity", 1)
          .style("stroke", "#9e9999")
          .style("stroke-width", 1);

        var sumsXValues = chart.selectAll(".sums-x-value").data(sumsX)
        // //adds mouseover transition
          .enter()
          .append("g")
          .attr("class", "sums-x-value")
          .on("mouseover", function(d) {
            var selection = d3.select(this);
            if (d > 0) {
              selection.style("cursor", "pointer");
            }
            selection
              .select("circle")
              .transition()
              .duration(100)
              .style("opacity", 1);
            selection
              .select("text")
              .transition()
              .duration(100)
              .style("opacity", 1);
          })
          .on("mouseout", function(d) {
            var selection = d3.select(this);
            selection.style("cursor", "default");
            selection
              .select("circle")
              .transition()
              .style("opacity", 0);
            selection
              .select("text")
              .transition()
              .style("opacity", 0);
          })
          .on("click", function(d, i) {
            if (d > 0) {
              localThis.onClick("hour", 0, i);
            }
          });

        //creates the needed svg and text elements to make the labels actually readable
        sumsXValues
          .append("circle")
          .attr("r", function(d) {
            return maxR
          })
          .attr("cx", function(d, i) {
            return maxR
            })
          .attr("cy", function(d, i) {
           return maxR
          })
          .style("fill", this.axisColors[1])
          .style("opacity", 0);

        sumsXValues
          .append("text")
          .style("text-anchor", "middle")
          .style("fill", "#ffffff")
          .style("opacity", 0)
          .style('font-size', 8);

        sumsXValues.exit().remove();

        //centers and resizes the text so it doesn't exceed its rect
        sumsXValues
          .attr("transform", function(d, i) {
            return (
              "translate(" +
              (yLabelWidth + 2 * maxR * i + 2 * maxR) +
              ", " +
              xLabelHeight +
              ")"
            );
          })
          .select("text")
          .text(function(d) {
            return d;
          })
          .attr("y", maxR + 4)
          .attr("x", maxR);

        //ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
        sumsXValues
          .select("rect")
          .attr("width", maxR * 2)
          .attr("height", maxR * 2);

        //create left label for sumsX
        chart
          .append("text")
          .attr("x", width + 2 * maxR + 7)
          .attr("y", xLabelHeight + maxR / 2)
          .append("tspan")
          .attr("class", "sum-label-y")
          .style("text-anchor", "start")
          .text("Total/")
          .append("tspan")
          .attr("dy", 15)
          .attr("x", width + 2 * maxR + 7)
          .text("Hr")
          .attr("class", "sum-label-y")
          .style("text-anchor", "start");

        //draw in-chart light axes separating squares
        chart.selectAll(".vert")
          .data(labelsX)
          .enter()
          .append("line")
          .attr("class", "vert")
          .attr("y1", xLabelHeight + borderWidth / 2)
          .attr("stroke", "#888")
          .attr("stroke-width", 1)
          .style("shape-rendering", "crispEdges")
          .style("stroke-opacity", 0)
          .attr("x1", function(d, i) {
            return maxR * i * 2 + yLabelWidth + 2 * maxR;
          })
          .attr("x2", function(d, i) {
            return maxR * i * 2 + yLabelWidth + 2 * maxR;
          })
          .attr("y2", height - 20 + 2 * maxR)
          .style("stroke-opacity", function(d, i) {
            return i ? 0.5 : 0;
          });

        chart.selectAll(".horiz")
          .data(data, function(d) {
            return d.day_of_week;
          })
          .enter()
          .append("line")
          .attr("class", "horiz")
          .attr("x1", yLabelWidth + borderWidth / 2)
          .attr("stroke", "#888")
          .attr("stroke-width", 1)
          .style("shape-rendering", "crispEdges")
          .style("stroke-opacity", 0)
          .attr("x2", width + 2 * maxR)
          .attr("y1", function(d, i) {
            return i * maxR * 2 + xLabelHeight + 2 * maxR;
          })
          .attr("y2", function(d, i) {
            return i * maxR * 2 + xLabelHeight + 2 * maxR;
          })
          .style("stroke-opacity", function(d, i) {
            return i ? 0.5 : 0;
          });

        // outer Border Bottom
        chart
          .append("line")
          .attr("x1", yLabelWidth)
          .attr("y1", height - 20 + 2 * maxR)
          .attr("x2", width + 2 * maxR)
          .attr("y2", height - 20 + 2 * maxR)
          .attr("stroke-width", 1)
          .attr("shape-rendering", "crispEdges")
          .attr('class', 'punch-border');

        // outer border right
        chart
          .append("line")
          .attr("x1", width + 2 * maxR)
          .attr("y1", xLabelHeight)
          .attr("x2", width + 2 * maxR)
          .attr("y2", height - 20 + 2 * maxR)
          .attr("stroke-width", 1)
          .style("shape-rendering", "crispEdges")
          .attr('class', 'punch-border');
      }
    }
  };
</script>
<style>
</style>
