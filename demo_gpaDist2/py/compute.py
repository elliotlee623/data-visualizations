import csv
import json

# Read the CSV file into data, by row
with open("res/fa2014.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]


# gpa map
gpaMap = {
    "A+": 4,
    "A":  4,
    "A-": 3.67,
    "B+": 3.33,
    "B":  3,
    "B-": 2.67,
    "C+": 2.33,
    "C":  2,
    "C-": 1.67,
    "D+": 1.33,
    "D":  1,
    "D-": 0.67,
    "F":  0,
}


# Write your code here
courses = {}
for row in data:
    if row["A+"] == "N/A":
        continue

    courseSubject = row["Course Subject"]
    courseNumber = row["Course Number"]
    courseName = courseSubject + " " + courseNumber

    if courseName not in courses:
        courses[courseName] = {
            "As": 0,
            "Total": 0,
            "gpa_sum": 0
        }

    for columnName in row:
        if columnName in gpaMap:
            courses[courseName]["Total"] += int(row[columnName])
            courses[courseName]["gpa_sum"] += gpaMap[columnName] * int(row[columnName])

    courses[courseName]["As"] += int(row["A+"])
    courses[courseName]["As"] += int(row["A"])


for courseName in courses:
    courses[courseName]["pct_As"] = courses[courseName]["As"] / courses[courseName]["Total"]
    courses[courseName]["avg_gpa"] = courses[courseName]["gpa_sum"] / courses[courseName]["Total"]

courseList = []
for courseName in courses:
    courses[courseName]["name"] = courseName
    courseList.append(
        courses[courseName]
    )

# Write the courses dictionary to `res/gpa.json`
with open("res/gpa.json", "w") as f:
    json.dump(courseList, f, indent=2)
