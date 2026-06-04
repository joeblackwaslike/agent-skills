# Writing Skills for Gemini CLI & Antigravity CLI

## How Skills Work

A skill is a `SKILL.md` file with YAML frontmatter that provides a named, invocable context block to the agent. When invoked, the skill content is loaded into the session and the agent follows its instructions.

The `SKILL.md` format is **identical across Claude Code, Codex CLI, Gemini CLI, and Antigravity CLI**. Skills are fully portable between platforms — the only difference is the invocation syntax.

| Platform | Invocation |
| --- | --- |
| Claude Code | `Skill` tool |
| Codex CLI | `skill("skill-name")` |
| Gemini CLI | `activate_skill("skill-name")` |
| Antigravity CLI | `activate_skill("skill-name")` |

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

## Workflow

[Step-by-step instructions, tables, examples...]
```

### Frontmatter Fields

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Unique identifier for the skill |
| `description` | Yes | Trigger condition — the key field for auto-invocation |

Only `name` and `description` are used by Gemini CLI and Antigravity CLI. All other frontmatter is ignored.

---

## Skill Discovery in Gemini CLI

Discovery tiers (lowest to highest precedence):

1. **Built-in skills** — shipped with Gemini CLI
2. **Extension skills** — `~/.gemini/extensions/<name>/skills/`
3. **User skills** — `~/.gemini/skills/` or `~/.agents/skills/`
4. **Workspace skills** — `.gemini/skills/` or `.agents/skills/` (project-level, version-controlled)

Higher-precedence skills override lower-precedence ones with the same `name`.

**Antigravity CLI paths:**
- Global: `~/.gemini/antigravity-cli/skills/` or `~/.agents/skills/`
- Workspace: `.agents/skills/` (`.gemini/skills/` also still works)

**Recommendation:** Use `.agents/skills/` for workspace skills — it works in both Gemini CLI and Antigravity CLI, and is also recognized by Claude Code.

---

## Writing Descriptions That Trigger Reliably

The `description` field is the most important part of a skill for auto-invocation. Gemini reads it to decide when a skill applies.

### Formula

```
Use when [specific action + domain] — [what the skill provides]
```

**Good examples:**
```yaml
description: Use when creating a new React component — enforces project conventions for props, hooks, and accessibility
description: Use when debugging a TypeScript type error — systematic approach for tracing mismatches through generic inference chains
description: Use when reviewing a pull request — covers correctness, security, test coverage, and style consistency
```

**Bad examples:**
```yaml
description: Helps with code          # Too vague
description: Development tool         # No trigger condition
description: My React skill           # Not actionable
```

### Rules

1. **Start with "Use when"** — this is the standard trigger signal pattern
2. **Name the domain** — "React component", "PostgreSQL query", not just "code"
3. **Name the action** — "creating", "debugging", "reviewing", "optimizing"
4. **State the value** — "enforces conventions", "systematic approach", "coverage checklist"
5. **Avoid hedging** — "may help" or "might be useful" reduces trigger confidence

---

## GEMINI.md Bootstrap Pattern

`GEMINI.md` at the plugin root (or workspace root) is loaded by Gemini CLI and Antigravity CLI at session start. It's the primary mechanism for skill discovery in these tools.

### Template

```markdown
# Plugin Name

Brief description (1–2 sentences).

## Available Skills

Invoke with `activate_skill("name")`:

| Skill | When to Use |
| --- | --- |
| `activate_skill("skill-one")` | When doing X — provides Y |
| `activate_skill("skill-two")` | When doing Z — provides W |

## Common Workflows

**For [common task]:**
1. `activate_skill("skill-one")` to [do first thing]
2. `activate_skill("skill-two")` to [do second thing]
```

### What Makes a Good GEMINI.md

- **Concise** — it loads into every session; don't bloat it
- **Action-oriented** — "when doing X" not "useful for various tasks"
- **Correct syntax** — `activate_skill("name")` with backtick-wrapped invocations for clarity
- **Common workflows** — show how skills combine, not just what each one does in isolation

### GEMINI.md vs AGENTS.md

Both files are loaded by Gemini CLI and Antigravity CLI. Use GEMINI.md as the canonical version for Gemini/Antigravity and write AGENTS.md for Codex — they contain different invocation syntax (`activate_skill()` vs `skill()`).

If you only have one session context file, call it `GEMINI.md` for Gemini-primary plugins. Codex will also read AGENTS.md as its preferred file, so providing both avoids ambiguity.

---

## Antigravity-Specific Caveats

### Workspace Skills Path Changed

Gemini CLI workspace skills live in `.gemini/skills/`. Antigravity expects `.agents/skills/`.

```bash
# Migrate workspace skills
mv .gemini/skills/ .agents/skills/
```

After migration, `.agents/skills/` works in both tools. The old `.gemini/skills/` path still loads in Antigravity for backward compatibility but is deprecated.

### Auto-Memory Interaction

Antigravity CLI has an auto-memory system that can create `GEMINI.md` fragments automatically. These are stored separately from your plugin's GEMINI.md and merged at load time. Be aware that auto-generated memory entries may appear alongside your plugin's context.

### Skill Invocation During Agent Turns

In Antigravity, `activate_skill()` can be called mid-task by subagents. If your skill contains instructions that only make sense at session start (e.g., "look at the files in the repo"), note this in the skill's When to Use section.

### Model Routing

Antigravity supports routing different tasks to different models. If your skill is intended for a specific use case (e.g., long-context document analysis), mention in the description what model tier it works best with, since the routing system reads skill descriptions.

---

## Progressive Disclosure Pattern

For large reference skills, keep SKILL.md as a routing table and put detail in `references/`:

**SKILL.md (routing only):**
```markdown
---
name: my-reference
description: Use when [trigger] — routes to specific reference file
---

# My Reference

| Task | Read |
| --- | --- |
| Topic A | `references/a.md` |
| Topic B | `references/b.md` |
```

This keeps SKILL.md small (faster to load) and avoids context bloat.

---

## Skill Quality Checklist

Before shipping a skill for Gemini CLI / Antigravity:

- [ ] `name` is unique within the extension
- [ ] `description` starts with "Use when" and names a specific trigger + domain
- [ ] Has **Overview** (what it does) and **When to Use** (list of scenarios)
- [ ] Large reference content is in `references/`, not inline
- [ ] GEMINI.md lists the skill with `activate_skill("name")` syntax
- [ ] Tested by running `activate_skill("skill-name")` in a real Gemini session
- [ ] Works on both Gemini CLI and Antigravity CLI (if dual-platform)
- [ ] Workspace skills are in `.agents/skills/` (not `.gemini/skills/`) if targeting both tools
