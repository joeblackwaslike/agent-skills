# Common Codex Plugin Patterns

## Decision Matrix

| Pattern | When to Use | Components |
|---------|-------------|------------|
| Single Skill | One focused workflow or reference | `skills/`, `plugin.json` |
| Skill Collection | Multiple related workflows | `skills/`, `plugin.json`, `AGENTS.md` |
| Hook-Enhanced Workflow | Automation triggered by tool events | `skills/`, `hooks/`, `plugin.json` |
| Full-Featured Plugin | Complete domain coverage | All components |

---

## Pattern 1: Single Skill Plugin

**Use when:** You have one well-defined workflow or reference library to encapsulate.

**Example:** A plugin that provides documentation for a specific framework.

```text
my-plugin/
├── .codex-plugin/
│   └── plugin.json
├── skills/
│   └── my-skill/
│       ├── SKILL.md
│       └── references/
│           └── docs.md
└── README.md
```

**plugin.json:**
```json
{
  "name": "framework-docs",
  "version": "1.0.0",
  "description": "Documentation reference for MyFramework",
  "author": {"name": "Your Name"},
  "skills": "./skills/"
}
```

**SKILL.md:**
```markdown
---
name: framework-docs
description: Use when working with MyFramework — routing, components, data fetching, or configuration
---

# MyFramework Reference

Read references/docs.md for the official documentation.
```

**When NOT to use:** If you'll later add hooks or multiple skills, start with the Skill Collection pattern instead.

---

## Pattern 2: Skill Collection

**Use when:** You have 2+ related skills that belong together, or your skills need shared context.

**Example:** A plugin with separate skills for different phases of a workflow.

```text
my-plugin/
├── .codex-plugin/
│   └── plugin.json
├── AGENTS.md            # Lists all skills and when to invoke each
├── skills/
│   ├── planning/
│   │   └── SKILL.md
│   ├── implementation/
│   │   └── SKILL.md
│   └── review/
│       └── SKILL.md
└── README.md
```

**AGENTS.md pattern:**
```markdown
# My Plugin

Available skills for this session:

- `skill("planning")` — Before starting any implementation; breaks down requirements
- `skill("implementation")` — When writing code; enforces patterns and conventions
- `skill("review")` — Before submitting changes; checks quality and correctness

For typical tasks: planning → implementation → review.
```

**Key insight:** AGENTS.md is loaded at session start — it's the user's map to your plugin. Write it as documentation for the human, not instructions to Codex.

---

## Pattern 3: Hook-Enhanced Workflow

**Use when:** You want automation that fires on tool events, not just when explicitly invoked.

**Example:** A plugin that automatically formats files after writes and summarizes changes before session end.

```text
my-plugin/
├── .codex-plugin/
│   └── plugin.json
├── skills/
│   └── workflow/
│       └── SKILL.md
├── hooks/
│   ├── hooks.json
│   ├── post-write.sh     # chmod +x required
│   └── session-end.sh    # chmod +x required
└── README.md
```

**hooks/hooks.json:**
```json
{
  "hooks": {
    "PostFileWrite": [
      {
        "matcher": "\\.ts$|\\.tsx$|\\.js$",
        "command": "./hooks/post-write.sh"
      }
    ],
    "SessionEnd": [
      {
        "command": "./hooks/session-end.sh"
      }
    ]
  }
}
```

**hooks/post-write.sh:**
```bash
#!/usr/bin/env bash
# Receives file path via stdin or environment
# Exit 0 to continue, non-zero to surface an error
FILE="${CODEX_TOOL_FILE:-}"
if [ -n "$FILE" ] && command -v prettier &>/dev/null; then
  prettier --write "$FILE" 2>/dev/null || true
fi
```

**When to choose over a skill:** Use hooks when the automation should run **without** the user explicitly asking — i.e., it should always happen for matching events. Use skills when the user should consciously invoke the workflow.

---

## Pattern 4: Full-Featured Plugin

**Use when:** You're building a comprehensive domain tool that covers multiple workflows, needs automation, and has supporting documentation.

**Example:** A testing-focused plugin with skills for writing tests, running them, and debugging failures, plus hooks to auto-run tests on file changes.

```text
my-plugin/
├── .codex-plugin/
│   └── plugin.json
├── AGENTS.md
├── skills/
│   ├── write-tests/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── testing-patterns.md
│   ├── debug-failures/
│   │   └── SKILL.md
│   └── coverage-review/
│       └── SKILL.md
├── hooks/
│   ├── hooks.json
│   └── on-test-file-write.sh
├── bin/
│   └── run-coverage         # executable helper
└── README.md
```

**plugin.json:**
```json
{
  "name": "testing-toolkit",
  "version": "1.0.0",
  "description": "Comprehensive testing workflows: write, debug, and review coverage",
  "author": {"name": "Your Name"},
  "skills": "./skills/",
  "hooks": "./hooks/hooks.json",
  "license": "MIT"
}
```

**Build order for full-featured plugins:**
1. Start with one skill to validate the pattern
2. Add remaining skills one at a time, testing each
3. Add hooks last (they're harder to debug)
4. Write AGENTS.md after all components exist

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Everything in one SKILL.md | File becomes too large to scan | Split into multiple focused skills |
| Hooks that always run | Slows down every tool call | Use `matcher` to scope to relevant files |
| No AGENTS.md in multi-skill plugin | Users don't discover skills | Always write AGENTS.md for 2+ skills |
| Hardcoded paths in hook scripts | Breaks on other machines | Use relative paths from `$CODEX_PLUGIN_ROOT` |
| Vague skill descriptions | Codex doesn't know when to invoke | Make descriptions specific and action-oriented |
