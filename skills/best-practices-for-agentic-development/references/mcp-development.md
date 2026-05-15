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

## MCP Anti-Patterns

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

