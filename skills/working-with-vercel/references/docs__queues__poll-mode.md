---
title: Poll Mode
product: vercel
url: /docs/queues/poll-mode
canonical_url: "https://vercel.com/docs/queues/poll-mode"
last_updated: 2026-09-17
type: conceptual
prerequisites:
  - /docs/queues
related:
  - /docs/queues/concepts
  - /docs/schedules
  - /docs/daemons
  - /docs/frameworks/agents/eve
  - /docs/queues/python-sdk
summary: Consume messages from Vercel Queues by polling on your own schedule, from any environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/poll-mode.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "2f3476210168ab1dd26e78e877b9d105cba29519dda9725a44f6e8bc9c18144d"
---

# Poll Mode

In poll mode, your application polls for messages from a queue on its own schedule instead of having Vercel invoke your function. This gives you full control over when and how messages are consumed.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Running background workers on Vercel](https://vercel.com/kb/guide/background-workers-on-vercel) — Run background jobs on Vercel with waitUntil, Cron Jobs, Queues, Workflows, Daemons, or Sandbox. Compare the options and
- [ Run a Docker monolith with workers on Vercel](https://vercel.com/kb/guide/docker-monolith-workers-vercel) — Run a Dockerized monolith on Vercel with Container Images, move long-running workers to Vercel Queues and Vercel Workflo
- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [Migrate Railway workers to Vercel Daemons](https://vercel.com/kb/guide/migrate-railway-workers-to-vercel-daemons) — Move Railway workers to Vercel Daemons with Docker configuration, broker migration, shutdown testing, a gradual queue ha
- [Process background jobs in Python with Vercel Queues](https://vercel.com/kb/guide/python-and-vercel-queues) — Move slow and failure-prone work out of your Python request handlers, with typed topics, consumer groups, and built-in r
- [Vercel Queues now in public beta](https://vercel.com/changelog/vercel-queues-now-in-public-beta)
- [Vercel Queues is now in Limited Beta](https://vercel.com/changelog/vercel-queues-is-now-in-limited-beta)
- [Queues Observability](https://vercel.com/docs/queues/observability) — Monitor queue throughput, message age, retries, and consumer performance to optimize your queue-based workflows.
- [Run background tasks with Celery on Vercel](https://vercel.com/docs/frameworks/backend/celery) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.

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

- **Schedule-triggered processing**: Use [Vercel Schedules](/docs/schedules) to invoke a function on a recurring cadence that polls the queue and processes messages in batch.
- **Client-driven polling**: Have your client-side application poll a server endpoint, which then polls the queue on behalf of that client. This is useful for building real-time experiences without persistent connections.
- **Long-running consumers**: Run a [daemon](/docs/daemons) that polls the queue continuously, with a fixed number of instances in each region.
- **Rate-controlled consumption**: Poll for messages at a pace that matches a downstream dependency's rate limits.
- **Mixed delivery**: Use push mode for latency-sensitive consumers and poll mode for batch workloads within the same application and even the same queue.

For an agent workflow, a daemon can poll jobs, start an [eve](/docs/frameworks/agents/eve) session, and wait for its outcome before acknowledging the message. Follow [Use Vercel Daemons with eve agents](/kb/guide/vercel-daemons-eve-agents) for queue consumption, result handling, and safe retries.

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
// Receive up to 10 messages from the consumer group
await receive('orders', 'fulfillment', handler, {
  limit: 10,
  visibilityTimeoutSeconds: 300,
});

// Receive one message by ID. The SDK ignores `limit` and `cursorFallback` when you set `messageId`
await receive('orders', 'fulfillment', handler, {
  messageId: 'specific-message-id',
  visibilityTimeoutSeconds: 300,
});
```

| Option                     | Type                       | Default      | Description                                                |
| -------------------------- | -------------------------- | ------------ | ---------------------------------------------------------- |
| `limit`                    | `number`                   | `1`          | Maximum messages to receive (max: `10`)                    |
| `visibilityTimeoutSeconds` | `number`                   | 5 minutes    | How long received messages are hidden from other consumers |
| `messageId`                | `string`                   | -            | Receive a specific message by ID                           |
| `cursorFallback`           | `"earliest" \| "latest"` | `"earliest"` | Starting position for a missing consumer group cursor      |

### Cursor fallback behavior

`cursorFallback` controls where polling starts when a source shard has no cursor for the consumer group. It does not move or reset an existing cursor.

- `"earliest"` starts at the earliest retained message. This is the default and lets a new consumer group replay available backlog.
- `"latest"` starts after each missing shard's committed head. Use this when a consumer should process new messages without replaying retained backlog.

Vercel discovers source shards as it polls and initializes missing cursors when it encounters them. With `"latest"`, each cursor starts after that shard's feeder-committed head at the time the shard is observed. Active shards are typically encountered during the initial polling requests; once a shard has a cursor, later polls continue from that cursor rather than applying the fallback again. Messages buffered above an observed shard head remain eligible for delivery.

This initialization is per shard rather than a single topic-wide cutoff.

For example, use `"latest"` when a newly deployed worker should skip messages retained before each shard is first discovered:

```typescript filename="lib/poll-worker.ts" framework=nextjs-app
import { PollingQueueClient } from '@vercel/queue';

const { receive } = new PollingQueueClient({ region: 'iad1' });

const result = await receive(
  'orders',
  'fulfillment',
  async (message) => {
    await processOrder(message);
  },
  { cursorFallback: 'latest' },
);
```

The option applies to the current receive request. If multiple workers share a consumer group, configure them to send the same `cursorFallback` value. Existing shard cursors continue from their current positions and are never moved, even if a later request uses a different value. During startup, a consumer group can briefly have some shards using existing positions while newly encountered shards are initialized at their latest committed heads.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
