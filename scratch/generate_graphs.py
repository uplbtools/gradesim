import os
import re
import json
import subprocess

PDF_TO_CODE = {
    "BA-Communication-Arts": "BACOMM",
    "BA-Philosophy": "BAPHILO",
    "BA-Sociology": "BASOCIO",
    "BS-Applied-Mathematics": "BSAPMATH",
    "BS-Applied-Physics": "BSAPPHY",
    "BS-Biology": "BSBIO",
    "BS-Chemistry": "BSCHEM",
    "BS-Mathematics": "BSMATH",
    "BS-Statistics": "BSSTAT",
    "BS-Agricultural-Chemistry": "BSACHEM",
    "BS-Agriculture": "BSAGRI",
    "BS-Agricultural-Biotechnology": "BSABIO",
    "BS-Food-Science-and-Technology": "BSFST",
    "BS-Agricultural-and-Applied-Economics": "BSAAE",
    "BS-Agribusiness-Management-Entrepreneurship": "BSABME",
    "BS-Economics": "BSECON",
    "BS-Chemical-Engineering": "BSCHE",
    "BS-Civil-Engineering": "BSCE",
    "BS-Electrical-Engineering": "BSEE",
    "BS-Industrial-Engineering": "BSIE",
    "BS-Mechanical-Engineering": "BSME",
    "BS-Forestry": "BSFOR",
    "BS-Human-Ecology": "BSHE",
    "BS-Nutrition": "BSNUTRI",
    "Doctor-of-Veterinary-Medicine": "DVM",
    "BS-Development-Communication": "BSDC",
}

# Standard UPLB prerequisite rules based on subject prefixes and course sequences
PREREQ_RULES = {
    # Math
    "MATH 28": ["MATH 27"],
    "MATH 37": ["MATH 36"],
    "MATH 38": ["MATH 37"],
    "MATH 101": ["MATH 27", "MATH 36"],
    "MATH 103": ["MATH 101"],
    "MATH 111": ["MATH 101"],
    "MATH 120": ["MATH 101"],
    "MATH 133": ["MATH 101"],
    "MATH 135": ["MATH 120"],
    "MATH 138": ["MATH 38", "MATH 101"],
    "MATH 141": ["MATH 101"],
    "MATH 151": ["MATH 38", "MATH 101"],
    "MATH 155": ["MATH 38", "MATH 101"],
    "MATH 165": ["MATH 155"],
    "MATH 174": ["MATH 38", "AMAT 152"],
    "MATH 175": ["MATH 174"],
    "MATH 181": ["MATH 38"],
    "MATH 182": ["MATH 181"],
    "MATH 192": ["MATH 111"],
    "MATH 195": ["MATH 101", "MATH 111"],
    
    # Applied Math
    "AMAT 105": ["MATH 27", "MATH 36"],
    "AMAT 110": ["AMAT 105"],
    "AMAT 112": ["AMAT 105"],
    "AMAT 152": ["MATH 27", "MATH 36"],
    "AMAT 170": ["AMAT 105"],
    
    # Physics
    "PHYS 72": ["PHYS 71", "MATH 28"],
    "PHYS 72.1": ["PHYS 71.1", "PHYS 72"],
    "PHYS 102": ["PHYS 101", "MATH 28"],
    "PHYS 103": ["PHYS 102"],
    "PHYS 104": ["PHYS 102"],
    "PHYS 112": ["PHYS 111"],
    "PHYS 113": ["PHYS 112"],
    "PHYS 121": ["PHYS 101", "PHYS 111"],
    "PHYS 122": ["PHYS 121"],
    "PHYS 131": ["PHYS 102", "PHYS 112"],
    "PHYS 132": ["PHYS 131"],
    "PHYS 141": ["PHYS 104", "PHYS 113"],
    "PHYS 142": ["PHYS 141"],
    "PHYS 151": ["PHYS 103", "PHYS 121"],
    
    # Chemistry
    "CHEM 19": ["CHEM 18", "CHEM 18.1"],
    "CHEM 32": ["CHEM 18", "CHEM 18.1"],
    "CHEM 32.1": ["CHEM 32"],
    "CHEM 43": ["CHEM 19", "CHEM 32"],
    "CHEM 43.1": ["CHEM 43"],
    "CHEM 44": ["CHEM 43"],
    "CHEM 44.1": ["CHEM 44"],
    "CHEM 111": ["CHEM 32", "MATH 28", "PHYS 72"],
    "CHEM 111.1": ["CHEM 111"],
    "CHEM 112": ["CHEM 111"],
    "CHEM 112.1": ["CHEM 112"],
    "CHEM 115": ["CHEM 112"],
    "CHEM 137": ["CHEM 32", "CHEM 111"],
    "CHEM 137.1": ["CHEM 137"],
    "CHEM 140": ["CHEM 44", "CHEM 44.1"],
    "CHEM 161A": ["CHEM 44", "CHEM 44.1"],
    "CHEM 161B": ["CHEM 161A"],
    "CHEM 161.1": ["CHEM 161A"],
    
    # Computer Science
    "CMSC 21": ["CMSC 12"],
    "CMSC 22": ["CMSC 21"],
    "CMSC 23": ["CMSC 22"],
    "CMSC 56": ["MATH 27"],
    "CMSC 57": ["CMSC 56"],
    "CMSC 100": ["CMSC 22"],
    "CMSC 123": ["CMSC 22", "CMSC 56"],
    "CMSC 124": ["CMSC 123"],
    "CMSC 125": ["CMSC 123", "CMSC 131"],
    "CMSC 127": ["CMSC 123"],
    "CMSC 128": ["CMSC 123"],
    "CMSC 130": ["CMSC 56", "PHYS 72"],
    "CMSC 131": ["CMSC 21", "CMSC 130"],
    "CMSC 132": ["CMSC 131"],
    "CMSC 137": ["CMSC 125"],
    "CMSC 141": ["CMSC 123", "CMSC 57"],
    "CMSC 142": ["CMSC 123", "CMSC 57"],
    "CMSC 150": ["CMSC 21", "MATH 28"],
    "CMSC 170": ["CMSC 123", "CMSC 57"],
    "CMSC 173": ["CMSC 128"],
    "CMSC 180": ["CMSC 125", "CMSC 132"],
    
    # Stats
    "STAT 144": ["MATH 28", "STAT 101"],
    "STAT 145": ["STAT 144"],
    "STAT 146": ["STAT 145"],
    "STAT 151": ["STAT 145"],
    "STAT 156": ["STAT 151"],
    "STAT 162": ["STAT 101"],
    "STAT 163": ["STAT 145"],
    "STAT 165": ["STAT 151"],
    "STAT 167": ["STAT 145"],
    "STAT 168": ["STAT 162"],
    "STAT 173": ["STAT 163"],
    "STAT 174": ["STAT 145"],
    "STAT 175": ["STAT 151"],
    "STAT 181": ["STAT 145", "STAT 182"],
    "STAT 183": ["STAT 181"],
}

def convert_pdf_to_layout(pdf_path):
    txt_path = pdf_path.replace(".pdf", "_layout.txt")
    subprocess.run(["pdftotext", "-layout", pdf_path, txt_path], check=True)
    return txt_path

def find_slice_points(lines):
    max_len = max(len(l) for l in lines)
    if max_len < 100:
        return 64, 114
        
    counts = [0] * max_len
    for line in lines:
        for i, c in enumerate(line):
            if not c.isspace():
                if i < max_len:
                    counts[i] += 1
                
    window = 3
    smoothed = []
    for i in range(len(counts)):
        start = max(0, i - window)
        end = min(len(counts), i + window + 1)
        smoothed.append(sum(counts[start:end]) / (end - start))
        
    val1_idx = 64
    min_val1 = float('inf')
    for i in range(max(0, 45), min(len(smoothed), 75)):
        if smoothed[i] < min_val1:
            min_val1 = smoothed[i]
            val1_idx = i
            
    val2_idx = 114
    min_val2 = float('inf')
    for i in range(max(0, 95), min(len(smoothed), 125)):
        if smoothed[i] < min_val2:
            min_val2 = smoothed[i]
            val2_idx = i
            
    return val1_idx, val2_idx

def parse_column_cells(cells):
    courses = []
    current_course = None
    
    for cell in cells:
        cell = cell.strip()
        if not cell:
            continue
            
        # Clean leading non-word/non-space prefix (e.g. ") ", "( ", etc.)
        cell_clean = re.sub(r"^[^\w\s]+", "", cell).strip()
        if not cell_clean:
            continue
            
        is_new = False
        code = None
        
        # Check standard course code pattern (e.g. CHEM 18)
        code_match = re.match(r"^([A-Z]{2,6}(?:\s+\d+[A-Z]*)?(?:\s*/\s*[A-Z]{2,6}\s+\d+[A-Z]*)?(?:\.\d+)?)\.?\s+(.+)$", cell_clean)
        if code_match:
            is_new = True
            code = code_match.group(1).strip()
            rest = code_match.group(2).strip()
        else:
            # Check GE / Elective common patterns
            ge_match = re.match(r"^(GE\s+Elective|Elective|ARTS\s+\d+|ETHICS\s+\d+|NSTP\s+\d+|KAS\s+\d+|HIST\s+\d+|PI\s+\d+|STS\s+\d+|COMM\s+\d+)\.?\s*(.*)$", cell_clean, re.IGNORECASE)
            if ge_match:
                is_new = True
                code = ge_match.group(1).strip()
                rest = ge_match.group(2).strip()
            else:
                rest = cell
                
        # Look for units at the end of the line
        units_match = re.search(r"\s+(\(?\d+(?:\.\d+)?\)?)\s*$", rest)
        units = None
        if units_match:
            units_str = units_match.group(1).replace("(", "").replace(")", "").strip()
            try:
                units = float(units_str)
                if units.is_integer():
                    units = int(units)
            except ValueError:
                units = 3
            rest = rest[:units_match.start()].strip()
            
        if is_new:
            if current_course:
                courses.append(current_course)
            current_course = {
                "code": code,
                "title": rest,
                "units": units if units is not None else 3
            }
        else:
            if current_course:
                if rest:
                    current_course["title"] = (current_course["title"] + " " + rest).strip()
                if units is not None:
                    current_course["units"] = units
            else:
                current_course = {
                    "code": rest,
                    "title": rest,
                    "units": units if units is not None else 3
                }
                
    if current_course:
        courses.append(current_course)
        
    return courses

def parse_layout_to_semesters(layout_txt_path):
    with open(layout_txt_path, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
        
    col1_end, col2_end = find_slice_points(lines)
    
    current_year = 0
    curriculum = {
        "1": {"1": [], "2": [], "midyear": []},
        "2": {"1": [], "2": [], "midyear": []},
        "3": {"1": [], "2": [], "midyear": []},
        "4": {"1": [], "2": [], "midyear": []},
    }
    
    col1_raw, col2_raw, col3_raw = [], [], []
    
    for line in lines:
        upper_line = line.upper()
        
        # Year block detector
        if "FIRST YEAR" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_column_cells(col1_raw)
                curriculum[str(current_year)]["2"] = parse_column_cells(col2_raw)
                curriculum[str(current_year)]["midyear"] = parse_column_cells(col3_raw)
            current_year = 1
            col1_raw, col2_raw, col3_raw = [], [], []
            continue
        elif "SECOND YEAR" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_column_cells(col1_raw)
                curriculum[str(current_year)]["2"] = parse_column_cells(col2_raw)
                curriculum[str(current_year)]["midyear"] = parse_column_cells(col3_raw)
            current_year = 2
            col1_raw, col2_raw, col3_raw = [], [], []
            continue
        elif "THIRD YEAR" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_column_cells(col1_raw)
                curriculum[str(current_year)]["2"] = parse_column_cells(col2_raw)
                curriculum[str(current_year)]["midyear"] = parse_column_cells(col3_raw)
            current_year = 3
            col1_raw, col2_raw, col3_raw = [], [], []
            continue
        elif "FOURTH YEAR" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_column_cells(col1_raw)
                curriculum[str(current_year)]["2"] = parse_column_cells(col2_raw)
                curriculum[str(current_year)]["midyear"] = parse_column_cells(col3_raw)
            current_year = 4
            col1_raw, col2_raw, col3_raw = [], [], []
            continue
        elif "TOTAL UNITS" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_column_cells(col1_raw)
                curriculum[str(current_year)]["2"] = parse_column_cells(col2_raw)
                curriculum[str(current_year)]["midyear"] = parse_column_cells(col3_raw)
                current_year = 0
            continue
            
        if current_year > 0:
            if len(line) < 150:
                line = line + " " * (150 - len(line))
            c1 = line[0:col1_end].strip()
            c2 = line[col1_end:col2_end].strip()
            c3 = line[col2_end:].strip()
            
            # Skip indicators
            if "FIRST SEMESTER" in c1.upper() or "SECOND SEMESTER" in c2.upper() or "MIDYEAR" in c3.upper():
                continue
                
            if c1: col1_raw.append(c1)
            if c2: col2_raw.append(c2)
            if c3: col3_raw.append(c3)
            
    # Flush
    if current_year > 0:
        curriculum[str(current_year)]["1"] = parse_column_cells(col1_raw)
        curriculum[str(current_year)]["2"] = parse_column_cells(col2_raw)
        curriculum[str(current_year)]["midyear"] = parse_column_cells(col3_raw)
        
    return curriculum

def merge_parsed_curriculum(code, parsed_sems):
    # Flatten parsed semesters into majorCourses array with year, sem, and prereqs
    major_courses = []
    required_codes = []
    
    for year, sems in parsed_sems.items():
        for sem, courses in sems.items():
            for c in courses:
                if not c or not c.get("code"):
                    continue
                ccode = c["code"]
                # Infer prerequisites
                prereqs = PREREQ_RULES.get(ccode, [])
                
                major_courses.append({
                    "code": ccode,
                    "title": c["title"],
                    "units": c["units"],
                    "year": int(year),
                    "sem": sem,
                    "prereqs": prereqs
                })
                
                # Exclude NSTP and HK from required codes count/list to match gradesim exclusions
                if not any(ccode.startswith(p) for p in ["NSTP", "HK", "PE"]):
                    required_codes.append(ccode)
                    
    return major_courses, required_codes

def update_curriculum_database():
    pdf_dir = "/home/stimmie/dev/uplbtools/gradesim/scratch/pdfs"
    curriculum_path = "/home/stimmie/dev/uplbtools/gradesim/extension/src/curriculum.js"
    
    # 1. Read existing curriculum.js
    with open(curriculum_path, "r", encoding="utf-8") as f:
        js_content = f.read()
        
    # We will locate the UPLB_PROGRAMS object and update the entries dynamically
    # First, let's load UPLB_PROGRAMS by mocking it in Python
    # Since we can just run node to dump the current UPLB_PROGRAMS, modify it, and write it back,
    # let's write a python dict representing all programs and export it!
    # Wait! If we parse all PDFs, we can build a JSON model of the updated programs,
    # and then write a Node/Python script to precisely rewrite curriculum.js while keeping the colleges object!
    
    print("Parsing PDFs to structured data...")
    parsed_programs = {}
    for filename in os.listdir(pdf_dir):
        if filename.endswith(".pdf"):
            base_name = filename.replace(".pdf", "")
            code = PDF_TO_CODE.get(base_name)
            if not code:
                continue
                
            pdf_path = os.path.join(pdf_dir, filename)
            try:
                txt_path = convert_pdf_to_layout(pdf_path)
                parsed_sems = parse_layout_to_semesters(txt_path)
                major_courses, required_codes = merge_parsed_curriculum(code, parsed_sems)
                
                parsed_programs[code] = {
                    "majorCourses": major_courses,
                    "requiredCodes": required_codes
                }
                print(f"Parsed {code}: {len(major_courses)} courses.")
            except Exception as e:
                print(f"Error parsing PDF {filename}: {e}")
                
    # Save the parsed programs to a temp JSON file
    temp_json_path = "/home/stimmie/dev/uplbtools/gradesim/scratch/parsed_programs.json"
    with open(temp_json_path, "w", encoding="utf-8") as f:
        json.dump(parsed_programs, f, indent=2)
        
    # Run a node script to update curriculum.js with the parsed programs!
    node_script = """
const fs = require('fs');
const path = require('path');

const curriculumPath = '/home/stimmie/dev/uplbtools/gradesim/extension/src/curriculum.js';
const tempJsonPath = '/home/stimmie/dev/uplbtools/gradesim/scratch/parsed_programs.json';

const parsed = JSON.parse(fs.readFileSync(tempJsonPath, 'utf8'));
let content = fs.readFileSync(curriculumPath, 'utf8');

// We evaluate curriculum.js context to load UPLB_PROGRAMS
const context = {};
eval(content + '\\ncontext.UPLB_PROGRAMS = UPLB_PROGRAMS;');
const UPLB_PROGRAMS = context.UPLB_PROGRAMS;

// Merge parsed programs into UPLB_PROGRAMS
Object.entries(UPLB_PROGRAMS).forEach(([code, program]) => {
  // Add graph attributes (year, sem, prereqs) to all programs
  if (parsed[code]) {
    // For PDF-parsed programs, replace majorCourses and requiredCodes with clean parsed data
    program.majorCourses = parsed[code].majorCourses;
    program.requiredCodes = parsed[code].requiredCodes;
    program.available = true;
  } else {
    // For non-PDF programs, infer year/sem from array index and add basic prereqs
    if (program.majorCourses) {
      program.majorCourses = program.majorCourses.map((course, idx) => {
        // Estimate year/semester based on index
        const total = program.majorCourses.length;
        const ratio = idx / total;
        let year = 1;
        let sem = "1";
        
        if (ratio < 0.25) { year = 1; sem = idx % 2 === 0 ? "1" : "2"; }
        else if (ratio < 0.50) { year = 2; sem = idx % 2 === 0 ? "1" : "2"; }
        else if (ratio < 0.75) { year = 3; sem = idx % 2 === 0 ? "1" : "2"; }
        else { year = 4; sem = idx % 2 === 0 ? "1" : "2"; }
        
        // Infer prereqs from common UPLB rules
        const prereqs = [];
        const normalizedCode = course.code.toUpperCase().trim();
        
        // Match numbers in course codes
        const codeNumMatch = normalizedCode.match(/([A-Z]+)\\s*(\\d+)/);
        if (codeNumMatch) {
          const prefix = codeNumMatch[1];
          const num = parseInt(codeNumMatch[2]);
          // If there is another course of the same prefix with smaller number in the list, set as prereq
          const prev = program.majorCourses.slice(0, idx).find(c => {
            const cMatch = c.code.toUpperCase().trim().match(/([A-Z]+)\\s*(\\d+)/);
            return cMatch && cMatch[1] === prefix && parseInt(cMatch[2]) < num;
          });
          if (prev) {
            prereqs.push(prev.code);
          }
        }
        
        return {
          ...course,
          year,
          sem,
          prereqs
        };
      });
    }
  }
});

// Generate new code content for curriculum.js
let newContent = '// UPLB Curriculum Database\\n// Complete undergraduate programs for University of the Philippines Los Baños\\n// NOTE: This is UPLB only - not UP Diliman, UP Manila, etc.\\n\\nconst UPLB_PROGRAMS = ' + JSON.stringify(UPLB_PROGRAMS, null, 2) + ';\\n\\n';

// Add the rest of the utility functions
const helperCode = `// Group programs by college
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
    let electiveInfo = \`\${trackInfo.freeElectiveUnits} free elective units\`;
    if (trackInfo.majorElectiveUnits) {
      electiveInfo += \` • \${trackInfo.majorElectiveUnits} major elective units\`;
    }
    html += \`
      <label class="track-option">
        <input type="radio" name="track" value="\${trackKey}" \${isChecked}>
        <span class="track-label">
          <strong>\${trackInfo.name}</strong>
          <small>\${trackInfo.code} • \${electiveInfo}</small>
        </span>
      </label>
    \`;
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
    hintEl.textContent = \`Based on \${currentProgram.name} curriculum\`;
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
`;

fs.writeFileSync(curriculumPath, newContent + helperCode, 'utf8');
console.log('Successfully updated curriculum.js with structured course graphs!');
"""
    
    node_temp_path = "/home/stimmie/dev/uplbtools/gradesim/scratch/update_db.js"
    with open(node_temp_path, "w", encoding="utf-8") as f:
        f.write(node_script)
        
    subprocess.run(["node", node_temp_path], check=True)

if __name__ == "__main__":
    update_curriculum_database()
