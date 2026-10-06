# Elbi GradeSim

Elbi GradeSim is a browser extension for UPLB students. It reads your grades from AMIS, works out your GWA, shows what you need for Latin honors, and plans the courses you still have to take.

Not affiliated with UP. Unofficial estimate. INC/DRP may not reflect correctly. Always verify with the OUR.

## Get it

- [Chrome Web Store](https://chromewebstore.google.com/detail/elbi-gradesim-uplb-gwa-ca/mlhklblbhkikcmobmmajckjcbmdinldb) (also works in Brave)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/elbi-gradesim/), desktop and Android
- [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/elbi-gradesim-uplb-gwa-/ebiakebpglddgmkdehdjiadnjgkmgnga)

No extension? The web app at [gradesim.uplb.tools](https://gradesim.uplb.tools) does the same math with grades you import or type in.

## What it does

- Reads your grades from AMIS while you are logged in and computes your GWA
- Shows your Latin honors standing and the average you need on your remaining units
- Lists your grades by semester or year, with per-term scholar status
- Lets you leave courses out of the GWA and record substitutions
- Plans your remaining courses term by term on a curriculum map, using real prerequisites
- Covers 30+ UPLB degree programs
- Backs up and restores all your data as a JSON file, and clears it with one button

## Privacy

Your grades stay in your browser. The extension calls the AMIS grades API with your own login, keeps only the course fields it needs in `chrome.storage.local`, and sends nothing to any server. There are no analytics. It hands your grades to the web app only when you press Import there. Full policy at [gradesim.uplb.tools/privacy](https://gradesim.uplb.tools/privacy/).

## Build from source

```sh
bash extension/build.sh all       # chrome, firefox and opera
bash extension/build.sh firefox   # one target; edge is an alias for chrome
for t in extension/*.test.js; do node "$t"; done
```

Load `extension/dist/<browser>/` as an unpacked extension in developer mode. See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch flow.

## Repository

```text
extension/
  src/         popup, planner, content and background scripts, curriculum data
  manifests/   one manifest per browser
  icons/       16, 32, 48 and 128 px icons
  build.sh     copies src and the right manifest into dist/<browser>/
  *.test.js    node self-checks
scratch/       curriculum pipeline (checklist PDFs, parsers, prerequisite graphs)
```

The web app lives in [uplbtools/gradesim-website](https://github.com/uplbtools/gradesim-website).

## License

MIT
