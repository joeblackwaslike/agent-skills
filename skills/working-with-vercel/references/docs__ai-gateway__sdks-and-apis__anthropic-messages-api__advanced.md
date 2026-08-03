---
title: Advanced Features
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced"
last_updated: 2026-07-27
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/models-and-providers/automatic-caching
summary: Advanced Anthropic API features including web search, provider timeouts, and automatic caching.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "21087f0110f8a1ed044bade9342e1fc17b0d9f1edaf8cf7621d7605f8dea386b"
---

# Advanced Features

Give Claude access to the web, bound how long a provider may take, and cache prompt prefixes between calls. For controlling how much Claude thinks before answering, see [Extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning).

## Web search

Use the built-in web search tool to give the model access to current information from the web.

Example request

#### cURL

```bash filename="web-search.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "max_tokens": 2048,
    "tools": [
      {
        "type": "web_search_20250305",
        "name": "web_search"
      }
    ],
    "messages": [
      {
        "role": "user",
        "content": "What are the latest developments in quantum computing?"
      }
    ]
  }'
```

#### TypeScript

```typescript filename="web-search.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 2048,
  tools: [
    {
      type: 'web_search_20250305',
      name: 'web_search',
    },
  ],
  messages: [
    {
      role: 'user',
      content: 'What are the latest developments in quantum computing?',
    },
  ],
});

for (const block of message.content) {
  if (block.type === 'text') {
    console.log(block.text);
  } else if (block.type === 'web_search_tool_result') {
    console.log('Search results received');
  }
}
```

#### Python

```python filename="web-search.py"
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
    tools=[
        {
            'type': 'web_search_20250305',
            'name': 'web_search',
        }
    ],
    messages=[
        {
            'role': 'user',
            'content': 'What are the latest developments in quantum computing?'
        }
    ],
)

for block in message.content:
    if block.type == 'text':
        print(block.text)
    elif block.type == 'web_search_tool_result':
        print('Search results received')
```

## Provider timeouts

You can set per-provider timeouts for BYOK credentials to trigger fast failover when a provider is slow to respond. Pass `providerTimeouts` in `providerOptions.gateway`:

```json
"providerOptions": {
  "gateway": {
    "providerTimeouts": {
      "byok": { "anthropic": 3000, "bedrock": 5000 }
    }
  }
}
```

For full details, limits, and response metadata, see [Provider Timeouts](/docs/ai-gateway/models-and-providers/provider-timeouts).

## Automatic caching

Use `caching: 'auto'` in `providerOptions.gateway` to let AI Gateway automatically add `cache_control` breakpoints for Anthropic models. This removes the need to manually mark cacheable content.

For full details, supported providers, and examples, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).


---

[View full sitemap](/docs/sitemap)
