# GradeSim Extension Agent Guide

**Human developers:** start with [README.md](README.md).

Org-wide agent defaults: see [room-tba/AGENTS.md](https://github.com/uplbtools/room-tba/blob/main/AGENTS.md). This file tailors that playbook to the **GradeSim browser extension**.

## Doc map

| When | Read |
| --- | --- |
| Build all browsers | `extension/build.sh` |
| Per-browser manifests | `extension/manifests/` |
| Landing / marketing site | [uplbtools/gradesim-website](https://github.com/uplbtools/gradesim-website) |
| Store listings | Chrome Web Store, Firefox Add-ons URLs in README |

## Stack

- **Platform:** Manifest V3 **browser extension** (vanilla JavaScript: no bundler in root)
- **Targets:** Chrome, Firefox, Opera, Edge (separate manifests)
- **Build:** `extension/build.sh [chrome|firefox|opera|edge|all]` → `extension/dist/<browser>/`
- **Host permission:** `amis.uplb.edu.ph`: content scripts read AMIS DOM locally
- **No server**: 100% client-side; no `package.json` scripts at repo root

## Branches and release

| Branch | Role |
| --- | --- |
| **`staging`** | Default branch: integration |
| **`main`** | Release line for store submissions |

**Ship flow:** merge to `main`, build with `./build.sh all`, upload zips to each browser store. Store review is human-gated: do not auto-close issues that depend on store approval.

There is no Vercel/CI deploy: verification is local build + manual load in browser dev mode.

## Verify before done

| Step | When |
| --- | --- |
| `cd extension &&./build.sh chrome` | Minimum before any extension change |
| `./build.sh all` | Before store release |
| Manual AMIS | Load unpacked extension; open AMIS schedule page; confirm GWA/simulator still works |
| Manifest diff | When touching permissions: review all files in `extension/manifests/` |

## Architecture (short)

```
extension/
  src/           # Popup, content scripts, curriculum data
  manifests/     # Per-browser manifest.json variants
  icons/
  build.sh       # Copies src + manifest → dist/<browser>/
website/         # Legacy copy — canonical website is gradesim-website repo
```

## Extension rules

- **Privacy:** Never send grades or student data to a server: local `chrome.storage` / `browser.storage` only
- **AMIS DOM scraping:** AMIS markup changes break the extension: prefer defensive selectors; add fixture HTML tests when possible
- **Multi-browser parity:** A manifest or permission change often needs all four manifest files updated
- **No decorative UI motion** in popup: keep the panel calm and readable

## Commits

- Conventional Commits: `fix(content): …`, `feat(curriculum): …`, `chore(build): …`
- Note which browsers were manually tested in the PR body

## Security

- Do not add broad `<all_urls>` permissions without maintainer approval
- Never exfiltrate AMIS page content to third-party analytics
