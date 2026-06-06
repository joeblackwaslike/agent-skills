---
name: cli
description: Pieces CLI — installation, key commands, interactive mode, MCP quick setup
---

# Pieces CLI

The Pieces CLI provides terminal access to Pieces OS for saving snippets, querying Copilot, and configuring MCP.

## Installation

```bash
# macOS
brew install pieces-cli

# Windows
py -m pip install pieces-cli

# Linux
pip3 install pieces-cli
```

**Requirements**: Python >=3.11 and <3.15.

Verify:
```bash
pieces version
# → pieces-cli: 1.20.1
```

**PyPI**: `pieces-cli` | **Homebrew formula**: `pieces-cli`

## Key Commands

| Command | Description |
|---------|-------------|
| `pieces version` | Show CLI version |
| `pieces run` | Launch interactive REPL session |
| `pieces create` | Save a code snippet |
| `pieces list` | Display all saved materials |
| `pieces ask 'question'` | Query Pieces Copilot |
| `pieces mcp setup` | Quick MCP configuration wizard — select target IDE |
| `pieces feedback` | Open GitHub discussions for feedback |

## MCP Setup via CLI

The fastest way to configure MCP for a specific IDE:

```bash
pieces mcp setup
# → interactive prompt: select Cursor, VS Code, Claude Code, etc.
# → writes correct config to the right location automatically
```

## Interactive Mode

```bash
pieces run
```

Starts a REPL with these commands available:

- `ask <question>` — query Copilot
- `list` — show all assets
- `create` — save new snippet
- `search <query>` — search snippets
- `exit` / `quit` — leave REPL

## Notes

- Pieces OS must be running before using the CLI
- The CLI communicates with Pieces OS via the REST API at `localhost:1000` (mac/win) or `localhost:5323` (linux)
- All CLI interactions are saved to LTM like any other application activity
