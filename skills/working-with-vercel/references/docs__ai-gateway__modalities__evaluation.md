---
title: Evaluation
product: vercel
url: /docs/ai-gateway/modalities/evaluation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/evaluation"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/getting-started/evaluation
  - /docs/ai-gateway/sdks-and-apis/typesafe
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Evaluate shared state against typed questions and get back structured choices, scores, and boolean probabilities through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/evaluation.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "37b8ac38ffa8b9f98c2eae08ec44de83c8b43bd75a90737cd831ebed780d2a81"
---

# Evaluation

Evaluate a piece of shared state against typed questions and get structured answers back. Evaluation models return choices, scores, and boolean probabilities rather than free-form text, which makes them a fit for classification, routing, rubric-based assessment, and automated verification.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [TypeSafe AI's Jev now available on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related)
- [How to automatically approve tool calls in eve with Jev](https://vercel.com/kb/guide/auto-approve-tool-calls-eve-jev?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related) — Use Jev to review tool calls in eve, allow routine actions, and request human approval when needed. Configure the policy
- [How to classify, route, and score with Jev and AI SDK](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related) — Use Jev from TypeSafe AI with AI SDK's experimental \\`evaluate\\` API to classify, route, score, and verify inside your a
- [Evaluation](https://ai-sdk.dev/docs/ai-sdk-core/evaluation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related)
- [Automatic Model Selection](https://eve.dev/docs/guides/evaluate?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related) — Choose agent models automatically or evaluate typed questions in your tools and application code.
- [An Introduction to Evals](https://vercel.com/kb/guide/an-introduction-to-evals?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related) — Evaluations test model and agent outputs to ensure they meet the standards and requirements you specify.
- [Judge](https://eve.dev/docs/evals/judge?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related) — Grade evals with evaluation models using criteria, typed questions, or batches, and set thresholds on each assertion.
- [experimental_evaluate](https://ai-sdk.dev/docs/reference/ai-sdk-core/evaluate?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related)
- [TypeSafe](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related)
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [AI Gateway SDKs and APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=related) — Connect to AI Gateway with the AI SDK, Python, REST, or compatible OpenAI, Anthropic Messages, OpenResponses, and Cohere

Full cross-link map for this page: [/docs/ai-gateway/modalities/evaluation.graph.md](/docs/ai-gateway/modalities/evaluation.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fevaluation&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Several questions can be answered in parallel within a single request, against the same state.

To see which models AI Gateway supports for evaluation, use the **Evaluation** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=evaluation).

For a step-by-step setup, see the [Evaluation quickstart](/docs/ai-gateway/getting-started/evaluation).

> **💡 Note:** Through the AI SDK, evaluation requires AI SDK 7 or later. Evaluation is also
> available through the [HTTP API](#http-api) below and the
> [TypeSafe-compatible API](/docs/ai-gateway/sdks-and-apis/typesafe). It is not
> supported through the OpenAI-compatible, Anthropic-compatible, or
> Cohere-compatible endpoints.

## Basic usage

```typescript filename="app/api/evaluate/route.ts" {5-13}
import { experimental_evaluate as evaluate } from 'ai';

export async function GET() {
  const result = await evaluate({
    model: 'typesafe-ai/jev',
    state: 'The support agent issued a full refund to the customer.',
    questions: {
      refunded: {
        type: 'boolean',
        instructions: 'Was a refund issued?',
      },
    },
  });

  return Response.json(result.answers);
}
```

Each key in `questions` becomes a key in `answers`:

```typescript
// result.answers
{
  refunded: { type: 'boolean', probability: 0.99 }
}
```

## Question types

### Boolean

Returns a probability between 0 and 1. Supply `criteria` to define what the true and false cases mean.

```typescript
const result = await evaluate({
  model: 'typesafe-ai/jev',
  state: 'The build failed with exit code 1.',
  questions: {
    passed: {
      type: 'boolean',
      instructions: 'Did the build succeed?',
      criteria: {
        true: 'exit code 0',
        false: 'any non-zero exit code',
      },
    },
  },
});

// { passed: { type: 'boolean', probability: 0.01 } }
```

### Choice

Picks one option from a named set. `criteria` is a record of option names to descriptions, and the answer carries both the selected `choice` and the probability of each option.

```typescript
const result = await evaluate({
  model: 'typesafe-ai/jev',
  state: 'My card was charged twice for one order.',
  questions: {
    route: {
      type: 'choice',
      instructions: 'Route this support ticket.',
      criteria: {
        billing: 'payment or charge problems',
        shipping: 'delivery problems',
        technical: 'application bugs',
      },
    },
  },
});

// {
//   route: {
//     type: 'choice',
//     choice: 'billing',
//     probabilities: { billing: 1, shipping: 0, technical: 0 },
//   },
// }
```

### Score

Rates the state along an ordered scale. `criteria` is an array of at least two labels, ordered lowest to highest. The answer is an interpolated `score` plus the probability of each rung.

```typescript
const result = await evaluate({
  model: 'typesafe-ai/jev',
  state: 'The PR adds tests, updates docs, and has a clear description.',
  questions: {
    quality: {
      type: 'score',
      instructions: 'Rate the quality of this pull request.',
      criteria: [
        'poor: no tests or docs',
        'fair: partial coverage',
        'good: tests and docs',
        'excellent: tests, docs, and clear rationale',
      ],
    },
  },
});

// {
//   quality: {
//     type: 'score',
//     score: 2.97,
//     probabilities: { '0': 0, '1': 0, '2': 0.02, '3': 0.98 },
//   },
// }
```

## Multiple questions in one request

Questions of different types can share a single state, and are answered in one round trip.

```typescript filename="app/api/triage/route.ts" {7-24}
import { experimental_evaluate as evaluate } from 'ai';

export async function GET() {
  const result = await evaluate({
    model: 'typesafe-ai/jev',
    state: 'I cannot log in, and I also want a refund for last month.',
    questions: {
      authIssue: {
        type: 'boolean',
        instructions: 'Is there a login problem?',
      },
      wantsRefund: {
        type: 'boolean',
        instructions: 'Is a refund requested?',
      },
      urgency: {
        type: 'score',
        instructions: 'How urgent is this ticket?',
        criteria: ['low', 'medium', 'high'],
      },
    },
  });

  return Response.json(result.answers);
}
```

## Structured state

`state` accepts a string, an object, or an array, so you can pass structured records or a message history directly without serializing them yourself.

```typescript
const result = await evaluate({
  model: 'typesafe-ai/jev',
  state: {
    order: { id: 'A-1', total: 42.5, status: 'refunded' },
    agent: 'bot-7',
  },
  questions: {
    refunded: {
      type: 'boolean',
      instructions: 'Is the order refunded?',
    },
  },
});
```

## AI Gateway provider instance

When using an AI Gateway provider instance, specify evaluation models with `gateway.evaluationModel(...)`.

```typescript filename="app/api/evaluate/route.ts" {2,6}
import { experimental_evaluate as evaluate } from 'ai';
import { gateway } from '@ai-sdk/gateway';

export async function GET() {
  const result = await evaluate({
    model: gateway.evaluationModel('typesafe-ai/jev'),
    state: 'The support agent issued a full refund to the customer.',
    questions: {
      refunded: {
        type: 'boolean',
        instructions: 'Was a refund issued?',
      },
    },
  });

  return Response.json(result.answers);
}
```

## HTTP API

If you are not using the AI SDK, post to `/v1/evaluate` with the same `model`, `state`, and `questions` fields.

```bash filename="evaluate.sh"
curl https://ai-gateway.vercel.sh/v1/evaluate \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "typesafe-ai/jev",
    "state": "I was charged twice for my subscription.",
    "questions": {
      "refund": {
        "type": "boolean",
        "instructions": "Is the customer asking for money back?"
      }
    }
  }'
```

The response reports the model that ran, the answers, token usage, and AI Gateway routing and cost metadata:

```json
{
  "model": "typesafe-ai/jev",
  "answers": { "refund": { "type": "boolean", "probability": 0.98 } },
  "usage": { "inputTokens": 275, "outputTokens": 20 },
  "providerMetadata": {
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

Evaluation works with [BYOK](/docs/ai-gateway/authentication-and-byok/byok). If your team has added a key for the provider, it is used automatically.

### Provider options

`/v1/evaluate` accepts the same `providerOptions` as other AI Gateway endpoints, so you can require zero data retention or restrict which providers may serve the request:

```json
{
  "model": "typesafe-ai/jev",
  "state": "...",
  "questions": { "refund": { "type": "boolean", "instructions": "..." } },
  "providerOptions": {
    "gateway": { "zeroDataRetention": true, "only": ["typesafe-ai"] }
  }
}
```

> **💡 Note:** Already using TypeSafe? The [TypeSafe
> API](/docs/ai-gateway/sdks-and-apis/typesafe) accepts TypeSafe's own request
> and response shapes, so an existing client only needs its base URL changed.

## Usage and pricing

Evaluation requests report token usage like any other model, and are billed from the model's per-token rates. Check the [AI Gateway Models page](/ai-gateway/models?capabilities=evaluation) for the rates on a specific model, since some evaluation models price input tokens only.

```typescript
const result = await evaluate({
  model: 'typesafe-ai/jev',
  state: 'The support agent issued a full refund.',
  questions: {
    refunded: { type: 'boolean', instructions: 'Was a refund issued?' },
  },
});

console.log(result.usage);
// { inputTokens: 283, outputTokens: 21 }
```


---

[View full sitemap](/docs/sitemap)
