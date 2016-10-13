
$(function() {
  $.getJSON("res/if.json")
   .done(function(data) { startStory(data); })
   .fail(function() { alert("Failed to load the JSON. (Did your Python run?)"); });
});

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
