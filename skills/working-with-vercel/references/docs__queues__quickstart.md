---
title: Quickstart
product: vercel
url: /docs/queues/quickstart
canonical_url: "https://vercel.com/docs/queues/quickstart"
last_updated: 2026-08-24
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "0e9da511a55f396cab81f4e8fb7a951ff16ae7782fa1e3c8c240a99f217eb23c"
---

# Quickstart

This guide shows how to send your first queue message and process it with the Vercel Queues SDK.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Python Queues SDK is now available in beta](https://vercel.com/changelog/vercel-python-queues-sdk-is-now-available-in-beta?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related)
- [How to run background jobs in Next.js](https://vercel.com/kb/guide/how-to-run-background-jobs-in-nextjs-on-vercel?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn the durable way to run background jobs in Next.js on Vercel with the Workflow SDK, and when to reach for Queues or
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [Vercel Queues now in public beta](https://vercel.com/changelog/vercel-queues-now-in-public-beta?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Vercel Queues is now in Limited Beta](https://vercel.com/changelog/vercel-queues-is-now-in-limited-beta?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Run background tasks with Celery on Vercel](https://vercel.com/docs/frameworks/backend/celery?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Queues concepts](https://vercel.com/docs/queues/concepts?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/queues/quickstart.graph.md](/docs/queues/quickstart.graph.md?from=related&source_path=%2Fdocs%2Fqueues%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me set up Vercel Queues in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Detect whether this is a JavaScript/TypeScript or Python project. Then: 1. Install @vercel/queue for JavaScript/TypeScript or vercel-queue for Python. 2. Run `vercel link` and `vercel env pull` to get OIDC credentials. 3. Create a producer that sends messages to an 'orders' topic using send. 4. For JavaScript/TypeScript, create a consumer route using handleCallback and configure its queue trigger in vercel.json. For Python, create a function decorated with @subscribe and declare its dotted Python module path, such as queues.orders, as the entrypoint in [[tool.vercel.subscribers]] in pyproject.toml. 5. Test locally with `vercel dev`.
```

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
