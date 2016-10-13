# Import networkx for graphs
import networkx as nx

# The interactive story is a directional graph
G = nx.DiGraph()

# Prorgram your story:







#
# Save the graph into the res/if.json
# (This code is required for your story to run in the workbook.)
#
with open("res/if.json", "w") as f:
    # Write the graph in a JSON-writable way:
    # See: https://networkx.github.io/documentation/networkx-1.10/reference/generated/networkx.readwrite.json_graph.node_link_data.html#networkx.readwrite.json_graph.node_link_data
    from networkx.readwrite import json_graph
    data = json_graph.node_link_data(G)

    # Save the JSON-encoded graph to the file
    import json
    json.dump(data, f, indent=2)
