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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/chat-sdk/integrations/ai-gateway.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "96891e799eb6bb8c3f908325a5650f1ad7d5874b4cfda3b81bf82b64f7c933d4"
---

# Chat SDK with AI Gateway

Turn a Chat SDK bot into an AI assistant with [AI Gateway](/docs/ai-gateway) and [AI SDK](/docs/ai-sdk). The handler reads recent conversation history, requests a model response, and streams the answer back to the thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Chat SDK brings agents to your users](https://vercel.com/blog/chat-sdk-brings-agents-to-your-users)
- [Chat SDK with Vercel Connect](https://vercel.com/docs/connect/frameworks/chat-sdk) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.
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

## Stream generative UI with json-render

To reply with a table, a chart, or buttons instead of text, have the model write a [json-render](https://json-render.dev) spec. A spec is JSON that describes a card using components from a catalog you define. `@json-render/chat` converts the spec into a [Chat SDK card](https://chat-sdk.dev/docs/cards), and each platform adapter posts the card in its native format, such as Block Kit on Slack and Adaptive Cards on Microsoft Teams.

Install json-render and Zod. `@json-render/chat` requires `chat` 4.43 or later:

```bash filename="Terminal"
pnpm add @json-render/core @json-render/chat zod
```

Create `src/lib/respond-card.ts`. `catalog.prompt()` returns a system prompt that lists the catalog's components and tells the model to reply with a spec and no other text:

**src/lib/respond-card.ts**

```typescript filename="src/lib/respond-card.ts"
import { defineCatalog } from '@json-render/core';
import {
  CardSpecError,
  schema,
  standardComponentDefinitions,
  streamCard,
} from '@json-render/chat';
import { streamText } from 'ai';
import type { Message, Thread } from 'chat';

const catalog = defineCatalog(schema, {
  components: standardComponentDefinitions,
});

export async function respondWithCard(thread: Thread, message: Message) {
  const model = process.env.AI_GATEWAY_MODEL;
  if (!model)
    throw new Error('Set AI_GATEWAY_MODEL to an AI Gateway model ID.');

  const result = streamText({
    model,
    system: catalog.prompt(),
    prompt: message.text,
    abortSignal: AbortSignal.timeout(60_000),
  });

  try {
    await streamCard(thread, result.textStream, {
      limits: { tables: 1, charts: 2 },
    });
  } catch (error) {
    if (!(error instanceof CardSpecError)) throw error;
    console.error(error.issues);
    await thread.post(
      'That card failed validation. Try rephrasing your request.',
    );
  }
}
```

**src/lib/respond-card.js**

```javascript filename="src/lib/respond-card.js"
import { defineCatalog } from '@json-render/core';
import {
  CardSpecError,
  schema,
  standardComponentDefinitions,
  streamCard,
} from '@json-render/chat';
import { streamText } from 'ai';

const catalog = defineCatalog(schema, {
  components: standardComponentDefinitions,
});

export async function respondWithCard(thread, message) {
  const model = process.env.AI_GATEWAY_MODEL;
  if (!model)
    throw new Error('Set AI_GATEWAY_MODEL to an AI Gateway model ID.');

  const result = streamText({
    model,
    system: catalog.prompt(),
    prompt: message.text,
    abortSignal: AbortSignal.timeout(60_000),
  });

  try {
    await streamCard(thread, result.textStream, {
      limits: { tables: 1, charts: 2 },
    });
  } catch (error) {
    if (!(error instanceof CardSpecError)) throw error;
    console.error(error.issues);
    await thread.post(
      'That card failed validation. Try rephrasing your request.',
    );
  }
}
```

In `src/lib/bot.ts`, call `respondWithCard` instead of `respond` in the handlers that should reply with a card. This handler sends only the current message to the model. It doesn't read conversation history.

`streamCard` posts the message once the card has content, then edits it as the model writes more elements. Edits go out at most once every 500 milliseconds by default. Change the interval with `updateIntervalMs`. When the stream ends, `streamCard` validates the complete spec and sends the final card.

### Choose the components the model can use

`standardComponentDefinitions` gives the model these components. Each one maps to a Chat SDK card element:

| Component | Renders as |
| --- | --- |
| `Card` | The message's root element, with an optional title, subtitle, and image. |
| `Section` | A group of related elements. |
| `Text` | A paragraph of Markdown text. |
| `Fields` and `Field` | A grid of label and value pairs. |
| `Table` | Rows of data under column headers. |
| `Chart` | A pie, bar, line, or area chart. |
| `Divider` | A separator between groups. |
| `Image` | An image from a public URL. |
| `Actions`, `Button`, and `LinkButton` | A row of buttons that trigger a handler or open a URL. |

A generated `Button` includes an `id`. When someone clicks the button, Chat SDK passes that `id` to your `bot.onAction` handlers as `actionId`. To tell the model which IDs your bot handles, add a rule with `catalog.prompt({ customRules: [...] })`.

Platforms render the same card differently. For example, Slack draws a `Chart` natively, and other platforms show the chart's data as a text table. See [how each card element renders](https://chat-sdk.dev/docs/cards#components).

### Handle invalid specs and platform limits

`streamCard` throws `CardSpecError` when the final spec is invalid, for example when a table row has more cells than the table has headers. By then, the partial card is already visible in the thread. The error's `issues` array has one readable entry per problem. The example logs the issues and posts a fallback message. You can also send the issues back to the model and ask for a corrected spec.

Platforms cap what one message can hold, and Chat SDK adapters degrade content past those caps. The Slack adapter, for example, turns a second table into a code block. Pass `limits` to reject those specs instead. The example allows one table and two charts, which matches Slack's caps.

To convert a complete spec without streaming, call `toCard(spec)` and post the result with `thread.post()`. See the [`@json-render/chat` reference](https://json-render.dev/docs/api/chat) for every option, or try prompts in the [json-render Chat SDK playground](https://chat-sdk-demo.json-render.dev).

## Frequently asked questions

### Which AI models can a Chat SDK bot use through AI Gateway?

Your bot can use any text model that AI Gateway serves. Set `AI_GATEWAY_MODEL` to a model ID in `creator/model-name` form and pass it to AI SDK. Because the handler reads the model ID from the environment, you can switch models by changing the variable and redeploying, without changing code. See [AI Gateway models and providers](/docs/ai-gateway/models-and-providers) for the available IDs.

### Do I need an AI Gateway API key for my Chat SDK bot?

Not on Vercel. AI SDK authenticates to AI Gateway with the deployment's OIDC token. For local development, link the project and run `vercel env pull .env.local` to get a development token. You can set `AI_GATEWAY_API_KEY` instead, for example when the bot runs outside Vercel. See [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok) for which credential takes precedence.

### How does the bot remember earlier messages in a conversation?

The handler reads the thread's recent messages through `thread.messages` and converts them into model messages with `toAiMessages`, oldest first. It sends up to 20 messages with each request and doesn't summarize older ones. For adapters without a platform history API, `thread.messages` returns the messages Chat SDK stored in your state adapter. To keep history across conversations for one person, see [Chat SDK with Vercel Passport](/docs/chat-sdk/integrations/passport).

### Why do AI replies look different in Slack, Teams, and Discord?

Each platform displays streamed text differently. Slack has a native streaming API, so the message updates as text arrives. Microsoft Teams streams natively in direct messages but posts one final message in group chats. On Discord and Google Chat, Chat SDK posts a `...` placeholder and edits it as chunks arrive, no more than once every 500 milliseconds by default. Change the interval with `streamingUpdateIntervalMs` and the placeholder with `fallbackStreamingPlaceholderText`. Adapters such as GitHub and WhatsApp collect the whole stream and post one final message. See [streaming responses](https://chat-sdk.dev/docs/streaming).

### How do I stop long AI responses from timing out?

The example aborts the model request after 60 seconds, and the webhook function's [maximum duration](/docs/functions/configuring-functions/duration) must cover that request, history retrieval, and delivery. Raise `maxDuration` on the route if your bot needs more time. For work that must survive interruptions or wait for a person, use [Vercel Workflows](/docs/chat-sdk/integrations/workflows). To keep the bot responding when a provider fails, configure [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks).

## Next steps

- [Use TanStack AI with Chat SDK](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai#use-chat-sdk-with-tanstack-ai)
- [Configure model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks)
- [Give agents Chat SDK tools](https://chat-sdk.dev/docs/ai/ai-sdk-tools)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
