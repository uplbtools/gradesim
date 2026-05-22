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
    totalUnitsRequired: 130,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "CMSC 200", freeElectiveUnits: 15 },
      sp: { name: "Special Problem Track", code: "CMSC 190", freeElectiveUnits: 18 }
    },
    defaultTrack: "sp",
    majorCourses: [
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus II", units: 3 },
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
    totalUnitsRequired: 129,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "MATH 200", freeElectiveUnits: 9, majorElectiveUnits: 6 },
      sp: { name: "Special Problem Track", code: "MATH 190", freeElectiveUnits: 9, majorElectiveUnits: 9 }
    },
    defaultTrack: "sp",
    majorCourses: [
      // First Year - First Semester
      { code: "MATH 20", title: "The Landscape of Mathematics", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 5 },
      { code: "BIO 11.1", title: "Investigative Biology Laboratory", units: 2 },
      // First Year - Second Semester
      { code: "MATH 37", title: "Mathematical Analysis II", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 3 },
      // Second Year - First Semester
      { code: "MATH 38", title: "Mathematical Analysis III", units: 5 },
      { code: "MATH 101", title: "Logic and Set Theory", units: 3 },
      { code: "PHYS 51", title: "Elements of Physics", units: 4 },
      { code: "PHYS 51.1", title: "Elements of Physics Laboratory", units: 1 },
      // Second Year - Second Semester
      { code: "MATH 103", title: "Elementary Theory of Numbers", units: 3 },
      { code: "MATH 138", title: "Introductory Topology", units: 3 },
      { code: "MATH 141", title: "Introductory Combinatorics", units: 3 },
      { code: "AMAT 152", title: "Fundamentals of Mathematical Computing", units: 3 },
      // Third Year - First Semester
      { code: "MATH 111", title: "Modern Algebra I", units: 3 },
      { code: "MATH 155", title: "Advanced Calculus I", units: 3 },
      { code: "MATH 195", title: "Research Methods in Mathematics", units: 3 },
      { code: "COMA 150", title: "Workplace Communication", units: 3 },
      // Third Year - Second Semester
      { code: "MATH 120", title: "Linear Algebra", units: 3 },
      { code: "MATH 133", title: "Euclidean and Non-Euclidean Geometry", units: 3 },
      { code: "MATH 151", title: "Ordinary Differential Equations", units: 3 },
      // Third Year - Midyear
      { code: "MATH 198", title: "Practicum", units: 3 },
      // Fourth Year
      { code: "MATH 135", title: "Projective Geometry", units: 3 },
      { code: "MATH 165", title: "Complex Analysis I", units: 3 },
      { code: "MATH 181", title: "Introduction to Probability Theory", units: 3 },
      { code: "MATH 192", title: "Foundations of Mathematics", units: 3 },
      { code: "MATH 199", title: "Undergraduate Seminar", units: 1 },
      { code: "MATH 190", title: "Special Problems", units: 3, track: "sp" },
      { code: "MATH 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
    ],
    requiredCodes: [
      "MATH 20", "MATH 36", "MATH 37", "MATH 38",
      "MATH 101", "MATH 103", "MATH 111", "MATH 120", "MATH 133", "MATH 135",
      "MATH 138", "MATH 141", "MATH 151", "MATH 155", "MATH 165", "MATH 181",
      "MATH 192", "MATH 195", "MATH 198", "MATH 199",
      "AMAT 152", "BIO 11.1", "CHEM 18", "CHEM 18.1", "COMA 150",
      "PHYS 51", "PHYS 51.1", "STAT 101"
    ]
  },
  
  "BSAPMATH": {
    code: "BSAPMATH",
    name: "BS Applied Mathematics",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 131,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "AMAT 200", freeElectiveUnits: 9, majorElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "AMAT 190", freeElectiveUnits: 12, majorElectiveUnits: 15 }
    },
    defaultTrack: "sp",
    majorCourses: [
      // First Year
      { code: "AMAT 19", title: "Finite Mathematics", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 5 },
      { code: "MATH 37", title: "Mathematical Analysis II", units: 3 },
      { code: "MATH 38", title: "Mathematical Analysis III", units: 5 },
      { code: "BIO 11.1", title: "Investigative Biology Laboratory", units: 2 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      // Second Year
      { code: "AMAT 110", title: "Mathematical Modeling", units: 3 },
      { code: "AMAT 105", title: "Matrices and Applications", units: 3 },
      { code: "AMAT 112", title: "Introduction to Mathematical Optimization", units: 3 },
      { code: "AMAT 152", title: "Fundamentals of Mathematical Computing", units: 3 },
      { code: "AMAT 170", title: "Theory of Interest", units: 4 },
      { code: "MATH 101", title: "Logic and Set Theory", units: 3 },
      { code: "PHYS 51", title: "Elements of Physics", units: 4 },
      { code: "PHYS 51.1", title: "Elements of Physics Laboratory", units: 1 },
      // Third Year
      { code: "MATH 151", title: "Ordinary Differential Equations", units: 3 },
      { code: "MATH 155", title: "Advanced Calculus I", units: 3 },
      { code: "MATH 174", title: "Numerical Analysis I", units: 3 },
      { code: "MATH 175", title: "Numerical Analysis II", units: 3 },
      { code: "MATH 181", title: "Introduction to Probability Theory", units: 3 },
      { code: "MATH 195", title: "Research Methods in Mathematics", units: 3 },
      { code: "COMA 150", title: "Workplace Communication", units: 3 },
      // Fourth Year
      { code: "AMAT 198", title: "Practicum", units: 3 },
      { code: "AMAT 199", title: "Undergraduate Seminar", units: 1 },
      { code: "AMAT 190", title: "Special Problems", units: 3, track: "sp" },
      { code: "AMAT 200", title: "Undergraduate Thesis", units: 3, track: "thesis" },
    ],
    requiredCodes: [
      "AMAT 19", "MATH 36", "MATH 37", "MATH 38",
      "BIO 11.1", "CHEM 18", "CHEM 18.1", "STAT 101",
      "AMAT 110", "AMAT 105", "AMAT 112", "AMAT 152", "AMAT 170",
      "MATH 101", "PHYS 51", "PHYS 51.1",
      "MATH 151", "MATH 155", "MATH 174", "MATH 175", "MATH 181", "MATH 195",
      "COMA 150", "AMAT 198", "AMAT 199"
    ]
  },
  
  "BSSTAT": {
    code: "BSSTAT",
    name: "BS Statistics",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 143,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "STAT 135", title: "Logic and Matrix Algebra in Statistics", units: 3 },
      { code: "STAT 162", title: "Experimental Designs", units: 3 },
      { code: "STAT 182", title: "Statistical Packages", units: 3 },
      { code: "BIO 30", title: "Genetics", units: 3 },
      { code: "CMSC 12", title: "Foundations of Computer Science", units: 3 },
      // Second Year
      { code: "CMSC 21", title: "Fundamentals of Programming", units: 3 },
      { code: "CMSC 22", title: "Object-Oriented Programming", units: 3 },
      { code: "MATH 182", title: "Introduction to Stochastic Processes", units: 3 },
      { code: "STAT 144", title: "Introductory Statistical Theory I", units: 3 },
      { code: "STAT 145", title: "Introductory Statistical Theory II", units: 3 },
      { code: "STAT 163", title: "Survey Designs", units: 3 },
      { code: "STAT 168", title: "Response Surface Methodology", units: 3 },
      // Third Year
      { code: "CMSC 127", title: "File Processing and Database Systems", units: 3 },
      { code: "STAT 146", title: "Introductory Statistical Theory III", units: 3 },
      { code: "STAT 147", title: "Introduction to the Theory of Nonparametric Statistics", units: 4 },
      { code: "STAT 151", title: "Applied Regression and Correlation", units: 3 },
      { code: "STAT 156", title: "Introductory Time Series Analysis", units: 3 },
      { code: "STAT 173", title: "Survey Operations", units: 3 },
      { code: "STAT 174", title: "Introductory Biostatistics", units: 3 },
      { code: "STAT 175", title: "Analysis of Multivariate Data", units: 3 },
      { code: "STAT 181", title: "Statistical Computing", units: 3 },
      { code: "STAT 192.1", title: "Statistical Consulting Laboratory", units: 1 },
      { code: "STAT 198", title: "Practicum", units: 3 },
      // Fourth Year
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      { code: "STAT 148", title: "Introductory Bayesian Statistics", units: 3 },
      { code: "STAT 157", title: "Financial Risk Analysis", units: 3 },
      { code: "STAT 165", title: "Categorical Data Analysis", units: 3 },
      { code: "STAT 167", title: "Statistical Quality Control", units: 3 },
      { code: "STAT 183", title: "Introductory Data Analytics", units: 3 },
      { code: "STAT 190", title: "Special Problem", units: 3 },
      { code: "STAT 191", title: "Special Topics", units: 3 },
      { code: "STAT 199", title: "Undergraduate Seminar", units: 1 },
    ],
    requiredCodes: [
      "MATH 27", "MATH 28", "STAT 101", "STAT 135", "STAT 162", "STAT 182",
      "BIO 30", "CMSC 12", "CMSC 21", "CMSC 22", "CMSC 127",
      "MATH 182", "STAT 144", "STAT 145", "STAT 146", "STAT 147",
      "STAT 151", "STAT 156", "STAT 163", "STAT 168", "STAT 173", "STAT 174", "STAT 175",
      "STAT 181", "STAT 192.1", "STAT 198",
      "ENG 10", "STAT 148", "STAT 157", "STAT 165", "STAT 167", "STAT 183",
      "STAT 190", "STAT 191", "STAT 199"
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
      { code: "MATH 28", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      { code: "MATH 37", title: "Mathematical Analysis II", units: 3 },
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
      "MATH 27", "MATH 28", "MATH 36", "MATH 37", "MATH 114",
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
    totalUnitsRequired: 143,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year
      { code: "BIO 11.1", title: "Investigative Biology Laboratory", units: 2 },
      { code: "BIO 14", title: "Biodiversity", units: 5 },
      { code: "BIO 30", title: "Genetics", units: 3 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "CHEM 40", title: "Basic Organic Chemistry", units: 4 },
      { code: "CHEM 40.1", title: "Basic Organic Chemistry Laboratory", units: 1 },
      { code: "MATH 25", title: "Fundamental Calculus", units: 3 },
      { code: "MCB 11", title: "Biology and Applications of Microorganisms", units: 3 },
      // Second Year
      { code: "BOT 14", title: "University Botany", units: 3 },
      { code: "ZOO 14", title: "University Zoology", units: 3 },
      { code: "CHEM 160", title: "Introductory Biochemistry", units: 3 },
      { code: "CHEM 160.1", title: "Introductory Biochemistry Laboratory", units: 2 },
      { code: "BIO 150", title: "Ecology", units: 4 },
      { code: "PHYS 51", title: "Elements of Physics", units: 4 },
      { code: "PHYS 51.1", title: "Elements of Physics Laboratory", units: 1 },
      { code: "BIO 101", title: "Introductory Molecular Biology", units: 3 },
      { code: "BIO 140", title: "Evolutionary Biology", units: 3 },
      // Third Year
      { code: "STAT 164", title: "Statistics for the Biological Sciences", units: 3 },
      { code: "BIO 120", title: "Cell Biology", units: 3 },
      { code: "BIO 142", title: "Principles of Systematic Biology", units: 3 },
      { code: "BIO 195", title: "Research Methods in the Biological Sciences", units: 3 },
      { code: "BIO 127", title: "Developmental Biology", units: 3 },
      { code: "BIO 198", title: "Practicum", units: 3 },
      // Fourth Year
      { code: "COMA 150", title: "Workplace Communication", units: 3 },
      { code: "BIO 199", title: "Undergraduate Seminar", units: 1 },
      { code: "BIO 200", title: "Undergraduate Thesis", units: 6 },
    ],
    requiredCodes: [
      "BIO 11.1", "BIO 14", "BIO 30", "BIO 101", "BIO 120", "BIO 127",
      "BIO 140", "BIO 142", "BIO 150", "BIO 195", "BIO 198", "BIO 199", "BIO 200",
      "BOT 14", "ZOO 14", "CHEM 18", "CHEM 18.1", "CHEM 40", "CHEM 40.1",
      "CHEM 160", "CHEM 160.1", "COMA 150", "MATH 25", "MCB 11",
      "PHYS 51", "PHYS 51.1", "STAT 164"
    ]
  },
  
  "BSCHEM": {
    code: "BSCHEM",
    name: "BS Chemistry",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 142,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "CHEM 19", title: "Chemical Structure and Properties", units: 3 },
      { code: "CHEM 32", title: "Quantitative Inorganic Analysis", units: 3 },
      { code: "CHEM 32.1", title: "Quantitative Inorganic Analysis Laboratory", units: 2 },
      { code: "MCB 11", title: "Biology and Applications of Microorganisms", units: 3 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "PHYS 71", title: "University Physics I", units: 4 },
      { code: "PHYS 71.1", title: "University Physics I Laboratory", units: 1 },
      // Second Year
      { code: "CHEM 43", title: "Organic Chemistry I", units: 3 },
      { code: "CHEM 43.1", title: "Organic Chemistry I Laboratory", units: 2 },
      { code: "CHEM 44", title: "Organic Chemistry II", units: 3 },
      { code: "CHEM 44.1", title: "Organic Chemistry II Laboratory", units: 2 },
      { code: "CHEM 111", title: "Physical Chemistry I", units: 3 },
      { code: "CHEM 161A", title: "Biochemistry I", units: 3 },
      { code: "PHYS 72", title: "University Physics II", units: 4 },
      { code: "PHYS 72.1", title: "University Physics II Laboratory", units: 1 },
      { code: "CMSC 12", title: "Foundations of Computer Science", units: 3 },
      { code: "AMAT 152", title: "Fundamentals of Mathematical Computing", units: 3 },
      { code: "STAT 162", title: "Experimental Designs", units: 3 },
      // Third Year
      { code: "CHEM 111.1", title: "Physical Chemistry I Laboratory", units: 2 },
      { code: "CHEM 112", title: "Physical Chemistry II", units: 3 },
      { code: "CHEM 112.1", title: "Physical Chemistry II Laboratory", units: 2 },
      { code: "CHEM 115", title: "Physical Chemistry III", units: 3 },
      { code: "CHEM 137", title: "Modern Analytical Chemistry", units: 3 },
      { code: "CHEM 137.1", title: "Modern Analytical Chemistry Laboratory", units: 2 },
      { code: "CHEM 140", title: "Organic Analysis", units: 4 },
      { code: "CHEM 161B", title: "Biochemistry II", units: 3 },
      { code: "CHEM 161.1", title: "General Biochemistry Laboratory", units: 2 },
      { code: "CHEM 180", title: "Environmental Chemistry", units: 3 },
      { code: "CHEM 192", title: "Chemical Information, Literature and Communication", units: 3 },
      { code: "CHEM 198", title: "Practicum", units: 3 },
      // Fourth Year
      { code: "CHEM 120", title: "Inorganic Chemistry", units: 3 },
      { code: "CHEM 120.1", title: "Inorganic Chemistry Laboratory", units: 2 },
      { code: "CHEM 131", title: "Technical Analysis I (Foods and Feeds)", units: 4 },
      { code: "CHEM 171", title: "Industrial Chemistry", units: 3 },
      { code: "CHEM 199", title: "Undergraduate Seminar", units: 1 },
      { code: "CHEM 200", title: "Undergraduate Thesis", units: 6 },
    ],
    requiredCodes: [
      "CHEM 18", "CHEM 18.1", "CHEM 19", "CHEM 32", "CHEM 32.1",
      "CHEM 43", "CHEM 43.1", "CHEM 44", "CHEM 44.1",
      "CHEM 111", "CHEM 111.1", "CHEM 112", "CHEM 112.1", "CHEM 115",
      "CHEM 120", "CHEM 120.1", "CHEM 131", "CHEM 137", "CHEM 137.1",
      "CHEM 140", "CHEM 161A", "CHEM 161B", "CHEM 161.1",
      "CHEM 171", "CHEM 180", "CHEM 192", "CHEM 198", "CHEM 199", "CHEM 200",
      "AMAT 152", "CMSC 12", "MATH 27", "MATH 28", "MCB 11",
      "PHYS 71", "PHYS 71.1", "PHYS 72", "PHYS 72.1", "STAT 162"
    ]
  },
  
  "BSAPPHY": {
    code: "BSAPPHY",
    name: "BS Applied Physics",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 143,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year
      { code: "PHYS 101", title: "Newtonian Mechanics", units: 4 },
      { code: "PHYS 102", title: "Electromagnetism", units: 4 },
      { code: "PHYS 111", title: "Mathematical Methods of Physics I", units: 4 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "COMA 150", title: "Workplace Communication", units: 3 },
      // Second Year
      { code: "APHY 10.1", title: "Programming in Physics", units: 1 },
      { code: "APHY 101", title: "Physics in Scientific Instruments", units: 3 },
      { code: "PHYS 103", title: "Mechanical Waves, Optics, and Thermodynamics", units: 4 },
      { code: "PHYS 104", title: "Modern Physics", units: 4 },
      { code: "PHYS 112", title: "Mathematical Methods of Physics II", units: 4 },
      { code: "PHYS 113", title: "Mathematical Methods of Physics III", units: 3 },
      { code: "PHYS 121", title: "Theoretical Mechanics I", units: 3 },
      { code: "PHYS 131", title: "Electromagnetic Theory I", units: 3 },
      // Third Year
      { code: "APHY 102", title: "Physics of Electronic Devices", units: 3 },
      { code: "APHY 115", title: "Computational Physics", units: 4 },
      { code: "PHYS 122", title: "Theoretical Mechanics II", units: 3 },
      { code: "PHYS 132", title: "Electromagnetic Theory II", units: 3 },
      { code: "PHYS 141", title: "Quantum Physics I", units: 3 },
      { code: "PHYS 151", title: "Statistical Physics I", units: 3 },
      { code: "PHYS 165", title: "Optical Physics", units: 3 },
      { code: "PHYS 192.1", title: "Experimental Physics I", units: 2 },
      { code: "PHYS 195", title: "Research Methods in Physics", units: 3 },
      { code: "APHY 198", title: "Practicum", units: 3 },
      // Fourth Year
      { code: "APHY 191", title: "Special Topics", units: 3 },
      { code: "APHY 199", title: "Undergraduate Seminar", units: 1 },
      { code: "APHY 200", title: "Undergraduate Thesis", units: 6 },
      { code: "PHYS 142", title: "Quantum Physics II", units: 3 },
    ],
    requiredCodes: [
      "PHYS 101", "PHYS 102", "PHYS 103", "PHYS 104",
      "PHYS 111", "PHYS 112", "PHYS 113", "PHYS 121", "PHYS 122",
      "PHYS 131", "PHYS 132", "PHYS 141", "PHYS 142", "PHYS 151",
      "PHYS 165", "PHYS 192.1", "PHYS 195",
      "APHY 10.1", "APHY 101", "APHY 102", "APHY 115",
      "APHY 191", "APHY 198", "APHY 199", "APHY 200",
      "CHEM 18", "CHEM 18.1", "COMA 150", "MATH 27", "MATH 28"
    ]
  },
  
  "BACOMM": {
    code: "BACOMM",
    name: "BA Communication Arts",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 145,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "COMA 200", freeElectiveUnits: 6 },
      sp: { name: "Special Problem Track", code: "COMA 190", freeElectiveUnits: 9 }
    },
    defaultTrack: "thesis",
    majorCourses: [
      // First Year
      { code: "COMA 101", title: "Introduction to Communication", units: 3 },
      { code: "COMA 151", title: "Audio-Visual Literacy", units: 3 },
      { code: "ENG 100", title: "Advanced Expository Writing", units: 3 },
      { code: "ENG 113", title: "Advanced Composition", units: 3 },
      { code: "SPCM 11", title: "Fundamentals of Speech Communication", units: 3 },
      { code: "PHLO 12", title: "Logic", units: 3 },
      { code: "AH 11", title: "Western Art History and Appreciation", units: 3 },
      // Second Year
      { code: "COMA 10", title: "Introduction to Language", units: 3 },
      { code: "COMA 102", title: "Communication Theories", units: 3 },
      { code: "COMA 103", title: "Introduction to Communication Research", units: 3 },
      { code: "COMA 104", title: "Development Communication", units: 3 },
      { code: "COMA 114", title: "Writing for Development Communication", units: 3 },
      { code: "COMA 152", title: "Production Design", units: 3 },
      { code: "COMA 161", title: "Basic Principles of Radio Production", units: 3 },
      { code: "COMA 170", title: "Principles of Advertising", units: 3 },
      { code: "COMA 175", title: "Public Relations", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "LIT 101", title: "Literary Criticism", units: 3 },
      { code: "SPCM 112", title: "Interpersonal Communication", units: 3 },
      // Third Year
      { code: "COMA 105", title: "Communication Ethics", units: 3 },
      { code: "COMA 160", title: "Media and Society", units: 3 },
      { code: "COMA 162", title: "Digital Audio Production", units: 3 },
      { code: "COMA 163", title: "Photography", units: 3 },
      { code: "COMA 164", title: "Video Production", units: 3 },
      { code: "COMA 165", title: "Web Design", units: 3 },
      { code: "COMA 171", title: "Editing for Print", units: 3 },
      { code: "COMA 192", title: "Extension Communication", units: 3 },
      { code: "COMA 197", title: "Practicum Seminar", units: 3 },
      { code: "COMA 198", title: "Practicum", units: 3 },
      // Fourth Year
      { code: "COMA 190", title: "Special Problems", units: 3, track: "sp" },
      { code: "COMA 199", title: "Undergraduate Seminar", units: 3 },
      { code: "COMA 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
      { code: "COMA 200a", title: "Practicum", units: 3 },
    ],
    requiredCodes: [
      "COMA 10", "COMA 101", "COMA 102", "COMA 103", "COMA 104", "COMA 105",
      "COMA 114", "COMA 151", "COMA 152", "COMA 160", "COMA 161", "COMA 162",
      "COMA 163", "COMA 164", "COMA 165", "COMA 170", "COMA 171", "COMA 175",
      "COMA 192", "COMA 197", "COMA 198", "COMA 199", "COMA 200a",
      "AH 11", "ENG 100", "ENG 113", "LIT 101", "PHLO 12",
      "SPCM 11", "SPCM 112", "STAT 101"
    ]
  },
  
  "BASOCIO": {
    code: "BASOCIO",
    name: "BA Sociology",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 136,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year
      { code: "SOC 10", title: "Introduction to Sociology", units: 3 },
      { code: "SOC 110", title: "Cultural Anthropology for Sociologists", units: 3 },
      { code: "PSYC 10", title: "Introduction to Psychology", units: 3 },
      { code: "ECON 11", title: "Introduction to Microeconomics", units: 3 },
      // Second Year
      { code: "SOC 100", title: "Philippine Social and Cultural History", units: 3 },
      { code: "SOC 112", title: "Classical Sociological Theory", units: 3 },
      { code: "SOC 113", title: "Contemporary Sociological Theory", units: 3 },
      { code: "SOC 120", title: "Family and Society", units: 3 },
      { code: "SOC 130", title: "Social Stratification and Mobility", units: 3 },
      { code: "SOC 140", title: "Social Problems", units: 3 },
      { code: "SOC 170", title: "Sociological Statistics", units: 3 },
      { code: "ECON 12", title: "Introduction to Macroeconomics", units: 3 },
      { code: "PHLO 101", title: "Ethics", units: 3 },
      { code: "POLSC 14", title: "Philippine Politics and Government", units: 3 },
      // Third Year
      { code: "SOC 111", title: "Sociology of Knowledge", units: 3 },
      { code: "SOC 150", title: "Political Sociology", units: 3 },
      { code: "SOC 160", title: "Sociology of Development", units: 3 },
      { code: "SOC 161", title: "Rural Sociology", units: 3 },
      { code: "SOC 171", title: "Qualitative Methods of Social Research", units: 3 },
      { code: "SOC 172", title: "Quantitative Methods of Social Research", units: 3 },
      { code: "SOC 180", title: "Demography", units: 3 },
      { code: "SOC 195", title: "Social Movements", units: 3 },
      { code: "SOC 198", title: "Practicum", units: 3 },
      // Fourth Year
      { code: "SOC 191", title: "Special Topics", units: 3 },
      { code: "SOC 199", title: "Undergraduate Seminar", units: 3 },
      { code: "SOC 200", title: "Undergraduate Thesis", units: 6 },
    ],
    requiredCodes: [
      "SOC 10", "SOC 100", "SOC 110", "SOC 111", "SOC 112", "SOC 113",
      "SOC 120", "SOC 130", "SOC 140", "SOC 150", "SOC 160", "SOC 161",
      "SOC 170", "SOC 171", "SOC 172", "SOC 180", "SOC 191", "SOC 195",
      "SOC 198", "SOC 199", "SOC 200",
      "ECON 11", "ECON 12", "PHLO 101", "POLSC 14", "PSYC 10"
    ]
  },
  
  "BAPHILO": {
    code: "BAPHILO",
    name: "BA Philosophy",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 132,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "PHLO 200", freeElectiveUnits: 12 },
      sp: { name: "Special Problem Track", code: "PHLO 190", freeElectiveUnits: 15 }
    },
    defaultTrack: "thesis",
    majorCourses: [
      // First Year
      { code: "PHLO 11", title: "Introduction to Philosophy", units: 3 },
      { code: "PHLO 12", title: "Logic", units: 3 },
      { code: "ENG 100", title: "Advanced Expository Writing", units: 3 },
      // Second Year
      { code: "PHLO 101", title: "Ethics", units: 3 },
      { code: "PHLO 104", title: "Political Philosophy", units: 3 },
      { code: "PHLO 110", title: "Ancient Philosophy", units: 3 },
      { code: "PHLO 112", title: "Modern Philosophy", units: 3 },
      { code: "PHLO 115", title: "Philosophy in the Philippines", units: 3 },
      // Third Year
      { code: "PHLO 103", title: "Philosophy of Religion", units: 3 },
      { code: "PHLO 105", title: "Aesthetics", units: 3 },
      { code: "PHLO 113", title: "Contemporary Philosophy", units: 3 },
      { code: "PHLO 114", title: "Oriental Philosophy", units: 3 },
      { code: "PHLO 120", title: "Metaphysics", units: 3 },
      { code: "PHLO 121", title: "Epistemology", units: 3 },
      { code: "PHLO 125", title: "Philosophy of Science", units: 3 },
      { code: "PHLO 192", title: "Research Methods in Philosophy", units: 3 },
      // Fourth Year
      { code: "PHLO 127", title: "Philosophy of Language", units: 3 },
      { code: "PHLO 190", title: "Special Problems", units: 3, track: "sp" },
      { code: "PHLO 197", title: "Seminar in Philosophy", units: 3 },
      { code: "PHLO 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
    ],
    requiredCodes: [
      "PHLO 11", "PHLO 12", "PHLO 101", "PHLO 103", "PHLO 104", "PHLO 105",
      "PHLO 110", "PHLO 112", "PHLO 113", "PHLO 114", "PHLO 115",
      "PHLO 120", "PHLO 121", "PHLO 125", "PHLO 127",
      "PHLO 192", "PHLO 197",
      "ENG 100"
    ]
  },
  
  "AASS": {
    code: "AASS",
    name: "Associate in Arts in Sports Studies",
    college: "CAS",
    collegeName: "College of Arts and Sciences",
    available: true,
    totalUnitsRequired: 78,
    geCoursesRequired: 5,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year First Semester
      { code: "SS 102", title: "Introduction to Sports Studies", units: 3 },
      { code: "PEd 91", title: "Physical Education 91", units: 3 },
      { code: "HK 11", title: "Wellness and Basic Injury Management", units: 2 },
      { code: "HK 12", title: "Basic Human Kinetics Activities", units: 2 },
      // First Year Second Semester
      { code: "SS 110", title: "Foundations of Sports Studies", units: 3 },
      { code: "PEd 92", title: "Physical Education 92", units: 3 },
      { code: "SS 103", title: "Sports Science Fundamentals", units: 3 },
      { code: "PEd 151", title: "Physical Education 151", units: 3 },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
      // First Year Midyear
      { code: "KAS 1", title: "Kasaysayan ng Pilipinas/Philippine History", units: 3 },
      // Second Year First Semester
      { code: "SS 104", title: "Sports Studies 104", units: 3 },
      { code: "PEd 93", title: "Physical Education 93", units: 3 },
      { code: "SS 130", title: "Sports Studies 130", units: 3 },
      { code: "PEd 174", title: "Physical Education 174", units: 3 },
      { code: "PEd 176", title: "Physical Education 176", units: 3 },
      { code: "MATH 10", title: "Mathematics 10", units: 3 },
      { code: "HK 11/12/13", title: "Human Kinetics Activities", units: 2 },
      // Second Year Second Semester
      { code: "SS 120", title: "Sports Studies 120", units: 3 },
      { code: "PI 100", title: "The Life, Works, and Writings of Jose Rizal", units: 3 },
      { code: "PEd 172", title: "Physical Education 172", units: 3 },
      { code: "PEd 100", title: "Physical Education 100", units: 3 },
      { code: "PEd 196", title: "Physical Education 196", units: 3 },
      { code: "PEd 130.1", title: "Physical Education 130.1", units: 3 },
      { code: "HK 11/12/13", title: "Human Kinetics Activities", units: 2 },
    ],
    requiredCodes: [
      "SS 102", "SS 103", "SS 104", "SS 110", "SS 120", "SS 130",
      "PEd 91", "PEd 92", "PEd 93", "PEd 100", "PEd 130.1", 
      "PEd 151", "PEd 172", "PEd 174", "PEd 176", "PEd 196",
      "HK 11", "HK 12", "HK 12/13", "HK 11/12/13",
      "KAS 1", "PI 100", "MATH 10"
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
    totalUnitsRequired: 142,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "AGRI 11", title: "Introduction to Agricultural Science", units: 1 },
      { code: "AGRI 21", title: "Introduction to Animal Science", units: 3 },
      { code: "AGRI 31", title: "Fundamentals of Crop Science I", units: 3 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      // Year 1 Sem 2
      { code: "AGRI 41", title: "Principles of Crop Protection", units: 3 },
      { code: "AGRI 51", title: "Principles of Soil Science", units: 3 },
      { code: "AGRI 22", title: "Introduction to Livestock and Poultry Production", units: 3 },
      { code: "AGRI 32", title: "Fundamentals of Crop Science II", units: 3 },
      // Year 2 Sem 1
      { code: "AGRI 61", title: "Agricultural Extension Communication", units: 3 },
      { code: "BOT 20", title: "Plant Physiology", units: 3 },
      { code: "AGRI 42", title: "Pest Management", units: 3 },
      { code: "ECON 11", title: "General Economics", units: 3 },
      { code: "MGT 101", title: "Concepts and Dynamics of Management", units: 3 },
      // Year 2 Sem 2
      { code: "ABE 1", title: "Introduction to Agricultural Engineering", units: 3 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 4 },
      { code: "CHEM 40.1", title: "Organic Chemistry I Laboratory", units: 1 },
      { code: "AGRI 111", title: "Crop Production Systems", units: 3 },
      { code: "AGRI 171", title: "Ethics, Laws and Policies in Agriculture", units: 3 },
      // Year 3 Sem 1
      { code: "BIO 30", title: "Genetics", units: 3 },
      { code: "ABT 10", title: "Introduction to Agricultural Biotechnology", units: 3 },
      { code: "AGRI 121", title: "Farm Business Accounting", units: 3 },
      { code: "STAT 162", title: "Experimental Designs I", units: 3 },
      // Year 3 Sem 2
      { code: "AAE 111", title: "Farm Management", units: 3 },
      { code: "AGRI 195", title: "Research Methods in Agriculture", units: 3 },
      // Year 3 Midyear
      { code: "AGRI 198", title: "Practicum/Major Farm Practice", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "AGRI 199", title: "Undergraduate Seminar", units: 1 },
      // Year 4 Sem 2
      { code: "AGRI 200", title: "Undergraduate Thesis", units: 3 },
    ],
    requiredCodes: [
      "AGRI 11", "AGRI 21", "AGRI 31", "AGRI 22", "AGRI 32", "AGRI 41", "AGRI 42",
      "AGRI 51", "AGRI 61", "AGRI 111", "AGRI 121", "AGRI 171", "AGRI 195",
      "AGRI 198", "AGRI 199", "AGRI 200",
      "CHEM 18", "CHEM 18.1", "CHEM 40", "CHEM 40.1", "BOT 20", "BIO 30",
      "ABE 1", "ABT 10", "AAE 111", "ECON 11", "MGT 101", "STAT 162"
    ]
  },
  
  "BSABIO": {
    code: "BSABIO",
    name: "BS Agricultural Biotechnology",
    college: "CAFS",
    collegeName: "College of Agriculture and Food Science",
    available: true,
    totalUnitsRequired: 142,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "ABT 11", title: "Introduction to Agricultural Biotechnology", units: 1 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "AGRI 21", title: "Introduction to Animal Science", units: 3 },
      { code: "AGRI 31", title: "Fundamentals of Crop Science I", units: 3 },
      // Year 1 Sem 2
      { code: "CHEM 40", title: "Basic Organic Chemistry", units: 4 },
      { code: "CHEM 40.1", title: "Basic Organic Chemistry Laboratory", units: 1 },
      { code: "AGRI 22", title: "Introduction to Livestock and Poultry Production", units: 3 },
      { code: "MATH 25", title: "Fundamental Calculus", units: 3 },
      { code: "BIO 30", title: "Genetics", units: 3 },
      // Year 2 Sem 1
      { code: "ABT 101", title: "Fundamentals of Agricultural Biotechnology", units: 3 },
      { code: "CHEM 160", title: "Introductory Biochemistry", units: 3 },
      { code: "AGRI 32", title: "Fundamentals of Crop Science II", units: 3 },
      { code: "MCB 11", title: "Biology and Applications of Microorganisms", units: 3 },
      { code: "AGRI 41", title: "Principles of Crop Protection", units: 3 },
      // Year 2 Sem 2
      { code: "ABT 103", title: "Experimental Techniques in Agricultural Biotechnology I", units: 3 },
      { code: "AGRI 51", title: "Principles of Soil Science", units: 3 },
      { code: "CMSC 12", title: "Foundations of Computer Science", units: 3 },
      { code: "BIO 101", title: "Introductory Molecular Biology", units: 3 },
      { code: "AGRI 42", title: "Pest Management", units: 3 },
      // Year 3 Sem 1
      { code: "ABT 104", title: "Experimental Techniques in Agricultural Biotechnology", units: 3 },
      { code: "STAT 162", title: "Experimental Designs I", units: 3 },
      { code: "AGRI 61", title: "Agricultural Extension Communication", units: 3 },
      { code: "ABME 10", title: "Foundations of Entrepreneurship", units: 3 },
      // Year 3 Sem 2
      { code: "ABT 106", title: "Molecular Markers", units: 3 },
      { code: "ABT 107", title: "Recombinant DNA Technology", units: 3 },
      { code: "ECON 11", title: "General Economics", units: 3 },
      { code: "AGRI 171", title: "Ethics, Laws, and Policies in Agriculture", units: 3 },
      // Year 3 Midyear
      { code: "ABT 198", title: "Practicum/Major Farm Practice", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "MGT 101", title: "Concepts and Dynamics of Management", units: 3 },
      { code: "ABT 200", title: "Undergraduate Thesis/Major Farm Practice", units: 3 },
      // Year 4 Sem 2
      { code: "ABT 108", title: "Issues and Regulation of Agricultural Biotechnology", units: 3 },
      { code: "ABT 199", title: "Undergraduate Seminar", units: 1 },
      { code: "AGRI 199", title: "Colloquium in Agriculture", units: 1 },
      { code: "ABT 190", title: "Undergraduate Thesis/Special Problems", units: 3 },
    ],
    requiredCodes: [
      "ABT 11", "ABT 101", "ABT 103", "ABT 104", "ABT 106", "ABT 107", "ABT 108",
      "ABT 198", "ABT 199", "ABT 200", "ABT 190",
      "CHEM 18", "CHEM 18.1", "CHEM 40", "CHEM 40.1", "CHEM 160",
      "AGRI 21", "AGRI 22", "AGRI 31", "AGRI 32", "AGRI 41", "AGRI 42",
      "AGRI 51", "AGRI 61", "AGRI 171", "AGRI 199",
      "MATH 25", "BIO 30", "BIO 101", "MCB 11", "CMSC 12", "STAT 162",
      "ABME 10", "ECON 11", "MGT 101"
    ]
  },
  
  "BSFST": {
    code: "BSFST",
    name: "BS Food Science and Technology",
    college: "CAFS",
    collegeName: "College of Agriculture and Food Science",
    available: true,
    totalUnitsRequired: 143,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "FST 11", title: "Introduction to Food Science and Technology", units: 3 },
      { code: "AGRI 21", title: "Introduction to Animal Science", units: 3 },
      { code: "AGRI 31", title: "Fundamentals of Crop Science I", units: 3 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      // Year 1 Sem 2
      { code: "MCB 11", title: "Biology and Applications of Microorganisms", units: 3 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "CHEM 40", title: "Basic Organic Chemistry", units: 4 },
      { code: "CHEM 40.1", title: "Basic Organic Chemistry Laboratory", units: 1 },
      { code: "PHYS 51", title: "Elements of Physics", units: 3 },
      { code: "PHYS 51.1", title: "Elements of Physics Laboratory", units: 2 },
      // Year 2 Sem 1
      { code: "ABME 10", title: "Foundations of Entrepreneurship", units: 3 },
      { code: "CHEM 32", title: "Quantitative Inorganic Analysis", units: 3 },
      { code: "CHEM 32.1", title: "Quantitative Inorganic Analysis Laboratory", units: 2 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      // Year 2 Sem 2
      { code: "MGT 101", title: "Concepts and Dynamics of Management", units: 3 },
      { code: "CHEM 160", title: "Introductory Biochemistry", units: 3 },
      { code: "MCB 180", title: "Food Microbiology", units: 3 },
      { code: "FST 101", title: "Food Chemistry", units: 3 },
      { code: "FST 130", title: "Food Processing I", units: 3 },
      // Year 3 Sem 1
      { code: "FST 102", title: "Food Analysis", units: 4 },
      { code: "FST 131", title: "Food Processing II", units: 3 },
      { code: "FST 140", title: "Food Quality Management", units: 3 },
      { code: "FST 141", title: "Food Engineering", units: 3 },
      { code: "FST 167", title: "Sensory Evaluation", units: 3 },
      // Year 3 Sem 2
      { code: "AGRI 171", title: "Ethics, Laws, and Policies in Agriculture", units: 3 },
      { code: "AGRI 195", title: "Research Methods in Agriculture", units: 3 },
      { code: "FST 111", title: "Food Preservation", units: 3 },
      { code: "FST 151", title: "Food Packaging", units: 3 },
      { code: "FST 200", title: "Undergraduate Thesis", units: 3 },
      // Year 3 Midyear
      { code: "FST 198", title: "Practicum", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "FST 165", title: "Food Product Development", units: 3 },
      { code: "FST 170", title: "Food Plant Design", units: 3 },
      { code: "ABME 172", title: "Product Ideation and Creation", units: 3 },
      // Year 4 Sem 2
      { code: "FST 147", title: "Food Safety and Regulation", units: 3 },
      { code: "FST 175", title: "Food Service Management", units: 3 },
      { code: "FST 199", title: "Undergraduate Seminar", units: 1 },
      { code: "AGRI 199", title: "Colloquium in Agriculture", units: 1 },
    ],
    requiredCodes: [
      "FST 11", "FST 101", "FST 102", "FST 111", "FST 130", "FST 131",
      "FST 140", "FST 141", "FST 147", "FST 151", "FST 165", "FST 167",
      "FST 170", "FST 175", "FST 198", "FST 199", "FST 200",
      "CHEM 18", "CHEM 18.1", "CHEM 32", "CHEM 32.1", "CHEM 40", "CHEM 40.1", "CHEM 160",
      "AGRI 21", "AGRI 31", "AGRI 171", "AGRI 195", "AGRI 199",
      "MCB 11", "MCB 180", "MATH 27", "PHYS 51", "PHYS 51.1",
      "STAT 101", "MGT 101", "ABME 10", "ABME 172"
    ]
  },
  
  "BSACHEM": {
    code: "BSACHEM",
    name: "BS Agricultural Chemistry",
    college: "CAFS",
    collegeName: "College of Agriculture and Food Science",
    available: true,
    totalUnitsRequired: 197,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      // Year 1 Sem 2
      { code: "CHEM 17", title: "General Chemistry II", units: 4 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "PHYSICS 71", title: "Elementary Physics I", units: 4 },
      { code: "AGCHEM 10", title: "General Agricultural Chemistry", units: 3 },
      // Year 2 Sem 1
      { code: "CHEM 26", title: "Analytical Chemistry I", units: 5 },
      { code: "CHEM 40", title: "Organic Chemistry I", units: 5 },
      { code: "PHYSICS 72", title: "Elementary Physics II", units: 4 },
      { code: "MATH 36", title: "Mathematical Analysis I", units: 3 },
      // Year 2 Sem 2
      { code: "CHEM 27", title: "Analytical Chemistry II", units: 4 },
      { code: "CHEM 41", title: "Organic Chemistry II", units: 5 },
      { code: "CHEM 31", title: "Elementary Biochemistry", units: 5 },
      { code: "BIO 30", title: "Cellular and Molecular Biology", units: 3 },
      // Year 3 Sem 1
      { code: "CHEM 160", title: "Physical Chemistry I", units: 4 },
      { code: "AGCHEM 100", title: "Soil Chemistry", units: 4 },
      { code: "AGCHEM 101", title: "Soil Fertility and Plant Nutrition", units: 4 },
      { code: "AGCHEM 120", title: "Food Chemistry", units: 4 },
      // Year 3 Sem 2
      { code: "CHEM 161", title: "Physical Chemistry II", units: 4 },
      { code: "AGCHEM 102", title: "Advanced Soil Chemistry", units: 3 },
      { code: "AGCHEM 110", title: "Plant Biochemistry", units: 4 },
      { code: "AGCHEM 140", title: "Environmental Chemistry", units: 3 },
      { code: "AGCHEM 150", title: "Advanced Instrumental Methods of Analysis", units: 5 },
      // Year 4 Sem 1
      { code: "AGCHEM 111", title: "Principles of Plant Chemical Regulation", units: 3 },
      { code: "AGCHEM 121", title: "Food Analysis", units: 4 },
      { code: "AGCHEM 130", title: "Pesticide Chemistry", units: 4 },
      { code: "AGCHEM 141", title: "Environmental Toxicology", units: 3 },
      // Year 4 Sem 2
      { code: "AGCHEM 122", title: "Industrial Food Chemistry", units: 3 },
      { code: "AGCHEM 151", title: "Radiochemistry", units: 3 },
      { code: "AGCHEM 190", title: "Special Problem", units: 3 },
      // Year 5 Sem 1
      { code: "AGCHEM 200", title: "Undergraduate Thesis", units: 6 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      // Year 5 Sem 2 (MIDYEAR)
      { code: "AGCHEM 191", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      // Support courses
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "CMSC 11", title: "Introduction to Computer Science I", units: 3 },
    ],
    requiredCodes: [
      "CHEM 16", "CHEM 17", "CHEM 26", "CHEM 27", "CHEM 40", "CHEM 41", "CHEM 31",
      "CHEM 160", "CHEM 161", "MATH 27", "MATH 28", "MATH 36",
      "PHYSICS 71", "PHYSICS 72", "BIO 30", "STAT 101", "CMSC 11",
      "AGCHEM 10", "AGCHEM 100", "AGCHEM 101", "AGCHEM 102", "AGCHEM 110", "AGCHEM 111",
      "AGCHEM 120", "AGCHEM 121", "AGCHEM 122", "AGCHEM 130", "AGCHEM 140", "AGCHEM 141",
      "AGCHEM 150", "AGCHEM 151", "AGCHEM 190", "AGCHEM 191", "AGCHEM 200", "ENG 10"
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
    totalUnitsRequired: 169,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "ABE 10", title: "Introduction to Agricultural and Biosystems Engineering", units: 1 },
      { code: "ENSC 10.1", title: "Engineering Graphics Laboratory", units: 2 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      // Year 1 Sem 2
      { code: "ABE 30", title: "Engineering Surveying", units: 3 },
      { code: "ABE 32", title: "Computer-Aided Design", units: 2 },
      { code: "CHEM 40", title: "Basic Organic Chemistry", units: 4 },
      { code: "CHEM 40.1", title: "Basic Organic Chemistry Laboratory", units: 1 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "PHYS 51", title: "Elements of Physics", units: 4 },
      { code: "PHYS 51.1", title: "Elements of Physics Laboratory", units: 1 },
      // Year 2 Sem 1
      { code: "ABE 40", title: "Engineering Survey Camp", units: 1, gradeType: "S/U" },
      { code: "ABE 42", title: "Engineering Mechanics", units: 4 },
      { code: "ABE 43", title: "Introduction to Numerical Methods and Computing", units: 3 },
      { code: "ABE 48", title: "Engineering Materials", units: 2 },
      { code: "ENSC 21", title: "Mathematical Methods in Engineering", units: 3 },
      { code: "PHYS 52", title: "Advanced Physics for Engineers", units: 3 },
      { code: "PHYS 52.1", title: "Advanced Physics for Engineers Laboratory", units: 1 },
      { code: "EE 1", title: "Basic Electrical Engineering", units: 3 },
      // Year 2 Sem 2
      { code: "ABE 52", title: "Structural Mechanics", units: 3 },
      { code: "ABE 54", title: "Thermodynamics I", units: 3 },
      { code: "ABE 56", title: "Fluid Mechanics", units: 3 },
      { code: "ABE 57", title: "Engineering Geology", units: 3 },
      { code: "ABE 58", title: "Basic Electronics", units: 3 },
      { code: "ENSC 22", title: "Differential Equations for Engineering", units: 3 },
      { code: "SOIL 51", title: "Fundamentals of Soil Science", units: 3 },
      // Year 3 Sem 1
      { code: "ABE 61", title: "Engineering Hydrology", units: 3 },
      { code: "ABE 62", title: "Hydraulic Engineering", units: 3 },
      { code: "ABE 63", title: "Thermodynamics II", units: 3 },
      { code: "ABE 64", title: "Transport Processes", units: 3 },
      { code: "ABE 66", title: "Instrumentation and Controls", units: 3 },
      // Year 3 Sem 2
      { code: "ABE 72", title: "Drainage and Land Development", units: 3 },
      { code: "ABE 73", title: "Irrigation Engineering", units: 3 },
      { code: "ABE 74", title: "Agricultural Waste Management", units: 3 },
      { code: "ABE 75", title: "Aquacultural Engineering", units: 3 },
      { code: "ABE 76", title: "Refrigeration and Air Conditioning", units: 3 },
      { code: "ABE 67", title: "Structural Engineering", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      // Year 3 Midyear
      { code: "ABE 198", title: "Field Practice", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "ABE 81", title: "Agricultural Machinery and Equipment", units: 3 },
      { code: "ABE 82", title: "Postharvest and Food Engineering", units: 3 },
      { code: "ABE 83", title: "Soil and Water Conservation Engineering", units: 3 },
      { code: "ABE 84", title: "Agricultural Structures", units: 3 },
      { code: "ABE 199", title: "Seminar", units: 1 },
      { code: "ABE 200", title: "Undergraduate Thesis/Innovationeering", units: 3 },
      // Year 4 Sem 2
      { code: "ABE 88", title: "Biosystems Engineering", units: 3 },
      { code: "ABE 186", title: "ABE Codes and Standards, and Contracts", units: 2 },
      { code: "ABE 190", title: "Design Project", units: 3 },
    ],
    requiredCodes: [
      "ABE 10", "ABE 30", "ABE 32", "ABE 40", "ABE 42", "ABE 43", "ABE 48",
      "ABE 52", "ABE 54", "ABE 56", "ABE 57", "ABE 58",
      "ABE 61", "ABE 62", "ABE 63", "ABE 64", "ABE 66", "ABE 67",
      "ABE 72", "ABE 73", "ABE 74", "ABE 75", "ABE 76",
      "ABE 81", "ABE 82", "ABE 83", "ABE 84", "ABE 88",
      "ABE 186", "ABE 190", "ABE 198", "ABE 199", "ABE 200",
      "ENSC 10.1", "ENSC 21", "ENSC 22", "EE 1",
      "CHEM 18", "CHEM 18.1", "CHEM 40", "CHEM 40.1",
      "MATH 27", "MATH 28", "PHYS 51", "PHYS 51.1", "PHYS 52", "PHYS 52.1",
      "SOIL 51", "ENG 10"
    ]
  },
  
  "BSCHE": {
    code: "BSCHE",
    name: "BS Chemical Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 163,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "ChE 10", title: "Introduction to Chemical Engineering Profession", units: 1 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "PHYS 51", title: "Elements of Physics", units: 4 },
      { code: "PHYS 51.1", title: "Elements of Physics Laboratory", units: 1 },
      { code: "MCB 11", title: "Biology and Applications of Microorganisms", units: 3 },
      // Year 1 Sem 2
      { code: "CHEM 32", title: "Quantitative Inorganic Analysis", units: 3 },
      { code: "CHEM 32.1", title: "Quantitative Inorganic Analysis Laboratory", units: 2 },
      { code: "CHEM 40", title: "Basic Organic Chemistry", units: 4 },
      { code: "CHEM 40.1", title: "Basic Organic Chemistry Laboratory", units: 1 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      // Year 2 Sem 1
      { code: "ChE 30", title: "Fundamentals of Chemical Engineering", units: 4 },
      { code: "ENSC 10.1", title: "Engineering Graphics Laboratory", units: 2 },
      { code: "EE 1", title: "Basic Electrical Engineering", units: 3 },
      { code: "ENSC 11", title: "Statics of Rigid Bodies", units: 3 },
      { code: "CHEM 111", title: "Physical Chemistry I", units: 3 },
      { code: "CHEM 111.1", title: "Physical Chemistry I Laboratory", units: 3 },
      { code: "CHEM 160", title: "Introductory Biochemistry", units: 3 },
      // Year 2 Sem 2
      { code: "ENSC 26", title: "Computer Applications in Engineering", units: 3 },
      { code: "ChE 32", title: "Industrial Stoichiometry", units: 3 },
      { code: "ENSC 12", title: "Dynamics of Rigid Bodies", units: 3 },
      { code: "ENSC 21", title: "Mathematical Methods in Engineering", units: 3 },
      { code: "CHEM 112", title: "Physical Chemistry II", units: 3 },
      // Year 3 Sem 1
      { code: "ChE 142", title: "Chemical Engineering Thermodynamics I", units: 3 },
      { code: "ChE 147", title: "Application of Fluid Dynamics in Chemical Engineering", units: 3 },
      { code: "ChE 149", title: "Transport Phenomena", units: 3 },
      { code: "ChE 152", title: "Separation Processes", units: 3 },
      { code: "ENSC 13", title: "Strength of Materials", units: 3 },
      { code: "STAT 168", title: "Response Surface Methodology", units: 3 },
      // Year 3 Sem 2
      { code: "ChE 143", title: "Chemical Engineering Thermodynamics II", units: 3 },
      { code: "ChE 145", title: "Chemical Reaction Engineering", units: 3 },
      { code: "ChE 153", title: "Transfer Operations I", units: 3 },
      { code: "ChE 154", title: "Transfer Operations II", units: 3 },
      { code: "ChE 172", title: "Introduction to Biochemical Engineering", units: 3 },
      { code: "ChE 180", title: "Agro-Industrial Waste Management", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      // Year 3 Midyear
      { code: "ChE 198", title: "Internship", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "ChE 157.1", title: "Chemical Engineering Unit Operations Laboratory", units: 2 },
      { code: "ChE 191", title: "Special Topics", units: 3 },
      { code: "ChE 192", title: "Chemical Process Equipment Design", units: 3 },
      { code: "ChE 200", title: "Undergraduate Thesis/Innovationeering/EIR", units: 3 },
      // Year 4 Sem 2
      { code: "ChE 170", title: "Instrumentation and Process Dynamics and Control", units: 3 },
      { code: "ChE 185", title: "Chemical Engineering Laws, Ethics, Specifications and Contracts", units: 2 },
      { code: "ChE 193", title: "Plant Design", units: 3 },
      { code: "ChE 199", title: "Plant Inspection and Seminar", units: 1 },
    ],
    requiredCodes: [
      "ChE 10", "ChE 30", "ChE 32", "ChE 142", "ChE 143", "ChE 145", "ChE 147", "ChE 149",
      "ChE 152", "ChE 153", "ChE 154", "ChE 157.1", "ChE 170", "ChE 172", "ChE 180",
      "ChE 185", "ChE 191", "ChE 192", "ChE 193", "ChE 198", "ChE 199", "ChE 200",
      "CHEM 18", "CHEM 18.1", "CHEM 32", "CHEM 32.1", "CHEM 40", "CHEM 40.1",
      "CHEM 111", "CHEM 111.1", "CHEM 112", "CHEM 160",
      "ENSC 10.1", "ENSC 11", "ENSC 12", "ENSC 13", "ENSC 21", "ENSC 26",
      "MATH 27", "MATH 28", "PHYS 51", "PHYS 51.1", "MCB 11", "EE 1", "STAT 168", "ENG 10"
    ]
  },
  
  "BSCE": {
    code: "BSCE",
    name: "BS Civil Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 159,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "CE 10", title: "Fundamentals of Civil Engineering", units: 1 },
      { code: "ENSC 10.1", title: "Engineering Graphics Laboratory", units: 2 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "PHYS 71", title: "University Physics I", units: 4 },
      { code: "PHYS 71.1", title: "University Physics Laboratory", units: 1 },
      // Year 1 Sem 2
      { code: "ABE 48", title: "Fundamentals of Surveying", units: 3 },
      { code: "ENSC 11", title: "Statics of Rigid Bodies", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 4 },
      { code: "PHYS 72", title: "University Physics II", units: 4 },
      { code: "PHYS 72.1", title: "University Physics II Laboratory", units: 1 },
      // Year 2 Sem 1
      { code: "EE 1", title: "Basic Electrical Engineering", units: 3 },
      { code: "ENSC 12", title: "Dynamics of Rigid Bodies", units: 3 },
      { code: "ENSC 13", title: "Strength of Materials", units: 3 },
      { code: "ENSC 21", title: "Mathematical Methods in Engineering", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      // Year 2 Sem 2
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "CE 120", title: "Higher Surveying", units: 3 },
      { code: "CE 131", title: "Structural Analysis I", units: 3 },
      { code: "ENSC 16", title: "Fluid Mechanics", units: 3 },
      // Year 3 Sem 1
      { code: "ABE 57", title: "Field Hydrology", units: 3 },
      { code: "CE 121", title: "Transportation Engineering I", units: 3 },
      { code: "CE 132", title: "Structural Analysis I", units: 3 },
      { code: "CE 133", title: "Structural Analysis II", units: 3 },
      { code: "CE 151", title: "Sanitary Engineering I", units: 3 },
      { code: "CE 170", title: "Geotechnical Engineering", units: 3 },
      { code: "FPPS 183", title: "Engineering Economic Analysis", units: 3 },
      // Year 3 Sem 2
      { code: "CE 122", title: "Transportation Engineering II", units: 3 },
      { code: "CE 134", title: "Design of Reinforced Concrete Members", units: 4 },
      { code: "CE 152", title: "Sanitary Engineering II", units: 3 },
      { code: "CE 161", title: "Construction Materials and Testing", units: 3 },
      { code: "CE 163", title: "Civil Engineering Laws, Contracts and Ethics", units: 2 },
      { code: "ENSC 16.1", title: "Fluid Mechanics Laboratory", units: 2 },
      { code: "IE 184", title: "Project Development and Management", units: 3 },
      // Year 3 Midyear
      { code: "CE 198", title: "Internship", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "CE 135", title: "Design of Steel Members", units: 3 },
      { code: "CE 137", title: "Structural Dynamics and Earthquake Engineering", units: 3 },
      { code: "CE 141", title: "Hydraulic Engineering", units: 3 },
      { code: "CE 164", title: "Construction Project Planning and Management", units: 4 },
      { code: "CE 171", title: "Foundation Engineering", units: 3 },
      { code: "CE 200", title: "Undergraduate Thesis/Innovationeering", units: 3 },
      // Year 4 Sem 2
      { code: "ABE 67", title: "Irrigation and Drainage Engineering I", units: 3 },
      { code: "CE 197", title: "Civil Engineering Project Integration", units: 3 },
      { code: "CE 199", title: "Undergraduate Seminar", units: 1 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      { code: "ENSC 26", title: "Computer Applications in Engineering", units: 3 },
    ],
    requiredCodes: [
      "CE 10", "CE 120", "CE 121", "CE 122", "CE 131", "CE 132", "CE 133", "CE 134", "CE 135",
      "CE 137", "CE 141", "CE 151", "CE 152", "CE 161", "CE 163", "CE 164", "CE 170", "CE 171",
      "CE 197", "CE 198", "CE 199", "CE 200",
      "ENSC 10.1", "ENSC 11", "ENSC 12", "ENSC 13", "ENSC 16", "ENSC 16.1", "ENSC 21", "ENSC 26",
      "MATH 27", "MATH 28", "PHYS 71", "PHYS 71.1", "PHYS 72", "PHYS 72.1",
      "CHEM 18", "CHEM 18.1", "ABE 48", "ABE 57", "ABE 67",
      "STAT 101", "EE 1", "FPPS 183", "IE 184", "ENG 10"
    ]
  },
  
  "BSEE": {
    code: "BSEE",
    name: "BS Electrical Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 162,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "PHYS 71", title: "University Physics I", units: 4 },
      { code: "PHYS 71.1", title: "University Physics I Laboratory", units: 1 },
      { code: "EE 30", title: "Introduction to Electrical Engineering", units: 3 },
      // Year 1 Sem 2
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "PHYS 72", title: "University Physics II", units: 4 },
      { code: "PHYS 72.1", title: "University Physics II Laboratory", units: 1 },
      { code: "ENSC 10.1", title: "Engineering Graphics Laboratory", units: 2 },
      { code: "ENSC 11", title: "Statics of Rigid Bodies", units: 3 },
      // Year 2 Sem 1
      { code: "EE 40", title: "Fundamentals of Electrical Engineering I", units: 4 },
      { code: "EE 45", title: "Fundamentals of Engineering Electromagnetics", units: 3 },
      { code: "ENSC 12", title: "Dynamics of Rigid Bodies", units: 3 },
      { code: "ENSC 14a", title: "Engineering Thermodynamics and Heat Transfer", units: 5 },
      { code: "ENSC 21", title: "Mathematical Methods in Engineering", units: 3 },
      // Year 2 Sem 2
      { code: "EE 50", title: "Fundamentals of Electrical Engineering II", units: 4 },
      { code: "EE 51", title: "Electromechanical Energy Conversion for DC", units: 3 },
      { code: "EE 55", title: "Semiconductor Devices", units: 3 },
      { code: "ENSC 26", title: "Computer Applications in Engineering", units: 3 },
      // Year 3 Sem 1
      { code: "EE 60", title: "Signals and Systems", units: 3 },
      { code: "EE 65", title: "Electronic Circuits", units: 4 },
      { code: "EE 61", title: "Electromechanical Energy Conversion for AC", units: 4 },
      { code: "EE 62", title: "Principles of Power Systems", units: 3 },
      { code: "EE 66", title: "Signals and Noise in Electrical Engineering Networks", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      // Year 3 Sem 2
      { code: "EE 70", title: "Instrumentation Engineering", units: 4 },
      { code: "EE 75", title: "Digital Electronics", units: 4 },
      { code: "EE 71", title: "Analysis of Power Systems", units: 3 },
      { code: "EE 79", title: "Electrical Engineering Law, Ethics, and Contracts", units: 1 },
      { code: "FPPS 183", title: "Engineering Economic Analysis", units: 3 },
      { code: "IE 184", title: "Project Development and Management", units: 3 },
      { code: "EE 199", title: "Undergraduate Seminar", units: 1 },
      // Year 3 Midyear
      { code: "EE 198", title: "Internship", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "EE 85", title: "Industrial Electronics", units: 3 },
      { code: "EE 80", title: "Control Systems Analysis", units: 3 },
      { code: "EE 86", title: "Electronic Communication Systems I", units: 3 },
      { code: "EE 81", title: "Maintenance of Electrical Equipment and Devices", units: 3 },
      { code: "EE 200", title: "Undergraduate Thesis/Innovationeering/EIR", units: 3 },
      // Year 4 Sem 2
      { code: "EE 91", title: "Electrical System Design, Planning, and Estimation", units: 4 },
    ],
    requiredCodes: [
      "EE 30", "EE 40", "EE 45", "EE 50", "EE 51", "EE 55", "EE 60", "EE 61", "EE 62",
      "EE 65", "EE 66", "EE 70", "EE 71", "EE 75", "EE 79", "EE 80", "EE 81",
      "EE 85", "EE 86", "EE 91", "EE 198", "EE 199", "EE 200",
      "ENSC 10.1", "ENSC 11", "ENSC 12", "ENSC 14a", "ENSC 21", "ENSC 26",
      "MATH 27", "MATH 28", "PHYS 71", "PHYS 71.1", "PHYS 72", "PHYS 72.1",
      "FPPS 183", "IE 184", "ENG 10"
    ]
  },
  
  "BSIE": {
    code: "BSIE",
    name: "BS Industrial Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 160,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "IE 10", title: "Foundations of Industrial Engineering", units: 1 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "PHYS 51", title: "Elements of Physics", units: 4 },
      { code: "PHYS 51.1", title: "Elements of Physics Laboratory", units: 1 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      // Year 1 Sem 2
      { code: "ENSC 11", title: "Statics of Rigid Bodies", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "IE 31", title: "Industrial Organization and Management", units: 3 },
      { code: "IE 21", title: "Industrial Processes", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      // Year 2 Sem 1
      { code: "ENSC 21", title: "Mathematical Methods in Engineering", units: 3 },
      { code: "IE 141", title: "Operations Research I", units: 3 },
      { code: "IE 132", title: "Methods of Engineering", units: 5 },
      { code: "IE 125", title: "Industrial Quality Control", units: 5 },
      // Year 2 Sem 2
      { code: "IE 142", title: "Operations Research II", units: 3 },
      { code: "ENSC 12", title: "Dynamics of Rigid Bodies", units: 3 },
      { code: "ENSC 10.1", title: "Engineering Graphics Laboratory", units: 2 },
      { code: "IE 151", title: "Production Systems", units: 3 },
      { code: "IE 150", title: "Systems Evaluation", units: 3 },
      { code: "MGT 111", title: "Principles of Accounting", units: 3 },
      // Year 2 Midyear
      { code: "IE 198", title: "Internship", units: 3, gradeType: "S/U" },
      // Year 3 Sem 1
      { code: "ENSC 13", title: "Strength of Materials", units: 3 },
      { code: "IE 143", title: "Stochastic Processes in Industrial Engineering", units: 3 },
      { code: "ABE 43", title: "Engineering Shop", units: 3 },
      { code: "IE 152", title: "Manufacturing Planning and Design", units: 3 },
      { code: "ENSC 26", title: "Computer Applications in Engineering", units: 3 },
      { code: "IE 134", title: "Ergonomics", units: 3 },
      // Year 3 Sem 2
      { code: "ENSC 16", title: "Fluid Mechanics", units: 3 },
      { code: "ENSC 14a", title: "Engineering Thermodynamics and Heat Transfer", units: 5 },
      { code: "IE 144", title: "Systems Simulation", units: 3 },
      { code: "IE 184", title: "Project Development and Management", units: 3 },
      { code: "IE 164", title: "Information Systems I", units: 3 },
      { code: "IE 136", title: "Industrial Safety and Health", units: 3 },
      // Year 4 Sem 1
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      { code: "IE 158", title: "Supply Chain Engineering", units: 3 },
      { code: "IE 165", title: "Information Systems II", units: 3 },
      { code: "IE 185", title: "Industrial Systems Design", units: 3 },
      { code: "IE 199", title: "Undergraduate Seminar", units: 1 },
      { code: "IE 200", title: "Thesis/Innovationeering/EIR", units: 3 },
      // Year 4 Sem 2
      { code: "IE 90", title: "Ethics for Industrial Engineers", units: 2 },
      { code: "EE 1", title: "Basic Electrical Engineering", units: 3 },
    ],
    requiredCodes: [
      "IE 10", "IE 21", "IE 31", "IE 90", "IE 125", "IE 132", "IE 134", "IE 136",
      "IE 141", "IE 142", "IE 143", "IE 144", "IE 150", "IE 151", "IE 152",
      "IE 158", "IE 164", "IE 165", "IE 184", "IE 185", "IE 198", "IE 199", "IE 200",
      "ENSC 10.1", "ENSC 11", "ENSC 12", "ENSC 13", "ENSC 14a", "ENSC 16", "ENSC 21", "ENSC 26",
      "MATH 27", "MATH 28", "PHYS 51", "PHYS 51.1", "CHEM 18", "CHEM 18.1",
      "STAT 101", "MGT 111", "ABE 43", "EE 1", "ENG 10"
    ]
  },
  
  "BSME": {
    code: "BSME",
    name: "BS Mechanical Engineering",
    college: "CEAT",
    collegeName: "College of Engineering and Agro-Industrial Technology",
    available: true,
    totalUnitsRequired: 161,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "ME 10", title: "Introduction to Mechanical Engineering", units: 3 },
      { code: "ENSC 10.1", title: "Engineering Graphics Laboratory", units: 3 },
      { code: "CHEM 18", title: "University Chemistry", units: 3 },
      { code: "CHEM 18.1", title: "University Chemistry Laboratory", units: 2 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "PHYS 71", title: "University Physics I", units: 4 },
      { code: "PHYS 71.1", title: "University Physics I Laboratory", units: 1 },
      // Year 1 Sem 2
      { code: "EE 1", title: "Basic Electrical Engineering", units: 3 },
      { code: "ENSC 11", title: "Statics of Rigid Bodies", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "IE 31", title: "Industrial Organization and Management", units: 3 },
      { code: "ME 43", title: "Engineering Shop", units: 3 },
      // Year 2 Sem 1
      { code: "EE 2", title: "Basic Electronics Engineering", units: 4 },
      { code: "ENSC 12", title: "Dynamics of Rigid Bodies", units: 3 },
      { code: "ENSC 13", title: "Strength of Materials", units: 3 },
      { code: "ENSC 14", title: "Basic Thermodynamics", units: 3 },
      { code: "ME 113", title: "Manufacturing Processes", units: 3 },
      // Year 2 Sem 2
      { code: "EE 3", title: "DC and AC Machinery", units: 4 },
      { code: "ENSC 15", title: "Fundamentals of Heat Transfer", units: 3 },
      { code: "ENSC 16", title: "Fluid Mechanics", units: 3 },
      { code: "ENSC 21", title: "Mathematical Methods in Engineering", units: 3 },
      { code: "ME 45", title: "Analysis of Machine Elements", units: 3 },
      { code: "ME 70", title: "Mechanical Engineering Thermodynamics", units: 3 },
      // Year 3 Sem 1
      { code: "ME 53", title: "Machine Design for Bioproduction Systems I", units: 3 },
      { code: "ME 160", title: "Mechanical Vibrations", units: 3 },
      { code: "ME 171", title: "Fluid Machinery", units: 3 },
      { code: "ME 172", title: "Combustion Engineering", units: 2 },
      { code: "ME 175", title: "Refrigeration Systems", units: 3 },
      // Year 3 Sem 2
      { code: "ENSC 26", title: "Computer Applications in Engineering", units: 3 },
      { code: "ME 154", title: "Design of Machinery", units: 3 },
      { code: "ME 173.1", title: "Mechanical Engineering Laboratory I", units: 1 },
      { code: "ME 176", title: "Air Conditioning and Ventilation Systems", units: 3 },
      { code: "IE 184", title: "Project Development and Management", units: 3 },
      // Year 3 Midyear
      { code: "ME 198", title: "Practicum", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "EE 28", title: "Introduction to Control Systems", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ME 90", title: "Mechanical Engineering Laws, Ethics, Codes and Standards", units: 2 },
      { code: "ME 174.1", title: "Mechanical Engineering Laboratory II", units: 2 },
      { code: "ME 199", title: "Undergraduate Seminar", units: 1 },
      { code: "ME 200", title: "Undergraduate Thesis/Engineering Industry Research", units: 3 },
      // Year 4 Sem 2
      { code: "ME 181", title: "Industrial Plant Engineering and Design", units: 4 },
      { code: "ME 182", title: "Power Plant Engineering and Design", units: 4 },
    ],
    requiredCodes: [
      "ME 10", "ME 43", "ME 45", "ME 53", "ME 70", "ME 90", "ME 113",
      "ME 154", "ME 160", "ME 171", "ME 172", "ME 173.1", "ME 174.1",
      "ME 175", "ME 176", "ME 181", "ME 182", "ME 198", "ME 199", "ME 200",
      "ENSC 10.1", "ENSC 11", "ENSC 12", "ENSC 13", "ENSC 14", "ENSC 15", "ENSC 16", "ENSC 21", "ENSC 26",
      "EE 1", "EE 2", "EE 3", "EE 28",
      "MATH 27", "MATH 28", "PHYS 71", "PHYS 71.1",
      "CHEM 18", "CHEM 18.1", "STAT 101", "IE 31", "IE 184"
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
      { code: "ENSC 21", title: "Statics of Rigid Bodies", units: 3 },
      { code: "ENSC 22", title: "Dynamics of Rigid Bodies", units: 3 },
      { code: "ENSC 24", title: "Thermodynamics I", units: 3 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus I", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus II", units: 3 },
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
      "MATE 190", "MATE 191", "ENSC 21", "ENSC 22", "ENSC 24",
      "MATH 27", "MATH 28", "MATH 114",
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
    totalUnitsRequired: 138,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "ECON 200", freeElectiveUnits: 6 },
      sp: { name: "Special Problem Track", code: "ECON 199", freeElectiveUnits: 6 }
    },
    defaultTrack: "sp",
    majorCourses: [
      // First Year First Semester
      { code: "KAS 1", title: "Kasaysayan ng Pilipinas/Philippine History", units: 3 },
      { code: "ARTS 1", title: "Critical Perspectives in the Arts", units: 3 },
      { code: "STS 1", title: "Science, Technology, and Society", units: 3 },
      { code: "MATH 25", title: "Fundamental Calculus", units: 3 },
      { code: "ECON 11", title: "General Economics", units: 3 },
      { code: "HK 11", title: "Wellness and Basic Injury Management", units: 2 },
      // First Year Second Semester
      { code: "MGT 101", title: "Concepts and Dynamics of Management", units: 3 },
      { code: "COST 10", title: "Introduction to Collective Action", units: 1 },
      { code: "ECON 101", title: "Intermediate Macroeconomic Theory", units: 3 },
      { code: "ECON 102", title: "Intermediate Microeconomic Theory", units: 3 },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
      // Second Year First Semester
      { code: "PI 10", title: "The Life and Works of Jose Rizal", units: 3 },
      { code: "ECON 103", title: "Introduction to Growth Theory and Open Economy Macroeconomics", units: 3 },
      { code: "ECON 104", title: "Introduction to Factor Market Analysis, General Equilibrium, and Welfare Economics", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "HK 12/13", title: "Human Kinetics Activities/Advanced Human Kinetics Activities", units: 2 },
      // Second Year Second Semester
      { code: "ETHICS 1", title: "Ethics and Moral Reasoning in Everyday Life", units: 3 },
      { code: "MGT 111", title: "Principles of Accounting", units: 3 },
      { code: "ECON 130", title: "Elements of Mathematical Economics", units: 3 },
      { code: "ECON 137", title: "Introduction to Econometrics", units: 3 },
      // Third Year First Semester
      { code: "ECON 115", title: "Philippine Economic History", units: 3 },
      { code: "ECON 121", title: "Money and Banking", units: 3 },
      { code: "ECON 138", title: "Intermediate Econometrics", units: 3 },
      { code: "ECON 170", title: "Intermediate Environmental Economics", units: 3 },
      { code: "ECON 175", title: "Benefit Cost Analysis", units: 3 },
      { code: "MGT 115", title: "Introduction to Financial Management", units: 3 },
      // Third Year Second Semester
      { code: "COMM 10", title: "Critical Perspectives in Communication", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      { code: "ECON 141", title: "International Economics", units: 3 },
      { code: "ECON 151", title: "Public Economics", units: 3 },
      // Third Year Midyear
      { code: "ECON 198", title: "Internship", units: 3, gradeType: "S/U" },
      // Fourth Year First Semester
      { code: "ECON 199", title: "Undergraduate Seminar", units: 1 },
      { code: "ECON 200", title: "Undergraduate Thesis", units: 3 },
      // Fourth Year Second Semester
      { code: "ECON 110", title: "History of Economic Doctrines", units: 3 },
      { code: "ECON 185", title: "Development Economics", units: 3 },
    ],
    requiredCodes: [
      "KAS 1", "ARTS 1", "STS 1", "MATH 25", "ECON 11", "HK 11",
      "MGT 101", "COST 10", "ECON 101", "ECON 102", "HK 12/13",
      "PI 10", "ECON 103", "ECON 104", "STAT 101",
      "ETHICS 1", "MGT 111", "ECON 130", "ECON 137",
      "ECON 115", "ECON 121", "ECON 138", "ECON 170", "ECON 175", "MGT 115",
      "COMM 10", "ENG 10", "ECON 141", "ECON 151",
      "ECON 198", "ECON 199", "ECON 200", "ECON 110", "ECON 185"
    ]
  },
  
  "BSAAE": {
    code: "BSAAE",
    name: "BS Agricultural and Applied Economics",
    college: "CEM",
    collegeName: "College of Economics and Management",
    available: true,
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "AAE 200", freeElectiveUnits: 9 },
      sp: { name: "Special Problem Track", code: "AAE 199", freeElectiveUnits: 12 }
    },
    defaultTrack: "sp",
    majorCourses: [
      // Year 1 Sem 1
      { code: "AAE 10", title: "Introduction to Agricultural and Applied Economics", units: 3 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "MGT 1", title: "Fundamentals of Accounting I", units: 3 },
      // Year 1 Sem 2
      { code: "ECON 11", title: "Introduction to Microeconomics", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      // Year 2 Sem 1
      { code: "AAE 103", title: "Principles of Crop Production", units: 3 },
      { code: "ECON 12", title: "Introduction to Macroeconomics", units: 3 },
      { code: "ECON 110", title: "Mathematics for Economists I", units: 3 },
      { code: "STAT 101", title: "Elementary Statistics", units: 3 },
      // Year 2 Sem 2
      { code: "AAE 104", title: "Principles of Animal Production", units: 3 },
      { code: "AAE 120", title: "Agricultural Economics Survey", units: 3 },
      { code: "ECON 101", title: "Microeconomic Theory", units: 3 },
      { code: "ECON 111", title: "Mathematics for Economists II", units: 3 },
      { code: "ECON 115", title: "Introduction to Econometrics", units: 3 },
      // Year 3 Sem 1
      { code: "AAE 125", title: "Agricultural Marketing", units: 3 },
      { code: "AAE 130", title: "Agricultural Production Economics", units: 3 },
      { code: "AAE 140", title: "Natural Resource Economics", units: 3 },
      { code: "ECON 102", title: "Macroeconomic Theory", units: 3 },
      { code: "ECON 116", title: "Econometric Methods", units: 3 },
      // Year 3 Sem 2
      { code: "AAE 145", title: "Environmental Economics", units: 3 },
      { code: "AAE 150", title: "Agricultural Finance", units: 3 },
      { code: "AAE 155", title: "Agribusiness Management", units: 3 },
      { code: "AAE 160", title: "Economic Planning and Development", units: 3 },
      { code: "AAE 185", title: "Agricultural and Applied Economics Research", units: 3 },
      // Year 3 Midyear
      { code: "AAE 198", title: "Practicum", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "AAE 165", title: "Agricultural Policy", units: 3 },
      { code: "AAE 199", title: "Special Problem", units: 3, track: "sp" },
      { code: "AAE 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
    ],
    requiredCodes: [
      "AAE 10", "AAE 103", "AAE 104", "AAE 120", "AAE 125", "AAE 130",
      "AAE 140", "AAE 145", "AAE 150", "AAE 155", "AAE 160", "AAE 165",
      "AAE 185", "AAE 198",
      "ECON 11", "ECON 12", "ECON 101", "ECON 102", "ECON 110", "ECON 111",
      "ECON 115", "ECON 116",
      "MATH 27", "MATH 28", "STAT 101", "MGT 1", "ENG 10"
    ]
  },
  
  "BSABME": {
    code: "BSABME",
    name: "BS Agribusiness Management and Entrepreneurship",
    college: "CEM",
    collegeName: "College of Economics and Management",
    available: true,
    totalUnitsRequired: 141,
    geCoursesRequired: 9,
    tracks: {
      thesis: { name: "Thesis Track", code: "ABME 200", freeElectiveUnits: 6 },
      sp: { name: "Special Problem Track", code: "ABME 199", freeElectiveUnits: 9 }
    },
    defaultTrack: "sp",
    majorCourses: [
      // Year 1 Sem 1
      { code: "ABME 10", title: "Introduction to Agribusiness Management", units: 3 },
      { code: "MATH 27", title: "Analytic Geometry and Calculus II", units: 3 },
      { code: "MGT 1", title: "Fundamentals of Accounting I", units: 3 },
      // Year 1 Sem 2
      { code: "ECON 11", title: "Introduction to Microeconomics", units: 3 },
      { code: "MATH 28", title: "Analytic Geometry and Calculus III", units: 3 },
      { code: "MGT 2", title: "Fundamentals of Accounting II", units: 3 },
      // Year 2 Sem 1
      { code: "ABME 101", title: "Principles of Crop Production", units: 3 },
      { code: "ABME 105", title: "Agribusiness Products Survey", units: 3 },
      { code: "ECON 12", title: "Introduction to Macroeconomics", units: 3 },
      { code: "MGT 101", title: "Organization and Management", units: 3 },
      { code: "STAT 101", title: "Elementary Statistics", units: 3 },
      // Year 2 Sem 2
      { code: "ABME 102", title: "Principles of Animal Production", units: 3 },
      { code: "ABME 110", title: "Agribusiness Marketing", units: 3 },
      { code: "ABME 120", title: "Financial Management", units: 3 },
      { code: "ABME 130", title: "Information Technology for Agribusiness", units: 3 },
      { code: "ECON 101", title: "Microeconomic Theory", units: 3 },
      // Year 3 Sem 1
      { code: "ABME 111", title: "Agricultural Sales", units: 3 },
      { code: "ABME 122", title: "Credit Management and Rural Banking", units: 3 },
      { code: "ABME 140", title: "Production Management", units: 3 },
      { code: "ABME 150", title: "Human Resource Management", units: 3 },
      { code: "ECON 102", title: "Macroeconomic Theory", units: 3 },
      // Year 3 Sem 2
      { code: "ABME 160", title: "Commercial Law and Ethics", units: 3 },
      { code: "ABME 170", title: "Strategic Management", units: 3 },
      { code: "ABME 172", title: "Product Ideation and Creation", units: 3 },
      { code: "ABME 180", title: "Statistics for Management", units: 3 },
      { code: "ABME 195", title: "Seminar", units: 1 },
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      // Year 3 Midyear
      { code: "ABME 198", title: "On-the-Job Training", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "ABME 171", title: "Entrepreneurship", units: 3 },
      { code: "ABME 185", title: "Operations Research", units: 3 },
      { code: "ABME 190", title: "Feasibility Study", units: 3 },
      { code: "ABME 199", title: "Special Problem", units: 3, track: "sp" },
      { code: "ABME 200", title: "Undergraduate Thesis", units: 6, track: "thesis" },
    ],
    requiredCodes: [
      "ABME 10", "ABME 101", "ABME 102", "ABME 105", "ABME 110", "ABME 111",
      "ABME 120", "ABME 122", "ABME 130", "ABME 140", "ABME 150", "ABME 160",
      "ABME 170", "ABME 171", "ABME 172", "ABME 180", "ABME 185", "ABME 190",
      "ABME 195", "ABME 198",
      "ECON 11", "ECON 12", "ECON 101", "ECON 102",
      "MGT 1", "MGT 2", "MGT 101", "MATH 27", "MATH 28", "STAT 101", "ENG 10"
    ]
  },
  
  "AAENTREP": {
    code: "AAENTREP",
    name: "Associate in Arts in Entrepreneurship",
    college: "CEM",
    collegeName: "College of Economics and Management",
    available: true,
    totalUnitsRequired: 75,
    geCoursesRequired: 5,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year First Semester
      { code: "KAS 1", title: "Kasaysayan ng Pilipinas/Philippine History", units: 3 },
      { code: "COMM 10", title: "Critical Perspectives in Communication", units: 3 },
      { code: "STS 1", title: "Science, Technology, and Society", units: 3 },
      { code: "ABME 10", title: "Foundations of Entrepreneurship", units: 3 },
      { code: "MGT 101", title: "Concepts and Dynamics of Management", units: 3 },
      { code: "HK 11", title: "Wellness and Basic Injury Management", units: 2 },
      // First Year Second Semester
      { code: "ARTS 1", title: "Critical Perspectives in the Arts", units: 3 },
      { code: "MGT 111", title: "Principles of Accounting", units: 3 },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
      // First Year Midyear
      { code: "PI 10", title: "The Life, Works, and Writings of Jose Rizal", units: 3 },
      // Second Year First Semester
      { code: "ABME 172", title: "Product Ideation and Creation", units: 3 },
      { code: "ABME 174", title: "Business Planning", units: 3 },
      { code: "ABME 115", title: "Entrepreneurial Finance", units: 3 },
      { code: "MGT 113", title: "Managerial Accounting", units: 3 },
      { code: "MGT 151", title: "Introduction to Marketing Management", units: 3 },
      { code: "ENTR 198", title: "Internship", units: 3, gradeType: "S/U" },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
      // Second Year Second Semester
      { code: "ETHICS 1", title: "Ethics and Moral Reasoning for Everyday Life", units: 3 },
      { code: "MGT 161", title: "Business Law", units: 3 },
      { code: "MGT 131", title: "Introduction to Human Relations and Behavior in Organization", units: 3 },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
    ],
    requiredCodes: [
      "KAS 1", "COMM 10", "STS 1", "ARTS 1", "ETHICS 1", "PI 10",
      "ABME 10", "ABME 172", "ABME 174", "ABME 115",
      "MGT 101", "MGT 111", "MGT 113", "MGT 131", "MGT 151", "MGT 161",
      "ENTR 198", "HK 11", "HK 12/13"
    ]
  },
  
  "BSACCT": {
    code: "BSACCT",
    name: "BS Accountancy",
    college: "CEM",
    collegeName: "College of Economics and Management",
    available: true,
    totalUnitsRequired: 166,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // First Year First Semester
      { code: "KAS 1", title: "Kasaysayan ng Pilipinas/Philippine History", units: 3 },
      { code: "STS 1", title: "Science, Technology, and Society", units: 3 },
      { code: "MATH 25", title: "Fundamental Calculus", units: 3 },
      { code: "ECON 11", title: "General Economics", units: 3 },
      { code: "MGT 101", title: "Concepts and Dynamics of Management", units: 3 },
      { code: "BA 99.1", title: "Fundamental Accounting Theory and Practice I", units: 3 },
      { code: "HK 11", title: "Wellness and Basic Injury Management", units: 2 },
      // First Year Second Semester
      { code: "ETHICS 1", title: "Ethics and Moral Reasoning for Everyday Life", units: 3 },
      { code: "ARTS 1", title: "Critical Perspectives in the Arts", units: 3 },
      { code: "COMM 10", title: "Critical Perspectives in Communication", units: 3 },
      { code: "STAT 101", title: "Statistical Methods", units: 3 },
      { code: "ECON 101", title: "Intermediate Macroeconomic Theory", units: 3 },
      { code: "BA 99.2", title: "Fundamental Accounting Theory and Practice II", units: 3 },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
      // First Year Midyear
      { code: "BA 183", title: "Introduction to Database Management for Accounting", units: 3 },
      // Second Year First Semester
      { code: "ECON 102", title: "Intermediate Microeconomic Theory", units: 3 },
      { code: "MGT 121", title: "Quantitative Business Analysis", units: 3 },
      { code: "MGT 131", title: "Introduction to Human Relations and Behavior in Organization", units: 3 },
      { code: "MGT 151", title: "Introduction to Marketing Management", units: 3 },
      { code: "BA 114.1", title: "Accounting Theory and Practice I", units: 6 },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
      // Second Year Second Semester
      { code: "MGT 141", title: "Fundamentals of Operations Management", units: 3 },
      { code: "BA 114.2", title: "Accounting Theory and Practice II", units: 6 },
      { code: "BA 116", title: "Cost Accounting", units: 3 },
      { code: "HK 12/13", title: "Basic or Advanced Human Kinetics Activities", units: 2 },
      // Second Year Midyear
      { code: "BA 198.1", title: "Internship I", units: 3, gradeType: "S/U" },
      // Third Year First Semester
      { code: "PI 10", title: "The Life, Works, and Writings of Jose Rizal", units: 3 },
      { code: "BA 117", title: "Managerial Cost Accounting and Control", units: 3 },
      { code: "BA 118.1", title: "Advanced Accounting I", units: 6 },
      { code: "BA 127", title: "Tax Accounting I", units: 3 },
      { code: "BA 141", title: "Business Finance I", units: 3 },
      { code: "BA 161", title: "Law on Business Transactions", units: 3 },
      // Third Year Second Semester
      { code: "ENG 10", title: "Writing of Scientific Papers", units: 3 },
      { code: "BA 142", title: "Business Finance II", units: 3 },
      { code: "BA 118.2", title: "Advanced Accounting II", units: 6 },
      { code: "BA 120.1", title: "Audit Theory", units: 3 },
      { code: "BA 128", title: "Tax Accounting II", units: 3 },
      { code: "BA 162", title: "Law on Business Associations", units: 3 },
      // Third Year Midyear
      { code: "BA 198.2", title: "Internship II", units: 3, gradeType: "S/U" },
      // Fourth Year First Semester
      { code: "MGT 117", title: "Investment Management", units: 3 },
      { code: "MGT 181", title: "Strategic Business Management", units: 3 },
      { code: "BA 122", title: "Computerized Accounting and Auditing Theory and Practice", units: 3 },
      { code: "BA 164", title: "Law on Negotiable Instruments and Banking Related Laws", units: 3 },
      { code: "BA 184.1", title: "Computer-based Accounting Systems", units: 3 },
      { code: "BA 190", title: "Special Problems", units: 1 },
      // Fourth Year Second Semester
      { code: "BA 120.2", title: "Audit Practice", units: 6 },
      { code: "BA 167", title: "Sales and Bailments and other Special Laws", units: 3 },
      { code: "BA 184.2", title: "Audit of Computer-based Accounting Systems", units: 3 },
      { code: "BA 191", title: "Special Topics", units: 1 },
    ],
    requiredCodes: [
      "KAS 1", "STS 1", "MATH 25", "ECON 11", "ECON 101", "ECON 102",
      "ETHICS 1", "ARTS 1", "COMM 10", "PI 10", "ENG 10",
      "STAT 101", "MGT 101", "MGT 121", "MGT 131", "MGT 141", "MGT 151", "MGT 117", "MGT 181",
      "BA 99.1", "BA 99.2", "BA 114.1", "BA 114.2", "BA 116", "BA 117",
      "BA 118.1", "BA 118.2", "BA 120.1", "BA 120.2", "BA 122",
      "BA 127", "BA 128", "BA 141", "BA 142",
      "BA 161", "BA 162", "BA 164", "BA 167",
      "BA 183", "BA 184.1", "BA 184.2", "BA 190", "BA 191",
      "BA 198.1", "BA 198.2", "HK 11", "HK 12/13"
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
    totalUnitsRequired: 143,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "FOR 1", title: "Introduction to Forests and Forestry", units: 3 },
      { code: "SFI 100", title: "Geology and Forest Soils", units: 3 },
      { code: "FBS 10", title: "Biology of Tropical Forest Plants", units: 4 },
      { code: "ECON 11", title: "General Economics", units: 3 },
      // Year 1 Sem 2
      { code: "SFFG 101", title: "Principles and Concepts of Social Forestry", units: 3 },
      { code: "FRM 92", title: "Forest Engineering", units: 3 },
      { code: "FBS 21", title: "Taxonomy of Forest Plants", units: 4 },
      { code: "FRM 120", title: "Forestry Economics", units: 3 },
      // Year 2 Sem 1
      { code: "SFFG 123", title: "Forest Policy and Institution", units: 3 },
      { code: "FPPS 11", title: "Wood Structure and Identification", units: 3 },
      { code: "FBS 31", title: "Plant Physiology", units: 3 },
      { code: "NRC 140", title: "Introduction to Geographic Information Systems", units: 3 },
      // Year 2 Sem 2
      { code: "NRC 170", title: "Watershed Management", units: 3 },
      { code: "FPPS 127", title: "Properties and Utilization of Forest Products", units: 4 },
      { code: "FBS 36", title: "Fundamentals of Forest Ecology", units: 3 },
      { code: "SFI 103", title: "Fundamentals of Agroforestry", units: 3 },
      // Year 3 Sem 1
      { code: "SFI 140", title: "Tropical Silviculture", units: 3 },
      { code: "FBS 45", title: "Forest Insect Pests and Diseases", units: 4 },
      { code: "SFFG 113", title: "Forestry Extension", units: 3 },
      { code: "FBS 101", title: "Forest Biodiversity", units: 3 },
      // Year 3 Sem 2
      { code: "FPPS 128", title: "Non-Timber Forest Products", units: 3 },
      { code: "SFI 142", title: "Plantation Forestry", units: 3 },
      { code: "FBS 172", title: "Forest Genetics", units: 3 },
      { code: "FOR 195", title: "Research Methods in Forestry and Natural Resources", units: 3 },
      { code: "FRM 61", title: "Forest Biometry", units: 3 },
      // Year 3 Midyear
      { code: "FOR 198", title: "Internship", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "FOR 200", title: "Undergraduate Thesis", units: 3 },
      { code: "SFFG 125", title: "Political Economy and Administration of Forestry", units: 3 },
      { code: "FRM 131", title: "Forest-based Enterprise Development and Management", units: 3 },
      { code: "SFFG 152", title: "Sociology of Natural Resources", units: 3 },
      { code: "FOR 199", title: "Undergraduate Seminar", units: 1 },
      // Year 4 Sem 2
      { code: "FPPS 147", title: "Furniture and Handicraft Production", units: 3 },
      { code: "FRM 183", title: "Timber Production Management", units: 3 },
      { code: "FRM 184", title: "Integrated Forest Resource Management", units: 3 },
    ],
    requiredCodes: [
      "FOR 1", "FOR 195", "FOR 198", "FOR 199", "FOR 200",
      "SFI 100", "SFI 103", "SFI 140", "SFI 142",
      "FBS 10", "FBS 21", "FBS 31", "FBS 36", "FBS 45", "FBS 101", "FBS 172",
      "SFFG 101", "SFFG 113", "SFFG 123", "SFFG 125", "SFFG 152",
      "FPPS 11", "FPPS 127", "FPPS 128", "FPPS 147",
      "FRM 61", "FRM 92", "FRM 120", "FRM 131", "FRM 183", "FRM 184",
      "NRC 140", "NRC 170", "ECON 11"
    ]
  },
  
  "AAFOR": {
    code: "AAFOR",
    name: "Associate in Forestry",
    college: "CFNR",
    collegeName: "College of Forestry and Natural Resources",
    available: true,
    totalUnitsRequired: 72,
    geCoursesRequired: 6,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      { code: "FOR 1", title: "Introduction to Forestry", units: 3 },
      { code: "FOR 21", title: "Dendrology", units: 3 },
      { code: "FOR 31", title: "Forest Mensuration", units: 4 },
      { code: "FOR 41", title: "Silvics and Silviculture", units: 4 },
      { code: "FOR 51", title: "Forest Ecology", units: 3 },
      { code: "FOR 101", title: "Forest Management", units: 4 },
      { code: "FOR 111", title: "Forest Utilization", units: 4 },
      { code: "FOR 121", title: "Forest Protection", units: 3 },
      { code: "BIO 1", title: "General Biology I", units: 3 },
      { code: "CHEM 16", title: "General Chemistry I", units: 4 },
      { code: "MATH 17", title: "Algebra and Trigonometry", units: 5 },
    ],
    requiredCodes: [
      "FOR 1", "FOR 21", "FOR 31", "FOR 41", "FOR 51", "FOR 101", "FOR 111",
      "FOR 121", "BIO 1", "CHEM 16", "MATH 17"
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
    totalUnitsRequired: 140,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "HFDS 101", title: "Family and the Environment", units: 3 },
      { code: "HUME 100", title: "Introduction to Human Ecology", units: 3 },
      { code: "CERP 101", title: "Fundamentals of Human Settlements", units: 3 },
      { code: "SDS 101", title: "Introduction to Social Development", units: 3 },
      // Year 1 Sem 2
      { code: "HUME 112", title: "Sustainability Science", units: 3 },
      { code: "HUME 107", title: "Principles of Human Development", units: 3 },
      { code: "HUME 105", title: "Humans and Their Environment", units: 3 },
      { code: "SOC 140", title: "Introduction to Demography", units: 3 },
      { code: "BIO 150", title: "Ecology", units: 4 },
      // Year 2 Sem 1
      { code: "HUME 110", title: "Ecology and Value Systems", units: 3 },
      { code: "HUME 111", title: "Human Ecological Perspectives in Development", units: 3 },
      { code: "HUME 113", title: "Community Study in Human Welfare", units: 3 },
      // Year 2 Sem 2
      { code: "STAT 166", title: "Statistics for the Social Sciences", units: 3 },
      { code: "HUME 114", title: "Material and Energy Flows", units: 3 },
      { code: "CERP 161", title: "Planning Theory and Practice I", units: 3 },
      { code: "HUME 115", title: "Social Policies", units: 3 },
      // Year 3 Sem 1
      { code: "CERP 140", title: "Fundamentals of Environmental Economics", units: 3 },
      { code: "HUME 122", title: "Human Needs and the Built Environment", units: 3 },
      { code: "HUME 123", title: "Climate Change Adaptation and Disaster Risk Reduction in Human Ecosystems", units: 3 },
      { code: "SDS 172", title: "Techniques in Community Organizing", units: 3 },
      { code: "HUME 195", title: "Research Methods in Human Ecology", units: 3 },
      // Year 3 Sem 2
      { code: "HUME 125", title: "Human Ecological Systems Mapping", units: 3 },
      { code: "HUME 124", title: "Environmental Health", units: 3 },
      { code: "SDS 173", title: "Consumer Education", units: 3 },
      { code: "HFDS 110", title: "Migration", units: 3 },
      // Year 4 Sem 1
      { code: "HNF 141", title: "Food and Nutrition Systems", units: 3 },
      { code: "CERP 200", title: "Undergraduate Thesis", units: 3 },
      // Year 4 Sem 2
      { code: "HUME 200a", title: "Supervised Field Experience", units: 6 },
      { code: "HUME 199", title: "Seminar in Human Ecology", units: 1 },
    ],
    requiredCodes: [
      "HUME 100", "HUME 105", "HUME 107", "HUME 110", "HUME 111", "HUME 112",
      "HUME 113", "HUME 114", "HUME 115", "HUME 122", "HUME 123", "HUME 124",
      "HUME 125", "HUME 195", "HUME 199", "HUME 200a",
      "HFDS 101", "HFDS 110", "HNF 141",
      "CERP 101", "CERP 140", "CERP 161", "CERP 200",
      "SDS 101", "SDS 172", "SDS 173",
      "SOC 140", "BIO 150", "STAT 166"
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
    totalUnitsRequired: 142,
    geCoursesRequired: 9,
    tracks: null,
    defaultTrack: null,
    majorCourses: [
      // Year 1 Sem 1
      { code: "DEVC 10", title: "Introduction to Development Communication", units: 3 },
      { code: "DEVC 11", title: "Introduction to Media Writing for Development", units: 3 },
      // Year 1 Sem 2
      { code: "DEVC 20", title: "Fundamentals of Development Journalism", units: 3 },
      { code: "DEVC 30", title: "Fundamentals of Community Broadcasting", units: 3 },
      { code: "DEVC 40", title: "Fundamentals of Educational Communication", units: 3 },
      { code: "DEVC 50", title: "Introduction to Science Communication", units: 3 },
      // Year 2 Sem 1
      { code: "COMM 10", title: "Critical Perspectives in Communication", units: 3 },
      { code: "DEVC 70", title: "Interpersonal Communication in Development", units: 3 },
      { code: "DEVC 80", title: "Communication and Society", units: 3 },
      { code: "DEVC 103", title: "Visual and Audiovisual Media Production", units: 3 },
      // Year 2 Sem 2
      { code: "DEVC 101", title: "Introduction to Communication Theory", units: 3 },
      { code: "DEVC 125", title: "Writing and Reporting for Development", units: 3 },
      { code: "DEVC 135", title: "Multi-media Materials Planning and Design", units: 3 },
      { code: "STAT 166", title: "Statistics for the Social Sciences", units: 3 },
      // Year 3 Sem 1
      { code: "DEVC 126", title: "Participatory Development Journalism", units: 3 },
      { code: "DEVC 144", title: "Media-based Learning Systems", units: 3 },
      { code: "DEVC 153", title: "Managing Information for Development", units: 3 },
      // Year 3 Sem 2
      { code: "DEVC 136", title: "Multi-media Materials Production and Management", units: 3 },
      { code: "DEVC 154", title: "Communicating Science for Development", units: 3 },
      { code: "DEVC 195", title: "Introduction to Communication Research", units: 3 },
      // Year 3 Midyear
      { code: "DEVC 198", title: "Internship", units: 3, gradeType: "S/U" },
      // Year 4 Sem 1
      { code: "DEVC 127", title: "Data Journalism for Development", units: 3 },
      { code: "DEVC 145", title: "Distance Learning Systems in Development Communication", units: 3 },
      { code: "DEVC 200", title: "Undergraduate Thesis", units: 3 },
      // Year 4 Sem 2
      { code: "DEVC 128", title: "Science Journalism", units: 3 },
      { code: "DEVC 155", title: "Knowledge Management for Development", units: 3 },
      { code: "DEVC 180", title: "Communication Campaigns and Programs", units: 3 },
      { code: "DEVC 199", title: "Undergraduate Seminar", units: 1 },
    ],
    requiredCodes: [
      "DEVC 10", "DEVC 11", "DEVC 20", "DEVC 30", "DEVC 40", "DEVC 50",
      "DEVC 70", "DEVC 80", "DEVC 101", "DEVC 103", "DEVC 125", "DEVC 126",
      "DEVC 127", "DEVC 128", "DEVC 135", "DEVC 136", "DEVC 144", "DEVC 145",
      "DEVC 153", "DEVC 154", "DEVC 155", "DEVC 180", "DEVC 195",
      "DEVC 198", "DEVC 199", "DEVC 200", "COMM 10", "STAT 166"
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
