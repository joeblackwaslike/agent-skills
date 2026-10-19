---
title: AI Gateway OpenAI Reasoning
product: vercel
url: /docs/ai-gateway/models-and-providers/reasoning/openai
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/responses/reasoning
summary: Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "761050ca503780effddb34ca2c7fbbfc40445a02b0c274f0091ef2a811b98232"
---

# AI Gateway OpenAI Reasoning

OpenAI reasoning models can think through problems before responding. You can control the depth of reasoning and receive summaries of the model's thought process. Each model supports different effort levels and defaults.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning) — Learn how to control reasoning across providers with the top-level reasoning parameter.
- [OpenResponses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning) — Control how much a reasoning model thinks before answering with the OpenResponses API through AI Gateway.
- [OpenAI Chat Completions Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning) — Control how much a model thinks before answering with the OpenAI Chat Completions API through AI Gateway.
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options) — Learn how to use provider-specific options to control reasoning, caching, and other advanced features.
- [AI Gateway Amazon Bedrock Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock) — Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.
- [AI Gateway Google and Vertex Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/google) — Configure thinking for Google Gemini and Gemma models with the AI SDK and AI Gateway.
- [AI Gateway SDKs and APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis) — Connect to AI Gateway with the AI SDK, Python, REST, or compatible OpenAI, Anthropic Messages, OpenResponses, and Cohere

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/reasoning/openai.graph.md](/docs/ai-gateway/models-and-providers/reasoning/openai.graph.md)
<!-- /docsgraph:related -->

## Supported models

See the [AI SDK OpenAI provider reference](https://ai-sdk.dev/providers/ai-sdk-providers/openai) for supported reasoning options and response metadata.

To see the current list of OpenAI reasoning models, use the **Reasoning** filter on the [AI Gateway models page](https://vercel.com/ai-gateway/models?capabilities=reasoning\&providers=openai).

Use [`GET /v1/models`](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) to find the model's `reasoning_options` entry with `type: "effort"` and read its `values`. This includes new model variants without relying on a family-wide support table. The catalog doesn't expose a structured default; consult the [OpenAI model documentation](https://developers.openai.com/api/docs/models) when leaving effort unset.

Check the [API-format mapping](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) before passing a catalog value to a client. In particular, AI SDK 7's top-level `reasoning` option doesn't accept `max`, even when the catalog lists it for the model.

## Getting started

### Setting reasoning effort

Set shared reasoning effort with the AI SDK 7 top-level [`reasoning` option](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels), which AI Gateway translates for the serving provider:

```typescript filename="reasoning-effort.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  reasoning: 'high',
});

console.log(result.text);
```

Use `providerOptions.openai` when you need OpenAI-specific features like reasoning summaries. If you set `reasoningEffort` in `providerOptions`, it takes precedence over the top-level `reasoning` value.

### Streaming with reasoning summaries

Set `reasoningSummary` to receive the model's thought process as it streams. Different models support different summarizers. For example, o4-mini supports detailed summaries.

#### AI SDK 7

```typescript filename="stream-reasoning.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-6-astra',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'detailed', // 'auto' for condensed or 'detailed' for comprehensive
    },
  },
});

for await (const part of result.stream) {
  if (part.type === 'reasoning-delta') {
    process.stdout.write(part.text);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.text);
  }
}
```

#### AI SDK 6

```typescript filename="stream-reasoning.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-6-astra',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'detailed', // 'auto' for condensed or 'detailed' for comprehensive
    },
  },
});

for await (const part of result.fullStream) {
  if (part.type === 'reasoning-delta') {
    process.stdout.write(part.text);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.text);
  }
}
```

### Non-streaming

For non-streaming calls, reasoning summaries are available in the `reasoning` field:

```typescript filename="generate-reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Tell me about the Mission burrito debate in San Francisco.',
  providerOptions: {
    openai: {
      reasoningEffort: 'high',
      reasoningSummary: 'auto',
    },
  },
});

console.log('Reasoning:', result.reasoningText);
```

### Other API formats

You can set reasoning effort without the AI SDK through the gateway's [OpenAI-compatible endpoints](/docs/ai-gateway/models-and-providers/reasoning#reasoning-across-api-formats):

#### TypeScript

```typescript filename="reasoning-chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'Tell me about the Mission burrito debate in San Francisco.',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    reasoning: {
      effort: 'high',
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
    model='openai/gpt-6-astra',
    messages=[
        {
            'role': 'user',
            'content': 'Tell me about the Mission burrito debate in San Francisco.'
        }
    ],
    extra_body={
        'reasoning': {
            'effort': 'high'
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
    "model": "openai/gpt-6-astra",
    "messages": [
      {
        "role": "user",
        "content": "Tell me about the Mission burrito debate in San Francisco."
      }
    ],
    "reasoning": {
      "effort": "high"
    }
  }'
```

The [Responses API](/docs/ai-gateway/sdks-and-apis/responses/reasoning) also supports the `reasoning` object, including the `summary` option for reasoning summaries.

## Parameters

### Reasoning effort

Set `reasoningEffort` in `providerOptions.openai`, or use the top-level `reasoning` option for shared effort. Select a model-supported level from the [catalog](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) and check the [AI SDK OpenAI provider options](https://ai-sdk.dev/providers/ai-sdk-providers/openai) for values your installed SDK accepts.

Provider-specific options take precedence over the shorthand. Don't infer supported values or defaults from a different model in the same family.

### Reasoning summary

| Value      | Description                     |
| ---------- | ------------------------------- |
| `auto`     | Condensed reasoning summary     |
| `detailed` | Comprehensive reasoning summary |
| `concise`  | Brief reasoning summary         |

> **💡 Note:** Set a supported effort explicitly if you need reasoning enabled. Requesting a
> summary alone doesn't establish the model's effort or guarantee summary text.

For more details, see the [OpenAI reasoning docs](https://developers.openai.com/api/docs/guides/reasoning/).


---

[View full sitemap](/docs/sitemap)
