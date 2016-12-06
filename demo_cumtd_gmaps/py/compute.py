# Import the libraries we will use in this file
import urllib.request
import urllib.parse
import json
import datetime

myKey = open("../static/keys/cumtd.txt", "r").read().strip()

parameters = {
    "key": myKey,     # CUMTD API key
    "stop_id": "IU",  # IU == Illini Union
    "pt": 60          # Look ahead 60 minutes
}

url = "https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?" + \
        urllib.parse.urlencode( parameters )

# Load the data from the API:
with urllib.request.urlopen(url) as response:
    data_str = response.read().decode("utf-8")
    data = json.loads(data_str)
# Save the data in a file, for debug purposes:
with open("res/cumtd_raw.json", "w") as f:
    json.dump(data, f, indent=2)

# Loop through each entry in the response dictionary's "departure":
buses = []
for d in data["departures"]:
    buses.append({
        "route": d["headsign"],
        "expected": d["expected_mins"],
        "route_color": d["route"]["route_color"]
    })
# Save the data about the buses:
with open("res/buses.json", "w") as f:
    json.dump(buses, f, indent=2)

result = []
# Load the shape for every bus:
for d in data["departures"]:
    # Ensure the bus departure has a "trip" key (fixes KeyError)
    if "trip" not in d:
        continue

    shape_id = d["trip"]["shape_id"]

    # Create a new CUMTD API request for the route shape:
params = {
    "shape_id": shape_id,
    "key": myKey
}
url = "https://developer.cumtd.com/api/v2.2/json/GetShape?" + \
      urllib.parse.urlencode( params )
with urllib.request.urlopen(url) as response:
    data_str = response.read().decode("utf-8")
    shape_data = json.loads(data_str)
# Save the data in a file, for debug purposes:
with open("res/shape_" + shape_id + ".json", "w") as f:
    json.dump(shape_data, f, indent=2)

    # Save the route + shape data, for visualization
result.append({
    "route": d["headsign"],
    "expected": d["expected_mins"],
    "route_color": d["route"]["route_color"],

    "loc": d["location"],
    "shapes": shape_data["shapes"]
})
# Only once we process all of the buses (outside of for-loop),
# save the data about the buses + shape:
with open("res/busesAndShapes.json", "w") as f:
    json.dump(result, f, indent=2)

var mapOptions = {
    center: { lat: 40.108564, lng: -88.227134},
    zoom: 15
};

var map = new google.maps.Map(
    document.getElementById("gmaps"),
    mapOptions
 );

for (var i = 0; i < data.length; i++) {
    var d = data[i];
}
var d_loc = { lat: d.loc.lat, lng: d.loc.lon};
var title = d.route;
var color = d.route_color;

var d_marker = new google.maps.Marker({
     position: d_loc,
     map: map,
     title: title,
     icon: "http://www.googlemapsmarkers.com/v1/" + color + "/"
});

var d_path = [];
d["shapes"].forEach(function (p) {
  d_path.push({
    lat: p["shape_pt_lat"],
    lng: p["shape_pt_lon"]
  });
});
var poly = new google.maps.Polyline({
  path: d_path,
  geodesic: true,
  strokeColor: "#" + color,
  strokeOpacity: 1,
  strokeWeight: 2
});
poly.setMap(map);
