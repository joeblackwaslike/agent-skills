---
title: update_network
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/update_network
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_network"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_network with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_network.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d4915b376d38ad9176cc3c8c2e67ebfd9fae08ff43cef181171b904481076b43"
---

# update_network

Update a Secure Compute network.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [read_network](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/read_network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fupdate_network&source_site=vercel-docs&relationship=related) — Use read_network with Vercel MCP.
- [update_session_network_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fupdate_network&source_site=vercel-docs&relationship=related) — Use update_session_network_policy with Vercel MCP.
- [Update a Secure Compute network](https://vercel.com/docs/rest-api/networking/update-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fupdate_network&source_site=vercel-docs&relationship=related) — PATCH /v1/connect/networks/{networkId} — Allows to update a Secure Compute network.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fupdate_network&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.
- [update_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fupdate_network&source_site=vercel-docs&relationship=related) — Use update_firewall_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/update_network.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/update_network.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fupdate_network&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                         |
| ------------- | ------ | -------- | --------------------------------------------------- |
| `networkId`   | string | Yes      | The unique identifier of the Secure Compute network |
| `teamId`      | string | No       | Team ID.                                            |
| `slug`        | string | No       | Team slug.                                          |
| `requestBody` | object | No       | Request body for this tool.                         |


---

[View full sitemap](/docs/sitemap)
