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

  var teams = _.map(data,"Team");
  nba = _.uniq(nba);

  var teamsScale = d3.scalePoint()
                       .domain(teams)
                       .range([25,height]);

  var teamsAxis = d3.axisLeft()
                      .scale(teamsScale);
  svg.append("g")
     .call(teamsAxis);

};

var visualize = function(data){

  var groups = _.groupBy(data, "Team");

  for(var key in groups){
    visualize2(groups[key]);
  }
};
