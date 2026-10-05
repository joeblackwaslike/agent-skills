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
  - /docs/drains
  - /docs/ai-gateway
  - /docs/agent
  - /docs/plans/pro-plan
  - /docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote
summary: Vercel MCP tools for billing and purchases.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4148eed90f839bbe6cd997788d74dec1a21d15ce76ca6b1432b162d4e811c757"
---

# Billing and Purchases

Review your team's billing charges and contract commitments, or get quotes before confirming purchases. You can purchase credits and domains, add supported add-ons, or upgrade a team to Pro.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Billing FAQ for Pro Plan](https://vercel.com/docs/plans/pro-plan/billing?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling&source_site=vercel-docs&relationship=related) — This page covers frequently asked questions around payments, invoices, and billing on the Pro plan.
- [List FOCUS billing charges](https://vercel.com/docs/rest-api/billing/list-focus-billing-charges?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling&source_site=vercel-docs&relationship=related) — GET /v1/billing/charges — Returns the billing charge data in FOCUS v1.3 JSONL format for a specified Vercel team, within
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [Purchase credits](https://vercel.com/docs/rest-api/billing/purchase-credits?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling&source_site=vercel-docs&relationship=related) — POST /v1/billing/buy — Purchases credits for a Vercel team using the default payment method on file. The purchase is cha
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing.graph.md](/docs/agent-resources/vercel-mcp/tools/billing.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `buy_addon`

Purchase a Vercel add-on for a team, by integer quantity. Currently only the `siem` add-on ([SIEM log drains](/docs/drains)) is available, and the team must be on the Flex plan.

Vercel's API doesn't return a price for add-ons, so the quote includes a `priceNote` and a link to the team's billing settings where you can review the unit price before confirming.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                                     |
| ---------------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productAlias`   | string  | Yes      | -       | The add-on to purchase. Only `siem` is available today                                                                                                                                          |
| `quantity`       | number  | Yes      | -       | Number of units to purchase                                                                                                                                                                     |
| `teamId`         | string  | Yes      | -       | The team ID to purchase the add-on for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the charge                                                                                                                                                                |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                           |

**Sample prompt:** "Buy 2 units of the SIEM add-on for my team"

## `buy_credits`

Purchase prepaid credits for [v0](https://v0.dev), [AI Gateway](/docs/ai-gateway), or [Vercel Agent](/docs/agent). The amount is quoted directly, since credits cost exactly what you buy.

Some credit types have plan prerequisites: Vercel Agent credits require the team to be on [Vercel Pro](/docs/plans/pro-plan) (upgrade first with `buy_pro`), and v0 credits require a paid v0 plan. AI Gateway credits have no prerequisite. If a required plan is missing, the purchase is rejected with guidance and nothing is charged.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                                  |
| ---------------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creditType`     | string  | Yes      | -       | Which credit balance to top up: `v0`, `gateway` (AI Gateway), or `agent` (Vercel Agent)                                                                                                      |
| `amount`         | number  | Yes      | -       | Amount to purchase, in whole US dollars (1–1000)                                                                                                                                             |
| `teamId`         | string  | Yes      | -       | The team ID to purchase credits for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the charge                                                                                                                                                             |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                        |

**Sample prompt:** "Buy $25 of AI Gateway credits for my team"

## `buy_credits_endpoint`

To purchase credits, use [`get_purchase_quote`](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) followed by [`buy_credits`](/docs/agent-resources/vercel-mcp/tools/billing/buy_credits). This tool does not execute purchases.

## `buy_domain`

Register (purchase) a single [domain](/docs/domains) for a team. The quote (`get_purchase_quote` with `product: domain`) checks availability and returns the live `purchasePrice` for the requested term. The **confirm** step must echo that price back as `expectedPrice`, and the order is rejected if the live price no longer matches, so you are never charged more than the amount you saw quoted.

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

## `buy_pro`

Upgrade a team to a Vercel Pro subscription. This starts recurring Pro billing immediately at the standard Pro price. Vercel's API doesn't return the Pro subscription price, so the quote includes a `pricingUrl` pointing to [current Pro pricing](https://vercel.com/pricing) to review before confirming.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                              |
| ---------------- | ------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`         | string  | Yes      | -       | The team ID to upgrade. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the upgrade                                                                                                                                                        |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                    |

**Sample prompt:** "Upgrade my team to Vercel Pro"

## `get_domain_order`

Get the status of a domain purchase order returned by `buy_domain`, to confirm whether the asynchronous registration completed. It is read-only action.

| Parameter | Type   | Required | Default | Description                                                                        |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------- |
| `orderId` | string | Yes      | -       | The `orderId` returned by `buy_domain`                                             |
| `teamId`  | string | No       | -       | The team ID the domain was purchased for. Alternatively the team slug can be used. |

**Sample prompt:** "Did my domain purchase go through?"

## `get_purchase_quote`

Get a price quote for any purchase. This is a read-only action that never charges. It is the only source of an `idempotencyKey`, so it is the required first step before any `buy_*` tool usage. For products with no API price (add-ons, Pro), the quote includes a `priceNote` and a billing or pricing URL to review instead of a number.

You typically won't invoke this tool directly. Your AI client calls it automatically as the first step of any purchase and presents the quote for your approval.

| Parameter      | Type    | Required      | Default     | Description                                                                                                                                                                               |
| -------------- | ------- | ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `product`      | string  | Yes           | -           | Which purchase to quote: `credits`, `domain`, `addon`, or `pro`                                                                                                                           |
| `teamId`       | string  | Yes           | -           | The team ID the purchase is for. Alternatively, the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `creditType`   | string  | For `credits` | -           | Which credit balance to top up: `v0`, `gateway` (AI Gateway), or `agent` (Vercel Agent)                                                                                                   |
| `amount`       | number  | For `credits` | -           | Amount to purchase, in whole US dollars (1–1000)                                                                                                                                          |
| `domain`       | string  | For `domain`  | -           | The domain to register (e.g., example.com)                                                                                                                                                |
| `years`        | number  | No            | TLD minimum | Registration term in years for `domain` (max 10)                                                                                                                                          |
| `autoRenew`    | boolean | No            | true        | Whether to auto-renew `domain` at the end of the term                                                                                                                                     |
| `productAlias` | string  | For `addon`   | -           | The add-on to quote. Only `siem` is available today                                                                                                                                       |
| `quantity`     | number  | For `addon`   | -           | Number of units                                                                                                                                                                           |

**Sample prompt:** "How much would it cost to register example.com for 3 years?"

## How purchases work

Every purchase uses the same quote-then-confirm flow:

1. **Quote**: Call [`get_purchase_quote`](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) with the product and its parameters. This tool is read-only and nothing is charged. The response includes the cost (when Vercel can quote one), the applicable spend limit, and an `idempotencyKey` that encodes the quoted terms. Quoting is required before the `buy_*` tools can be used.
2. **Review**: Review the quote and approve it. Charges are immediate and non-refundable.
3. **Confirm**: Call the matching `buy_*` tool with `confirm: true`, the same parameters, and the `idempotencyKey` from the quote. Quotes expire after 5 minutes: an expired or mismatched key is rejected and you must quote again.

The flow provides these guarantees:

- Submitting the same `idempotencyKey` twice does not create a second charge.
- The `idempotencyKey` is a signed token of the quoted terms. The server rejects a confirmation call whose parameters don't exactly match the quote.
- Purchases require a valid payment method on the team. If no payment method is on file, nothing is charged and the response includes a `billingUrl` where you can add one before retrying.
- Your MCP client may prompt you before executing a `confirm: true` call. Declining the prompt never triggers a charge.
- A successful confirmation returns a `billingUrl` (team billing settings, where the charge appears) and a `proofUrl` showing the purchase. Billing history may take a few minutes to update.

**Sample prompt:** "Show me a quote for upgrading my team to Pro."

## `list_billing_charges`

List FOCUS billing charges.

## Parameters

| Parameter | Type   | Required | Description                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------------- |
| `from`    | string | Yes      | Inclusive start of the date range as an ISO 8601 date-time string in UTC. |
| `to`      | string | Yes      | Exclusive end of the date range as an ISO 8601 date-time string in UTC.   |
| `teamId`  | string | No       | Team ID.                                                                  |
| `slug`    | string | No       | Team slug.                                                                |

## `list_contract_commitments`

List FOCUS contract commitments.

## Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `teamId`  | string | No       | Team ID.    |
| `slug`    | string | No       | Team slug.  |


---

[View full sitemap](/docs/sitemap)
