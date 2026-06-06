---
name: pieces-os-internals
description: Deep internals of a running Pieces OS installation — processes, storage paths, SQLite database schema, config files, runtime state, ML/AI dylibs, and log locations
---

# Pieces OS Internals

Inspected from a live macOS installation: Pieces OS 12.4.1, Pieces Desktop 6.0.1.

## Process Details

| Process | Binary Size | Architecture | Framework |
|---------|-------------|--------------|-----------|
| Pieces OS | ~1.3 MB binary | Universal (x86_64 + arm64) | FlutterMacOS + 40 plugin frameworks |
| Pieces Desktop | ~6.5 MB binary | Universal | Flutter + 38 plugin frameworks |
| Pieces Babysitter | Python script | Python 3.14 | Custom watchdog |

Pieces Desktop maintains 60+ simultaneous TCP connections to the Pieces OS MCP port.

Pieces OS frameworks include: FlutterMacOS.framework, Sparkle.framework (auto-updater), Sentry.framework (error tracking), and 37 Flutter plugin frameworks (notifications, file picker, connectivity, etc.).

## Storage Locations

All paths are macOS. Linux uses `~/.local/share/` equivalents.

| Path | Size | Purpose |
|------|------|---------|
| `~/Library/com.pieces.pfd/production/` | ~1.3 GB | Client database |
| `~/Library/com.pieces.os/production/` | ~500 MB | Server data, models, config, ML engines |
| `~/Library/com.pieces.x/` | ~200 MB | Desktop app cache |
| `~/Library/Logs/PiecesOS/` | ~45 MB | Log files + metrics DB |
| `~/Library/Caches/com.pieces.os/` | Varies | HTTP cache |
| `~/Library/HTTPStorages/com.pieces.os/` | Small | HTTP alt-svc cache |
| `~/Library/Preferences/com.pieces.os.plist` | Small | macOS prefs |

## Primary Database

**Path**: `~/Library/com.pieces.pfd/production/pieces_client_sqlite.db`
**Size**: ~1.3 GB | **Schema version**: 20 (stored in `MAJOR_0_MINOR_0_PATCH_1`)

All 19 tables use the same key-value pattern:

```sql
CREATE TABLE table_name (
  key       TEXT     PRIMARY KEY NOT NULL,
  json      TEXT,
  expireAt  INTEGER,
  destroyKey TEXT
) WITHOUT ROWID;
```

**Tables:**

| Table | Content |
|-------|---------|
| `user_profile` | User account info |
| `user_context` | Session context |
| `identifiers_last_updated` | Timestamp tracking |
| `applications` | Installed app metadata |
| `copilot_tours` | UI tutorial states |
| `workstream_activity_tours` | Activity tracking |
| `onboarding_tour` | Onboarding progress |
| `workstream_activity_core` | Core activity logs |
| `copilot_runtime_configuration` | Runtime settings |
| `sources` | Code snippet sources |
| `feature_disclaimers` | Feature disclaimers |
| `aesthetics_configuration` | UI theme/appearance |
| `tags` | User-created tags |
| `annotations` | Code annotations |
| `ranges` | Text/code ranges |
| `summaries_annotation_summary` | Summary data |
| `summaries_annotation_description` | Description data |
| `summaries_time_range_label` | Time labels |
| `workstream_summaries` | Workstream summaries (LTM roll-ups) |

Inspect locally:

```bash
DB=~/Library/com.pieces.pfd/production/pieces_client_sqlite.db
sqlite3 "$DB" ".tables"
sqlite3 "$DB" "SELECT key FROM workstream_summaries LIMIT 5"
```

## Metrics Database

**Path**: `~/Library/Logs/PiecesOS/metrics.db`
**Size**: ~7.3 MB

```sql
CREATE TABLE process_metrics (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp        TEXT    NOT NULL,
  pid              INTEGER,
  cpu_percent      REAL,
  mem_rss_mb       REAL,
  mem_vsz_mb       REAL,
  thread_count     INTEGER,
  open_files       INTEGER,
  cpu_user_secs    REAL,
  cpu_sys_secs     REAL,
  process_age_secs REAL,
  health_status    INTEGER,
  restart_count    INTEGER
);
CREATE INDEX idx_ts ON process_metrics(timestamp);
```

## Config Files

**Directory**: `~/Library/com.pieces.os/production/Config/`

| File | Content |
|------|---------|
| `.port.txt` | Active MCP/API port (e.g. `39312`) |
| `.installation.txt` | Full path to Pieces OS binary |
| `.vector_search_available.txt` | Flag — vector search enabled |

**Directory**: `~/Library/com.pieces.os/production/Pieces/`

| File | Content |
|------|---------|
| `.database_version.txt` | Schema version (e.g. `20`) |
| `request_count.txt` | Total API requests handled (e.g. `10524`) |
| `mcp_tool_counts.json` | `{"memory_formations":0,"memory_retrievals":0}` |
| `ids.txt` | Installation/instance UUIDs |
| `last_checked_in.dat` | Binary timestamp of last cloud check-in |

```bash
# Quick status checks
cat ~/Library/com.pieces.os/production/Config/.port.txt
cat ~/Library/com.pieces.os/production/Pieces/request_count.txt
cat ~/Library/com.pieces.os/production/Pieces/mcp_tool_counts.json
```

## ML / AI Engines

All dylibs live in `/Applications/Pieces OS.app/Contents/Frameworks/` (bundled) or loaded from `~/Library/com.pieces.os/production/`.

**High-level runtime engines:**

| Dylib | Size | Purpose |
|-------|------|---------|
| `runtime_native_agentic_engine.dylib` | 154 MB | Agent/AI logic, multi-turn reasoning |
| `runtime_native_audio.dylib` | 126 MB | LTM Audio — mic + system audio capture |
| `runtime_native_vision.dylib` | 8.4 MB | OCR / screenshot capture |
| `runtime_native_clipboard.dylib` | 5.6 MB | Clipboard monitoring |
| `runtime_native_browser.dylib` | 8.2 MB | Browser integration |
| `runtime_native_filesystem.dylib` | 7.2 MB | File operations |
| `runtime_native_events.dylib` | 1.9 MB | Event handling |
| `runtime_vector_search.dylib` | 9.4 MB | Vector/semantic search |

**Core ML libraries:**

| Dylib | Size | Purpose |
|-------|------|---------|
| `libonnxruntime.dylib` | 33 MB | ONNX ML runtime |
| `libonnxinference.dylib` | 108 KB | ONNX inference |
| `libllama_inference.dylib` | 6.3 MB | Local LLM inference (no Ollama dependency in v5.1+) |
| `libocr.dylib` | 9.4 MB | OCR engine |
| `libtokenizers.dylib` | 119 MB | Tokenization |
| `libembedding_utils.dylib` | 856 KB | Embedding utilities |
| `libsnippetizer.dylib` | 7.5 MB | Code snippet processing |
| `libdiscovery.dylib` | 34 MB | Snippet discovery in local projects |
| `libimp.dylib` | 6.6 MB | Image processing |
| `liblonp.dylib` | — | Language processing |

**Model assets:**

| Path | Purpose |
|------|---------|
| `~/Library/com.pieces.os/production/tesseract/eng.traineddata` | Tesseract English OCR model |
| `~/Library/com.pieces.os/production/tagify/tag_sphere_embeddings_100_dim_single_float_user.json` | User tag embeddings (100 dimensions) |
| `~/Library/com.pieces.os/production/tagify/tagify_labels_user.txt` | Tag labels |
| `~/Library/com.pieces.os/production/` `initializers.h5` | H5 neural network initializer |
| `~/Library/com.pieces.os/production/vector_db_logs/` | 27+ daily vector DB log files |

## Log Files

| Log | Size | Content |
|-----|------|---------|
| `~/Library/Logs/PiecesOS/babysitter.stdout.log` | ~2.2 MB | Watchdog stdout |
| `~/Library/Logs/PiecesOS/babysitter.stderr.log` | ~17 MB | Watchdog errors |
| `~/Library/Logs/PiecesOS/babysitter.log` | ~2.2 MB | Main watchdog log |
| `~/Library/Logs/PiecesOS/metrics.stdout.log` | ~5.1 MB | Metrics service stdout |
| `~/Library/Logs/PiecesOS/metrics.db` | ~7.3 MB | Process health history (SQLite) |
| `~/Library/com.pieces.os/production/Support/logs/` | — | Sparkle update logs (dated) |

Tail the babysitter log to diagnose startup issues:

```bash
tail -f ~/Library/Logs/PiecesOS/babysitter.log
```

## User Account Endpoints

```bash
PORT=$(cat ~/Library/com.pieces.os/production/Config/.port.txt)

# Authenticated user profile
curl http://localhost:${PORT}/user | jq '.'

# OS restart
curl -X POST http://localhost:${PORT}/os/restart
```

The `/user` response includes: `id`, `email`, `name`, `vanityName`, `cloud.baseUrl`, `cloud.idUrl` (e.g. `https://joeblack.pieces.cloud`), `theme`, `created`, `updated`.

## Browser Extension Location (Chrome)

```
~/Library/Application Support/Google/Chrome/Default/Extensions/igbgibhbfonhmjlechmeefimncpekepm/<version>/
```

Assets: Flutter client SDK, Copilot module, icons.
