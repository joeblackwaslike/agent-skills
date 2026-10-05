---
title: buy_domain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/buy_domain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/domains
  - /docs/agent-resources/vercel-mcp/tools/billing/get_domain_order
summary: Use buy_domain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "ce872650f4dfc47b09a37ea164e312b0ed24cb21a50d9dccff456651c5432186"
---

# buy_domain

Register (purchase) a single [domain](/docs/domains) for a team. The quote (`get_purchase_quote` with `product: domain`) checks availability and returns the live `purchasePrice` for the requested term. The **confirm** step must echo that price back as `expectedPrice`, and the order is rejected if the live price no longer matches, so you are never charged more than the amount you saw quoted.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_domain&source_site=vercel-docs&relationship=related) — Use buy_domains with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_domain&source_site=vercel-docs&relationship=related) — Use get_domain_price with Vercel MCP.
- [buy_single_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_single_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_domain&source_site=vercel-docs&relationship=related) — Use buy_single_domain with Vercel MCP.
- [get_purchase_quote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_domain&source_site=vercel-docs&relationship=related) — Use get_purchase_quote with Vercel MCP.
- [Domains and DNS](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_domain&source_site=vercel-docs&relationship=related) — Vercel MCP tools for domains and dns.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/buy_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/buy_domain.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_domain&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Pass the registration term (`years`) from the quote and the full registrant (`contact`) details when confirming the purchase.

Domain registration completes asynchronously: a successful **confirm** step returns an `orderId` that you can use with [`get_domain_order`](/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order) to check whether the registration completed.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                                     |
| ---------------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain`         | string  | Yes      | -       | The domain to register (e.g., example.com)                                                                                                                                                      |
| `years`          | number  | Yes      | -       | Registration term in years (max 10). Must match the term shown in the quote                                                                                                                     |
| `autoRenew`      | boolean | No       | true    | Whether to auto-renew at the end of the term                                                                                                                                                    |
| `expectedPrice`  | number  | Yes      | -       | The `purchasePrice` (USD) from the quote. The order is rejected if it no longer matches the live price                                                                                          |
| `contact`        | object  | Yes      | -       | Registrant (WHOIS) contact: see the fields below                                                                                                                                                |
| `teamId`         | string  | Yes      | -       | The team ID to register the domain for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the purchase                                                                                                                                                              |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                           |

The `contact` object requires the following fields with an optional `companyName`:

| Field         | Type   | Description                                           |
| ------------- | ------ | ----------------------------------------------------- |
| `firstName`   | string | The first name of the domain registrant               |
| `lastName`    | string | The last name of the domain registrant                |
| `email`       | string | The email address of the domain registrant            |
| `phone`       | string | The phone number in E.164 format (e.g., +14155550123) |
| `address1`    | string | The street address of the domain registrant           |
| `city`        | string | The city of the domain registrant                     |
| `state`       | string | The state/province of the domain registrant           |
| `zip`         | string | The postal code of the domain registrant              |
| `country`     | string | Two-letter ISO country code (e.g., US)                |
| `companyName` | string | The company name of the domain registrant (optional)  |

**Sample prompt:** "Buy the domain mydomain.com"


---

[View full sitemap](/docs/sitemap)
