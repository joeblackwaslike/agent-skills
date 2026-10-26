---
title: Streaming
product: vercel
url: /docs/functions/streaming-functions
canonical_url: "https://vercel.com/docs/functions/streaming-functions"
last_updated: 2026-09-01
type: how-to
prerequisites:
  - /docs/functions
related:
  - /docs/functions/quickstart
  - /docs/cli
  - /docs/fluid-compute
  - /docs/functions/limitations
  - /docs/functions/logs
summary: Learn how to stream responses from Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/streaming-functions.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ac9ff2c3261c17c508d0c913212db96ded29e52541408bc570149a1199dd7e66"
---

# Streaming

AI providers can be slow when producing responses, but many make their responses available in chunks as they're processed. Streaming enables you to show users those chunks of data as they arrive rather than waiting for the full response, improving the perceived speed of AI-powered apps.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python Vercel Functions now have streaming enabled by default](https://vercel.com/changelog/python-vercel-functions-now-have-streaming-enabled-by-default)
- [Streaming is now supported in Vercel Functions for the Python runtime](https://vercel.com/changelog/streaming-is-now-supported-in-vercel-functions-for-the-python-runtime)
- [Streaming now enabled by default for all Node.js Vercel Functions](https://vercel.com/changelog/streaming-now-enabled-by-default-for-all-node-js-vercel-functions)
- [Streaming to be enabled by default for all Node.js Vercel Functions](https://vercel.com/changelog/vercel-functions-to-enable-streaming-by-default)
- [Do Vercel Functions support WebSocket connections?](https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections) — Vercel Functions serve WebSocket connections natively, in public beta on all plans. Learn how connections pin to instanc
- [Publish and subscribe to realtime data on Vercel](https://vercel.com/kb/guide/publish-and-subscribe-to-realtime-data-on-vercel) — Learn how to publish and subscribe to realtime data on Vercel with WebSockets, SSE, Redis, and Queues, and when a manage
- [Production architecture for a RAG chatbot on Vercel](https://vercel.com/kb/guide/rag-chatbot-production-architecture-on-vercel) — Architect a production RAG chatbot on Vercel Functions with Fluid compute, AI Gateway, and a region-pinned vector store.
- [Deploying AI-driven apps on Vercel](https://vercel.com/blog/deploying-ai-applications)
- [Building a GPT-3 app with Next.js and streaming (historical)](https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions)
- [An Introduction to Streaming on the Web](https://vercel.com/blog/an-introduction-to-streaming-on-the-web)
- [Function streaming to be framework-agnostic on Vercel](https://vercel.com/blog/vercel-functions-streaming-to-be-framework-agnostic)
- [How streaming helps build faster web applications](https://vercel.com/blog/how-streaming-helps-build-faster-web-applications)

Full cross-link map for this page: [/docs/functions/streaming-functions.graph.md](/docs/functions/streaming-functions.graph.md)
<!-- /docsgraph:related -->

**Vercel recommends using [Vercel's AI SDK](https://ai-sdk.dev/docs) to stream responses from LLMs and AI APIs**. It reduces the boilerplate necessary for streaming responses from AI providers and allows you to change AI providers with a few lines of code, rather than rewriting your entire application.

## Getting started

The following example shows how to send a message to one of OpenAI's models and streams:

### Prerequisites

1. You should understand how to setup a Vercel Function. See the [Functions quickstart](/docs/functions/quickstart) for more information.
2. You should be using Node.js 20 or later and the [latest version](/docs/cli#updating-vercel-cli) of the Vercel CLI.
3. You should copy your OpenAI API key in the `.env.local` file with name `OPENAI_API_KEY`. See the [AI SDK docs](https://ai-sdk.dev/docs/getting-started#configure-openai-api-key) for more information on how to do this.
4. Install the `ai` package:

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

**app/api/streaming-example/route.ts**

```ts v0="build" filename="app/api/streaming-example/route.ts" framework=nextjs-app
import { streamText } from 'ai';

// This method must be named GET
export async function GET() {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  const response = streamText({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  });
  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
```

**app/api/streaming-example/route.js**

```js v0="build" filename="app/api/streaming-example/route.js" framework=nextjs-app
import { streamText } from 'ai';

// This method must be named GET
export async function GET() {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  const response = streamText({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  });
  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
```

**app/api/streaming-example/route.ts**

```ts v0="build" filename="app/api/streaming-example/route.ts" framework=nextjs
// Streaming Functions must be defined in an
// app directory, even if the rest of your app
// is in the pages directory.
import { streamText } from 'ai';

// This method must be named GET
export async function GET() {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  const response = streamText({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  });
  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
```

**app/api/streaming-example/route.js**

```js v0="build" filename="app/api/streaming-example/route.js" framework=nextjs
// Streaming Functions must be defined in an
// app directory, even if the rest of your app
// is in the pages directory.
import { streamText } from 'ai';

// This method must be named GET
export async function GET() {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  const response = streamText({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  });
  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
```

**api/chat-example.ts**

```ts filename="api/chat-example.ts" framework=other
import { streamText } from 'ai';

// This method must be named GET
export async function GET() {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  const response = streamText({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  });
  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
```

**api/chat-example.js**

```js filename="api/chat-example.js" framework=other
import { streamText } from 'ai';

// This method must be named GET
export async function GET() {
  // Make a request to OpenAI's API based on
  // a placeholder prompt
  const response = streamText({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: 'What is the capital of Australia?' }],
  });
  // Respond with the stream
  return response.toTextStreamResponse({
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
```

## Function duration

If your workload requires longer durations, you should consider enabling [fluid compute](/docs/fluid-compute), which has [higher default max durations and limits across plans](/docs/fluid-compute#default-settings-by-plan).

Maximum durations can be configured for Node.js functions to enable streaming responses for longer periods. See [max durations](/docs/functions/limitations#max-duration) for more information.

## Streaming Python functions

You can stream responses from Vercel Functions that use the Python runtime.

When your function is streaming, it will be able to take advantage of the extended [runtime logs](/docs/functions/logs#runtime-logs), which will show you the real-time output of your function, in addition to larger and more frequent log entries. Because of this potential increase in frequency and format, your [Log Drains](/docs/drains) may be affected. We recommend ensuring that your ingestion can handle both the new format and frequency.

## More resources

- [What is streaming?](/kb/guide/what-is-streaming)
- [AI SDK](https://ai-sdk.dev/docs/getting-started)
- [Vercel Functions](/docs/functions)
- [Fluid compute](/docs/fluid-compute)
- [Streaming and SEO: Does streaming affect SEO?](/kb/guide/does-streaming-affect-seo)
- [Processing data chunks: Learn how to process data chunks](/kb/guide/processing-data-chunks)
- [Handling backpressure: Learn how to handle backpressure](/kb/guide/handling-backpressure)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
