
$(function() {
  $.getJSON("res/if-sa.json")
   .done(function(data) { startStory(data); fdg(data); })
   .fail(function() { alert("Failed to load the JSON. (Did your Python run?)"); });
});

var svg;

var nodes, edges;
var startStory = function (data) {
  // Save the nodes/edges array
  nodes = data.nodes;
  edges = data.links;

  // Find the starting point
  var start = _.filter(nodes, "start");
  if (start.length == 0) { alert("No start node found."); return; }
  if (start.length > 1) { alert("Multiple start nodes found."); return; }
  start_index = nodes.indexOf(start[0]);

  // Begin the story
  renderStory(start_index, null);
};

var renderStory = function(node_index, e) {
  var html = "";
  if (e != null) {
    html += '<div class="prev">' + e.innerHTML + '</div>';
  }

  html += '<div class="narrative">' + nodes[node_index].narrative + "</div>";


  var outbound = _.filter(edges, {"source": node_index});
  if (outbound.length == 0) {
    html += '<div class="theend">THE END</div>';
  } else {
    outbound.forEach(function (edge) {
      html +=
        '<button class="btn" onclick="renderStory(' + edge.target + ', this)">' +
        edge.text +
        '</button>'
    })
  }

  $("#story").html( html )

};

var fdg = function(data) {

  // Boilerplate
  var margin = { top: 0, right: 0, bottom: 0, left: 0 },
     width = 800 - margin.left - margin.right,
     height = 800 - margin.top - margin.bottom;

  // --
  svg = d3.select("#fdg");
  svg = svg.append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .style("width", width + margin.left + margin.right)
           .style("height", height + margin.top + margin.bottom);

  // --
  var defs = svg.append("svg:defs");

  defs.append("svg:marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

 // --
 svg = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var simulation = d3.forceSimulation()
                    .force("link", d3.forceLink().id(function(d, i) { return i; }))
                    .force("charge", d3.forceManyBody().strength(function() { return -60; }))
                    .force("center", d3.forceCenter(width / 2, height / 2));

  // --
  var tip_node = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
      var s =
        "Node ID: " + d["id"] + "<br>" +
        "Sentiment: " + d["sentiment"] + "<br>" +
        "<br>" +
        d["narrative"];
      return s;
    });

  //
  var tip_edge = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
      var s =
        "Sentiment: " + d["sentiment"] + "<br>" +
        "<br>" +
        d["text"];
      return s;
    });


  svg.call(tip_node);
  svg.call(tip_edge);


  // --
  var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .on("mouseover", tip_edge.show)
       .on('mouseout', tip_edge.hide)
      .attr("marker-end", "url(#arrow)")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

  // --
  var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .on("mouseover", tip_node.show)
       .on('mouseout', tip_node.hide)
      .attr("r", function(d, i) {
        var outbound = _.filter(data.links, function (link) {
          return link.source == i;
        }).length;

        if (d.start) { return 7; }
        else if (outbound == 0) { return 7; }
        else { return 5; }
      })
      .attr("stroke", function(d, i) {
        var outbound = _.filter(data.links, function (link) {
          return link.source == i;
        }).length;

        if (d.start) { return "black"; }
        else if (outbound == 0 || outbound >= 3) { return "black"; }
        else { return "#999"; }
      })
      .attr("fill", function(d, i) {
        var outbound = _.filter(data.links, function (link) {
          return link.source == i;
        }).length;

        if (d.start) { return "black"; }
        else if (outbound == 0) { return "hsla(130, 100%, 34%, 1)"; }
        else if (outbound == 1) { return "hsla(292, 100%, 90%, 1)"; }
        else if (outbound == 2) { return "hsla(292, 100%, 80%, 1)"; }
        else if (outbound == 3) { return "hsla(292, 100%, 70%, 1)"; }
        else if (outbound == 4) { return "hsla(292, 100%, 60%, 1)"; }
        else if (outbound == 5) { return "hsla(292, 100%, 50%, 1)"; }
        else { return "hsla(292, 100%, 40%, 1)"; }
      })
      .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

  // --
  simulation.nodes(data.nodes)
            .on("tick", ticked);

  // --
  simulation.force("link")
            .links(data.links);

  // --
  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  // --
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
};
