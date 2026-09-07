---
title: AI Gateway Rate Limits
product: vercel
url: /docs/ai-gateway/rate-limits
canonical_url: "https://vercel.com/docs/ai-gateway/rate-limits"
last_updated: 2026-09-02
type: reference
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/getting-started
summary: Learn how AI Gateway rate limits work on the free and paid tiers, what the 429 response looks like, and how to retry a rate-limited request.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/rate-limits.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "4fe1f32d52282db549dc980707d26a9b9cb0f6c5d79adc9193cc6d573b985ade"
---

# AI Gateway Rate Limits

AI Gateway does not rate limit paid-tier requests. The free tier applies lower per-model limits, and a `429` on either tier may come from the upstream provider rather than from AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway: Production-ready reliability for your AI apps](https://vercel.com/blog/ai-gateway-is-now-generally-available?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related)
- [Securing your AI applications with Rate Limiting](https://vercel.com/kb/guide/securing-ai-app-rate-limiting?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Learn how to secure your AI applications with rate limiting using Vercel WAF and Vercel AI SDK
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including pricing and markup, SDK and API compatibility, model availabilit
- [AI Gateway Discounts](https://vercel.com/docs/ai-gateway/pricing/discounts?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Discounts on AI Gateway token spend: models already priced below list for every team, plus custom volume discounts with
- [Vercel Connect Limits](https://vercel.com/docs/connect/limits?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Platform limits and per-minute rate limits for Vercel Connect SDK methods, CLI commands, and public endpoints.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Understand how eve usage maps to Vercel resources and inherited platform limits.
- [Model Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/model-allowlist?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=related) — Restrict which AI models your team can use through AI Gateway. Available on Pro and Enterprise.

Full cross-link map for this page: [/docs/ai-gateway/rate-limits.graph.md](/docs/ai-gateway/rate-limits.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Frate-limits&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## How rate limits work

On the free tier, AI Gateway enforces a lower limit per model, and exceeding it rejects further requests to that model until your request rate drops. The paid tier removes AI Gateway's limits entirely, so the only limits left are the upstream provider's, whether the request uses AI Gateway credentials or your own provider keys.

Whether a `429` comes from AI Gateway or the provider, the retry behavior below is the same. A provider's `429` can carry that provider's own error body instead of the AI Gateway error shape.

Limits can change, so this page describes behavior rather than fixed numbers. To confirm the current limit for a model, contact Vercel from your dashboard's **Support** entry.

## Free tier and paid tier

|                | Free tier                                                    | Paid tier                            |
| -------------- | ----------------------------------------------------------- | ------------------------------------ |
| Model access   | [Free-tier-eligible models](/ai-gateway/models?freeTier=true) | All available models                 |
| Rate limits    | Lower limit per model                                       | None from AI Gateway; provider limits still apply |
| Custom limits  | Not available                                               | Available on request                 |
| Credit basis   | Monthly included credit                                     | Purchased AI Gateway Credits         |

Purchasing AI Gateway Credits moves your team to the paid tier, which raises your rate limits. See [AI Gateway Pricing](/docs/ai-gateway/pricing) for tiers, credits, and model rates.

## When a request exceeds a limit

A rate-limited request gets an HTTP `429` response. From AI Gateway, the body is a JSON error:

```json filename="Error response"
{
  "error": {
    "message": "Rate limit exceeded",
    "type": "rate_limit_exceeded"
  }
}
```

Some `429` responses include a `retry-after` header with the number of seconds to wait. Honor it when it is present.

A `429` response is not a failure of your request. The same request can succeed later without changes, so retry it rather than editing it.

## Retry a rate-limited request

The AI SDK retries failed requests automatically with exponential backoff, and its `maxRetries` option defaults to `2`. For a direct HTTP client, honor `retry-after` when it is present and parseable, and back off exponentially otherwise:

```typescript filename="retry.ts"
// `retry-after` is either a number of seconds or an HTTP date. Anything that
// doesn't parse falls through to exponential backoff, so a malformed header
// can't collapse the wait to zero and turn the loop into a burst of requests.
function retryAfterMs(header: string | null): number | null {
  if (!header) return null;

  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;

  const date = Date.parse(header);
  if (Number.isNaN(date)) return null;

  return Math.max(0, date - Date.now());
}

async function chatWithRetry(body: string, maxAttempts = 4): Promise<Response> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch(
      'https://ai-gateway.vercel.sh/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body,
      },
    );

    if (response.status !== 429) {
      return response;
    }

    // Don't sleep after the final attempt.
    if (attempt === maxAttempts - 1) break;

    const delayMs =
      retryAfterMs(response.headers.get('retry-after')) ?? 2 ** attempt * 1000;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error('Request still rate limited after all retries');
}
```

Keep retries bounded. If a workload hits a limit regularly, raise the limit instead of lengthening the backoff.

## Rate limits versus budgets

Rate limits and budgets both reject requests, but for different reasons:

|                      | Rate limit                   | Budget                                            |
| -------------------- | ---------------------------- | ------------------------------------------------- |
| What it caps         | Request rate for a model     | Spend in dollars                                  |
| Who sets it          | Vercel, per tier             | You, per team, project, API key, or user          |
| Response when hit    | `429`                        | `402` with `quota_for_entity_exceeded`            |
| Recovery             | Retry after a short wait     | Wait for the refresh period or raise the limit    |

To cap spend instead of request rate, set a [budget](/docs/ai-gateway/observability-and-spend/budgets).

## Rate limits with BYOK

[BYOK](/docs/ai-gateway/authentication-and-byok/byok) requests use your own provider credentials, so the provider's own rate limits apply to them. When a BYOK request fails and falls back to AI Gateway system credentials, the fallback attempt is subject to AI Gateway rate limits, and its usage is billed to your AI Gateway Credits.

## Raise a limit

Purchase [AI Gateway Credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits) to move your team to the paid tier, which removes AI Gateway's rate limits. If a provider-side limit still constrains a workload, paid-tier teams can request custom arrangements. [Contact sales](/contact/sales) to discuss custom limits.

## Next steps

- [AI Gateway Pricing](/docs/ai-gateway/pricing) for tiers, credits, and model rates
- [Budgets](/docs/ai-gateway/observability-and-spend/budgets) to cap spend by team, project, API key, or team member
- [Troubleshoot your first request](/docs/ai-gateway/getting-started#troubleshoot-your-first-request) for the other first-run errors


---

[View full sitemap](/docs/sitemap)
