---
title: buy_pro
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/buy_pro
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_pro"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use buy_pro with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_pro.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "3bcb24e55a7ee8370138452e6f4edbd6a98bf906c67d277e28799baacfb2a773"
---

# buy_pro

Upgrade a team to a Vercel Pro subscription. This starts recurring Pro billing immediately at the standard Pro price. Vercel's API doesn't return the Pro subscription price, so the quote includes a `pricingUrl` pointing to [current Pro pricing](https://vercel.com/pricing) to review before confirming.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel MCP now supports purchases](https://vercel.com/changelog/vercel-mcp-now-supports-purchases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_pro&source_site=vercel-docs&relationship=related)
- [get_purchase_quote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_pro&source_site=vercel-docs&relationship=related) — Use get_purchase_quote with Vercel MCP.
- [buy_addon](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_addon?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_pro&source_site=vercel-docs&relationship=related) — Use buy_addon with Vercel MCP.
- [buy_credits](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_credits?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_pro&source_site=vercel-docs&relationship=related) — Use buy_credits with Vercel MCP.
- [buy_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_pro&source_site=vercel-docs&relationship=related) — Use buy_domain with Vercel MCP.
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_pro&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/buy_pro.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/buy_pro.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_pro&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                              |
| ---------------- | ------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`         | string  | Yes      | -       | The team ID to upgrade. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the upgrade                                                                                                                                                        |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                    |

**Sample prompt:** "Upgrade my team to Vercel Pro"


---

[View full sitemap](/docs/sitemap)
