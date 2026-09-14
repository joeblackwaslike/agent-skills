---
title: AI Gateway Text Generation
product: vercel
url: /docs/ai-gateway/modalities/text-generation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/text-generation"
last_updated: 2026-09-08
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/getting-started/text
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/inputs-and-tools/tool-use
  - /docs/ai-gateway/models-and-providers/provider-options
summary: Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/text-generation.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "e3ce236de6a8312fb41a0de59418906374e98b0abce46c0918b488ef6a2fd74c"
---

# AI Gateway Text Generation

Text generation is the default modality in AI Gateway. You send a prompt and a model returns text, either all at once or streamed token by token. The same unified API works across hundreds of models, so you can switch providers with a one-line change.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Chat Completions Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-generation&source_site=vercel-docs&relationship=related) — Generate structured JSON responses that conform to a specific schema using the Chat Completions API through AI Gateway.
- [Anthropic Messages Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-generation&source_site=vercel-docs&relationship=related) — Get JSON responses conforming to a JSON Schema from Anthropic models through AI Gateway.
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-generation&source_site=vercel-docs&relationship=related) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI Gateway Service Tiers](https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-generation&source_site=vercel-docs&relationship=related) — Control processing priority and cost for OpenAI, Google AI Studio, Google Vertex AI, and SpaceXAI models using service t
- [AI Gateway Provider Filtering, Ordering, and Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-generation&source_site=vercel-docs&relationship=related) — Control AI Gateway provider routing with order, only, and sort. Set preferences, restrict providers, and rank them by co

Full cross-link map for this page: [/docs/ai-gateway/modalities/text-generation.graph.md](/docs/ai-gateway/modalities/text-generation.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-generation&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For a step-by-step setup, see the [Text Generation quickstart](/docs/ai-gateway/getting-started/text). To browse available models, see [Models and Providers](/docs/ai-gateway/models-and-providers).

## Generate text

For SDK options and result handling, see [generateText](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text) and [Python streaming](https://ai-python.dev/docs/basics/streaming).

Use `generateText` from the AI SDK to get a complete response. Set the model with a `creator/model-name` slug:

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="generate-text.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5",
  prompt: "What is the capital of France?",
});

console.log(text);
```

#### Python (beta)

```python filename="generate-text_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("What is the capital of France?")]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="generate-text-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "What is the capital of France?" }],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="generate-text_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "What is the capital of France?"}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="generate-text-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "What is the capital of France?"
    }
  ]
}'
```

#### Messages API

#### TypeScript

```typescript filename="generate-text-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "What is the capital of France?" }],
  max_tokens: 1024,
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="generate-text_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "What is the capital of France?"}],
    max_tokens=1024,
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="generate-text-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "What is the capital of France?"
    }
  ],
  "max_tokens": 1024
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="generate-text-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: "anthropic/claude-sonnet-5",
  input: "What is the capital of France?",
});

console.log(response.output_text);
```

#### Python

```python filename="generate-text_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="What is the capital of France?",
)

print(response.output_text)
```

#### cURL

```bash filename="generate-text-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "What is the capital of France?"
}'
```

Switching models is a one-line change, for example to `anthropic/claude-sonnet-5` or `google/gemini-3.1-pro-preview`.

## Stream text

For SDK options and result handling, see [streamText](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) and [Python stream events](https://ai-python.dev/docs/basics/messages-and-events#handle-stream-events).

Use `streamText` to render output as it arrives, which keeps chat and agent interfaces responsive:

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="stream-text.ts"
import { streamText } from 'ai';

const result = streamText({
  model: "anthropic/claude-sonnet-5",
  prompt: "Write a short poem about the ocean.",
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

#### Python (beta)

```python filename="stream-text_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Write a short poem about the ocean.")]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="stream-text-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "Write a short poem about the ocean." }],
  stream: true,
});

for await (const event of response) {
  process.stdout.write(event.choices[0]?.delta.content ?? '');
}
```

#### Python

```python filename="stream-text_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Write a short poem about the ocean."}],
    stream=True,
)

for event in response:
    if event.choices:
        print(event.choices[0].delta.content or "", end="", flush=True)
```

#### cURL

```bash filename="stream-text-chat.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Write a short poem about the ocean."
    }
  ],
  "stream": true
}'
```

#### Messages API

#### TypeScript

```typescript filename="stream-text-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "Write a short poem about the ocean." }],
  max_tokens: 1024,
  stream: true,
});

for await (const event of response) {
  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
    process.stdout.write(event.delta.text);
  }
}
```

#### Python

```python filename="stream-text_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Write a short poem about the ocean."}],
    max_tokens=1024,
    stream=True,
)

for event in response:
    if event.type == "content_block_delta" and event.delta.type == "text_delta":
        print(event.delta.text, end="", flush=True)
```

#### cURL

```bash filename="stream-text-messages.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Write a short poem about the ocean."
    }
  ],
  "max_tokens": 1024,
  "stream": true
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="stream-text-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: "anthropic/claude-sonnet-5",
  input: "Write a short poem about the ocean.",
  stream: true,
});

for await (const event of response) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  }
}
```

#### Python

```python filename="stream-text_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Write a short poem about the ocean.",
    stream=True,
)

for event in response:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
```

#### cURL

```bash filename="stream-text-responses.sh"
curl --fail-with-body --no-buffer https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Write a short poem about the ocean.",
  "stream": true
}'
```

## Tool calling

Connect a model to functions in your application. See [Tool Use](/docs/ai-gateway/inputs-and-tools/tool-use) for examples in every supported API format, argument schemas, and returning tool results.

## Structured output

For SDK options and result handling, see [AI SDK structured output](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) and [Python structured output](https://ai-python.dev/docs/basics/streaming#use-structured-output).

Use `generateText` with `Output.object` to get typed, schema-validated data instead of free-form text:

#### AI SDK

#### TypeScript

```typescript filename="structured.ts"
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  output: Output.object({
    schema: z.object({ name: z.string(), age: z.number().int(), city: z.string() }),
  }),
  model: "anthropic/claude-sonnet-5",
  prompt: "Extract: John is 30 years old and lives in NYC.",
});

console.log(output);
```

#### Python (beta)

```python filename="structured_ai.py"
import asyncio
import ai
from pydantic import BaseModel

class Person(BaseModel):
    name: str
    age: int
    city: str

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Extract: John is 30 years old and lives in NYC.")]
    async with ai.stream(model, messages, output_type=Person) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print(stream.output)

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="structured-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'person',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          age: {
            type: 'integer',
          },
          city: {
            type: 'string',
          },
        },
        required: ['name', 'age', 'city'],
        additionalProperties: false,
      },
    },
  },
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Extract: John is 30 years old and lives in NYC.',
    },
  ],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="structured_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    response_format={"type": "json_schema", "json_schema": {"name": "person", "strict": True, "schema": {"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "integer"}, "city": {"type": "string"}}, "required": ["name", "age", "city"], "additionalProperties": False}}},
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Extract: John is 30 years old and lives in NYC."}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="structured-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Extract: John is 30 years old and lives in NYC."
    }
  ],
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "person",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "integer"
          },
          "city": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "age",
          "city"
        ],
        "additionalProperties": false
      }
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="structured-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  output_config: {
    format: {
      type: 'json_schema',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          age: {
            type: 'integer',
          },
          city: {
            type: 'string',
          },
        },
        required: ['name', 'age', 'city'],
        additionalProperties: false,
      },
    },
  },
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Extract: John is 30 years old and lives in NYC.',
    },
  ],
  max_tokens: 1024,
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="structured_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    output_config={"format": {"type": "json_schema", "schema": {"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "integer"}, "city": {"type": "string"}}, "required": ["name", "age", "city"], "additionalProperties": False}}},
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Extract: John is 30 years old and lives in NYC."}],
    max_tokens=1024,
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="structured-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Extract: John is 30 years old and lives in NYC."
    }
  ],
  "max_tokens": 1024,
  "output_config": {
    "format": {
      "type": "json_schema",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "integer"
          },
          "city": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "age",
          "city"
        ],
        "additionalProperties": false
      }
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="structured-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  text: {
    format: {
      type: 'json_schema',
      name: 'person',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          age: {
            type: 'integer',
          },
          city: {
            type: 'string',
          },
        },
        required: ['name', 'age', 'city'],
        additionalProperties: false,
      },
    },
  },
  model: 'anthropic/claude-sonnet-5',
  input: 'Extract: John is 30 years old and lives in NYC.',
});

console.log(response.output_text);
```

#### Python

```python filename="structured_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    text={"format": {"type": "json_schema", "name": "person", "strict": True, "schema": {"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "integer"}, "city": {"type": "string"}}, "required": ["name", "age", "city"], "additionalProperties": False}}},
    model="anthropic/claude-sonnet-5",
    input="Extract: John is 30 years old and lives in NYC.",
)

print(response.output_text)
```

#### cURL

```bash filename="structured-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Extract: John is 30 years old and lives in NYC.",
  "text": {
    "format": {
      "type": "json_schema",
      "name": "person",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "integer"
          },
          "city": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "age",
          "city"
        ],
        "additionalProperties": false
      }
    }
  }
}'
```

> **💡 Note:** Text generation works with the AI SDK, the OpenAI Chat Completions and
> Responses APIs, and the Anthropic Messages API. See
> [SDKs and APIs](/docs/ai-gateway/sdks-and-apis) for the full list.

## Next steps

- [Text Generation quickstart](/docs/ai-gateway/getting-started/text) to make your first request
- [Models and Providers](/docs/ai-gateway/models-and-providers) to choose a model
- [Provider options](/docs/ai-gateway/models-and-providers/provider-options) for routing and fallbacks
- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) to enable step-by-step thinking


---

[View full sitemap](/docs/sitemap)
