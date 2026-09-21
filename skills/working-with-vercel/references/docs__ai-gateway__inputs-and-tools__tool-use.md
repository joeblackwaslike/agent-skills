---
title: AI Gateway Tool Use and Function Calling
product: vercel
url: /docs/ai-gateway/inputs-and-tools/tool-use
canonical_url: "https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling
  - /docs/ai-gateway/sdks-and-apis/responses/tool-calling
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
summary: Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "347ec9df96ded1ede39610a8d9d76a4b0010e85dc09b44e4f9417853aac331a4"
---

# AI Gateway Tool Use and Function Calling

Connect a model to functions in your application, such as a weather lookup or a database query. The model chooses a tool and supplies arguments; your application decides how to execute it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ftool-use&source_site=vercel-docs&relationship=related)
- [AI Tools Example](https://v0.app/docs/api/v1/examples/ai-tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ftool-use&source_site=vercel-docs&relationship=related) — Using v0-sdk with AI SDK for programmatic interaction
- [Node.js](https://ai-sdk.dev/docs/getting-started/nodejs?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ftool-use&source_site=vercel-docs&relationship=related)
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ftool-use&source_site=vercel-docs&relationship=related) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI SDK](https://vercel.com/docs/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ftool-use&source_site=vercel-docs&relationship=related) — Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ftool-use&source_site=vercel-docs&relationship=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported

Full cross-link map for this page: [/docs/ai-gateway/inputs-and-tools/tool-use.graph.md](/docs/ai-gateway/inputs-and-tools/tool-use.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ftool-use&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Set `AI_GATEWAY_API_KEY` and install your [SDK or API client](/docs/ai-gateway/sdks-and-apis#api-format-differences). Choose a model with tool-use support.

## How tool use works

1. Define the tool name, description, and argument schema.
2. Send the tool definitions with the conversation.
3. Validate the requested arguments and execute the matching application function.
4. Return the result using the original tool-call ID.
5. Continue the conversation until the model answers or your step limit stops the loop.

The examples below request a weather lookup. The Python beta runs an example function that returns fixed weather data. Other tabs print the requested function call so you can inspect it before execution.

## Request a tool call

Define a tool schema so the model can request a function call. The TypeScript and HTTP examples print the requested call; your application validates the arguments, executes the function, and sends a tool result. The Python beta example uses `ai.Agent` to execute the example function and continue the conversation automatically.

Tool-call and tool-result fields differ between [Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling), [Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling), and [Responses](/docs/ai-gateway/sdks-and-apis/responses/tool-calling). With AI SDK 7, add an `execute` function and `stopWhen: isStepCount(3)` to run a bounded tool loop.

#### AI SDK

#### TypeScript

```typescript filename="tools.ts"
import { generateText, tool } from 'ai';
import { z } from 'zod';

const { toolCalls } = await generateText({
  tools: {
    get_weather: tool({
      description: 'Get the weather for a city.',
      inputSchema: z.object({ city: z.string() }),
    }),
  },
  toolChoice: 'required',
  model: "anthropic/claude-sonnet-5",
  prompt: "What is the weather in San Francisco?",
});

console.log(toolCalls);
```

#### Python (beta)

```python filename="tools_ai.py"
import asyncio
import ai

@ai.tool
async def get_weather(city: str) -> str:
    """Get the weather for a city (example data)."""
    return f"The example weather in {city} is sunny, 64F."

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("What is the weather in San Francisco?")]
    agent = ai.Agent(tools=[get_weather])
    async with agent.run(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="tools-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  tools: [
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: 'Get the weather for a city.',
        parameters: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
            },
          },
          required: ['city'],
          additionalProperties: false,
        },
      },
    },
  ],
  tool_choice: 'required',
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'What is the weather in San Francisco?',
    },
  ],
});

console.log(response.choices[0]?.message.tool_calls);
```

#### Python

```python filename="tools_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    tools=[{"type": "function", "function": {"name": "get_weather", "description": "Get the weather for a city.", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"], "additionalProperties": False}}}],
    tool_choice="required",
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "What is the weather in San Francisco?"}],
)

print(response.choices[0].message.tool_calls)
```

#### cURL

```bash filename="tools-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "What is the weather in San Francisco?"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get the weather for a city.",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string"
            }
          },
          "required": [
            "city"
          ],
          "additionalProperties": false
        }
      }
    }
  ],
  "tool_choice": "required"
}'
```

#### Messages API

#### TypeScript

```typescript filename="tools-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  tools: [
    {
      name: 'get_weather',
      description: 'Get the weather for a city.',
      input_schema: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
          },
        },
        required: ['city'],
        additionalProperties: false,
      },
    },
  ],
  tool_choice: {
    type: 'any',
  },
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'What is the weather in San Francisco?',
    },
  ],
  max_tokens: 1024,
});

console.log(response.content);
```

#### Python

```python filename="tools_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    tools=[{"name": "get_weather", "description": "Get the weather for a city.", "input_schema": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"], "additionalProperties": False}}],
    tool_choice={"type": "any"},
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "What is the weather in San Francisco?"}],
    max_tokens=1024,
)

print(response.content)
```

#### cURL

```bash filename="tools-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "What is the weather in San Francisco?"
    }
  ],
  "max_tokens": 1024,
  "tools": [
    {
      "name": "get_weather",
      "description": "Get the weather for a city.",
      "input_schema": {
        "type": "object",
        "properties": {
          "city": {
            "type": "string"
          }
        },
        "required": [
          "city"
        ],
        "additionalProperties": false
      }
    }
  ],
  "tool_choice": {
    "type": "any"
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="tools-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  tools: [
    {
      type: 'function',
      name: 'get_weather',
      description: 'Get the weather for a city.',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
          },
        },
        required: ['city'],
        additionalProperties: false,
      },
      strict: true,
    },
  ],
  tool_choice: 'required',
  model: 'anthropic/claude-sonnet-5',
  input: 'What is the weather in San Francisco?',
});

console.log(response.output);
```

#### Python

```python filename="tools_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    tools=[{"type": "function", "name": "get_weather", "description": "Get the weather for a city.", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"], "additionalProperties": False}, "strict": True}],
    tool_choice="required",
    model="anthropic/claude-sonnet-5",
    input="What is the weather in San Francisco?",
)

print(response.output)
```

#### cURL

```bash filename="tools-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "What is the weather in San Francisco?",
  "tools": [
    {
      "type": "function",
      "name": "get_weather",
      "description": "Get the weather for a city.",
      "parameters": {
        "type": "object",
        "properties": {
          "city": {
            "type": "string"
          }
        },
        "required": [
          "city"
        ],
        "additionalProperties": false
      },
      "strict": true
    }
  ],
  "tool_choice": "required"
}'
```

## Return results and continue

For tool definitions and execution loops, see the AI SDK [tool-calling guide](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling) and the Python beta [tools guide](https://ai-python.dev/docs/basics/tools).

Use the tool-call ID returned by the model, including when it requests several calls in one response. Preserve the response items required by the chosen API when building the next turn:

| Format | Tool request | Tool result and continuation |
| --- | --- | --- |
| AI SDK 7 | `toolCalls` | Add `execute` to the tool and `stopWhen: isStepCount(3)` for a bounded loop. See the [SDK tool-loop example](/docs/ai-gateway/sdks-and-apis/ai-sdk#tool-calling). |
| AI SDK for Python (beta) | `ai.tool` functions registered with `ai.Agent` | The agent executes the registered functions and continues the conversation. See [Python tool calling](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#tool-calling-with-agents). |
| Chat Completions | Assistant `tool_calls` | Append the assistant message, then a `role: 'tool'` message with `tool_call_id`. See [Chat tool calling](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling). |
| Messages API | `tool_use` content block | Return a user message containing `tool_result` with `tool_use_id`. See [Messages tool calling](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling). |
| Responses / OpenResponses | `function_call` output item | Return `function_call_output` with `call_id`. See [Responses tools](/docs/ai-gateway/sdks-and-apis/responses/tool-calling) and [OpenResponses tools](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling). |

For production tools, authorize access in your application and validate arguments before executing a function. Set an application step limit so repeated calls cannot run indefinitely. Handle tool errors explicitly and keep credentials out of tool results.

## Provider tools and coding agents

Provider-executed tools such as [web search](/docs/ai-gateway/models-and-providers/web-search) use provider-specific definitions and behavior. Follow their guides instead of treating them as application functions.

To connect a coding agent or inspect model choices from the CLI, use the current [Vercel CLI](/docs/cli):

```bash filename="terminal"
npx vercel ai-gateway models list
npx vercel ai-gateway setup
```

See [coding agents](/docs/ai-gateway/coding-agents) for supported clients and setup instructions.


---

[View full sitemap](/docs/sitemap)
