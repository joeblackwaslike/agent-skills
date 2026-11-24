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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "54cb29b4573546d460034f183a1d3d87c7bb259295ffa1e7204f7a5e222c6e23"
---

# get_purchase_quote

Get a read-only domain registration quote for the selected team. Checks availability and pricing and returns disclosures and a signed quote token valid for five minutes. Present the price, taxes and fees, payment method, registration and auto-renew terms for explicit user approval before calling buy\_domain. Does not register, reserve, or charge for a domain. Digital subscriptions, credits, and add-ons cannot be quoted or purchased through this tool.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains) — Use buy_domains with Vercel MCP.
- [buy_single_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_single_domain) — Use buy_single_domain with Vercel MCP.
- [Domains and DNS](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains) — Vercel MCP tools for domains and dns.
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

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
