# Shared Skills Library

How to structure a skills directory that works correctly across all providers.

## File Layout

The layout is the same regardless of which providers you support:

```
skills/
├── my-skill/
│   ├── SKILL.md                ← required; frontmatter + skill body
│   └── references/             ← optional; supporting markdown files
│       ├── deep-topic.md
│       └── examples.md
└── another-skill/
    └── SKILL.md
```

Each skill is a directory. The only required file is `SKILL.md`. Reference files in `references/` are loaded on demand from within the skill body — they are never loaded automatically.

## SKILL.md Format

The frontmatter format is identical across all providers:

```markdown
---
name: my-skill
description: Use when [specific triggering conditions] — describes WHEN to invoke, not what the skill does
---

# My Skill

Skill body in plain markdown...
```

**Critical:** The `description` field is searched by the provider to surface the skill. It must state triggering conditions — "Use when X, Y, or Z" — not a general description of the skill's topic. A vague description means the skill won't be found.

## Portability Rules

### Do

- Use Claude Code tool names as canonical in skill bodies (`Read`, `Edit`, `Bash`, `Skill`, etc.)
- Use relative paths within the skills directory (`references/deep-topic.md`)
- Write plain markdown that any agent can read
- Add clearly-labeled provider subsections when invocation syntax differs materially

### Don't

- Don't hardcode absolute paths anywhere in skill content
- Don't reference provider-specific environment variables (`$CLAUDE_PLUGIN_ROOT` belongs in adapter code, not skills)
- Don't put platform-specific install steps in shared skills (those go in `AGENTS.md`, `GEMINI.md`, or adapter docs)
- Don't assume the agent has access to any MCP server — MCPs are per-session configuration, not guaranteed by the plugin

## Handling Tool Name Divergence

Most tool names are identical across providers. The main divergence is skill invocation itself. When a skill teaches agents how to invoke other skills (like a `using-my-plugin` meta-skill), add a platform notes section:

```markdown
## Invoking Skills

**Claude Code**
Use the `Skill` tool: `Skill("skill-name")`

**Codex**
Use the `skill` tool: `skill("skill-name")`

**OpenCode / Gemini CLI**
Use `activate_skill`: `activate_skill("skill-name")`
```

For all other tools (`Read`, `Edit`, `Bash`, `WebFetch`), Claude Code names work across providers without annotation.

## The Meta-Skill Pattern

Every multi-provider plugin should include a `using-<plugin-name>` meta-skill as the entry point. This skill:

1. Lists all available skills and their triggering conditions
2. Explains the skill invocation syntax (with provider notes if needed)
3. States the rule: "invoke a relevant skill before acting"

This mirrors the `using-superpowers` skill in obra/superpowers, which is the bootstrap anchor for the entire framework. Agents encountering the plugin for the first time are directed to this skill first.

```markdown
---
name: using-my-plugin
description: Use at the start of any session — establishes how to find and invoke skills in this plugin
---

# Using My Plugin

Invoke relevant skills BEFORE taking any action.

## Available Skills

| Skill | When to Use |
|-------|-------------|
| my-skill | [triggering conditions] |
| another-skill | [triggering conditions] |

## How to Invoke

**Claude Code:** `Skill("skill-name")`
**Codex:** `skill("skill-name")`
**OpenCode / Gemini:** `activate_skill("skill-name")`
```

## Auditing a Skills Library for Portability

Check each SKILL.md for:

- [ ] Frontmatter has `name` and `description` fields
- [ ] `description` states triggering conditions (not topic summary)
- [ ] No hardcoded absolute paths
- [ ] No MCP server assumptions without a fallback
- [ ] No `EnterPlanMode`, `EnterWorktree`, or other Claude Code-exclusive tools without a "Claude Code only" marker
- [ ] Provider-specific subsections present wherever skill invocation syntax is referenced

## Testing Portability

After authoring or updating skills:

1. **Claude Code:** Install the plugin locally, invoke the skill with the `Skill` tool, verify it loads and routes correctly
2. **Codex:** Add the plugin to `AGENTS.md` context, invoke with `skill` tool, verify output
3. **OpenCode:** Run the bootstrap adapter, verify the skill list appears in the injected context, invoke with `activate_skill`
4. **Gemini CLI:** Verify `GEMINI.md` correctly describes the skill, invoke with `activate_skill`

A skill that fails to trigger is almost always a weak `description` field. Tighten the triggering conditions and re-test.
