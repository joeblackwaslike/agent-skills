# release-please troubleshooting

An opinionated playbook for the failures that actually happen, layered on upstream [`../docs/troubleshooting.md`](../docs/troubleshooting.md). Each entry: symptom → cause → fix.

---

## No release PR ever appears

The most common report. Work down this list:

1. **Commits aren't Conventional.** release-please only opens a PR when there's a releasable commit (`feat:`, `fix:`, or a breaking change) since the last release. `chore:`/`docs:`/`refactor:` alone produce nothing. → Check `git log` since the last release for a `feat`/`fix`.
2. **The repo setting is off.** Settings → Actions → General → **"Allow GitHub Actions to create and approve pull requests"** must be enabled, or the action can't open the PR (it often fails silently-ish). → Turn it on.
3. **Missing `pull-requests: write` permission.** The workflow `permissions:` block needs `contents: write` **and** `pull-requests: write`. → Add it.
4. **Wrong branch.** The action runs on `push` to the branch in your `on:` trigger, but releases against `target-branch` (defaults to the repo default branch). If you pushed to a non-default branch without setting `target-branch`, nothing happens. → Align `on.push.branches`, the default branch, and `target-branch`.
5. **Action didn't run at all.** → Check the Actions tab. If the workflow itself didn't trigger, the `on:` filter or branch name is wrong.

---

## The first release PR proposes `1.0.0` (but we're already at 3.x)

**Cause:** no seed — release-please doesn't know your current version.
**Fix:** switch to manifest mode and write the current version into `.release-please-manifest.json`:

```json
{ ".": "3.2.1" }
```

See [integration.md → Track B](integration.md#track-b--existing-repo-already-has-versionstags).

---

## The first changelog includes my entire git history

**Cause:** release-please walked back past your adoption point because it found no recognizable prior release.
**Fix:** set `bootstrap-sha` in the root config to the commit just before your first Conventional Commit, run once, then remove it. See [advanced.md → Bootstrapping](advanced.md#bootstrapping-onto-an-existing-tagged-history).

---

## The release PR merged, the release was created, but my publish workflow never ran

**Cause #1 (most common):** release-please used the default `GITHUB_TOKEN`. GitHub blocks events triggered by `GITHUB_TOKEN` from starting *other* workflow runs — so a separate workflow listening for `release: published` won't fire.
**Fix:** either (a) keep the publish steps **in the same workflow** gated on the `release_created` output (recommended — the cookbook pattern), or (b) give release-please a **GitHub App token or PAT** so its release event can trigger downstream workflows. See [github-actions.md → token decision](github-actions.md#the-token-decision-important).

**Cause #2:** you gated on the wrong output. Single root component → `release_created`. Manifest/monorepo (no `path: .`) → `releases_created` / `paths_released`. → Fix the gate; see [github-actions.md → outputs](github-actions.md#action-outputs--what-you-gate-on).

**Cause #3 (job-level `if`):** job outputs are **strings**. `if: ${{ needs.release-please.outputs.release_created }}` can behave unexpectedly — compare explicitly: `if: ${{ needs.release-please.outputs.release_created == 'true' }}`.

---

## Version got bumped in the PR, but no tag / GitHub Release was created on merge

**Cause:** the release PR was **squash-merged** with a commit title that isn't Conventional, or the merge commit doesn't match what release-please expects, so its "tag the release" pass doesn't recognize the merge.
**Fix:** keep the release PR's auto-generated title (`chore(main): release x.y.z`) when squashing — don't rewrite it. If your repo enforces a custom squash title, ensure it still parses. Confirm `skip-github-release` isn't set to `true`.

---

## Stale `@v4` (or `@v3`) action

**Symptom:** copied a tutorial; using `googleapis/release-please-action@v4` (or `@v3`).
**Reality:** **v5.0.0** is current (2026-04-22). The only breaking change from v4 is the Node24 runtime — **inputs/outputs are identical**, so the upgrade is just bumping the tag. v3→v4 was the bigger jump (the `command` input was removed; advanced options moved into the manifest config — see the migration table in [`../release-please-action-README.md`](../release-please-action-README.md#upgrading-from-v3-to-v4)).
**Fix:** change `@v4` → `@v5`. If on v3, also migrate `command:`/inline options to a manifest config.

---

## Multiple `feat`s merged but the version only bumped once

**Working as intended.** release-please computes a *single* next version from *all* pending commits since the last release — five `feat:`s since `1.2.0` still produce one `1.3.0`, not `1.7.0`. The changelog lists all of them. SemVer bumps once per release, not once per commit.

---

## A breaking change didn't bump the major

1. **Pre-1.0:** breaking changes don't force `1.0.0`. If `bump-minor-pre-major: true` is set, breaking → minor while `< 1.0.0`. That's intended.
2. **Marker missing:** a major bump needs `feat!:`/`fix!:` (the `!`) **or** a `BREAKING CHANGE:` footer in the commit body. A line in the PR description doesn't count — it must be in the commit message.

---

## Monorepo: a package didn't release / claimed the wrong commits

- **Path matching:** release-please assigns a commit to a package by the files it touches. A commit touching files outside any configured `packages` path releases nothing. Cross-contamination → use `exclude-paths`.
- **Lockstep expected but didn't happen:** add the `linked-versions` plugin (see [advanced.md](advanced.md#lockstep--linked-versions)).
- **Wrong output gate:** path outputs are prefixed — `steps.release.outputs['packages/cli--release_created']`.

---

## Debug locally with `--dry-run`

When a version or changelog comes out wrong and you can't tell why, run the CLI locally to see release-please's reasoning without touching GitHub:

```bash
npx release-please release-pr --repo-url=owner/repo --token=$GITHUB_TOKEN --dry-run --debug
```

This prints the commits it found, the version it computed, and the changelog it would write. Pin the CLI to the release-please version bundled in your action major. Full CLI reference: [`../docs/cli.md`](../docs/cli.md).

---

## Still stuck

Upstream troubleshooting often has the long-tail answer: [`../docs/troubleshooting.md`](../docs/troubleshooting.md). For the GitHub-API side of releases (permissions, asset upload, REST) use `working-with-github`; for general workflow YAML use `working-with-github-actions`.
