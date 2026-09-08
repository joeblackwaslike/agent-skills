# Skill Development

Use this when creating, editing, auditing, packaging, or testing agent skills.

## Core Model

Skills are behavioral code. Treat meaningful skill changes like production changes:

- Define the target behavior.
- Write a failing behavioral test or pressure scenario.
- Add the smallest skill text that changes behavior.
- Re-test under pressure.
- Refactor to close loopholes.
- Package with progressive disclosure.

## When To Create a Skill

Create a skill when:

- A workflow is reusable across projects.
- Agents repeatedly skip, misunderstand, or improvise a process.
- Tool usage has non-obvious constraints.
- A domain requires structured gates, templates, or references.
- A learned failure mode should be prevented in future sessions.

Do not create a skill for:

- One-off project facts.
- Standard practices the model handles reliably.
- Mechanical constraints better enforced by scripts or hooks.
- A long narrative of one solved problem.
- A giant preference document.
- A capability the host platform is actively standardizing into a native primitive — migrate to it quickly once it ships, even mid-flight.

Retire a skill once it is outclassed by a purpose-built replacement rather than keeping a fragile workaround alive.

## Required Workflow

### 1. Behavior Statement

Write:

```text
When <trigger>, the agent should <observable behavior>, even if <pressure>.
```

If this is vague, the skill will be vague.

### 2. RED: Pressure Test First

Create a scenario that makes the wrong behavior tempting.

Good pressures:

- Time pressure.
- Sunk cost.
- Authority pressure.
- Economic consequence.
- Fatigue.
- Social pressure.
- "Pragmatic" shortcut framing.

Template:

```markdown
IMPORTANT: This is a real scenario. Choose and act.

Context:
<repo/task/constraints>

Pressure:
<3+ pressures>

Options:
A) <disciplined correct behavior>
B) <shortcut>
C) <shortcut>

Choose A, B, or C. Do not answer hypothetically.
```

Capture:

- The choice.
- What the agent did.
- Exact rationalizations.
- Missing trigger words.
- Missing gate or counter.

### 3. GREEN: Minimal Skill

Add only the text needed to address observed failures.

Minimum `SKILL.md`:

```markdown
---
name: lowercase-hyphenated-name
description: Use when <trigger conditions and symptoms>
---

# Skill Title

Core principle: <one sentence>

## When To Use

- <trigger>

## Process

1. <step>
2. <gate>
3. <verification>
```

### 4. REFACTOR: Close Loopholes

If the agent finds a new excuse, add a targeted counter and re-test.

Use:

- Red flags.
- Rationalization tables.
- No-exception language only where discipline matters.
- Objective gates.
- Completion criteria with evidence.

## Match the Form to the Failure

| Failure shape | Symptom | Correct form | Never use |
| --- | --- | --- | --- |
| Agent knows the rule, skips it under pressure | Compliance failure | Prohibition + rationalization table + red flags | Soft "prefer X" language |
| Agent complies, output is wrong-shaped | Bloat, buried verdict | Positive recipe/contract stating what the output IS, in order | Prohibition list (measured: produces MORE unwanted content than a recipe, worse than no guidance) |
| Agent omits a required element | Missing field in output | Structural required field/slot in the template | Prose reminder near the field |
| Behavior should depend on a condition | Wrong in some contexts | Conditional keyed to an observable predicate | Unconditional rule + bolted-on exemption clause |

Sub-rules:

- No nuance clauses. "Don't X unless it matters" reopens negotiation — one nuance clause measurably degraded a winning recipe from consistent to noisy.
- Exemption clauses don't scope reliably. "This limit doesn't apply to code blocks" still suppressed code blocks — restructure so the rule can't reach the exempted part.

## Description Field

The description is for discovery, not execution.

Good:

```yaml
description: Use when creating, editing, auditing, testing, packaging, or deciding whether to write agent skills
```

Bad:

```yaml
description: Creates skills by writing RED tests, adding gates, testing with subagents, and deploying symlinks
```

The bad version summarizes the workflow, inviting the agent to wing it without reading the skill body. This is a mechanism, not a style preference: a description that summarized a workflow ("code review between tasks") once caused an agent to run ONE review when the skill's flowchart specified TWO — the description became a shortcut the agent followed instead of reading the body, silently truncating a multi-step process to whatever fit in one line.

## Skill Discovery Optimization (Portability)

Audit skill prose for harness-specific vocabulary before treating a skill as portable — content authored against one harness's terms silently degrades once a skill library targets multiple harnesses.

| Harness-specific | Neutral |
| --- | --- |
| "use the Task tool" | "dispatch a subagent" |
| "put it in CLAUDE.md" | "your instructions file" |

Also check skill text for accidental collisions with harness-level keyword pattern-matching — a bullet's exact wording can silently trip an unrelated harness feature (e.g. forcing extended thinking mode) regardless of intent. Break the exact string, e.g. insert a hyphen, while keeping it readable.

## Skill Body Patterns

### Gates Over Rules

Weak:

```markdown
Verify before saying done.
```

Strong:

```markdown
Before claiming completion:
1. Identify the command or artifact proving the claim.
2. Run or inspect it now.
3. Read the result.
4. State status with evidence.
```

### Rationalization Table

```markdown
| Excuse | Reality |
| --- | --- |
| "This is too simple." | Simple changes still fail. Use the gate. |
| "I can verify later." | Later verification does not justify current claims. |
| "The spirit is satisfied." | Violating the required mechanism violates the spirit. |
```

### Red Flags

```markdown
## Red Flags - STOP

- "I'll do this one quick thing first."
- "The skill is overkill."
- "I remember the skill."
- "I need to inspect files before checking skills."
```

## Packaging

Use progressive disclosure:

```text
skill-name/
  SKILL.md
  references/
    details.md
  scripts/
    deterministic-helper
  assets/
    reusable-output
  agents/
    openai.yaml
```

Keep in `SKILL.md`:

- Core workflow.
- Gates.
- Red flags.
- Routing to references.

Move to references:

- Research.
- Long examples.
- API docs.
- Variants by framework or harness.

Move to scripts:

- Validation.
- Repeated transformations.
- Deterministic checks.

## Multi-Stage Skill Pipelines

For a skill that runs its own multi-stage pipeline (e.g. extract -> categorize -> split -> detect -> report), mix deterministic script stages with LLM stages, and apply two-tier model routing WITHIN the pipeline: cheap model for coarse categorization only, expensive model for the actual hard semantic judgment. Never use the cheap model for the hard step.

## On-Demand Integrations

For a rarely-used external capability, wrap it as a skill-triggered CLI used on demand rather than a standing pre-configured MCP server — avoids permanent context pollution from an integration used only occasionally. Include a capability-restriction guard (allow/deny) when probing an unfamiliar server this way.

## Pruning and Compression

Before cutting anything from a skill, classify it:

- Redundant with something already said -> safe to cut.
- Behavior-shaping, even if it reads like fluff -> unsafe to cut without a micro-test.

Case study: removing TDD test-first rationale prose measured a real regression (8/10 -> 5/10 compliant under pressure, corroborated across two model/harness combos). The fix was not reverting the cut — each rebuttal argument became a row in the skill's existing rationalization table instead: same content, a higher-leverage slot, since it now fires exactly where the agent is mid-rationalization instead of sitting in a recap nobody re-reads.

Every compression cut ships only after a micro-test (control vs. treatment) confirms it is safe — never assumed safe because it "reads like fluff." Preserve rationalization tables and precedence rules by default; they are the most commonly behavior-shaping content.

## Micro-Test Wording (Cheap Pre-Check)

Before a full pressure-scenario subagent test, run a cheap wording check:

1. One fresh-context sample per call. System prompt is the full realistic surrounding context (whole skill/template), not the guidance in isolation.
2. Always include a no-guidance control. If the control does not exhibit the failure, stop — nothing to fix.
3. 5+ reps per variant. Single samples lie.
4. Manually read every flagged match. Automated string-matching over- and under-counts (template echoes, quoted counter-examples look like hits).
5. Variance is itself a metric. Wording that has landed converges reps on the same shape; 5 different interpretations across 5 reps means the wording isn't binding yet — tighten before adding more words.

## Subagent Skill Testing

Good validation prompt:

```markdown
You are testing whether this skill changes behavior under pressure.
Do not critique prose style. Act as the agent in the scenario.

Skill:
<path or paste>

Scenario:
<pressure scenario>

Return decision, action, relied-on skill sections, and ambiguities.
```

Do not leak the intended answer.

## Testing Anti-Patterns (Skill/Prompt Behavior)

| Trap | Description |
| --- | --- |
| String-presence trap | Grep-style tests on scripts/skills/prompts counterfeit falsifiability — "the source text changed" is never a valid pass reason; the observable must be behavior. |
| Change-detector trap | A constant/tautological assertion fails on any change and protects nothing. |

Both are tempting specifically when testing prompts, skills, or other text artifacts, because there is no natural behavioral oracle to assert against.

## Behavioral Eval Design (evals/)

For skills mature enough to need reliability guarantees beyond a single subagent pressure test, build a dedicated `evals/` layer — LLM-judged and probabilistic — distinct from deterministic `tests/`. Ship the eval harness as its own repo/package, never as a submodule inside an end-user-installed plugin; a submodule is a common install-breaker.

### Roles

Keep strictly separate:

| Role | Job |
| --- | --- |
| Judge/driver agent | Separate model; scripted, fenced turns; drives and semantically grades the subject |
| Subject agent | Executes the skill under test |
| Harness | Setup, deterministic checks, verdict composition |

Fence every judge turn — script the exact opening message, canned neutral replies, explicit prohibitions, and an explicit stop condition. An unfenced judge improvises and contaminates the run. Grader/judge subagents: no tools, and an explicit "you are a classifier, not a coding agent" framing.

### Scenario = 3-file unit

| File | Executable? | Contents |
| --- | --- | --- |
| `story.md` | n/a | 2nd-person brief to the judge |
| `setup.sh` | yes | Builds the fixture |
| `checks.sh` | no (sourced) | Defines only `pre()`/`post()` |

Most common authoring trap: the exec-bit asymmetry between `setup.sh` and `checks.sh`.

### Verdict

- Two independent witnesses: pass requires BOTH the judge verdict AND every deterministic check — `checks.sh` is never shown to the judge.
- Three-valued verdict: pass / fail / **indeterminate** (setup/pre-check/capture/compose failures, judge "investigate," empty capture) — environment breakage never masquerades as an agent bug.
- Expected-check manifest: each scenario commits a frozen list of which check records should fire; a mismatch composes to indeterminate, never a silent pass.
- Negative-verb design: checks like "tool not called" must FAIL on an empty capture, so a run that did nothing can't cheat a "didn't do X" assertion.

### Design rules

- Elicited fixtures: generate fixtures by running the skill under test live, not by hand-authoring — hand-authored fixtures measured ~2x costlier and overstate baselines.
- Calibration pairs: one over-triggering scenario plus one under-triggering scenario sharing a fixture, so a trigger description can't be tuned to pass only one direction.
- Discriminating checks: hand-verify a check against all three states (broken / symptom-patched / root-cause-fixed) before trusting it.

### Anti-patterns

Grading agent narration instead of observable actions; unobservable acceptance criteria; stop conditions tied to the verdict itself; harness-specific-only evidence; overfitting a scenario to one implementation.

### Attribution atlas (triage a non-passing run)

1. Real defect, judge caught it.
2. Real defect, deterministic check caught what the judge missed.
3. Env/tool missing, pre-guarded -> indeterminate.
4. Broken check -> false fail.
5. Judge itself errored.
6. Setup failure.
7. Eval misaligned with skill intent (presupposes context never supplied) -> fix the scenario, not the skill.

Disambiguate 2 vs. 4 by re-running the check against a known-good fixture.

### Cost-tiered pyramid

| Tier | Cost | Use |
| --- | --- | --- |
| MINE | free | Re-score already-collected artifacts |
| MICRO | ~$1-5 | One-call guidance-variant test (see Micro-Test Wording above) |
| FULL | ~$7-15/run | Real agent drive through the whole harness |

Answer at the cheapest tier that resolves the question; escalate only when it genuinely can't.

### Validity requirements

- Nonstationary behavior: base rates can swing +/-25 points within hours for reasons unrelated to what's tested — only contemporaneous, paired comparisons count as evidence.
- Rubric-blind grading: keep the grader blind to arm assignment; pre-register agreement/abstention thresholds against a frozen corpus before trusting a new judge.
- Sandbox isolation must cover every path an agent CLI resolves skills/config from, not just the obvious one.

## Deployment Checklist

- `name` is lowercase hyphenated.
- `description` is trigger-only and starts with `Use when`.
- Body contains actual workflow, not just reference links.
- Heavy material is split into directly linked references.
- Gates are objective.
- Rationalizations are based on observed failure modes.
- Skill was tested under pressure or the lack of testing is explicitly noted.
- Symlinks/install paths point to the canonical copy.
- Skill text has been checked for accidental harness-keyword collisions.
- Skill prose uses neutral, cross-harness vocabulary, or is explicitly harness-scoped.
