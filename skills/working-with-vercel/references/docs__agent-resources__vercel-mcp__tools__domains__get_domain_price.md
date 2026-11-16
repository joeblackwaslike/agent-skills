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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d25ea5d6f28458107c7754615dcfd4e1f9ab9c8eba3160157af33149d477dce8"
---

# get_domain_price

Get current domain pricing. For a purchase, use `get_purchase_quote` to obtain the price and confirmation details.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [check_domain_availability_and_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price) — Use check_domain_availability_and_price with Vercel MCP.
- [get_tld_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price) — Use get_tld_price with Vercel MCP.
- [get_purchase_quote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) — Use get_purchase_quote with Vercel MCP.
- [Get price data for a domain](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-a-domain) — GET /v1/registrar/domains/{domain}/price — Get price data for a specific domain
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain) — Use buy_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `domain`  | string | Yes      | A valid domain name                                                                                              |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID to use for this operation.                                                                               |

**Sample prompt:** "Is example.com available, and what does it cost to register?"

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
