# Import networkx for graphs
import networkx as nx

# The interactive story is a directional graph
G = nx.DiGraph()

# Prorgram your story:

G.add_node("begin", narrative=open("res/begin.txt").read(), start=True)
G.add_node("left1", narrative=open("res/left1.txt").read())
G.add_node("center1", narrative=open("res/center1.txt").read())
G.add_node("right1", narrative=open("res/right1.txt").read())
G.add_node("fight", narrative=open("res/fight.txt").read())
G.add_node("runRight", narrative=open("res/runRight.txt").read())
G.add_node("runLeft", narrative=open("res/runLeft.txt").read())
G.add_node("tryFight", narrative=open("res/tryFight.txt").read())
G.add_node("tryRun", narrative=open("res/tryRun.txt").read())
G.add_node("riddle", narrative=open("res/riddle.txt").read())
G.add_node("wrong", narrative=open("res/wrong.txt").read())
G.add_node("noBeans", narrative=open("res/noBeans.txt").read())
G.add_node("turnRight", narrative=open("res/turnRight.txt").read())
G.add_node("exit", narrative=open("res/exit.txt").read())
G.add_node("exit2", narrative=open("res/exit2.txt").read())
G.add_node("backToBegin", narrative=open("res/backToBegin.txt").read())

G.add_edge("begin", "left1", text="Jimmy decides to take the left path. ")
G.add_edge("begin", "center1", text="Jimmy decides to go down the center path. ")
G.add_edge("begin", "right1", text="Jimmy decided to take the right path. ")
G.add_edge("left1", "fight", text="Jimmy musters up his courage and decides to fight the man! ")
G.add_edge("left1", "runRight", text="Jimmy decides to take the right path. ")
G.add_edge("left1", "runLeft", text="Jimmy takes the left path! ")
G.add_edge("runLeft", "tryFight", text="Jimmy turns around: with a sword in hand, there's no way he can lose! ")
G.add_edge("runLeft", "tryRun", text="Jimmy decides to keep running: after all, he doesn't even know how to use a sword! ")
G.add_edge("tryRun", "exit", text="Jimmy decides to walk towards the light. ")
G.add_edge("center1", "begin", text="Suddenly, Jimmy begins to feel sleepy. ")
G.add_edge("right1", "riddle", text="Jimmy decides to take the strange man up on his offer and gives up his shoes for the beans. ")
G.add_edge("right1", "noBeans", text="Jimmy decides to turn down the man's offer for a trade. ")
G.add_edge("riddle", "exit2", text="Jimmy decides to answer the riddle. ")
G.add_edge("riddle", "wrong", text="Jimmy decided not to answer the man's riddle. ")
G.add_edge("noBeans", "exit", text="Jimmy decides to take the left path.")
G.add_edge("noBeans", "backToBegin", text="Jimmy decides to turn right. ")
G.add_edge("backToBegin", "begin", text="Restart")


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
