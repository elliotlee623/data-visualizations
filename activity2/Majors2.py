import csv

with open("Majors2.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

majors = {}
majors2 = {}
finalDict = {}

for row in data:

    if row["Total"] == "":
        continue

    majorName = row["Major Name"].strip()
    year = row["Fall"].strip()
    students = row["Total"].strip()
    females = row["Female"].strip()


    if majorName not in majors:
        majors[majorName] = {}

    if year not in majors[majorName]:
        majors[majorName][year] = 0

    majors[majorName][year] += int(students)

for row in data:

    if row["Total"] == "":
        continue

    majorName = row["Major Name"].strip()
    year = row["Fall"].strip()
    students = row["Total"].strip()
    females = row["Female"].strip()


    if majorName not in majors2:
        majors2[majorName] = {}

    if year not in majors2[majorName]:
        majors2[majorName][year] = 0

    majors2[majorName][year] += int(females)

for row in data:

    if row["Total"] == "":
        continue

    majorName = row["Major Name"].strip()
    year = row["Fall"].strip()
    students = row["Total"].strip()
    females = row["Female"].strip()


    if majorName not in finalDict:
        finalDict[majorName] = {}

    if year not in finalDict[majorName]:
        finalDict[majorName][year] = 0

    finalDict[majorName][year] = float((majors2[majorName][year])/(majors[majorName][year]))

majorsList = []

max_f = 0.0
min_f = 1.0


for majorName in finalDict:

    if "2005" not in finalDict[majorName]:
        continue

    if "2015" not in finalDict[majorName]:
        continue

    current = finalDict[majorName]["2015"]

    if finalDict[majorName][year] > max_f:
        max_f = finalDict[majorName][year]

    if finalDict[majorName][year] < min_f:
        min_f = finalDict[majorName][year]


    majorsList.append({
        "major": majorName,
        "max_f": max_f,
        "min_f": min_f,
        "current": current
    })

majorsList = sorted(majorsList,
                    key = lambda k: k["current"],
                    reverse=True)
print(majorsList)
