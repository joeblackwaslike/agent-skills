---
title: Tool Calls
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Use function calling with the Chat Completions API to enable models to call tools and functions through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b1ac82f0387d30abd0d35a4c819a5a3639bd4085adb965a7ea8d9081c8888886"
---

# Tool Calls

The Chat Completions API supports function calling, allowing models to call tools and functions. This follows the same specification as the [OpenAI Function Calling API](https://platform.openai.com/docs/guides/function-calling).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling?from=related) — Use function calling with the Anthropic Messages API to allow models to call tools and functions.
- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling?from=related) — Define tools the model can call using the OpenResponses API.
- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related)
- [What is an LLM Tool?](https://vercel.com/kb/guide/what-is-an-llm-tool?from=related) — Learn what tools are, how tool calling works, and how you can use them to build agents.
- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling?from=related) — Define tools the model can call with the OpenAI Responses API.
- [Call Tools](https://ai-sdk.dev/cookbook/next/call-tools?from=related)
- [Call Tools](https://ai-sdk.dev/cookbook/node/call-tools?from=related)
- [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai?from=related)
- [Tools](https://eve.dev/docs/tools?from=related) — Define typed actions the agent can call, and gate sensitive ones on human approval.
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools?from=related) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [AI SDK Tools](https://chat-sdk.dev/docs/ai/ai-sdk-tools?from=related) — Give an AI agent the ability to operate inside your workspace. Post messages, send DMs, react, edit, delete; all with bu
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling.graph.md](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling.graph.md)
<!-- /docsgraph:related -->

#### Basic tool calls

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
