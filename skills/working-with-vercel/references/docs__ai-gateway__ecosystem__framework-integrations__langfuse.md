---
title: Langfuse with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/langfuse
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/authentication-and-byok
summary: Trace and monitor AI Gateway requests with Langfuse. Configure an OpenAI client and wrap it with observeOpenAI to log model generations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "a541571348b67887f6ca3111253a54e9f680bc04c1b3088cbb008a756dd2fe92"
---

# Langfuse with AI Gateway

[Langfuse](https://langfuse.com/) is an LLM engineering platform
that helps teams collaboratively develop, monitor, evaluate, and debug AI applications.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with Langfuse to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Langfuse](https://ai-sdk.dev/providers/observability/langfuse) — Monitor, evaluate and debug your AI SDK application with Langfuse
- [Ling 3.1 Flash 1019 now available on AI Gateway for free](https://vercel.com/changelog/ling-3-1-flash-1019-now-available-on-ai-gateway-for-free)
- [Ling 3.1 Flash is now available on AI Gateway](https://vercel.com/changelog/ling-3-1-flash-is-now-available-on-ai-gateway)
- [LangChain with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain) — Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [LiteLLM with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Flue with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/flue) — Route Flue agent requests through Vercel AI Gateway with the built-in provider, using an API key or Vercel OIDC authenti

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/langfuse.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/langfuse.graph.md)
<!-- /docsgraph:related -->

## Getting started

- ### Create a new project
  First, create a new directory for your project and initialize it:
  ```bash filename="terminal"
  mkdir langfuse-ai-gateway
  cd langfuse-ai-gateway
  pnpm dlx init -y
  ```

- ### Install dependencies
  Install the required Langfuse packages along with the `dotenv` and `@types/node` packages:

  **pnpm**
  ```bash
  pnpm i langfuse openai dotenv @types/node
  ```
  **yarn**
  ```bash
  yarn add langfuse openai dotenv @types/node
  ```
  **npm**
  ```bash
  npm i langfuse openai dotenv @types/node
  ```
  **bun**
  ```bash
  bun add langfuse openai dotenv @types/node
  ```

- ### Configure environment variables
  Create a `.env` file with your [Vercel AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys)
  and Langfuse API keys:
  ```bash filename=".env"
  AI_GATEWAY_API_KEY=your-api-key-here

  LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
  LANGFUSE_SECRET_KEY=your_langfuse_secret_key
  LANGFUSE_HOST=https://cloud.langfuse.com
  ```
  > **💡 Note:** If you're using the [AI Gateway from within a Vercel
  > deployment](/docs/ai-gateway/authentication-and-byok#oidc-tokens),
  > you can also use the `VERCEL_OIDC_TOKEN` environment variable which will be
  > automatically provided.

- ### Create your Langfuse application
  Create a new file called `index.ts` with the following code:
  ```typescript filename="index.ts" {6, 14}
  import { observeOpenAI } from 'langfuse';
  import OpenAI from 'openai';

  const openaiClient = new OpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const client = observeOpenAI(openaiClient, {
    generationName: 'fun-fact-request', // Optional: Name of the generation in Langfuse
  });

  const response = await client.chat.completions.create({
    model: 'moonshotai/kimi-k2',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Tell me about the food scene in San Francisco.' },
    ],
  });

  console.log(response.choices[0].message.content);
  ```
  The following code:
  - Creates an OpenAI client configured to use the Vercel AI Gateway
  - Uses `observeOpenAI` to wrap the client for automatic tracing and logging
  - Makes a chat completion request through the AI Gateway
  - Automatically captures request/response data, token usage, and metrics

- ### Running the application
  Run your application using Node.js:

  **pnpm**
  ```bash
  pnpm dlx tsx index.ts
  ```
  **yarn**
  ```bash
  yarn dlx tsx index.ts
  ```
  **npm**
  ```bash
  npx tsx index.ts
  ```
  **bun**
  ```bash
  bunx tsx index.ts
  ```
  You should see a response from the AI model in your console.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
