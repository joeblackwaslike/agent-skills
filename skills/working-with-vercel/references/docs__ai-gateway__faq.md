---
title: AI Gateway FAQ
product: vercel
url: /docs/ai-gateway/faq
canonical_url: "https://vercel.com/docs/ai-gateway/faq"
last_updated: 2026-09-02
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/pricing/discounts
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/observability-and-spend/logs
summary: Answers to common questions about AI Gateway, including pricing and markup, SDK and API compatibility, model availability, uptime, data handling,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/faq.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "68d053044f1e1b96b51207beea3d2252f78af7ce096de2acdfd910b666e75959"
---

# AI Gateway FAQ

Answers to common questions about AI Gateway, including pricing, compatibility, model availability, and data handling.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway: Production-ready reliability for your AI apps](https://vercel.com/blog/ai-gateway-is-now-generally-available?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=related)
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Introducing the AI Gateway](https://vercel.com/blog/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=related)
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=related) — Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was r
- [Models & Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=related) — Work with models and providers in AI Gateway: provider routing and fallbacks, filtering, timeouts, caching, service tier
- [SDKs & APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=related) — Use the AI Gateway with various SDKs and API specifications including OpenAI, Anthropic, and OpenResponses.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/faq.graph.md](/docs/ai-gateway/faq.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Ffaq&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Does AI Gateway mark up token prices?

No. AI Gateway charges the provider's list price with no platform markup on tokens, on both the free and paid tiers. The same zero-markup pricing applies to [BYOK](/docs/ai-gateway/authentication-and-byok/byok) requests. See [AI Gateway Pricing](/docs/ai-gateway/pricing).

## Is AI Gateway expensive?

Token prices match provider list rates, and two mechanisms bring them below list. Some models are [priced below provider list](/ai-gateway/models?discount=true) for every team, and volume commitments can negotiate [custom discounts](/docs/ai-gateway/pricing/discounts) with invoice payment. A monthly free credit covers smaller workloads, and [budgets](/docs/ai-gateway/observability-and-spend/budgets) cap spend per team, project, API key, or team member. Requests that hit a provider's prompt cache are billed at that provider's reduced cache-read rate, which the model catalog's per-endpoint pricing shows separately.

## How do I track what I spend?

The AI Gateway Overview charts usage and spend by model, and [Logs](/docs/ai-gateway/observability-and-spend/logs) shows the cost of every request. Two REST endpoints cover the same ground without the dashboard. `GET /v1/credits` returns your credit balance and lifetime spend, and `GET /v1/generation` returns the cost of one request. For aggregates grouped by model, user, tag, provider, or credential type, use [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting), and set [budgets](/docs/ai-gateway/observability-and-spend/budgets) with spend alerts to hear about usage before it grows.

## Does AI Gateway only work with the AI SDK?

No. The [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) is one path among several. You can keep an existing OpenAI or Anthropic SDK and change its base URL, call the [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses) HTTP API, send requests to the [REST endpoints](/docs/ai-gateway/sdks-and-apis/rest-api) directly, use the [AI SDK for Python](/docs/ai-gateway/sdks-and-apis/ai-sdk-python), or go through a [framework integration](/docs/ai-gateway/ecosystem/framework-integrations) such as LangChain, LiteLLM, or Pydantic AI. [Coding agents](/docs/ai-gateway/coding-agents) and [chat platforms](/docs/ai-gateway/chat-platforms) connect the same way.

## Does AI Gateway get new models?

Yes. New models land in the catalog continuously, and you can verify freshness instead of taking a claim for it. Every model entry in `GET /v1/models` carries its provider release date in `released`:

```bash filename="Terminal"
curl -fsSL https://ai-gateway.vercel.sh/v1/models | jq '.data | sort_by(.released) | reverse | .[0:5][] | .id'
```

You can also browse the [model list](/ai-gateway/models), which shows the same catalog with pricing and capabilities.

## What is a `-fast` model variant?

A slug that *ends* in `-fast`, such as `anthropic/claude-opus-5-fast`, is [fast mode](/docs/ai-gateway/models-and-providers/fast-mode): the same model on a faster serving path at a higher per-token cost, with fallback to the base model when the fast path is unavailable. Using the fast slug is equivalent to setting the `speed` option on the base model.

Only the suffix carries that meaning. A provider's own model name can contain "fast" elsewhere without being a fast-mode variant, such as `google/veo-3.1-fast-generate-001` or `spacexai/grok-voice-think-fast-2.0`. Those are separate models with their own pricing, which can be lower than the model they are named after rather than higher.

## Does AI Gateway only work on Vercel?

No. An [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys) authenticates requests from any environment, including local development, CI, and other cloud providers. Applications deployed on Vercel can authenticate with [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc) instead of managing a key, but nothing about AI Gateway requires deploying to Vercel.

## Is the free tier a time-limited trial?

No. The free tier is a monthly included credit, not an expiring trial. It covers a [subset of models](/ai-gateway/models?freeTier=true) with lower per-model rate limits. Purchasing AI Gateway Credits moves your team to the paid tier, and the monthly free credit no longer applies. See [Free and paid tiers](/docs/ai-gateway/pricing#free-and-paid-tiers).

## Do AI Gateway Credits expire?

Yes. Purchased credits expire one year after purchase, as stated in the purchase flow.

## Does Vercel train on my prompts or store my data?

No. Vercel does not train on your prompts, and AI Gateway itself does not retain prompt or response content: it is deleted once the request completes.

What the upstream provider does with your traffic is a separate question, and AI Gateway gives you governance controls for the provider path, including per-request [Zero Data Retention](/docs/ai-gateway/security-and-compliance/zdr) routing, [prompt-training disallowance](/docs/ai-gateway/security-and-compliance/disallow-prompt-training), [provider](/docs/ai-gateway/security-and-compliance/provider-allowlist) and [model](/docs/ai-gateway/security-and-compliance/model-allowlist) allowlists, [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference), and [safety identifiers](/docs/ai-gateway/security-and-compliance/safety-identifiers) that isolate end users for provider-side abuse action. Vercel's own retention policy does not constrain providers, so enable these controls when you need a guarantee that covers the whole path. See [Security and Compliance](/docs/ai-gateway/security-and-compliance) for availability and plan requirements per control.

## What does AI Gateway log about my requests?

AI Gateway does not log the prompts or responses in your requests. That content is not retained after the request completes. What AI Gateway records is each request's metadata, including its status, model, provider, token usage, cost, duration, authentication method, and every routing attempt. Inspect this metadata in [Logs](/docs/ai-gateway/observability-and-spend/logs), where routing attempt details are kept for 30 days, or export it to your own observability tool with [Trace Drains](/docs/ai-gateway/observability-and-spend/trace-drains).

## What happens when a provider has an outage?

AI Gateway retries a failed request across the model's other eligible providers, and you can configure [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks) to reach a different model entirely. Every routing attempt, including recovered failures, appears in [Logs](/docs/ai-gateway/observability-and-spend/logs), and [Uptime and Status](/docs/ai-gateway/models-and-providers/uptime) explains how provider health is tracked.

## What uptime does AI Gateway have?

Uptime is measured from live traffic and published per model and provider, not promised as a single fleet-wide number. Each model page has **Uptime** and **Status** views, also reachable at `vercel.com/ai-gateway/models/<model-id>/uptime`, and the endpoints API exposes rolling `uptime_last_15m`, `uptime_last_1h`, and `uptime_last_1d` windows per provider.

AI Gateway reports two different numbers. Provider uptime is the success rate of each provider's attempts. AI Gateway uptime counts only the final attempt of each request, so a request recovered by fallback counts as successful, and AI Gateway uptime can be higher than any single provider's. BYOK requests and `4xx` responses are excluded from both.

## How much latency does AI Gateway add?

AI Gateway measures and publishes per-provider latency, throughput, and uptime for every model endpoint. The `GET /v1/models/{creator}/{model}/endpoints` response includes `latency_last_1h`, `throughput_last_1h`, and uptime figures measured through the gateway, so the numbers you see include any routing overhead. For latency-sensitive workloads, [fast mode](/docs/ai-gateway/models-and-providers/fast-mode) requests the fastest serving path for supported models. See [Metrics](/docs/ai-gateway/models-and-providers/metrics) for how these measurements are made.

## How do rate limits work?

The free tier applies lower per-model limits. The paid tier removes them, and a `429` may come from the upstream provider instead. See [Rate Limits](/docs/ai-gateway/rate-limits) for the response shape, retry guidance, and the difference between rate limits and budgets.

## How do I get help with AI Gateway?

Open your dashboard's **Support** entry for technical and billing questions. For custom rate limits, volume discounts, or invoice payment, [contact sales](/contact/sales).


---

[View full sitemap](/docs/sitemap)
