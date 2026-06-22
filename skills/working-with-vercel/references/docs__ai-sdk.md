---
title: AI SDK
product: ai-sdk
url: /docs/ai-sdk
canonical_url: "https://vercel.com/docs/ai-sdk"
last_updated: 2026-01-03
type: integration
prerequisites:
  []
related:
  []
summary: TypeScript toolkit for building AI-powered applications with React, Next.js, Vue, Svelte and Node.js
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-sdk.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "8e7335a36074f733834d0223eb61e8882c041db23cfc623124cad2d5d93eccd4"
---

# AI SDK

## What the AI SDK provides

- **Unified provider API.** Switch between models by changing two lines of code
- **Structured outputs.** Generate type-safe JSON with `generateObject` and `streamObject`
- **Tool calling.** Let models interact with external systems
- **Streaming first.** Stream text, objects, and UI to your frontend
- **Framework support.** Works with React, Next.js, Vue, Svelte, and Node.js

## Generating text

At the center of the AI SDK is [AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core/overview), which provides a unified API to call any LLM.

The following example shows how to generate text with the AI SDK using OpenAI's GPT-5:

```typescript
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-5.2',
  prompt: 'Explain the concept of quantum entanglement.',
});
```

The unified interface means that you can easily switch between providers by changing just two lines of code. For example, to use Anthropic's Claude Opus 4.5:

```typescript {2,5}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-opus-4.5',
  prompt: 'How many people will live in the world in 2040?',
});
```

## Generating structured data

While text generation can be useful, you might want to generate structured JSON data. For example, you might want to extract information from text, classify data, or generate synthetic data. AI SDK Core provides two functions ([`generateObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-object) and [`streamObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-object)) to generate structured data, allowing you to constrain model outputs to a specific schema.

The following example shows how to generate a type-safe recipe that conforms to a zod schema:

```ts
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: 'openai/gpt-5.2',
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
      steps: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});
```

## Using tools with the AI SDK

The AI SDK supports tool calling out of the box, allowing it to interact with external systems and perform discrete tasks. The following example shows how to use tool calling with the AI SDK:

```ts
import { generateText, tool } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-5.2',
  prompt: 'What is the weather like today in San Francisco?',
  tools: {
    getWeather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
});
```

## Getting started with the AI SDK

The AI SDK is available as a package. To install it, run the following command:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i ai
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i ai
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i ai
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i ai
    ```
  </Code>
</CodeBlock>

See the [AI SDK Getting Started](https://sdk.vercel.ai/docs/getting-started) guide for more information on how to get started with the AI SDK.

## More resources

**AI SDK documentation**: Read the official AI SDK reference and guides. [Learn more →](https://ai-sdk.dev/docs)

**AI SDK examples**: Browse runnable examples for common patterns. [Learn more →](https://ai-sdk.dev/cookbook)

**AI SDK guides**: Step-by-step guides for building AI features. [Learn more →](https://ai-sdk.dev/cookbook/guides)

**AI SDK templates**: Start from a production-ready Vercel template. [Learn more →](https://vercel.com/templates?type=ai)


---

[View full sitemap](/docs/sitemap)
