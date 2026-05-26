# Bootstrap Patterns

Bootstrap injection is how an agent learns that skills exist at the start of a session. The right mechanism varies by provider.

## What Bootstrap Injection Does

Without bootstrap, an agent starts a session with no knowledge that skills are available. Bootstrap solves this by injecting a brief awareness prompt — usually listing available skills and how to invoke them — before the agent takes any action.

The goal is minimal: tell the agent skills exist, name them, tell it how to invoke them. Don't inject skill content itself; that's loaded on demand when the agent invokes a skill.

---

## Claude Code — No Injection Needed

Claude Code has native skill discovery. When a plugin is installed, the `Skill` tool is available automatically and skill names are surfaced in the system prompt. No bootstrap code is required.

If you want additional session-level context (e.g., which skills to prioritize), add a `CLAUDE.md` at the repo root:

```markdown
# CLAUDE.md

When starting work, invoke the `using-my-plugin` skill first.
```

---

## Codex — `AGENTS.md`

Codex loads `AGENTS.md` at the repo root as session context. This is the cheapest bootstrap for Codex: no code, just a markdown file.

```markdown
# AGENTS.md

This project includes skills. Always invoke the relevant skill before starting work.

Available skills (use the `skill` tool):
- my-skill: [one-line description of when to invoke]
- another-skill: [one-line description]

Example: `skill("my-skill")`
```

Keep it concise. `AGENTS.md` is loaded on every session, so injecting large amounts of text here wastes tokens.

---

## OpenCode — JS Bootstrap Module

OpenCode requires a JavaScript ES module. The module's `onMessage` hook fires on every message; inject bootstrap only on the first user message.

### Minimal pattern

```js
// .opencode/plugins/my-plugin.js
import { readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const PLUGIN_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SKILLS_DIR = join(PLUGIN_ROOT, 'skills');

let _bootstrap = null;

function getBootstrap() {
  if (_bootstrap) return _bootstrap;

  const skills = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && existsSync(join(SKILLS_DIR, e.name, 'SKILL.md')))
    .map(e => `- ${e.name}`);

  _bootstrap = [
    'Skills are available in this project. Invoke with activate_skill("<name>") before acting.',
    '',
    'Available skills:',
    ...skills,
  ].join('\n');

  return _bootstrap;
}

export default {
  name: 'my-plugin',

  async onMessage(ctx) {
    if (ctx.messageIndex === 0 && ctx.role === 'user') {
      ctx.prependText(getBootstrap());
    }
  },
};
```

### Key implementation rules

**Inject via user message, not system prompt.** The system prompt is sent on every request. A user-message injection happens once, at session start, and is cheaper.

**Cache at module level.** The skill list doesn't change during a session. Read the filesystem once, cache the result, return the cached value on subsequent (unrelated) calls.

**Keep the injected text short.** List skill names and invocation syntax only. Don't inject SKILL.md content — that's what the `activate_skill` call is for.

**Don't inject on follow-up messages.** Check `ctx.messageIndex === 0` (or provider equivalent) to fire only on the first user message.

### Optional: tool name rewriting

If you want to keep SKILL.md content in Claude Code canonical form (using `Skill(...)`) but surface OpenCode syntax in the bootstrap, rewrite during injection:

```js
const bootstrap = getBootstrap()
  .replace(/`Skill\(/g, '`activate_skill(')
  .replace(/Skill\("/g, 'activate_skill("');
ctx.prependText(bootstrap);
```

---

## Gemini CLI — `GEMINI.md`

Gemini CLI reads `GEMINI.md` at the repo root at session start, analogous to `AGENTS.md` for Codex. No code needed.

```markdown
# GEMINI.md

## Skills

This project includes skills. Use `activate_skill("<name>")` before starting work.

Available skills:
- my-skill: [one-line description]
- another-skill: [one-line description]
```

---

## Comparison

| Provider | Mechanism | Code required | Token cost |
|----------|-----------|--------------|------------|
| Claude Code | Native discovery | None | Zero |
| Codex | `AGENTS.md` at repo root | None | Low (one-time load) |
| OpenCode | JS `onMessage` hook | Yes | Low (first message only) |
| Cursor | _(provider-specific)_ | _(check docs)_ | — |
| Gemini CLI | `GEMINI.md` at repo root | None | Low (one-time load) |

## Anti-Patterns

- **Don't inject full SKILL.md content in bootstrap.** Skills should be loaded on demand. Bootstrap is just an index.
- **Don't put bootstrap in the system prompt** when a cheaper injection point exists.
- **Don't re-inject on every message.** Guard with a message index check or a session flag.
- **Don't hardcode skill names.** Enumerate them from the filesystem so the list stays current automatically.
