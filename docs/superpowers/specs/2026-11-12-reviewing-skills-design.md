# Design: `skill-principles` and `reviewing-skills`

Tracked as bead agent-skills-4a4.

## Intent and why

Skills rarely change agent behavior as much as their authors expect. A new skill reads well to its author and then gets rationalized around, misread, or never triggered. The skills that do work (Superpowers, the best of ECC) got that way through repeated contact with real agents: their rationalization tables, Red Flags lists and gates are a record of how agents tried to skip them.

The repo has `reviewing-code` for diffs and nothing equivalent for skills. The `skill-reviewer` agent reads one file, `SKILL.md`, and the `reviewing-code` table dispatches it only when `SKILL.md` itself changes. The 24-file design-patterns PR never triggered it, and its six reviewers found about 100 defects that a skill-aware reviewer should have caught: prose that disagreed with its code, examples that committed the smell they warned about, thresholds that conflicted between files, guidance worded as gates that agents could skip.

This design adds two skills, mirroring `engineering-principles` (the standard) and `reviewing-code` (the process):

- `skill-principles`: a written standard for what makes a skill's instructions work.
- `reviewing-skills`: the process that reviews a skill against that standard, with a mechanical gate, playbooks, reviewer prompts and pressure scenarios.

## Goals

1. Review a whole skill directory (`SKILL.md`, references, scripts, commands, registry rows), not one file.
2. Judge how instructions are written as well as whether they are well formed:
   - **Authority.** Is each instruction worded at the strength its stakes call for? A critical rule is a gate. A minor preference is softer. Flag a critical rule worded weakly and a minor one worded as a gate.
   - **Rationalization risk.** Find instructions an agent can easily argue its way around, and say which defense is missing (a rationalization table, a Red Flags list, an explicit loophole closer, a predicate).
   - **Contradictions, vagueness, missing specifics.** Two thresholds for one rule, a rule with no observable trigger, a step with no owner.
   - **Diagrams.** A flow with branches or loops and no diagram, or a diagram wrapped around something linear.
   - **Examples.** Good and bad pairs, quality, diversity, overfitting to one case, whether they run.
   - **Agent pipelines.** Where a skill orchestrates agents: roles, handoff files, verdict vocabulary, approve or send-back loops, round caps, escalation, model per role.
3. Back findings with evidence. Pressure scenarios run fresh agents with and without the skill and record what they did.
4. Give every finding a concrete stronger wording, so the reviewed skill ends up better than its author would have made it.
5. Run in two ways: on demand against any skill, and automatically inside `/self-review` whenever a diff touches files under `skills/`, as an important reviewer next to `code-reviewer`.
6. Be as good at skills as `reviewing-code` is at diffs. That means the same parts: procedure, mechanical gate, playbooks per kind of skill, reviewer prompts that withhold the author's reasoning, a tested report script, a worked example.

## Non-goals and anti-goals

- No automatic improve loop (rewrite, rerun scenarios, keep what helps). That is a later opt-in mode once the reviewer proves itself. The reviewer reports and proposes wording; it does not edit the skill.
- Not a style linter. A finding must name a failure mode (a way an agent will misbehave or misread), not a preference.
- Not a replacement for ECC's `skill-stocktake` (keep, improve, retire, merge) or `skill-comply`. Borrow their ideas; do not depend on ECC's repo or conventions.
- Not a blocker by itself. It reports READY or NOT READY like `/self-review`; merging stays the author's call.
- Anti-goal is noise. Authority calibration is judgment. A reviewer that flags every `should` as too weak is worse than none. Every authority finding cites the stakes and the failure it expects.
- No new runtime dependency. The gate script uses Bun and tools already installed.

## Constraints

- Both skills use the capability-name archetype: `skill-principles`, `reviewing-skills`. Directory name equals frontmatter `name`, uppercase `SKILL.md`, `metadata.last_updated`, no `version` field.
- Descriptions are trigger-first, "Use when...", with "Not for X (use Y)" in both directions, under 400 characters (`make lint-descriptions`). A description never summarizes the workflow (Superpowers found agents follow the description instead of the body).
- `SKILL.md` stays short and routes to references ("read X when Y"). No `@path` force-loads. Total `SKILL.md` size well under 20,000 bytes.
- No arbitrary length target for references. Line count is a rough proxy for complexity; write what the content needs.
- All review knowledge lives in the `reviewing-skills` skill: the procedure, the reviewer prompt templates (one per role, plus a shared block), the playbooks and the finding format. An agent holds none of it, because an agent only uses what its prompt drives it to read, and a skill can be loaded by anything (Claude, Codex, Gemini, a subagent). Reviewers are dispatched on an explicit model (Sonnet by default) using the skill's templates, the way `self-review.md` does today.
- The `skill-reviewer` agent in `agent-harness` shrinks to a thin runner of about ten lines: load `reviewing-skills`, take the role and target path from the caller's prompt, follow the skill, return its output. Each reviewer role is dispatched as this one agent with a different template. It is a separate repo, so it is a second small PR that lands after this one. The skill works without it, because a `general-purpose` agent whose whole prompt is the filled role template does the same job. The template is the whole instruction, so the dispatched agent never loads the skill.
- TypeScript on Bun for scripts, with `bun test`, matching `reviewing-code/scripts/report.ts`.
- Prose follows the repo rules: `no-ai-slop` then `humanizer` on every doc, no colon-reveal lead-ins, no "load-bearing" as a metaphor, no "quietly".

## Approaches considered

1. **Mirror `reviewing-code` with two new skills** (chosen). The standard and the process are separate, as `engineering-principles` and `reviewing-code` already are. The standard also helps people write skills. Largest build, but the shape is proven in this repo.
2. Grow existing pieces: put the standard into `authoring-agent-skills` and upgrade the `skill-reviewer` agent in `agent-harness`. Smallest build. It mixes repo structure and naming with instruction craft, gives no on-demand skill and no gate step, and splits the work across two repos.
3. Adopt ECC's `skill-stocktake` and `skill-comply` and write only the instruction-quality layer. Least to build. It couples this repo to ECC's layout, and neither tool checks authority, rationalization risk, contradictions or example quality.

## Design

### `skill-principles` (the standard)

`SKILL.md` carries the ten principles in short form and a "What to load" table. `references/principles.md` holds the detail, one section per principle, each with a short "Wrong" and "Right" pair. Every principle is restated in this repo's words; sources are cited by path and URL but nothing is load-by-link only, so the standard stays usable offline and in Codex.

1. **Authority matches stakes.** Grade the device by failure type (Superpowers `writing-skills`): a rule broken under pressure gets a prohibition plus a rationalization table; a wrong output shape gets a positive recipe; an omitted element gets a required template slot; conditional behavior gets a predicate. MUST and NEVER are rationed (a Superpowers observation, 0 to 2 per skill in its best skills, not a rule of this repo's own skills); the strongest gates (Iron Law, HARD-GATE) are reserved for rules whose violation is expensive. No nuance clauses.
2. **Instructions survive rationalization.** Rationalization tables (excuse and reality), Red Flags lists, explicit loophole closers ("delete means delete"), and a record of excuses seen in testing. A mature skill has them; their absence marks a skill that has not met real agents yet.
3. **Specific and consistent.** One threshold per rule, one owner per rule, an observable trigger for each conditional, no contradictions between `SKILL.md`, references, siblings and the project rules.
4. **The description is a trigger.** "Use when...", third person, conditions only, never the workflow. Exclusions point both ways to sibling skills.
5. **Progressive disclosure.** A short body that routes, references loaded on demand, no force-loads, size caps.
6. **Flow made visible.** A diagram for non-obvious decisions and loops that can stop early, none for reference material, code or linear steps. Mermaid is the default in this repo; Graphviz and ASCII are acceptable if consistent within a skill.
7. **Examples teach.** One excellent example beats several mediocre ones. Paired good and bad examples, varied enough not to overfit, runnable and checked.
8. **Evidence over belief.** A skill is tested the way code is: run an agent without it (RED), with it (GREEN), under combined pressure, and with a control that must not trigger it.
9. **Agent pipelines are specified.** Roles, models, handoff files, a fixed verdict vocabulary, scoped re-review, round caps with a stated breaker, escalation rules, and no sub-dispatch from workers (the Superpowers `subagent-driven-development` pattern).
10. **Verification is built in.** A skill that claims an outcome includes a check the agent runs and a reviewer can rerun.

**Which principles apply.** Principles 3 to 7 and 10 apply to every skill. Principles 1, 2, 8 and 9 apply to discipline and workflow skills and to agent pipelines. A doc-wrapper or reference catalog is not flagged for a missing rationalization table. **One authority vocabulary.** Findings rate current and recommended authority as gate, guidance or informational. The devices in principle 1 (prohibition, positive recipe, template slot, predicate) are how a gate or guidance is written, not a second scale. **Severity** is blocker, major, minor or nit, the same as `reviewing-code`.

Sources: `authoring-agent-skills`, `agent-instructions`, `best-practices-for-agentic-development/references/skill-development.md`, `superpowers:writing-skills` and its references (testing with subagents, persuasion principles, discovery, flowcharts), the Superpowers repo ([obra/superpowers](https://github.com/obra/superpowers)), and ECC ([affaan-m/ECC](https://github.com/affaan-m/ECC), its `SKILL-DEVELOPMENT-GUIDE.md`, `skill-stocktake`, `skill-comply`). The persuasion-principles study figures (33% to 72% compliance) are cited by the source and not verified here; the standard does not repeat them as fact.

### `reviewing-skills` (the process)

Layout, mirroring `reviewing-code`:

```
skills/reviewing-skills/
  SKILL.md                     the procedure, reviewer table, links
  references/
    review-runbook.md          the orchestration: dispatch, sharding, triage and fix rules
    reviewer-templates/        one prompt file per role
      common.md  instruction-quality.md  content.md
      routing-and-overlap.md  pipeline.md  claim-verifier.md
    mechanical-gate.md         what skill-check runs and how to read it
    pressure-scenarios.md      how to write and run scenarios; fixture and result format
    review-guide.md            how to read a skill and write up findings
    checklist.md               condensed final pass
    worked-example.md          the design-patterns branch review, with real findings
    playbooks/
      index.md  doc-wrapper.md  discipline-skill.md  workflow-skill.md
      router-skill.md  reference-catalog.md  command-and-hook.md  agent-pipeline.md
  scripts/
    skill-check.ts  skill-check.test.ts
    report.ts       report.test.ts
commands/review-skill.md       on-demand entry point (/review-skill <name|path>)
```

**Procedure** (the eight steps, adapted):

1. **Size and intent.** State in one sentence what behavior the skill should change and for whom; name the kind of skill. A skill that cannot be summarized this way is not ready.
2. **Mechanical gate** (`skill-check.ts`, no LLM tokens). Frontmatter present and exact; `name` equals directory; description thresholds (reuse `make lint-descriptions`, do not reimplement); `SKILL.md` byte size; every relative link resolves; orphan references (files nothing routes to); registry rows in `SKILLS.md` and `README.md`; description overlap with sibling skills (token overlap, advisory only); fenced code blocks extracted and checked (the `verify-blocks` prototype from the design-patterns work, committed beside this spec as `verify-blocks.prototype.ts`, promoted). Python and TypeScript blocks are type-checked, bash blocks get `bash -n`, JSON blocks are parsed. A block whose first line is `# fragment` or `// fragment` is skipped, and `skill-principles` documents that marker. Pyright runs in non-strict mode, and a deliberately partial teaching snippet carries the `fragment` marker. When a checker is missing (pyright, tsc, bash), that block prints `SKIPPED (not checked)`, never fails the gate and never counts as green: `report.ts` lists it under gate gaps. `bunx` needs the network on first use, and the output says so when offline. Two advisory heuristics. The diagram heuristic is off only for the doc-wrapper and reference-catalog kinds: a `SKILL.md` body with three or more lines using `if`, `otherwise`, `repeat` or `until` and no `mermaid` or `dot` block is flagged for a missing diagram. The defense heuristic applies only to discipline and workflow kinds: a skill of either kind with no heading containing `Red Flags`, `Rationalization` or `Excuse` is flagged for a missing defense. Fix every red result before reading further.
3. **Read against `skill-principles`** in order: routing and description first, then authority, rationalization, specificity and contradictions, examples, diagrams, pipelines.
4. **Check what the files cannot show.** Sibling skills with overlapping triggers, project rules the skill contradicts, commands and scripts it calls, versions and library claims (verified against current docs).
5. **Pressure scenarios.** Three kinds per skill, recorded to a results file: baseline versus skill (what changed in behavior), a negative control (a realistic request that must not trigger the skill), and an adversarial scenario with combined pressure (time, sunk cost, authority). Fresh Sonnet agents, scenario prompts that name the skill path to read first. Default off inside `/self-review` for cost, on in `/review-skill` with `--scenarios`; a scenario cap defaults to 8. Each scenario runs at least twice per arm. Results go in a table of scenario, arm, verdict and the quoted agent line. A skill arm that still violates the rule is a major finding; a negative control that triggers the skill is a major routing finding.
6. **Matching playbooks** per kind of skill, applied on top of the principles.
7. **Reviewer agents**, dispatched in parallel, one template per role under `references/reviewer-templates/` (the shared `common.md` plus a file per role), orchestrated by `references/review-runbook.md`:
   - *instruction-quality* (authority, rationalization, contradictions, specificity, each finding with stronger wording and a rating of current versus recommended authority: gate, guidance, or informational);
   - *content* (examples, code, claims, prose that disagrees with code), leaving per-language review to the calling session, which dispatches the `reviewing-code` language reviewers whose triggers match; they count toward the cap;
   - *routing and overlap* (description versus siblings, trigger precision, collisions);
   - *pipeline* (only when the skill orchestrates agents).
   Without a subagent tool (Codex, Gemini), run the roles one after another in a single session, re-reading the files fresh for each role.
8. **Report** via `report.ts`: READY or NOT READY, checks run, scenario results, findings fixed or declined with a reason, open majors.

**Finding format.** Severity, location, evidence quoted, the failure mode ("an agent will skip X when Y"), the current authority and the recommended one, and a proposed replacement text. A rationalization-risk finding names the missing defense and drafts the table row.

### Wiring

- `reviewing-code/SKILL.md` step 8 table: add `reviewing-skills` for diffs that add or edit any file under `skills/` (not only `SKILL.md`), marked always-keep like `code-reviewer`. The existing `skill-reviewer` row is replaced by this one. The dispatch target is a `general-purpose` agent whose whole prompt is the filled role template (the agent is not told to load the skill), so nothing waits on the agent-harness PR. Once the thin `skill-reviewer` lands, it becomes the target.
- `reviewing-code/references/self-review.md`: when the diff touches `skills/`, step 1 also runs `skill-check`, and step 2 dispatches the `reviewing-skills` reviewers alongside `code-reviewer`. They count toward the cap of 6. `code-reviewer` still runs on a skills-only diff. The instruction-quality reviewer is always kept, at the same priority as `code-reviewer`. The content reviewer runs when references or scripts changed. The routing reviewer runs when a description changed or a skill was added. The pipeline reviewer runs only when the skill dispatches agents. The 20-line count covers lines changed under `skills/**`, excluding the registry files; a changed description overrides it and still triggers the routing reviewer. Below 20 lines, only the gate and the instruction-quality reviewer run, plus the routing reviewer for a changed description. In the drop order, the three roles go after `agent-evaluator` and `type-design-analyzer` and before the language reviewers, in this order: pipeline, routing, content. The wiring is Claude-only; the skill works elsewhere without it.
- `reviewing-code/references/playbooks/skills-and-instruction-files.md` (17 lines today) keeps its short role and links to `reviewing-skills` for depth. `agent-workflows.md` and `llm-prompts.md` stay, linked from the pipeline playbook.
- Related-skills links added to `authoring-agent-skills`, `agent-instructions` and `reviewing-code`, plus rows in `SKILLS.md` and `README.md`.

### Operating details

- `report.ts` in `reviewing-skills` is a self-contained fork of the one in `reviewing-code`, with the same severity model (blocker, major, minor, nit) and READY or NOT READY rule. Codex links skills individually, so a relative import across skill folders would break there. The duplication is accepted.
- `skill-check` runs with `bun` and finds the repo root by walking up from the skill path to the nearest `.claude-plugin` directory or git root. A `--repo <path>` flag overrides the root. Given a skill outside any repo, it skips the registry-row and sibling-overlap checks and says so in its output. Flags: `--json`, `--repo <path>`, `--no-blocks`. The overlap check starts at a Jaccard score of 0.4 on description tokens with stopwords removed, tunable, advisory only.
- The portable entry point is the skill itself, invoked by name in Claude Code, Codex and Gemini. `/review-skill` is a thin Claude Code wrapper around it. The runbook states that reviewers and scenario agents run on Sonnet where the platform lets you choose a model.

## Acceptance (how we know it works)

The reviewer is tested like a skill. Pass criteria, all recorded in `worked-example.md`:

All six runs gate the PR. The builder iterates the reviewer prompts and playbooks until each passes, up to three rounds per criterion; if one still fails after that, the PR reports it NOT READY with the numbers rather than lowering the bar. Results are recorded in `worked-example.md`.

1. **Recall on a known set.** Run it on the design-patterns files as they stood before the review fixes (commits `2e8f239d`, `d15e9b3a` and `2a3ed18d`, one per slice). Score it against the ground-truth list committed with this spec, `docs/superpowers/specs/2026-11-12-reviewing-skills-fixtures/design-patterns-findings.md`: 48 distinct issues after merging the duplicates among the six reviewers' roughly 100 raw findings. The denominator is the 33 issues a reviewer can find from a file snapshot without language-specific help: everything but class C (12), and also excluding #42 (needs web checks), #47 and #48 (process failures, not file content). #41 (README registration) counts and is found by the gate. The controller splits the 33 into a tuning half and a held-out half; the builder sees only the tuning half. Scored two ways, in 2 of 3 runs on the held-out half. **Floor against the list:** at least 4 of every 6 majors (about two thirds), matched by a fresh Sonnet judge that is not the builder (same file, same defect). **Verified defects:** the judge checks every finding against the files, and at least 90% must be real and at least 15 real defects must be found per run, whether or not they are on the list. The list has 33 rows and each run finds dozens of real defects outside it, so recall against the list alone undercounts a reviewer that is working. The bar was changed from 80% of majors and 50% of the rest after the tuning half showed run-to-run swings of two majors on identical templates and about 70 real off-list defects per run (Joe's call, recorded in `worked-example.md`).
2. **Quiet on strong skills.** Run it on three Superpowers skills (`test-driven-development`, `verification-before-completion`, `systematic-debugging`, Superpowers 7.0.1 in the plugin cache). A fresh Sonnet judge checks every finding against the files. It passes when, pooled across the three skills, at least 90% of the findings are real and no finding is rated major unless the judge confirms it is a real major. Per-skill numbers are reported but not scored, because a skill with two or three findings turns one borderline call into a 50% or 67% score. There is no cap on the count, because a longer skill has more places to be wrong; the verified count per 100 lines of the skill is reported next to the result, not scored. The first version of this criterion capped findings at three per skill. It failed `test-driven-development` (14) and `systematic-debugging` (24) because they contain real bugs the judge confirmed, so the cap penalized a correct reviewer (Joe's call, recorded in `worked-example.md`).
3. **Loud on weak skills.** Run it on two ECC stubs (`nanoclaw-repl`, `orch-fix-defect`, ECC commit `d2ef2680`). The builder writes each stub's expected-weakness list from reading it, commits it in `worked-example.md` before the run, and the reviewer must flag at least three of the four: missing trigger, missing examples, missing verification, missing rationalization defense.
4. **Mutation test.** Take a strong skill, delete one rationalization-table row and soften one gate to "should". `worked-example.md` names the skill and the two mutations before the run, and the reviewer is a fresh agent that has not seen the original. It must flag both.
5. **Dogfood.** Run it on its own two skills as part of the PR's `/self-review`; no open majors after a fresh Sonnet cross-check of the findings.
6. **Scenarios.** Take one skill with a known rationalization hole (a rule an agent breaks under time pressure). The baseline arm must fail and the skill arm must pass, at least twice each, recorded in the results table.

Also required: `skill-check.test.ts` and `report.test.ts` pass, `make lint-descriptions` passes, every relative link resolves.

The third-party fixtures are not vendored. The runs read them from the local Superpowers cache and ECC checkout, and `worked-example.md` records the versions and paths used so a rerun can reproduce them. These runs are done by the builder on this machine and are not part of CI.

## Delivery

One branch, one PR, per repo convention: this spec first, then the plan, then the work. Build order inside the PR: `skill-principles`, then `skill-check.ts` with tests, then `reviewing-skills` references and playbooks, then the wiring edits, then the worked example and acceptance runs. Execution uses subagent-driven development, with `skill-principles` and the reviewer prompts written under the RED/GREEN discipline in `superpowers:writing-skills` (a pressure scenario that fails without the text, passes with it). This PR exceeds the 400-line size gate in `self-review.md` on purpose. Joe's standing rule is one PR per skill, and the gate there is waived for it on that authority; the limit that still binds is the review bot's 200,000-character budget, which the files stay under. The `skill-reviewer` agent slimming is a separate PR in `agent-harness`, after this one.

## Left to the builder

The exact playbook list and their wording, the scenario fixture file format, flag names for `/review-skill` (its file is `commands/review-skill.md` at the repo root), whether the instruction-quality and content reviewers merge for small skills, and the worked-example write-up of the design-patterns findings.
