# Releases & Assets

Cutting a GitHub Release and attaching binaries with `gh release` (v2.94.0). For CI-driven releases, see the cross-link at the bottom.

## Creating a release

```bash
# Minimal: tag + auto-generated notes (title auto-generated too unless you pass --title)
gh release create v1.2.3 --generate-notes

# Hand-written notes inline or from a file
gh release create v1.2.3 --title "v1.2.3" --notes "Bugfix release"
gh release create v1.2.3 --title "v1.2.3" --notes-file CHANGELOG-1.2.3.md
```

Key flags:

| Flag | Effect |
| --- | --- |
| `-t, --title` | Release title (defaults to the tag, or auto-generated with `--generate-notes`) |
| `-n, --notes` | Notes inline; can be **prepended** to `--generate-notes` output |
| `-F, --notes-file` | Read notes from a file (`-` for stdin) |
| `--generate-notes` | Auto-generate title + notes via the Release Notes API |
| `--notes-from-tag` | Use the annotated tag's message (or the commit message) as notes |
| `--notes-start-tag` | The previous tag to diff against when generating notes |
| `-d, --draft` | Create as a draft (not published; editable; tag still mutable) |
| `-p, --prerelease` | Mark as a prerelease (e.g. `v1.2.3-rc.1`) |
| `--target` | Branch or full commit SHA to create the tag from (default: default branch) |
| `--latest` / `--latest=false` | Force / suppress the "Latest" marker (default is automatic by date+semver) |
| `--verify-tag` | Abort unless the tag already exists on the remote |
| `--fail-on-no-commits` | Fail if there are no new commits since the last release |

## Uploading binaries / assets

Pass files (or globs) positionally at create time, or upload to an existing release:

```bash
# Attach everything in dist/ at create time
gh release create v1.2.3 --generate-notes ./dist/*

# Upload to an existing release; --clobber replaces same-named assets
gh release upload v1.2.3 ./dist/app-linux-amd64 ./dist/app-darwin-arm64 --clobber
```

`gh release upload` only takes `--clobber` (delete-and-re-upload same-named assets) beyond the global flags. Without it, re-uploading a name that already exists errors.

**Asset naming** — pick names that are self-describing and sortable, since they're the public download surface: `myapp_1.2.3_linux_amd64.tar.gz`, `myapp_1.2.3_darwin_arm64.tar.gz`, `myapp_1.2.3_windows_amd64.zip`. Append a display label with `#`:

```bash
gh release create v1.2.3 '/path/to/app.zip#macOS universal binary'
```

**Checksums** — ship a `checksums.txt` (and optionally a signature) alongside binaries so consumers can verify:

```bash
( cd dist && shasum -a 256 * > checksums.txt )
gh release upload v1.2.3 dist/checksums.txt --clobber
```

## Auto-generated notes config: `.github/release.yml`

`--generate-notes` (and the web "Generate release notes" button) reads `.github/release.yml` to categorize PRs by label and exclude noise:

```yaml
# .github/release.yml
changelog:
  exclude:
    labels: [ignore-for-release]
    authors: [dependabot]
  categories:
    - title: Breaking Changes 🛠
      labels: [semver-major, breaking-change]
    - title: New Features 🎉
      labels: [semver-minor, enhancement]
    - title: Bug Fixes 🐛
      labels: [bug]
    - title: Other Changes
      labels: ["*"]          # catch-all; required to surface uncategorized PRs
```

Categories render in order; the first matching category wins per PR. Use `labels: ["*"]` as a catch-all bucket. Notes are PR-title-driven, so good PR titles → good notes.

**`--generate-notes` vs a hand-written changelog:** auto-notes are great for "what merged since last tag" and require zero upkeep, but they're a flat list of PRs. A hand-written `CHANGELOG.md` (Keep a Changelog style, or release-please-managed) gives you curated, human-prioritized narrative. Common compromise: maintain a changelog, but let auto-notes fill the GitHub Release body via `--notes-file`.

## Tags: semantics and gotchas

- If the tag **doesn't exist**, `gh release create` creates a **lightweight** tag from `--target` (default branch tip). Fine for most projects.
- For an **annotated** tag (recommended for signed/dated provenance), create and push it with git first, then release against it:

  ```bash
  git tag -a v1.2.3 -m "v1.2.3"
  git push origin v1.2.3
  gh release create v1.2.3 --verify-tag --notes-from-tag
  ```

  `--verify-tag` ensures you don't accidentally auto-create a tag; `--notes-from-tag` reuses the annotation as the release body.
- Fetch a gh-created tag locally afterward with `git fetch --tags origin`.
- **Immutable releases** (if enabled on the repo): once *published*, the tag and assets can't be changed or deleted. Drafts remain mutable — useful for assembling assets before flipping to published.

## Managing existing releases

```bash
gh release list                          # list releases (newest first)
gh release view v1.2.3                    # show details + asset list
gh release view v1.2.3 --web              # open in browser
gh release edit v1.2.3 --draft=false      # publish a draft; also --title/--notes/--latest/--prerelease
gh release download v1.2.3                # download all assets
gh release download v1.2.3 -p '*linux*'   # download by pattern
gh release delete v1.2.3 --cleanup-tag    # delete release (and optionally its tag)
```

## CI is where this usually lives

Manual `gh release` is right for one-offs and hotfixes. For SDK/binary publishing pipelines, run it in Actions on tag push — `softprops/action-gh-release` for build-and-upload, or **release-please** to fully automate version bumps, changelogs, and release creation from Conventional Commits. See the `working-with-github-actions` skill for the workflow YAML.
