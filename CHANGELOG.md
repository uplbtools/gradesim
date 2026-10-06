# Changelog

## [Unreleased]

### Features
- The web app at gradesim.uplb.tools can import your grades straight from the extension when you press Import there.
- The planner follows your SP or thesis track.

### Fixes
- A 4.00 or 5.00 stays in the GWA but no longer counts as a completed course. PEd majors' courses are no longer dropped as PE. No honors show before any graded unit, and scholar badges need 15 units with no 5.00, 4.00 or INC.
- The popup fills the screen on Firefox for Android.
- Grades load without reloading AMIS. The extension calls the AMIS grades API once per hour with your login, and Refresh in the popup fetches right away from the open AMIS tab.
- Only the course fields GradeSim uses are saved, not the whole AMIS response.
- Export JSON saves every setting, including planner pins, petitions and theme, with a schema version. Import no longer accepts the terms for you.
- New Clear my data button in Help.
- Sharper toolbar icons at 16, 32 and 48 px, and one store name, Elbi GradeSim, everywhere.

## [2.0.4] - 2026-10-06

- Same code as 2.0.3, published again.

## [2.0.3] - 2026-10-05

### Fixes
- Planner legend chips are added without `insertAdjacentHTML`, which the Firefox add-on review flags.

## [2.0.2] - 2026-10-05

### Fixes
- Planner markup is built with `DOMParser` instead of `innerHTML`.

## [2.0.1] - 2026-10-05

### Fixes
- Planner icon placeholders are swapped without assigning `outerHTML`.

## [2.0.0] - 2026-10-05

### Features
- Course planner. A curriculum map of your program with prerequisites from the AMIS catalog, the critical path, retakes, petitions and what-if plans, laid out term by term.
- UPLB Tools look. New colors, self-hosted fonts, light and dark themes, and a flat plumbob icon.
- Links point to the new home at gradesim.uplb.tools and its hosted terms and privacy pages.
- Store builds for Chrome, Firefox and Edge are published from CI.

## [1.2.1] - 2026-05-29

### Features
- **Backup & Restore**: You can now export your grades and settings to a JSON file. Use this to safely back up your data or transfer your setup to another device.
- **Official Website**: Launched the official GradeSim landing page and web presence, which is now linked directly from the extension's header and credits.
- **Better Full-Screen Mode**: Constrained the maximum width of the app when opened in a full browser tab so you don't have to strain your eyes scanning across wide screens.

### Improvements & Fixes
- **Help Guide Overhaul**: Completely rewrote the Help section to be specific to UPLB and moved it into its own scrollable menu.
- **Grade Legend**: Added a full UP grading system reference directly inside the Help menu.
- **Easier on the Eyes**: Tweaked the green color palette to be more muted and increased text contrast across the board to reduce eye strain.
- **Smarter Sorting**: Semesters now display in proper chronological order (1st Sem, 2nd Sem, Midyear) instead of alphabetically.
- **Curriculum Updates**: Cleaned up some formatting typos in the curriculum data and officially updated "BS Human Development and Family Studies" to its current name, "BS Human Ecology".
- Fixed an issue where text would get cut off or overlap in smaller badges.
