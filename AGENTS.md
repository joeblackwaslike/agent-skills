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

### Freshness metadata convention

So agents can judge how current a skill is, two freshness signals are stamped automatically. Both flow through the shared helper `scripts/lib/doc-frontmatter.cjs` (importable from CJS and ESM update scripts):

- **Per fetched doc** (files in `references/`): YAML frontmatter with `source` (origin URL), `fetched_at` (ISO timestamp), and `sha256` (hash of the fetched body). The hash drives **change-detection** — `fetched_at` is preserved when upstream content is unchanged, so weekly runs don't churn timestamps. Hand-written reference files get no frontmatter; only fetched docs do. (`working-with-pieces` is the exception — its docs merge multiple upstreams, so it carries only the skill-level signal.)
- **Per skill** (`SKILL.md`): `metadata.last_updated` (`YYYY-MM-DD`) — the coarse "how fresh is this skill" date an agent sees the moment it loads the skill. Each update script restamps it (to the run date) only when a fetched doc actually changed.

Wiring a new fetch script: import `withFrontmatter` and `setSkillLastUpdated`, wrap each written doc body via `withFrontmatter({ filePath, body, source, now })`, track whether any `wrapped.changed`, and call `setSkillLastUpdated(SKILL_MD, now.slice(0, 10))` at the end of the run if so. Backfill or re-stamp every `SKILL.md` from git history any time with `node scripts/backfill-last-updated.cjs`.

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
| `working-with-cursor` | Working with Cursor IDE rules, skills, plugins, MCP servers, or any Cursor feature |
| `developing-cursor-plugins` | Creating, modifying, testing, or releasing Cursor plugins |
| `working-with-pieces` | Working with Pieces OS, Desktop, CLI, IDE/browser/Obsidian plugins, MCP server, long-term memory, TypeScript or Python SDKs |
| `multi-provider-plugins` | Making a plugin compatible with multiple AI coding assistants (Claude Code, Codex, Gemini, OpenCode, etc.) |
| `web-research` | Any web search, URL fetching, or multi-source research task |
| `working-with-github-actions` | Building, configuring, debugging, or optimizing GitHub Actions CI/CD workflows — syntax, triggers, runners, caching, matrix, OIDC deployments, release-please, CodeQL, dependabot |
| `git-github-workflows` | Git commits, branch operations, PR creation, CI debugging, or review workflows |
| `devcontainers` | Building, using, modifying, developing, or distributing dev containers |
| `docusaurus-docs-builder` | Building or updating Docusaurus documentation sites |
| `github-readme-overhaul` | Writing or overhauling a GitHub README |
| `interactive-system-docs` | Creating self-contained interactive HTML system visualizations |
| `vscode-extension-builder-lawvable` | Building VS Code extensions |
| `agent-instructions` | Creating CLAUDE.md, AGENTS.md, GEMINI.md, or other AI instruction files at any scope level (user/global, project, subdirectory) — includes cookbook templates for Python, TypeScript, monorepo, and agent/MCP projects |
| `domain-driven-design` | Modeling a business domain or backend architecture — DDD (strategic + tactical), CQRS, event sourcing, aggregates, value objects, bounded contexts, hexagonal/clean architecture; framework-agnostic examples in TypeScript and Python |
| `working-with-vercel-ai-sdk` | Working with the Vercel AI SDK (`ai` package) — generateText/streamText, generateObject, embeddings, tools, agents (ToolLoopAgent), UI hooks (useChat), RSC, providers, migrations; comprehensive offline docs from ai-sdk.dev |
| `authoring-agent-skills` | Creating or maintaining a skill in this repo — naming taxonomy (working-with-X / developing-X / topic), SKILL.md frontmatter, the doc-fetching cookbook (llms.txt / sitemap / curated-list), the `scripts/lib/doc-frontmatter.cjs` freshness helpers, Makefile/CI auto-discovery, and the registration checklist |
| `working-with-beads` | Working with the beads CLI (`bd`) — offline CLI reference generated from the pinned binary (`bd <cmd> --help`, `bd prime`) plus upstream repo docs, pinned to a known version. Use for any `bd` command/flag/concept lookup |
| `beads-operations` | Running/maintaining/troubleshooting beads day-to-day — bd vs TodoWrite, Joe's shared-server conventions (port 3308, `--skip-agents`), the ready→claim→note→close loop, compaction recovery, and recovering broken beads states |

## Common Workflows

> **Gemini CLI / Antigravity users:** Instruction files use `skill()` (Codex syntax). See `GEMINI.md` for `activate_skill()` syntax.

**Starting agentic/plugin work:** Load `best-practices-for-agentic-development` first to route to the right reference.

**Claude Code plugin development:** `working-with-claude-code` for docs, `developing-claude-code-plugins` for workflow.

**Codex plugin development:** `working-with-codex` for docs, `developing-codex-plugins` for workflow.

**Gemini CLI / Antigravity plugin development:** `working-with-gemini` for official docs, `developing-gemini-plugins` for workflow.

**OpenCode plugin / skill development:** `working-with-opencode` for official docs, `developing-opencode-plugins` for workflow.

**Cursor plugin development:** `working-with-cursor` for docs, `developing-cursor-plugins` for workflow.

**Multi-provider (Claude Code + Codex + Gemini + OpenCode):** `multi-provider-plugins` for cross-platform architecture.

**GitHub Actions CI/CD:** `working-with-github-actions` for workflow syntax, cookbook patterns, action versions, and OIDC deployments.

**Domain modeling / backend architecture:** `domain-driven-design` for strategic + tactical DDD, CQRS, event sourcing, and where each pattern earns (or doesn't earn) its cost — with complete TypeScript and Python examples.

**Vercel AI SDK development:** `working-with-vercel-ai-sdk` for offline ai-sdk.dev docs (core, UI, RSC, agents, providers, cookbook) — grep `references/` by topic; falls back to live Markdown pages for anything newer.

**Authoring a new skill in this repo:** `authoring-agent-skills` for the naming taxonomy, the doc-fetching cookbook (how to wrap a tool's docs via llms.txt/sitemap), the freshness-metadata conventions, and the registration checklist — then `skill-creator` for generic description/triggering quality.

**Beads task management:** `beads-operations` for setup conventions (`bd init --shared-server --skip-agents`), the core workflow, and the troubleshooting runbook; `working-with-beads` for the exact CLI reference at the pinned version. These supersede the third-party `beads` plugin's convention guidance.
