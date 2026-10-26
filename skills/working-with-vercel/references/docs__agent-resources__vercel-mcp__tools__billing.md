---
title: Billing and Purchases
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/domains
  - /docs/agent-resources/vercel-mcp/tools/billing/get_domain_order
  - /docs/agent-resources/vercel-mcp/tools/billing/buy_domain
summary: Vercel MCP tools for billing and purchases.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e7edc5a8fab324fe8321ff5f4dc73c46e3ab4de088d10029e08bf48e859ebd81"
---

# Billing and Purchases

Review your team's billing charges and contract commitments. Get a domain registration quote, review its terms, and explicitly approve it before confirming the purchase. MCP does not purchase credits, subscriptions, or add-ons.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Domains and DNS](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains) — Vercel MCP tools for domains and dns.
- [buy_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/buy_domains) — Use buy_domains with Vercel MCP.
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price) — Use get_domain_price with Vercel MCP.
- [Purchase credits](https://vercel.com/docs/rest-api/billing/purchase-credits) — POST /v1/billing/buy — Purchases credits for a Vercel team using the default payment method on file. The purchase is cha

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing.graph.md](/docs/agent-resources/vercel-mcp/tools/billing.graph.md)
<!-- /docsgraph:related -->

## `buy_domain`

Register (purchase) a single [domain](/docs/domains) for a team. The quote (`get_purchase_quote` with `product: domain`) checks availability and returns the live `purchasePrice` for the requested term. The **confirm** step must echo that price back as `expectedPrice`, and the order is rejected if the live price no longer matches, so you are never charged more than the amount you saw quoted.

Pass the registration term (`years`) from the quote and the full registrant (`contact`) details when confirming the purchase.

Domain registration completes asynchronously: a successful **confirm** step returns an `orderId` that you can use with [`get_domain_order`](/docs/agent-resources/vercel-mcp/tools/billing/get_domain_order) to check whether the registration completed.

| Parameter        | Type    | Required | Default | Description                                                                                                                       |
| ---------------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `domain`         | string  | Yes      | -       | The domain to register, e.g. "example.com".                                                                                       |
| `years`          | integer | No       | -       | Registration term in years. Required on confirm. must match the term shown in the quote. Maximum: 10.                             |
| `autoRenew`      | boolean | No       | -       | Whether to auto-renew at the end of the term. Defaults to true.                                                                   |
| `expectedPrice`  | number  | No       | -       | Required on confirm: the purchasePrice (USD) from the quote. The server rejects the order if it no longer matches the live price. |
| `contact`        | object  | No       | -       | Registrant (WHOIS) contact. Not needed for the quote. REQUIRED on confirm. All fields must be provided.                           |
| `teamId`         | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                         |
| `confirm`        | boolean | No       | -       | Set true to execute the purchase. Requires the idempotencyKey from get\_purchase\_quote.                                            |
| `idempotencyKey` | string  | No       | -       | The idempotencyKey returned by get\_purchase\_quote.                                                                                |

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

## `get_domain_order`

Get the status of a domain purchase order returned by `buy_domain`, to confirm whether the asynchronous registration completed. It is read-only action.

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `orderId` | string | Yes      | -       | The orderId returned by buy\_domain.                       |
| `teamId`  | string | No       | -       | The team ID or slug. Use the team that owns the resource. |

**Sample prompt:** "Did my domain purchase go through?"

## `get_purchase_quote`

Get a read-only domain registration quote for the selected team. Checks availability and pricing and returns disclosures and a signed quote token valid for five minutes. Present the price, taxes and fees, payment method, registration and auto-renew terms for explicit user approval before calling buy\_domain. Does not register, reserve, or charge for a domain. Digital subscriptions, credits, and add-ons cannot be quoted or purchased through this tool.

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

## `list_billing_charges`

List FOCUS billing charges.

## Parameters

| Parameter | Type   | Required | Description                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------------- |
| `from`    | string | Yes      | Inclusive start of the date range as an ISO 8601 date-time string in UTC. |
| `to`      | string | Yes      | Exclusive end of the date range as an ISO 8601 date-time string in UTC.   |
| `teamId`  | string | No       | Team ID to use for this operation.                                        |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId.               |

## `list_contract_commitments`

List FOCUS contract commitments.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
