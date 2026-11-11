# Mechanical gate

Step 1 of the [self-review runbook](self-review.md) runs the project's own automated checks before any reviewer reads the diff. This page says how to find those checks, in what order to run them, on how much of the project, and where to keep what you found.

Discover once per branch, then reuse. Do not assume a `justfile`.

## 1. Check the cache

The cache lives in the branch's own git directory, so it is per worktree, never committed, and removed with the worktree:

```sh
GATE_DIR="$(git rev-parse --git-dir)/self-review"
HASH=$({ printf '%s\n' CLAUDE.md AGENTS.md justfile Makefile package.json pyproject.toml Cargo.toml tox.ini noxfile.py .pre-commit-config.yaml lefthook.yml; find .github/workflows -type f | sort; } | while read -r f; do [ -f "$f" ] && git hash-object "$f"; done | shasum | cut -d' ' -f1)
STORED=$(jq -r .inputs_hash "$GATE_DIR/gate.json")
[ "$HASH" = "$STORED" ] && echo "cache valid" || echo "discover"
```

The loop skips files the project does not have, so a missing `justfile` does not break the hash. If it prints `cache valid`, load `checks` and `gaps` from `gate.json` and go to step 3. If it prints `discover`, the file is missing or stale: do step 2 and rewrite the file. A branch that adds a linter changes the hash, so it is picked up.

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

While iterating, run each check on the changed files when `changed_cmd` exists. Get the list with `git diff --name-only --diff-filter=d $BASE`. If the project defines `check-changed` or `test-changed` recipes, use those.

Tools that take a file list:

| Tool | Changed-files form |
| --- | --- |
| Ruff, ESLint, Biome, Prettier, ShellCheck, shfmt, SQLFluff | Pass the files as arguments |
| pre-commit | `pre-commit run --files <files>` |
| Vitest | `vitest related <files>` |
| Jest | `jest --findRelatedTests <files>` |
| pytest | The test files for the changed modules, or the changed test files |
| mypy | Pass the files, but a whole-project run is the real check |

Tools that must run on everything: `tsc` without project references, `cargo clippy` and `cargo test`, and every e2e or browser suite. Run them whole, and put them last.

Before reporting READY, run every check in `gate.json` once on the whole project. A changed-files pass is for speed while iterating. It does not count as the final gate.

## 5. Report

Pass each command you ran to `report.ts` as `--check "<command>=<exit code>"`. Put every entry from `gaps` in `--gate-gaps`, with the reason. A project with no checks at all is a gap in every kind, and the report says so.
