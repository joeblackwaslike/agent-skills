---
title: TanStack AI with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
  - /docs/accounts
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/sdks-and-apis/responses
summary: Connect TanStack AI to Vercel AI Gateway with the official adapter to authenticate requests and stream responses from AI models.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "0b75419d2adae73e74d93fbb67891c329d0c9bea97d8c35271cc4c4abdb73979"
---

# TanStack AI with AI Gateway

Connect [TanStack AI](https://tanstack.com/ai) to [AI Gateway](/docs/ai-gateway) using the `@tanstack/ai-vercel-gateway` adapter. You can switch models by changing the model ID in your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [TanStack AI](https://chat-sdk.dev/docs/ai/tanstack-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Feed thread history into TanStack AI's chat() and give it Chat SDK tools, with no runtime dependency on @tanstack/ai.
- [Vercel AI SDK vs TanStack AI](https://vercel.com/kb/guide/vercel-ai-sdk-vs-tanstack-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Compare the Vercel AI SDK and TanStack AI for building AI-powered TypeScript applications and agents. Learn how AI SDK a
- [TanStack AI with Vercel Sandbox](https://vercel.com/docs/sandbox/ecosystem/tanstack-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Run TanStack AI coding agents in isolated Vercel Sandbox microVMs with the dedicated provider, workspace configuration,
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Use Vercel Sandbox with the agent frameworks, model SDKs, and coding agents you already work with.
- [AI Gateway Embeddings](https://vercel.com/docs/ai-gateway/modalities/embeddings?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation \\(RAG\\) through
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Ftanstack-ai&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

Use an existing JavaScript or TypeScript project with Node.js 22 or later and a [Vercel account](/docs/accounts).

## Install the adapter

Install TanStack AI and its AI Gateway adapter in your project:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @tanstack/ai @tanstack/ai-vercel-gateway
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @tanstack/ai @tanstack/ai-vercel-gateway
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @tanstack/ai @tanstack/ai-vercel-gateway
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @tanstack/ai @tanstack/ai-vercel-gateway
    ```
  </Code>
</CodeBlock>

## Configure authentication

Create an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys) and save it in a `.env` file:

```bash filename=".env"
AI_GATEWAY_API_KEY=your_api_key_here
```

The adapter reads `AI_GATEWAY_API_KEY` automatically. When that variable is absent, the adapter uses `VERCEL_OIDC_TOKEN`. See [OpenID Connect authentication](/docs/ai-gateway/authentication-and-byok/oidc) for token setup and local development.

## Send a chat request

Create an entry file that passes `vercelGatewayText` to TanStack AI's `chat` function. Run this code on the server to keep your credentials private:

**index.mts**

```ts filename="index.mts" framework=all
import { chat } from '@tanstack/ai';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';

const stream = chat({
  adapter: vercelGatewayText('anthropic/claude-opus-5'),
  messages: [
    {
      role: 'user',
      content: 'Write a one-sentence bedtime story about a unicorn.',
    },
  ],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

**index.mjs**

```js filename="index.mjs" framework=all
import { chat } from '@tanstack/ai';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';

const stream = chat({
  adapter: vercelGatewayText('anthropic/claude-opus-5'),
  messages: [
    {
      role: 'user',
      content: 'Write a one-sentence bedtime story about a unicorn.',
    },
  ],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

Run the TypeScript example with `tsx`, loading your API key from `.env`:

```bash filename="terminal"
pnpm dlx tsx --env-file=.env index.mts
```

For JavaScript, run `node --env-file=.env index.mjs`. Your terminal displays stream events containing the generated story.

The adapter uses the [OpenAI Responses API](/docs/ai-gateway/sdks-and-apis/responses) by default. To use [Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), pass `{ api: 'chat' }` as the second argument to `vercelGatewayText`.

## Next steps

- Authenticate OAuth-protected MCP tools with [TanStack AI and Vercel Connect](/docs/connect/frameworks/tanstack-ai).
- Follow the [Using TanStack AI with Vercel AI Gateway](/kb/guide/tanstack-ai-vercel-ai-gateway) guide to connect a chat UI and generate embeddings and images.
- Configure routing through `modelOptions.gateway` using the [TanStack AI adapter reference](https://tanstack.com/ai/latest/docs/adapters/vercel-gateway). The adapter translates these options to `providerOptions.gateway`.
- Explore [provider routing](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) and [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks).
- [Connect to an MCP server on Vercel](/docs/mcp/integrations/tanstack-ai) to make its tools available to TanStack AI.


---

[View full sitemap](/docs/sitemap)
