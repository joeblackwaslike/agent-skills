---
title: SDKs & APIs
product: vercel
url: /docs/ai-gateway/sdks-and-apis
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis"
last_updated: 2026-05-30
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calls
summary: Use the AI Gateway with various SDKs and API specifications including OpenAI, Anthropic, and OpenResponses.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "d0ac0a6aade2cf1e11e32319c0ed0816ce4dafb9d755ddf5592e429324b83da8"
---

# SDKs & APIs

AI Gateway provides drop-in compatible APIs that let you switch by changing a base URL. No code rewrites required. Use the same SDKs and tools you already know, with access to 200+ models from every major provider.

## Quick start

Point your existing SDK to the gateway:

#### AI SDK

```bash package-manager
npm i ai
```

```typescript
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'Hello!',
});
```

#### Chat Completions

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-opus-4.7',
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

#### OpenAI Responses

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-opus-4.7',
  input: 'Hello!',
});
```

#### Anthropic Messages

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await client.messages.create({
  model: 'anthropic/claude-opus-4.7',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

#### OpenResponses

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-opus-4.7',
  input: 'Hello!',
});
```

## Why use these APIs?

- **No vendor lock-in**: Switch between Claude, GPT, Gemini, and other models without changing your code
- **Unified billing**: One invoice for all providers instead of managing multiple accounts
- **Built-in fallbacks**: Automatic retry with alternative providers if one fails
- **Streaming support**: Real-time responses with SSE across all compatible endpoints
- **Full feature parity**: Tool calling, structured outputs, vision, and embeddings work exactly as documented

## Available APIs

| API                                                                                   | Best for                                                             | Documentation                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) (recommended)                         | Normalizes provider differences, works with AI Gateway automatically | [Streaming](/docs/ai-gateway/sdks-and-apis/ai-sdk#streaming), [Structured outputs](/docs/ai-gateway/sdks-and-apis/ai-sdk#structured-outputs), [Tools](/docs/ai-gateway/sdks-and-apis/ai-sdk#tool-calling)                                    |
| [OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses)                      | OpenAI Responses API users                                           | [Streaming](/docs/ai-gateway/sdks-and-apis/responses#streaming), [Tools](/docs/ai-gateway/sdks-and-apis/responses#tool-calling), [Structured output](/docs/ai-gateway/sdks-and-apis/responses#structured-output)                             |
| [OpenAI Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions) | Existing OpenAI integrations, broad language support                 | [Chat](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions), [Tools](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calls), [Embeddings](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings) |
| [Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)       | Claude Code, Anthropic SDK users                                     | [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages), [Tools](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calls), [Files](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/file-attachments)       |
| [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)                         | New projects, provider-agnostic design                               | [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming), [Tools](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling), [Vision](/docs/ai-gateway/sdks-and-apis/openresponses/image-input)                                  |
| [Python](/docs/ai-gateway/sdks-and-apis/python)                                       | Python developers                                                    | [Async](/docs/ai-gateway/sdks-and-apis/python#async-support), [Streaming](/docs/ai-gateway/sdks-and-apis/python#streaming), [Frameworks](/docs/ai-gateway/sdks-and-apis/python#framework-integrations)                                       |

## Choosing an API

- **New project?** Use [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk). It handles provider differences for you and supports streaming, structured outputs, tool calling, and reasoning across all providers.
- **Using the OpenAI SDK?** The [OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses) and [Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions) both work by changing your base URL.
- **Using Claude Code or the Anthropic SDK?** Use the [Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) for native feature support.
- **Want a provider-agnostic REST API?** Use [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses).

## Next steps

- [Get your API key](/docs/ai-gateway/authentication-and-byok) to start making requests
- [Browse available models](/docs/ai-gateway/models-and-providers) to find the right model for your use case
- [Set up observability](/docs/ai-gateway/capabilities/observability) to monitor usage and debug requests


---

[View full sitemap](/docs/sitemap)
