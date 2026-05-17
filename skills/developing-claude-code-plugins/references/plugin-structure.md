# Plugin Structure Reference

## Standard Directory Layout

All paths relative to plugin root:

```text
my-plugin/
├── .claude-plugin/
│   ├── plugin.json          # REQUIRED - Plugin metadata
│   └── marketplace.json     # Optional - For distribution only
├── skills/                  # Optional - Agent Skills
│   └── skill-name/
│       ├── SKILL.md         # Required for each skill
│       ├── scripts/         # Optional - Executable helpers
│       ├── references/      # Optional - Documentation
│       └── assets/          # Optional - Templates/files
├── commands/                # Optional - Custom slash commands
│   └── command-name.md
├── agents/                  # Optional - Specialized subagents
│   └── agent-name.md
├── hooks/                   # Optional - Event handlers
│   └── hooks.json
├── monitors/                # Optional - Background monitors
│   └── monitors.json
├── output-styles/           # Optional - Output style definitions
├── bin/                     # Optional - Executables added to PATH
├── settings.json            # Optional - Default settings when enabled
├── .mcp.json               # Optional - MCP server config
├── LICENSE
└── README.md
```

## Critical Rules

### 1. `.claude-plugin/` Contains ONLY Manifests

❌ WRONG:

```text
.claude-plugin/
├── plugin.json
├── skills/              # NO! Skills don't go here
└── commands/            # NO! Commands don't go here
```

✅ CORRECT:

```text
.claude-plugin/
└── plugin.json          # Only manifests (marketplace.json optional, for distribution)

skills/                  # Skills at plugin root
commands/                # Commands at plugin root
```

### 2. Always Use `${CLAUDE_PLUGIN_ROOT}` (and `${CLAUDE_PLUGIN_DATA}`) for Paths in Config

❌ WRONG — hardcoded paths:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "/Users/name/plugins/my-plugin/server.js"
    }
  }
}
```

✅ CORRECT — variable paths:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "${CLAUDE_PLUGIN_ROOT}/server.js"
    }
  }
}
```

Two path variables are available in plugin configs:

| Variable | Resolves to | Use for |
| --- | --- | --- |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin install directory | Scripts, servers, assets |
| `${CLAUDE_PLUGIN_DATA}` | `~/.claude/plugins/data/{id}/` | Persistent state across updates |

In shell-form hooks/commands, quote the variable: `"${CLAUDE_PLUGIN_ROOT}"/scripts/run.sh`

### 3. Use Relative Paths in `plugin.json`

All paths in `plugin.json` must start with `./` and be relative to plugin root.

❌ WRONG:

```json
{
  "mcpServers": {
    "server": {
      "args": ["server/index.js"]
    }
  }
}
```

✅ CORRECT:

```json
{
  "mcpServers": {
    "server": {
      "args": ["${CLAUDE_PLUGIN_ROOT}/server/index.js"]
    }
  }
}
```

## Plugin Manifest (plugin.json)

### Minimal Version

Only `name` is required:

```json
{
  "name": "my-plugin"
}
```

### Typical Version

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description of what the plugin does",
  "author": { "name": "Your Name" },
  "license": "MIT"
}
```

### Complete Version (all fields)

```json
{
  "$schema": "https://claude.ai/schemas/plugin.json",
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Comprehensive plugin description",
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "https://github.com/you"
  },
  "homepage": "https://github.com/you/my-plugin",
  "repository": "https://github.com/you/my-plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/path/to/server.js"],
      "env": { "ENV_VAR": "value" }
    }
  },
  "userConfig": {
    "api_key": {
      "description": "Your API key",
      "required": true,
      "secret": true
    }
  },
  "dependencies": {
    "other-plugin": ">=1.0.0"
  }
}
```

`userConfig` values are prompted at enable time and available as `${user_config.KEY}` in MCP/hook/monitor configs.

## Local Development

Use `--plugin-dir` to load a plugin from a local path without installing it:

```bash
claude --plugin-dir ./my-plugin
```

Accepts a directory path or a `.zip` archive (requires Claude Code v2.1.128+). To pick up changes mid-session without restarting:

```bash
/reload-plugins
```

**Note:** MCP server and LSP server changes still require a full restart — `/reload-plugins` covers skills, agents, commands, hooks, and content changes only.

## Distribution Marketplace (marketplace.json)

The `marketplace.json` file in `.claude-plugin/` is for distributing plugins via a marketplace, **not for local development**. Use `--plugin-dir` for dev testing instead.

```json
{
  "name": "my-marketplace",
  "owner": { "name": "Your Name" },
  "plugins": [
    {
      "name": "my-plugin",
      "description": "Plugin description",
      "version": "1.0.0",
      "source": "./"
    }
  ]
}
```

## Component Formats

### Skills (skills/skill-name/SKILL.md)

```markdown
---
name: skill-name
description: Use when [triggering conditions] - [what it does]
---

# Skill Name

## Overview

What this skill does in 1-2 sentences.

## When to Use

- Specific scenario 1
- Specific scenario 2

## Workflow

1. Step one
2. Step two
3. Step three
```

### Commands (commands/command-name.md)

```markdown
---
description: Brief description of what this command does
---

# Command Instructions

Tell Claude what to do when this command is invoked.
Be specific and clear about the expected behavior.
```

### Hooks (hooks/hooks.json)

> ⚠️ **Duplicate hooks file warning:** `hooks/hooks.json` is automatically loaded by Claude Code. Do NOT also reference it in `plugin.json` or you'll get "Duplicate hooks file detected" errors.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}\"/hooks/run-hook.cmd format.sh"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}\"/hooks/run-hook.cmd init.sh"
          }
        ]
      }
    ]
  }
}
```

**Cross-platform hooks:** Use the polyglot `run-hook.cmd` wrapper to run shell scripts on Windows, macOS, and Linux. See `references/polyglot-hooks.md` for details.

Available hook events:

- `PreToolUse`, `PostToolUse`
- `UserPromptSubmit`
- `SessionStart`, `SessionEnd`
- `Stop`, `SubagentStop`
- `PreCompact`
- `Notification`

### MCP Servers

Option 1 — inline in `plugin.json`:

```json
{
  "name": "my-plugin",
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/server/index.js"],
      "env": {
        "API_KEY": "${PLUGIN_ENV_API_KEY}"
      }
    }
  }
}
```

Option 2 — separate `.mcp.json` file:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "${CLAUDE_PLUGIN_ROOT}/bin/server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"]
    }
  }
}
```

### Agents (agents/agent-name.md)

```markdown
---
name: agent-name
description: What this agent specializes in and when Claude should invoke it
model: sonnet
effort: medium
maxTurns: 20
disallowedTools: Write, Edit
---

# Agent Name

Detailed description of when to invoke this specialized agent.

## Expertise

- Specific domain knowledge
- Specialized techniques
- When to use vs other agents
```

Supported frontmatter fields: `name`, `description`, `model`, `effort` (`low`/`medium`/`high`), `maxTurns`, `tools`, `disallowedTools`, `skills`, `memory`, `background`, `isolation` (`worktree` only).

Note: `hooks`, `mcpServers`, and `permissionMode` are **not** supported in plugin-shipped agents for security reasons.

## File Permissions

Scripts must be executable:

```bash
chmod +x scripts/helper.sh
chmod +x bin/server
```
