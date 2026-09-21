---
title: AI Gateway Model Filtering
product: vercel
url: /docs/ai-gateway/models-and-providers/model-filtering
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/model-filtering"
last_updated: 2026-09-17
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/models-and-providers/automatic-caching
summary: Restrict AI Gateway routing to models that have specific capabilities using the has option.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/model-filtering.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "7d9360e1eec541b0d9f8f43de2ea1254a834ebe1b2b761f7c44fadd1fb7fdc38"
---

# AI Gateway Model Filtering

[Provider filtering, ordering, and sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) controls *which providers* serve a request. Model filtering instead constrains routing by a capability of the *model itself* using `has` in `providerOptions.gateway`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Model fallbacks now available in Vercel AI Gateway](https://vercel.com/changelog/model-fallbacks-now-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related)
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related)
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [OpenAI Chat Completions Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching through AI Gateway.
- [AI Gateway Model Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=related) — Configure AI Gateway model fallbacks to try backup models when the primary model is unavailable. Set fallback order and

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/model-filtering.graph.md](/docs/ai-gateway/models-and-providers/model-filtering.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fmodel-filtering&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Require model capabilities with `has`

Use the `has` array to restrict routing to provider models that have all of the given capabilities. Because a capability is a property of the model rather than the credential, this filter applies to both system and [BYOK](/docs/ai-gateway/authentication-and-byok) credentials.

The following capabilities are supported:

| Capability         | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `free` | Models with free inference |
| `implicit-caching` | Models that perform automatic (implicit) prompt caching |
| `vision` | Models that accept image input |

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

See the [AI SDK capability-filtering reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#filtering-by-model-capability) for SDK configuration and usage.

```typescript filename="model-filtering.ts" {8}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'deepseek/deepseek-v4-flash',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      has: ['implicit-caching'],
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="model-filtering_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("deepseek/deepseek-v4-flash")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"has": ["implicit-caching"]}}}
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

```typescript filename="model-filtering-chat.ts" {20}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'deepseek/deepseek-v4-flash',
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
        has: ['implicit-caching'],
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="model-filtering_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="deepseek/deepseek-v4-flash",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"has": ["implicit-caching"]}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="model-filtering-chat.sh" {14-16}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "deepseek/deepseek-v4-flash",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "has": [
        "implicit-caching"
      ]
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="model-filtering-messages.ts" {20}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'deepseek/deepseek-v4-flash',
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
        has: ['implicit-caching'],
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="model-filtering_messages.py" {13}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="deepseek/deepseek-v4-flash",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"has": ["implicit-caching"]}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="model-filtering-messages.sh" {16-18}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "deepseek/deepseek-v4-flash",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "has": [
        "implicit-caching"
      ]
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="model-filtering-responses.ts" {14}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'deepseek/deepseek-v4-flash',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        has: ['implicit-caching'],
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="model-filtering_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="deepseek/deepseek-v4-flash",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"has": ["implicit-caching"]}}},
)

print(response.output_text)
```

#### cURL

```bash filename="model-filtering-responses.sh" {9-11}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "deepseek/deepseek-v4-flash",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "has": [
        "implicit-caching"
      ]
    }
  }
}'
```

In this example:

- **Restriction**: Only provider models with the `implicit-caching` capability are eligible for routing and fallbacks. The filter applies to both system and BYOK credentials.
- **All capabilities required**: When you list more than one capability, a model must have every one to be eligible.
- **Error on mismatch**: If no provider model for the requested model has the capabilities, the request fails. Unsupported values are rejected.

> **💡 Note:** `has: ['implicit-caching']` ensures you only route to models that cache
> automatically. To instead let AI Gateway add cache markers for providers that
> require explicit caching, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).

## Combining with provider filtering

`has` composes with the provider-level [`order`, `only`, and `sort`](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) options. The model-capability filter and the provider filters are both applied, so the request is routed only to providers that satisfy your provider constraints *and* whose model has the required capabilities.

## Quick reference

| Option | Type                        | Description                                                       |
| ------ | --------------------------- | ---------------------------------------------------------------- |
| `has`  | `Array<'implicit-caching'>` | Restrict routing to models that have all of the given capabilities |

Set `has` under `providerOptions.gateway` in every request format shown above. OpenAI and Anthropic Python clients pass that object through `extra_body`; TypeScript clients spread the Gateway extension into the request. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences).


---

[View full sitemap](/docs/sitemap)
