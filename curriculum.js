// UPLB Curriculum Database
// Complete undergraduate programs for University of the Philippines Los Baños
// NOTE: This is UPLB only - not UP Diliman, UP Manila, etc.

const UPLB_PROGRAMS = {
  "BSCS": {
    "code": "BSCS",
    "name": "BS Computer Science",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 130,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "CMSC 200",
        "freeElectiveUnits": 15
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "CMSC 190",
        "freeElectiveUnits": 18
      }
    },
    "defaultTrack": "sp",
    "majorCourses": [
      {
            "code": "MATH 27",
            "title": "Analytic Geometry and Calculus I",
            "units": 3,
            "year": 1,
            "sem": "1",
            "prereqs": []
      },
      {
            "code": "CMSC 12",
            "title": "Foundations of Computer Science",
            "units": 3,
            "year": 1,
            "sem": "1",
            "prereqs": []
      },
      {
            "code": "CMSC 56",
            "title": "Discrete Mathematical Structures in Computer Science I",
            "units": 3,
            "year": 1,
            "sem": "1",
            "prereqs": []
      },
      {
            "code": "MATH 28",
            "title": "Analytic Geometry and Calculus II",
            "units": 3,
            "year": 1,
            "sem": "2",
            "prereqs": [
                  "MATH 27"
            ]
      },
      {
            "code": "CMSC 21",
            "title": "Fundamentals of Programming",
            "units": 3,
            "year": 1,
            "sem": "2",
            "prereqs": [
                  "CMSC 12"
            ]
      },
      {
            "code": "CMSC 57",
            "title": "Discrete Mathematical Structures in Computer Science II",
            "units": 3,
            "year": 1,
            "sem": "2",
            "prereqs": [
                  "CMSC 56"
            ]
      },
      {
            "code": "CMSC 22",
            "title": "Object-Oriented Programming",
            "units": 3,
            "year": 2,
            "sem": "1",
            "prereqs": [
                  "CMSC 21"
            ]
      },
      {
            "code": "CMSC 130",
            "title": "Logic Design and Digital Computer Circuits",
            "units": 3,
            "year": 2,
            "sem": "1",
            "prereqs": [
                  "CMSC 21"
            ]
      },
      {
            "code": "CMSC 23",
            "title": "Mobile Computing",
            "units": 3,
            "year": 2,
            "sem": "2",
            "prereqs": [
                  "CMSC 22"
            ]
      },
      {
            "code": "CMSC 123",
            "title": "Data Structures",
            "units": 3,
            "year": 2,
            "sem": "2",
            "prereqs": [
                  "CMSC 22",
                  "CMSC 57"
            ]
      },
      {
            "code": "CMSC 131",
            "title": "Introduction to Computer Organization and Machine Level Programming",
            "units": 3,
            "year": 2,
            "sem": "2",
            "prereqs": [
                  "CMSC 130",
                  "CMSC 21"
            ]
      },
      {
            "code": "CMSC 124",
            "title": "Design and Implementation of Programming Languages",
            "units": 3,
            "year": 3,
            "sem": "1",
            "prereqs": [
                  "CMSC 123"
            ]
      },
      {
            "code": "CMSC 127",
            "title": "File Processing and Database Systems",
            "units": 3,
            "year": 3,
            "sem": "1",
            "prereqs": [
                  "CMSC 22",
                  "CMSC 57"
            ]
      },
      {
            "code": "CMSC 132",
            "title": "Computer Architecture",
            "units": 3,
            "year": 3,
            "sem": "1",
            "prereqs": [
                  "CMSC 131"
            ]
      },
      {
            "code": "CMSC 141",
            "title": "Automata and Language Theory",
            "units": 3,
            "year": 3,
            "sem": "1",
            "prereqs": [
                  "CMSC 123"
            ]
      },
      {
            "code": "CMSC 125",
            "title": "Operating Systems",
            "units": 3,
            "year": 3,
            "sem": "2",
            "prereqs": [
                  "CMSC 123",
                  "CMSC 131"
            ]
      },
      {
            "code": "CMSC 128",
            "title": "Introduction to Software Engineering",
            "units": 3,
            "year": 3,
            "sem": "2",
            "prereqs": [
                  "CMSC 127"
            ]
      },
      {
            "code": "CMSC 137",
            "title": "Data Communications and Networking",
            "units": 3,
            "year": 3,
            "sem": "2",
            "prereqs": [
                  "CMSC 131"
            ]
      },
      {
            "code": "CMSC 142",
            "title": "Design and Analysis of Algorithms",
            "units": 3,
            "year": 3,
            "sem": "2",
            "prereqs": [
                  "CMSC 123",
                  "CMSC 57"
            ]
      },
      {
            "code": "CMSC 198",
            "title": "Practicum",
            "units": 3,
            "year": 3,
            "sem": "midyear",
            "prereqs": [
                  "CMSC 128"
            ]
      },
      {
            "code": "CMSC 150",
            "title": "Numerical and Symbolic Computation",
            "units": 3,
            "year": 4,
            "sem": "1",
            "prereqs": [
                  "CMSC 123",
                  "MATH 28"
            ]
      },
      {
            "code": "CMSC 173",
            "title": "Human Computer Interaction",
            "units": 3,
            "year": 4,
            "sem": "1",
            "prereqs": [
                  "CMSC 128"
            ]
      },
      {
            "code": "CMSC 190",
            "title": "Special Problem",
            "units": 3,
            "track": "sp",
            "year": 4,
            "sem": "1",
            "prereqs": [
                  "CMSC 128"
            ]
      },
      {
            "code": "STAT 101",
            "title": "Statistical Methods",
            "units": 3,
            "year": 4,
            "sem": "1",
            "prereqs": [
                  "MATH 27"
            ]
      },
      {
            "code": "CMSC 170",
            "title": "Introduction to Artificial Intelligence",
            "units": 3,
            "year": 4,
            "sem": "2",
            "prereqs": [
                  "CMSC 123",
                  "CMSC 57"
            ]
      },
      {
            "code": "CMSC 180",
            "title": "Introduction to Parallel Computing",
            "units": 3,
            "year": 4,
            "sem": "2",
            "prereqs": [
                  "CMSC 125",
                  "CMSC 132"
            ]
      },
      {
            "code": "CMSC 200",
            "title": "Undergraduate Thesis",
            "units": 6,
            "track": "thesis",
            "year": 4,
            "sem": "2",
            "prereqs": [
                  "CMSC 128"
            ]
      },
      {
            "code": "ENG 10",
            "title": "Writing of Scientific Papers",
            "units": 3,
            "year": 4,
            "sem": "2",
            "prereqs": []
      }
],
    "requiredCodes": [
      "MATH 27",
      "MATH 28",
      "CMSC 12",
      "CMSC 21",
      "CMSC 22",
      "CMSC 23",
      "CMSC 56",
      "CMSC 57",
      "CMSC 100",
      "CMSC 123",
      "CMSC 124",
      "CMSC 125",
      "CMSC 127",
      "CMSC 128",
      "CMSC 130",
      "CMSC 131",
      "CMSC 132",
      "CMSC 137",
      "CMSC 141",
      "CMSC 142",
      "CMSC 150",
      "CMSC 170",
      "CMSC 173",
      "CMSC 180",
      "STAT 101",
      "ENG 10"
    ]
  },
  "BSMATH": {
    "code": "BSMATH",
    "name": "BS Mathematics",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 129,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "MATH 200",
        "freeElectiveUnits": 9,
        "majorElectiveUnits": 6
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "MATH 190",
        "freeElectiveUnits": 9,
        "majorElectiveUnits": 9
      }
    },
    "defaultTrack": "sp",
    "majorCourses": [
      {
        "code": "MATH 20",
        "title": "The Landscape of Mathematics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 36",
        "title": "Mathematical Analysis I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/PhilippineHistory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 MATH 37. Mathematical Analysis II",
        "title": "3 MATH 37. Mathematical Analysis II 5 STAT 101. Statistical Methods 3 BIO 11.1 Investigative Biology Laboratory 3 CHEM 18.1. University Chemistry Lab 3 ARTS 1. Critical Perspectives in the Arts (2) GE Elective",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Hu Activities 16",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 2 2 3 3 man Kinetics (2) 18",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "MATH 38",
        "title": "Mathematical Analysis III",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATH 37"
        ]
      },
      {
        "code": "MATH 101",
        "title": "Logic and Set Theory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATH 27",
          "MATH 36"
        ]
      },
      {
        "code": "PHYS 51",
        "title": "Elements of Physics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 51.1",
        "title": "Elements of Physics Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activitie",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "5    MATH 103. Elementary Theory of Numbers",
        "title": "5    MATH 103. Elementary Theory of Numbers 3    MATH 138. Introductory Topology 4    MATH 141. Introductory Combinatorics 1    AMAT 152. Fundamentals of Mathematical Comput 3    STS 1. Science, Technology, and Society s   (2) GE Elective",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (3) Activities",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Training Service Program II 16",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 ing 3 3 Human Kinetics (2) (3) 18",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "MATH 111",
        "title": "Modern Algebra I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MATH 101"
        ]
      },
      {
        "code": "MATH 155",
        "title": "Advanced Calculus I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MATH 38",
          "MATH 101"
        ]
      },
      {
        "code": "MATH 195",
        "title": "Research Methods in Mathematics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MATH 101",
          "MATH 111"
        ]
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication Major Elective",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     MATH 120. Linear Algebra",
        "title": "3     MATH 120. Linear Algebra 3     MATH 133.Euclidean and Non-Euclidean Geometry 3     MATH 151. Ordinary Differential Equations 3     MATH Major Elective 3     COMA 150. Workplace Communication 3 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3     MATH 198. Practicum",
        "title": "3     MATH 198. Practicum 3 3 3 3 15",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "MATH 135",
        "title": "Projective Geometry",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "MATH 120"
        ]
      },
      {
        "code": "MATH 165",
        "title": "Complex Analysis I",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "MATH 155"
        ]
      },
      {
        "code": "MATH 181",
        "title": "Introduction to Probability Theory Major Elective",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "MATH 38"
        ]
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 MATH 190. Special Problems",
        "title": "3 MATH 190. Special Problems 3 MATH 192. Foundations of Mathematics 3 MATH 199. Undergraduate Seminar 3 Major Elective 3 Elective 15",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 1 3 3 13",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "MATH 20",
      "MATH 36",
      "CHEM 18",
      "KAS 1/HIST 1",
      "ETHICS 1",
      "3 MATH 37. Mathematical Analysis II",
      "3",
      "MATH 38",
      "MATH 101",
      "PHYS 51",
      "PHYS 51.1",
      "GE",
      "5    MATH 103. Elementary Theory of Numbers",
      "3",
      "MATH 111",
      "MATH 155",
      "MATH 195",
      "PI 10",
      "COMM 10",
      "3     MATH 120. Linear Algebra",
      "3     MATH 198. Practicum",
      "MATH 135",
      "MATH 165",
      "MATH 181",
      "Elective",
      "3 MATH 190. Special Problems",
      "3"
    ]
  },
  "BSAPMATH": {
    "code": "BSAPMATH",
    "name": "BS Applied Mathematics",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 131,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "AMAT 200",
        "freeElectiveUnits": 9,
        "majorElectiveUnits": 12
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "AMAT 190",
        "freeElectiveUnits": 12,
        "majorElectiveUnits": 15
      }
    },
    "defaultTrack": "sp",
    "majorCourses": [
      {
        "code": "AMAT 19",
        "title": "Finite Mathematics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 36",
        "title": "Mathematical Analysis I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    MATH 37. Mathematical Analysis II",
        "title": "3    MATH 37. Mathematical Analysis II 5    STAT 101. Statistical Methods 3    BIO 11.1. Investigative Biology Laboratory 3    CHEM 18.1. University Chemistry Laboratory 3    ARTS 1. Critical Perspectives in the Arts (2) GE Elective",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced 17 Human Kinetics Activities",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 2 2 3 3 (2) 16",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "AMAT 110",
        "title": "Mathematical Modeling",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "AMAT 105"
        ]
      },
      {
        "code": "MATH 38",
        "title": "Mathematical Analysis III",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATH 37"
        ]
      },
      {
        "code": "MATH 101",
        "title": "Logic and Set Theory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATH 27",
          "MATH 36"
        ]
      },
      {
        "code": "PHYS 51",
        "title": "Elements of Physics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 51.1",
        "title": "Elements of Physics Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    AMAT 105. Matrices and Applications",
        "title": "3    AMAT 105. Matrices and Applications 5    AMAT 112. Introduction to Mathematical Optimization 3    AMAT 152. Fundamentals of Mathematical Computing 4    AMAT 170. Theory of Interest 1    STS 1. Science, Technology, and Society (2)",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (3) Human Kinetics Activities 16 NSTP 2. National Training Service Program II",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 (2) (3) 18",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "MATH 151",
        "title": "Ordinary Differential Equations",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MATH 38",
          "MATH 101"
        ]
      },
      {
        "code": "MATH 174",
        "title": "Numerical Analysis I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MATH 38",
          "AMAT 152"
        ]
      },
      {
        "code": "MATH 181",
        "title": "Introduction to Probability Theory",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MATH 38"
        ]
      },
      {
        "code": "Elective",
        "title": "(AMAT/MATH)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    MATH 155. Advanced Calculus I",
        "title": "3    MATH 155. Advanced Calculus I 3    MATH 175. Numerical Analysis II 3    MATH 195. Research Methods in Mathematics 3    Elective (AMAT/MATH) 3",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "COMA 150",
        "title": "Workplace Communication 3 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3     AMAT 198. Practicum",
        "title": "3     AMAT 198. Practicum 3 3 3 3 15",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(AMAT/MATH)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(AMAT/MATH)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 AMAT 190. Special Problems",
        "title": "3 AMAT 190. Special Problems 3 AMAT 199. Undergraduate Seminar 3 Elective (AMAT/MATH) 3 Elective 3 Elective 15",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 1 3 3 3 13",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "AMAT 19",
      "MATH 36",
      "CHEM 18",
      "KAS 1/HIST 1",
      "ETHICS 1",
      "3    MATH 37. Mathematical Analysis II",
      "3",
      "AMAT 110",
      "MATH 38",
      "MATH 101",
      "PHYS 51",
      "PHYS 51.1",
      "3    AMAT 105. Matrices and Applications",
      "GE",
      "3",
      "MATH 151",
      "MATH 174",
      "MATH 181",
      "Elective",
      "COMM 10",
      "GE",
      "3    MATH 155. Advanced Calculus I",
      "COMA 150",
      "3     AMAT 198. Practicum",
      "Elective",
      "Elective",
      "PI 10",
      "Elective",
      "Elective",
      "3 AMAT 190. Special Problems",
      "3"
    ]
  },
  "BSSTAT": {
    "code": "BSSTAT",
    "name": "BS Statistics",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 143,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyda Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippin History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 30",
        "title": "Genetics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 101",
        "title": "Statistical Methods",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "y",
        "title": "y 3     ARTS 1. Critical Perspectives in the Arts e 3",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective 3 MATH 28. Analytic Geometry and Calculus III 3 CMSC 12. Foundations of Computer Science 3 STAT 162. Experimental Designs",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (2) Human Kinetics Activities 15",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "STAT 135",
        "title": "Logic and Matrix Algebra 3 3     in Statistics 3     STAT 182. Statistical Packages 3 3 3 (2) 15",
        "units": 6,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CMSC 21",
        "title": "Fundamentals of Programming",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CMSC 12"
        ]
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 144",
        "title": "Introductory Statistical Theory I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATH 28",
          "STAT 101"
        ]
      },
      {
        "code": "STAT 168",
        "title": "Response Surface Methodology",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "STAT 162"
        ]
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 MATH 182. Introduction to Stochastic Processes",
        "title": "3 MATH 182. Introduction to Stochastic Processes 3 CMSC 22. Object-Oriented Programming 3 ABME 10. Foundations of Entrepreneurship 3 STAT 145. Introductory Statistical Theory II 3 STAT 163. Survey Designs",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (2) Human Kinetics Activities 15 NSTP 1. National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3     GE Elective",
        "title": "3     GE Elective 3     GE Elective 3 3 3 (2) (3) 15",
        "units": 6,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "Track",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 146",
        "title": "Introductory Statistical Theory III",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "STAT 145"
        ]
      },
      {
        "code": "STAT 173",
        "title": "Survey Operations",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "STAT 163"
        ]
      },
      {
        "code": "STAT 175",
        "title": "Analysis of Multivariate Data",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "STAT 151"
        ]
      },
      {
        "code": "STAT 181",
        "title": "Statistical Computing",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "STAT 145",
          "STAT 182"
        ]
      },
      {
        "code": "NSTP 2",
        "title": "National Training Service Program II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "Track 3     CMSC 127. File Processing and Database Systems",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "STAT 147",
        "title": "Introduction to the Theory of 3    Nonparametric Statistics 3    STAT 151. Applied Regression and Correlation 3    STAT 156. Introductory Time Series Analysis 3 (3) 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3     STAT 198. Practicum",
        "title": "3     STAT 198. Practicum 3 3 3 3 15",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "Track",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 148",
        "title": "Introductory Bayesian Statistics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 165",
        "title": "Categorical Data Analysis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "STAT 151"
        ]
      },
      {
        "code": "STAT 190",
        "title": "Special Problem",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 191",
        "title": "Special Topics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 174",
        "title": "Introductory Biostatistics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "STAT 145"
        ]
      },
      {
        "code": "STAT 192.1",
        "title": "Statistical Consulting Laboratory",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    PI 10. The Life and Works of Jose Rizal",
        "title": "3    PI 10. The Life and Works of Jose Rizal 3    STAT 157. Financial Risk Analysis 3    STAT 167. Statistical Quality Control 3    STAT 183. Introductory Data Analytics 1    STAT 190. Special Problem 3    STAT 199. Undergraduate Seminar 3 1 20",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 2 1 15",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ETHICS 1",
      "KAS 1/HIST 1",
      "MATH 27",
      "BIO 30",
      "STAT 101",
      "y",
      "GE",
      "STAT 135",
      "STS 1",
      "CMSC 21",
      "ECON 11",
      "STAT 144",
      "STAT 168",
      "3 MATH 182. Introduction to Stochastic Processes",
      "3     GE Elective",
      "COMM 10",
      "Elective",
      "STAT 146",
      "STAT 173",
      "STAT 175",
      "STAT 181",
      "3",
      "Elective",
      "STAT 147",
      "3     STAT 198. Practicum",
      "Elective",
      "ENG 10",
      "STAT 148",
      "STAT 165",
      "STAT 190",
      "STAT 191",
      "STAT 174",
      "STAT 192.1",
      "3    PI 10. The Life and Works of Jose Rizal",
      "3"
    ]
  },
  "BSMST": {
    "code": "BSMST",
    "name": "BS Mathematics and Science Teaching",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 150,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 28",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "MATH 27"
        ]
      },
      {
        "code": "MATH 36",
        "title": "Mathematical Analysis I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "MATH 27"
        ]
      },
      {
        "code": "MATH 37",
        "title": "Mathematical Analysis II",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "MATH 27"
        ]
      },
      {
        "code": "MATH 114",
        "title": "Differential Equations",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATH 27"
        ]
      },
      {
        "code": "STAT 101",
        "title": "Statistical Methods",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "EDUC 100",
        "title": "The Teaching Profession",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EDUC 101",
        "title": "The Child and Adolescent Learner",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "EDUC 100"
        ]
      },
      {
        "code": "EDUC 102",
        "title": "Facilitating Learning",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "EDUC 100"
        ]
      },
      {
        "code": "EDUC 103",
        "title": "Curriculum Development",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "EDUC 100"
        ]
      },
      {
        "code": "EDUC 110",
        "title": "Principles of Teaching",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "EDUC 100"
        ]
      },
      {
        "code": "EDUC 160",
        "title": "Educational Assessment",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "EDUC 100"
        ]
      },
      {
        "code": "EDUC 190",
        "title": "Practice Teaching",
        "units": 6,
        "gradeType": "S/U",
        "year": 4,
        "sem": "1",
        "prereqs": [
          "EDUC 100"
        ]
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "MATH 27",
      "MATH 28",
      "MATH 36",
      "MATH 37",
      "MATH 114",
      "STAT 101",
      "EDUC 100",
      "EDUC 101",
      "EDUC 102",
      "EDUC 103",
      "EDUC 110",
      "EDUC 160",
      "EDUC 190",
      "ENG 10"
    ]
  },
  "BSBIO": {
    "code": "BSBIO",
    "name": "BS Biology",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 143,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 25",
        "title": "Fundamental Calculus",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MCB 11",
        "title": "Biology and Applications of Microorganis",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    BIO 11.1. Investigative Biology Laboratory",
        "title": "3    BIO 11.1. Investigative Biology Laboratory 3    CHEM 18.1 University Chemistry Laboratory ms       3    BIO 30. Genetics 3    PI 10. The Life and Works of Jose Rizal 3   GE Elective 3   GE Elective",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (2) Human Kinetics Activities 18",
        "units": 16,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "CHEM 40",
        "title": "Basic Organic Chemistry",
        "units": 4,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "CHEM 40.1",
        "title": "Basic Organic Chemistry Laboratory 1 5",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "BIO 14",
        "title": "Biodiversity",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BOT 14",
        "title": "University Botany",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ZOO 14",
        "title": "University Zoology",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 160",
        "title": "Introductory Biochemistry",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 150",
        "title": "Ecology",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Hum Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "5 PHYS 51. Elements of Physics",
        "title": "5 PHYS 51. Elements of Physics 3 PHYS 51.1. Elements of Physics Laboratory 3 BIO 101. Introductory Molecular Biology 3 CHEM 160.1. Introductory Biochemistry Laboratory 4 BIO 140. Evolutionary Biology an (2)",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective (3) ABME 10. Foundations of Entrepreneurship",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (2) 18 Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Training Service Program II 19",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "STAT 164",
        "title": "Statistics for the Biological Sciences",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 120",
        "title": "Cell Biology",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 142",
        "title": "Principles of Systematic Biology",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication Major Major",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    BIO 195. Research Methods in the Biological Sciences",
        "title": "3    BIO 195. Research Methods in the Biological Sciences 3    BIO 127. Developmental Biology",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday 3 3    Life 3 Major 3   Major 3   Elective 18",
        "units": 18,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "BIO 198",
        "title": "Practicum 3",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "COMA 150",
        "title": "Workplace Communication",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 199",
        "title": "Undergraduate Seminar Major Major Major",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 Major",
        "title": "3 Major 1 Elective 3 BIO 200. Undergraduate Thesis 3 3 3 3 19",
        "units": 9,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "CHEM 18",
      "MATH 25",
      "MCB 11",
      "KAS 1/HIST 1",
      "ARTS 1",
      "STS 1",
      "3    BIO 11.1. Investigative Biology Laboratory",
      "CHEM 40",
      "CHEM 40.1",
      "BIO 14",
      "BOT 14",
      "ZOO 14",
      "CHEM 160",
      "BIO 150",
      "5 PHYS 51. Elements of Physics",
      "GE",
      "STAT 164",
      "BIO 120",
      "BIO 142",
      "COMM 10",
      "3    BIO 195. Research Methods in the Biological Sciences",
      "ETHICS 1",
      "BIO 198",
      "COMA 150",
      "BIO 199",
      "Elective",
      "BIO 200",
      "3 Major"
    ]
  },
  "BSCHEM": {
    "code": "BSCHEM",
    "name": "BS Chemistry",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 142,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MCB 11",
        "title": "Biology and Applications of Microorganisms",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine Histo",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    CHEM 19. Chemical Structure and Properties",
        "title": "3    CHEM 19. Chemical Structure and Properties 3    CHEM 18.1 University Chemistry Laboratory 3    MATH 28. Analytic Geometry and Calculus III 3    PHYS 71. University Physics I 3    PHYS 71.1. University Physics I Laboratory ry        3    GE Elective",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (2) Human Kinetics Activities 18",
        "units": 16,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "CHEM 32",
        "title": "Quantitative Inorganic Analysis 3",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": [
          "CHEM 18",
          "CHEM 18.1"
        ]
      },
      {
        "code": "CHEM 32.1",
        "title": "Quantitative Inorganic Analysis 2 Laboratory 5",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": [
          "CHEM 32"
        ]
      },
      {
        "code": "CHEM 43",
        "title": "Organic Chemistry I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CHEM 19",
          "CHEM 32"
        ]
      },
      {
        "code": "PHYS 72",
        "title": "University Physics II",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "PHYS 71",
          "MATH 28"
        ]
      },
      {
        "code": "PHYS 72.1",
        "title": "University Physics II Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "PHYS 71.1",
          "PHYS 72"
        ]
      },
      {
        "code": "CMSC 12/AMAT 152",
        "title": "Foundations of Computer Science/Fund",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 111",
        "title": "Physical Chemistry I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CHEM 32",
          "MATH 28",
          "PHYS 72"
        ]
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kin Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 CHEM 43.1. Organic Chemistry I Laboratory",
        "title": "3 CHEM 43.1. Organic Chemistry I Laboratory 4 CHEM 112. Physical Chemistry II 1 GE Elective amentals 3 of STAT Mathematical 162. Experimental Computing Designs 3 PI 10. The Life and Works of Jose Rizal",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in 3 3 Communication etics          HK 12/13. Human Kinetics Activities/Advanced (2) Human Kinetics Activities",
        "units": 2,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I 17 17",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "CHEM 44",
        "title": "Organic Chemistry II",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": [
          "CHEM 43"
        ]
      },
      {
        "code": "CHEM 44.1",
        "title": "Organic Chemistry II Laboratory 2 5",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": [
          "CHEM 44"
        ]
      },
      {
        "code": "CHEM 111.1",
        "title": "Physical Chemistry I Laboratory",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "CHEM 111"
        ]
      },
      {
        "code": "Elective",
        "title": "(NON-CHEM)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 137",
        "title": "Modern Analytical Chemistry",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "CHEM 32",
          "CHEM 111"
        ]
      },
      {
        "code": "CHEM 140",
        "title": "Organic Analysis",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "CHEM 44",
          "CHEM 44.1"
        ]
      },
      {
        "code": "CHEM 161A",
        "title": "Biochemistry I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "CHEM 44",
          "CHEM 44.1"
        ]
      },
      {
        "code": "CHEM 192",
        "title": "Chemical Information, Literature and Communi",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Training Service Program II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "2 CHEM 112.1. Physical Chemistry II Laboratory 2 CHEM 198.",
        "title": "2 CHEM 112.1. Physical Chemistry II Laboratory 2 CHEM 198. 3 CHEM 115. Physical Chemistry III 3 CHEM 137.1. Modern Analytical Chem Laboratory2 4 CHEM 161.1. General Biochemistry Laboratory 3 CHEM 180. Environmental Chemistry cation 3 CHEM 161B. Biochemistry II (3) 18",
        "units": 15,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "Practicum",
        "title": "Practicum 3",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "CHEM 120",
        "title": "Inorganic Chemistry",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 131",
        "title": "Technical Analysis I (Foods and Feeds)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 200",
        "title": "Undegraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(NON-CHEM)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 CHEM 120.1. Inorganic Chemistry Laboratory",
        "title": "3 CHEM 120.1. Inorganic Chemistry Laboratory 4 CHEM 171. Industrial Chemistry 3 CHEM 199. Undergraduate Seminar 3 CHEM 200. Undegraduate Thesis 3 Elective (CHEM) 16",
        "units": 12,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "CHEM 18",
      "ARTS 1",
      "MCB 11",
      "MATH 27",
      "ETHICS 1",
      "KAS 1/HIST 1",
      "3    CHEM 19. Chemical Structure and Properties",
      "CHEM 32",
      "CHEM 32.1",
      "CHEM 43",
      "PHYS 72",
      "PHYS 72.1",
      "CMSC 12/AMAT 152",
      "CHEM 111",
      "GE",
      "3 CHEM 43.1. Organic Chemistry I Laboratory",
      "COMM 10",
      "CHEM 44",
      "CHEM 44.1",
      "CHEM 111.1",
      "Elective",
      "CHEM 137",
      "CHEM 140",
      "CHEM 161A",
      "CHEM 192",
      "2 CHEM 112.1. Physical Chemistry II Laboratory 2 CHEM 198.",
      "Practicum",
      "CHEM 120",
      "CHEM 131",
      "CHEM 200",
      "Elective",
      "STS 1",
      "3 CHEM 120.1. Inorganic Chemistry Laboratory"
    ]
  },
  "BSAPPHY": {
    "code": "BSAPPHY",
    "name": "BS Applied Physics",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 143,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "PHYS 101",
        "title": "Newtonian Mechanics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippin History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "4    PHYS 102. Electromagnetism",
        "title": "4    PHYS 102. Electromagnetism 3    PHYS 111. Mathematical Methods of Physics I 3    MATH 28. Analytic Geometry and Calculus III 3    COMA 150. Workplace Communication e 3    CHEM 18.1. University Chemistry Laboratory 2 (2) GE Elective",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (2) 16 Human Kinetics Activities 19",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "APHY 10.1",
        "title": "Programming in Physics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 103",
        "title": "Mechanical Waves, Optics, and Thermod",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "PHYS 102"
        ]
      },
      {
        "code": "PHYS 112",
        "title": "Mathematical Methods of Physics II",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "PHYS 111"
        ]
      },
      {
        "code": "PHYS 121",
        "title": "Theoretical Mechanics I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "PHYS 101",
          "PHYS 111"
        ]
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyda Life",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "1 APHY 101. Physics in Scientific Instruments",
        "title": "1 APHY 101. Physics in Scientific Instruments ynamics 4 PHYS 104. Modern Physics 4 PHYS 113. Mathematical Methods of Physics III 3 PHYS 131. Electromagnetic Theory I y 3",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced (2) 3 Human Kinetics Activities (2) NSTP 2. National Training Service Program II (3) 18",
        "units": 17,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "PHYS 115",
        "title": "Computational Physics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 122",
        "title": "Theoretical Mechanics II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "PHYS 121"
        ]
      },
      {
        "code": "PHYS 132",
        "title": "Electromagnetic Theory II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "PHYS 131"
        ]
      },
      {
        "code": "PHYS 141",
        "title": "Quantum Physics I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "PHYS 104",
          "PHYS 113"
        ]
      },
      {
        "code": "PHYS 195",
        "title": "Research Methods in Physics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "4 APHY 102. Physics of Electronic Devices",
        "title": "4 APHY 102. Physics of Electronic Devices 3 PHYS 151. Statistical Physics I 3 PHYS 165. Optical Physics 3 PHYS 192.1. Experimental Physics I",
        "units": 2,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication 3 3 Elective (APHY/PHYS) 19",
        "units": 17,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "APHY 198",
        "title": "Practicum 3",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "APHY 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 142",
        "title": "Quantum Physics II",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "PHYS 141"
        ]
      },
      {
        "code": "Elective",
        "title": "(APHY/PHYS)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(APHY/PHYS)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(APHY/PHYS)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 APHY 191. Special Topics",
        "title": "3 APHY 191. Special Topics 3 APHY 199. Undegraduate Seminar 3 APHY 200. Undergraduate Thesis 3 STS 1. Science, Technology, and Society 3 Elective (APHY/PHYS) 3 Elective 18",
        "units": 16,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "PHYS 101",
      "CHEM 18",
      "MATH 27",
      "ARTS 1",
      "KAS 1/HIST 1",
      "4    PHYS 102. Electromagnetism",
      "APHY 10.1",
      "PHYS 103",
      "PHYS 112",
      "PHYS 121",
      "ETHICS 1",
      "GE",
      "1 APHY 101. Physics in Scientific Instruments",
      "GE",
      "PHYS 115",
      "PHYS 122",
      "PHYS 132",
      "PHYS 141",
      "PHYS 195",
      "PI 10",
      "4 APHY 102. Physics of Electronic Devices",
      "COMM 10",
      "APHY 198",
      "APHY 200",
      "PHYS 142",
      "Elective",
      "Elective",
      "Elective",
      "Elective",
      "3 APHY 191. Special Topics"
    ]
  },
  "BACOMM": {
    "code": "BACOMM",
    "name": "BA Communication Arts",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 145,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "COMA 200",
        "freeElectiveUnits": 6
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "COMA 190",
        "freeElectiveUnits": 9
      }
    },
    "defaultTrack": "thesis",
    "majorCourses": [
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMA 101",
        "title": "Language and Communication",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUM 100",
        "title": "Critical Theories",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SPCM 102",
        "title": "Voice and Diction",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday 3 3    STS 1. Science, Technology, and Society 3    GE Elective 3  COMA 102. Language and Culture 3  ENG 100. Rereading the Literary Canons 3  SPCM 101. Rhetoric",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human (2) Kinetics Activities 18",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "Life",
        "title": "Life 3 3 3 3 3 (2) 18",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENG 101",
        "title": "English Prose Styles",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENG 104",
        "title": "Argumentative Writing",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUM 101",
        "title": "Visual Culture",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "THEA 101",
        "title": "History of the Theatre",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "THEA 102",
        "title": "Theatre Communication",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 COMA 103. Introduction to Discourse Analysis",
        "title": "3 COMA 103. Introduction to Discourse Analysis 3 COMA 192. Introduction to Research 3 SPCM 104. Occasional Speeches 3 Major 3 Major 3 Major",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human (2) Kinetics Activities (3) NSTP 2. National Training Service Program II 18",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 (2) (3) 18",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "COMA 105",
        "title": "Principles of Public Relations and Advertising",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMA 190",
        "title": "Special Problems",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(Foreign Language)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(SOSC or PHLO)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(SOSC or PHLO)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(STAT)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    COMA 150. Workplace Communication",
        "title": "3    COMA 150. Workplace Communication 3 COMA 193. Workshop 3 COMA 199. Undergraduate Seminar 3 Major 3 Major 3 Elective (Foreign Language) 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "COMA",
        "title": "200a. Practicum 3 1 3 3 3 16",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "COMA 200",
        "title": "Undergradute Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMA",
        "title": "200a. Practicum",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUM 102",
        "title": "New Media Art",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "THEA 103",
        "title": "Philippine Theatre Major Major",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     GE Elective",
        "title": "3     GE Elective 3     PI 10. The Life and Works of José Rizal 3     COMA 200. Undergraduate Thesis 3     HUM 104. Culture and Arts Management 3     HUM 170. Philippine Art and Society 3     Elective (SOSC or PHLO) 18",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 18",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ARTS 1",
      "COMM 10",
      "KAS 1/HIST 1",
      "COMA 101",
      "HUM 100",
      "SPCM 102",
      "ETHICS 1",
      "Life",
      "GE",
      "ENG 101",
      "ENG 104",
      "HUM 101",
      "THEA 101",
      "THEA 102",
      "3 COMA 103. Introduction to Discourse Analysis",
      "3",
      "COMA 105",
      "COMA 190",
      "Elective",
      "Elective",
      "Elective",
      "Elective",
      "3    COMA 150. Workplace Communication",
      "3",
      "COMA",
      "COMA 200",
      "COMA",
      "HUM 102",
      "THEA 103",
      "3     GE Elective",
      "3"
    ]
  },
  "BASOCIO": {
    "code": "BASOCIO",
    "name": "BA Sociology",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 136,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 10",
        "title": "General Principles of Sociology",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ANTH 10",
        "title": "Introduction to Social and Cultural Anthropolog",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PSY 10",
        "title": "Foundations of Psychology",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 GE Elective",
        "title": "3 GE Elective 3 HIST 10. Introduction to History 3 SOC 100. Social Organization y    3 POSC 10. Principles of Government and Politic 3 SOC 110. Sociology of the Family (2) HK 12/13. Human Kinetics Activities/Advanced Human Kinetics Activities 15",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 STS 1. Science,",
        "title": "3 STS 1. Science, Technology, and Society 3 GE Elective 3 s 3 (2) 15",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 166",
        "title": "Statistics for the Social Sciences",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 116",
        "title": "Sociology of Religion",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 130/SOC 135",
        "title": "Social Psychology/Attitudes and Persuasion",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 AERS 160. Rural Sociology",
        "title": "3 AERS 160. Rural Sociology 3    SOC 140. Introduction to Demography 3    Elective (SOSC) 3    Elective (SOSC) 3    Elective (2) HK 12/13. Human Kinetics Activities/Advanced Human Kinetics Activities (3) NSTP 2. National Training Service Program II 15",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 PI 10. The Life",
        "title": "3 PI 10. The Life and Works of Jose Rizal 3 GE Elective 3 3 3 (2) (3) 15",
        "units": 6,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(SOSC)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(SOSC)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 107",
        "title": "Gender Relations",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 151",
        "title": "Classical Sociological Theories",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 195",
        "title": "Research Methodologies in the Social Sciences",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 195.1",
        "title": "Research Methodologies in the Social Sciences Laboratory",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 SOC 166. Social Program Evaluation",
        "title": "3 SOC 166. Social Program Evaluation 3 SOC 152. Contemporary Sociological Theories 3 SOC 192. Introduction to Qualitative Social Research 3 COMM 10. Critical Perspectives in Communication 2 Elective 1 15",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 SOC 198.",
        "title": "3 SOC 198. Internship 3 3 3 3 15",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "SOC 199",
        "title": "Undergraduate Seminar",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 114",
        "title": "Sociology of Economic Life",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 120",
        "title": "Urban Sociology",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 180",
        "title": "Collective Behavior",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 191",
        "title": "Special Topics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SOC 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "1    SOC 112. Sociology of Politics",
        "title": "1    SOC 112. Sociology of Politics 3    SOC 160/SOC 165. Social Change/Sociology o Development 3     SOC 170/SOC 175. Social Problems/Deviance 3     SOC 200. Undergraduate Thesis 3     Elective 3 16",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 f 3 3 3 15",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "KAS 1/HIST 1",
      "ETHICS 1",
      "SOC 10",
      "ANTH 10",
      "PSY 10",
      "3 GE Elective",
      "3 STS 1. Science,",
      "ARTS 1",
      "ECON 11",
      "STAT 166",
      "SOC 116",
      "SOC 130/SOC 135",
      "3 AERS 160. Rural Sociology",
      "3 PI 10. The Life",
      "Elective",
      "Elective",
      "SOC 107",
      "SOC 151",
      "SOC 195",
      "SOC 195.1",
      "3 SOC 166. Social Program Evaluation",
      "3 SOC 198.",
      "SOC 199",
      "SOC 114",
      "SOC 120",
      "SOC 180",
      "SOC 191",
      "SOC 200",
      "1    SOC 112. Sociology of Politics",
      "3"
    ]
  },
  "BAPHILO": {
    "code": "BAPHILO",
    "name": "BA Philosophy",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 132,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "PHLO 200",
        "freeElectiveUnits": 12
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "PHLO 190",
        "freeElectiveUnits": 15
      }
    },
    "defaultTrack": "thesis",
    "majorCourses": [
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday L",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine H",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 11",
        "title": "Fundamental Approaches to Philosophy",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 12",
        "title": "Logic",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ife       3      PI 10. The Life and Works of Jose Rizal",
        "title": "ife       3      PI 10. The Life and Works of Jose Rizal istory    3    GE Elective 3    PHLO 150. Epistemology 3    PHLO 171. Ethics 3    ECON 11/POSC 10. General Economics/Principles of Governmen 3    SPEC. Readings in Speculative Thought",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetic (2) Activities 18",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 t and 3Politics 3 s (2) 18",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 110",
        "title": "Ancient Philosophy",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 112",
        "title": "Modern Philosophy",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 173",
        "title": "Practical Ethics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 PHLO Elective",
        "title": "3 PHLO Elective 3 PHLO 111. Medieval Philosophy 3 PHLO 120. Philosophical Reasoning 3 GE Elective 3 Elective",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetic 3 Activities (3) NSTP 2. National Training Service Program II (2) 18",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 s (2) (3) 15",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "PHLO 197",
        "title": "Philosophic Problems",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 174",
        "title": "Biomedical Ethics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 181",
        "title": "Aesthetics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 195",
        "title": "Philosophy of Language",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 PHLO 113. Contemporary Philosophy",
        "title": "3 PHLO 113. Contemporary Philosophy 3 PHLO 182. Philosophy and Semiotics 3 Specialized course. Elective in one discipline 3 Elective (PHLO) 3 Elective (PHLO) 15 Elective",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 18",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "PHLO 178",
        "title": "Environmental Ethics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 176",
        "title": "Social and Political Philosophy",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHLO 190",
        "title": "Special Problems",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(PHLO) Specialized course. Elective in one discipline",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3      PHLO 160. Philosophy of Science",
        "title": "3      PHLO 160. Philosophy of Science 3      PHLO 184. Feminist Philosophy 3      PHLO 185. Critical Perspectives in Filipino Philosophy 3      PHLO 190. Special Problems 3      Specialized course. Elective in one discipline 15",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 15",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ETHICS 1",
      "KAS 1/HIST 1",
      "ARTS 1",
      "STS 1",
      "PHLO 11",
      "PHLO 12",
      "ife       3      PI 10. The Life and Works of Jose Rizal",
      "3",
      "COMM 10",
      "GE",
      "Elective",
      "PHLO 110",
      "PHLO 112",
      "PHLO 173",
      "3 PHLO Elective",
      "3",
      "PHLO 197",
      "PHLO 174",
      "PHLO 181",
      "PHLO 195",
      "Elective",
      "3 PHLO 113. Contemporary Philosophy",
      "3",
      "PHLO 178",
      "PHLO 176",
      "PHLO 190",
      "Elective",
      "3      PHLO 160. Philosophy of Science",
      "3"
    ]
  },
  "AASS": {
    "code": "AASS",
    "name": "Associate in Arts in Sports Studies",
    "college": "CAS",
    "collegeName": "College of Arts and Sciences",
    "available": true,
    "totalUnitsRequired": 78,
    "geCoursesRequired": 5,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "SS 102",
        "title": "Introduction to Sports Studies",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PEd 91",
        "title": "Physical Education 91",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 2,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 12",
        "title": "Basic Human Kinetics Activities",
        "units": 2,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "HK 11"
        ]
      },
      {
        "code": "SS 110",
        "title": "Foundations of Sports Studies",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "SS 102"
        ]
      },
      {
        "code": "PEd 92",
        "title": "Physical Education 92",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "SS 103",
        "title": "Sports Science Fundamentals",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "SS 102"
        ]
      },
      {
        "code": "PEd 151",
        "title": "Physical Education 151",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "HK 12/13",
        "title": "Basic or Advanced Human Kinetics Activities",
        "units": 2,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "HK 11"
        ]
      },
      {
        "code": "KAS 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "SS 104",
        "title": "Sports Studies 104",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "SS 102"
        ]
      },
      {
        "code": "PEd 93",
        "title": "Physical Education 93",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "SS 130",
        "title": "Sports Studies 130",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "SS 102"
        ]
      },
      {
        "code": "PEd 174",
        "title": "Physical Education 174",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "PEd 176",
        "title": "Physical Education 176",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "MATH 10",
        "title": "Mathematics 10",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK 11/12/13",
        "title": "Human Kinetics Activities",
        "units": 2,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SS 120",
        "title": "Sports Studies 120",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "SS 102"
        ]
      },
      {
        "code": "PI 100",
        "title": "The Life, Works, and Writings of Jose Rizal",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PEd 172",
        "title": "Physical Education 172",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "PEd 100",
        "title": "Physical Education 100",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "PEd 196",
        "title": "Physical Education 196",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "PEd 130.1",
        "title": "Physical Education 130.1",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "PEd 91"
        ]
      },
      {
        "code": "HK 11/12/13",
        "title": "Human Kinetics Activities",
        "units": 2,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "SS 102",
      "SS 103",
      "SS 104",
      "SS 110",
      "SS 120",
      "SS 130",
      "PEd 91",
      "PEd 92",
      "PEd 93",
      "PEd 100",
      "PEd 130.1",
      "PEd 151",
      "PEd 172",
      "PEd 174",
      "PEd 176",
      "PEd 196",
      "HK 11",
      "HK 12",
      "HK 12/13",
      "HK 11/12/13",
      "KAS 1",
      "PI 100",
      "MATH 10"
    ]
  },
  "BSAGRI": {
    "code": "BSAGRI",
    "name": "BS Agriculture",
    "college": "CAFS",
    "collegeName": "College of Agriculture and Food Science",
    "available": true,
    "totalUnitsRequired": 142,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "AGRI 11",
        "title": "1   AGRI",
        "units": 51,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 21",
        "title": "3   AGRI",
        "units": 22,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 31",
        "title": "3   AGRI",
        "units": 32,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 41",
        "title": "3   CHEM",
        "units": 18,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "3   ETHICS",
        "units": 1,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "3   HK 16",
        "units": 11,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 (2) 15",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "CHEM 18.1",
        "title": "2    KAS 1/HIST",
        "units": 1,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABME 10",
        "title": "3    ECON",
        "units": 11,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 42",
        "title": "3    BOT",
        "units": 20,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 61",
        "title": "3    AGRI",
        "units": 111,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABT 10",
        "title": "3    AGRI",
        "units": 171,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ELECTIVE",
        "title": "GE 1                        3    CHEM",
        "units": 40,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 12",
        "title": "OR 13                         (2)   CHEM",
        "units": 40.1,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP",
        "title": "1 17",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 4 1 (3) 20",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "Midyear",
        "title": "Midyear Major 198/200a 3",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 199",
        "title": "1    SPECIALIZATION COURSE",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MAJOR",
        "title": "COURSE 4                       3    SPECIALIZATION COURSE",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MAJOR",
        "title": "COURSE 5                       3    SPECIALIZATION COURSE",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MAJOR",
        "title": "COURSE 6                       3    Elective",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABE 1",
        "title": "3    MAJOR 200/MAJOR 200a",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MAJOR 200/MAJOR 190",
        "title": "3 Undergraduate Seminar",
        "units": 1,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "3",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 12",
        "title": "OR 13 20",
        "units": 2,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "2",
        "title": "2 3 4 3 3 15",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "AGRI 11",
      "AGRI 21",
      "AGRI 31",
      "AGRI 41",
      "ARTS 1",
      "STS 1",
      "3",
      "CHEM 18.1",
      "ABME 10",
      "AGRI 42",
      "AGRI 61",
      "ABT 10",
      "ELECTIVE",
      "3",
      "Midyear",
      "AGRI 199",
      "MAJOR",
      "MAJOR",
      "MAJOR",
      "ABE 1",
      "MAJOR 200/MAJOR 190",
      "COMM 10",
      "2"
    ]
  },
  "BSABIO": {
    "code": "BSABIO",
    "name": "BS Agricultural Biotechnology",
    "college": "CAFS",
    "collegeName": "College of Agriculture and Food Science",
    "available": true,
    "totalUnitsRequired": 142,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ABT 11",
        "title": "Introduction to Agricultural Biotechnology",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 21",
        "title": "(Lab). Introduction to Animal Science",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 31",
        "title": "(Lab). Fundamentals of Crop Science",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "1    AGRI 22. Introduction to Livestock and Poultry Productio",
        "title": "1    AGRI 22. Introduction to Livestock and Poultry Productio 3    AGRI 32. Fundamentals of Crop Science II 3    AGRI 41. Principles of Crop Protection 3    CHEM 18.1. University Chemistry Laboratory 3    HIST1/KAS1. Kasaysayan ng Pilipinas/Philippine History 3    ETHICS 1. Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management 16",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "n",
        "title": "n 3 3 2 3 3 (2) 17",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "CHEM 40",
        "title": "Basic Organic Chemistry",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 40.1",
        "title": "Basic Organic Chemistry Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 42",
        "title": "Pest Management",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MCB 11",
        "title": "Biology and Applications of Microorganisms",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "GE1 (Math 10). Mathematics, Culture and Society",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 30",
        "title": "Genetics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "4    CHEM 160. Introductory Biochemistry",
        "title": "4    CHEM 160. Introductory Biochemistry 1    ABT 101. Fundamentals of Agricultural Biotechnology 3    STAT 162. Experimental Designs I 3    CMSC 12. Introduction to Computer Science 3    MATH 25. Fundamental Calculus 3    AGRI 51. Principles of Soil Science (2) Elective GE",
        "units": 2,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program 17",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 3 (3) 21",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ABT 103",
        "title": "Experimental Techniques in Agricultural Biotechnology I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 101",
        "title": "Introductory Molecular Biology",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 61",
        "title": "Agricultural Extension Communication",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABME 10",
        "title": "Cultivating the Entreprenuerial Mindset",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "GE 3 (SAS 1). Self and Society",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Service Training Program Total",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 ABT 106. Molecular Markers",
        "title": "3 ABT 106. Molecular Markers 3  ABT 104. Experimental Techniques in Agricultural Biotechno 3  Elective course 3  ECON 11. General Economics 3  AGRI 171. Ethics, Laws, and Policies in Agriculture 3  SPECIALIZATION COURSE",
        "units": 1,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human 3 Kinetics Activities (3) 21",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ABT",
        "title": "198/200a. Practicum/Major Practice logy3II 3 3 3 3 (2) 18",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "MGT 101",
        "title": "Concepts and Dynamics of Management",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABT 107",
        "title": "Recombinant DNA Technology SPECIALIZATION COURSE SPECIALIZATION COURSE SPECIALIZATION COURSE",
        "units": 4,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABT",
        "title": "200/ABT 200a. Undergraduate Thesis/Major Practice",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ABT 108",
        "title": "Issues and Regulation of Agricultural Biotechno 3    ABT 199. Undergraduate Seminar 3    AGRI 199. Colloquium in Agriculture 3    Elective Course 3    ABT 200/190. Undergraduate Thesis/Special Problems 3 (2) 18",
        "units": 2,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 logy 1 1 3 3 11",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ABT 11",
      "CHEM 18",
      "AGRI 21",
      "AGRI 31",
      "ARTS 1",
      "STS 1",
      "1    AGRI 22. Introduction to Livestock and Poultry Productio",
      "n",
      "CHEM 40",
      "CHEM 40.1",
      "AGRI 42",
      "MCB 11",
      "Elective",
      "BIO 30",
      "4    CHEM 160. Introductory Biochemistry",
      "3",
      "ABT 103",
      "BIO 101",
      "AGRI 61",
      "PI 10",
      "ABME 10",
      "COMM 10",
      "Elective",
      "3 ABT 106. Molecular Markers",
      "3",
      "ABT",
      "MGT 101",
      "ABT 107",
      "ABT",
      "3",
      "ABT 108",
      "3"
    ]
  },
  "BSFST": {
    "code": "BSFST",
    "name": "BS Food Science and Technology",
    "college": "CAFS",
    "collegeName": "College of Agriculture and Food Science",
    "available": true,
    "totalUnitsRequired": 143,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "FST 11",
        "title": "3 GE",
        "units": 1,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 21",
        "title": "(Lab)                                  3 MCB 11 (Lab)",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 31",
        "title": "(Lab)                                  3 MATH",
        "units": 27,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "3 CHEM 18.1 (Lab)",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "3 GE",
        "units": 2,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "3 PHYS",
        "units": 51,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "-2 PHYS 51.1 (Lab)",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 12",
        "title": "or 18",
        "units": 13,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 2 3 3 2 -2 19",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "CHEM 40",
        "title": "3 STAT 101 (Lab)",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 40.1",
        "title": "(Lab)                                2 MGT",
        "units": 101,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABME 10",
        "title": "3 CHEM",
        "units": 160,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 32",
        "title": "3 MCB 180 (Lab)",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CHEM 18",
          "CHEM 18.1"
        ]
      },
      {
        "code": "CHEM 32.1",
        "title": "(Lab)                                2 FST 101 (Lab)",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CHEM 32"
        ]
      },
      {
        "code": "STS 1",
        "title": "3 FST 130 (Lab)",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 12",
        "title": "or 13                                   -2 HK 12 or",
        "units": 13,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "-3 NSTP 16",
        "units": 2,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 -2 -3 18",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "3 PI",
        "units": 10,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 102",
        "title": "(Lab)                                  4 AGRI",
        "units": 171,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 131",
        "title": "(Lab)                                  3 AGRI 195 (Lab)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 140",
        "title": "(Lab)                                  3 FST",
        "units": 111,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 141",
        "title": "(Lab)                                  3 FST 151 (Lab)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 167",
        "title": "(Lab)                                  3 FST 19",
        "units": 200,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MID",
        "title": "YEAR TERM",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST",
        "title": "198",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 18 3 3",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "GE 3",
        "title": "3 Elective",
        "units": 1,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 165",
        "title": "3 Elective",
        "units": 2,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 170",
        "title": "3 FST",
        "units": 147,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABME 172",
        "title": "3 FST",
        "units": 175,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FST 200",
        "title": "3 FST HIST1/KAS1                                    3 AGRI 18 Total no. of units:",
        "units": 143,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 1 1 14",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "FST 11",
      "AGRI 21",
      "AGRI 31",
      "ARTS 1",
      "ETHICS 1",
      "CHEM 18",
      "3",
      "CHEM 40",
      "CHEM 40.1",
      "ABME 10",
      "CHEM 32",
      "CHEM 32.1",
      "STS 1",
      "3",
      "COMM 10",
      "FST 102",
      "FST 131",
      "FST 140",
      "FST 141",
      "FST 167",
      "MID",
      "FST",
      "3",
      "GE 3",
      "FST 165",
      "FST 170",
      "ABME 172",
      "FST 200",
      "3"
    ]
  },
  "BSACHEM": {
    "code": "BSACHEM",
    "name": "BS Agricultural Chemistry",
    "college": "CAFS",
    "collegeName": "College of Agriculture and Food Science",
    "available": true,
    "totalUnitsRequired": 197,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MCB 11",
        "title": "Biology and Applications of Microorganisms",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    CHEM 19. Chemical Structure and Properties",
        "title": "3    CHEM 19. Chemical Structure and Properties 3    MATH 28. Analytic Geometry and Calculus III 3    BIO 30. Genetics 3    AGRI 31. Fundamentals of Crop Science I 3    CHEM 18.1 University Chemistry Laboratory 3    GE Elective (2)   HK 12/13. Human Kinetics Activities/Advanced Human Kinetics Activities 18",
        "units": 17,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 43",
        "title": "Organic Chemistry I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CHEM 19",
          "CHEM 32"
        ]
      },
      {
        "code": "PHYS 71",
        "title": "University Physics I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 71.1",
        "title": "University Physics I Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BOT 20",
        "title": "Fundamentals of Plant Physiology",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CMSC 12/AMAT 152",
        "title": "Foundations of Computer Science/Fundamentals of Mathema",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "tical Computing",
        "title": "tical Computing",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3    CHEM 32.1. Quantitative Inorganic Analysis Laboratory",
        "title": "3    CHEM 32.1. Quantitative Inorganic Analysis Laboratory 3    CHEM 43.1. Organic Chemistry I Laboratory 4    PHYS 72. University Physics II 1    PHYS 72.1. University Physics II Laboratory 3    AGRI 21. Introduction to Animal Science 3    AGRI 32. Fundamentals of Crop Science II 3    CHEM 32. Quantitative Inorganic Analysis (2)   HK 12/13. Human Kinetics Activities/Advanced Human Kinetics Activities 20    NSTP 1. National Training Service Program I 18",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "CHEM 44",
        "title": "Organic Chemistry II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "CHEM 43"
        ]
      },
      {
        "code": "STAT 162",
        "title": "Experimental Designs",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "STAT 101"
        ]
      },
      {
        "code": "AGRI 22",
        "title": "Introduction to Livestock and Poultry Production",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 111/AAE 120",
        "title": "Farm Management/Agricultural Marketing I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 61",
        "title": "Innovations and Entrepreneurship in Agriculture",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Training Service Program II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    CHEM 111. Physical Chemistry I                                            3    CHEM 161A. Biochemistry I",
        "title": "3    CHEM 111. Physical Chemistry I                                            3    CHEM 161A. Biochemistry I 3    CHEM 131. Technical Analysis I (Foods and Feeds)                          4 3    CHEM 44.1. Organic Chemistry II Laboratory 3    COMM 10. Critical Perspectives in Communication 3    AGRI 51. Principles of Soil Science 3    AGRI 41. Principles of Crop Protection (3) 18",
        "units": 18,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "CHEM 111.1",
        "title": "Physical Chemistry I Laboratory",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "CHEM 111"
        ]
      },
      {
        "code": "CHEM 112",
        "title": "Physical Chemistry II",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "CHEM 111"
        ]
      },
      {
        "code": "CHEM 137",
        "title": "Modern Analytical Chemistry",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "CHEM 32",
          "CHEM 111"
        ]
      },
      {
        "code": "CHEM 161B",
        "title": "Biochemistry II",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "CHEM 161A"
        ]
      },
      {
        "code": "CHEM 140",
        "title": "Organic Analysis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "CHEM 44",
          "CHEM 44.1"
        ]
      },
      {
        "code": "AGRI 42",
        "title": "Pest Management SPECIALIZATION",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 180",
        "title": "Environmental Chemistry",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 120",
        "title": "Inorganic Chemistry",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 199",
        "title": "Undergraduate Seminar",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 171",
        "title": "Ethics, Laws and Policies in Agriculture",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ACHM 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society SPECIALIZATION",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "2     CHEM 112.1. Physical Chemistry II Laboratory                              2    CHEM 198. Practicum",
        "title": "2     CHEM 112.1. Physical Chemistry II Laboratory                              2    CHEM 198. Practicum 3     CHEM 115. Physical Chemistry III                                          3 3     CHEM 137.1. Modern Analytical Chem Laboratory 3     CHEM 161.1. General Biochemistry Laboratory 4     CHEM 192. Chemical Information, Literature and Communication 3     SPECIALIZATION 3     SPECIALIZATION 21",
        "units": 18,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "FIFTH",
        "title": "YEAR 3     CHEM 133. Technical Analysis II (Soils, Fertilizers, and Pesticides) 3     CHEM 185. Structure and Reactivity of Agricultural Chemicals 1     AGRI 199. Colloquium in Agriculture 3     ACHEM 200. Undergraduate Thesis 3     GE Elective 3     SPECIALIZATION 3 19",
        "units": 17,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "CHEM 18",
      "ARTS 1",
      "MCB 11",
      "MATH 27",
      "ETHICS 1",
      "KAS 1/HIST 1",
      "3    CHEM 19. Chemical Structure and Properties",
      "ECON 11",
      "CHEM 43",
      "PHYS 71",
      "PHYS 71.1",
      "BOT 20",
      "CMSC 12/AMAT 152",
      "PI 10",
      "tical Computing",
      "3    CHEM 32.1. Quantitative Inorganic Analysis Laboratory",
      "CHEM 44",
      "STAT 162",
      "AGRI 22",
      "AAE 111/AAE 120",
      "AGRI 61",
      "GE",
      "3    CHEM 111. Physical Chemistry I                                            3    CHEM 161A. Biochemistry I",
      "CHEM 111.1",
      "CHEM 112",
      "CHEM 137",
      "CHEM 161B",
      "CHEM 140",
      "AGRI 42",
      "CHEM 180",
      "CHEM 120",
      "CHEM 199",
      "AGRI 171",
      "ACHM 200",
      "STS 1",
      "2     CHEM 112.1. Physical Chemistry II Laboratory                              2    CHEM 198. Practicum",
      "FIFTH"
    ]
  },
  "BSABE": {
    "code": "BSABE",
    "name": "BS Agricultural and Biosystems Engineering",
    "college": "CEAT",
    "collegeName": "College of Engineering and Agro-Industrial Technology",
    "available": true,
    "totalUnitsRequired": 169,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ABE 10",
        "title": "Introduction to Agricultural and Biosystems Engineering",
        "units": 1,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 10.1",
        "title": "Engineering Graphics Laboratory",
        "units": 2,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18.1",
        "title": "University Chemistry Laboratory",
        "units": 2,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABE 30",
        "title": "Engineering Surveying",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 32",
        "title": "Computer-Aided Design",
        "units": 2,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "CHEM 40",
        "title": "Basic Organic Chemistry",
        "units": 4,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "CHEM 18"
        ]
      },
      {
        "code": "CHEM 40.1",
        "title": "Basic Organic Chemistry Laboratory",
        "units": 1,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "CHEM 18"
        ]
      },
      {
        "code": "MATH 28",
        "title": "Analytic Geometry and Calculus III",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "MATH 27"
        ]
      },
      {
        "code": "PHYS 51",
        "title": "Elements of Physics",
        "units": 4,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 51.1",
        "title": "Elements of Physics Laboratory",
        "units": 1,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ABE 40",
        "title": "Engineering Survey Camp",
        "units": 1,
        "gradeType": "S/U",
        "year": 1,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 42",
        "title": "Engineering Mechanics",
        "units": 4,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 43",
        "title": "Introduction to Numerical Methods and Computing",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 48",
        "title": "Engineering Materials",
        "units": 2,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ENSC 21",
        "title": "Mathematical Methods in Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "ENSC 10.1"
        ]
      },
      {
        "code": "PHYS 52",
        "title": "Advanced Physics for Engineers",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "PHYS 51"
        ]
      },
      {
        "code": "PHYS 52.1",
        "title": "Advanced Physics for Engineers Laboratory",
        "units": 1,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "PHYS 51"
        ]
      },
      {
        "code": "EE 1",
        "title": "Basic Electrical Engineering",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ABE 52",
        "title": "Structural Mechanics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 54",
        "title": "Thermodynamics I",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 56",
        "title": "Fluid Mechanics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 57",
        "title": "Engineering Geology",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 58",
        "title": "Basic Electronics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ENSC 22",
        "title": "Differential Equations for Engineering",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ENSC 10.1"
        ]
      },
      {
        "code": "SOIL 51",
        "title": "Fundamentals of Soil Science",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABE 61",
        "title": "Engineering Hydrology",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 62",
        "title": "Hydraulic Engineering",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 63",
        "title": "Thermodynamics II",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 64",
        "title": "Transport Processes",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 66",
        "title": "Instrumentation and Controls",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 72",
        "title": "Drainage and Land Development",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 73",
        "title": "Irrigation Engineering",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 74",
        "title": "Agricultural Waste Management",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 75",
        "title": "Aquacultural Engineering",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 76",
        "title": "Refrigeration and Air Conditioning",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 67",
        "title": "Structural Engineering",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABE 198",
        "title": "Field Practice",
        "units": 3,
        "gradeType": "S/U",
        "year": 4,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 81",
        "title": "Agricultural Machinery and Equipment",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 82",
        "title": "Postharvest and Food Engineering",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 83",
        "title": "Soil and Water Conservation Engineering",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 84",
        "title": "Agricultural Structures",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 199",
        "title": "Seminar",
        "units": 1,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 200",
        "title": "Undergraduate Thesis/Innovationeering",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 88",
        "title": "Biosystems Engineering",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 186",
        "title": "ABE Codes and Standards, and Contracts",
        "units": 2,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "ABE 10"
        ]
      },
      {
        "code": "ABE 190",
        "title": "Design Project",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "ABE 10"
        ]
      }
    ],
    "requiredCodes": [
      "ABE 10",
      "ABE 30",
      "ABE 32",
      "ABE 40",
      "ABE 42",
      "ABE 43",
      "ABE 48",
      "ABE 52",
      "ABE 54",
      "ABE 56",
      "ABE 57",
      "ABE 58",
      "ABE 61",
      "ABE 62",
      "ABE 63",
      "ABE 64",
      "ABE 66",
      "ABE 67",
      "ABE 72",
      "ABE 73",
      "ABE 74",
      "ABE 75",
      "ABE 76",
      "ABE 81",
      "ABE 82",
      "ABE 83",
      "ABE 84",
      "ABE 88",
      "ABE 186",
      "ABE 190",
      "ABE 198",
      "ABE 199",
      "ABE 200",
      "ENSC 10.1",
      "ENSC 21",
      "ENSC 22",
      "EE 1",
      "CHEM 18",
      "CHEM 18.1",
      "CHEM 40",
      "CHEM 40.1",
      "MATH 27",
      "MATH 28",
      "PHYS 51",
      "PHYS 51.1",
      "PHYS 52",
      "PHYS 52.1",
      "SOIL 51",
      "ENG 10"
    ]
  },
  "BSCHE": {
    "code": "BSCHE",
    "name": "BS Chemical Engineering",
    "college": "CEAT",
    "collegeName": "College of Engineering and Agro-Industrial Technology",
    "available": true,
    "totalUnitsRequired": 163,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ChE 10. Introduction to Chemical Engineering Profession",
        "title": "ChE 10. Introduction to Chemical Engineering Profession",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 51",
        "title": "Elements of Physics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 51.1",
        "title": "Elements of Physics Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "1 CHEM 18.1. University Chemistry Laboratory",
        "title": "1 CHEM 18.1. University Chemistry Laboratory 3 MCB 11. Biology and Applications of Microorganisms 3 ENSC 11. Statics of Rigid Bodies 4 MATH 28. Analytic Geometry and Calculus III 1 HIST1/KAS1. Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Ki 3 Activities (2) NSTP 1. National Service Training Program 15",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology and 2 Society 3 GE 1",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in 3 the Arts 3 3 netics (2) (3) 14",
        "units": 9,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ChE 30. Fundamentals of Chemical Engineering",
        "title": "ChE 30. Fundamentals of Chemical Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 10.1",
        "title": "Engineering Graphics Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 1",
        "title": "Basic Electrical Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 32",
        "title": "Quantitative Inorganic Analysis",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CHEM 18",
          "CHEM 18.1"
        ]
      },
      {
        "code": "CHEM 32.1",
        "title": "Quantitative Inorganic Analysis Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "CHEM 32"
        ]
      },
      {
        "code": "CHEM 40",
        "title": "Basic Organic Chemistry",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 40.1",
        "title": "Basic Organic Chemistry Laboratory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Service Training Program",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "4 ENSC 26. Computer Applications in Engineering",
        "title": "4 ENSC 26. Computer Applications in Engineering 2 ChE 32. Industrial Stoichiometry 3 ENSC 12. Dynamics of Rigid Bodies 3 ENSC 21. Mathematical Methods in Engineering 2 CHEM 111. Physical Chemistry I 4 CHEM 160. Introductory Biochemistry 1 GE",
        "units": 2,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Ki (2) Activities (3) 19",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 3 netics (2) 21",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ChE 142. Chemical Engineering Thermodynamics I",
        "title": "ChE 142. Chemical Engineering Thermodynamics I ChE 147. Application of Fluid Dynamics in Chemical Engineerin ChE 149. Transport Phenomena ChE 152. Separation Processes",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 112",
        "title": "Physical Chemistry II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "CHEM 111"
        ]
      },
      {
        "code": "STAT 168",
        "title": "Respone Surface Methodology",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "STAT 162"
        ]
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 ChE 143. Chemical Engineering Thermodynamics II",
        "title": "3 ChE 143. Chemical Engineering Thermodynamics II g      3 ChE 145. Chemical Reaction Engineering 3 ChE 153. Transfer Operations I 3 ChE 154. Transfer Operations II 3 ENSC 13. Strength of Materials 3 CHEM 111.1. Physical Chemistry I Laboratory 3 ENG 10. Writing of Scientific Papers 21",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 ChE 198. Internship",
        "title": "3 ChE 198. Internship 3 3 3 3 2 3 20",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ChE 157.1. Chemical Engineering Unit Operations Laboratory",
        "title": "ChE 157.1. Chemical Engineering Unit Operations Laboratory ChE 191. Special Topics ChE 192. Chemical Process Equipment Design ChE 200/200b/200c. Undergraduate Thesis/Innovationeering/ Engineering Industry Research Cognate ChE 172. Introduction to Biochemical Engineering ChE 180. Agro-Industrial Waste Management",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "2 ChE 170. Instrumentation and Process Dynamics and Cont",
        "title": "2 ChE 170. Instrumentation and Process Dynamics and Cont 3 ChE 185. Chemical Engg Laws, Ethics, Specifications an 3 ChE 193. Plant Design 3 ChE 199. Plant Inspection and Seminar ChE 200/200b/200c. Undergraduate Thesis/Innovationeeri 3 Engineering Industry Research 3 Cognate 3 ETHICS 1. Ethics and Moral Reasoning in Everyday Life GE 20",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "rol",
        "title": "rol d Contracts 3 1 ng/ 3 3 3 3 21",
        "units": 2,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ChE 10. Introduction to Chemical Engineering Profession",
      "CHEM 18",
      "MATH 27",
      "PHYS 51",
      "PHYS 51.1",
      "PI 10",
      "1 CHEM 18.1. University Chemistry Laboratory",
      "STS 1",
      "ARTS 1",
      "ChE 30. Fundamentals of Chemical Engineering",
      "ENSC 10.1",
      "EE 1",
      "CHEM 32",
      "CHEM 32.1",
      "CHEM 40",
      "CHEM 40.1",
      "4 ENSC 26. Computer Applications in Engineering",
      "3",
      "ChE 142. Chemical Engineering Thermodynamics I",
      "CHEM 112",
      "STAT 168",
      "COMM 10",
      "3 ChE 143. Chemical Engineering Thermodynamics II",
      "3 ChE 198. Internship",
      "ChE 157.1. Chemical Engineering Unit Operations Laboratory",
      "2 ChE 170. Instrumentation and Process Dynamics and Cont",
      "rol"
    ]
  },
  "BSCE": {
    "code": "BSCE",
    "name": "BS Civil Engineering",
    "college": "CEAT",
    "collegeName": "College of Engineering and Agro-Industrial Technology",
    "available": true,
    "totalUnitsRequired": 159,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 10",
        "title": "Fundamentals of Civil Engineering",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective HIST1/KAS1. Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 71",
        "title": "University Physics I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 71.1",
        "title": "University Physics I Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     ENSC 10.1. Engineering Graphics Laboratory",
        "title": "3     ENSC 10.1. Engineering Graphics Laboratory 1     ENSC 11. Statics of Rigid Bodies 3     MATH 28. Analytic Geometry and Calculus III 3     PHYS 72. University Physics II 3     PHYS 72.1. University Physics II Laboratory 4     STS 1. Science, Technology and Society 1     GE Elective",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management 18",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "2",
        "title": "2 3 3 4 1 3 3 (2) 19",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "EE 1",
        "title": "Basic Electrical Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 12",
        "title": "Dynamics of Rigid Bodies",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 13",
        "title": "Strength of Materials",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 21",
        "title": "Mathematical Methods in Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 101",
        "title": "Statistical Methods",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABE 48",
        "title": "Fundamentals of Surveying",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 12",
        "title": "Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 CHEM 18. University Chemistry",
        "title": "3 CHEM 18. University Chemistry 3 CHEM 18.1. University Chemistry Laboratory 3 CE 120. Higher Surveying 3 CE 131. Structural Analysis I 3 ENSC 16. Fluid Mechanics 3 ETHICS 1. Ethics and Moral Reasoning in Everyday Lif 3 PI 10. The Life, Works, and Writings of Rizal",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human (2) Activities (3) NSTP 2. National Service Training Program 21",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 2 3 3 3 e 3 Kinetics (2) (3) 20",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ABE 57",
        "title": "Field Hydrology",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 121",
        "title": "Transportation Engineering I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 132",
        "title": "Structural Analysis II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 133",
        "title": "Design of Timber Members",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 151",
        "title": "Sanitary Engineering I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 170",
        "title": "Geotechnical Engineering",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FPPS 183",
        "title": "Engineering Economic Analysis",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetic Activities",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 CE 122. Transportation Engineering II",
        "title": "3 CE 122. Transportation Engineering II 3 CE 134. Design of Reinforced Concrete Members 3 CE 152. Sanitary Engineering II 3 CE 161. Construction Materials & Testing 3 CE 163. Civil Engineering Laws, Contracts and Ethics 3 ENSC 16.1. Fluid Mechanics Laboratory 3 IE 184. Project Development and Management s (2) 21",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 CE 198. Practicum",
        "title": "3 CE 198. Practicum 4 3 3 2 2 3 20",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "CE 135",
        "title": "Design of Steel Members",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 137",
        "title": "Structural Dynamics and Earhquake Engineering",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 141",
        "title": "Hydraulic Engineering",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 164",
        "title": "Construction Project Planning and Management",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE 171",
        "title": "Foundation Engineering",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CE",
        "title": "200/200b. Thesis/Innovationeering",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     ABE 67. Irrigation & Drainage Engineering",
        "title": "3     ABE 67. Irrigation & Drainage Engineering 3     CE 197. Civil Engineering Project Integration 3     CE 199. Seminar 4     CE 200/200b. Thesis/Innovationeering 3     COMM 10. Critical Perspectives in Communication 3     ENG 10. Writing of Scientific Papers",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ENSC 26",
        "title": "Computer Applications in Engineering 19",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 1 3 3 3 3 19",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ARTS 1",
      "CE 10",
      "GE",
      "MATH 27",
      "PHYS 71",
      "PHYS 71.1",
      "3     ENSC 10.1. Engineering Graphics Laboratory",
      "2",
      "EE 1",
      "ENSC 12",
      "ENSC 13",
      "ENSC 21",
      "STAT 101",
      "GE",
      "ABE 48",
      "3 CHEM 18. University Chemistry",
      "3",
      "ABE 57",
      "CE 121",
      "CE 132",
      "CE 133",
      "CE 151",
      "CE 170",
      "FPPS 183",
      "3 CE 122. Transportation Engineering II",
      "3 CE 198. Practicum",
      "CE 135",
      "CE 137",
      "CE 141",
      "CE 164",
      "CE 171",
      "CE",
      "3     ABE 67. Irrigation & Drainage Engineering",
      "ENSC 26",
      "3"
    ]
  },
  "BSEE": {
    "code": "BSEE",
    "name": "BS Electrical Engineering",
    "college": "CEAT",
    "collegeName": "College of Engineering and Agro-Industrial Technology",
    "available": true,
    "totalUnitsRequired": 162,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 71",
        "title": "University Physics I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 71.1",
        "title": "University Physics I Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 30",
        "title": "Introduction to Electrical Engineering",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 MATH 28. Analytic Geometry and Calculus III",
        "title": "3 MATH 28. Analytic Geometry and Calculus III 4 PHYS 72. University Physics II 1 PHYS 72.1. University Physics II Laboratory 1 ENSC 10.1. Engineering Graphics Laboratory 3 ENSC 11. Statics of Rigid Bodies 3 GE Elective 3 GE Elective",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human (2) Kinetics Activities (3) NSTP 2. National Service Training Program II 18",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 4 1 2 3 3 3 (2) (3) 19",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "EE 40",
        "title": "Fundamentals of Electrical Engineering I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 45",
        "title": "Fundamentals of Engineering Electromagnetics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 12",
        "title": "Dynamics of Rigid Bodies",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC",
        "title": "14a. Engineering Thermodynamics and Heat Transfer",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 21",
        "title": "Mathematical Methods in Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "4 EE 50. Fundamentals of Electrical Engineering II",
        "title": "4 EE 50. Fundamentals of Electrical Engineering II 3 EE 51. Electromechanical Energy Conversion for DC 3 EE 55. Semiconductor Devices 5 ENSC 26. Computer Applications in Engineering 3 KAS 1/HIST 1. Kasaysayan ng Pilipinas/Philippine History 3 GE Elective",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human (2) Kinetics Activities 21",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "4",
        "title": "4 3 3 3 3 3 (2) 19",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "EE 60",
        "title": "Signals and Systems",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 65",
        "title": "Electronic Circuits",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 61",
        "title": "Electromechanical Energy Conversion for AC",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 62",
        "title": "Principles of Power Systems",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 66",
        "title": "Signals and Noise in Electrical Engineering Network",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 EE 70. Instrumentation Engineering",
        "title": "3 EE 70. Instrumentation Engineering 4 EE 75. Digital Electronics 4 EE 71. Analysis of Power Systems 3 EE 79. Electrical Engineering Law, Ethics, and Contracts s    3 FPPS 183. Engineering Economic Analysis 3 IE 184. Project Development and Management",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "EE 199",
        "title": "Undergraduate Seminar 20",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "4 EE 198. Internship",
        "title": "4 EE 198. Internship 4 3 1 3 3 1 19",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "EE 85",
        "title": "Industrial Electronics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 80",
        "title": "Control Systems Analysis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 86",
        "title": "Electronic Communication Systems I",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE 81",
        "title": "Maintenance of Electrical Equipment and Devices",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE",
        "title": "200/200b/200c. Undergraduate Thesis/Innovationeering/Engineering Industry Research Specialization Course",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE",
        "title": "200/200b/200c. Undergraduate Thesis/ 3 Innovationeering/Engineering Industry Research 3 Specialization Course 3 Specialization Course 3 Elective 3 Elective 3 EE 91. Electrical System Design, Planning, and Estimatio 3 21",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 n 19",
        "units": 4,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "MATH 27",
      "PHYS 71",
      "PHYS 71.1",
      "EE 30",
      "PI 10",
      "ARTS 1",
      "ETHICS 1",
      "3 MATH 28. Analytic Geometry and Calculus III",
      "3",
      "EE 40",
      "EE 45",
      "ENSC 12",
      "ENSC",
      "ENSC 21",
      "STS 1",
      "4 EE 50. Fundamentals of Electrical Engineering II",
      "4",
      "EE 60",
      "EE 65",
      "EE 61",
      "EE 62",
      "EE 66",
      "ENG 10",
      "3 EE 70. Instrumentation Engineering",
      "EE 199",
      "4 EE 198. Internship",
      "EE 85",
      "EE 80",
      "EE 86",
      "EE 81",
      "COMM 10",
      "EE",
      "EE",
      "3"
    ]
  },
  "BSIE": {
    "code": "BSIE",
    "name": "BS Industrial Engineering",
    "college": "CEAT",
    "collegeName": "College of Engineering and Agro-Industrial Technology",
    "available": true,
    "totalUnitsRequired": 160,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 10",
        "title": "Foundations of Industrial Engineering",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 51",
        "title": "Elements of Physics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 51.1",
        "title": "Elements of Physics Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18.1",
        "title": "University Chemistry Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 ENSC 11. Statics of Rigid Bodies",
        "title": "3 ENSC 11. Statics of Rigid Bodies 3 MATH 28. Analytic Geometry and Calculus III 3 IE 31. Industrial Organization and Manageme 1 IE 21. Industrial Processes 4 STAT 101. Statistical Methods 1 KAS 1/HIST 1. Kasaysayan ng Pilipinas/Phili 3 GE Elective. General Education",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanc 2 Activities (2) NSTP 2. National Service Training Program (3) 20",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 nt 3 3 ppine History 3 ed Human Kinetics (2)",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "II",
        "title": "(3) 21",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 21",
        "title": "Mathematical Methods in Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 141",
        "title": "Operations Research I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 132",
        "title": "Methods of Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 125",
        "title": "Industrial Quality Control",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kineti",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 ETHICS 1. Ethics and Moral Reasoning in Eve",
        "title": "3 ETHICS 1. Ethics and Moral Reasoning in Eve 3 IE 142. Operations Research II 3 ENSC 12. Dynamics of Rigid Bodies 5 ENSC 10.1. Engineering Graphics Laboratory 5 IE 151. Production Systems cs Activities        (2) IE 150. Systems Evaluation",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MGT 111",
        "title": "Principles of Accounting",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanc Activities 19",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ryday Life          3     IE 198. Internship",
        "title": "ryday Life          3     IE 198. Internship 3 3 2 3 3 3 ed Human Kinetics (2) 20",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ENSC 13",
        "title": "Strength of Materials",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 143",
        "title": "Stochastic Processes in Industrial Engineering",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABE 43",
        "title": "Engineering Shop",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 152",
        "title": "Manufacturing Planning and Design",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 26",
        "title": "Computer Applications in Engineering",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 134",
        "title": "Ergonomics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 ENSC 16. Fluid Mechanics",
        "title": "3 ENSC 16. Fluid Mechanics 3 ENSC 14a. Engineering Thermodynamics and He 3 IE 144. Systems Simulation 3 IE 184. Project Development and Management 3 IE 164. Informations Systems I 3 IE 136. Industrial Safety and Health 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 at Transfer 3 3 3 3 20",
        "units": 5,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "Technical Cognate",
        "title": "Technical Cognate",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 158",
        "title": "Supply Chain Engineering",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 165",
        "title": "Information Systems II",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 185",
        "title": "Industrial Systems Design",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 199",
        "title": "Undergraduate Seminar",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE",
        "title": "200/200b/200c. Thesis/Innovationeering/EIR",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 Technical Cognate",
        "title": "3 Technical Cognate 3 IE 90. Ethics for Industrial Engineers 3 COMM 10. Critical Perspectives in Communica 3 GE Elective. General Education 3 GE Elective. General Education 1 EE 1. Basic Electrical Engineering 3 IE 200/200b/200c. Thesis/Innovationeering/E 19",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 2 tion 3 3 3",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "IR",
        "title": "3 20",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ARTS 1",
      "STS 1",
      "MATH 27",
      "IE 10",
      "PHYS 51",
      "PHYS 51.1",
      "CHEM 18",
      "CHEM 18.1",
      "3 ENSC 11. Statics of Rigid Bodies",
      "3",
      "II",
      "PI 10",
      "ENSC 21",
      "IE 141",
      "IE 132",
      "IE 125",
      "3 ETHICS 1. Ethics and Moral Reasoning in Eve",
      "MGT 111",
      "ryday Life          3     IE 198. Internship",
      "ENSC 13",
      "IE 143",
      "ABE 43",
      "IE 152",
      "ENSC 26",
      "IE 134",
      "3 ENSC 16. Fluid Mechanics",
      "3",
      "Technical Cognate",
      "ENG 10",
      "IE 158",
      "IE 165",
      "IE 185",
      "IE 199",
      "IE",
      "3 Technical Cognate",
      "3",
      "IR"
    ]
  },
  "BSME": {
    "code": "BSME",
    "name": "BS Mechanical Engineering",
    "college": "CEAT",
    "collegeName": "College of Engineering and Agro-Industrial Technology",
    "available": true,
    "totalUnitsRequired": 161,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine Histor",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "10*. Introduction to Mechanical Engineering",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 10.1",
        "title": "Engineering Graphics Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18.1",
        "title": "University Chemistry Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 71",
        "title": "University Physics I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYS 71.1",
        "title": "University Physics I Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "y      3 ARTS 1. Critical Perspectives in the Arts",
        "title": "y      3 ARTS 1. Critical Perspectives in the Arts 3 EE 1. Basic Electrical Engineering 3 PI 10. The Life, Works, and Writings of Rizal 3 ENSC 11. Statics of Rigid Bodies 2 MATH 28. Analytic Geometry and Calculus III 3 IE 31. Industrial Organization and Management 4 ME 43**. Engineering Shop 1 NSTP 1. National Service Training Program (2) HK 12. Human Kinetics Activities 19",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 3 (3) (2) 21",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE",
        "title": "2*. Basic Electronics Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 12",
        "title": "Dynamics of Rigid Bodies",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 13",
        "title": "Strength of Materials",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 14",
        "title": "Basic Thermodynamics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "113**. Manufacturing Processes",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Service Training Program",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 EE 3*. DC and AC Machinery",
        "title": "3 EE 3*. DC and AC Machinery 4 ENSC 15. Fundamentals of Heat Transfer 3 ENSC 16. Fluid Mechanics 3 ENSC 21. Mathematical Methods in Engineering 3 ME 45*. Analysis of Machine Elements 3 ME 70*. Mechanical Engineering Thermodynamics",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetic (3) Activities (2) 19",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "4",
        "title": "4 3 3 3 3 3 s (2) 19",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology and Society",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "IE 150",
        "title": "Systems Evaluation",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "53**. Machine Design for Bioproduction Systems I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "160*. Mechanical Vibrations",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "171*. Fluid Machinery",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "172*. Combustion Engineering",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "175*. Refrigeration Systems",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     COMM 10. Critical Perspectives in Communication",
        "title": "3     COMM 10. Critical Perspectives in Communication 3     ENG 10. Writing of Scientific Papers 3     ENSC 26. Computer Applications in Engineering 3     ME 154*. Design of Machinery 3     ME 173.1*. Mechanical Engineering Laboratory I 2     ME 176*. Air Conditioning and Ventilation Systems 3     IE 184. Project Development and Management 21",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 ME 198. Practicum",
        "title": "3 ME 198. Practicum 3 3 3 1 3 19",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "GE Course",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "EE",
        "title": "28*. Introduction to Control Systems",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 101",
        "title": "Statistical Methods",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "90*. Mechanical Engineering Laws, Ethics, Codes and",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "174.1*. Mechanical Engineering Laboratory II",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "199*. Undergraduate Seminar",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "200/b/c*. Undergraduate Thesis/Engineering Industry",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 Elective GE Course",
        "title": "3 Elective GE Course 3 Elective GE Course 3 ME 181*. Industrial Plant Engineering and Design Standards 2 ME 182*. Power Plant Engineering and Design",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ME",
        "title": "200/b/c*. Undergraduate Thesis/Engineering Industry 2 Research/ Innovationeering 1 Elective* Research/ 3     Innovationeering 3 20",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 4 4 3 3 20",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "KAS 1/HIST 1",
      "ME",
      "ENSC 10.1",
      "CHEM 18",
      "CHEM 18.1",
      "MATH 27",
      "PHYS 71",
      "PHYS 71.1",
      "y      3 ARTS 1. Critical Perspectives in the Arts",
      "3",
      "ETHICS 1",
      "EE",
      "ENSC 12",
      "ENSC 13",
      "ENSC 14",
      "ME",
      "3 EE 3*. DC and AC Machinery",
      "4",
      "STS 1",
      "IE 150",
      "ME",
      "ME",
      "ME",
      "ME",
      "ME",
      "3     COMM 10. Critical Perspectives in Communication",
      "3 ME 198. Practicum",
      "Elective",
      "EE",
      "STAT 101",
      "ME",
      "ME",
      "ME",
      "ME",
      "3 Elective GE Course",
      "ME",
      "3"
    ]
  },
  "BSMATE": {
    "code": "BSMATE",
    "name": "BS Materials Engineering",
    "college": "CEAT",
    "collegeName": "College of Engineering and Agro-Industrial Technology",
    "available": true,
    "totalUnitsRequired": 175,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "MATE 21",
        "title": "Engineering Drawing",
        "units": 2,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATE 31",
        "title": "Introduction to Materials Science",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 41",
        "title": "Structure of Materials",
        "units": 4,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 101",
        "title": "Physical Metallurgy",
        "units": 4,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 111",
        "title": "Mechanical Behavior of Materials",
        "units": 4,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 121",
        "title": "Ceramic Materials",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 131",
        "title": "Polymer Materials",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 141",
        "title": "Electronic Materials",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 151",
        "title": "Corrosion Engineering",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 161",
        "title": "Materials Characterization",
        "units": 4,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 171",
        "title": "Materials Processing",
        "units": 4,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 181",
        "title": "Materials Selection and Design",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 190",
        "title": "Materials Engineering Design",
        "units": 4,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "MATE 191",
        "title": "Engineering Internship",
        "units": 3,
        "gradeType": "S/U",
        "year": 3,
        "sem": "2",
        "prereqs": [
          "MATE 21"
        ]
      },
      {
        "code": "ENSC 21",
        "title": "Statics of Rigid Bodies",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ENSC 22",
        "title": "Dynamics of Rigid Bodies",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ENSC 21"
        ]
      },
      {
        "code": "ENSC 24",
        "title": "Thermodynamics I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "ENSC 21"
        ]
      },
      {
        "code": "MATH 27",
        "title": "Analytic Geometry and Calculus I",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MATH 28",
        "title": "Analytic Geometry and Calculus II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MATH 27"
        ]
      },
      {
        "code": "MATH 114",
        "title": "Differential Equations",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "MATH 27"
        ]
      },
      {
        "code": "PHYSICS 71",
        "title": "Elementary Physics I",
        "units": 4,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PHYSICS 72",
        "title": "Elementary Physics II",
        "units": 4,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "PHYSICS 71"
        ]
      },
      {
        "code": "CHEM 16",
        "title": "General Chemistry I",
        "units": 4,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 17",
        "title": "General Chemistry II",
        "units": 4,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "CHEM 16"
        ]
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "MATE 21",
      "MATE 31",
      "MATE 41",
      "MATE 101",
      "MATE 111",
      "MATE 121",
      "MATE 131",
      "MATE 141",
      "MATE 151",
      "MATE 161",
      "MATE 171",
      "MATE 181",
      "MATE 190",
      "MATE 191",
      "ENSC 21",
      "ENSC 22",
      "ENSC 24",
      "MATH 27",
      "MATH 28",
      "MATH 114",
      "PHYSICS 71",
      "PHYSICS 72",
      "CHEM 16",
      "CHEM 17",
      "ENG 10"
    ]
  },
  "BSECON": {
    "code": "BSECON",
    "name": "BS Economics",
    "college": "CEM",
    "collegeName": "College of Economics and Management",
    "available": true,
    "totalUnitsRequired": 138,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "ECON 200",
        "freeElectiveUnits": 6
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "ECON 199",
        "freeElectiveUnits": 6
      }
    },
    "defaultTrack": "sp",
    "majorCourses": [
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayang ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 25",
        "title": "Fundamental Calculus",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 GE Elective",
        "title": "3 GE Elective 3 GE Elective 3 MGT 101. Concepts and Dynamics of Management 3 COST 10. Introduction to Collective Action 3 ECON 101. Intermediate Macroeconomic Theory (2) ECON 102. Intermediate Microeconomic Theory",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK 12/HK 13",
        "title": "Human Kinetics Activities/Advanced Human Kinetics Activities 15",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 1 3 3 (2) 16",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective Language Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life Works and Writings of Rizal",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 103",
        "title": "Introduction to Growth Theory and Open Economy Macroeconomics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 104",
        "title": "Introduction to Factor Market Analysis, General Equilibri & Welfare Economics",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STAT 101",
        "title": "Statistical Methods",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program I HK12/HK13. Human Kinetics Activities / Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday 3 Language Elective 3 MGT 111. Principles of Accounting 3 ECON 130. Elements of Mathematical Economics",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ECON 137",
        "title": "Introduction to Econometrics 3 um          NSTP 2. National Service Training Program II 3 HK12/HK13.Human Kinetics Activities / Advance 3 Human Kinetics Activities (3) (2) 18",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "Life",
        "title": "Life 3 3 3 3 (3) d (2) 15",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ECON 115",
        "title": "Philippine Economic History",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 121",
        "title": "Money and Banking",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 138",
        "title": "Intermediate Econometrics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 170",
        "title": "Intermediate Environmental Economics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 175",
        "title": "Benefit Cost Analysis",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MGT 115",
        "title": "Introduction to Financial Management",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 COMM 10. Critical Perspectives in Communication",
        "title": "3 COMM 10. Critical Perspectives in Communication 3      ENG 10. Writing of Scientific Papers 3      ECON 141. International Economics 3      ECON 151. Public Economics 3      Specialization Course. Mandatory 3      Specialization Course. Elective 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ECON 198",
        "title": "Internship 3 3 3 3 3 18",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 199",
        "title": "Undergraduate Seminar",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 200",
        "title": "Undergraduate Thesis Specialization Course. Mandatory Specialization Course. Mandatory Specialization Course. Elective",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3      Free Elective",
        "title": "3      Free Elective 1      ECON 110. History of Economic Doctrines 3      ECON 185. Development Economics 3      ECON 199. Undergraduate Seminar 3      ECON 200. Undergraduate Thesis 3      Specialization Course. Elective 16",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 1 3 3 16",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "KAS 1/HIST 1",
      "ARTS 1",
      "STS 1",
      "MATH 25",
      "ECON 11",
      "3 GE Elective",
      "3",
      "GE",
      "PI 10",
      "ECON 103",
      "ECON 104",
      "STAT 101",
      "ETHICS 1",
      "ECON 137",
      "Life",
      "ECON 115",
      "ECON 121",
      "ECON 138",
      "ECON 170",
      "ECON 175",
      "MGT 115",
      "3 COMM 10. Critical Perspectives in Communication",
      "3",
      "ECON 198",
      "Elective",
      "ECON 199",
      "ECON 200",
      "3      Free Elective",
      "3"
    ]
  },
  "BSAAE": {
    "code": "BSAAE",
    "name": "BS Agricultural and Applied Economics",
    "college": "CEM",
    "collegeName": "College of Economics and Management",
    "available": true,
    "totalUnitsRequired": 140,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "AAE 200",
        "freeElectiveUnits": 0,
        "majorElectiveUnits": 15
      },
      "mfp": {
        "name": "Major Farm Practice Track",
        "code": "AAE 200A",
        "freeElectiveUnits": 0,
        "majorElectiveUnits": 15
      }
    },
    "defaultTrack": "thesis",
    "majorCourses": [
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 10",
        "title": "Introduction to Agricultural and Applied Economics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 51",
        "title": "Principles of Soil Science",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MGT 101",
        "title": "Concepts and Dynamics of Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 25",
        "title": "Fundamental Calculus",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COST 10",
        "title": "Introduction to Collective Action",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     ETHICS 1. Ethics and Moral Reason",
        "title": "3     ETHICS 1. Ethics and Moral Reason 1     AGRI 21. Introduction to Animal S 3     AGRI 31. Fundamentals of Crop Sci 3     AAE 111. Farm Management 3     ECON 102. Intermediate Microecono 3     STAT 101. Statistical Methods (2)   HK 12/13. Human Kinetics Activiti 1 17",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ing in Everyday Life",
        "title": "ing in Everyday Life cience ence I 3 mic Theory 3 es/Advanced Human Kinetics Activities 18",
        "units": 2,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "AAE 103",
        "title": "Statistical Analysis of Agricultural and Applied Economics Data",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 120",
        "title": "Agricultural Marketing I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 104",
        "title": "Farm Business Accounting",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 22",
        "title": "Introduction to Livestock and Poultry Production",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 32",
        "title": "Fundamentals of Crop Science II",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 101",
        "title": "Intermediate Macroeconomic Theory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     GE Elective",
        "title": "3     GE Elective 3     ARTS 1. Critical Perspectives in 3     PI 10. Life and Works of Rizal 3     HNF 141. Food Nutrition System 3     NRC 170. Watershed Management 3     ECON 130. Elements of Mathematica (2)   HK 12/13. Human Kinetics Activiti (3)   NSTP 2. National Service Training 18",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 the Arts 3 3 3 l Economics es/Advanced Human Kinetics Program II 18",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABE 2",
        "title": "Fundamentals of Agricultural and Biosystems Engineering II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 110",
        "title": "Introduction to Agricultural and Applied Economics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 130",
        "title": "Agricultural Finance",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 142",
        "title": "Natural Resource Economics I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 171",
        "title": "Feasibility Studies of Agri-Based Enterprises and Agro-Industrial Development Projects",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3     COMM 10. Critical Perspectives in",
        "title": "3     COMM 10. Critical Perspectives in",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "AAE 195",
        "title": "Introduction to Research 3 Economics 3     AAE 161. Introduction to Food and 3     AAE 123. Agricultural and Interna 3     AAE/ECON/MGT/COST Track Course 3 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "Communication                          3      AAE 198. Internship",
        "title": "Communication                          3      AAE 198. Internship Methods in Agricultural and Applied 3 Nutrition Economics tional Trade 3 15",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "AAE 151",
        "title": "Agricultural Policy",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE",
        "title": "200/200a. Undergraduate Thesis/Major Farm Practice",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 199",
        "title": "Undergraduate Seminar Technical Track Course AAE/ECON/MGT/COST Track Course AAE/ECON/MGT/COST Track Course",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    AAE 150. Economics of Agricultura",
        "title": "3    AAE 150. Economics of Agricultura 3    AAE 200/200a. Undergraduate Thesi 1    STS 1. Science, Technology and So 3    GE Elective 3    GE Elective 3 16",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "l Development",
        "title": "l Development s/Major Farm Practice ciety 3 3 15",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "KAS 1/HIST 1",
      "AAE 10",
      "AGRI 51",
      "MGT 101",
      "MATH 25",
      "ECON 11",
      "COST 10",
      "3     ETHICS 1. Ethics and Moral Reason",
      "ing in Everyday Life",
      "AAE 103",
      "AAE 120",
      "AAE 104",
      "AGRI 22",
      "AGRI 32",
      "ECON 101",
      "3     GE Elective",
      "3",
      "ENG 10",
      "ABE 2",
      "AAE 110",
      "AAE 130",
      "AAE 142",
      "AAE 171",
      "3     COMM 10. Critical Perspectives in",
      "AAE 195",
      "Communication                          3      AAE 198. Internship",
      "AAE 151",
      "AAE",
      "AAE 199",
      "3    AAE 150. Economics of Agricultura",
      "l Development"
    ]
  },
  "BSABME": {
    "code": "BSABME",
    "name": "BS Agribusiness Management and Entrepreneurship",
    "college": "CEM",
    "collegeName": "College of Economics and Management",
    "available": true,
    "totalUnitsRequired": 141,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "ABME 200",
        "freeElectiveUnits": 6
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "ABME 199",
        "freeElectiveUnits": 9
      }
    },
    "defaultTrack": "sp",
    "majorCourses": [
      {
        "code": "ABME 10",
        "title": "Foundations of Entrepreneurship",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABME 11",
        "title": "Introduction to Agribusiness Management and Entrepreneurship",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 41",
        "title": "Principles of Crop Protection",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABT 10",
        "title": "Traditional and Modern Biotechnology: Principles an Applications",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MATH 25",
        "title": "Fundamental Calculus",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COST 10",
        "title": "Introduction to Collective Action",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    AGRI 21. Introduction to Animal Science",
        "title": "3    AGRI 21. Introduction to Animal Science 1    AGRI 31. Fundamentals of Crop Science I 3    MGT 101. Concepts and Dynamics of Management d 3    MGT 111. Principles of Accounting 3    ETHICS 1. Ethics and Moral Reasoning for Everyday Li 3    KAS 1/HIST 1. Kasaysayang ng Pilipinas/Philippine Hi",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human K 1 Activities (2) 17",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 fe story inetics (2) 18",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ABME 103",
        "title": "Agribusiness Systems and Modalities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 22",
        "title": "Introduction to Livestock and Poultry Production",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AGRI 32",
        "title": "Fundamentals of Crop Science II",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MGT 121",
        "title": "Quantitative Business Analysis",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MGT 151",
        "title": "Introduction to Marketing Management",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 ECON 102. Intermediate Microeconomic Theory",
        "title": "3 ECON 102. Intermediate Microeconomic Theory 3 ABE 2. Fundamentals of Agricultural Engineering II 3 MGT 113. Managerial Accounting",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MGT 131",
        "title": "Introduction to Human Relations and Behavior 3 Organization 3 MGT 141. Fundamentals of Operations Management 3 ABME 172. Product Ideation and Creation",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kin (2) Activities (3) NSTP 2. National Service Training Program II 18",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 in 3 3 3 etics (2) (3) 18",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "ECON 101",
        "title": "Intermediate Macroeconomic Theory",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MGT 109",
        "title": "Managerial Economics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "AAE 111",
        "title": "Farm Management Track Course",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspective in Communication",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    PI 10. The Life Works and Writing of Jose Rizal",
        "title": "3    PI 10. The Life Works and Writing of Jose Rizal 3    STAT 101. Statistical Methods 3    Elective 3    Track Course 3    GE Elective 3 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ABME",
        "title": "198. 3 Internship 3 3 3 3 15",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "MGT 161",
        "title": "Business Law",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts Track Course",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    ABME 190. Special Problems",
        "title": "3    ABME 190. Special Problems 3    MGT 155. International Marketing 3    MGT 181. Fundamentals of Strategic Business Manageme 3    STS 1. Science, Technology and Society 3    Elective 15",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 nt 3 3 15",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ABME 10",
      "ABME 11",
      "AGRI 41",
      "ABT 10",
      "ECON 11",
      "MATH 25",
      "COST 10",
      "3    AGRI 21. Introduction to Animal Science",
      "3",
      "ABME 103",
      "AGRI 22",
      "AGRI 32",
      "MGT 121",
      "MGT 151",
      "GE",
      "3 ECON 102. Intermediate Microeconomic Theory",
      "MGT 131",
      "3",
      "ECON 101",
      "MGT 109",
      "AAE 111",
      "COMM 10",
      "GE",
      "3    PI 10. The Life Works and Writing of Jose Rizal",
      "ABME",
      "MGT 161",
      "ARTS 1",
      "Elective",
      "Elective",
      "3    ABME 190. Special Problems",
      "3"
    ]
  },
  "AAENTREP": {
    "code": "AAENTREP",
    "name": "Associate in Arts in Entrepreneurship",
    "college": "CEM",
    "collegeName": "College of Economics and Management",
    "available": true,
    "totalUnitsRequired": 75,
    "geCoursesRequired": 5,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "KAS 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABME 10",
        "title": "Foundations of Entrepreneurship",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MGT 101",
        "title": "Concepts and Dynamics of Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 2,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "MGT 111",
        "title": "Principles of Accounting",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "HK 12/13",
        "title": "Basic or Advanced Human Kinetics Activities",
        "units": 2,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "HK 11"
        ]
      },
      {
        "code": "PI 10",
        "title": "The Life, Works, and Writings of Jose Rizal",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ABME 172",
        "title": "Product Ideation and Creation",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "ABME 10"
        ]
      },
      {
        "code": "ABME 174",
        "title": "Business Planning",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "ABME 10"
        ]
      },
      {
        "code": "ABME 115",
        "title": "Entrepreneurial Finance",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "ABME 10"
        ]
      },
      {
        "code": "MGT 113",
        "title": "Managerial Accounting",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "MGT 151",
        "title": "Introduction to Marketing Management",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "ENTR 198",
        "title": "Internship",
        "units": 3,
        "gradeType": "S/U",
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK 12/13",
        "title": "Basic or Advanced Human Kinetics Activities",
        "units": 2,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "HK 11"
        ]
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning for Everyday Life",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MGT 161",
        "title": "Business Law",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "MGT 131",
        "title": "Introduction to Human Relations and Behavior in Organization",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "HK 12/13",
        "title": "Basic or Advanced Human Kinetics Activities",
        "units": 2,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "HK 11"
        ]
      }
    ],
    "requiredCodes": [
      "KAS 1",
      "COMM 10",
      "STS 1",
      "ARTS 1",
      "ETHICS 1",
      "PI 10",
      "ABME 10",
      "ABME 172",
      "ABME 174",
      "ABME 115",
      "MGT 101",
      "MGT 111",
      "MGT 113",
      "MGT 131",
      "MGT 151",
      "MGT 161",
      "ENTR 198",
      "HK 11",
      "HK 12/13"
    ]
  },
  "BSACCT": {
    "code": "BSACCT",
    "name": "BS Accountancy",
    "college": "CEM",
    "collegeName": "College of Economics and Management",
    "available": true,
    "totalUnitsRequired": 166,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "KAS 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MATH 25",
        "title": "Fundamental Calculus",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MGT 101",
        "title": "Concepts and Dynamics of Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BA 99.1",
        "title": "Fundamental Accounting Theory and Practice I",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 2,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning for Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "STAT 101",
        "title": "Statistical Methods",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 101",
        "title": "Intermediate Macroeconomic Theory",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "ECON 11"
        ]
      },
      {
        "code": "BA 99.2",
        "title": "Fundamental Accounting Theory and Practice II",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 12/13",
        "title": "Basic or Advanced Human Kinetics Activities",
        "units": 2,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "HK 11"
        ]
      },
      {
        "code": "BA 183",
        "title": "Introduction to Database Management for Accounting",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "ECON 102",
        "title": "Intermediate Microeconomic Theory",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "ECON 11"
        ]
      },
      {
        "code": "MGT 121",
        "title": "Quantitative Business Analysis",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "MGT 131",
        "title": "Introduction to Human Relations and Behavior in Organization",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "MGT 151",
        "title": "Introduction to Marketing Management",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "BA 114.1",
        "title": "Accounting Theory and Practice I",
        "units": 6,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "HK 12/13",
        "title": "Basic or Advanced Human Kinetics Activities",
        "units": 2,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "HK 11"
        ]
      },
      {
        "code": "MGT 141",
        "title": "Fundamentals of Operations Management",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "BA 114.2",
        "title": "Accounting Theory and Practice II",
        "units": 6,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 116",
        "title": "Cost Accounting",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "HK 12/13",
        "title": "Basic or Advanced Human Kinetics Activities",
        "units": 2,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "HK 11"
        ]
      },
      {
        "code": "BA 198.1",
        "title": "Internship I",
        "units": 3,
        "gradeType": "S/U",
        "year": 3,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "PI 10",
        "title": "The Life, Works, and Writings of Jose Rizal",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BA 117",
        "title": "Managerial Cost Accounting and Control",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 118.1",
        "title": "Advanced Accounting I",
        "units": 6,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 127",
        "title": "Tax Accounting I",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 141",
        "title": "Business Finance I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 161",
        "title": "Law on Business Transactions",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BA 142",
        "title": "Business Finance II",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 118.2",
        "title": "Advanced Accounting II",
        "units": 6,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 120.1",
        "title": "Audit Theory",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 128",
        "title": "Tax Accounting II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 162",
        "title": "Law on Business Associations",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 198.2",
        "title": "Internship II",
        "units": 3,
        "gradeType": "S/U",
        "year": 4,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "MGT 117",
        "title": "Investment Management",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "MGT 181",
        "title": "Strategic Business Management",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "MGT 101"
        ]
      },
      {
        "code": "BA 122",
        "title": "Computerized Accounting and Auditing Theory and Practice",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 164",
        "title": "Law on Negotiable Instruments and Banking Related Laws",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 184.1",
        "title": "Computer-based Accounting Systems",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 190",
        "title": "Special Problems",
        "units": 1,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 120.2",
        "title": "Audit Practice",
        "units": 6,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 167",
        "title": "Sales and Bailments and other Special Laws",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 184.2",
        "title": "Audit of Computer-based Accounting Systems",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": [
          "BA 99.1"
        ]
      },
      {
        "code": "BA 191",
        "title": "Special Topics",
        "units": 1,
        "year": 4,
        "sem": "1",
        "prereqs": [
          "BA 99.1"
        ]
      }
    ],
    "requiredCodes": [
      "KAS 1",
      "STS 1",
      "MATH 25",
      "ECON 11",
      "ECON 101",
      "ECON 102",
      "ETHICS 1",
      "ARTS 1",
      "COMM 10",
      "PI 10",
      "ENG 10",
      "STAT 101",
      "MGT 101",
      "MGT 121",
      "MGT 131",
      "MGT 141",
      "MGT 151",
      "MGT 117",
      "MGT 181",
      "BA 99.1",
      "BA 99.2",
      "BA 114.1",
      "BA 114.2",
      "BA 116",
      "BA 117",
      "BA 118.1",
      "BA 118.2",
      "BA 120.1",
      "BA 120.2",
      "BA 122",
      "BA 127",
      "BA 128",
      "BA 141",
      "BA 142",
      "BA 161",
      "BA 162",
      "BA 164",
      "BA 167",
      "BA 183",
      "BA 184.1",
      "BA 184.2",
      "BA 190",
      "BA 191",
      "BA 198.1",
      "BA 198.2",
      "HK 11",
      "HK 12/13"
    ]
  },
  "BSFOR": {
    "code": "BSFOR",
    "name": "BS Forestry",
    "college": "CFNR",
    "collegeName": "College of Forestry and Natural Resources",
    "available": true,
    "totalUnitsRequired": 143,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "FOR 1",
        "title": "Introduction to Forests and Forestry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SFI 100",
        "title": "Geology and Forest Soils",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FBS 10",
        "title": "Biology of Tropical Forest Plants",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 SFFG 101. Principles and Concepts of Social Forestry",
        "title": "3 SFFG 101. Principles and Concepts of Social Forestry 3 FRM 92. Forest Engineering 4 FBS 21. Taxonomy of Forest Plants 3 FRM 120. Forestry Economics 3 GE Elective 3 GE Elective (2) HK 12/13. Human Kinetics Activities/Advanced Human Ki 19",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 4 3 3 3 netics Activities 19",
        "units": 2,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "SFFG 123",
        "title": "Forest Policy and Institution",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FPPS 11",
        "title": "Wood Structure and Identification",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FBS 31",
        "title": "Plant Physiology",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NRC 140",
        "title": "Introduction to Geographic Information Systems",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/History of the Philippine",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 NRC 170. Watershed Management",
        "title": "3 NRC 170. Watershed Management 3 FPPS 127. Properties and Utilization of Forest Product 3 FBS 36. Fundamentals of Forest Ecology 3 SFI 103. Fundamentals of Agroforestry s    3 GE Elective 3 STS 1. Science, Technology, and Society (3) NSTP 2. National Service Training Program II (2) HK 12/13. Human Kinetics Activities/Advanced Human Ki 18",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 s 3 3 3 3 (3) netics Activities 19",
        "units": 2,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "Specialization Course",
        "title": "Specialization Course",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SFI 140",
        "title": "Tropical Silviculture",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FBS 45",
        "title": "Forest Insect Pests and Diseases",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SFFG 113",
        "title": "Forestry Extension",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FBS 101",
        "title": "Forest Biodiversity Specialization Course",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    FPPS 128. Non-Timber Forest Products",
        "title": "3    FPPS 128. Non-Timber Forest Products 3    SFI 142. Plantation Forestry 4    FBS 172. Forest Genetics 3    FOR 195. Research Methods in Forestry and Natural R 3    FRM 61. Forest Biometry 3    Specialization Course 19",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 FOR 198. Internship",
        "title": "3 FOR 198. Internship 3 3 esources 3 3 18",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "FOR 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SFFG 125",
        "title": "Political Economy and Administration of Forestry Development",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FRM 131",
        "title": "Forest-based Enterprise Development and Management",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SFFG 152",
        "title": "Sociology of Natural Resources",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FOR 199",
        "title": "Undergraduate Seminar",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 FOR 200. Undergraduate Thesis",
        "title": "3 FOR 200. Undergraduate Thesis 3 FPPS 147. Furniture and Handicraft Production 3 FRM 183. Timber Production Management 3 FRM 184. Integrated Forest Resource Management 3 Specialization Course 1 16",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 15",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "FOR 1",
      "SFI 100",
      "FBS 10",
      "ECON 11",
      "ARTS 1",
      "PI 10",
      "3 SFFG 101. Principles and Concepts of Social Forestry",
      "3",
      "SFFG 123",
      "FPPS 11",
      "FBS 31",
      "NRC 140",
      "KAS 1/HIST 1",
      "ETHICS 1",
      "3 NRC 170. Watershed Management",
      "3",
      "Specialization Course",
      "SFI 140",
      "FBS 45",
      "SFFG 113",
      "FBS 101",
      "3    FPPS 128. Non-Timber Forest Products",
      "3 FOR 198. Internship",
      "FOR 200",
      "SFFG 125",
      "FRM 131",
      "COMM 10",
      "SFFG 152",
      "FOR 199",
      "3 FOR 200. Undergraduate Thesis",
      "3"
    ]
  },
  "AAFOR": {
    "code": "AAFOR",
    "name": "Associate in Forestry",
    "college": "CFNR",
    "collegeName": "College of Forestry and Natural Resources",
    "available": true,
    "totalUnitsRequired": 72,
    "geCoursesRequired": 6,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "FOR 1",
        "title": "Introduction to Forestry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "FOR 21",
        "title": "Dendrology",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "FOR 1"
        ]
      },
      {
        "code": "FOR 31",
        "title": "Forest Mensuration",
        "units": 4,
        "year": 1,
        "sem": "1",
        "prereqs": [
          "FOR 1"
        ]
      },
      {
        "code": "FOR 41",
        "title": "Silvics and Silviculture",
        "units": 4,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "FOR 1"
        ]
      },
      {
        "code": "FOR 51",
        "title": "Forest Ecology",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "FOR 1"
        ]
      },
      {
        "code": "FOR 101",
        "title": "Forest Management",
        "units": 4,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "FOR 1"
        ]
      },
      {
        "code": "FOR 111",
        "title": "Forest Utilization",
        "units": 4,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "FOR 1"
        ]
      },
      {
        "code": "FOR 121",
        "title": "Forest Protection",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "FOR 1"
        ]
      },
      {
        "code": "BIO 1",
        "title": "General Biology I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 16",
        "title": "General Chemistry I",
        "units": 4,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "MATH 17",
        "title": "Algebra and Trigonometry",
        "units": 5,
        "year": 4,
        "sem": "1",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "FOR 1",
      "FOR 21",
      "FOR 31",
      "FOR 41",
      "FOR 51",
      "FOR 101",
      "FOR 111",
      "FOR 121",
      "BIO 1",
      "CHEM 16",
      "MATH 17"
    ]
  },
  "BSHE": {
    "code": "BSHE",
    "name": "BS Human Ecology",
    "college": "CHE",
    "collegeName": "College of Human Ecology",
    "available": true,
    "totalUnitsRequired": 140,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine Histor",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HFDS 101",
        "title": "Family and the Environment",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUME 100",
        "title": "Introduction to Human Ecology",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CERP 101",
        "title": "Fundamentals of Human Settlements",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SDS 101",
        "title": "Introduction to Social Development",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "y         HUME 112. Sustainability Science",
        "title": "y         HUME 112. Sustainability Science 3 3  HUME 107. Principles of Human Development 3  HUME 105. Humans and Their Environment 3  SOC 140. Introduction to Demography 3  BIO 150. Ecology",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetic (2) Activities 15",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning 3 in Everyday Life 3 ARTS 1. Critical Perspectives in the Arts 3 3 4 s (2) 16",
        "units": 6,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "HUME 110",
        "title": "Ecology and Value Systems",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUME 111",
        "title": "Human Ecological Perspective in Development",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUME 115",
        "title": "Social Policies",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "Life and Works of Jose Rizal",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 STS 1. Science, Technology, and Society",
        "title": "3 STS 1. Science, Technology, and Society 3 STAT 166. Statistics for the Social Sciences 3 HUME 114. Material and Energy Flows 3 CERP 161. Planning Theory and Practice I 3 HUME 113. Community Study in Human Welfare",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetic (2) Activities (3) NSTP 2. National Training Service Program II 15",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in 3 Communication 3 GE Elective 3 GE Elective 3 Student may take 6-9 units of GE based 3 on their specific major program s (2) (3) 15",
        "units": 9,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "CERP 140",
        "title": "Fundamentals of Environmental Economics",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUME 122",
        "title": "Human Needs and the Built Environment",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "SDS 173",
        "title": "Consumer Education",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUME 195",
        "title": "Research Methods in Human Ecology Major",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 HUME 125. Human Ecological Systems Mapping",
        "title": "3 HUME 125. Human Ecological Systems Mapping 3 HUME 124. Environmental Health 3 SDS 172. Techniques in Community Organizing 3 HFDS 110. Migration 3 Major 15",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 Major",
        "title": "3 Major 3 Major 3 Major 3 Student may take 6-9 units of major 3 courses based on their specific major program 15",
        "units": 9,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "HUME 123",
        "title": "Climate Change Adaptation and Disaster Risk Reduction in Human Ecosystems",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 141",
        "title": "Food and Nutrition Systems Major Major CERP/HFDS/SDS 200. Undergraduate Thesis Student may add another major course depending on their program",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3 HUME 200a. Supervised Field Experience",
        "title": "3 HUME 200a. Supervised Field Experience 3 HUME 199. Seminar in Human Ecology 3 CERP/HFDS/SDS 200. Undergraduate Thesis 3 3 15 Student may add another major course depending on their program",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "6",
        "title": "6 1 3 10",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "KAS 1/HIST 1",
      "HFDS 101",
      "HUME 100",
      "CERP 101",
      "SDS 101",
      "y         HUME 112. Sustainability Science",
      "ETHICS 1",
      "HUME 110",
      "HUME 111",
      "HUME 115",
      "PI 10",
      "GE",
      "3 STS 1. Science, Technology, and Society",
      "COMM 10",
      "CERP 140",
      "HUME 122",
      "SDS 173",
      "HUME 195",
      "3 HUME 125. Human Ecological Systems Mapping",
      "3 Major",
      "HUME 123",
      "HNF 141",
      "3 HUME 200a. Supervised Field Experience",
      "6"
    ]
  },
  "BSNUTRI": {
    "code": "BSNUTRI",
    "name": "BS Nutrition",
    "college": "CHE",
    "collegeName": "College of Human Ecology",
    "available": true,
    "totalUnitsRequired": 165,
    "geCoursesRequired": 9,
    "tracks": {
      "thesis": {
        "name": "Thesis Track",
        "code": "NUT 200",
        "freeElectiveUnits": 9
      },
      "sp": {
        "name": "Special Problem Track",
        "code": "NUT 190",
        "freeElectiveUnits": 12
      }
    },
    "defaultTrack": "sp",
    "majorCourses": [
      {
        "code": "ABT 11",
        "title": "Introduction to Agricultural Biotechnology",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "BIO 30",
        "title": "Genetics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HUME 100",
        "title": "Introduction to Human Ecology",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HFDS 130",
        "title": "Human Physiology",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18.1",
        "title": "University Chemistry Laboratory",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "1 KAS 1/HIST 1. Kasaysayang ng Pilipinas/Philippine History",
        "title": "1 KAS 1/HIST 1. Kasaysayang ng Pilipinas/Philippine History 3 ETHICS 1. Ethics and Moral Reasoning in Everyday Life 3 GE Elective 3 CHEM 40. Organic Chemistry 3 CHEM 40.1. Organic Chemistry Laboratory 3 MCB 11. Biology and Applications of Microorganisms 2 HNF 101. Food Selection and Preparation",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics (2) Activities 18",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 4 1 3 4 (2) 21",
        "units": 3,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "MGT 101",
        "title": "Concepts and Dynamics of Management",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 103",
        "title": "Food Preservation",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 122",
        "title": "Food and Nutrition",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 141",
        "title": "Food and Nutrition Systems",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 160",
        "title": "Introductory Biochemistry",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 102",
        "title": "Meal Management",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activitie/Advanced Human Kinetic Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Service Training Program I",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    STS 1. Science, Technology, and Society",
        "title": "3    STS 1. Science, Technology, and Society 3    PI 10. The Life and Works of Jose Rizal 4    GE Elective 3    GE Elective 3    STAT 101. Statistical Methods 4    MGT 111. Principles of Accounting s (2) HNF 123. Nutritional Assessment",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activitie /Advanced Human Kineti (3) Activities",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "NSTP 2",
        "title": "National Service Training Program II 20",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3 3 3 3 3 3 3 cs (2) (3) 21",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "HNF 142",
        "title": "Public Health Nutrition",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 104",
        "title": "Food Service System I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 127",
        "title": "Nutrition in the Life Stages",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 128",
        "title": "Medical Nutrition Therapy I",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF 195",
        "title": "Food and Nutrition Research",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    HNF 105. Food Service Systems II",
        "title": "3    HNF 105. Food Service Systems II 3    HNF 143. Nutrition Education 4    HNF 129. Medical Nutrition Therapy II 5    HNF 200. Undergraduate Thesis 3    HNF 126. Sports Nutrition",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3 HNF 200. Undergraduate Thesis",
        "title": "3 HNF 200. Undergraduate Thesis 3 5 3 2 3 19",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "HNF 199",
        "title": "Undergraduate Seminar",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HNF",
        "title": "200a. Practicum I",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "1     HNF 200b. Practicum II",
        "title": "1     HNF 200b. Practicum II 12 13",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "12",
        "title": "12 12",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ABT 11",
      "BIO 30",
      "ARTS 1",
      "HUME 100",
      "HFDS 130",
      "CHEM 18",
      "CHEM 18.1",
      "1 KAS 1/HIST 1. Kasaysayang ng Pilipinas/Philippine History",
      "3",
      "MGT 101",
      "HNF 103",
      "HNF 122",
      "HNF 141",
      "CHEM 160",
      "HNF 102",
      "3    STS 1. Science, Technology, and Society",
      "3",
      "HNF 142",
      "HNF 104",
      "HNF 127",
      "HNF 128",
      "HNF 195",
      "3    HNF 105. Food Service Systems II",
      "COMM 10",
      "3 HNF 200. Undergraduate Thesis",
      "HNF 199",
      "HNF",
      "1     HNF 200b. Practicum II",
      "12"
    ]
  },
  "BSDC": {
    "code": "BSDC",
    "name": "BS Development Communication",
    "college": "CDC",
    "collegeName": "College of Development Communication",
    "available": true,
    "totalUnitsRequired": 142,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ARTS 1",
        "title": "Critical Perspectives in the Arts",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 10",
        "title": "Introduction to Development Communicatio",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 11",
        "title": "Introductios to Media Writing for Development",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ECON 11",
        "title": "General Economics",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine 3 3    History 3    ETHICS 1. Ethics and Moral Reasoning in Everyday Life 3    DEVC 20. Fundamentals of Development Journalism n    3    DEVC 30. Fundamentals of Community Broadcasting 3",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "DEVC 40",
        "title": "Fundamentals of Educational Communication and 3 Technology 3 DEVC 50. Introduction to Science Communication",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human (2) Kinetics Activities (3) NSTP 2. National Training Service Program II 18",
        "units": 18,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "COMM 10",
        "title": "Critical Perspectives in Communication",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 70",
        "title": "Interpersonal Communication in Developme",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 80",
        "title": "Communication and Society",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 101",
        "title": "Introduction to Communication Theory",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Huma Kinetics Activities",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3",
        "title": "3",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "DEVC 125",
        "title": "Writing and Reporting for Development         3 DEVC 3     DEVC 135. Multi-media Materials Plannning and Design 3     STAT 166. Statistics for the Social Sciences nt 3      Elective (Technical) 3     Elective (Technical) 3 n (2) 18",
        "units": 15,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3. Visual and Audiovisual Media Production",
        "title": "3. Visual and Audiovisual Media Production 3 3",
        "units": 3,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "DEVC 126",
        "title": "Participatory Development Journalism",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 144",
        "title": "Media-based Learning Systems",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 153",
        "title": "Managing Information for Development",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(Technical)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(Technical)",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Huma Kinetics Activities",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    DEVC 136. Multi-media Materials Production and Management",
        "title": "3    DEVC 136. Multi-media Materials Production and Management 3 DEVC 198. 3    DEVC 154. Communicating Science for Development 3    DEVC 195. Introduction to Communication Research 3    Elective (Technical) 3    Elective (SOSC) 3    Elective (SOSC) n (2) 18 18",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "Internship",
        "title": "Internship 3",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "DEVC 127",
        "title": "Data Journalism for Development",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 145",
        "title": "Distance Learning Systems in Developmen Communication",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(Technical)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(Technical)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "Elective",
        "title": "(SOSC)",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    DEVC 128. Science Journalism",
        "title": "3    DEVC 128. Science Journalism t 3     DEVC 155. Knowledge Management for Development 3     DEVC 180. Communication Campaigns and Programs 3     DEVC 199. Undergraduate Seminar 3     DEVC 200. Undergraduate Thesis 3     Elective (SOSC) 18",
        "units": 16,
        "year": 4,
        "sem": "2",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ARTS 1",
      "STS 1",
      "PI 10",
      "DEVC 10",
      "DEVC 11",
      "ECON 11",
      "KAS 1/HIST 1",
      "DEVC 40",
      "COMM 10",
      "GE",
      "GE",
      "DEVC 70",
      "DEVC 80",
      "DEVC 101",
      "3",
      "DEVC 125",
      "3. Visual and Audiovisual Media Production",
      "DEVC 126",
      "DEVC 144",
      "DEVC 153",
      "GE",
      "Elective",
      "Elective",
      "3    DEVC 136. Multi-media Materials Production and Management",
      "Internship",
      "DEVC 127",
      "DEVC 145",
      "DEVC 200",
      "Elective",
      "Elective",
      "Elective",
      "3    DEVC 128. Science Journalism"
    ]
  },
  "ASDC": {
    "code": "ASDC",
    "name": "Associate of Science in Development Communication",
    "college": "CDC",
    "collegeName": "College of Development Communication",
    "available": true,
    "totalUnitsRequired": 72,
    "geCoursesRequired": 6,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "DEVC 10",
        "title": "Introduction to Development Communication",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "DEVC 20",
        "title": "Communication Theories",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": [
          "DEVC 10"
        ]
      },
      {
        "code": "DEVC 30",
        "title": "Communication Research Methods",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": [
          "DEVC 10"
        ]
      },
      {
        "code": "DEVC 40",
        "title": "Development Journalism",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": [
          "DEVC 10"
        ]
      },
      {
        "code": "DEVC 50",
        "title": "Development Broadcasting",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": [
          "DEVC 10"
        ]
      },
      {
        "code": "DEVC 60",
        "title": "Educational Communication",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": [
          "DEVC 10"
        ]
      },
      {
        "code": "ENG 10",
        "title": "Writing of Scientific Papers",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "DEVC 10",
      "DEVC 20",
      "DEVC 30",
      "DEVC 40",
      "DEVC 50",
      "DEVC 60",
      "ENG 10"
    ]
  },
  "DVM": {
    "code": "DVM",
    "name": "Doctor of Veterinary Medicine",
    "college": "CVM",
    "collegeName": "College of Veterinary Medicine",
    "available": true,
    "totalUnitsRequired": 220,
    "geCoursesRequired": 9,
    "tracks": null,
    "defaultTrack": null,
    "majorCourses": [
      {
        "code": "ETHICS 1",
        "title": "Ethics and Moral Reasoning in Everyday Life",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "KAS 1/HIST 1",
        "title": "Kasaysayan ng Pilipinas/Philippine History",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "PI 10",
        "title": "The Life and Works of Jose Rizal",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VMED 101",
        "title": "Animal Welfare",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "STS 1",
        "title": "Science, Technology, and Society",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 18",
        "title": "University Chemistry",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "NSTP 1",
        "title": "National Training Service Program I",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK 11",
        "title": "Wellness and Basic Injury Management",
        "units": 3,
        "year": 1,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    ARTS 1. Critical Perspectives in the Arts",
        "title": "3    ARTS 1. Critical Perspectives in the Arts 3    GE Elective 3    CHEM 18.1. University Chemistry Laboratory 3    STAT 164. Statistics for the Biological Scien 3    ZOTC 111. General Principles of Animal Produc 3    NSTP 2. National Training Service Program II (3)   HK 12/13. Human Kinetics Activities/Advanced (2) 18",
        "units": 3,
        "year": 1,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3    CHEM 40. Basic Organic Chemistry",
        "title": "3    CHEM 40. Basic Organic Chemistry 3    CHEM 40.1. Basic Organic Chemistry Laboratory 2 ces tion (3) Human Kinetics Activities 14",
        "units": 2,
        "year": 1,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "GE",
        "title": "Elective",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ABME 10",
        "title": "Foundations of Entrepreneurship",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ZOTC 112",
        "title": "Principles of Animal Breeding",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "CHEM 160",
        "title": "Introductory Biochemistry",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VPHY 140",
        "title": "Biochemical Aspects of Animal Processes",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced Human Kinetics Activitie",
        "units": 3,
        "year": 2,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "3    COMM 10. Critical Perspectives in Communicati",
        "title": "3    COMM 10. Critical Perspectives in Communicati 3    VETA 101. Macroscopic Anatomy I 3    VETA 105. Microscopic and Developmental Anato 3    ZOTC 113. Principles of Animal Nutrition 3    VPHY 141. General Physiology",
        "units": 3,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "HK",
        "title": "12/13. Human Kinetics Activities/Advanced 2 s 17",
        "units": 2,
        "year": 2,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "on                          3     VMCB 121. General Microbiology",
        "title": "on                          3     VMCB 121. General Microbiology 5 my I 3 4 Human Kinetics Activities 18",
        "units": 2,
        "year": 2,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "VETA 102",
        "title": "Macroscopic Anatomy II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VETA 106",
        "title": "Microscopic and Developmental Anatomy II",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VPHY 142",
        "title": "Systemic Physiology",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ZOTC 114",
        "title": "Swine Production",
        "units": 3,
        "year": 3,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "4     VMCB 123. Veterinary Virology",
        "title": "4     VMCB 123. Veterinary Virology 4     VPAR 131. Veterinary Entomology and Protozool 4     VPHM 141. Veterinary Pharmacology and Therape 3     ZOTC 115. Ruminant Production 15    VMCB 122. Veterinary Bacteriology and Mycolog",
        "units": 3,
        "year": 3,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "3     VPTH 121. General Pathology",
        "title": "3     VPTH 121. General Pathology ogy                         4     ZOTC 116. Poultry Production utics I                     4 3 y 17",
        "units": 3,
        "year": 3,
        "sem": "midyear",
        "prereqs": []
      },
      {
        "code": "VMCB 124",
        "title": "Fundamentals of Immunology",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VPAR 132",
        "title": "Veterinary Helminthology",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VPH 121",
        "title": "Epidemiology",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VPHM 142",
        "title": "Veterinary Pharmacology and Therapeutics II",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VPTH 122",
        "title": "Systemic Pathology",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ZOTC 117",
        "title": "Equine Production",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "ZOTC 119",
        "title": "Husbandry and Health Management of Laboratory Animals",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VSUR 154",
        "title": "Veterinary Diagnostic Imaging",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VETC 171",
        "title": "Introduction to Clinics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VMED 152",
        "title": "Canine and Feline Medicine",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VMED 162",
        "title": "Poultry Medicine",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VPH 123",
        "title": "Food Hygiene",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VSUR 152",
        "title": "Small Animal Surgery",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VETC 173",
        "title": "Clinical Conference I",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VETC 175",
        "title": "Clinical Internship I",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VELD 161.1",
        "title": "Laboratory Diagnostics in Veterinary Medicine",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VMED 156",
        "title": "Jurisprudence, Ethics and Economics",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "VMED 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "1",
        "prereqs": []
      },
      {
        "code": "2    VMED 151. General Principles of Veterinary Me",
        "title": "2    VMED 151. General Principles of Veterinary Me 4    VMED 195. Research Methods in Veterinary Medi 3    VPH 122. Zoonoses 4    VPTH 123. Clinical Pathology 3    VPHY 143. Veterinary Endocrinology and Reprod 2    VSUR 151. Principles of Veterinary Anesthesio 3 21",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "FIFTH",
        "title": "YEAR 2     VETC 172. Clinical Clerkship 2     VMED 155. Theriogenology 4     VMED 161. Equine Medicine 3     VMED 163. Ruminant Medicine 4     VMED 164. Swine Medicine 4     VMED 165. Aquatic and Wildlife Medicine 19    VSUR 153. Large Animal Surgery",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "VMED 200",
        "title": "Undergraduate Thesis",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "SIXTH",
        "title": "YEAR 1    VETC 174. Clinical Conference II 6    VETC 176. Clinical Internship II 2 2 3 14",
        "units": 3,
        "year": 4,
        "sem": "2",
        "prereqs": []
      },
      {
        "code": "dicine",
        "title": "dicine cine 2 3 uctive Physiology logy & Surgery 17 2 3 2 2 3 2 3 3 20 1 14 15",
        "units": 3,
        "year": 4,
        "sem": "midyear",
        "prereqs": []
      }
    ],
    "requiredCodes": [
      "ETHICS 1",
      "KAS 1/HIST 1",
      "PI 10",
      "VMED 101",
      "STS 1",
      "CHEM 18",
      "3    ARTS 1. Critical Perspectives in the Arts",
      "3    CHEM 40. Basic Organic Chemistry",
      "GE",
      "GE",
      "ABME 10",
      "ZOTC 112",
      "CHEM 160",
      "VPHY 140",
      "3    COMM 10. Critical Perspectives in Communicati",
      "on                          3     VMCB 121. General Microbiology",
      "VETA 102",
      "VETA 106",
      "VPHY 142",
      "ZOTC 114",
      "4     VMCB 123. Veterinary Virology",
      "3     VPTH 121. General Pathology",
      "VMCB 124",
      "VPAR 132",
      "VPH 121",
      "VPHM 142",
      "VPTH 122",
      "ZOTC 117",
      "ZOTC 119",
      "VSUR 154",
      "VETC 171",
      "VMED 152",
      "VMED 162",
      "VPH 123",
      "VSUR 152",
      "VETC 173",
      "VETC 175",
      "VELD 161.1",
      "VMED 156",
      "VMED 200",
      "2    VMED 151. General Principles of Veterinary Me",
      "FIFTH",
      "VMED 200",
      "SIXTH",
      "dicine"
    ]
  }
};

// Group programs by college
const COLLEGES = {
  "CAS": { name: "College of Arts and Sciences", programs: [] },
  "CAFS": { name: "College of Agriculture and Food Science", programs: [] },
  "CEAT": { name: "College of Engineering and Agro-Industrial Technology", programs: [] },
  "CFNR": { name: "College of Forestry and Natural Resources", programs: [] },
  "CEM": { name: "College of Economics and Management", programs: [] },
  "CHE": { name: "College of Human Ecology", programs: [] },
  "CVM": { name: "College of Veterinary Medicine", programs: [] },
  "CDC": { name: "College of Development Communication", programs: [] },
  "CPAf": { name: "College of Public Affairs and Development", programs: [] },
};

// Populate colleges with programs
Object.values(UPLB_PROGRAMS).forEach(program => {
  if (COLLEGES[program.college]) {
    COLLEGES[program.college].programs.push(program);
  }
});

// Current selected program (default to BSCS)
let currentProgram = UPLB_PROGRAMS["BSCS"];

// Get current curriculum based on selected program
function getCurrentCurriculum() {
  return currentProgram;
}

// Set current program
function setCurrentProgram(programCode) {
  if (UPLB_PROGRAMS[programCode]) {
    currentProgram = UPLB_PROGRAMS[programCode];
    updateTrackOptionsUI();
    updateCurriculumHint();
    return true;
  }
  return false;
}

// Update the track options UI based on current program
function updateTrackOptionsUI() {
  const trackSelector = document.getElementById('trackSelector');
  const trackOptions = document.getElementById('trackOptions');
  
  if (!trackSelector || !trackOptions) return;
  
  // If program has no tracks, hide the entire track selector
  if (!currentProgram.tracks) {
    trackSelector.style.display = 'none';
    return;
  }
  
  trackSelector.style.display = 'block';
  
  // Build track options HTML
  let html = '';
  for (const [trackKey, trackInfo] of Object.entries(currentProgram.tracks)) {
    const isChecked = trackKey === (currentProgram.defaultTrack || 'sp') ? 'checked' : '';
    let electiveInfo = `${trackInfo.freeElectiveUnits} free elective units`;
    if (trackInfo.majorElectiveUnits) {
      electiveInfo += ` • ${trackInfo.majorElectiveUnits} major elective units`;
    }
    html += `
      <label class="track-option">
        <input type="radio" name="track" value="${trackKey}" ${isChecked}>
        <span class="track-label">
          <strong>${trackInfo.name}</strong>
          <small>${trackInfo.code} • ${electiveInfo}</small>
        </span>
      </label>
    `;
  }
  
  trackOptions.innerHTML = html;
  
  // Re-attach event listeners to the new radio buttons
  document.querySelectorAll('input[name="track"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (typeof currentTrack !== 'undefined') {
        currentTrack = e.target.value;
      }
      // Recalculate remaining courses with new track
      if (window.gradesData && window.gradesData.completedCourses) {
        displayRemainingCourses(window.gradesData.completedCourses);
      }
    });
  });
}

// Update the curriculum hint text
function updateCurriculumHint() {
  const hintEl = document.getElementById('curriculumHint');
  if (hintEl && currentProgram) {
    hintEl.textContent = `Based on ${currentProgram.name} curriculum`;
  }
}

// Detect which track the student is on based on completed courses
function detectTrack(completedCourses) {
  if (!currentProgram.tracks) return null;
  
  const codes = completedCourses.map(c => c.code.toUpperCase().trim());
  
  for (const [trackKey, track] of Object.entries(currentProgram.tracks)) {
    if (codes.some(code => code.startsWith(track.code.toUpperCase()))) {
      return trackKey;
    }
  }
  
  return null;
}

// Get free elective units based on track
function getFreeElectiveUnits(track) {
  if (!currentProgram.tracks) return 15; // Default
  
  if (track && currentProgram.tracks[track]) {
    return currentProgram.tracks[track].freeElectiveUnits;
  }
  
  // Return default track's units
  const defaultTrack = currentProgram.defaultTrack || Object.keys(currentProgram.tracks)[0];
  return currentProgram.tracks[defaultTrack]?.freeElectiveUnits || 15;
}

// Check if a course is a GE course (title starts with "(GE)")
function isGECourse(courseTitle) {
  return courseTitle && courseTitle.trim().startsWith("(GE)");
}

// Check if a course is a required major course
function isRequiredCourse(courseCode) {
  if (!currentProgram.requiredCodes) return false;
  
  const normalized = courseCode.toUpperCase().trim();
  return currentProgram.requiredCodes.some(code => 
    code.toUpperCase() === normalized
  );
}

// Get remaining required courses
function getRemainingCourses(completedCourses) {
  if (!currentProgram.majorCourses) return [];
  
  const completedCodes = new Set(
    completedCourses.map(c => c.code.toUpperCase().trim())
  );
  
  return currentProgram.majorCourses.filter(course => 
    !completedCodes.has(course.code.toUpperCase())
  );
}

// Count completed GE courses
function countCompletedGE(completedCourses) {
  return completedCourses.filter(c => isGECourse(c.title)).length;
}

// Get remaining GE slots
function getRemainingGESlots(completedCourses) {
  const completed = countCompletedGE(completedCourses);
  const required = currentProgram.geCoursesRequired || 9;
  return Math.max(0, required - completed);
}

// For backwards compatibility
const BSCS_CURRICULUM = UPLB_PROGRAMS["BSCS"];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    UPLB_PROGRAMS,
    COLLEGES,
    getCurrentCurriculum,
    setCurrentProgram,
    detectTrack,
    getFreeElectiveUnits,
    isGECourse,
    isRequiredCourse,
    getRemainingCourses,
    countCompletedGE,
    getRemainingGESlots,
    BSCS_CURRICULUM
  };
}
