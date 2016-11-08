$(function() {
  $.getJSON("res/fake.json")
   .done(function (data) { visualize(data); })
   .fail(function() { alert("Failed to load the JSON file!\n(Did your Python run?)"); });
});

var visualize = function(data) {
  // boilerplate
  var margin = { top: 0, right: 0, bottom: 0, left: 0 },
     width = 960 - margin.left - margin.right,
     height = 960 - margin.top - margin.bottom,
     scale0 = (width - 1) / 2 / Math.PI;

  var svg = d3.select("#map")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // color
  var color = d3.interpolateBuGn;

  // projection
  var projection = d3.geoMercator()
                     //.scale((width - 3) / (2 * Math.PI))
                     .scale( width / 2 / Math.PI)
                     .translate([width / 2, height / 2]);

  var path = d3.geoPath()
               .projection(projection);

  d3.json("web/worldmap.topo.json", function(err, world) {
    if (err) { alert("Failed to load topojson. :("); throw err; }

    var countries = topojson.feature(world, world.objects.countries).features;

    svg.selectAll(".country")
       .data(countries)
       .enter()
       .insert("path")
       .attr("class", "country")
       .attr("d", path)
       .attr("title", function(d,i) {
         return d.properties.name;
       })
       .attr("fill", function(d, i) {
         // cur_country is the current country that needs to be colored
         var cur_country = d.properties.name;

         // e is the element in our data where ["country"] == cur_country
         // ...using _.find(...): https://lodash.com/docs/4.16.6#find
         var e = _.find(data, {"country": cur_country});

         // Check if the country is in our data, if so return a color;
         //                                ...otherwise, return black
         if (e) { return color(e["value"] / 300); }
         else   { return "black"; }
       })
       .on("mouseover", function (d) {
         console.log(d.properties.name);
       })

  });


};
