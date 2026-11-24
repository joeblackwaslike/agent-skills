---
title: buy_addon
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/buy_addon
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_addon"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/drains
summary: Use buy_addon with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_addon.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "3523f87ac4de7e03ce816bf9c55668369d4c67a0aaf302668715b930491e00b2"
---

# buy_addon

Purchase a Vercel add-on for a team, by integer quantity. Currently only the `siem` add-on ([SIEM log drains](/docs/drains)) is available, and the team must be on the Flex plan.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [buy_pro](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_pro?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_addon&source_site=vercel-docs&relationship=related) — Use buy_pro with Vercel MCP.
- [Vercel MCP now supports purchases](https://vercel.com/changelog/vercel-mcp-now-supports-purchases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_addon&source_site=vercel-docs&relationship=related)
- [get_purchase_quote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_addon&source_site=vercel-docs&relationship=related) — Use get_purchase_quote with Vercel MCP.
- [buy_credits](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_credits?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_addon&source_site=vercel-docs&relationship=related) — Use buy_credits with Vercel MCP.
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_addon&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_addon&source_site=vercel-docs&relationship=related) — Use buy_domain with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/buy_addon.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/buy_addon.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_addon&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Vercel's API doesn't return a price for add-ons, so the quote includes a `priceNote` and a link to the team's billing settings where you can review the unit price before confirming.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                                     |
| ---------------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productAlias`   | string  | Yes      | -       | The add-on to purchase. Only `siem` is available today                                                                                                                                          |
| `quantity`       | number  | Yes      | -       | Number of units to purchase                                                                                                                                                                     |
| `teamId`         | string  | Yes      | -       | The team ID to purchase the add-on for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the charge                                                                                                                                                                |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                           |

**Sample prompt:** "Buy 2 units of the SIEM add-on for my team"


---

[View full sitemap](/docs/sitemap)
