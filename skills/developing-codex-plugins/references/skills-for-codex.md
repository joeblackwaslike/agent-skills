# Writing Skills for Codex

## How Skills Work in Codex

A skill is a markdown file (`SKILL.md`) with YAML frontmatter that provides a named, invocable block of instructions to Codex. Skills function as reusable context units — when invoked, the skill content is loaded into the session and Codex follows its instructions.

Skills in Codex use the same `SKILL.md` format as Claude Code skills, making them portable across both platforms.

---

## SKILL.md Format

```markdown
---
name: skill-name
description: Use when [specific trigger condition] — [what the skill does]
---

# Skill Name

## Overview

One or two sentences describing what this skill does.

## When to Use

- Scenario A
- Scenario B
- Scenario C

## Workflow

[Step-by-step instructions, reference tables, patterns, etc.]
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique identifier for the skill within the plugin |
| `description` | Yes | Trigger condition — what Codex reads to decide when to invoke |

Only `name` and `description` are used by Codex. Other frontmatter fields are ignored.

---

## How Codex Discovers and Invokes Skills

### Discovery Path

Codex finds skills from three sources, in this order:

1. **Plugin directory** — skills in `skills/` under any loaded plugin
2. **`~/.codex/skills/` directory** — individually installed skills (symlinks or copies)
3. **Session context** — skills referenced in `AGENTS.md`

### Invocation

In a Codex session, invoke a skill with:

```
skill("skill-name")
```

This loads the skill's content into the session context and Codex begins following its instructions.

Codex can also auto-invoke skills when the `description` field clearly matches the current task — but explicit invocation via `skill()` is more reliable for non-obvious triggers.

---

## Writing Descriptions That Trigger Reliably

The `description` field is the single most important part of a skill for discoverability. Codex reads it to decide when a skill applies.

### Anatomy of a Good Description

```
Use when [specific triggering situation] — [what the skill provides or does]
```

**Good examples:**
```yaml
description: Use when creating a new React component — enforces project conventions for props, styling, and accessibility
description: Use when debugging TypeScript type errors — systematic approach for tracing mismatches through generics and inference
description: Use when reviewing a pull request for security issues — covers OWASP top 10, auth flaws, and injection vectors
```

**Bad examples:**
```yaml
description: Helps with code           # Too vague — when? what kind of code?
description: A useful development tool  # Says nothing about when to use it
description: My skill                  # Not a trigger condition at all
```

### Trigger Specificity Rules

1. **Name the domain** — "React component", "TypeScript error", "PostgreSQL query", not just "code"
2. **Name the action** — "creating", "debugging", "reviewing", "optimizing", not just "working with"
3. **Name the outcome** — "enforces conventions", "systematic approach", "coverage checklist"
4. **Lead with "Use when"** — Codex is trained to read this as a trigger condition
5. **Avoid hedging** — "may be useful when" or "might help with" reduces trigger confidence

---

## AGENTS.md Bootstrap Pattern

`AGENTS.md` at the plugin root is loaded by Codex at the start of each session. It's the primary way users and Codex discover what skills are available.

### Template

```markdown
# Plugin Name

Brief description of what this plugin provides (1–2 sentences).

## Available Skills

Invoke these with `skill("name")`:

| Skill | When to Use |
|-------|-------------|
| `skill("skill-one")` | When doing X — provides Y |
| `skill("skill-two")` | When doing Z — provides W |

## Common Workflows

**For [common task]:**
1. `skill("skill-one")` to [do first thing]
2. `skill("skill-two")` to [do second thing]
```

### What Makes a Good AGENTS.md

- **Concise** — Session context is valuable; don't bloat it with preamble
- **Action-oriented** — Tell users what to do, not just what exists
- **Specific triggers** — "When doing X" not "useful for various tasks"
- **Correct invocation syntax** — Use backticks around `skill("name")` for copy-paste clarity

### What AGENTS.md Should NOT Contain

- Full skill content (that lives in SKILL.md)
- Project-specific path references that won't generalize
- Instructions that duplicate what the skill itself says

---

## Skill Scoping: Session vs Installed

| Scope | How | Persists? | Use For |
|-------|-----|-----------|---------|
| Session-local | `skill("name")` after loading with `--plugin-dir` | No | Development and testing |
| Installed via plugin | Plugin in `~/.codex/plugins/` | Yes | Personal or team-wide skills |
| Symlinked | Symlink in `~/.codex/skills/` | Yes | Individual skills without a full plugin |

For development: use `--plugin-dir` so you can iterate without reinstalling.
For distribution: package as a plugin so users install once and skills are always available.

---

## Progressive Disclosure Pattern

For skills with a lot of reference material, use progressive disclosure:

**SKILL.md** — routing table only:
```markdown
---
name: my-skill
description: Use when [trigger] — routes to the right reference file
---

# My Skill

## Quick Reference

| Task | Read |
|------|------|
| Do X | `references/x.md` |
| Do Y | `references/y.md` |
| Do Z | `references/z.md` |
```

**references/*.md** — detailed content read on demand.

This keeps SKILL.md small (faster to load) and puts detail behind a lookup.

---

## Skill Quality Checklist

Before shipping a skill:

- [ ] `name` is unique within the plugin
- [ ] `description` starts with "Use when" and names a specific trigger
- [ ] Content has an **Overview** section (what it does)
- [ ] Content has a **When to Use** section (list of scenarios)
- [ ] Instructions are actionable and specific
- [ ] Large reference material is in `references/` not inline
- [ ] AGENTS.md lists the skill with correct invocation syntax
- [ ] Tested by invoking `skill("name")` in a real session
