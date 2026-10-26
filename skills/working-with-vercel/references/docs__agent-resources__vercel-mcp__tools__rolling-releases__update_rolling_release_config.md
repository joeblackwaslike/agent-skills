---
title: update_rolling_release_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_rolling_release_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ef2a543ba58586817fecf314c99f4a1a2b1bbbb53c29cd53f1d75a28e1b1a31b"
---

# update_rolling_release_config

Update the rolling release settings for the project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config) — Use get_rolling_release_config with Vercel MCP.
- [complete_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/complete_rolling_release) — Use complete_rolling_release with Vercel MCP.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release) — Use start_rolling_release with Vercel MCP.
- [approve_rolling_release_stage](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage) — Use approve_rolling_release_stage with Vercel MCP.
- [Update the rolling release settings for the project](https://vercel.com/docs/rest-api/rolling-release/update-the-rolling-release-settings-for-the-project) — PATCH /v1/projects/{idOrName}/rolling-release/config — Update \\(or disable\\) Rolling Releases for a project. When disabl

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string  | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
