// Asks JavaScript to show more errors.
"use strict";

/*
 * # Boilerplate jQuery
 * This code loads the file `res/scores.json` and calls the `visualize` function
 * as soon as the JSON file is loaded.
 */
 $(function() {
   $.getJSON("res/GradeAnalysis.json")
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
  var margin = { top: 40, right: 120, bottom: 50, left: 50 },
     width = 3000 - margin.left - margin.right,
     height = 1000 - margin.top - margin.bottom;

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Scales
// Course Scale
var courses = _.map(data,"Class");
courses = _.uniq(courses);

var coursesScale = d3.scalePoint()
                     .domain(courses)
                     .range([0,width]);
//Draw Course Axis
var coursesAxis = d3.axisBottom()
                    .scale(coursesScale);
svg.append("g")
   .attr("transform","translate(0," + height +")")
   .call(coursesAxis);
// Per_A Scale
var per_AScale = d3.scaleLinear()
              .domain([0,1])
              .range([height,0]);
//Draw Per_A Axis
var per_AAxis = d3.axisLeft()
                  .scale(per_AScale);
svg.append("g")
   .call(per_AAxis);
//GPA Scale
var gpaScale = d3.scaleLinear()
            .domain([0,4])
            .range([height,0]);
//Draw GPA Axis
var gpaAxis = d3.axisRight()
                .scale(gpaScale);
svg.append("g")
   .attr("transform", "translate(" + (width) + ",0)")
   .call(gpaAxis);
//Create Container for bars
var per_ABars = svg.selectAll("per_As")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(" + ",0)";
    })
    ;
//Draw Bars
per_ABars.append("rect")
   .attr("x",function(d,i) {
     return coursesScale(d["Class"]);
   })
   .attr("y", function(d,i){
     return per_AScale(d["per_A"]);
   })
   .attr("width",18)
   .attr("height",function(d,i) {
     return height - per_AScale(d["per_A"]);
   })
   .attr("rx",2)
   .attr("ry",2)
   .attr("fill","hsla(127, 100%, 24%, 0.45)")
   .attr("stroke","hsla(127, 100%, 24%, 0.70)")

//Draw Circles
svg.selectAll("gpacircles")
   .data(data)
   .enter()
   .append("circle")
   .attr("cx",function (d,i){
     return coursesScale(d["Class"]);
   })
   .attr("cy",function (d,i){
     return gpaScale(d["avg_gpa"]);
   })
   .attr("r",10)
   .attr("fill",function(d,i){
     if (d["avg_gpa"] >= 3.5) {return "hsla(229, 100%, 50%, 0.95)";}
     if (d["avg_gpa"] >= 3.0) {return "hsla(229, 100%, 50%, 0.80)";}
     if (d["avg_gpa"] >= 2.5) {return "hsla(229, 100%, 50%, 0.50)";}
     else {return "grey";}
   })
};
