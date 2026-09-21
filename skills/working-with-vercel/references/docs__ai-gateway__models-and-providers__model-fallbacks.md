---
title: AI Gateway Model Fallbacks
product: vercel
url: /docs/ai-gateway/models-and-providers/model-fallbacks
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks"
last_updated: 2026-09-10
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/observability-and-spend/logs
summary: Configure AI Gateway model fallbacks to try backup models when the primary model is unavailable. Set fallback order and combine it with provider...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "38fc85106bd5ed9ac876204b9f45ab7b0809610a6dfa3738e6e23765c360adeb"
---

# AI Gateway Model Fallbacks

You can configure model failover to specify backups that are tried in order if the primary model fails or is unavailable.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related)
- [Claude Fable 5.1 now available on AI Gateway](https://vercel.com/changelog/claude-fable-5-1-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related)
- [Claude Fable 5 access restored on AI Gateway](https://vercel.com/changelog/claude-fable-5-access-restored-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related)
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Model fallbacks now available in Vercel AI Gateway](https://vercel.com/changelog/model-fallbacks-now-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related)
- [Provider & Model Management](https://ai-sdk.dev/docs/ai-sdk-core/provider-management?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related)
- [TanStack AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the official adapter to authenticate requests and stream responses from AI
- [AI Gateway Video Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/video-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related) — Analyze video clips with AI Gateway using AI SDK 7, Python, Chat Completions, and Responses / OpenResponses.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/model-fallbacks.graph.md](/docs/ai-gateway/models-and-providers/model-fallbacks.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-fallbacks&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Using the `models` option

Add a `models` array to `providerOptions.gateway` to list fallback models. The same option works across every AI Gateway API format. Select your API below:

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

See the [AI SDK model-fallback reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#model-fallbacks-example) for SDK configuration and usage.

```typescript filename="model-fallbacks.ts" {8}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-fable-5',
  prompt: 'Write a haiku about TypeScript.',
  providerOptions: {
    gateway: {
      models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'],
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="model-fallbacks_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-fable-5")
    messages = [ai.user_message("Write a haiku about TypeScript.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"models": ["anthropic/claude-opus-5", "google/gemini-3.1-pro-preview"]}}}
    )
    async with ai.stream(model, messages, params=params) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="model-fallbacks-chat.ts" {20}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-fable-5',
  messages: [
    {
      role: 'user',
      content: 'Write a haiku about TypeScript.',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'],
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="model-fallbacks_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-fable-5",
    messages=[{"role": "user", "content": "Write a haiku about TypeScript."}],
    extra_body={"providerOptions": {"gateway": {"models": ["anthropic/claude-opus-5", "google/gemini-3.1-pro-preview"]}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="model-fallbacks-chat.sh" {14-17}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-fable-5",
  "messages": [
    {
      "role": "user",
      "content": "Write a haiku about TypeScript."
    }
  ],
  "providerOptions": {
    "gateway": {
      "models": [
        "anthropic/claude-opus-5",
        "google/gemini-3.1-pro-preview"
      ]
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="model-fallbacks-messages.ts" {20}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'anthropic/claude-fable-5',
  messages: [
    {
      role: 'user',
      content: 'Write a haiku about TypeScript.',
    },
  ],
  max_tokens: 1024,
  ...{
    providerOptions: {
      gateway: {
        models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'],
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="model-fallbacks_messages.py" {13}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-fable-5",
    messages=[{"role": "user", "content": "Write a haiku about TypeScript."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"models": ["anthropic/claude-opus-5", "google/gemini-3.1-pro-preview"]}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="model-fallbacks-messages.sh" {16-19}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-fable-5",
  "messages": [
    {
      "role": "user",
      "content": "Write a haiku about TypeScript."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "models": [
        "anthropic/claude-opus-5",
        "google/gemini-3.1-pro-preview"
      ]
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="model-fallbacks-responses.ts" {14}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-fable-5',
  input: 'Write a haiku about TypeScript.',
  ...{
    providerOptions: {
      gateway: {
        models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'],
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="model-fallbacks_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-fable-5",
    input="Write a haiku about TypeScript.",
    extra_body={"providerOptions": {"gateway": {"models": ["anthropic/claude-opus-5", "google/gemini-3.1-pro-preview"]}}},
)

print(response.output_text)
```

#### cURL

```bash filename="model-fallbacks-responses.sh" {9-12}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-fable-5",
  "input": "Write a haiku about TypeScript.",
  "providerOptions": {
    "gateway": {
      "models": [
        "anthropic/claude-opus-5",
        "google/gemini-3.1-pro-preview"
      ]
    }
  }
}'
```

## Combining with provider routing

You can use `models` together with `order` to control both model failover and provider preference:

```typescript filename="app/api/chat/route.ts" {11-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt,
    providerOptions: {
      gateway: {
        models: ['openai/gpt-5.4-nano', 'anthropic/claude-opus-5'],
        order: ['azure', 'openai'], // Provider preference for each model
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

This configuration:

1. Tries `openai/gpt-6-astra` via Azure, then OpenAI
2. If both fail, tries `openai/gpt-5.4-nano` via Azure first, then OpenAI
3. If those fail, it tries `anthropic/claude-opus-5` via available providers

The `models` and `order` fields both live under `providerOptions.gateway`, so you can combine them the same way in the Chat Completions, Messages, OpenAI Responses, and OpenResponses APIs. For all available routing fields, see [Provider Options](/docs/ai-gateway/models-and-providers/provider-options).

## How failover works

When processing a request with model fallbacks:

1. The gateway routes the request to the primary model (the `model` parameter)
2. For each model, provider routing rules apply (using `order` or `only` if specified)
3. If all providers for a model fail, the gateway tries the next model in the `models` array
4. The response comes from the first successful model/provider combination

### Example provider metadata with model fallbacks

The Python beta can omit routing details from its normalized message metadata. To confirm which model served a request, inspect the raw AI Gateway response or the [request logs](/docs/ai-gateway/observability-and-spend/logs).

When model fallbacks occur, the `modelAttempts` array in the provider metadata shows each model that was tried. Each attempt carries two identifiers: `canonicalSlug` is AI Gateway's normalized model name (always `creator/model-name`), while `modelId` is the provider's own internal ID for that model on that provider (`provider:model`). These identifiers differ. The same `canonicalSlug` can be tried via several providers, each reporting its own `modelId`. Failed models include error details in their `providerAttempts`, while the successful model includes its provider attempt details:

```json
"modelAttempts": [
  {
    "modelId": "vertex:gemini-3.1-pro-preview",
    "canonicalSlug": "google/gemini-3.1-pro-preview",
    "success": false,
    "providerAttemptCount": 2,
    "providerAttempts": [
      {
        "attemptNumber": 1,
        "provider": "vertex",
        "modelId": "vertex:gemini-3.1-pro-preview",
        "success": false,
        "credentialType": "system",
        "responseTimeMs": 15679.64,
        "error": "Internal error encountered.",
        "statusCode": 500
      },
      {
        "attemptNumber": 2,
        "provider": "google",
        "modelId": "google:gemini-3.1-pro-preview",
        "success": false,
        "credentialType": "system",
        "responseTimeMs": 284.30,
        "error": "Internal error encountered.",
        "statusCode": 500
      }
    ]
  },
  {
    "modelId": "anthropic:claude-opus-5",
    "canonicalSlug": "anthropic/claude-opus-5",
    "success": true,
    "providerAttemptCount": 1,
    "providerAttempts": [
      {
        "attemptNumber": 1,
        "provider": "anthropic",
        "modelId": "anthropic:claude-opus-5",
        "success": true,
        "credentialType": "system",
        "statusCode": 200,
        "responseTimeMs": 4521.78,
        "providerResponseId": "msg_01ABCDEFGhJKLmnOpQrStUv"
      }
    ]
  }
]
```

> **💡 Note:** Failover happens automatically. To see which model and provider served your
> request, check the [provider
> metadata](/docs/ai-gateway/models-and-providers/provider-options#example-provider-metadata-output).


---

[View full sitemap](/docs/sitemap)
