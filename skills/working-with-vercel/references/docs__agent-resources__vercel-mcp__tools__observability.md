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
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "4d469494d2caf65f96bec3f21f3184fdb94764c8e7bc031041f358a2c5067168"
---

# Observability

Investigate errors and request behavior in your projects with runtime logs and traces. You can query observability data and inspect its schema to build queries for a specific issue.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Observability](https://vercel.com/docs/observability?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability&source_site=vercel-docs&relationship=related) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Runtime Logs](https://vercel.com/docs/logs/runtime?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to search, inspect, and share your runtime logs with the Logs tab.
- [Agent Runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability&source_site=vercel-docs&relationship=related) — Vercel MCP tools for agent runs.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability&source_site=vercel-docs&relationship=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [Observability Insights](https://vercel.com/docs/observability/insights?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability&source_site=vercel-docs&relationship=related) — List of available data sources that you can view and monitor with Observability on Vercel.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability.graph.md](/docs/agent-resources/vercel-mcp/tools/observability.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_observability_query`

Query observability data.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `requestBody` | object | Yes      | Request body for this tool. |
| `teamId`      | string | No       | Team ID.                    |

## `get_observability_schema`

Get the observability query schema.

## Parameters

This tool takes no parameters.

## `get_project_trace`

Get a project trace by request ID.

## Parameters

| Parameter   | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `projectId` | string | Yes      | The project ID                                      |
| `requestId` | string | Yes      | The Vercel CLI request ID associated with the trace |
| `teamId`    | string | No       | Team ID.                                            |
| `slug`      | string | No       | Team slug.                                          |

## `get_runtime_errors`

Get grouped runtime error clusters for a project. Each cluster includes the error name, occurrence count, affected routes, sample messages, and when the error was first and last seen. Use this tool to investigate production errors before querying individual entries with `get_runtime_logs`. Time ranges can span up to 7 days.

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                                          |
| ----------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to get runtime errors for                                                                                                                                                             |
| `teamId`    | string | Yes      | -       | The team ID to get runtime errors for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `since`     | string | No       | 24h ago | Start of the window as an ISO date or relative lookback from now (e.g., `1h`, `24h`, or `7d`). The maximum lookback is 7 days                                                                        |
| `until`     | string | No       | now     | End of the window as an ISO date, relative lookback, or `now`. Omit this when the end should be the current time                                                                                     |
| `routes`    | string | No       | -       | Comma-separated route paths to filter by (e.g., `/api/checkout`)                                                                                                                                     |

**Sample prompt:** "Why is my production app throwing errors?"

## `get_runtime_logs`

Get runtime logs for a project or deployment. Runtime logs include application output such as console.log messages, errors, and other execution details from [Vercel Functions](/docs/functions) during requests. You can filter logs by environment, log level, status code, source, time range, and full-text search. Use `group_by` to return counts instead of individual lines. For production errors, start with `get_runtime_errors`.

| Parameter      | Type   | Required | Default | Description                                                                                                                                                                                        |
| -------------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`    | string | Yes      | -       | The project ID to get runtime logs for                                                                                                                                                             |
| `teamId`       | string | Yes      | -       | The team ID to get runtime logs for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `deploymentId` | string | No       | -       | Filter logs to a specific deployment ID or URL                                                                                                                                                     |
| `environment`  | string | No       | -       | Filter by environment: `production` or `preview`                                                                                                                                                   |
| `level`        | array  | No       | -       | Filter by log level(s). Can specify multiple levels: `error`, `warning`, `info`, `fatal`                                                                                                           |
| `statusCode`   | string | No       | -       | Filter by HTTP status code (e.g., "500", "4xx")                                                                                                                                                    |
| `source`       | array  | No       | -       | Filter by source type(s). Can specify multiple sources: `serverless`, `edge-function`, `edge-middleware`, `static`                                                                                 |
| `since`        | string | No       | 24h ago | Start of the window as an ISO date or relative lookback from now (e.g., `1h`, `30m`, or `7d`)                                                                                                      |
| `until`        | string | No       | now     | End of the window as an ISO date, relative lookback, or `now`. Omit this when the end should be the current time                                                                                   |
| `limit`        | number | No       | 50      | Maximum number of log entries to return (max 1000)                                                                                                                                                 |
| `query`        | string | No       | -       | Full-text search query to filter logs                                                                                                                                                              |
| `requestId`    | string | No       | -       | Filter by specific request ID                                                                                                                                                                      |
| `group_by`     | string | No       | -       | Return counts grouped by `statusCode`, `requestPath`, `route`, `level`, `source`, `deploymentId`, or `branch` instead of individual log lines                                                      |

**Sample prompt:** "Show me the runtime error logs for my project from the last hour"


---

[View full sitemap](/docs/sitemap)
