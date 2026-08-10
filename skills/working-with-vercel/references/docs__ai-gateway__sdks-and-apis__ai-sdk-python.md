---
title: AI SDK for Python
product: vercel
url: /docs/ai-gateway/sdks-and-apis/ai-sdk-python
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python"
last_updated: 2026-07-30
type: integration
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
summary: Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "089e025a3120108a77b6322c28926c7deee6562c46e1ac46a8af9f478d5c0f8e"
---

# AI SDK for Python

The [AI SDK for Python](https://ai-python.dev) is a toolkit for building LLM-powered applications and agents in Python.
It uses AI Gateway to route requests by default.

> **💡 Note:** The AI SDK for Python is in public beta.

## Installation

The SDK requires Python 3.12 or later. Install the `ai` package:

#### uv

```bash filename="Terminal"
uv add ai
```

#### pip

```bash filename="Terminal"
pip install ai
```

## Quick start

Create a model with a string model ID and pass it to `ai.stream` to get a streaming response.
You can omit the provider prefix or use `gateway:` to route through AI Gateway.

```python filename="quickstart.py"
import asyncio
import ai

async def main() -> None:
    model = ai.get_model('anthropic/claude-sonnet-4.6')
    messages = [ai.user_message('Explain quantum computing in one paragraph.')]

    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end='', flush=True)

asyncio.run(main())
```

Responses always stream. After iteration, the full response is available on `stream.text`, and token counts on `stream.usage`.

## Structured outputs

Pass a [Pydantic](https://pydantic.dev/docs/validation/latest/concepts/models/) model as `output_type` to get validated,
structured data. After the stream finishes, `stream.output` returns an instance of your model:

```python filename="structured.py"
import asyncio
import ai
import pydantic

class Person(pydantic.BaseModel):
    name: str
    age: int
    city: str

async def main() -> None:
    model = ai.get_model('anthropic/claude-sonnet-4.6')
    messages = [
        ai.user_message('Extract: John is 30 years old and lives in NYC.')
    ]

    async with ai.stream(model, messages, output_type=Person) as stream:
        async for event in stream:
            pass

    print(stream.output)  # Person(name='John', age=30, city='NYC')

asyncio.run(main())
```

## Tool calling with agents

Define tools as Python functions with the `@ai.tool` decorator.
An `ai.Agent` runs a loop: it streams model output and executes requested tools until the model returns a final answer.

```python filename="agent.py"
import asyncio
import ai

@ai.tool
async def get_weather(city: str) -> str:
    """Get the current weather for a city."""
    return 'Sunny, 72F'

async def main() -> None:
    model = ai.get_model('anthropic/claude-sonnet-4.6')
    agent = ai.Agent(tools=[get_weather])
    messages = [ai.user_message("What's the weather in Tokyo?")]

    async with agent.run(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end='', flush=True)

    history = stream.messages  # Full conversation, including tool results

asyncio.run(main())
```

The function signature and docstring become the tool schema. The model sees the tool name, description, and typed parameters.

## Authentication

The SDK can use `AI_GATEWAY_API_KEY` environment variable to authenticate:

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

When deploying to Vercel or using `vercel dev` for local development, you are encouraged to use [OIDC](/docs/ai-gateway/authentication-and-byok/oidc) instead of an API key.
Install the `vercel` extra and the SDK will handle authentication automatically:

```bash filename="Terminal"
uv add "ai[vercel]"
```

See [Authentication](/docs/ai-gateway/authentication-and-byok) for more details.

## Next steps

- Explore the full [AI SDK for Python documentation](https://ai-python.dev) for agents, subagents, human-in-the-loop hooks, and custom loops
- Browse [examples on GitHub](https://github.com/vercel-labs/ai-python/tree/main/examples), from single-file scripts to end-to-end demos
- Learn about [model routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Building with TypeScript? See the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) page


---

[View full sitemap](/docs/sitemap)
