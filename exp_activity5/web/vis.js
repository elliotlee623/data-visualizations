// Asks JavaScript to show more errors.
"use strict";

/*
 * # Boilerplate jQuery
 * This code loads the file `res/scores.json` and calls the `visualize` function
 * as soon as the JSON file is loaded.
 */
 $(function() {
   $.getJSON("res/scores.json")
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
  console.log(data);

  /*
   * # Data Pre-processing
   *
   * Sort the data based on the number of times a team was played
   * (negative count for sorting).  Create `teams`, a unique list
   * of teams.
   */
  var teamCount = _.reduce(data, function (result, d) {
    var opponent = d["Opponent"];
    if (!(opponent in result)) {
      result[opponent] = 0;
    }
    result[opponent]--;
    return result;
  }, {});

  var teams = _(teamCount).map(function (value, key) {
    return { team: key, count: value };
  }).sortBy("count").map("team").value();
  console.log(teams);


  /*
   * Create `years`, a unique list of years
   */
   var years = _(data).map("Season").uniq().reverse().value();
   console.log(years);


  /*
   * # Boilerplate Code for d3.js
   */
  var margin = { top: 40, right: 20, bottom: 20, left: 120 },
     width = 800 - margin.left - margin.right,
     height = (teams.length * 20);

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
   * ## Opponent Scale (`teamsScale`)
   *
   * The `teams` variable is an array of all of the opponents, where the opponent
   * will be mapped to the y-position.  As categorical, binned data, we use an
   * ordinal scale.
   */
  var teamsScale = d3.scalePoint()
                     .domain( teams )
                     .range( [0, height] )
                     .padding(1);


  /*
   * ## Years Scale (`yearsScale`)
   *
   * The `years` variable is an array of all years that we have data.  Since each
   * year is an individual season, this data is also binned data (not linear) and
   * we use another ordinal scale.
   */
  var yearsScale = d3.scalePoint()
                     .domain( years )
                     .range( [0, width] );



  /*
   * # d3.js Axes
   */

  /*
   * ## Axis for Opponents
   * Standard vertical axis, oriented left.
   */
  var teamsAxis = d3.axisLeft()
                    .scale(teamsScale);

  svg.append("g")
     .attr("class", "axis")
     .call(teamsAxis);

 /*
  * ## Axis for Years
  * Near standard horizontal axis, oriented top.  Instead of allowing d3.js to
  * draw every tick, we specify the `tickValues` as an array of values that we
  * want d3.js to draw on the axis.
  */
  var yearsAxis = d3.axisTop()
                    .scale(yearsScale)
                    .tickValues( [2015, 2000, 1980, 1960, 1940, 1920, 1900, 1892] );

  svg.append("g")
     .attr("class", "axis")
     .call(yearsAxis);


  /*
   * # Visual Encodings
   */
  svg.selectAll("circles")
     .data(data)
     .enter()
     .append("circle")


     ;
};
