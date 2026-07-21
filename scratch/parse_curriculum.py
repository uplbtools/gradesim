import re
import os
import subprocess
import json

def pdf_to_layout_text(pdf_path):
    txt_path = pdf_path.replace(".pdf", "_layout.txt")
    subprocess.run(["pdftotext", "-layout", pdf_path, txt_path], check=True)
    with open(txt_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    return content

def parse_semester_column(text_chunk):
    # Regex to find a course code (like CHEM 18, MATH 27, SPCM 11, etc.)
    # and units at the end of the line/chunk.
    # Note that course codes can sometimes contain slashes (e.g. KAS 1/HIST 1)
    # or decimal numbers (e.g. BIO 11.1).
    lines = text_chunk.split("\n")
    courses = []
    
    for line in lines:
        line_strip = line.strip()
        if not line_strip:
            continue
            
        # Check if this line looks like a course listing
        # Example pattern: "CHEM 18. University Chemistry 3"
        # or "HK 11. Wellness and Basic Injury Management (2)"
        # Let's search for units first at the right side of the string
        units_match = re.search(r'\s+(\(?\d+[\.\d]*\)?)\s*$', line_strip)
        if not units_match:
            continue
            
        units_str = units_match.group(1)
        # Strip units from line
        rest = line_strip[:units_match.start()].strip()
        
        # Course code pattern: starts with uppercase letters, followed by space, then number (like CMSC 12, MATH 27)
        # or slash-combined codes (KAS 1/HIST 1)
        code_match = re.match(r'^([A-Z]{2,6}(?:\s+\d+[A-Z]?)?(?:\s*/\s*[A-Z]{2,6}\s+\d+[A-Z]?)?(?:\.\d+)?)\.?\s+(.+)$', rest)
        if code_match:
            code = code_match.group(1).strip()
            title = code_match.group(2).strip()
            
            # clean up title and code
            # units clean up
            units = units_str.replace("(", "").replace(")", "").strip()
            try:
                units = float(units)
                if units.is_integer():
                    units = int(units)
            except ValueError:
                units = 3 # default
                
            courses.append({
                "code": code,
                "title": title,
                "units": units
            })
            
    return courses

def parse_curriculum_layout(layout_text):
    lines = layout_text.split("\n")
    
    current_year = 0
    # semesters list
    curriculum = {
        "1": {"1": [], "2": [], "midyear": []},
        "2": {"1": [], "2": [], "midyear": []},
        "3": {"1": [], "2": [], "midyear": []},
        "4": {"1": [], "2": [], "midyear": []},
    }
    
    # Process line by line
    # We identify Year blocks (e.g. FIRST YEAR, SECOND YEAR, THIRD YEAR, FOURTH YEAR)
    # Inside a year block, we divide lines into columns:
    # Col 1: 0 to 55
    # Col 2: 56 to 110
    # Col 3: 111 onwards
    
    col1_lines = []
    col2_lines = []
    col3_lines = []
    
    for line in lines:
        upper_line = line.upper()
        
        # Year detection
        if "FIRST YEAR" in upper_line:
            # Save previous year courses if any
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_semester_column("\n".join(col1_lines))
                curriculum[str(current_year)]["2"] = parse_semester_column("\n".join(col2_lines))
                curriculum[str(current_year)]["midyear"] = parse_semester_column("\n".join(col3_lines))
            current_year = 1
            col1_lines, col2_lines, col3_lines = [], [], []
            continue
        elif "SECOND YEAR" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_semester_column("\n".join(col1_lines))
                curriculum[str(current_year)]["2"] = parse_semester_column("\n".join(col2_lines))
                curriculum[str(current_year)]["midyear"] = parse_semester_column("\n".join(col3_lines))
            current_year = 2
            col1_lines, col2_lines, col3_lines = [], [], []
            continue
        elif "THIRD YEAR" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_semester_column("\n".join(col1_lines))
                curriculum[str(current_year)]["2"] = parse_semester_column("\n".join(col2_lines))
                curriculum[str(current_year)]["midyear"] = parse_semester_column("\n".join(col3_lines))
            current_year = 3
            col1_lines, col2_lines, col3_lines = [], [], []
            continue
        elif "FOURTH YEAR" in upper_line:
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_semester_column("\n".join(col1_lines))
                curriculum[str(current_year)]["2"] = parse_semester_column("\n".join(col2_lines))
                curriculum[str(current_year)]["midyear"] = parse_semester_column("\n".join(col3_lines))
            current_year = 4
            col1_lines, col2_lines, col3_lines = [], [], []
            continue
        elif "TOTAL UNITS" in upper_line or "BACHELOR OF" in upper_line:
            # We reached the end of a block
            if current_year > 0:
                curriculum[str(current_year)]["1"] = parse_semester_column("\n".join(col1_lines))
                curriculum[str(current_year)]["2"] = parse_semester_column("\n".join(col2_lines))
                curriculum[str(current_year)]["midyear"] = parse_semester_column("\n".join(col3_lines))
                current_year = 0
            continue
            
        if current_year > 0:
            # Split line into column slices
            # Padd line if shorter than 120 chars
            if len(line) < 150:
                line = line + " " * (150 - len(line))
                
            c1 = line[0:55].strip()
            c2 = line[55:110].strip()
            c3 = line[110:].strip()
            
            # Don't add header labels
            if "FIRST SEMESTER" in c1.upper() or "SECOND SEMESTER" in c2.upper() or "MIDYEAR" in c3.upper():
                continue
                
            if c1: col1_lines.append(c1)
            if c2: col2_lines.append(c2)
            if c3: col3_lines.append(c3)
            
    # Final flush
    if current_year > 0:
        curriculum[str(current_year)]["1"] = parse_semester_column("\n".join(col1_lines))
        curriculum[str(current_year)]["2"] = parse_semester_column("\n".join(col2_lines))
        curriculum[str(current_year)]["midyear"] = parse_semester_column("\n".join(col3_lines))
        
    return curriculum

if __name__ == "__main__":
    pdf = "/home/stimmie/dev/uplbtools/gradesim/scratch/pdfs/BS-Chemistry.pdf"
    txt = pdf_to_layout_text(pdf)
    res = parse_curriculum_layout(txt)
    print(json.dumps(res, indent=2))
