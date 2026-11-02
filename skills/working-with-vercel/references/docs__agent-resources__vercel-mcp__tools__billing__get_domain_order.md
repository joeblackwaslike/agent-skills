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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "dd1aa6745a1d28fd8487647b92168235441df8f3d7ebe0185ddbff3b33d781c8"
---

# get_domain_order

Get the status of a domain purchase order returned by `buy_domain`, to confirm whether the asynchronous registration completed. It is read-only action.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_order](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_order) — Use get_order with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain) — Use buy_domain with Vercel MCP.
- [Get a domain order](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-order) — GET /v1/registrar/orders/{orderId} — Get information about a domain order by its ID

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `orderId` | string | Yes      | -       | The orderId returned by buy\_domain.                       |
| `teamId`  | string | No       | -       | The team ID or slug. Use the team that owns the resource. |

**Sample prompt:** "Did my domain purchase go through?"


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
