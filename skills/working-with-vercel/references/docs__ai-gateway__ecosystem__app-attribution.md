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
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "8103a70c1b2687c025822d01847046e8c30195a1cdd35b9af892ff44f15122a4"
---

# AI Gateway App Attribution

App attribution allows Vercel to identify the application making a request
through AI Gateway. When provided, your app can be featured on AI Gateway pages,
driving awareness.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Choosing a Provider](https://ai-sdk.dev/docs/getting-started/choosing-a-provider?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=related)
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=related) — Use Vercel Sandbox with the agent frameworks, model SDKs, and coding agents you already work with.
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [Call AI Gateway Chat Completions with REST](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=related) — Use AI Gateway API directly without client libraries using curl and fetch.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/app-attribution.graph.md](/docs/ai-gateway/ecosystem/app-attribution.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fapp-attribution&source_site=vercel-docs&relationship=graph)
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
