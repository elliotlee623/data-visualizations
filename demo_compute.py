import csv
import json

with open("C:/Users/Elliot/Documents/GitHub/workbook/exp_activity5/res/illiniFootballScores_1892_2015.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

def didIlliniWin(team, year):
    for row2 in data:
        if row2["Opponent"] == team and
           int(row2["Season"]) == year and
           row2["Result"] == "W":
           return True
    return False

for row in data:
    year = int(row("Season")) -1
    team - row["Opponent"]
    count = 0

    streak = didIlliniWin(team, year)

    while streak == True:
        year = year - 1
        count = count + 1
        streak = didIlliniWin(team, year)

    row["Streak"] = count

with open("C:/Users/Elliot/Documents/GitHub/workbook/exp_activity5/res/scores.json", "w") as f:
    outdata = json.dumps(data, indent=2)
    f.write(outdata)
