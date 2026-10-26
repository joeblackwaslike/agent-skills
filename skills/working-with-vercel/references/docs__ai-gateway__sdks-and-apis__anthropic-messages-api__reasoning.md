---
title: Anthropic Messages Extended Thinking with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning
  - /docs/ai-gateway/models-and-providers/reasoning/anthropic
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced
summary: Configure how much Claude thinks before answering, using the Anthropic Messages API thinking parameter through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "09739fdab9e9ac11c47744f89836255f770a999dcafbfbf5cf4bbd93d93c1d8a"
---

# Anthropic Messages Extended Thinking with AI Gateway

Anthropic calls reasoning **extended thinking**. Configure it with the `thinking` parameter on a [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages) request. Other API surfaces call the same capability reasoning: see [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) for the cross-provider reference, or [Chat Completions reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning) for the OpenAI-shaped equivalent.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning) — Learn how to control reasoning across providers with the top-level reasoning parameter.
- [Get started with Claude 4](https://ai-sdk.dev/cookbook/guides/claude-4) — Get started with Claude 4 using the AI SDK.
- [Get started with Claude 3.7 Sonnet](https://ai-sdk.dev/cookbook/guides/sonnet-3-7) — Get started with Claude 3.7 Sonnet using the AI SDK.
- [OpenResponses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning) — Control how much a reasoning model thinks before answering with the OpenResponses API through AI Gateway.
- [AI Gateway Google and Vertex Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/google) — Configure thinking for Google Gemini and Gemma models with the AI SDK and AI Gateway.
- [AI Gateway OpenAI Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning.graph.md)
<!-- /docsgraph:related -->

Configure thinking for models that support chain-of-thought reasoning. The `thinking` parameter allows you to control how reasoning tokens are generated and returned. There are two modes:

- **Adaptive thinking**: Set `thinking: { type: 'adaptive' }`. The model decides when and how much to think. Available on Claude 4.6 and later. Required on Claude Opus 4.7 and later.
- **Extended thinking with a token budget**: Set `thinking: { type: 'enabled', budget_tokens: N }` for a fixed token budget. Available on Claude 4.6 and earlier. Deprecated on Claude 4.6. Returns a 400 error on Claude Opus 4.7 and later.

See the [Anthropic reasoning reference](/docs/ai-gateway/models-and-providers/reasoning/anthropic#supported-models) for native thinking modes and provider-specific exceptions.

The `thinking` parameter works across supported reasoning models, including models from other providers. AI Gateway maps it to the target provider's native reasoning configuration, so you can set a thinking budget on a request to an OpenAI or Google model too.

Discover each model's controls through [`GET /v1/models`](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support). To set effort on adaptive models, send `output_config.effort` alongside `thinking: { type: 'adaptive' }`. The Messages request schema accepts `low`, `medium`, `high`, `xhigh`, and `max`; choose a level the model supports. The catalog doesn't provide a structured default.

## Adaptive thinking (Claude 4.6 and later)

On Claude Opus 4.7 and later, set `display: 'summarized'` to receive thinking text, which is omitted by default:

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

## Extended thinking with a token budget (Claude 4.6 and earlier)

For pre-4.7 models, use `type: 'enabled'` with a `budget_tokens` value:

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

## Thinking parameters

Set effort in the separate `output_config.effort` field, not inside `thinking`. The following fields belong to `thinking`:

- **`type`**: Set to `'adaptive'` (Claude 4.6 and later) or `'enabled'` (Claude 4.6 and earlier)
- **`budget_tokens`**: Maximum number of tokens to allocate for thinking. Only valid with `type: 'enabled'`
- **`display`**: With `type: 'adaptive'`, set to `'summarized'` to include thinking text in the response. On Claude Opus 4.7 and later, thinking text is omitted by default

## Response with thinking

When the provider returns thinking content, the response includes thinking blocks. Display settings and model behavior determine whether those blocks contain text:

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

- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) - Model discovery and API-format mappings
- [Advanced](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced) - Web search, provider timeouts, and automatic caching


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
