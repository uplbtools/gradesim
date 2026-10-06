# Contributing to GradeSim

Thanks for helping UPLB students track grades and plan for Latin honors.

## Report issues

Open a [GitHub issue](https://github.com/uplbtools/gradesim/issues) with:

- Browser and extension version
- Steps to reproduce
- Expected and actual grade or GWA output

A typo in curriculum data only needs an issue, not a pull request.

## Developers

### Build

```sh
bash extension/build.sh all       # chrome, firefox and opera
bash extension/build.sh chrome    # one target
```

Edge, Brave and Opera install the Chrome build, so `build.sh edge` is an alias for `chrome`. Load `extension/dist/<browser>/` as an unpacked extension in developer mode.

### Test

```sh
for t in extension/*.test.js; do node "$t"; done
npx -y web-ext@8 lint -s extension/dist/firefox
```

CI runs the tests on every pull request. The Firefox lint should report 0 errors and 0 warnings, since addons.mozilla.org rejects or delays builds that warn.

### Branches and pull requests

1. Branch from `staging`.
2. Keep commits focused and use [Conventional Commits](https://www.conventionalcommits.org/), for example `fix(extension): ...` or `docs: ...`.
3. Open the pull request against `staging`. Its body must close an issue (`Closes #123`).
4. Maintainers merge `staging` into `main` to release. Every push to `main` that touches `extension/` publishes to the Chrome, Firefox and Edge stores, so never open a pull request straight to `main`.
5. Do not commit secrets or store credentials.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Be helpful to students, and check grade logic against official UPLB rules when you can.
