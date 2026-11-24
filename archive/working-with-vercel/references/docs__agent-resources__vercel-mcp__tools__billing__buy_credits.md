---
title: buy_credits
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/buy_credits
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_credits"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/ai-gateway
  - /docs/agent
  - /docs/plans/pro-plan
summary: Use buy_credits with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_credits.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "cfc471ae6a5a0022e9148337457f3c92c54e107a829f107712a659ce3981ae54"
---

# buy_credits

Purchase prepaid credits for [v0](https://v0.dev), [AI Gateway](/docs/ai-gateway), or [Vercel Agent](/docs/agent). The amount is quoted directly, since credits cost exactly what you buy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel MCP now supports purchases](https://vercel.com/changelog/vercel-mcp-now-supports-purchases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=related)
- [buy_credits_endpoint](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_credits_endpoint?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=related) — Use buy_credits_endpoint with Vercel MCP.
- [Pricing](https://v0.app/docs/pricing?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=related) — Understand the v0 plans, pricing, and usage limits.
- [get_purchase_quote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=related) — Use get_purchase_quote with Vercel MCP.
- [Purchase credits](https://vercel.com/docs/rest-api/billing/purchase-credits?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=related) — POST /v1/billing/buy — Purchases credits for a Vercel team using the default payment method on file. The purchase is cha
- [buy_pro](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/buy_pro?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=related) — Use buy_pro with Vercel MCP.
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/buy_credits.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/buy_credits.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Fbuy_credits&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Some credit types have plan prerequisites: Vercel Agent credits require the team to be on [Vercel Pro](/docs/plans/pro-plan) (upgrade first with `buy_pro`), and v0 credits require a paid v0 plan. AI Gateway credits have no prerequisite. If a required plan is missing, the purchase is rejected with guidance and nothing is charged.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                                  |
| ---------------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creditType`     | string  | Yes      | -       | Which credit balance to top up: `v0`, `gateway` (AI Gateway), or `agent` (Vercel Agent)                                                                                                      |
| `amount`         | number  | Yes      | -       | Amount to purchase, in whole US dollars (1–1000)                                                                                                                                             |
| `teamId`         | string  | Yes      | -       | The team ID to purchase credits for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the charge                                                                                                                                                             |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                        |

**Sample prompt:** "Buy $25 of AI Gateway credits for my team"


---

[View full sitemap](/docs/sitemap)
