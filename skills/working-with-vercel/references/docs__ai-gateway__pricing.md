---
title: AI Gateway Pricing
product: vercel
url: /docs/ai-gateway/pricing
canonical_url: "https://vercel.com/docs/ai-gateway/pricing"
last_updated: 2026-08-23
type: reference
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/plans/enterprise
  - /docs/ai-gateway/pricing/discounts
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/observability-and-spend/custom-reporting
summary: Learn about pricing for AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/pricing.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "a42489eefc3969110fce3bf0fead2706e4cec0f583ded8c9163f3195c54dfd0c"
---

# AI Gateway Pricing

**AI Gateway charges no markup and no platform fee on tokens.** You pay the provider's list price on a pay-as-you-go basis. Purchase [AI Gateway Credits](#top-up-your-ai-gateway-credits) and Vercel automatically deducts charges from your balance.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [GPT-5.6 Sol is now 50% off a lower price](https://vercel.com/changelog/gpt-5-6-sol-is-now-50-percent-off-a-lower-price?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related)
- [MiniMax H3 and H3 Max are 50% off on AI Gateway](https://vercel.com/changelog/minimax-h3-and-h3-max-are-50-off-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related)
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [AI Gateway: Production-ready reliability for your AI apps](https://vercel.com/blog/ai-gateway-is-now-generally-available?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related)
- [Introducing the AI Gateway](https://vercel.com/blog/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related)
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Vercel Agent Pricing](https://vercel.com/docs/agent/pricing?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related) — Understand Vercel Agent pricing and how to track costs
- [Ecosystem](https://vercel.com/docs/ai-gateway/ecosystem?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related) — Explore community framework integrations and ecosystem features for the AI Gateway.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how eve usage maps to Vercel resources and inherited platform limits.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/pricing.graph.md](/docs/ai-gateway/pricing.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fpricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Free and paid tiers

Every Vercel team account gets access to both a free tier and a paid tier for AI Gateway Credits. **For the paid tier, AI Gateway provides tokens with zero markup, including when you bring your own key.**

The free tier includes a subset of models, not the full catalog. To see which models you can use with free credits, [browse the Free Tier models](/ai-gateway/models?freeTier=true). To use any other model, purchase AI Gateway Credits.

Free tier requests are also rate limited per model, with lower limits than the paid tier. If you exceed a limit, AI Gateway returns a `429` error and you can retry after a short wait. Purchasing AI Gateway Credits moves your team to the paid tier, which raises your rate limits.

Your free credits start when you make your first AI Gateway request. To run larger workloads, you can purchase AI Gateway Credits at any time with no obligation to renew. Once you purchase credits, your account transitions to the paid tier and the monthly free credit no longer applies.

## AI Gateway Rates

Whether you use a free or paid account, you'll pay the AI Gateway rates listed in the Models section of the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) tab for each request. AI Gateway bases its rates on the provider's list price.

The charge for each request depends on the AI provider and model you select, and the number of input and output tokens processed. **You're responsible for any payment processing fees that may apply.**

To cap how much your team, a project, an API key, or a team member can spend, set [budgets](/docs/ai-gateway/observability-and-spend/budgets).

[Enterprise](/docs/plans/enterprise) teams can pay for AI Gateway by invoice instead, which has no payment processing fees. [Contact sales](/contact/sales) to set up invoiced billing.

### Volume discounts

For volume spend, custom [discounts on token spend](/docs/ai-gateway/pricing/discounts) are also available.

### Finding model pricing

You can find the most up-to-date pricing for all models in two places:

- [**AI Gateway Model List**](/ai-gateway/models): Browse all available models with pricing information
- [**AI Gateway Dashboard**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fmodels\&title=AI+Gateway+Models): View models directly in your Vercel dashboard

When you click on a model, you can see the full pricing breakdown including variations across different providers that offer the same model.

## Bring Your Own Key (BYOK)

AI Gateway also supports [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok) for any provider listed in our catalog. With BYOK, there is no markup or fee from AI Gateway.

BYOK is available on the paid tier. When a request with your credentials fails, AI Gateway retries it with system credentials for reliability, and that fallback usage is charged against your credits balance. To use your own provider keys, you'll need purchased AI Gateway Credits.

## Add-on surcharges

Some AI Gateway capabilities are off by default. When you enable one, it incurs additional charges beyond the per-token rates, deducted from your AI Gateway Credits balance. Disable the capability in your team's AI Gateway settings to stop the charges.

### Custom Reporting

[Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting) lets you attach tags, user IDs, and quota entity IDs to requests, then query that data through the reporting endpoint.

| Charge type | Cost                                              |
| ----------- | ------------------------------------------------- |
| Write       | $0.075 / 1,000 tag/user ID/quota entity ID writes |
| Query       | $5 / 1,000 queries to the reporting endpoint      |

> **💡 Note:** Each unique tag, user ID, or quota entity ID within a single request scope
> counts as one write.

### Provider Allowlist

The [provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist) is a team-wide setting that applies to every request. If you only need to restrict providers on individual requests, use the `only` parameter in `providerOptions` instead at no additional cost.

| Option                       | Cost                                | Availability       |
| ---------------------------- | ----------------------------------- | ------------------ |
| Per-request `only` filter    | No additional cost                  | All plans          |
| Team-wide provider allowlist | $0.10 per 1,000 successful requests | Pro and Enterprise |

### Zero Data Retention (ZDR)

[Zero Data Retention (ZDR)](/docs/ai-gateway/security-and-compliance/zdr) routes requests to providers that have agreed not to retain or train on prompt data.

| Option                          | Cost                     | Availability       |
| ------------------------------- | ------------------------ | ------------------ |
| Per-request zero data retention | No additional cost       | Pro and Enterprise |
| Team-wide zero data retention   | $0.10 per 1,000 requests | Pro and Enterprise |

## Trace Drains

[Trace Drains](/docs/ai-gateway/observability-and-spend/trace-drains) forward an OpenTelemetry trace of every AI Gateway request to your own observability tool. They're available on Pro and Enterprise plans and bill on two meters, the number of trace events delivered to your drains and the volume of trace data transferred.

Vercel bills these two meters through Drains usage on your plan, not against your AI Gateway Credits balance. Track them on the [Usage dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fusage\&title=Usage) under **Drains → AI Gateway Traces**.

Pro plans include no allowance for either meter, so charges begin with the first delivered trace and first byte of trace egress. A higher [sampling rate](/docs/drains/reference/traces#sampling-rate) increases both. To stop future charges, [pause or delete the trace drain](/docs/drains/using-drains#managing-your-active-drains).

## View your AI Gateway Credits balance

To view your balance:

1. Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in your Vercel dashboard sidebar.
2. On the upper right corner, you will see your AI Gateway Credits balance displayed.

## Top up your AI Gateway Credits

To add AI Gateway Credits:

1. Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in your Vercel dashboard sidebar.
2. In the upper right corner, click on the button that shows your AI Gateway Credits balance.
3. In the dialog that appears, you can select the amount of AI Gateway Credits you want to add.
4. Click on **Continue to Payment**.
5. Choose your payment method and click on **Confirm and Pay** to complete your purchase.

## Configure auto top-up

You can configure auto top-up to automatically add AI Gateway Credits when your balance falls below a threshold.

To enable auto top-up:

1. Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in your Vercel dashboard sidebar.
2. In the upper right corner, click on the button that shows your AI Gateway Credits balance.
3. Click the **Change** button next to auto top-up (disabled by default).
4. Configure your preferred threshold and top-up amount.
5. Click **Save** to apply your settings.

When your balance drops below the threshold, AI Gateway automatically charges your payment method and adds the configured amount to your balance.


---

[View full sitemap](/docs/sitemap)
