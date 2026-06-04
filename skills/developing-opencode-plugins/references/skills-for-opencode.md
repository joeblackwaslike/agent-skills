# Writing Skills for OpenCode

## How Skills Work

A skill is a markdown file with YAML frontmatter. When invoked, its content is loaded as context and the agent follows its instructions. Skills use the same `SKILL.md` format as Claude Code and Codex skills — they're fully portable across all three platforms.

---

## SKILL.md Format

```markdown
---
name: skill-name
description: Use when [specific trigger condition] — [what the skill provides]
---

# Skill Name

## Overview

One or two sentences describing what this skill does.

## When to Use

- Scenario A
- Scenario B
- Scenario C

## Workflow

[Instructions, reference tables, examples]
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique identifier within the skill scope, kebab-case |
| `description` | Yes | Trigger condition — what agents read to decide when to invoke |
| `license` | No | SPDX license identifier |
| `compatibility` | No | Compatible agent platforms |
| `metadata` | No | Arbitrary metadata |

---

## How OpenCode Discovers and Invokes Skills

### Discovery

OpenCode finds skills from (in order):
1. `.opencode/skills/` in the project directory tree
2. `~/.config/opencode/skills/` (global)
3. Additional paths/URLs in `opencode.json` `skills` field
4. Auto-loaded: `~/.agents/skills/`, `~/.claude/skills/`

### Invocation

Skills are invoked via the native `skill` tool in an OpenCode session. The agent reads the `description` field to decide when to invoke without explicit instruction.

---

## Writing Descriptions That Trigger Reliably

The `description` field is the most important part of any skill. OpenCode reads it to decide whether to invoke the skill for the current task.

### Anatomy of a Good Description

```
Use when [specific triggering situation] — [what the skill provides]
```

**Good examples:**
```yaml
description: Use when creating a new React component — enforces project conventions for props, styling, and accessibility
description: Use when debugging TypeScript type errors — systematic approach for tracing mismatches through generics
description: Use when reviewing a PR for security issues — covers OWASP top 10, auth flaws, and injection vectors
description: Use when configuring OpenCode plugins or skills — authoritative reference for opencode.json schema
```

**Bad examples:**
```yaml
description: Helps with code          # Too vague
description: A useful development tool # No trigger condition
description: My skill                 # Not a description
```

### Rules

1. **Lead with "Use when"** — signals a trigger condition
2. **Name the domain** — "React component", "TypeScript error", not just "code"
3. **Name the action** — "creating", "debugging", "reviewing", "configuring"
4. **Name the outcome** — "enforces conventions", "systematic approach", "authoritative reference"
5. **Avoid hedging** — "may be useful when" weakens trigger confidence
6. **Stay under 120 chars** — long descriptions get truncated in some contexts

---

## Session Bootstrap: AGENTS.md / instructions

OpenCode loads session context from files listed in `opencode.json`'s `instructions` field:

```json
{
  "instructions": ["AGENTS.md", "docs/style-guide.md"]
}
```

The `AGENTS.md` at project root is loaded by default. It's where you list available skills so the agent and users know what's available:

### AGENTS.md Template for OpenCode

```markdown
# Project Name

Brief description of this project (1–2 sentences).

## Available Skills

| Skill | When to Use |
|-------|-------------|
| `working-with-opencode` | When configuring OpenCode, writing skills/plugins, or debugging session setup |
| `my-domain-skill` | When doing X — provides Y |

## Common Workflows

**For [task]:** Use `my-domain-skill` to [action].
```

### What Makes a Good AGENTS.md

- **Concise** — it's loaded into every session; don't waste context
- **Action-oriented** — describe when to use each skill
- **Correct skill names** — case-sensitive, must match the `name` field in `SKILL.md`

---

## Progressive Disclosure Pattern

For skills with extensive reference material, use a routing table in SKILL.md and put details in `references/`:

**SKILL.md** — short routing table:
```markdown
---
name: my-skill
description: Use when [trigger] — comprehensive guide for [domain]
---

# My Skill

## Quick Reference

| Task | Read |
|------|------|
| Do X | `references/x-guide.md` |
| Do Y | `references/y-patterns.md` |
| Troubleshoot | `references/troubleshooting.md` |
```

**references/*.md** — detailed content read on demand.

This pattern keeps SKILL.md small (fast to load) while providing depth when needed.

---

## Skill Quality Checklist

Before shipping:

- [ ] `name` is unique within its scope and uses kebab-case
- [ ] `description` starts with "Use when" and names a specific trigger
- [ ] Content has an **Overview** section (what it does)
- [ ] Content has a **When to Use** section (concrete scenarios)
- [ ] Instructions are specific and actionable
- [ ] Large reference material is in `references/`, not inline in SKILL.md
- [ ] AGENTS.md lists the skill with correct name and trigger description
- [ ] Tested by invoking the skill in a real OpenCode session
