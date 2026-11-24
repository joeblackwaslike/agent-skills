---
title: AI Gateway Pricing
product: vercel
url: /docs/ai-gateway/pricing
canonical_url: "https://vercel.com/docs/ai-gateway/pricing"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/rate-limits
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/plans/enterprise
  - /docs/ai-gateway/pricing/discounts
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Understand AI Gateway token pricing, free and paid credits, BYOK costs, add-on charges, and payment fees. Manage credit top-ups and spending budgets.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/pricing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "3532551b0f5f5efef2758b6474b7f1e8d7b4ed0cb90734122240d0297bc3cac9"
---

# AI Gateway Pricing

**AI Gateway charges no markup and no platform fee on tokens.** You pay the provider's list price on a pay-as-you-go basis. Purchase [AI Gateway Credits](#top-up-your-ai-gateway-credits) and Vercel automatically deducts charges from your balance.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [GPT-5.6 Sol is now 50% off a lower price](https://vercel.com/changelog/gpt-5-6-sol-is-now-50-percent-off-a-lower-price)
- [MiniMax H3 and H3 Max are 50% off on AI Gateway](https://vercel.com/changelog/minimax-h3-and-h3-max-are-50-off-on-ai-gateway)
- [MiniMax H3 Image and Highspeed now available on AI Gateway](https://vercel.com/changelog/minimax-h3-image-and-highspeed-now-available-on-ai-gateway)
- [Deploy a Go backend on Vercel with AI Gateway](https://vercel.com/kb/guide/deploy-a-go-backend-on-vercel-with-ai-gateway) — Build and deploy a Go HTTP server that calls AI Gateway using the standard library, with no SDK dependencies.
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Use Vercel Daemons with eve agents](https://vercel.com/kb/guide/vercel-daemons-eve-agents) — Connect eve agents to Vercel Daemons to process queued jobs, offload heavy work, and react to events. Includes code, aut
- [AI Gateway Observability and Spend](https://vercel.com/docs/ai-gateway/observability-and-spend) — Monitor AI Gateway requests and control costs with logs, generation lookup, custom reporting, budgets, and OpenTelemetry
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Running Agent Harnesses Durably on Vercel](https://vercel.com/docs/agent-harnesses) — Run Pi, fx, OpenCode, eve, Claude Code, and Codex on Vercel so a crash, a function timeout, or a redeploy resumes the ag
- [Running Claude Code Durably on Vercel](https://vercel.com/docs/agent-harnesses/claude-code) — Run Claude Code in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn r
- [Running eve Agents Durably on Vercel](https://vercel.com/docs/agent-harnesses/eve) — eve agents are durable out of the box on Vercel, with no extra configuration.

Full cross-link map for this page: [/docs/ai-gateway/pricing.graph.md](/docs/ai-gateway/pricing.graph.md)
<!-- /docsgraph:related -->

## Free and paid tiers

Every Vercel team account gets access to both a free tier and a paid tier for AI Gateway Credits. **For the paid tier, AI Gateway provides tokens with zero markup, including when you bring your own key.**

The free tier includes a subset of models, not the full catalog. To see which models you can use with free credits, [browse the Free Tier models](/ai-gateway/models?freeTier=true). To use any other model, purchase AI Gateway Credits.

Free tier requests are also rate limited per model, with lower limits than the paid tier. If you exceed a limit, AI Gateway returns a `429` error and you can retry after a short wait. Purchasing AI Gateway Credits moves your team to the paid tier, which raises your rate limits. See [Rate Limits](/docs/ai-gateway/rate-limits) for the `429` response shape and retry guidance.

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

AI Gateway also supports [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok) for any provider listed in our catalog. With BYOK, AI Gateway adds no markup to inference, and you pay the provider directly. Every [add-on surcharge](#add-on-surcharges) you have turned on still applies to BYOK requests and is charged to your AI Gateway Credits. That includes the team-wide provider and model allowlists, team-wide region pinning, and regional hosting. [Fallback to Vercel Keys](/docs/ai-gateway/authentication-and-byok/byok#turn-off-fallback-to-vercel-keys) is on by default. If you turn it off, AI Gateway also charges a [BYOK without fallback](#byok-without-fallback) fee.

BYOK is available on the paid tier. When a request with your credentials fails, AI Gateway retries it with Vercel's provider keys for reliability, and that fallback usage is charged against your credits balance. With Fallback to Vercel Keys off, failed requests don't fall back to Vercel's provider keys. To use your own provider keys, you'll need purchased AI Gateway Credits and a positive credit balance.

### API credits from provider subscriptions

API credits claimed through eligible [ChatGPT subscriptions](/i/chatgpt-api-credits-ai-gateway) or [Claude subscriptions](/i/claude-api-credits-ai-gateway) stay in the linked provider organization. Use that organization's key with BYOK for eligible provider-billed requests. These grants don't top up your AI Gateway Credits balance or replace the purchased-credit requirement for BYOK.

Exhausting a grant doesn't necessarily stop requests. A provider's purchased balance or automatic recharge can fund further usage, and AI Gateway can charge its own balance after a fallback to Vercel's provider keys. [AI Gateway budgets](/docs/ai-gateway/observability-and-spend/budgets) exclude BYOK spend, so configure provider-side spending controls as well. The [BYOK without fallback](#byok-without-fallback) fee is the exception.

## Add-on surcharges

Some AI Gateway capabilities are off by default. When you enable one, it incurs additional charges beyond the per-token rates, deducted from your AI Gateway Credits balance. Disable the capability in your team's AI Gateway settings to stop the charges. The [BYOK without fallback](#byok-without-fallback) fee works the other way and applies while Fallback to Vercel Keys is off.

Per-request surcharges apply to each request AI Gateway bills. That includes a request billed without completing normally, such as a response the provider blocks on safety grounds and still charges for. Requests that AI Gateway doesn't bill aren't charged a surcharge. Surcharges apply to [BYOK](#bring-your-own-key-byok) requests too.

### Custom Reporting

[Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting) lets you attach tags, user IDs, and quota entity IDs to requests, then query that data through the reporting endpoint.

| Charge type | Cost                                              |
| ----------- | ------------------------------------------------- |
| Write       | $0.075 / 1,000 tag/user ID/quota entity ID writes |
| Query       | $5 / 1,000 queries to the reporting endpoint      |

> **💡 Note:** Each unique tag, user ID, or quota entity ID within a single request scope
> counts as one write.

### Provider Allowlist

The [provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist) is a team-wide setting that applies to every request, and the `only` parameter in `providerOptions` applies the same kind of restriction per request at no additional cost. Both controls remove failover to providers outside the list, so reserve them for when you need to name the exact providers that can serve traffic. When the requirement is about data handling, [zero data retention](/docs/ai-gateway/security-and-compliance/zdr), [disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training), and [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference) filter by that requirement while keeping every qualifying provider eligible. Regional inference passes through the provider's [regional price](/docs/ai-gateway/security-and-compliance/regional-inference#regional-pricing), which can be higher.

| Option                       | Cost                                | Availability       |
| ---------------------------- | ----------------------------------- | ------------------ |
| Per-request `only` filter    | No additional cost                  | All plans          |
| Team-wide provider allowlist | $0.10 per 1,000 billed requests     | Pro and Enterprise |

### Zero Data Retention (ZDR)

[Zero Data Retention (ZDR)](/docs/ai-gateway/security-and-compliance/zdr) routes requests to providers that have agreed not to retain or train on prompt data.

| Option                          | Cost                     | Availability                          |
| ------------------------------- | ------------------------ | ------------------------------------- |
| Per-request zero data retention | No additional cost       | Pro, Enterprise, or purchased credits |
| Team-wide zero data retention   | $0.10 per 1,000 requests | Pro, Enterprise, or purchased credits |

Teams on a Pro trial need [purchased credits](#top-up-your-ai-gateway-credits) to use ZDR. Free credits don't count.

### Regional Hosting

With [Regional Hosting](/docs/ai-gateway/security-and-compliance/regional-hosting), which is in beta, you send requests to a regional endpoint (`eu.ai-gateway.vercel.sh` or `us.ai-gateway.vercel.sh`) to control where AI Gateway receives them: in the EU or in the US.

| Option                          | Cost                 | Availability       |
| ------------------------------- | -------------------- | ------------------ |
| Requests to a regional endpoint | 5% of inference cost | Pro and Enterprise |

The 5% is of the request's inference cost at market rate. It applies to every request sent to a regional endpoint, wherever inference runs. That includes BYOK requests, embedding, image, and other non-language requests, WebSocket sessions, and async batch and video jobs submitted to the endpoint. For a BYOK request, the provider bills you for inference, and the 5% is of what the request would cost at AI Gateway's market rate, charged to your AI Gateway Credits. Hobby teams and teams on a Pro trial can't use regional endpoints, and their requests to one fail with HTTP 403.

To stop the charge, send requests to `https://ai-gateway.vercel.sh`.

### BYOK without fallback

AI Gateway charges $0.20 per 1,000 [BYOK](/docs/ai-gateway/authentication-and-byok/byok) requests while [Fallback to Vercel Keys](/docs/ai-gateway/authentication-and-byok/byok#turn-off-fallback-to-vercel-keys) is off. The setting is on by default, so BYOK requests have no fee until you turn it off. With the setting off, requests that your credentials serve can't fall back to Vercel-provided inference, meaning a catalog model that AI Gateway serves with Vercel's provider keys. [Private model](/docs/ai-gateway/security-and-compliance/private-inference) requests incur the same fee by default, because a private model request has no Vercel-provided fallback unless you add one. To avoid the fee, add a Vercel-provided fallback to the request's model chain and keep Fallback to Vercel Keys on. See [Fees for private models without a fallback](/docs/ai-gateway/security-and-compliance/private-inference#fees-for-private-models-without-a-fallback).

| BYOK request                         | Cost                     |
| ------------------------------------ | ------------------------ |
| Fallback to Vercel Keys on (default) | No additional cost       |
| Fallback to Vercel Keys off          | $0.20 per 1,000 requests |

| Private model request                                                   | Cost                     |
| ----------------------------------------------------------------------- | ------------------------ |
| Vercel-provided fallback in the model chain, Fallback to Vercel Keys on | No additional cost       |
| No Vercel-provided fallback in the model chain                          | $0.20 per 1,000 requests |
| Any request while Fallback to Vercel Keys is off                        | $0.20 per 1,000 requests |

AI Gateway charges the fee as follows:

- The fee applies to all inference requests that your BYOK credentials or private models serve, across all routes.
- AI Gateway doesn't charge requests that fail, for example because of a provider error or rate limit.
- AI Gateway deducts the fee from your AI Gateway Credits balance, and the fee counts toward your [budgets](/docs/ai-gateway/observability-and-spend/budgets), even though BYOK token spend doesn't.
- The fee applies on every plan at list price. [Enterprise](/docs/plans/enterprise) teams can [contact sales](/contact/sales) for custom rates.
- At list price, 1,000,000 requests that incur the fee cost $200. Your provider bills you directly for tokens.

To stop the charges, turn Fallback to Vercel Keys back on in your team's [AI Gateway settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings), and give private model requests a Vercel-provided fallback.

## Trace Drains

[Trace Drains](/docs/ai-gateway/observability-and-spend/trace-drains) forward an OpenTelemetry trace of every AI Gateway request to your own observability tool. They're available on Pro and Enterprise plans and bill on two meters, the number of trace events delivered to your drains and the volume of trace data transferred.

Resource

Price

AI Gateway Traces

$0.05 per 1,000 traces

Trace egress

$0.50 per 1 GB

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
3. Click the **Change** button next to the **Auto-reload** status (disabled by default).
4. Turn on auto-reload, then set **When balance falls below** and **Reload to target balance**.
5. Click **Save** to apply your settings.

When your balance drops below the threshold, AI Gateway automatically charges your payment method and restores your balance to the target balance that you set.

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
