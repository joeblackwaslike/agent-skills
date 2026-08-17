---
title: Tool Calls
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Use function calling with the Anthropic Messages API to allow models to call tools and functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "82e0471dd737ead31a2e5ba8096388f5dd54d6db2dcffb1221b0239037767233"
---

# Tool Calls

The Anthropic Messages API supports function calling, allowing models to call tools and functions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling?from=related) — Use function calling with the Chat Completions API to enable models to call tools and functions through AI Gateway.
- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling?from=related) — Define tools the model can call using the OpenResponses API.
- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling?from=related) — Define tools the model can call with the OpenAI Responses API.
- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related)
- [What is an LLM Tool?](https://vercel.com/kb/guide/what-is-an-llm-tool?from=related) — Learn what tools are, how tool calling works, and how you can use them to build agents.
- [Call Tools](https://ai-sdk.dev/cookbook/node/call-tools?from=related)
- [Call Tools](https://ai-sdk.dev/cookbook/next/call-tools?from=related)
- [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai?from=related)
- [Tools](https://eve.dev/docs/tools?from=related) — Define typed actions the agent can call, and gate sensitive ones on human approval.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling.graph.md)
<!-- /docsgraph:related -->

Example request

#### cURL

```bash filename="tool-calls.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "max_tokens": 1024,
    "tools": [
      {
        "name": "get_weather",
        "description": "Get the current weather in a given location",
        "input_schema": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": [
                "celsius",
                "fahrenheit"
              ],
              "description": "The unit for temperature"
            }
          },
          "required": [
            "location"
          ]
        }
      }
    ],
    "messages": [
      {
        "role": "user",
        "content": "What is the weather like in San Francisco?"
      }
    ]
  }'
```

#### TypeScript

```typescript filename="tool-calls.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 1024,
  tools: [
    {
      name: 'get_weather',
      description: 'Get the current weather in a given location',
      input_schema: {
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
  ],
  messages: [
    {
      role: 'user',
      content: 'What is the weather like in San Francisco?',
    },
  ],
});

console.log('Response:', JSON.stringify(message.content, null, 2));
```

#### Python

```python filename="tool-calls.py"
import os
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    tools=[
        {
            'name': 'get_weather',
            'description': 'Get the current weather in a given location',
            'input_schema': {
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
    ],
    messages=[
        {
            'role': 'user',
            'content': 'What is the weather like in San Francisco?'
        }
    ],
)

print('Response:', message.content)
```

Tool call response format

When the model makes tool calls, the response includes tool use blocks:

```json
{
  "id": "msg_123",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_123",
      "name": "get_weather",
      "input": {
        "location": "San Francisco, CA",
        "unit": "fahrenheit"
      }
    }
  ],
  "model": "anthropic/claude-opus-5",
  "stop_reason": "tool_use",
  "usage": {
    "input_tokens": 82,
    "output_tokens": 45
  }
}
```


---

[View full sitemap](/docs/sitemap)
