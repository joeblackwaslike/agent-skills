---
title: OpenResponses Structured Outputs with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis/openresponses/reasoning
  - /docs/ai-gateway/sdks-and-apis/openresponses/tool-calling
  - /docs/ai-gateway/sdks-and-apis/openresponses/advanced
summary: Request schema-constrained JSON with OpenResponses through AI Gateway, and handle provider support and response validation.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "974a778b2178506e7b6295c7e0f251b62e1e33a7906e291c715664894df0ea0e"
---

# OpenResponses Structured Outputs with AI Gateway

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) can constrain a response to a JSON schema, so you get parseable data instead of prose you have to extract from. Set `text.format` to a `json_schema` object with your schema. Check provider support and handle refusals, incomplete responses, and validation errors before using the result.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Responses Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Constrain a response to a JSON schema with the OpenAI Responses API through AI Gateway.
- [Anthropic Messages Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Get JSON responses conforming to a JSON Schema from Anthropic models through AI Gateway.
- [OpenAI Chat Completions Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Generate structured JSON responses that conform to a specific schema using the Chat Completions API through AI Gateway.
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fstructured-outputs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="structured.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-6-astra',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Extract: John is 30 years old and lives in NYC.',
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'person',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'integer' },
            city: { type: 'string' },
          },
          required: ['name', 'age', 'city'],
          additionalProperties: false,
        },
      },
    },
  }),
});

const result = await response.json();
const message = result.output.find((item: { type: string }) => item.type === 'message');
console.log(JSON.parse(message.content[0].text));
// { name: 'John', age: 30, city: 'NYC' }
```

#### Python

```python filename="structured.py"
import json
import os

import requests

api_key = os.environ["AI_GATEWAY_API_KEY"]

response = requests.post(
    "https://ai-gateway.vercel.sh/v1/responses",
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    },
    json={
        "model": "openai/gpt-6-astra",
        "input": [
            {
                "type": "message",
                "role": "user",
                "content": "Extract: John is 30 years old and lives in NYC.",
            }
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "person",
                "schema": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "age": {"type": "integer"},
                        "city": {"type": "string"},
                    },
                    "required": ["name", "age", "city"],
                    "additionalProperties": False,
                },
            }
        },
    },
)

result = response.json()
message = next(item for item in result["output"] if item["type"] == "message")
print(json.loads(message["content"][0]["text"]))
# {'name': 'John', 'age': 30, 'city': 'NYC'}
```

#### cURL

```bash filename="structured-outputs.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "Extract: John is 30 years old and lives in NYC."
      }
    ],
    "text": {
      "format": {
        "type": "json_schema",
        "name": "person",
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

## Reading the response

The JSON arrives as text inside the output message, not as a parsed object. The `output` array can also carry other item types before the message, such as a `reasoning` item on a reasoning model, so find the message by type rather than taking `output[0]`:

```typescript
const message = result.output.find((item: { type: string }) => item.type === 'message');
const data = JSON.parse(message.content[0].text);
```

## Schema requirements

| Field | Required | Notes |
| ----- | -------- | ----- |
| `type` | Yes | Always `json_schema` |
| `name` | Yes | A name for the schema, such as `person` |
| `schema` | Yes | A JSON Schema object describing the shape you want |

Set `additionalProperties` to `false` and list every property in `required` for the strictest results. Models follow a schema more reliably when each property has a clear name, and when nesting stays shallow.

> **💡 Note:** Schema support varies by model. If a model doesn't support structured outputs,
> the request still succeeds but the response may not match your schema, so parse
> defensively rather than assuming the shape.

## Next steps

- [Reasoning](/docs/ai-gateway/sdks-and-apis/openresponses/reasoning) - Combine a schema with a reasoning model
- [Tool calling](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling) - Let the model call your functions
- [Advanced](/docs/ai-gateway/sdks-and-apis/openresponses/advanced) - Configure fallbacks and provider-specific settings


---

[View full sitemap](/docs/sitemap)
