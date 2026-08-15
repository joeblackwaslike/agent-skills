# Side-Effect-Free `claude -p` from Hooks

## Problem

A bare `claude -p` subprocess inherits the full session lifecycle: settings.json hooks
(SessionStart, Stop, SessionEnd), plugin loading (claude-mem, cc-recall, etc.), CLAUDE.md
auto-discovery, and transcript persistence. When spawned from a hook, this creates a cascade:
each ghost session triggers the same hooks, which spawn more sessions.

**PM-005 impact:** 36,468 ghost sessions, ~547,000 hook invocations, pollution across cc-recall,
claude-mem, and session transcripts over 59 days.

## Solution: `--setting-sources ""` Isolation Pattern

```bash
PIECES_MCP_URL="http://localhost:$PORT/model_context_protocol/2025-03-26/mcp"

/opt/homebrew/bin/claude -p \
  --no-session-persistence \
  --setting-sources "" \
  --model claude-haiku-4-5-20251001 \
  --system-prompt "$PROMPT" \
  --strict-mcp-config \
  --mcp-config '{"server-name":{"type":"http","url":"..."}}' \
  --allowedTools "mcp__server-name__tool_name" \
  "Your input here"
```

## Flag Reference

| Flag | Purpose |
|------|---------|
| `--setting-sources ""` | Skip loading ALL settings files (user, project, local). No hooks fire, no plugins load, no MCP servers from config. Auth stays on default config dir (Keychain lookup succeeds). |
| `--no-session-persistence` | No JSONL transcript written, no session directory created on disk. |
| `--strict-mcp-config` | Only MCP servers from `--mcp-config` are loaded -- ignores settings.json MCP entries. |
| `--mcp-config` | Inline JSON specifying exactly which MCP servers the subprocess needs. |
| `--system-prompt` | Replaces CLAUDE.md auto-discovery with the given prompt. CLAUDE.md walks up from CWD, not from config dir, so this flag is needed even when settings are suppressed. |
| `--model` | Cost isolation -- use a cheap model for background work. |
| `--allowedTools` | Restrict tool access to only what the hook needs. |

## Why Not `CLAUDE_CONFIG_DIR`?

`CLAUDE_CONFIG_DIR` was the initial approach -- point at a minimal config directory with empty
hooks and no plugins. But it breaks Keychain auth: Claude Code stores OAuth credentials in the
macOS Keychain keyed by a hash of the config directory path. Redirecting the config dir changes
the hash, and the Keychain lookup returns "Not logged in." Requires a separate
`claude auth login` per config dir, which is fragile and confusing.

`--setting-sources ""` achieves the same isolation (no hooks, no plugins, no MCP from config)
while preserving the default config dir for auth. The Keychain lookup uses the normal
`~/.claude/` path hash, so Max subscription OAuth works without any additional setup.

## Why Not `--bare`?

`--bare` skips hooks, plugins, CLAUDE.md, and auto-memory -- exactly the isolation needed.
But it requires `ANTHROPIC_API_KEY` environment variable auth, which changes the billing
mechanism. If the user has a Max subscription (OAuth/keychain), `--bare` forces a different
auth path. `--setting-sources ""` achieves the same isolation while preserving existing auth.

## Why Not `--settings '{"hooks": {}}'`?

`--settings` loads "additional" settings and merges them with existing config. The merge
behavior for hooks is undocumented -- it may deep-merge rather than replace, leaving hooks
active. `--setting-sources ""` is definitive: no settings files are loaded at all.

## Adoption Guidance

Any hook or background script that spawns `claude -p` should use this pattern. Known
adopters:

- **pieces-dev** `pieces-memory-stop.sh` -- adopted in PM-005 fix
- **cc-recall** `runClaudeHeadless` -- should adopt (currently uses dedicated CWD + self-recognition workarounds)
- **claude-mem** -- should adopt if spawning headless claude
