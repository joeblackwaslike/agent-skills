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

## SDK Approach (Agent SDK `query()`)

The CLI isolation pattern above applies to `claude -p` subprocesses in shell scripts. The
Agent SDK (`@anthropic-ai/claude-agent-sdk`) has its own `query()` function that spawns
subprocesses with `Options`, which behaves differently in several important ways. Verified
against SDK v0.3.x.

### `settingSources: []` vs `--setting-sources ""`

The SDK's `settingSources: []` suppresses CLAUDE.md auto-discovery. The CLI's
`--setting-sources ""` does NOT — CLAUDE.md walks up from CWD regardless. This behavioral
difference is undocumented and would surprise anyone reasoning about one from the other's
docs. The CLI requires `--system-prompt` to override CLAUDE.md; the SDK's `settingSources: []`
handles it implicitly.

### `settingSources: []` arg corruption pitfall

The SDK internally emits `["--setting-sources", ""]` as CLI args. Arg filters that strip
empty strings orphan `--setting-sources`, which then consumes the next CLI arg (e.g.
`--permission-mode dontAsk` → `--setting-sources dontAsk`). Pair-aware filtering is required:
when stripping an empty-string arg, also strip the preceding arg if it's a known pair flag.
claude-mem hit this in v12.1.3/v12.1.4; the fix lives in `process-registry.ts` and must NOT
be touched.

### `systemPrompt` option

Available since SDK v0.1.0. Sets the system prompt slot directly — replaces the older
`customSystemPrompt` + `appendSystemPrompt` fields. In v0.1.0+ there is no default system
prompt and no filesystem settings loaded by default — callers must explicitly opt in via
`settingSources` and `systemPrompt`.

### `canUseTool` audit callback

No CLI equivalent. Returns a `PermissionResult` (`{ behavior: 'deny', message }`) and can
write to an append-only audit log. Useful as a backstop behind `tools: []` for incident
detection — any invocation reaching this callback indicates a `tools: []` bypass.

### `tools: []` vs `allowedTools: []`

Critical distinction, easily confused:
- `tools: []` is a **restrictive allowlist** — disables ALL built-in tools at the SDK level.
- `allowedTools: []` is an **auto-approve list** — controls which tools skip permission
  prompts, NOT which tools are available. Setting it to `[]` means "nothing auto-approved,"
  but all tools remain callable if the user approves.

Only `tools: []` restricts the tool surface. `allowedTools`, `disallowedTools`, and
`permissionMode` operate on a surface that `tools: []` has already emptied.

### Known open issues

- **#331**: `mcpServers: {}` + `settingSources: []` + `skills: []` may still leak
  claude.ai connector inventory.
- **#149**: No way to disable parent-directory CLAUDE.md traversal without
  `settingSources: []`.
- **#322**: `options.hooks` causes the agent to ignore custom `systemPrompt`.

## Related Postmortems

Four of five production postmortems involve background processes spawning `claude -p` sessions
without isolation. This pattern is the single highest-leverage fix across the incident history:

| PM | System | Impact | How `--setting-sources ""` prevents it |
|----|--------|--------|----------------------------------------|
| PM-001 | cc-recall | `runClaudeHeadless` burned ~69% of weekly Max quota (2,825 sessions in 43h). Each bare `claude -p` inherited the interactive Opus model + 39.5k-token settings/plugin prefix per cold call. | Strips the 39.5k-token prefix (zero hooks, plugins, MCP from config). Combined with `--model` pin, eliminates both cost multipliers. |
| PM-003 | cc-recall | PM-001's fix never deployed (stale plugin cache); the unfixed `runClaudeHeadless` continued spawning unisolated sessions for 6 more weeks, compounding PM-001's impact. | Same as PM-001 — the fix that was stale-cached would have been unnecessary if `--setting-sources ""` had been the original design. |
| PM-004 | claude-mem | Worker daemon spawned observer-sessions using real Claude API quota continuously for 25+ hours. No disable mechanism held — `enabledPlugins` only governs new session loading, not already-running sessions with baked-in hook wiring. | Observer-sessions spawned with `--setting-sources ""` would not load plugins or fire hooks on their own sessions, breaking the respawn chain that defeated the disable flag. |
| PM-005 | pieces-dev | Bare `claude -p` in Stop hook created 36,468 ghost sessions (2x cascade via cc-recall), ~547,000 hook invocations, polluted cc-recall (62% ghost entries), claude-mem (298 ghost sdk_sessions), and transcripts (~54k ghost files) over 59 days. | Directly motivated this pattern. Adopted in the fix. |

**PM-001 correction:** PM-001's resolution section states `--setting-sources=` (empty) "breaks
auth — verified." That testing conflated `--setting-sources` with the `CLAUDE_CONFIG_DIR`
approach, which *does* break Keychain auth (credentials keyed by config-dir path hash). PM-005's
testing confirmed `--setting-sources ""` preserves Keychain auth — the config dir stays at
`~/.claude/`, so the hash lookup succeeds. The 39.5k-token prefix PM-001 flagged as "not fixed"
is now fixable.

**PM-002** (Serena unpinned upgrade) is unrelated — dependency-drift, not subprocess isolation.

## Adoption Guidance

Any hook or background script that spawns `claude -p` should use this pattern. Known
adopters:

- **pieces-dev** `pieces-memory-stop.sh` — adopted in PM-005 fix
- **cc-recall** `runClaudeHeadless` — should adopt (currently uses dedicated CWD + self-recognition workarounds); would fix PM-001's 39.5k-token prefix and PM-003's deployment-gap class of issue
- **claude-mem** — adopted (v12.1.3+). Uses `settingSources: []` + `tools: []` + `canUseTool` + `systemPrompt` via `buildHardenedSdkOptions()`. Pair-aware arg filter in `process-registry.ts` prevents the `settingSources: []` arg corruption pitfall.
