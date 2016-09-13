import csv
import json

# Read the CSV file into data, by row
with open("res/fa2014.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

# Write your code here
courses = {}




# Write the courses dictionary to `res/gpa.json`
with open("res/pctA.json", "w") as f:
    json.dump(courses, f, indent=2)
