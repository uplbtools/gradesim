// UPLB Curriculum Database
// Complete undergraduate programs for University of the Philippines Los Baños
// NOTE: This is UPLB only - not UP Diliman, UP Manila, UP Baguio, etc.

const UPLB_PROGRAMS = {
  // ============================================================================
  // COLLEGE OF ARTS AND SCIENCES (CAS)
  // ============================================================================
  
  "BSCS": {
    code: "BSCS",
    name: "BS Computer Science",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "CMSC 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "CMSC 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "CMSC 12", title: "Foundations of Computer Science", units: 3 },
      { code: "CMSC 21", title: "Fundamentals of Programming", units: 3 },
      { code: "CMSC 22", title: "Object-Oriented Programming", units: 3 },
      { code: "CMSC 23", title: "Mobile Computing", units: 3 },
      { code: "CMSC 56", title: "Discrete Mathematical Structures in Computer Science I", units: 3 },
      { code: "CMSC 57", title: "Discrete Mathematical Structures in Computer Science II", units: 3 },
      { code: "CMSC 100", title: "Web Programming", units: 3 },
      { code: "CMSC 123", title: "Data Structures", units: 3 },
      { code: "CMSC 124", title: "Design and Implementation of Programming Languages", units: 3 },
      { code: "CMSC 125", title: "Operating Systems", units: 3 },
      { code: "CMSC 127", title: "File Processing and Database Systems", units: 3 },
      { code: "CMSC 128", title: "Introduction to Software Engineering", units: 3 },
      { code: "CMSC 130", title: "Logic Design and Digital Computer Circuits", units: 3 },
      { code: "CMSC 131", title: "Introduction to Computer Organization and Machine Level Programming", units: 3 },
      { code: "CMSC 132", title: "Computer Architecture", units: 3 },
      { code: "CMSC 137", title: "Data Communications and Networking", units: 3 },
      { code: "CMSC 141", title: "Automata and Language Theory", units: 3 },
      { code: "CMSC 142", title: "Design and Analysis of Algorithms", units: 3 },
      { code: "CMSC 150", title: "Numerical and Symbolic Computation", units: 3 },
      { code: "CMSC 170", title: "Introduction to Artificial Intelligence", units: 3 },
      { code: "CMSC 173", title: "Human Computer Interaction", units: 3 },
      { code: "CMSC 180", title: "Introduction to Parallel Computing", units: 3 },
      { code: "CMSC 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "CMSC 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "MATH 27", "MATH 28", "CMSC 12", "CMSC 21", "CMSC 22", "CMSC 23",
      "CMSC 56", "CMSC 57", "CMSC 100", "CMSC 123", "CMSC 124", "CMSC 125",
      "CMSC 127", "CMSC 128", "CMSC 130", "CMSC 131", "CMSC 132", "CMSC 137",
      "CMSC 141", "CMSC 142", "CMSC 150", "CMSC 170", "CMSC 173", "CMSC 180",
      "STAT 101", "ENG 10"
    ]
  },
  
  "BSMATH": {
    code: "BSMATH",
    name: "BS Mathematics",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "MATH 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "MATH 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 37", title: "Mathematical Analysis II", units: 3 },
      { code: "MATH 38", title: "Mathematical Analysis III", units: 3 },
      { code: "MATH 40", title: "Linear Algebra", units: 3 },
      { code: "MATH 100.1", title: "Abstract Algebra I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "MATH 121.1", title: "Real Analysis I", units: 3 },
      { code: "MATH 122.1", title: "Complex Analysis I", units: 3 },
      { code: "MATH 171.1", title: "Linear Programming", units: 3 },
      { code: "MATH 176", title: "Numerical Analysis I", units: 3 },
      { code: "MATH 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "MATH 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CMSC 21", title: "Fundamentals of Programming", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "MATH 27", "MATH 28", "MATH 36", "MATH 37", "MATH 38", "MATH 40",
      "MATH 100.1", "MATH 114", "MATH 121.1", "MATH 122.1", "MATH 171.1", "MATH 176",
      "CMSC 21", "STAT 101", "ENG 10"
    ]
  },
  
  "BSAPMATH": {
    code: "BSAPMATH",
    name: "BS Applied Mathematics",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "AMAT 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "AMAT 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 37", title: "Mathematical Analysis II", units: 3 },
      { code: "MATH 38", title: "Mathematical Analysis III", units: 3 },
      { code: "MATH 40", title: "Linear Algebra", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "AMAT 131", title: "Mathematical Modeling", units: 3 },
      { code: "AMAT 151", title: "Operations Research I", units: 3 },
      { code: "AMAT 152", title: "Operations Research II", units: 3 },
      { code: "MATH 176", title: "Numerical Analysis I", units: 3 },
      { code: "AMAT 167", title: "Mathematical Finance", units: 3 },
      { code: "AMAT 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "AMAT 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CMSC 21", title: "Fundamentals of Programming", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "MATH 27", "MATH 28", "MATH 36", "MATH 37", "MATH 38", "MATH 40",
      "MATH 114", "AMAT 131", "AMAT 151", "AMAT 152", "MATH 176", "AMAT 167",
      "CMSC 21", "STAT 101", "ENG 10"
    ]
  },
  
  "BSSTAT": {
    code: "BSSTAT",
    name: "BS Statistics",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "STAT 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "STAT 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 40", title: "Linear Algebra", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "STAT 115", title: "Probability Theory", units: 3 },
      { code: "STAT 116", title: "Statistical Inference I", units: 3 },
      { code: "STAT 117", title: "Statistical Inference II", units: 3 },
      { code: "STAT 121", title: "Regression Analysis", units: 3 },
      { code: "STAT 126", title: "Design and Analysis of Experiments", units: 3 },
      { code: "STAT 131", title: "Sample Survey Designs", units: 3 },
      { code: "STAT 136", title: "Nonparametric Statistical Methods", units: 3 },
      { code: "STAT 137", title: "Multivariate Analysis", units: 3 },
      { code: "STAT 138", title: "Time Series Analysis", units: 3 },
      { code: "STAT 145", title: "Stochastic Processes", units: 3 },
      { code: "STAT 150", title: "Statistical Computing", units: 3 },
      { code: "STAT 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "STAT 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CMSC 21", title: "Fundamentals of Programming", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "MATH 27", "MATH 28", "MATH 40", "STAT 101", "STAT 115", "STAT 116",
      "STAT 117", "STAT 121", "STAT 126", "STAT 131", "STAT 136", "STAT 137",
      "STAT 138", "STAT 145", "STAT 150", "CMSC 21", "ENG 10"
    ]
  },
  
  "BSMST": {
    code: "BSMST",
    name: "BS Mathematics and Science Teaching",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 150,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 37", title: "Mathematical Analysis II", units: 3 },
      { code: "MATH 40", title: "Linear Algebra", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "EDUC 100", title: "The Teaching Profession", units: 3 },
      { code: "EDUC 101", title: "The Child and Adolescent Learner", units: 3 },
      { code: "EDUC 102", title: "Facilitating Learning", units: 3 },
      { code: "EDUC 103", title: "Curriculum Development", units: 3 },
      { code: "EDUC 110", title: "Principles of Teaching", units: 3 },
      { code: "EDUC 160", title: "Educational Assessment", units: 3 },
      { code: "EDUC 190", title: "Practice Teaching", units: 6, gradeType: "S/U" },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "MATH 27", "MATH 28", "MATH 36", "MATH 37", "MATH 40", "MATH 114",
      "STAT 101", "EDUC 100", "EDUC 101", "EDUC 102", "EDUC 103", "EDUC 110",
      "EDUC 160", "EDUC 190", "ENG 10"
    ]
  },
  
  "BSBIO": {
    code: "BSBIO",
    name: "BS Biology",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 155,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "BIO 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "BIO 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "BIO 1", title: "General Biology I", units: 3 },
      { code: "BIO 2", title: "General Biology II", units: 3 },
      { code: "BIO 30", title: "Cell Biology", units: 4 },
      { code: "BIO 31", title: "Genetics", units: 4 },
      { code: "BIO 100", title: "Taxonomy", units: 3 },
      { code: "BIO 110", title: "Developmental Biology", units: 4 },
      { code: "BIO 120", title: "Ecology", units: 4 },
      { code: "BIO 130", title: "Molecular Biology", units: 4 },
      { code: "BIO 140", title: "Physiology", units: 4 },
      { code: "BIO 150", title: "Evolution", units: 3 },
      { code: "BIO 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "BIO 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 41", title: "Organic Chemistry II", units: 5 },
      { code: "CHEM 31", title: "Elementary Biochemistry", units: 5 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "BIO 1", "BIO 2", "BIO 30", "BIO 31", "BIO 100", "BIO 110", "BIO 120",
      "BIO 130", "BIO 140", "BIO 150", "CHEM 16", "CHEM 17", "CHEM 40",
      "CHEM 41", "CHEM 31", "MATH 27", "PHYSICS 71", "PHYSICS 72", "STAT 101", "ENG 10"
    ]
  },
  
  "BSCHEM": {
    code: "BSCHEM",
    name: "BS Chemistry",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 155,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "CHEM 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "CHEM 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 26", title: "Analytical Chemistry I", units: 5 },
      { code: "CHEM 27", title: "Analytical Chemistry II", units: 5 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 41", title: "Organic Chemistry II", units: 5 },
      { code: "CHEM 110", title: "Inorganic Chemistry", units: 3 },
      { code: "CHEM 120", title: "Physical Chemistry I", units: 4 },
      { code: "CHEM 121", title: "Physical Chemistry II", units: 4 },
      { code: "CHEM 130", title: "Instrumental Methods of Analysis", units: 4 },
      { code: "CHEM 140", title: "Biochemistry I", units: 4 },
      { code: "CHEM 141", title: "Biochemistry II", units: 4 },
      { code: "CHEM 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "CHEM 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "CHEM 16", "CHEM 17", "CHEM 26", "CHEM 27", "CHEM 40", "CHEM 41",
      "CHEM 110", "CHEM 120", "CHEM 121", "CHEM 130", "CHEM 140", "CHEM 141",
      "MATH 27", "MATH 28", "PHYSICS 71", "PHYSICS 72", "STAT 101", "ENG 10"
    ]
  },
  
  "BSAPPHY": {
    code: "BSAPPHY",
    name: "BS Applied Physics",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 155,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "PHYSICS 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "PHYSICS 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "PHYSICS 73", title: "Elementary Physics III", units: 4 },
      { code: "PHYSICS 101", title: "Mathematical Methods of Physics I", units: 3 },
      { code: "PHYSICS 102", title: "Mathematical Methods of Physics II", units: 3 },
      { code: "PHYSICS 111", title: "Classical Mechanics", units: 3 },
      { code: "PHYSICS 121", title: "Electricity and Magnetism", units: 3 },
      { code: "PHYSICS 131", title: "Introduction to Quantum Mechanics", units: 3 },
      { code: "PHYSICS 141", title: "Thermodynamics and Statistical Mechanics", units: 3 },
      { code: "PHYSICS 151", title: "Electronics", units: 4 },
      { code: "PHYSICS 161", title: "Optics", units: 3 },
      { code: "PHYSICS 171", title: "Solid State Physics", units: 3 },
      { code: "PHYSICS 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "PHYSICS 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 37", title: "Mathematical Analysis II", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "PHYSICS 71", "PHYSICS 72", "PHYSICS 73", "PHYSICS 101", "PHYSICS 102",
      "PHYSICS 111", "PHYSICS 121", "PHYSICS 131", "PHYSICS 141", "PHYSICS 151",
      "PHYSICS 161", "PHYSICS 171", "MATH 27", "MATH 28", "MATH 36", "MATH 37",
      "MATH 114", "ENG 10"
    ]
  },
  
  "ABCOMM": {
    code: "ABCOMM",
    name: "AB Communication Arts",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "COMM 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "COMM 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "COMM 10", title: "Introduction to Communication", units: 3 },
      { code: "COMM 20", title: "Principles of Speech Communication", units: 3 },
      { code: "COMM 30", title: "Writing for Various Media", units: 3 },
      { code: "COMM 100", title: "Theories of Communication", units: 3 },
      { code: "COMM 110", title: "Rhetorical Criticism", units: 3 },
      { code: "COMM 120", title: "Intercultural Communication", units: 3 },
      { code: "COMM 130", title: "Organizational Communication", units: 3 },
      { code: "COMM 140", title: "Mass Communication", units: 3 },
      { code: "COMM 150", title: "Communication Research", units: 3 },
      { code: "COMM 160", title: "Seminar in Communication Arts", units: 3 },
      { code: "COMM 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "COMM 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      { code: "ENG 11", title: "English for Academic Writing", units: 3 },
      { code: "FIL 40", title: "Panitikang Filipino", units: 3 },
    ],
    requiredCodes: [
      "COMM 10", "COMM 20", "COMM 30", "COMM 100", "COMM 110", "COMM 120",
      "COMM 130", "COMM 140", "COMM 150", "COMM 160", "ENG 10", "ENG 11", "FIL 40"
    ]
  },
  
  "ABSOCIO": {
    code: "ABSOCIO",
    name: "AB Sociology",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "SOC 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "SOC 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "SOC 10", title: "Introduction to Sociology", units: 3 },
      { code: "SOC 100", title: "Classical Sociological Theory", units: 3 },
      { code: "SOC 101", title: "Contemporary Sociological Theory", units: 3 },
      { code: "SOC 110", title: "Social Research Methods I", units: 3 },
      { code: "SOC 111", title: "Social Research Methods II", units: 3 },
      { code: "SOC 120", title: "Sociology of Philippine Society", units: 3 },
      { code: "SOC 130", title: "Rural Sociology", units: 3 },
      { code: "SOC 140", title: "Urban Sociology", units: 3 },
      { code: "SOC 150", title: "Social Stratification", units: 3 },
      { code: "SOC 160", title: "Sociology of Development", units: 3 },
      { code: "SOC 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "SOC 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "SOC 10", "SOC 100", "SOC 101", "SOC 110", "SOC 111", "SOC 120",
      "SOC 130", "SOC 140", "SOC 150", "SOC 160", "STAT 101", "ENG 10"
    ]
  },
  
  "ABPHILO": {
    code: "ABPHILO",
    name: "AB Philosophy",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "PHILO 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "PHILO 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "PHILO 1", title: "Introduction to Philosophy", units: 3 },
      { code: "PHILO 10", title: "Logic", units: 3 },
      { code: "PHILO 100", title: "Ancient Philosophy", units: 3 },
      { code: "PHILO 101", title: "Medieval Philosophy", units: 3 },
      { code: "PHILO 102", title: "Modern Philosophy", units: 3 },
      { code: "PHILO 103", title: "Contemporary Philosophy", units: 3 },
      { code: "PHILO 110", title: "Ethics", units: 3 },
      { code: "PHILO 120", title: "Metaphysics", units: 3 },
      { code: "PHILO 130", title: "Epistemology", units: 3 },
      { code: "PHILO 140", title: "Philosophy of Mind", units: 3 },
      { code: "PHILO 150", title: "Filipino Philosophy", units: 3 },
      { code: "PHILO 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "PHILO 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "PHILO 1", "PHILO 10", "PHILO 100", "PHILO 101", "PHILO 102", "PHILO 103",
      "PHILO 110", "PHILO 120", "PHILO 130", "PHILO 140", "PHILO 150", "ENG 10"
    ]
  },
  
  // ============================================================================
  // COLLEGE OF AGRICULTURE AND FOOD SCIENCE (CAFS)
  // ============================================================================
  
  "BSAGRI": {
    code: "BSAGRI",
    name: "BS Agriculture",
    college: "CAFS",
    collegeName: "College of Agriculture and Food Science",
    available: true,
    totalUnitsRequired: 160,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "AGRI 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "AGRI 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "AGRI 10", title: "Introduction to Agriculture", units: 3 },
      { code: "AGRI 111", title: "Crop Science", units: 3 },
      { code: "AGRI 112", title: "Soil Science", units: 4 },
      { code: "AGRI 120", title: "Plant Pathology", units: 3 },
      { code: "AGRI 121", title: "Agricultural Entomology", units: 3 },
      { code: "AGRI 130", title: "Animal Science", units: 4 },
      { code: "AGRI 131", title: "Animal Nutrition", units: 3 },
      { code: "AGRI 140", title: "Agricultural Economics", units: 3 },
      { code: "AGRI 150", title: "Farm Management", units: 3 },
      { code: "AGRI 160", title: "Agricultural Extension", units: 3 },
      { code: "AGRI 170", title: "Seed Technology", units: 3 },
      { code: "AGRI 180", title: "Irrigation and Drainage", units: 3 },
      { code: "AGRI 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "AGRI 191", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      { code: "AGRI 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "BIO 1", title: "General Biology I", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "AGRI 10", "AGRI 111", "AGRI 112", "AGRI 120", "AGRI 121", "AGRI 130",
      "AGRI 131", "AGRI 140", "AGRI 150", "AGRI 160", "AGRI 170", "AGRI 180",
      "AGRI 191", "CHEM 16", "CHEM 17", "BIO 1", "STAT 101", "ENG 10"
    ]
  },
  
  "BSABIO": {
    code: "BSABIO",
    name: "BS Agricultural Biotechnology",
    college: "CAFS",
    collegeName: "College of Agriculture and Food Science",
    available: true,
    totalUnitsRequired: 160,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "ABIO 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "ABIO 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "ABIO 10", title: "Introduction to Agricultural Biotechnology", units: 3 },
      { code: "ABIO 100", title: "Principles of Biotechnology", units: 3 },
      { code: "ABIO 110", title: "Plant Biotechnology", units: 4 },
      { code: "ABIO 120", title: "Animal Biotechnology", units: 4 },
      { code: "ABIO 130", title: "Microbial Biotechnology", units: 4 },
      { code: "ABIO 140", title: "Molecular Biology Techniques", units: 4 },
      { code: "ABIO 150", title: "Genetic Engineering", units: 3 },
      { code: "ABIO 160", title: "Bioinformatics", units: 3 },
      { code: "ABIO 170", title: "Biosafety and Bioethics", units: 3 },
      { code: "ABIO 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "ABIO 191", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      { code: "ABIO 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 31", title: "Elementary Biochemistry", units: 5 },
      { code: "BIO 1", title: "General Biology I", units: 3 },
      { code: "BIO 31", title: "Genetics", units: 4 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "ABIO 10", "ABIO 100", "ABIO 110", "ABIO 120", "ABIO 130", "ABIO 140",
      "ABIO 150", "ABIO 160", "ABIO 170", "ABIO 191", "CHEM 16", "CHEM 17",
      "CHEM 40", "CHEM 31", "BIO 1", "BIO 31", "STAT 101", "ENG 10"
    ]
  },
  
  "BSFST": {
    code: "BSFST",
    name: "BS Food Science and Technology",
    college: "CAFS",
    collegeName: "College of Agriculture and Food Science",
    available: true,
    totalUnitsRequired: 165,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "FST 200", freeElectiveUnits: 9 },
      sp: { name: "Special Problem Track", code: "FST 190", freeElectiveUnits: 12 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "FST 10", title: "Introduction to Food Science and Technology", units: 3 },
      { code: "FST 100", title: "Food Chemistry", units: 4 },
      { code: "FST 101", title: "Food Analysis", units: 4 },
      { code: "FST 110", title: "Food Microbiology", units: 4 },
      { code: "FST 120", title: "Food Processing I", units: 4 },
      { code: "FST 121", title: "Food Processing II", units: 4 },
      { code: "FST 130", title: "Food Engineering", units: 3 },
      { code: "FST 140", title: "Food Quality Assurance", units: 3 },
      { code: "FST 150", title: "Sensory Evaluation of Foods", units: 3 },
      { code: "FST 160", title: "Food Packaging", units: 3 },
      { code: "FST 170", title: "Food Product Development", units: 3 },
      { code: "FST 180", title: "Food Laws and Regulations", units: 2 },
      { code: "FST 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "FST 191", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      { code: "FST 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 31", title: "Elementary Biochemistry", units: 5 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "FST 10", "FST 100", "FST 101", "FST 110", "FST 120", "FST 121",
      "FST 130", "FST 140", "FST 150", "FST 160", "FST 170", "FST 180", "FST 191",
      "CHEM 16", "CHEM 17", "CHEM 40", "CHEM 31", "STAT 101", "ENG 10"
    ]
  },
  
  "BSACHEM": {
    code: "BSACHEM",
    name: "BS Agricultural Chemistry",
    college: "CAFS",
    collegeName: "College of Agriculture and Food Science",
    available: true,
    totalUnitsRequired: 160,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "AGCHEM 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "AGCHEM 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "AGCHEM 10", title: "Introduction to Agricultural Chemistry", units: 3 },
      { code: "AGCHEM 100", title: "Soil Chemistry", units: 4 },
      { code: "AGCHEM 110", title: "Plant Biochemistry", units: 4 },
      { code: "AGCHEM 120", title: "Food Chemistry", units: 4 },
      { code: "AGCHEM 130", title: "Pesticide Chemistry", units: 3 },
      { code: "AGCHEM 140", title: "Environmental Chemistry", units: 3 },
      { code: "AGCHEM 150", title: "Instrumental Analysis", units: 4 },
      { code: "AGCHEM 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "AGCHEM 191", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      { code: "AGCHEM 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 26", title: "Analytical Chemistry I", units: 5 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 41", title: "Organic Chemistry II", units: 5 },
      { code: "CHEM 31", title: "Elementary Biochemistry", units: 5 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "AGCHEM 10", "AGCHEM 100", "AGCHEM 110", "AGCHEM 120", "AGCHEM 130",
      "AGCHEM 140", "AGCHEM 150", "AGCHEM 191", "CHEM 16", "CHEM 17", "CHEM 26",
      "CHEM 40", "CHEM 41", "CHEM 31", "MATH 27", "PHYSICS 71", "STAT 101", "ENG 10"
    ]
  },
  
  // ============================================================================
  // COLLEGE OF ENGINEERING AND AGRO-INDUSTRIAL TECHNOLOGY (CEAT)
  // ============================================================================
  
  "BSABE": {
    code: "BSABE",
    name: "BS Agricultural and Biosystems Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 180,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "ABE 21", title: "Engineering Drawing", units: 2 },
      { code: "ABE 31", title: "Computer-Aided Drafting", units: 2 },
      { code: "ABE 51", title: "Surveying", units: 3 },
      { code: "ABE 100", title: "Principles of Agricultural Engineering", units: 3 },
      { code: "ABE 111", title: "Farm Power and Machinery", units: 4 },
      { code: "ABE 121", title: "Soil and Water Conservation Engineering", units: 4 },
      { code: "ABE 131", title: "Irrigation and Drainage Engineering", units: 4 },
      { code: "ABE 141", title: "Agricultural Structures", units: 4 },
      { code: "ABE 151", title: "Post-Harvest Engineering", units: 4 },
      { code: "ABE 161", title: "Food Engineering", units: 4 },
      { code: "ABE 171", title: "Biosystems Engineering", units: 3 },
      { code: "ABE 181", title: "Environmental Engineering", units: 3 },
      { code: "ABE 190", title: "Engineering Design Project", units: 3 },
      { code: "ABE 191", title: "Engineering Internship", units: 3, gradeType: "S/U" },
      { code: "ABE 200", title: "Undergraduate Thesis", units: 6 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "ABE 21", "ABE 31", "ABE 51", "ABE 100", "ABE 111", "ABE 121", "ABE 131",
      "ABE 141", "ABE 151", "ABE 161", "ABE 171", "ABE 181", "ABE 190", "ABE 191",
      "MATH 27", "MATH 28", "MATH 36", "MATH 114", "PHYSICS 71", "PHYSICS 72",
      "CHEM 16", "ENG 10"
    ]
  },
  
  "BSCHE": {
    code: "BSCHE",
    name: "BS Chemical Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 180,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "CHE 21", title: "Material and Energy Balances", units: 4 },
      { code: "CHE 31", title: "Fluid Mechanics", units: 3 },
      { code: "CHE 41", title: "Heat Transfer", units: 3 },
      { code: "CHE 51", title: "Mass Transfer Operations I", units: 4 },
      { code: "CHE 52", title: "Mass Transfer Operations II", units: 4 },
      { code: "CHE 101", title: "Chemical Engineering Thermodynamics I", units: 3 },
      { code: "CHE 102", title: "Chemical Engineering Thermodynamics II", units: 3 },
      { code: "CHE 111", title: "Chemical Reaction Engineering", units: 4 },
      { code: "CHE 121", title: "Process Control", units: 3 },
      { code: "CHE 131", title: "Chemical Engineering Plant Design", units: 4 },
      { code: "CHE 141", title: "Biochemical Engineering", units: 3 },
      { code: "CHE 151", title: "Environmental Engineering", units: 3 },
      { code: "CHE 190", title: "Engineering Design Project", units: 3 },
      { code: "CHE 191", title: "Engineering Internship", units: 3, gradeType: "S/U" },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 26", title: "Analytical Chemistry I", units: 5 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 120", title: "Physical Chemistry I", units: 4 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "CHE 21", "CHE 31", "CHE 41", "CHE 51", "CHE 52", "CHE 101", "CHE 102",
      "CHE 111", "CHE 121", "CHE 131", "CHE 141", "CHE 151", "CHE 190", "CHE 191",
      "CHEM 16", "CHEM 17", "CHEM 26", "CHEM 40", "CHEM 120",
      "MATH 27", "MATH 28", "MATH 36", "MATH 114", "PHYSICS 71", "PHYSICS 72", "ENG 10"
    ]
  },
  
  "BSCE": {
    code: "BSCE",
    name: "BS Civil Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 180,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "CE 21", title: "Engineering Drawing", units: 2 },
      { code: "CE 31", title: "Surveying I", units: 3 },
      { code: "CE 32", title: "Surveying II", units: 3 },
      { code: "CE 41", title: "Engineering Mechanics - Statics", units: 3 },
      { code: "CE 42", title: "Engineering Mechanics - Dynamics", units: 3 },
      { code: "CE 51", title: "Mechanics of Deformable Bodies", units: 4 },
      { code: "CE 101", title: "Structural Theory I", units: 4 },
      { code: "CE 102", title: "Structural Theory II", units: 4 },
      { code: "CE 111", title: "Reinforced Concrete Design", units: 4 },
      { code: "CE 112", title: "Steel Design", units: 4 },
      { code: "CE 121", title: "Geotechnical Engineering I", units: 4 },
      { code: "CE 122", title: "Geotechnical Engineering II", units: 4 },
      { code: "CE 131", title: "Hydraulics", units: 4 },
      { code: "CE 132", title: "Hydrology", units: 3 },
      { code: "CE 141", title: "Highway and Transportation Engineering", units: 4 },
      { code: "CE 151", title: "Construction Methods and Management", units: 3 },
      { code: "CE 161", title: "Engineering Economy", units: 3 },
      { code: "CE 190", title: "Civil Engineering Design", units: 4 },
      { code: "CE 191", title: "Engineering Internship", units: 3, gradeType: "S/U" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "CE 21", "CE 31", "CE 32", "CE 41", "CE 42", "CE 51", "CE 101", "CE 102",
      "CE 111", "CE 112", "CE 121", "CE 122", "CE 131", "CE 132", "CE 141",
      "CE 151", "CE 161", "CE 190", "CE 191", "MATH 27", "MATH 28", "MATH 36",
      "MATH 114", "PHYSICS 71", "PHYSICS 72", "CHEM 16", "ENG 10"
    ]
  },
  
  "BSEE": {
    code: "BSEE",
    name: "BS Electrical Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 180,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "EE 21", title: "Electrical Circuits I", units: 4 },
      { code: "EE 22", title: "Electrical Circuits II", units: 4 },
      { code: "EE 31", title: "Electronics I", units: 4 },
      { code: "EE 32", title: "Electronics II", units: 4 },
      { code: "EE 41", title: "Digital Systems", units: 4 },
      { code: "EE 51", title: "Electromagnetic Theory", units: 3 },
      { code: "EE 101", title: "Electrical Machines I", units: 4 },
      { code: "EE 102", title: "Electrical Machines II", units: 4 },
      { code: "EE 111", title: "Power Systems I", units: 4 },
      { code: "EE 112", title: "Power Systems II", units: 4 },
      { code: "EE 121", title: "Control Systems", units: 4 },
      { code: "EE 131", title: "Communications I", units: 4 },
      { code: "EE 141", title: "Microprocessor Systems", units: 4 },
      { code: "EE 151", title: "Instrumentation and Measurements", units: 3 },
      { code: "EE 190", title: "Electrical Engineering Design", units: 4 },
      { code: "EE 191", title: "Engineering Internship", units: 3, gradeType: "S/U" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "EE 21", "EE 22", "EE 31", "EE 32", "EE 41", "EE 51", "EE 101", "EE 102",
      "EE 111", "EE 112", "EE 121", "EE 131", "EE 141", "EE 151", "EE 190", "EE 191",
      "MATH 27", "MATH 28", "MATH 36", "MATH 114", "PHYSICS 71", "PHYSICS 72",
      "CHEM 16", "ENG 10"
    ]
  },
  
  "BSIE": {
    code: "BSIE",
    name: "BS Industrial Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 175,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "IE 21", title: "Engineering Drawing", units: 2 },
      { code: "IE 31", title: "Work Study and Motion Analysis", units: 3 },
      { code: "IE 41", title: "Engineering Economy", units: 3 },
      { code: "IE 51", title: "Engineering Statistics", units: 3 },
      { code: "IE 101", title: "Operations Research I", units: 3 },
      { code: "IE 102", title: "Operations Research II", units: 3 },
      { code: "IE 111", title: "Production Planning and Control", units: 4 },
      { code: "IE 121", title: "Facilities Planning and Design", units: 4 },
      { code: "IE 131", title: "Quality Control", units: 3 },
      { code: "IE 141", title: "Supply Chain Management", units: 3 },
      { code: "IE 151", title: "Systems Simulation", units: 3 },
      { code: "IE 161", title: "Ergonomics", units: 3 },
      { code: "IE 171", title: "Engineering Management", units: 3 },
      { code: "IE 190", title: "Industrial Engineering Design", units: 4 },
      { code: "IE 191", title: "Engineering Internship", units: 3, gradeType: "S/U" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "IE 21", "IE 31", "IE 41", "IE 51", "IE 101", "IE 102", "IE 111", "IE 121",
      "IE 131", "IE 141", "IE 151", "IE 161", "IE 171", "IE 190", "IE 191",
      "MATH 27", "MATH 28", "MATH 36", "MATH 114", "PHYSICS 71", "PHYSICS 72",
      "CHEM 16", "ENG 10"
    ]
  },
  
  "BSME": {
    code: "BSME",
    name: "BS Mechanical Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 180,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "ME 21", title: "Engineering Drawing", units: 2 },
      { code: "ME 31", title: "Engineering Mechanics - Statics", units: 3 },
      { code: "ME 32", title: "Engineering Mechanics - Dynamics", units: 3 },
      { code: "ME 41", title: "Mechanics of Materials", units: 4 },
      { code: "ME 51", title: "Thermodynamics I", units: 4 },
      { code: "ME 52", title: "Thermodynamics II", units: 4 },
      { code: "ME 101", title: "Fluid Mechanics", units: 4 },
      { code: "ME 111", title: "Machine Design I", units: 4 },
      { code: "ME 112", title: "Machine Design II", units: 4 },
      { code: "ME 121", title: "Heat Transfer", units: 4 },
      { code: "ME 131", title: "Power Plant Engineering", units: 3 },
      { code: "ME 141", title: "Refrigeration and Air Conditioning", units: 3 },
      { code: "ME 151", title: "Manufacturing Processes", units: 4 },
      { code: "ME 161", title: "Dynamics of Machinery", units: 3 },
      { code: "ME 171", title: "Control Systems", units: 3 },
      { code: "ME 190", title: "Mechanical Engineering Design", units: 4 },
      { code: "ME 191", title: "Engineering Internship", units: 3, gradeType: "S/U" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "ME 21", "ME 31", "ME 32", "ME 41", "ME 51", "ME 52", "ME 101", "ME 111",
      "ME 112", "ME 121", "ME 131", "ME 141", "ME 151", "ME 161", "ME 171",
      "ME 190", "ME 191", "MATH 27", "MATH 28", "MATH 36", "MATH 114",
      "PHYSICS 71", "PHYSICS 72", "CHEM 16", "ENG 10"
    ]
  },
  
  "BSMATE": {
    code: "BSMATE",
    name: "BS Materials Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 175,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "MATE 21", title: "Engineering Drawing", units: 2 },
      { code: "MATE 31", title: "Introduction to Materials Science", units: 3 },
      { code: "MATE 41", title: "Structure of Materials", units: 4 },
      { code: "MATE 101", title: "Physical Metallurgy", units: 4 },
      { code: "MATE 111", title: "Mechanical Behavior of Materials", units: 4 },
      { code: "MATE 121", title: "Ceramic Materials", units: 3 },
      { code: "MATE 131", title: "Polymer Materials", units: 3 },
      { code: "MATE 141", title: "Electronic Materials", units: 3 },
      { code: "MATE 151", title: "Corrosion Engineering", units: 3 },
      { code: "MATE 161", title: "Materials Characterization", units: 4 },
      { code: "MATE 171", title: "Materials Processing", units: 4 },
      { code: "MATE 181", title: "Materials Selection and Design", units: 3 },
      { code: "MATE 190", title: "Materials Engineering Design", units: 4 },
      { code: "MATE 191", title: "Engineering Internship", units: 3, gradeType: "S/U" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 114", title: "Differential Equations", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "MATE 21", "MATE 31", "MATE 41", "MATE 101", "MATE 111", "MATE 121",
      "MATE 131", "MATE 141", "MATE 151", "MATE 161", "MATE 171", "MATE 181",
      "MATE 190", "MATE 191", "MATH 27", "MATH 28", "MATH 114",
      "PHYSICS 71", "PHYSICS 72", "CHEM 16", "CHEM 17", "ENG 10"
    ]
  },
  
  // ============================================================================
  // COLLEGE OF ECONOMICS AND MANAGEMENT (CEM)
  // ============================================================================
  
  "BSECON": {
    code: "BSECON",
    name: "BS Economics",
    college: "CEM",
    collegeName: "College of Economics and Management",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "ECON 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "ECON 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "ECON 11", title: "Introductory Economics (Micro)", units: 3 },
      { code: "ECON 12", title: "Introductory Economics (Macro)", units: 3 },
      { code: "ECON 100", title: "Microeconomic Theory", units: 3 },
      { code: "ECON 101", title: "Macroeconomic Theory", units: 3 },
      { code: "ECON 110", title: "Mathematical Economics", units: 3 },
      { code: "ECON 111", title: "Econometrics I", units: 3 },
      { code: "ECON 112", title: "Econometrics II", units: 3 },
      { code: "ECON 120", title: "Development Economics", units: 3 },
      { code: "ECON 130", title: "Public Finance", units: 3 },
      { code: "ECON 140", title: "International Economics", units: 3 },
      { code: "ECON 150", title: "Monetary Economics", units: 3 },
      { code: "ECON 160", title: "Labor Economics", units: 3 },
      { code: "ECON 170", title: "History of Economic Thought", units: 3 },
      { code: "ECON 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "ECON 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "ECON 11", "ECON 12", "ECON 100", "ECON 101", "ECON 110", "ECON 111",
      "ECON 112", "ECON 120", "ECON 130", "ECON 140", "ECON 150", "ECON 160",
      "ECON 170", "MATH 27", "STAT 101", "ENG 10"
    ]
  },
  
  "BSAE": {
    code: "BSAE",
    name: "BS Agricultural Economics",
    college: "CEM",
    collegeName: "College of Economics and Management",
    available: true,
    totalUnitsRequired: 145,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "AGEC 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "AGEC 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "ECON 11", title: "Introductory Economics (Micro)", units: 3 },
      { code: "ECON 12", title: "Introductory Economics (Macro)", units: 3 },
      { code: "AGEC 100", title: "Microeconomic Theory for Agricultural Economics", units: 3 },
      { code: "AGEC 101", title: "Macroeconomic Theory for Agricultural Economics", units: 3 },
      { code: "AGEC 110", title: "Agricultural Production Economics", units: 3 },
      { code: "AGEC 120", title: "Agricultural Marketing", units: 3 },
      { code: "AGEC 130", title: "Agricultural Finance", units: 3 },
      { code: "AGEC 140", title: "Agricultural Policy", units: 3 },
      { code: "AGEC 150", title: "Agricultural Development", units: 3 },
      { code: "AGEC 160", title: "Natural Resource Economics", units: 3 },
      { code: "AGEC 170", title: "Food and Agricultural Trade", units: 3 },
      { code: "AGEC 180", title: "Quantitative Methods in Agricultural Economics", units: 3 },
      { code: "AGEC 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "AGEC 191", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      { code: "AGEC 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "AGRI 10", title: "Introduction to Agriculture", units: 3 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "ECON 11", "ECON 12", "AGEC 100", "AGEC 101", "AGEC 110", "AGEC 120",
      "AGEC 130", "AGEC 140", "AGEC 150", "AGEC 160", "AGEC 170", "AGEC 180",
      "AGEC 191", "AGRI 10", "MATH 27", "STAT 101", "ENG 10"
    ]
  },
  
  "BSABM": {
    code: "BSABM",
    name: "BS Agribusiness Management",
    college: "CEM",
    collegeName: "College of Economics and Management",
    available: true,
    totalUnitsRequired: 145,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "ABM 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "ABM 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "ECON 11", title: "Introductory Economics (Micro)", units: 3 },
      { code: "ECON 12", title: "Introductory Economics (Macro)", units: 3 },
      { code: "ABM 100", title: "Principles of Management", units: 3 },
      { code: "ABM 110", title: "Agribusiness Management", units: 3 },
      { code: "ABM 120", title: "Agribusiness Marketing", units: 3 },
      { code: "ABM 130", title: "Agribusiness Finance", units: 3 },
      { code: "ABM 140", title: "Agribusiness Operations Management", units: 3 },
      { code: "ABM 150", title: "Agribusiness Entrepreneurship", units: 3 },
      { code: "ABM 160", title: "Agribusiness Strategic Management", units: 3 },
      { code: "ABM 170", title: "Agribusiness Supply Chain Management", units: 3 },
      { code: "ABM 180", title: "Agribusiness Information Systems", units: 3 },
      { code: "ABM 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "ABM 191", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      { code: "ABM 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "AGRI 10", title: "Introduction to Agriculture", units: 3 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ACCTG 11", title: "Fundamentals of Accounting", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "ECON 11", "ECON 12", "ABM 100", "ABM 110", "ABM 120", "ABM 130",
      "ABM 140", "ABM 150", "ABM 160", "ABM 170", "ABM 180", "ABM 191",
      "AGRI 10", "MATH 27", "STAT 101", "ACCTG 11", "ENG 10"
    ]
  },
  
  // ============================================================================
  // COLLEGE OF FORESTRY AND NATURAL RESOURCES (CFNR)
  // ============================================================================
  
  "BSFOR": {
    code: "BSFOR",
    name: "BS Forestry",
    college: "CFNR",
    collegeName: "College of Forestry and Natural Resources",
    available: true,
    totalUnitsRequired: 175,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "FOR 200", freeElectiveUnits: 9 },
      sp: { name: "Special Problem Track", code: "FOR 190", freeElectiveUnits: 12 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "FOR 1", title: "Introduction to Forestry", units: 3 },
      { code: "FOR 21", title: "Dendrology", units: 3 },
      { code: "FOR 31", title: "Forest Mensuration", units: 4 },
      { code: "FOR 41", title: "Silvics and Silviculture", units: 4 },
      { code: "FOR 51", title: "Forest Ecology", units: 3 },
      { code: "FOR 101", title: "Forest Management", units: 4 },
      { code: "FOR 111", title: "Forest Utilization", units: 4 },
      { code: "FOR 121", title: "Forest Protection", units: 3 },
      { code: "FOR 131", title: "Wood Science and Technology", units: 4 },
      { code: "FOR 141", title: "Forest Policy and Administration", units: 3 },
      { code: "FOR 151", title: "Watershed Management", units: 3 },
      { code: "FOR 161", title: "Social Forestry", units: 3 },
      { code: "FOR 171", title: "Forest Economics", units: 3 },
      { code: "FOR 181", title: "Forest Engineering", units: 4 },
      { code: "FOR 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "FOR 191", title: "Forestry Field Practice", units: 6, gradeType: "S/U" },
      { code: "FOR 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "BIO 1", title: "General Biology I", units: 3 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "FOR 1", "FOR 21", "FOR 31", "FOR 41", "FOR 51", "FOR 101", "FOR 111",
      "FOR 121", "FOR 131", "FOR 141", "FOR 151", "FOR 161", "FOR 171", "FOR 181",
      "FOR 191", "BIO 1", "CHEM 16", "STAT 101", "ENG 10"
    ]
  },
  
  // ============================================================================
  // COLLEGE OF HUMAN ECOLOGY (CHE)
  // ============================================================================
  
  "BSHE": {
    code: "BSHE",
    name: "BS Human Ecology",
    college: "CHE",
    collegeName: "College of Human Ecology",
    available: true,
    totalUnitsRequired: 145,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "HE 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "HE 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "HE 10", title: "Introduction to Human Ecology", units: 3 },
      { code: "HE 100", title: "Family Resource Management", units: 3 },
      { code: "HE 110", title: "Consumer Economics", units: 3 },
      { code: "HE 120", title: "Human Development", units: 3 },
      { code: "HE 130", title: "Family Studies", units: 3 },
      { code: "HE 140", title: "Community Development", units: 3 },
      { code: "HE 150", title: "Housing and Interior Design", units: 3 },
      { code: "HE 160", title: "Clothing and Textiles", units: 3 },
      { code: "HE 170", title: "Food and Nutrition", units: 3 },
      { code: "HE 180", title: "Research Methods in Human Ecology", units: 3 },
      { code: "HE 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "HE 191", title: "Practicum", units: 3, gradeType: "S/U" },
      { code: "HE 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "HE 10", "HE 100", "HE 110", "HE 120", "HE 130", "HE 140", "HE 150",
      "HE 160", "HE 170", "HE 180", "HE 191", "STAT 101", "ENG 10"
    ]
  },
  
  "BSNUTRI": {
    code: "BSNUTRI",
    name: "BS Nutrition",
    college: "CHE",
    collegeName: "College of Human Ecology",
    available: true,
    totalUnitsRequired: 165,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "NUT 200", freeElectiveUnits: 9 },
      sp: { name: "Special Problem Track", code: "NUT 190", freeElectiveUnits: 12 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "NUT 11", title: "Fundamentals of Nutrition", units: 3 },
      { code: "NUT 100", title: "Principles of Nutrition", units: 3 },
      { code: "NUT 101", title: "Advanced Nutrition", units: 3 },
      { code: "NUT 110", title: "Nutrition Assessment", units: 3 },
      { code: "NUT 120", title: "Diet Therapy", units: 4 },
      { code: "NUT 130", title: "Community Nutrition", units: 3 },
      { code: "NUT 140", title: "Food Service Management", units: 3 },
      { code: "NUT 150", title: "Nutrition Education", units: 3 },
      { code: "NUT 160", title: "Nutrition Research Methods", units: 3 },
      { code: "NUT 170", title: "Sports Nutrition", units: 3 },
      { code: "NUT 180", title: "Nutrition in the Life Cycle", units: 3 },
      { code: "NUT 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "NUT 191", title: "Dietetic Internship", units: 6, gradeType: "S/U" },
      { code: "NUT 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 31", title: "Elementary Biochemistry", units: 5 },
      { code: "BIO 1", title: "General Biology I", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "NUT 11", "NUT 100", "NUT 101", "NUT 110", "NUT 120", "NUT 130", "NUT 140",
      "NUT 150", "NUT 160", "NUT 170", "NUT 180", "NUT 191",
      "CHEM 16", "CHEM 17", "CHEM 40", "CHEM 31", "BIO 1", "STAT 101", "ENG 10"
    ]
  },
  
  // ============================================================================
  // COLLEGE OF DEVELOPMENT COMMUNICATION (CDC)
  // ============================================================================
  
  "BSDC": {
    code: "BSDC",
    name: "BS Development Communication",
    college: "CDC",
    collegeName: "College of Development Communication",
    available: true,
    totalUnitsRequired: 150,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "DEVC 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "DEVC 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "DEVC 10", title: "Introduction to Development Communication", units: 3 },
      { code: "DEVC 20", title: "Communication Theories", units: 3 },
      { code: "DEVC 30", title: "Communication Research Methods", units: 3 },
      { code: "DEVC 40", title: "Development Journalism", units: 3 },
      { code: "DEVC 50", title: "Development Broadcasting", units: 3 },
      { code: "DEVC 60", title: "Educational Communication", units: 3 },
      { code: "DEVC 100", title: "Development Communication Campaigns", units: 3 },
      { code: "DEVC 110", title: "Science Communication", units: 3 },
      { code: "DEVC 120", title: "Community Media", units: 3 },
      { code: "DEVC 130", title: "New Media and ICT4D", units: 3 },
      { code: "DEVC 140", title: "Communication Planning and Management", units: 3 },
      { code: "DEVC 150", title: "Risk and Crisis Communication", units: 3 },
      { code: "DEVC 160", title: "Environmental Communication", units: 3 },
      { code: "DEVC 190", title: "Special Problem", units: 3, track: "sp" },
      { code: "DEVC 191", title: "Academic Field Instruction", units: 6, gradeType: "S/U" },
      { code: "DEVC 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "DEVC 10", "DEVC 20", "DEVC 30", "DEVC 40", "DEVC 50", "DEVC 60",
      "DEVC 100", "DEVC 110", "DEVC 120", "DEVC 130", "DEVC 140", "DEVC 150",
      "DEVC 160", "DEVC 191", "STAT 101", "ENG 10"
    ]
  },
  
  "ASDC": {
    code: "ASDC",
    name: "Associate of Science in Development Communication",
    college: "CDC",
    collegeName: "College of Development Communication",
    available: true,
    totalUnitsRequired: 72,
    geCoursesRequired: 6,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "DEVC 10", title: "Introduction to Development Communication", units: 3 },
      { code: "DEVC 20", title: "Communication Theories", units: 3 },
      { code: "DEVC 30", title: "Communication Research Methods", units: 3 },
      { code: "DEVC 40", title: "Development Journalism", units: 3 },
      { code: "DEVC 50", title: "Development Broadcasting", units: 3 },
      { code: "DEVC 60", title: "Educational Communication", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "DEVC 10", "DEVC 20", "DEVC 30", "DEVC 40", "DEVC 50", "DEVC 60", "ENG 10"
    ]
  },
  
  // ============================================================================
  // COLLEGE OF VETERINARY MEDICINE (CVM)
  // ============================================================================
  
  "DVM": {
    code: "DVM",
    name: "Doctor of Veterinary Medicine",
    college: "CVM",
    collegeName: "College of Veterinary Medicine",
    available: true,
    totalUnitsRequired: 220,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "VET 11", title: "Veterinary Anatomy I", units: 5 },
      { code: "VET 12", title: "Veterinary Anatomy II", units: 5 },
      { code: "VET 21", title: "Veterinary Physiology I", units: 4 },
      { code: "VET 22", title: "Veterinary Physiology II", units: 4 },
      { code: "VET 31", title: "Veterinary Biochemistry", units: 5 },
      { code: "VET 41", title: "Veterinary Microbiology", units: 5 },
      { code: "VET 51", title: "Veterinary Parasitology", units: 5 },
      { code: "VET 61", title: "Veterinary Pathology", units: 5 },
      { code: "VET 71", title: "Veterinary Pharmacology", units: 4 },
      { code: "VET 101", title: "Veterinary Medicine I", units: 4 },
      { code: "VET 102", title: "Veterinary Medicine II", units: 4 },
      { code: "VET 111", title: "Veterinary Surgery I", units: 4 },
      { code: "VET 112", title: "Veterinary Surgery II", units: 4 },
      { code: "VET 121", title: "Theriogenology", units: 4 },
      { code: "VET 131", title: "Veterinary Public Health", units: 3 },
      { code: "VET 141", title: "Poultry Diseases", units: 3 },
      { code: "VET 151", title: "Swine Diseases", units: 3 },
      { code: "VET 161", title: "Ruminant Diseases", units: 3 },
      { code: "VET 171", title: "Small Animal Medicine", units: 3 },
      { code: "VET 181", title: "Veterinary Radiology", units: 3 },
      { code: "VET 190", title: "Clinical Clerkship", units: 12, gradeType: "S/U" },
      { code: "VET 200", title: "Thesis/Special Problem", units: 6 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "CHEM 31", title: "Elementary Biochemistry", units: 5 },
      { code: "BIO 1", title: "General Biology I", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
    ],
    requiredCodes: [
      "VET 11", "VET 12", "VET 21", "VET 22", "VET 31", "VET 41", "VET 51",
      "VET 61", "VET 71", "VET 101", "VET 102", "VET 111", "VET 112", "VET 121",
      "VET 131", "VET 141", "VET 151", "VET 161", "VET 171", "VET 181", "VET 190",
      "CHEM 16", "CHEM 17", "CHEM 40", "CHEM 31", "BIO 1", "PHYSICS 71",
      "STAT 101", "ENG 10"
    ]
  },
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
    return true;
  }
  return false;
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
