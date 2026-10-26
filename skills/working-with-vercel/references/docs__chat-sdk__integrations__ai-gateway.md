---
title: Chat SDK with AI Gateway
product: vercel
url: /docs/chat-sdk/integrations/ai-gateway
canonical_url: "https://vercel.com/docs/chat-sdk/integrations/ai-gateway"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/chat-sdk/integrations
  - /docs/chat-sdk
related:
  - /docs/ai-gateway
  - /docs/ai-sdk
  - /docs/chat-sdk/quickstart
  - /docs/chat-sdk/frameworks
  - /docs/ai-gateway/pricing
summary: Stream AI Gateway model responses into Chat SDK conversations with AI SDK and message history.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/integrations/ai-gateway.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "53b4ed34bc1f60288405b30a598218ceec1244f71f5f85e12aaab1c8e1583580"
---

# Chat SDK with AI Gateway

Turn a Chat SDK bot into an AI assistant with [AI Gateway](/docs/ai-gateway) and [AI SDK](/docs/ai-sdk). The handler reads recent conversation history, requests a model response, and streams the answer back to the thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [How to build an agent for Liveblocks with Chat SDK and AI SDK](https://vercel.com/kb/guide/liveblocks-chat-sdk-ai-sdk) — Build an AI agent that replies to @-mentions in Liveblocks comment threads with streamed responses and tool calling, usi
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [Chat SDK with Vercel Sandbox](https://vercel.com/docs/chat-sdk/integrations/sandbox) — Build a Chat SDK agent that analyzes CSV attachments with the AI SDK Bash tool in Vercel Sandbox.

Full cross-link map for this page: [/docs/chat-sdk/integrations/ai-gateway.graph.md](/docs/chat-sdk/integrations/ai-gateway.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A working bot from the [Chat SDK quickstart](/docs/chat-sdk/quickstart) or a [framework guide](/docs/chat-sdk/frameworks)
- An AI Gateway account with [credits available](/docs/ai-gateway/pricing)
- A persistent state adapter for deployments

The examples use the quickstart project layout with `src/lib/bot.ts`. For a project without `src`, place the files under `lib` instead.

## Configure AI Gateway

Install AI SDK:

```bash filename="Terminal"
pnpm add ai
```

Choose a [model ID](/docs/ai-gateway/models-and-providers) and set `AI_GATEWAY_MODEL` in your local and deployed [environment variables](/docs/environment-variables). For example:

```bash filename=".env.local"
AI_GATEWAY_MODEL=anthropic/claude-opus-5.5
```

On Vercel, AI SDK can authenticate through the deployment OIDC token. For local development, link the project and run `vercel env pull .env.local` to obtain a development token. You can also set `AI_GATEWAY_API_KEY`. See [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok) for setup and precedence.

## Stream a response with conversation history

Create `src/lib/respond.ts`. Read history through `thread.messages` so adapters without a platform history API can use Chat SDK's stored messages. `toAiMessages` maps authors to model roles and sorts the messages oldest first:

**src/lib/respond.ts**

```typescript filename="src/lib/respond.ts"
import { streamText } from 'ai';
import type { Message, Thread } from 'chat';
import { toAiMessages } from 'chat/ai';

export async function respond(thread: Thread, _message: Message) {
  const model = process.env.AI_GATEWAY_MODEL;
  if (!model)
    throw new Error('Set AI_GATEWAY_MODEL to an AI Gateway model ID.');

  const history: Message[] = [];
  for await (const message of thread.messages) {
    history.push(message);
    if (history.length === 20) break;
  }

  const result = streamText({
    model,
    system: 'Answer questions using the conversation for context.',
    messages: await toAiMessages(history),
    abortSignal: AbortSignal.timeout(60_000),
  });

  await thread.post(result.textStream);
}
```

**src/lib/respond.js**

```javascript filename="src/lib/respond.js"
import { streamText } from 'ai';
import { toAiMessages } from 'chat/ai';

export async function respond(thread, _message) {
  const model = process.env.AI_GATEWAY_MODEL;
  if (!model)
    throw new Error('Set AI_GATEWAY_MODEL to an AI Gateway model ID.');

  const history = [];
  for await (const message of thread.messages) {
    history.push(message);
    if (history.length === 20) break;
  }

  const result = streamText({
    model,
    system: 'Answer questions using the conversation for context.',
    messages: await toAiMessages(history),
    abortSignal: AbortSignal.timeout(60_000),
  });

  await thread.post(result.textStream);
}
```

Await `thread.post` so the handler stays active until the stream finishes. The framework webhook route must still pass its background processing callback, as shown in the [framework guides](/docs/chat-sdk/frameworks#process-events-after-responding).

## Register the response handler

In `src/lib/bot.ts`, keep your existing bot configuration and replace its echo handlers with the following registrations:

**src/lib/bot.ts**

```typescript filename="src/lib/bot.ts"
import { respond } from './respond';

// Keep your existing Chat instance, adapters, and state configuration.

bot.onNewMention(async (thread, message) => {
  await thread.subscribe();
  await respond(thread, message);
});
bot.onSubscribedMessage(respond);
bot.onDirectMessage(respond);
```

**src/lib/bot.js**

```javascript filename="src/lib/bot.js"
import { respond } from './respond';

// Keep your existing Chat instance, adapters, and state configuration.

bot.onNewMention(async (thread, message) => {
  await thread.subscribe();
  await respond(thread, message);
});
bot.onSubscribedMessage(respond);
bot.onDirectMessage(respond);
```

## Test the bot

Deploy the updated bot, invite it to a channel, and mention it with a question. Ask a follow-up in the same thread. The bot should use the earlier messages when answering.

Platforms differ in how they display streamed replies. Use the [Web Adapter](/docs/chat-sdk/frameworks/nextjs#add-browser-chat-with-the-web-adapter) with `protocol: 'ai-sdk'` to serve a browser chat from the same handler.

The handler reads at most 20 messages; it does not summarize older conversations. The model request has a 60-second timeout, and the webhook function's [maximum duration](/docs/functions/configuring-functions/duration) must also cover history retrieval and delivery.

## Next steps

- [Use TanStack AI with Chat SDK](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai#use-chat-sdk-with-tanstack-ai)
- [Configure model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks)
- [Give agents Chat SDK tools](https://chat-sdk.dev/docs/ai/tools)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
