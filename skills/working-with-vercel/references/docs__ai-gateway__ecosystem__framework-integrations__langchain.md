---
title: LangChain with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/langchain
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/authentication-and-byok
summary: Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "e20c5d328eec2afa913ad1ee111c0f78f0eb3413d5444225ce65bb91f102ae9a"
---

# LangChain with AI Gateway

[LangChain](https://js.langchain.com) gives you tools
for every step of the agent development lifecycle.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with LangChain to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [LangChain](https://vercel.com/docs/sandbox/ecosystem/langchain) — Give a LangChain agent a tool that executes model-generated code in an isolated Vercel Sandbox, with models served by AI
- [Langfuse with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse) — Trace and monitor AI Gateway requests with Langfuse. Configure an OpenAI client and wrap it with observeOpenAI to log mo
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [LiteLLM with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface.
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/langchain.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/langchain.graph.md)
<!-- /docsgraph:related -->

## Getting started

- ### Create a new project
  First, create a new directory for your project and initialize it:
  ```bash filename="terminal"
  mkdir langchain-ai-gateway
  cd langchain-ai-gateway
  pnpm dlx init -y
  ```

- ### Install dependencies
  Install the required LangChain packages along with the `dotenv` and `@types/node` packages:

  **pnpm**
  ```bash
  pnpm i langchain @langchain/core @langchain/openai dotenv @types/node
  ```
  **yarn**
  ```bash
  yarn add langchain @langchain/core @langchain/openai dotenv @types/node
  ```
  **npm**
  ```bash
  npm i langchain @langchain/core @langchain/openai dotenv @types/node
  ```
  **bun**
  ```bash
  bun add langchain @langchain/core @langchain/openai dotenv @types/node
  ```

- ### Configure environment variables
  Create a `.env` file with your [Vercel AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys):
  ```bash filename=".env"
  AI_GATEWAY_API_KEY=your-api-key-here
  ```
  > **💡 Note:** If you're using the [AI Gateway from within a Vercel
  > deployment](/docs/ai-gateway/authentication-and-byok#oidc-tokens),
  > you can also use the `VERCEL_OIDC_TOKEN` environment variable which will be
  > automatically provided.

- ### Create your LangChain application
  Create a new file called `index.ts` with the following code:
  ```typescript filename="index.ts" {9, 16}
  import 'dotenv/config';
  import { ChatOpenAI } from '@langchain/openai';
  import { HumanMessage } from '@langchain/core/messages';

  async function main() {
    console.log('=== LangChain Chat Completion with AI Gateway ===');

    const apiKey =
      process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

    const chat = new ChatOpenAI({
      apiKey: apiKey,
      modelName: 'openai/gpt-6-astra',
      configuration: {
        baseURL: 'https://ai-gateway.vercel.sh/v1',
      },
    });

    try {
      const response = await chat.invoke([
        new HumanMessage('Write a one-sentence bedtime story about a unicorn.'),
      ]);

      console.log('Response:', response.content);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  main().catch(console.error);
  ```
  The following code:
  - Initializes a `ChatOpenAI` instance configured to use the AI Gateway
  - Makes a chat completion request
  - Handles any potential errors

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
