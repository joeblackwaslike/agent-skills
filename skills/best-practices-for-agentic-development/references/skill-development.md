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

The bad version summarizes the workflow, inviting the agent to wing it without reading the skill body.

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

## Deployment Checklist

- `name` is lowercase hyphenated.
- `description` is trigger-only and starts with `Use when`.
- Body contains actual workflow, not just reference links.
- Heavy material is split into directly linked references.
- Gates are objective.
- Rationalizations are based on observed failure modes.
- Skill was tested under pressure or the lack of testing is explicitly noted.
- Symlinks/install paths point to the canonical copy.

