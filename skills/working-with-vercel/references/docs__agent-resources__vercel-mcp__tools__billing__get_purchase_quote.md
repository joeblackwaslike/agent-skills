---
title: get_purchase_quote
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/agent-resources/vercel-mcp/tools/billing/buy_domain
  - /docs/agent-resources/vercel-mcp/tools/billing/get_domain_order
summary: Use get_purchase_quote with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ab7c228671f9f182fad83517e42de7e1041e12888ffa62f314419e2141ab7ab9"
---

# get_purchase_quote

Get a read-only domain registration quote for the selected team. Checks availability and pricing and returns disclosures and a signed quote token valid for five minutes. Present the price, taxes and fees, payment method, registration and auto-renew terms for explicit user approval before calling buy\_domain. Does not register, reserve, or charge for a domain. Digital subscriptions, credits, and add-ons cannot be quoted or purchased through this tool.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains) — Use buy_domains with Vercel MCP.
- [buy_single_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_single_domain) — Use buy_single_domain with Vercel MCP.
- [get_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain) — Use get_domain with Vercel MCP.
- [get_bulk_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_bulk_price) — Use get_bulk_price with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type    | Required | Default | Description                                                                              |
| ----------- | ------- | -------- | ------- | ---------------------------------------------------------------------------------------- |
| `product`   | string  | Yes      | -       | Only domain registration quotes are available. Value: `"domain"`.                        |
| `teamId`    | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                |
| `domain`    | string  | Yes      | -       | The domain to register, e.g. "example.com".                                              |
| `years`     | integer | No       | -       | Registration term in years. Defaults to the TLD minimum. Maximum: 10.                    |
| `autoRenew` | boolean | No       | -       | Whether to auto-renew at term end. Defaults to true. Not part of the signed quote token. |

## How purchases work

1. Call this tool with `product: "domain"`, the team, domain, and registration term. It returns a read-only quote and a signed `idempotencyKey`.
2. Review the price, taxes and fees, payment method, registration terms, and auto-renew setting. Explicitly approve the purchase.
3. Call [`buy_domain`](/docs/agent-resources/vercel-mcp/tools/billing/buy_domain) with `confirm: true`, the quoted terms, contact details, and the quote token. An expired or mismatched quote requires a new quote.
4. Use [`get_domain_order`](/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order) to check registration status. An accepted order does not mean registration has finished.

This workflow quotes and purchases domains only. MCP does not quote or purchase credits, subscriptions, or add-ons.


---

[View full sitemap](/docs/sitemap)
