---
title: AI Gateway Amazon Bedrock Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/rest-api
summary: Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "ad90f14a8215f6ff2c5ecb405b0d3ce116aafd241f11692c71ba65bc8e90d27d"
---

# AI Gateway Amazon Bedrock Reasoning

Amazon Bedrock exposes Anthropic Claude reasoning through model-creator-specific provider options. Configuration depends on the model:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Famazon-bedrock&source_site=vercel-docs&relationship=related)
- [AI Gateway OpenAI Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Famazon-bedrock&source_site=vercel-docs&relationship=related) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
- [OpenAI Responses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Famazon-bedrock&source_site=vercel-docs&relationship=related) — Control how much a model thinks before answering with the OpenAI Responses API through AI Gateway.
- [OpenAI Chat Completions Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Famazon-bedrock&source_site=vercel-docs&relationship=related) — Control how much a model thinks before answering with the OpenAI Chat Completions API through AI Gateway.
- [OpenResponses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Famazon-bedrock&source_site=vercel-docs&relationship=related) — Control how much a reasoning model thinks before answering with the OpenResponses API through AI Gateway.
- [Anthropic Messages Extended Thinking with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Famazon-bedrock&source_site=vercel-docs&relationship=related) — Configure how much Claude thinks before answering, using the Anthropic Messages API thinking parameter through AI Gatewa

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock.graph.md](/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Freasoning%2Famazon-bedrock&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Adaptive reasoning**: Set `reasoningConfig: { type: 'adaptive', maxReasoningEffort }`. Available on Claude 4.6 and later. Required on Claude Opus 4.7 and later, where the legacy `type: 'enabled'` mode returns a 400 error.
- **Manual reasoning**: Set `reasoningConfig: { type: 'enabled', budgetTokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier (deprecated on 4.6, removed on Claude Opus 4.7 and later).

## Supported models

See the [AI SDK Amazon Bedrock provider reference](https://ai-sdk.dev/providers/ai-sdk-providers/amazon-bedrock) for supported reasoning options and response metadata.

Use [`GET /v1/models`](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) to discover a model's reasoning controls. Then use [model endpoints](/docs/ai-gateway/sdks-and-apis/rest-api#get-model-endpoints) or the [Bedrock model filter](/ai-gateway/models?capabilities=reasoning\&providers=bedrock) to check which models Bedrock serves. The model catalog's creator slug remains unchanged when you route through Bedrock.

Keep the adaptive and legacy request shapes above separate. Catalog metadata describes model controls; the serving provider can impose additional restrictions.

## Getting started

### Top-level reasoning option

The AI SDK 7 top-level [`reasoning` option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) works with Bedrock-hosted Claude models without provider-specific configuration. On Claude 4.6 and later it maps to adaptive reasoning at the corresponding effort level:

```typescript filename="top-level-reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'How many "r"s are in the word "strawberry"?',
  reasoning: 'high',
});

console.log(result.text);
```

This is especially useful with [provider fallbacks](/docs/ai-gateway/models-and-providers/reasoning#reasoning-with-provider-fallbacks): the same setting applies whether Anthropic, Bedrock, or Vertex serves the request. Use `providerOptions.bedrock` when you need an exact token budget on older models. If you set `reasoningConfig` in `providerOptions`, it takes precedence over the top-level `reasoning` value.

### Adaptive reasoning (Claude 4.6 and later)

```typescript filename="bedrock-adaptive.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-5',
  prompt: 'How many "r"s are in the word "strawberry"?',
  providerOptions: {
    bedrock: {
      reasoningConfig: { type: 'adaptive', maxReasoningEffort: 'max' },
    },
  },
});

console.log(result.reasoningText);
console.log(result.text);
```

### Manual reasoning (Claude 4.6 and earlier)

For pre-4.7 models, use `type: 'enabled'` with a `budgetTokens` value. This is the only reasoning mode supported on Claude 4.5 and earlier; on Claude 4.6 it works but is deprecated; on Claude Opus 4.7 and later it returns a 400 error.

```typescript filename="bedrock-manual.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.5',
  prompt: 'How many people will live in the world in 2040?',
  providerOptions: {
    bedrock: {
      reasoningConfig: { type: 'enabled', budgetTokens: 2048 },
    },
  },
});

console.log(result.reasoningText);
console.log(result.text);
```

### Other API formats

You can configure reasoning without the AI SDK through the gateway's [OpenAI-compatible endpoints](/docs/ai-gateway/models-and-providers/reasoning#reasoning-across-api-formats). Use `providerOptions.gateway.order` to route the request to Bedrock; AI Gateway maps the `reasoning` effort level to Bedrock's reasoning configuration:

#### TypeScript

```typescript filename="reasoning-chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'How many "r"s are in the word "strawberry"?',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    reasoning: {
      effort: 'high',
    },
  },
  ...{
    providerOptions: {
      gateway: {
        order: ['bedrock'],
      },
    },
  },
});

const message = completion.choices[0].message;
console.log(
  'Reasoning:',
  'reasoning' in message ? message.reasoning : undefined,
);
console.log('Answer:', completion.choices[0].message.content);
```

#### Python

```python filename="reasoning_chat_completions.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'How many "r"s are in the word "strawberry"?'
        }
    ],
    extra_body={
        'reasoning': {
            'effort': 'high'
        },
        'providerOptions': {
            'gateway': {
                'order': ['bedrock']
            }
        }
    }
)

print('Reasoning:', completion.choices[0].message.reasoning)
print('Answer:', completion.choices[0].message.content)
```

#### cURL

```bash filename="reasoning-chat-completions.sh"
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "How many \"r\"s are in the word \"strawberry\"?"
      }
    ],
    "reasoning": {
      "effort": "high"
    },
    "providerOptions": {
      "gateway": {
        "order": ["bedrock"]
      }
    }
  }'
```

## Parameters

### Adaptive reasoning (Claude 4.6 and later)

| Parameter            | Type   | Description                                             |
| -------------------- | ------ | ------------------------------------------------------- |
| `type`               | string | Set to `'adaptive'`                                     |
| `maxReasoningEffort` | string | A level supported by the model's [catalog entry](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) and the [Bedrock provider options](https://ai-sdk.dev/providers/ai-sdk-providers/amazon-bedrock) |

### Manual reasoning (Claude 4.6 and earlier)

| Parameter      | Type   | Description                                                 |
| -------------- | ------ | ----------------------------------------------------------- |
| `type`         | string | Set to `'enabled'`                                          |
| `budgetTokens` | number | Token budget for reasoning. Minimum: 1,024. Maximum: 64,000 |


---

[View full sitemap](/docs/sitemap)
