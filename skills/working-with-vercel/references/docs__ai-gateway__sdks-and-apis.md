---
title: AI Gateway SDKs and APIs
product: vercel
url: /docs/ai-gateway/sdks-and-apis
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/observability-and-spend/observability
summary: Connect to AI Gateway with the AI SDK, Python, REST, or compatible OpenAI, Anthropic Messages, OpenResponses, and Cohere Rerank APIs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "b57b6a09794eb50d095874902c114bb60813eb05f79c2b328999fd5835c68a86"
---

# AI Gateway SDKs and APIs

Use AI Gateway with the AI SDK, the AI SDK for Python beta, or compatible OpenAI and Anthropic APIs. Keep your client library, set the AI Gateway base URL, and choose a model. Request fields and supported features vary by API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=related)
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=related) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [AI Gateway Custom Reporting API](https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=related) — Query AI Gateway usage data grouped by model, user, tag, provider, or credential type using the Custom Reporting API.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis.graph.md](/docs/ai-gateway/sdks-and-apis.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To work with images, files, audio, video, or application functions, see [Inputs & Tools](/docs/ai-gateway/inputs-and-tools).

## Quick start

See the [AI SDK documentation](https://ai-sdk.dev/docs/getting-started) and [Python beta documentation](https://ai-python.dev/docs) for SDK installation and core concepts.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="quickstart.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5",
  prompt: "Hello!",
});

console.log(text);
```

#### Python (beta)

```python filename="quickstart_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Hello!")]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="quickstart-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "Hello!" }],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="quickstart_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Hello!"}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="quickstart-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ]
}'
```

#### Messages API

#### TypeScript

```typescript filename="quickstart-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "Hello!" }],
  max_tokens: 1024,
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="quickstart_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Hello!"}],
    max_tokens=1024,
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="quickstart-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ],
  "max_tokens": 1024
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="quickstart-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: "anthropic/claude-sonnet-5",
  input: "Hello!",
});

console.log(response.output_text);
```

#### Python

```python filename="quickstart_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Hello!",
)

print(response.output_text)
```

#### cURL

```bash filename="quickstart-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Hello!"
}'
```

## What every surface shares

AI Gateway shares authentication, model naming, and routing across these API formats. Capability support, request fields, and response metadata vary as described below:

- **Authentication is the same.** An AI Gateway [API key or Vercel OIDC token](/docs/ai-gateway/authentication-and-byok) authenticates every surface. Anthropic Messages also accepts the key in `x-api-key`.
- **Model IDs are the same.** Every surface takes `provider/model` slugs like `anthropic/claude-opus-5`. Browse them in the [model list](/ai-gateway/models).
- **Routing, fallbacks, and BYOK are the same.** [Provider ordering](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering), [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks), and [your own provider keys](/docs/ai-gateway/authentication-and-byok) apply regardless of surface.
- **Observability is the same.** Requests land in [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability) with the same fields and count against the same [budgets](/docs/ai-gateway/observability-and-spend/budgets).

Switching surfaces is a client-side change. It does not change your billing, your keys, or which providers you reach.

## Why use these APIs?

- **No vendor lock-in**: Switch between Claude, GPT, Gemini, and other models without changing your code
- **Unified billing**: One invoice for all providers instead of managing multiple accounts
- **Built-in fallbacks**: Automatic retry with alternative providers if one fails
- **Streaming support**: Real-time responses with SSE across all compatible endpoints
- **Multiple API formats**: Use the format your application supports, with the capability and parameter differences below

## Available APIs

| API                                                                                   | Best for                                                             | Documentation                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) (recommended)                         | Normalizes provider differences, works with AI Gateway automatically | [Streaming](/docs/ai-gateway/sdks-and-apis/ai-sdk#streaming), [Structured outputs](/docs/ai-gateway/sdks-and-apis/ai-sdk#structured-outputs), [Tools](/docs/ai-gateway/sdks-and-apis/ai-sdk#tool-calling)                                    |
| [AI SDK for Python](/docs/ai-gateway/sdks-and-apis/ai-sdk-python) (public beta)       | Python apps and agents with a native SDK                             | [Quick start](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#quick-start), [Tools](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#tool-calling-with-agents)                                                                                      |
| [OpenAI Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions) | Existing OpenAI integrations, broad language support                 | [Chat](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions), [Tools](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling), [Embeddings](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings) |
| [Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)       | Claude Code, Anthropic SDK users                                     | [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages), [Tools](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling), [Images](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images)       |
| [OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses)                      | OpenAI Responses API users                                           | [Streaming](/docs/ai-gateway/sdks-and-apis/responses/streaming), [Tools](/docs/ai-gateway/sdks-and-apis/responses/tool-calling), [Structured output](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs)                             |
| [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)                         | New projects, provider-agnostic design                               | [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming), [Tools](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling), [Images](/docs/ai-gateway/sdks-and-apis/openresponses/images)                                  |
| [Cohere Rerank API](/docs/ai-gateway/sdks-and-apis/cohere-rerank)                     | Reranking documents with the Cohere SDK or plain HTTP                | [Rerank](/docs/ai-gateway/sdks-and-apis/cohere-rerank#supported-endpoints), [Provider routing](/docs/ai-gateway/sdks-and-apis/cohere-rerank#provider-routing)                                                                                |
| [Python](/docs/ai-gateway/sdks-and-apis/python)                                       | Python developers                                                    | [Async](/docs/ai-gateway/sdks-and-apis/python#async-support), [Streaming](/docs/ai-gateway/sdks-and-apis/python#streaming), [Frameworks](/docs/ai-gateway/sdks-and-apis/python#framework-integrations)                                       |

## Capability coverage

Every cell links to that surface's page for the topic:

| Capability | AI SDK | AI SDK for Python (beta) | Chat Completions | Anthropic Messages | OpenAI Responses | OpenResponses |
| ------------------ | ------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Text generation | [Quick start](/docs/ai-gateway/sdks-and-apis/ai-sdk#quick-start) | [Quick start](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#quick-start) | [Chat completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions) | [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages) | [Text generation](/docs/ai-gateway/sdks-and-apis/responses/text-generation) | [Text generation](/docs/ai-gateway/sdks-and-apis/openresponses/text-generation) |
| Streaming | [Streaming](/docs/ai-gateway/sdks-and-apis/ai-sdk#streaming) | [Streaming](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#quick-start) | [Streaming](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming) | [Streaming](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming) | [Streaming](/docs/ai-gateway/sdks-and-apis/responses/streaming) | [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming) |
| Tool calling | [Tool calling](/docs/ai-gateway/sdks-and-apis/ai-sdk#tool-calling) | [Agents](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#tool-calling-with-agents) | [Tool calling](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling) | [Tool calling](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling) | [Tool calling](/docs/ai-gateway/sdks-and-apis/responses/tool-calling) | [Tool calling](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling) |
| Structured outputs | [Structured outputs](/docs/ai-gateway/sdks-and-apis/ai-sdk#structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs) | [Structured outputs](/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs) |
| Reasoning | [Reasoning](/docs/ai-gateway/sdks-and-apis/ai-sdk#reasoning) | [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) | [Reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning) | [Extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) | [Reasoning](/docs/ai-gateway/sdks-and-apis/responses/reasoning) | [Reasoning](/docs/ai-gateway/sdks-and-apis/openresponses/reasoning) |
| Image input | [AI SDK docs](https://ai-sdk.dev/docs/foundations/prompts#file-parts) | [Multimodal inputs](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#images-and-documents) | [File attachments](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images) | [File attachments](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images) | [Images](/docs/ai-gateway/sdks-and-apis/responses/images) | [Images](/docs/ai-gateway/sdks-and-apis/openresponses/images) |

Embeddings use the [OpenAI-compatible `/v1/embeddings` endpoint](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/embeddings), or the TypeScript and Python AI SDKs. Reranking uses the [Cohere-compatible Rerank API](/docs/ai-gateway/sdks-and-apis/cohere-rerank), or either AI SDK. These operations aren't Chat Completions, Messages, or Responses requests. See [modalities](/docs/ai-gateway/modalities) for image, video, audio, and realtime APIs.

Whether a given model supports a capability is a separate question from whether the surface exposes it. Check the [model list](/ai-gateway/models) for per-model support.

## API format differences

The examples use **AI SDK 7** for TypeScript and the **AI SDK for Python public beta** for Python. The Python package has its own version cycle. It doesn't use the TypeScript SDK's functions or version numbers.

Install the client for your tab:

| Tab | Requirements | Install |
| --- | --- | --- |
| AI SDK | Node.js 22 or later, ESM | `pnpm add ai@7` |
| AI SDK for Python (beta) | Python 3.12 or later | `uv add ai` |
| Chat Completions and Responses, TypeScript | OpenAI TypeScript SDK | `pnpm add openai` |
| Chat Completions and Responses, Python | OpenAI Python SDK | `uv add openai` |
| Messages API, TypeScript | Anthropic TypeScript SDK | `pnpm add @anthropic-ai/sdk` |
| Messages API, Python | Anthropic Python SDK | `uv add anthropic` |
| cURL | A shell and cURL | No SDK required |

Set `AI_GATEWAY_API_KEY` in your environment. Keep the key on the server. For Vercel deployments and local development with Vercel CLI, see [OIDC authentication](/docs/ai-gateway/authentication-and-byok/oidc). TypeScript examples with top-level `await` run as ESM, for example with `pnpm exec tsx example.ts`. Python examples run with `uv run example.py`.

| Format | Input and instructions | AI Gateway options | Text output |
| --- | --- | --- | --- |
| AI SDK 7 | `prompt` or `messages`; `instructions` | `providerOptions.gateway` | `result.text` or `result.textStream` |
| AI SDK for Python (beta) | `ai.user_message(...)` and `ai.stream(...)` | `ai.InferenceRequestParams(extra_body={"providerOptions": {"gateway": ...}})` | `TextDelta.chunk`, or `stream.text` after consuming the stream |
| Chat Completions | `messages`; a `system` or `developer` message | `providerOptions.gateway` in the JSON body | `choices[0].message.content` |
| Messages API | `messages`; top-level `system`; required `max_tokens` | `providerOptions.gateway` in the JSON body | Text blocks in `content` |
| Responses / OpenResponses | `input`; `instructions` | `providerOptions.gateway` in the JSON body | SDK `output_text`, or text blocks in raw `output` items |

The OpenAI and Anthropic Python SDKs pass AI Gateway extensions through `extra_body`. The TypeScript examples spread `providerOptions` into the request because upstream SDK types don't declare AI Gateway extensions. Standard request fields still use the SDK's types.

[Responses](/docs/ai-gateway/sdks-and-apis/responses) and [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses) share `/v1/responses`. Shared-feature examples use a single tab for both. Consult their reference pages for [stateful conversations](/docs/ai-gateway/sdks-and-apis/responses/text-generation), [compaction](/docs/ai-gateway/sdks-and-apis/responses/compaction), and supported tools before porting native OpenAI code.

Structured output uses `output` in AI SDK 7, `output_type` in the Python beta, `response_format` in Chat Completions, `output_config.format` in Messages, and `text.format` in Responses. Tool definitions and tool-result messages also differ. Follow the linked examples in the capability table instead of copying a payload between formats.

[Reasoning](/docs/ai-gateway/models-and-providers/reasoning), [search tools](/docs/ai-gateway/models-and-providers/web-search), and [cache controls](/docs/ai-gateway/models-and-providers/automatic-caching) have model-specific and API-specific options. A successful generation alone doesn't establish that an optional setting took effect. Inspect usage and provider metadata when verifying routing, caching, service tiers, or compliance settings.

## CLI and coding agents

Use [Vercel CLI](/docs/cli/ai-gateway) to inspect models and configure [coding agents](/docs/ai-gateway/coding-agents):

```bash filename="Terminal"
npx vercel ai-gateway models list
npx vercel ai-gateway setup
```

Management operations such as [budgets](/docs/ai-gateway/observability-and-spend/budgets), [API keys](/docs/ai-gateway/authentication-and-byok/api-keys), and [routing rules](/docs/ai-gateway/models-and-providers/routing-rules) use their management REST endpoints or the CLI. They aren't Chat Completions, Messages, or Responses requests.

The CLI setup commands complement the API examples. Each coding agent chooses its own API format; keep its configuration from the [coding-agent guide](/docs/ai-gateway/coding-agents).

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
