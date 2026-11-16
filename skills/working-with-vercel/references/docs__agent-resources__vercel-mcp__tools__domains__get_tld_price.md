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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a18c41c9c39a0b1656bc74425b01f1848e337d9213be980607f3a666ddf6a86c"
---

# get_tld_price

Get TLD price data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_tld](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld) — Use get_tld with Vercel MCP.
- [Get TLD price data](https://vercel.com/docs/rest-api/domains-registrar/get-tld-price-data) — GET /v1/registrar/tlds/{tld}/price — Get price data for a specific TLD. This only reflects base prices for the given TLD
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [Get TLD](https://vercel.com/docs/rest-api/domains-registrar/get-tld) — GET /v1/registrar/tlds/{tld} — Get the metadata for a specific TLD.
- [check_domain_availability_and_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price) — Use check_domain_availability_and_price with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `tld`     | string | Yes      | A valid TLD name                                                                                                 |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID to use for this operation.                                                                               |

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
