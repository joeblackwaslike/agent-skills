---
title: OpenAI Chat Completions Tool Calling with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Use function calling with the Chat Completions API to enable models to call tools and functions through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "76301ca74dc2d4db7f8acd37efb4aff93d98f10453bc3759693b56f08edcb921"
---

# OpenAI Chat Completions Tool Calling with AI Gateway

The Chat Completions API supports function calling, allowing models to call tools and functions. This follows the same specification as the [OpenAI Function Calling API](https://platform.openai.com/docs/guides/function-calling).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Ftool-calling&source_site=vercel-docs&relationship=related)
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Ftool-calling&source_site=vercel-docs&relationship=related) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples
- [Call Tools](https://ai-sdk.dev/cookbook/next/call-tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Ftool-calling&source_site=vercel-docs&relationship=related)
- [OpenAI Responses Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Ftool-calling&source_site=vercel-docs&relationship=related) — Define tools the model can call with the OpenAI Responses API through AI Gateway.
- [Anthropic Messages Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Ftool-calling&source_site=vercel-docs&relationship=related) — Use function calling with the Anthropic Messages API to allow models to call tools and functions through AI Gateway.
- [OpenResponses Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Ftool-calling&source_site=vercel-docs&relationship=related) — Define tools the model can call using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenai-chat-completions%2Ftool-calling&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### Basic tool calls

#### TypeScript

```typescript filename="tool-calls.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
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
];

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'What is the weather like in San Francisco?',
    },
  ],
  tools: tools,
  tool_choice: 'auto',
  stream: false,
});

console.log('Assistant:', completion.choices[0].message.content);
console.log('Tool calls:', completion.choices[0].message.tool_calls);
```

#### Python

```python filename="tool-calls.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

tools = [
    {
        'type': 'function',
        'function': {
            'name': 'get_weather',
            'description': 'Get the current weather in a given location',
            'parameters': {
                'type': 'object',
                'properties': {
                    'location': {
                        'type': 'string',
                        'description': 'The city and state, e.g. San Francisco, CA'
                    },
                    'unit': {
                        'type': 'string',
                        'enum': ['celsius', 'fahrenheit'],
                        'description': 'The unit for temperature'
                    }
                },
                'required': ['location']
            }
        }
    }
]

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'What is the weather like in San Francisco?'
        }
    ],
    tools=tools,
    tool_choice='auto',
    stream=False,
)

print('Assistant:', completion.choices[0].message.content)
print('Tool calls:', completion.choices[0].message.tool_calls)
```

#### cURL

```bash filename="tool-calls.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      { "role": "user", "content": "What is the weather like in San Francisco?" }
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

> **💡 Note:** **Controlling tool selection:** By default, `tool_choice` is set to `'auto'`, allowing the model to decide when to use tools. You can also:* Set to `'none'` to disable tool calls
> * Force a specific tool with: `tool_choice: { type: 'function', function: { name: 'your_function_name' } }`

#### Tool call response format

When the model makes tool calls, the response includes tool call information:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "anthropic/claude-opus-5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_123",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"location\": \"San Francisco, CA\", \"unit\": \"celsius\"}"
            }
          }
        ]
      },
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 82,
    "completion_tokens": 18,
    "total_tokens": 100
  }
}
```


---

[View full sitemap](/docs/sitemap)
