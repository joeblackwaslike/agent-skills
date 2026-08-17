---
title: Direct REST API Usage
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Use the AI Gateway API directly without client libraries using curl and fetch.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4d45e7320ec3c7218388dfb68e134cc052e8a70512bf45b894b44f61955fb569"
---

# Direct REST API Usage

If you prefer to use the AI Gateway API directly without the OpenAI client libraries, you can make HTTP requests using any HTTP client. Here are examples using `curl` and JavaScript's `fetch` API:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Models & Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related) — Work with models and providers in AI Gateway: provider routing and fallbacks, filtering, timeouts, caching, service tier
- [Filtering, Ordering & Sorting](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering?from=related) — Control which providers handle your requests, in what order, and how they are ranked using order, only, and sort options
- [Provider Options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api.graph.md)
<!-- /docsgraph:related -->

### List models

#### cURL

```bash filename="list-models.sh"
curl -X GET "https://ai-gateway.vercel.sh/v1/models" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json"
```

#### JavaScript

```javascript filename="list-models.js"
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

### Basic chat completion

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

#### JavaScript

```javascript filename="chat-completion.js"
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

### Streaming chat completion

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

#### JavaScript

```javascript filename="streaming-chat.js"
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

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');

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

### Image analysis

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

#### JavaScript

```javascript filename="image-analysis.js"
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

### Tool calls

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

#### JavaScript

```javascript filename="tool-calls.js"
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

### Provider options

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

#### JavaScript

```javascript filename="provider-options.js"
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

### Provider sorting

Sort providers by cost, latency, or throughput using the `provider` shorthand or `providerOptions.gateway.sort`. Accepted values: `cost`, `ttft`, `tps`.

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

#### JavaScript

```javascript filename="provider-sort.js"
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


---

[View full sitemap](/docs/sitemap)
