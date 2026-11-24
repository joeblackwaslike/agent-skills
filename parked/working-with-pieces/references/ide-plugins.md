---
name: ide-plugins
description: Pieces IDE plugins for VS Code and JetBrains — installation, keyboard shortcuts, event triggers, full asset metadata schema, sensitive info detection, MCP access
---

# Pieces IDE Plugins

## VS Code Extension

**Marketplace ID**: `MeshIntelligentTechnologiesInc.pieces-vscode`

Install from the VS Code Marketplace or:
```bash
code --install-extension MeshIntelligentTechnologiesInc.pieces-vscode
```

Pieces OS must be running before VS Code launches.

### Save Events & Triggers

| Trigger | How |
|---------|-----|
| Save selected code | Select code → right-click → "Save to Pieces" |
| Save selection (keyboard) | `⌘+Shift+'` (macOS) or `Ctrl+Shift+V` (Windows/Linux) |
| Save entire active file | Command Palette → "Pieces: Save Current File" |
| Document focus | Pieces tracks active file context passively for LTM |

### Asset Metadata Schema

Every snippet saved from VS Code is enriched by Pieces OS's ML pipeline:

```json
{
  "id": "<uuid>",
  "captured_from": "vscode",
  "language": "<auto_classified>",
  "origin": "<absolute_file_path>",
  "title": "<ai_generated_title>",
  "description": "<ai_generated_annotation>",
  "tags": ["<tag1>", "<tag2>"],
  "related_people": ["<git_blame_author_email>"],
  "related_links": ["<associated_url>"],
  "content": "<raw_code_snippet>",
  "sensitive_info": ["<flag_if_api_key_or_credential_detected>"],
  "created_at": "<ISO8601_timestamp>",
  "classification": {
    "specific": "<language_specific>",
    "generic": "<language_generic>"
  }
}
```

**Sensitive info detection**: Pieces automatically flags snippets containing API keys, credentials, tokens, and similar patterns. Flagged assets are marked but still saved — you decide what to do with them.

**Auto-enrichment**: Language classification, title, description, and tags are all AI-generated. No manual tagging required.

### Features

- **Pieces Copilot chat**: Open Pieces sidebar → chat with AI using your codebase as context
- **Persisted conversations**: Copilot chats are saved and resumable across sessions
- **Code generation**: Ask Copilot to generate, explain, or refactor code
- **Sensitive info detection**: Automatic flagging of credentials in saved snippets
- **LTM contributions**: File opens, edits, and clipboard events feed into LTM passively

### MCP Access from VS Code

VS Code's GitHub Copilot Agent mode can use Pieces MCP. Configure in `.vscode/mcp.json`:

```json
{
  "servers": {
    "pieces": {
      "type": "http",
      "url": "http://localhost:39312/model_context_protocol/2025-03-26/mcp"
    }
  }
}
```

Switch Copilot Chat to **Agent mode** (required for MCP tools to activate).

---

## JetBrains Plugin

**Plugin ID**: 17328 — available in all JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, GoLand, Rider, CLion, etc.)

Install via JetBrains Marketplace in your IDE: Settings → Plugins → search "Pieces for Developers".

Pieces OS and Pieces Desktop must be installed and running.

**MCP in JetBrains**: Requires IDE version 2025.2+. Configure via Settings → Tools → AI Assistant → MCP Servers. Paste the Pieces endpoint URL.

### Save Events & Triggers

Same patterns as VS Code:

| Trigger | How |
|---------|-----|
| Save selected code | Select → right-click → "Save to Pieces" |
| Save file | Right-click file tab → "Save to Pieces" |

### Asset Metadata Schema

Identical to VS Code — same enrichment pipeline in Pieces OS. All fields (language, title, description, tags, related_people, related_links, sensitive_info) are AI-generated.

### Features

- AI-powered Copilot chat with codebase context
- Snippet save/browse/share from any JetBrains IDE
- Persisted conversations
- Sensitive info detection
- LTM contributions

---

## Additional IDE Integrations

| IDE | Notes |
|-----|-------|
| **JupyterLab** | Dedicated plugin — see `docs.pieces.app/extensions-plugins/jupyterlab` |
| **Azure Data Studio** | Dedicated plugin — see `docs.pieces.app/extensions-plugins/azuredatastudio` |
