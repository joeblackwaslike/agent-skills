# Provider Adapters

Each provider needs a thin adapter that tells it where to find skills and how to bootstrap them. Create only the adapters for providers you actually support.

---

## Claude Code — `.claude-plugin/plugin.json`

Claude Code has native skill discovery. The adapter is a minimal JSON manifest.

```json
{
  "name": "my-plugin",
  "description": "What this plugin does.",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "homepage": "https://github.com/you/my-plugin",
  "repository": "https://github.com/you/my-plugin",
  "license": "MIT",
  "keywords": ["relevant", "keywords"]
}
```

Skills are auto-discovered from `skills/<name>/SKILL.md` — no explicit listing needed. Version is derived from git SHA unless you set a `"version"` field. No bootstrap code required.

> **Note:** The manifest must be at `.claude-plugin/plugin.json`. A root-level `plugin.json` is silently ignored by Claude Code.

---

## Codex — `.codex-plugin/plugin.json`

Codex uses the same manifest format as Claude Code. Copy your `.claude-plugin/plugin.json` to `.codex-plugin/plugin.json`. Add a `"skills"` pointer explicitly since Codex may not auto-discover:

```json
{
  "name": "my-plugin",
  "description": "What this plugin does.",
  "skills": "./skills/",
  "author": { "name": "Your Name", "email": "you@example.com" },
  "homepage": "https://github.com/you/my-plugin",
  "repository": "https://github.com/you/my-plugin",
  "license": "MIT"
}
```

For session-level context (skill awareness without invoking a specific skill), add an `AGENTS.md` at the repo root. Codex loads this at session start:

```markdown
# AGENTS.md

This repo includes skills for [topic]. Load the relevant skill before starting work.

Available skills: my-skill, another-skill

To invoke: use the `skill` tool with the skill name.
```

---

## OpenCode — `.opencode/plugins/<name>.js`

OpenCode requires a JavaScript ES module that programmatically registers the plugin and injects bootstrap context. Also requires `package.json` at the repo root.

### `package.json`

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "type": "module",
  "main": ".opencode/plugins/my-plugin.js"
}
```

### `.opencode/plugins/my-plugin.js`

```js
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = join(__dirname, '..', '..');

let cachedBootstrap = null;

function buildBootstrap() {
  if (cachedBootstrap) return cachedBootstrap;

  const skillsDir = join(PLUGIN_ROOT, 'skills');
  const lines = [
    'You have access to skills in this project. Invoke them before acting.',
    '',
    'Available skills:',
  ];

  // Enumerate skills by reading SKILL.md frontmatter names
  try {
    const { readdirSync } = await import('fs');
    for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const skillFile = join(skillsDir, entry.name, 'SKILL.md');
        if (existsSync(skillFile)) {
          lines.push(`- ${entry.name}`);
        }
      }
    }
  } catch {}

  lines.push('', 'Use activate_skill("<name>") to load a skill before starting work.');
  cachedBootstrap = lines.join('\n');
  return cachedBootstrap;
}

export default {
  name: 'my-plugin',

  // Called on every message; inject bootstrap only on the first user message
  async onMessage(ctx) {
    if (ctx.messageIndex === 0 && ctx.role === 'user') {
      const bootstrap = buildBootstrap();
      ctx.prependText(bootstrap);
    }
  },
};
```

> **Why user messages, not system prompt?** Injecting into the system prompt costs tokens on every request. Injecting into the first user message is cheaper and sufficient for skill awareness.

---

## Cursor — `.cursor-plugin/plugin.json`

Cursor uses a manifest similar to Claude Code's format. The adapter is minimal:

```json
{
  "name": "my-plugin",
  "description": "What this plugin does.",
  "skills": "./skills/",
  "author": { "name": "Your Name" },
  "license": "MIT"
}
```

Cursor resolves skills relative to the plugin root. No bootstrap code required if Cursor auto-discovers skills.

---

## Gemini CLI — `GEMINI.md`

Gemini CLI doesn't use a plugin manifest. Instead, it reads a `GEMINI.md` file at the repo root at session start — the Gemini equivalent of `CLAUDE.md`.

```markdown
# GEMINI.md

## Skills

This project includes skills. Use the `activate_skill` tool to load them before starting work.

Available skills:
- my-skill: [one-line description]
- another-skill: [one-line description]

Always invoke the relevant skill before taking action.
```

No adapter directory or bootstrap code needed.

---

## Summary

| Provider | Adapter location | Session context file | Bootstrap code |
|----------|-----------------|---------------------|----------------|
| Claude Code | `.claude-plugin/plugin.json` | `CLAUDE.md` | None |
| Codex | `.codex-plugin/plugin.json` | `AGENTS.md` | None |
| OpenCode | `.opencode/plugins/<name>.js` | _(built into JS plugin)_ | Yes (JS module) |
| Cursor | `.cursor-plugin/plugin.json` | _(provider-specific)_ | None |
| Gemini CLI | _(none)_ | `GEMINI.md` | None |
