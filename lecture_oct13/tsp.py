import networkx as nx
from itertools import permutations

G = nx.Graph()

G.add_node("A")
G.add_node("B")
G.add_node("C")
G.add_node("D")
G.add_node("E")
G.add_node("F")
G.add_node("G")

G.add_edge("A", "B", weight = 3)
G.add_edge("A", "E", weight = 4)
G.add_edge("A", "G", weight = 5)

G.add_edge("B", "D", weight = 10)
G.add_edge("B", "E", weight = 8)

G.add_edge("D", "E", weight = 5)
G.add_edge("D", "C", weight = 8)

G.add_edge("C", "E", weight = 3)
G.add_edge("C", "G", weight = 7)

G.add_edge("F", "G", weight = 3)

for path in permutations(G.nodes()):
    sum = 0
    valid = True
    for i in range(len(path)-1):
        n_i = path[i]
        n_j = path[i+1]
        if G.has_edge(n_i, n_j):
            edge = G[n_i][n_j]
            sum += edge["weight"]
        else:
            valid = False

    if valid:
        print(path)
        print(sum)
