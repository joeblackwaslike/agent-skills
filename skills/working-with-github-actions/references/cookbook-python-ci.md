# Python CI with uv

Complete CI pipeline for a Python project using [uv](https://docs.astral.sh/uv/) — Astral's
fast, lockfile-driven package manager. Covers lint, type-check, test matrix, and build.

## Why uv over pip / poetry

- **Speed**: dependency resolution and installs are 10–100× faster than pip; cold installs of
  large dependency trees finish in seconds.
- **Deterministic**: `uv.lock` pins the full transitive closure. Every CI run gets identical
  packages.
- **Single tool**: replaces pip, virtualenv, pip-tools, and (mostly) poetry in one binary.
- **Python version management**: `astral-sh/setup-uv` respects a `.python-version` file so
  the project pins its interpreter without a separate action.

---

## Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Cancel any in-flight run for the same branch/PR when a new commit arrives.
# This avoids wasting runner minutes on stale pushes.
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  # ── Lint ───────────────────────────────────────────────────────────────────
  lint:
    name: Lint
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up uv
        uses: astral-sh/setup-uv@v4
        with:
          # enable-cache stores the uv package cache in the Actions cache,
          # keyed by uv.lock. A cache hit skips all network downloads.
          enable-cache: true
          cache-dependency-path: uv.lock

      # setup-uv reads .python-version automatically if present.
      # Explicitly setting python-version here overrides it if you need to.
      - name: Install dependencies
        run: uv sync --frozen

      - name: Ruff lint
        run: uv run ruff check .

      # --check exits non-zero if any file would be reformatted (CI-safe mode).
      - name: Ruff format check
        run: uv run ruff format --check .

  # ── Type-check ─────────────────────────────────────────────────────────────
  typecheck:
    name: Type-check
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up uv
        uses: astral-sh/setup-uv@v4
        with:
          enable-cache: true
          cache-dependency-path: uv.lock

      - name: Install dependencies
        run: uv sync --frozen

      - name: mypy
        run: uv run mypy .

  # ── Test matrix ────────────────────────────────────────────────────────────
  test:
    name: Test (Python ${{ matrix.python-version }})
    runs-on: ubuntu-latest
    needs: [lint, typecheck]   # only run tests if lint/types pass

    strategy:
      # Don't cancel sibling Python versions if one fails — we want the full
      # compatibility picture.
      fail-fast: false
      matrix:
        python-version: ["3.11", "3.12", "3.13"]

    steps:
      - uses: actions/checkout@v4

      - name: Set up uv
        uses: astral-sh/setup-uv@v4
        with:
          enable-cache: true
          cache-dependency-path: uv.lock
          # Override the .python-version file for each matrix leg.
          python-version: ${{ matrix.python-version }}

      - name: Install dependencies
        run: uv sync --frozen

      - name: Run tests
        run: |
          uv run pytest \
            --cov \
            --cov-report=xml \
            --cov-report=term-missing \
            -v

      # Upload coverage to Codecov. Each matrix leg uploads its own XML;
      # Codecov merges them. The CODECOV_TOKEN secret is optional for public
      # repos but required for private ones.
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: coverage.xml
          flags: python-${{ matrix.python-version }}
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: false  # don't block merges on Codecov outages

  # ── Build ──────────────────────────────────────────────────────────────────
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: test   # only build if all tests pass

    steps:
      - uses: actions/checkout@v4

      - name: Set up uv
        uses: astral-sh/setup-uv@v4
        with:
          enable-cache: true
          cache-dependency-path: uv.lock

      # `uv build` produces wheel + sdist under dist/.
      # No separate `uv sync` needed — build pulls only the build backend.
      - name: Build distribution
        run: uv build

      # Keep the dist/ artifacts for 7 days so maintainers can inspect them
      # before a release. The release workflow picks them up separately.
      - name: Upload dist artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist-${{ github.sha }}
          path: dist/
          retention-days: 7
```

---

## .python-version file

Place a `.python-version` file in the repo root so both local development (`uv`) and CI
(`astral-sh/setup-uv`) agree on the interpreter:

```
3.12
```

The lint and typecheck jobs will pick this up automatically. The test matrix explicitly
overrides it per leg so each version gets the right interpreter.

---

## pyproject.toml snippet (ruff + mypy + pytest)

```toml
[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B"]

[tool.mypy]
strict = true
python_version = "3.11"

[tool.pytest.ini_options]
addopts = "--tb=short"

[tool.coverage.run]
source = ["src"]
branch = true

[tool.coverage.report]
fail_under = 80
```

---

## Key decisions

| Decision | Rationale |
|---|---|
| `uv sync --frozen` | Refuses to update `uv.lock` — CI should never mutate the lockfile |
| `cache-dependency-path: uv.lock` | Cache key changes whenever deps change, avoiding stale caches |
| `fail-fast: false` on matrix | See all Python version failures at once, not just the first |
| `needs: [lint, typecheck]` on test | Fail fast on trivial errors before spinning up 3 test runners |
| `needs: test` on build | Never build a dist that failed its test suite |
