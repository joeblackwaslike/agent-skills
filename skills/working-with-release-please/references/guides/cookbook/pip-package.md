# Cookbook: release a pip / PyPI package

Goal: every merge of a release PR cuts a version, updates `CHANGELOG.md`, creates the GitHub Release, and **publishes to PyPI** — using **trusted publishing (OIDC)** so there are no long-lived tokens.

`release-type: python`. release-please bumps the version in your Python project files and maintains `CHANGELOG.md`. The build + upload is a separate job gated on `release_created`.

---

## What `release-type: python` bumps

release-please updates the version in whichever of these it finds:

- `pyproject.toml` (`[project] version` or `[tool.poetry] version`)
- `setup.py`
- `setup.cfg`
- `version.py` / `<package>/__init__.py` (a `__version__ = "x.y.z"` assignment)

If your version lives somewhere unusual, add it via `extra-files` (see [../changelogs-and-github.md](../changelogs-and-github.md#extra-files--stamp-the-version-anywhere)). Using **`setuptools-scm`** (version derived from git tags)? Then you don't want release-please writing a static version — keep it out of the version files and let the tag (which release-please creates) drive the version at build time.

---

## 1. Config

`release-please-config.json`:
```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "packages": { ".": { "release-type": "python" } }
}
```
`.release-please-manifest.json`:
```json
{ ".": "0.0.0" }
```
(Existing package: seed the real current version — [../integration.md](../integration.md#track-b--existing-repo-already-has-versionstags).)

---

## 2. Workflow (trusted publishing / OIDC — recommended)

`.github/workflows/release-please.yml`:

```yaml
on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

name: release-please

jobs:
  release-please:
    runs-on: ubuntu-latest
    outputs:
      release_created: ${{ steps.release.outputs.release_created }}
    steps:
      - uses: googleapis/release-please-action@v5
        id: release
        with:
          release-type: python

  publish:
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created == 'true' }}
    runs-on: ubuntu-latest
    environment: pypi          # tie the OIDC trust to a GitHub Environment
    permissions:
      id-token: write          # REQUIRED for trusted publishing
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: python -m pip install --upgrade build
      - run: python -m build           # creates dist/*.whl and dist/*.tar.gz
      - uses: pypa/gh-action-pypi-publish@release/v1
        # no password/token — OIDC handles auth
```

### Set up trusted publishing once (on PyPI)

1. Go to your project on PyPI → **Publishing** → **Add a trusted publisher** (GitHub Actions).
2. Enter: repo owner/name, workflow filename (`release-please.yml`), and the environment name (`pypi`).
3. For a brand-new project that doesn't exist on PyPI yet, use **pending publisher** setup (configure the trusted publisher before the first upload).

That's it — no `PYPI_API_TOKEN` secret to manage or rotate.

---

## 3. Fallback: API token + twine

If you can't use OIDC (e.g. self-hosted index, or org policy), use an API token:

```yaml
  publish:
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: python -m pip install --upgrade build twine
      - run: python -m build
      - run: twine upload dist/*
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
```

Generate the token at pypi.org → Account → API tokens (scope it to the single project). `TWINE_USERNAME` is the literal string `__token__`.

---

## 4. Gotchas

- **OIDC needs `id-token: write`** on the publish job and the trusted publisher configured on PyPI — both, or it fails with an auth error.
- **`setuptools-scm` conflict:** don't let release-please write a static version into your files if the version is git-tag-derived. Either drop the python version files from release-please's purview or switch the package to a static version.
- **TestPyPI first:** point `gh-action-pypi-publish` at `repository-url: https://test.pypi.org/legacy/` (with a matching TestPyPI trusted publisher) to rehearse.
- **Wheel build needs your build backend** (`hatchling`, `setuptools`, `poetry-core`, …) declared in `pyproject.toml`'s `[build-system]` — `python -m build` reads it.
- **Prerelease:** `prerelease`/`prerelease-type` produce e.g. `1.2.0rc1`; PyPI recognizes PEP 440 prerelease suffixes and won't show them as the latest stable. See [../advanced.md](../advanced.md#prereleases--release-channels).
