---
title: Vercel Queues
product: vercel
url: /docs/queues
canonical_url: "https://vercel.com/docs/queues"
last_updated: 2026-06-17
type: conceptual
prerequisites:
  []
related:
  - /docs/workflows
  - /docs/queues/sdk
  - /docs/queues/concepts
  - /docs/queues/poll-mode
  - /docs/queues/observability
summary: Durable event streaming for serverless. Publish messages to topics and process them reliably with managed consumer groups, automatic scaling, and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c68b8763dfb3435b881969076e414ac41c0bf2c779c93458624051bf8e6c395c"
---

# Vercel Queues

> **🔒 Permissions Required**: Vercel Queues


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Astro on Vercel vs Webflow Cloud](https://vercel.com/kb/guide/astro-on-vercel-vs-webflow-cloud?from=related) — Compare running Astro on Vercel Functions with Fluid compute against Webflow Cloud on Cloudflare Workers. Learn how Astr
- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel?from=related) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel?from=related) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [Framework Integrations](https://workflow-sdk.dev/docs/how-it-works/framework-integrations?from=related) — Build a custom framework integration using the Workflow SDK compiler and runtime.
- [Celery](https://vercel.com/docs/frameworks/backend/celery?from=related) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Build Queues](https://vercel.com/docs/builds/build-queues?from=related) — Understand how concurrency and same branch build queues manage multiple simultaneous deployments.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Backends](https://vercel.com/docs/frameworks/backend?from=related) — Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no
- [Request Lifecycle](https://vercel.com/docs/fundamentals/infrastructure?from=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.

Full cross-link map for this page: [/docs/queues.graph.md](/docs/queues.graph.md)
<!-- /docsgraph:related -->

Vercel Queues is a durable event streaming system built for serverless applications. You publish messages to topics, and independent consumer groups process them in parallel with automatic retries, sharding, and delivery guarantees.

Each topic is a durable, append-only log that retains messages until they expire. Messages fan out to every consumer group subscribed to the topic, and new consumer groups can join at any time to replay non-expired history.

Vercel Queues is useful when you need to:

- **Defer expensive work**: Offload tasks like sending emails, generating PDFs, or calling external APIs so your response returns fast.
- **Absorb traffic spikes**: Buffer incoming requests and process them at a controlled rate.
- **Guarantee delivery**: Make sure work completes even if a function crashes or a deployment rolls out.
- **Schedule tasks**: Delay message delivery by up to the retention period.
- **Deduplicate messages**: Use idempotency keys to prevent duplicate processing.
- **Isolate consumers**: Process the same messages in multiple independent pipelines without interference.

Vercel Queues is the lower-level primitive that powers [Vercel Workflows](/docs/workflows). Workflows provides a higher-level SDK with durable steps, sleep, and hooks that makes building multi-step applications more ergonomic. If you need direct control over message publishing, consumption, and routing, use the [Queues SDK](/docs/queues/sdk) directly. If you're building stateful multi-step workflows, start with [Workflows](/docs/workflows).

## Features

- [**Durable delivery**](/docs/queues/concepts): Persist messages with retries and visibility timeouts for reliable processing.
- [**Fan-out consumers**](/docs/queues/concepts): Send one message stream to multiple independent consumer groups without coordination.
- [**Push and poll modes**](/docs/queues/poll-mode): Process on Vercel with push callbacks or run your own workers.
- [**Automatic scaling**](/docs/queues/concepts): Scale producers and consumers without managing partitions or throughput capacity.
- [**SDK and API**](/docs/queues/sdk): Publish and consume with the SDK or HTTP API.
- [**Observability**](/docs/queues/observability): Monitor queue throughput, message age, and consumer performance.

## Resources

**Quickstart**: Set up your first producer and consumer. [Learn more →](/docs/queues/quickstart)

**Concepts**: Learn delivery, retries, durability, and deployment behavior. [Learn more →](/docs/queues/concepts)

**API reference**: Review Queue HTTP endpoints and request/response details. [Learn more →](/docs/queues/api)

**JS SDK Reference**: Publish, consume, and manage messages with @vercel/queue. [Learn more →](/docs/queues/sdk)

**Python SDK Reference**: Publish, consume, and manage messages with vercel-queue. [Learn more →](/docs/queues/python-sdk)

**Poll mode**: Consume messages on your own schedule from any environment. [Learn more →](/docs/queues/poll-mode)

**Observability**: Monitor queue throughput, message age, and consumer performance. [Learn more →](/docs/queues/observability)

**Pricing and limits**: Understand operation billing and service limits. [Learn more →](/docs/queues/pricing)

**Vercel Workflows**: Build durable multi-step workflows on top of Queues. [Learn more →](/docs/workflows)


---

[View full sitemap](/docs/sitemap)
