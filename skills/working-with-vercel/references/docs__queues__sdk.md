---
title: SDK Reference
product: vercel
url: /docs/queues/sdk
canonical_url: "https://vercel.com/docs/queues/sdk"
last_updated: 2026-07-02
type: reference
prerequisites:
  - /docs/queues
related:
  - /docs/queues/poll-mode
  - /docs/queues
summary: Publish and consume messages with the @vercel/queue SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/sdk.md"
fetched_at: "2026-07-13T07:00:47.058Z"
sha256: "8692d57b6df6a0936554cf5dc0b964fe3710dbed142aa74f83d698b25898a067"
---

# SDK Reference

The `@vercel/queue` Node.js SDK lets you publish and consume messages in push-based workflows on Vercel. For poll-based consumption, see [`PollingQueueClient`](/docs/queues/poll-mode#pollingqueueclient).

## Installation

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @vercel/queue
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @vercel/queue
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @vercel/queue
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @vercel/queue
    ```
  </Code>
</CodeBlock>

## Top-level exports

Import `send` and `handleCallback` directly from `@vercel/queue`. A lazily-created default client auto-detects the region from `VERCEL_REGION`, falling back to `iad1`.

```typescript
import { send, handleCallback } from '@vercel/queue';
```

### Custom client

If you need to target a specific region, use a non-default transport, or manage multiple clients, create a `QueueClient` explicitly:

```typescript filename="lib/queue.ts"
import { QueueClient } from '@vercel/queue';

const queue = new QueueClient({ region: 'sfo1' });

export const { send, handleCallback } = queue;
```

Then import from your module instead of `@vercel/queue`:

```typescript filename="app/api/orders/route.ts"
import { send } from '@/lib/queue';

export async function POST(request: Request) {
  const body = await request.json();
  const { messageId } = await send('orders', body);
  return Response.json({ messageId });
}
```

```typescript filename="app/api/queues/process-order/route.ts"
import { handleCallback } from '@/lib/queue';

export const POST = handleCallback(async (message, metadata) => {
  await processOrder(message);
});
```

## Publishing messages

Use `send` to publish a message to a topic. The message can be any JSON-serializable value.

```typescript filename="app/api/orders/route.ts"
import { send } from '@vercel/queue';

export async function POST(request: Request) {
  const body = await request.json();
  const { messageId } = await send('orders', {
    orderId: body.orderId,
    action: 'process',
  });
  return Response.json({ messageId });
}
```

### Send options

```typescript
await send('orders', payload, {
  region: 'sfo1',
  retentionSeconds: 3600,
  delaySeconds: 60,
  idempotencyKey: 'order-123',
  headers: { 'x-trace-id': 'abc-123' },
});
```

| Option             | Type                     | Default       | Description                                                                 |
| ------------------ | ------------------------ | ------------- | --------------------------------------------------------------------------- |
| `region`           | `string`                 | Auto-detected | Target a specific region for this message                                   |
| `retentionSeconds` | `number`                 | 24 hours      | Message TTL. Minimum 60 seconds, maximum 7 days (604,800 seconds)           |
| `delaySeconds`     | `number`                 | Zero seconds  | Delay before message becomes visible. Maximum 7 days, capped at message TTL |
| `idempotencyKey`   | `string`                 | -             | Deduplication key for the message                                           |
| `headers`          | `Record<string, string>` | -             | Custom headers to include with this message                                 |

## Consuming messages (push mode)

Use `handleCallback` to create a push mode consumer. Messages are automatically acknowledged when your handler completes, and retried if it throws.

For Express, Connect, or Next.js Pages Router apps, use `handleNodeCallback` instead, which accepts `(req, res)` arguments. Unlike the top-level exports, `handleNodeCallback` is only available on a `QueueClient` instance:

```typescript filename="pages/api/queues/process-order.ts"
import { QueueClient } from '@vercel/queue';

const queue = new QueueClient();

export default queue.handleNodeCallback(async (message, metadata) => {
  await processOrder(message);
});
```

First, configure the consumer in `vercel.json`:

```json filename="vercel.json"
{
  "functions": {
    "app/api/queues/process-order/route.ts": {
      "experimentalTriggers": [
        { "type": "queue/v2beta", "topic": "orders" }
      ]
    }
  }
}
```

Then create the handler:

```typescript filename="app/api/queues/process-order/route.ts"
import { handleCallback } from '@vercel/queue';

export const POST = handleCallback(async (message, metadata) => {
  await processOrder(message);
});
```

The `metadata` object includes:

| Field           | Type     | Description                                     |
| --------------- | -------- | ----------------------------------------------- |
| `messageId`     | `string` | Unique message identifier                       |
| `deliveryCount` | `number` | Number of times this message has been delivered |
| `createdAt`     | `Date`   | When the message was published                  |
| `expiresAt`     | `Date`   | When the message expires                        |
| `topicName`     | `string` | Topic the message was published to              |
| `consumerGroup` | `string` | Consumer group receiving the message            |
| `region`        | `string` | Region where the message is stored              |

### Handler options

Pass an options object as the second argument to `handleCallback` to configure visibility timeout and retry behavior:

| Option                     | Type       | Default   | Description                                                             |
| -------------------------- | ---------- | --------- | ----------------------------------------------------------------------- |
| `visibilityTimeoutSeconds` | `number`   | 5 minutes | How long the message stays in-flight before redelivery                  |
| `retry`                    | `function` | -         | Custom retry logic. See [custom retry behavior](#custom-retry-behavior) |

The SDK automatically re-extends the visibility timeout while your handler is running, so you don't need to configure it for most workloads. If you need to override it for advanced use cases, pass `visibilityTimeoutSeconds`:

```typescript filename="app/api/queues/process-order/route.ts"
import { handleCallback } from '@vercel/queue';

export const POST = handleCallback(
  async (message, metadata) => {
    await processOrder(message);
  },
  {
    visibilityTimeoutSeconds: 600,
  },
);
```

> **💡 Note:** The SDK defaults `visibilityTimeoutSeconds` to 300 seconds (5 minutes) and automatically re-extends the lease while your handler is still running. The underlying [Queues API](/docs/queues#visibility-timeout) defaults to 60 seconds and does not auto-extend.

### Custom retry behavior

Control retry timing and handle poison messages with the `retry` option:

```typescript filename="app/api/queues/process-order/route.ts"
import { handleCallback } from '@vercel/queue';

export const POST = handleCallback(
  async (message, metadata) => {
    await processOrder(message);
  },
  {
    retry: (error, metadata) => {
      if (metadata.deliveryCount > 5) {
        return { acknowledge: true };
      }
      const delay = Math.min(300, 2 ** metadata.deliveryCount * 5);
      return { afterSeconds: delay };
    },
  },
);
```

The `retry` callback can return:

| Return value               | Behavior                                |
| -------------------------- | --------------------------------------- |
| `{ afterSeconds: number }` | Retry after the specified delay         |
| `{ acknowledge: true }`    | Acknowledge the message (stop retrying) |
| `undefined`                | Use default retry behavior              |

## Framework integrations

### Nitro

[Nitro v3](https://nitro.build) and frameworks built on it integrate with Vercel Queues through the Vercel preset. You declare your topic triggers in `nitro.config.ts`, and Nitro generates the consumer function and its trigger configuration during the build, so you don't edit `vercel.json` yourself.

Declare the topics you want to subscribe to under `vercel.queues.triggers`:

```ts filename="nitro.config.ts"
export default defineConfig({
  vercel: {
    queues: {
      triggers: [
        { topic: 'orders' },
        {
          topic: 'notifications',
          retryAfterSeconds: 60,
          initialDelaySeconds: 5,
        },
      ],
    },
  },
});
```

Each trigger accepts the following options:

| Option                | Type     | Required | Description                                               |
| --------------------- | -------- | -------- | --------------------------------------------------------- |
| `topic`               | `string` | Yes      | Topic to subscribe to                                     |
| `retryAfterSeconds`   | `number` | No       | Delay before a failed message is retried                  |
| `initialDelaySeconds` | `number` | No       | Delay before a newly published message is first delivered |

Process incoming messages with the `vercel:queue` runtime hook in a [Nitro plugin](https://nitro.build/guide/plugins). The hook receives the decoded `message`, its `metadata`, and a `send` function for publishing follow-up messages:

```ts filename="server/plugins/queues.ts"
export default definePlugin((nitro) => {
  nitro.hooks.hook('vercel:queue', ({ message, metadata }) => {
    console.log(`[${metadata.topicName}] ${metadata.messageId}`, message);
  });
});
```

Send messages with `send` from `@vercel/queue` in any server route, the same as in other frameworks:

```ts filename="server/routes/api/orders.post.ts"
import { send } from '@vercel/queue';

export default defineHandler(async (event) => {
  const order = await event.req.json();
  const { messageId } = await send('orders', order);
  return { messageId };
});
```

Queues also run in `nitro dev`. Run `vercel link` and `vercel env pull` first so the SDK can authenticate, then `send` delivers messages straight to your `vercel:queue` hook for local testing. If the hook throws, the message is retried locally, honoring `retryAfterSeconds` from the matching trigger.

## Error handling

The SDK provides typed error classes for each failure mode:

```typescript
import {
  UnauthorizedError,
  BadRequestError,
  DuplicateMessageError,
  MessageNotFoundError,
  QueueEmptyError,
} from '@vercel/queue';

try {
  await send('orders', payload);
} catch (error) {
  if (error instanceof UnauthorizedError) {
    // Invalid or expired token
  } else if (error instanceof DuplicateMessageError) {
    // Idempotency key collision
  }
}
```

## Transports

`QueueClient` supports multiple serialization formats through transports:

```typescript
import { QueueClient, BufferTransport, StreamTransport } from '@vercel/queue';

const binaryQueue = new QueueClient({
  transport: new BufferTransport(),
});

const streamQueue = new QueueClient({
  transport: new StreamTransport(),
});
```

| Transport         | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `JsonTransport`   | Default. Serializes messages as JSON                   |
| `BufferTransport` | Sends and receives raw binary data                     |
| `StreamTransport` | Sends and receives `ReadableStream` for large payloads |


---

[View full sitemap](/docs/sitemap)
