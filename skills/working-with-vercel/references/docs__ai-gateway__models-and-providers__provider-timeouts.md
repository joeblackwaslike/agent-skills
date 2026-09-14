---
title: AI Gateway Provider Timeouts
product: vercel
url: /docs/ai-gateway/models-and-providers/provider-timeouts
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-timeouts"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/models-and-providers/provider-options
summary: Configure AI Gateway timeouts for BYOK providers. Fail over to the next provider when a request takes too long to start streaming.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-timeouts.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "3c3e0e3c446de42b2a0128d073aad630eef2a5c3528301dbbcc70a70b99a2df0"
---

# AI Gateway Provider Timeouts

You can set per-provider timeouts to trigger fast failover when a provider is slow to respond. If a provider doesn't start responding within the configured timeout, AI Gateway aborts the request and falls back to the next available provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=related)
- [Customize timeouts for faster automatic failover on Vercel AI Gateway](https://vercel.com/changelog/provider-level-custom-timeouts-for-faster-fail-over-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=related)
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=related)
- [OpenAI Chat Completions Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching through AI Gateway.
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [AI Gateway Model Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=related) — Configure AI Gateway model fallbacks to try backup models when the primary model is unavailable. Set fallback order and
- [AI Gateway Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/provider-timeouts.graph.md](/docs/ai-gateway/models-and-providers/provider-timeouts.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fprovider-timeouts&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Use this for latency-sensitive applications where fast failover beats waiting for a slow provider.

> **💡 Note:** Provider timeouts apply to BYOK (Bring Your Own Key) credentials only. Some
> providers don't support stream cancellation, so you may still be charged for
> timed-out requests depending on the provider.

## Set provider timeouts

Use the `providerTimeouts` option in `providerOptions.gateway` to configure timeouts per provider. Values are in milliseconds.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="provider-timeouts.ts" {8-12}
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-6-astra',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      providerTimeouts: {
        byok: {
          openai: 15000,
        },
      },
    },
  },
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

#### Python (beta)

```python filename="provider-timeouts_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("openai/gpt-6-astra")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"providerTimeouts": {"byok": {"openai": 15000}}}}}
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

```typescript filename="provider-timeouts-chat.ts" {20-24}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        providerTimeouts: {
          byok: {
            openai: 15000,
          },
        },
      },
    },
  },
  stream: true,
});

for await (const event of response) {
  process.stdout.write(event.choices[0]?.delta.content ?? '');
}
```

#### Python

```python filename="provider-timeouts_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-6-astra",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"providerTimeouts": {"byok": {"openai": 15000}}}}},
    stream=True,
)

for event in response:
    if event.choices:
        print(event.choices[0].delta.content or "", end="", flush=True)
```

#### cURL

```bash filename="provider-timeouts-chat.sh" {14-18}
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "openai/gpt-6-astra",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "providerTimeouts": {
        "byok": {
          "openai": 15000
        }
      }
    }
  },
  "stream": true
}'
```

#### Messages API

#### TypeScript

```typescript filename="provider-timeouts-messages.ts" {20-24}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  max_tokens: 1024,
  ...{
    providerOptions: {
      gateway: {
        providerTimeouts: {
          byok: {
            openai: 15000,
          },
        },
      },
    },
  },
  stream: true,
});

for await (const event of response) {
  if (
    event.type === 'content_block_delta' &&
    event.delta.type === 'text_delta'
  ) {
    process.stdout.write(event.delta.text);
  }
}
```

#### Python

```python filename="provider-timeouts_messages.py" {13}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="openai/gpt-6-astra",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"providerTimeouts": {"byok": {"openai": 15000}}}}},
    stream=True,
)

for event in response:
    if event.type == "content_block_delta" and event.delta.type == "text_delta":
        print(event.delta.text, end="", flush=True)
```

#### cURL

```bash filename="provider-timeouts-messages.sh" {16-20}
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "openai/gpt-6-astra",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "providerTimeouts": {
        "byok": {
          "openai": 15000
        }
      }
    }
  },
  "stream": true
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="provider-timeouts-responses.ts" {14-18}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        providerTimeouts: {
          byok: {
            openai: 15000,
          },
        },
      },
    },
  },
  stream: true,
});

for await (const event of response) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  }
}
```

#### Python

```python filename="provider-timeouts_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="openai/gpt-6-astra",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"providerTimeouts": {"byok": {"openai": 15000}}}}},
    stream=True,
)

for event in response:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
```

#### cURL

```bash filename="provider-timeouts-responses.sh" {9-13}
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "openai/gpt-6-astra",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "providerTimeouts": {
        "byok": {
          "openai": 15000
        }
      }
    }
  },
  "stream": true
}'
```

These examples set a 15-second timeout for requests using your OpenAI BYOK credentials. If that provider exceeds the timeout, AI Gateway aborts the attempt and tries the next available provider. Configure your [BYOK credentials](/docs/ai-gateway/authentication-and-byok/byok) before testing this behavior.

## Timeout limits

| Minimum      | Maximum             |
| ------------ | ------------------- |
| 1,000 milliseconds (1 second) | 789,000 milliseconds (about 13 minutes) |

> **💡 Note:** For streaming requests, AI Gateway clears the timeout when it receives the first
> stream chunk. For non-streaming requests, the timeout runs until the provider
> returns the complete response. All examples above use streaming requests.

## Combine with provider routing

Provider timeouts work with all other [provider options](/docs/ai-gateway/models-and-providers/provider-options). Combine them with `order` to control both the provider sequence and failover speed:

```typescript filename="app/api/chat/route.ts" {12-18}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5',
    prompt,
    providerOptions: {
      gateway: {
        order: ['anthropic', 'bedrock', 'vertex'],
        providerTimeouts: {
          byok: {
            anthropic: 10000,
            bedrock: 15000,
            // no timeout for vertex — uses the default gateway timeout
          },
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

This configuration:

1. Tries Anthropic first with a 10-second timeout
2. If Anthropic is slow, falls back to Bedrock with a 15-second timeout
3. If Bedrock is slow, falls back to Vertex with the default gateway timeout

## Check timeout behavior in response metadata

When a provider times out, the attempt metadata includes `providerTimeout` and `configuredTimeoutMs` fields so you can see exactly what happened. Check the `providerAttempts` within each `modelAttempts` entry:

```json
"modelAttempts": [
  {
    "modelId": "anthropic:claude-sonnet-5",
    "canonicalSlug": "anthropic/claude-sonnet-5",
    "success": true,
    "providerAttemptCount": 2,
    "providerAttempts": [
      {
        "provider": "anthropic",
        "credentialType": "byok",
        "success": false,
        "error": "PROVIDER_TIMEOUT",
        "providerTimeout": true,
        "configuredTimeoutMs": 10000
      },
      {
        "provider": "bedrock",
        "credentialType": "byok",
        "success": true,
        "statusCode": 200
      }
    ]
  }
]
```

For more details on reading provider metadata, see [Provider Options](/docs/ai-gateway/models-and-providers/provider-options#example-provider-metadata-output).


---

[View full sitemap](/docs/sitemap)
