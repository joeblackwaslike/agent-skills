---
title: get_domain_price
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_domain_price
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_domain_price with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "cfba3811d62722a82a9ba87f6ead87d716fd9e1b74fdd4ddb8692c0fd9d216a3"
---

# get_domain_price

Get current domain pricing. For a purchase, use `get_purchase_quote` to obtain the price and confirmation details.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_tld_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_price&source_site=vercel-docs&relationship=related) — Use get_tld_price with Vercel MCP.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_price&source_site=vercel-docs&relationship=related) — Use buy_domain with Vercel MCP.
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_price&source_site=vercel-docs&relationship=related) — Use buy_domains with Vercel MCP.
- [Get price data for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-a-domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_price&source_site=vercel-docs&relationship=related) — GET /v1/registrar/domains/{domain}/price — Get price data for a specific domain
- [get_domain_order](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_price&source_site=vercel-docs&relationship=related) — Use get_domain_order with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains%2Fget_domain_price&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `domain`  | string | Yes      | A valid domain name                                                                                              |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID.                                                                                                         |

**Sample prompt:** "Is example.com available, and what does it cost to register?"


---

[View full sitemap](/docs/sitemap)
