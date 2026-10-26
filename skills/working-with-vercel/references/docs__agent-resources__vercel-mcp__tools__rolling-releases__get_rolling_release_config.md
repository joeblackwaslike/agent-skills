---
title: get_rolling_release_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_rolling_release_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c55d5f0c9d594684bbe5964dd8368f3350f2514a8dda18b99e5733ecaf9880a7"
---

# get_rolling_release_config

Get rolling release configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status) — Use get_rolling_release_billing_status with Vercel MCP.
- [get_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release) — Use get_rolling_release with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config) — Use update_rolling_release_config with Vercel MCP.
- [complete_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/complete_rolling_release) — Use complete_rolling_release with Vercel MCP.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release) — Use start_rolling_release with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded)                    |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
