import json
import networkx as nx

# Load the output of Activity 8, which is stored in exp_activity8 directory
# and then re-construct the graph from JSON:
with open("../exp_activity8/res/if-sa.json", "r") as f:
    data = json.load(f)
from networkx.readwrite import json_graph
G = json_graph.node_link_graph(data)


# == Functions to complete for Activity 9 ==

# Return the start node id from G
def find_start_node_id(G):
    return None

# Return a list of end node ids from G
def find_end_node_ids(G):
    return []

# Return the total sentiment of the path of node ids through G
def find_path_total_sentiment(G, path):
    return 0

# == End of functions to complete for Activity 9 ==


# 1: Find the start node and end node(s)
startNode = find_start_node_id(G)
endNodes = find_end_node_ids(G)

# 2: Find the simple paths between all nodes
pathData = []
for endNode in endNodes:
    paths = nx.all_simple_paths(G, startNode, endNode)
    for path in paths:
        pathData.append({
            "path": path,
            "weight": find_path_total_sentiment(G, path)
        })

# 3: Sort `pathData` for the most positive and most negative paths
pathData = sorted(pathData, key=lambda k: k['weight'])

# 4: Save the graph and the paths
with open("res/paths.json", "w") as f:
    graphData = json_graph.node_link_data(G)
    json.dump({"paths": pathData, "graph": graphData}, f, indent=2)
