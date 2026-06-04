# Codex Plugin Structure Reference

## Standard Directory Layout

All paths relative to plugin root:

```text
my-plugin/
├── .codex-plugin/
│   └── plugin.json          # REQUIRED — Plugin metadata and manifest
├── AGENTS.md                # Optional but recommended — Session bootstrap context
├── skills/                  # Optional — Agent skills
│   └── skill-name/
│       ├── SKILL.md         # Required for each skill
│       ├── scripts/         # Optional — Executable helpers
│       ├── references/      # Optional — Documentation files
│       └── assets/          # Optional — Templates/static files
├── hooks/                   # Optional — Event handler scripts
│   ├── hooks.json           # Hook configuration
│   └── *.sh                 # Hook scripts (must be executable)
├── commands/                # Optional — Custom slash commands
│   └── command-name.md
├── bin/                     # Optional — Executables added to PATH
├── LICENSE
└── README.md
```

## Critical Rules

### 1. `.codex-plugin/` Contains ONLY Manifests

❌ WRONG:
```text
.codex-plugin/
├── plugin.json
├── skills/              # NO — skills don't go here
└── hooks/               # NO — hooks don't go here
```

✅ CORRECT:
```text
.codex-plugin/
└── plugin.json          # Only the manifest

skills/                  # Skills at plugin root
hooks/                   # Hooks at plugin root
```

### 2. Point `plugin.json` to Your Skills Directory

The `skills` field in `plugin.json` must point to the skills directory relative to plugin root.

```json
{
  "name": "my-plugin",
  "skills": "./skills/"
}
```

### 3. AGENTS.md Belongs at Plugin Root

`AGENTS.md` is the session bootstrap file Codex reads when a session starts. It should:
- List available skills with their invocation syntax
- Provide brief context about what the plugin does
- NOT be placed inside `.codex-plugin/`

### 4. Make Hook Scripts Executable

```bash
chmod +x hooks/on-file-write.sh
chmod +x hooks/session-start.sh
```

---

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
  "author": {"name": "Your Name"},
  "skills": "./skills/",
  "license": "MIT"
}
```

### Complete Version (all fields)

```json
{
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
  "skills": "./skills/",
  "hooks": "./hooks/hooks.json"
}
```

---

## Component Formats

### Skills (skills/skill-name/SKILL.md)

```markdown
---
name: skill-name
description: Use when [triggering conditions] — [what it does]
---

# Skill Name

## Overview

What this skill does in 1–2 sentences.

## When to Use

- Specific scenario 1
- Specific scenario 2

## Workflow

1. Step one
2. Step two
3. Step three
```

The `description` field is critical — it's what Codex uses to decide when to invoke the skill. Write it as a specific, triggering condition.

### Hooks (hooks/hooks.json)

```json
{
  "hooks": {
    "PostFileWrite": [
      {
        "matcher": "\\.ts$|\\.js$",
        "command": "./hooks/on-file-write.sh"
      }
    ],
    "SessionStart": [
      {
        "command": "./hooks/session-start.sh"
      }
    ]
  }
}
```

Available hook events:
- `SessionStart` — fires when a Codex session begins
- `SessionEnd` — fires when a Codex session ends
- `PreToolUse` — fires before any tool is executed
- `PostToolUse` — fires after any tool completes
- `PostFileWrite` — fires after a file is written

Hook scripts receive event context via environment variables or stdin (JSON). Check the official docs for the specific payload format per event.

### Commands (commands/command-name.md)

```markdown
---
description: Brief description of what this command does
---

# Command Instructions

Tell Codex what to do when this command is invoked.
Be specific and clear about the expected behavior.
```

### AGENTS.md (plugin root)

```markdown
# My Plugin

This session includes skills from `my-plugin`. Use the `skill()` tool to invoke them:

## Available Skills

- `skill("skill-name")` — When to use this skill and what it does
- `skill("another-skill")` — Another skill description

## Quick Start

For [common task], invoke `skill("skill-name")`.
```

---

## Local Development

Load a plugin from a local path for testing without installing it:

```bash
codex --plugin-dir ./my-plugin
```

Or add it to your Codex config for persistent loading during development:

```yaml
# ~/.codex/config.yaml
plugins:
  - path: /absolute/path/to/my-plugin
```

---

## Distribution

### Direct GitHub Distribution

Users install your plugin with:
```bash
codex plugin install github:your-org/your-plugin-repo
```

Your `.codex-plugin/plugin.json` serves as the manifest.

### Marketplace Distribution

Register your plugin in a marketplace repository. See the `multi-provider-plugins` skill for the canonical pattern for plugins that support both Claude Code and Codex.

---

## File Permissions

Hook scripts must be executable before they'll run:

```bash
chmod +x hooks/*.sh
chmod +x bin/*
```

Git tracks the executable bit — set it once and commit:
```bash
git add hooks/my-hook.sh
git update-index --chmod=+x hooks/my-hook.sh
```
