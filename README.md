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
claude plugin marketplace add joeblackwaslike/agent-marketplace
claude plugin install agent-skills
```

## Skills

42 skills, grouped by what you're doing. Invoke by name — `skill("working-with-github")` in Codex syntax, or via the Skill tool in Claude Code.

### Agentic development

| Skill | What it does |
| --- | --- |
| `best-practices-for-agentic-development` | Design patterns for agents, agentic workflows, MCP servers, tool interfaces, and subagent systems |
| `authoring-agent-skills` | Create and maintain skills in this repo — especially `working-with-X` skills that wrap official docs |
| `agent-instructions` | Write CLAUDE.md / AGENTS.md / GEMINI.md at the right scope, with scope diagnosis and precedence rules |
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
| `working-with-cursor` | Cursor IDE rules, skills, plugins, MCP servers, agents, hooks |
| `working-with-opencode` | OpenCode CLI, plugins, skills, hooks, configuration |
| `working-with-serena` | Symbol-level code retrieval and editing via Language Servers — **mandatory before reading or editing code** |
| `working-with-pieces` | Pieces OS, Desktop, CLI, editor plugins, MCP server, long-term memory, TS/Python SDKs |

### Building plugins

| Skill | What it does |
| --- | --- |
| `developing-claude-code-plugins` | Create, modify, test, and release Claude Code plugins |
| `developing-codex-plugins` | Create, modify, test, and release Codex plugins |
| `developing-cursor-plugins` | Create, modify, test, and release Cursor plugins |
| `developing-gemini-plugins` | Create, modify, test, and release Gemini CLI extensions and Antigravity plugins |
| `developing-opencode-plugins` | Create, modify, test, and release OpenCode skills and npm/Bun plugins |
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
| `working-with-dolt` | The version-controlled SQL database that branches, diffs, and merges like Git |

### Engineering practice

| Skill | What it does |
| --- | --- |
| `test-driven-development` | Test-first for TypeScript and Python — red-green-refactor, applied to features and bugfixes |
| `domain-driven-design` | Aggregates, entities, value objects, domain events, repositories, CQRS |
| `solid-principles` | Designing and refactoring classes, modules, and interfaces |

### Vercel

| Skill | What it does |
| --- | --- |
| `working-with-vercel` | The hosting platform and `vercel` CLI — deploy, dev, env, dns, domains, blob, edge-config |
| `working-with-vercel-api` | The REST API and `@vercel/sdk` |
| `working-with-vercel-ai-sdk` | The `ai` package — generateText, streamText, structured objects, embeddings, tool calling |

### Shell & environment

| Skill | What it does |
| --- | --- |
| `working-with-bash` | Commands, builtins, `shopt`/`set -o`, parameter expansion, test operators |
| `working-with-zsh` | Commands, builtins, `setopt`, glob qualifiers, expansions, Bash→Zsh migration |
| `devcontainers` | Build, modify, and distribute Dev Containers — `devcontainer.json`, features, publishing |

### Docs & research

| Skill | What it does |
| --- | --- |
| `web-research` | Router — picks the best search and fetch tool for any research task |
| `docusaurus-docs-builder` | Create or overhaul a Docusaurus docs site |
| `github-readme-overhaul` | Rewrite and visually overhaul a README for installs, stars, and marketplace conversion |
