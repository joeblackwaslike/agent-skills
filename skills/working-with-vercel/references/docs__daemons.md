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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "52c5610622861f0e14d74e892c07c1060e8c3f9cf592ed0c0700467ad63545cb"
---

# Daemons

> Daemons are available in Public Beta on all plans

Vercel Daemons run long-running background processes from container images, such as queue consumers, workflow workers, and job runners. Each daemon pulls work from a queue, workflow engine, or external API and processes it continuously.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Add liveness checks to your Daemons](https://vercel.com/changelog/add-liveness-checks-to-your-daemons)
- [Vercel Daemons can now call services with bindings](https://vercel.com/changelog/vercel-daemons-can-now-call-services-with-bindings)
- [Capture AI SDK token usage, tool calls, and cost with evlog](https://vercel.com/kb/guide/ai-sdk-and-evlog) — Record AI SDK usage with evlog, add cost estimates and request context, and investigate expensive or failed requests.
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Run Docker on Vercel for HTTP apps and background workers, store images in Vercel Container Registry, and test container
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Backends on Vercel: Python, containers, and Daemons](https://vercel.com/blog/backends-on-vercel-python-containers-and-daemons)
- [vercel daemons](https://vercel.com/docs/cli/daemons) — List and inspect production daemons, override regional instance counts, and inspect or restart individual instances with
- [Run background tasks with Celery on Vercel](https://vercel.com/docs/frameworks/backend/celery) — Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without
- [Running eve Agents Durably on Vercel](https://vercel.com/docs/agent-harnesses/eve) — eve agents are durable out of the box on Vercel, with no extra configuration.

Full cross-link map for this page: [/docs/daemons.graph.md](/docs/daemons.graph.md)
<!-- /docsgraph:related -->

Vercel keeps your configured number of instances running in each region and restarts instances that exit or crash. Daemons run on [Fluid compute](/docs/fluid-compute), the same compute platform as Vercel Functions.

Daemons are available on all plans, including Hobby, within each plan's quotas. Hobby has monthly quotas for Active CPU and Provisioned Memory. A daemon that is mostly waiting for work uses less Active CPU, but it uses Provisioned Memory for every hour it runs. See [Default quotas](/docs/daemons/limits#default-quotas).

## When to use daemons

Use a daemon when your process owns a continuous loop to retrieve work. Common examples include:

- **Queue consumers** that poll [Vercel Queues](/docs/queues/poll-mode), Amazon SQS, Kafka, or Redis, including workers for Celery, Sidekiq, and BullMQ.
- **Workflow workers** that retrieve tasks from a workflow engine.
- **Job runners**, such as self-hosted CI runners that wait for jobs.

Daemons complement other primitives, such as [Vercel Functions](/docs/functions) to serve HTTP traffic, [Vercel Workflows](/docs/workflows) for durable execution, and [Vercel Queues](/docs/queues) for serverless message processing with preview deployment support. Use [Cron Jobs](/docs/cron-jobs) to run code on a schedule, [Vercel Sandbox](/docs/sandbox) to run untrusted code in isolation, and [Services](/docs/services) to define multiple apps in a single project.

Compare [background worker options](/docs/background-workers) to choose between continuous processes, queued jobs, and durable workflows. For detailed examples and migrations, see [Running background workers on Vercel](/kb/guide/background-workers-on-vercel).

## How daemons work

A daemon is a named resource in your project that runs one or more instances of the same workload. Each instance is an identical, interchangeable copy of the process:

1. **Build**: During the build, Vercel builds each daemon's `Dockerfile` or `Containerfile` and pushes the image to [Vercel Container Registry](/docs/container-registry) as a repository named `daemon.<name>`.
2. **Deploy**: When a deployment becomes your production deployment, including after a [promotion](/docs/deployments/promoting-a-deployment) or [rollback](/docs/instant-rollback), Vercel rolls out its configured daemons in each region while gracefully terminating instances from the previous deployment.
3. **Run**: Your daemon runs continuously. Vercel forwards each instance's `stdout` and `stderr` output to your project's [Logs](/docs/logs/runtime) in the dashboard.
4. **Retry**: Vercel maintains the requested instance counts and restarts instances that exit, crash, or fail their [health checks](#health-checks-and-restarts).
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
#:schema https://openapi.vercel.sh/vercel.json
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
#:schema https://openapi.vercel.sh/vercel.json
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

## Health checks and restarts

By default, Vercel restarts an instance when its process exits or crashes. To also catch a process that is running but stuck, add a `livenessProbe` to the daemon. Vercel sends an HTTP `GET` request to the instance on a schedule and restarts it when enough consecutive checks fail.

First, serve a health endpoint from the same process as the work loop. The worker examples above don't start an HTTP server, so adding a probe to them unchanged would fail every check and restart the instance repeatedly:

```ts filename="worker/worker.ts"
import { createServer } from 'node:http';

createServer((req, res) => {
  res.statusCode = req.url === '/health' ? 200 : 404;
  res.end();
}).listen(1234);

// Start the work loop next to the server.
```

Then, point the `livenessProbe` at the endpoint's port and path:

#### vercel.json

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "livenessProbe": {
        "httpGet": { "port": 1234, "path": "/health" },
        "initialDelaySeconds": 5
      }
    }
  }
}
```

#### vercel.toml

```toml filename="vercel.toml"
#:schema https://openapi.vercel.sh/vercel.json
[daemons.worker]
root = "worker/"
entrypoint = "Dockerfile"
instances = { iad1 = 1 }
livenessProbe.httpGet = { port = 1234, path = "/health" }
livenessProbe.initialDelaySeconds = 5
```

A check succeeds on an HTTP status from `200` to `399`. Redirects are not followed, so a `3xx` response counts as a success. A check fails on a connection error, no response within `timeoutSeconds`, or any other status.

Checks run from inside the instance, starting `initialDelaySeconds` after the container starts and repeating every `periodSeconds`. Each instance is probed separately, and the schedule restarts from scratch after every restart. A changed `livenessProbe` applies only to instances started after it deploys.

Keep `timeoutSeconds` below `periodSeconds`, and make the endpoint cheap and based on whether the process can make progress rather than on downstream dependencies. See [`livenessProbe`](/docs/daemons/config-reference#livenessprobe) in the configuration reference for every field and default.

### Health states

Each instance is **pending** until its first check completes, **passing** while checks succeed, and **failing** after a failed check. A success resets the failure count, and `failureThreshold` consecutive failures trigger a restart.

### Restart policy

The same policy covers failed health checks, exits, and crashes:

- Liveness-triggered restarts send `SIGKILL` immediately and do not honor [`terminationGracePeriodSeconds`](#graceful-shutdown).
- Restarts use exponential backoff, waiting 1 second and doubling up to a cap of 5 minutes. A run of at least 5 minutes resets the backoff.
- After 10 minutes of runs each shorter than 5 minutes, Vercel stops restarting the instance and replaces it with a new one.

### Example timeline

With the configuration above and the remaining defaults (`periodSeconds` 10, `timeoutSeconds` 1, `failureThreshold` 3):

- **0s**: the container starts.
- **5s**: the first check returns `200`. Checks continue every 10 seconds.
- **~605s**: the app has hung, and the check times out after 1 second (1 of 3). The checks at 615s and 625s also fail.
- **~625s**: Vercel kills the container. The run lasted over 5 minutes, so it restarts 1 second later, and the first check runs 5 seconds after that.
- If every run keeps failing, restarts wait 2, 4, 8, 16 seconds, and so on. After 10 minutes of short runs, Vercel replaces the instance.

## Graceful shutdown

As a new version of your daemon rolls out, Vercel stops instances from the previous version. To let your process finish current tasks and clean up resources, Vercel sends a `SIGTERM` signal. Stop accepting new work immediately and start draining resources. By default, Vercel waits 30 seconds after sending `SIGTERM`, then terminates the process if it's still running. The same shutdown sequence applies when you reduce instance counts or remove a daemon.

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
#:schema https://openapi.vercel.sh/vercel.json
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

## Service bindings

A daemon can call the [services](/docs/services) in its project through [service bindings](/docs/services/bindings), without exposing those services to public traffic. Bindings always point to the deployment that started the instance. After a promotion or rollback, instances from the previous deployment keep calling that deployment's services until they stop.

Declare the bindings on the daemon:

#### vercel.json

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "api": { "root": "api/", "entrypoint": "main:app" }
  },
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "bindings": [
        { "type": "service", "service": "api", "format": "url", "env": "API_URL" }
      ]
    }
  }
}
```

#### vercel.toml

```toml filename="vercel.toml"
#:schema https://openapi.vercel.sh/vercel.json

[services.api]
root = "api/"
entrypoint = "main:app"

[daemons.worker]
root = "worker/"
entrypoint = "Dockerfile"
instances = { iad1 = 1 }

[[daemons.worker.bindings]]
type = "service"
service = "api"
format = "url"
env = "API_URL"
```

Each instance receives the service's URL in the binding's environment variable and calls it like any other HTTP endpoint:

```ts filename="worker/worker.ts"
await fetch(new URL('jobs/next', process.env.API_URL));
```

## Environment variables and OIDC

Each instance receives your deployment's [environment variables](/docs/environment-variables). Vercel passes the same variables to the image build as build arguments.

Vercel also sets the following environment variables on each instance:

| Variable | Description | Example |
| --- | --- | --- |
| `VERCEL_REGION` | The region the instance runs in. Vercel ignores a `VERCEL_REGION` that you define. | `iad1` |
| `VERCEL_OIDC_TOKEN_FILE` | The path of the file that holds the instance's [OIDC token](/docs/oidc). | `/var/run/secrets/vercel.com/token` |

Use the OIDC token to authenticate with other services. The token is valid for 30 minutes, and Vercel refreshes the file about every 5 minutes, so read the file each time you need a token. To read the token, use [`@vercel/oidc`](/docs/oidc/reference) 4.0.0 or later for Node.js, or `vercel-oidc` 0.10.0 or later for Python.

## Local development

`vercel dev` currently doesn't run daemons. When your configuration contains `daemons`, `vercel dev` prints a warning and starts the rest of your project. Run your daemon locally with Docker:

```bash filename="Terminal"
docker build -t worker worker/
docker run --env-file .env.local worker
```

Use `vercel env pull` to download your project's development environment variables into `.env.local`.

## FAQ

### What does the Daemons beta support?

During the beta, daemons run in production deployments with manually configured instance counts and ephemeral storage. You can scale daemons from the Vercel dashboard or the Vercel CLI.

Preview deployments, autoscaling, and persistent storage aren't supported. See [Daemons limits](/docs/daemons/limits) for all limits and available alternatives.

### How do I update a daemon's image, command, or environment variables?

The container image, command, and environment variables are part of the deployment. To change them, create a new production deployment. The `command` field replaces the image's `ENTRYPOINT` and `CMD`. See [Managing daemons](/docs/daemons/managing-daemons).

### How do I change the number of instances?

Deploy new `instances` counts or set a scaling override without a new deployment. Overrides stay in place across deployments until you clear them. See [Scaling a daemon](/docs/daemons/managing-daemons#scaling-a-daemon).

### Does a daemon use my Hobby quota while it waits for work?

It uses the Provisioned Memory quota, and it uses the Active CPU quota only while your code executes. The Active CPU quota counts the CPU time your code spends executing, not uptime. Time spent waiting, such as long polling an empty queue, doesn't count, so a daemon that is mostly waiting for work will use less of your monthly Active CPU quota. Some work that looks like waiting still uses CPU: for example, HTTPS requests require cipher operations such as encryption, decryption, and signing, which consume Active CPU. The Provisioned Memory quota counts the memory of each instance for every hour it runs. See [Default quotas](/docs/daemons/limits#default-quotas) for each plan's quota and what happens when you reach it.

### Can I build daemons with `vercel build` on my machine?

Yes. [Vercel CLI](/docs/cli) 65.6.0 or later builds daemons when you run `vercel build` locally.

## Guides and migrations

Follow these guides to deploy background workers or migrate them from another platform:

- [The complete guide to Vercel Daemons](/kb/guide/vercel-daemons)
- [Use Vercel Daemons with eve agents](/kb/guide/vercel-daemons-eve-agents)
- [Run a Python polling worker with Vercel Queues](/kb/guide/python-and-vercel-queues#run-a-polling-worker-on-vercel-daemons)
- [Migrate Railway workers to Vercel Daemons](/kb/guide/migrate-railway-workers-to-vercel-daemons)
- [Migrate Render background workers to Vercel Daemons](/kb/guide/migrate-render-workers-to-vercel-daemons)
- [Migrate Fly.io worker processes to Vercel Daemons](/kb/guide/migrate-fly-io-workers-to-vercel-daemons)

## Learn more

- [Chat SDK with Vercel Daemons](/docs/chat-sdk/integrations/daemons): Process queued chat jobs and reply using Vercel Connect credentials.
- [Managing daemons](/docs/daemons/managing-daemons): Scale, stop, and monitor daemons.
- [Daemon configuration reference](/docs/daemons/config-reference): Every field you can set on a daemon.
- [Daemons limits](/docs/daemons/limits): Limits that apply to daemons during the beta.
- [Poll mode](/docs/queues/poll-mode): Consume Vercel Queues messages from a daemon.
- [Build Output API daemons](/docs/build-output-api/daemons): How daemons appear in the Build Output API.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
