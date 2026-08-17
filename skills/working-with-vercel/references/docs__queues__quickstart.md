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
  - /docs/queues/python-sdk
summary: Set up Vercel Queues with the SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/quickstart.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "64db628045d36578af14f1b77bbc983edb7db5bce5f83ad25243e05741b7b670"
---

# Quickstart

This guide shows how to send your first queue message and process it with the Vercel Queues SDK.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [How to ship an H3 app on Vercel](https://vercel.com/kb/guide/ship-a-h3-app-on-vercel?from=related) — Deploy an H3 app to Vercel with zero configuration. Learn to configure streaming, middleware, cron jobs, the Bun runtime
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis?from=related) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Concepts](https://vercel.com/docs/queues/concepts?from=related) — Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.
- [Celery](https://vercel.com/docs/frameworks/backend/celery?from=related) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related) — Learn how to run your first code in a Vercel Sandbox.

Full cross-link map for this page: [/docs/queues/quickstart.graph.md](/docs/queues/quickstart.graph.md)
<!-- /docsgraph:related -->

In this quickstart:

- Your API route acts as a **producer**. It sends work to a queue topic.
- The topic (`orders`) stores messages durably until a consumer processes them.
- A **consumer** processes the message. Vercel invokes it automatically in push mode.

## Prerequisites

- A Vercel account
- [Vercel CLI](/docs/cli) installed (`npm i -g vercel`)
- Node.js 22+ for Node.js apps, or Python 3.12+ for Python apps

- ### Install the SDK
  Install the SDK so your app can send messages and receive push callbacks.
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
  This creates a `.env.local` file containing the OIDC tokens the SDK needs to connect to Vercel Queues from your machine. Without it, local SDK calls can't authenticate. When you deploy to Vercel, authentication is automatic and no environment setup is needed.

- ### Send a message anywhere in your app
  Import `send` directly and call it from any server-side context: a route handler, a Server Action, a [Workflow](/docs/workflows) step, or an error handler.
  ```typescript filename="app/cart/checkout/route.ts" framework=nextjs-app
  import { send } from '@vercel/queue';

  export async function POST(request: Request) {
    const order = await request.json();
    const { messageId } = await send('orders', order);
    return Response.json({ messageId });
  }
  ```
  ```python filename="api/checkout.py" framework=fastapi
  from fastapi import FastAPI, Request
  from vercel.queue import send

  app = FastAPI()


  @app.post("/api/checkout")
  async def checkout(request: Request):
      order = await request.json()
      message_id = await send("orders", order)
      return {"messageId": message_id}
  ```

- ### Handle incoming messages
  ```typescript filename="app/api/queues/fulfill-order/route.ts" framework=nextjs-app
  import { handleCallback } from '@vercel/queue';

  export const POST = handleCallback(async (order, metadata) => {
    // await chargePayment(order);
    // await sendConfirmationEmail(order);
    console.log('Fulfilling order', metadata.messageId, order);
  });
  ```
  ```python filename="worker.py" framework=fastapi
  from vercel.queue import Message, subscribe


  @subscribe(topic="orders")
  async def fulfill_order(message: Message[dict[str, object]]) -> None:
      order = message.payload
      # await charge_payment(order)
      # await send_confirmation_email(order)
      print("Fulfilling order", message.message_id, order)
  ```

- ### Configure the consumer
  For JavaScript and TypeScript, add a consumer trigger to `vercel.json`. For Python, set `entrypoint` in `pyproject.toml` to the subscriber's Python module import path. For example, use `queues.orders` for the module at `queues/orders.py`. The Python build imports the module, reads the `@subscribe` configuration, and generates the queue-triggered function.

  Both configurations make the consumer private. The consumer has no public URL, and only Vercel's queue infrastructure can invoke it.
  ```json filename="vercel.json" framework=nextjs-app
  {
    "functions": {
      "app/api/queues/fulfill-order/route.ts": {
        "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "orders" }]
      }
    }
  }
  ```
  ```toml filename="pyproject.toml" framework=fastapi
  [[tool.vercel.subscribers]]
  entrypoint = "worker"
  ```

The top-level `send` and callback helpers use an auto-configured default client. The region is detected from the `VERCEL_REGION` environment variable, which Vercel sets on every deployment. If the region can't be detected, the Node.js SDK falls back to `iad1`. In Python, pass `region` or set `VERCEL_REGION` when you run outside Vercel. Python `send()` chooses the serializer from the payload type, including Pydantic models through `model_dump_json()`.

To target a specific region when sending, pass the `region` option:

```typescript filename="app/api/orders/route.ts" framework=nextjs-app
await send('orders', payload, { region: 'sfo1' });
```

```python filename="api/orders.py" framework=fastapi
from vercel.queue import QueueClient

queue = QueueClient(region="sfo1")
await queue.send("orders", payload)
```

If your handler crashes after charging payment but before sending the email, Vercel redelivers the message so the email still goes out. If the email call fails, the message comes back and your handler runs again. Make each step idempotent (for example, pass an idempotency key to your payment provider) so retries are safe.

This works locally with `vercel dev` so you can test without deploying. Next.js projects can also use `next dev`.

## What you just did

1. **Installed the SDK**: Added the Vercel Queues package for your language.
2. **Created a producer**: Published messages to the `orders` topic.
3. **Configured a consumer**: Registered a private push consumer to process messages.

## Next steps

- [JS SDK reference](/docs/queues/sdk)
- [Python SDK reference](/docs/queues/python-sdk)
- [API reference](/docs/queues/api)
- [Poll mode](/docs/queues/poll-mode)
- [Pricing and limits](/docs/queues/pricing)


---

[View full sitemap](/docs/sitemap)
