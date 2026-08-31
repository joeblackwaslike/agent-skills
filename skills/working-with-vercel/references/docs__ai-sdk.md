---
title: AI SDK
product: ai-sdk
url: /docs/ai-sdk
canonical_url: "https://vercel.com/docs/ai-sdk"
last_updated: 2026-08-27
type: integration
prerequisites:
  []
related:
  - /docs/connect/frameworks/ai-sdk-and-mcp
summary: TypeScript toolkit for building AI-powered applications with React, Next.js, Vue, Svelte and Node.js
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-sdk.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "4056299ea3989ef701add39c523f856999ef8ee68c9dc07a5d4005adb00aa99d"
---

# AI SDK

## What the AI SDK provides


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Agentic Infrastructure](https://vercel.com/blog/agentic-infrastructure?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [AI SDK by Vercel](https://ai-sdk.dev/docs/introduction?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Vercel AI SDK vs TanStack AI](https://vercel.com/kb/guide/vercel-ai-sdk-vs-tanstack-ai?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related) — Compare the Vercel AI SDK and TanStack AI for building AI-powered TypeScript applications. Learn how they differ in agen
- [Vercel AI SDK 3.1: ModelFusion joins the team](https://vercel.com/blog/vercel-ai-sdk-3-1-modelfusion-joins-the-team?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Get started with GPT-5](https://ai-sdk.dev/cookbook/guides/gpt-5?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Get started with Llama 3.1](https://ai-sdk.dev/cookbook/guides/llama-3_1?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [AI SDK for Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [Vercel & OpenAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=related) — Integrate your Vercel project with OpenAI's powerful suite of models.

Full cross-link map for this page: [/docs/ai-sdk.graph.md](/docs/ai-sdk.graph.md?from=related&source_path=%2Fdocs%2Fai-sdk&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Unified provider API.** Switch between models by changing two lines of code
- **Structured outputs.** Generate type-safe JSON with `generateObject` and `streamObject`
- **Tool calling.** Let models interact with external systems
- **Streaming first.** Stream text, objects, and UI to your frontend
- **Framework support.** Works with React, Next.js, Vue, Svelte, and Node.js

## Generating text

At the center of the AI SDK is [AI SDK Core](https://ai-sdk.dev/docs/ai-sdk-core/overview), which provides a unified API to call any LLM.

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

While text generation can be useful, you might want to generate structured JSON data. For example, you might want to extract information from text, classify data, or generate synthetic data. AI SDK Core provides two functions ([`generateObject`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) and [`streamObject`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-object)) to generate structured data, allowing you to constrain model outputs to a specific schema.

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

See the [AI SDK Getting Started](https://ai-sdk.dev/docs/getting-started) guide for more information on how to get started with the AI SDK.

## Use Vercel Connect with AI SDK

Vercel Connect supplies short-lived OAuth tokens to MCP clients built with AI
SDK, so models can call tools from services such as Linear without storing
provider credentials in your application. The `connectAuthProvider()` helper
requests credentials and supports user consent flows.

Follow the [AI SDK and MCP tutorial](/docs/connect/frameworks/ai-sdk-and-mcp) to
configure Vercel Connect, make MCP tools available to an AI SDK application,
and handle tool approval.

## More resources

**AI SDK documentation**: Read the official AI SDK reference and guides. [Learn more →](https://ai-sdk.dev/docs)

**AI SDK examples**: Browse runnable examples for common patterns. [Learn more →](https://ai-sdk.dev/cookbook)

**AI SDK guides**: Step-by-step guides for building AI features. [Learn more →](https://vercel.com/kb/ai-sdk)

**AI SDK templates**: Start from a production-ready Vercel template. [Learn more →](https://vercel.com/templates?type=ai)


---

[View full sitemap](/docs/sitemap)
