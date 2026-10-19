---
title: OpenResponses Tool Calling with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Define tools the model can call using the OpenResponses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "bb2fb4284548b44776a271b3046873fedf9a69c3f68e5539f834083b8fcc4198"
---

# OpenResponses Tool Calling with AI Gateway

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) supports tool calling to give models access to external functions. Define tools in your request with a name, description, and JSON schema for parameters. When the model determines it needs a tool to answer the user's question, it returns a `function_call` output with the tool name and arguments for you to execute.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Responses Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling) — Define tools the model can call with the OpenAI Responses API through AI Gateway.
- [Call Tools](https://ai-sdk.dev/cookbook/node/call-tools) — Learn how to call tools using the AI SDK and Node
- [What is an LLM Tool?](https://vercel.com/kb/guide/what-is-an-llm-tool) — Learn what tools are, how tool calling works, and how you can use them to build agents.
- [Anthropic Messages Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling) — Use function calling with the Anthropic Messages API to allow models to call tools and functions through AI Gateway.
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples
- [OpenAI Chat Completions Tool Calling with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling) — Use function calling with the Chat Completions API to enable models to call tools and functions through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling.graph.md)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="tool-calls.ts"
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
        content: 'What is the weather like in New York?',
      },
    ],
    tools: [
      {
        type: 'function',
        name: 'get_weather',
        description: 'Get the current weather in a location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and state, e.g. San Francisco, CA',
            },
          },
          required: ['location'],
        },
      },
    ],
    tool_choice: 'auto',
  }),
});
```

#### Python

```python filename="tool-calls.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-6-astra',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': 'What is the weather like in New York?',
        },
    ],
    tools=[
        {
            'type': 'function',
            'name': 'get_weather',
            'description': 'Get the current weather in a location',
            'parameters': {
                'type': 'object',
                'properties': {
                    'location': {
                        'type': 'string',
                        'description': 'The city and state, e.g. San Francisco, CA',
                    },
                },
                'required': ['location'],
            },
        },
    ],
    tool_choice='auto',
)
```

#### cURL

```bash filename="tool-calls.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "What is the weather like in New York?"
      }
    ],
    "tools": [
      {
        "type": "function",
        "name": "get_weather",
        "description": "Get the current weather in a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            }
          },
          "required": [
            "location"
          ]
        }
      }
    ],
    "tool_choice": "auto"
  }'
```

## Tool call response

When the model decides to call a tool, the response includes a `function_call` output:

```json
{
  "output": [
    {
      "type": "function_call",
      "name": "get_weather",
      "arguments": "{\"location\": \"New York, NY\"}",
      "call_id": "call_abc123"
    }
  ]
}
```

## Tool choice options

- `auto` - The model decides whether to call a tool
- `required` - The model must call at least one tool
- `none` - The model cannot call any tools


---

[View full sitemap](/docs/sitemap)
