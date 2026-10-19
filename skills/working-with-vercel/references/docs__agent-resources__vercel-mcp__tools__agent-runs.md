---
title: Agent Runs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/agent-runs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for agent runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "53d3010b58911ea4c52675200b52f2d4f8d545165b475ebe70fe97e3c734d025"
---

# Agent Runs

Inspect runs from agents built with eve in your Vercel projects. You can review run status and usage, then examine traces with messages and tool calls to debug agent behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects)
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [Agent Runs](https://vercel.com/docs/eve/agent-runs) — Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Observability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability) — Vercel MCP tools for observability.
- [eve](https://vercel.com/docs/eve) — Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.
- [List task runs for a job run](https://vercel.com/docs/rest-api/vercel-ci/list-task-runs-for-a-job-run) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/agent-runs.graph.md](/docs/agent-resources/vercel-mcp/tools/agent-runs.graph.md)
<!-- /docsgraph:related -->

## `get_agent_run`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

Get detailed metadata for a single eve Agent Run, including events, workflow metadata, usage, and subagent breakout data. Use `list_agent_runs` first if you need to find a run ID.

| Parameter     | Type   | Required | Default | Description                                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                               |
| `projectId`   | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`.                                                                                                                           |
| `runId`       | string | Yes      | -       | The Agent Run ID to inspect.                                                                                                                                                                                            |
| `environment` | string | No       | -       | Agent run environment, usually "production" or "preview". Defaults to "production".                                                                                                                                     |
| `period`      | string | No       | -       | Preset time range. Ignored when both from and to are provided. Defaults to the dashboard endpoint default. Allowed values: `"5m"`, `"15m"`, `"1h"`, `"6h"`, `"12h"`, `"1d"`, `"3d"`, `"7d"`, `"14d"`, `"30d"`, `"90d"`. |
| `from`        | string | No       | -       | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like "12h". Must be used with to.                                                                                                       |
| `to`          | string | No       | -       | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like "1h", or "now". Must be used with from.                                                                                                 |

**Sample prompt:** "Inspect Agent Run wrun\_123 for my project"

## `get_agent_run_trace`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

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

## `list_agent_run_projects`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

List projects in a Vercel team that have Agent Runs observability data for eve agents. The response includes run counts and average duration rollups for each project.

| Parameter     | Type   | Required | Default | Description                                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                               |
| `environment` | string | No       | -       | Agent run environment, usually "production" or "preview". Defaults to "production".                                                                                                                                     |
| `period`      | string | No       | -       | Preset time range. Ignored when both from and to are provided. Defaults to the dashboard endpoint default. Allowed values: `"5m"`, `"15m"`, `"1h"`, `"6h"`, `"12h"`, `"1d"`, `"3d"`, `"7d"`, `"14d"`, `"30d"`, `"90d"`. |
| `from`        | string | No       | -       | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like "12h". Must be used with to.                                                                                                       |
| `to`          | string | No       | -       | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like "1h", or "now". Must be used with from.                                                                                                 |

**Sample prompt:** "Which projects in my team have Agent Runs in the last 24 hours?"

## `list_agent_runs`

Use this tool with agents built with [eve](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs).

List Agent Runs for a Vercel project. The response includes summaries, status, model, trigger, token usage, time series, and pagination metadata for eve agent activity.

| Parameter     | Type   | Required | Default | Description                                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                               |
| `projectId`   | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`.                                                                                                                           |
| `environment` | string | No       | -       | Agent run environment, usually "production" or "preview". Defaults to "production".                                                                                                                                     |
| `period`      | string | No       | -       | Preset time range. Ignored when both from and to are provided. Defaults to the dashboard endpoint default. Allowed values: `"5m"`, `"15m"`, `"1h"`, `"6h"`, `"12h"`, `"1d"`, `"3d"`, `"7d"`, `"14d"`, `"30d"`, `"90d"`. |
| `from`        | string | No       | -       | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like "12h". Must be used with to.                                                                                                       |
| `to`          | string | No       | -       | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like "1h", or "now". Must be used with from.                                                                                                 |
| `page`        | number | No       | -       | 1-based page number. Defaults to 1.                                                                                                                                                                                     |
| `pageSize`    | number | No       | -       | Number of runs per page. The dashboard endpoint caps this at 100.                                                                                                                                                       |
| `search`      | string | No       | -       | Server-side title search for Agent Runs.                                                                                                                                                                                |

**Sample prompt:** "Show me the latest production Agent Runs for my project"


---

[View full sitemap](/docs/sitemap)
