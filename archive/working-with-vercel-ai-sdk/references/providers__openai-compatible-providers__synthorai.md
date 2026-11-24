---
title: Synthorai
description: Use the Synthorai OpenAI compatible API with the AI SDK.
url: "https://ai-sdk.dev/providers/openai-compatible-providers/synthorai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/openai-compatible-providers/synthorai.md"
fetched_at: "2026-11-02T12:06:29.726Z"
sha256: "a3d418a7d454125b51faba3611b799a7e5f26cf2a704c46ad6d6087f54012542"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Synthorai](https://synthorai.io) is an AI gateway that provides access to models from multiple providers through an OpenAI-compatible API. You can use its Chat Completions endpoint with the AI SDK through the `@ai-sdk/openai-compatible` module.

## Setup

The Synthorai provider is available via the `@ai-sdk/openai-compatible` module as it is compatible with the OpenAI API. You can install it with:

```bash
pnpm add @ai-sdk/openai-compatible
```

## Provider Instance

To use Synthorai, create a custom provider instance with the `createOpenAICompatible` function from `@ai-sdk/openai-compatible`:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const synthorai = createOpenAICompatible({
  name: 'synthorai',
  baseURL: 'https://synthorai.io/v1',
  apiKey: process.env.SYNTHORAI_API_KEY,
});
```

Follow the [Synthorai quickstart](https://synthorai.io/docs/quickstart/) to
create an API key. Make sure to set the `SYNTHORAI_API_KEY` environment
variable with your API key.

## Language Models

You can create Synthorai models using the provider instance. The first argument is a model ID from the [model catalog](https://synthorai.io/models/), for example `claude-sonnet-5-5`.

```ts
const model = synthorai('claude-sonnet-5-5');
```

### Example

You can use Synthorai language models to generate text with the `generateText` function:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

const synthorai = createOpenAICompatible({
  name: 'synthorai',
  baseURL: 'https://synthorai.io/v1',
  apiKey: process.env.SYNTHORAI_API_KEY,
});

const { text } = await generateText({
  model: synthorai('claude-sonnet-5-5'),
  prompt: 'Tell me about yourself in one sentence.',
});

console.log(text);
```

Synthorai language models can also generate text in a streaming fashion with the `streamText` function:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const synthorai = createOpenAICompatible({
  name: 'synthorai',
  baseURL: 'https://synthorai.io/v1',
  apiKey: process.env.SYNTHORAI_API_KEY,
});

const result = streamText({
  model: synthorai('claude-sonnet-5-5'),
  prompt: 'Write a short haiku about routing.',
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
```

See the [Synthorai AI SDK integration guide](https://synthorai.io/docs/integrations/ai-sdk/) for more examples and troubleshooting.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)