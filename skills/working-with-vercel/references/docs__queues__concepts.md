---
title: Queues concepts
product: vercel
url: /docs/queues/concepts
canonical_url: "https://vercel.com/docs/queues/concepts"
last_updated: 2026-04-16
type: conceptual
prerequisites:
  - /docs/queues
related:
  - /docs/workflows
  - /docs/queues/pricing
  - /docs/queues/api
  - /docs/regions
  - /docs/queues/poll-mode
summary: Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/concepts.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e032c1e57a5f2fb5dfeac52f995ab0f1c3ec18dc6f7854abdcc828aadd1b40b1"
---

# Queues concepts

Vercel Queues is a durable event streaming system for asynchronous workloads. You publish messages to topics, and consumer groups process those messages independently with at-least-once delivery, retries, and visibility timeouts.

Queues is useful when you need to decouple request handling from background processing, absorb traffic spikes, and keep work reliable across function failures or deployment changes.

## Vercel Queues overview

Vercel Queues is Vercel's managed queueing system for durable, asynchronous message processing. It acts as a reliability layer between producers and consumers:

- Producers publish messages to a topic.
- Consumer groups read and process those messages independently.
- Messages persist until they are acknowledged or expire.
- Failed processing attempts are retried automatically.
- Delivery is at-least-once, so consumers should be idempotent.

## Vercel Queues vs Workflows

Vercel Queues and [Vercel Workflows](/docs/workflows) solve related but different problems:

|                         | Vercel Queues                                            | Vercel Workflows                                              |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **Primary abstraction** | Topics, messages, and consumer groups                    | Durable steps and workflow runs                              |
| **Best for**            | Event delivery, fan-out consumers, and routing control   | Stateful, multi-step application logic                       |
| **Execution model**     | Message-driven consumers (push or poll)                  | Step-driven orchestration with built-in state between steps  |
| **Failure handling**    | Retries, visibility timeout, and idempotent consumers    | Retries at step boundaries with workflow-aware recovery      |
| **Use this when**       | You need low-level control over publish/consume behavior | You need high-level orchestration and durable business flows |

Use Queues when you want direct control over event ingestion and delivery. Use Workflow when you want a higher-level programming model for long-running business processes.

## How Vercel Queues works

At a high level, Vercel Queues follows a publish, lease, acknowledge, and retry flow:

1. A producer publishes a message to a topic.
2. The topic makes that message available to each consumer group.
3. A consumer in a group receives the message under a visibility timeout lease.
4. If processing succeeds, the consumer acknowledges the message and removes it from that group.
5. If processing fails or times out, the lease expires and the message is retried.

Messages remain durable throughout this lifecycle and are removed when acknowledged or when their retention period expires.

## Topics and consumer groups

### Topics

A topic is a durable, append-only log of messages. Producers publish messages to a topic, and the topic fans them out to all subscribed consumer groups. Messages are retained until they expire, regardless of whether any consumer has processed them. Retention is configurable per-message from 60 seconds to 7 days, defaulting to 24 hours.

### Consumer groups

A consumer group is an independent subscriber to a topic. Each group tracks its own position in the log and processes messages at its own pace. Because groups are fully isolated, a slow or failing consumer in one group has no effect on any other.

> **💡 Note:** In poll mode, you can add a new consumer group at any time. New groups start reading from the beginning of the topic, giving you access to all non-expired messages. This makes it straightforward to backfill data or add new processing pipelines without republishing. Push mode consumers are configured at deploy time via `vercel.json` and cannot be added dynamically.

### Scaling

Vercel manages partitioning and scaling for you. You don't need to pre-configure partition counts, manage rebalancing, or provision throughput capacity. Queues scale with your traffic automatically.

## Durability

When Vercel Queues accepts a message, it guarantees the message can be consumed. Every message is synchronously written to **three separate availability zones** before the publish call returns. This means your message is fully replicated before your producer receives confirmation. Even if an entire availability zone goes down, the message is safe.

After replication, the publish acknowledgment and consumer notification happen simultaneously. This means a consumer may receive and begin processing a message before the producer's publish call returns, depending on network latency.

Once Vercel accepts a message, it retries delivery until the message is successfully processed or [expires](/docs/queues/pricing#limits). Vercel only removes a message from the topic after your consumer acknowledges it. If your consumer crashes, a deployment rolls out, or the function times out, Vercel redelivers the message automatically.

### At-least-once delivery

Vercel Queues provides **at-least-once** delivery semantics. Every accepted message is delivered to each consumer group at least one time. In most cases, a message is delivered exactly once, but there are edge cases where a message may be delivered more than once:

- **Consumer timeouts**: If your function processes a message but doesn't acknowledge it before the visibility timeout expires, Vercel assumes the delivery failed and redelivers the message.
- **Infrastructure events**: During rare events like availability zone failovers, a message that was already delivered may be redelivered.

Design your consumers to be **idempotent**, meaning they produce the same result whether they process a message once or multiple times. Common strategies include using a unique message ID to deduplicate, or making operations naturally idempotent (like setting a value rather than incrementing it).

### Visibility timeout

When a message is delivered to a consumer, it becomes temporarily invisible to other consumers in the same group. This is the **visibility timeout**. During this window, the message is "in flight" and won't be delivered again.

If your consumer processes the message and acknowledges it before the timeout expires, the message is removed. If the consumer crashes, times out, or fails to acknowledge, the visibility timeout expires and the message becomes available for redelivery.

This is how Vercel Queues handles failures without manual intervention. You don't need to build retry infrastructure or monitor for stuck messages. If a Vercel Function crashes mid-processing or hits its execution time limit, the message automatically returns to the queue and gets delivered to the next available consumer.

The default visibility timeout is **60 seconds**. You can configure it per receive request from 0 to 3,600 seconds (60 minutes). Setting it to `0` peeks at the message without leasing it. If your consumer needs more time mid-processing, you can extend the lease using the [ExtendLease](/docs/queues/api#extendlease) API.

## Message lifecycle

A message moves through several states from the time it's published to when it's processed or expires:

1. **SendMessage** writes the message. If a delay is configured, the message enters a pending state.
2. Once the delay expires (or immediately if no delay), the message becomes **visible** to consumers.
3. **ReceiveMessages** claims the message and starts a lease ([visibility timeout](#visibility-timeout)). The message is now **in-flight**.
4. **AcknowledgeMessage** permanently removes the message from the consumer group.
5. **ExtendLease** resets the visibility timeout if your consumer needs more processing time.
6. If the lease expires without acknowledgment, the message becomes **visible** again with an incremented delivery count.
7. Messages are permanently deleted when their retention period (TTL) expires, regardless of processing state. Once a message expires, it cannot be consumed.

See the [API reference](/docs/queues/api) for details on each operation.

## Regions and data residency

Vercel Queues is available in all 20 [Vercel regions](/docs/regions). When you create a queue, you select a region, and your message data is persisted in that region. The three-zone replication described in [Durability](#durability) happens across availability zones within your selected region.

Choose a region close to your producers and consumers to minimize latency. If you need queues in multiple regions, create separate queues in each region. See the [regions documentation](/docs/regions#region-list) for the full list of available regions.

### Failover

Vercel writes queue data to the region you select. During a regional outage, Vercel may temporarily store messages in a neighboring region and relocate them once the target region recovers. This ensures ingestion continues even when a region is unavailable.

> **💡 Note:** Strict data residency (guaranteeing data never leaves the selected region, even temporarily during failover) is not supported yet.

## Deployments and versioning

On Vercel, topics are **partitioned by deployment ID** by default. In push mode, Vercel delivers messages back to the same deployment that published them.

This design means you don't have to worry about message compatibility across deployments. When you change a message schema or update your consumer logic, the new deployment produces and consumes its own messages. There's no risk of a new deployment consuming messages published by an older version with a different format.

This is useful during rollouts: both the current and previous deployments can have active queues processing their own messages independently until the old deployment drains.

> **💡 Note:** In [poll mode](/docs/queues/poll-mode), you can reference the deployment ID as an opaque version identifier to partition your consumers manually, or omit it entirely and handle versioning at the application level.

## Delivery

By default, Vercel delivers messages to your [Vercel Functions](/docs/functions) using **push mode**. When a message is published to a topic, Vercel invokes your consumer function automatically with [fluid compute](/docs/fluid-compute). You define a consumer function, and Vercel calls it for each message (or batch of messages) as they become available.

```typescript filename="app/api/queues/process-order/route.ts"
import { handleCallback } from '@/lib/queue';

export const POST = handleCallback(async (message, metadata) => {
  await processOrder(message);
});
```

For consumers running outside of Vercel, or advanced on-Vercel setups that need more control, Vercel Queues also supports [poll mode](/docs/queues/poll-mode). Both modes provide the same delivery guarantees and can be used together within the same queue.

### Consumer function security

Queue consumer functions on Vercel are not accessible from the outside world. You configure a consumer by adding a `queue/v2beta` trigger to your `vercel.json`:

```json filename="vercel.json"
{
  "functions": {
    "app/api/queues/process-order/route.ts": {
      "experimentalTriggers": [
        {
          "type": "queue/v2beta",
          "topic": "orders",
          "retryAfterSeconds": 60,
          "initialDelaySeconds": 0
        }
      ]
    }
  }
}
```

| Option                | Type     | Default      | Description                                                 |
| --------------------- | -------- | ------------ | ----------------------------------------------------------- |
| `type`                | `string` | -            | Trigger type. Use `queue/v2beta`                            |
| `topic`               | `string` | -            | Topic name to consume. Supports wildcards (e.g., `order-*`) |
| `retryAfterSeconds`   | `number` | 60 seconds   | Time before a failed message is retried                     |
| `initialDelaySeconds` | `number` | Zero seconds | Delay before the consumer starts processing after deploy    |

Multiple route files with the same topic create separate consumer groups, each receiving a copy of every message.

With this configuration, the function is completely air-gapped from the internet. It has no public URL and can only be invoked by Vercel's internal queue infrastructure.

This means you don't need to add authentication or authorization logic to your consumer functions. Unauthorized requests can never reach them. Only messages delivered through Vercel Queues can trigger execution.

In [poll mode](/docs/queues/poll-mode), security works differently because your application initiates the connection. Your code authenticates with the Vercel API using standard OIDC tokens when polling for messages, the same way you authenticate with any other Vercel API.

### Delayed delivery

You can delay a message's visibility by setting a delay when publishing. The message is accepted and stored immediately, but consumers won't see it until the delay expires. Delays can be set from 0 seconds up to 7 days, but cannot exceed the message's TTL.

This is useful for scheduling future work, such as sending a reminder email in 30 minutes or retrying an external API call after a cooldown period.

> **💡 Note:** Messages cannot be consumed after their TTL expires. If a message's delay would extend beyond its TTL, the message will expire before it becomes visible and will never be delivered.

#### Delays longer than 7 days

If you need to schedule work further into the future than the 7-day maximum delay, consider these approaches:

- **Daisy-chain messages**: Publish a message with the maximum delay, then have your consumer republish another delayed message until you reach the target time.
- **Use Vercel Workflows**: [Vercel Workflows](/docs/workflows) supports `sleep()` for arbitrarily long durations with built-in durability. This is often simpler than managing chained messages yourself.

### Idempotency

You can include an idempotency key when publishing a message to have Vercel deduplicate it for you. Vercel handles deduplication out-of-band after the publish call returns, so the `SendMessage` response itself always succeeds. The duplicate is silently dropped, and the original message continues to be delivered with [at-least-once](#at-least-once-delivery) semantics.

In practice, this means:

- **Push and poll mode consumers** never receive the duplicate message. It's filtered out before delivery. The original message is unaffected.
- **ReceiveMessageById** returns a `409` response with the `originalMessageId` if you try to receive a duplicate by its ID. This lets you follow the redirect to the original message.

The deduplication window lasts for the entire lifetime of the original message (up to its TTL). As long as the original message hasn't expired, any republish with the same idempotency key is deduplicated. This means you're protected from duplicate messages for the full retention period, whether that's 60 seconds or 7 days.

This is useful when your producer might retry a publish (for example, after a network timeout) and you need to guarantee exactly-once publishing.

### Concurrency control (push mode)

In push mode, you can set a maximum concurrency per consumer group. This limits how many messages can be in-flight simultaneously for that group. If the limit is reached, Vercel holds back delivery until an in-flight message is acknowledged or its lease expires.

This is useful when your consumer calls a rate-limited downstream service, or when you need to control resource usage.

## Retries

Vercel Queues retries failed messages automatically until they expire. For the first 32 delivery attempts, Vercel respects your configured retry delay. After 32 attempts, the system begins forcing exponential backoff to maintain system health and prevent runaway deliveries.

### Dead-letter queue (DLQ)

Vercel Queues doesn't have a built-in dead-letter queue. Instead, you handle poisoned messages at the application level using the SDK's `retry` handler.

Because messages with no delivery attempts are always prioritized over retried messages, a poisoned message naturally falls to lower priority. Your consumer keeps progressing through new messages while the failing message retries in the background. Even with max concurrency set to 1, a poisoned message can't block your consumer.

Use the `retry` callback to control backoff timing and acknowledge poisoned messages to stop retrying them:

```typescript filename="app/api/queues/process-order/route.ts"
import { handleCallback } from '@/lib/queue';

export const POST = handleCallback(
  async (message, metadata) => {
    await fulfillOrder(message);
  },
  {
    retry: (error, metadata) => {
      if (metadata.deliveryCount > 10) {
        return { acknowledge: true };
      }
      const delay = Math.min(300, 2 ** metadata.deliveryCount * 5);
      return { afterSeconds: delay };
    },
  },
);
```

See the [SDK reference](/docs/queues/sdk#custom-retry-behavior) for the full retry API.

## Ordering

Vercel Queues delivers messages in **approximate write order**. Messages are generally delivered in the order they were published, but strict ordering is not guaranteed:

- **Retried messages have lower priority than new messages.** If a message fails and is retried, new messages published in the meantime may be delivered first.
- **No FIFO guarantee.** Even with a single consumer and max concurrency set to 1, message order is not strictly first-in-first-out.

If your workload requires strict ordering, design your consumers to handle messages in any order, or include sequence numbers in your message payloads to reorder on the consumer side.


---

[View full sitemap](/docs/sitemap)
