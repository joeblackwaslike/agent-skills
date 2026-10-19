---
title: get_order
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_order
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_order"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_order with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_order.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "1c9eee25bef4b7b0e9e4409fc91e1d544ba4410381766fe02f5477ca94bab694"
---

# get_order

Get a domain order.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_order](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order) — Use get_domain_order with Vercel MCP.
- [Get a domain order](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-order) — GET /v1/registrar/orders/{orderId} — Get information about a domain order by its ID
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_order.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_order.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `orderId` | string | Yes      | A valid order ID                   |
| `teamId`  | string | No       | Team ID to use for this operation. |


---

[View full sitemap](/docs/sitemap)
