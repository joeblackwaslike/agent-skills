# skill-principles and reviewing-skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two skills, `skill-principles` (the written standard for skills) and `reviewing-skills` (the review process, gate, reviewer templates and report script), and wire them into `/self-review` so a diff touching `skills/` gets a skill-aware review.

**Architecture:** Mirror `engineering-principles` and `reviewing-code`. All review knowledge lives in the skills. A TypeScript gate (`skill-check.ts`) does the mechanical checks, a forked `report.ts` emits the verdict, and four reviewer prompt templates are dispatched by `/self-review` or `/review-skill`. Worktree `.worktrees/reviewing-skills`, one branch, one PR.

**Tech Stack:** Markdown skills, TypeScript on Bun (`bun test`), the existing `scripts/lint-descriptions.py`, pyright and tsc via `bunx` for block checks.

**Spec:** `docs/superpowers/specs/2026-11-12-reviewing-skills-design.md` (fixtures in `docs/superpowers/specs/2026-11-12-reviewing-skills-fixtures/`)

## Global Constraints

- Directory name equals frontmatter `name`; uppercase `SKILL.md`; `metadata.last_updated` set; no `version` field in any manifest.
- Descriptions are trigger-first ("Use when..."), contain "Not for X (use Y)" in both directions, stay under 400 characters, and never summarize the workflow. `make lint-descriptions` passes.
- `SKILL.md` stays short and routes to references; no `@path` force-loads; total size well under 20,000 bytes. No line-count targets for references.
- Severity vocabulary is blocker, major, minor, nit. Authority vocabulary is gate, guidance, informational.
- `report.ts` is a self-contained fork, with no import across skill folders.
- Reviewers and scenario agents run on an explicit model (Sonnet by default).
- Prose in every doc goes through `no-ai-slop` then `humanizer`. No colon-reveal lead-ins, no "load-bearing" as a metaphor, no "quietly".
- File links in docs use relative paths that resolve. Any doc skill text is written under RED/GREEN (`superpowers:writing-skills`): a pressure scenario that fails without the text, passes with it.
- Third-party fixtures (Superpowers 7.0.1 cache, ECC `d2ef2680`) are read in place, never vendored.

## Review Focus

- A skill with no `references/` directory: `skill-check` must not crash.
- A skill outside any git repo or plugin: registry and overlap checks skipped with a stated reason, exit code unaffected.
- Missing pyright or tsc: block reported `SKIPPED (not checked)` and listed as a gate gap, never green.
- A code fence with an unknown language tag or no tag: ignored, not failed.
- A `# fragment` marker that is not on the first line of the block: block is checked, not skipped.
- `report.ts` called with `--verdict ready` and open majors: must refuse, as `reviewing-code`'s does.

## File Structure

```
skills/skill-principles/SKILL.md
skills/skill-principles/references/principles.md
skills/reviewing-skills/SKILL.md
skills/reviewing-skills/references/{review-runbook,mechanical-gate,pressure-scenarios,review-guide,checklist,worked-example}.md
skills/reviewing-skills/references/playbooks/{index,doc-wrapper,discipline-skill,workflow-skill,router-skill,reference-catalog,command-and-hook,agent-pipeline}.md
skills/reviewing-skills/scripts/{skill-check.ts,skill-check.test.ts,report.ts,report.test.ts}
commands/review-skill.md
```

Modified: `skills/reviewing-code/SKILL.md`, `skills/reviewing-code/references/self-review.md`, `skills/reviewing-code/references/playbooks/skills-and-instruction-files.md`, `skills/authoring-agent-skills/SKILL.md`, `skills/agent-instructions/SKILL.md`, `SKILLS.md`, `README.md`.

Task order follows the spec's build order. Tasks 1 to 4 can each be reviewed alone; Task 7 depends on all of them.

### Task 1: skill-principles

**Files:**
- Create: `skills/skill-principles/SKILL.md`, `skills/skill-principles/references/principles.md`

**Interfaces:**
- Produces: the ten principles, numbered 1 to 10 as in the spec, plus the "Which principles apply" paragraph, the single authority vocabulary, and the `fragment` marker rule. Later tasks cite principle numbers.

- [ ] **Step 1: RED.** Write 3 pressure scenarios (a rule agents break under time pressure; a skill whose description summarizes its workflow; a gate worded as "should") and run each against a fresh Sonnet agent with no standard, asking it to write or review a skill. Save the baseline failures to the scratchpad.
- [ ] **Step 2: Write `principles.md`.** One section per principle with a short Wrong and Right pair, restated in this repo's words from the sources the spec lists (`authoring-agent-skills`, `agent-instructions`, `skill-development.md`, `superpowers:writing-skills`, Superpowers repo, ECC). Include the "Which principles apply" paragraph and the `fragment` marker rule. Do not repeat the unverified persuasion-study figures as fact.
- [ ] **Step 3: Write `SKILL.md`.** Name `skill-principles`, description under 400 characters naming `reviewing-skills` and `authoring-agent-skills` as exclusions, the ten principles in short form, a "What to load" table, related skills.
- [ ] **Step 4: GREEN.** Rerun the 3 scenarios with the skill loaded; each baseline failure must change. Record before and after in the scratchpad and the PR description.
- [ ] **Step 5: Verify.** Run `make lint-descriptions`; expect pass for this skill. Commit.

### Task 2: skill-check gate

**Files:**
- Create: `skills/reviewing-skills/scripts/skill-check.ts`, `skills/reviewing-skills/scripts/skill-check.test.ts`
- Source to promote: `docs/superpowers/specs/2026-11-12-reviewing-skills-fixtures/verify-blocks.prototype.ts`

**Interfaces:**
- Produces: CLI `bun skill-check.ts <skill-dir> [--json] [--repo <path>] [--no-blocks]`. Exit 0 when no check is red, 1 otherwise. Exported `checkSkill(dir: string, opts: { repo?: string; blocks?: boolean }): Report` where `Report = { checks: Check[]; gaps: string[] }` and `Check = { id: string; status: "pass" | "fail" | "warn" | "skipped"; detail: string }`.

- [ ] **Step 1: Write failing tests** in `skill-check.test.ts` using fixture skills built in temp dirs. Cases: bad frontmatter key fails; `name` not equal to directory fails; broken relative link fails; orphan reference warns; byte size over 20,000 fails; description over 400 characters warns; missing `SKILLS.md` row fails when a repo is found; a skill outside a repo skips registry and overlap with a stated reason; a python block with a type error fails; a block starting `# fragment` is skipped; a `# fragment` on line 2 is checked; a missing checker yields `skipped` and appears in `gaps`; the diagram and defense heuristics fire only for discipline and workflow skills; no crash without `references/`.
- [ ] **Step 2: Run** `bun test skills/reviewing-skills/scripts/skill-check.test.ts`; expect FAIL (module missing).
- [ ] **Step 3: Implement** `checkSkill` and the CLI. Reuse `python3 -I scripts/lint-descriptions.py` for description thresholds (shell out, do not reimplement). Find the repo root by walking up to `.claude-plugin` or the git root. Python blocks run pyright non-strict; TypeScript blocks run tsc strict; bash blocks run `bash -n`; JSON blocks are parsed; each via `bunx` where applicable. Description overlap is Jaccard 0.4 on stopword-stripped tokens, advisory. Heuristics per spec step 2.
- [ ] **Step 4: Run** the tests; expect PASS. Then run `bun skill-check.ts skills/design-patterns`; expect exit 0 or only advisories.
- [ ] **Step 5: Commit.**

### Task 3: report.ts fork

**Files:**
- Create: `skills/reviewing-skills/scripts/report.ts`, `skills/reviewing-skills/scripts/report.test.ts`
- Source to fork: `skills/reviewing-code/scripts/report.ts` and its test

**Interfaces:**
- Produces: the same CLI flags and READY or NOT READY rule as `reviewing-code`'s, plus `--scenarios TEXT` (results table or "off") and `--gate-skipped N`. READY is refused when `--open-major` is above 0.

- [ ] **Step 1: Copy** both files, adapt header text to skills, add the two flags with a failing test for each.
- [ ] **Step 2: Run** `bun test skills/reviewing-skills/scripts/report.test.ts`; expect FAIL on the new flags.
- [ ] **Step 3: Implement** the two flags; keep every other behavior byte-compatible.
- [ ] **Step 4: Run** the tests; expect PASS. Commit.

### Task 4: reviewing-skills core docs

**Files:**
- Create: `skills/reviewing-skills/SKILL.md`, `references/review-runbook.md`, `references/mechanical-gate.md`, `references/review-guide.md`, `references/checklist.md`, `references/pressure-scenarios.md`

**Interfaces:**
- Consumes: Task 1 principle numbers; Task 2 CLI and `Report`; Task 3 flags.
- Produces: the eight-step procedure; four reviewer prompt templates (instruction-quality, content, routing and overlap, pipeline) each ending in the finding format (severity, location, quoted evidence, failure mode, current and recommended authority, replacement text); the sequential fallback for platforms without a subagent tool; the `/self-review` trigger rules text that Task 7 copies.

- [ ] **Step 1: RED.** Run 3 fresh Sonnet agents asked to review `skills/design-patterns/SKILL.md` and two reference files with only the old `skill-reviewer` prompt. Record what they miss against the ground-truth tuning half.
- [ ] **Step 2: Write the docs.** `SKILL.md` follows `reviewing-code/SKILL.md`'s shape: procedure, reviewer table, references list. Reviewer templates withhold the author's reasoning, name the model, and require quoted evidence. Pressure-scenario doc defines the results table (scenario, arm, verdict, quoted line), at least 2 runs per arm, and the major-finding rules for a failed skill arm and a triggered negative control.
- [ ] **Step 3: GREEN.** Rerun the same agents with the templates; findings recall on the tuning half must rise. Record the numbers.
- [ ] **Step 4: Verify.** `bun skills/reviewing-skills/scripts/skill-check.ts skills/reviewing-skills`; expect no red. Commit.

### Task 5: playbooks

**Files:**
- Create: `skills/reviewing-skills/references/playbooks/{index,doc-wrapper,discipline-skill,workflow-skill,router-skill,reference-catalog,command-and-hook,agent-pipeline}.md`

**Interfaces:**
- Consumes: principle numbers from Task 1. `index.md` maps a skill kind to one playbook, same shape as `reviewing-code`'s playbook index. `agent-pipeline.md` links to `reviewing-code`'s `agent-workflows.md` and `llm-prompts.md` rather than copying them.

- [ ] **Step 1: Write each playbook** as the checks that apply to that kind, with which principles apply (per the "Which principles apply" paragraph), one real example drawn from this repo or the fixtures, and what to check that the files cannot show. The exact list may merge if two overlap more than they differ.
- [ ] **Step 2: Verify** every link resolves via `skill-check`. Commit.

### Task 6: worked example and acceptance runs

**Files:**
- Create: `skills/reviewing-skills/references/worked-example.md`

**Interfaces:**
- Consumes: everything above. Produces the six acceptance results in the spec, with versions, paths, and the hidden-half score.

- [ ] **Step 1: Split** the 33 eligible ground-truth issues into tuning and held-out halves (controller only; implementers see the tuning half). Record the split in the scratchpad, not the repo.
- [ ] **Step 2: Run acceptance 1** on the design-patterns files at the three commits, 3 runs, judged by a fresh Sonnet agent that is not the builder. Pass at 80% of majors and 50% of the rest on the held-out half in 2 of 3 runs. On a miss, iterate prompts and playbooks, up to 3 rounds, then report NOT READY with the numbers.
- [ ] **Step 3: Acceptance 2, 3, 4, 6** as written in the spec (three Superpowers skills, two ECC stubs with expected lists committed first, the named mutation, the known-hole scenario).
- [ ] **Step 4: Write `worked-example.md`** with real findings from the design-patterns run and all six results tables. Commit.

### Task 7: wiring, registry, command

**Files:**
- Create: `commands/review-skill.md`
- Modify: the files listed under Modified in File Structure

**Interfaces:**
- Consumes: the trigger rules text from Task 4. `/review-skill <name|path> [--scenarios]` loads `reviewing-skills` and runs it.

- [ ] **Step 1: Edit `reviewing-code/SKILL.md` step 8 table:** replace the `skill-reviewer` row with a `reviewing-skills` row (always keep, dispatch a `general-purpose` agent told to load the skill and run one role) and place the pipeline, routing and content roles after `agent-evaluator` and `type-design-analyzer` in the drop order, as the spec's Wiring section states.
- [ ] **Step 2: Edit `self-review.md`** step 1 (run `skill-check` for diffs under `skills/`) and step 2 (the dispatch rules, 20-line rule with the description override, `code-reviewer` still runs). Mark the wiring Claude-only.
- [ ] **Step 3: Update** `skills-and-instruction-files.md` to link to `reviewing-skills`; add related-skills links in `authoring-agent-skills`, `agent-instructions`, `reviewing-code`; add rows to `SKILLS.md` and `README.md` for both skills; write `commands/review-skill.md`.
- [ ] **Step 4: Verify.** `make lint-descriptions` passes; every changed link resolves; `bun test` passes for both scripts. Commit.

### Task 8: doc pass and dogfood

**Files:**
- Modify: every new `.md` in this plan

- [ ] **Step 1: Run `no-ai-slop` in edit mode, then `humanizer`** on each new doc; keep only the merged change list.
- [ ] **Step 2: Dogfood (acceptance 5).** Run `skill-check` and the reviewers on both new skills; fix real findings; a fresh Sonnet agent cross-checks the final findings; no open majors.
- [ ] **Step 3: Record** results in `worked-example.md`. Commit. The controller then runs `/self-review` on the branch and `/pr-loop`.

## Plan self-review

Spec coverage: principles (T1), gate (T2), report (T3), procedure and templates and scenarios (T4), playbooks (T5), six acceptance runs (T6), wiring, registry, command (T7), docs pass and dogfood (T8). The `agent-harness` thin-agent PR is explicitly outside this plan and lands after it.
