# Monorepo Path Filters

Only run CI for the packages that actually changed. Two approaches: static path filters
(simple, one workflow per service) and dynamic matrix with `dorny/paths-filter` (one
workflow, scales to any number of services).

## Approach 1: Static `on.push.paths` filters

Separate workflow file per service, each triggered only when files under its path change.

```yaml
# .github/workflows/ci-api.yml
name: CI — API service

on:
  push:
    branches: [main]
    paths:
      # Only trigger when something under services/api/ changes.
      - "services/api/**"
      # Also trigger if shared libs the service depends on change.
      - "packages/shared/**"
      # Always re-run if the workflow itself is modified.
      - ".github/workflows/ci-api.yml"
  pull_request:
    branches: [main]
    paths:
      - "services/api/**"
      - "packages/shared/**"
      - ".github/workflows/ci-api.yml"

# Concurrency group is scoped to the service so a new push to api/
# cancels the old api run without touching the web/ run.
concurrency:
  group: ci-api-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: services/api
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: services/api/package-lock.json
      - run: npm ci
      - run: npm test
```

```yaml
# .github/workflows/ci-web.yml  — same pattern for the web service
name: CI — Web service

on:
  push:
    branches: [main]
    paths:
      - "services/web/**"
      - "packages/shared/**"
      - ".github/workflows/ci-web.yml"
  pull_request:
    branches: [main]
    paths:
      - "services/web/**"
      - "packages/shared/**"
      - ".github/workflows/ci-web.yml"

concurrency:
  group: ci-web-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: services/web
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: services/web/package-lock.json
      - run: npm ci
      - run: npm test
```

**Tradeoff**: simple to read, but you end up with N workflow files for N services. The PR
status check names change if you rename a service. Works well for 2–5 services.

---

## Approach 2: Dynamic matrix with `dorny/paths-filter` (recommended for larger monorepos)

One workflow file detects which packages changed and builds a matrix dynamically. All CI
shows up under a single workflow name in the PR status checks.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Single concurrency group for the whole workflow — a new push cancels the
# entire previous run. For very large repos you may want per-service groups;
# see the note at the bottom.
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  # ── Detect changes ──────────────────────────────────────────────────────────
  changes:
    name: Detect changed packages
    runs-on: ubuntu-latest
    # Expose one output per package; downstream jobs check these.
    outputs:
      api: ${{ steps.filter.outputs.api }}
      web: ${{ steps.filter.outputs.web }}
      worker: ${{ steps.filter.outputs.worker }}

    steps:
      - uses: actions/checkout@v4
        # fetch-depth: 0 is required so paths-filter can diff against the base
        # branch on PRs, not just the last commit.
        with:
          fetch-depth: 0

      - name: Detect changed paths
        id: filter
        uses: dorny/paths-filter@v3
        with:
          # Each key becomes an output: steps.filter.outputs.<key> == 'true' | 'false'
          filters: |
            api:
              - 'services/api/**'
              - 'packages/shared/**'
            web:
              - 'services/web/**'
              - 'packages/shared/**'
            worker:
              - 'services/worker/**'
              - 'packages/shared/**'

  # ── API job ─────────────────────────────────────────────────────────────────
  test-api:
    name: Test API
    needs: changes
    # Skip this job entirely if no api-related files changed.
    if: needs.changes.outputs.api == 'true'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: services/api

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: services/api/package-lock.json
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v4
        with:
          flags: api
          token: ${{ secrets.CODECOV_TOKEN }}

  # ── Web job ──────────────────────────────────────────────────────────────────
  test-web:
    name: Test Web
    needs: changes
    if: needs.changes.outputs.web == 'true'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: services/web

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: services/web/package-lock.json
      - run: npm ci
      - run: npm test

  # ── Worker job ──────────────────────────────────────────────────────────────
  test-worker:
    name: Test Worker
    needs: changes
    if: needs.changes.outputs.worker == 'true'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: services/worker

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: services/worker/package-lock.json
      - run: npm ci
      - run: npm test

  # ── Required status check shim ───────────────────────────────────────────────
  # Branch protection rules require specific status check names. Because
  # test-api/web/worker are conditionally skipped, GitHub shows them as
  # "skipped" — which counts as passing. But if your branch protection uses
  # strict required checks, add a gate job that always runs and only passes
  # when the checks that did run passed.
  ci-pass:
    name: CI passed
    needs: [test-api, test-web, test-worker]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Check all results
        run: |
          results="${{ needs.test-api.result }} ${{ needs.test-web.result }} ${{ needs.test-worker.result }}"
          for r in $results; do
            if [[ "$r" != "success" && "$r" != "skipped" ]]; then
              echo "A required job failed: $r"
              exit 1
            fi
          done
          echo "All checks passed or were skipped."
```

---

## Approach 2 variant: fully dynamic matrix

If you have many services and don't want to list each one as a separate job, you can build
the matrix dynamically. This adds complexity but scales to 20+ services without touching
the workflow YAML.

```yaml
jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      # paths-filter can output a JSON array of the keys that matched
      services: ${{ steps.filter.outputs.changes }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - id: filter
        uses: dorny/paths-filter@v3
        with:
          # list-files: json makes the action output a JSON array of changed keys
          list-files: json
          filters: |
            api:
              - 'services/api/**'
            web:
              - 'services/web/**'
            worker:
              - 'services/worker/**'

  test:
    needs: changes
    if: ${{ needs.changes.outputs.services != '[]' }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        # fromJson converts the JSON array output into matrix legs
        service: ${{ fromJson(needs.changes.outputs.services) }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: services/${{ matrix.service }}/package-lock.json
      - run: npm ci
        working-directory: services/${{ matrix.service }}
      - run: npm test
        working-directory: services/${{ matrix.service }}
```

---

## Per-service concurrency groups

When using approach 2 and you want a push to `api/` to cancel only the previous `api` run
(not the `web` run in flight), use a per-job concurrency group:

```yaml
test-api:
  concurrency:
    group: ci-api-${{ github.ref }}
    cancel-in-progress: true
  # ... rest of job
```

Move the `concurrency:` block from the workflow level to each individual job. The tradeoff:
a single push that touches multiple services will run those jobs in parallel without
cancelling each other, which is the right behavior.

---

## Why approach 2 is better for larger monorepos

| | Approach 1 (separate files) | Approach 2 (paths-filter) |
|---|---|---|
| **Workflow files** | N files (one per service) | 1 file |
| **PR status checks** | N different check names | 1 workflow, N jobs |
| **Branch protection** | Must add each service separately | Single `CI passed` check |
| **Adding a service** | New workflow file | New filter key + job block |
| **Cross-service deps** | Hard to express | `needs:` graph is explicit |
| **Scales beyond ~5 services** | Messy | Manageable |

---

## Key decisions

| Decision | Rationale |
|---|---|
| `fetch-depth: 0` in `changes` job | paths-filter needs the full commit history to diff PR base vs head; shallow clones cause false positives (all files appear changed) |
| `packages/shared/**` in every service filter | Changes to shared code should rebuild all consumers — easy to miss without explicit filter entries |
| `ci-pass` gate job | Branch protection requires a named check to exist; skipped jobs satisfy that requirement, but the gate provides a stable single check name |
| Per-job concurrency groups | Prevents a push to one service from cancelling in-flight CI for an unrelated service |
