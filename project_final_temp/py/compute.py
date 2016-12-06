import csv
import json

# Reading a CSV file:
#
#with open("res/fileName.csv") as f:
#    reader = csv.DictReader(f)
#    data = [row for row in reader]


# Writing to a JSON file:
#
#with open("res/fileName.json", "w") as f:
#    outdata = json.dumps(data, indent=2)
#    f.write(outdata)

with open("res/nbadata.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

nba = {}
for row in data:

    team = row["Tm"]
    season = row["Season"]


    if team not in nba:
        nba[team] = {}
    if season not in nba[team]:
        nba[team][season] = {
            "FGA": 0,
            "3PA": 0,
            "3P%": 0,
            "distance": 0,
            "3usage": 0
        }

    if row["Season"] == "":
        continue
    if row["Tm"] == "":
        continue
    if row["FG"] == "":
        continue
    if row["FGA"] == "":
        continue
    if row["FG%"] == "":
        continue
    if row["3P"] == "":
        continue
    if row["3PA"] == "":
        continue
    if row["3P%"] == "":
        continue
    if row["Less than 8ft. usage %"] == "":
        continue
    if row["8-16 feet usage %"] == "":
        continue
    if row["16-24 feet usage %"] == "":
        continue
    if row["24+ feet usage %"] == "":
        continue
    if row["Back Court Shots usage %"] == "":
        continue
    if row["Avg. Shot Dis.(ft.)"] == "":
        continue

    nba[team][season]["FGA"] = float(row["FGA"])
    nba[team][season]["3PA"] = float(row["3PA"])
    nba[team][season]["3P%"] = float(row["3P%"])
    nba[team][season]["distance"] = float(row["Avg. Shot Dis.(ft.)"])
    nba[team][season]["3usage"] = float(row["24+ feet usage %"])

teamsList = []

for team in nba:
    for season in nba[team]:
        FGA = nba[team][season]["FGA"]
        threeAttempts = nba[team][season]["3PA"]
        threePercentage = nba[team][season]["3P%"]
        distance = nba[team][season]["distance"]
        threeUsage = nba[team][season]["3usage"]
        teamsList.append({"Team": team, "Season": season, "FGA": FGA, "3PA": threeAttempts, "3P%": threePercentage, "distance": distance, "3 Point usage": threeUsage})

teamsList = sorted(teamsList, key=lambda k: (k["Team"], k["Season"]))

with open("res/NBAAnalysis.json", "w") as f:
    json.dump(teamsList, f, indent=2)
