---
title: AI SDK with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/ai-sdk
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk"
last_updated: 2026-09-21
type: how-to
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/authentication-and-byok
summary: Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "6f4e1770737e6c0dde46a03e3b63f7125339d04a76cf663a53aba093c8c358fc"
---

# AI SDK with AI Gateway

The [AI SDK](https://ai-sdk.dev/) is the recommended way to build AI-powered TypeScript applications with AI Gateway. Pass a model string like `'anthropic/claude-sonnet-5'` directly to AI SDK functions and requests route through AI Gateway automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [Claude Haiku 5.5 now available on AI Gateway](https://vercel.com/changelog/claude-haiku-5-5-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Claude Sonnet 5.5 now available on AI Gateway](https://vercel.com/changelog/claude-sonnet-5-5-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Glyph Cluster is now available in stealth for free on AI Gateway](https://vercel.com/changelog/glyph-cluster-is-now-available-in-stealth-for-free-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [GPT-6.1 Sol now available on AI Gateway](https://vercel.com/changelog/gpt-6-1-sol-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Mistral Large 4 now available on AI Gateway](https://vercel.com/changelog/mistral-large-4-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Get started with GPT-5](https://ai-sdk.dev/cookbook/guides/gpt-5?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Get started with GPT-5 using the AI SDK.
- [AI Gateway](https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=related) — Vercel MCP tools for ai gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/ai-sdk.graph.md](/docs/ai-gateway/sdks-and-apis/ai-sdk.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fai-sdk&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Installation

See the [AI SDK getting-started guide](/kb/guide/ai-gateway-and-ai-sdk) for runtime and package setup.

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

See the [`generateText` reference](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text) for options and return values.

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

See the [`streamText` reference](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) for stream events and response helpers.

Stream responses token-by-token for real-time output:

```typescript filename="stream.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-6-astra',
  prompt: 'Write a short story about a robot discovering music.',
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
```

## Structured outputs

See the [AI SDK structured-output guide](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) for schemas, output types, and validation.

Generate type-safe structured data with `generateText` and `Output.object` and a [Zod](https://zod.dev/) schema:

```typescript filename="structured.ts"
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  output: Output.object({ schema: z.object({
    name: z.string(),
    age: z.number(),
    city: z.string(),
  }) }),
  prompt: 'Extract: John is 30 years old and lives in NYC.',
});

console.log(output); // { name: 'John', age: 30, city: 'NYC' }
```

## Tool calling

See the [AI SDK tool-calling guide](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling) for execution, tool results, and multi-step calls.

Define tools that models can invoke to interact with external systems. Describe each tool's input with `inputSchema`:

```typescript filename="tools.ts"
import { generateText, isStepCount, tool } from 'ai';
import { z } from 'zod';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  stopWhen: isStepCount(5),
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

`stopWhen` is what lets the model answer in words. Without it the request stops as soon as the tool runs, finishing with `finishReason: 'tool-calls'` and an empty `text`. The `toolResults` field contains the tool result, but the model has not generated a text response from it.

## Reasoning

See the [AI SDK reasoning guide](https://ai-sdk.dev/docs/ai-sdk-core/reasoning) for reading reasoning output and configuring supported models.

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

See [Inputs & Tools](/docs/ai-gateway/inputs-and-tools) for complete vision, PDF, audio, and video examples across API formats.

## Images and file input

See the [AI SDK file-part guide](https://ai-sdk.dev/docs/foundations/prompts#file-parts) for bytes, data URLs, remote URLs, and media types.

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
({
  type: 'file',
  data: fs.readFileSync('./report.pdf'),
  mediaType: 'application/pdf',
});
```

> **💡 Note:** Older examples use a `{ type: 'image', image }` part. That part still works
> but is deprecated in AI SDK 7, which warns at runtime and asks for a `file`
> part with an `image/*` media type. The `file` form shown above works on both
> 7 and 6.

Whether a given model accepts images or PDFs is a per-model question. Check the [model list](/ai-gateway/models) before sending an attachment.

## Version compatibility

The examples on this page use AI SDK 7, except tabs explicitly labeled AI SDK 6. AI Gateway supports both versions, but some client APIs differ:

| Feature | AI SDK 6 | AI SDK 7 |
| --- | --- | --- |
| System instructions | `system` | `instructions` |
| Tool-loop stop condition | `stepCountIs` | `isStepCount` |
| Completion callbacks | `onFinish`, `onStepFinish` | `onEnd`, `onStepEnd` |
| Telemetry | `experimental_telemetry` | `telemetry` |
| Top-level `reasoning` | Not supported | Supported |
| Full event stream | `result.fullStream` | `result.stream` |
| Image generation | `generateImage` or its experimental alias | `generateImage` |

AI SDK 7 requires Node.js 22 or later and ESM. Check your installed version with `pnpm list ai`. See the [AI SDK 7 migration guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0) before upgrading. The [AI SDK for Python beta](/docs/ai-gateway/sdks-and-apis/ai-sdk-python) uses a separate package and API.

## Authentication

See the [AI SDK AI Gateway provider reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#authentication) for API keys, OIDC, and custom provider instances.

The AI SDK uses the `AI_GATEWAY_API_KEY` environment variable by default. Set it in your `.env.local` file:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

On Vercel deployments, you can also authenticate with [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc) for keyless authentication.

See [Authentication](/docs/ai-gateway/authentication-and-byok) for more details.

## Build with a template

Start with an AI SDK template to build a chatbot or route form submissions with Jev:

## Next steps

- Explore the full [AI SDK documentation](https://ai-sdk.dev/docs/getting-started) for advanced patterns
- Browse [AI SDK guides](/kb/ai-sdk) for step-by-step examples and implementation patterns
- Learn how to [classify, route, and score with Jev and AI SDK](/kb/guide/typesafe-jev-and-ai-sdk) and [route form submissions](/kb/guide/jev-ai-sdk-form-router)
- Learn about [model routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Try other APIs: [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)


---

[View full sitemap](/docs/sitemap)
