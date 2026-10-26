---
title: approve_rolling_release_stage
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use approve_rolling_release_stage with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "8836511ce2d08becf13b73d8800f95138652f4c860a281baa5691d1ec8f42668"
---

# approve_rolling_release_stage

Update the active rolling release to the next stage for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [complete_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/complete_rolling_release) — Use complete_rolling_release with Vercel MCP.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release) — Use start_rolling_release with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config) — Use update_rolling_release_config with Vercel MCP.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config) — Use get_rolling_release_config with Vercel MCP.
- [stage_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects) — Use stage_redirects with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
