---
title: AI Gateway
product: vercel
url: /docs/ai-gateway
canonical_url: "https://vercel.com/docs/ai-gateway"
last_updated: 2026-05-30
type: integration
prerequisites:
  []
related:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/ecosystem/framework-integrations
summary: AI Gateway provides a unified API to access hundreds of AI models through a single endpoint, with built-in budgets, usage monitoring, and fallbacks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "234d9d5e12a3494139ec2046c1f380af797014b63253250aa53174646e0a6ad3"
---

# AI Gateway

> **🔒 Permissions Required**: AI Gateway

The [AI Gateway](https://vercel.com/ai-gateway) provides a unified API to access [hundreds of models](https://vercel.com/ai-gateway/models) through a single endpoint.
It gives you the ability to set budgets, monitor usage, load-balance requests, and manage fallbacks.

AI Gateway works with [AI SDK v5 and v6](/docs/ai-gateway/getting-started), [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or your [preferred framework](/docs/ai-gateway/ecosystem/framework-integrations).

## What AI Gateway provides

- **One key, hundreds of models.** Access models from multiple providers with a single API key
- **Unified API.** Switch between providers and models with minimal code changes
- **High reliability.** Automatically retries requests to other providers if one fails
- **Embeddings support.** Generate vector embeddings for search, retrieval, and other tasks
- **Spend monitoring.** Monitor your spending across different providers
- **No markup on tokens.** Tokens cost the same as they would from the provider directly, with zero markup, including with [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok)

#### TypeScript

```typescript filename="index.ts" {4}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'What is the capital of France?',
});

```

#### Python

```python filename="index.py" {10}
import os
from openai import OpenAI

client = OpenAI(
  api_key=os.getenv('AI_GATEWAY_API_KEY'),
  base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.chat.completions.create(
  model='xai/grok-4.3',
  messages=[
    {
      'role': 'user',
      'content': 'Why is the sky blue?'
    }
  ]
)
```

#### cURL

```bash filename="index.sh" {5}
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
-H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "model": "openai/gpt-5.5",
  "messages": [
    {
      "role": "user",
      "content": "Why is the sky blue?"
    }
  ],
  "stream": false
}'
```

## Get started and learn more

- [Getting started with AI Gateway](/docs/ai-gateway/getting-started)
- [Models and providers](/docs/ai-gateway/models-and-providers)
- [Provider options (routing & fallbacks)](/docs/ai-gateway/models-and-providers/provider-options)
- [Web search](/docs/ai-gateway/capabilities/web-search)
- [Observability](/docs/ai-gateway/capabilities/observability)
- [Coding Agents](/docs/ai-gateway/coding-agents)
- [Anthropic compatibility](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)
- [OpenAI compatibility](/docs/ai-gateway/sdks-and-apis/openai-chat-completions)
- [Disallow prompt training](/docs/ai-gateway/capabilities/disallow-prompt-training)
- [Usage and billing](/docs/ai-gateway/capabilities/usage)
- [Authentication](/docs/ai-gateway/authentication-and-byok)
- [Bring your own key](/docs/ai-gateway/authentication-and-byok/byok)
- [Framework integrations](/docs/ai-gateway/ecosystem/framework-integrations)
- [App attribution](/docs/ai-gateway/ecosystem/app-attribution)


---

[View full sitemap](/docs/sitemap)
