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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5200f9dff858bfef773252e8793e4b06242ab7e507d4cd4e7c8c29531d9739c1"
---

# get_domain_order

Get the status of a domain purchase order returned by `buy_domain`, to confirm whether the asynchronous registration completed. It is read-only action.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_order](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_order?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_domain_order&source_site=vercel-docs&relationship=related) — Use get_order with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_domain_order&source_site=vercel-docs&relationship=related) — Use get_domain_price with Vercel MCP.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_domain_order&source_site=vercel-docs&relationship=related) — Use buy_domain with Vercel MCP.
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_domain_order&source_site=vercel-docs&relationship=related) — Use buy_domains with Vercel MCP.
- [Get a domain order](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-order?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_domain_order&source_site=vercel-docs&relationship=related) — GET /v1/registrar/orders/{orderId} — Get information about a domain order by its ID

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_domain_order&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                                        |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------- |
| `orderId` | string | Yes      | -       | The `orderId` returned by `buy_domain`                                             |
| `teamId`  | string | No       | -       | The team ID the domain was purchased for. Alternatively the team slug can be used. |

**Sample prompt:** "Did my domain purchase go through?"


---

[View full sitemap](/docs/sitemap)
