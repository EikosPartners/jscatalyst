<template>
    <div style="width:100%;height:100%">
        <div :id="propID" style="width:100%;height:100%" />
    </div>
</template>

<script>

import * as d3 from 'd3'
import {event as currentEvent} from 'd3';
import $ from 'jquery'

export default {
  props: {
    dataModel: {
        default: ()=>{return [1, 2, 3]}
    },
    xaxisLabel: {
  		 type: String,
  		 default: ''
    },
    yaxisLabel: {
  		 type: String,
  		 default: ''
	  },
    propID: {
  		 type: String,
  		 default: 'stackedbarchart'
	  },
  },
  data: function() {
      return {
		      name: "StackedBarChart",
          update: false,
          internalData : [],
      }
  },
	created: function() {
        console.log("Created : " + this.name)
	},
	mounted: function() {
		console.log("Mounted : " + this.name)
		this.draw(this._props.dataModel, [], [this._props.yaxisLabel, this._props.xaxisLabel], this._props.propID)
	},
	watch: {
		dataModel: function(data) {
			console.log('BarChart dataModel changed')
			if (this.internalData.length === 0) {
				this.update = false
			} else {
				this.update = true
			}
			this.internalData = data
			this.draw(this.internalData, [], [this._props.yaxisLabel, this._props.xaxisLabel], this._props.propID)
		}
	},
  methods: {
      cleanData: function(d) {
             if (typeof d === 'undefined') {
              d = []
            }

            // console.log(d)

           d = d.filter(function(obj) {return obj.value != null;})
           d = d.map(function(obj) {
             if (typeof obj.date == 'string') {
               m = moment(obj.date, 'YYYY-MM-DD');
               obj.date = (obj.period > 86400) ? m.startOf('month') : m;
              }
               return obj;
           })

           //check if there are multiple dates here, indicating a daily metric
           let day_check = new Set(d.map(function(obj) {return obj.date.date()})).size > 1
           d = d.map(function(obj) {
             obj.stringDate = obj.date.format(day_check ? "ddd DD MMM YYYY" : 'MMM YYYY')
             return obj
           });

           d.sort(function(x,y) {
            return d3.ascending(x.date, y.date);
           });

          return d;
      },
		  draw: function (dataset, subset, labels, selection_string) {

        $(selection_string + ' svg').remove();

        dataset = this.cleanData(dataset);
        subset = this.cleanData(subset);

         let intermediate_no = dataset.map(function(d, i){
         	return {x: d.date, y: d.value - subset[i].value}})

         let intermediate_yes = subset.map(function(d){return {x: d.date, y:d.value}})

        var combined = d3.layout.stack()([intermediate_no, intermediate_yes])

        combined.forEach(function(dataset, i) {
          dataset.map(function(d){
      		    d.label = labels[i];
      		    d.x = d.x.format('MM/YYYY')
      		    return d})
        });

        var tooltip = d3.select("body").append("div")
      	      .attr("class", "tooltip")
      	      .style("opacity", 0);


         let margin = {top: 30, right: 20, bottom: 30, left: 40},
          width = $(selection_string).width() - margin.left - margin.right,
          height = $(selection_string).height() - margin.top - margin.bottom

        var x = d3.scale.ordinal()
            .domain(combined[0].map(function(d){return d.x}))
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
          .domain([0, d3.max(dataset, function(d){return d.value})])
          .range([height, 0]);

       var color = d3.scale.category20();

       var xAxis = d3.svg.axis()
      	.orient('bottom')
      	.scale(x)

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .innerTickSize(-width)
            .ticks(4)

        var svg = d3.select(selection_string).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g")
              .attr("class", "x axis xaxis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)

        var layer = svg.append("g")
      	.selectAll("g")
              .data(combined)
              .enter().append("g")
                  .attr("fill", function (d, i) {return color(i);})
      	    .selectAll("rect")
                  .data(function (d) {return d;})
                  .enter().append("rect")
                     .attr("x", function (d) {return x(d.x);})
                     .attr("y", function (d) {return y(d.y + d.y0); })
                     .attr("height", function (d) { return y(d.y0) - y(d.y + d.y0); })
                     .attr("width", x.rangeBand())
          	       .on("mouseover", function(d) {
      	          tooltip.transition()
      	    	         .duration(100)
      		         .style("opacity", 1);
                    		 tooltip.html("Date: " + d.x +
      			               "<br>" + d.label + ": " + d.y)
      		             .style("left", (currentEvent.pageX + 5) + "px")
      		             .style("top", (currentEvent.pageY - 28) + "px");
		 //try an outline or something here? w/e
	         // d3.select(this).transition()
		 //          .duration(50)
		 //         .style("fill", 'blue');
            	      })
            	      .on("mouseout", function(d) {
            	          tooltip.transition()
            		            .duration(300)
            		            .style("opacity", 0);
            	      });

  //assume the subset is the set of interest
  //var title = svg.append("text")
  //      .attr("x", (width / 2))
  //      .attr("y", 0 - (margin.top / 2))
  //      .attr("text-anchor", "middle")
  //      .text(labels[1]);
      }

  }
}
</script>

<style>

</style>
