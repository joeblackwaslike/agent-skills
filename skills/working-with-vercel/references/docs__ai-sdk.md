---
title: AI SDK
product: ai-sdk
url: /docs/ai-sdk
canonical_url: "https://vercel.com/docs/ai-sdk"
last_updated: 2026-10-05
type: integration
prerequisites:
  []
related:
  - /docs/chat-sdk
  - /docs/chat-sdk/quickstart
  - /docs/chat-sdk/integrations/ai-gateway
  - /docs/connect/frameworks/ai-sdk-and-mcp
summary: Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-sdk.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "bf7667fb556003c107bd5c67703191594f7d54ed6fd9abfed0dce5510d6c4bab"
---

# AI SDK

## Build AI agents

Build TypeScript agents and AI applications with one API for models, tools, structured output, and streaming across Next.js, Vue, Svelte, Node.js, and other frameworks.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Building AI-powered Article Embeddings with Chroma and GPT-4](https://vercel.com/kb/guide/ai-powered-article-embeddings-with-chroma-and-gpt-4) — This guide provides step-by-step instructions on using Chroma and GPT-4 to build AI-powered article embeddings for tasks
- [Upload provider files with AI SDK](https://vercel.com/kb/guide/ai-sdk-file-uploads) — Use uploadFile in the AI SDK to upload an image, PDF, or document to a provider, get a ProviderReference, and reference
- [Add MCP Apps to your AI SDK application](https://vercel.com/kb/guide/ai-sdk-mcp-apps) — Build an MCP Apps host with the AI SDK using @ai-sdk/mcp and @ai-sdk/react to filter model-visible tools, read ui:// res
- [Pass state to AI SDK tools and agents with context](https://vercel.com/kb/guide/ai-sdk-runtime-and-tool-context) — Use runtimeContext, toolsContext, and contextSchema in the AI SDK to pass tenant data, credentials, and other server-sid
- [Agentic Infrastructure](https://vercel.com/blog/agentic-infrastructure)
- [AI SDK by Vercel](https://ai-sdk.dev/docs/introduction) — The AI SDK is the TypeScript toolkit for building AI applications and agents with React, Next.js, Vue, Svelte, Node.js,
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 400+ models.
- [TanStack AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) — Connect TanStack AI to Vercel AI Gateway with the official adapter to authenticate requests and stream responses from AI
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/ai-sdk.graph.md](/docs/ai-sdk.graph.md)
<!-- /docsgraph:related -->

#### Build an agent

```typescript filename="agent.ts"
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

const agent = new ToolLoopAgent({
  model: 'anthropic/claude-fable-5.1',
  tools: {
    getWeather: tool({
      description: 'Get the current weather for a location',
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => ({
        location,
        temperature: 72,
        condition: 'sunny',
      }),
    }),
  },
});

const { text } = await agent.generate({
  prompt: "What's the weather in Tokyo?",
});

console.log(text);
```

#### Generate text

```typescript filename="index.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Explain quantum entanglement in one paragraph.',
});

console.log(text);
```

#### Generate structured data

```typescript filename="classify.ts"
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: 'openai/gpt-6-astra',
  schema: z.object({
    sentiment: z.enum(['positive', 'neutral', 'negative']),
  }),
  prompt: 'Classify the sentiment: I love this product.',
});

console.log(object);
```

## Add models, tools, and streaming

- **Unified provider API.** Switch between models by changing two lines of code
- **Structured outputs.** Generate type-safe JSON with `generateObject` and `streamObject`
- **Tool calling.** Let models interact with external systems
- **Streaming first.** Stream text, objects, and UI to your frontend
- **Framework support.** Works with React, Next.js, Vue, Svelte, and Node.js

## Generating text

At the center of the AI SDK is [AI SDK Core](https://ai-sdk.dev/docs/ai-sdk-core/overview), which provides a unified API to call any LLM.

The following example shows how to generate text with the AI SDK using OpenAI's GPT-6 Astra:

```typescript
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Explain the concept of quantum entanglement.',
});
```

The unified interface lets you switch providers by changing the model string. For example, to use Anthropic's Claude Fable 5.1:

```typescript {4}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-fable-5.1',
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
  model: 'openai/gpt-6-astra',
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

## Give agents tools

The AI SDK supports tool calling out of the box, allowing it to interact with external systems and perform discrete tasks. The following example shows how to use tool calling with the AI SDK:

```ts
import { generateText, tool } from 'ai';
import { z } from 'zod';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
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

**pnpm**

```bash
pnpm i ai
```

**yarn**

```bash
yarn add ai
```

**npm**

```bash
npm i ai
```

**bun**

```bash
bun add ai
```

See the [AI SDK Getting Started](https://ai-sdk.dev/docs/getting-started) guide for more information on how to get started with the AI SDK.

Follow [Build AI agents with AI Gateway and AI SDK](/kb/guide/ai-gateway-and-ai-sdk) to set up authentication, stream responses, and add tools and model fallbacks.

## Bring an agent to chat platforms

Use [Chat SDK](/docs/chat-sdk) to handle messages and interactions in platforms such as Slack, and AI SDK to generate responses and call tools. Start with the [Chat SDK quickstart](/docs/chat-sdk/quickstart), then follow [Chat SDK with AI Gateway](/docs/chat-sdk/integrations/ai-gateway) to stream model responses using conversation history.

## Use Vercel Connect with AI SDK

Vercel Connect supplies short-lived OAuth tokens to MCP clients built with AI
SDK, so models can call tools from services such as Linear without storing
provider credentials in your application. The `connectAuthProvider()` helper
requests credentials and supports user consent flows.

Follow the [AI SDK and MCP tutorial](/docs/connect/frameworks/ai-sdk-and-mcp) to
configure Vercel Connect, make MCP tools available to an AI SDK application,
and handle tool approval.

## Use Jev with AI SDK

[Jev](/kb/jev-from-typesafe-ai), a decision model from TypeSafe AI, returns typed choices, scores, and
boolean probabilities that your application can use to classify requests, route
work, and assess proposed actions. Call Jev through AI Gateway with the
experimental `decide` API in `ai` 7.0.128 or later. The previous
`experimental_evaluate` export still works as a deprecated alias.

Learn how to [classify, route, and score with Jev and AI SDK](/kb/guide/typesafe-jev-and-ai-sdk),
or follow [Route form submissions with Jev and AI SDK](/kb/guide/jev-ai-sdk-form-router)
to build a form router with configurable destinations and a fallback model for
uncertain decisions.

## Build with a template

Start with an AI SDK template to build a chatbot or route form submissions with Jev:

## More resources

**AI SDK documentation**: Read the official AI SDK reference and guides. [Learn more →](https://ai-sdk.dev/docs)

**AI SDK examples**: Browse runnable examples for common patterns. [Learn more →](https://ai-sdk.dev/cookbook)

**AI SDK guides**: Step-by-step guides for building AI features. [Learn more →](https://vercel.com/kb/ai-sdk)

**AI SDK templates**: Start from a production-ready Vercel template. [Learn more →](https://vercel.com/templates?type=ai)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
