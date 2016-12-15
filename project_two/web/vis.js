// Asks JavaScript to show more errors.
"use strict";

/*
 * # Boilerplate jQuery
 * This code loads the file `res/scores.json` and calls the `visualize` function
 * as soon as the JSON file is loaded.
 */
 $(function() {
   $.getJSON("res/countries.json")
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
  /*
   * # Boilerplate Code for d3.js
   */
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

var colorRed = d3.interpolateOrRd;
var colorBlue = d3.interpolateGnBu;
var colorPurple = d3.interpolateBuPu;
var colorGreen = d3.interpolateBuGn;
var coloryellowOrange = d3.interpolateYlOrRd;

var projection = d3.geoMercator()
                    .scale(width/ 2 / Math.PI)
                    .translate([width / 2, height / 2])


var path = d3.geoPath().projection(projection);

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
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;


           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});



           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][0] < -200000){
               return colorRed(1 );
             }
             if (e["value"][0] < -75000 && e["value"][0] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][0] < -25000 && e["value"][0] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][0] < 0 && e["value"][0] > -25000){
               return colorPurple(1);
             }
             if (e["value"][0] < 10000 && e["value"][0] > 0){
               return colorPurple(.7);
             }
             if (e["value"][0] < 20000 && e["value"][0] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][0] < 50000 && e["value"][0] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][0] < 100000 && e["value"][0] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][0] < 150000 && e["value"][0] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][0] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
           })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][1] < -200000){
               return colorRed(1 );
             }
             if (e["value"][1] < -75000 && e["value"][1] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][1] < -25000 && e["value"][1] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][1] < 0 && e["value"][1] > -25000){
               return colorPurple(1);
             }
             if (e["value"][1] < 10000 && e["value"][1] > 0){
               return colorPurple(.7);
             }
             if (e["value"][1] < 20000 && e["value"][1] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][1] < 50000 && e["value"][1] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][1] < 100000 && e["value"][1] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][1] < 150000 && e["value"][1] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][1] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][2] < -200000){
               return colorRed(1 );
             }
             if (e["value"][2] < -75000 && e["value"][2] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][2] < -25000 && e["value"][2] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][2] < 0 && e["value"][2] > -25000){
               return colorPurple(1);
             }
             if (e["value"][2] < 10000 && e["value"][2] > 0){
               return colorPurple(.7);
             }
             if (e["value"][2] < 20000 && e["value"][2] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][2] < 50000 && e["value"][2] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][2] < 100000 && e["value"][2] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][2] < 150000 && e["value"][2] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][2] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][3] < -200000){
               return colorRed(1 );
             }
             if (e["value"][3] < -75000 && e["value"][3] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][3] < -25000 && e["value"][3] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][3] < 0 && e["value"][3] > -25000){
               return colorPurple(1);
             }
             if (e["value"][3] < 10000 && e["value"][3] > 0){
               return colorPurple(.7);
             }
             if (e["value"][3] < 20000 && e["value"][3] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][3] < 50000 && e["value"][3] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][3] < 100000 && e["value"][3] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][3] < 150000 && e["value"][3] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][3] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][4] < -200000){
               return colorRed(1 );
             }
             if (e["value"][4] < -75000 && e["value"][4] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][4] < -25000 && e["value"][4] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][4] < 0 && e["value"][4] > -25000){
               return colorPurple(1);
             }
             if (e["value"][4] < 10000 && e["value"][4] > 0){
               return colorPurple(.7);
             }
             if (e["value"][4] < 20000 && e["value"][4] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][4] < 50000 && e["value"][4] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][4] < 100000 && e["value"][4] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][4] < 150000 && e["value"][4] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][4] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][5] < -200000){
               return colorRed(1 );
             }
             if (e["value"][5] < -75000 && e["value"][5] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][5] < -25000 && e["value"][5] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][5] < 0 && e["value"][5] > -25000){
               return colorPurple(1);
             }
             if (e["value"][5] < 10000 && e["value"][5] > 0){
               return colorPurple(.7);
             }
             if (e["value"][5] < 20000 && e["value"][5] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][5] < 50000 && e["value"][5] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][5] < 100000 && e["value"][5] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][5] < 150000 && e["value"][5] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][5] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][6] < -200000){
               return colorRed(1 );
             }
             if (e["value"][6] < -75000 && e["value"][6] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][6] < -25000 && e["value"][6] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][6] < 0 && e["value"][6] > -25000){
               return colorPurple(1);
             }
             if (e["value"][6] < 10000 && e["value"][6] > 0){
               return colorPurple(.7);
             }
             if (e["value"][6] < 20000 && e["value"][6] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][6] < 50000 && e["value"][6] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][6] < 100000 && e["value"][6] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][6] < 150000 && e["value"][6] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][6] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][7] < -200000){
               return colorRed(1 );
             }
             if (e["value"][7] < -75000 && e["value"][7] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][7] < -25000 && e["value"][7] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][7] < 0 && e["value"][7] > -25000){
               return colorPurple(1);
             }
             if (e["value"][7] < 10000 && e["value"][7] > 0){
               return colorPurple(.7);
             }
             if (e["value"][7] < 20000 && e["value"][7] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][7] < 50000 && e["value"][7] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][7] < 100000 && e["value"][7] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][7] < 150000 && e["value"][7] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][7] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][8] < -200000){
               return colorRed(1 );
             }
             if (e["value"][8] < -75000 && e["value"][8] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][8] < -25000 && e["value"][8] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][8] < 0 && e["value"][8] > -25000){
               return colorPurple(1);
             }
             if (e["value"][8] < 10000 && e["value"][8] > 0){
               return colorPurple(.7);
             }
             if (e["value"][8] < 20000 && e["value"][8] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][8] < 50000 && e["value"][8] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][8] < 100000 && e["value"][8] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][8] < 150000 && e["value"][8] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][8] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][9] < -200000){
               return colorRed(1 );
             }
             if (e["value"][9] < -75000 && e["value"][9] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][9] < -25000 && e["value"][9] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][9] < 0 && e["value"][9] > -25000){
               return colorPurple(1);
             }
             if (e["value"][9] < 10000 && e["value"][9] > 0){
               return colorPurple(.7);
             }
             if (e["value"][9] < 20000 && e["value"][9] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][9] < 50000 && e["value"][9] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][9] < 100000 && e["value"][9] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][9] < 150000 && e["value"][9] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][9] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][10] < -200000){
               return colorRed(1 );
             }
             if (e["value"][10] < -75000 && e["value"][10] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][10] < -25000 && e["value"][10] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][10] < 0 && e["value"][10] > -25000){
               return colorPurple(1);
             }
             if (e["value"][10] < 10000 && e["value"][10] > 0){
               return colorPurple(.7);
             }
             if (e["value"][10] < 20000 && e["value"][10] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][10] < 50000 && e["value"][10] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][10] < 100000 && e["value"][10] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][10] < 150000 && e["value"][10] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][10] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][11] < -200000){
               return colorRed(1 );
             }
             if (e["value"][11] < -75000 && e["value"][11] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][11] < -25000 && e["value"][11] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][11] < 0 && e["value"][11] > -25000){
               return colorPurple(1);
             }
             if (e["value"][11] < 10000 && e["value"][11] > 0){
               return colorPurple(.7);
             }
             if (e["value"][11] < 20000 && e["value"][11] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][11] < 50000 && e["value"][11] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][11] < 100000 && e["value"][11] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][11] < 150000 && e["value"][11] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][11] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })
         .transition()
         .delay(750)
         .attr("fill", function(d, i) {
           // cur_country is the current country that needs to be colored
           var cur_country = d.properties.name;

           // e is the element in our data where ["country"] == cur_country
           // ...using _.find(...): https://lodash.com/docs/4.16.6#find
           var e = _.find(data, {"country": cur_country});

           // Check if the country is in our data, if so return a color;
           //                                ...otherwise, return black
           if (e) {
             if (e["value"][12] < -200000){
               return colorRed(1 );
             }
             if (e["value"][12] < -75000 && e["value"][12] > -200000){
               return colorRed(.8 );
             }
             if (e["value"][12] < -25000 && e["value"][12] > -75000){
               return colorRed(.6 );
             }
             if (e["value"][12] < 0 && e["value"][12] > -25000){
               return colorPurple(1);
             }
             if (e["value"][12] < 10000 && e["value"][12] > 0){
               return colorPurple(.7);
             }
             if (e["value"][12] < 20000 && e["value"][12] > 10000){
               return colorPurple(.5);
             }
             if (e["value"][12] < 50000 && e["value"][12] > 20000){
               return colorPurple(.3);
             }
             if (e["value"][12] < 100000 && e["value"][12] > 50000){
               return colorBlue( .6 );
             }
             if (e["value"][12] < 150000 && e["value"][12] > 100000){
               return colorRed(.8 );
             }
             if (e["value"][12] > 150000){
               return colorBlue( 1);
             }
          }
           else   { return "black"; }
         })

         .on("mouseover", function (d) {
           svg.selectAll(".country")
              .filter(function(e){
                  if(d==e){
                    return false;
                  }
                  else {
                    return true;
                  }
              })
              .transition()
              .duration(1000)  // milliseconds (ms), 1000ms == 1sec
              .style("opacity", 0.1)
         })
         .on("mouseout",function (d, i){
           svg.selectAll(".country")
              .transition()
              .duration(1000)  // milliseconds (ms), 1000ms == 1sec
              .style("opacity", 1);
         })




});
  // Scales


};
