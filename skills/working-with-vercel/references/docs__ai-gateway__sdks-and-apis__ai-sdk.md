---
title: AI SDK
product: vercel
url: /docs/ai-gateway/sdks-and-apis/ai-sdk
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk"
last_updated: 2026-08-27
type: integration
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
summary: Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "0bfb8a420adf464d0720fa07ab0d3bed807e0060eeab42b1012a3dc97524ad27"
---

# AI SDK

The [AI SDK](https://ai-sdk.dev/) is the recommended way to build AI-powered TypeScript applications with AI Gateway. Pass a model string like `'anthropic/claude-sonnet-5'` directly to AI SDK functions and requests route through AI Gateway automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI SDK 4.2](https://vercel.com/blog/ai-sdk-4-2?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Get started with GPT-5](https://ai-sdk.dev/cookbook/guides/gpt-5?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Get started with OpenAI o1](https://ai-sdk.dev/cookbook/guides/o1?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [Vercel AI SDK vs TanStack AI](https://vercel.com/kb/guide/vercel-ai-sdk-vs-tanstack-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Compare the Vercel AI SDK and TanStack AI for building AI-powered TypeScript applications. Learn how they differ in agen
- [Vercel AI SDK 3.1: ModelFusion joins the team](https://vercel.com/blog/vercel-ai-sdk-3-1-modelfusion-joins-the-team?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Get started with OpenAI o3-mini](https://ai-sdk.dev/cookbook/guides/o3?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [OpenAI Responses API](https://ai-sdk.dev/cookbook/guides/openai-responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [AI SDK](https://vercel.com/docs/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — TypeScript toolkit for building AI-powered applications with React, Next.js, Vue, Svelte and Node.js
- [AI SDK for Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/ai-sdk.graph.md](/docs/ai-gateway/sdks-and-apis/ai-sdk.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Installation

Install the `ai` package:

#### npm

```bash filename="Terminal"
npm install ai@latest
```

#### yarn

```bash filename="Terminal"
yarn add ai@latest
```

#### pnpm

```bash filename="Terminal"
pnpm add ai@latest
```

#### bun

```bash filename="Terminal"
bun add ai@latest
```

## Quick start

Generate text by passing a plain string model ID. AI Gateway resolves the provider and routes the request automatically.

```typescript filename="index.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in one paragraph.',
});

console.log(text);
```

## Streaming

Stream responses token-by-token for real-time output:

```typescript filename="stream.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-5.6-sol',
  prompt: 'Write a short story about a robot discovering music.',
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
```

## Structured outputs

Generate type-safe structured data with `generateObject` and a [Zod](https://zod.dev/) schema:

```typescript filename="structured.ts"
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: 'anthropic/claude-sonnet-5',
  schema: z.object({
    name: z.string(),
    age: z.number(),
    city: z.string(),
  }),
  prompt: 'Extract: John is 30 years old and lives in NYC.',
});

console.log(object); // { name: 'John', age: 30, city: 'NYC' }
```

## Tool calling

Define tools that models can invoke to interact with external systems. Describe each tool's input with `inputSchema`:

```typescript filename="tools.ts"
import { generateText, stepCountIs, tool } from 'ai';
import { z } from 'zod';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  stopWhen: stepCountIs(5),
  tools: {
    getWeather: tool({
      description: 'Get the current weather for a location',
      inputSchema: z.object({
        location: z.string().describe('City name, e.g. San Francisco'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72,
        condition: 'sunny',
      }),
    }),
  },
  prompt: "What's the weather in Tokyo?",
});

console.log(text);
```

`stopWhen` is what lets the model answer in words. Without it the request stops as soon as the tool runs, finishing with `finishReason: 'tool-calls'` and an empty `text` — the tool result is in `toolResults`, but nothing has turned it into a sentence yet.

## Reasoning

Reasoning models think before answering. On AI SDK 7, set the top-level `reasoning` option and the SDK translates it to each provider's native API, so the same code works across Anthropic, OpenAI, and Google:

#### AI SDK 7

```typescript filename="reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?',
  reasoning: 'high',
});

console.log(result.reasoningText);
console.log(result.text);
```

#### AI SDK 6

```typescript filename="reasoning.ts"
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?',
  providerOptions: {
    anthropic: { thinking: { type: 'adaptive' } },
  },
});

console.log(result.reasoningText);
console.log(result.text);
```

> **💡 Note:** On AI SDK 6 the top-level `reasoning` option is **silently ignored**: the
> request succeeds, but no thinking happens and `reasoningText` is empty. There
> is no error to catch. Use `providerOptions` on 6, or upgrade to 7.

For per-provider configuration and the full effort-level reference, see [Reasoning](/docs/ai-gateway/models-and-providers/reasoning).

## Images and file input

Swap a message's plain string `content` for an array of parts. A `file` part carries the bytes and a `mediaType` telling the model how to read them, so the same shape covers images and documents:

```typescript filename="vision.ts"
import fs from 'node:fs';
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe this image in one sentence.' },
        {
          type: 'file',
          data: fs.readFileSync('./diagram.png'),
          mediaType: 'image/png',
        },
      ],
    },
  ],
});

console.log(text);
```

`data` takes a `Buffer`, a `Uint8Array`, a base64 string, or a `URL`. Point `mediaType` at the document type to send a PDF instead:

```typescript
{
  type: 'file',
  data: fs.readFileSync('./report.pdf'),
  mediaType: 'application/pdf',
}
```

> **💡 Note:** Older examples use a `{ type: 'image', image }` part. That part still works
> but is deprecated in AI SDK 7, which warns at runtime and asks for a `file`
> part with an `image/*` media type. The `file` form shown above works on both
> 7 and 6.

Whether a given model accepts images or PDFs is a per-model question. Check the [model list](/ai-gateway/models) before sending an attachment.

## Version compatibility

AI Gateway supports AI SDK 7 and 6. Text generation, streaming, structured outputs, and tool calling work the same on both, with the same syntax.

Where they differ:

| Feature                      | 6                   | 7                                              |
| ---------------------------- | ------------------- | ---------------------------------------------- |
| Top-level `reasoning` option | Ignored, no error   | Supported                                      |
| Full event stream            | `result.fullStream` | `result.stream` (`fullStream` still works, deprecated) |

> **💡 Note:** Check your installed version with `npm list ai` and upgrade with `npm install ai@latest`. See the [AI SDK 7 migration guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0) for upgrade details.

## Authentication

The AI SDK uses the `AI_GATEWAY_API_KEY` environment variable by default. Set it in your `.env.local` file:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

On Vercel deployments, you can also authenticate with [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc) for keyless authentication.

See [Authentication](/docs/ai-gateway/authentication-and-byok) for more details.

## Next steps

- Explore the full [AI SDK documentation](https://ai-sdk.dev/getting-started) for advanced patterns
- Browse [AI SDK guides](/kb/ai-sdk) for step-by-step examples and implementation patterns
- Learn about [model routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Try other APIs: [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)


---

[View full sitemap](/docs/sitemap)
