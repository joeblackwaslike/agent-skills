---
title: AI SDK
product: vercel
url: /docs/ai-gateway/sdks-and-apis/ai-sdk
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk"
last_updated: 2026-07-27
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
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "0ce167646e88db232a0a10fb2ece74ae02b399cd7e95a064dd454f4c13f93d7d"
---

# AI SDK

The [AI SDK](https://ai-sdk.dev/) is the recommended way to build AI-powered TypeScript applications with AI Gateway. Pass a model string like `'anthropic/claude-sonnet-5'` directly to AI SDK functions and requests route through AI Gateway automatically.

## Installation

Install the `ai` package:

#### npm

```bash filename="Terminal"
npm install ai
```

#### yarn

```bash filename="Terminal"
yarn add ai
```

#### pnpm

```bash filename="Terminal"
pnpm add ai
```

#### bun

```bash filename="Terminal"
bun add ai
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
- Learn about [model routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Try other APIs: [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)


---

[View full sitemap](/docs/sitemap)
