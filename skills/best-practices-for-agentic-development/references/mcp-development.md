# MCP Development

Use this when designing, implementing, reviewing, or optimizing MCP servers, tools, resources, prompts, or MCP-based workflows.

## Core Model

MCP design is not ordinary API design. The user of the API is an agent with limited context, imperfect planning, and tool-call costs.

Optimize for:

- Low context overhead.
- Clear affordances.
- Useful observations after actions.
- Progressive disclosure.
- Safe side effects.
- Schema clarity without prose bloat.
- Primitives designed for the agent as primary user (send/read/wait-for-reply shaped), not a human-facing CLI/API adapted 1:1. See general-agent-development.md Tool Design.

## Tool Surface Area

Every exposed tool and verbose description can cost context. Prefer a small number of powerful, well-routed tools over a large menu of narrow tools unless the narrow tools materially improve safety or selection.

Good patterns:

- Single `use_service` tool with `action` parameter and `help` action.
- First-class actions for common workflows.
- Raw/query escape hatch for rare advanced needs.
- Resources for large static data.
- Prompts for reusable multi-step guidance.

Avoid:

- 25 tools where 5 actions would do.
- Human-style API docs copied into every tool description.
- Repeating enum values or schema constraints in prose.
- Tool names that differ only subtly.

### Exotic States via Existing Verbs

Represent blocking/interrupt states (native dialogs, permission prompts, auth challenges) as synthetic captures routed through EXISTING action verbs — e.g. a small selector grammar like `dialog::accept` routed through the existing click/type actions — rather than adding new top-level action types. Goal: zero new top-level action-enum entries for edge-case states.

## Self-Documentation

Include an action like:

```json
{"action": "help"}
```

It should return:

- Supported actions.
- Required fields.
- Examples.
- Safety notes.
- Current server/session state if relevant.

This lets the MCP stay compact at startup while remaining discoverable on demand.

## Tool Descriptions

Descriptions should help tool selection, not duplicate the schema.

Good:

```text
Search Linear issues and return compact issue summaries. Use for finding existing work, status, owners, or issue IDs.
```

Bad:

```text
The query parameter is a string. The limit parameter is an integer between 1 and 100. Status must be one of...
```

The JSON schema already carries structural constraints.

### Schema Tolerance (Postel's Law)

| Action kind | Accepts | Never |
| --- | --- | --- |
| Structured | Native object OR an equivalent JSON-stringified string (client tooling commonly always-stringifies args regardless of type) | — |
| Scalar | Literal string argument | JSON-parsed — a literal string must not be misinterpreted as JSON |

Prevents a class of misleading "missing field" errors when a valid-but-differently-encoded payload arrives.

## Schema Evolution

When reshaping a tool's parameter shape (e.g. a per-call targeting parameter -> server-side sticky session state plus an explicit switch action), keep the OLD parameter name working as a Postel-accepted legacy alias during the migration window rather than a hard break — existing callers keep working while new ones adopt the new shape.

## Response Design

Return observations that help the next agent step.

For read actions:

- Compact summary.
- Stable IDs.
- Relevant URLs.
- Pagination or continuation hints.
- Confidence/limits.

For write actions:

- What changed.
- New state.
- IDs/links.
- Undo or follow-up options.
- Warnings.

For errors:

- Set `isError: true` on the CallToolResult for every genuine error. A thrown/failed handler that instead returns ordinary non-error text gets recorded by the calling agent as a success, and any loop-breaker keyed on the error flag never engages (observed: ~300 consecutive identical failing tool calls in one real session). Distinguish a genuine in-band error (throw -> isError:true) from a legitimate non-error synthetic state, e.g. a dialog-refusal response, which correctly stays non-error.
- What failed.
- Whether retry is useful.
- What parameter/state to change.
- Whether user approval is needed.

## Context-Efficient Workflows

For multi-step MCP workflows with large intermediate results, use an mcp-exec-style pattern:

```text
fetch -> filter/transform in sandbox -> return only final summary
```

Use when:

- Multiple MCP calls are needed.
- Results are large.
- You only need aggregated output.
- Raw results would flood context.

Do not use when:

- A single small tool result is needed in context.
- The user needs to inspect raw output.
- Hooks must fire for each direct tool call.

## Safety

Classify actions:

| Action type | Requirement |
| --- | --- |
| Read-only | Safe by default, but respect privacy. |
| Local write | Confirm when destructive or broad. |
| External write | Ask before visible side effects. |
| Send/publish/delete/purchase | Require explicit approval. |
| Credential/permission changes | Require explicit approval and explain impact. |

MCP tools should make side effects obvious in names, schemas, and responses.

## State and Sessions

If the MCP server has session state:

- Expose current state in help/status.
- Make IDs stable.
- Avoid hidden global state when possible.
- Support reset or cleanup.
- Make parallel session behavior explicit.
- If the server silently recovers from external state loss (e.g. respawning a killed process), prefix the NEXT response with a visible marker telling the agent its prior assumptions are now false (e.g. "[Chrome auto-restarted; URL reset to about:blank. Re-navigate to continue.]") — never let the agent act on stale assumptions silently.
- For a singleton external resource that might be launched by concurrent server instances, use a per-process lock file with stale-lock (dead PID) reclamation and fallback numbering, plus an explicit opt-out for intentional sharing.
- Wire shutdown/resource-release to stdin-end, transport-close, AND a configurable parent-process-id watchdog — an unexpected exit must still release the held resource so the next instance reconnects cleanly instead of spawning a duplicate.

For browser or UI MCPs, actions should usually return a fresh capture or state summary after navigation/click/type.

## Testing

Test MCPs at three levels:

1. Unit tests for handlers and schema validation.
2. Integration tests against the real service or fixture.
3. Agent-behavior tests: can an agent discover and use the tool correctly?

Behavioral scenarios:

- Agent asks for help and chooses correct action.
- Agent handles empty results.
- Agent recovers from invalid parameters.
- Agent avoids unsafe side effects without approval.
- Agent can complete a realistic multi-step task without reading external docs.

Worked example (level 3): natural-language scenario scripts executed by a real worker agent calling the MCP tool end-to-end caught a real bug that handler-level unit tests missed, because unit tests bypass the MCP surface entirely by calling internals directly. See agentic-development.md Verification for the general pattern.

### Subagent Wrappers for MCP Tools

Minimal template for a narrowly-scoped, read-only analysis subagent wrapping one MCP capability:

- Frontmatter `tools:` allowlist scoped to just the needed primitives plus the one MCP tool.
- Explicit permission mode.
- Explicit "Critical Rules — DO NOT" list, e.g. no raw payload dumps; always check auto-captured artifacts before requesting new ones.

For nontrivial protocol/transport internals, keep a maintainer-facing "why we built it this way" doc tier separate from user-facing tool docs.

## MCP Anti-Patterns

- **Errors that don't set `isError: true`** — the agent records failures as successes; no loop-breaker can engage.
- Tool explosion.
- Verbose descriptions that burn context.
- Returning raw huge payloads by default.
- Write tools that look like read tools.
- Errors that expose stack traces but no recovery path.
- Hidden state that changes tool behavior unpredictably.
- No help/status action.
- No compact summary mode.

## Completion Criteria

An MCP server is agent-ready when:

- Tool surface is minimal and clear.
- Help action documents usage on demand.
- Responses include next-step observations.
- Safety boundaries are explicit.
- Large outputs have summary/filter options.
- Agent-behavior tests or transcripts show successful use.
