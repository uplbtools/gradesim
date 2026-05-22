# Elbi GradeSim - UPLB GWA Calculator

A Chrome extension for UPLB students to calculate their GWA and simulate grades needed for Latin honors.

![Elbi GradeSim](icons/icon128.png)

## Features

### 1. Automatic GWA Calculation
- Automatically captures your grades from AMIS when you visit the Personal Information page
- Calculates your current GWA (weighted average)
- Excludes NSTP, PE, and HK courses from calculation (per UP policy)
- Shows your current Latin honor track

### 2. Grades Overview
- View all your grades organized by semester
- See course codes, titles, units, and grades
- Color-coded grades for easy visualization

### 3. Track Detection
- Automatically detects your track (Thesis or SP) based on enrolled courses
- CMSC 200 = Thesis Track (15 free elective units)
- CMSC 190 = SP Track (18 free elective units)

### 4. "What If?" Simulator
- Calculate what grades you need in remaining courses to achieve a target GWA
- Preset targets:
  - **Summa Cum Laude**: GWA ≤ 1.20
  - **Magna Cum Laude**: GWA ≤ 1.45
  - **Cum Laude**: GWA ≤ 1.75
  - **Honor Roll**: GWA ≤ 2.00
  - **Custom**: Enter any target GWA
- Shows remaining courses based on your selected curriculum
- Calculates required average grade for remaining courses

## Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store page](https://chrome.google.com/webstore) (Coming soon)
2. Click "Add to Chrome"

### Developer Mode (Manual Installation)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the `Elbi Gradesim` folder

## Usage

1. Log in to [AMIS](https://amis.uplb.edu.ph)
2. Go to the Personal Information page
3. Click the extension icon to view your GWA and use the What If? simulator

## Supported Programs

Currently supports:
- **BS Computer Science** - University of the Philippines Los Baños

More programs coming soon! Other colleges (CAS, CAFS, CEM, CEAT, CDC, CFNR, CHE, UPRHS) are listed but curriculum data is pending.

## Privacy Policy

**Your data stays on YOUR device.**

- ✅ All data is stored locally using Chrome's built-in storage
- ✅ No external servers - everything runs in your browser
- ✅ No analytics or tracking
- ✅ No data collection or sharing with third parties
- ✅ We never see or store your AMIS credentials

For full details, see [PRIVACY_POLICY.md](PRIVACY_POLICY.md)

## Permissions Explained

| Permission | Why We Need It |
|------------|----------------|
| `storage` | To save your grades data locally on your device |
| `host_permissions` | To access AMIS portal and read your grades when you're logged in |

## Technical Details

The extension intercepts the `grades?summarize=true` API call made by AMIS to get your grades data. This data is stored locally in your browser and never sent to any external server.

## Contributing

Feel free to add more curricula! Edit `curriculum.js` to add courses for other degree programs.

## License

MIT License
