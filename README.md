# Elbi GradeSim

A browser extension for UPLB students to calculate their GWA and simulate grades needed for Latin honors. Available on Chrome, Firefox, Opera, and Edge.

## Repository Structure

```
gradesim/
├── extension/           # Browser extension source
│   ├── src/             # Shared source (popup, content scripts, curriculum data)
│   ├── manifests/       # Per-browser manifest files
│   ├── icons/           # Extension icons
│   └── build.sh         # Build script for each browser target
├── website/             # Next.js landing page
│   ├── app/             # Pages and components
│   └── public/
│       ├── curricula/   # Curriculum images by college (PNG)
│       ├── chrome.svg   # Browser logos
│       └── firefox.svg
└── README.md
```

## Extension

### Build

```bash
cd extension
./build.sh all        # Build all browsers
./build.sh chrome     # Build Chrome only
./build.sh firefox    # Build Firefox only
```

Output goes to `extension/dist/<browser>/`. Load the folder in your browser's developer mode.

### Install from Store

- [Chrome Web Store](https://chromewebstore.google.com/detail/elbi-gradesim-uplb-gwa-ca/mlhklblbhkikcmobmmajckjcbmdinldb)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/elbi-gradesim/)

### Features

- Automatic GWA calculation from AMIS
- "What If?" simulator for Latin honor targets
- Grades overview by semester or year
- 30+ UPLB degree programs supported
- 100% local — no data leaves your device

## Website

```bash
cd website
npm install
npm run dev
```

The landing page links to both store listings and displays curriculum data.

## Privacy

All data stays on your device. No servers, no analytics, no tracking. See [PRIVACY_POLICY.md](extension/PRIVACY_POLICY.md).

## License

MIT
