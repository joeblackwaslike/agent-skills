---
title: OpenAI Chat Completions Structured Outputs with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Generate structured JSON responses that conform to a specific schema using the Chat Completions API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "8aba25634a26c56d9467844d5d9fc75fb1286e62dea2a74d5750f167a658b5ec"
---

# OpenAI Chat Completions Structured Outputs with AI Gateway

Generate structured JSON responses that conform to a specific schema, ensuring predictable and reliable data formats for your applications.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generating Structured Data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fstructured-outputs&source_site=vercel-docs&relationship=related)
- [Anthropic Messages Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Get JSON responses conforming to a JSON Schema from Anthropic models through AI Gateway.
- [OpenResponses Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Request schema-constrained JSON with OpenResponses through AI Gateway, and handle provider support and response validati
- [AI Gateway Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [OpenAI Responses Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Constrain a response to a JSON schema with the OpenAI Responses API through AI Gateway.
- [OpenAI Chat Completions Streaming with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/streaming?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Stream OpenAI Chat Completions responses token by token as they are generated through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Fstructured-outputs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### JSON Schema format

Use the OpenAI standard `json_schema` response format for the most robust structured output experience. This follows the official [OpenAI Structured Outputs specification](https://platform.openai.com/docs/guides/structured-outputs).

Example request

#### TypeScript

```typescript filename="structured-output-json-schema.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'Create a product listing for a wireless gaming headset.',
    },
  ],
  stream: false,
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'product_listing',
      description: 'A product listing with details and pricing',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Product name',
          },
          brand: {
            type: 'string',
            description: 'Brand name',
          },
          price: {
            type: 'number',
            description: 'Price in USD',
          },
          category: {
            type: 'string',
            description: 'Product category',
          },
          description: {
            type: 'string',
            description: 'Product description',
          },
          features: {
            type: 'array',
            items: { type: 'string' },
            description: 'Key product features',
          },
        },
        required: ['name', 'brand', 'price', 'category', 'description'],
        additionalProperties: false,
      },
    },
  },
});

console.log('Assistant:', completion.choices[0].message.content);

// Parse the structured response
const structuredData = JSON.parse(completion.choices[0].message.content ?? 'null');
console.log('Structured Data:', structuredData);
```

#### Python

```python filename="structured-output-json-schema.py"
import os
import json
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='openai/gpt-6-astra',
    messages=[
        {
            'role': 'user',
            'content': 'Create a product listing for a wireless gaming headset.'
        }
    ],
    stream=False,
    response_format={
        'type': 'json_schema',
        'json_schema': {
            'name': 'product_listing',
            'description': 'A product listing with details and pricing',
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string',
                        'description': 'Product name'
                    },
                    'brand': {
                        'type': 'string',
                        'description': 'Brand name'
                    },
                    'price': {
                        'type': 'number',
                        'description': 'Price in USD'
                    },
                    'category': {
                        'type': 'string',
                        'description': 'Product category'
                    },
                    'description': {
                        'type': 'string',
                        'description': 'Product description'
                    },
                    'features': {
                        'type': 'array',
                        'items': {'type': 'string'},
                        'description': 'Key product features'
                    }
                },
                'required': ['name', 'brand', 'price', 'category', 'description'],
                'additionalProperties': False
            },
        }
    }
)

print('Assistant:', completion.choices[0].message.content)

# Parse the structured response
structured_data = json.loads(completion.choices[0].message.content)
print('Structured Data:', json.dumps(structured_data, indent=2))
```

#### cURL

```bash filename="structured-output.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "messages": [
      {
        "role": "user",
        "content": "Create a product listing for a wireless gaming headset."
      }
    ],
    "stream": false,
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "product_listing",
        "description": "A product listing with details and pricing",
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Product name"
            },
            "brand": {
              "type": "string",
              "description": "Brand name"
            },
            "price": {
              "type": "number",
              "description": "Price in USD"
            },
            "category": {
              "type": "string",
              "description": "Product category"
            },
            "description": {
              "type": "string",
              "description": "Product description"
            },
            "features": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Key product features"
            }
          },
          "required": [
            "name",
            "brand",
            "price",
            "category",
            "description"
          ],
          "additionalProperties": false
        }
      }
    }
  }'
```

Response format

The response contains structured JSON that conforms to your specified schema:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "openai/gpt-6-astra",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"name\":\"SteelSeries Arctis 7P\",\"brand\":\"SteelSeries\",\"price\":149.99,\"category\":\"Gaming Headsets\",\"description\":\"Wireless gaming headset with 7.1 surround sound\",\"features\":[\"Wireless 2.4GHz\",\"7.1 Surround Sound\",\"24-hour battery\",\"Retractable microphone\"]}"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 45,
    "total_tokens": 70
  }
}
```

#### JSON Schema parameters

- **`type`**: Must be `"json_schema"`
- **`json_schema`**: Object containing schema definition
  - **`name`** (required): Name of the response schema
  - **`description`** (optional): Human-readable description of the expected output
  - **`schema`** (required): Valid JSON Schema object defining the structure

#### Legacy JSON format (alternative)

> **💡 Note:** **Legacy format:** The following format is supported for backward
> compatibility. For new implementations, use the `json_schema` format above.

#### TypeScript

```typescript filename="structured-output-legacy.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.post<OpenAI.Chat.Completions.ChatCompletion>(
  '/chat/completions',
  {
    body: {
      model: 'openai/gpt-6-astra',
      messages: [
        {
          role: 'user',
          content: 'Create a product listing for a wireless gaming headset.',
        },
      ],
      stream: false,

      response_format: {
        type: 'json',
        name: 'product_listing',
        description: 'A product listing with details and pricing',
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Product name',
            },
            brand: {
              type: 'string',
              description: 'Brand name',
            },
            price: {
              type: 'number',
              description: 'Price in USD',
            },
            category: {
              type: 'string',
              description: 'Product category',
            },
            description: {
              type: 'string',
              description: 'Product description',
            },
            features: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Key product features',
            },
          },
          required: ['name', 'brand', 'price', 'category', 'description'],
        },
      },
    },
  },
);

console.log('Assistant:', completion.choices[0].message.content);
```

#### Python

```python filename="structured-output-legacy.py"
import os
import json
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='openai/gpt-6-astra',
    messages=[
        {
            'role': 'user',
            'content': 'Create a product listing for a wireless gaming headset.'
        }
    ],
    stream=False,
    response_format={
        'type': 'json',
        'name': 'product_listing',
        'description': 'A product listing with details and pricing',
        'schema': {
            'type': 'object',
            'properties': {
                'name': {'type': 'string', 'description': 'Product name'},
                'brand': {'type': 'string', 'description': 'Brand name'},
                'price': {'type': 'number', 'description': 'Price in USD'},
                'category': {'type': 'string', 'description': 'Product category'},
                'description': {'type': 'string', 'description': 'Product description'},
                'features': {
                    'type': 'array',
                    'items': {'type': 'string'},
                    'description': 'Key product features'
                }
            },
            'required': ['name', 'brand', 'price', 'category', 'description']
        }
    }
)

print('Assistant:', completion.choices[0].message.content)

# Parse the structured response
structured_data = json.loads(completion.choices[0].message.content)
print('Structured Data:', json.dumps(structured_data, indent=2))
```

#### cURL

```bash filename="structured-output-legacy.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "messages": [
      {
        "role": "user",
        "content": "Create a product listing for a wireless gaming headset."
      }
    ],
    "stream": false,
    "response_format": {
      "type": "json",
      "name": "product_listing",
      "description": "A product listing with details and pricing",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Product name"
          },
          "brand": {
            "type": "string",
            "description": "Brand name"
          },
          "price": {
            "type": "number",
            "description": "Price in USD"
          },
          "category": {
            "type": "string",
            "description": "Product category"
          },
          "description": {
            "type": "string",
            "description": "Product description"
          },
          "features": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Key product features"
          }
        },
        "required": [
          "name",
          "brand",
          "price",
          "category",
          "description"
        ]
      }
    }
  }'
```

#### Streaming with structured outputs

Both `json_schema` and legacy `json` formats work with streaming responses:

#### TypeScript

```typescript filename="structured-streaming.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const stream = await openai.chat.completions.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'Create a product listing for a wireless gaming headset.',
    },
  ],
  stream: true,
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'product_listing',
      description: 'A product listing with details and pricing',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Product name' },
          brand: { type: 'string', description: 'Brand name' },
          price: { type: 'number', description: 'Price in USD' },
          category: { type: 'string', description: 'Product category' },
          description: { type: 'string', description: 'Product description' },
          features: {
            type: 'array',
            items: { type: 'string' },
            description: 'Key product features',
          },
        },
        required: ['name', 'brand', 'price', 'category', 'description'],
        additionalProperties: false,
      },
    },
  },
});

let completeResponse = '';
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
    completeResponse += content;
  }
}

// Parse the complete structured response
const structuredData = JSON.parse(completeResponse);
console.log('\nParsed Product:', structuredData);
```

#### Python

```python filename="structured-streaming.py"
import os
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='openai/gpt-6-astra',
    messages=[
        {
            'role': 'user',
            'content': 'Create a product listing for a wireless gaming headset.'
        }
    ],
    stream=True,
    response_format={
        'type': 'json_schema',
        'json_schema': {
            'name': 'product_listing',
            'description': 'A product listing with details and pricing',
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'description': 'Product name'},
                    'brand': {'type': 'string', 'description': 'Brand name'},
                    'price': {'type': 'number', 'description': 'Price in USD'},
                    'category': {'type': 'string', 'description': 'Product category'},
                    'description': {'type': 'string', 'description': 'Product description'},
                    'features': {
                        'type': 'array',
                        'items': {'type': 'string'},
                        'description': 'Key product features'
                    }
                },
                'required': ['name', 'brand', 'price', 'category', 'description'],
                'additionalProperties': False
            },
        }
    }
)

complete_response = ''
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        content = chunk.choices[0].delta.content
        print(content, end='', flush=True)
        complete_response += content

# Parse the complete structured response
structured_data = json.loads(complete_response)
print('\nParsed Product:', json.dumps(structured_data, indent=2))
```

#### cURL

```bash filename="structured-streaming.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "messages": [
      {
        "role": "user",
        "content": "Create a product listing for a wireless gaming headset."
      }
    ],
    "stream": true,
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "product_listing",
        "description": "A product listing with details and pricing",
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Product name"
            },
            "brand": {
              "type": "string",
              "description": "Brand name"
            },
            "price": {
              "type": "number",
              "description": "Price in USD"
            },
            "category": {
              "type": "string",
              "description": "Product category"
            },
            "description": {
              "type": "string",
              "description": "Product description"
            },
            "features": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Key product features"
            }
          },
          "required": [
            "name",
            "brand",
            "price",
            "category",
            "description"
          ],
          "additionalProperties": false
        }
      }
    }
  }'
```

> **💡 Note:** **Streaming assembly:** When using structured outputs with streaming, you'll
> need to collect all the content chunks and parse the complete JSON response
> once the stream is finished.


---

[View full sitemap](/docs/sitemap)
