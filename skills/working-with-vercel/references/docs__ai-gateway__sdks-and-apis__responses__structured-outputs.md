---
title: Structured Outputs
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/structured-outputs
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/structured-outputs"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Constrain a response to a JSON schema with the OpenAI Responses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/structured-outputs.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "1b62974f4c1de5e5cccf8571f1341a20d424997c37cb48d520c6d1a3bc91929f"
---

# Structured Outputs

Use `text.format` to constrain the model's output to a JSON schema:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Structured Outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Constrain OpenResponses API output to a JSON schema so every response parses.
- [Structured Outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Generate structured JSON responses that conform to a specific schema using the Chat Completions API.
- [Structured Outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Get JSON responses conforming to a JSON Schema from Anthropic models through AI Gateway.
- [Generating Structured Data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related)
- [Output](https://ai-sdk.dev/docs/reference/ai-sdk-core/output?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related)
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Generate text responses using the OpenResponses API.
- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Define tools the model can call with the OpenAI Responses API.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/structured-outputs.graph.md](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### \['cURL'

```bash filename="structured-output.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
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

#### 'TypeScript'

```typescript filename="structured.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-5.6-sol',
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

#### 'Python']

```python filename="structured.py"
import os
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-5.6-sol',
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


---

[View full sitemap](/docs/sitemap)
