import json
import networkx as nx

def getBoardState(board):
    """
    for n in range(0,len(board)-3,3):
        if(board[n] == board[n+1] and board[n+1] == board[n+2] and board[n] == "X"):
            return 1
        elif(board[n] == board[n+1] and board[n+1] == board[n+2] and board[n] == "O"):
            return -1
    for n in range(0, len(board)-7):
        if(board[n] == board[n+3] and board[n+3] == board[n+6] and board[n] == "X"):
            return 1
        elif(board[n] == board[n+3] and board[n+3] == board[n+6] and board[n] == "O"):
            return -1
    if(board[0] == board[4] and board[4] == board[8] and board[0] == "X"):
        return 1
    if(board[2] == board[4] and board[4] == board[6] and board[0] == "X"):
        return 1
    if(board[0] == board[4] and board[4] == board[8] and board[0] == "O"):
        return -1
    if(board[2] == board[4] and board[4] == board[6] and board[0] == "O"):
        return -1

    return 0
    """
    setofIndexes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [2,4,6],
        [0,4,8]
    ]

    for indexes in setofIndexes:
        p1 = board[indexes[0]]
        p2 = board[indexes[1]]
        p3 = board[indexes[2]]

        if p1 == p2 and p2 == p3 and p1 == "X":
            return 1
        if p1 == p2 and p2 == p3 and p1 == "O":
            return -1
    return 0

def addNextBoards(G, board, turn):
    return 0

result = getBoardState(["X", "X", "O", "X", "O", "-", "O", "O", "X"])
print(result)
result = getBoardState(["X", "O", "X", "O", "X", "O", "-", "-", "-"])
print(result)
result = getBoardState(["X", "X", "-", "O", "O", "-", "X", "O", "-"])
print(result)
