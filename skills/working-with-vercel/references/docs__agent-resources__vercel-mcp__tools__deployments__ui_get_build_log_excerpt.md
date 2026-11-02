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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/ui_get_build_log_excerpt.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "21a7eaf502dbac4b634523c6c3eda22cec8fb7468ccab7d1d987c1199eed8dee"
---

# ui_get_build_log_excerpt

The deployments card uses this app-only tool to read its latest build-log lines. App-capable clients expose it to the card. Use `get_deployment_build_logs` for the standalone workflow when your connection exposes it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_deployment_build_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs) — Use get_deployment_build_logs with Vercel MCP.
- [list_deployment_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events) — Use list_deployment_events with Vercel MCP.
- [Accessing Build Logs](https://vercel.com/docs/deployments/logs) — Learn how to use Vercel's build logs to monitor the progress of building or running your deployment, and check for possi
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [get_runtime_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs) — Use get_runtime_logs with Vercel MCP.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
