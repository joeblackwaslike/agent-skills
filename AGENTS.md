# agent-skills

A collection of skills for AI coding assistants — agentic development, plugin development, and best practices for working with AI coding tools.

## Available Skills

Invoke with `skill("name")`:

| Skill | When to Invoke |
| --- | --- |
| `skill("best-practices-for-agentic-development")` | Before designing agents, MCP servers, multi-step workflows, or skill systems |
| `skill("working-with-claude-code")` | Working with Claude Code CLI, plugins, hooks, MCP, skills, or any Claude Code feature |
| `skill("developing-claude-code-plugins")` | Creating, modifying, testing, or releasing Claude Code plugins |
| `skill("working-with-codex")` | Working with the Codex CLI, plugins, skills, hooks, configuration, or any Codex feature |
| `skill("developing-codex-plugins")` | Creating, modifying, testing, or releasing Codex plugins |
| `skill("working-with-gemini")` | Working with Gemini CLI or Antigravity CLI — extensions, skills, hooks, configuration |
| `skill("developing-gemini-plugins")` | Creating, modifying, testing, or releasing Gemini CLI extensions or Antigravity plugins |
| `skill("multi-provider-plugins")` | Making a plugin compatible with multiple AI coding assistants (Claude Code, Codex, Gemini, etc.) |
| `skill("web-research")` | Any web search, URL fetching, or multi-source research task |
| `skill("git-github-workflows")` | Git commits, branch operations, PR creation, CI debugging, or review workflows |
| `skill("devcontainers")` | Building, using, modifying, developing, or distributing dev containers |
| `skill("docusaurus-docs-builder")` | Building or updating Docusaurus documentation sites |
| `skill("github-readme-overhaul")` | Writing or overhauling a GitHub README |
| `skill("interactive-system-docs")` | Creating self-contained interactive HTML system visualizations |
| `skill("vscode-extension-builder-lawvable")` | Building VS Code extensions |

## Common Workflows

> **Gemini CLI / Antigravity users:** This file uses `skill()` (Codex syntax). See `GEMINI.md` for `activate_skill()` syntax.

**Starting agentic/plugin work:** `skill("best-practices-for-agentic-development")` first to route to the right reference.

**Claude Code plugin development:** `skill("working-with-claude-code")` for docs, `skill("developing-claude-code-plugins")` for workflow.

**Codex plugin development:** `skill("working-with-codex")` for docs, `skill("developing-codex-plugins")` for workflow.

**Gemini CLI / Antigravity plugin development:** `skill("working-with-gemini")` for official docs, `skill("developing-gemini-plugins")` for workflow.

**Multi-provider (Claude Code + Codex + Gemini + Antigravity):** `skill("multi-provider-plugins")` for cross-platform architecture.
