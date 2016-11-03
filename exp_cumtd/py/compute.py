# Import the libraries we will use in this file
import urllib.request
import urllib.parse
import json

# Open and read the file storing the CUMTD key
myKey = open("../static/keys/cumtd.txt", "r").read().strip()

# Construct a Python dictionary for HTTP GET

parameters = {
    "key": myKey,
    "stop_id": "IU"
}

url = " https://developer.cumtd.com/api/v2.2/json/" + "GetDeparturesByStop?" + urllib.parse.urlencode( parameters )

with urllib.request.urlopen(url) as response:
    data_str = response.read().decode("utf-8")
    data = json.loads(data_str)

print(data)

result = []

for i in data["departures"]:
    result.append({
        "route": i["headsign"],
        "expected": i["expected_mins"]
    })



# Save the result JSON
with open("res/timetable.json", "w") as f:
    json.dump(result, f, indent=2)
