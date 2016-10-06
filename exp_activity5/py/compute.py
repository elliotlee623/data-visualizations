import csv
import json

with open("C:/Users/Elliot/Documents/GitHub/workbook/exp_activity5/res/illiniFootballScores_1892_2015.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

def didIlliniWin(team, year):
    for row2 in data:
        if row2["Opponent"] == team and int(row2["Season"]) == year and row2["Result"] == "W":
           return True
    return False

for row in data:
    year = int(row["Season"]) -1
    team = row["Opponent"]
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


'''
import csv
import json

with open("C:/Users/Elliot/Documents/GitHub/workbook/exp_activity5/res/illiniFootballScores_1892_2015.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader
with open("C:/Users/Elliot/Documents/GitHub/workbook/exp_activity5/res/scores.json", "w") as f:
    outdata = json.dumps(data, indent=2)
    f.write(outdata)

football = {}

for row in data:

    streak = 0
    row["Streak"] = streak

    if row["Note1"] == "":
        continue

    if row["Note2"] == "":
        continue

    if row["Note3"] == "":
        continue


    season = row["Season"].strip()
    date = row["Date"].strip()
    location = row["Location"].strip()
    opponent = row["Opponent"].strip()
    result = row["Result"].strip()
    illiniScore = row["IlliniScore"].strip()
    opponentScore = row["OpponentScore"].strip()
    note1 = row["Note1"].strip()
    note2 = row["Note2"].strip()
    note3 = row["Note3"].strip()


    if opponent not in football:
        football[opponent] = {}

    opponents = football[opponent]

    if season not in opponents:
        opponents[season] = {}

    resultOpponents = opponents[season]

    if result not in resultOpponents:
        resultOpponents[result] = {}

streakList = []

streak = 0
row["Streak"] = streak


for opponent in football:
    previous = ''

    for season in opponents:

        for result in resultOpponents:

            if(resultOpponents[result] == previous):
                streak += 1
            else:
                streak = 0
            previous = resultOpponents[result]


            streakList.append({
                "Streak": streak,
                "Opponent": opponent,
                "IlliniScore": illiniScore,
                "OpponentScore": opponentScore,
                "Date": date,
                "Result": result,
                "Location": location,
                "Note1": note1,
                "Note2": note2,
                "Note3": note3
            })

row["Streak"] = streak
print(streakList)
'''
