import json
import networkx as nx

G = nx.DiGrpah()







with open("res/graph.json", "w") as f:
    graphData = json_graph.node_link_data(G)
    json.dump(graphData, f, indent=2)
