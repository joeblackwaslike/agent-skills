# Dependabot

Automated dependency update PRs for both npm packages and GitHub Actions
action versions. Dependabot opens PRs on a weekly schedule; CI runs against
them normally; you review and merge.

---

## Config: `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    labels:
      - dependencies
    open-pull-requests-limit: 10

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
    labels:
      - ci
      - dependencies
```

---

## Design decisions

### Two `package-ecosystem` entries

`npm` covers `package.json` / `pnpm-lock.yaml`. `github-actions` covers
`uses:` references in `.github/workflows/*.yml`. These are different
ecosystems in Dependabot's model—you must list them separately. Without the
`github-actions` entry, action versions (`@v4`, SHA pins) are never updated
automatically.

### `directory: /`

Root of the repo. For a monorepo with packages under `packages/*`, add one
entry per package directory. Dependabot does not glob directories.

### `interval: weekly`

Daily Dependabot runs generate too much noise for most projects. Weekly hits a
reasonable balance: security patches land within a week, and the PR queue
stays manageable. For high-security contexts, switch npm to `daily` and keep
actions on `weekly`.

### `open-pull-requests-limit: 10`

Dependabot will open at most 10 concurrent npm PRs. The default is 5. Raising
it to 10 is useful when you have many transitive dependencies that tend to
update simultaneously. If the queue grows too large, lower this and rely on
grouped updates instead (see below).

### Labels

`dependencies` on npm PRs integrates with the `labeler.yml` rule and makes the
PR auto-labeled. `ci` + `dependencies` on actions PRs marks them as CI
infrastructure changes. Labels also allow branch protection rules to require
certain checks only for non-dependabot PRs.

---

## Interaction with CI

Dependabot PRs run on the `pull_request` event with a restricted token—they
cannot access repository secrets. This means:

- Tests that don't need secrets run normally.
- Jobs that call `secrets.NPM_TOKEN` or `secrets.SOME_API_KEY` will fail on
  Dependabot PRs.

The standard fix is to use `pull_request_target` for jobs that need secrets,
gating them to only run when the PR author is `dependabot[bot]`:

```yaml
on:
  pull_request_target:
    types: [opened, synchronize, reopened]

jobs:
  some-job:
    if: github.actor == 'dependabot[bot]'
    ...
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.sha }}
```

Be careful with `pull_request_target`: it runs in the context of the base
branch with full secrets access. Only use it for trusted authors
(`dependabot[bot]`) and always pin the checkout to the PR head SHA, never to
`GITHUB_SHA` (which would be the base).

---

## Auto-merge for patch/minor updates

If you want Dependabot patch and minor updates to merge automatically after CI
passes, add this workflow:

```yaml
name: Dependabot auto-merge

on: pull_request_target

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-merge:
    name: Auto-merge Dependabot PRs
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - name: Fetch Dependabot metadata
        id: metadata
        uses: dependabot/fetch-metadata@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Enable auto-merge for patch and minor
        if: |
          steps.metadata.outputs.update-type == 'version-update:semver-patch' ||
          steps.metadata.outputs.update-type == 'version-update:semver-minor'
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**`dependabot/fetch-metadata`** parses the PR description to extract
`update-type` (`semver-patch`, `semver-minor`, `semver-major`). The `--auto`
flag enables GitHub's auto-merge feature, which merges as soon as all required
status checks pass. Major version bumps are excluded—those should get a
human review.

**Requirement:** branch protection must have "Require status checks to pass"
enabled, otherwise `--auto` merges immediately without waiting for CI.

---

## Grouping dependencies (Dependabot v2 grouped updates)

To reduce PR volume, group related packages into a single PR:

```yaml
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      eslint:
        patterns:
          - "eslint*"
          - "@typescript-eslint/*"
      testing:
        patterns:
          - "vitest"
          - "@vitest/*"
          - "jest*"
```

Grouped updates land in a single PR with a combined diff. The group name
appears in the PR title. Ungrouped packages each get their own PR as before.
Grouping is available in Dependabot v2 (the `version: 2` config format used
here).

---

## Security vs version updates

Dependabot has two separate subsystems:

- **Security updates** — triggered by GitHub Advisory Database alerts; not
  configured via `dependabot.yml`; enabled in `Settings → Security → Dependabot
  alerts`. These fire immediately when a vulnerability is published.
- **Version updates** — configured via `dependabot.yml` (what this file
  covers); run on a schedule regardless of CVEs.

Both produce PRs but security update PRs take priority and can override the
`open-pull-requests-limit`.
