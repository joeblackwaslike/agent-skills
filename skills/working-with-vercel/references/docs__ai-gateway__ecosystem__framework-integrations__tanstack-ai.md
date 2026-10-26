---
title: TanStack AI with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai"
last_updated: 2026-10-05
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "cd46b52e53072241d65d56e255ce5429996b15ca6e82ca85f50bcfb3e226138b"
---

# TanStack AI with AI Gateway

Connect [TanStack AI](https://tanstack.com/ai) to [AI Gateway](/docs/ai-gateway) using the `@tanstack/ai-vercel-gateway` adapter. You can switch models by changing the model ID in your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Adding keyboard shortcuts to React apps with TanStack Hotkeys](https://vercel.com/kb/guide/adding-keyboard-shortcuts-to-react-apps-with-tanstack-hotkeys) — Add cross-platform keyboard shortcuts to your React app with TanStack Hotkeys. Install, register, scope, and display sho
- [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel) — Deploy a TanStack Start app to Vercel with the Nitro Vite plugin. Covers Git and CLI deployment, Fluid compute defaults,
- [What is the Nitro Vite plugin?](https://vercel.com/kb/guide/nitro-vite-plugin) — The Nitro Vite plugin \\(nitro/vite\\) adds SSR, API routes, and deploy-anywhere server builds to any Vite app. Learn what
- [Using TanStack Intent to ship and consume agent skills](https://vercel.com/kb/guide/tanstack-intent) — TanStack Intent is a CLI for shipping and consuming agent skills, markdown files that teach AI coding agents how to use
- [TanStack Start on Vercel vs Cloudflare](https://vercel.com/kb/guide/tanstack-start-on-vercel-vs-cloudflare) — Compare running TanStack Start on Vercel Functions with Fluid compute against Cloudflare Workers. Learn how the runtimes
- [Chat SDK with AI Gateway](https://vercel.com/docs/chat-sdk/integrations/ai-gateway) — Stream AI Gateway model responses into Chat SDK conversations with AI SDK and message history.
- [TanStack AI with Vercel Sandbox](https://vercel.com/docs/sandbox/ecosystem/tanstack-ai) — Run TanStack AI coding agents in isolated Vercel Sandbox microVMs with the dedicated provider, workspace configuration,
- [AI SDK and MCP with Vercel Connect](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Use an existing JavaScript or TypeScript project with Node.js 22 or later and a [Vercel account](/docs/accounts).

## Install the adapter

Install TanStack AI and its AI Gateway adapter in your project:

**pnpm**

```bash
pnpm i @tanstack/ai @tanstack/ai-vercel-gateway
```

**yarn**

```bash
yarn add @tanstack/ai @tanstack/ai-vercel-gateway
```

**npm**

```bash
npm i @tanstack/ai @tanstack/ai-vercel-gateway
```

**bun**

```bash
bun add @tanstack/ai @tanstack/ai-vercel-gateway
```

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

## Use Chat SDK with TanStack AI

Use [Chat SDK](/docs/chat-sdk) to deliver TanStack AI responses to Slack and other chat platforms. AI Gateway handles model requests, while Chat SDK handles incoming messages and replies.

Start with a bot from the [Chat SDK quickstart](/docs/chat-sdk/quickstart) or a [framework guide](/docs/chat-sdk/frameworks), then install the TanStack AI packages and configure AI Gateway authentication as shown above.

Create a response handler that reads up to 20 recent messages from the thread. `toTanStackMessages` converts the history to TanStack AI's message format and orders it oldest first:

**lib/respond.ts**

```ts filename="lib/respond.ts" framework=all
import { chat } from '@tanstack/ai';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';
import type { Message, Thread } from 'chat';
import { toTanStackMessages } from 'chat/ai/tanstack';

export async function respond(thread: Thread) {
  const history: Message[] = [];
  for await (const message of thread.messages) {
    history.push(message);
    if (history.length === 20) break;
  }

  const stream = chat({
    adapter: vercelGatewayText('anthropic/claude-opus-5'),
    threadId: thread.id,
    systemPrompts: ['You are a helpful assistant.'],
    messages: await toTanStackMessages(history),
  });

  await thread.post(stream);
}
```

**lib/respond.js**

```js filename="lib/respond.js" framework=all
import { chat } from '@tanstack/ai';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';
import { toTanStackMessages } from 'chat/ai/tanstack';

export async function respond(thread) {
  const history = [];
  for await (const message of thread.messages) {
    history.push(message);
    if (history.length === 20) break;
  }

  const stream = chat({
    adapter: vercelGatewayText('anthropic/claude-opus-5'),
    threadId: thread.id,
    systemPrompts: ['You are a helpful assistant.'],
    messages: await toTanStackMessages(history),
  });

  await thread.post(stream);
}
```

In your bot module, replace the echo handlers with the response handler, keeping your existing adapters and state configuration:

**lib/bot.ts**

```ts filename="lib/bot.ts" framework=all
import { respond } from './respond';

// Keep your existing bot configuration here.

bot.onNewMention(async (thread) => {
  await thread.subscribe();
  await respond(thread);
});
bot.onSubscribedMessage(respond);
bot.onDirectMessage(respond);
```

**lib/bot.js**

```js filename="lib/bot.js" framework=all
import { respond } from './respond';

// Keep your existing bot configuration here.

bot.onNewMention(async (thread) => {
  await thread.subscribe();
  await respond(thread);
});
bot.onSubscribedMessage(respond);
bot.onDirectMessage(respond);
```

Mention the bot or send it a direct message. The bot responds with model-generated text and uses recent conversation history for context. `thread.post` consumes TanStack AI's stream directly.

For browser chat, configure the Web Adapter with `protocol: 'ag-ui'` and connect TanStack AI's `useChat` to its endpoint. Follow [Chat SDK with TanStack Start](/docs/chat-sdk/frameworks/tanstack-start#add-browser-chat-with-the-web-adapter) for authentication, the server route, and a client example. Read history through `thread.messages` so the Web Adapter can use its stored conversation history.

To give the model chat actions, such as posting messages or adding reactions, see [`createTanStackTools`](https://chat-sdk.dev/docs/ai/tanstack-ai#giving-the-agent-tools). Its write tools require approval by default. Follow the guide's [approval handling](https://chat-sdk.dev/docs/ai/tanstack-ai#approval) before adding those tools; posting a stream doesn't collect approval decisions.

## Make decisions with Jev

Use TanStack AI's `decide()` function with `vercelGatewayDecider` from
`@tanstack/ai-vercel-gateway` to answer typed questions about application state with [Jev](/kb/jev-from-typesafe-ai) through AI Gateway.
Jev returns typed choices, scores, and boolean probabilities that your code can use
to classify content and decide what happens next.

Follow [Moderate product reviews with Jev and TanStack AI](/kb/guide/moderate-product-reviews-jev-tanstack-ai)
to build a moderation workflow in TanStack Start that publishes clear reviews and
holds flagged or uncertain reviews for a moderator.

## Next steps

- Authenticate OAuth-protected MCP tools with [TanStack AI and Vercel Connect](/docs/connect/frameworks/tanstack-ai).
- Follow the [Using TanStack AI with Vercel AI Gateway](/kb/guide/tanstack-ai-vercel-ai-gateway) guide to connect a chat UI and generate embeddings and images.
- Configure routing through `modelOptions.gateway` using the [TanStack AI adapter reference](https://tanstack.com/ai/latest/docs/adapters/vercel-gateway). The adapter translates these options to `providerOptions.gateway`.
- Explore [provider routing](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) and [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks).
- [Connect to an MCP server on Vercel](/docs/mcp/integrations/tanstack-ai) to make its tools available to TanStack AI.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
