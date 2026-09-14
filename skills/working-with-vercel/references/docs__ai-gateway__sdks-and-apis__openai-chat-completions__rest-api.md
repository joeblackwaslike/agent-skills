---
title: Call AI Gateway Chat Completions with REST
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Use AI Gateway API directly without client libraries using curl and fetch.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "0b0db549ab72361eb7fc508e55c77bf18c0d80d2c3f55ce13bbe18acd586bdb0"
---

# Call AI Gateway Chat Completions with REST

If you prefer to use the AI Gateway API directly without the OpenAI client libraries, you can make HTTP requests using any HTTP client. Here are examples using TypeScript's `fetch`, Python's standard library, and cURL:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Provider Filtering, Ordering, and Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Frest-api&source_site=vercel-docs&relationship=related) — Control AI Gateway provider routing with order, only, and sort. Set preferences, restrict providers, and rank them by co
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Frest-api&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [AI Gateway Service Tiers](https://vercel.com/docs/ai-gateway/models-and-providers/service-tiers?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Frest-api&source_site=vercel-docs&relationship=related) — Control processing priority and cost for OpenAI, Google AI Studio, Google Vertex AI, and SpaceXAI models using service t
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Frest-api&source_site=vercel-docs&relationship=related) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Frest-api&source_site=vercel-docs&relationship=related) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Frest-api&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

### List models

#### TypeScript

```typescript filename="list-models.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v1/models', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const models = await response.json();
console.log(models);
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/models',
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="list-models.sh"
curl -X GET "https://ai-gateway.vercel.sh/v1/models" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json"
```

### Basic chat completion

#### TypeScript

```typescript filename="chat-completion.ts"
const response = await fetch(
  'https://ai-gateway.vercel.sh/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-5',
      messages: [
        {
          role: 'user',
          content: 'Write a one-sentence bedtime story about a unicorn.',
        },
      ],
      stream: false,
    }),
  },
);

const result = await response.json();
console.log(result);
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/chat/completions',
    data=json.dumps({'model': 'anthropic/claude-opus-5', 'messages': [{'role': 'user', 'content': 'Write a one-sentence bedtime story about a unicorn.'}], 'stream': False}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="chat-completion.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Write a one-sentence bedtime story about a unicorn."
      }
    ],
    "stream": false
  }'
```

### Streaming chat completion

#### TypeScript

```typescript filename="streaming-chat.ts"
const response = await fetch(
  'https://ai-gateway.vercel.sh/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-5',
      messages: [
        {
          role: 'user',
          content: 'Write a one-sentence bedtime story about a unicorn.',
        },
      ],
      stream: true,
    }),
  },
);

if (!response.ok || !response.body) throw new Error(await response.text());
const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') {
        console.log('Stream complete');
        break;
      } else if (data.trim()) {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          process.stdout.write(content);
        }
      }
    }
  }
}
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/chat/completions',
    data=json.dumps({'model': 'anthropic/claude-opus-5', 'messages': [{'role': 'user', 'content': 'Write a one-sentence bedtime story about a unicorn.'}], 'stream': True}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    for line in response:
        print(line.decode(), end="")
```

#### cURL

```bash filename="streaming-chat.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Write a one-sentence bedtime story about a unicorn."
      }
    ],
    "stream": true
  }' \
  --no-buffer
```

### Image analysis

#### TypeScript

```typescript filename="image-analysis.ts"
import fs from 'node:fs';

// Read the image file as base64
const imageBuffer = fs.readFileSync('./image.png');
const imageBase64 = imageBuffer.toString('base64');

const response = await fetch(
  'https://ai-gateway.vercel.sh/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-5',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Describe this image in detail.' },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${imageBase64}`,
                detail: 'auto',
              },
            },
          ],
        },
      ],
      stream: false,
    }),
  },
);

const result = await response.json();
console.log(result);
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request
import base64
from pathlib import Path

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/chat/completions',
    data=json.dumps({'model': 'anthropic/claude-opus-5', 'messages': [{'role': 'user', 'content': [{'type': 'text', 'text': 'Describe this image in detail.'}, {'type': 'image_url', 'image_url': {'url': "data:image/png;base64," + base64.b64encode(Path("image.png").read_bytes()).decode(), 'detail': 'auto'}}]}], 'stream': False}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="image-analysis.sh"
# First, convert your image to base64
IMAGE_BASE64=$(base64 -i ./image.png)

curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Describe this image in detail."
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,'"$IMAGE_BASE64"'",
              "detail": "auto"
            }
          }
        ]
      }
    ],
    "stream": false
  }'
```

### Tool calls

#### TypeScript

```typescript filename="tool-calls.ts"
const response = await fetch(
  'https://ai-gateway.vercel.sh/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-5',
      messages: [
        {
          role: 'user',
          content: 'What is the weather like in San Francisco?',
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Get the current weather in a given location',
            parameters: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'The city and state, e.g. San Francisco, CA',
                },
                unit: {
                  type: 'string',
                  enum: ['celsius', 'fahrenheit'],
                  description: 'The unit for temperature',
                },
              },
              required: ['location'],
            },
          },
        },
      ],
      tool_choice: 'auto',
      stream: false,
    }),
  },
);

const result = await response.json();
console.log(result);
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/chat/completions',
    data=json.dumps({'model': 'anthropic/claude-opus-5', 'messages': [{'role': 'user', 'content': 'What is the weather like in San Francisco?'}], 'tools': [{'type': 'function', 'function': {'name': 'get_weather', 'description': 'Get the current weather in a given location', 'parameters': {'type': 'object', 'properties': {'location': {'type': 'string', 'description': 'The city and state, e.g. San Francisco, CA'}, 'unit': {'type': 'string', 'enum': ['celsius', 'fahrenheit'], 'description': 'The unit for temperature'}}, 'required': ['location']}}}], 'tool_choice': 'auto', 'stream': False}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="tool-calls.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "What is the weather like in San Francisco?"
      }
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get the current weather in a given location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "The city and state, e.g. San Francisco, CA"
              },
              "unit": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "The unit for temperature"
              }
            },
            "required": ["location"]
          }
        }
      }
    ],
    "tool_choice": "auto",
    "stream": false
  }'
```

### Provider options

#### TypeScript

```typescript filename="provider-options.ts"
const response = await fetch(
  'https://ai-gateway.vercel.sh/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-5',
      messages: [
        {
          role: 'user',
          content:
            'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.',
        },
      ],
      stream: false,
      providerOptions: {
        gateway: {
          order: ['vertex', 'anthropic'], // Try Vertex AI first, then Anthropic
        },
      },
    }),
  },
);

const result = await response.json();
console.log(result);
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/chat/completions',
    data=json.dumps({'model': 'anthropic/claude-opus-5', 'messages': [{'role': 'user', 'content': 'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.'}], 'stream': False, 'providerOptions': {'gateway': {'order': ['vertex', 'anthropic']}}}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="provider-options.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Tell me the history of the San Francisco Mission-style burrito in two paragraphs."
      }
    ],
    "stream": false,
    "providerOptions": {
      "gateway": {
        "order": ["vertex", "anthropic"]
      }
    }
  }'
```

### Provider sorting

Sort providers by cost, latency, or throughput using the `provider` shorthand or `providerOptions.gateway.sort`. Accepted values: `cost`, `ttft`, `tps`.

#### TypeScript

```typescript filename="provider-sort.ts"
const response = await fetch(
  'https://ai-gateway.vercel.sh/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-5',
      messages: [
        {
          role: 'user',
          content: 'What is 2 + 2? Answer in one sentence.',
        },
      ],
      stream: false,
      provider: {
        sort: 'tps', // Use the highest throughput provider first
      },
    }),
  },
);

const result = await response.json();
console.log(result);
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/chat/completions',
    data=json.dumps({'model': 'anthropic/claude-sonnet-5', 'messages': [{'role': 'user', 'content': 'What is 2 + 2? Answer in one sentence.'}], 'stream': False, 'provider': {'sort': 'tps'}}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="provider-sort.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "messages": [
      {
        "role": "user",
        "content": "What is 2 + 2? Answer in one sentence."
      }
    ],
    "stream": false,
    "provider": {
      "sort": "tps"
    }
  }'
```


---

[View full sitemap](/docs/sitemap)
