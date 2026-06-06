# Composite Actions for Reusable Setup

Composite actions let you extract a sequence of steps into a named, versioned unit that any workflow in the same repo can reference. They're the right tool when you find yourself copying the same 3–5 step setup block across multiple jobs or workflows.

---

## What Is a Composite Action?

A composite action is a local `action.yml` file that bundles steps using `runs.using: composite`. Unlike reusable workflows, composite actions are invoked inline within a job's step list — they don't spin up a new runner. They're closer to a macro than a sub-job.

**File location:** `.github/actions/<name>/action.yml`  
**Reference syntax:** `uses: ./.github/actions/<name>` (must be a relative path from the repo root)

---

## Example 1: Node.js + pnpm Setup

This is the baseline composite action for all TypeScript projects.

### `.github/actions/setup-node-env/action.yml`

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

### How to reference it in a workflow

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4      # checkout must happen first
      - uses: ./.github/actions/setup-node-env
      - run: pnpm build
```

**Checkout is always the caller's responsibility.** Composite actions cannot `checkout` themselves — they run within the workspace of the calling job, which must already have the code checked out before the composite action is invoked. If you forget `actions/checkout@v4`, the `.nvmrc` file won't exist and setup fails.

---

## Example 2: Python + uv Setup

The same pattern for Python projects using the `uv` package manager.

### `.github/actions/setup-python-env/action.yml`

```yaml
name: Setup Python Environment
description: Install Python and uv dependencies

inputs:
  python-version:
    description: Python version to use
    required: true
    default: "3.12"
  uv-version:
    description: uv version to use
    required: true
    default: "0.5.20"

runs:
  using: composite
  steps:
    - name: Setup Python
      uses: actions/setup-python@v5
      with:
        python-version: ${{ inputs.python-version }}

    - name: Install uv
      uses: astral-sh/setup-uv@v3
      with:
        version: ${{ inputs.uv-version }}
        enable-cache: "true"
        cache-suffix: ${{ inputs.python-version }}

    - name: Install dependencies
      shell: bash
      run: uv sync --frozen
```

### Calling it with and without overrides

```yaml
# Default Python version (3.12)
- uses: ./.github/actions/setup-python-env

# Override for a matrix job
- uses: ./.github/actions/setup-python-env
  with:
    python-version: ${{ matrix.python-version }}
```

---

## Inputs and Outputs

### Declaring inputs

```yaml
inputs:
  node-version:
    description: Node.js version to install
    required: false
    default: ""          # empty string = fall through to node-version-file
  working-directory:
    description: Directory containing package.json
    required: false
    default: "."
```

### Declaring outputs

Composite actions can expose outputs captured from their steps. Use `id:` on the relevant step and reference its outputs.

```yaml
outputs:
  cache-hit:
    description: Whether the pnpm store cache was restored
    value: ${{ steps.setup-node.outputs.cache-hit }}

runs:
  using: composite
  steps:
    - name: Setup Node.js
      id: setup-node                          # ← required to capture outputs
      uses: actions/setup-node@v4
      with:
        node-version-file: .nvmrc
        cache: pnpm
```

Consume the output in the calling workflow:

```yaml
- id: setup
  uses: ./.github/actions/setup-node-env

- name: Skip install if cache hit
  if: steps.setup.outputs.cache-hit == 'true'
  run: echo "Full cache restored, skipping install"
```

---

## Composite Actions vs. Reusable Workflows

| | Composite Action | Reusable Workflow |
|---|---|---|
| **Unit** | Steps within a job | An entire job (or jobs) |
| **Runner** | Inherits calling job's runner | Gets its own fresh runner |
| **Reference** | `uses: ./.github/actions/name` | `uses: ./.github/workflows/name.yml@ref` |
| **Secrets** | Must be passed explicitly as inputs | Can use `secrets: inherit` |
| **When to use** | Shared setup steps (install, auth, config) | Shared multi-step jobs (test suite, deploy) |

**Use a composite action when:**
- You want to DRY out 3–5 repeated steps across jobs in the same workflow or different workflows
- The steps need to run in the same environment as the caller (shared workspace, env vars, etc.)
- You want inline execution without extra latency from a new runner

**Use a reusable workflow when:**
- You want to share an entire build/test/deploy pipeline across multiple repos
- You need secrets to be injectable via `secrets: inherit`
- The shared logic is substantial enough that running it on a dedicated runner makes sense

---

## Gotchas

### Secrets are not inherited

Composite actions cannot access `secrets.*` directly. If the action needs a secret, the caller must pass it as an input:

```yaml
# In the composite action
inputs:
  registry-token:
    description: NPM registry auth token
    required: true

runs:
  using: composite
  steps:
    - name: Authenticate
      shell: bash
      run: npm config set //registry.npmjs.org/:_authToken ${{ inputs.registry-token }}
```

```yaml
# In the calling workflow
- uses: ./.github/actions/setup-node-env
  with:
    registry-token: ${{ secrets.NPM_TOKEN }}
```

This is intentional — it makes the data flow explicit and prevents a composite action from silently consuming secrets it wasn't meant to have.

### Every `run` step needs `shell: bash`

Composite actions don't inherit a default shell from the calling workflow or the runner OS. Omitting `shell:` produces an error like `Required property is missing: shell`. Always specify it:

```yaml
- name: Do something
  shell: bash
  run: echo "hello"
```

This applies even on Linux runners where `bash` is the obvious default — the spec requires it.

### `env:` context in composite actions

Environment variables set in the calling workflow's `env:` block are visible to composite action steps. Environment variables set inside the composite action are **not** visible to steps after the composite action returns. Use outputs for that.

### Local composite actions require `actions/checkout` first

The `uses: ./.github/actions/...` path is resolved from the checked-out workspace. If the workspace isn't checked out yet, GitHub can't find the action definition file and the job fails with a confusing path error.

Always put `actions/checkout@v4` as the first step, before any local composite action reference.

### Versioning and path

Local composite actions (`uses: ./.github/actions/...`) always use the version at the current commit — no `@v1` pinning. Changes to the composite action take effect immediately on the next workflow run. If you need independent versioning, publish it as a standalone action in its own repository.

---

## Complete Workflow Using Both Actions

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
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node-env
      - run: pnpm exec biome ci .
      - run: pnpm typecheck

  test-node:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node-env
      - run: pnpm test:coverage

  test-python:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11", "3.12"]
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-python-env
        with:
          python-version: ${{ matrix.python-version }}
      - run: uv run pytest tests/
```
