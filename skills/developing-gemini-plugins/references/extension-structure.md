# Gemini CLI Extension & Antigravity Plugin Structure Reference

## Standard Directory Layout

All paths relative to plugin root:

```text
my-plugin/
├── gemini-extension.json    # Gemini CLI manifest (required for Gemini CLI)
├── plugin.json              # Antigravity CLI manifest (required for Antigravity)
├── GEMINI.md                # Session context (both platforms — loaded at session start)
├── skills/                  # Optional — Agent skills
│   └── skill-name/
│       ├── SKILL.md         # Required for each skill
│       ├── scripts/         # Optional — executable helpers
│       ├── references/      # Optional — documentation files
│       └── assets/          # Optional — templates/static files
├── hooks/                   # Optional — event handler scripts
│   ├── hooks.json           # Hook configuration
│   └── *.sh                 # Hook scripts (must be executable)
├── commands/                # Optional — custom slash commands
│   └── command-name.toml
├── bin/                     # Optional — executables added to PATH
├── LICENSE
└── README.md
```

**For dual-platform support (Gemini CLI + Antigravity):** include both `gemini-extension.json` and `plugin.json`. They can be identical for simple plugins; only the manifest filename differs.

---

## Gemini CLI Manifest (gemini-extension.json)

### Minimal

```json
{
  "name": "my-plugin"
}
```

### Typical

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description of what the plugin does",
  "contextFileName": "GEMINI.md"
}
```

### Complete (all fields)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Comprehensive plugin description",
  "contextFileName": "GEMINI.md",
  "mcpServers": {
    "server-name": {
      "command": "node path/to/server.js",
      "args": [],
      "env": { "ENV_VAR": "value" }
    }
  },
  "excludeTools": [],
  "settings": {
    "MY_API_KEY": {
      "description": "API key for the service",
      "default": ""
    }
  },
  "migratedTo": ""
}
```

**Critical:** `"name"` must exactly match the directory name where the extension is installed (`~/.gemini/extensions/<name>/`). A mismatch causes the extension to load incorrectly or not at all.

---

## Antigravity CLI Manifest (plugin.json)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description of what the plugin does",
  "contextFileName": "GEMINI.md"
}
```

The schema is nearly identical to `gemini-extension.json`. For simple plugins with skills and a GEMINI.md, the file contents can be exactly the same — only the filename differs.

---

## Installation Paths

| Scope | Gemini CLI | Antigravity CLI |
| --- | --- | --- |
| Extensions/plugins | `~/.gemini/extensions/<name>/` | `~/.gemini/antigravity-cli/plugins/<name>/` |
| Global skills | `~/.gemini/skills/` | `~/.gemini/antigravity-cli/skills/` (also `~/.agents/skills/`) |
| Shared global skills | `~/.agents/skills/` | `~/.agents/skills/` |
| Workspace skills | `.gemini/skills/` | `.agents/skills/` |

**Recommendation for new projects:** use `.agents/skills/` for workspace skills — it works in Antigravity without migration and is also recognized by Gemini CLI, Claude Code, and Codex.

---

## Component Formats

### Skills (skills/skill-name/SKILL.md)

Identical format for all platforms:

```markdown
---
name: skill-name
description: Use when [triggering condition] — [what it does]
---

# Skill Name

## Overview

What this skill does.

## When to Use

- Scenario A
- Scenario B
```

### GEMINI.md (plugin root)

Session context loaded by both Gemini CLI and Antigravity CLI at session start:

```markdown
# My Plugin

Brief description (1–2 sentences).

## Available Skills

- `activate_skill("skill-name")` — When to use this skill
- `activate_skill("other-skill")` — When to use this skill

## Common Workflows

For [common task]: `activate_skill("skill-name")`, then follow the steps.
```

**Note:** AGENTS.md is also supported as an alternative name. If you provide both, `contextFileName` in the manifest determines which one is loaded (default: `GEMINI.md`).

### Hooks (hooks/hooks.json)

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

Hook event names in Gemini CLI / Antigravity (verify against `docs-writing-hooks.md`):
- `session_start` — fires when a session begins
- `session_end` — fires when a session ends
- `before_tool` / `after_tool` — fires before/after tool calls (with tool name sub-key)
- `user_turn` — fires when the user submits a prompt

Hook scripts must be executable: `chmod +x hooks/*.sh`

### Slash Commands (commands/command-name.toml)

```toml
[command]
name = "my-command"
description = "Brief description shown in command palette"

[[command.inputs]]
name = "target"
type = "string"
description = "What to process"
required = false

[command.prompt]
template = """
User wants to run my-command on: {{ target }}
[instructions for Gemini...]
"""
```

### MCP Servers (in gemini-extension.json / plugin.json)

```json
{
  "name": "my-plugin",
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["server/index.js"],
      "env": {
        "API_KEY": "${MY_API_KEY}"
      }
    }
  }
}
```

MCP server paths are relative to the extension install directory. For portability, use relative paths from the manifest.

---

## Installing Extensions / Plugins

```bash
# Gemini CLI — from git URL
gemini extensions install https://github.com/org/my-plugin

# Gemini CLI — from local path (development)
gemini extensions install --path=./my-plugin

# Antigravity CLI — from git URL
agy plugin install https://github.com/org/my-plugin

# Antigravity CLI — from local path (development)
agy plugin install --path=./my-plugin

# Import all existing Gemini CLI extensions into Antigravity
agy plugin import gemini

# List installed
gemini extensions list
agy plugin list

# Uninstall
gemini extensions uninstall my-plugin
agy plugin uninstall my-plugin
```

---

## File Permission Requirements

```bash
chmod +x hooks/*.sh
chmod +x bin/*

# Commit the executable bit
git update-index --chmod=+x hooks/my-hook.sh
```
