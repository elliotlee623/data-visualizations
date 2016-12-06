// Asks JavaScript to show more errors.
"use strict";

/*
 * # Boilerplate jQuery
 * This code loads the file `res/scores.json` and calls the `visualize` function
 * as soon as the JSON file is loaded.
 */
 $(function() {
   $.getJSON("res/NBAAnalysis.json")
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
  var margin = { top: 40, right: 120, bottom: 50, left: 40 },
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

  var team = _.map(data,"Team");
  team = _.uniq(team);

  var teamScale = d3.scalePoint()
                       .domain(team)
                       .range([0,width-1000]);

  var teamAxis = d3.axisTop()
                      .scale(teamScale);
  svg.append("g")
     .call(teamAxis);

  var statsScale = d3.scaleBand()
                .domain(["3PA", "3P%", "% of FGs as 3s", "Avg. Shot Distance"])
                .range([0,height]);

  var statsAxis = d3.axisLeft()
                    .scale(statsScale);
  svg.append("g")
     .attr("transform", "translate(" + 670 +",0)")
     .call(statsAxis);

  var dataScale = d3.scaleLinear()
              .domain([0,100])
              .range([0,width-1000]);

  var dataAxis = d3.axisBottom()
                   .scale(dataScale);
  svg.append("g")
     .call(dataAxis);


  var threeAttemptsBars = svg.selectAll("ThreePAs")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + ",0)";
      })
      ;
  //Draw Bars
  threeAttemptsBars.append("rect")
     .attr("x",670)
     .attr("y",function(d,i) {
       return 106;
     })
     .attr("width",function(d,i) {
       return dataScale(d["3PA"]);
     })
     .attr("height",18)
     .attr("rx",2)
     .attr("ry",2)
     .attr("fill","hsla(127, 100%, 24%, 0.35)")
     .attr("stroke","hsla(127, 100%, 24%, 0.70)")

     var threePercent = svg.selectAll("threePercent")
         .data(data)
         .enter()
         .append("g")
         .attr("transform", function (d) {
           return "translate(" + ",0)";
         })
         ;
     //Draw Bars
     threePercent.append("rect")
        .attr("x",670)
        .attr("y",function(d,i) {
          return 332;
        })
        .attr("width",function(d,i) {
          return dataScale(d["3P%"]);
        })
        .attr("height",18)
        .attr("rx",2)
        .attr("ry",2)
        .attr("fill","hsla(127, 100%, 24%, 0.35)")
        .attr("stroke","hsla(127, 100%, 24%, 0.70)")


};

var visualize = function(data){

  var groups = _.groupBy(data, "Team");

  for(var key in groups){
    visualize2(groups[key]);
  }
};
