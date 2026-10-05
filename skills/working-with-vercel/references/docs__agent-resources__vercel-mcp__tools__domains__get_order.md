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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "10c32f4f386e7c286272ca5a0e04123d8fa433f8241dbbc938ee3a81ad62c59a"
---

# get_order

Get a domain order.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_order](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_order&source_site=vercel-docs&relationship=related) — Use get_domain_order with Vercel MCP.
- [Get a domain order](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-order?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_order&source_site=vercel-docs&relationship=related) — GET /v1/registrar/orders/{orderId} — Get information about a domain order by its ID
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_order&source_site=vercel-docs&relationship=related) — Use get_team with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_order&source_site=vercel-docs&relationship=related) — Use get_domain_price with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_order&source_site=vercel-docs&relationship=related) — Use get_domain_contact_verification with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_order.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_order.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_order&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| `orderId` | string | Yes      | A valid order ID |
| `teamId`  | string | No       | Team ID.         |


---

[View full sitemap](/docs/sitemap)
