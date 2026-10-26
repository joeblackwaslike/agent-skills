---
title: test_drain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drains/test_drain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/test_drain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/drains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use test_drain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/test_drain.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "7cd6328cedb3d3ae74d63451125b40d99b3a4eaba1c58de7f4ee44158e369896"
---

# test_drain

Validate Drain delivery configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/create_drain) — Use create_drain with Vercel MCP.
- [update_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/update_drain) — Use update_drain with Vercel MCP.
- [get_drain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/get_drain) — Use get_drain with Vercel MCP.
- [list_drains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains/list_drains) — Use list_drains with Vercel MCP.
- [Validate Drain delivery configuration](https://vercel.com/docs/rest-api/drains/validate-drain-delivery-configuration) — POST /v1/drains/test — Validate the delivery configuration of a Drain using sample events.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drains/test_drain.graph.md](/docs/agent-resources/vercel-mcp/tools/drains/test_drain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
