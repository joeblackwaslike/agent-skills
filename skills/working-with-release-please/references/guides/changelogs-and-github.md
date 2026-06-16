# How release-please works with changelogs and GitHub

This explains the full lifecycle: a Conventional Commit lands → release-please decides a version bump → it writes `CHANGELOG.md` → opens/updates a release PR → on merge it tags the commit and creates the GitHub Release.

---

## The release lifecycle

```
commit (feat: …) ──▶ release-please action runs on push to main
                          │
                          ▼
              parses commits since last release
                          │
                          ▼
        opens / updates a "release PR":
          • bumps version files (package.json, pyproject.toml, …)
          • regenerates CHANGELOG.md
          • updates .release-please-manifest.json
                          │
            (more commits land → PR is amended)
                          │
                  you merge the release PR
                          ▼
        release-please tags the merge commit (e.g. v2.5.0)
        and creates a GitHub Release with notes from CHANGELOG.md
                          │
                          ▼
        action emits release_created=true → publish job runs
```

The key idea: **releasing is a deliberate act** (merging the PR), not an automatic consequence of every push. This is the main difference from semantic-release. The release PR is a always-up-to-date preview of "what the next release would be right now."

---

## Conventional Commits → SemVer bump

release-please reads [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and maps them to [SemVer](https://semver.org/):

| Commit | Bump | `1.4.2` becomes |
| --- | --- | --- |
| `fix: …` | patch | `1.4.3` |
| `feat: …` | minor | `1.5.0` |
| `feat!: …` or any type with `!` | major | `2.0.0` |
| footer `BREAKING CHANGE: …` | major | `2.0.0` |
| `docs:`, `chore:`, `refactor:`, `test:`, `ci:`, `style:`, `perf:` | none* | — |

\* No release on their own, but `perf:` and others **can** appear in the changelog if you enable them via `changelog-sections` (below). A release PR only opens once there's at least one releasable commit (`feat`/`fix`/breaking) since the last release.

### Pre-1.0 behavior

Before `1.0.0`, breaking changes don't jump to a hypothetical `1.0.0` automatically. Relevant config:

- `bump-minor-pre-major: true` — while `< 1.0.0`, treat breaking changes as **minor** bumps (`0.4.0` → `0.5.0`) instead of major.
- `bump-patch-for-minor-pre-major: true` — while `< 1.0.0`, treat features as **patch** bumps.

This keeps a pre-1.0 package from prematurely hitting 1.0.

---

## The CHANGELOG

release-please generates a [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)-style `CHANGELOG.md`, grouping commits into sections by type. Default sections are **Features** (`feat`) and **Bug Fixes** (`fix`); breaking changes get a prominent callout.

### Customizing changelog sections

Use `changelog-sections` to control which commit types appear and under what heading. Each entry: `{ "type", "section", "hidden"? }`.

```json
{
  "packages": {
    ".": {
      "release-type": "node",
      "changelog-sections": [
        { "type": "feat", "section": "Features" },
        { "type": "fix", "section": "Bug Fixes" },
        { "type": "perf", "section": "Performance Improvements" },
        { "type": "deps", "section": "Dependencies" },
        { "type": "docs", "section": "Documentation", "hidden": false },
        { "type": "chore", "section": "Miscellaneous", "hidden": true }
      ]
    }
  }
}
```

`"hidden": true` parses the type but keeps it out of the changelog. Adding a section for `chore`/`docs` makes those commits show up (they still don't *trigger* a release on their own).

### Changelog notes formatting

`changelog-type` (a.k.a. `changelog-notes-type`) picks the formatter:

- `default` — release-please's built-in formatter.
- `github` — uses GitHub's "generate release notes" style (contributor mentions, PR links).

---

## What lands in the release PR

The release PR's diff typically contains:

1. **Version file bumps** — language-specific (e.g. `package.json` `version`, `pyproject.toml` `version`, `Cargo.toml`, `version.py`). See the per-ecosystem [cookbook](cookbook/) for which files each `release-type` touches.
2. **`CHANGELOG.md`** — new section prepended for the pending version.
3. **`.release-please-manifest.json`** — the pending version written back so state carries forward.
4. **Any `extra-files`** — see below.

### `extra-files` — stamp the version anywhere

Use `extra-files` to bump version strings in files release-please wouldn't otherwise touch (a `constants.ts`, a Helm `values.yaml`, a `README` badge, a `__version__` in an odd path). Two forms:

```json
{
  "packages": {
    ".": {
      "release-type": "node",
      "extra-files": [
        "src/version.ts",
        { "type": "json", "path": "manifest.json", "jsonpath": "$.version" },
        { "type": "generic", "path": "deploy/values.yaml" }
      ]
    }
  }
}
```

For `generic` files, put an annotation comment next to the version so release-please knows what to replace:

```yaml
# deploy/values.yaml
appVersion: 1.4.2 # x-release-please-version
```

Available markers: `x-release-please-version`, `x-release-please-major`, `x-release-please-minor`, `x-release-please-patch`.

---

## The GitHub side

When the release PR merges, release-please (via the action) does the GitHub work:

- **Creates a git tag** (`v2.5.0`, or `component-v2.5.0` in a monorepo). Controlled by `include-v-in-tag` (default `true`) and `include-component-in-tag`.
- **Creates a GitHub Release** whose body is the changelog section for that version. Skippable with `skip-github-release` / `draft`.
- **Emits action outputs** the rest of your workflow uses to publish — `release_created`, `tag_name`, `version`, `major`/`minor`/`patch`, `upload_url`. See [github-actions.md](github-actions.md).

### Attaching build artifacts to the Release

Use the `gh` CLI (preinstalled on runners) in a step gated on `release_created`, with `tag_name`:

```yaml
- name: Upload artifact
  if: ${{ steps.release.outputs.release_created }}
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: gh release upload ${{ steps.release.outputs.tag_name }} ./dist/build.zip
```

For raw `gh release` / REST details, see the `working-with-github` skill.

---

## Customizing the release PR itself

| Option | Effect |
| --- | --- |
| `pull-request-title-pattern` | e.g. `chore: release ${version}` |
| `pull-request-header` / `pull-request-footer` | text injected into the PR body |
| `label` / `release-label` | labels applied to the release PR and the released PR |
| `draft-pull-request` | open the release PR as a draft |
| `versioning-strategy` | how the next version is computed — `default`, `always-bump-patch`, `always-bump-minor`, `service-pack` (see [advanced.md](advanced.md)) |
| `release-as` | force a specific next version (one-off overrides) |

Full field reference: [`../schemas/config.json`](../schemas/config.json) and upstream [`../docs/customizing.md`](../docs/customizing.md).
