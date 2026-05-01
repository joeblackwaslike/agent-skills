# agent-skills

A Claude Code plugin that bundles all of my custom developed skills for easy installation in any agent environment. 

## Plugin Development

When working on or developing this plugin (modifying hooks, commands, skills, or plugin.json), load these before making any structural changes:

- `plugin-dev@claude-plugins-official` — canonical directory layout, manifest spec, hook wiring format, command frontmatter rules
- `skill-creator@claude-plugins-official` — skill description quality, progressive disclosure, trigger reliability, writing style

## Task management

This repo uses beads for task management so be sure to load the beads skill whenever working with tasks