# Import the libraries we will use in this file
import urllib.request
import urllib.parse
import json
import datetime

# Open and read the file storing the CUMTD key:
myKey = open("../static/keys/cumtd.txt", "r").read().strip()

# Construct a Python dictionary for HTTP GET:
parameters = {
    "key": myKey,     # CUMTD API key
    "stop_id": "IU",  # IU == Illini Union
    "pt": 60          # Look ahead 60 minutes
}

# Construct the full API request URL:
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
        "loc": d["location"],
        "route_color": d["route"]["route_color"]
    })

# Save the data about the buses:
with open("res/buses.json", "w") as f:
    json.dump(buses, f, indent=2)


# Load the shape for every bus:
shapes = {}
result = []
for d in data["departures"]:
    # Ensure the bus departure has a "trip" key (fixes KeyError)
    if "trip" not in d:
        continue

    # Check to see if we've seen this shape before (somewhat common, as all
    # routes of the same bus will often contain the same shape).  If we
    # have not seen the shape, get the shape information from CUMTD:
    shape_id = d["trip"]["shape_id"]
    if shape_id not in shapes:
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
            json.dump(data, f, indent=2)

        # Save the shape, so we don't have to look up repeated shapes
        shapes[shape_id] = shape_data["shapes"]

    # Save the route + shape data, for visualization
    result.append({
        "route": d["headsign"],
        "expected": d["expected_mins"],
        "loc": d["location"],
        "route_color": d["route"]["route_color"],
        "shapes": shapes[shape_id]
    })

# Save the data about the buses + shape:
with open("res/busesAndShapes.json", "w") as f:
    json.dump(result, f, indent=2)
