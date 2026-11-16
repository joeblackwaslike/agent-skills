---
title: Background Workers on Vercel
product: vercel
url: /docs/background-workers
canonical_url: "https://vercel.com/docs/background-workers"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/daemons
  - /docs/queues
  - /docs/workflows
  - /docs/cron-jobs
  - /docs/functions/functions-api-reference/vercel-functions-package
summary: Run background jobs on Vercel, from continuous workers with Daemons to queued tasks, scheduled jobs, and durable workflows. Choose an approach for...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/background-workers.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3ee96024589f5382ff1daef41c82ff3fa21ec8c09ccb3f47ae5c639f17adeb50"
---

# Background Workers on Vercel

## Run background workers on Vercel

Send emails, process uploads, consume queues, and run durable AI agents in the background. Choose a continuous worker, a queued job, a scheduled task, or a durable workflow for each workload.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to choose between Functions, containers, and Daemons on Vercel](https://vercel.com/kb/guide/vercel-functions-containers-daemons) — Choose Vercel Functions for HTTP requests, container images for custom runtimes, and Daemons for continuous background w
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Backends on Vercel: Python, containers, and Daemons](https://vercel.com/blog/backends-on-vercel-python-containers-and-daemons)
- [How to handle order-ahead traffic spikes on Vercel](https://vercel.com/kb/guide/handle-order-ahead-traffic-spikes-on-vercel) — Order-ahead traffic spikes hit the same routes every lunch hour. Learn how to scale, cache, queue, and test a restaurant
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Run Docker on Vercel for HTTP apps and background workers, store images in Vercel Container Registry, and test container
- [Run background tasks with Celery on Vercel](https://vercel.com/docs/frameworks/backend/celery) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.
- [Backends on Vercel](https://vercel.com/docs/frameworks/backend) — Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no
- [Vercel Functions](https://vercel.com/docs/functions) — Build API routes, webhooks, and agent request handlers with Vercel Functions, then test and debug them with Vercel CLI.
- [Cron Jobs](https://vercel.com/docs/schedules/cron-jobs) — Learn about cron jobs, how they work, and how to use them on Vercel.

Full cross-link map for this page: [/docs/background-workers.graph.md](/docs/background-workers.graph.md)
<!-- /docsgraph:related -->

#### Run a worker

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 2 }
    }
  }
}
```

#### Queue a job

```typescript filename="app/api/uploads/route.ts"
import { send } from '@vercel/queue';

export async function POST(request: Request) {
  const upload = await request.json();

  // Return now. A consumer processes the upload later.
  const { messageId } = await send('uploads', upload);

  return Response.json({ messageId });
}
```

#### Run a workflow

```typescript filename="app/workflows/fulfill-order.ts"
import { sleep } from 'workflow';

export async function fulfillOrder(orderId: string) {
  'use workflow';

  await chargePayment(orderId);

  await sleep('3 days');
  await sendFollowUp(orderId);
}
```

[Vercel Daemons](/docs/daemons) run workers such as Celery, BullMQ, and Sidekiq alongside your application. Functions, Cron Jobs, Queues, Workflows, and Sandbox support other ways to start and execute background work.

Each example above needs more setup to run. The daemon needs a `Dockerfile` in `worker/`, the queue needs a consumer for the `uploads` topic, and the workflow needs the step functions it calls. See [Get started](#get-started) for the full setup.

## Choose an approach

Choose based on what starts the job, whether it needs a continuously running process, and how it should recover from interruptions.

| Workload | Use | Example |
| --- | --- | --- |
| A worker that continuously retrieves jobs | [Vercel Daemons](/docs/daemons) | Run a Celery worker, BullMQ consumer, or video processing worker with `ffmpeg`. |
| Event-driven jobs with retries | [Vercel Queues](/docs/queues) | Process an uploaded document after the request returns. Use Functions for push delivery or Daemons for polling. |
| Multiple steps, checkpoints, or waits | [Vercel Workflows](/docs/workflows) | Fulfill an order, wait for an external event, then send a follow-up. |
| Jobs on a recurring schedule | [Cron Jobs](/docs/cron-jobs) | Start a nightly data sync or publish a daily batch of queue messages. |
| Short tasks after an HTTP response | [Vercel Functions](/docs/functions/functions-api-reference/vercel-functions-package#waituntil) | Send analytics or update a cache with `waitUntil`, or use `after()` in Next.js. |
| Isolated execution of untrusted code | [Vercel Sandbox](/docs/sandbox) | Run an agent-generated script in a separate environment. |

These services work together. A cron job can start a workflow, a Function can publish to a queue, and a daemon can consume queued work and run code in a sandbox.

## Run continuous workers with Daemons

Use [Vercel Daemons](/docs/daemons) for a process that stays running and pulls work from a queue, workflow engine, or external API. Package your worker and its dependencies in a container using a `Dockerfile`, then configure its regions and instance counts in your project.

Daemons support workers for Celery, BullMQ, and Sidekiq, as well as custom consumers for Vercel Queues, Amazon SQS, Kafka, or Redis. You can keep your worker framework and connect it to its existing broker. Vercel manages the worker process; your broker or queue manages job delivery.

Vercel restarts daemon instances that exit or crash and forwards their output to [runtime logs](/docs/logs/runtime). During deployments and shutdowns, handle `SIGTERM` so your worker can finish or release its current job. Store durable state in your queue, a database, or object storage so another instance can resume the work.

During the beta, daemons run in production with manually configured instance counts and ephemeral local storage. Review [Daemons limits](/docs/daemons/limits) for supported configurations, quotas, and deployment restrictions, then follow the [Daemons quickstart](/docs/daemons#quick-start).

## Combine workers with your application

Deploy a worker alongside the frontend or backend that creates its jobs. For example, a video application can use this flow:

1. The browser [uploads a video directly to Blob](/docs/vercel-blob/client-upload), then a Function publishes a job containing the file's location.
2. A daemon retrieves the job, processes the video with `ffmpeg`, and stores the output in [Vercel Blob](/docs/vercel-blob).
3. The worker updates the job's status in a database so the frontend can display the result.

Use [Services](/docs/services) when your project contains multiple applications, such as a Next.js frontend and a Python API. See [Attach daemons to an existing app](/docs/daemons#attach-daemons-to-an-existing-app) for project configuration.

For jobs with several steps or long waits, use Workflows to persist progress between steps. For queue consumers, make repeated delivery safe: use an idempotency key or a stored job result to avoid repeating an external action. See [Queues delivery semantics](/docs/queues/concepts) and [Workflow concepts](/docs/workflows/concepts).

## Frequently asked questions

### Can I run background workers on Vercel?

Yes. Vercel supports continuous workers with Daemons, event-driven jobs with Queues, scheduled jobs with Cron Jobs, and durable multi-step tasks with Workflows. For a short task that continues after an HTTP response, use `waitUntil` in a Function or `after()` in Next.js.

### Can I run an always-on process on Vercel?

Yes. [Vercel Daemons](/docs/daemons) keep your configured worker instances running and restart them if they exit or crash. Daemons pull work through outbound connections. Use Functions or Services for inbound application requests. Instances can restart during deployments, so persist job state outside the process and handle shutdown gracefully.

### Can I deploy Celery, BullMQ, or Sidekiq workers to Vercel?

Yes. Package your Celery, BullMQ, or Sidekiq worker in a container and deploy it as a daemon. Connect it to the broker your framework requires, such as Redis or RabbitMQ. The [background workers guide](/kb/guide/background-workers-on-vercel) includes worker examples and links to migration guides.

### How long can a background job run on Vercel?

It depends on how you run it. Work in a Function, including `waitUntil`, shares the function's [maximum duration](/docs/functions/configuring-functions/duration). Daemons run continuously instead of using a per-request invocation, subject to their [quotas and lifecycle](/docs/daemons/limits). Workflows can persist progress across invocations and wait for external events. Design long jobs to recover from interruptions.

### Should I use Vercel Queues or Daemons for background jobs?

You can use both. Queues stores and delivers messages; a daemon can poll Queues and process them. Use Queues push delivery when a Function can handle each job within its duration limit. Use a daemon when you need a continuous consumer, a worker framework, or dependencies packaged in a container. See [Queues poll mode](/docs/queues/poll-mode).

### How do I run a background task in Next.js on Vercel?

Use [`after()`](/docs/functions/functions-api-reference/vercel-functions-package#usage-with-next.js) for work that runs after a response and fits within the function's duration. For work that needs retries or must survive an interrupted request, publish a queue message or start a workflow. Use a daemon for a separate, continuously running worker alongside your Next.js application.

### Can I schedule background jobs on Vercel?

Yes. [Cron Jobs](/docs/cron-jobs) call an endpoint in your production deployment on a schedule. That endpoint can perform a task within the function's duration, enqueue work, or start a workflow. Use a workflow when the job needs multiple steps or must wait before continuing.

### Can I run AI agents in the background on Vercel?

Yes. Use [Workflows](/docs/workflows) for agents that preserve progress and resume after interruptions or human input. Use a daemon to poll for work or process jobs for a hosted agent, and Sandbox for isolated code execution. See [Use Vercel Daemons with eve agents](/kb/guide/vercel-daemons-eve-agents) for examples that combine workers and durable agent sessions.

## Get started

- [Deploy a daemon](/docs/daemons#quick-start) for a continuous background worker.
- [Publish and process a queue message](/docs/queues/quickstart) for event-driven jobs.
- [Create a workflow](/docs/workflows#getting-started) for durable multi-step work.
- [Configure a cron job](/docs/cron-jobs/quickstart) for recurring tasks.
- [Follow the background workers guide](/kb/guide/background-workers-on-vercel) for detailed examples, failure handling, and migrations from other platforms.

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
