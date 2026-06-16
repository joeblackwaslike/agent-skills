# Advanced release-please

Monorepos, lockstep versioning, the plugin system, separate PRs, prereleases, versioning strategies, and onboarding a repo with existing tagged history. For field-level detail see [`../schemas/config.json`](../schemas/config.json) and upstream [`../docs/manifest-releaser.md`](../docs/manifest-releaser.md) + [`../docs/customizing.md`](../docs/customizing.md).

---

## Bootstrapping onto an existing tagged history

The single most error-prone onboarding case (also covered in [integration.md](integration.md#track-b--existing-repo-already-has-versionstags), repeated here with the edge cases).

The goal: release-please's **first** release PR should propose the *correct* next version and a changelog that only contains commits since you adopted Conventional Commits — not your entire history starting from `1.0.0`.

Three levers, used together:

1. **Seed `.release-please-manifest.json`** with the current shipped version:
   ```json
   { ".": "3.2.1" }
   ```
   This is what fixes "it proposed 1.0.0."

2. **`bootstrap-sha`** (root config) — ignore all commits before this SHA for the first release. Set it to the commit just before your first Conventional Commit:
   ```json
   { "bootstrap-sha": "a1b2c3d4...", "packages": { ".": { "release-type": "node" } } }
   ```
   This is what fixes "the changelog walked my whole history."

3. **`last-release-sha`** (root config) — alternative to `bootstrap-sha` when you have a real prior release commit; release-please considers only commits *after* it.

After the first release PR merges successfully, **remove `bootstrap-sha`** — the manifest now carries state. Leaving it set can suppress commits on later runs.

> **Tag format must match.** If existing tags are `v3.2.1`, keep `include-v-in-tag: true` (default). If they're component-prefixed (`api-v3.2.1`), set `include-component-in-tag: true` and the matching `component`. A tag-format mismatch makes release-please think there's no prior release and start over.

---

## Monorepo deep dive

Each entry in `packages` is an independently-versioned component. Minimal:

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "packages": {
    "packages/core": { "release-type": "node", "component": "core" },
    "packages/cli":  { "release-type": "node", "component": "cli" }
  }
}
```

```json
{ "packages/core": "1.4.0", "packages/cli": "0.9.2" }
```

Key behaviors:

- **Tags are component-prefixed** by default: `core-v1.5.0`, `cli-v0.9.3`. Controlled by `include-component-in-tag` (default `true` in manifest mode) and `tag-separator`.
- **One release PR by default**, containing all pending package bumps. Toggle with `separate-pull-requests` (below).
- **Outputs are path-prefixed** — gate publishes on `steps.release.outputs['packages/cli--release_created']` (see [github-actions.md](github-actions.md#action-outputs--what-you-gate-on)).
- **`exclude-paths`** keeps a package from claiming commits that belong to another path.

---

## Lockstep / linked versions

When several packages must always share a version (release `core`, `cli`, and `sdk` all as `2.0.0` together), use the **`linked-versions` plugin**:

```json
{
  "packages": {
    "packages/core": { "release-type": "node" },
    "packages/cli":  { "release-type": "node" },
    "packages/sdk":  { "release-type": "node" }
  },
  "plugins": [
    {
      "type": "linked-versions",
      "groupName": "main",
      "components": ["core", "cli", "sdk"]
    }
  ]
}
```

Now a bump to any member bumps them all to the same version. Combine with `group-pull-request-title-pattern` to title the combined PR, e.g. `"chore: release main libraries ${version}"`.

---

## The plugin system

`plugins` (root config) post-process the release. The useful ones:

| Plugin | What it does |
| --- | --- |
| `linked-versions` | Keep listed components on the same version (above). |
| `node-workspace` | For npm workspaces: bump cross-dependency version ranges between local packages and update the lockfile so internal deps stay consistent. |
| `cargo-workspace` | Same idea for Rust Cargo workspaces. |
| `maven-workspace` | Same for multi-module Maven projects. |
| `sentence-case` | Force changelog entry text to sentence case. |

Example (npm monorepo with workspace dep-bumping + lockstep):

```json
{
  "packages": {
    "packages/a": { "release-type": "node" },
    "packages/b": { "release-type": "node" }
  },
  "plugins": ["node-workspace"]
}
```

`node-workspace` is what makes a bump to `packages/a` also bump the `"a": "^x.y.z"` range inside `packages/b`'s `package.json` and refresh the root lockfile.

---

## Separate PRs per package

By default a monorepo gets one combined release PR. For one PR per component:

```json
{ "separate-pull-requests": true, "packages": { /* … */ } }
```

Useful when different teams own different packages and review independently. Costs more PR noise.

---

## Prereleases / release channels

To cut `2.0.0-beta.1`-style prereleases:

- **`prerelease: true`** — mark releases on this package/branch as prereleases.
- **`prerelease-type`** — the prerelease label, e.g. `beta`, `rc`, `alpha` → `2.0.0-beta.1`, `2.0.0-beta.2`, …

Common pattern: a `next`/`beta` branch builds prereleases while `main` builds stable. Run two workflows with different `target-branch`, and set `prerelease`/`prerelease-type` on the prerelease branch's config. For a one-off prerelease use `"release-as": "2.0.0-rc.1"`.

> npm/PyPI/VS Code all have their own notion of prerelease/preview channels (`npm publish --tag next`, PyPI dev releases, `vsce publish --pre-release`). release-please produces the version string; your publish step routes it to the right channel — see the [cookbook](cookbook/).

---

## Versioning strategies

`versioning-strategy` overrides how the next version is computed from commits:

| Value | Behavior |
| --- | --- |
| `default` | Standard SemVer mapping (feat→minor, fix→patch, breaking→major). |
| `always-bump-patch` | Every release is a patch bump regardless of commit types. Good for "service pack" libraries. |
| `always-bump-minor` | Every release bumps the minor. |
| `service-pack` | Bump the 4th version segment (for products that ship service packs). |

Pre-1.0 helpers `bump-minor-pre-major` and `bump-patch-for-minor-pre-major` are documented in [changelogs-and-github.md](changelogs-and-github.md#pre-10-behavior).

---

## Running the CLI locally

Everything the action does is the `release-please` npm CLI under the hood. To dry-run or debug locally:

```bash
npx release-please release-pr \
  --repo-url=owner/repo \
  --token=$GITHUB_TOKEN \
  --dry-run

npx release-please github-release \
  --repo-url=owner/repo \
  --token=$GITHUB_TOKEN \
  --dry-run
```

`--dry-run` prints what it *would* do without touching GitHub — invaluable for debugging why a version or changelog comes out wrong. Full CLI reference: [`../docs/cli.md`](../docs/cli.md). Pin the CLI to match the action's bundled release-please version (the action at `@v5.0.0` bundles release-please `17.x`).

---

## Java

Java/Maven have extra depth (SNAPSHOT versions generated after each release, `pom.xml` updates). See upstream [`../docs/java.md`](../docs/java.md) and [`../docs/java-releases.md`](../docs/java-releases.md).
