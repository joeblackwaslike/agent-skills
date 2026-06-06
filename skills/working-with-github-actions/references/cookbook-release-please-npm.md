# Release Please + npm Publish

A complete automated release pipeline for npm packages. release-please reads
conventional commits to determine the next semver bump, opens a release PR with
an updated CHANGELOG and bumped `package.json`, and—once that PR merges—emits
an output flag that downstream jobs use to conditionally publish and deploy docs.

---

## Config files (checked in to `.github/`)

### `.github/release-please-config.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "release-type": "node",
  "packages": {
    ".": {}
  }
}
```

**Why `release-type: node`:** tells release-please to update `package.json`
`version` field and generate a Node-style CHANGELOG. The `packages` map uses
the repo root (`"."`) as the single package path; add more entries for
monorepos.

### `.github/.release-please-manifest.json`

```json
{
  ".": "0.1.0"
}
```

**Why this file:** release-please stores the last released version here so it
knows what commits are unreleased. On first setup, set it to the current
published version (or `0.1.0` for a brand-new package). Never edit it
manually after that—release-please owns it.

---

## Workflow: `.github/workflows/release-please.yml`

```yaml
name: Release Please

on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  release-please:
    name: Release Please
    runs-on: ubuntu-latest
    outputs:
      release_created: ${{ steps.release.outputs.release_created }}
    steps:
      - uses: googleapis/release-please-action@v4
        id: release
        with:
          config-file: .github/release-please-config.json
          manifest-file: .github/.release-please-manifest.json

  publish:
    name: Publish to npm
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: latest

      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: pnpm
          registry-url: https://registry.npmjs.org

      - run: pnpm install --frozen-lockfile

      - run: pnpm build

      - run: pnpm publish --access public --provenance --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

  deploy-docs:
    name: Deploy docs
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created }}
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - uses: ./.github/actions/setup-node-env

      - name: Build docs
        run: pnpm docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

---

## Design decisions

### Top-level `permissions` vs job-level `permissions`

The top-level block (`contents: write`, `pull-requests: write`) applies to the
`release-please` job—it needs to push commits that update the manifest and open
the release PR. The `publish` job narrows permissions to `contents: read` and
adds `id-token: write` (required for npm provenance). Using job-level
overrides follows least-privilege: the publish token never has write access to
repo contents.

### `outputs: release_created`

release-please emits `release_created: true` only on the run that merges the
release PR (not on every push). Capturing it as a job output lets `publish` and
`deploy-docs` share that signal without duplicating logic. The
`if: ${{ needs.release-please.outputs.release_created }}` guard means those
jobs are entirely skipped on ordinary feature pushes—no wasted runner time.

### `id-token: write` and npm provenance

npm provenance attaches a signed SLSA attestation to the published package
proving which workflow and commit produced it. GitHub OIDC is used to obtain
the token; `id-token: write` is the required permission. Provenance is
opt-in (`--provenance` flag) and only works when publishing from a CI
environment—it cannot be faked from a local machine.

### `--no-git-checks`

`pnpm publish` normally checks that the working tree is clean and HEAD is
tagged. In CI after `checkout`, the tree is clean but there is no git tag on
the exact commit (release-please merges the release PR after tagging, and the
checkout may not have that tag). `--no-git-checks` skips that validation.
Without it, publish fails despite being in a perfectly valid release state.

### `--access public`

Required for scoped packages (`@scope/pkg`) on npm—they default to private.
Has no effect on unscoped packages but is harmless to include.

### `registry-url: https://registry.npmjs.org`

`actions/setup-node` writes an `.npmrc` that points at this registry and
injects `NODE_AUTH_TOKEN` from the environment. Without `registry-url`, the
token wiring does not happen and publish will fail with an auth error even if
`NPM_TOKEN` is set.

### `node-version-file: .nvmrc`

Pins Node to whatever is in `.nvmrc` rather than a hardcoded string. This
ensures CI always matches the local development version without a separate
workflow edit when you upgrade Node.

### `pnpm install --frozen-lockfile`

Refuses to update `pnpm-lock.yaml` in CI. If the lockfile is out of date the
step fails loudly, which is the correct behavior—a stale lockfile in CI is a
sign that a local `pnpm install` was not committed.

### `deploy-docs` uses the composite action

`./.github/actions/setup-node-env` is a local composite action (no registry
lookup, no version pinning needed) that installs pnpm and Node and runs
`pnpm install --frozen-lockfile`. Re-using it in `deploy-docs` keeps the
setup logic DRY and means updating Node/pnpm versions in one place propagates
everywhere.

### `peaceiris/actions-gh-pages@v4`

Pushes `./build` to the `gh-pages` branch. Requires GitHub Pages to be
configured for the repo with "Deploy from a branch: gh-pages". The job uses
`GITHUB_TOKEN` (not a PAT), which is sufficient because `contents: write` is
granted at the job level.

---

## Setup checklist

1. Create an npm token with **Automation** type (bypasses 2FA) at
   `npmjs.com → account → access tokens`.
2. Add it to the repo as `Settings → Secrets → Actions → NPM_TOKEN`.
3. Enable GitHub Pages in `Settings → Pages → Source: Deploy from a branch`,
   branch `gh-pages`.
4. Commit `release-please-config.json` and `.release-please-manifest.json`
   under `.github/`.
5. Push a commit with a conventional commit message (`feat:`, `fix:`, etc.).
   release-please opens a release PR; merging it triggers publish.

---

## Conventional commit → semver mapping

| Commit prefix | Bump |
|---|---|
| `fix:` | patch |
| `feat:` | minor |
| `feat!:` or `BREAKING CHANGE:` footer | major |
| `chore:`, `docs:`, `refactor:` (no `!`) | no bump |

release-please will not open a release PR until at least one bump-worthy commit
lands on main.
