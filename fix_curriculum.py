import json
import re

with open('curriculum.js', 'r') as f:
    content = f.read()

# We need to extract the JSON object for BSCS and modify it
# It's a JS object, not strict JSON. Let's do it with regex.

# We will just write a patch for BSCS majorCourses
bscs_courses = [
    {"code": "MATH 27", "title": "Analytic Geometry and Calculus I", "units": 3, "year": 1, "sem": "1", "prereqs": []},
    {"code": "CMSC 12", "title": "Foundations of Computer Science", "units": 3, "year": 1, "sem": "1", "prereqs": []},
    {"code": "CMSC 56", "title": "Discrete Mathematical Structures in Computer Science I", "units": 3, "year": 1, "sem": "1", "prereqs": []},
    
    {"code": "MATH 28", "title": "Analytic Geometry and Calculus II", "units": 3, "year": 1, "sem": "2", "prereqs": ["MATH 27"]},
    {"code": "CMSC 21", "title": "Fundamentals of Programming", "units": 3, "year": 1, "sem": "2", "prereqs": ["CMSC 12"]},
    {"code": "CMSC 57", "title": "Discrete Mathematical Structures in Computer Science II", "units": 3, "year": 1, "sem": "2", "prereqs": ["CMSC 56"]},
    
    {"code": "CMSC 22", "title": "Object-Oriented Programming", "units": 3, "year": 2, "sem": "1", "prereqs": ["CMSC 21"]},
    {"code": "CMSC 130", "title": "Logic Design and Digital Computer Circuits", "units": 3, "year": 2, "sem": "1", "prereqs": ["CMSC 21"]},
    
    {"code": "CMSC 23", "title": "Mobile Computing", "units": 3, "year": 2, "sem": "2", "prereqs": ["CMSC 22"]},
    {"code": "CMSC 123", "title": "Data Structures", "units": 3, "year": 2, "sem": "2", "prereqs": ["CMSC 22", "CMSC 57"]},
    {"code": "CMSC 131", "title": "Introduction to Computer Organization and Machine Level Programming", "units": 3, "year": 2, "sem": "2", "prereqs": ["CMSC 130", "CMSC 21"]},
    
    {"code": "CMSC 124", "title": "Design and Implementation of Programming Languages", "units": 3, "year": 3, "sem": "1", "prereqs": ["CMSC 123"]},
    {"code": "CMSC 127", "title": "File Processing and Database Systems", "units": 3, "year": 3, "sem": "1", "prereqs": ["CMSC 22", "CMSC 57"]},
    {"code": "CMSC 132", "title": "Computer Architecture", "units": 3, "year": 3, "sem": "1", "prereqs": ["CMSC 131"]},
    {"code": "CMSC 141", "title": "Automata and Language Theory", "units": 3, "year": 3, "sem": "1", "prereqs": ["CMSC 123"]},
    
    {"code": "CMSC 125", "title": "Operating Systems", "units": 3, "year": 3, "sem": "2", "prereqs": ["CMSC 123", "CMSC 131"]},
    {"code": "CMSC 128", "title": "Introduction to Software Engineering", "units": 3, "year": 3, "sem": "2", "prereqs": ["CMSC 127"]},
    {"code": "CMSC 137", "title": "Data Communications and Networking", "units": 3, "year": 3, "sem": "2", "prereqs": ["CMSC 131"]},
    {"code": "CMSC 142", "title": "Design and Analysis of Algorithms", "units": 3, "year": 3, "sem": "2", "prereqs": ["CMSC 123", "CMSC 57"]},
    
    {"code": "CMSC 198", "title": "Practicum", "units": 3, "year": 3, "sem": "midyear", "prereqs": ["CMSC 128"]},
    
    {"code": "CMSC 150", "title": "Numerical and Symbolic Computation", "units": 3, "year": 4, "sem": "1", "prereqs": ["CMSC 123", "MATH 28"]},
    {"code": "CMSC 173", "title": "Human Computer Interaction", "units": 3, "year": 4, "sem": "1", "prereqs": ["CMSC 128"]},
    {"code": "CMSC 190", "title": "Special Problem", "units": 3, "track": "sp", "year": 4, "sem": "1", "prereqs": ["CMSC 128"]},
    {"code": "STAT 101", "title": "Statistical Methods", "units": 3, "year": 4, "sem": "1", "prereqs": ["MATH 27"]},
    
    {"code": "CMSC 170", "title": "Introduction to Artificial Intelligence", "units": 3, "year": 4, "sem": "2", "prereqs": ["CMSC 123", "CMSC 57"]},
    {"code": "CMSC 180", "title": "Introduction to Parallel Computing", "units": 3, "year": 4, "sem": "2", "prereqs": ["CMSC 125", "CMSC 132"]},
    {"code": "CMSC 200", "title": "Undergraduate Thesis", "units": 6, "track": "thesis", "year": 4, "sem": "2", "prereqs": ["CMSC 128"]},
    {"code": "ENG 10", "title": "Writing of Scientific Papers", "units": 3, "year": 4, "sem": "2", "prereqs": []}
]

import re
match = re.search(r'"majorCourses": \[\s*\{.*?"ENG 10".*?\}\s*\]', content, re.DOTALL)
if match:
    new_courses_json = json.dumps(bscs_courses, indent=6)
    # The output of json.dumps has 4 spaces. Let's make it look like the original
    new_courses_str = '"majorCourses": ' + new_courses_json
    new_content = content[:match.start()] + new_courses_str + content[match.end():]
    with open('curriculum.js', 'w') as f:
        f.write(new_content)
    print("Updated curriculum.js")
else:
    print("Could not find majorCourses array")

