<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  import * as d3 from "d3";
  import $ from "jquery";
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Box Plot D3 component
  * @module Box Plot
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} metric - label for x-axis, optional
  * @param {string} yLabel - label for y-axis, optional
  *
  * @example
  * usage on a page:
  * <box-plot
  * :dataModel="boxPlotData"
  * propID="container-boxplot"
  * ></box-plot>
  *
  */

  export default {
    name: 'D3BoxPlot',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {string} value - time ("Q1") with the value for that time
       */
      dataModel: {
        type: Array,
        default: () => ([])
      },
      propID: {
        type: String,
        default: 'container-boxplot'
      },
      metric: {
        type: String,
        default: 'Revenue in $'
      },
      yLabel: {
        type: String,
        default: 'Revenue'
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        internalData:[]
      }
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData && data.length !== 0) {
          this.internalData = data;
          this.internalData.length !== 0 ? this.render() : null;
        }
      }
    },
    mounted() {
      this.dataModel.length === 0 ? null : this.render();
    },
    methods: {

      /**
      * @function render - function that draws the box chart
      * called in mounted
      */

      render: function() {
        d3.selectAll('.d3_visuals_tooltip').style('opacity', 0)

        let selection_string = "#" + this.propID;
        if ($(selection_string + " > svg") != null) {
          $(selection_string + " > svg").remove();
        }

        var element = $(selection_string);
        var margin = { top: 20, right: 30, bottom: 60, left: 50 },
            width = element.width() - margin.left - margin.right,
            height = element.height() - margin.top - margin.bottom;
        var min = Infinity,
            max = -Infinity;

        // using an array of arrays with
        // data[n][2]
        // where n = number of columns in the csv file
        // data[i][0] = name of the ith column
        // data[i][1] = array of values of ith column
        // get the keys of the data to use as the labels
        var data = [];
        var dataLabels = Object.keys(this.dataModel[0])
        for (var i = 0; i < dataLabels.length; i++) {
          data[i] = []
          data[i][0] = dataLabels[i]
          data[i][1] = []
        }

        // parse in the data
        this.dataModel.forEach(function(el) {
          var keys = Object.keys(el)
          var values = []
          for (var i = 0; i < keys.length; i++) {
            values.push(Math.floor(el[keys[i]]))
            data[i][1].push(el[keys[i]]);
          }


      		var rowMax = d3.max(values);
      		var rowMin = d3.min(values);


      		if (rowMax > max) max = rowMax;
      		if (rowMin < min) min = rowMin;
      	});

        // var chart = this.drawChart(data, min, max, iqr(1.5), height)
        let localThis = this;

      	var svg = d3.select(selection_string).append("svg")
      		.attr("width", width + margin.left + margin.right)
      		.attr("height", height + margin.top + margin.bottom)
      		.attr("class", "box")
      		.append("g")
      		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      	// the x-axis
      	var x = d3.scaleBand()
      		.domain( data.map(function(d) { return d[0] } ) )
      		.range([0 , width])
          .paddingInner(.4)
          .paddingOuter(.2);

      	var xAxis = d3.axisBottom()
      		.scale(x);

      	// the y-axis
      	var y = d3.scaleLinear()
      		.domain([min, max])
      		.range([height , 0 ]);

      	var yAxis = d3.axisLeft()
          .scale(y);

        /** 
         * @param d : Array -> [label, values]
         *              label is the label of the box being drawn
         *              values is the range of values for the box
         * @return Returns an object with min, max, quartile1, median, and quartile3
         */
        let computeBoxValues = function (d) {
          let ret = {};

          if (!d || d.length <= 0 || d[1].length <= 0){
            return ret;
          }

          let data = d[1];
          ret.values = data;
          ret.label = d[0];

          // Ensure data is sorted.
          data.sort( (a,b) => { return a - b });

          ret.min = data[0];
          ret.max = data[data.length - 1];

          let midpoint = Math.floor( (data.length - 1) / 2);
          let q1midpoint = (midpoint - 1) / 2;
          q1midpoint = data.length % 2 === 0 ? Math.round(q1midpoint) : Math.floor(q1midpoint);

          let q3midpoint = Math.floor( ( (data.length - midpoint)) / 2) + midpoint;

          ret.median = data[midpoint];
          ret.quartile1 = data[q1midpoint];
          ret.quartile3 = data[q3midpoint];

          return ret;
        }

      	// draw the boxplots
      	svg.selectAll(".box")
            .data(data)
      	  .enter().append("g")
      		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + 0 + ")"; } )
            .each(function(data, i) {
              var width = x.bandwidth(),
                  duration = 0,
                  whiskers = iqr(2),
                  quartiles = boxQuartiles,
                  tickFormat = null;

          	  var d = data[1].sort(d3.ascending);

                var g = d3.select(this),
                    n = d.length;

                // Compute quartiles. Must return exactly 3 elements.
                var quartileData = d.quartiles = quartiles(d);

                // Compute whiskers. Must return exactly 2 elements, or null.
                var whiskerIndices = whiskers && whiskers.call(this, d, i),
                    whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

                // Compute outliers. If no whiskers are specified, all data are "outliers".
                // We compute the outliers as indices, so that we can join across transitions!
                var outlierIndices = whiskerIndices
                    ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
                    : d3.range(n);

                // Compute the new x-scale.
                var x1 = y


                // Note: the box, median, and box tick elements are fixed in number,
                // so we only have to handle enter and update. In contrast, the outliers
                // and other elements are variable, so we need to exit them! Variable
                // elements also fade in and out.

                // Update center line: the vertical line spanning the whiskers.
                var center = g.selectAll("line.center")
                    .data(whiskerData ? [whiskerData] : []);

          	 //vertical line
                center.enter().insert("line", "rect")
                    .attr("class", "center")
                    .attr("x1", width / 2)
                    .attr("y1", function(d) { return x1(d[0]); })
                    .attr("x2", width / 2)
                    .attr("y2", function(d) { return x1(d[1]); })



                // Update innerquartile box.
                var box = g.selectAll("rect.box")
                    .data([quartileData]);

                box.enter().append("rect")
                    .attr("class", "box")
                    .attr("x", 0)
                    .attr("y", function(d) { return x1(d[2]); })
                    .attr("width", width)
                    .attr("height", function(d) { return x1(d[0]) - x1(d[2]); })


                // Update median line.
                var medianLine = g.selectAll("line.median")
                    .data([quartileData[1]]);

                medianLine.enter().append("line")
                    .attr("class", "median")
                    .attr("x1", 0)
                    .attr("y1", x1)
                    .attr("x2", width)
                    .attr("y2", x1)

                // Update whiskers.
                var whisker = g.selectAll("line.whisker")
                    .data(whiskerData || []);

                whisker.enter().insert("line", "circle, text")
                    .attr("class", "whisker")
                    .attr("x1", 0)
                    .attr("y1", x1)
                    .attr("x2", 0 + width)
                    .attr("y2", x1)

                // Update outliers.
                var outlier = g.selectAll("circle.outlier")
                    .data(outlierIndices, Number);

                outlier.enter().insert("circle", "text")
                    .attr("class", "outlier")
                    .attr("r", 5)
                    .attr("cx", width / 2)
                    .attr("cy", function(i) { return x1(d[i]); })


                // Compute the tick format.
                var format = x1.tickFormat(8);

                // Update box ticks.
                var boxTick = g.selectAll("text.box")
                    .data(quartileData);

                boxTick.enter().append("text")
                    .attr("class", "box")
                    .attr("dy", ".3em")
                    .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
                    .attr("x", function(d, i) { return i & 1 ?  + width : 0 })
                    .attr("y", x1)
                    .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
                    .text(format)


                // Update whisker ticks. These are handled separately from the box
                // ticks because they may or may not exist, and we want don't want
                // to join box ticks pre-transition with whisker ticks post-.
                var whiskerTick = g.selectAll("text.whisker")
                    .data(whiskerData || []);

                whiskerTick.enter().append("text")
                    .attr("class", "whisker")
                    .attr("dy", ".3em")
                    .attr("dx", 6)
                    .attr("x", width)
                    .attr("y", x1)
                    .text(format)

            function boxQuartiles(d) {
              return [
                d3.quantile(d, .25),
                d3.quantile(d, .5),
                d3.quantile(d, .75)
              ];
            }
          })
          .on("mouseover", function (d) {
            let data = computeBoxValues(d);

            localThis.$emit('jsc_mouseover', data);
          })
          .on("click", function (d) {
            let data = computeBoxValues(d);

            localThis.$emit('jsc_click', data);
          });

      	// add a title
      	svg.append("text")
              .attr("x", (width / 2))
              .attr("y", 0 + (margin.top / 2))
              .attr("text-anchor", "middle")
              .style("font-size", "18px")
              //.style("text-decoration", "underline")
              .text(this.yLabel);

      	 // draw y axis
      	svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
      		.append("text") // and text1
        		  .attr("transform", "rotate(-90)")
        		  .attr("y", 6)
        		  .attr("dy", ".71em")
        		  .style("text-anchor", "end")
        		  .style("font-size", "16px")
              .style('text-color', 'black')
        		  .text(this.metric);

      	// draw x axis
      	svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
            .call(xAxis)
      	  .append("text")             // text label for the x axis
              .attr("x", (width / 2) )
              .attr("y",  10 )
      		    .attr("dy", ".71em")
              .style("text-anchor", "middle")
      		    .style("font-size", "16px")
              .text("Year");

        // Returns a function to compute the interquartile range.
        function iqr(k) {
          return function(d, i) {
            var q1 = d.quartiles[0],
                q3 = d.quartiles[2],
                iqr = (q3 - q1) * k,
                i = -1,
                j = d.length;
            while (d[++i] < q1 - iqr);
            while (d[--j] > q3 + iqr);
            return [i, j];
          };
        }
      },
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        // setTimeout to prevent flashing when resizing
        setTimeout(() => {
          this.render()
        },10)
      }
    }
  }
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.box {
  font: 10px sans-serif;
}

.box line,
.box rect,
.box circle {
  fill: var(--sixth);
  stroke: #000;
  stroke-width: 1px;
}

.box .center {
  stroke-dasharray: 3,3;
}

.box .outlier {
  fill: none;
  stroke: #000;
}

.axis {
  font: 12px sans-serif;
  fill: black;
}

</style>
