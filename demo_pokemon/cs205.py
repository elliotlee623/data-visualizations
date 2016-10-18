# Use this file to start writing your first Python program!

import csv

with open("cs205.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

for row in data:
    if row["Name"] == "Elliot":
        myrow = row

for row in data:
    counter = 0
    print( row["Name"])

    for column in row:
        if myrow[column] == row[column]:
            counter += 1

    print( counter )
