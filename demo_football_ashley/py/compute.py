import csv
import json

with open("res/illiniFootballScores_1892_2015.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

for row in data:
    row["IlliniScore"] = int(row["IlliniScore"])
    row["OpponentScore"] = int(row["OpponentScore"])

with open("res/scores.json", "w") as f:
    outdata = json.dumps(data, indent=2)
    f.write(outdata)
