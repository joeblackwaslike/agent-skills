---
title: AI SDK for Python with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/ai-sdk-python
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/models-and-providers/reasoning
summary: Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "11fea35e7d15ebce6c2e1a635c94fa0e930b0cc783bee1c6d1bff3652233822f"
---

# AI SDK for Python with AI Gateway

The [AI SDK for Python](https://ai-python.dev/docs) is a toolkit for building LLM-powered applications and agents in Python.
It uses AI Gateway to route requests by default.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [AI SDK](https://vercel.com/docs/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=related) — Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=related) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=related) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples
- [Vercel & OpenAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=related) — Integrate your Vercel project with OpenAI's powerful suite of models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/ai-sdk-python.graph.md](/docs/ai-gateway/sdks-and-apis/ai-sdk-python.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk-python&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** The AI SDK for Python is in public beta.

## Installation

See the [Python beta getting-started guide](https://ai-python.dev/docs) for package setup and your first request.

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

See the [Python streaming guide](https://ai-python.dev/docs/basics/streaming) for stream events and final messages.

Create a model with a string model ID and pass it to `ai.stream` to get a streaming response.
You can omit the provider prefix or use `gateway:` to route through AI Gateway.

```python filename="quickstart.py"
import asyncio
import ai

async def main() -> None:
    model = ai.get_model('anthropic/claude-sonnet-5')
    messages = [ai.user_message('Explain quantum computing in one paragraph.')]

    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end='', flush=True)

asyncio.run(main())
```

Responses always stream. After iteration, the full response is available on `stream.text`, and token counts on `stream.usage`.

## Structured outputs

See [structured output in the Python beta](https://ai-python.dev/docs/basics/streaming#use-structured-output) for Pydantic models and validated results.

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
    model = ai.get_model('anthropic/claude-sonnet-5')
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

See the Python beta [agents](https://ai-python.dev/docs/basics/agents) and [tools](https://ai-python.dev/docs/basics/tools) guides for execution and conversation loops.

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
    model = ai.get_model('anthropic/claude-sonnet-5')
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

See [Inputs & Tools](/docs/ai-gateway/inputs-and-tools) for complete vision, PDF, audio, and video examples across API formats.

## Images and documents

See the [Python multimodal-message guide](https://ai-python.dev/docs/basics/messages-and-events#add-files-and-multimodal-input) for file parts and media types.

Pass file parts alongside text in a message. The model must support the file's media type:

```python filename="vision.py"
import asyncio
from pathlib import Path
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message(
        "Describe this image in one sentence.",
        ai.file_part(Path("diagram.png").read_bytes(), media_type="image/png"),
    )]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

Replace the image part with `ai.file_part(Path("report.pdf").read_bytes(), media_type="application/pdf")` to send a PDF. See [modalities](/docs/ai-gateway/modalities) for dedicated image, video, audio, embedding, and reranking operations through `ai.ops`.

## Request options

See [Python provider-specific parameters](https://ai-python.dev/docs/basics/providers#provider-specific-params) for model request configuration.

Use `ai.InferenceRequestParams` with `extra_body` to pass `providerOptions.gateway`. See the Python tabs in [provider routing](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering), [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks), and [reasoning](/docs/ai-gateway/models-and-providers/reasoning). The Python beta has a separate version cycle from AI SDK 7 for TypeScript.

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

- Explore the full [AI SDK for Python documentation](https://ai-python.dev/docs) for agents, subagents, human-in-the-loop hooks, and custom loops
- Browse [examples on GitHub](https://github.com/vercel-labs/ai-python/tree/main/examples), from single-file scripts to end-to-end demos
- Learn about [model routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Building with TypeScript? See the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) page


---

[View full sitemap](/docs/sitemap)
