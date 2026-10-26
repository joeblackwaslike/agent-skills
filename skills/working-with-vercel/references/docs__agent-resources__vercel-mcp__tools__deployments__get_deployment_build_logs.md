---
title: get_deployment_build_logs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_deployment_build_logs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f9d70f484f4d2970ba0b20f9b300be2dcde70b8b867d905425ce5d3fb47451f2"
---

# get_deployment_build_logs

Get the build logs for a deployment by ID or URL, to investigate why a build failed. Returns the most recent lines by default (where build errors appear). Use errorsOnly to see just the failing lines. Omit since and until for latest logs. Use since to narrow the window, and omit until when the end should be the current time.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_deployment_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events) — Use list_deployment_events with Vercel MCP.
- [ui_get_build_log_excerpt](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/ui_get_build_log_excerpt) — Use ui_get_build_log_excerpt with Vercel MCP.
- [Accessing Build Logs](https://vercel.com/docs/deployments/logs) — Learn how to use Vercel's build logs to monitor the progress of building or running your deployment, and check for possi
- [get_runtime_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs) — Use get_runtime_logs with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type    | Required | Default  | Description                                                                                                                                                                             |
| ------------ | ------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`    | string  | Yes      | -        | The unique identifier or hostname of the deployment.                                                                                                                                    |
| `direction`  | string  | No       | `"tail"` | Which end of the build log to return. "tail" (default) returns the most recent lines, where build errors appear. "head" returns the earliest lines. Allowed values: `"tail"`, `"head"`. |
| `errorsOnly` | boolean | No       | `false`  | Return only error, stderr, exit, and fatal events.                                                                                                                                      |
| `limit`      | number  | No       | `100`    | Maximum number of log lines to return.                                                                                                                                                  |
| `since`      | string  | No       | -        | Start of the window as an ISO date or relative lookback from now (e.g. "1h", "30m").                                                                                                    |
| `until`      | string  | No       | -        | Optional end of the window as an ISO date, relative lookback, or "now". Omit this when the end should be the current time.                                                              |
| `buildId`    | string  | No       | -        | Filter to a specific build ID (bld\_...) for multi-build deployments.                                                                                                                   |
| `teamId`     | string  | Yes      | -        | The team ID or slug. Use the team that owns the resource.                                                                                                                               |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
