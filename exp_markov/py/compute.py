import json
import networkx as nx

G = nx.DiGraph()

for player in [1,2]:
    for marks in range(10+1):
        state = "p" + str(player) + "-" + str(marks)


        G.add_node(state, player=player, marks=marks)

for node in G.nodes(data=True):
    node_id = node[0]
    node_attr = node[1]

    if node_attr["player"] == 1:
        new_player = 2
    else:
        new_player = 1

    if node_attr["marks"] >= 1:
        new_state = "p" + str(new_player) + "-" + str(node_attr["marks"]-1)

        G.add_edge(node_id, new_state)

    if node_attr["marks"] >= 2:
        new_state = "p" + str(new_player) + "-" + str(node_attr["marks"]-2)

        G.add_edge(node_id, new_state)
"""
for node in G.nodes(data=True):
    print(node[0] + "->" + str(G[node[0]]))
"""
#Part 2: Play the state tree
import random

cur = "p1-10"
nexts = list(G[cur].keys())

while len(nexts) > 0:
    next_id = random.choice(nexts)
    print(next_id)
    cur = next_id
    nexts = list(G[cur].keys())
#next_id = random.choice(nexts)
#print(nexts)


with open("res/graph.json", "w") as f:
    graphData = json_graph.node_link_data(G)
    json.dump(graphData, f, indent=2)
