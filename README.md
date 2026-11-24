# agent-skills

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-42-blue)](#skills)
[![Claude Code](https://img.shields.io/badge/works%20with-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Gemini-ea580c)](https://claude.ai/code)
[![Discord](https://img.shields.io/discord/1486035859747897414?logo=discord&label=Discord&color=5865F2)](https://discord.gg/Fjc9zYHZyV)

> Forty-two skills your agent reads before it guesses.

A plugin bundling custom skills for Claude Code, Codex CLI, Gemini CLI, and Antigravity CLI — easy installation in any agent environment.

Every `working-with-X` skill regenerates weekly from upstream documentation, so it doesn't rot.

## Install

```bash
# Claude Code
claude plugin marketplace add joeblackwaslike/agent-marketplace
claude plugin install agent-skills

# Codex CLI
codex plugin marketplace add joeblackwaslike/agent-marketplace
codex plugin add agent-skills@agent-marketplace

# Gemini CLI
gemini extensions install https://github.com/joeblackwaslike/agent-skills --auto-update
```

OpenCode has no plugin/marketplace mechanism for skills — it reads them straight off disk.
Clone this repo, then add its `skills/` directory to `skills.paths` in `opencode.json`
(global: `~/.config/opencode/opencode.json`, or a project's own `opencode.json`):

```json
{ "skills": { "paths": ["/path/to/agent-skills/skills"] } }
```

## Skills

Skills, grouped by what you're doing. Invoke by name — `skill("working-with-github")` in Codex syntax, or via the Skill tool in Claude Code.

### Agentic development

| Skill | What it does |
| --- | --- |
| `best-practices-for-agentic-development` | Design patterns for agents, agentic workflows, MCP servers, tool interfaces, and subagent systems |
| `authoring-agent-skills` | Create and maintain skills in this repo — especially `working-with-X` skills that wrap official docs |
| `agent-instructions` | Write CLAUDE.md / AGENTS.md / GEMINI.md at the right scope, with scope diagnosis and precedence rules |
| `skill-principles` | The standard for the instructions inside a skill: rule strength, trigger descriptions, rationalization defenses, examples, diagrams, agent pipelines |
| `reviewing-skills` | Review a skill before it ships with a mechanical gate, fresh-eyes reviewer agents and optional pressure scenarios; ships the `/review-skill` command |
| `multi-provider-plugins` | Make a Claude Code plugin work across Codex, OpenCode, Cursor, and Gemini CLI |
| `interactive-system-docs` | Build a self-contained interactive HTML explainer for a complex system — D3 graphs, data flows, state machines |
| `recovering-session-context` | Reconstruct prior sessions from transcripts and surface everything raised but never resolved |
| `autonomous-agent-operations` | Operate solo on a handed-off task — ask every clarifying question up front, decide and ticket genuine mid-run forks instead of blocking or guessing, summarize and record a worked example at the end |

### Coding agents & CLIs

| Skill | What it does |
| --- | --- |
| `working-with-claude-code` | Claude Code CLI, plugins, hooks, MCP, skills, configuration |
| `working-with-codex` | Codex CLI, plugins, skills, hooks, configuration |
| `working-with-gemini` | Gemini CLI and Antigravity — extensions, skills, hooks, GEMINI.md |

### Building plugins

| Skill | What it does |
| --- | --- |
| `developing-claude-code-plugins` | Create, modify, test, and release Claude Code plugins |
| `developing-codex-plugins` | Create, modify, test, and release Codex plugins |
| `developing-gemini-plugins` | Create, modify, test, and release Gemini CLI extensions and Antigravity plugins |
| `vscode-extension-builder-lawvable` | Build, test, package, and publish VS Code extensions — commands, webviews, custom editors |

### Git, GitHub & releases

| Skill | What it does |
| --- | --- |
| `git-github-workflows` | Router — picks the right skill for any git or GitHub operation |
| `working-with-git` | Git itself: commands, flags, history rewriting, bisect, recovery |
| `working-with-github` | GitHub itself: `gh` CLI, REST and GraphQL APIs, PRs, code review, releases, branch protection |
| `working-with-github-actions` | CI/CD workflows — YAML syntax, triggers, job orchestration, debugging, optimization |
| `developing-for-github` | Build on GitHub: Apps, OAuth apps, webhook consumers, bots, CI checks |
| `working-with-release-please` | Conventional-commit release automation — release PRs, versioning, changelogs |

### Issue tracking & data

| Skill | What it does |
| --- | --- |
| `working-with-beads` | The beads CLI (`bd`) — issues, dependencies, epics, gates, swarm, federation |
| `beads-operations` | Running beads day to day: `bd` vs TodoWrite, shared-server conventions, troubleshooting |
| `beadboard-operations` | Operating the BeadBoard dashboard and its launchd services |

### Engineering practice

| Skill | What it does |
| --- | --- |
| `domain-driven-design` | Aggregates, entities, value objects, domain events, repositories, bounded contexts |
| `data-modeling` | Design new tables and relationships for a feature: access patterns first, a one-page spec section with a DBML model, and a review checklist |
| `code-architectures` | Hexagonal/clean layering, CQRS, event sourcing, event-driven design, sagas, monolith vs microservices, service communication, distributed data |
| `solid-principles` | Designing and refactoring classes, modules, and interfaces |
| `senior-engineering-best-practices` | Career-built senior-engineer judgment — due diligence, root-cause discipline, blast-radius/dependency/observability judgment |
| `reviewing-code` | Self-review your own diff before a PR with fresh-eyes reviewer agents; ships the `/self-review` command |
| `engineering-principles` | Principles for writing and designing code (scope, design, correctness, readability) plus Python, TypeScript, Rust, shell and SQL idioms |
| `design-patterns` | Catalog of production design patterns (Strategy, Observer, Repository, Retry, Circuit Breaker, Outbox and more) with Python and TypeScript references; defaults to no pattern |
| `testing-code` | The process skill for writing tests (pick the kind, write the body, build fixtures and doubles) plus flake and slow-suite diagnosis, with language pages for Python, TypeScript, Rust, shell and SQL |
| `testing-principles` | The written standard for tests (what to test, kinds, doubles, isolation, flakes, coverage, mutation) with the test-driven development reference inside it |

### Docs & research

| Skill | What it does |
| --- | --- |
| `web` | Router — picks the best search and fetch tool for any research task |
| `docusaurus-docs-builder` | Create or overhaul a Docusaurus docs site |
| `github-readme-overhaul` | Rewrite and visually overhaul a README for installs, stars, and marketplace conversion |

## Parked and archived skills

These directories sit outside `skills/`, so no plugin manifest ships them and the weekly doc update skips them.

- `parked/` holds skills that work but have no clear place yet: `devcontainers`, `working-with-serena`, `working-with-zsh`, `working-with-bash`, `working-with-pieces`, `working-with-dolt`, `working-with-opencode`, `working-with-cursor`, `developing-opencode-plugins`, `developing-cursor-plugins`. To bring one back, `git mv parked/<name> skills/<name>`, point its `update-<name>` Makefile target back at `skills/<name>`, and restore its registry rows in `README.md`, `SKILLS.md`, `GEMINI.md` and `AGENTS.md` (the rows removed in commit `ad321c30` show the old wording).
- `archive/` holds skills due to be replaced by official ones: `working-with-vercel`, `working-with-vercel-api`, `working-with-vercel-ai-sdk`. Restore one the same way, from `archive/` instead of `parked/`.
