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
  var margin = { top: 150, right: 120, bottom: 50, left: 120 },
      width = 1500 - margin.left - margin.right,
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
                       .range([(width)/2+1,width]);

  var teamAxis = d3.axisTop()
                      .scale(teamScale);
  svg.append("g")
     .call(teamAxis);

  var teamScale2 = d3.scalePoint()
                       .domain(team)
                       .range([0,(width)/2]);

  var teamAxis2 = d3.axisTop()
                      .scale(teamScale2);
  svg.append("g")
     .call(teamAxis2);

  var statsScale = d3.scalePoint()
                .padding(0.3)
                .domain(["3PM", "3PA", "3P%", "% of FGs as 3s", "Avg. Shot Distance"])
                .range([0,height]);

  var statsAxis = d3.axisLeft()
                    .scale(statsScale);
  svg.append("g")
     .call(statsAxis);

  var centerScale = d3.scalePoint()
                  .range([0,height]);

  var centerAxis = d3.axisLeft()
                     .scale(centerScale)
                     .ticks(0);

  svg.append("g")
     .attr("transform", "translate(" + (width/2)+", 0)")
     .call(centerAxis);

  var dataScale = d3.scaleLinear()
              .domain([0,100])
              .range([0, (width)/2 -1]);

  var dataAxis = d3.axisBottom()
                   .scale(dataScale);
  svg.append("g")
     .attr("transform", "translate(" + ((width)/2 + 1) +",0)")
     .call(dataAxis);

  var dataScale2 = d3.scaleLinear()
              .domain([100,0])
              .range([0,(width)/2]);

  var dataAxis2 = d3.axisBottom()
                   .scale(dataScale2);
  svg.append("g")
     .call(dataAxis2);

  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
              return d["3PM"] + " three point shots made";
            });
  var tip2 = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
              return d["3PA"] + " three point shots attempted";
            });
  var tip3 = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
              return d["3P%"]*100 + " %";
            });

  var tip4 = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
              return d["% of FGs as 3s"] + " %";
            });

  var tip5 = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
              return d["distance"] + " feet";
            });

  //v2
  var barChartGroup = svg.selectAll("threesMade")
      .data(data)
      .enter()
      .append("g")
      .call(tip);

  barChartGroup.append("rect")
    .attr("x",(width)/2 + 1)
    .attr("y", statsScale("3PM") - 7)
    .attr("height", 20)
    .attr("width", function (d) {
  //    return dataScale(50);
      return dataScale(d["3PM"]);
    })
    .attr("fill", "hsla(352, 80%, 50%, 1)")
    .on("mouseover", tip.show)
    .on('mouseout', tip.hide);

  var barChartGroup2 = svg.selectAll("threesAttempted")
      .data(data)
      .enter()
      .append("g")
      .call(tip2);

  barChartGroup2.append("rect")
    .attr("x",(width)/2 + 1)
    .attr("y", statsScale("3PA") - 7)
    .attr("height", 20)
    .attr("width", function (d) {
    //    return dataScale(50);
      return dataScale(d["3PA"]);
    })
    .attr("fill", "hsla(352, 80%, 50%, 1)")
    .on("mouseover", tip2.show)
    .on('mouseout', tip2.hide);

    var barChartGroup3 = svg.selectAll("threesPercent")
        .data(data)
        .enter()
        .append("g")
        .call(tip3);

    barChartGroup3.append("rect")
      .attr("x",(width)/2 + 1)
      .attr("y", statsScale("3P%") -7)
      .attr("height", 20)
      .attr("width", function (d) {
      //    return dataScale(50);
        return dataScale(d["3P%"]*100);
      })
      .attr("fill", "hsla(352, 80%, 50%, 1)")
      .on("mouseover", tip3.show)
      .on('mouseout', tip3.hide);

  var barChartGroup4 = svg.selectAll("threesUsage")
      .data(data)
      .enter()
      .append("g")
      .call(tip4);

  barChartGroup4.append("rect")
    .attr("x",(width)/2 + 1)
    .attr("y", statsScale("% of FGs as 3s") - 7)
    .attr("height", 20)
    .attr("width", function (d) {
      //    return dataScale(50);
      return dataScale(d["% of FGs as 3s"]);
    })
    .attr("fill", "hsla(352, 80%, 50%, 1)")
    .on("mouseover", tip4.show)
    .on('mouseout', tip4.hide);

  var barChartGroup5 = svg.selectAll("shotDistance")
      .data(data)
      .enter()
      .append("g")
      .call(tip5);

  barChartGroup5.append("rect")
    .attr("x",(width)/2 + 1)
    .attr("y", statsScale("Avg. Shot Distance") - 7)
    .attr("height", 20)
    .attr("width", function (d) {
        //    return dataScale(50);
      return dataScale(d["distance"]);
    })
    .attr("fill", "hsla(352, 80%, 50%, 1)")
    .on("mouseover", tip5.show)
    .on('mouseout', tip5.hide);

    var leftbarChartGroup = svg.selectAll("leftthreesMade")
        .data(data)
        .enter()
        .append("g")
        .call(tip);

    leftbarChartGroup.append("rect")
      .attr("x",function(d){
        return (width)/2 - dataScale(d["3PM"]);
      })
      .attr("y", statsScale("3PM") - 7)
      .attr("height", 20)
      .attr("width", function (d) {
    //    return dataScale(50);
        return dataScale(d["3PM"]);
      })
      .attr("fill", "hsla(352, 80%, 50%, 1)")
      .on("mouseover", tip.show)
      .on('mouseout', tip.hide);

    var leftbarChartGroup2 = svg.selectAll("leftthreesAttempted")
        .data(data)
        .enter()
        .append("g")
        .call(tip2);

    leftbarChartGroup2.append("rect")
      .attr("x",function(d){
        return (width)/2 - dataScale(d["3PA"]);
      })
      .attr("y", statsScale("3PA") - 7)
      .attr("height", 20)
      .attr("width", function (d) {
      //    return dataScale(50);
        return dataScale(d["3PA"]);
      })
      .attr("fill", "hsla(352, 80%, 50%, 1)")
      .on("mouseover", tip2.show)
      .on('mouseout', tip2.hide);

      var leftbarChartGroup3 = svg.selectAll("leftthreesPercent")
          .data(data)
          .enter()
          .append("g")
          .call(tip3);

      leftbarChartGroup3.append("rect")
        .attr("x",function(d){
          return (width)/2 - dataScale(d["3P%"]*100);
        })
        .attr("y", statsScale("3P%") -7)
        .attr("height", 20)
        .attr("width", function (d) {
        //    return dataScale(50);
          return dataScale(d["3P%"]*100);
        })
        .attr("fill", "hsla(352, 80%, 50%, 1)")
        .on("mouseover", tip3.show)
        .on('mouseout', tip3.hide);

    var leftbarChartGroup4 = svg.selectAll("leftthreesUsage")
        .data(data)
        .enter()
        .append("g")
        .call(tip4);

    leftbarChartGroup4.append("rect")
      .attr("x",function(d){
        return (width)/2 - dataScale(d["% of FGs as 3s"]);
      })
      .attr("y", statsScale("% of FGs as 3s") - 7)
      .attr("height", 20)
      .attr("width", function (d) {
        //    return dataScale(50);
        return dataScale(d["% of FGs as 3s"]);
      })
      .attr("fill", "hsla(352, 80%, 50%, 1)")
      .on("mouseover", tip4.show)
      .on('mouseout', tip4.hide);

    var leftbarChartGroup5 = svg.selectAll("leftshotDistance")
        .data(data)
        .enter()
        .append("g")
        .call(tip5);

    leftbarChartGroup5.append("rect")
      .attr("x",function(d){
        return (width)/2 - dataScale(d["distance"]);
      })
      .attr("y", statsScale("Avg. Shot Distance") - 7)
      .attr("height", 20)
      .attr("width", function (d) {
          //    return dataScale(50);
        return dataScale(d["distance"]);
      })
      .attr("fill", "hsla(352, 80%, 50%, 1)")
      .on("mouseover", tip5.show)
      .on('mouseout', tip5.hide);


      var teamImage = svg.selectAll("image")
          .data(data)
          .enter()
          .append("g")

      teamImage.append("svg:image")
          .attr("xlink:href", "http://content.sportslogos.net/logos/6/220/full/au67znem99jyg6d7esach62e4.png")
          .attr("width", 100)
          .attr("height", 100)
          .attr("x", function(d){
            return width*(3/4) - 50;
          })
          .attr("y", function(d){
            return dataScale(d["3PM"]) - 135;
          });

      var leftTeamImage = svg.selectAll("leftImage")
          .data(data)
          .enter()
          .append("g")

      teamImage.append("svg:image")
          .attr("xlink:href", "http://content.sportslogos.net/logos/6/220/full/au67znem99jyg6d7esach62e4.png")
          .attr("width", 100)
          .attr("height", 100)
          .attr("x", function(d){
            return width*(1/4) - 50;
          })
          .attr("y", function(d){
            return dataScale(d["3PM"]) - 135;
          });
/*
      var teamImage = svg.selectAll("image")
          .data(data)
          .enter()
          .append("g")

      teamImage.append("img")
        .attr("xlink:href", "http://content.sportslogos.net/logos/6/220/full/au67znem99jyg6d7esach62e4.png")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", function(d){
          return width*(3/4);
        })
        .attr("y", function(d){
          return teamScale(d["Team"]);
        })
*/

};

var visualize = function(data){

  var groups = _.groupBy(data, "Team");

  for(var key in groups){
    visualize2(groups[key]);
  }
};
