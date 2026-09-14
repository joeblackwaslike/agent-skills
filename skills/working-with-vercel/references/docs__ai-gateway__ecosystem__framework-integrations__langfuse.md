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
summary: Trace and monitor AI Gateway requests with Langfuse. Configure an OpenAI client and wrap it with observeOpenAI to log model generations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "b549e0f14e1b955e8029e9aaaf0a0136bbd08b7dbe0e208cba4bb6523891c948"
---

# Langfuse with AI Gateway

[Langfuse](https://langfuse.com/) is an LLM engineering platform
that helps teams collaboratively develop, monitor, evaluate, and debug AI applications.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with Langfuse to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Langfuse](https://ai-sdk.dev/providers/observability/langfuse?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=related)
- [Building an AI chatbot with Next.js, Langchain, and OpenAI](https://vercel.com/kb/guide/nextjs-langchain-vercel-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=related) — Dive into the world of LangChain.js and Next.js with our detailed guide. Learn how to set up a chatbot, structure output
- [LangChain with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=related) — Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=related) — Use Vercel Sandbox with the agent frameworks, model SDKs, and coding agents you already work with.
- [LiteLLM with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=related) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/langfuse.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/langfuse.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flangfuse&source_site=vercel-docs&relationship=graph)
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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i langfuse openai dotenv @types/node
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i langfuse openai dotenv @types/node
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i langfuse openai dotenv @types/node
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i langfuse openai dotenv @types/node
      ```
    </Code>
  </CodeBlock>

- ### Configure environment variables
  Create a `.env` file with your [Vercel AI Gateway API key](/docs/ai-gateway#using-the-ai-gateway-with-an-api-key)
  and Langfuse API keys:
  ```bash filename=".env"
  AI_GATEWAY_API_KEY=your-api-key-here

  LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
  LANGFUSE_SECRET_KEY=your_langfuse_secret_key
  LANGFUSE_HOST=https://cloud.langfuse.com
  ```
  > **💡 Note:** If you're using the [AI Gateway from within a Vercel
  > deployment](/docs/ai-gateway#using-the-ai-gateway-with-a-vercel-oidc-token),
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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>
  You should see a response from the AI model in your console.


---

[View full sitemap](/docs/sitemap)
