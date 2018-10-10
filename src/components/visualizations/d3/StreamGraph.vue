<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from 'jquery';
  import { ResizeObserver } from 'vue-resize';
  import moment from 'moment';
  import formatTimeMixin from '@/mixins/formatTimeMixin.js';
  import PanelHeading from '@/components/universal/PanelHeading.vue'
  import themeHelper from '@/common/themeHelper'
  import basePropsMixin from '@/mixins/basePropsMixin.js';

  /** StreamGraph D3 component
  * @module Stream Graph
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} xAxisLabel - x-axis label
  * @param {string} yAxisLabel - y-axis label
  * @param {string} dateFormat - 'MM/YYYY'
  *
  * The data for this component can be customized; it currently contains:
  * @typedef {Array} dataModel
  * @property {string} month - month for x axis value OR use date
  * @property {string} date - date for x-axis value OR use month
  * @property {string} A - y-axis value
  * @property {string} B - y-axis value
  * @property {string} C - y-axis value
  * you can specify as many values as you need.
  * 
  * @example
  * usage on a page:
  * <stream-graph
  *   :dataModel="streamGraphData"
  *   propID="container-streamgraph"
  *   dateFormat='MMMM'
  * ></stream-graph>
  *
  */

  export default {
    name: 'D3StreamGraph',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    computed: {
      ...themeHelper
    },
    mixins: [formatTimeMixin, basePropsMixin],
    props: {
      propID: {
        type: String,
        default: 'container-streamgraph'
      },
      dateFormat: {
        type: String,
        default: 'MM/YYYY'
      }
    },
    data: function() {
      return {
        internalData: []
      }
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData) {
          this.internalData = data
          this.internalData.length !== 0 ? this.draw() : null
        }
      },
      theme: function(data) {
        this.draw()
      }
    },
    mounted() {
      this.dataModel.length !== 0 ? this.draw() : null;
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
        if ($(selection_string + " > svg") != null) {
          $(selection_string + " > svg").remove();
        }


        var data = this.dataModel;
        var element = $(selection_string);
        var parseDate = d3.timeParse(this.d3Time[this.dateFormat]);
        var timeKey;
        Object.keys(data[0]).includes('month') ? timeKey = 'month' : timeKey = 'date';
        var keys = Object.keys(data[0]).filter(el => el !== timeKey)

        data.sort((a,b) => {
          return moment(a[timeKey], this.dateFormat) - moment(b[timeKey], this.dateFormat)
        })

        var margin = {top: 5, right: 40, bottom: 20, left: 50},
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

        // Account for the panel heading height if it exists.
        if (this.title) {
          height -= 40;
        }

        var stack = d3.stack().keys(keys).offset(d3.stackOffsetWiggle),
            layers = stack(data);

        var svg = d3.select(selection_string)
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + ( (margin.right + margin.left) / 2) + "," + margin.top + ")");

        var x = d3.scaleTime()
            .domain([parseDate(data[0][timeKey]), parseDate(data[data.length-1][timeKey])])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
            .range([height, 0]);


        var xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(d3.timeFormat(this.d3Time[this.dateFormat]))

        var yAxis = d3.axisLeft()
            .scale(y)
            .tickSizeInner(-width+25, 0, 0)
            .ticks(6)
            .tickFormat( function(d) { return d } );

        var z = this.colors

        var area = d3.area()
            .x(function(d, i) { return x(parseDate(d.data[timeKey])); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
            .curve(d3.curveMonotoneX);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("font-size", "16px")
            .text(this.yAxisLabel);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", (width / 2))
            .attr("y", 30)
            .style("text-anchor", "middle")
            .attr("font-size", "16px")
            .text(this.xAxisLabel);

        svg.selectAll("streams")
          .data(layers)
          .enter().append("path")
            .attr("d", area)
            .attr('class', 'layer')
            .attr("fill", function(d,i) { return z[i]; });

        var tooltip = d3.select("body")
            .append("div")
            .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
            .style("opacity", 0);


        var localThis = this;
        svg.selectAll(".layer")
            .attr("opacity", 1)
            .on("mouseover", function(d, i) {
              localThis.$emit("jsc_mouseover", d)
              svg.selectAll(".layer").transition()
              .duration(250)
              .attr("opacity", function(d, j) {
                return j != i ? 0.6 : 1;
            })})
            .on("mousemove", function(d, i) {
              var mousex = d3.mouse(this);
              // get x coordinate of mouse
              mousex = mousex[0];
              // get x value based on mouse position
              // x value is a JS date
              var invertedx = x.invert(mousex);
              // change the js date into a moment that matches a date in dataModel
              var date = moment(invertedx).format(localThis.dateFormat)
              // key is the label of the stream
              var key = d['key']
              // get value of stream at that date
              var value = d.filter(el => (el.data[timeKey] == date))[0].data[key]

              tooltip.transition()
                  .duration(100)
                  .style("opacity", 1);
              tooltip.html("Date: " + "<b>" + date + '</b>'+ '<br/>' + 'Label: <b>' + key + '</b>'+
                      "<br>" + "Amount" + ": " + "<b>" + value + "</b>")
                  .style("left", (d3.event.pageX + 5) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d, i) {
            svg.selectAll(".layer")
                .transition()
                .duration(250)
                .attr("opacity", "1");
            tooltip.transition()
                .duration(300)
                .style("opacity", 0);
            })
            .on('click', function(d) {
              console.log(d['key'] + ' was clicked');
              localThis.$emit("jsc_click", d)
            })
            

        function stackMax(layer) {
          return d3.max(layer, function(d) { return d[1]; });
        }

        function stackMin(layer) {
          return d3.min(layer, function(d) { return d[0]; });
        }

        // Emit ready event.
				this.$emit('ready');
      },
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG() {
        this.dataModel.length !== 0 ? this.draw() : null;
      }
    }
  }
</script>

<style>
</style>
