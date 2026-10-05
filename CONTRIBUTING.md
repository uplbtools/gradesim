# Contributing to GradeSim

Thanks for helping UPLB students track grades and plan for Latin honors.

## Report issues

Open a [GitHub issue](https://github.com/uplbtools/gradesim/issues) with:

- Browser and extension version
- Steps to reproduce
- Expected vs actual grade or GWA output

You do not need a pull request for typo reports in curriculum data: an issue is enough.

## Developers

### Setup

```sh
cd extension
./build.sh chrome   # or firefox, all
```

Load `extension/dist/<browser>/` via your browser’s developer / unpacked extension UI, or install from the [Chrome Web Store](https://chromewebstore.google.com/detail/elbi-gradesim-uplb-gwa-ca/mlhklblbhkikcmobmmajckjcbmdinldb) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/elbi-gradesim/).

### Pull requests

1. Branch from **`staging`**.
2. Keep commits focused; use [Conventional Commits](https://www.conventionalcommits.org/) (`fix(extension): …`, `docs: …`).
3. Open a PR to **`staging`** and link any related issue.
4. Do not commit secrets or store listing credentials.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Be helpful to students; verify grade logic against official UPLB rules when possible.
