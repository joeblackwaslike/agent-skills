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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "2d7c486ba3ce2ad18dec30cb858f98573ec375d005d0121d94a6a62c323723f3"
---

# get_domain_price

Get current domain pricing. For a purchase, use `get_purchase_quote` to obtain the price and confirmation details.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_purchase_quote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) — Use get_purchase_quote with Vercel MCP.
- [get_tld_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld_price) — Use get_tld_price with Vercel MCP.
- [check_domain_availability_and_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/check_domain_availability_and_price) — Use check_domain_availability_and_price with Vercel MCP.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain) — Use buy_domain with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `domain`  | string | Yes      | A valid domain name                                                                                              |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID to use for this operation.                                                                               |

**Sample prompt:** "Is example.com available, and what does it cost to register?"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
