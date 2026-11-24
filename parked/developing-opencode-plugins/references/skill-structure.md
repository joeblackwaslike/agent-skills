# OpenCode Skill Structure Reference

## What a Skill Is

A skill is a directory containing a `SKILL.md` file with YAML frontmatter. When an agent invokes a skill, the file's content is loaded into the session as context. Skills are instruction sets, workflows, and reference material — not code.

---

## SKILL.md Format

```markdown
---
name: skill-name
description: Use when [trigger condition] — [what it provides]
---

# Skill Name

## Overview

What this skill does in 1–2 sentences.

## When to Use

- Specific scenario A
- Specific scenario B

## Workflow / Reference

[Step-by-step instructions, tables, examples, etc.]
```

### Required Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique identifier, kebab-case, 1–64 chars |
| `description` | string | Trigger condition — how agents decide to invoke it |

### Optional Frontmatter Fields

| Field | Description |
|-------|-------------|
| `license` | SPDX license identifier |
| `compatibility` | Compatible agent environments |
| `metadata` | Arbitrary metadata object |

---

## Directory Layout

Minimal skill:
```
my-skill/
└── SKILL.md
```

Skill with references (progressive disclosure pattern):
```
my-skill/
├── SKILL.md              # routing table and overview — kept short
├── references/           # detailed content read on demand
│   ├── patterns.md
│   ├── api-reference.md
│   └── examples.md
├── assets/               # templates, code samples
└── scripts/              # update scripts for auto-fetched docs
    └── update_docs.js
```

---

## Skill Registration Paths

OpenCode discovers skills from multiple locations. Listed in priority order:

### 1. Project-level (auto-discovered)

```
./opencode.json
.opencode/
└── skills/
    └── my-skill/
        └── SKILL.md
```

OpenCode walks up from the current working directory to the worktree root looking for `.opencode/`.

### 2. Global (always available)

```
~/.config/opencode/
└── skills/
    └── my-skill/
        └── SKILL.md
```

> ⚠️ Global config is `~/.config/opencode/` — NOT `~/.opencode/` which is legacy/deprecated.

### 3. Via `opencode.json` additional paths

```json
{
  "$schema": "https://opencode.ai/config.json",
  "skills": {
    "paths": ["/abs/path/to/skills-dir", "./relative/skills"],
    "urls": ["https://example.com/.well-known/skills/"]
  }
}
```

### 4. External auto-loaded paths (no config needed)

OpenCode automatically picks up skills from cross-agent directories:

```
~/.agents/skills/<name>/SKILL.md
~/.claude/skills/<name>/SKILL.md
```

This is how multi-provider skill packages (like `agent-skills`) work — symlink or copy the skill directory to one of these paths.

---

## opencode.json Config Schema (skills section)

```json
{
  "$schema": "https://opencode.ai/config.json",
  "skills": {
    "paths": [
      ".opencode/skills",
      "/absolute/path/to/more/skills"
    ],
    "urls": [
      "https://example.com/.well-known/skills/"
    ]
  }
}
```

- `paths`: array of directories, each containing `<skill-name>/SKILL.md` subdirectories
- `urls`: array of remote well-known skill registry URLs

---

## File Permissions

SKILL.md files are plain markdown — no executable bit required.
If your skill includes helper scripts (`scripts/update_docs.js`), make them executable:

```bash
chmod +x scripts/update_docs.js
git update-index --chmod=+x scripts/update_docs.js
```

---

## Packaging for Distribution

### As part of a multi-provider plugin (agent-skills pattern)

Skills live in a shared `skills/` directory at repo root. Symlinks point to provider-specific locations:

```bash
# For OpenCode global skills
ln -s /path/to/repo/skills/my-skill ~/.config/opencode/skills/my-skill

# For multi-provider auto-loading
ln -s /path/to/repo/skills/my-skill ~/.agents/skills/my-skill
```

### As a standalone skill

Host in a GitHub repo. Users reference via URL in `opencode.json`:
```json
{
  "skills": {
    "urls": ["https://raw.githubusercontent.com/you/skill-name/main/.well-known/skills/"]
  }
}
```

Or users symlink manually:
```bash
git clone https://github.com/you/skill-name ~/.config/opencode/skills/skill-name
```
