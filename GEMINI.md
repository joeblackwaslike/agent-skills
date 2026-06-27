# agent-skills

A collection of skills for AI coding assistants — agentic development, plugin development, and best practices for working with AI coding tools.

## Available Skills

Invoke with `activate_skill("name")`:

| Skill | When to Invoke |
| --- | --- |
| `activate_skill("best-practices-for-agentic-development")` | Before designing agents, MCP servers, multi-step workflows, or skill systems |
| `activate_skill("working-with-claude-code")` | Working with Claude Code CLI, plugins, hooks, MCP, skills, or any Claude Code feature |
| `activate_skill("developing-claude-code-plugins")` | Creating, modifying, testing, or releasing Claude Code plugins |
| `activate_skill("working-with-codex")` | Working with the Codex CLI, plugins, skills, hooks, configuration, or any Codex feature |
| `activate_skill("developing-codex-plugins")` | Creating, modifying, testing, or releasing Codex CLI plugins |
| `activate_skill("working-with-gemini")` | Working with Gemini CLI or Antigravity CLI — extensions, skills, hooks, configuration |
| `activate_skill("developing-gemini-plugins")` | Creating, modifying, testing, or releasing Gemini CLI extensions or Antigravity plugins |
| `activate_skill("working-with-opencode")` | Working with OpenCode CLI — skills, plugins, configuration, commands, agents |
| `activate_skill("developing-opencode-plugins")` | Creating, modifying, testing, or releasing OpenCode skills or npm/Bun plugins |
| `activate_skill("multi-provider-plugins")` | Making a plugin compatible with multiple AI coding assistants (Claude Code, Codex, Gemini, OpenCode, etc.) |
| `activate_skill("web-research")` | Any web search, URL fetching, or multi-source research task |
| `activate_skill("git-github-workflows")` | Git commits, branch operations, PR creation, CI debugging, or review workflows |
| `activate_skill("devcontainers")` | Building, using, modifying, developing, or distributing dev containers |
| `activate_skill("docusaurus-docs-builder")` | Building or updating Docusaurus documentation sites |
| `activate_skill("github-readme-overhaul")` | Writing or overhauling a GitHub README |
| `activate_skill("interactive-system-docs")` | Creating self-contained interactive HTML system visualizations |
| `activate_skill("solid-principles")` | Designing/refactoring classes, modules, or interfaces with SOLID (SRP/OCP/LSP/ISP/DIP) — bad→good TypeScript + Python examples, an anti-pattern catalog (incl. over-applying SOLID), and one system refactored to honor all five. Skip for throwaway scripts and simple CRUD/glue |
| `activate_skill("vscode-extension-builder-lawvable")` | Building VS Code extensions |

## Common Workflows

**Starting agentic or plugin work:**
`activate_skill("best-practices-for-agentic-development")` first — it routes to the right reference.

**Gemini CLI / Antigravity plugin development:**
`activate_skill("working-with-gemini")` for official docs, `activate_skill("developing-gemini-plugins")` for workflow.

**Claude Code plugin development:**
`activate_skill("working-with-claude-code")` for docs, `activate_skill("developing-claude-code-plugins")` for workflow.

**OpenCode plugin / skill development:**
`activate_skill("working-with-opencode")` for official docs, `activate_skill("developing-opencode-plugins")` for workflow.

**Cross-platform plugin (Claude Code + Codex + Gemini + OpenCode):**
`activate_skill("multi-provider-plugins")` for architecture.

## Installation

```sh
# Local install (from repo root)
echo "y" | gemini extensions install . --consent

# GitHub install
echo "y" | gemini extensions install https://github.com/joeblackwaslike/agent-skills --consent
```

The `echo "y"` is required to confirm the folder trust prompt. `--consent` suppresses the security risk confirmation.
