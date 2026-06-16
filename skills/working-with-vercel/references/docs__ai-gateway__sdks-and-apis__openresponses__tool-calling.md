---
title: Tool Calling
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling"
last_updated: 2026-05-11
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Define tools the model can call using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "03d5380b1aed7408be02ffa4bc66887a173f5dd019ed0617c78767c8c98069a8"
---

# Tool Calling

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) supports tool calling to give models access to external functions. Define tools in your request with a name, description, and JSON schema for parameters. When the model determines it needs a tool to answer the user's question, it returns a `function_call` output with the tool name and arguments for you to execute.

#### \['TypeScript'

```typescript filename="tool-calls.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-5.5',
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
        function: {
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
      },
    ],
    tool_choice: 'auto',
  }),
});
```

#### 'Python']

```python filename="tool-calls.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-5.5',
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
            'function': {
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
        },
    ],
    tool_choice='auto',
)
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
