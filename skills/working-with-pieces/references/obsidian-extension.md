---
name: obsidian-extension
description: Pieces Obsidian plugin — installation, capture triggers, data schema, Copilot access, LTM integration from vault
---

# Pieces Obsidian Plugin

**GitHub**: https://github.com/pieces-app/obsidian-pieces (closed source)

## Installation

1. Open Obsidian → Settings → Community Plugins
2. Disable Safe Mode if needed
3. Browse Community Plugins → search "Pieces for Developers"
4. Install → Enable

Pieces OS must be running. The plugin communicates with Pieces OS via `localhost:1000`.

## Capture Triggers

| Trigger | What fires it |
|---------|--------------|
| **Code block quick-action button** | Hover over any fenced code block → click "Save to Pieces" button |
| **Keyboard shortcut** | Select code block or text → use configured shortcut |
| **Right-click context menu** | Right-click any code block or selection → "Save to Pieces" |
| **Note open event** | Obsidian fires `file-open` event; Pieces reads note context for LTM |
| **Vault edit event** | Code block edits trigger context capture |
| **Pieces sidebar open** | Pieces Drive browser loads in the sidebar view |

## Data Captured Per Event

```json
{
  "content": "<code_block_raw_content>",
  "language": "<fence_language_tag>",
  "source": {
    "vault_name": "<obsidian_vault_name>",
    "file_path": "<absolute_path_to_note>",
    "note_name": "<note_filename_without_extension>"
  },
  "line_range": {
    "start": "<line_number>",
    "end": "<line_number>"
  },
  "context": "<surrounding_note_content_for_enrichment>",
  "timestamp": "<ISO8601>"
}
```

Language is inferred from the markdown fence tag (e.g., ` ```typescript ` → `typescript`). If no fence tag is present, Pieces OS classifies it via ML.

The surrounding note content (`context`) is used by the Pieces ML pipeline to generate richer titles, descriptions, and tags for the saved snippet.

## Features

### Pieces Copilot in Obsidian

Open the Pieces sidebar → Copilot tab to:
- Ask questions about code blocks in your notes
- Generate code examples from note context
- Explain patterns, SDKs, or algorithms referenced in notes
- Get AI-assisted documentation written into your vault

### LTM Access from Obsidian

The Pieces sidebar also exposes LTM queries directly inside Obsidian:
- Type a natural language question → get context from your full 9-month workflow history
- Useful for: "What did we decide about this API?", "Find the research I did on this topic last month"

### Pieces Drive Integration

Browse and search all your saved snippets from the Pieces sidebar — search by language, tag, or natural language.

### Quick Actions on Code Blocks

Every fenced code block in Obsidian gets an inline toolbar:
- **Save to Pieces** — saves with vault + note context as metadata
- **Copy** — copy to clipboard
- **Share** — generate shareable Pieces link

## LTM Contributions

When LTM is enabled, Obsidian activity feeds into `WORKSTREAM_EVENTS`:
- Notes you open appear as window context
- Code blocks you interact with appear in clipboard/activity captures
- The Obsidian application appears as a source filter: `application: "Obsidian"`

Query Obsidian-specific activity via MCP:
```
workstream_events_full_text_search(
  query: "Rust ownership patterns",
  application: "Obsidian"
)
```
