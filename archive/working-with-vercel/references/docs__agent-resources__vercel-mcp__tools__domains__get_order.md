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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_order.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "19789a0122e11829eec522cf41342675fe80e603c0bdfcaa04b56ca8e79e38ec"
---

# get_order

Get a domain order.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_order](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order) — Use get_domain_order with Vercel MCP.
- [Get a domain order](https://vercel.com/docs/rest-api/domains-registrar/get-a-domain-order) — GET /v1/registrar/orders/{orderId} — Get information about a domain order by its ID
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [Billing and Purchases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing) — Vercel MCP tools for billing and purchases.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_order.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_order.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `orderId` | string | Yes      | A valid order ID                   |
| `teamId`  | string | No       | Team ID to use for this operation. |

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
