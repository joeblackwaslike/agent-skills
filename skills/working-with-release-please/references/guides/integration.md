# Integrating release-please into a repo

This is the "how to set up Release" guide. It covers a **new repo** (greenfield) and an **existing repo** (the tricky case — you must seed the current version or the first release PR will try to release `1.0.0` and dump your entire git history into the changelog).

> **Mental model first:** release-please keeps a **release PR** open against your default branch. Every Conventional Commit you merge updates that PR's pending version + `CHANGELOG.md`. Merging the release PR tags the commit and creates the GitHub Release. release-please does **not** publish your package — see [github-actions.md](github-actions.md) and the [cookbook](cookbook/) for the publish step.

---

## Decision: simple config vs manifest config

There are two ways to configure release-please. Pick one up front.

| | **Simple (`release-type` input only)** | **Manifest (`release-please-config.json` + `.release-please-manifest.json`)** |
| --- | --- | --- |
| Setup | One line in the workflow: `release-type: node` | Two committed JSON files |
| Best for | A single package at the repo root, default behavior | Monorepos, multiple packages, any per-package customization, controlling the seed version |
| Customization | None | Everything (changelog sections, extra-files, plugins, prereleases, …) |
| First-release seed | Inferred (problematic on existing repos) | **Explicit** — you write the current version into the manifest |

**Recommendation:** use **manifest mode** for anything beyond a brand-new repo. It's the only way to (a) seed an existing version cleanly and (b) customize anything. The `googleapis/release-please-action` README even says: for advanced config, set up a manifest. Manifest mode is also the default when you *don't* pass `release-type`.

The two manifest files:

- **`release-please-config.json`** — *how* to release (release-type, packages, changelog settings, plugins). Schema: [`../schemas/config.json`](../schemas/config.json).
- **`.release-please-manifest.json`** — *what version each package is currently at*. release-please reads this to know the last release and **writes** the next version back into it on each release PR. Schema: [`../schemas/manifest.json`](../schemas/manifest.json).

---

## Track A — New repo (greenfield)

You have no releases yet and want to start at `1.0.0` (or `0.1.0`).

### A1. Minimal: single root package, simple config

Just add the workflow — no JSON files needed. Pick the `release-type` matching your ecosystem (`node`, `python`, `rust`, `go`, `simple`, …; full list in [SKILL.md](../../SKILL.md#supported-release-type-strategies)).

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
        with:
          release-type: node
```

That's it. Start writing Conventional Commits (`feat:`, `fix:`). The first `feat:`/`fix:` after this lands will open a release PR. See [changelogs-and-github.md](changelogs-and-github.md) for the commit→version mapping.

> **`@v5`, not `@v4`:** v5 is the current major (Node24 runtime). Inputs/outputs are identical to v4 — most tutorials and even the upstream README examples still show `@v4`. Use `@v5`.

### A2. Recommended: manifest config (room to grow)

`release-please-config.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "packages": {
    ".": {
      "release-type": "node",
      "changelog-path": "CHANGELOG.md"
    }
  }
}
```

`.release-please-manifest.json` (start at 0.0.0 so the first feat bumps to 0.1.0, or set your desired starting point):

```json
{
  ".": "0.0.0"
}
```

Workflow (no `release-type` — it's read from the config now):

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
```

> **Tip:** want your first release to be exactly `1.0.0`? Set `"release-as": "1.0.0"` on the package in the config for the first run, then remove it.

---

## Track B — Existing repo (already has versions/tags)

This is where people get burned. If you point release-please at a repo that's already at, say, `2.4.1`, with no seed, its first release PR will propose `1.0.0` (or worse, walk your whole history into the changelog). You must tell it where you are.

### B1. Seed the manifest with the current version

Use manifest mode (Track A2 layout). Set the manifest to your **current shipped version**:

```json
{
  ".": "2.4.1"
}
```

Now the next `feat:` bumps to `2.5.0`, the next `fix:` to `2.4.2` — correctly.

### B2. Tell release-please where history starts

release-please walks commits backward looking for the last release. On an existing repo it may not find a release commit it recognizes. Two root-level config options fix this:

- **`bootstrap-sha`** — "pretend the repo's release history starts at this commit SHA." release-please ignores everything before it for the *first* release PR. Use this when onboarding so the first changelog only contains commits since you adopted Conventional Commits.
- **`last-release-sha`** — "the last release happened at this commit." release-please only considers commits *after* it. Use when you have a real prior release commit to anchor to.

Example config for onboarding an existing repo:

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "bootstrap-sha": "abc1234def5678abc1234def5678abc1234def56",
  "packages": {
    ".": { "release-type": "node" }
  }
}
```

Get the SHA with `git rev-parse HEAD` (use the commit just *before* your first Conventional Commit so the first release captures everything since adoption), or pick the SHA of your last manual release.

### B3. Match your existing tag format

If your repo already tags `v2.4.1` (with a leading `v`) make sure release-please keeps doing that — set `"include-v-in-tag": true` (it's the default). For monorepo component tags like `pkg-a-v1.2.3`, see [advanced.md](advanced.md). Mismatched tag formats are a common reason release-please can't find the last release.

### B4. First run, then prune

After the first successful release PR merges, you can remove `bootstrap-sha`/`release-as` — they're only needed to get the first release right. The manifest now carries state forward.

---

## Monorepo (multiple packages)

List each package path in the config; each gets its own version in the manifest and its own tag.

`release-please-config.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "packages": {
    "packages/core": { "release-type": "node", "component": "core" },
    "packages/cli":  { "release-type": "node", "component": "cli" }
  }
}
```

`.release-please-manifest.json`:

```json
{
  "packages/core": "1.4.0",
  "packages/cli": "0.9.2"
}
```

By default each package releases independently (its tag is prefixed by its component, e.g. `core-v1.5.0`). For lockstep versioning, separate PRs per package, and the plugin system, see [advanced.md](advanced.md).

---

## Conventional Commits — the prerequisite

release-please does nothing useful unless your commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The minimum you need:

- `fix: …` → patch bump (`2.4.1` → `2.4.2`)
- `feat: …` → minor bump (`2.4.1` → `2.5.0`)
- `feat!: …` / a `BREAKING CHANGE:` footer → major bump (`2.4.1` → `3.0.0`)
- `chore:`, `docs:`, `refactor:`, `test:`, etc. → no release by default (but can appear in the changelog if you configure `changelog-sections`)

To enforce this on commits, pair with **commitizen** + a `commit-msg` hook (see `joe-stack-preferences`). Full type→bump→changelog detail is in [changelogs-and-github.md](changelogs-and-github.md).

---

## Verify the setup

1. Land a `feat: …` or `fix: …` commit on the default branch.
2. The `release-please` workflow runs and opens (or updates) a PR titled like `chore(main): release 2.5.0`.
3. Inspect the PR diff: version files bumped, `CHANGELOG.md` updated, `.release-please-manifest.json` updated.
4. Merge it → release-please tags the commit and creates the GitHub Release.
5. If publishing, the downstream job fires on the `release_created` / `releases_created` output ([github-actions.md](github-actions.md)).

If no PR appears, go straight to [troubleshooting.md](troubleshooting.md).
