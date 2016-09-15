import csv
import json

# Read the CSV file into data, by row
with open("res/fa2014.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

# Write your code here
courses = {}

for row in data:

    subject = row["Course Subject"].strip();
    number = row["Course Number"].strip();
    aPlus = row["A+"].strip();
    a = row["A"].strip();
    aMinus = row["A-"].strip();
    bPlus = row["B+"].strip();
    b = row["B"].strip();
    bMinus = row["B-"].strip();
    cPlus = row["C+"].strip();
    c = row["C"].strip();
    cMinus = row["C-"].strip();
    dPlus = row["D+"].strip();
    d = row["D"].strip();
    dMinus = row["D-"].strip();
    f = row["F"].strip();
    w = row["W"].strip();

    if subject not in courses:
        courses[subject] = {}

    if number not in courses[subject]:
        courses[subject][number] = {
            "numAs": 0,
            "total": 0
        }

    if row["A+"] == "N/A":
        continue

    if row["A"] == "N/A":
        continue

    if row["A-"] == "N/A":
        continue

    if row["B+"] == "N/A":
        continue

    if row["B"] == "N/A":
        continue

    if row["B-"] == "N/A":
        continue

    if row["C+"] == "N/A":
        continue

    if row["C"] == "N/A":
        continue

    if row["C-"] == "N/A":
        continue

    if row["D+"] == "N/A":
        continue

    if row["D"] == "N/A":
        continue

    if row["D-"] == "N/A":
        continue

    if row["F"] == "N/A":
        continue

    if row["W"] == "N/A":
        continue

    courses[subject][number]["numAs"] += (int(row["A+"]) + int(row["A"]) + int(row["A-"]))
    courses[subject][number]["total"] += int(row["A+"]) + int(row["A"]) + int(row["A-"]) + int(row["B+"]) + int(row["B"]) + int(row["B-"]) + int(row["C+"]) + int(row["C"]) + int(row["C-"]) + int(row["D+"]) + int(row["D"]) + int(row["D-"]) + int(row["F"]) + int(row["W"])

for subject in courses:
    for number in courses[subject]:
          c = courses[subject][number]
          if(c["total"] == 0):
              c["pct_A"] = 0
          else:
              c["pct_A"] = int(c["numAs"])/int(c["total"])

courseGrade = []

for subject in courses:
    for number in courses[subject]:
        courseGrade.append({
            "Course Subject": subject,
            "Course Number": number,
            "Percentage A": courses[subject][number]["pct_A"]
        })

courseGrade = sorted(courseGrade,
                    key = lambda k: k["Course Number"],
                    reverse=False)

print(courseGrade)
# Write the courses dictionary to `res/gpa.json`
with open("res/pctA.json", "w") as f:
    json.dump(courses, f, indent=2)
