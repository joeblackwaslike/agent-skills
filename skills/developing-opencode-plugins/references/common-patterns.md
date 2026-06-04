# OpenCode Extension Patterns

## Decision Matrix

| Pattern | Use Case | Effort | Format |
|---------|----------|--------|--------|
| **Single skill** | One focused instruction set | Minimal | `SKILL.md` |
| **Skill collection** | Related skills for a domain | Low | Multiple `SKILL.md` |
| **Skill + commands** | Skills + custom slash commands | Low | `SKILL.md` + `.opencode/command/*.md` |
| **Skill + agents** | Specialized AI personas | Medium | `SKILL.md` + `.opencode/agent/*.md` |
| **Plugin** | External tool/API integration | High | npm/Bun TypeScript package |
| **Multi-provider skill package** | Portable across Claude Code + Codex + OpenCode | Medium | Shared `skills/` + per-platform symlinks |

---

## Pattern 1: Single Skill

**When:** One narrowly-scoped domain, self-contained instructions.

**Examples:** "Review PRs for security issues", "Generate conventional commit messages", "Explain Effect-TS patterns"

```
.opencode/skills/
└── my-skill/
    └── SKILL.md
```

`opencode.json`: nothing needed — auto-discovered from `.opencode/skills/`.

---

## Pattern 2: Skill Collection

**When:** Multiple related skills that share a domain but work independently. 3–7 skills typical.

**Examples:** PostgreSQL helpers, testing patterns, deployment workflows, OpenCode configuration

```
.opencode/skills/
├── skill-one/
│   └── SKILL.md
├── skill-two/
│   └── SKILL.md
└── skill-three/
    ├── SKILL.md
    └── references/
        └── detailed-guide.md
```

`AGENTS.md`:
```markdown
# Project

Available skills:

| Skill | When to Use |
|-------|-------------|
| `skill-one` | When doing X |
| `skill-two` | When doing Y |
```

---

## Pattern 3: Skill + Custom Commands

**When:** Skills cover knowledge/workflow, commands automate common one-shot tasks.

Commands are markdown files invoked with `/command-name` in the TUI.

```
.opencode/
├── skills/
│   └── my-skill/SKILL.md
└── command/
    ├── commit.md       # /commit
    ├── changelog.md    # /changelog
    └── review.md       # /review
```

`command/commit.md`:
```markdown
Generate a conventional commit message for the staged changes.
Use the format: type(scope): description
Types: feat, fix, docs, refactor, test, chore
Keep the subject under 72 characters.
```

Live examples from the OpenCode repo: `command-commit.md`, `command-changelog.md`, `command-issues.md` in the `working-with-opencode` references.

---

## Pattern 4: Skill + Agents

**When:** You need specialized AI personas with different models or instruction sets.

```
.opencode/
├── skills/
│   └── my-skill/SKILL.md
└── agent/
    ├── reviewer.md      # security-focused reviewer
    └── architect.md     # architecture decision support
```

`opencode.json`:
```json
{
  "agent": {
    "reviewer": {
      "model": "anthropic/claude-opus-4-8",
      "description": "Security-focused code reviewer"
    },
    "architect": {
      "model": "anthropic/claude-sonnet-4-6",
      "description": "Architecture and design decisions"
    }
  }
}
```

`agent/reviewer.md` — the agent's system prompt:
```markdown
You are a security-focused code reviewer. For every change you review:
1. Check for injection vulnerabilities (SQL, command, path traversal)
2. Verify authentication and authorization boundaries
3. Look for secrets or credentials in code
4. Flag unsafe deserialization
Be specific about file and line numbers.
```

---

## Pattern 5: npm Plugin

**When:** You need to connect to an external system — database, API, CI platform, etc.

```
opencode-my-plugin/
├── package.json
├── plugin.ts
└── README.md
```

`opencode.json`:
```json
{
  "plugin": ["opencode-my-plugin"]
}
```

Use this pattern for:
- Database query tools (`query_table`, `run_migration`)
- CI/CD tools (`trigger_pipeline`, `get_build_status`)
- External API tools (`create_ticket`, `search_docs`)
- Infrastructure tools (`deploy_to_staging`, `get_logs`)

---

## Pattern 6: Multi-Provider Skill Package

**When:** You want a skill to work across Claude Code, Codex CLI, and OpenCode.

All three platforms use the same `SKILL.md` format. The difference is where skills are loaded from:

| Platform | Auto-load path |
|----------|----------------|
| Claude Code | `~/.claude/skills/<name>/` |
| Codex CLI | `~/.codex/skills/<name>/` |
| OpenCode | `~/.agents/skills/<name>/` or `~/.claude/skills/<name>/` |

**Standard layout:**
```
my-skills-repo/
├── skills/
│   ├── my-skill-a/SKILL.md
│   └── my-skill-b/SKILL.md
├── .claude-plugin/plugin.json    # Claude Code manifest
├── .codex-plugin/plugin.json     # Codex CLI manifest
├── gemini-extension.json         # Gemini CLI manifest
├── CLAUDE.md                     # Claude Code session bootstrap
├── AGENTS.md                     # Codex session bootstrap
└── GEMINI.md                     # Gemini/Antigravity session bootstrap
```

**Symlink setup:**
```bash
# OpenCode
ln -s /path/to/repo/skills/my-skill ~/.agents/skills/my-skill

# Claude Code
ln -s /path/to/repo/skills/my-skill ~/.claude/skills/my-skill

# Codex
ln -s /path/to/repo/skills/my-skill ~/.codex/skills/my-skill
```

See the `multi-provider-plugins` skill for the complete architecture guide.

---

## Migration Path

**Single skill → Skill collection:**
When you naturally write a second related skill.

**Skill collection → Skill + commands:**
When users ask "can I run this with one command?" for a common workflow.

**Skill + commands → Skill + agents:**
When different personas need different models or system prompts.

**Any skill pattern → Plugin:**
When you genuinely need to connect to an external system that can't be accessed via shell commands in a hook.

**Don't build more than you need.** Start with a single skill. The simplest working pattern is the right one.
