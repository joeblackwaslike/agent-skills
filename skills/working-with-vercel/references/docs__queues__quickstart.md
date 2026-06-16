---
title: Quickstart
product: vercel
url: /docs/queues/quickstart
canonical_url: "https://vercel.com/docs/queues/quickstart"
last_updated: 2026-04-16
type: tutorial
prerequisites:
  - /docs/queues
related:
  - /docs/cli
  - /docs/oidc
  - /docs/workflows
  - /docs/queues/sdk
  - /docs/queues/api
summary: Set up Vercel Queues with the SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/quickstart.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3ea84a5033c6099691c31e54041808e8c44195bb097ae1a5af027b063bc65f99"
---

# Quickstart

This guide shows how to send your first queue message and process it with the `@vercel/queue` SDK.

In this quickstart:

- Your API route acts as a **producer**. It sends work to a queue topic.
- The topic (`orders`) stores messages durably until a consumer processes them.
- A second route acts as a **consumer**. Vercel invokes it automatically in push mode.

## Prerequisites

- A Vercel account
- [Vercel CLI](/docs/cli) installed (`npm i -g vercel`)
- Node.js 22+

- ### Install the SDK
  Install `@vercel/queue` so your app can send messages and receive push callbacks.
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

- ### Link your Vercel project and pull credentials
  The SDK authenticates via [OIDC](/docs/oidc). Link your project if you haven't already, then pull environment variables so the SDK can authenticate during local development:
  ```bash filename="Terminal"
  vercel link
  vercel env pull
  ```
  This creates a `.env.local` file containing the OIDC tokens the SDK needs to connect to Vercel Queues from your machine. Without it, local calls to `send` and `handleCallback` can't authenticate. When you deploy to Vercel, authentication is automatic and no environment setup is needed.

- ### Send a message anywhere in your app
  Import `send` directly from `@vercel/queue` and call it from any server-side context: a route handler, a Server Action, a [Workflow](/docs/workflows) step, or an error handler.
  ```typescript filename="app/cart/checkout/route.ts"
  import { send } from '@vercel/queue';

  export async function POST(request: Request) {
    const order = await request.json();
    const { messageId } = await send('orders', order);
    return Response.json({ messageId });
  }
  ```

- ### Handle incoming messages with a route handler
  ```typescript filename="app/api/queues/fulfill-order/route.ts"
  import { handleCallback } from '@vercel/queue';

  export const POST = handleCallback(async (order, metadata) => {
    // await chargePayment(order);
    // await sendConfirmationEmail(order);
    console.log('Fulfilling order', metadata.messageId, order);
  });
  ```

- ### Configure `vercel.json`
  Add a consumer trigger to wire your route to a topic. This makes the route private: it has no public URL and only Vercel's queue infrastructure can invoke it.
  ```json filename="vercel.json"
  {
    "functions": {
      "app/api/queues/fulfill-order/route.ts": {
        "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "orders" }]
      }
    }
  }
  ```

The top-level `send` and `handleCallback` use an auto-configured default client. The region is detected from the `VERCEL_REGION` environment variable, which Vercel sets on every deployment. If the region can't be detected (for example, during local development), it falls back to `iad1`.

To target a specific region when sending, pass the `region` option:

```typescript
await send('orders', payload, { region: 'sfo1' });
```

If your handler crashes after charging payment but before sending the email, Vercel redelivers the message so the email still goes out. If the email call fails, the message comes back and your handler runs again. Make each step idempotent (for example, pass an idempotency key to your payment provider) so retries are safe.

This works locally with `next dev` or `vercel dev` so you can test without deploying.

## What you just did

1. **Installed the SDK**: Added `@vercel/queue` to your project.
2. **Created a producer**: Published messages to the `orders` topic.
3. **Configured a consumer**: Registered a push trigger and handler to process messages.

## Next steps

- [SDK reference](/docs/queues/sdk)
- [API reference](/docs/queues/api)
- [Poll mode](/docs/queues/poll-mode)
- [Pricing and limits](/docs/queues/pricing)


---

[View full sitemap](/docs/sitemap)
