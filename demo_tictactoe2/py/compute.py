import json
import networkx as nx


def getBoardState(board):
    indexesToCheck = [
        # Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        # Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        # Diagonal
        [0, 4, 8],
        [2, 4, 6],
    ]

    for indexes in indexesToCheck:
        p1 = board[ indexes[0] ]
        p2 = board[ indexes[1] ]
        p3 = board[ indexes[2] ]

        if p1 == p2 and p2 == p3 and p1 == "X":
            return 1
        elif p1 == p2 and p2 == p3 and p1 == "O":
            return -1

    return 0


nextBoardID = 0
def getBoardID():
    global nextBoardID
    nextBoardID += 1
    return nextBoardID


def addNextBoards(G, board, board_id, turn):
    # Find the next player's turn
    nextTurn = "X"
    if turn == "X":
        nextTurn = "O"

    for i in range(len(board)):
        if board[i] == "-":
            newBoard = list(board)
            newBoard[i] = turn
            newBoard_id = getBoardID()

            G.add_node( newBoard_id, board=newBoard, nextTurn=nextTurn )
            G.add_edge( board_id, newBoard_id, move=turn )

            addNextBoards(G, newBoard, newBoard_id, nextTurn)


G = nx.DiGraph()

root = ["X", "X", "O", "-", "X", "-", "O", "-", "-"]
root_id = getBoardID()
G.add_node( root_id, board=root, nextTurn="O" )
addNextBoards(G, root, root_id, "O")



with open("res/tree.json", "w") as f:
    from networkx.readwrite import json_graph
    data = json_graph.tree_data(G, root=1)
    json.dump(data, f, indent=2)
