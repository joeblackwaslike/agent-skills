---
title: Model Fallbacks
product: vercel
url: /docs/ai-gateway/models-and-providers/model-fallbacks
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
  - /docs/ai-gateway/models-and-providers/provider-options
summary: Configure model-level failover to try backup models when the primary model is unavailable
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "65774ffffaa3a871212c535b2132e55ccac38168d20e989c7d719e074e19dcb5"
---

# Model Fallbacks

You can configure model failover to specify backups that are tried in order if the primary model fails or is unavailable.

## Using the `models` option

Add a `models` array to `providerOptions.gateway` to list fallback models. The same option works across every AI Gateway API format. Select your API below:

#### AI SDK

```typescript filename="app/api/chat/route.ts" {11}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-fable-5', // Primary model
    prompt,
    providerOptions: {
      gateway: {
        models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'], // Fallback models
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### Chat Completions

```typescript filename="chat-completions.ts" {14}
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-fable-5', // Primary model
  messages: [{ role: 'user', content: 'Write a haiku about TypeScript.' }],
  // @ts-expect-error - providerOptions is a gateway extension
  providerOptions: {
    gateway: {
      models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'], // Fallback models
    },
  },
});

console.log('Model used:', completion.model);
```

#### Messages API

```typescript filename="messages.ts" {15}
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-fable-5', // Primary model
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Write a haiku about TypeScript.' }],
  // @ts-expect-error - providerOptions is a gateway extension
  providerOptions: {
    gateway: {
      models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'], // Fallback models
    },
  },
});

console.log('Model used:', message.model);
```

#### OpenAI Responses

```typescript filename="responses.ts" {14}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-fable-5', // Primary model
  input: 'Write a haiku about TypeScript.',
  // @ts-expect-error - providerOptions is a gateway extension
  providerOptions: {
    gateway: {
      models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'], // Fallback models
    },
  },
});

console.log('Model used:', response.model);
```

#### OpenResponses

```typescript filename="openresponses.ts" {18}
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-fable-5', // Primary model
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Write a haiku about TypeScript.',
      },
    ],
    providerOptions: {
      gateway: {
        models: ['anthropic/claude-opus-5', 'google/gemini-3.1-pro-preview'], // Fallback models
      },
    },
  }),
});
```

In each example:

- The gateway first attempts the primary model (`anthropic/claude-fable-5`)
- If that fails, it tries `anthropic/claude-opus-5`
- If that also fails, it tries `google/gemini-3.1-pro-preview`
- The response comes from the first model that succeeds

> **💡 Note:** Because the `providerOptions.gateway` fields aren't part of the OpenAI or
> Anthropic SDK types, TypeScript needs a `// @ts-expect-error` comment above the
> option. In Python, pass the same object through the SDK's `extra_body`
> parameter. The Chat Completions API also accepts a top-level `models` shorthand.
> See [Chat Completions advanced
> configuration](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced#model-fallbacks)
> for Python examples and both approaches.

## Combining with provider routing

You can use `models` together with `order` to control both model failover and provider preference:

```typescript filename="app/api/chat/route.ts" {12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-5.6-sol',
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

1. Tries `openai/gpt-5.6-sol` via Azure, then OpenAI
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

When model fallbacks occur, the `modelAttempts` array in the provider metadata shows each model that was tried. Each attempt carries two identifiers: `canonicalSlug` is AI Gateway's normalized model name (always `creator/model-name`), while `modelId` is the provider's own internal ID for that model on that provider (`provider:model`). These look similar but are not the same — the same `canonicalSlug` can be tried via several providers, each reporting its own `modelId`. Failed models include error details in their `providerAttempts`, while the successful model includes its provider attempt details:

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
    "modelId": "anthropic:claude-opus-4-8",
    "canonicalSlug": "anthropic/claude-opus-5",
    "success": true,
    "providerAttemptCount": 1,
    "providerAttempts": [
      {
        "attemptNumber": 1,
        "provider": "anthropic",
        "modelId": "anthropic:claude-opus-4-8",
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
