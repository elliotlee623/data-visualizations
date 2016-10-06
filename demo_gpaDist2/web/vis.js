// Asks JavaScript to show more errors.
"use strict";

/*
 * # Boilerplate jQuery
 * This code loads the file `res/scores.json` and calls the `visualize` function
 * as soon as the JSON file is loaded.
 */
 $(function() {
   $.getJSON("res/gpa.json")
    .done(function (data) { visualize(data); })
    .fail(function() { alert("Failed to load the JSON file!\n(Did your Python run?)"); });
 });

/*
 * # d3.js visualization
 * All of the code to create our visualization will be contained in the `visualize` function,
 * which is called once the data for the visualization has been loaded by the boilerplate
 * jQuery code.
 */
var visualize = function(data) {
  /*
   * # Boilerplate Code for d3.js
   */
  var margin = { top: 20, right: 20, bottom: 20, left: 100 },
     width = 800 - margin.left - margin.right,
     height = 20000 - margin.top - margin.bottom;

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  /*
   * # d3.js Scales
   */


  /*
   * # d3.js Axes
   */

  /*
   * # Visual Encodings
   */
   //Element 1
   var courseNames = _.map(data, "name");
   courseNames = ._unique(courseNames);
   console.log(" == Course Names == ");

   var courseScale = d3.scaleBand()
                       .domain(courseNames)
                       .range([0, height]);

   //Element 2 - average GPA
   var avgGpaScale = d3.scaleLinear()
                       .domain( [0, 4])
                       .range([0, width]);

   var avgGpaAxis = d3.axisBottom()
                      .scale(avgGpaScale);

   svg.append("g")
      .call(avgGpaAxis);

  //Element 3 - %As scale
  var pctAScale = d3.scaleLinear()
                    .domain([0,1])
                    .range([0,width]);

  var pctAAxis = d3.axisTop()
                   .scale(pctAScale);

  svg.append("g")
     .call(pctAAxis);

  //Element 4 - Avg GPA Circles
  svg.selectAll("circles")
     .data(data)
     .enter()
     .append("circle")
     .attr("r", 10)
     .attr("cx", function (d, i)){
       return avgGpaScale(d["avg_gpa"]);
     })
     .attr("cy", function(d,i){
       return courseScale(d["name"]);
     })
  };
