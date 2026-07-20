---
title: Deploy a Celery app on Vercel
product: vercel
url: /docs/frameworks/backend/celery
canonical_url: "https://vercel.com/docs/frameworks/backend/celery"
last_updated: 2026-07-14
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/cli/deploy
  - /docs/queues/concepts
  - /docs/caching/runtime-cache
  - /docs/functions
  - /docs/functions/limitations
summary: Deploy a Celery app on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to process background tasks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/celery.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "8c78527a3d9c624fc0f7a550ddf37cff7e72b854378b8d788f3bd2381163da10"
---

# Deploy a Celery app on Vercel

> **🔒 Permissions Required**: Vercel Queues

Deploy a Celery app to Vercel with the Python runtime, Vercel Queues, and Vercel
Functions. Vercel builds each Celery worker as a private, queue-triggered
Vercel Function, so you don't need to run a long-lived worker process.

## Create or import your app

Create a Celery app or use an existing one:

## Configure the Celery application

Celery projects on Vercel must declare their dependencies in `pyproject.toml`

```toml filename="pyproject.toml"
[project]
name = "celery-on-vercel"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
  "celery>=5.3.0",
  "fastapi",
]
```

This example uses FastAPI to enqueue tasks. You can use any supported Python web
framework for the producer.

### Define the Celery application

Create a Celery application and set its default queue:

```py filename="tasks.py"
import os

from celery import Celery

QUEUE_NAME = "celery"

app = Celery(
    "celery-on-vercel",
    broker=os.getenv("CELERY_BROKER_URL", "vercel://"),
)
app.conf.task_default_queue = QUEUE_NAME

@app.task
def add(x: int, y: int) -> int:
    return x + y
```

The `vercel://` broker sends Celery tasks to Vercel Queues. Vercel sets
`CELERY_BROKER_URL` to `vercel://` automatically during local development and
after deployment unless you set the environment variable yourself.

### Export the Celery worker

Export the Celery application from a worker entrypoint. Importing `tasks`
registers its tasks on the application:

```py filename="worker.py"
from tasks import app

__all__ = ["app"]
```

Add the web entrypoint and Celery worker to `pyproject.toml`:

```toml filename="pyproject.toml"
[tool.vercel]
entrypoint = "main:app"

[[tool.vercel.subscribers]]
entrypoint = "worker:app"
topics = ["celery"]
```

The subscriber `entrypoint` uses the `module:object` format. The `topics` value
must match the Celery queue name in `tasks.py`.

Vercel builds `main:app` as the public web application and `worker:app` as a
private Vercel Function. Only Vercel Queues can invoke the worker function.

### Send tasks

Import a task into your web application and call `delay` as you would in any
Celery application:

```py filename="main.py"
from fastapi import FastAPI

from tasks import add

app = FastAPI()

@app.post("/tasks")
def enqueue_task(x: int, y: int):
    task = add.delay(x, y)
    return {"taskId": task.id}
```

Each call to `delay` publishes a message to the `celery` topic. Vercel Queues
then invokes the subscriber function to run the task.

### Local development

Use `vercel dev` to run the web application and Celery subscriber locally:

```bash filename="terminal"
vercel dev
```

`vercel dev` starts both your web application and Celery worker locally. You
don't need to run `celery worker` in another terminal.

> **💡 Note:** Minimum CLI version required: 56.1.0

### Deploying the application

Deploy the project by connecting your Git repository or by using the [Vercel
CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 56.1.0

Vercel installs the Celery adapter during the build and provides Queue
authentication to the deployed functions. You don't need to provision Redis,
RabbitMQ, or separate queue credentials.

## Vercel Functions

When your web function calls `delay` or `apply_async`, the Vercel broker
transport publishes the task to the configured topic. Vercel Queues invokes the
private subscriber function, which runs the task and acknowledges the message
after it succeeds.

If the function raises an exception or times out, Vercel Queues makes the
message available for another delivery. Queues provides
[at-least-once delivery](/docs/queues/concepts#at-least-once-delivery), so tasks
should be idempotent.

To control the retry delay or limit concurrent task executions, add options to
the subscriber:

```toml filename="pyproject.toml"
[[tool.vercel.subscribers]]
entrypoint = "worker:app"
topics = ["celery"]
retry_after_seconds = 60
max_concurrency = 10
```

See [Queues concepts](/docs/queues/concepts) for details about retries,
visibility timeouts, concurrency, and message retention.

> **💡 Note:** Vercel Queues acts as the Celery broker, not a Celery result backend. Store
> task results in a database or use [Runtime
> Cache](/docs/caching/runtime-cache) for temporary state.

## Limitations

Celery tasks run inside [Vercel Functions](/docs/functions), so all [Vercel
Functions limitations](/docs/functions/limitations) apply, including maximum
duration and bundle size.

- **Task arguments**: Arguments must be JSON-serializable. Vercel Queues
  supports messages up to [100 MB](/docs/queues/pricing#limits).
- **Long-running processes**: Vercel uses queue-triggered functions instead of a
  persistent `celery worker` process. Worker control commands and features that
  require persistent process state aren't available.
- **Periodic tasks**: `celery beat` requires a long-running process. Use [Vercel
  Cron Jobs](/docs/cron-jobs) to call a route that enqueues Celery tasks.

## More resources

For more about deploying Celery on Vercel, see:

- [Celery official documentation](https://docs.celeryq.dev/)
- [Vercel Queues documentation](/docs/queues)
- [Vercel Functions documentation](/docs/functions)
- [Python runtime documentation](/docs/functions/runtimes/python)


---

[View full sitemap](/docs/sitemap)
