# Multi-Provider Plugin Architecture Overview

## The Core Pattern

One shared `skills/` directory. Multiple thin adapter directories, one per provider.

```
my-plugin/
├── skills/                      ← shared across ALL providers
│   ├── my-skill/
│   │   ├── SKILL.md
│   │   └── references/
│   └── another-skill/
│       └── SKILL.md
├── .claude-plugin/              ← Claude Code adapter
│   └── plugin.json
├── .codex-plugin/               ← Codex adapter
│   └── plugin.json
├── .opencode/                   ← OpenCode adapter
│   └── plugins/
│       └── my-plugin.js
├── .cursor-plugin/              ← Cursor adapter (optional)
│   └── plugin.json
├── AGENTS.md                    ← Codex + other CLI tools session context
├── GEMINI.md                    ← Gemini CLI session context
└── package.json                 ← "main" points to OpenCode entry
```

Skills are authored once. Each provider adapter handles discovery and, where the provider requires it, bootstrap injection.

## Data Flow

```
Provider starts session
    │
    ▼
Provider loads adapter (manifest file or JS plugin)
    │
    ▼
Adapter declares plugin, points at skills/ directory
    │
    ▼
Provider discovers SKILL.md files → skills become available
    │
    ▼
Bootstrap injected at session start (provider-specific mechanism)
    │
    ▼
Agent invokes skills via provider's native tool (Skill / skill / activate_skill)
```

## Reference Implementation

[obra/superpowers](https://github.com/obra/superpowers) demonstrates this pattern running across Claude Code, Codex, OpenCode, Cursor, and Gemini CLI. Its top-level structure:

```
obra/superpowers/
├── .claude-plugin/
│   └── plugin.json              ← skills: "./skills/"
├── .codex-plugin/
│   └── plugin.json              ← identical structure to .claude-plugin/
├── .opencode/
│   ├── plugins/
│   │   └── superpowers.js       ← ES module bootstrap adapter
│   └── INSTALL.md
├── .cursor-plugin/              ← cursor support
├── assets/                      ← branding (svg, png)
├── skills/                      ← all shared skills
│   ├── brainstorming/
│   ├── using-superpowers/
│   ├── writing-plans/
│   └── ...
├── CLAUDE.md                    ← Claude Code session context
├── AGENTS.md                    ← Codex session context
├── GEMINI.md                    ← Gemini CLI session context
└── package.json                 ← type: module, main: .opencode/plugins/superpowers.js
```

The `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json` are nearly identical — Codex adopted the same manifest format as Claude Code.

## When to Adopt This Pattern

**Start multi-provider from day one if:**
- You plan to publish the plugin for others who use Codex, OpenCode, or Cursor
- Your skills make no Claude-specific assumptions
- You want a single source of truth for skill content regardless of which agent uses it

**Add providers incrementally if:**
- You have an existing Claude Code plugin and want to expand reach
- Provider adapters can be added one at a time without touching shared skill content

**Skip additional providers if:**
- Skills depend on Claude Code-only tools with no cross-provider equivalents (`EnterWorktree`, `ExitPlanMode`, `EnterPlanMode`)
- The plugin is personal-use only in a single provider

## Adapter Complexity by Provider

| Provider | Adapter Type | Complexity |
|----------|-------------|------------|
| Claude Code | JSON manifest | Minimal — just `name` + `skills` path |
| Codex | JSON manifest | Minimal — same format as Claude |
| Cursor | JSON manifest | Minimal — same manifest pattern |
| Gemini CLI | `GEMINI.md` file | None — just a markdown file at repo root |
| OpenCode | JS ES module | Moderate — bootstrap injection in code |
