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
  []
summary: Use get_purchase_quote with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "3e599e124af85c75e7bb98c504bcd1d1372ec5625ff3544e5c248eba20350ab7"
---

# get_purchase_quote

Get a price quote for any purchase. This is a read-only action that never charges. It is the only source of an `idempotencyKey`, so it is the required first step before any `buy_*` tool usage. For products with no API price (add-ons, Pro), the quote includes a `priceNote` and a billing or pricing URL to review instead of a number.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel MCP now supports purchases](https://vercel.com/changelog/vercel-mcp-now-supports-purchases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_purchase_quote&source_site=vercel-docs&relationship=related)
- [buy_pro](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_pro?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_purchase_quote&source_site=vercel-docs&relationship=related) — Use buy_pro with Vercel MCP.
- [buy_credits](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_credits?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_purchase_quote&source_site=vercel-docs&relationship=related) — Use buy_credits with Vercel MCP.
- [buy_addon](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_addon?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_purchase_quote&source_site=vercel-docs&relationship=related) — Use buy_addon with Vercel MCP.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_purchase_quote&source_site=vercel-docs&relationship=related) — Use buy_domain with Vercel MCP.
- [get_domain_price](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_price?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_purchase_quote&source_site=vercel-docs&relationship=related) — Use get_domain_price with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fget_purchase_quote&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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


---

[View full sitemap](/docs/sitemap)
