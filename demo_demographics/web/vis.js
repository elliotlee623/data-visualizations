"use strict";

/**
 * Using jQuery, we request the JSON file from the server and then call
 * the `visualize` function with the data.
 */
$(function() {
  $.getJSON("res/genderDiversity.json")
   .done(function (data) { visualize(data); })
   .fail(function() { alert("Failed to load the JSON file: " + fileName); });
});

/**
 * Called when the JSON has been loaded from the server, this function should
 * render the visualization.
 */
var visualize = function(data) {
  // == svg boilerplate for d3.js ==
  var margin = { top: 50, right: 20, bottom: 0, left: 300 },
      width = 970 - margin.left - margin.right,
      height = 4000 - margin.top - margin.bottom;

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // == band (ordinal) scale for names of majors ==
  var majorNames = _.map(data, "major");
  var majorsScale = d3.scaleBand()
                      .paddingInner(0.2)
                      .domain(majorNames)
                      .range([0, height]);

  // == Axis for majors ==
  var majorsAxis = d3.axisLeft()
                     .scale(majorsScale);

  // == linear scale for %_female ==
  var diversityScale = d3.scaleLinear()
                         .domain( [0, 1] )
                         .range( [0, width] );

  // == Axis for %_female ==
  var diversityAxis = d3.axisTop()
                        .scale(diversityScale)
                        .tickFormat(d3.format(".0%"));

  // == Gridlines for %_female ==
  var diversityGrid = d3.axisTop()
                        .scale(diversityScale)
                        .tickFormat("")
                        .tickSizeOuter(0)
                        .tickSizeInner(-height);


  // == Create a container for each bar ==
  var genderBars = svg.selectAll("diversity")
     .data(data)
     .enter()
     .append("g")
     .attr("transform", function (d) {
       return "translate(0," + majorsScale(d["major"]) + ")";
     })
     ;

  // == Draw the bar ==
  genderBars.append("rect")
     .attr("x", function (d) {
       return diversityScale(d["min_female_pct"]);
     })
     .attr("y", 0)
     .attr("width", function (d) {
       return diversityScale(d["max_female_pct"]) - diversityScale(d["min_female_pct"]);
     })
     .attr("height", function (d) {
       return majorsScale.bandwidth();
     })
     .attr("rx", 5)
     .attr("ry", 5)
     .attr("fill", "hsla(287, 58%, 77%, 1)")
     ;

  // == Circle for current ==
  genderBars.append("circle")
     .attr("cx", function (d) {
       return diversityScale(d["current_female_pct"]);
     })
     .attr("cy", function (d) {
       return majorsScale.bandwidth() / 2;
     })
     .attr("r", function (d) {
       return majorsScale.bandwidth() / 4;
     })
     .attr("stroke", "black")
     .attr("fill", "hsla(287, 58%, 43%, 1)")
     ;


  // == Add text labels on the left ==
  svg.append("g")
     .attr("transform", "translate(-10, 0)")
     .call(majorsAxis);

  svg.append("g")
     .attr("transform", "translate(0, -10)")
     .call(diversityAxis);

  svg.append("g")
     .attr("transform", "translate(0, -10)")
     .attr("class", "grid")
     .call(diversityGrid);
};
