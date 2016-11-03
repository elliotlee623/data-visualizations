
$(function() {
  $.getJSON("res/timetable.json")
   .done(function (data) { visualize(data); })
   .fail(function() { alert("Failed to load the JSON file!\n(Did your Python run?)"); });
});

var visualize = function(data) {
  console.log(data);

  // boilerplate
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
     width = 970 - margin.left - margin.right,
     height = 700 - margin.top - margin.bottom;

  var svg = d3.select("#cumtd")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // simple text output
  svg.selectAll("routes")
     .data(data)
     .enter()
     .append("text")
     .attr("x", 0)
     .attr("y", function (d, i) { return i * 20; })
     .attr("fill", "black")
     .text(function (d) { return d["route"] + ": " + d["expected"]; });
};
