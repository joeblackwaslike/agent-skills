---
title: Observability
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/observability
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/functions
summary: Vercel MCP tools for observability.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "21f6a373a5d6b97c52aa26c1057f59f83be0fde18f8937fcd0039a7abd7aa575"
---

# Observability

Investigate errors and request behavior in your projects with runtime logs and traces. You can query observability data and inspect its schema to build queries for a specific issue.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Agent Runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs) — Vercel MCP tools for agent runs.
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Runtime Logs](https://vercel.com/docs/logs/runtime) — Learn how to search, inspect, and share your runtime logs with the Logs tab.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability.graph.md](/docs/agent-resources/vercel-mcp/tools/observability.graph.md)
<!-- /docsgraph:related -->

## `create_observability_query`

Query observability data.

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | Yes      | Request body for this tool.        |

## `create_trace_session`

Mints a short-lived HS256 JWT scoped to a deployment hostname. The Vercel CLI presents this JWT to the Vercel proxy on requests it wants traced.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `get_observability_configuration_projects`

Lists the projects that are currently configured as disabled for Observability Plus on a team.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_observability_schema`

Get the observability query schema.

## Parameters

This tool takes no parameters.

## `get_project_trace`

Get a project trace by request ID.

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | Yes      | The project ID                                              |
| `requestId` | string | Yes      | The Vercel CLI request ID associated with the trace         |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_runtime_errors`

Get grouped runtime error clusters for a project. Each cluster includes the error name, occurrence count, affected routes, sample messages, and when the error was first and last seen. Use this tool to investigate production errors before querying individual entries with `get_runtime_logs`. Time ranges can span up to 7 days.

| Parameter   | Type   | Required | Default | Description                                                                                                                         |
| ----------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to get runtime errors for.                                                                                           |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                           |
| `since`     | string | No       | -       | Start of the window as an ISO date or relative lookback from now (e.g. "1h", "24h", "7d"). Defaults to 24h ago. Max lookback is 7d. |
| `until`     | string | No       | -       | Optional end of the window as an ISO date, relative lookback, or "now". Omit this when the end should be the current time.          |
| `routes`    | string | No       | -       | Comma-separated route paths to filter by (e.g. "/api/checkout").                                                                    |

**Sample prompt:** "Why is my production app throwing errors?"

## `get_runtime_logs`

Get runtime logs for a project or deployment. Runtime logs include application output such as console.log messages, errors, and other execution details from [Vercel Functions](/docs/functions) during requests. You can filter logs by environment, log level, source, time range, and full-text search. Use `group_by` to return counts instead of individual lines. For production errors, start with `get_runtime_errors`.

| Parameter      | Type             | Required | Default | Description                                                                                                                                                                                                                                                 |
| -------------- | ---------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`    | string           | Yes      | -       | The project ID to get runtime logs for.                                                                                                                                                                                                                     |
| `teamId`       | string           | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                                                   |
| `deploymentId` | string           | No       | -       | Filter logs to a specific deployment ID or URL.                                                                                                                                                                                                             |
| `environment`  | string           | No       | -       | Filter by environment: "production" or "preview". Allowed values: `"production"`, `"preview"`.                                                                                                                                                              |
| `level`        | Array\<string> | No       | -       | Filter by log level(s). Can specify multiple levels. Allowed values: `"error"`, `"warning"`, `"info"`, `"fatal"`.                                                                                                                                           |
| `source`       | Array\<string> | No       | -       | Filter by raw log source(s): function or daemon. Allowed values: `"function"`, `"daemon"`.                                                                                                                                                                  |
| `since`        | string           | No       | -       | Start of the window as an ISO date or relative lookback from now (e.g., "1h", "30m", "7d"). Defaults to the 50 minutes before until (or now), within Hobby's retention window.                                                                              |
| `until`        | string           | No       | -       | Optional end of the window as an ISO date, relative lookback, or "now". Omit this when the end should be the current time.                                                                                                                                  |
| `limit`        | integer          | No       | -       | Maximum number of log entries to return. Defaults to 50, max 100.                                                                                                                                                                                           |
| `query`        | string           | No       | -       | Full-text search query to filter logs.                                                                                                                                                                                                                      |
| `requestId`    | string           | No       | -       | Filter by specific request ID.                                                                                                                                                                                                                              |
| `group_by`     | string           | No       | -       | Return counts grouped by this attribute instead of individual log lines. Use for "how many errors", "source breakdown", "top paths". Fast even over wide time ranges. Allowed values: `"requestPath"`, `"level"`, `"source"`, `"deploymentId"`, `"branch"`. |

**Sample prompt:** "Show me the runtime error logs for my project from the last hour"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
