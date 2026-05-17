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

## Task management

This repo uses beads for task management so be sure to load the beads skill whenever working with tasks.