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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "6b895af88ba0870a3c13d45a733d7439f2823e25c9196823ae49b8d9b9755e3c"
---

# get_runtime_logs

Get runtime logs for a project or deployment. Runtime logs include application output such as console.log messages, errors, and other execution details from [Vercel Functions](/docs/functions) during requests. You can filter logs by environment, log level, source, time range, and full-text search. Use `group_by` to return counts instead of individual lines. For production errors, start with `get_runtime_errors`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_runtime_errors](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors) — Use get_runtime_errors with Vercel MCP.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [Runtime Logs](https://vercel.com/docs/logs/runtime) — Learn how to search, inspect, and share your runtime logs with the Logs tab.
- [Get logs for a deployment](https://vercel.com/docs/rest-api/logs/get-logs-for-a-deployment) — GET /v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs — Returns a stream of logs for a given deployment.
- [list_agent_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs) — Use list_agent_runs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs.graph.md)
<!-- /docsgraph:related -->

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
