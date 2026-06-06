# Cookbook: Agent / MCP / Plugin Project

**For:** MCP servers, Claude Code plugins, AI agent frameworks, skill libraries  
**Covers:** Claude Code plugins, Codex plugins, MCP servers, LangChain/LangGraph agents  
**Target size:** 30–70 lines  

Agent and MCP projects have conventions that are easy to get wrong: tool naming, manifest
structure, hook wiring, transport selection. An instruction file for these projects should
capture the non-obvious rules that a first-time contributor (or Claude) would violate.

---

## Template

```markdown
# [Project Name]

[One sentence on what this project builds: e.g., "A Claude Code plugin providing X skills
and Y commands" or "An MCP server exposing Z tools for database introspection."]

## Commands

\`\`\`bash
# Development
[dev / watch command]

# Testing
[test command]

# Build / bundle
[build command]

# Validate plugin / MCP manifest
[validation command, e.g.: claude plugin validate . / mcp validate]

# Load locally (Claude Code plugin)
# Claude Code: Add to settings.json → plugins: [{path: "/absolute/path"}]
\`\`\`

## Project Structure

\`\`\`
[Tool-appropriate layout:]

# Claude Code plugin
.claude-plugin/
  plugin.json       ← manifest (name, version, description, author)
skills/             ← one directory per skill; each has SKILL.md
commands/           ← slash commands
hooks/              ← lifecycle hooks (hooks.json + scripts)
agents/             ← subagent definitions

# MCP server (TypeScript)
src/
  tools/            ← one file per tool, registered in index.ts
  resources/        ← MCP resources
  prompts/          ← MCP prompts
index.ts            ← server entry point + tool registration
\`\`\`

## Plugin / Server Architecture

[1–3 sentences on non-obvious structure or design decisions. Examples:]
- Skills are loaded on-demand — they don't load at session start, only when invoked
- Tools are registered in `index.ts` with Zod schemas; never add tools directly to handlers
- Hook scripts receive event data via stdin as JSON; write results to stdout

## Naming Conventions

[Name collisions and format conventions are a common source of bugs:]
- Skill names: `kebab-case`, unique across the plugin
- Command names: `kebab-case`, prefixed with plugin name if published
- Tool names (MCP): `snake_case` recommended by MCP spec
- Agent names: `kebab-case`, unique within the plugin

## Key Rules

[Non-obvious constraints for this specific project type:]

### For Claude Code plugins:
- Skill paths in `plugin.json` must be relative to the plugin root (use `${CLAUDE_PLUGIN_ROOT}`)
- Hook scripts must be executable (`chmod +x`)
- `plugin.json` lives in `.claude-plugin/` only — never at project root
- Test locally by adding plugin dir to `~/.claude/settings.json` before publishing

### For MCP servers:
- Tools must be idempotent when possible — clients may retry on transient errors
- Use `content` array with `TextContent` for all tool responses
- Errors should be returned as `isError: true` in the tool result, not thrown as exceptions
- Resource URIs must be stable — changing them breaks existing client configs

## Testing

- [How to test tools/skills locally before deploying]
- [Any integration test setup — e.g., MCP inspector, Claude Code dev mode]

## Publishing

[Only if non-standard:]
- [Registry or marketplace the plugin targets]
- [Version format: semver, or other]
- [Release checklist highlights]
```

---

## Section Guide

**Project Structure** is more important here than in most project types. Plugin and MCP
directory layouts are not standardized, and getting the structure wrong breaks the manifest
resolution. Show the exact tree.

**Naming Conventions** prevents the most common class of bugs in these projects: tool/skill
names that collide, use the wrong case format, or exceed length limits. State the rules
explicitly with examples.

**Key Rules** captures the "gotchas" — rules that a developer would only know from painful
experience. Hook scripts need `chmod +x`; MCP tools should return errors via `isError` not
exceptions; plugin paths are relative to `${CLAUDE_PLUGIN_ROOT}`. Write the rule, not just
a reminder that rules exist.

---

## Variants

**Claude Code plugin (skills + commands + hooks):**
Focus on manifest structure, skill SKILL.md frontmatter requirements, hook event types,
local dev workflow (settings.json plugin path).

**Codex plugin:**
Focus on `.codex-plugin/plugin.json`, `skills/` directory, hook wiring in `hooks/hooks.json`.
Note: Codex has no `install` subcommand — only `marketplace add/upgrade/remove`.

**MCP server (TypeScript/Python):**
Focus on transport selection (stdio vs. SSE), tool registration pattern, Zod schemas for
tool inputs, proper error response format, MCP inspector for local testing.

**LangChain/LangGraph agent:**
Focus on graph topology, state schema, node/edge naming, checkpoint configuration,
streaming output handling.

**Skill library (like this repo):**
Focus on SKILL.md frontmatter conventions, trigger descriptions, reference file layout,
auto-generated docs pattern (scripts/update.js), multi-provider manifest structure.

---

## Common Pitfalls

- **Hardcoded paths in manifests:** Always use `${CLAUDE_PLUGIN_ROOT}` or equivalent
  for paths in plugin manifests. Absolute paths break on other machines.
- **Missing `chmod +x` on hook scripts:** Claude Code will silently skip non-executable
  hook scripts. Add this to your dev setup docs.
- **MCP tool throwing exceptions:** Clients don't handle thrown exceptions well. Return
  `{isError: true, content: [{type: "text", text: errorMessage}]}` instead.
- **Skill name collisions:** Two plugins with a skill named `search` will conflict.
  Use namespaced names for any skills you publish.
