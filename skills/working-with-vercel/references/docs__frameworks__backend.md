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
source: "https://vercel.com/docs/frameworks/backend.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "18f97e63558801c13ff3032bea4944b4aa15fcdd5b8f0df3e7a5a090e21be646"
---

# Backends on Vercel

Backends deployed to Vercel receive the benefits of Vercel's infrastructure, including:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Efficiently manage database connection pools with Fluid compute](https://vercel.com/kb/guide/efficiently-manage-database-connection-pools-with-fluid-compute?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related) — How to create high-performance database connection pools without leaking connections
- [How to gradually roll out new versions of your backend](https://vercel.com/kb/guide/how-to-gradually-roll-out-new-versions-of-your-backend?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related) — Incrementally release updates to your backend to minimize impact of mistakes.
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [How to ship an H3 app on Vercel](https://vercel.com/kb/guide/ship-a-h3-app-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related) — Deploy an H3 app to Vercel with zero configuration. Learn to configure streaming, middleware, cron jobs, the Bun runtime
- [Hosting your API on Vercel](https://vercel.com/kb/guide/hosting-backend-apis?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related) — Learn how to build and scale performant APIs on Vercel.
- [Vercel Services: Run full stack on Vercel](https://vercel.com/blog/vercel-services-run-full-stack-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related)
- [Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related)
- [Building secure and performant web applications on Vercel](https://vercel.com/blog/building-secure-and-performant-web-applications-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related)
- [Understanding Vercel Functions](https://vercel.com/blog/understanding-vercel-functions?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related)
- [Zero-config backends on Vercel AI Cloud](https://vercel.com/blog/zero-config-backends-on-vercel-ai-cloud?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related)
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/frameworks/backend.graph.md](/docs/frameworks/backend.graph.md?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- [Fluid compute](/docs/fluid-compute): Zero-configuration, optimized concurrency, dynamic scaling, background processing, automatic cold-start prevention, region failover, and more
- [Active CPU pricing](/docs/functions/usage-and-pricing): Only pay for the CPU you use, not waiting for I/O (e.g. calling AI models, database queries)
- [Instant Rollback](/docs/instant-rollback): Quickly revert to a previous production deployment
- [Vercel Firewall](/docs/vercel-firewall): A robust, multi-layered security system designed to protect your applications
- [Preview deployments with Deployment Protection](/docs/deployments/environments#preview-environment-pre-production): Secure your preview environments and test changes safely before production
- [Rolling releases](/docs/rolling-releases): Gradually roll out backends to detect errors early

## Zero-configuration backends

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
- **xmcp**: The MCP framework for building AI-powered tools
  - [Deploy](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/xmcp) | [View Demo](https://xmcp-template.vercel.app/)


To process background tasks with Python, you can deploy [Celery](/docs/frameworks/backend/celery) or [Dramatiq](/docs/frameworks/backend/dramatiq) workers as queue-triggered Vercel Functions.

## Adapting to Serverless and Fluid compute

If you are transitioning from a fully managed server or containerized environment to Vercel’s serverless architecture, you may need to rethink a few concepts in your application since there is no longer a server always running in the background.

The following are generally applicable to serverless, and therefore Vercel Functions (running with or without Fluid compute).

### WebSockets

Vercel Functions can serve WebSocket connections when [Fluid compute](/docs/fluid-compute) is enabled. WebSocket connections follow [Vercel Function limits](/docs/functions/limitations), including maximum duration, so clients should handle reconnects when a connection closes.

Store persistent state, rooms, presence, and pub/sub coordination in an external data store instead of relying on in-memory state. Learn more in the [WebSockets documentation](/docs/functions/websockets).

### Database Connections

To manage database connections efficiently, [use the `attachDatabasePool` function from `@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package#database-connection-pool-management).


---

[View full sitemap](/docs/sitemap)
