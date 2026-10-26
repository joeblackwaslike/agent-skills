---
title: get_tld_price
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_tld_price
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_tld_price with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "758a987f51074f81d82aa76225da86a5cb370f0ad4b2e9a5ecd8536913566866"
---

# get_tld_price

Get TLD price data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_tld](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld) — Use get_tld with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [Get TLD price data](https://vercel.com/docs/rest-api/domains-registrar/get-tld-price-data) — GET /v1/registrar/tlds/{tld}/price — Get price data for a specific TLD. This only reflects base prices for the given TLD
- [Get TLD](https://vercel.com/docs/rest-api/domains-registrar/get-tld) — GET /v1/registrar/tlds/{tld} — Get the metadata for a specific TLD.
- [Get price data for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-a-domain) — GET /v1/registrar/domains/{domain}/price — Get price data for a specific domain

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `tld`     | string | Yes      | A valid TLD name                                                                                                 |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID to use for this operation.                                                                               |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
