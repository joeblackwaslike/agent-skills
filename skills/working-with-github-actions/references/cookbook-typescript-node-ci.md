# TypeScript / Node.js CI Workflow

A complete, annotated CI setup for TypeScript projects using pnpm. This pattern comes from the `create-ts-project` template and is the baseline for all new TypeScript projects.

---

## Composite Action: `.github/actions/setup-node-env/action.yml`

Before the workflow itself, define a reusable setup step. Every job that needs Node + pnpm will use this instead of repeating the same three steps.

```yaml
name: Setup Node Environment
description: Install Node.js and pnpm dependencies

runs:
  using: composite
  steps:
    - name: Setup pnpm
      uses: pnpm/action-setup@v4
      with:
        version: latest

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version-file: .nvmrc
        cache: pnpm

    - name: Install dependencies
      shell: bash
      run: pnpm install --frozen-lockfile
```

**Why `pnpm/action-setup` must come first.** `actions/setup-node` reads the pnpm cache path at setup time, so pnpm must already be installed when that action runs. Reversed order breaks caching.

**Why `node-version-file: .nvmrc`.** Pins the version declaratively in the repo rather than duplicating it in every workflow. `nvm use` and CI both read the same file, eliminating drift.

**Why `cache: pnpm`.** This tells `actions/setup-node` to cache the pnpm store at `~/.local/share/pnpm/store`. Cache is keyed on the lockfile hash automatically — you get fast installs without any manual `actions/cache` boilerplate.

**Why `shell: bash` on the `run` step.** Composite actions don't inherit a default shell from the calling workflow. Every `run` step in a composite action must declare `shell:` explicitly or it fails on non-Linux runners.

**Why `--frozen-lockfile`.** Prevents pnpm from silently updating the lockfile during CI. If the lockfile is out of sync with `package.json`, the install errors rather than quietly diverging.

---

## CI Workflow: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:

  # ──────────────────────────────────────────────
  # Static analysis — fast, no runtime needed
  # ──────────────────────────────────────────────
  quality:
    name: Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node-env

      - name: Biome
        run: pnpm exec biome ci .

      - name: ESLint
        run: pnpm exec eslint . --max-warnings=0

      - name: Typecheck
        run: pnpm typecheck

      - name: Dependency check
        run: pnpm depcheck

  # ──────────────────────────────────────────────
  # Tests — matrix over supported Node versions
  # ──────────────────────────────────────────────
  test:
    name: Test (Node ${{ matrix.node-version }})
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22]
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: latest

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: false

  # ──────────────────────────────────────────────
  # Build — verify the package compiles
  # ──────────────────────────────────────────────
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node-env
      - name: Build
        run: pnpm build

  # ──────────────────────────────────────────────
  # Docs — verify the docs site builds cleanly
  # ──────────────────────────────────────────────
  docs:
    name: Docs
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node-env
      - name: Build docs
        run: pnpm docs:build

  # ──────────────────────────────────────────────
  # Dependency review — PRs only
  # ──────────────────────────────────────────────
  dependency-review:
    name: Dependency Review
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: moderate
```

---

## Annotated Breakdown

### Triggers

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

Run on every push to `main` and every PR targeting `main`. This is the minimum viable trigger set — no `workflow_dispatch` noise, no scheduled runs for a basic library CI.

For a deployed service or CLI you'd add `workflow_dispatch` so you can manually kick a run after an environment change.

### Concurrency

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Cancels any in-progress run for the same workflow + branch the moment a new commit is pushed. On a busy branch this halves runner usage. The group key includes the workflow name so concurrency is scoped per-workflow, not globally across all CI.

### Why four separate jobs instead of one

Breaking the pipeline into `quality`, `test`, `build`, and `docs` gives you:

1. **Parallel execution** — all four jobs start simultaneously. Total wall time is `max(job durations)`, not `sum(job durations)`.
2. **Precise failure attribution** — a red `Test` badge means tests fail; a red `Quality` badge means lint/types fail. No scrolling through a monolithic log.
3. **Cheaper re-runs** — if only `docs` fails, you fix and re-run only that job.
4. **Independent concerns** — the `build` job verifies the production output without running tests; the `test` job verifies correctness without caring about dist artifacts.

### The `quality` job

```yaml
- name: Biome
  run: pnpm exec biome ci .

- name: ESLint
  run: pnpm exec eslint . --max-warnings=0

- name: Typecheck
  run: pnpm typecheck

- name: Dependency check
  run: pnpm depcheck
```

All four steps are fast (seconds each) and require no network access after install. Running them sequentially in a single job is fine — if Biome fails you want to see the ESLint errors too, unlike test failures where you usually want to stop fast.

**`biome ci`** vs `biome check`: `ci` mode exits non-zero on any finding and prints a machine-readable summary without writing files. Never use `biome check --write` in CI.

**`--max-warnings=0`**: ESLint exits 0 by default even with warnings. This flag turns any warning into a build failure, which prevents warning debt from accumulating silently.

**`depcheck`**: Catches packages listed in `package.json` that are never imported, and imports that have no corresponding `package.json` entry. Neither `tsc` nor ESLint catches this category of drift.

### The `test` job — why inline setup instead of the composite action

```yaml
strategy:
  matrix:
    node-version: [20, 22]
steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v4
    with:
      version: latest
  - name: Setup Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}   # ← matrix value, not .nvmrc
      cache: pnpm
  - run: pnpm install --frozen-lockfile
```

The composite action hard-codes `node-version-file: .nvmrc`. The test job needs to override the Node version per matrix slot, so it inlines the setup steps and uses `node-version: ${{ matrix.node-version }}` instead. Don't try to thread a matrix input through a composite action without explicit `inputs:` — just inline when you need the flexibility.

**Matrix `[20, 22]`**: These are the two Active LTS releases at the time of writing. Node 18 is EOL; Node 23 is current but not LTS. Adjust when the LTS schedule advances.

### Coverage upload

```yaml
- uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    fail_ci_if_error: false
```

`fail_ci_if_error: false` prevents a Codecov outage or rate-limit from failing your CI. Coverage upload is advisory — a flaky external service should never block a merge.

The `CODECOV_TOKEN` secret is optional for public repos (Codecov supports tokenless upload for public repos via OIDC) but required for private ones. Setting it unconditionally works for both.

### Dependency review

```yaml
dependency-review:
  if: github.event_name == 'pull_request'
  permissions:
    contents: read
    pull-requests: write
  steps:
    - uses: actions/checkout@v4
    - uses: actions/dependency-review-action@v4
      with:
        fail-on-severity: moderate
```

This action diffs the dependency graph between the PR base and head, then checks each new/updated dependency against the GitHub Advisory Database.

**Why `pull_request` only**: The review only makes sense on PRs — it needs a base ref to diff against. Running it on `push` to `main` would error.

**`fail-on-severity: moderate`**: Blocks merges that introduce packages with known CVEs at moderate severity or above. `low` is too noisy; `high` lets too many things through.

**`pull-requests: write`**: Required for the action to post an inline PR comment with the advisory details. Drop this permission if you don't want the comment and set `comment-summary-in-pr: never`.

---

## Adding a Release Job

When you're ready to publish to npm, add this to the same file rather than a separate workflow — it reuses the quality gate jobs as prerequisites:

```yaml
  publish:
    name: Publish to npm
    runs-on: ubuntu-latest
    needs: [quality, test, build]
    if: github.event_name == 'release' && github.event.action == 'published'
    permissions:
      contents: read
      id-token: write   # Required for npm provenance
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node-env
      - uses: actions/setup-node@v4
        with:
          registry-url: https://registry.npmjs.org
      - name: Publish
        run: pnpm publish --access public --provenance --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

`--provenance` links the published package to the exact commit and build log via npm's provenance attestation. Requires `id-token: write`. `--no-git-checks` skips the "is working tree clean" check that fails in CI since checkout doesn't include git tags by default.
