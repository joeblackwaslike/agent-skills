---
title: get_bulk_price
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/get_bulk_price
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_price"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_bulk_price with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_price.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "7e35d84f922faa801cc3b4b719d7dea952e90321eb3d3ad4fa53f8f9c4b06c4e"
---

# get_bulk_price

Get price data for multiple domains in a single request.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_bulk_availability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_availability) — Use get_bulk_availability with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [Get price data for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-multiple-domains) — POST /v1/registrar/domains/price — Get price data for multiple domains in a single request.
- [search_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/search_domains) — Use search_domains with Vercel MCP.
- [check_domain_availability_and_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price) — Use check_domain_availability_and_price with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_price.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | Yes      | Request body for this tool.        |

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
