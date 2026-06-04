# agent-skills

A Claude Code plugin that bundles all of my custom developed skills for easy installation in any agent environment. 

## Plugin Development

When working on or developing this plugin (modifying hooks, commands, skills, or plugin.json), load these before making any structural changes:

- `plugin-dev@claude-plugins-official` — canonical directory layout, manifest spec, hook wiring format, command frontmatter rules
- `skill-creator@claude-plugins-official` — skill description quality, progressive disclosure, trigger reliability, writing style

## Auto-generated docs convention

Skills that wrap external documentation use a fetch script to keep references current. The convention:

- **Script location:** `skills/<name>/scripts/update.js` (or `update.sh`)
- **Output location:** `skills/<name>/references/`
- **Exit behavior:** non-zero on failure, 0 on success
- **Docs are content:** generated files are committed to the repo, not gitignored
- **Discovery:** `Makefile` and CI glob `skills/*/scripts/update*.{js,sh}` automatically — no registration needed

To update all auto-generated docs locally: `make update-all`  
To update a specific skill: `make update-<skill-name>`  
To see what scripts exist: `make list-update-scripts`

A GitHub Actions workflow (`.github/workflows/update-docs.yml`) runs `make update-all` weekly (Monday 4am UTC) and commits any changed files.

Existing example: `skills/working-with-claude-code/scripts/update_docs.js`

## Agent Instruction Files (CLAUDE.md / AGENTS.md)

**CLAUDE.md is the source of truth.** Key cross-tool differences to remember when creating or editing instruction files:

- **Claude Code** reads `CLAUDE.md`. Supports `@filename` import syntax (e.g. `@AGENTS.md` pulls that file inline).
- **Codex CLI** reads `AGENTS.md` as plain Markdown — **no `@file` import/include syntax exists**. Writing `@CLAUDE.md` in AGENTS.md does nothing; Codex just sees it as a broken line.
- **Best pattern:** Write everything in `CLAUDE.md`. Add `project_doc_fallback_filenames = ["CLAUDE.md"]` to `~/.codex/config.toml` so Codex reads CLAUDE.md when AGENTS.md is absent. Delete or omit AGENTS.md.
- **Codex plugin commands:** `codex plugin marketplace add/upgrade/remove` only. There is **no `codex plugin install`** subcommand.

## Task management

This repo uses beads for task management so be sure to load the beads skill whenever working with tasks.

## Available Skills

Invoke with `skill("name")` (Codex syntax) or via the Skill tool in Claude Code:

| Skill | When to Invoke |
| --- | --- |
| `best-practices-for-agentic-development` | Before designing agents, MCP servers, multi-step workflows, or skill systems |
| `working-with-claude-code` | Working with Claude Code CLI, plugins, hooks, MCP, skills, or any Claude Code feature |
| `developing-claude-code-plugins` | Creating, modifying, testing, or releasing Claude Code plugins |
| `working-with-codex` | Working with the Codex CLI, plugins, skills, hooks, configuration, or any Codex feature |
| `developing-codex-plugins` | Creating, modifying, testing, or releasing Codex plugins |
| `working-with-gemini` | Working with Gemini CLI or Antigravity CLI — extensions, skills, hooks, configuration |
| `developing-gemini-plugins` | Creating, modifying, testing, or releasing Gemini CLI extensions or Antigravity plugins |
| `working-with-opencode` | Working with OpenCode CLI — skills, plugins, configuration, commands, agents |
| `developing-opencode-plugins` | Creating, modifying, testing, or releasing OpenCode skills or npm/Bun plugins |
| `multi-provider-plugins` | Making a plugin compatible with multiple AI coding assistants (Claude Code, Codex, Gemini, OpenCode, etc.) |
| `web-research` | Any web search, URL fetching, or multi-source research task |
| `git-github-workflows` | Git commits, branch operations, PR creation, CI debugging, or review workflows |
| `devcontainers` | Building, using, modifying, developing, or distributing dev containers |
| `docusaurus-docs-builder` | Building or updating Docusaurus documentation sites |
| `github-readme-overhaul` | Writing or overhauling a GitHub README |
| `interactive-system-docs` | Creating self-contained interactive HTML system visualizations |
| `vscode-extension-builder-lawvable` | Building VS Code extensions |

## Common Workflows

> **Gemini CLI / Antigravity users:** Instruction files use `skill()` (Codex syntax). See `GEMINI.md` for `activate_skill()` syntax.

**Starting agentic/plugin work:** Load `best-practices-for-agentic-development` first to route to the right reference.

**Claude Code plugin development:** `working-with-claude-code` for docs, `developing-claude-code-plugins` for workflow.

**Codex plugin development:** `working-with-codex` for docs, `developing-codex-plugins` for workflow.

**Gemini CLI / Antigravity plugin development:** `working-with-gemini` for official docs, `developing-gemini-plugins` for workflow.

**OpenCode plugin / skill development:** `working-with-opencode` for official docs, `developing-opencode-plugins` for workflow.

**Multi-provider (Claude Code + Codex + Gemini + OpenCode):** `multi-provider-plugins` for cross-platform architecture.