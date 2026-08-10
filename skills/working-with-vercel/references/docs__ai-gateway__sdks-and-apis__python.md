---
title: Python
product: vercel
url: /docs/ai-gateway/sdks-and-apis/python
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/python"
last_updated: 2026-07-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
  - /docs/ai-gateway/authentication-and-byok/api-keys
summary: Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/python.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "220489c36e948bf901aee62263f5a319ee7081f1ad41d13fc984ea031fa2fa17"
---

# Python

To get started with Python and AI Gateway, you can either call the
[OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), or [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) API directly, or use the
official [OpenAI](https://github.com/openai/openai-python) and [Anthropic](https://github.com/anthropics/anthropic-sdk-python) Python SDKs,
which are covered below.

> **💡 Note:** You can also use the [AI SDK for
> Python](/docs/ai-gateway/sdks-and-apis/ai-sdk-python). It's currently in public beta.

## Installation

Install your preferred SDK:

#### Chat Completions

```bash
pip install openai
```

#### OpenAI Responses

```bash
pip install openai
```

#### Anthropic Messages

```bash
pip install anthropic
```

## Quick start

#### Chat Completions

```python filename="quickstart.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {'role': 'user', 'content': 'Explain quantum computing in one paragraph.'}
    ]
)

print(response.choices[0].message.content)
```

#### OpenAI Responses

```python filename="quickstart.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='anthropic/claude-opus-5',
    input='Explain quantum computing in one paragraph.',
)

print(response.output_text)
```

#### Anthropic Messages

```python filename="quickstart.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    messages=[
        {'role': 'user', 'content': 'Explain quantum computing in one paragraph.'}
    ]
)

print(message.content[0].text)
```

## Authentication

All SDKs support the same authentication methods. Use an [API key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key) for local development or [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc) for Vercel deployments.

```python filename="auth.py"
import os

# Option 1: API key (recommended for local development)
api_key = os.getenv('AI_GATEWAY_API_KEY')

# Option 2: OIDC token (automatic on Vercel deployments)
api_key = os.getenv('VERCEL_OIDC_TOKEN')

# Fallback pattern for code that runs both locally and on Vercel
api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')
```

## Streaming

Stream responses for real-time output in chat applications or long-running generations.

#### Chat Completions

```python filename="streaming.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {'role': 'user', 'content': 'Write a short story about a robot.'}
    ],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end='', flush=True)
```

#### OpenAI Responses

```python filename="streaming.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

stream = client.responses.create(
    model='anthropic/claude-opus-5',
    input='Write a short story about a robot.',
    stream=True,
)

for event in stream:
    if event.type == 'response.output_text.delta':
        print(event.delta, end='', flush=True)
```

#### Anthropic Messages

```python filename="streaming.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

with client.messages.stream(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    messages=[
        {'role': 'user', 'content': 'Write a short story about a robot.'}
    ]
) as stream:
    for text in stream.text_stream:
        print(text, end='', flush=True)
```

## Async support

Both the OpenAI and Anthropic SDKs provide async clients for use with `asyncio`.

#### Chat Completions

```python filename="async_client.py"
import os
import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

async def main():
    response = await client.chat.completions.create(
        model='anthropic/claude-opus-5',
        messages=[
            {'role': 'user', 'content': 'Hello!'}
        ]
    )
    print(response.choices[0].message.content)

asyncio.run(main())
```

#### OpenAI Responses

```python filename="async_client.py"
import os
import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

async def main():
    response = await client.responses.create(
        model='anthropic/claude-opus-5',
        input='Hello!',
    )
    print(response.output_text)

asyncio.run(main())
```

#### Anthropic Messages

```python filename="async_client.py"
import os
import asyncio
import anthropic

client = anthropic.AsyncAnthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

async def main():
    message = await client.messages.create(
        model='anthropic/claude-opus-5',
        max_tokens=1024,
        messages=[
            {'role': 'user', 'content': 'Hello!'}
        ]
    )
    print(message.content[0].text)

asyncio.run(main())
```

## Tool calling

Enable models to call functions you define. This example shows a weather tool that the model can invoke.

#### Chat Completions

```python filename="tools.py"
import os
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

tools = [{
    'type': 'function',
    'function': {
        'name': 'get_weather',
        'description': 'Get the current weather for a location',
        'parameters': {
            'type': 'object',
            'properties': {
                'location': {
                    'type': 'string',
                    'description': 'City name, e.g. San Francisco'
                }
            },
            'required': ['location']
        }
    }
}]

response = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {'role': 'user', 'content': "What's the weather in Tokyo?"}
    ],
    tools=tools
)

# Check if the model wants to call a tool
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    args = json.loads(tool_call.function.arguments)
    print(f"Model wants to call: {tool_call.function.name}")
    print(f"With arguments: {args}")
```

#### OpenAI Responses

```python filename="tools.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-5.6-sol',
    input='What is the weather in Tokyo?',
    tools=[
        {
            'type': 'function',
            'name': 'get_weather',
            'description': 'Get the current weather for a location',
            'parameters': {
                'type': 'object',
                'properties': {
                    'location': {'type': 'string'},
                },
                'required': ['location'],
            },
        },
    ],
)

for item in response.output:
    if item.type == 'function_call':
        print(f'Call: {item.name}({item.arguments})')
```

#### Anthropic Messages

```python filename="tools.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

tools = [{
    'name': 'get_weather',
    'description': 'Get the current weather for a location',
    'input_schema': {
        'type': 'object',
        'properties': {
            'location': {
                'type': 'string',
                'description': 'City name, e.g. San Francisco'
            }
        },
        'required': ['location']
    }
}]

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    messages=[
        {'role': 'user', 'content': "What's the weather in Tokyo?"}
    ],
    tools=tools
)

# Check if the model wants to call a tool
for block in message.content:
    if block.type == 'tool_use':
        print(f"Model wants to call: {block.name}")
        print(f"With arguments: {block.input}")
```

See [Chat Completions tool calls](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/tool-calling), [OpenAI Responses API tool calling](/docs/ai-gateway/sdks-and-apis/responses/tool-calling), or [Anthropic Messages tool calls](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling) for more examples.

## Structured outputs

Generate responses that conform to a JSON schema for reliable parsing.

```python filename="structured.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {'role': 'user', 'content': 'Extract: John is 30 years old and lives in NYC'}
    ],
    response_format={
        'type': 'json_schema',
        'json_schema': {
            'name': 'person',
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'age': {'type': 'integer'},
                    'city': {'type': 'string'}
                },
                'required': ['name', 'age', 'city']
            }
        }
    }
)

import json
data = json.loads(response.choices[0].message.content)
print(data)  # {'name': 'John', 'age': 30, 'city': 'NYC'}
```

See [structured outputs](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs) for more details.

## Images and file input

Each surface takes attachments as an array of content parts in place of a plain string, but the part names differ. Read the file, base64-encode it, and use the shape for your surface:

#### Chat Completions

```python filename="vision.py"
import base64
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

with open('diagram.png', 'rb') as f:
    image_base64 = base64.b64encode(f.read()).decode()

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': [
                {'type': 'text', 'text': 'Describe this image in one sentence.'},
                {
                    'type': 'image_url',
                    'image_url': {'url': f'data:image/png;base64,{image_base64}'}
                }
            ]
        }
    ]
)

print(completion.choices[0].message.content)
```

#### OpenAI Responses

```python filename="vision.py"
import base64
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

with open('diagram.png', 'rb') as f:
    image_base64 = base64.b64encode(f.read()).decode()

response = client.responses.create(
    model='anthropic/claude-opus-5',
    input=[
        {
            'role': 'user',
            'content': [
                {'type': 'input_text', 'text': 'Describe this image in one sentence.'},
                {
                    'type': 'input_image',
                    'image_url': f'data:image/png;base64,{image_base64}'
                }
            ]
        }
    ]
)

print(response.output_text)
```

#### Anthropic Messages

```python filename="vision.py"
import base64
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

with open('diagram.png', 'rb') as f:
    image_base64 = base64.b64encode(f.read()).decode()

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': [
                {'type': 'text', 'text': 'Describe this image in one sentence.'},
                {
                    'type': 'image',
                    'source': {
                        'type': 'base64',
                        'media_type': 'image/png',
                        'data': image_base64
                    }
                }
            ]
        }
    ]
)

print(message.content[0].text)
```

PDFs work the same way with a different part type. On Anthropic Messages that is a `document` part:

```python filename="pdf.py"
import base64
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

with open('report.pdf', 'rb') as f:
    pdf_base64 = base64.b64encode(f.read()).decode()

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': [
                {'type': 'text', 'text': 'What total does this document state?'},
                {
                    'type': 'document',
                    'source': {
                        'type': 'base64',
                        'media_type': 'application/pdf',
                        'data': pdf_base64
                    }
                }
            ]
        }
    ]
)
```

For the per-surface reference, see [Chat Completions file attachments](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images), [Responses file attachments](/docs/ai-gateway/sdks-and-apis/responses/images), and [Anthropic file attachments](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images).

## Reasoning

Reasoning models work through a problem before answering. On the Responses API, pass `reasoning` with an `effort` level:

```python filename="reasoning.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-5.6-sol',
    input='Explain the Monty Hall problem step by step.',
    reasoning={'effort': 'medium'},
    max_output_tokens=2048,
)

print(response.output_text)
```

The Chat Completions API takes the same idea through `extra_body`, since the OpenAI Python client does not have a typed field for it:

```python filename="reasoning-chat-completions.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

completion = client.chat.completions.create(
    model='openai/gpt-5.6-sol',
    messages=[{'role': 'user', 'content': 'Explain the Monty Hall problem.'}],
    extra_body={'reasoning': {'effort': 'medium'}},
)

print(completion.choices[0].message.reasoning)
print(completion.choices[0].message.content)
```

Each surface names and shapes this differently, and Anthropic models have their own constraints. See [Responses reasoning](/docs/ai-gateway/sdks-and-apis/responses/reasoning), [Chat Completions reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning), and [Anthropic extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning).

## Framework integrations

Python frameworks with dedicated AI Gateway support:

| Framework                                                                    | Integration                                  |
| ---------------------------------------------------------------------------- | -------------------------------------------- |
| [Pydantic AI](/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai) | Native `VercelProvider` for type-safe agents |
| [LlamaIndex](/docs/ai-gateway/ecosystem/framework-integrations/llamaindex)   | `llama-index-llms-vercel-ai-gateway` package |
| [LiteLLM](/docs/ai-gateway/ecosystem/framework-integrations/litellm)         | Use `vercel_ai_gateway/` model prefix        |
| [LangChain](/docs/ai-gateway/ecosystem/framework-integrations/langchain)     | Configure via Chat Completions endpoint      |

See [Framework Integrations](/docs/ai-gateway/ecosystem/framework-integrations) for the complete list and setup guides.

## API reference

For complete API documentation, see:

- **[OpenAI Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions)** — Chat completions, embeddings, streaming, tool calls, structured outputs, image inputs, and provider routing
- **[OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses)** — Streaming, tool calling, structured output, and reasoning
- **[Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)** — Streaming, tool calls, extended thinking, web search, and file attachments


---

[View full sitemap](/docs/sitemap)
