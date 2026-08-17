---
title: Extended Thinking
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning
  - /docs/ai-gateway/models-and-providers/reasoning/anthropic
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced
summary: Configure how much Claude thinks before answering, using the Anthropic Messages API thinking parameter.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1e396d283c51733c733df9971e89314585d3ee54ee38d602ec68aa633f5cca0e"
---

# Extended Thinking

Anthropic calls reasoning **extended thinking**. Configure it with the `thinking` parameter on a [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages) request. Other API surfaces call the same capability reasoning: see [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) for the cross-provider reference, or [Chat Completions reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning) for the OpenAI-shaped equivalent.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic?from=related)
- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related)
- [Get started with Claude 3.7 Sonnet](https://ai-sdk.dev/cookbook/guides/sonnet-3-7?from=related)
- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning?from=related) — Control how much a reasoning model thinks before answering with the OpenResponses API.
- [Google / Vertex](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/google?from=related) — Configure thinking for Google Gemini and Gemma models with the AI SDK and AI Gateway.
- [Amazon Bedrock](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock?from=related) — Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.
- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning?from=related) — Control how much a model thinks before answering with the OpenAI Responses API.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning.graph.md)
<!-- /docsgraph:related -->

Configure thinking for models that support chain-of-thought reasoning. The `thinking` parameter allows you to control how reasoning tokens are generated and returned. There are two modes:

- **Adaptive thinking**: Set `thinking: { type: 'adaptive' }`. The model decides when and how much to think. Available on Claude 4.6 and later. Required on Claude Opus 4.7 and later.
- **Extended thinking with a token budget**: Set `thinking: { type: 'enabled', budget_tokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier. Deprecated on Claude 4.6. Returns a 400 error on Claude Opus 4.7 and later.

See the [Anthropic reasoning reference](/docs/ai-gateway/models-and-providers/reasoning/anthropic#supported-models) for the full model support matrix.

The `thinking` parameter works with any reasoning model, not just Anthropic models. AI Gateway maps it to the target provider's native reasoning configuration, so you can set a thinking budget on a request to an OpenAI or Google model too.

## Adaptive thinking (Claude 4.6 and later)

On Claude Opus 4.7 and later, set `display: 'summarized'` to receive thinking text, which is omitted by default:

#### cURL

```bash filename="adaptive-thinking.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "max_tokens": 2048,
    "thinking": {
      "type": "adaptive",
      "display": "summarized"
    },
    "messages": [
      {
        "role": "user",
        "content": "Explain quantum entanglement in simple terms."
      }
    ]
  }'
```

#### TypeScript

```typescript filename="thinking-adaptive.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 2048,
  thinking: {
    type: 'adaptive',
    display: 'summarized',
  },
  messages: [
    {
      role: 'user',
      content: 'Explain quantum entanglement in simple terms.',
    },
  ],
});

for (const block of message.content) {
  if (block.type === 'thinking') {
    console.log('🧠 Thinking:', block.thinking);
  } else if (block.type === 'text') {
    console.log('💬 Response:', block.text);
  }
}
```

#### Python

```python filename="thinking_adaptive.py"
import os
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=2048,
    thinking={
        'type': 'adaptive',
        'display': 'summarized',
    },
    messages=[
        {
            'role': 'user',
            'content': 'Explain quantum entanglement in simple terms.'
        }
    ],
)

for block in message.content:
    if block.type == 'thinking':
        print('🧠 Thinking:', block.thinking)
    elif block.type == 'text':
        print('💬 Response:', block.text)
```

## Extended thinking with a token budget (Claude 4.6 and earlier)

For pre-4.7 models, use `type: 'enabled'` with a `budget_tokens` value:

#### cURL

```bash filename="extended-thinking.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4.5",
    "max_tokens": 8192,
    "thinking": {
      "type": "enabled",
      "budget_tokens": 5000
    },
    "messages": [
      {
        "role": "user",
        "content": "Explain quantum entanglement in simple terms."
      }
    ]
  }'
```

#### TypeScript

```typescript filename="thinking.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-4.5',
  max_tokens: 8192,
  thinking: {
    type: 'enabled',
    budget_tokens: 5000,
  },
  messages: [
    {
      role: 'user',
      content: 'Explain quantum entanglement in simple terms.',
    },
  ],
});

for (const block of message.content) {
  if (block.type === 'thinking') {
    console.log('🧠 Thinking:', block.thinking);
  } else if (block.type === 'text') {
    console.log('💬 Response:', block.text);
  }
}
```

#### Python

```python filename="thinking.py"
import os
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-sonnet-4.5',
    max_tokens=8192,
    thinking={
        'type': 'enabled',
        'budget_tokens': 5000,
    },
    messages=[
        {
            'role': 'user',
            'content': 'Explain quantum entanglement in simple terms.'
        }
    ],
)

for block in message.content:
    if block.type == 'thinking':
        print('🧠 Thinking:', block.thinking)
    elif block.type == 'text':
        print('💬 Response:', block.text)
```

## Thinking parameters

- **`type`**: Set to `'adaptive'` (Claude 4.6 and later) or `'enabled'` (Claude 4.6 and earlier)
- **`budget_tokens`**: Maximum number of tokens to allocate for thinking. Only valid with `type: 'enabled'`
- **`display`**: With `type: 'adaptive'`, set to `'summarized'` to include thinking text in the response. On Claude Opus 4.7 and later, thinking text is omitted by default

## Response with thinking

When thinking is enabled, the response includes thinking blocks:

```json
{
  "id": "msg_123",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "Let me think about how to explain quantum entanglement...",
      "signature": "anthropic-signature-xyz"
    },
    {
      "type": "text",
      "text": "Quantum entanglement is like having two magic coins..."
    }
  ],
  "model": "anthropic/claude-opus-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 15,
    "output_tokens": 150
  }
}
```

## Next steps

- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) - Per-provider effort levels and model support
- [Advanced](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced) - Web search, provider timeouts, and automatic caching


---

[View full sitemap](/docs/sitemap)
