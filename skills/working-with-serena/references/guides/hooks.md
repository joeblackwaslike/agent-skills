# Enforcing Serena tool use with hooks

The single hardest part of using Serena well is **getting the model to actually do it**. This guide
covers why, the upstream **Serena Hooks**, and Joe's **custom config-file hook** that fills the gap
Serena Hooks leaves.

## The compliance problem (agent drift)

Newer Claude models — especially the **Opus line** — are trained so heavily on their built-in tools
that they drift back to `Read`/`Edit`/`Grep` even when Serena is connected and instructions say to
use it. It's worst in long sessions and under Claude Code's **dynamic tool loading** (Serena's tools
may not even be loaded at the start). Serena's own documentation is blunt about it:

> Recent updates to Claude Code (CC) and to the Opus line of models resulted in drastically reduced
> adherence to instructions pertaining to Serena's tools. […] The descriptions of CC's system tools
> take almost 16k tokens, cannot be adjusted by the user, and introduce a very strong bias towards
> internal tools, making it almost impossible to convince Opus 4.7 to use Serena.

Mitigations stack (weakest → strongest): `--context claude-code` → the
`serena prompts print-cc-system-prompt-override` system prompt → **hooks**. Hooks are the only
mechanism that keeps holding deep into a long session, because they fire on *every tool call* and
re-inject the nudge exactly when drift happens. (Hooks are an upstream **alpha** feature.)

## Upstream Serena Hooks (`serena-hooks` CLI)

`serena-hooks` ships with `serena-agent` as a separate entrypoint (kept separate for startup
performance). Four subcommands, each wired to a Claude Code lifecycle event:

| Subcommand | Event | What it does |
|---|---|---|
| `serena-hooks remind` | `PreToolUse` | Nudges the agent to use Serena's symbolic tools after too many consecutive `grep`/`read_file` calls with no Serena tool in between. **Fires for code search/read only.** |
| `serena-hooks auto-approve` | `PreToolUse` (matcher `mcp__serena__*`) | Auto-approves Serena tool calls while CC is in a permissive mode (`acceptEdits` or `auto`) — so blanket approvals also cover Serena's destructive tools (`replace_symbol_body`, `rename_symbol`) instead of prompting each time. |
| `serena-hooks activate` | `SessionStart` | Prompts the agent to activate the project and read Serena's instructions at session start (also fixes the "tools not loaded yet" problem). |
| `serena-hooks cleanup` | `SessionEnd` | Cleans up the hook's session data. |

Each takes `--client [claude-code|vscode|codex]` (default `claude-code`). Full help:
[`../cli/serena-hooks.md`](../cli/serena-hooks.md) and the per-subcommand files beside it.

### Canonical Claude Code wiring (`~/.claude/settings.json` or project `.claude/settings.json`)

All hooks are opt-in; include the ones you want.

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "", "hooks": [
        { "type": "command", "command": "serena-hooks remind --client=claude-code" } ] },
      { "matcher": "mcp__serena__*", "hooks": [
        { "type": "command", "command": "serena-hooks auto-approve --client=claude-code" } ] }
    ],
    "SessionStart": [
      { "matcher": "", "hooks": [
        { "type": "command", "command": "serena-hooks activate --client=claude-code" } ] }
    ],
    "SessionEnd": [
      { "matcher": "", "hooks": [
        { "type": "command", "command": "serena-hooks cleanup --client=claude-code" } ] }
    ]
  }
}
```

> If `serena-hooks` isn't on the PATH the hook sees, use the absolute path (e.g.
> `/Users/<you>/.local/bin/serena-hooks remind`). Joe's real config does exactly this.

## The gap: Serena Hooks only covers *code* files

`serena-hooks remind` tracks consecutive **code** reads/greps. But Serena is also efficient for
**config, data, doc, and schema** formats — `.json`, `.yaml`/`.yml`, `.toml`, `.xml`, `.md`/`.mdx`,
`.sql`, `.graphql`/`.gql`, `.proto`, `.tf`/`.tfvars`/`.hcl`, `.rst` — where `search_for_pattern` (and
`get_symbols_overview`/`find_symbol` for LSP-backed formats) beat reading a whole file to find one
key. Serena Hooks never nudges for these, so the model happily `Read`s entire config files all
session. Joe built a custom hook to close that gap.

## Joe's custom hook: `serena-ext-remind.mjs`

A PreToolUse hook that **supplements** `serena-hooks remind` for the file types it omits. Vendored in
this skill at [`../hooks/serena-ext-remind.mjs`](../hooks/serena-ext-remind.mjs).

**Behavior:**
- Watches `Read` calls on the config/data/doc/schema extensions listed above (`EXTENSIONS` set).
- Counts **consecutive** such reads. After `READ_THRESHOLD = 5`, it emits a `permissionDecision:
  "deny"` whose `additionalContext` tells the agent to prefer `search_for_pattern` (and
  `get_symbols_overview`/`find_symbol` where the format is LSP-backed). It then **resets the
  counter**, so the deny is a one-shot nudge — you can immediately continue.
- Any Serena tool call (`mcp__plugin_serena_serena__*`) **resets the counter** — using the right tool
  clears the pressure.
- A `MIN_DENY_INTERVAL_SECONDS = 120` cooldown prevents nagging: after a deny, the hook stays quiet
  for 2 minutes. Per-session state lives under `~/.claude/hooks/hook-data/<session>/ext-remind.json`.

**Wiring (add alongside the upstream hooks):**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|mcp__plugin_serena_serena__.*",
        "hooks": [
          { "type": "command", "command": "node /Users/<you>/.claude/hooks/serena-ext-remind.mjs", "timeout": 10 }
        ]
      }
    ]
  }
}
```

The matcher must include both `Read` (to count) **and** `mcp__plugin_serena_serena__.*` (so Serena
calls reach the hook and reset the counter).

## Joe's actual `~/.claude/settings.json` (reference)

For reproduction, Joe runs all of these together:

- `PreToolUse` matcher `Read|Edit|Write|Bash|Glob|Grep|mcp__plugin_serena_serena__.*` →
  `/Users/joe/.local/bin/serena-hooks remind`
- `PreToolUse` matcher `Read|mcp__plugin_serena_serena__.*` →
  `node /Users/joe/.claude/hooks/serena-ext-remind.mjs` (the custom config-file hook)
- `PreToolUse` matcher `mcp__plugin_serena_serena__.*` → `serena-hooks auto-approve`
- `SessionStart` → `serena-hooks activate`
- `SessionEnd` → `serena-hooks cleanup`

Together: upstream Serena Hooks enforce symbolic tools for **code**, and `serena-ext-remind` extends
the same discipline to **config/data/doc** files — closing the drift gap on both fronts.

## Installing the custom hook elsewhere

1. Copy [`../hooks/serena-ext-remind.mjs`](../hooks/serena-ext-remind.mjs) to
   `~/.claude/hooks/serena-ext-remind.mjs`.
2. Add the `PreToolUse` block above to `~/.claude/settings.json` (point `node` at the copied path).
3. Tune `EXTENSIONS`, `READ_THRESHOLD`, or `MIN_DENY_INTERVAL_SECONDS` at the top of the file to taste.
