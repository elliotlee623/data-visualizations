// Asks JavaScript to show more errors.
"use strict";

/*
 * # Boilerplate jQuery
 * This code loads the file `res/scores.json` and calls the `visualize` function
 * as soon as the JSON file is loaded.
 */
 $(function() {
   $.getJSON("res/scoreDiff.json")
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
  var margin = { top: 40, right: 20, bottom: 20, left: 120 },
     width = 800 - margin.left - margin.right,
     height = 900;

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Scales
/*  var min = _.minBy(data, "year")["year"];
  var max = _.maxBy(data, "year")["year"];
*/
  var years = _.map(data, "year");
  years = _.uniq(years);

  var yearScale = d3.scalePoint()
                    .domain([0, 500])
                    .range([0, width]);

  var minIllini = _.minBy(data, function(d,i){
    return d["points"]["illini"];
  });

  var minOpponent = _.minBy(data, function(d,i){
    return d["points"]["opponent"];
  })

  var minP = minIllini;
  if(minOpponent < minP){
    minP = minOpponent;
  }

  var pointsScale = d3.scaleLinear()
                      .domain([500, 0])
                      .range([0, height]);

  var yearAxis = d3.axisBottom()
                   .scale(yearScale);

  svg.append("g")
     .call(yearAxis);

  var pointAxis = d3.axisLeft()
                    .scale(pointsScale);

  svg.append("g")
     .call(pointAxis);

  //visual encodings
  svg.selectAll("circle1")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d, i){
       return yearScale(d["year"]);
     })
     .attr("cy", function(d, i){
       return pointsScale(d["points"]["illini"])
     })
     .attr("r", 5);
     .attr("fill", "hsla(237, 100%, 50%, 1)")

  svg.selectAll("circle2")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d, i){
       return yearScale(d["year"]);
     })
     .attr("cy", function(d, i){
       return pointsScale(d["points"]["illini"])
     })
     .attr("r", 5);
     .attr("fill", "hsla(0, 100%, 50%, 1)")

};
