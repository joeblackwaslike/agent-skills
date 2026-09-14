---
title: Anthropic Messages Structured Outputs with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Get JSON responses conforming to a JSON Schema from Anthropic models through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "fba49b05b5f8210a3edafeaecbfb7d058a48382c8275e625b1bdcbcb588b44c5"
---

# Anthropic Messages Structured Outputs with AI Gateway

Structured outputs constrain completed model responses to a JSON Schema. Check for refusals, errors, and output-token limits before parsing the result. This is useful when you need to extract structured data, build reliable pipelines, or integrate model responses directly into your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generating Structured Data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=related)
- [Output](https://ai-sdk.dev/docs/reference/ai-sdk-core/output?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=related)
- [Output Schema](https://eve.dev/docs/guides/client/output-schema?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Request structured results from eve client turns and read typed data from MessageResult.
- [OpenAI Chat Completions Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Generate structured JSON responses that conform to a specific schema using the Chat Completions API through AI Gateway.
- [OpenResponses Structured Outputs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Request schema-constrained JSON with OpenResponses through AI Gateway, and handle provider support and response validati
- [AI Gateway Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fanthropic-messages-api%2Fstructured-outputs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

AI Gateway supports two approaches for structured outputs with Anthropic models:

- **GA API** (`output_config.format`): The stable, generally available path
- **Beta API** (`output_format` with the `structured-outputs-2025-11-13` beta header): The original beta path

For full details on structured outputs, see the [Anthropic structured outputs documentation](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).

## Using `output_config.format` (GA)

The GA API uses the `output_config.format` field to specify a JSON Schema. No beta header is required.

Example request

#### TypeScript

```typescript filename="structured-output.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const personSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    email: { type: 'string' },
    skills: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['name', 'age', 'email', 'skills'],
};

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Generate a profile for a software engineer in Austin, TX.',
    },
  ],

  output_config: {
    format: {
      type: 'json_schema',
      schema: personSchema,
    },
  },
});

const textBlock = message.content.find((b) => b.type === 'text');
if (textBlock?.type === 'text') {
  const person = JSON.parse(textBlock.text);
  console.log(person.name, person.skills);
}
```

#### Python

```python filename="structured_output.py"
import os
import json
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

person_schema = {
    'type': 'object',
    'additionalProperties': False,
    'properties': {
        'name': {'type': 'string'},
        'age': {'type': 'number'},
        'email': {'type': 'string'},
        'skills': {
            'type': 'array',
            'items': {'type': 'string'},
        },
    },
    'required': ['name', 'age', 'email', 'skills'],
}

message = client.messages.create(
    model='anthropic/claude-sonnet-5',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': 'Generate a profile for a software engineer in Austin, TX.'
        }
    ],
    output_config={
        'format': {
            'type': 'json_schema',
            'schema': person_schema,
        },
    },
)

text_block = next(b for b in message.content if b.type == 'text')
person = json.loads(text_block.text)
print(person['name'], person['skills'])
```

#### cURL

```bash filename="structured-output.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user",
        "content": "Generate a profile for a software engineer in Austin, TX."
      }
    ],
    "output_config": {
      "format": {
        "type": "json_schema",
        "schema": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "name": { "type": "string" },
            "age": { "type": "number" },
            "email": { "type": "string" },
            "skills": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["name", "age", "email", "skills"]
        }
      }
    }
  }'
```

You can combine `format` with `effort` in the same `output_config` object:

```typescript
output_config: {
  effort: 'high',
  format: {
    type: 'json_schema',
    schema: personSchema,
  },
},
```

## Using `output_format` (beta)

The beta API uses the `output_format` field along with the `structured-outputs-2025-11-13` beta header.

Example request

#### TypeScript

```typescript filename="structured-output-beta.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const forecastSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    location: { type: 'string' },
    temperature: { type: 'number' },
    conditions: { type: 'string' },
    forecast: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          day: { type: 'string' },
          high: { type: 'number' },
          low: { type: 'number' },
          conditions: { type: 'string' },
        },
        required: ['day', 'high', 'low', 'conditions'],
      },
    },
  },
  required: ['location', 'temperature', 'conditions', 'forecast'],
};

const message = await anthropic.beta.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Give me a weather forecast for San Francisco, CA.',
    },
  ],

  output_format: {
    type: 'json_schema',
    schema: forecastSchema,
  },
  betas: ['structured-outputs-2025-11-13'],
});

const textBlock = message.content.find((b) => b.type === 'text');
if (textBlock?.type === 'text') {
  const forecast = JSON.parse(textBlock.text);
  console.log(forecast.location, forecast.temperature);
}
```

#### Python

```python filename="structured_output_beta.py"
import os
import json
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

forecast_schema = {
    'type': 'object',
    'additionalProperties': False,
    'properties': {
        'location': {'type': 'string'},
        'temperature': {'type': 'number'},
        'conditions': {'type': 'string'},
        'forecast': {
            'type': 'array',
            'items': {
                'type': 'object',
                'additionalProperties': False,
                'properties': {
                    'day': {'type': 'string'},
                    'high': {'type': 'number'},
                    'low': {'type': 'number'},
                    'conditions': {'type': 'string'},
                },
                'required': ['day', 'high', 'low', 'conditions'],
            },
        },
    },
    'required': ['location', 'temperature', 'conditions', 'forecast'],
}

message = client.messages.create(
    model='anthropic/claude-sonnet-5',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': 'Give me a weather forecast for San Francisco, CA.'
        }
    ],
    extra_body={
        'output_format': {
            'type': 'json_schema',
            'schema': forecast_schema,
        },
    },
    extra_headers={
        'anthropic-beta': 'structured-outputs-2025-11-13',
    },
)

text_block = next(b for b in message.content if b.type == 'text')
forecast = json.loads(text_block.text)
print(forecast['location'], forecast['temperature'])
```

#### cURL

```bash filename="structured-output-beta.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-beta: structured-outputs-2025-11-13" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "max_tokens": 1024,
    "messages": [
      { "role": "user", "content": "Give me a weather forecast for San Francisco, CA." }
    ],
    "output_format": {
      "type": "json_schema",
      "schema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "location": { "type": "string" },
          "temperature": { "type": "number" },
          "conditions": { "type": "string" },
          "forecast": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "day": { "type": "string" },
                "high": { "type": "number" },
                "low": { "type": "number" },
                "conditions": { "type": "string" }
              },
              "required": ["day", "high", "low", "conditions"]
            }
          }
        },
        "required": ["location", "temperature", "conditions", "forecast"]
      }
    }
  }'
```

## Streaming structured outputs

Structured outputs work with streaming. The model produces valid JSON incrementally, and each `text_delta` event contains a fragment of the JSON. Accumulate the fragments and parse the complete JSON when the stream ends.

Example request

#### TypeScript

```typescript filename="structured-output-stream.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const recipeSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    cuisine: { type: 'string' },
    difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
    servings: { type: 'number' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          amount: { type: 'string' },
        },
        required: ['name', 'amount'],
      },
    },
    steps: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'cuisine', 'difficulty', 'servings', 'ingredients', 'steps'],
};

const stream = await anthropic.beta.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 2048,
  stream: true,
  messages: [
    {
      role: 'user',
      content: 'Give me a recipe for classic Italian lasagna.',
    },
  ],

  output_format: {
    type: 'json_schema',
    schema: recipeSchema,
  },
  betas: ['structured-outputs-2025-11-13'],
});

let fullJson = '';

for await (const event of stream) {
  if (
    event.type === 'content_block_delta' &&
    event.delta.type === 'text_delta'
  ) {
    fullJson += event.delta.text;
  }
}

const recipe = JSON.parse(fullJson);
console.log(recipe.name, recipe.cuisine);
```

#### Python

```python filename="structured_output_stream.py"
import os
import json
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

recipe_schema = {
    'type': 'object',
    'additionalProperties': False,
    'properties': {
        'name': {'type': 'string'},
        'cuisine': {'type': 'string'},
        'difficulty': {'type': 'string', 'enum': ['easy', 'medium', 'hard']},
        'servings': {'type': 'number'},
        'ingredients': {
            'type': 'array',
            'items': {
                'type': 'object',
                'additionalProperties': False,
                'properties': {
                    'name': {'type': 'string'},
                    'amount': {'type': 'string'},
                },
                'required': ['name', 'amount'],
            },
        },
        'steps': {'type': 'array', 'items': {'type': 'string'}},
    },
    'required': ['name', 'cuisine', 'difficulty', 'servings', 'ingredients', 'steps'],
}

full_json = ''

with client.messages.stream(
    model='anthropic/claude-sonnet-5',
    max_tokens=2048,
    messages=[
        {
            'role': 'user',
            'content': 'Give me a recipe for classic Italian lasagna.'
        }
    ],
    extra_body={
        'output_format': {
            'type': 'json_schema',
            'schema': recipe_schema,
        },
    },
    extra_headers={
        'anthropic-beta': 'structured-outputs-2025-11-13',
    },
) as stream:
    for text in stream.text_stream:
        full_json += text

recipe = json.loads(full_json)
print(recipe['name'], recipe['cuisine'])
```

#### cURL

```bash filename="structured-output-stream.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-beta: structured-outputs-2025-11-13" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "max_tokens": 1024,
    "stream": true,
    "messages": [
      { "role": "user", "content": "Give me a weather forecast for San Francisco, CA." }
    ],
    "output_format": {
      "type": "json_schema",
      "schema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "location": { "type": "string" },
          "temperature": { "type": "number" },
          "conditions": { "type": "string" },
          "forecast": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "day": { "type": "string" },
                "high": { "type": "number" },
                "low": { "type": "number" },
                "conditions": { "type": "string" }
              },
              "required": ["day", "high", "low", "conditions"]
            }
          }
        },
        "required": ["location", "temperature", "conditions", "forecast"]
      }
    }
  }'
```

## Response format

A completed structured response contains JSON in a `text` content block:

```json
{
  "id": "msg_123",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "{\"name\":\"Alex Chen\",\"age\":29,\"email\":\"alex@example.com\",\"skills\":[\"TypeScript\",\"React\",\"Node.js\"]}"
    }
  ],
  "model": "anthropic/claude-sonnet-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 80
  }
}
```

## Schema requirements

- Set `additionalProperties: false` on all object types in your schema
- Include a `required` array listing all properties on each object
- Supported types: `string`, `number`, `boolean`, `array`, `object`, and `enum`

> **💡 Note:** For complete schema requirements and best practices, see the [Anthropic structured outputs documentation](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).


---

[View full sitemap](/docs/sitemap)
