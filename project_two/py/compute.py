import csv
import json
from operator import add

# Reading a CSV file:

with open("res/refugeedata_clean.csv", encoding = "latin-1") as f:
    reader = csv.DictReader(f, 'r')
    data = [row for row in reader]

#init variables of interest
destinations = []
origins = []
destindexes = {}
origindexes = {}


#iterate through data
for row in data:

	dest_country = row["r"]
	origin = row[None][0]
	year_1 = int(row[None][1])
	year_2 = int(row[None][2])
	year_3 = int(row[None][3])
	year_4 = int(row[None][4])
	year_5 = int(row[None][5])
	year_6 = int(row[None][6])
	year_7 = int(row[None][7])
	year_8 = int(row[None][8])
	year_9 = int(row[None][9])
	year10 = int(row[None][10])
	year11 = int(row[None][11])
	year12 = int(row[None][12])
	year13 = int(row[None][13])
	year14 = int(row[None][14])

	#skip headers
	if dest_country == "Territory of Residence":
		continue

	inner_dest = [dest_country, year_1, year_2, year_3, year_4, year_5,
				 year_6, year_7, year_8, year_9, year10, year11, year12, year13, year14]

	inner_orig = [origin, year_1, year_2, year_3, year_4, year_5,
				 year_6, year_7, year_8, year_9, year10, year11, year13, year14]

	if dest_country not in destindexes.keys():
		destinations.append(inner_dest)
		destindexes[dest_country] = destinations.index(inner_dest)
	else:
		destinations[destindexes[dest_country]][1:] = [sum(x) for x in zip(destinations[destindexes[dest_country]][1:], inner_dest[1:])]

	if origin not in origindexes.keys():
		origins.append(inner_orig)
		origindexes[origin] = origins.index(inner_orig)
	else:
		origins[origindexes[origin]][1:] = [sum(x) for x in zip(origins[origindexes[origin]][1:], inner_orig[1:])]


final = []
for dest in destinations:
	country_name = dest[0]
	migrant_data = dest[1:]

	if country_name in origindexes.keys():
		final.append({
            "country": country_name,
            "value": [a - b for a,b in zip(migrant_data, origins[origindexes[country_name]][1:])]})

	else:
		final.append(migrant_data)

for origin in origins:
	country_name = origin[0]
	migrant_data = origin[1:]

	if country_name in destindexes.keys():
		final.append({country_name: [a - b for a,b in zip(destinations[destindexes[country_name]][1:], migrant_data)]})

	else:
		final.append(migrant_data)



#open json file


#Writing to a JSON file:

with open("res/countries.json", "w") as f:
    outdata = json.dumps(final, indent=2)
    f.write(outdata)
