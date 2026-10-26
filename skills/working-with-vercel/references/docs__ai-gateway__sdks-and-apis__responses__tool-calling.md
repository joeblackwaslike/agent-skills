---
title: OpenAI Responses Tool Calling with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Define tools the model can call with the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "2eb452de4d1e020798ffa92fa940104cba865ee3adfabc7a41aecff1e0b2af2a"
---

# OpenAI Responses Tool Calling with AI Gateway

Define tools with JSON Schema parameters. The model can call them, and you can feed the results back in a follow-up request:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Cat Jam is now available in stealth for free on AI Gateway](https://vercel.com/changelog/cat-jam-is-now-available-in-stealth-for-free-on-ai-gateway)
- [Glyph Cluster is now available in stealth for free on AI Gateway](https://vercel.com/changelog/glyph-cluster-is-now-available-in-stealth-for-free-on-ai-gateway)
- [Reflection AI's Beam now available on AI Gateway for free](https://vercel.com/changelog/reflection-ai-beam-now-available-on-ai-gateway-for-free)
- [OpenResponses Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling) — Define tools the model can call using the OpenResponses API through AI Gateway.
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples
- [Anthropic Messages Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling) — Use function calling with the Anthropic Messages API to allow models to call tools and functions through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/tool-calling.graph.md](/docs/ai-gateway/sdks-and-apis/responses/tool-calling.graph.md)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="tools.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: 'What is the weather in San Francisco?',
  tools: [
    {
      type: 'function',
      name: 'get_weather',
      description: 'Get the current weather for a location',
      strict: true,
      parameters: {
        type: 'object',
        properties: {
          location: { type: 'string' },
        },
        required: ['location'],
        additionalProperties: false,
      },
    },
  ],
});

// The model returns function_call items in the output
for (const item of response.output) {
  if (item.type === 'function_call') {
    console.log(`Call: ${item.name}(${item.arguments})`);
  }
}
```

#### Python

```python filename="tools.py"
import os
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-6-astra',
    input='What is the weather in San Francisco?',
    tools=[
        {
            'type': 'function',
            'name': 'get_weather',
            'description': 'Get the current weather for a location',
            'strict': True,
            'parameters': {
                'type': 'object',
                'properties': {
                    'location': {'type': 'string'},
                },
                'required': ['location'],
                'additionalProperties': False,
            },
        },
    ],
)

for item in response.output:
    if item.type == 'function_call':
        print(f'Call: {item.name}({item.arguments})')
```

#### cURL

```bash filename="tool-calls.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": "What is the weather in San Francisco?",
    "tools": [
      {
        "type": "function",
        "name": "get_weather",
        "description": "Get the current weather for a location",
        "strict": true,
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string"
            }
          },
          "required": [
            "location"
          ],
          "additionalProperties": false
        }
      }
    ]
  }'
```

To continue the conversation with tool results, include the function call and its output in the next request's `input` array:

#### TypeScript

```typescript
const functionCall = response.output.find(
  (item) => item.type === 'function_call',
);

const followup = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: [
    { role: 'user', content: 'What is the weather in San Francisco?' },
    {
      type: 'function_call',
      id: functionCall.id,
      call_id: functionCall.call_id,
      name: functionCall.name,
      arguments: functionCall.arguments,
    },
    {
      type: 'function_call_output',
      call_id: functionCall.call_id,
      output: JSON.stringify({ temperature: 68, condition: 'Sunny' }),
    },
  ],
  tools: [
    /* same tools as above */
  ],
});

console.log(followup.output_text);
```

#### Python

```python
import json

function_call = next(
    item for item in response.output if item.type == 'function_call'
)

followup = client.responses.create(
    model='openai/gpt-6-astra',
    input=[
        {'role': 'user', 'content': 'What is the weather in San Francisco?'},
        {
            'type': 'function_call',
            'id': function_call.id,
            'call_id': function_call.call_id,
            'name': function_call.name,
            'arguments': function_call.arguments,
        },
        {
            'type': 'function_call_output',
            'call_id': function_call.call_id,
            'output': json.dumps({'temperature': 68, 'condition': 'Sunny'}),
        },
    ],
    tools=[
        # same tools as above
    ],
)

print(followup.output_text)
```

#### cURL

```bash filename="tool-followup.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": [
      { "role": "user", "content": "What is the weather in San Francisco?" },
      {
        "type": "function_call",
        "call_id": "call_abc123",
        "name": "get_weather",
        "arguments": "{\"location\": \"San Francisco, CA\"}"
      },
      {
        "type": "function_call_output",
        "call_id": "call_abc123",
        "output": "{\"temperature\": 68, \"condition\": \"Sunny\"}"
      }
    ],
    "tools": [
      {
        "type": "function",
        "name": "get_weather",
        "description": "Get the current weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": { "type": "string" }
          },
          "required": ["location"]
        }
      }
    ]
  }'
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
