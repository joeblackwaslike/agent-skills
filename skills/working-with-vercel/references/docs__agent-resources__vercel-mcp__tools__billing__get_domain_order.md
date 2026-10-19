---
title: get_domain_order
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/get_domain_order
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domain_order with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "491ab5151d0fa58445f163df1fc0180c5c4fca8358c05418bc2a305244c03f46"
---

# get_domain_order

Get the status of a domain purchase order returned by `buy_domain`, to confirm whether the asynchronous registration completed. It is read-only action.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_order](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_order) — Use get_order with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [get_purchase_quote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) — Use get_purchase_quote with Vercel MCP.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain) — Use buy_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `orderId` | string | Yes      | -       | The orderId returned by buy\_domain.                       |
| `teamId`  | string | No       | -       | The team ID or slug. Use the team that owns the resource. |

**Sample prompt:** "Did my domain purchase go through?"


---

[View full sitemap](/docs/sitemap)
