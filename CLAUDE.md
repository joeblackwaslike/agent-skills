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