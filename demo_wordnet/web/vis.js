"use strict";

/* Boilerplate jQuery */
$(function() {
  var f1 = $.getJSON("res/data.json");
  var f2 = $.getJSON("res/paragraphs.json");

  $.when(f1, f2)
   .done(visualize)
   .fail(function() { alert("Failed to load JSON.") });
});




var visualize = function(json, paragraphs) {
  json = json[0];
  paragraphs = paragraphs[0];

  // == BOILERPLATE ==
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
     width = 800 - margin.left - margin.right,
     height = 200 - margin.top - margin.bottom;

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var tip = d3.tip()
              .attr('class', 'd3-tip')
  						.offset([10, 0])
              .direction("s")
  						.html(function(d) {
  							return d;
  						});

  svg.call(tip);

  var xScale = d3.scaleLinear()
                .domain( [0, paragraphs.length ] )
  							.range( [0, width] );

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  svg.selectAll("#paragraphs")
     .data( paragraphs )
  	 .enter()
  	 .append("circle")
  	 .attr("r", "2")
  	 .attr("cx", function (d, i) { return xScale(i); } )
  	 .attr("cy", 0)
  	 //.style("fill", function (d, i) { return color(i); } )
  	 .on('mouseover', tip.show)
  	 .on('mouseout', tip.hide)
  	 ;


  // Fix `json` format
  var renderData = [];
  for (var key in json) {
    var obj = { word: key, locations: [] };

    var arr = json[key];

    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];

      for (var innerKey in elem) {
        var innerArr = elem[innerKey];

        for (var j = 0; j < innerArr.length; j++) {
          if (obj.locations.indexOf(innerArr[j]) == -1) {
            obj.locations.push( innerArr[j] );
          }
        }
      }
    }

    renderData.push(obj);
  }

  console.log(renderData);



  /* #3: Draw the arcs */

  //  { "source": 97,  "wt": 0.0,  "target": 98 }

  /*
  var maxWeight = d3.max(
  	jsonData.edges,
  	function (d) { return d.wt; }
  );

  var wtScale = d3.scale.pow()
                  .exponent(2.5)
                  .domain( [0, maxWeight] )
  								.range( [0, 1] );
  */

  var wordColor = d3.scaleOrdinal(d3.schemeCategory10);

  var wordScale = d3.scaleLinear()
                    .domain([0, renderData.length])
                    .range([0, width]);


  console.log("RENDERING WORDS");

  svg.selectAll("#line")
     .data( renderData )
  	 .enter()
     .append("text")
     // Word base:
     .attr("id", function(d, i) { return "word-" + i; })
     .attr("x", function (d, i) { return wordScale(i) })
     .attr("y", height)
     .style("fill", function (d, i) { return wordColor(i); })
     .text(function (d) { console.log(d); console.log(d.word);  return d.word; })
     .style("font-size", "30px")
     ;

  console.log("DONE RENDERING WORDS");


  for (var i = 0; i < renderData.length; i++) {
    var word = renderData[i];

    console.log(word);

    svg.selectAll("#line-" + i)
       .data(word.locations)
       .enter()
       .append("line")
       // paragraph
       .attr("x1", function (d, i) { return xScale(d); } )
       .attr("y1", 0)
       // words
       .attr("x2", function () {
         var box = document.getElementById("word-" + i).getBBox();

         return wordScale(i) + (box.width / 2);
       })
       .attr("y2", height - 30)
       .attr("stroke", function () { return wordColor(i); });

  }


}
