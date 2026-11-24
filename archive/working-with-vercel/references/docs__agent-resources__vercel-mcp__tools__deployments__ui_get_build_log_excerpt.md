---
title: ui_get_build_log_excerpt
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/ui_get_build_log_excerpt
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/ui_get_build_log_excerpt"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use ui_get_build_log_excerpt with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/ui_get_build_log_excerpt.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "93a2c66c368e5db045a403481160b16d84b98a17ddb6a5778952688fbb8df1c8"
---

# ui_get_build_log_excerpt

The deployments card uses this app-only tool to read its latest build-log lines. App-capable clients expose it to the card. Use `get_deployment_build_logs` for the standalone workflow when your connection exposes it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_deployment_build_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs) — Use get_deployment_build_logs with Vercel MCP.
- [list_deployment_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events) — Use list_deployment_events with Vercel MCP.
- [Accessing Build Logs](https://vercel.com/docs/deployments/logs) — Learn how to use Vercel's build logs to monitor the progress of building or running your deployment, and check for possi
- [open_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments) — Use open_deployments with Vercel MCP.
- [Get logs for a deployment](https://vercel.com/docs/rest-api/logs/get-logs-for-a-deployment) — GET /v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs — Returns a stream of logs for a given deployment.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/ui_get_build_log_excerpt.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/ui_get_build_log_excerpt.graph.md)
<!-- /docsgraph:related -->

This tool appears with the deployments card. Its response includes log entries and `latestAt`. Pass the previous `latestAt` as `since` to fetch newer events. Build logs are separate from runtime logs.

## Parameters

| Parameter | Type    | Required | Description                                                                                                                 |
| --------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `teamId`  | string  | Yes      | The team ID or slug. Use the team that owns the resource.                                                                   |
| `idOrUrl` | string  | Yes      | The unique identifier or hostname of the deployment.                                                                        |
| `limit`   | integer | No       | How many of the most recent log lines to return. Defaults to 120. Minimum: 1. Maximum: 1000.                                |
| `since`   | number  | No       | Only events after this timestamp (ms), oldest first, so a live view can fetch just what is new. Pass the previous latestAt. |

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
