---
title: OpenAI-Compatible Decisions API with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-decisions
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-decisions"
last_updated: 2026-10-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/decision
  - /docs/ai-gateway/models-and-providers/decision-fallbacks
  - /docs/ai-gateway/security-and-compliance/safety-identifiers
summary: Ask predicate, choice, and score questions with the OpenAI-compatible /decisions endpoint through Vercel AI Gateway, using any decision model.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-decisions.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "bb66b5c7929992a5fefdebea267fb0487e5951e6b3392acd340c5ba32b12852a"
---

# OpenAI-Compatible Decisions API with AI Gateway

Ask typed questions about shared input and get back probabilities, choices, and scores using the OpenAI-compatible `/decisions` endpoint. It implements the same request and response shapes as the [OpenAI Decisions API](https://developers.openai.com/api/reference/resources/decisions/methods/create), so the OpenAI SDKs work with only a base URL change.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microsoft Decision-1 now available on AI Gateway](https://vercel.com/changelog/microsoft-decision-1-now-available-on-ai-gateway)
- [OpenAI Decisions API now available on AI Gateway](https://vercel.com/changelog/openai-decisions-api-now-available-on-ai-gateway)
- [Perplexity's Decider V1.2 models now available on AI Gateway](https://vercel.com/changelog/perplexity-decider-v1-2-models-now-available-on-ai-gateway)
- [Decisions](https://ai-sdk.dev/docs/ai-sdk-core/decisions) — Decide answers to Choice, Score, and Boolean questions against shared state.
- [TypeSafe API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe) — Point an existing TypeSafe client at AI Gateway by changing its base URL to route System One decision requests through i
- [OpenResponses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-decisions.graph.md](/docs/ai-gateway/sdks-and-apis/openai-decisions.graph.md)
<!-- /docsgraph:related -->

Any [decision model](/ai-gateway/models?capabilities=decision) on AI Gateway can answer, not just OpenAI's. For an overview of decision models and the AI SDK `decide` function, see [Decision](/docs/ai-gateway/modalities/decision). This page covers the OpenAI-compatible REST endpoint.

## Base URL

The Decisions API is available at the following base URL:

```
https://ai-gateway.vercel.sh/v1
```

## Authentication

The Decisions API supports the same authentication methods as the main AI Gateway:

- **API key**: Use your AI Gateway API key with the `Authorization: Bearer <token>` header
- **OIDC token**: Use your Vercel OIDC token with the `Authorization: Bearer <token>` header

You only need one of these. If an API key is specified it takes precedence over any OIDC token, even if the API key is invalid.

## Endpoint

```
POST /decisions
```

## Example request

#### TypeScript

```typescript filename="decisions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const decision = await openai.decisions.create({
  model: 'openai/gpt-6-luna-decisions',
  input: 'The package arrived with a broken screen. I want my money back.',
  questions: [
    {
      type: 'predicate',
      name: 'damaged',
      instructions: 'Does the customer report a damaged item?',
    },
    {
      type: 'choice',
      name: 'queue',
      instructions: 'Which team should handle this ticket?',
      choices: [
        { value: 'billing', description: 'Refunds and payments' },
        { value: 'shipping', description: 'Delivery and damaged items' },
      ],
    },
    {
      type: 'score',
      name: 'urgency',
      instructions: 'How urgent is this ticket?',
      levels: [{ label: 'low' }, { label: 'medium' }, { label: 'high' }],
    },
  ],
});

console.log(decision.answers);
```

#### Python

```python filename="decisions.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

decision = client.decisions.create(
    model="openai/gpt-6-luna-decisions",
    input="The package arrived with a broken screen. I want my money back.",
    questions=[
        {
            "type": "predicate",
            "name": "damaged",
            "instructions": "Does the customer report a damaged item?",
        },
        {
            "type": "choice",
            "name": "queue",
            "instructions": "Which team should handle this ticket?",
            "choices": [
                {"value": "billing", "description": "Refunds and payments"},
                {"value": "shipping", "description": "Delivery and damaged items"},
            ],
        },
        {
            "type": "score",
            "name": "urgency",
            "instructions": "How urgent is this ticket?",
            "levels": [{"label": "low"}, {"label": "medium"}, {"label": "high"}],
        },
    ],
)

print(decision.answers)
```

#### cURL

```bash filename="decisions.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/decisions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-luna-decisions",
    "input": "The package arrived with a broken screen. I want my money back.",
    "questions": [
      {
        "type": "predicate",
        "name": "damaged",
        "instructions": "Does the customer report a damaged item?"
      },
      {
        "type": "choice",
        "name": "queue",
        "instructions": "Which team should handle this ticket?",
        "choices": [
          { "value": "billing", "description": "Refunds and payments" },
          { "value": "shipping", "description": "Delivery and damaged items" }
        ]
      },
      {
        "type": "score",
        "name": "urgency",
        "instructions": "How urgent is this ticket?",
        "levels": [{ "label": "low" }, { "label": "medium" }, { "label": "high" }]
      }
    ]
  }'
```

## Response format

Answers come back in question order. The response also reports the model that answered, token usage, and AI Gateway routing and cost metadata:

```json
{
  "model": "openai/gpt-6-luna-decisions",
  "answers": [
    { "type": "predicate", "name": "damaged", "probability": 0.95 },
    {
      "type": "choice",
      "name": "queue",
      "choice": "shipping",
      "confidence": 0.81,
      "probabilities": [
        { "value": "billing", "probability": 0.19 },
        { "value": "shipping", "probability": 0.81 }
      ]
    },
    {
      "type": "score",
      "name": "urgency",
      "score": 1.3,
      "confidence": 0.62,
      "probabilities": [
        { "value": 0, "label": "low", "probability": 0.08 },
        { "value": 1, "label": "medium", "probability": 0.54 },
        { "value": 2, "label": "high", "probability": 0.38 }
      ]
    }
  ],
  "usage": { "input_tokens": 96, "output_tokens": 0, "total_tokens": 96 },
  "provider_metadata": {
    "gateway": {
      "routing": {
        "originalModelId": "openai/gpt-6-luna-decisions",
        "resolvedProvider": "openai",
        "canonicalSlug": "openai/gpt-6-luna-decisions",
        "finalProvider": "openai"
      },
      "cost": "0.0000096",
      "generationId": "gen_..."
    }
  }
}
```

A score is the probability-weighted average of the level indexes, starting at `0`. `confidence` and `probabilities` appear when the answering model returns them.

## Models

Set `model` to any decision model slug, such as `openai/gpt-6-luna-decisions` or `typesafe-ai/jev`. Use the **Decision** filter on the [AI Gateway Models page](/ai-gateway/models?capabilities=decision) to see them all.

## Input

`input` accepts a string, or an array of user messages. Each message's content is a string or an ordered list of `input_text` and `input_image` parts, and every question is asked against the whole input.

Images must be base64-encoded data URLs. External URLs and file IDs aren't supported, and a request can include at most 128 images. Set `detail` to `low`, `high`, `auto`, or `original` to choose an image's detail level:

```json
{
  "model": "openai/gpt-6-luna-decisions",
  "input": [
    {
      "role": "user",
      "content": [
        { "type": "input_text", "text": "Inspect the product in this photo." },
        {
          "type": "input_image",
          "image_url": "data:image/png;base64,iVBORw0KGgo...",
          "detail": "high"
        }
      ]
    }
  ],
  "questions": [
    {
      "type": "predicate",
      "name": "visible_damage",
      "instructions": "Does the product have visible damage?"
    }
  ]
}
```

Image input needs a decision model that accepts images, such as `openai/gpt-6-luna-decisions`. Models that only accept text, such as `typesafe-ai/jev`, return a `400` error for requests with images. If a request with images falls back to a language model, that model must support vision. See [decision fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks).

## Questions

Each question needs a `type` and `instructions`. `name` is optional, and an unnamed question comes back with `name: null`.

| Type        | Request fields                                                                      | Answer fields                           |
| ----------- | ----------------------------------------------------------------------------------- | --------------------------------------- |
| `predicate` | `instructions`                                                                      | `probability` that the answer is yes    |
| `choice`    | `instructions`, between 1 and 255 `choices` with a `value` and optional `description` | `choice`, `confidence`, `probabilities` |
| `score`     | `instructions`, between 2 and 10 `levels` with a `label` and optional `description` | `score`, `confidence`, `probabilities`  |

If the model declines to answer a question, its answer is `{ "type": "refusal", "name": ... }` in that question's position, and the other questions are answered normally. A request with refused questions is billed for its input like any other.

Question names must be unique within a request. Choice values can be strings or booleans, but a string and a boolean with the same text (such as `true` and `"true"`) can't both appear in one question.

## Provider options

`safety_identifier` maps to `providerOptions.gateway.safetyIdentifier`, the same as on Chat Completions. It must be non-empty, and values longer than 64 characters are truncated. See [Safety identifiers](/docs/ai-gateway/security-and-compliance/safety-identifiers) for which providers receive it and how precedence works.

The request body also accepts AI Gateway `providerOptions`, so you can require zero data retention, restrict providers, or add [decision fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks):

```json
{
  "model": "openai/gpt-6-luna-decisions",
  "input": "...",
  "questions": [{ "type": "predicate", "instructions": "..." }],
  "providerOptions": {
    "gateway": { "zeroDataRetention": true, "models": ["typesafe-ai/jev"] }
  }
}
```

With the OpenAI SDKs, `providerOptions` isn't part of the typed request. In Python, pass it through `extra_body`. In TypeScript, add it to the request object with a `// @ts-expect-error` comment on that line, and the SDK sends it in the body.

## Errors

Errors raised while validating the request use the OpenAI error format, and set `param` to the field that failed:

```json
{
  "error": {
    "message": "Images must be base64-encoded image data URLs. External URLs and file IDs are not supported.",
    "type": "invalid_request_error",
    "param": "input[0].content[1].image_url",
    "code": "invalid_request_error"
  }
}
```

Errors from routing, billing, or the model provider use AI Gateway's error format. They have the same `message` and `type` fields, and `param` can be an object with details such as the model ID.


---

[View full sitemap](/docs/sitemap)
