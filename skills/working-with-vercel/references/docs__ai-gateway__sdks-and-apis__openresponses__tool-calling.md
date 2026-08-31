---
title: Tool Calling
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/tool-calling
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Define tools the model can call using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "22d069fada31859a2d3de433c19b5172c18330937f143d366d9d7e3d64b06e36"
---

# Tool Calling

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) supports tool calling to give models access to external functions. Define tools in your request with a name, description, and JSON schema for parameters. When the model determines it needs a tool to answer the user's question, it returns a `function_call` output with the tool name and arguments for you to execute.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Tool Calling](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Define tools the model can call with the OpenAI Responses API.
- [Tool Calls](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Use function calling with the Anthropic Messages API to allow models to call tools and functions.
- [Tool Calls](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Use function calling with the Chat Completions API to enable models to call tools and functions through AI Gateway.
- [What is an LLM Tool?](https://vercel.com/kb/guide/what-is-an-llm-tool?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Learn what tools are, how tool calling works, and how you can use them to build agents.
- [Call Tools](https://ai-sdk.dev/cookbook/node/call-tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related)
- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related)
- [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related)
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Tools](https://eve.dev/docs/tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Define typed actions the agent can call, and gate sensitive ones on human approval.
- [OpenAI Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=related) — Generate text responses using the OpenResponses API.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Ftool-calling&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### \['cURL'

```bash filename="tool-calls.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
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

#### 'TypeScript'

```typescript filename="tool-calls.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-5.6-sol',
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

#### 'Python']

```python filename="tool-calls.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-5.6-sol',
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
