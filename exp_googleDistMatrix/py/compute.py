import urllib.request
import urllib.parse
import json
import networkx as nx
from networkx.readwrite import json_graph

G = nx.DiGraph()

cities = ["New York, NY", "Chicago, IL", "San Francisco, CA"]
cities_encoded = "|".join(cities);

params = {
    "origins": cities_encoded,
    "destinations": cities_encoded,
    "units": "imperial"
}

url = "https://maps.googleapis.com/maps/api/distancematrix/json?" + urllib.parse.urlencode(params)

with urllib.request.urlopen(url) as response:
    data_str = response.read().decode("utf-8")
    data = json.loads(data_str)

G.add_node("New York, NY", narrative = "New York, NY")
G.add_node("Chicago, IL", narrative = "Chicago, IL")
G.add_node("San Francisco, CA", narrative = "San Francisco, CA")

G.add_edge("New York, NY", "Chicago, IL", distance = data["rows"][0]["elements"][1]["distance"]["value"])
G.add_edge("New York, NY", "San Francisco, CA", distance = data["rows"][0]["elements"][2]["distance"]["value"])
G.add_edge("Chicago, IL", "San Francisco, CA", distance = data["rows"][1]["elements"][2]["distance"]["value"])


with open("res/gmatrix.json", "w") as f:
    graphData = json_graph.node_link_data(G)
    json.dump(graphData, f, indent=2)
