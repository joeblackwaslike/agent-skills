---
title: Poll Mode
product: vercel
url: /docs/queues/poll-mode
canonical_url: "https://vercel.com/docs/queues/poll-mode"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  - /docs/queues
related:
  - /docs/queues/concepts
  - /docs/cron-jobs
  - /docs/queues/python-sdk
  - /docs/fluid-compute
  - /docs/services
summary: Consume messages from Vercel Queues by polling on your own schedule, from any environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/poll-mode.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3e921404e9748f80f40d62355613272c27155cb3a7f76d0f0341f7942b9826fd"
---

# Poll Mode

In poll mode, your application polls for messages from a queue on its own schedule instead of having Vercel invoke your function. This gives you full control over when and how messages are consumed.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Production architecture for a RAG chatbot on Vercel](https://vercel.com/kb/guide/rag-chatbot-production-architecture-on-vercel?from=related) — Architect a production RAG chatbot on Vercel Functions with Fluid compute, AI Gateway, and a region-pinned vector store.
- [JS SDK Reference](https://vercel.com/docs/queues/sdk?from=related) — Publish and consume messages with the @vercel/queue SDK.
- [Quickstart](https://vercel.com/docs/queues/quickstart?from=related) — Set up Vercel Queues with the SDK.
- [Observability](https://vercel.com/docs/queues/observability?from=related) — Monitor queue throughput, message age, and consumer performance to optimize your queue-based workflows.
- [API Reference](https://vercel.com/docs/queues/api?from=related) — HTTP API reference for Vercel Queues. Publish, consume, acknowledge, and manage messages.
- [Build Queues](https://vercel.com/docs/builds/build-queues?from=related) — Understand how concurrency and same branch build queues manage multiple simultaneous deployments.

Full cross-link map for this page: [/docs/queues/poll-mode.graph.md](/docs/queues/poll-mode.graph.md)
<!-- /docsgraph:related -->

## When to use poll mode

Poll mode is designed for two main scenarios:

### Consuming off Vercel

If your consumers run outside of Vercel (on long-running services, on-premise workers, or other cloud environments), poll mode lets you connect to Vercel Queues without requiring Vercel Functions. Your application polls the queue and processes messages whenever it's ready.

This makes Vercel Queues a cross-platform messaging layer: publish messages from your Vercel app and process them wherever your infrastructure runs.

### Advanced on-Vercel setups

On Vercel, [push mode](/docs/queues/concepts#delivery) is the default and handles most workloads. However, poll mode is available on Vercel for cases where you need more control over consumption.

Common patterns include:

- **Cron-triggered processing**: Use a [Vercel Cron Job](/docs/cron-jobs) to invoke a function on a schedule that polls the queue and processes messages in batch.
- **Client-driven polling**: Have your client-side application poll a server endpoint, which then polls the queue on behalf of that client. This is useful for building real-time experiences without persistent connections.
- **Rate-controlled consumption**: Poll for messages at a pace that matches a downstream dependency's rate limits.
- **Mixed delivery**: Use push mode for latency-sensitive consumers and poll mode for batch workloads within the same application and even the same queue.

> **💡 Note:** Push and poll mode can be used together within the same queue. Each consumer group independently chooses its delivery mode, so a single topic can have some groups receiving pushes and others polling.

### Example: multiplayer AI agent replay

Consumer groups are a natural fit for multiplayer AI workflows. Consider a remote coding agent that multiple developers can observe in real time. Each action the agent takes (file edits, terminal commands, tool calls) is published to a topic. Every connected viewer gets their own consumer group and replays the full action history from the beginning.

This works because new consumer groups always start at the beginning of the topic. A developer who joins mid-session doesn't miss anything. Their consumer group replays every action from the start, then catches up to the live stream. Developers who have been watching the whole time continue receiving new actions without interruption.

```typescript filename="app/api/agent/actions/route.ts" framework=nextjs-app
import { PollingQueueClient } from '@vercel/queue';

const { receive } = new PollingQueueClient({
  region: process.env.QUEUE_REGION!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentRunId = searchParams.get('runId');
  const viewerId = searchParams.get('viewerId');

  const result = await receive(
    `agent-run-${agentRunId}`,
    `viewer-${viewerId}`,
    async (action, metadata) => {
      return action;
    },
  );

  return Response.json(result);
}
```

```typescript filename="lib/agent/publish-action.ts" framework=nextjs-app
import { QueueClient } from '@vercel/queue';

const { send } = new QueueClient();

async function onAgentAction(
  runId: string,
  action: { type: string; path?: string; content: string },
) {
  await send(`agent-run-${runId}`, action);
}
```

The agent publishes actions as they happen, and each viewer's consumer group independently tracks how far through the action log they've read. Because consumer groups are unlimited, this scales to any number of simultaneous viewers without affecting the agent or other observers.

## `PollingQueueClient`

Use `PollingQueueClient` from the `@vercel/queue` SDK to poll for messages. It provides `send` and `receive` methods. For Python polling, see the [Python SDK Reference](/docs/queues/python-sdk#consuming-messages-with-polling-loops).

The `region` parameter is **required** because messages can only be received from the region they were sent to:

```typescript filename="lib/poll-queue.ts" framework=nextjs-app
import { PollingQueueClient } from '@vercel/queue';

const queue = new PollingQueueClient({ region: process.env.QUEUE_REGION! });

export const { send, receive } = queue;
```

### Receiving messages

Call `receive` with a topic, consumer group, and handler callback. Messages are automatically acknowledged when your handler completes, and retried if it throws:

```typescript filename="lib/poll-worker.ts" framework=nextjs-app
import { PollingQueueClient } from '@vercel/queue';

const { receive } = new PollingQueueClient({ region: 'iad1' });

const result = await receive(
  'orders',
  'fulfillment',
  async (message, metadata) => {
    await processOrder(message);
  },
  { limit: 10 },
);

if (!result.ok && result.reason === 'empty') {
  // No messages available, wait before polling again
}
```

Vercel retries messages that aren't acknowledged according to the same [retry behavior](/docs/queues/concepts#retries) as push mode. Delivery guarantees are identical regardless of which mode you use.

### Receive options

```typescript filename="lib/poll-worker.ts" framework=nextjs-app
await receive('orders', 'fulfillment', handler, {
  limit: 10,
  visibilityTimeoutSeconds: 300,
  messageId: 'specific-message-id',
});
```

| Option                     | Type     | Default   | Description                                                |
| -------------------------- | -------- | --------- | ---------------------------------------------------------- |
| `limit`                    | `number` | `1`       | Maximum messages to receive (max: `10`)                    |
| `visibilityTimeoutSeconds` | `number` | 5 minutes | How long received messages are hidden from other consumers |
| `messageId`                | `string` | -         | Receive a specific message by ID                           |

## Versioning with deployment IDs

On Vercel, topics are [partitioned by deployment ID](/docs/queues/concepts#deployments-and-versioning) by default, so each deployment produces and consumes its own messages. In poll mode, you have two options for handling versioning:

- **Use the deployment ID**: Reference the deployment ID as an opaque version identifier when polling. This gives you the same per-deployment isolation as push mode, where each version of your application processes only the messages it published.
- **Omit the deployment ID**: Poll across all deployments and handle versioning at the application level. This is useful when your off-platform consumer needs to process messages from any deployment, or when your message schema is stable and backward-compatible.

With deployment ID (isolated per-deployment):

```bash
POST https://iad1.vercel-queue.com/api/v3/topic/orders/consumer/fulfillment
Vqs-Deployment-Id: dpl_abc123
```

Without deployment ID (all deployments share the queue):

```bash
POST https://iad1.vercel-queue.com/api/v3/topic/orders/consumer/fulfillment
```

## Comparison with push mode

|                         | Push mode                                           | Poll mode                                |
| ----------------------- | --------------------------------------------------- | ---------------------------------------- |
| **Delivery**            | Vercel invokes your function                        | Your app polls for messages              |
| **Best for**            | Workloads on Vercel with fluid compute              | Off-platform consumers, batch processing |
| **Scaling**             | Automatic with [fluid compute](/docs/fluid-compute) | Managed by your application              |
| **Latency**             | Lower (messages delivered as they arrive)           | Depends on your polling interval         |
| **Delivery guarantees** | At-least-once                                       | At-least-once                            |

## Poll mode in services

Consumer groups are not scoped to a [service](/docs/services). A group is identified only by its name on a topic, shared across the whole project and deployment rather than isolated per service.

When consumers in different services poll the same topic, scope their consumer group names manually to prevent collisions across services.


---

[View full sitemap](/docs/sitemap)
