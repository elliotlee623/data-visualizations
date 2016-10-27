import urllib.request
import urllib.parse
import json
import networkx as nx
from networkx.readwrite import json_graph










with open("res/gmatrix.json", "w") as f:
    graphData = json_graph.node_link_data(G)
    json.dump(graphData, f, indent=2)
