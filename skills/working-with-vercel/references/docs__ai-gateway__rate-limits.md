---
title: AI Gateway Rate Limits
product: vercel
url: /docs/ai-gateway/rate-limits
canonical_url: "https://vercel.com/docs/ai-gateway/rate-limits"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/faq
summary: Learn how AI Gateway rate limits work on the free and paid tiers, what the 429 response looks like, and how to retry a rate-limited request.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/rate-limits.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "e5fb821aa9f79681c6497ee4ba3b9fe241c714a041549eea37e5fce8a6bcc34d"
---

# AI Gateway Rate Limits

The free tier applies lower per-model limits, and the paid tier removes them. A `429` on either tier may come from the upstream provider rather than from AI Gateway. If your workload needs a higher limit, [contact sales](/contact/sales) or email <ai-gateway@vercel.com>.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Model Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/model-allowlist) — Restrict which AI models your team can use through AI Gateway. Available on Pro and Enterprise.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [List AI Gateway budgets](https://vercel.com/docs/rest-api/ai-gateway/list-ai-gateway-budgets) — GET /ai-gateway/budgets/list — List the team's AI Gateway budgets \\(team/project/user/app scopes, plus default-covered a
- [Update an AI Gateway API key budget](https://vercel.com/docs/rest-api/ai-gateway/update-an-ai-gateway-api-key-budget) — PATCH /api-keys/{apiKeyID}/quota — Set, change, or remove the AI Gateway budget on an API key. Creates the budget if the
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr

Full cross-link map for this page: [/docs/ai-gateway/rate-limits.graph.md](/docs/ai-gateway/rate-limits.graph.md)
<!-- /docsgraph:related -->

## How rate limits work

On the free tier, AI Gateway enforces a lower limit per model, and exceeding it rejects further requests to that model until your request rate drops. The paid tier removes the free tier's limits. Upstream provider limits still apply, whether the request uses AI Gateway credentials or your own provider keys.

Whether a `429` comes from AI Gateway or the provider, the retry behavior below is the same. A provider's `429` can carry that provider's own error body instead of the AI Gateway error shape.

Limits can change, so this page describes behavior rather than fixed numbers. To confirm the current limit for a model, contact Vercel from your dashboard's **Support** entry.

## Free tier and paid tier

|               | Free tier                                                     | Paid tier                                                          |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| Model access  | [Free-tier-eligible models](/ai-gateway/models?freeTier=true) | All available models                                               |
| Rate limits   | Lower limit per model                                         | Free tier limits removed; provider limits still apply              |
| Higher limits | Not available                                                 | Available on request                                               |
| Credit basis  | Monthly included credit                                       | Purchased AI Gateway Credits                                       |

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

|                   | Rate limit               | Budget                                         |
| ----------------- | ------------------------ | ---------------------------------------------- |
| What it caps      | Request rate for a model | Spend in dollars                               |
| Who sets it       | Vercel, per tier         | You, per team, project, API key, or user       |
| Response when hit | `429`                    | `402` with `quota_for_entity_exceeded`         |
| Recovery          | Retry after a short wait | Wait for the refresh period or raise the limit |

To cap spend instead of request rate, set a [budget](/docs/ai-gateway/observability-and-spend/budgets).

## Rate limits with BYOK

[BYOK](/docs/ai-gateway/authentication-and-byok/byok) requests use your own provider credentials, so the provider's own rate limits apply to them. When a BYOK request fails and falls back to Vercel's provider keys, the fallback attempt is subject to AI Gateway rate limits, and its usage is billed to your AI Gateway Credits.

## Raise a limit

Purchase [AI Gateway Credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits) to move your team to the paid tier, which removes the free tier's rate limits. If an AI Gateway or provider-side limit still constrains a paid-tier workload, [contact sales](/contact/sales) or email <ai-gateway@vercel.com> to request higher limits.

## Next steps

- [AI Gateway Pricing](/docs/ai-gateway/pricing) for tiers, credits, and model rates
- [Budgets](/docs/ai-gateway/observability-and-spend/budgets) to cap spend by team, project, API key, or team member
- [Troubleshoot request errors](/docs/ai-gateway/faq#why-did-my-ai-gateway-request-fail) by status code, type, and message

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
