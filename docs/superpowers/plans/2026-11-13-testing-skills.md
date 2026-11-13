# Testing Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `testing-principles` and `testing-code` skills, and move the `test-driven-development` skill into `testing-principles`, as two stacked PRs.

**Architecture:** `SKILL.md` files route; topic reference files hold depth and load on demand. Principles hold checkable claims (P1 to P19). Code holds steps, tools, language mechanics and diagnostics. Each skill is authored RED-GREEN with `superpowers:writing-skills`.

**Tech Stack:** Markdown skills; `make lint-descriptions`; `rg` and `git grep` for checks; Sonnet subagents.

**Spec:** `docs/superpowers/specs/2026-11-13-testing-skills-design.md` (approved 2026-11-13). Read it first. The spec's reference tables, principle list and heading lists are the content contract; this plan does not restate them.

## Global Constraints

- Vocabulary: "kind" only. Never "level" or "layer" for tests. "Degrees of isolation".
- No test sizing (small/medium/large) anywhere in either skill.
- Principles IDs P1 to P19 are stable. Reference files cite them as "P7".
- Placement: principles hold no steps, tool commands or language mechanics. Code holds those. Autospec is Python-page only.
- Joe's style is house style: stubs for data, mocks for behavior, exact-call mock assertions, test-body template, mocks housed in fixtures, indirect parametrization documented and marked advanced.
- Every meaningful feature has at least a few end-to-end tests (happy path plus edge cases and errors).
- Cite and paraphrase Google's book; never copy text. ECC is MIT: adapted content carries an attribution line. Joe's private-repo names never appear; use neutral domain names.
- No ECC tooling (`/plan`, `CLAUDE_PLUGIN_ROOT`, `.claude/tdd/`).
- `SKILL.md` never force-loads references (no `@` imports). Descriptions: trigger-first, under 400 characters, hard cap 1536.
- No `version` field in any manifest.
- File links via `mdlink`. Run `no-ai-slop` then `humanizer` on every doc before committing.
- ECC links are GitHub URLs, not skill names.
- Subagents use Sonnet 5.5 (Haiku 5.5 for search). Never two agents in one working tree at once.

## Review Focus

- A test written under the skill reads the real clock or network anyway: the pressure scenario must show the agent injects a clock and blocks the network.
- A leaked patch (monkeypatch not undone, module-level assignment) survives into the next test.
- A bare `Mock` accepts a wrong call: the agent must use autospec and exact-call assertions.
- Async work waited on with `sleep`: the agent must poll with a timeout or await the event.
- A flaky test retried to green: the agent must quarantine with an owner and deadline.

Each line gets its scenario in Task 1, and its GREEN check in Task 7 (principles) and Task 15 (code).

## Branches

- PR 1: `feat/testing-skills` (worktree `.worktrees/testing-skills`, already holds the spec). Tasks 1 to 7.
- PR 2: `feat/testing-code`, a worktree `.worktrees/testing-code` branched from `feat/testing-skills` after PR 1 merges (rebase onto `origin/main` first). Tasks 8 to 15.

Reference-writing rule for every content task: read the named sources (spec "Source locations"), write to the spec's table row, keep each file focused, cite principles by ID.

---

## PR 1: testing-principles

### Task 1: Baseline pressure scenarios (RED)

**Files:**
- Create: `docs/superpowers/plans/2026-11-13-testing-skills-scenarios.md`

**Interfaces:**
- Produces: five named scenarios (`clock-network`, `leaked-patch`, `bare-mock`, `sleep-async`, `retry-to-green`), each with a prompt, a repo fixture description, and a pass/fail check. Tasks 7 and 15 reuse them.

- [ ] **Step 1: Write the five scenarios** to the file. Each: prompt given to a fresh agent, the failure behavior to look for, and the observable pass check (one line).
- [ ] **Step 2: Run each on a fresh Sonnet subagent with neither skill available.** Record verbatim whether it showed the failure and the rationalization it used.
- [ ] **Step 3: Commit** `docs(testing-skills): baseline pressure scenarios and RED results`. Expected: at least three of five scenarios show the failure; if fewer, tighten the scenario pressure and rerun before moving on.

### Task 2: testing-principles SKILL.md, test-kinds, test-structure

**Files:**
- Create: `skills/testing-principles/SKILL.md`, `references/test-kinds.md`, `references/test-structure.md`

**Interfaces:**
- Produces: `SKILL.md` carrying P1 to P19 verbatim from the spec, grouped under the spec's five headings, with a routing table to every reference file (including ones later tasks create, listed by filename). Frontmatter `name: testing-principles`, description with TDD triggers and "Not for" lines.

- [ ] **Step 1:** Write `SKILL.md` (routing-sized, principles inline, no `@` imports).
- [ ] **Step 2:** Write `test-kinds.md`: definitions of the eight kinds, outcome-to-kind matrix, which kinds per feature (P5, P6), a short note on performance/load/chaos.
- [ ] **Step 3:** Write `test-structure.md`: AAA, naming, one behavior, no logic, DAMP, failure messages, argument ordering and body shape from Joe's guide.
- [ ] **Step 4: Verify** `rg -i "test level|levels? of test|test size|small/medium/large" skills/testing-principles` prints nothing, and `make lint-descriptions` passes.
- [ ] **Step 5: Commit** `feat(testing-principles): principles, test kinds, test structure`.

### Task 3: doubles, fixtures, patches

**Files:**
- Create: `references/doubles.md`, `references/fixtures.md`, `references/patches.md` under `skills/testing-principles/`

**Interfaces:**
- Consumes: P8 to P12 wording from Task 2.
- Produces: `doubles.md` defining dummy, stub, fake, mock and spy by job and the exact-interaction rule; no Python mechanics.

- [ ] **Step 1:** Write the three files per the spec rows, language-neutral. Cross-link plainly to `testing-code` runbooks by name (not link; PR 2 converts).
- [ ] **Step 2: Verify** no mention of `autospec`, `pytest`, `mocker` in these files: `rg -i "autospec|pytest|mocker" skills/testing-principles/references` prints nothing.
- [ ] **Step 3: Commit** `feat(testing-principles): doubles, fixtures, patches`.

### Task 4: isolation, flakes, performance

**Files:**
- Create: `references/isolation.md`, `references/performance.md`, `references/flakes/categories.md`, `references/flakes/nondeterminism.md`, `references/flakes/isolation-failures.md`

**Interfaces:**
- Produces: `flakes/categories.md` as a cause-to-remedy table the `testing-code` triage runbook will cite.

- [ ] **Step 1:** Write the five files from Fowler's non-determinism article, Google's flake material (paraphrased), and Joe's guide. Include why the network is blocked in every test, and the leaked-patch and leftover-row cases.
- [ ] **Step 2: Verify** each file cites at least one principle ID and none contains a numbered procedure.
- [ ] **Step 3: Commit** `feat(testing-principles): isolation, flakes, performance`.

### Task 5: coverage, mutation, property-based

**Files:**
- Create: `references/coverage.md`, `references/mutation.md`, `references/property-based.md`

- [ ] **Step 1:** Write the three files (coverage and mutation stay separate; P7).
- [ ] **Step 2: Verify** `rg -i "small/medium/large|test size"` prints nothing across the skill.
- [ ] **Step 3: Commit** `feat(testing-principles): coverage, mutation, property-based`.

### Task 6: Merge the TDD skill, delete the old one, update references

**Files:**
- Create: `skills/testing-principles/references/test-driven-development.md`
- Delete: `skills/test-driven-development/`
- Modify: `AGENTS.md`, `README.md`, `SKILLS.md`, `skills/engineering-principles/SKILL.md`, `skills/engineering-principles/references/principles.md`, `skills/senior-engineering-best-practices/SKILL.md`, `docs/superpowers/specs/2026-11-11-engineering-principles-split-design.md`, the `reviewing-code` tests playbook

**Interfaces:**
- Consumes: old skill content and ECC `tdd-workflow` (MIT).
- Produces: merged file per spec "test-driven-development.md"; every stale path replaced by the new reference path.

- [ ] **Step 1:** Write the merged file: Iron Law, red-green-refactor, Three Laws, FIRST, AAA/GWT, rationalizations, red flags, agent rationale (Joe's), plus verified-RED gate, checkpoint commits, evidence table, runner-detection matrix, untrusted plan handoff (ECC). Replace the `waitForTimeout` example. Add the ECC MIT attribution line. Link P19.
- [ ] **Step 2:** Update the old skill's triggers into the `testing-principles` description (check it still stays under 400 characters).
- [ ] **Step 3:** Delete `skills/test-driven-development/` and update each listed file.
- [ ] **Step 4: Verify** `git grep -n "test-driven-development"` shows only the new reference filename, `superpowers:test-driven-development` mentions, and historical specs that name it deliberately; fix anything else.
- [ ] **Step 5: Commit** `refactor(skills): move test-driven-development into testing-principles`.

### Task 7: Register, GREEN run, PR 1

**Files:**
- Modify: `SKILLS.md`, `README.md`

- [ ] **Step 1:** Register `testing-principles` in `SKILLS.md` and `README.md`.
- [ ] **Step 2: Verify** `make lint-descriptions` passes; every relative link in `skills/testing-principles` resolves; the vocabulary `rg` from Task 2 prints nothing.
- [ ] **Step 3: GREEN run:** rerun the five Task 1 scenarios on fresh Sonnet agents with `testing-principles` available. Expected: each baseline failure is avoided; if not, edit the skill text for that rationalization and rerun (writing-skills REFACTOR).
- [ ] **Step 4:** Run `/self-review` (`agent-skills:self-review`), fix real findings, then open PR 1 with the PR template. The PR description lists the out-of-repo follow-ups (`agent-harness` README, `rules/ecc/common/testing.md`, `dist/CLAUDE.md`) and the `reviewing-skills` coordination note.
- [ ] **Step 5:** Run `/pr-loop` to merge, then `wt-reap testing-skills` from the main checkout and confirm the cache path under `~/.claude/plugins/cache/.../skills/testing-principles/`.

---

## PR 2: testing-code

Start: `git fetch && git worktree add .worktrees/testing-code -b feat/testing-code origin/main`.

### Task 8: testing-code SKILL.md, test-body-template, code-smells

**Files:**
- Create: `skills/testing-code/SKILL.md`, `references/test-body-template.md`, `references/code-smells.md`

**Interfaces:**
- Consumes: principle IDs from `testing-principles`.
- Produces: `code-smells.md` entries each with symptom, why it hurts, fix, principle ID; `SKILL.md` with workflow (pick the kind, read the language page, write with the template, build fixtures and doubles, check isolation and determinism, run), routing table, "Not for" lines.

- [ ] **Step 1:** Write the three files. Smells list is the one in the spec; verify any xUnit Patterns smell against the source before adding it.
- [ ] **Step 2: Verify** description under 400 characters (`make lint-descriptions`) and the sizing/level `rg` finds nothing.
- [ ] **Step 3: Commit** `feat(testing-code): skill, test body template, code smells`.

### Task 9: Per-kind runbooks, part 1

**Files:**
- Create: `references/runbooks/unit.md`, `integration.md`, `contract.md`, `functional.md`

**Interfaces:**
- Produces: each file has the nine standard headings from the spec, in order: What it proves, When to write it, Setup, Steps, Cases to cover, Doubles and patches, Determinism and isolation, Common mistakes, Done check.

- [ ] **Step 1:** Write the four runbooks.
- [ ] **Step 2: Verify** with a heading check:
  `for f in unit integration contract functional; do rg -c '^#{2,3} (What it proves|When to write it|Setup|Steps|Cases to cover|Doubles and patches|Determinism and isolation|Common mistakes|Done check)$' skills/testing-code/references/runbooks/$f.md; done` prints `9` four times.
- [ ] **Step 3: Commit** `feat(testing-code): unit, integration, contract, functional runbooks`.

### Task 10: Per-kind runbooks, part 2

**Files:**
- Create: `runbooks/end-to-end.md`, `acceptance.md`, `behavioral.md`, `property-based.md`, `mutation-testing.md`

- [ ] **Step 1:** Write the five runbooks. `end-to-end.md` adds a journey-selection section and states one happy path plus edge cases and errors per feature (P6).
- [ ] **Step 2: Verify** the same heading check prints `9` for each file.
- [ ] **Step 3: Commit** `feat(testing-code): end-to-end, acceptance, behavioral, property-based, mutation runbooks`.

### Task 11: fixtures, patching, Playwright, React runbooks

**Files:**
- Create: `runbooks/fixtures.md`, `patching.md`, `playwright.md`, `react.md`

- [ ] **Step 1:** Write the four per the spec rows. Link ECC `e2e-testing` and `react-testing` by GitHub URL (confirm the default branch first). Playwright content follows ECC's verified practices, with no `waitForTimeout`.
- [ ] **Step 2: Verify** `rg waitForTimeout skills/testing-code` only appears in an explicit anti-pattern line.
- [ ] **Step 3: Commit** `feat(testing-code): fixtures, patching, playwright, react runbooks`.

### Task 12: Flake and slow-test runbooks

**Files:**
- Create: `references/flakes/triage.md`, `tracking.md`, `quarantine.md`, `references/slow-tests.md`

**Interfaces:**
- Consumes: `testing-principles/references/flakes/categories.md`.

- [ ] **Step 1:** Write the four. `triage.md` narrows by cause category; `quarantine.md` states owner, deadline, caps by count and age, exit criteria (P15).
- [ ] **Step 2: Commit** `feat(testing-code): flake triage, tracking, quarantine, slow tests`.

### Task 13: Language pages, Python and index

**Files:**
- Create: `references/languages/index.md`, `references/languages/python.md`

**Interfaces:**
- Produces: the 13 section headings from the spec, in order, as the template every other page copies.

- [ ] **Step 1:** Write `python.md` with all 13 sections plus a `conftest.py` subsection (location, what belongs there, scoping across directories, shared hooks, keeping it small), `assert_calls_on` as a documented snippet with neutral names, autospec, indirect parametrization marked advanced, `--import-mode=importlib`, strict mode. Verify pytest 9.x docs and the patch version at write time. Link ECC `python-testing`.
- [ ] **Step 2:** Write `index.md` quick-map table (toolchain, runner, double library, property tool, mutation tool per language).
- [ ] **Step 3: Commit** `feat(testing-code): python page and language index`.

### Task 14: TypeScript and Rust pages

**Files:**
- Create: `languages/typescript.md`, `languages/rust.md`

- [ ] **Step 1:** Write both with the same 13 headings. TypeScript: vitest first on Bun, jest differences, MSW, fast-check, Stryker; says ECC has no TypeScript testing skill and links `tdd-workflow` and `e2e-testing`. Rust: cargo test, nextest, rstest, proptest, mockall; links `rust-testing`. Verify tool docs at write time.
- [ ] **Step 2: Verify** `rg -c '^## ' ` shows 13 headings on each, matching python.md.
- [ ] **Step 3: Commit** `feat(testing-code): typescript and rust pages`.

### Task 15: Shell and SQL pages, links, registration, GREEN, PR 2

**Files:**
- Create: `languages/shell.md`, `languages/sql.md`
- Modify: `SKILLS.md`, `README.md`, and PR 1 plain-text runbook mentions in `skills/testing-principles/references/*` (convert to relative links)

- [ ] **Step 1:** Write shell (bats-core, shellcheck, `PATH` stubbing) and sql (pgTAP, rollback isolation, migration tests) with the 13 headings and the "no ECC skill" line plus `tdd-workflow` link.
- [ ] **Step 2:** Convert each plain-text `testing-code` runbook mention in `testing-principles` to a relative link (build each with `mdlink`).
- [ ] **Step 3:** Register `testing-code` in `SKILLS.md` and `README.md`.
- [ ] **Step 4: Verify** all spec Acceptance checks: sizing/level `rg` empty; `make lint-descriptions` passes; all relative links resolve; every language page has the 13 headings; every runbook has the nine headings; each language page links its ECC skill or says none exists.
- [ ] **Step 5: GREEN run:** rerun the five scenarios with both skills available on fresh Sonnet agents; also check descriptions trigger on "write tests for X", "flaky test", "slow tests", "red green refactor" and not on diff review. Fix and rerun on any miss.
- [ ] **Step 6:** `/self-review`, fix real findings, open PR 2, `/pr-loop` to merge, `wt-reap testing-code`, confirm the cache path for both skills.

---

## Self-review notes

- Spec coverage: principles (T2), all reference rows (T2 to T5, T8 to T15), TDD move and reference list (T6), runbook headings (T9, T10), language sections and ECC links (T13 to T15), conftest.py (T13), registration (T7, T15), delivery, acceptance and open items (verified in T7, T11, T13, T15).
- Open items (SWE book license, ECC default branch, pytest patch version) are checked inside T4, T11 and T13 when the content is written.
