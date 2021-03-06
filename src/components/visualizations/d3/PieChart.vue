<template>
    <div :style="{paddingTop: title ? '.05%' : '0'}" style="height:100%; width:100%" >
      <panel-heading v-if='title' :headerText='title'></panel-heading>
  	  <resize-observer @notify="resizeSVG" />
      <div :id="propID" style="width:100%" :style="{height: title ? '95%' : '100%'}" class="piechart-wrapper"/>
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import { ResizeObserver } from "vue-resize";
  import $ from 'jquery';
  import PanelHeading from '@/components/universal/PanelHeading.vue';
  import themeHelper from '@/common/themeHelper'

  /** Pie Chart D3 component
  * @module Pie Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} units - what you are measuring
  * @param {Number} donutWidth - if this prop is specified, will turn the pie chart into a donut chart. the number indicates the pixel radius of the inner white circle
  *
  * @example
  * usage on a page:
  * <pie-chart
  *   :dataModel="pieChartData"
  *   propID="container-piechart"
  * ></pie-chart>
  */

  export default {
    name: 'D3PieChart',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
        /**
         * The data for this component can be customized; it currently contains:
         * @typedef {Array} dataModel
         * @property {string} label - what you are measuring
         * @property {string} value - the value of that label
         */
      dataModel: {
        type: Array
      },
      propID: {
        type: String,
        default: 'container-piechart'
      },
      // depending on how dataModel is formatted this could
      // be implemented to display units for each slice within the tooltip
      units: {
        type: String
      },
      donutWidth: {
      // if this prop is specified, will turn the pie chart into a donut chart. the number indicates the pixel radius of the inner white circle
        type: Number,
        default: 0
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        savedColors: {},
        total: 0,
        savedColorTheme: ''
      }
    },
    watch: {
      dataModel: function(data) {
        this.drawPieChart()
      },
      colors: function(data) {
        if (!Object.values(this.savedColors).includes(data[0])) {
          this.savedColors = {}
        }
        this.drawPieChart()
      }
    },
    computed: {
      ...themeHelper
    },
    mounted() {
      if (this.dataModel) {
        this.drawPieChart();
      }
    },
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function() {
        this.drawPieChart()
      },
      /**
      * @function drawPieChart - function that draws the graphic
      */
      drawPieChart: function() {

        if (this.total === 0 && this.dataModel) {
          this.dataModel.forEach(el => {this.total += el['value']})
        }

        d3.selectAll(`.${this.propID}_tooltip`).remove()
        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }
        function hex2rgb(hex) {
          return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
        }

        var localThis = this
        var element = $(selection_string);

        var margin = {top: 10, right: 0, bottom: 20, left: 0},
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom,
          radius = height > width ?  width / 2 : height / 2;

        var svg = d3.select(selection_string)
          .append("svg")
          .data([this.dataModel], function(d){
            if (d){
              return d.label
            }
          })
          .attr("width", width)
          .attr("height", height)
          .append("g")
          // sets the center of the piechart to center of container
          .attr("transform", "translate(" + width/2 + "," + height /2 + ")");

        //add tooltip div to the DOM
        var tooltip = d3
          .select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        // create function that will be used to draw slices
        var pie = d3.pie()
          .value(function(d){return d.value;});

        // Declare an arc generator function
        let donut = this.donutWidth > 0 ? this.donutWidth : radius
          // if donutWidth prop is present, innerWidth uses that number as a radius; otherwise, innerWidth is 0

        var arc = d3.arc()
          .innerRadius(radius - donut)
          .outerRadius(radius);

        // Select paths, use arc generator to draw
        var arcs = svg.selectAll("g.slice")
          .data(pie)
          .enter()
            .append("g")
            .attr("class", "slice");

        // add tooltip on mouseover of slice
        arcs.on("mouseover", function(d) {
          // calculate the percent of total for the slice
          d3.select(this).selectAll('path').
            attr('fill', function(dt){

                let currentFill = this.attributes.fill.value
             currentFill = hex2rgb(currentFill)
            // if (currentFill.includes('#')){
            // } else {
            //   currentFill = currentFill.slice(0, currentFill.length -2).slice(4).split(', ')
            // }
            let darker = currentFill.map(item=>{
              return parseInt(item) * .75
            })
            return `rgb(${darker[0]}, ${darker[1]}, ${darker[2]})`


            })

          var percent = Math.round(d.data.value / localThis.total * 100)
          tooltip.transition()
            .duration(100)
            .style("opacity", 1);
          tooltip
            .html(
              d.data.label + ': ' + '<b>' + d.data.value + '</b>' + '<br/>' + '<b>' + percent + '</b>' + '% of total'
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px");

          localThis.$emit('jsc_mouseover', d);
        })
          .on("mouseout", function(d) {
            tooltip.transition()
              .duration(300)
              .style("opacity", 0);

          d3.select(this).selectAll('path').
            attr('fill', function(dt){
              let label = dt.data ? dt.data.label : dt.label
              return localThis.savedColors[label]

            })
          })
          .on("click", function (d) {
            localThis.$emit('jsc_click', {data: d, event: d3.event});
          });

        var colors = this.colors

        // add colors to each slice
        arcs.append("path")
          .attr("fill", function (d, i) {
            var length = colors.length
            var color;
            if (localThis.savedColors[d.data.label]){
              color = localThis.savedColors[d.data.label]
            } else {
              i >= length ? color = colors[i-length] : color = colors[i];
              localThis.savedColors[d.data.label] = color

            }
            return color;
          })
          .attr("d", arc);

        // This is built in for smaller viewports
        // if the width is less than 800px then the legend won't be added
        // to the SVG the user is still able to hover or click on the pie
        // secion to see the label and value of the section
        // let localThis = this;
        if(width > 800) {
          var legend = svg.selectAll(".legend")
            .data(this.dataModel, function(d){
              return d.label
            })
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(30," + 25 * i + ")"; });

          legend.append("rect")
            .attr("x", radius + 20)
            .attr("y", -radius + 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", function (d, i) {
                var length = colors.length
                var color;
              if (localThis.savedColors[d.label]){
                color = localThis.savedColors[d.label]
              } else {
                i >= length ? color = colors[i-length] : color = colors[i];
                localThis.savedColors[d.label] = color

              }
              return color;

            })
            .attr("d", arc);

          legend.append("text")
            .attr("x", radius + 45)
            .attr("y", -radius + 30)
            .attr("dy", ".35em")
            .attr("font-size", 14)
            .style("text-anchor", "start")
            .text(function(d, i) {
              return localThis.dataModel[i].label
            });


            legend.on('mouseover', function(d){
              let local = localThis
              let currentLabel = d.label
              d3.selectAll('g.slice path').data([d], function(dt){
                  return dt.data ? dt.data.label : dt.label
              })
              .attr('fill', function(df){
                if (df.label === currentLabel) {
                  let currentFill = this.attributes.fill.value
                   currentFill = hex2rgb(currentFill)
                  let darker = currentFill.map(item=>{
                    return parseInt(item) * .75
                  })
                  return `rgb(${darker[0]}, ${darker[1]}, ${darker[2]})`
                } else {
                  return
                }
              })
            });


            legend.on('mouseout', function(d){
              let local = localThis
              let currentLabel = d.label
              d3.selectAll('g.slice path').data([d], function(dt){
                  return dt.data ? dt.data.label : dt.label
              })
              .attr('fill', function(df){
                return localThis.savedColors[df.label]
              })
            })
        }
        // Emit ready event.
				this.$emit('ready');
      }
    }
  }
</script>

<style>

  .legend {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 60%;
  }

  .piechart-wrapper {
    padding: 20px;
  }

</style>
