---
title: LangChain
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/langchain
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "348c1ace0ebe71f05296245f71aed926ba21ebadd6b46d481ac1ff72582d72c7"
---

# LangChain

[LangChain](https://js.langchain.com) gives you tools
for every step of the agent development lifecycle.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with LangChain to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an AI chatbot with Next.js, Langchain, and OpenAI](https://vercel.com/kb/guide/nextjs-langchain-vercel-ai?from=related) — Dive into the world of LangChain.js and Next.js with our detailed guide. Learn how to set up a chatbot, structure output
- [Deploying Chained OpenAI LLM Calls to Vercel with the Inngest SDK](https://vercel.com/kb/guide/chained-openai-llm-calls-vercel-inngest?from=related) — Discover how to deploy chained OpenAI LLMs \(GPT-4\) to Vercel using Inngest SDK for improved conversational AI, multi-t
- [LangChain](https://vercel.com/docs/sandbox/ecosystem/langchain?from=related) — Give a LangChain agent a tool that executes model-generated code in an isolated Vercel Sandbox, with models served by AI
- [LangDB](https://ai-sdk.dev/providers/community-providers/langdb?from=related)
- [LangFuse](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse?from=related) — Learn how to integrate Vercel AI Gateway with LangFuse to access multiple AI models through a unified interface
- [LiteLLM](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm?from=related) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.

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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i langchain @langchain/core @langchain/openai dotenv @types/node
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i langchain @langchain/core @langchain/openai dotenv @types/node
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i langchain @langchain/core @langchain/openai dotenv @types/node
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i langchain @langchain/core @langchain/openai dotenv @types/node
      ```
    </Code>
  </CodeBlock>

- ### Configure environment variables
  Create a `.env` file with your [Vercel AI Gateway API key](/docs/ai-gateway#using-the-ai-gateway-with-an-api-key):
  ```bash filename=".env"
  AI_GATEWAY_API_KEY=your-api-key-here
  ```
  > **💡 Note:** If you're using the [AI Gateway from within a Vercel
  > deployment](/docs/ai-gateway#using-the-ai-gateway-with-a-vercel-oidc-token),
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
      modelName: 'openai/gpt-5.6-sol',
      temperature: 0.7,
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
  - Sets the model `temperature` to `0.7`
  - Makes a chat completion request
  - Handles any potential errors

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
