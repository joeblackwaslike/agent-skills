# Common Gemini CLI / Antigravity Plugin Patterns

## Decision Matrix

| Pattern | When to Use | Key Components |
| --- | --- | --- |
| Single Skill | One focused workflow or reference library | `skills/`, `gemini-extension.json` |
| Skill Collection | Multiple related workflows | `skills/`, `GEMINI.md`, both manifests |
| Hook-Enhanced Workflow | Automation on tool events | `skills/`, `hooks/`, `GEMINI.md` |
| MCP-Integrated Plugin | External tools / APIs surfaced as MCP tools | `mcpServers` in manifest, `skills/` |
| Full-Featured Plugin | Complete domain coverage | All components |

---

## Pattern 1: Single Skill Plugin

**Use when:** One well-defined workflow to encapsulate, or a reference library for a specific domain.

```text
my-plugin/
├── gemini-extension.json
├── plugin.json
├── skills/
│   └── my-skill/
│       ├── SKILL.md
│       └── references/
│           └── docs.md
└── README.md
```

**gemini-extension.json:**
```json
{
  "name": "framework-docs",
  "version": "1.0.0",
  "description": "Documentation reference for MyFramework"
}
```

This is the lightest pattern — no GEMINI.md needed if the skill description is specific enough for Gemini to auto-invoke it. Add GEMINI.md only if users need to know it exists.

---

## Pattern 2: Skill Collection with GEMINI.md Bootstrap

**Use when:** 2+ related skills that belong together, or when users need explicit guidance on which skill to invoke.

```text
my-plugin/
├── gemini-extension.json
├── plugin.json
├── GEMINI.md            # Maps skills to scenarios, guides invocation
├── skills/
│   ├── planning/
│   │   └── SKILL.md
│   ├── implementation/
│   │   └── SKILL.md
│   └── review/
│       └── SKILL.md
└── README.md
```

**GEMINI.md:**
```markdown
# My Plugin

Provides three skills for the full development lifecycle:

- `activate_skill("planning")` — Before starting work; breaks down requirements into tasks
- `activate_skill("implementation")` — While writing code; enforces patterns and conventions
- `activate_skill("review")` — Before submitting; checks correctness and quality

**Typical workflow:** planning → implementation → review
```

**Key insight:** GEMINI.md is the skill's front door in Gemini/Antigravity sessions. Users see it at session start — write it as user-facing documentation, not agent instructions.

---

## Pattern 3: Hook-Enhanced Workflow

**Use when:** Automation that should run automatically on tool events, without the user explicitly asking.

```text
my-plugin/
├── gemini-extension.json
├── plugin.json
├── GEMINI.md
├── skills/
│   └── workflow/
│       └── SKILL.md
├── hooks/
│   ├── hooks.json
│   ├── after-write.sh      # chmod +x required
│   └── session-start.sh    # chmod +x required
└── README.md
```

**hooks/hooks.json:**
```json
{
  "hooks": {
    "after_tool": {
      "write_file": ["./hooks/after-write.sh"]
    },
    "session_start": ["./hooks/session-start.sh"]
  }
}
```

**When to prefer hooks over skills:**
- The action should happen automatically (formatting, validation, logging)
- The user shouldn't need to remember to invoke it
- The trigger is a specific tool event, not a conversational context

**When to prefer skills over hooks:**
- The workflow requires judgment (code review, planning)
- The user should consciously initiate it
- Context from the conversation matters

---

## Pattern 4: MCP-Integrated Plugin

**Use when:** You want to expose external APIs, databases, or tools as MCP tools that Gemini/Antigravity can call directly.

```text
my-plugin/
├── gemini-extension.json    # mcpServers defined here
├── plugin.json              # mcpServers defined here
├── GEMINI.md
├── skills/
│   └── how-to-use-server/
│       └── SKILL.md         # teaches Gemini when/how to use the MCP tools
└── server/
    └── index.js             # the MCP server
```

**gemini-extension.json with MCP:**
```json
{
  "name": "my-api-plugin",
  "version": "1.0.0",
  "description": "Exposes MyAPI as MCP tools",
  "mcpServers": {
    "my-api": {
      "command": "node",
      "args": ["server/index.js"],
      "env": {
        "API_KEY": "${MY_API_KEY}"
      }
    }
  },
  "settings": {
    "MY_API_KEY": {
      "description": "API key for MyAPI",
      "default": ""
    }
  }
}
```

**Note:** MCP server paths in `args` are relative to the extension's install directory (`~/.gemini/extensions/<name>/`). For development with `--path`, they're relative to the local plugin directory.

---

## Pattern 5: Dual-Platform Plugin (Gemini CLI + Claude Code + Codex)

**Use when:** You want one plugin repo that works across multiple AI coding assistants.

```text
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # Claude Code manifest
├── .codex-plugin/
│   └── plugin.json          # Codex CLI manifest
├── gemini-extension.json    # Gemini CLI manifest
├── plugin.json              # Antigravity CLI manifest
├── CLAUDE.md                # Claude Code session context
├── AGENTS.md                # Codex CLI session context (skill() syntax)
├── GEMINI.md                # Gemini/Antigravity session context (activate_skill() syntax)
├── skills/                  # Shared skills — identical for all platforms
│   └── my-skill/
│       └── SKILL.md
└── README.md
```

**Platform-specific invocation syntax in session context files:**
- `CLAUDE.md` / Claude Code: Skill discovery is automatic, or use the `Skill` tool
- `AGENTS.md` / Codex: `skill("skill-name")`
- `GEMINI.md` / Gemini + Antigravity: `activate_skill("skill-name")`

See the `multi-provider-plugins` skill for the full cross-platform architecture reference.

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
| --- | --- | --- |
| Manifest `name` ≠ install directory | Extension loads incorrectly or not at all | Match exactly: `"name": "my-plugin"` installs to `my-plugin/` |
| `activate_skill()` in AGENTS.md | Wrong syntax for Codex | Use `skill()` in AGENTS.md, `activate_skill()` in GEMINI.md |
| Hook scripts without `chmod +x` | Hooks silently skip | `chmod +x hooks/*.sh` + commit |
| Workspace skills in `.gemini/skills/` for Antigravity | Skills not found after migration | Use `.agents/skills/` — works in both |
| GEMINI.md inside a subdirectory | Not loaded by Gemini CLI | Must be at plugin root |
| MCP server paths hardcoded absolute | Breaks on other machines | Use relative paths from extension root |
| No GEMINI.md for multi-skill plugin | Users can't discover skills | Write one for any plugin with 2+ skills |
