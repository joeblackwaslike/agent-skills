---
name: working-with-pieces
description: Use when working with the Pieces for Developers ecosystem: Pieces OS
  (local daemon), Pieces Desktop, Pieces CLI, IDE plugins (VS Code, JetBrains),
  browser extension, or Obsidian plugin. Invoke for: setting up the Pieces MCP
  server with Claude Code, Cursor, GitHub Copilot, or any of the 19 supported AI
  tools; querying long-term memory (LTM) across sessions; saving, searching, or
  managing code snippets; building apps with the Pieces TypeScript or Python SDK;
  or understanding the Pieces OS internals (processes, databases, config). Also
  invoke when the user mentions "Pieces", "Pieces Copilot", "pieces-os", or wants
  AI tools to remember past workflow context across sessions.
metadata:
  last_updated: "2026-06-05"
---

# Working with Pieces for Developers

Pieces is a local-first AI workflow OS. Pieces OS runs as a background daemon that captures everything you work on — code, browser tabs, clipboard, meetings — indexes it into Long-Term Memory (LTM), and exposes it to AI tools via an MCP server.

**Core ports:**
- REST API: `localhost:1000` (macOS/Windows), `localhost:5323` (Linux)
- MCP server: dynamic port in range 39300–39333, stored in `~/Library/com.pieces.os/production/Config/.port.txt`

## Quick Start: Claude Code + Pieces MCP

```bash
PORT=$(cat ~/Library/com.pieces.os/production/Config/.port.txt)
claude mcp add --transport http pieces http://localhost:${PORT}/model_context_protocol/2025-03-26/mcp
```

Verify: ask Claude "What MCP tools do you have from Pieces?" — you should see 39 tools listed.

## Routing Table

| Task | Reference File |
|------|---------------|
| Install Pieces OS, manage service, health check | `references/pieces-os.md` |
| Explore processes, databases, config files, ML dylibs | `references/pieces-os-internals.md` |
| Set up MCP for Claude Code, Cursor, Copilot, etc. | `references/mcp-server.md` |
| All 39 MCP tools with parameters and examples | `references/mcp-server.md` |
| Enable LTM, query past work, pro_tips prompts | `references/long-term-memory.md` |
| Retention limits, pinning memories indefinitely | `references/long-term-memory.md` |
| Pieces CLI commands | `references/cli.md` |
| VS Code or JetBrains plugin, event/data schema | `references/ide-plugins.md` |
| Browser extension events and data captured | `references/browser-extension.md` |
| Obsidian plugin events and LTM integration | `references/obsidian-extension.md` |
| Build with TypeScript SDK, example patterns | `references/typescript-sdk.md` |
| Build with Python SDK | `references/python-sdk.md` |
| Snippet collections, community, all SDKs, video guides | `references/resources.md` |

## Reference Index

- **`pieces-os.md`** — Installation (macOS/Windows/Linux), three running processes, launchd services, port discovery, service management, system requirements
- **`pieces-os-internals.md`** — Deep dive: process binaries, all storage paths, SQLite database schema (19 tables), config files, runtime state, ML/AI dylibs, log locations
- **`mcp-server.md`** — MCP endpoint, setup commands for 19 AI tools, all 39 tools with parameters, two-step workflow pattern, 10 real-world workflows, ngrok remote access, stdio bridge
- **`long-term-memory.md`** — What LTM captures, enabling/disabling, retention limits, `create_pieces_memory` for indefinite pinning, the 5 keys to great queries, 15 tested prompts, modality filters
- **`cli.md`** — Install via brew/pip, key commands, MCP quick setup
- **`ide-plugins.md`** — VS Code and JetBrains: installation, keyboard shortcuts, event triggers, full asset metadata schema, sensitive info detection
- **`browser-extension.md`** — Chrome/Firefox/Edge/Brave: DOM events captured, data schema, browser permissions, LTM contributions
- **`obsidian-extension.md`** — Community plugin install, capture triggers, data schema, Copilot and LTM access from vault
- **`typescript-sdk.md`** — `@pieces.app/pieces-os-client` + `pieces-copilot-sdk`: platform config, connection, full CRUD patterns, Copilot chat, OSApi auth, example project
- **`python-sdk.md`** — `pieces_os_client`: PiecesClient wrapper, create/list assets, streaming Copilot
- **`resources.md`** — All SDKs, example projects, snippet collections, IDE plugins (JupyterLab, Azure Data Studio, Teams), community links, pro_tips MCP guides for 19 agents
