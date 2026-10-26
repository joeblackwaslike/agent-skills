---
title: AI Gateway App Attribution
product: vercel
url: /docs/ai-gateway/ecosystem/app-attribution
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/app-attribution"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
summary: Attribute your requests so Vercel can identify and feature your app on AI Gateway pages.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/app-attribution.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ae8796124ea1bfdf7b36891c947ae7ef4704dd18c9ac20c8ebc56a93b6fef228"
---

# AI Gateway App Attribution

App attribution allows Vercel to identify the application making a request
through AI Gateway. When provided, your app can be featured on AI Gateway pages,
driving awareness.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Call AI Gateway Chat Completions with REST](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api) — Use AI Gateway API directly without client libraries using curl and fetch.
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/app-attribution.graph.md](/docs/ai-gateway/ecosystem/app-attribution.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** App Attribution is optional. If you do not send these headers, your requests
> will work normally.

## How it works

AI Gateway reads two request headers when present:

- `http-referer`: The URL of the page or site making the request.
- `x-title`: A human‑readable name for your app (for example, *"Acme Chat"*).

You can set these headers directly in your server-side requests to AI Gateway.

## Examples

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="app-attribution.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  headers: {
    'http-referer': 'https://myapp.vercel.app',
    'x-title': 'MyApp',
  },
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

#### Python (beta)

```python filename="app-attribution_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_headers={"http-referer": "https://myapp.vercel.app", "x-title": "MyApp"}
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

```typescript filename="app-attribution-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'http-referer': 'https://myapp.vercel.app',
    'x-title': 'MyApp',
  },
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  stream: true,
});

for await (const event of response) {
  process.stdout.write(event.choices[0]?.delta.content ?? '');
}
```

#### Python

```python filename="app-attribution_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
    default_headers={"http-referer": "https://myapp.vercel.app", "x-title": "MyApp"},
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    stream=True,
)

for event in response:
    if event.choices:
        print(event.choices[0].delta.content or "", end="", flush=True)
```

#### cURL

```bash filename="app-attribution-chat.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "http-referer: https://myapp.vercel.app" \
  -H "x-title: MyApp" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "stream": true
}'
```

#### Messages API

#### TypeScript

```typescript filename="app-attribution-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
  defaultHeaders: {
    'http-referer': 'https://myapp.vercel.app',
    'x-title': 'MyApp',
  },
});

const response = await client.messages.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  max_tokens: 1024,
  stream: true,
});

for await (const event of response) {
  if (
    event.type === 'content_block_delta' &&
    event.delta.type === 'text_delta'
  ) {
    process.stdout.write(event.delta.text);
  }
}
```

#### Python

```python filename="app-attribution_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
    default_headers={"http-referer": "https://myapp.vercel.app", "x-title": "MyApp"},
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    stream=True,
)

for event in response:
    if event.type == "content_block_delta" and event.delta.type == "text_delta":
        print(event.delta.text, end="", flush=True)
```

#### cURL

```bash filename="app-attribution-messages.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -H "http-referer: https://myapp.vercel.app" \
  -H "x-title: MyApp" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "stream": true
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="app-attribution-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'http-referer': 'https://myapp.vercel.app',
    'x-title': 'MyApp',
  },
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'Explain quantum computing in two sentences.',
  stream: true,
});

for await (const event of response) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  }
}
```

#### Python

```python filename="app-attribution_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
    default_headers={"http-referer": "https://myapp.vercel.app", "x-title": "MyApp"},
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Explain quantum computing in two sentences.",
    stream=True,
)

for event in response:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
```

#### cURL

```bash filename="app-attribution-responses.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "http-referer: https://myapp.vercel.app" \
  -H "x-title: MyApp" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Explain quantum computing in two sentences.",
  "stream": true
}'
```

## Setting headers at the provider level

You can also configure attribution headers when you create the AI Gateway
provider instance. This way, the headers are automatically included in
all requests without needing to specify them for each function call.

```typescript filename="provider-level.ts"
import { streamText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
  headers: {
    'http-referer': 'https://myapp.vercel.app',
    'x-title': 'MyApp',
  },
});

const result = streamText({
  model: gateway('anthropic/claude-opus-5'),
  prompt: 'Hello, world!',
});

for await (const part of result.textStream) {
  process.stdout.write(part);
}
```

## Using the Global Default Provider

You can also use the AI SDK's [global provider configuration](https://ai-sdk.dev/docs/ai-sdk-core/provider-management#global-provider-configuration) to set your custom provider instance as the default. This allows you to use plain string model IDs throughout your application while automatically including your attribution headers.

```typescript filename="global-provider.ts"
import { streamText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
  headers: {
    'http-referer': 'https://myapp.vercel.app',
    'x-title': 'MyApp',
  },
});

// Set your provider as the default to allow plain-string model id creation with this instance
globalThis.AI_SDK_DEFAULT_PROVIDER = gateway;

// Now you can use plain string model IDs and they'll use your custom provider
const result = streamText({
  model: 'anthropic/claude-opus-5', // Uses the gateway provider with headers
  prompt: 'Hello, world!',
});

for await (const part of result.textStream) {
  process.stdout.write(part);
}
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
