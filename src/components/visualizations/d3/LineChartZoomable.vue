<template>
  <div style="width:100%;height:100%">
    <panel-heading v-if='title' :headerText='title'></panel-heading>
    <resize-observer @notify="resizeSVG"></resize-observer>
    <div :id="propID" style="width:100%;height:100%"/>
  </div>
</template>

<script>
  import $ from 'jquery'
  import * as d3 from 'd3';
  import { ResizeObserver } from 'vue-resize';
  import formatTimeMixin from '@/mixins/formatTimeMixin.js';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Line Chart Zoomable D3 component
  * @module Line Chart
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  * @param {string} metric - value
  * @param {string} dateFormat - default: 'YYYY-MM-DD'
  *
  * @example
  * usage on a page:
  * <line-chart-zoomable
  *   :dataModel="lineChartZoomableData"
  *   propID="container-linechartzoomable"
  *   dateFormat='YYYY-MM-DD'
  * ></line-chart-zoomable>
  *
  */

  export default {
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    mixins: [formatTimeMixin],
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Object} dataModel
       * @property {string} date - 'date string' (ex. '2017-01-01')
       * @property {Number} volume - value
       */
      dataModel: {
        type: Array,
        default: () => {return [{ "date": '2017-11-23', "volume": 7 }]}
      },
      propID: {
        type: String,
        default: "container-linechartzoomable"
      },
      metric: {
        type: String,
        default: 'Metric'
      },
      dateFormat: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      title: {
        type: String
      }
    },
    data: function(){
      return {
        internalData: []
      }
    },
    watch: {
      dataModel: function(data) {
        if (data !== this.internalData) {
          this.internalData = data
          this.draw(data)
        }
      }
    },
    mounted() {
      this.draw()
    },
    methods: {
      /**
			* @function draw - function that draws the graphic -
			* called in mounted
			*/
      draw: function() {

        let selection_string = "#" + this.propID;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }

        var element = $(selection_string);


        var margin = {top: 20, right: 20, bottom: 120, left: 40},
            margin2 = {top: 390, right: 20, bottom: 40, left: 40},
            width = element.width() - margin.left - margin.right,
            height = element.height() - margin.top - margin.bottom,
            height2 = element.height() - height - margin.top - margin2.bottom - 20;

        var parseDate = d3.timeParse(this.d3Time[this.dateFormat]);
        var data = [];
        this.dataModel.forEach(el => data.push(Object.assign({}, el)))
        if (typeof data[0].date === 'string') {
          data = data.map(el => {el.date = parseDate(el.date); return el})
        }
        data = data.sort(function(a,b){
          return a.date - b.date
        })

        var svg = d3.select(selection_string)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime().range([0, width]),
            x2 = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            y2 = d3.scaleLinear().range([height2, 0]);

        var xAxis = d3.axisBottom(x),
            xAxis2 = d3.axisBottom(x2),
            yAxis = d3.axisLeft(y),
            yAxis2 = d3.axisLeft(y2).ticks([2]);

        var brush = d3.brushX()
            .extent([[0, 0], [width, height2]])
            .on("brush end", brushed);

        var zoom = d3.zoom()
            .scaleExtent([1, 200])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);

        var area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.value); });

        var area2 = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x2(d.date); })
            .y0(height2)
            .y1(function(d) { return y2(d.value); });

        svg.append("defs").append("clipPath")
            .attr("id", "zoom-clip")
          .append("rect")
            .attr("width", width)
            .attr("height", height);

        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + (height+40) + ")");



          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain([0, d3.max(data, function(d) { return d.value; })]);
          x2.domain(x.domain());
          y2.domain(y.domain());

          focus.append("path")
              .datum(data)
              .attr("class", "area zoom")
              .attr("d", area);

          focus.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          focus.append("g")
              .attr("class", "axis axis--y")
              .call(yAxis);

          context.append("path")
              .datum(data)
              .attr("class", "area zoom")
              .attr("d", area2);

          context.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height2 + ")")
              .call(xAxis2);

          context.append("g")
              .attr("class", "axis axis--y")
              // .attr("transform", "translate(0," + height2 + ")")
              .call(yAxis2);

          context.append("g")
              .attr("class", "brush")
              .call(brush)
              .call(brush.move, x.range());

          svg.append("rect")
              .attr("class", "zoom")
              .attr("width", width)
              .attr("height", height)
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .call(zoom);


        function brushed() {
          if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
          var s = d3.event.selection || x2.range();
          x.domain(s.map(x2.invert, x2));
          focus.select(".area").attr("d", area);
          focus.select(".axis--x").call(xAxis);
          svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
              .scale(width / (s[1] - s[0]))
              .translate(-s[0], 0));
        }

        function zoomed() {
          if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
          var t = d3.event.transform;
          x.domain(t.rescaleX(x2).domain());
          focus.select(".area").attr("d", area);
          focus.select(".axis--x").call(xAxis);
          context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        }

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


  .zoom {
    cursor: move;
    fill: none;
    pointer-events: all;
  }

  .area.zoom {
    fill: var(--sixth);
    clip-path: url(#zoom-clip);

  }

  .brush .extent {
    stroke: #fff;
    fill-opacity: .125;
    shape-rendering: crispEdges;
  }
</style>
