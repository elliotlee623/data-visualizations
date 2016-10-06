import csv

with open("Majors.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

majors = {}

for row in data:

    if row["Total"] == "":
        continue

    majorName = row["Major Name"].strip()
    year = row["Fall"].strip()
    students = row["Total"].strip()

    if majorName not in majors:
        majors[majorName] = {}

    if year not in majors[majorName]:
        majors[majorName][year] = 0

    majors[majorName][year] += int(students)

majorsList = []

for majorName in majors:

    if "2015" not in majors[majorName]:
        continue
    if "2014" not in majors[majorName]:
        continue

    change = majors[majorName]["2015"] - majors[majorName]["2014"]

    majorsList.append({
        "major": majorName,
        "change": change
    })

majorsList = sorted(majorsList,
                    key = lambda k: k["change"],
                    reverse=True)
print(majorsList)
"""
#Create an empty dictionary
countByYear = {}

for row in data:

    if row["Total"] == "":
        continue
    #Pull out use fields
    year = row["Fall"]
    students = row["Total"]

    #Init our dictionary if the entry doesnt exist
    if year not in countByYear:
        countByYear[year] = 0

    #Update dictionary
    countByYear[year] += int(students)

print(countByYear)

count = 0
for row in data:
    majorName = row["Major Name"]
    students = row["Total"]
    year = row["Fall"]

    if students == "":
        continue

    if year != "2015":
        continue

    count += int(students)

print(count)
"""
