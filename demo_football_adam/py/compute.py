import csv
import json

with open("res/illiniFootballScores_1892_2015.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

years = {}
for row in data:
    # Grab rows from data
    year = row["Season"]
    illiniScore = row["IlliniScore"]
    otherScore = row["OpponentScore"]

    # Group by year
    if year not in years:
        years[year] = 0

    # Add diff to the year
    years[year] += int(illiniScore) - int(otherScore)


scoreDiffList = []
for year, diff in years.items():
    scoreDiffList.append({
        "year": year,
        "diff": diff
    })

scoreDiffList = sorted(scoreDiffList, key=lambda k: k['year']) 

with open("res/scoreDiff.json", "w") as f:
    outdata = json.dumps(scoreDiffList, indent=2)
    f.write(outdata)
