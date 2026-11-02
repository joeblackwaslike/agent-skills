# Plugin Hooks

Adapted from plugin-dev (Apache-2.0), anthropics/claude-plugins-official. Corrected against the
current hooks docs in `working-with-claude-code/references/hooks.md`.

Hooks run commands, prompts, or subagents when Claude Code hits a lifecycle event. A plugin
ships them in `hooks/hooks.json`, and they apply whenever the plugin is enabled.

## hooks.json must wrap events in a "hooks" key

`hooks/hooks.json` needs a top-level `"hooks"` object that holds the events. A file with events at
the top level fails to load. The error read `hooks.json must have 'hooks' ... or 'modules'` when the
spinup-ts plugin shipped the unwrapped form.

Wrong, fails to load:

```json
{
  "SessionStart": [
    { "hooks": [ { "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/hooks/start.sh" } ] }
  ]
}
```

Right:

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [ { "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/hooks/start.sh" } ] }
    ]
  }
}
```

The official plugin example in `plugins-reference.md` uses the wrapped form. A top-level `$schema`
key is allowed (editors use it; Claude Code ignores it).

Check any file with `scripts/validate-hook-schema.sh hooks/hooks.json`. It reports the unwrapped
form as an error.

The `modules` alternative named in the loader error is not documented in the docs mirror, so this
reference does not cover it.

## Three nesting levels

1. Event name (`PreToolUse`, `Stop`, ...).
2. Matcher group: an optional `matcher` plus a `hooks` array.
3. Handler: `type` plus type-specific fields.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/hooks/validate.sh", "timeout": 30 }
        ]
      }
    ]
  }
}
```

Matching handlers for one event run in parallel, so do not depend on ordering between them.

## Handler types

| type | Required field | Use for |
|------|----------------|---------|
| `command` | `command` | Deterministic checks, file I/O, calling other tools |
| `prompt` | `prompt` | Judgment calls an LLM can make from the event JSON |
| `agent` | `prompt` | Verification that needs Read/Grep/Glob (experimental) |
| `http` | `url` | POSTing the event to a service |
| `mcp_tool` | see hooks docs | Calling a configured MCP server's tool |

### Command hooks

The event JSON arrives on stdin. Results come back through the exit code and stdout.

```bash
#!/bin/bash
set -euo pipefail
input=$(cat)
file=$(jq -r '.tool_input.file_path // empty' <<<"$input")
case "$file" in
  *.env | */secrets/*)
    echo "Blocked: $file is a protected path" >&2
    exit 2
    ;;
esac
exit 0
```

Set `args` on a command handler to run it in exec form (no shell, each element one argument).
Omit `args` when you need pipes or redirects. Shell-form commands in plugins reject
`${user_config.KEY}` substitution; read `CLAUDE_PLUGIN_OPTION_<KEY>` from the environment instead.

### Prompt hooks

An LLM answers from the event JSON. `$ARGUMENTS` is replaced with that JSON, and it is appended
if you leave the placeholder out. The default `timeout` is 30 seconds.

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check whether the task is finished. Context: $ARGUMENTS\nReply {\"ok\": true} to allow stopping or {\"ok\": false, \"reason\": \"what is left\"}."
          }
        ]
      }
    ]
  }
}
```

The model must return `{"ok": true|false, "reason": "..."}`. What `ok: false` does depends on the
event. On `Stop` and `SubagentStop` the reason becomes Claude's next instruction. On `PreToolUse`
it denies the call and, by default, ends the turn. Set `continueOnBlock: true` to hand the reason
back to Claude as a tool error so it can adjust. Prompt and agent handlers work on a subset of
events (Stop, SubagentStop, PreToolUse, PostToolUse, UserPromptSubmit, TaskCreated, TaskCompleted,
and a few others). They do not work on SessionStart, SessionEnd, Notification, PreCompact,
SubagentStart, or the worktree events. The validator warns when you use one where it is
unsupported.

Pick a prompt hook when the decision needs context a regex cannot see. Pick a command hook when
the rule is mechanical, because it is faster, free, and testable offline.

## Events you will use most

| Event | Fires | Can block? | Matcher filters on |
|-------|-------|------------|--------------------|
| `SessionStart` | Session begins or resumes | No | `startup`, `resume`, `clear`, `compact`, `fork` |
| `UserPromptSubmit` | Before Claude sees a prompt | Yes | none |
| `PreToolUse` | Before a tool runs | Yes | tool name |
| `PostToolUse` | After a tool succeeds | No (stderr shown to Claude on exit 2) | tool name |
| `Stop` | Claude finishes a turn | Yes (forces it to continue) | none |
| `SubagentStop` | A subagent finishes | Yes | agent type |
| `PreCompact` | Before compaction | Yes | `manual`, `auto` |
| `SessionEnd` | Session ends | No | exit reason |
| `Notification` | Claude Code notifies | No | notification type |

The full list has more than 30 events (`PermissionRequest`, `PostToolBatch`, `FileChanged`,
`CwdChanged`, `WorktreeCreate`, and others). Look them up in `working-with-claude-code`'s
`hooks.md` rather than guessing. An event with no matcher support silently ignores a `matcher`.

## Matchers

| Matcher value | Evaluated as |
|---------------|--------------|
| `""`, `"*"`, or omitted | every occurrence |
| letters, digits, `_`, `-`, `,`, `\|` only | exact name or a list of exact names (`Edit\|Write`) |
| anything else | unanchored JavaScript regex (`^Notebook`, `mcp__.*__write.*`) |

Plugin-bundled MCP tools are named `mcp__plugin_<plugin>_<server>__<tool>`. A matcher written
against the bare server key (`mcp__db__.*`) never fires for them. To catch every tool on a
plugin's `db` server in plugin `my-plugin`, use `mcp__plugin_my-plugin_db__.*`.

To narrow a tool hook by arguments, add `"if": "Bash(git *)"` to the handler. It takes one
permission-rule string and only works on tool events.

## Exit codes and output

| Exit | Result |
|------|--------|
| 0 | Success. If stdout is a single JSON object, its fields apply. On `UserPromptSubmit` and `SessionStart`, plain stdout is added to Claude's context. |
| 2 | Blocking error on events that can block. stderr is the reason. JSON fields cannot override the block. |
| other | Non-blocking error. The action goes ahead. |

Pick one style per hook. Use exit codes alone, or exit 0 and print JSON. Print nothing but the JSON
object on stdout, because a stray line from a shell profile breaks parsing. A hook cannot write
to `/dev/tty`; return `systemMessage` in JSON to show the user something.

Common JSON fields: `continue` (false stops everything), `stopReason`, `systemMessage`.

### PreToolUse decisions

Use `hookSpecificOutput`, not the older top-level `decision` (deprecated for this event):

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Writes to .env are blocked",
    "updatedInput": { "file_path": "/safe/path" }
  }
}
```

`permissionDecision` is `allow`, `deny`, `ask`, or `defer`. With several hooks the precedence is
`deny`, then `defer`, then `ask`, then `allow`. `updatedInput` replaces the whole input object, so
copy the fields you are not changing.

### Stop and PostToolUse decisions

These use top-level fields: `{"decision": "block", "reason": "Tests have not run"}`.

### Adding context

`SessionStart`, `SubagentStart`, and `PostModelSwitch` take
`{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "..."}}`.
Strings are capped at 10,000 characters. `SessionStart` can also write `export` lines to the file at
`$CLAUDE_ENV_FILE` to set environment variables for later Bash calls. Append with `>>`.

## Paths and environment

Use `${CLAUDE_PLUGIN_ROOT}` for files shipped inside the plugin and `${CLAUDE_PROJECT_DIR}` for the
user's project. Never hardcode absolute paths. `${CLAUDE_PLUGIN_DATA}` is a directory that survives
plugin updates, for installed dependencies and caches. Quote the placeholder in shell form
(`"${CLAUDE_PLUGIN_ROOT}"/scripts/x.sh`) because the install path can contain spaces.

Hook scripts must be executable (`chmod +x`). A hook that does not start is a non-blocking error
and easy to miss.

## Flag-file pattern

Ship a hook that is always registered but does nothing until the user opts in, so enabling it
never needs a hooks.json edit. The hook checks a flag file and exits 0 immediately if absent:

```bash
#!/bin/bash
set -euo pipefail
flag="${CLAUDE_PROJECT_DIR:-.}/.claude/my-plugin.enabled"
[ -f "$flag" ] || exit 0
# ... real work ...
```

For richer settings, read YAML frontmatter from `.claude/<plugin>.local.md` instead. See
`plugin-settings.md`. The official alternative for values the user supplies at enable time is
`userConfig` in `plugin.json`, exported to hooks as `CLAUDE_PLUGIN_OPTION_<KEY>`.

## When changes take effect

Edits to a plugin's `hooks/` do not apply to a running session. Run `/reload-plugins` or restart
Claude Code. `/hooks` lists loaded hooks and where each came from.

## Testing

```bash
scripts/validate-hook-schema.sh hooks/hooks.json
scripts/hook-linter.sh hooks/validate.sh
scripts/test-hook.sh --create-sample PreToolUse > /tmp/event.json
scripts/test-hook.sh -e 2 hooks/validate.sh /tmp/event.json   # asserts the hook blocks
```

`claude plugin validate ./my-plugin` also checks `hooks/hooks.json`. For live debugging, run
`claude --debug` and read the hook lines in the log.

## Pitfalls

- Events at the top level of `hooks.json` (above).
- `matcher` on an event that ignores it, such as `Stop`.
- Forgetting that a PostToolUse hook cannot undo the tool call; it can only inform Claude.
- Slow hooks. Command hooks default to a 600 second timeout, so set a short `timeout` yourself.
- Printing debug text to stdout from a JSON-returning hook.
- A `Stop` hook that always exits 2 keeps the conversation going. Make the block conditional.
