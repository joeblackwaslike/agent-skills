---
title: Daemons
product: vercel
url: /docs/daemons
canonical_url: "https://vercel.com/docs/daemons"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/fluid-compute
  - /docs/daemons/limits
  - /docs/queues/poll-mode
  - /docs/functions
  - /docs/workflows
summary: Run long-running background workers, such as queue consumers and workflow workers, next to your app with Vercel Daemons.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/daemons.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "82badb1090308f34c4f23eb5669d3ef10317d2158b90a774deafddb0a247aab0"
---

# Daemons

> **Availability**: Daemons (Public Beta) are available on all plans

Vercel Daemons run long-running background processes from container images, such as queue consumers, workflow workers, and job runners. Each daemon pulls work from a queue, workflow engine, or external API and processes it continuously.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons) — Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns,
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Backends on Vercel: Python, containers, and Daemons](https://vercel.com/blog/backends-on-vercel-python-containers-and-daemons)
- [How to choose between Functions, containers, and Daemons on Vercel](https://vercel.com/kb/guide/vercel-functions-containers-daemons) — Choose Vercel Functions for HTTP requests, container images for custom runtimes, and Daemons for continuous background w
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Deploy Go apps on Vercel using Docker](https://vercel.com/kb/guide/deploy-go-using-docker-vercel) — Deploy an existing Dockerized Go app to Vercel using Memos as a real-world example, with Neon Postgres for durable data.
- [Run background tasks with Celery on Vercel](https://vercel.com/docs/frameworks/backend/celery) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Build Output Configuration](https://vercel.com/docs/build-output-api/configuration) — Learn about the Build Output Configuration file, which is used to configure the behavior of a Deployment.
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/daemons.graph.md](/docs/daemons.graph.md)
<!-- /docsgraph:related -->

Vercel keeps your configured number of instances running in each region and restarts instances that exit or crash. Daemons run on [Fluid compute](/docs/fluid-compute), the same compute platform as Vercel Functions.

Daemons are available on all plans, including Hobby, within each plan's quotas. The Hobby quota counts Active CPU, so a daemon that is mostly waiting for work uses less of it. See [Default quotas](/docs/daemons/limits#default-quotas).

## When to use daemons

Use a daemon when your process owns a continuous loop to retrieve work. Common examples include:

- **Queue consumers** that poll [Vercel Queues](/docs/queues/poll-mode), Amazon SQS, Kafka, or Redis, including workers for Celery, Sidekiq, and BullMQ.
- **Workflow workers** that retrieve tasks from a workflow engine.
- **Job runners**, such as self-hosted CI runners that wait for jobs.

Daemons complement other primitives, such as [Vercel Functions](/docs/functions) to serve HTTP traffic, [Vercel Workflows](/docs/workflows) for durable execution, and [Vercel Queues](/docs/queues) for serverless message processing with preview deployment support. Use [Cron Jobs](/docs/cron-jobs) to run code on a schedule, [Vercel Sandbox](/docs/sandbox) to run untrusted code in isolation, and [Services](/docs/services) to define multiple apps in a single project.

## How daemons work

A daemon is a named resource in your project that runs one or more instances of the same workload. Each instance is an identical, interchangeable copy of the process:

1. **Build**: During the build, Vercel builds each daemon's `Dockerfile` or `Containerfile` and pushes the image to [Vercel Container Registry](/docs/container-registry) as a repository named `daemon.<name>`.
2. **Deploy**: When a deployment becomes your production deployment, including after a [promotion](/docs/deployments/promoting-a-deployment) or [rollback](/docs/instant-rollback), Vercel rolls out its configured daemons in each region while gracefully terminating instances from the previous deployment.
3. **Run**: Your daemon runs continuously. Vercel forwards each instance's `stdout` and `stderr` output to your project's [Logs](/docs/logs/runtime) in the dashboard.
4. **Retry**: Vercel maintains the requested instance counts and restarts instances that exit or crash.
5. **Scale**: You can override a daemon's instance counts without a new deployment. Overrides stay in place across deployments until you clear them. See [Scaling a daemon](/docs/daemons/managing-daemons#scaling-a-daemon).
6. **Stop**: When it's time to stop your process, such as during a rollout or a manual restart, Vercel sends a `SIGTERM` signal. Your process has time to clean up resources before Vercel terminates it. See [Graceful shutdown](#graceful-shutdown).

> **💡 Note:** During the beta phase, daemons only run in production environments. Daemons
> in preview deployments are not supported.

## Quick start

Package a long-running Node.js process as a daemon and deploy two instances to `iad1` (Washington, D.C., USA).

Daemons use Dockerfile syntax to package code. In your worker's source directory, add a `Dockerfile` that builds a runnable version of your application:

```docker filename="worker/Dockerfile"
FROM node:24-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "worker.js"]
```

Then, declare a daemon using the `daemons` key in your project configuration:

#### vercel.json

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

#### vercel.toml

```toml filename="vercel.toml"
[daemons.worker]
root = "worker/"
entrypoint = "Dockerfile"
instances = { iad1 = 2 }
```

Deploy your project to production. Vercel will roll out two instances of `worker` to `iad1`, and their output will appear in your project's [Logs](/docs/logs/runtime).

## Attach daemons to an existing app

Daemons run alongside your existing app without changing how Vercel builds it. For example, you can use [Services](/docs/services) to run a Next.js frontend alongside a FastAPI Python backend, then add BullMQ and Celery workers to consume work from each app.

Define a `Dockerfile` for each worker in `workers/bullmq-worker/` and `workers/celery-worker/`, then add both daemons under the top-level `daemons` key in your project configuration:

#### vercel.json

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "web": { "root": "web/" },
    "api": { "root": "api/", "entrypoint": "main:app" }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "api" } },
    { "source": "/(.*)", "destination": { "service": "web" } }
  ],
  "daemons": {
    "bullmq-worker": {
      "root": "workers/bullmq-worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 }
    },
    "celery-worker": {
      "root": "workers/celery-worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 }
    }
  }
}
```

#### vercel.toml

```toml filename="vercel.toml"
[services.web]
root = "web/"

[services.api]
root = "api/"
entrypoint = "main:app"

[[rewrites]]
source = "/api/(.*)"
destination = { service = "api" }

[[rewrites]]
source = "/(.*)"
destination = { service = "web" }

[daemons.bullmq-worker]
root = "workers/bullmq-worker/"
entrypoint = "Dockerfile"
instances = { iad1 = 1 }

[daemons.celery-worker]
root = "workers/celery-worker/"
entrypoint = "Dockerfile"
instances = { iad1 = 1 }
```

See the [Daemon configuration reference](/docs/daemons/config-reference) for every field.

## Graceful shutdown

As a new version of your daemon rolls out, Vercel stops instances from the previous version. To let your process finish current tasks and clean up resources, Vercel sends a `SIGTERM` signal. Stop accepting new work immediately and start draining resources. By default, Vercel waits 10 seconds after sending `SIGTERM`, then terminates the process if it's still running. The same shutdown sequence applies when you reduce instance counts or remove a daemon.

To change how long Vercel waits, set [`terminationGracePeriodSeconds`](/docs/daemons/config-reference#terminationgraceperiodseconds) on the daemon. The value is an integer number of seconds from `0` to `3600`:

#### vercel.json

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "terminationGracePeriodSeconds": 50
    }
  }
}
```

#### vercel.toml

```toml filename="vercel.toml"
[daemons.worker]
root = "worker/"
entrypoint = "Dockerfile"
instances = { iad1 = 1 }
terminationGracePeriodSeconds = 50
```

An instance can stop at any time, so make jobs idempotent and interrupted jobs safe to retry. An idempotent job produces the same result if it runs more than once. For example, acknowledge a queue message only after you finish processing it.

Handle `SIGTERM` to stop taking new work and finish the work in progress:

### Node.js (TypeScript)

```ts filename="worker/worker.ts"
const shutdown = new AbortController();

process.on('SIGTERM', () => shutdown.abort());

async function processNextJob(signal: AbortSignal): Promise<void> {
  // Wait for one unit of work, for example with a long-polling queue
  // receive that stops when `signal` aborts, then process it. Back off
  // when there's no work so the loop doesn't spin.
}

async function main(): Promise<void> {
  while (!shutdown.signal.aborted) {
    await processNextJob(shutdown.signal);
  }
  process.exit(0);
}

void main();
```

### Python

```python filename="worker/worker.py"
import signal
from threading import Event

shutdown = Event()

signal.signal(signal.SIGTERM, lambda signum, frame: shutdown.set())


def process_next_job(shutdown: Event) -> None:
    # Replace this wait with a bounded queue poll, then process the job.
    # Finish processing before returning, even if shutdown is requested.
    shutdown.wait(timeout=1)


while not shutdown.is_set():
    process_next_job(shutdown)

# Close queue connections and other resources before exiting.
```

## Environment variables and OIDC

Each instance receives your deployment's [environment variables](/docs/environment-variables). Vercel passes the same variables to the image build as build arguments.

Each instance receives an [OIDC token](/docs/oidc) to authenticate with other services. Vercel writes the token to a file, sets `VERCEL_OIDC_TOKEN_FILE` to its path, and refreshes the token periodically. To read the token, use [`@vercel/oidc`](/docs/oidc/reference) 4.0.0 or later for Node.js, or `vercel-oidc` 0.10.0 or later for Python.

## Local development

`vercel dev` currently doesn't run daemons. When your configuration contains `daemons`, `vercel dev` prints a warning and starts the rest of your project. Run your daemon locally with Docker:

```bash filename="Terminal"
docker build -t worker worker/
docker run --env-file .env.local worker
```

Use `vercel env pull` to download your project's development environment variables into `.env.local`.

## FAQ

### What does the Daemons beta support?

During the beta, daemons run in production deployments with manually configured instance counts and ephemeral storage. You can scale daemons from the Vercel dashboard.

Preview deployments, autoscaling, and persistent storage aren't supported. See [Daemons limits](/docs/daemons/limits) for all limits and available alternatives.

### How do I update a daemon's image, command, or environment variables?

The container image, command, and environment variables are part of the deployment. To change them, create a new production deployment. The `command` field replaces the image's `ENTRYPOINT` and `CMD`. See [Managing daemons](/docs/daemons/managing-daemons).

### How do I change the number of instances?

Deploy new `instances` counts or set a scaling override without a new deployment. Overrides stay in place across deployments until you clear them. See [Scaling a daemon](/docs/daemons/managing-daemons#scaling-a-daemon).

### Does a daemon use my Hobby quota while it waits for work?

The Hobby quota counts Active CPU, the CPU time your code spends executing, not uptime. Time spent waiting, such as long polling an empty queue, doesn't count, so a daemon that is mostly waiting for work will use less of your monthly quota. Some work that looks like waiting still uses CPU: for example, HTTPS requests require cipher operations such as encryption, decryption, and signing, which consume Active CPU. See [Default quotas](/docs/daemons/limits#default-quotas) for each plan's quota and what happens when you reach it.

## Learn more

- [Managing daemons](/docs/daemons/managing-daemons): Scale, stop, and monitor daemons.
- [Daemon configuration reference](/docs/daemons/config-reference): Every field you can set on a daemon.
- [Daemons limits](/docs/daemons/limits): Limits that apply to daemons during the beta.
- [Poll mode](/docs/queues/poll-mode): Consume Vercel Queues messages from a daemon.
- [Build Output API daemons](/docs/build-output-api/daemons): How daemons appear in the Build Output API.


---

[View full sitemap](/docs/sitemap)
