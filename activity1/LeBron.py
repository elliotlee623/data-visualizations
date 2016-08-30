# Use this file to start writing your first Python program!

import csv

with open("LeBron.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]
"""
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
"""

for row in data:
    if row["Season"] == "Career":
        myrow = row

FGcounter = 0
for row in data:

    if row["FG%"] > myrow["FG%"]:
        FGcounter += 1

ThreePcounter = 0
for row in data:

    if row["3P%"] > myrow["3P%"]:
        ThreePcounter += 1

TwoPcounter = 0
for row in data:

    if row["2P%"] > myrow["2P%"]:
        TwoPcounter += 1

Effective = 0
for row in data:

    if row["eFG%"] > myrow["eFG%"]:
        Effective += 1

FT = 0
for row in data:

    if row["FT%"] > myrow["FT%"]:
        FT += 1

Rebounds = 0
for row in data:

    if row["TRB"] > myrow["TRB"]:
        Rebounds += 1

Assists = 0
for row in data:

    if row["AST"] > myrow["AST"]:
        Assists += 1

Steals = 0
for row in data:

    if row["STL"] > myrow["STL"]:
        Steals += 1

Blocks = 0
for row in data:

    if row["BLK"] > myrow["BLK"]:
        Blocks += 1

TOV = 0
for row in data:

    if row["TOV"] > myrow["TOV"]:
        TOV += 1

Fouls = 0
for row in data:

    if row["PF"] > myrow["PF"]:
        Fouls += 1

Points = 0
for row in data:

    if row["PTS"] > myrow["PTS"]:
        Points += 1

print("Number of seasons with FG percentage greater than career average: " + str(FGcounter))
print("Number of seasons with 3 point FG percentage greater than career average: " + str(ThreePcounter))
print("Number of seasons with 2 point FG percentage greater than career average: " + str(TwoPcounter))
print("Number of seasons with effective FG percentage greater than career average: " + str(Effective))
print("Number of seasons with free throw percentage greater than career average: " + str(FT))
print("Number of seasons with rebounds greater than career average: " + str(Rebounds))
print("Number of seasons with assists greater than career average: " + str(Assists))
print("Number of seasons with blocks greater than career average: " + str(Blocks))
print("Number of seasons with turnovers greater than career average: " + str(TOV))
print("Number of seasons with Personal Fouls greater than career average: " + str(Fouls))
print("Number of seasons with points greater than career average: " + str(Points))
