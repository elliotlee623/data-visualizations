queue = []
def getTreeOfMoves_generic_getNode(board, turn, parent):
    return {
        "board": board,
        "children": [],
        "score": checkState(board),
        "turn": turn,
        "parent": parent,
        "skip": False
    }


def enqueue_function_dfs(node):
    # For depth first, add children in reverse order to the FRONT of the
    # queue (so the left-most child goes next)
    node["children"].reverse()
    for child in node["children"]:
        queue.insert(0, child)
    node["children"].reverse()

def enqueue_function_bfs(node):
    # For breath-first, always add children at the end of the queue (so that
    # we visit all of the children created before the new children)
    for child in node["children"]:
        queue.append(child)

def getTreeOfMoves_generic(board, turn, enqueue_function):
    root = getTreeOfMoves_generic_getNode(board, turn, None)
    queue.append(root)

    while len(queue) > 0:
        # Get the first node on the queue
        node = queue.pop(0)

        if node["skip"] == True or (node["parent"] != None and node["parent"]["skip"] == True):
            if node["parent"] != None:
                node["parent"]["children"].remove(node)
            continue

        # Check to see if the current node is a winning state
        if (node["score"] == 1 and node["turn"] == "O") or (node["score"] == -1 and node["turn"] == "X"):
            # All siblings should be skipped (we found a winner):
            if node["parent"] != None:
                for sibling in node["parent"]["children"]:
                    sibling["skip"] = True

        # Otherwise, add the children of the current state
        else:
            # Add the children to the tree
            for newBoard in getNextStates(node["board"], node["turn"]):
                child = getTreeOfMoves_generic_getNode(newBoard, swapTurn(node["turn"]), node)
                node["children"].append(child)

            # Ask the enqueue function which order they should be visited
            enqueue_function(node)

    return root
