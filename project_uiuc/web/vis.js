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
var visualize2 = function(data) {
  /*
   * # Boilerplate Code for d3.js
   */
  var margin = { top: 40, right: 120, bottom: 50, left: 60 },
     width = 2500 - margin.left - margin.right,
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
                     .range([25,height]);
//Draw Course Axis
var coursesAxis = d3.axisLeft()
                    .scale(coursesScale);
svg.append("g")
   .call(coursesAxis);
// Per_A Scale
var per_AScale = d3.scaleLinear()
              .domain([0,1])
              .range([0,width-1000]);
//Draw Per_A Axis
var per_AAxis = d3.axisTop()
                  .scale(per_AScale);
svg.append("g")
   .call(per_AAxis);
//GPA Scale
var gpaScale = d3.scaleLinear()
            .domain([0,4])
            .range([0,width-1000]);
//Draw GPA Axis
var gpaAxis = d3.axisBottom()
                .scale(gpaScale);
svg.append("g")
   .call(gpaAxis);
//Create Container for bars

var tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d){
              var myString = "Professor: " + d["Instructor"] + " / Percent As: " + d["per_A"];
              return myString;
            });

            var tip3 = d3.tip()
                        .attr('class', 'd3-tip')
                        .html(function(d){
                          var myString =  "Percent As: " + d["per_A"];
                          return myString;
                        });


var per_ABars = svg.selectAll("per_As")
    .data(data)
    .enter()
    .append("g")
    .call(tip)
    .call(tip3)
    .attr("transform", function (d) {
      return "translate("  + ",0)";
    })
    ;
//Draw Bars
per_ABars.append("rect")
   .attr("x",0)
   .attr("y",function(d,i) {
     return coursesScale(d["Class"]);
   })
   .attr("width",function(d,i) {
     return per_AScale(d["per_A"]);
   })
   .attr("height",18)
   .attr("rx",2)
   .attr("ry",2)
   .attr("fill","hsla(127, 100%, 24%, 0.35)")
   .attr("stroke","hsla(127, 100%, 24%, 0.70)")
   .on("mouseover", tip.show)
   .on('mouseout', tip.hide)
   .on("mouseover", tip3.show)
   .on("mouseout", tip3.hide)


//Draw Circles
var tip2 = d3.tip()
             .attr('class', 'd3-tip')
             .html(function(d,i){
               var myString = "Professor: " + d["Instructor"] + " / The GPA was " + d["avg_gpa"];
               return myString;
             });

svg.selectAll("gpacircles")
   .data(data)
   .enter()
   .append("circle")
   .call(tip2)
   .attr("cx",function (d,i){
     return gpaScale(d["avg_gpa"]);
   })
   .attr("cy",function (d,i){
     return coursesScale(d["Class"]) + 8;
   })
   .attr("r",10)
   .attr("fill",function(d,i){
     if (d["avg_gpa"] >= 3.5) {return "hsla(229, 100%, 50%, 0.85)";}
     if (d["avg_gpa"] >= 3.0) {return "hsla(229, 100%, 50%, 0.5)";}
     if (d["avg_gpa"] >= 2.5) {return "hsla(229, 100%, 50%, 0.35)";}
     else {return "grey";}
   })
   .on("mouseover", tip2.show)
   .on('mouseout', tip2.hide)
};

var visualize = function(data){

  var groups = _.groupBy(data, "Subject");

  for(var key in groups){
    visualize2(groups[key]);
  }
};
