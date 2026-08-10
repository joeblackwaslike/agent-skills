---
title: SDKs & APIs
product: vercel
url: /docs/ai-gateway/sdks-and-apis
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis"
last_updated: 2026-07-30
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/api-key-budgets
summary: Use the AI Gateway with various SDKs and API specifications including OpenAI, Anthropic, and OpenResponses.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "3a986304669a94e4fb4eea55e0b7feed677780af71d81440f50bacca8205fd5d"
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
  model: 'anthropic/claude-opus-5',
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
  model: 'anthropic/claude-opus-5',
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
  model: 'anthropic/claude-opus-5',
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
  model: 'anthropic/claude-opus-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

#### OpenResponses

```typescript
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-opus-5',
    input: [{ type: 'message', role: 'user', content: 'Hello!' }],
  }),
});
```

## What every surface shares

The surfaces below differ in request shape, not in what the gateway does with the request. Whichever you pick:

- **Authentication is the same.** An AI Gateway [API key or Vercel OIDC token](/docs/ai-gateway/authentication-and-byok) authenticates every surface. Anthropic Messages also accepts the key in `x-api-key`.
- **Model IDs are the same.** Every surface takes `provider/model` slugs like `anthropic/claude-opus-5`. Browse them in the [model list](/ai-gateway/models).
- **Routing, fallbacks, and BYOK are the same.** [Provider ordering](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering), [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks), and [your own provider keys](/docs/ai-gateway/authentication-and-byok) apply regardless of surface.
- **Observability is the same.** Requests land in [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability) with the same fields and count against the same [budgets](/docs/ai-gateway/observability-and-spend/api-key-budgets).

Switching surfaces is a client-side change. It does not change your billing, your keys, or which providers you reach.

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
| [OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses)                      | OpenAI Responses API users                                           | [Streaming](/docs/ai-gateway/sdks-and-apis/responses/streaming), [Tools](/docs/ai-gateway/sdks-and-apis/responses/tool-calling), [Structured output](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs)                             |
| [OpenAI Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions) | Existing OpenAI integrations, broad language support                 | [Chat](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions), [Tools](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling), [Embeddings](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings) |
| [Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)       | Claude Code, Anthropic SDK users                                     | [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages), [Tools](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling), [Images](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images)       |
| [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)                         | New projects, provider-agnostic design                               | [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming), [Tools](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling), [Images](/docs/ai-gateway/sdks-and-apis/openresponses/images)                                  |
| [Cohere Rerank API](/docs/ai-gateway/sdks-and-apis/cohere-rerank)                     | Reranking documents with the Cohere SDK or plain HTTP                | [Rerank](/docs/ai-gateway/sdks-and-apis/cohere-rerank#supported-endpoints), [Provider routing](/docs/ai-gateway/sdks-and-apis/cohere-rerank#provider-routing)                                                                                |
| [AI SDK for Python](/docs/ai-gateway/sdks-and-apis/ai-sdk-python) (public beta)       | Python apps and agents with a native SDK                             | [Quick start](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#quick-start), [Tools](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#tool-calling-with-agents)                                                                                      |
| [Python](/docs/ai-gateway/sdks-and-apis/python)                                       | Python developers                                                    | [Async](/docs/ai-gateway/sdks-and-apis/python#async-support), [Streaming](/docs/ai-gateway/sdks-and-apis/python#streaming), [Frameworks](/docs/ai-gateway/sdks-and-apis/python#framework-integrations)                                       |

## Capability coverage

Every cell links to that surface's page for the topic:

| Capability         | AI SDK                                                             | Chat Completions                                                                          | OpenAI Responses                                                              | Anthropic Messages                                                                         | OpenResponses                                                                     |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Text generation    | [Quick start](/docs/ai-gateway/sdks-and-apis/ai-sdk#quick-start)   | [Chat completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions) | [Text generation](/docs/ai-gateway/sdks-and-apis/responses/text-generation)   | [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages)                 | [Text generation](/docs/ai-gateway/sdks-and-apis/openresponses/text-generation)   |
| Streaming          | [Streaming](/docs/ai-gateway/sdks-and-apis/ai-sdk#streaming)       | [Streaming](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming)               | [Streaming](/docs/ai-gateway/sdks-and-apis/responses/streaming)               | [Streaming](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming)               | [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming)               |
| Tool calling       | [Tool calling](/docs/ai-gateway/sdks-and-apis/ai-sdk#tool-calling) | [Tool calling](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling)         | [Tool calling](/docs/ai-gateway/sdks-and-apis/responses/tool-calling)         | [Tool calling](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling)         | [Tool calling](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling)         |
| Structured outputs | [Structured outputs](/docs/ai-gateway/sdks-and-apis/ai-sdk#structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs) |
| Reasoning          | [Reasoning](/docs/ai-gateway/sdks-and-apis/ai-sdk#reasoning)       | [Reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning)               | [Reasoning](/docs/ai-gateway/sdks-and-apis/responses/reasoning)               | [Extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning)       | [Reasoning](/docs/ai-gateway/sdks-and-apis/openresponses/reasoning)               |
| Image input        | [AI SDK docs](https://ai-sdk.dev/docs/foundations/prompts#image-parts) | [File attachments](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images)           | [Images](/docs/ai-gateway/sdks-and-apis/responses/images)                     | [File attachments](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images)           | [Images](/docs/ai-gateway/sdks-and-apis/openresponses/images)                     |

Two capabilities are surface-specific rather than shared: [embeddings](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings) and [image generation](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation) are only on Chat Completions, and [reranking](/docs/ai-gateway/sdks-and-apis/cohere-rerank) is only on the Cohere Rerank API.

Whether a given model supports a capability is a separate question from whether the surface exposes it. Check the [model list](/ai-gateway/models) for per-model support.

## Choosing an API

- **New project?** Use [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk). It handles provider differences for you and supports streaming, structured outputs, tool calling, and reasoning across all providers.
- **Writing Python?** Use the [AI SDK for Python](/docs/ai-gateway/sdks-and-apis/ai-sdk-python) (public beta), or point the official [OpenAI and Anthropic Python SDKs](/docs/ai-gateway/sdks-and-apis/python) at AI Gateway.
- **Using the OpenAI SDK?** The [OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses) and [Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions) both work by changing your base URL.
- **Using Claude Code or the Anthropic SDK?** Use the [Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) for native feature support.
- **Want a provider-agnostic REST API?** Use [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses).

## Next steps

- [Get your API key](/docs/ai-gateway/authentication-and-byok) to start making requests
- [Browse available models](/docs/ai-gateway/models-and-providers) to find the right model for your use case
- [Set up observability](/docs/ai-gateway/observability-and-spend/observability) to monitor usage and debug requests


---

[View full sitemap](/docs/sitemap)
