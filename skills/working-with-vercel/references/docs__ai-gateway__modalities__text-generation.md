---
title: Text Generation
product: vercel
url: /docs/ai-gateway/modalities/text-generation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/text-generation"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/getting-started/text
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/models-and-providers/reasoning
summary: Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/text-generation.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7107bd87af453c028561ccb954a892f3390994e805c083d46f2a9baa57fd2108"
---

# Text Generation

Text generation is the default modality in AI Gateway. You send a prompt and a model returns text, either all at once or streamed token by token. The same unified API works across hundreds of models, so you can switch providers with a one-line change.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related) — Generate text responses using the OpenResponses API.
- [Getting Started](https://vercel.com/docs/ai-gateway/getting-started?from=related) — Get started with AI Gateway by generating text, images, video, speech, or transcriptions, or by building realtime voice
- [Text to Speech](https://vercel.com/docs/ai-gateway/modalities/text-to-speech?from=related) — Generate spoken audio from text with speech models through Vercel AI Gateway.
- [AI SDK](https://vercel.com/docs/ai-sdk?from=related) — TypeScript toolkit for building AI-powered applications with React, Next.js, Vue, Svelte and Node.js

Full cross-link map for this page: [/docs/ai-gateway/modalities/text-generation.graph.md](/docs/ai-gateway/modalities/text-generation.graph.md)
<!-- /docsgraph:related -->

For a step-by-step setup, see the [Text Generation quickstart](/docs/ai-gateway/getting-started/text). To browse available models, see [Models and Providers](/docs/ai-gateway/models-and-providers).

## Generate text

Use `generateText` from the AI SDK to get a complete response. Set the model with a `creator/model-name` slug:

```typescript
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'What is the capital of France?',
});

console.log(text);
```

Switching models is a one-line change, for example to `anthropic/claude-sonnet-5` or `google/gemini-3.1-pro-preview`.

## Stream text

Use `streamText` to render output as it arrives, which keeps chat and agent interfaces responsive:

```typescript
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Write a short poem about the ocean.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

## Tool calling

Let a model call functions you define, then use the results to produce its answer:

```typescript
import { generateText, tool } from 'ai';
import { z } from 'zod';

const { text } = await generateText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'What is the weather in San Francisco?',
  tools: {
    getWeather: tool({
      description: 'Get the current weather for a city',
      parameters: z.object({ city: z.string() }),
      execute: async ({ city }) => ({ city, temperatureF: 64 }),
    }),
  },
});
```

## Structured output

Use `generateObject` to get typed, schema-validated data instead of free-form text:

```typescript
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: 'openai/gpt-5.6-sol',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
  }),
  prompt: 'Generate metadata for a blog post about serverless functions.',
});
```

> **💡 Note:** Text generation works with the AI SDK, the OpenAI Chat Completions and
> Responses APIs, and the Anthropic Messages API. See
> [SDKs and APIs](/docs/ai-gateway/sdks-and-apis) for the full list.

## Next steps

- [Text Generation quickstart](/docs/ai-gateway/getting-started/text) to make your first request
- [Models and Providers](/docs/ai-gateway/models-and-providers) to choose a model
- [Provider options](/docs/ai-gateway/models-and-providers/provider-options) for routing and fallbacks
- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) to enable step-by-step thinking


---

[View full sitemap](/docs/sitemap)
