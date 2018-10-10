<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <resize-observer @notify="resizeSVG"></resize-observer>
      <div :id="propID" style="width:100%;height:100%" class="dendrogram" />
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  import { ResizeObserver } from 'vue-resize';
  import PanelHeading from '@/components/universal/PanelHeading.vue';

  /** Dendrogram D3 component
  * @module Dendrogram
  *
  * @param {Array} dataModel - the dataModel for the component
  * @param {string} propID - the ID for the component
  *
  * @example
  * usage on a page:
  * <dendrogram
  *   :dataModel="dendrogramData"
  *   propID="container-dendrogram"
  * ></dendrogram>
  */

  export default {
    name: 'D3Dendrogram',
    components: {
      'resize-observer': ResizeObserver,
      'panel-heading': PanelHeading
    },
    props: {
      /**
       * The data for this component can be customized; it currently contains:
       * @typedef {Array} dataModel
       * @property {Array} children - nested child nodes to show parent/child relationships
       */
      dataModel: {
        type: Array,
        default: ()=>{return []}
      },
      propID: {
        type: String,
        default: "container-dendrogram"
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        update: false,
        internalData: []
      }
    },
    watch: {
      dataModel: function(data) {
        if (this.internalData.length === 0) {
          this.update = false;
        } else {
          this.update = true;
        }
        this.internalData = data;
        this.drawDendrogram(
        );
      }
    },
    mounted: function() {
      this.drawDendrogram(
        this._props.dataModel,
        this._props.propID
      );
      this.update = true
    },
    methods: {
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function(){
        this.drawDendrogram()
      },

      /**
      * @function drawDendrogram - function that draws the dendrogram
      * @param {Array} data
      * the dataModel
      * @param {string} propID
      * the ID for the visualization, optional
      */

      drawDendrogram: function(
        data = this._props.dataModel,
        id =  this._props.propID,
      ) {
        let localThis = this;
        let selection_string = "#" + id;
        if ($(selection_string + ' svg') != null) {
          $(selection_string + ' svg').remove();
        }
        //component will still mount if there is no data
        if(data.length < 1){
          return;
        }


        var element = $(selection_string);
        var width = element.width(),
         height = element.height();

        
        // Account for panel heading height if title exists.
        if (this.title) {
          height -= 40;
        }

         //cluster layout to organize data into a tree structure
        var cluster = d3.cluster()
            .size([height, width - 160]);

        //diagonal objects defines the curves between two specific points
        // var diagonal = d3.svg.diagonal()
        //     .projection(function(d) { return [d.y, d.x]; });

        //make svg, set width and height
        var svg = d3.select(selection_string).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr('class', 'dendrogram')
            .style("padding-left", "10px")
            .append("g")
            .attr("transform", "translate(40,0)");
            // debugger

        //parses data starting from the root element of the data structure.
        // creates a root node and which then has all other nodes included in children
        var root = d3.hierarchy(this.dataModel[0])
        // paas the root node to the cluster
        cluster(root)

        //draws a path for each link in the links array
        svg.selectAll(".link")
            // pass the root nodes descendants to create the links
          .data(root.descendants().slice(1))
          .enter().append("path")
            .attr("class", "link")
            // function for drawing curve lines between the points
            .attr("d", function(d) {
              return "M" + d.y + "," + d.x
                  + "C" + (d.parent.y + 100) + "," + d.x
                  + " " + (d.parent.y + 100) + "," + d.parent.x
                  + " " + d.parent.y + "," + d.parent.x;
            });

        //draws the nodes at x,y position (defined within the node object)
        var node = svg.selectAll(".node")
            .data(root.descendants())
          .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

        node.append("circle")
            .attr("class", "dot")
            .attr("r", 4.5)
            .on('mouseover', function(d) {
              localThis.$emit('jsc_mouseover', d);
            })
            .on('click', function(d) {
              localThis.$emit('jsc_click', d);
            });

        //text for each node
        node.append("text")
            .attr("dx", function(d) { return d.children ? -8 : 8; })
            .attr("dy", 3)
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .text(function(d) { return d.data.name; });

          // Emit ready event.
				  this.$emit('ready');
        }
    }
  };
</script>

<style>

  .node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 1.5px;
  }

  .node text {
    font: 12px sans-serif;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }

</style>
