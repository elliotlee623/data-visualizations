import json
import networkx as nx

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Load the output of Activity 7, which is stored in exp_activity7 directory:
with open("../exp_activity7/res/if.json", "r") as f:
    data = json.load(f)

# Re-construct the graph from JSON
from networkx.readwrite import json_graph
G = json_graph.node_link_graph(data)


# Activity 8:

def getSentenceSentiment(sents):
    print("Doing sentiment analysis...")
    sid = SentimentIntensityAnalyzer()
    sentiment = [sid.polarity_scores(s)["compound"] for s in sents]
    return sentiment

sent_sentiment = []
for node in G.nodes(data=True):
    sentiments = getSentenceSentiment(node[1]["narrative"])
    sent_sentiment.append({
        "Node ID": node[0],
        "Sentiment": sentiments
    })

for edge in G.edges(data=True):
    sentiments = getSentenceSentiment(edge[2]["text"])
    sent_sentiment.append({
        "Source Node":  edge[0],
        "Destination Node": edge[1],
        "Sentiment": sentiments
    })

#
# Save the graph into the res/if-sa.json
# (This code is required for your story to run in the workbook.)
#
with open("res/if-sa.json", "w") as f:
    # Write the graph in a JSON-writable way:
    # See: https://networkx.github.io/documentation/networkx-1.10/reference/generated/networkx.readwrite.json_graph.node_link_data.html#networkx.readwrite.json_graph.node_link_data
    from networkx.readwrite import json_graph
    data = json_graph.node_link_data(G)

    # Save the JSON-encoded graph to the file
    import json
    json.dump(data, f, indent=2)
