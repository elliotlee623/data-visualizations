import csv
import json

with open("res/uiuc_demographics_2005_15.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

majors = {}
for row in data:
    majorName = row["Major Name"].strip()
    year = row["Fall"].strip()
    degree = row["Degree"].strip()

    # Skip empty rows
    if majorName == "":
        continue

    # Each entry in majors is a dictionary for a major...
    if majorName not in majors:
        majors[majorName] = {}
    major = majors[majorName]

    # Each entry in majors[] is a dictionary for a year...
    if year not in major:
        major[year] = {
            "female": 0,
            "male": 0,
            "total": 0
        }

    # Tally the male and female numbers
    major[year]["female"] += int(row["Female"])
    major[year]["male"] += int(row["Male"])

# Compute the %_female
for majorName in majors:
    major = majors[majorName]
    for year in major:
        d = major[year]
        d["pct_f"] = d["female"] / (d["male"] + d["female"])
        d["total"] = d["male"] + d["female"]

genderDiversityList = []
# Compile the list of max/min
for majorName in majors:
    major = majors[majorName]

    # Skip years without 2015 majors
    if "2015" not in major:
        continue

    # Find max/min
    pct_f_max = 0
    pct_f_min = 1

    for year in major:
        d = major[year]
        if d["pct_f"] > pct_f_max:
            pct_f_max = d["pct_f"]
        if d["pct_f"] < pct_f_min:
            pct_f_min = d["pct_f"]

    # Write data to the list
    genderDiversityList.append({
        "major": majorName,
        "max_female_pct": pct_f_max,
        "min_female_pct": pct_f_min,
        "current_female_pct": major["2015"]["pct_f"]
    })

# Write the list as a JSON:
with open("res/genderDiversity.json", "w") as f:
    json.dump(genderDiversityList, f, indent=2)
