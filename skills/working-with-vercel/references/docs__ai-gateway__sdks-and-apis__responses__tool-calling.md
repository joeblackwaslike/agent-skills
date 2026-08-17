---
title: Tool Calling
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Define tools the model can call with the OpenAI Responses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "57832b4d0035f2e6b4da82f138f13f31c9a41c1c9d4634e6ed9754ad0b1275e1"
---

# Tool Calling

Define tools with JSON Schema parameters. The model can call them, and you can feed the results back in a follow-up request:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling?from=related) — Define tools the model can call using the OpenResponses API.
- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling?from=related) — Use function calling with the Anthropic Messages API to allow models to call tools and functions.
- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling?from=related) — Use function calling with the Chat Completions API to enable models to call tools and functions through AI Gateway.
- [Call Tools](https://ai-sdk.dev/cookbook/node/call-tools?from=related)
- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related)
- [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai?from=related)
- [What is an LLM Tool?](https://vercel.com/kb/guide/what-is-an-llm-tool?from=related) — Learn what tools are, how tool calling works, and how you can use them to build agents.
- [REST API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api?from=related) — Use the AI Gateway API directly without client libraries using curl and fetch.
- [Structured Outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs?from=related) — Constrain OpenResponses API output to a JSON schema so every response parses.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/tool-calling.graph.md](/docs/ai-gateway/sdks-and-apis/responses/tool-calling.graph.md)
<!-- /docsgraph:related -->

#### \['cURL'

```bash filename="tool-calls.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
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

#### 'TypeScript'

```typescript filename="tools.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-5.6-sol',
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

#### 'Python']

```python filename="tools.py"
import os
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-5.6-sol',
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

To continue the conversation with tool results, include the function call and its output in the next request's `input` array:

#### \['cURL'

```bash filename="tool-followup.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
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

#### 'TypeScript'

```typescript
const functionCall = response.output.find(
  (item) => item.type === 'function_call',
);

const followup = await client.responses.create({
  model: 'openai/gpt-5.6-sol',
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

#### 'Python']

```python
import json

function_call = next(
    item for item in response.output if item.type == 'function_call'
)

followup = client.responses.create(
    model='openai/gpt-5.6-sol',
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


---

[View full sitemap](/docs/sitemap)
