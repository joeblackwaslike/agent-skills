---
title: LangFuse
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/langfuse
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse"
last_updated: 2026-02-26
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with LangFuse to access multiple AI models through a unified interface
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b37f3d95830bff5d3c29f7931f764bd04169dabb6e42686bb8821599cec07c75"
---

# LangFuse

[LangFuse](https://langfuse.com/) is an LLM engineering platform
that helps teams collaboratively develop, monitor, evaluate, and debug AI applications.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with LangFuse to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Langfuse](https://ai-sdk.dev/providers/observability/langfuse?from=related)
- [Building an AI chatbot with Next.js, Langchain, and OpenAI](https://vercel.com/kb/guide/nextjs-langchain-vercel-ai?from=related) — Dive into the world of LangChain.js and Next.js with our detailed guide. Learn how to set up a chatbot, structure output
- [LangChain](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain?from=related) — Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface
- [LiteLLM](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm?from=related) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [LlamaIndex](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex?from=related) — Learn how to integrate Vercel AI Gateway with LlamaIndex to access multiple AI models through a unified interface
- [LangChain](https://vercel.com/docs/sandbox/ecosystem/langchain?from=related) — Give a LangChain agent a tool that executes model-generated code in an isolated Vercel Sandbox, with models served by AI

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
  Install the required LangFuse packages along with the `dotenv` and `@types/node` packages:
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
  and LangFuse API keys:
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

- ### Create your LangFuse application
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
