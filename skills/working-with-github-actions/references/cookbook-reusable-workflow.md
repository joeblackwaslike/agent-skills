# Reusable Workflows

Define a workflow once, call it from multiple repos or workflows. Avoids copy-pasting the
same job definition across every service's CI file.

## Reusable workflows vs composite actions

| | Reusable workflow | Composite action |
|---|---|---|
| **Granularity** | Full job(s) — runs on a separate runner | Individual steps — inline in a job |
| **Runner** | Callee picks its own `runs-on` | Caller's runner |
| **Secrets** | Explicit input or `secrets: inherit` | Available via caller's env |
| **Best for** | Cross-repo test/deploy jobs | Step sequences reused within a repo |
| **Limitation** | Can't reference local composite actions from an external caller | Can't define `needs:` dependencies |

Use **reusable workflows** when the entire job (including runner lifecycle) should be
standardized. Use **composite actions** when you want to share a group of steps inside an
existing job.

---

## Defining a reusable workflow

```yaml
# .github/workflows/shared-test.yml
#
# This file is the reusable definition. It is NOT triggered directly.
# Callers reference it with `uses:`.

name: Shared Test

on:
  # workflow_call is what makes this reusable. The job will only run when
  # another workflow calls it — not on push/PR events.
  workflow_call:
    # Declare typed inputs. Callers must pass required ones; optional ones
    # get the default if omitted.
    inputs:
      node-version:
        description: "Node.js version to use"
        type: string
        required: false
        default: "20"
      run-coverage:
        description: "Whether to collect and upload coverage"
        type: boolean
        required: false
        default: true

    # Secrets must be explicitly declared even if you use secrets: inherit
    # on the caller side. This documents what the workflow expects.
    secrets:
      CODECOV_TOKEN:
        description: "Codecov upload token (required for private repos)"
        required: false

    # Workflows can also expose outputs back to the caller.
    outputs:
      test-result:
        description: "Pass/fail summary"
        value: ${{ jobs.test.outputs.result }}

jobs:
  test:
    name: Test (Node ${{ inputs.node-version }})
    runs-on: ubuntu-latest

    outputs:
      result: ${{ steps.run-tests.outputs.result }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        id: run-tests
        run: |
          npm test -- ${{ inputs.run-coverage && '--coverage' || '' }}
          echo "result=passed" >> "$GITHUB_OUTPUT"

      # Conditional step using an input — only runs when run-coverage is true.
      - name: Upload coverage
        if: ${{ inputs.run-coverage }}
        uses: codecov/codecov-action@v4
        with:
          # Reference the declared secret — not secrets.CODECOV_TOKEN directly,
          # because the secret namespace in a called workflow is isolated.
          token: ${{ secrets.CODECOV_TOKEN }}
```

---

## Calling from the same repo (local reference)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  # Local call — uses a relative path within the same repo.
  # The @ref suffix is required even for same-repo calls.
  test-node20:
    uses: ./.github/workflows/shared-test.yml
    with:
      node-version: "20"
      run-coverage: true
    # "secrets: inherit" forwards ALL caller secrets to the called workflow.
    # Use this for internal-repo calls where you trust the callee fully.
    secrets: inherit

  # You can call the same reusable workflow multiple times with different inputs.
  test-node22:
    uses: ./.github/workflows/shared-test.yml
    with:
      node-version: "22"
      run-coverage: false
    secrets: inherit
```

---

## Calling from a different repo (external reference)

```yaml
# In another repo: .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]

jobs:
  test:
    # External call — pin to a tag or SHA, not a mutable branch, so a workflow
    # update in the source repo doesn't silently break your CI.
    uses: your-org/shared-workflows/.github/workflows/shared-test.yml@v2
    with:
      node-version: "20"
      run-coverage: true
    # For external repos, prefer explicit secret forwarding over `secrets: inherit`.
    # inherit on external calls requires the caller org to allow it in policy settings.
    secrets:
      CODECOV_TOKEN: ${{ secrets.CODECOV_TOKEN }}
```

---

## Consuming the output

```yaml
jobs:
  test:
    uses: ./.github/workflows/shared-test.yml
    with:
      node-version: "20"

  notify:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Print result
        run: echo "Tests: ${{ needs.test.outputs.test-result }}"
```

---

## Known limitations

1. **Local composite actions from external callers**: if `shared-test.yml` references a
   composite action at `./.github/actions/setup-env`, an external caller cannot use it —
   the relative path resolves against the _caller's_ repo, not the workflow's repo. Work
   around this by publishing composite actions as public actions or baking them into the
   reusable workflow directly.

2. **Max call depth**: reusable workflows can be nested up to 4 levels deep.

3. **`secrets: inherit` on external refs**: requires the caller's organization to enable
   "Allow all actions and reusable workflows" or explicitly permit the source org. Prefer
   explicit secret forwarding for cross-org calls.

4. **No matrix in `workflow_call` inputs**: you can't pass an array as an input and loop
   over it in the called workflow. Define the matrix in the caller and call the reusable
   workflow once per matrix leg.

---

## Key decisions

| Decision | Rationale |
|---|---|
| `required: false` with defaults on all inputs | Callers that don't care about an option get a sensible default without boilerplate |
| Explicit `secrets:` block even with `inherit` | Documents the contract; required for secrets to be accessible inside the callee regardless of how they're passed |
| Pin external refs to a tag, not `@main` | Prevents upstream workflow changes from breaking callers silently |
| `workflow_call` only — no `push`/`pr` triggers | Prevents the shared workflow from running as a standalone job if someone pushes to the shared-workflows repo |
