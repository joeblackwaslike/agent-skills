# Serena MCP server setup

How to connect Serena as an MCP server, with the flags that matter for Claude Code. Full per-client
instructions (VSCode, Codex, Cursor, JetBrains, Claude Desktop, …) are in the fetched
[`../docs/02-usage__030_clients.md`](../docs/02-usage__030_clients.md); every CLI flag is in
[`../cli/_index__start-mcp-server.md`](../cli/_index__start-mcp-server.md).

## Install

```bash
uv tool install -p 3.13 serena-agent      # provides `serena` and `serena-hooks` on PATH
```

## Claude Code — the one-liner

```bash
serena setup claude-code
```

This wires the MCP server into Claude Code with sensible defaults. Manual equivalents:

```bash
# All projects (user scope) — auto-activates whatever dir you launch in:
claude mcp add --scope user serena -- serena start-mcp-server --context claude-code --project-from-cwd

# Just the current project:
claude mcp add serena -- serena start-mcp-server --context claude-code --project "$(pwd)"
```

Verify with `/mcp` inside Claude Code; reconnect if needed. If startup is slow, raise the timeout:
`export MCP_TIMEOUT=60000`.

## The flags that matter

| Flag | Why |
|---|---|
| `--context claude-code` | **Use this in Claude Code.** Disables Serena tools that duplicate CC's built-ins, so the model isn't choosing between two of everything — the single biggest lever against tool drift. |
| `--project <path>` / `--project-from-cwd` | Activate a project at startup. `--project-from-cwd` is ideal for the user-scope config so every workspace self-activates. Without it you must prompt "Activate the current dir as project using serena". |
| `--mode <name>` | Override default modes. Built-ins: `planning`, `editing`, `interactive`, `one-shot`, `onboarding`, `no-onboarding`, `no-memories`. Repeatable. |
| `--add-mode <name>` | Add a mode on top of the configured defaults (don't replace them). |
| `--transport [stdio\|sse\|streamable-http]` | Default `stdio` (subprocess). Use `sse`/`streamable-http` (+ `--host`/`--port`, default `127.0.0.1:8000`) to run Serena as a standalone HTTP server. |
| `--language-backend [LSP\|JetBrains]` | Default LSP. Switch to JetBrains only when driving a JetBrains IDE. |

## Contexts (pick the one for your client)

A **context** tunes the system prompt and the enabled tool set. `serena context list` shows all;
the ones you'll use:

- `claude-code` — Claude Code (disables CC-duplicating tools). **Default choice here.**
- `codex` — OpenAI Codex.
- `ide` — generic IDE assistants (Cursor, Cline, Windsurf, opencode, gemini-cli) to reduce tool duplication.
- `desktop-app` — Claude Desktop / full tool set (the global default if you pass nothing).
- `vscode`, `antigravity`, `jb-copilot-plugin`, `junie`, `jb-ai-assistant`, `copilot-cli` — client-specific.

## Modes (compose behavior)

A **mode** refines behavior and can be combined (`serena mode list`):
`planning` (analysis-only), `editing` (direct modification), `interactive` (back-and-forth),
`one-shot` (single response; pair with `planning` for reports), `onboarding` / `no-onboarding`,
`no-memories`, `query-projects`.

## Counteracting Claude's built-in-tool bias

`--context claude-code` is necessary but, per Serena's docs, often not sufficient for the Opus line.
Two stronger levers:

1. **System-prompt override** — start Claude Code with Serena's override prompt:
   ```bash
   claude --system-prompt="$(serena prompts print-cc-system-prompt-override)"
   ```
2. **Hooks** — the durable backstop. See [`hooks.md`](hooks.md).

## Joe's per-project wrapper

Joe uses a `claude-serena-wrapper` (`~/.local/bin/claude-serena-wrapper`) to launch per-project
Serena instances cleanly. If you're reproducing his setup, that wrapper + the global hook wiring in
`~/.claude/settings.json` (see [`hooks.md`](hooks.md)) is the canonical configuration.

## Pre-indexing large repos

```bash
serena project index --project "$(pwd)"
```

Builds the symbol index ahead of time so the first `find_symbol`/`get_symbols_overview` is fast.
