# Cursor Plugin Structure Reference

## Standard Directory Layout

All paths relative to plugin root:

```text
my-plugin/
├── .cursor-plugin/
│   └── plugin.json          # REQUIRED — plugin metadata manifest
├── rules/                   # Optional — .mdc rule files
│   ├── coding-standards.mdc
│   └── testing-patterns.mdc
├── skills/                  # Optional — agent skills
│   └── skill-name/
│       ├── SKILL.md         # Required for each skill
│       ├── scripts/         # Optional — executable helpers
│       ├── references/      # Optional — documentation
│       └── assets/          # Optional — templates/files
├── commands/                # Optional — custom slash commands
│   └── command-name.md
├── agents/                  # Optional — specialized subagents
│   └── agent-name.md
├── hooks/                   # Optional — event handlers
│   └── hooks.json
├── mcp/                     # Optional — MCP server configs
│   └── servers.json
├── settings.json            # Optional — default settings
├── LICENSE
└── README.md
```

## Critical Rules

### 1. `.cursor-plugin/` Contains ONLY the Manifest

❌ WRONG:
```text
.cursor-plugin/
├── plugin.json
└── skills/           ← components MUST NOT go here
```

✅ CORRECT:
```text
.cursor-plugin/
└── plugin.json       ← manifest only
skills/               ← components at plugin root
```

### 2. Rules Must Use `.mdc` Extension

❌ WRONG:
```text
rules/
└── my-rule.md        ← ignored by Cursor
```

✅ CORRECT:
```text
rules/
└── my-rule.mdc       ← recognized and installed
```

### 3. Installed vs Source Rules

- **Source**: `rules/*.mdc` at plugin root (committed, version-controlled)
- **Installed**: `~/.cursor/rules/` or `.cursor/rules/` (managed by Cursor, not hand-edited)

Users should never edit installed copies — changes belong in the plugin source.

## Manifest Format (`plugin.json`)

Minimum required fields:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "What this plugin does",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  }
}
```

Extended manifest:

```json
{
  "name": "my-plugin",
  "version": "1.2.0",
  "description": "Comprehensive dev tooling for my team",
  "author": { "name": "Your Name", "email": "you@example.com" },
  "homepage": "https://github.com/you/my-plugin",
  "repository": "https://github.com/you/my-plugin",
  "license": "MIT",
  "keywords": ["cursor", "rules", "typescript"]
}
```

**Versioning**: follow semver — `MAJOR.MINOR.PATCH`.

## Component File Formats

### Rule (`.mdc`)

```yaml
---
description: Brief description used by AI to decide when to apply this rule
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---
# Rule Title

Rule content in Markdown...
```

### Skill (`SKILL.md`)

```yaml
---
name: skill-name
description: What this skill does and when the agent should invoke it
---
# Skill Title

Skill instructions in Markdown...
```

### Command (`commands/command-name.md`)

```markdown
---
name: command-name
description: What this command does
---
# Command Title

Step-by-step instructions the agent follows when this command is invoked...
```

### Hook (`hooks/hooks.json`)

```json
{
  "hooks": {
    "SessionStart": [
      {
        "command": "node",
        "args": ["${CURSOR_PLUGIN_ROOT}/hooks/on-session-start.js"]
      }
    ]
  }
}
```

### MCP Servers (`mcp/servers.json`)

```json
{
  "mcpServers": {
    "my-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "${DATABASE_URL}" }
    }
  }
}
```

## Local Development Setup

```bash
# Symlink plugin for live iteration (changes take effect after Reload Window)
ln -s $(pwd)/my-plugin ~/.cursor/plugins/local/my-plugin

# Reload Cursor to pick up changes
# Command palette: Developer: Reload Window

# Verify plugin loaded
# Check: Cursor Settings > Plugins
```

## Distribution Paths

| Channel | Audience | How |
|---------|----------|-----|
| Cursor Marketplace | Public | Submit at cursor.com/marketplace/publish |
| cursor.directory | Community | List via their submission form |
| Team Marketplace | Internal | GitHub repo configured in team settings |
| Direct GitHub | Manual users | README with symlink instructions |
