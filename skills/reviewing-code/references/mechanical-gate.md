# Mechanical gate

Step 1 of the [self-review runbook](self-review.md) runs the project's own automated checks before any reviewer reads the diff. This page says how to find those checks, in what order to run them, on how much of the project, and where to keep what you found.

Discover once per worktree, then reuse it for as long as the hash below still matches. Do not assume a `justfile`.

## 1. Check the cache

The cache lives in the branch's own git directory, so it is per worktree (each branch gets its own worktree), never committed, and removed with the worktree:

```sh
TOP=$(git rev-parse --show-toplevel)
GATE_DIR="$(git rev-parse --git-dir)/self-review"
HASH=$(git -C "$TOP" ls-files -z -co --exclude-standard -- CLAUDE.md AGENTS.md .pre-commit-config.yaml lefthook.yml .gitlab-ci.yml .github/workflows .github/actions '*justfile' '*Makefile' '*pyproject.toml' '*Cargo.toml' '*go.mod' '*tox.ini' '*noxfile.py' '*package.json' '*CLAUDE.md' '*AGENTS.md' '*tsconfig*.json' '*ruff.toml' '*eslint.config.*' '*biome.json*' '*vitest.config.*' '*jest.config.*' | while IFS= read -r -d '' f; do [ -f "$TOP/$f" ] && git hash-object "$TOP/$f"; done | git hash-object --stdin)
STORED=$(jq -r '.inputs_hash // empty' "$GATE_DIR/gate.json" 2>/dev/null)
[ -n "$HASH" ] && [ "$HASH" = "$STORED" ] && echo "cache valid" || echo "discover"
```

`git ls-files` lists only the files that exist, so a project without a `justfile` is fine, and the pathspecs cover manifests and common tool configs at any depth (a monorepo's `services/api/pyproject.toml` counts), new untracked files included. The snippet resolves paths from the repo root without changing your directory, so the hash is the same from any subdirectory. Paths are read null-delimited, so names with spaces or newlines hash correctly. It needs `git` and `jq` only; if `jq` is missing the check prints `discover` every time and the write step in section 2 fails, so install it or skip caching and say so in the report. If it prints `cache valid`, load `checks` and `gaps` from `gate.json` and go to step 3. If it prints `discover`, the file is missing or stale: do step 2 and rewrite the file. A branch that adds a linter through one of these files changes the hash, so it is picked up. If your project keeps its check configuration somewhere else, add that path to the list.

## 2. Discover

Read these sources in order. The first two say what the project intends; the last two show what it actually enforces. When they disagree, CI wins, because CI is what runs.

1. Repo-level `CLAUDE.md` and `AGENTS.md`, which usually name the commands to run and the ones not to.
2. Task runners and manifests: `justfile`, `Makefile`, `package.json` scripts, `pyproject.toml` tool tables, `Cargo.toml` `[lints]`, `tox.ini`, `noxfile.py`.
3. Hook config: `.pre-commit-config.yaml`, `lefthook.yml`.
4. CI workflows under `.github/workflows`.

For each check you find, record:

| Field | Meaning |
| --- | --- |
| `name` | The tool, e.g. `ruff`, `tsc`, `vitest` |
| `kind` | `format`, `lint`, `typecheck`, `test-unit`, `test-functional`, `test-e2e`, `test-smoke`, `test-browser` |
| `cmd` | The command that runs it on the whole project |
| `changed_cmd` | The command for changed files only, or empty if the tool cannot take them |
| `cost` | `fast` (seconds), `medium` (under a minute), `slow` (longer, or needs services) |
| `source` | Where you found it |

A project can have several linters and several test suites. List each one. Do not collapse them into a single `lint` entry.

Record a kind the project lacks under `gaps`, and a check that exists but cannot run here (missing tool, needs a service you cannot start) under `gaps` with the reason. A check that exists only as inline steps in a CI workflow, with no command you can run locally, is a gap too: name the workflow job and say it cannot run outside CI. A check that applies only to some files (a description linter, a link checker) is still a check; mark it in `source` and run it when the diff touches those files.

Write the result. `CHECKS` is a JSON array of objects with the fields above, and `GAPS` is a JSON array of strings:

```sh
CHECKS='[{"name":"ruff","kind":"lint","cmd":"ruff check .","changed_cmd":"ruff check","cost":"fast","source":"pyproject.toml"}]'
GAPS='["no typecheck", "e2e needs a running database"]'
mkdir -p "$GATE_DIR"
jq -n --arg h "$HASH" --argjson checks "$CHECKS" --argjson gaps "$GAPS" \
  '{inputs_hash:$h, checks:$checks, gaps:$gaps}' > "$GATE_DIR/gate.json"
```

## 3. Order

Run cheap and auto-fixable checks first, so a typo does not wait behind a ten-minute suite:

1. `format`
2. `lint`
3. `typecheck`
4. `test-unit`, then `test-functional`, then `test-smoke`
5. `test-e2e`, then `test-browser`

Within a group, run checks that share no state in parallel. Stop at the first red group, fix it, and rerun that group before starting the next. Fix formatting by running the formatter, not by hand.

## 4. Choose the scope

While iterating, run each check on the changed files when `changed_cmd` exists. Get the list with `git diff --name-only --diff-filter=d "$BASE"`, where `BASE` is the merge base from step 0 of the runbook. If the project defines `check-changed` or `test-changed` recipes, use those.

Tools that take a file list:

| Tool | Changed-files form |
| --- | --- |
| Ruff, ESLint, Biome, Prettier, ShellCheck, shfmt, SQLFluff | Pass the files as arguments |
| pre-commit | `pre-commit run --files <files>` |
| Vitest | `vitest related --run <files>` |
| Jest | `jest --findRelatedTests <files>` |
| pytest | The test files for the changed modules, or the changed test files |
| mypy | Pass the files, but a whole-project run is the real check |

Tools that must run on everything: `tsc` without project references, `cargo clippy` and `cargo test`, and every e2e or browser suite. Run them whole, and put them last.

Before reporting READY, run every check in `gate.json` once on the whole project. A changed-files pass is for speed while iterating. It does not count as the final gate.

## 5. Report

Pass each command you ran to `report.ts` as `--check "<command>=<exit code>"`. Put every entry from `gaps` in `--gate-gaps`, with the reason. When `gaps` is empty, pass `--gate-gaps "none"`: `report.ts` only accepts READY without it when the checks are literally `just check` and `just test`. A project with no checks at all is a gap in every kind, and the report says so.
