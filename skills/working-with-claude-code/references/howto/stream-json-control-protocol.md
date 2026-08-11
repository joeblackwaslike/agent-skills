# Claude CLI stream-json control protocol

Wire formats for the `claude --input-format stream-json --output-format stream-json` CLI's
control protocol — live model/effort/mode switching, context-usage breakdown, and compaction.
Verified empirically against claude 2.1.x (probed directly on stdin/stdout); not covered by the
official docs mirrored elsewhere in this skill as of this writing, so trust the live binary over
this file if they diverge, and update this file when they do.

## Why this exists

Any host process driving the `claude` CLI this way (a VS Code extension, a custom wrapper, an
orchestrator) needs this to do live mode/model/effort switching and render a context-usage ring
without restarting the process. No `initialize` handshake is needed — the control channel is
live on stdin/stdout immediately.

## Request/response shape

**Request** (write to stdin): `{type:"control_request", request_id, request:{subtype, ...}}`

**Response** (interleaved on stdout): `{type:"control_response", response:{subtype:"success"|"error", request_id, response?:{...}, error?:string}}` — correlate by `request_id` and don't broadcast `control_response` as a conversation event.

## Verified subtypes

- `set_model` `{model}` → live model switch (success).
- `set_max_thinking_tokens` `{maxThinkingTokens}` → live effort/thinking (success). There is **no
  live `set_effort`**; effort is the `--effort low|medium|high|xhigh|max` launch flag, so live
  effort changes have to map to thinking-token budgets instead.
- `set_permission_mode` `{mode, userInitiated}` → live permission mode.
- `get_context_usage` → returns the breakdown: `{categories:[{name, tokens, color, isDeferred?}], totalTokens, maxTokens, percentage, gridRows}`. Categories: System prompt / System tools / MCP
  tools (deferred) / System tools (deferred) / Custom agents / Memory files / Skills / Messages /
  Free space. No per-tool detail — don't promise MCP-tool expansion in a UI built on this.
- `interrupt` — a documented control request, but SIGINT works too and is what's actually used
  in practice by at least one consumer of this protocol.

## Compaction is NOT a control request

`{subtype:"compact"}` returns `error: "Unsupported control request subtype: compact"`. Trigger it
by sending `/compact` as a normal user message
(`{type:"user", message:{role:"user", content:"/compact"}}`); the CLI then emits
`{type:"system", subtype:"status", status:"compacting"}` and a `compact_result`/`compact_error`.

## Context window size

opus-4-8 has a **1M context window** (visible in the result event's `modelUsage.contextWindow`)
— never hard-code 200k; read `maxTokens` from the `get_context_usage` breakdown instead.

## Origin

Diagnosed while building a VS Code extension's live mode/model/effort switching and
context-usage ring on top of this CLI.
