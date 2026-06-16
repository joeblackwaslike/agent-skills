# Automating release-please with GitHub Actions

The [`googleapis/release-please-action`](../release-please-action-README.md) wraps the release-please CLI so it runs on every push to your default branch. This guide covers the workflow shape, permissions, the token decision, the action's outputs, and the **gate-the-publish-job** pattern that every cookbook depends on.

> **Use `@v5`.** v5.0.0 (2026-04-22) is the current major — the only breaking change vs v4 is the Node24 runtime; **inputs and outputs are identical**. Nearly every tutorial online, and even the action's own README examples, still show `@v4`. Prefer `@v5`. (v4.4.1 is the last v4 if you're stuck on an older runner.)

---

## The base workflow

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
    steps:
      - uses: googleapis/release-please-action@v5
        id: release            # ← give it an id so later steps can read outputs
        with:
          release-type: node   # omit when using a manifest config
```

That single job opens and maintains the release PR, and (on merge) tags + creates the GitHub Release. Publishing is a **separate job/steps** — see below.

---

## Permissions

The action needs, at minimum:

```yaml
permissions:
  contents: write        # create tags, releases, push CHANGELOG/version commits
  pull-requests: write   # open/update the release PR
```

Add `issues: write` only if you use features that comment on issues. Beyond the workflow `permissions:` block, you usually also need the repo setting **Settings → Actions → General → "Allow GitHub Actions to create and approve pull requests"** enabled — without it the release PR can't be opened (a very common "nothing happens" cause).

---

## The token decision (important)

By default the action uses the built-in `secrets.GITHUB_TOKEN`. That works for opening the release PR and creating the release — **but** GitHub deliberately prevents events triggered by `GITHUB_TOKEN` from starting *other* workflow runs (anti-recursion). Consequences:

- CI checks (lint/test workflows triggered by `pull_request`) **won't run** on the release PR.
- A separate workflow listening for `release: published` **won't fire** when release-please creates the release.

If you need either of those, supply a token that *can* trigger downstream workflows:

1. **GitHub App token (recommended)** — create a minimal App, install it, mint a short-lived token in the workflow:

   ```yaml
   - uses: actions/create-github-app-token@v1
     id: app-token
     with:
       app-id: ${{ vars.RELEASE_APP_ID }}
       private-key: ${{ secrets.RELEASE_APP_PRIVATE_KEY }}
   - uses: googleapis/release-please-action@v5
     id: release
     with:
       token: ${{ steps.app-token.outputs.token }}
       release-type: node
   ```

2. **Personal Access Token (PAT)** — simpler, but tied to a user and broader scoped. Store as a secret and pass `token: ${{ secrets.MY_RELEASE_PLEASE_TOKEN }}`.

If you keep publishing **inside the same workflow** (the pattern in the cookbooks), the default `GITHUB_TOKEN` is fine — the publish steps are in the same run, so the anti-recursion rule doesn't apply.

---

## Action outputs — what you gate on

After the action runs, read these from `steps.<id>.outputs`:

**Root component (path `.` or unset):**

| output | meaning |
| --- | --- |
| `release_created` | `true` if a (root) release was created this run — **the main gate for publishing** |
| `tag_name` | e.g. `v2.5.0` — use for `gh release upload`, docker tags, etc. |
| `version` / `major` / `minor` / `patch` | the released semver, split out |
| `sha` | commit the release was tagged at |
| `upload_url` / `html_url` | GitHub Release API URLs |

**Always available (incl. manifest/monorepo):**

| output | meaning |
| --- | --- |
| `releases_created` | `true` if *any* release was created — **the gate in manifest/monorepo mode** |
| `paths_released` | JSON array of package paths that released (`[]` if none) |
| `prs_created` | `true` if a release PR was opened/updated |
| `pr` / `prs` | JSON of the release PR object(s) |

**Monorepo path outputs** are prefixed by the package path: `steps.release.outputs['packages/cli--release_created']`, `['packages/cli--tag_name']`, etc.

> **`release_created` vs `releases_created`:** use `release_created` only when you have a single root component. In manifest mode (no `path: .`), use `releases_created` and `paths_released`. Mixing these up is why "the release was created but my publish job didn't run."

---

## The gate-the-publish-job pattern

release-please only versions + changelogs + tags. **Publishing is yours**, gated on the output. Two equivalent shapes:

### Shape 1 — steps in the same job, each gated

```yaml
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v5
        id: release
        with:
          release-type: node
      # everything below runs only when a release was actually created
      - uses: actions/checkout@v4
        if: ${{ steps.release.outputs.release_created }}
      - uses: actions/setup-node@v4
        if: ${{ steps.release.outputs.release_created }}
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
        if: ${{ steps.release.outputs.release_created }}
      - run: npm publish
        if: ${{ steps.release.outputs.release_created }}
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Shape 2 — a separate job with `needs` + a job-level `if` (cleaner)

```yaml
jobs:
  release-please:
    runs-on: ubuntu-latest
    outputs:
      release_created: ${{ steps.release.outputs.release_created }}
      tag_name: ${{ steps.release.outputs.tag_name }}
    steps:
      - uses: googleapis/release-please-action@v5
        id: release
        with:
          release-type: node

  publish:
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created == 'true' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write   # for OIDC / npm provenance / PyPI trusted publishing
    steps:
      - uses: actions/checkout@v4
      # ... build + publish ...
```

Shape 2 is preferable when the publish job needs different permissions (e.g. `id-token: write` for OIDC) or you want it to show as a distinct job. **Note the string compare** `== 'true'` — job-level outputs are strings.

Per-ecosystem publish steps live in the [cookbook](cookbook/): [npm](cookbook/npm-package.md), [pip/PyPI](cookbook/pip-package.md), [VS Code extension](cookbook/vscode-extension.md).

---

## Multiple release branches

Run release-please against more than the default branch (e.g. maintain a `1.x` line) with `target-branch`:

```yaml
on:
  push:
    branches: [main, 1.x]
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v5
        with:
          release-type: node
          target-branch: ${{ github.ref_name }}
```

---

## Splitting PR creation from tagging

Two inputs let you separate the two phases (useful for approval gates):

- `skip-github-release: true` — only open/maintain the release PR, never tag.
- `skip-github-pull-request: true` — only tag releases, never open a PR.

You'd run two workflows: one that maintains the PR on push, one that tags on a manual trigger. Most projects don't need this.

---

## CI YAML beyond release-please

For general GitHub Actions concerns — matrix builds, caching, reusable workflows, OIDC setup, runner selection — use the `working-with-github-actions` skill. This guide only covers the release-please-specific wiring.
