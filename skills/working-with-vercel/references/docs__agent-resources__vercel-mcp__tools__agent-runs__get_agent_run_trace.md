---
title: get_agent_run_trace
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/agent-runs
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_agent_run_trace with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "1ab54f1f050e083e2e6430bb9e569b96546d56c5000e2d3f319b5eb0f61b4bda"
---

# get_agent_run_trace

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Search trace spans from the Vercel CLI](https://vercel.com/changelog/search-trace-spans-from-the-vercel-cli)
- [Agent Runs](https://vercel.com/docs/eve/agent-runs) — Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
- [get_agent_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run) — Use get_agent_run with Vercel MCP.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Session tracing](https://vercel.com/docs/tracing/session-tracing) — Learn how to trace your sessions to understand performance and infrastructure details.
- [Tracing](https://vercel.com/docs/tracing) — Learn how to trace your application to understand performance and infrastructure details.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace.graph.md)
<!-- /docsgraph:related -->

Read one page of an eve Agent Run trace, including turns, messages, reasoning, tool calls, token usage, and tool input or output when available.

| Parameter          | Type    | Required | Default | Description                                                                                                                                                                                                             |
| ------------------ | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`           | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                               |
| `projectId`        | string  | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`.                                                                                                                           |
| `runId`            | string  | Yes      | -       | The Agent Run ID to inspect.                                                                                                                                                                                            |
| `environment`      | string  | No       | -       | Agent run environment, usually "production" or "preview". Defaults to "production".                                                                                                                                     |
| `period`           | string  | No       | -       | Preset time range. Ignored when both from and to are provided. Defaults to the dashboard endpoint default. Allowed values: `"5m"`, `"15m"`, `"1h"`, `"6h"`, `"12h"`, `"1d"`, `"3d"`, `"7d"`, `"14d"`, `"30d"`, `"90d"`. |
| `from`             | string  | No       | -       | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like "12h". Must be used with to.                                                                                                       |
| `to`               | string  | No       | -       | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like "1h", or "now". Must be used with from.                                                                                                 |
| `maxFieldLength`   | number  | No       | -       | Maximum length for individual string fields in the returned trace. Defaults to 8000. Use 0 to disable truncation.                                                                                                       |
| `traceStreamId`    | string  | No       | -       | Copy streamId from the trace payload's later or earlier object. Requires exactly one pagination cursor.                                                                                                                 |
| `traceAfterCursor` | string  | No       | -       | Copy cursor from later to fetch the next page, with its traceStreamId.                                                                                                                                                  |
| `traceBeforeChunk` | integer | No       | -       | Copy beforeChunk from earlier to fetch the previous page, with its traceStreamId.                                                                                                                                       |

## Response and pagination

The response contains a `trace` object with `runId`, `framework`, optional `metadata`, and the framework's trace payload. Current eve runs use `trace.eve`. Older payloads can use `trace.ash`. Inspect the payload before reading its continuation fields.

| Payload field | Meaning |
| --- | --- |
| `turns` | The turns returned on this page. Turns can include messages, reasoning, tool calls, and token usage. |
| `later` | A forward continuation containing `streamId` and `cursor`. Null or absent when there are no more currently persisted chunks. |
| `earlier` | A backward continuation containing `streamId` and `beforeChunk`. Null or absent when the page reaches the stream's start. |
| `truncated` | Optional metadata with `droppedSide`: `oldest`, `newest`, or `both`. Indicates which part of a bounded stream read is missing. |
| `unavailableReason`, `unavailableCode` | Optional explanation when trace content is unavailable. An empty or unavailable trace does not imply the run had no activity. |

To read the next page, keep the same team, project, run, and time window. Copy `later.streamId` into `traceStreamId` and `later.cursor` into `traceAfterCursor`. For example, if `later` contains `streamId: "strm_123"` and `cursor: "opaque_cursor"`, call the tool with:

```json
{
  "teamId": "team_123",
  "projectId": "prj_123",
  "runId": "wrun_123",
  "traceStreamId": "strm_123",
  "traceAfterCursor": "opaque_cursor"
}
```

Continue until `later` is null or absent. To read backwards, use `earlier.streamId` as `traceStreamId` and `earlier.beforeChunk` as `traceBeforeChunk`. Supply exactly one direction with `traceStreamId`.

Pages can overlap. Deduplicate turns by ID and keep the more complete turn. String fields longer than `maxFieldLength` end with a truncation marker. Use `maxFieldLength: 0` to preserve full strings. The MCP server preserves continuation fields even when it truncates other fields.

**Sample prompt:** "Show me the tool calls and messages from Agent Run wrun\_123"


---

[View full sitemap](/docs/sitemap)
