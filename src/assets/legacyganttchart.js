// Defined gantt chart
/**
 * @author Dimitry Kudrayvtsev
 * @version 2.0
 */
import * as d3 from 'd3';
import $ from 'jquery'


export const ganttMaker = function() {
  var FIT_TIME_DOMAIN_MODE = "fit";
  var FIXED_TIME_DOMAIN_MODE = "fixed";

  var margin = {
    top : 20,
    right : 40,
    bottom : 20,
    left : 150
  };

  var timeDomainStart;
  var timeDomainEnd;
  var timeDomainMode = FIT_TIME_DOMAIN_MODE;// Change range of graph
  var taskTypes = [];
  var taskStatus = [];
  var height = document.body.clientHeight - margin.top - margin.bottom-5;
  var width = document.body.clientWidth - margin.right - margin.left-5;
  var tickFormat = "%H:%M";

  var keyFunction = function(d) {
    return d.startDate + d.taskName + d.endDate;
  };

  var rectTransform = function(d) {
    return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
  };

  var x,y,xAxis,yAxis;

  initAxis();

  var initTimeDomain = function(tasks) {
    if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
      if (tasks === undefined || tasks.length < 1) {
        timeDomainStart = d3.time.day.offset(new Date(), -3);
        timeDomainEnd = d3.time.hour.offset(new Date(), +3);
        return;
      }

      tasks.sort(function(a, b) {
        return a.endDate - b.endDate;
      });

      timeDomainEnd = tasks[tasks.length - 1].endDate;
      tasks.sort(function(a, b) {
        return a.startDate - b.startDate;
      });
      timeDomainStart = tasks[0].startDate;
    }
  };

 function initAxis() {
    x = d3.time
      .scale()
      .domain([ timeDomainStart, timeDomainEnd ])
      .range([ 0, width ])
      .clamp(true);

    y = d3.scale
    .ordinal()
    .domain(taskTypes)
    .rangeRoundBands([ 0, height ], .60);

    xAxis = d3.svg.axis()
    .scale(x).orient("top")
    .tickFormat(d3.time.format(tickFormat))
    .tickSubdivide(true)
    .ticks(24)
    .tickSize(8)
    .tickPadding(8)
    .innerTickSize(-height);

    yAxis = d3.svg.axis()
      .scale(y)
      .ticks(taskTypes.length)
      .orient("left")
      .innerTickSize(-width-margin.left);
  };

  function gantt(tasks) {

    initTimeDomain(tasks);
    initAxis();
    console.log('START', timeDomainStart,'END', timeDomainEnd);
    var svg = d3.select('#container-ganttchart')
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("class", "gantt-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    svg.selectAll(".chart")
      .data(tasks, keyFunction).enter()
      .append("rect")
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("class", function(d){
        if(taskStatus[d.status] == null){ return "bar";}
        return taskStatus[d.status];
      })
      .attr("y", 0)
      .attr("transform", rectTransform)
      .attr("height", function(d) { return 70; })
      .attr("width", function(d) {
        console.log((d.endDate));
        return (x(d.endDate) - x(d.startDate));
      });

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
        .transition()
        .call(xAxis);

      svg.append("g").attr("class", "y axis").transition().call(yAxis);
      return gantt;

  };

  gantt.redraw = function(tasks) {

    initTimeDomain();
    initAxis();

    var svg = d3.select("svg");
    var ganttChartGroup = svg.select("#continer-ganttchart");
    var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);

    rect.enter()
      .insert("rect",":first-child")
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("class", function(d){
        if(taskStatus[d.status] == null){ return "bar";}
        return taskStatus[d.status];
      })
      .transition()
      .attr("y", 0)
      .attr("transform", rectTransform)
      .attr("height", function(d) { return y.bandwidth(); })
      .attr("width", function(d) {
         return (x(d.endDate) - x(d.startDate));
      });

      rect.merge(rect).transition()
      	.attr("transform", rectTransform)
	      .attr("height", function(d) { return y.bandwidth(); })
        .attr("width", function(d) {
           return (x(d.endDate) - x(d.startDate));
        });

        rect.exit().remove();

        svg.select(".x").transition().call(xAxis);
        svg.select(".y").transition().call(yAxis);

        return gantt;
  };

  gantt.margin = function(value) {
    if (!arguments.length)
      return margin;
    margin = value;
    return gantt;
  };

  gantt.timeDomain = function(value) {
    if (!arguments.length)
      return [ timeDomainStart, timeDomainEnd ];
    timeDomainStart = +value[0], timeDomainEnd = +value[1];
    return gantt;
  };

    /**
  * @param {string}
  *                vale The value can be "fit" - the domain fits the data or
  *                "fixed" - fixed domain.
  */
  gantt.timeDomainMode = function(value) {
    if (!arguments.length)
      return timeDomainMode;
    timeDomainMode = value;
    return gantt;

  };

  gantt.taskTypes = function(value) {
    if (!arguments.length)
      return taskTypes;
    taskTypes = value;
    return gantt;
  };

  gantt.taskStatus = function(value) {
    if (!arguments.length)
      return taskStatus;
    taskStatus = value;
    return gantt;
  };

  gantt.width = function(value) {
    if (!arguments.length)
      return width;
    width = +value;
    return gantt;
  };

  gantt.height = function(value) {
    if (!arguments.length)
      return height;
    height = +value;
    return gantt;
  };

  gantt.tickFormat = function(value) {
    if (!arguments.length)
      return tickFormat;
    tickFormat = value;
    return gantt;
  };

  return gantt;
};

// export const ganttMaker = function(agents) {
//     var FIT_TIME_DOMAIN_MODE = "fit";
//     var FIXED_TIME_DOMAIN_MODE = "fixed";
//
//     var margin = {
//     	top : 30,
//     	right : 40,
//     	bottom : 30,
//     	left : 150
//     };
//     var timeDomainStart = d3.time.day.offset(new Date(),-3);
//     var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
//     var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
//     debugger
//     console.log(agents);
//     var taskTypes = agents;
//     var taskStatus = [];
//     var legendMargin = 20;
//     var height =document.body.clientHeight - margin.top - margin.bottom + legendMargin;
//     var width = $("#container-ganttchart").parent().width() - margin.right - margin.left-5;
//
//     var tickFormat = "%H:%M";
//
//     var keyFunction = function(d) {
// 	     return d.startDate + d.taskName + d.endDate;
//     };
//
//     var rectTransform = function(d) {
// 	     return "translate(" + x(d.startDate) + "," + (margin.top + y(d.taskName)) + ")";
//     };
//
//     var x;
//     var y;
//
//     var xAxis;
//     var yAxis;
//
//     var tooltipOn = function(d) {
//         var tooltip = d3.selectAll(".tooltip");
//
//        tooltip.transition()
//        .duration(100)
//        .style("opacity", 1);
//
//        tooltip.html('<b>' + d.agent + ': </b><br>' + " " + moment(d.start).format("HH:mm") + " - " + moment(d.end).format("HH:mm") + "<br><b>Status: </b>" + d.taskStatus + "<br><b>Start Reason: </b>" + d.fields["start_reason"] + "<br><b>End Reason: </b>" + d.fields["end_reason"])
//        .style("left", (d3.event.pageX + 2) + "px")
//        .style("top", (d3.event.pageY - 8) + "px");
//        d3.select(this).transition()
//        .duration(50)
//        .style("opacity", 1);
//    };
//
//    var tooltipOff = function(d) {
//        var tooltip = d3.selectAll(".tooltip");
//         tooltip.transition()
//        .duration(300)
//        .style("opacity", 0);
//        d3.select(this).transition()
//        .duration(200)
//        .style("opacity", 0.75);
//    }
//
//     var initTimeDomain = function() {
// 	     if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
//   	    if (shifts === undefined || shifts.length < 1) {
//         		timeDomainStart = d3.time.day.offset(new Date(), -3);
//         		timeDomainEnd = d3.time.hour.offset(new Date(), +3);
//         		return;
//     	    }
//     	    shifts.sort(function(a, b) {
//     		    return a.endDate - b.endDate;
//     	    });
//     	    timeDomainEnd = shifts[shifts.length - 1].endDate;
//     	    shifts.sort(function(a, b) {
//     		    return a.startDate - b.startDate;
//     	    });
//     	    timeDomainStart = shifts[0].startDate;
//     	}
//     };
//
//     var initAxis = function() {
//         x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
//         y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([ 0, height ], .60);
//
//         xAxis = d3.svg.axis().scale(x).orient("top").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true).ticks(24)
//         	.tickSize(8).tickPadding(8).innerTickSize(-height);
//
//         yAxis = d3.svg.axis().scale(y).ticks(agents.length).orient("left").innerTickSize(-width-margin.left);
//     };
//
//
//     // Inserts gantt chart with y-axis shifts into the #gantt-container element
//     function gantt(shifts, this_time) {
//
//         // initialize domains and axes
//         initTimeDomain();
//         initAxis();
//
//         // initialize tooltips
//         var tooltip = d3.select("#gantt-container").append("div")
//     	.attr("class", "tooltip")
//     	.style("opacity", 0);
//
//         // insert chart container with proper styles
//         var svg = d3.select("#gantt-container")
//         .append("svg")
//         .attr("class", "chart")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//             .attr("class", "gantt-chart")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
//
//         // add x axis to chart element
//         svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0, " + /*(height - margin.top - margin.bottom)*/ margin.top + ")")
//         .transition()
//         .call(xAxis);
//
//         // add y axis to chart element
//         svg.append("g").attr("class", "y axis")
//         .attr("transform", "translate(0, " + /*(height - margin.top - margin.bottom)*/ margin.top + ")").transition().call(yAxis);
//
//         // draw data objects on chart
//           svg.selectAll(".chart")
//          .data(shifts, keyFunction).enter()
//          .append("rect")
//          .attr("rx", 5)
//              .attr("ry", 5)
//          .attr("class", "bar")
//          .classed("bar-running", function(d) {
//                if (d.taskStatus == 'Present') {
//                  return true;
//                }
//                else {
//                  return false;
//                }
//             })
//          .attr("y", 0)
//          .attr("transform", rectTransform)
//          .attr("height", function(d) { return y.rangeBand(); })
//          .attr("width", function(d) {
//              return (x(d.endDate) - x(d.startDate));
//              })
//          .on("mouseover", tooltipOn, tooltip)
//      	   .on("mouseout", tooltipOff, tooltip);
//
//         // draw vertical line at selected time, initially midnight
//         svg.append("line")
//         .attr("x1", x(this_time))  //<<== change your code here
//         .attr("y1", margin.top)
//         .attr("id", "time-line")
//         .attr("x2", x(this_time))  //<<== and here
//         .attr("y2", margin.top + height)
//         .style("stroke-width", 2)
//         .style("stroke", "red")
//         .style("fill", "none");
//
//
//         // draw legend
//         var legendRectSize = 18;
//         var legendSpacing = 4;
//
//         var color_dict = [
//     	      {'label': 'Scheduled', 'color': 'steelblue' },
//     	      {'label': 'Activity Detected', 'color': 'green' }
//         ];
//
//         var legend = svg.selectAll('.legend')
//     	      .data(color_dict)
//     	      .enter()
//     	      .append('g')
//     	      .attr('class', 'legend')
//     	      .attr('transform', function(d, i) {
//     	          var _height = legendRectSize + legendSpacing;
//     	          var offset = _height * color_dict.length / 2;
//     	          var horz = -150 + (i * (legendRectSize + legendSpacing + 80 + legendSpacing));
//     	          var vert = -1 * legendMargin;
//     	          return 'translate(' + horz + ',' + vert + ')';
//     	      });
//
//         legend.append('rect')
//     	      .attr('width', legendRectSize)
//     	      .attr('height', legendRectSize)
//     	      .style('fill', function(d) {
//     	          return d.color;
//     	      })
//         	  .style('stroke', function(d) {
//     	          return d.color;
//     	      });
//
//         legend.append('text')
//     	      .attr('x', legendRectSize + legendSpacing)
//     	      .attr('y', legendRectSize - legendSpacing)
//     	      .text(function(d) { return d.label; });
//
//
//          return gantt;
//
//         };
//
//     // gantt.redraw = function(shifts) {
//     //
//     //     // set up variables for updating plot
//     //     initTimeDomain();
//     //     initAxis();
//     //
//     //
//     //
//     //     var svg = d3.select("svg");
//     //     /* Update axes  */
//     //     // remove old axes
//     //     svg.selectAll(".axis").remove()
//     //
//     //     // add x axis to chart element
//     //     svg.append("g")
//     //     .attr("class", "x axis")
//     //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     //     .transition()
//     //     .call(xAxis);
//     //
//     //     // add y axis to chart element
//     //     svg.append("g").attr("class", "y axis")
//     //     .attr("transform", "translate(" + margin.left + "," + 2*margin.top + ")") .transition().call(yAxis);
//     //
//     //     // select existing chart elements and plotted data
//     //     var ganttChartGroup = svg.select(".gantt-chart");
//     //     var rect = ganttChartGroup.selectAll("rect").data(shifts, keyFunction);
//     //     var line = ganttChartGroup.selectAll("#time-line");
//     //
//     //
//     //     /* Update bars */
//     //     // add new bars
//     //     rect.enter()
//     //      .insert("rect",":first-child")
//     //      .attr("rx", 5)
//     //      .attr("ry", 5)
//     //      .attr("class", "bar")
//     //      .classed("bar-running", function(d) {
//     //            if (d.taskStatus == 'Present') {
//     //              return true;
//     //            }
//     //            else {
//     //              return false;
//     //            }
//     //         })
//     //      .transition()
//     //      .attr("y", 0)
//     //      .attr("transform", rectTransform)
//     //      .attr("height", function(d) { return y.rangeBand();})
//     //      .attr("width", function(d) {
//     //          return (x(d.endDate) - x(d.startDate));
//     //      });
//     //
//     //     // move existing bars to new locations
//     //     rect.transition()
//     //       .attr("transform", rectTransform)
//     //     .attr("height", function(d) { return y.rangeBand(); })
//     //     .attr("width", function(d) {
//     //      return (x(d.endDate) - x(d.startDate));
//     //      });
//     //
//     //
//     //     rect.exit().remove();
//     //
//     //     // initialize tooltips
//     //     d3.selectAll(".tooltip").remove();
//     //
//     //     var tooltip = d3.select("#gantt-container").append("div")
//     // 	.attr("class", "tooltip")
//     // 	.style("opacity", 0);
//     //
//     //     rect.on("mouseover", tooltipOn)
//     //     .on("mouseout", tooltipOff);
//     //
//     //
//     //
//     //
// 	  //      return gantt;
//     // };
//
//
//     // shift vertical line to time
//     // gantt.moveLine = function (time) {
//     //     // pull in existing objects
//     //     initTimeDomain()
//     //     initAxis()
//     //     var line = d3.select("#time-line");
//     //
//     //     // calculate new position
//     //     var new_x = x(time);
//     //     var old_x = line.attr("x1");
//     //     translation = 'translate(' + (new_x - old_x) + ', 0)'
//     //
//     //     // apply transform
//     //     line.attr("transform", translation);
//     // }
//
//     gantt.getX = function () {
//         initAxis();
//         return x;
//     }
//
//     gantt.margin = function(value) {
//     	if (!arguments.length)
//     	    return margin;
//     	margin = value;
//     	return gantt;
//     };
//
//     gantt.timeDomain = function(value) {
//     	if (!arguments.length)
//     	    return [ timeDomainStart, timeDomainEnd ];
//     	timeDomainStart = +value[0], timeDomainEnd = +value[1];
//     	return gantt;
//     };
//
//     /**
//      * @param {string}
//      *                vale The value can be "fit" - the domain fits the data or
//      *                "fixed" - fixed domain.
//      */
//     gantt.timeDomainMode = function(value) {
//     	if (!arguments.length)
//     	    return timeDomainMode;
//       timeDomainMode = value;
//       return gantt;
//
//     };
//
//     gantt.taskTypes = function(value) {
//     	if (!arguments.length)
//     	    return taskTypes;
//     	taskTypes = value;
//     	return gantt;
//     };
//
//     gantt.taskStatus = function(value) {
//       if (!arguments.length)
//           return taskStatus;
//       taskStatus = value;
//       return gantt;
//     };
//
//     gantt.width = function(value) {
//     	if (!arguments.length)
//     	    return width;
//     	width = +value;
//     	return gantt;
//     };
//
//     gantt.height = function(value) {
//     	if (!arguments.length)
//     	    return height;
//     	height = +value;
//     	return gantt;
//     };
//
//     gantt.tickFormat = function(value) {
//     	if (!arguments.length)
//     	    return tickFormat;
//     	tickFormat = value;
//     	return gantt;
//     };
//
//
//
//     return gantt;
// };
