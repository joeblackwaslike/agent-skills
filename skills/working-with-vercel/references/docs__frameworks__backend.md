---
title: Backends on Vercel
product: vercel
url: /docs/frameworks/backend
canonical_url: "https://vercel.com/docs/frameworks/backend"
last_updated: 2026-08-20
type: conceptual
prerequisites:
  - /docs/frameworks
related:
  - /docs/fluid-compute
  - /docs/functions/usage-and-pricing
  - /docs/instant-rollback
  - /docs/vercel-firewall
  - /docs/deployments/environments
summary: Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no matter what tooling you use.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/frameworks/backend.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "117407762998c1ff755a8af97b1d7677f3f50a3b98c93936d48e43db2bf56419"
---

# Backends on Vercel

## Deploy your backend with zero configuration

Write your app in Express, Hono, FastAPI, or another supported framework. Vercel detects the entrypoint and runs it on Vercel Functions with Fluid compute.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How Vercel Services run on Fluid compute](https://vercel.com/kb/guide/vercel-services-fluid-compute) — The backends in a Vercel Services project run as Vercel Functions on Fluid compute by default. Learn how optimized concu
- [Hosting your API on Vercel](https://vercel.com/kb/guide/hosting-backend-apis) — Learn how to build and scale performant APIs on Vercel.
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [How to ship an H3 app on Vercel](https://vercel.com/kb/guide/ship-a-h3-app-on-vercel) — Deploy an H3 app to Vercel with zero configuration. Learn to configure streaming, middleware, cron jobs, the Bun runtime
- [Vercel Functions](https://vercel.com/docs/functions) — Build API routes, webhooks, and agent request handlers with Vercel Functions, then test and debug them with Vercel CLI.
- [Supported Frameworks on Vercel](https://vercel.com/docs/frameworks/more-frameworks) — Learn about the frameworks that can be deployed to Vercel.
- [Frontends on Vercel](https://vercel.com/docs/frameworks/frontend) — Vercel supports a wide range of the most popular frontend frameworks, optimizing how your application builds and runs no
- [Integrating Vercel and Kubernetes](https://vercel.com/docs/integrations/external-platforms/kubernetes) — Deploy your frontend on Vercel alongside your existing Kubernetes infrastructure.

Full cross-link map for this page: [/docs/frameworks/backend.graph.md](/docs/frameworks/backend.graph.md)
<!-- /docsgraph:related -->

#### Express

```ts filename="src/index.ts"
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

export default app;
```

#### Hono

```ts filename="src/index.ts"
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello from Hono!' });
});

export default app;
```

#### FastAPI

```py filename="main.py"
from fastapi import FastAPI

# Vercel detects this app instance when you deploy.
app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
```

Backends deployed to Vercel receive the benefits of Vercel's infrastructure, including:

- [Fluid compute](/docs/fluid-compute): Zero-configuration, optimized concurrency, dynamic scaling, background processing, automatic cold-start prevention, region failover, and more
- [Active CPU pricing](/docs/functions/usage-and-pricing): Only pay for the CPU you use, not waiting for I/O (e.g. calling AI models, database queries)
- [Instant Rollback](/docs/instant-rollback): Quickly revert to a previous production deployment
- [Vercel Firewall](/docs/vercel-firewall): A robust, multi-layered security system designed to protect your applications
- [Preview deployments with Deployment Protection](/docs/deployments/environments#preview-environment-pre-production): Secure your preview environments and test changes safely before production
- [Rolling releases](/docs/rolling-releases): Gradually roll out backends to detect errors early

## Zero-configuration backends

Use the [backends reference architecture](/kb/architecture/backends) to choose a runtime, connect your backend to a frontend and agent tools, and plan background jobs.

Deploy the following backends to Vercel with zero-configuration.

- **Elysia**: Ergonomic framework for humans
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/elysia)
- **Express**: Fast, unopinionated, minimalist web framework for Node.js
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/express) | [View Demo](https://express-vercel-example-demo.vercel.app/)
- **FastAPI**: FastAPI framework, high performance, easy to learn, fast to code, ready for production
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/fastapi) | [View Demo](https://vercel-fastapi-gamma-smoky.vercel.app/)
- **Fastify**: Fast and low overhead web framework, for Node.js
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/fastify)
- **Flask**: The Python micro web framework
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/flask)
- **H3**: Universal, Tiny, and Fast Servers
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/h3)
- **Hono**: Web framework built on Web Standards
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/hono) | [View Demo](https://hono.vercel.dev)
- **Koa**: Expressive middleware for Node.js using ES2017 async functions
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/koa)
- **NestJS**: Framework for building efficient, scalable Node.js server-side applications
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nestjs)
- **Nitro**: Nitro is a next generation server toolkit.
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nitro) | [View Demo](https://nitro-template.vercel.app)


To process background tasks with Python, you can deploy [Celery](/docs/frameworks/backend/celery) or [Dramatiq](/docs/frameworks/backend/dramatiq) workers as queue-triggered Vercel Functions.

## Adapting to Serverless and Fluid compute

If you are transitioning from a fully managed server or containerized environment to Vercel’s serverless architecture, you may need to rethink a few concepts in your application since there is no longer a server always running in the background.

For platform-specific migration steps, choose the guide for your application:

- **Python API**: Migrate from [Heroku](/kb/guide/migrate-a-python-api-from-heroku-to-vercel), [Render](/kb/guide/migrate-a-python-api-from-render-to-vercel), or [Railway](/kb/guide/migrate-a-python-api-from-railway-to-vercel).
- **Docker app**: Migrate from [Railway](/kb/guide/migrate-railway-to-vercel), [Fly.io](/kb/guide/migrate-fly-io-to-vercel), [Render](/kb/guide/migrate-render-to-vercel), [Google Cloud Run](/kb/guide/migrate-cloud-run-to-vercel), or [AWS](/kb/guide/migrate-containers-from-aws-to-vercel).

The following are generally applicable to serverless, and therefore Vercel Functions (running with or without Fluid compute).

### WebSockets

Vercel Functions can serve WebSocket connections when [Fluid compute](/docs/fluid-compute) is enabled. WebSocket connections follow [Vercel Function limits](/docs/functions/limitations), including maximum duration, so clients should handle reconnects when a connection closes.

Store persistent state, rooms, presence, and pub/sub coordination in an external data store instead of relying on in-memory state. Learn more in the [WebSockets documentation](/docs/functions/websockets).

### Database Connections

To manage database connections efficiently, [use the `attachDatabasePool` function from `@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package#database-connection-pool-management).

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
