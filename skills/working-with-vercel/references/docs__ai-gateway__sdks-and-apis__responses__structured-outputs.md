---
title: OpenAI Responses Structured Outputs with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/structured-outputs
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/structured-outputs"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Constrain a response to a JSON schema with the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/structured-outputs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4857356259d72bc0564d7f287890ef5e0890d9283217708caaa0b80f44615c1e"
---

# OpenAI Responses Structured Outputs with AI Gateway

Use `text.format` to constrain the model's output to a JSON schema:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenResponses Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs) — Request schema-constrained JSON with OpenResponses through AI Gateway, and handle provider support and response validati
- [OpenAI Chat Completions Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs) — Generate structured JSON responses that conform to a specific schema using the Chat Completions API through AI Gateway.
- [Anthropic Messages Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs) — Get JSON responses conforming to a JSON Schema from Anthropic models through AI Gateway.
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [OpenResponses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation) — Generate text responses using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/structured-outputs.graph.md](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs.graph.md)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="structured.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: 'List 3 colors with their hex codes.',
  text: {
    format: {
      type: 'json_schema',
      name: 'colors',
      strict: true,
      schema: {
        type: 'object',
        properties: {
          colors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                hex: { type: 'string' },
              },
              required: ['name', 'hex'],
              additionalProperties: false,
            },
          },
        },
        required: ['colors'],
        additionalProperties: false,
      },
    },
  },
});

const data = JSON.parse(response.output_text);
console.log(data.colors);
```

#### Python

```python filename="structured.py"
import os
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-6-astra',
    input='List 3 colors with their hex codes.',
    text={
        'format': {
            'type': 'json_schema',
            'name': 'colors',
            'strict': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'colors': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'name': {'type': 'string'},
                                'hex': {'type': 'string'},
                            },
                            'required': ['name', 'hex'],
                            'additionalProperties': False,
                        },
                    },
                },
                'required': ['colors'],
                'additionalProperties': False,
            },
        },
    },
)

data = json.loads(response.output_text)
print(data['colors'])
```

#### cURL

```bash filename="structured-output.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": "List 3 colors with their hex codes.",
    "text": {
      "format": {
        "type": "json_schema",
        "name": "colors",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "colors": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "hex": {
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "hex"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": [
            "colors"
          ],
          "additionalProperties": false
        }
      }
    }
  }'
```


---

[View full sitemap](/docs/sitemap)
