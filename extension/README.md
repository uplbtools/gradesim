# Elbi GradeSim extension

Source for the Elbi GradeSim browser extension. Start with the [main README](../README.md) for what it does and where to install it.

![Elbi GradeSim](icons/icon128.png)

## How grades get in

`src/content.js` runs on `amis.uplb.edu.ph`. When the page loads it reads the AMIS login token from the page's `localStorage` and calls `https://api-amis.uplb.edu.ph/api/students/grades?summarize=true` once. It saves the result to `chrome.storage.local`:

| Key | Meaning |
| --- | --- |
| `gradesData` | `{ student_grades: { <termId>: { term, values: [...] } } }` with only id, grade, unit_taken, section, status, course code and title, and grade term |
| `fetchedAt` | Time of the last good fetch, in ms |
| `lastError` | `'not-logged-in'`, `'amis-error'` or `null` |

It skips the automatic fetch when `fetchedAt` is under an hour old. The popup's Refresh button sends `{ type: 'FETCH_GRADES', force: true }` to the open AMIS tab, which fetches right away and replies with `{ ok, lastError, fetchedAt }`.

Other keys: `selectedProgram`, `selectedTracks`, `excludedCourses`, `substitutions`, `customCourseStatus`, `plannerPins`, `plannerPetitions`, `plannerOptions`, `theme`, `termsAccepted`. Export JSON writes all of them plus `schemaVersion`. Import restores all of them except `termsAccepted` and `lastError`. `{ type: 'CLEAR_DATA' }` to the background script clears everything.

## Permissions

| Permission | Why |
| --- | --- |
| `storage` | Keeps grades and settings on your device |
| `amis.uplb.edu.ph` | Runs the content script on AMIS and lets the popup find the AMIS tab for Refresh |
| `api-amis.uplb.edu.ph` (Firefox only) | Lets the content script call the grades API. Chrome sends content script requests with the page's origin, and the API already allows `amis.uplb.edu.ph`, so Chrome, Edge and Opera do not need it |
| `externally_connectable` / `bridge.js` | Lets gradesim.uplb.tools ask for your grades when you press Import there |

## Build and test

```sh
bash build.sh all
for t in *.test.js; do node "$t"; done
npx -y web-ext@8 lint -s dist/firefox
```

Load `dist/chrome` (Chrome, Edge, Brave, Opera) or `dist/firefox` as an unpacked extension.

## Curriculum data

Programs live in `src/curriculum.js` and the AMIS course catalog in `src/catalog.js`. The pipeline that builds them from the official checklists is in `../scratch/`.
