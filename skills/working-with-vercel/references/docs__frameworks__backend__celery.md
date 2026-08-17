---
title: Run background tasks with Celery on Vercel
product: vercel
url: /docs/frameworks/backend/celery
canonical_url: "https://vercel.com/docs/frameworks/backend/celery"
last_updated: 2026-07-14
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/caching/runtime-cache
  - /docs/cli/deploy
  - /docs/queues/concepts
  - /docs/functions
  - /docs/functions/limitations
summary: Deploy Celery on Vercel. Learn how Celery workers use Vercel Queues and Vercel Functions to run background tasks without a long-lived worker process.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/celery.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "94de5b1a22258b5949d43d259d640606be193440cf438224f9758b5a435fcdf0"
---

# Run background tasks with Celery on Vercel

> **🔒 Permissions Required**: Vercel Queues


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Flask](https://vercel.com/docs/frameworks/backend/flask?from=related) — Deploy a Flask app on Vercel. Learn how the Python runtime, WSGI, static assets, and Vercel Functions work together.
- [Django](https://vercel.com/docs/frameworks/full-stack/django?from=related) — Deploy a Django app on Vercel. Learn how the Python runtime, WSGI, ASGI, static assets, and Vercel Functions work togeth
- [FastAPI](https://vercel.com/docs/frameworks/backend/fastapi?from=related) — Deploy a FastAPI app on Vercel. Learn how the Python runtime, ASGI, static assets, and Vercel Functions work together.
- [Quickstart](https://vercel.com/docs/queues/quickstart?from=related) — Set up Vercel Queues with the SDK.
- [Concepts](https://vercel.com/docs/queues/concepts?from=related) — Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.

Full cross-link map for this page: [/docs/frameworks/backend/celery.graph.md](/docs/frameworks/backend/celery.graph.md)
<!-- /docsgraph:related -->

Deploy Celery on Vercel with the Python runtime, Vercel Queues, and Vercel
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

```py filename="tasks.py"
from celery import Celery

app = Celery(
    "celery-on-vercel",
    broker="vercel://",
    backend="vercel-runtime-cache://",
)

@app.task
def add(x: int, y: int) -> int:
    return x + y
```

The `vercel://` broker sends Celery tasks to Vercel Queues, and
`vercel-runtime-cache://` stores task results in [Runtime
Cache](/docs/caching/runtime-cache). Vercel installs the Celery adapter during
the build and registers both, so you don't need to add `vercel-celery` to your
dependencies or provision broker credentials.

Set the broker and backend explicitly rather than relying on the adapter's
defaults. Your configuration stays visible in `tasks.py`, and the application
behaves the same way wherever you run it.

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
```

The subscriber `entrypoint` takes the `module:object` format or a bare module
path such as `worker`. During the build, Vercel imports the entrypoint, reads
every queue the Celery application declares, and compiles the subscriber into a
queue-triggered function. You don't need to configure `experimentalTriggers` in
`vercel.json`.

With no `topics` filter, the subscriber consumes every queue the application
declares. See [splitting queues across functions](#splitting-queues-across-functions)
to scope a subscriber to a subset of them.

Vercel builds `main:app` as the public web application and `worker:app` as a
private Vercel Function. Only Vercel Queues can invoke the worker function.

### Send tasks and retrieve results

Import a task into your web application and call `delay` as you would in any
Celery application. Use `AsyncResult` to retrieve its status and result:

```py filename="main.py"
from fastapi import FastAPI

from tasks import add, app as celery

app = FastAPI()

@app.post("/add")
def enqueue(x: int, y: int):
    return {"id": add.delay(x, y).id}

@app.get("/result/{task_id}")
def result(task_id: str):
    task = celery.AsyncResult(task_id)
    return {"status": task.status, "result": task.result}
```

Each call to `delay` publishes a message to the topic that matches the task's
Celery queue. Vercel Queues then invokes the subscriber function to run the
task. The result endpoint reads the task state and return value from the result
backend.

Import tasks from `tasks`, not from `worker`. The `worker.py` module exists only
as the subscriber entrypoint, so your web application never needs to import it.

### Local development

Use `vercel dev` to run the web application and Celery subscriber locally:

```bash filename="terminal"
vercel dev
```

`vercel dev` starts both your web application and Celery worker locally. You
don't need to run `celery worker` in another terminal.

> **💡 Note:** Minimum CLI version required: 58.9.0

### Deploying the application

Deploy the project by connecting your Git repository or by using the [Vercel
CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 58.9.0

Vercel provides Queue authentication to the deployed functions, so you don't
need to provision Redis, RabbitMQ, or separate queue credentials.

## Vercel Functions

When your web function calls `delay` or `apply_async`, the Vercel broker
transport publishes the task to the topic that matches its Celery queue. Vercel
Queues invokes the private subscriber function, which hands the delivery to an
in-process Celery worker and runs the task.

Named applications publish to app-prefixed topics. `Celery("celery-on-vercel")`
maps a Celery queue named `emails` to the Vercel Queue topic
`celery-celery-on-vercel-emails`. Applications with no name use unprefixed
topics. Set `queue_name_prefix` to change or remove the prefix. See [splitting
queues across functions](#splitting-queues-across-functions) for how the build
reads these names.

Each invocation runs one task at a time. Your throughput comes from Vercel
Queues invoking the subscriber function many times in parallel, not from worker
processes or a pool size. See [concurrency
control](/docs/queues/concepts#concurrency-control-push-mode).

### Broker transport options

Set `broker_transport_options` on the application to control naming and
delivery:

```py filename="tasks.py"
app.conf.broker_transport_options = {
    "consumer_group": "workers",
    "lease_duration": 300,
    "requeue_delay_seconds": 60,
}
```

| Option                           | Type     | Default              | Description                                                          |
| -------------------------------- | -------- | -------------------- | -------------------------------------------------------------------- |
| `consumer_group`                 | `str`    | `celery`             | Consumer group used for subscriptions and polling                    |
| `queue_name_prefix`              | `str`    | `celery-<app name>-` | Prefix applied to Celery queue names before topic sanitization       |
| `retention`                      | duration | Service default      | Retention applied to published messages                              |
| `delay`                          | duration | No delay             | Delay applied to every message this application publishes            |
| `lease_duration`                 | duration | Service default      | Processing timeout for received messages                             |
| `requeue_delay_seconds`          | `int`    | Zero seconds         | Visibility delay used when Celery requeues a message                 |
| `push_retry_delay_seconds`       | `int`    | One second           | Visibility delay used when a push delivery finds no free worker slot |
| `push_handoff_wait_seconds`      | `float`  | 30 seconds           | Maximum request-time wait for worker readiness and settlement        |
| `use_task_id_as_idempotency_key` | `bool`   | `False`              | Publish the Celery task ID as the Queues idempotency key             |

The transport also accepts `token`, `region`, `base_url`, `deployment`,
`timeout`, and `headers`, and forwards them to the underlying queue client.

Workers that share a topic and a consumer group compete for tasks. Workers that
share a topic with different consumer groups each receive a copy of every task.
Set `queue_name_prefix` when other producers in the project publish to topics
with the same names as your Celery queues.

## Retries and redelivery

Celery acknowledges each delivery, not Vercel Queues. With Celery's default
`task_acks_late = False`, the worker acknowledges a message as soon as it accepts
the task, before running it. A task that raises is never redelivered, and neither
is one whose function times out while the task is still running.

Set `task_acks_late = True` to acknowledge after the task finishes:

```py filename="tasks.py"
app.conf.task_acks_late = True
```

The message then survives a function timeout or crash. Its processing lease
expires, and Vercel Queues delivers it again. Queues provides [at-least-once
delivery](/docs/queues/concepts#at-least-once-delivery), so tasks should be
idempotent. Use `lease_duration` to set how long a delivery may be in flight
before Queues treats it as lost.

Even with `task_acks_late`, a task that raises is still acknowledged, because
Celery treats a failed task as handled. Use Celery's retries to handle
application-level failures:

```py filename="tasks.py"
@app.task(bind=True, max_retries=5)
def notify(self, user_id: str) -> None:
    try:
        send_notification(user_id)
    except TimeoutError as exc:
        raise self.retry(exc=exc, countdown=5)
```

> **💡 Note:** Vercel Queues doesn't defer `countdown` or `eta`. Celery publishes the message
> immediately, and the worker holds it in memory until the scheduled time, which
> keeps the invocation open. If the invocation ends first, the lease expires and
> Queues delivers the task again. Keep countdowns and retry backoff short
> relative to your function's maximum duration.

## Storing task results

The adapter registers `vercel-runtime-cache://`, a Celery result backend that
stores results in [Runtime Cache](/docs/caching/runtime-cache). Configure it
through `result_backend_transport_options`:

```py filename="tasks.py"
app.conf.result_backend_transport_options = {
    "namespace": "celery-on-vercel-results",
    "ttl": 3600,
}
```

Results go in a namespace derived from the application name. Producers and
workers that use different Celery app names need an explicit shared `namespace`
to read each other's results. Stored results use Celery's `result_expires` value
as their TTL unless you set `ttl`.

> **💡 Note:** Runtime Cache is regional and ephemeral, and Celery reads a missing entry as a
> pending result. Use it for short-lived task status only. For results you need
> to keep, configure a durable Celery result backend such as Redis or
> PostgreSQL.

## Splitting queues across functions

With no `topics` filter, the generated function consumes every queue the
application declares. Add a filter to split those queues across separate
functions.

Filters match Vercel Queue topic names, not Celery queue names. Declare the
queues in `task_queues` so the build can read them from the application:

```py filename="tasks.py"
from celery import Celery
from kombu import Queue

app = Celery(
    "celery-on-vercel",
    broker="vercel://",
    backend="vercel-runtime-cache://",
)
app.conf.task_queues = [Queue("emails"), Queue("reports")]
```

Each queue name gets the `queue_name_prefix`, which defaults to
`celery-<app name>-`, so this application declares two topics:

| Celery queue | Vercel Queue topic                |
| ------------ | --------------------------------- |
| `emails`     | `celery-celery-on-vercel-emails`  |
| `reports`    | `celery-celery-on-vercel-reports` |

Filter each subscriber by those topic names:

```toml filename="pyproject.toml"
[[tool.vercel.subscribers]]
entrypoint = "worker:app"
topics = ["celery-celery-on-vercel-emails"]

[[tool.vercel.subscribers]]
entrypoint = "worker:app"
topics = ["celery-celery-on-vercel-reports"]
```

A trailing `*` matches by prefix, so `topics = ["celery-celery-on-vercel-*"]`
matches every queue this application declares.

A filter that matches none of the application's topics fails the build, and the
error lists the topics the build found. That error is the quickest way to check
a topic name:

```
subscriber "worker_app" declared topics [emails] but no introspected queue
subscriptions matched them; introspected topics
[celery-celery-on-vercel-emails, celery-celery-on-vercel-reports]
```

> **💡 Note:** The build reads the queues the application declares at import time, which
> means `task_queues` and `task_default_queue`. A queue that appears only in
> `task_routes` isn't declared until a task is published to it, so the build
> never sees it and no function subscribes to it. Declare every queue you route
> tasks to.

## Limitations

Celery tasks run inside [Vercel Functions](/docs/functions), so all [Vercel
Functions limitations](/docs/functions/limitations) apply, including maximum
duration and bundle size.

- **Task arguments**: Use the default JSON serializer where you can. Other
  Celery serializers work, because non-JSON message bodies are stored through a
  base64 wrapper. Vercel Queues supports messages up to [100
  MB](/docs/queues/pricing#limits).
- **Long-running processes**: On Vercel, tasks run in queue-triggered functions
  instead of a persistent `celery worker` process, so worker control commands
  and features that require persistent process state aren't available. To run a
  regular `celery worker` elsewhere against the same queues, set the broker to
  `vercel-poll://` and see [poll mode](/docs/queues/poll-mode).
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
