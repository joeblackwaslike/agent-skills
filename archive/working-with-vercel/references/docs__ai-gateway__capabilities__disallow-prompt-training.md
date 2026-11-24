---
title: Disallow Prompt Training
product: vercel
url: /docs/ai-gateway/capabilities/disallow-prompt-training
canonical_url: "https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training"
last_updated: 2026-04-30
type: integration
prerequisites:
  - /docs/ai-gateway/capabilities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/capabilities/zdr
  - /docs/ai-gateway/byok
summary: Learn how to prevent AI providers from using your prompts and responses for model training through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "ae3f061b185a2660b77f78fa318f5a9ff3f06efc13b768df848f7bfbd1cf45de"
---

# Disallow Prompt Training

No training on prompt data is available to all AI Gateway users at no extra charge. This feature ensures your prompts are not used by AI providers to train their models. Set `disallowPromptTraining: true` in `providerOptions` to ensure requests are only routed to providers that do not use your data for training.

Disallow prompt training is a subset of [Zero Data Retention (ZDR)](/docs/ai-gateway/capabilities/zdr). All ZDR-compliant providers also disallow prompt training, but not all providers that disallow prompt training offer full zero data retention.

> **💡 Note:** Disallow prompt training enforcement does not apply to [BYOK (Bring Your Own
> Key)](/docs/ai-gateway/byok) requests. When you use BYOK, this filter is not
> enforced since the request uses your own API key, your
> configuration, and agreement with the provider. However, if AI Gateway falls
> back to AI Gateway system credentials, the disallow prompt training
> filter is honored on the failover request.

## Vercel

AI Gateway does not use your prompts or responses for training purposes. Your data is processed solely to fulfill your requests and is not retained for model improvement.

## Providers

AI Gateway has agreements in place with specific providers regarding the use of prompt data for training. A provider's default policy may not match with the status that AI Gateway has in place due to these agreements.

By default, AI Gateway does not route based on the training data policy of providers.

> **💡 Note:** If we do not know a provider's training data stance or have not yet
> established an agreement with them, we assume that they train on your data. If
> disallow prompt training is enabled on a request, it will not be routed
> through that provider.

## Disallow prompt training per request

Set `disallowPromptTraining` to `true` in `providerOptions` to ensure requests are only routed to providers that do not use your data for training. If you are looking for stricter controls that apply for all requests without configuration each time, see [team-wide zero data retention](/docs/ai-gateway/capabilities/zdr#team-wide-zero-data-retention).

If no compliant providers are available for the requested model, the request fails with an error:

```json
{
  "error": "No providers available that disallow prompt training for model: example/model-name. \
            Providers considered: provider-a, provider-b",
  "type": "no_providers_available",
  "statusCode": 400
}
```

This filter also applies to any fallback providers.

This enforcement does not apply to [BYOK](/docs/ai-gateway/byok) requests since those use your own API key, configuration, and agreement with the provider. If AI Gateway falls back to AI Gateway system credentials, it honors the disallow prompt training filter on the failover request.

### Using AI SDK

Set `disallowPromptTraining` to `true` in `providerOptions`:

#### streamText

```typescript filename="disallow-prompt-training.ts" {8-12}
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { streamText } from 'ai';

export async function POST(request: Request) {
  const result = streamText({
    model: 'zai/glm-4.7',
    prompt: 'Analyze this proprietary business strategy.',
    providerOptions: {
      gateway: {
        disallowPromptTraining: true,
      } satisfies GatewayProviderOptions,
    },
  });

  return result.toDataStreamResponse();
}
```

#### generateText

```typescript filename="disallow-prompt-training.ts" {8-12}
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { generateText } from 'ai';

export async function POST(request: Request) {
  const { text } = await generateText({
    model: 'zai/glm-4.7',
    prompt: 'Analyze this proprietary business strategy.',
    providerOptions: {
      gateway: {
        disallowPromptTraining: true,
      } satisfies GatewayProviderOptions,
    },
  });

  return Response.json({ text });
}
```

### Using the Chat Completions API

Set `disallowPromptTraining` to `true` in `providerOptions`:

#### TypeScript

```typescript filename="disallow-prompt-training.ts" {18-22}
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'zai/glm-4.7',
  messages: [
    {
      role: 'user',
      content: 'Analyze this proprietary business strategy.',
    },
  ],
  providerOptions: {
    gateway: {
      disallowPromptTraining: true,
    },
  },
});
```

#### Python

```python filename="disallow-prompt-training.py" {17-21}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

completion = client.chat.completions.create(
    model="zai/glm-4.7",
    messages=[
        {
            "role": "user",
            "content": "Analyze this proprietary business strategy.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {"disallowPromptTraining": True}
        }
    },
)
```

### Using the Responses API

Set `disallowPromptTraining` to `true` in `providerOptions`:

#### TypeScript

```typescript filename="disallow-prompt-training.ts" {18-22}
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'zai/glm-4.7',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Analyze this proprietary business strategy.',
      },
    ],
    providerOptions: {
      gateway: {
        disallowPromptTraining: true,
      },
    },
  }),
});
```

#### Python

```python filename="disallow-prompt-training.py" {17-21}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="zai/glm-4.7",
    input=[
        {
            "role": "user",
            "content": "Analyze this proprietary business strategy.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {"disallowPromptTraining": True}
        }
    },
)
```

### Using the Anthropic Messages API

Set `disallowPromptTraining` to `true` in `providerOptions`:

#### TypeScript

```typescript filename="disallow-prompt-training.ts" {19-23}
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-4.6',
  messages: [
    {
      role: 'user',
      content: 'Analyze this proprietary business strategy.',
    },
  ],
  // @ts-expect-error -- providerOptions is not in the Anthropic SDK types
  providerOptions: {
    gateway: {
      disallowPromptTraining: true,
    },
  },
});
```

#### Python

```python filename="disallow-prompt-training.py" {17-21}
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh",
)

message = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    messages=[
        {
            "role": "user",
            "content": "Analyze this proprietary business strategy.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {"disallowPromptTraining": True}
        }
    },
)
```

### Using the OpenResponses API

Set `disallowPromptTraining` to `true` in `providerOptions`:

#### TypeScript

```typescript filename="disallow-prompt-training.ts" {18-22}
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'zai/glm-4.7',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Analyze this proprietary business strategy.',
      },
    ],
    providerOptions: {
      gateway: {
        disallowPromptTraining: true,
      },
    },
  }),
});
```

#### Python

```python filename="disallow-prompt-training.py" {17-21}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="zai/glm-4.7",
    input=[
        {
            "role": "user",
            "content": "Analyze this proprietary business strategy.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {"disallowPromptTraining": True}
        }
    },
)
```

## Combining filters

Disallow prompt training works alongside other filtering options like [Zero Data Retention (ZDR)](/docs/ai-gateway/capabilities/zdr). When multiple filters are enabled, they work as an AND: requests are only routed to providers that satisfy all enabled filters.

For example, if you enable both disallow prompt training and ZDR on a request, that request will only be routed to providers that meet both criteria.

## Disallow prompt training providers

The following providers currently support no training on prompt data on AI Gateway. Please review each provider's policy and terms carefully. A provider's default policy may not match with the status that AI Gateway has in place due to negotiated agreements. We are constantly coordinating and revising agreements to be able to enforce stricter training policies for customers. The full terms of service are available for each provider on the model pages.


---

[View full sitemap](/docs/sitemap)
