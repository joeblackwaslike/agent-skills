---
name: mcp-server
description: Pieces MCP server — endpoints, setup for 19 AI tools, all 39 tools with parameters, workflow patterns, ngrok remote access, stdio bridge
---

# Pieces MCP Server

Pieces OS exposes 39 MCP tools that give any connected AI agent access to your Long-Term Memory — days, weeks, or months of captured workflow context.

## Endpoints

| Transport | URL |
|-----------|-----|
| **Streamable HTTP (recommended)** | `http://localhost:PORT/model_context_protocol/2025-03-26/mcp` |
| **SSE (legacy)** | `http://localhost:PORT/model_context_protocol/2024-11-05/sse` |

`PORT` is dynamic — read it:

```bash
PORT=$(cat ~/Library/com.pieces.os/production/Config/.port.txt)
echo $PORT   # e.g. 39312
```

Verify server is up:

```bash
curl http://localhost:${PORT}/.well-known/version
```

## Setup: Claude Code

```bash
PORT=$(cat ~/Library/com.pieces.os/production/Config/.port.txt)

# User-scoped (default)
claude mcp add --transport http pieces \
  http://localhost:${PORT}/model_context_protocol/2025-03-26/mcp

# Project-scoped
claude mcp add --transport http --scope project pieces \
  http://localhost:${PORT}/model_context_protocol/2025-03-26/mcp

# Manage
claude mcp list
claude mcp remove pieces
claude mcp get pieces
```

## One-Click Setup (All Platforms)

Pieces Desktop → User Profile (top-left) → Settings → MCP → click **Connect** next to your target platform. Automatically writes the correct config to the right location.

## Setup for All 19 Supported AI Tools

| Tool | Transport | Config location |
|------|-----------|----------------|
| **Cursor** | HTTP | `~/.cursor/mcp.json` — `url` key |
| **Claude Desktop** | stdio (local) or HTTP via Connectors UI (remote) | Settings JSON |
| **Claude Code** | HTTP or SSE | `claude mcp add` command (see above) |
| **Claude Cowork** | HTTP | Shares Claude Desktop MCP config |
| **VS Code** | HTTP/SSE/stdio | `.vscode/mcp.json` — `servers` key with `type` |
| **Windsurf** | HTTP | `~/.codeium/windsurf/mcp_config.json` — use `serverUrl` (not `url`) |
| **Goose** | HTTP | `~/.config/goose/config.yaml` |
| **Cline** | SSE (HTTP buggy) | `~/.cline/data/settings/cline_mcp_settings.json` |
| **Continue.dev** | HTTP | `.continue/config.yaml` (agent mode only) |
| **JetBrains** | HTTP | Settings → AI Assistant → MCP (requires 2025.2+) |
| **Zed** | stdio via bridge | `context_servers` in `settings.json` |
| **GitHub Copilot** | HTTP/SSE | Uses VS Code's `.vscode/mcp.json`; must enable Agent mode |
| **OpenAI Codex CLI** | HTTP | `~/.codex/config.toml` |
| **Google Gemini CLI** | HTTP | `~/.gemini/settings.json` — `mcpServers` key |
| **Amazon Q Developer** | HTTP | `~/.aws/amazonq/default.json` |
| **ChatGPT** | HTTP (HTTPS required) | Connectors UI only (Pro/Plus/Business/Enterprise) |
| **Raycast** | stdio via bridge | `mcp-config.json` |
| **Rovo Dev CLI** | HTTP | `~/.rovodev/mcp.json` |
| **OpenClaw** | HTTP | `~/.openclaw/workspace/config/mcporter.json` |

**Cursor example** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "pieces": {
      "url": "http://localhost:39312/model_context_protocol/2025-03-26/mcp"
    }
  }
}
```

**VS Code** (`.vscode/mcp.json`):
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

## Remote Access via ngrok

For cloud-hosted AI tools (ChatGPT, GitHub Actions, cloud IDEs):

```bash
brew install ngrok
ngrok config add-authtoken YOUR_TOKEN
ngrok http http://localhost:${PORT}/model_context_protocol/2025-03-26/mcp

# Use the HTTPS URL ngrok gives you:
# https://abc123.ngrok.app/model_context_protocol/2025-03-26/mcp
```

## stdio Bridge (for Zed, Raycast, etc.)

For tools that only speak stdio:

```bash
npx -y mcp-remote http://localhost:${PORT}/model_context_protocol/2024-11-05/sse
```

Config example:
```json
{
  "mcpServers": {
    "pieces": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:39312/model_context_protocol/2024-11-05/sse"]
    }
  }
}
```

---

<!-- BEGIN:auto-updated:tools -->
## All 39 MCP Tools

### Category 1: LTM & Memory (2 tools)

**`ask_pieces_ltm`** — Natural language query over the last 7 days of LTM.

Parameters:
- `question` (required) — natural language question
- `topics` — focus areas: `["authentication", "redis", "database"]`
- `open_files` — current file paths for context
- `application_sources` — filter by app: `["vscode", "chrome"]`
- `chat_llm` (required) — model to use for synthesis
- `related_questions` — follow-up questions to also answer
- `connected_client` — client identifier

Returns: ranked workstream summaries and events with relevance scores.

Note: 7-day window is a hard limit for this tool. For older data use the search tools below.

---

**`create_pieces_memory`** — Persist context as a "never-forgotten" memory (no TTL, not subject to the 9-month auto-delete).

Parameters:
- `summary` (required) — markdown content of the memory
- `summary_description` (required) — one-line description
- `project` — project path
- `files` — list of related file paths
- `externalLinks` — list of related URLs
- `connected_client` — client identifier

Returns: success confirmation.

Use this to pin decisions, debugging breakthroughs, research findings. Cross-agent memories: Agent A saves → Agent B retrieves via `ask_pieces_ltm` days later.

---

### Category 2: Full-Text Search (14 tools)

All support optional temporal filter: `{"created": {"from": "ISO8601", "to": "ISO8601"}}` (not subject to the 7-day limit — can reach the full 9-month history).

**`workstream_summaries_full_text_search`** — Search AI-generated 10-minute work session roll-ups.
- `query` (1–1000 chars), `limit` (1–100, default 10)
- Best for: "What did I work on?" questions

**`conversations_full_text_search`** — Hybrid search across Copilot conversation names, messages, and annotations.
- `query`, `limit` (1–50, default 25)
- Best for: finding past AI-assisted discussions

**`workstream_events_full_text_search`** — Search captured activity (clipboard, OCR screenshots, audio transcriptions).
- `query`, `limit` (1–200), `application`, `window_title`, `url`, `context_type` (CLIPBOARD | VISION | AUDIO), `audio_type` (INPUT | OUTPUT)
- Best for: clipboard content, OCR text from screenshots, meeting audio

**`tags_full_text_search`** — Search user-created labels.
- `query` (1–500 chars), `limit`

**`annotations_full_text_search`** — Search notes, summaries, comments.
- `query`, `limit` (1–200), `annotation_type` (SUMMARY | DESCRIPTION | COMMENT | DOCUMENTATION | EXPLANATION | CODE | GIT_COMMIT | etc.)

**`persons_full_text_search`** — Search contacts/collaborators by email, name, username.
- `query`, `limit`

**`anchors_full_text_search`** — Search code bookmarks by name and file path.
- `query`, `limit`

**`websites_full_text_search`** — Search saved URLs and display names.
- `query`, `limit`

**`hints_full_text_search`** — Search AI-generated follow-up suggestions.
- `query`, `limit`

**`models_full_text_search`** — Search AI/ML model configurations.
- `query`, `limit`

**`wpe_sources_full_text_search`** — Search application sources extracted from workflow activity.
- `query`, `limit`
- Best for: discovering which apps you've been using

**`wpe_source_windows_full_text_search`** — Search window title contexts.
- `query`, `limit`
- Best for: finding specific browser tabs or IDE files

**`entities_full_text_search`** — Search organizations and teams by name.
- `query`, `limit`

**`conversation_messages_full_text_search`** — Search individual Copilot chat messages.
- `query`, `limit`
- Returns: content, role, sentiment, model used

---

### Category 3: Vector / Semantic Search (5 tools)

Find conceptually related content even when the user describes it with different words.

Threshold guidance: `~0.5` exploratory, `~0.7` focused, `~0.9` near-exact.

**`materials_vector_search`** — Generic semantic search across material types.
- `query`, `material_type` (required: WORKSTREAM_SUMMARIES | HINTS | TAGS | WORKSTREAM_EVENTS), `threshold` (0.0–1.0), `limit` (1–100)
- Returns: `[{identifier, score}]`

**`workstream_summaries_vector_search`** — Semantic search over work session summaries.
- `query`, `threshold`, `limit`

**`workstream_events_vector_search`** — Semantic search over captured activity.
- `query`, `threshold`, `limit`, `context_type`, `audio_type`

**`hints_vector_search`** — Semantic search for AI-generated follow-up suggestions.

**`tags_vector_search`** — Semantic search for user-created tags.

---

### Category 4: Filter & Enumerate (1 tool)

**`material_identifiers`** — List UUIDs for a material type using time and configuration filters (no search query needed).

Parameters:
- `material_type` (required) — one of: WORKSTREAM_SUMMARIES, WORKSTREAM_EVENTS, HINTS, TAGS, CONVERSATIONS, CONVERSATION_MESSAGES, ANNOTATIONS, ANCHORS, ANCHOR_POINTS, RANGES, PERSONS, WEBSITES, MODELS, ENTITIES, WORKSTREAM_PATTERN_ENGINE_SOURCES, WORKSTREAM_PATTERN_ENGINE_SOURCE_WINDOWS
- `limit` (1–1000, default 100)
- Temporal filter: `{"created": {"from": "...", "to": "..."}}`
- `configurations` (WORKSTREAM_EVENTS only — filter by context type/app/window)

Returns: `{material_type, count, identifiers, limit, next_step}`

Workstream events config example:
```json
{
  "configurations": {
    "workstream_events": {
      "context": {
        "type": "CLIPBOARD",
        "application": "Visual Studio Code",
        "window": "main.ts"
      }
    }
  }
}
```

---

### Category 5: ML / Temporal (1 tool)

**`extract_temporal_range`** — Convert natural language time expressions to UTC ISO 8601 timestamps.

Parameters: `query` (1–300 chars with time phrases)

Returns: `{query, count, ranges: [{from, to}]}`

Example:
```json
// Input: "what did I work on last Tuesday afternoon"
// Output:
{
  "query": "what did I work on last Tuesday afternoon",
  "count": 1,
  "ranges": [{"from": "2025-02-11T12:00:00.000Z", "to": "2025-02-11T17:59:59.000Z"}]
}
```

Always call this first when the user's query has a time phrase, then pass the ranges to other tools.

---

### Category 6: Batch Snapshot (16 tools)

Retrieve full objects by UUID (1–100 per call). Always follow search/filter tools with the corresponding snapshot tool.

| Tool | Fetches |
|------|---------|
| `workstream_summaries_batch_snapshot` | Full summary with content, annotations, metadata |
| `conversations_batch_snapshot` | Full conversation with message references |
| `tags_batch_snapshot` | Full tag objects |
| `annotations_batch_snapshot` | Full annotations with content and associations |
| `persons_batch_snapshot` | Full person: name, email, username, associations |
| `anchors_batch_snapshot` | Full code bookmarks with anchor points |
| `anchor_points_batch_snapshot` | Specific file locations within bookmarks |
| `workstream_events_batch_snapshot` | Full activity capture: clipboard/vision/audio + app context |
| `hints_batch_snapshot` | Full hints: text, type, generating model |
| `models_batch_snapshot` | Full model configs: provider, capabilities, status |
| `ranges_batch_snapshot` | Temporal ranges: from/to, type (BETWEEN or CONTINUOUS) |
| `websites_batch_snapshot` | Full website: URL, name, text content, timestamps |
| `entities_batch_snapshot` | Full entities: name, type, membership |
| `conversation_messages_batch_snapshot` | Full messages: content, role, sentiment, model used |
| `wpe_sources_batch_snapshot` | Full sources: readable names, raw identifiers, filter status |
| `wpe_source_windows_batch_snapshot` | Full windows: titles, timestamps |

---

## Core Workflow Pattern

All MCP work follows a two-step pattern:

```
Step 1: Search or identify → get UUID list
Step 2: Fetch full objects → pass UUIDs to batch_snapshot
```

Example:
```
workstream_summaries_full_text_search(query: "auth refactor", limit: 5)
  → [{workstream_summary: {id: "uuid-1", ...}, similarity: 0.95}, ...]

workstream_summaries_batch_snapshot(identifiers: ["uuid-1", "uuid-2"])
  → [{id, content, annotations, created, ...}, ...]
```

Temporal filter pattern (always use `extract_temporal_range` first):
```
extract_temporal_range(query: "yesterday")
  → {ranges: [{from: "2025-06-04T00:00:00Z", to: "2025-06-04T23:59:59Z"}]}

material_identifiers(material_type: "WORKSTREAM_SUMMARIES", created: {from: "...", to: "..."})
  → {identifiers: ["uuid-1", "uuid-2", ...]}

workstream_summaries_batch_snapshot(identifiers: [...])
  → full summary objects
```

---

## 10 Real-World Workflow Examples

**1. Generate standup from yesterday:**
```
extract_temporal_range("yesterday")
  → material_identifiers(WORKSTREAM_SUMMARIES, yesterday range)
  → workstream_summaries_batch_snapshot
  → synthesize into standup bullet points
```

**2. Find clipboard activity from VS Code:**
```
material_identifiers(WORKSTREAM_EVENTS, config: {type: "CLIPBOARD", app: "Visual Studio Code"})
  → workstream_events_batch_snapshot
```

**3. Search Copilot chat history:**
```
conversations_full_text_search(query: "GraphQL schema")
  → conversations_batch_snapshot
```

**4. Semantic search (different words, same concept):**
```
workstream_summaries_vector_search(query: "API rate limiting strategies", threshold: 0.7)
  → workstream_summaries_batch_snapshot
```

**5. Save a memory for future agents:**
```
create_pieces_memory(
  summary: "Implemented Redis caching — key insight: use sliding window for rate limits...",
  summary_description: "Redis caching + rate limiting implementation",
  project: "/Users/dev/api-server",
  files: ["/Users/dev/api-server/src/cache/redis.ts"]
)
```

**6. Find meeting context from audio:**
```
workstream_events_full_text_search(
  query: "caching strategy",
  context_type: "AUDIO",
  created: {from: "2025-06-04T00:00:00Z", to: "2025-06-04T23:59:59Z"}
)
  → workstream_events_batch_snapshot
```

**7. Multi-source research retrieval:**
```
workstream_events_full_text_search(query: "WebSocket", application: "Google Chrome")
workstream_events_full_text_search(query: "WebSocket", context_type: "CLIPBOARD")
websites_full_text_search(query: "websocket")
  → combine results
```

**8. Find code I've been copying repeatedly:**
```
material_identifiers(WORKSTREAM_EVENTS, config: {type: "CLIPBOARD"}, created: last-week-range)
  → workstream_events_batch_snapshot
  → look for repeated content patterns
```

**9. Cross-agent memory retrieval:**
```
ask_pieces_ltm(
  question: "How did we fix the OOM crash in the API server?",
  topics: ["OOM", "memory", "connection pool"],
  chat_llm: "claude-sonnet-4-6"
)
```

**10. Recall what the security team discussed:**
```
ask_pieces_ltm(
  question: "What did the security team decide about the JWT token storage?",
  topics: ["JWT", "authentication", "security"],
  application_sources: ["slack", "teams"],
  chat_llm: "claude-sonnet-4-6"
)
```

<!-- END:auto-updated:tools -->
