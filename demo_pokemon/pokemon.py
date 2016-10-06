# Use this file to start writing your first Python program!

import csv

with open("pokemon.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

grassCount = 0
for row in data:
    if row["Type1"] == "grass" or row["Type2"] == "grass":
        grassCount +=1

waterCount = 0
for row in data:
    if row["Type1"] == "water" or row["Type2"] == "water":
        waterCount +=1


print("Total grass types: " + str(grassCount))
print("Total water types: " + str(waterCount))

if(waterCount > grassCount):
    print("There are " + str(waterCount-grassCount) + " more water types than grass types")
else:
    print("There are " + str(grassCount-waterCount) + " more grass types than water types") 
