# Import the libraries we will use in this file
import urllib.request
import urllib.parse
import json

# Open and read the file storing the CUMTD key
myKey = open("../static/keys/cumtd.txt", "r").read().strip()

# Construct a Python dictionary for HTTP GET







# Save the result JSON
with open("res/timetable.json", "w") as f:
    json.dump(result, f, indent=2)
