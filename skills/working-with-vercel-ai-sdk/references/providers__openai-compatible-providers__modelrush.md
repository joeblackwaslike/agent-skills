---
title: ModelRush
description: Use the ModelRush OpenAI compatible API with the AI SDK.
url: "https://ai-sdk.dev/providers/openai-compatible-providers/modelrush"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/openai-compatible-providers/modelrush.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "464249eb3df76cb424baa84abd4e4457cd52e577c977c8471f2fe7e138341b5b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[ModelRush](https://modelrush.ai/) provides access to AI models through an OpenAI-compatible API. You can use its Chat Completions endpoint with the AI SDK through the `@ai-sdk/openai-compatible` module.

## Setup

Install the OpenAI Compatible provider:

```bash
pnpm add @ai-sdk/openai-compatible
```

Create a ModelRush API key and set it as a server-side environment variable:

```bash
export MODELRUSH_API_KEY=your-api-key
```

See the [ModelRush quick start](https://modelrush.ai/docs/quickstart) for instructions on creating an API key.

## Provider Instance

Create a ModelRush provider instance with `createOpenAICompatible`:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const modelrush = createOpenAICompatible({
  name: 'modelrush',
  apiKey: process.env.MODELRUSH_API_KEY,
  baseURL: 'https://api.modelrush.ai/v1',
});
```

## Language Models

Create a chat model with the `.chatModel()` factory method and a ModelRush model ID:

```ts
const model = modelrush.chatModel('modelrush/deepseek-v4-flash-0731');
```

### Example

Use `generateText` to generate text with the model:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

const modelrush = createOpenAICompatible({
  name: 'modelrush',
  apiKey: process.env.MODELRUSH_API_KEY,
  baseURL: 'https://api.modelrush.ai/v1',
});

const { text } = await generateText({
  model: modelrush.chatModel('modelrush/deepseek-v4-flash-0731'),
  prompt: 'Explain what an API gateway does in one sentence.',
});

console.log(text);
```

## Supported Models and Capabilities

This integration uses ModelRush's OpenAI-compatible Chat Completions endpoint for text generation. The example model, `modelrush/deepseek-v4-flash-0731`, accepts text chat messages and returns text.

Use the [ModelRush models endpoint](https://modelrush.ai/docs/api/models) or [model catalog](https://modelrush.ai/models) to find current model IDs and model-specific capabilities and limits. Other ModelRush modalities are outside the scope of this OpenAI-compatible chat integration.

## Resources

- [ModelRush AI SDK example](https://github.com/Moonveil-AI/modelrush-developer-tools/tree/main/examples/ai-sdk)
- [ModelRush quick start](https://modelrush.ai/docs/quickstart)
- [ModelRush Chat Completions documentation](https://modelrush.ai/docs/models/chat)
- [AI SDK OpenAI Compatible provider](/providers/openai-compatible-providers)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)