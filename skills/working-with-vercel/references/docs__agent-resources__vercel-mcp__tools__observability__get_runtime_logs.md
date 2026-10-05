---
title: get_runtime_logs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/observability
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/functions
summary: Use get_runtime_logs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d3c449edf32044a1c95a76c05b5c6925d10f2fc3145a3cb234edb7c394415131"
---

# get_runtime_logs

Get runtime logs for a project or deployment. Runtime logs include application output such as console.log messages, errors, and other execution details from [Vercel Functions](/docs/functions) during requests. You can filter logs by environment, log level, status code, source, time range, and full-text search. Use `group_by` to return counts instead of individual lines. For production errors, start with `get_runtime_errors`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_runtime_errors](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_runtime_logs&source_site=vercel-docs&relationship=related) — Use get_runtime_errors with Vercel MCP.
- [Runtime Logs](https://vercel.com/docs/logs/runtime?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_runtime_logs&source_site=vercel-docs&relationship=related) — Learn how to search, inspect, and share your runtime logs with the Logs tab.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_runtime_logs&source_site=vercel-docs&relationship=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [Get logs for a deployment](https://vercel.com/docs/rest-api/logs/get-logs-for-a-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_runtime_logs&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs — Returns a stream of logs for a given deployment.
- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_runtime_logs&source_site=vercel-docs&relationship=related) — Use list_agent_runs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fobservability%2Fget_runtime_logs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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
