---
title: Cheaper Inference
description: Use the Cheaper Inference OpenAI compatible API with the AI SDK.
url: "https://ai-sdk.dev/providers/openai-compatible-providers/cheaper-inference"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/openai-compatible-providers/cheaper-inference.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "5f8576783508b82bd5d0f5fabd0ca30c43fc6acad0867346e4c7f3d1a4256403"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Cheaper Inference](https://cheaperinference.com/) is an API gateway that provides access to models from multiple AI labs through an OpenAI-compatible API. You can use its Chat Completions endpoint with the AI SDK through the `@ai-sdk/openai-compatible` module.

## Setup

Install the OpenAI Compatible provider:

```bash
pnpm add @ai-sdk/openai-compatible
```

Create a Cheaper Inference API key and set it as a server-side environment variable:

```bash
export CHEAPER_INFERENCE_API_KEY=your-api-key
```

See the [Cheaper Inference integration guide](https://cheaperinference.com/docs/integrations#framework-vercel) for instructions on creating an API key.

## Provider Instance

Create a Cheaper Inference provider instance with `createOpenAICompatible`:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const cheaperInference = createOpenAICompatible({
  name: 'cheaper-inference',
  apiKey: process.env.CHEAPER_INFERENCE_API_KEY,
  baseURL: 'https://api.cheaperinference.com/v1',
});
```

The `apiKey` setting sends your key as a Bearer token in the `Authorization` header.

## Language Models

Create a language model by passing a Cheaper Inference model ID to the provider instance:

```ts
const model = cheaperInference('gpt-5.4');
```

### Generate Text

Use `generateText` to generate text with the model:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

const cheaperInference = createOpenAICompatible({
  name: 'cheaper-inference',
  apiKey: process.env.CHEAPER_INFERENCE_API_KEY,
  baseURL: 'https://api.cheaperinference.com/v1',
});

const { text } = await generateText({
  model: cheaperInference('gpt-5.4'),
  prompt: 'Explain what an API gateway does in one sentence.',
});

console.log(text);
```

### Stream Text

Use `streamText` to stream text as it is generated:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const cheaperInference = createOpenAICompatible({
  name: 'cheaper-inference',
  apiKey: process.env.CHEAPER_INFERENCE_API_KEY,
  baseURL: 'https://api.cheaperinference.com/v1',
});

const result = streamText({
  model: cheaperInference('gpt-5.4'),
  prompt: 'Count from 1 to 5, separated by spaces.',
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
```

## Supported Models and Capabilities

This integration uses Cheaper Inference's OpenAI-compatible Chat Completions endpoint for text generation and streaming. Support for tools, vision, and other model-specific features depends on the selected model.

The model catalog changes over time. Use the authenticated [`GET /models`](https://api.cheaperinference.com/v1/models) endpoint to find current model IDs, capabilities, and pricing.

## Resources

- [Cheaper Inference Vercel AI SDK integration guide](https://cheaperinference.com/docs/integrations#framework-vercel)
- [Cheaper Inference API documentation](https://cheaperinference.com/docs)
- [Cheaper Inference model catalog](https://cheaperinference.com/models)
- [AI SDK OpenAI Compatible provider](/providers/openai-compatible-providers)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)