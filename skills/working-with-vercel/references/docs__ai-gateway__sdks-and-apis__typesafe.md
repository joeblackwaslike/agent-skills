---
title: TypeSafe API with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/typesafe
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/evaluation
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/models-and-providers
summary: Point an existing TypeSafe client at AI Gateway by changing its base URL to route System One evaluation requests through it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "6b955beab3b6e09dd0ff1e28ae09b0f9ede1b31061ab70527a9d07b20bff1af3"
---

# TypeSafe API with AI Gateway

Keep using the [TypeSafe SDK](https://docs.typesafe.ai/introduction) and route requests through AI Gateway by changing one setting.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [TypeSafe](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=related)
- [Evaluation](https://ai-sdk.dev/docs/ai-sdk-core/evaluation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=related)
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI Gateway Evaluation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/evaluation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=related) — Evaluate application state and return a typed boolean answer using AI Gateway.
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [OpenResponses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=related) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/typesafe.graph.md](/docs/ai-gateway/sdks-and-apis/typesafe.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Ftypesafe&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Requests are billed through AI Gateway and appear in your usage and observability alongside every other model you call.

If you are writing new code rather than migrating, use the [evaluation API](/docs/ai-gateway/modalities/evaluation) instead. It is the same capability without TypeSafe-specific naming.

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

- `POST /typesafe/v1/systemone` evaluates state against typed questions
- `GET /typesafe/v1/models` lists the evaluation models available to you

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

- [Evaluation](/docs/ai-gateway/modalities/evaluation) for the HTTP API and the AI SDK
- [Models and providers](/docs/ai-gateway/models-and-providers) for the full catalog


---

[View full sitemap](/docs/sitemap)
