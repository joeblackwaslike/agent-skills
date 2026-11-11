# Mechanical gate discovery

Spec for `agent-skills-7tg`. Short design: a small change to one runbook section plus one new reference page.

## Why

Step 1 of `skills/reviewing-code/references/self-review.md` assumes a `justfile` with `check` and `test` recipes. Without one it says "run the repo's own lint, type-check and test commands" and gives no method for finding them. On this repo (a `Makefile` with one lint target) the last gate was one lint target plus a hand-written link check, and everything else went under "Gate gaps".

## Goals

- The agent works out what the project enforces: type checkers, each linter and formatter (a project can have several), and each kind of test (unit, functional, e2e, smoke, browser).
- It orders those checks sensibly and runs them.
- It chooses, per check, whether to run on the changed files or on the whole project.
- The result is derived once per branch and reused.

## Non-goals

- No script. The runbook is prose, as in the rest of the skill (see Approaches).
- No committed manifest in the reviewed repo.
- No change to the reviewer dispatch, triage, or the `report.ts` flags.

## Approaches

- **A. Prose runbook plus a one-line hash (chosen).** New `references/mechanical-gate.md`; section 1 becomes a short pointer plus the rules that must hold.
- B. A `scripts/gate.ts` that detects ecosystems and prints ordered commands. Deterministic and testable, but every new ecosystem adds heuristics, and reading `CLAUDE.md` still needs the agent.
- C. Prose plus a small script for the cache only. Safer hashing, but a script just to cache.

Move to B only if agents keep getting discovery wrong in practice.

## Design

**Sources, in this order.** Treat the first two as intent and the last two as ground truth.

1. Repo-level `CLAUDE.md` and `AGENTS.md`, which usually say what to run and what not to.
2. Task runners: `justfile`, `Makefile`, `package.json` scripts, `pyproject.toml` tool tables, `Cargo.toml` `[lints]`, `tox.ini`, `noxfile.py`.
3. Pre-commit or lefthook config.
4. CI workflows (`.github/workflows`). When the docs and CI disagree, CI wins, because CI is what actually runs.

**What to record per check.** Name, kind (format, lint, typecheck, test-unit, test-functional, test-e2e, test-smoke, test-browser), the command, whether it takes a file list, and a rough cost (fast, medium, slow).

**Order.** Cheap and auto-fixable first: format, then lint, then typecheck, then tests from fastest to slowest. Run checks that do not share state in parallel. Stop at the first red group and fix it before running slower ones.

**Scope.** Run a check on the changed files when its tool takes a file list (`ruff check <files>`, `eslint <files>`, `pre-commit run --files`, `pytest` for affected tests). Run it on everything when it cannot (`tsc` without project references, `cargo clippy`, e2e suites). Iterate on changed scope. Before reporting READY, run every discovered check once on the whole project. A project that defines `check-changed` or `test-changed` recipes uses those for the iterating scope.

**Cache.** Stored at `$(git rev-parse --git-dir)/self-review/gate.json`. In a worktree that is the worktree's own git directory, so it is per branch, never committed, and removed with the worktree. It holds the check list above plus `inputs_hash`, computed over the discovery sources that exist:

```sh
git hash-object CLAUDE.md AGENTS.md justfile Makefile package.json pyproject.toml Cargo.toml .pre-commit-config.yaml .github/workflows/* 2>/dev/null | shasum
```

If the hash differs from the stored one, re-discover. A branch that adds a linter therefore picks it up.

**Gaps.** A kind of check the project does not have is listed under "Gate gaps" in the report, as today. A discovered check that cannot run (missing tool, needs a service) is also a gap, with the reason.

## What section 1 keeps

The rule that every red result is fixed before dispatching a reviewer, the full run before READY, and the behavior run (`--behavior-cmd`, `--behavior-out`, or `--behavior-skipped "docs only"`).

## Testing the change

`superpowers:writing-skills` applies. A subagent runs the old section 1 against a repo with no `justfile` (this one), then the new text, and the new text is kept only if the discovered gate is more complete, ordered, and cached. Run `make lint-descriptions` and the link check after.

## Left to the builder

The exact wording of `mechanical-gate.md`, and the file-list flags for tools not named here.
