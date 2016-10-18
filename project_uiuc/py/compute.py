import csv
import json

# Reading a CSV file:
#
#with open("res/fileName.csv") as f:
#    reader = csv.DictReader(f)
#    data = [row for row in reader]


# Writing to a JSON file:
#
#with open("res/fileName.json", "w") as f:
#    outdata = json.dumps(data, indent=2)
#    f.write(outdata)

with open("res/fa2014copy.csv") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

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

courses = {}
for row in data:
    #if row["Course Subject"] == "ECE" or "Math":
        if row["Average Grade"] == "N/A":
            continue
        courseSubject = row["Course Subject"]
        courseNumber = row["Course Number"]
        courseInstructor = row["Primary Instructor"]
        Ap = int(row["A+"])
        A = int(row["A"])
        Am = int(row["A-"])
        Bp = int(row["B+"])
        B = int(row["B"])
        Bm = int(row["B-"])
        Cp = int(row["C+"])
        C = int(row["C"])
        Cm = int(row["C-"])
        Dp = int(row["D+"])
        D = int(row["D"])
        Dm = int(row["D-"])
        F = int(row["F"])
        Total = Ap+A+Am+Bp+B+Bm+Cp+C+Cm+Dp+D+Dm+F
        row["Total"] = Total
        if courseSubject not in courses:
            courses[courseSubject] = {}
        if courseNumber not in courses[courseSubject]:
                profCount = 0
                courses[courseSubject][courseNumber]= {}
        if courseInstructor not in courses[courseSubject][courseNumber]:
            profCount += 1
            courses[courseSubject][courseNumber][courseInstructor] = {
            "CountGrades" : 0,
            "CountAs" : 0,
            "Count1" : 0,
            "Count2" : 0,
            "Count3" : 0,
            "Count4" : 0,
            "Count5" : 0,
            "Count6" : 0,
            "Count7" : 0,
            "Count8" : 0,
            "Count9" : 0,
            "gpa_sum" : 0,
            "profCount": profCount
            }
        for columnName in row:
            if columnName in gpaMap:
                courses[courseSubject][courseNumber][courseInstructor]["gpa_sum"] += gpaMap[columnName] * int(row[columnName])

        courses[courseSubject][courseNumber][courseInstructor]["CountGrades"] += Total
        courses[courseSubject][courseNumber][courseInstructor]["CountAs"] += Ap+A+Am
        courses[courseSubject][courseNumber][courseInstructor]["Count1"] += Ap
        courses[courseSubject][courseNumber][courseInstructor]["Count2"] += Ap+A
        courses[courseSubject][courseNumber][courseInstructor]["Count3"] += Ap+A+Am
        courses[courseSubject][courseNumber][courseInstructor]["Count4"] += Ap+A+Am+Bp
        courses[courseSubject][courseNumber][courseInstructor]["Count5"] += Ap+A+Am+Bp+B
        courses[courseSubject][courseNumber][courseInstructor]["Count6"] += Ap+A+Am+Bp+B+Bm
        courses[courseSubject][courseNumber][courseInstructor]["Count7"] += Ap+A+Am+Bp+B+Bm+Cp
        courses[courseSubject][courseNumber][courseInstructor]["Count8"] += Ap+A+Am+Bp+B+Bm+Cp+C
        courses[courseSubject][courseNumber][courseInstructor]["Count9"] += Ap+A+Am+Bp+B+Bm+Cp+C+Cm
        courses[courseSubject][courseNumber][courseInstructor]["per_A"] = courses[courseSubject][courseNumber][courseInstructor]["CountAs"]/courses[courseSubject][courseNumber][courseInstructor]["CountGrades"]
        courses[courseSubject][courseNumber][courseInstructor]["avg_gpa"] = courses[courseSubject][courseNumber][courseInstructor]["gpa_sum"]/courses[courseSubject][courseNumber][courseInstructor]["CountGrades"]
        courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"] = courses[courseSubject][courseNumber][courseInstructor]["CountGrades"]/2
        courses[courseSubject][courseNumber][courseInstructor]["Median"] = ""

        for courseInstructor in courses[courseSubject][courseNumber]:
            if courses[courseSubject][courseNumber][courseInstructor]["Count1"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "A+"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count2"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "A"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count3"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "A-"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count4"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "B+"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count5"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "B"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count6"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "B-"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count7"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "C+"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count8"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "C"
            elif courses[courseSubject][courseNumber][courseInstructor]["Count9"] > courses[courseSubject][courseNumber][courseInstructor]["MedianPlace"]:
                courses[courseSubject][courseNumber][courseInstructor]["Median"] = "C-"


coursesList = []
for courseSubject in courses:

    """# waf:
    coursesList.append(courses[courseSubject])
    continue
    # /waf"""

    for courseNumber in courses[courseSubject]:
        for courseInstructor in courses[courseSubject][courseNumber]:
            per_A = courses[courseSubject][courseNumber][courseInstructor]["per_A"]
            avg_gpa = courses[courseSubject][courseNumber][courseInstructor]["avg_gpa"]
            profCount = courses[courseSubject][courseNumber][courseInstructor]["profCount"]
            median_Grade = courses[courseSubject][courseNumber][courseInstructor]["Median"]
            coursesList.append({"Subject":courseSubject ,"Class":courseSubject + courseNumber ,"Instructor":courseInstructor,"per_A":per_A,"avg_gpa":avg_gpa,"profCount":profCount,"median_Grade":median_Grade})

coursesList = sorted(coursesList, key=lambda k: k["Class"])

with open("res/GradeAnalysis.json", "w") as f:
    json.dump(coursesList, f, indent=2)
