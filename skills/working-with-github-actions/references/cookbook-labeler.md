# PR Auto-Labeling

Automatically applies labels to pull requests based on which files were
changed. Uses `actions/labeler@v5` with a `labeler.yml` path-to-label mapping
checked in to `.github/`.

---

## Labeler config: `.github/labeler.yml`

```yaml
docs:
  - docs/**
  - '**/*.md'

ci:
  - .github/**

tests:
  - src/**/*.test.ts
  - src/**/*.spec.ts

dependencies:
  - package.json
  - pnpm-lock.yaml

source:
  - src/**
```

Each top-level key is a label name. The value is a list of glob patterns; if
any changed file matches, that label is applied. Multiple labels can apply to
the same PR.

---

## Workflow: `.github/workflows/labeler.yml`

```yaml
name: Labeler

on:
  pull_request_target:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  label:
    name: Label PR
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v5
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

---

## Design decisions

### `pull_request_target` not `pull_request`

`pull_request` runs in the context of the PR's head branch with a restricted
token that has read-only `pull-requests` scope. Applying a label requires
write access, which the restricted token does not have for PRs from forks.

`pull_request_target` runs in the context of the **base branch** (not the PR
head) and uses the full `GITHUB_TOKEN` of the base repo. This gives the token
the write access needed to call the Labels API.

**Security implication:** because `pull_request_target` runs base-branch code
with full token access, you must never add a `checkout` step without pinning to
the PR head SHA (i.e., do not check out arbitrary fork code and run it with
elevated permissions). The labeler workflow above has no `checkout` step—it
only calls the GitHub API—so it is safe as-is.

### `types: [opened, synchronize, reopened]`

- `opened` — new PR, apply initial labels.
- `synchronize` — new commits pushed, recheck labels in case changed files
  shifted (e.g., a `docs`-only PR that later adds source changes should get
  `source` added).
- `reopened` — PR was closed and reopened; reapply labels.

Omitting `synchronize` means labels are never refreshed after the first push.

### `permissions: contents: read, pull-requests: write`

`contents: read` is needed for labeler to resolve the changed-files diff.
`pull-requests: write` is the actual label-write permission. No other
permissions are needed—the job never touches commits or issues.

### Label names map to the `labeler.yml` keys

The labels must exist in the repo before the workflow runs
(`Settings → Labels`). If a label referenced in `labeler.yml` does not exist,
the action silently skips applying it (v5 behavior). Pre-create labels:
`docs`, `ci`, `tests`, `dependencies`, `source`.

---

## Adding custom label rules

**Match a directory:**
```yaml
infra:
  - infra/**
  - terraform/**
  - '**/*.tf'
```

**Match a file extension anywhere in the tree:**
```yaml
graphql:
  - '**/*.graphql'
  - '**/*.gql'
```

**Match multiple unrelated paths under one label:**
```yaml
config:
  - '*.json'
  - '*.yaml'
  - '*.toml'
  - .env*
```

**Require ALL patterns to match (AND logic, v5+):**
```yaml
full-stack:
  - all:
    - src/client/**
    - src/server/**
```

The default behavior (list of strings) is OR—any match applies the label.
Wrap in `all:` to require every pattern to match.

---

## Integration with branch protection

Labels can be used as a condition in other workflows:

```yaml
on:
  pull_request:
    types: [labeled]

jobs:
  integration-tests:
    if: contains(github.event.pull_request.labels.*.name, 'source')
    ...
```

This runs expensive integration tests only on PRs that touch source files, not
on docs-only or dependency-bump PRs.
