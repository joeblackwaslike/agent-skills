---
title: TypeSafe API with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/typesafe
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe"
last_updated: 2026-10-05
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/decision
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/models-and-providers/decision-fallbacks
  - /docs/ai-gateway/models-and-providers
summary: Point an existing TypeSafe client at AI Gateway by changing its base URL to route System One decision requests through it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "083ed01e4517bd2ca722fb6c0ffda2329a7c57a8f1dae039dd37d4fc04632ee7"
---

# TypeSafe API with AI Gateway

Keep using the [TypeSafe SDK](https://docs.typesafe.ai/introduction) and route requests through AI Gateway by changing one setting.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway now supports TypeSafe clients and an HTTP API for Jev](https://vercel.com/changelog/ai-gateway-now-supports-typesafe-clients-and-http-api-for-jev)
- [Laya decision model now available on AI Gateway, free through October 31](https://vercel.com/changelog/laya-decision-model-now-available-on-ai-gateway-free-through-october-31)
- [Liquid AI's d1 is available on AI Gateway](https://vercel.com/changelog/liquid-ai-d1-is-available-on-ai-gateway)
- [Microsoft Decision-1 now available on AI Gateway](https://vercel.com/changelog/microsoft-decision-1-now-available-on-ai-gateway)
- [Perplexity's Decider V1.2 models now available on AI Gateway](https://vercel.com/changelog/perplexity-decider-v1-2-models-now-available-on-ai-gateway)
- [Moderate product reviews with Jev, TanStack AI, and AI Gateway](https://vercel.com/kb/guide/moderate-product-reviews-jev-tanstack-ai) — Moderate product reviews for an e-commerce storefront with Jev from TypeSafe AI and TanStack AI's \\`decide\\(\\)\\` functio
- [Decisions](https://ai-sdk.dev/docs/ai-sdk-core/decisions) — Decide answers to Choice, Score, and Boolean questions against shared state.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/typesafe.graph.md](/docs/ai-gateway/sdks-and-apis/typesafe.graph.md)
<!-- /docsgraph:related -->

Requests are billed through AI Gateway and appear in your usage and observability alongside every other model you call.

If you are writing new code instead of migrating, use the [Decision API](/docs/ai-gateway/modalities/decision). It is the same capability without TypeSafe-specific naming.

## Base URL

The TypeSafe-compatible API is available at the following base URL:

```
https://ai-gateway.vercel.sh/typesafe
```

## Authentication

The TypeSafe-compatible API supports the same authentication methods as the main AI Gateway:

- **API key**: Use your AI Gateway API key with the `Authorization: Bearer <token>` header
- **OIDC token**: Use your Vercel OIDC token with the `Authorization: Bearer <token>` header

You only need one of these. This is the credential AI Gateway authenticates you with, not the credential used to call the model.

To bill the provider directly instead of through AI Gateway, add a TypeSafe key under [BYOK](/docs/ai-gateway/authentication-and-byok/byok).

## Migrating an existing client

Change the base URL and the API key:

```diff filename="client.ts"
  import { TypeSafeClient } from '@typesafe-ai/sdk';

  const client = new TypeSafeClient({
-   apiKey: process.env.TYPESAFE_API_KEY,
+   apiKey: process.env.AI_GATEWAY_API_KEY,
+   baseURL: 'https://ai-gateway.vercel.sh/typesafe',
  });
```

Everything else stays the same:

```typescript filename="triage.ts"
const result = await client.systemOne({
  state: 'I was charged twice for my subscription.',
  questions: {
    refund: { type: 'noul', instructions: 'Is the customer asking for money back?' },
    department: {
      type: 'choice',
      instructions: 'Which team should handle this?',
      criteria: { billing: 'Charges and refunds', technical: 'Bugs and outages' },
    },
  },
});

console.log(result.answers.refund); // { type: 'noul', noul: 0.98 }
```

## Supported endpoints

- `POST /typesafe/v1/systemone` answers typed questions about state
- `GET /typesafe/v1/models` lists the decision models available to you

## Request and response format

This API implements the TypeSafe request and response shapes.

#### cURL

```bash filename="systemone.sh"
curl https://ai-gateway.vercel.sh/typesafe/v1/systemone \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "typesafe-ai/jev",
    "state": "I was charged twice for my subscription.",
    "questions": {
      "refund": {
        "type": "noul",
        "instructions": "Is the customer asking for money back?"
      }
    }
  }'
```

#### TypeScript

```typescript filename="systemone.ts"
import { TypeSafeClient } from '@typesafe-ai/sdk';

const client = new TypeSafeClient({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/typesafe',
});

const result = await client.systemOne({
  model: 'typesafe-ai/jev',
  state: 'I was charged twice for my subscription.',
  questions: {
    refund: {
      type: 'noul',
      instructions: 'Is the customer asking for money back?',
    },
  },
});
```

#### Python

```python filename="systemone.py"
import os
import requests

response = requests.post(
    "https://ai-gateway.vercel.sh/typesafe/v1/systemone",
    headers={
        "Authorization": f"Bearer {os.environ['AI_GATEWAY_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "model": "typesafe-ai/jev",
        "state": "I was charged twice for my subscription.",
        "questions": {
            "refund": {
                "type": "noul",
                "instructions": "Is the customer asking for money back?",
            }
        },
    },
)

print(response.json()["answers"])
```

The response uses TypeSafe's field names:

```json
{
  "model": "typesafe-ai/jev",
  "answers": {
    "refund": { "type": "noul", "noul": 0.98 }
  },
  "usage": { "input_tokens": 275, "output_tokens": 20 },
  "provider_metadata": {
    "gateway": {
      "routing": {
        "originalModelId": "typesafe-ai/jev",
        "resolvedProvider": "typesafe-ai",
        "canonicalSlug": "typesafe-ai/jev",
        "finalProvider": "typesafe-ai"
      },
      "cost": "0.00001155",
      "marketCost": "0.00001155",
      "surchargeCost": "0",
      "gatewayCost": "0.00001155",
      "generationId": "gen_..."
    }
  }
}
```

## Decision fallbacks

Decision fallbacks are an AI Gateway extension to the TypeSafe request. Add one conditional object to `providerOptions.gateway.models` to rerun a successful but uncertain decision with another model.

The official TypeSafe SDK forwards additional request properties at runtime, but its request type does not currently include `providerOptions`. Supply the extension through an intermediate object:

```typescript filename="typesafe-decision-fallback.ts" {21-30}
import { TypeSafeClient } from '@typesafe-ai/sdk';

const client = new TypeSafeClient({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/typesafe',
});

const request = {
  model: 'typesafe-ai/jev',
  state: 'I was charged twice and cannot sign in.',
  questions: {
    intent: {
      type: 'choice' as const,
      instructions: 'Which team should handle this?',
      criteria: {
        billing: 'Charges and refunds',
        account: 'Sign-in and account access',
      },
    },
  },
  providerOptions: {
    gateway: {
      models: [
        {
          model: 'openai/gpt-6-astra',
          when: { question: 'intent', confidenceBelow: 0.6 },
        },
      ],
    },
  },
};

const result = await client.systemOne(request);
```

> **💡 Note:** If a language model returns the final Choice or Score answer, `confidence: 0`
> and `probabilities: {}` mean those values are unavailable. They do not mean
> the model measured zero confidence. Native decision-model fallbacks preserve
> native confidence and probabilities.

Noul returns the fallback model's final `P(true)` normally. The response's top-level `model` echoes the model ID you requested when the primary answered, and names the fallback model whenever a fallback answered. AI Gateway routing metadata lists each model attempt and marks the one your condition triggered. Triggered requests bill both stages and report their combined usage.

When a condition matches, the response also carries these headers, listed in `Access-Control-Expose-Headers` so browser clients can read them:

| Header | Value |
| --- | --- |
| `x-ai-gateway-decision-fallback-triggered` | `true` |
| `x-ai-gateway-decision-fallback-final-model` | The model that produced the returned answers |
| `x-ai-gateway-decision-fallback-primary-model` | The primary model whose answers matched the condition |
| `x-ai-gateway-decision-fallback-triggering-questions` | A percent-encoded JSON array of the question IDs that matched. Read it with `JSON.parse(decodeURIComponent(value))` |
| `x-ai-gateway-decision-fallback-triggering-questions-truncated` | `true` when the question list was cut short. `provider_metadata.gateway.routing` has the full list |

AI Gateway omits these headers when the condition doesn't match. Use them to detect a fallback when your client only reads TypeSafe's typed response fields.

AI Gateway also sends the deprecated `x-ai-gateway-evaluation-fallback-*` headers with identical values. Read the `x-ai-gateway-decision-fallback-*` headers in new code.

See [Decision Fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks#use-the-typesafe-compatible-api) for Boolean probability conditions, compound policies, virtual models, the complete sentinel response, and two-stage cost and latency.

## Errors

Errors use TypeSafe's shape, with a machine-readable code alongside the message:

```json
{
  "message": "questions.refund.type: expected one of 'noul', 'choice', 'score'",
  "error_type": "invalid_request"
}
```

Errors returned by the model provider are passed through unchanged, so a client that already handles TypeSafe errors keeps working.

## Related

- [Decision](/docs/ai-gateway/modalities/decision) for the HTTP API and the AI SDK
- [Decision Fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks) for successful-response escalation
- Learn how to [classify, route, and score with Jev and AI SDK](/kb/guide/typesafe-jev-and-ai-sdk) and [route form submissions](/kb/guide/jev-ai-sdk-form-router)
- Learn how to [automatically approve tool calls in eve with Jev](/kb/guide/auto-approve-tool-calls-eve-jev)
- [Models and providers](/docs/ai-gateway/models-and-providers) for the full catalog


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
