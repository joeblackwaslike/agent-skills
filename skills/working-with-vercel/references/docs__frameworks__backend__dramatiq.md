---
title: Deploy Dramatiq workers on Vercel
product: vercel
url: /docs/frameworks/backend/dramatiq
canonical_url: "https://vercel.com/docs/frameworks/backend/dramatiq"
last_updated: 2026-08-20
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/functions/runtimes/python
  - /docs/queues
  - /docs/functions
  - /docs/frameworks/backend/fastapi
  - /docs/queues/pricing
summary: Deploy Dramatiq workers on Vercel. Learn how Dramatiq actors use Vercel Queues and Vercel Functions to process background tasks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/dramatiq.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "3b7ba58079d193c80a815cb8d8ee81cd43ef94aa5f0a1f6178e36ad43a937634"
---

# Deploy Dramatiq workers on Vercel

> **🔒 Permissions Required**: Vercel Queues

[Dramatiq](https://dramatiq.io/) is a distributed task processing library for
Python. You declare functions as actors, send them messages, and workers run
them in the background.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Run background tasks with Celery on Vercel](https://vercel.com/changelog/run-background-tasks-with-celery-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related)
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [Quickstart](https://vercel.com/docs/queues/quickstart?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Set up Vercel Queues with the SDK.
- [Deploy a Django app on Vercel](https://vercel.com/docs/frameworks/full-stack/django?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Deploy a Django app on Vercel. Learn how the Python runtime, WSGI, ASGI, static assets, and Vercel Functions work togeth
- [Vercel Workflows](https://vercel.com/docs/workflows?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Build agents and applications that retry failed steps, wait for external events, and resume across crashes and deploymen
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/frameworks/backend/dramatiq.graph.md](/docs/frameworks/backend/dramatiq.graph.md?from=related&source_path=%2Fdocs%2Fframeworks%2Fbackend%2Fdramatiq&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Deploy Dramatiq workers to Vercel with the [Python
runtime](/docs/functions/runtimes/python), [Vercel Queues](/docs/queues), and
[Vercel Functions](/docs/functions). Vercel builds your Dramatiq broker as a
private, queue-triggered Vercel Function, so you don't need to run a long-lived
`dramatiq` worker process or a Redis or RabbitMQ broker.

## Configure the project

Dramatiq projects on Vercel must declare their dependencies in
`pyproject.toml`:

```toml filename="pyproject.toml"
[project]
name = "dramatiq-on-vercel"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
  "dramatiq>=2.2,<3",
  "fastapi",
]
```

This example uses [FastAPI](/docs/frameworks/backend/fastapi) to enqueue
messages. You can use any supported Python web framework for the producer.

### Define the broker and actors

Create a `VercelQueueBroker` and set it as Dramatiq's broker before you declare
any actors:

```py filename="tasks.py"
import dramatiq

from vercel.integrations.dramatiq import VercelQueueBroker

broker = VercelQueueBroker()
dramatiq.set_broker(broker)

@dramatiq.actor
def send_email(user_id: str) -> None:
    deliver_email(user_id)
```

### Declare the worker

Create a worker module that imports your tasks. The import is what declares each
actor's queues on the broker:

```py filename="worker.py"
from tasks import broker

__all__ = ["broker"]
```

Add the web entrypoint and the Dramatiq worker to `pyproject.toml`:

```toml filename="pyproject.toml"
[tool.vercel]
entrypoint = "main:app"

[[tool.vercel.subscribers]]
entrypoint = "worker"
```

The subscriber `entrypoint` is a Python module import path, so use a dotted path
such as `queues.worker` for `queues/worker.py`, without the `.py`
suffix. Vercel builds `main:app` as the public web application and `worker` as a
private Vercel Function. Only Vercel Queues can invoke the worker function.

At build time, Vercel imports the module, reads every queue the broker declares,
and compiles the subscriber into a queue-triggered function. You don't need to
configure `experimentalTriggers` in `vercel.json`.

### Send messages

Import an actor into your web application and call `send` as you normally
would:

```py filename="main.py"
from fastapi import FastAPI

from tasks import send_email

app = FastAPI()

@app.post("/emails")
def enqueue_email(user_id: str):
    message = send_email.send(user_id)
    return {"messageId": message.message_id}
```

Each call to `send` publishes a message to the actor's queue topic. Vercel
Queues then invokes the subscriber function, which runs the actor.

Use `send_with_options` to delay a message:

```py filename="main.py"
send_email.send_with_options(args=(user_id,), delay=60_000)
```

Dramatiq delays are in milliseconds. Vercel Queues can delay a message by up to
the message retention period. See [Queues
limits](/docs/queues/pricing#limits).

### Local development

Use `vercel dev` to run the web application and Dramatiq worker locally:

```bash filename="terminal"
vercel dev
```

`vercel dev` starts both your web application and the Dramatiq worker. You
don't need to run the `dramatiq` CLI in another terminal.

> **💡 Note:** Minimum CLI version required: 58.9.0

### Deploying the application

Deploy the project by connecting your Git repository or by using the [Vercel
CLI](/docs/cli/deploy):

```bash filename="terminal"
vc deploy
```

> **💡 Note:** Minimum CLI version required: 58.9.0

## Vercel Functions

When your web function calls `send`, the broker publishes the message to the
topic that matches the actor's queue name. Vercel Queues invokes the private
subscriber function, which hands the delivery to an in-process Dramatiq worker,
runs the actor, and acknowledges the message after it succeeds.

Each Dramatiq queue maps to two topics: the queue itself and its Dramatiq delay
queue. The `default` queue becomes the `default` topic and the `default_DDQ`
topic. Vercel Queues delivers delayed messages and retries through the delay
topic, so the generated function subscribes to both.

Topics are partitioned by deployment ID, so a deployment consumes only the
messages it published. See [deployments and
versioning](/docs/queues/concepts#deployments-and-versioning).

### Broker options

Pass options to `VercelQueueBroker` to control naming, delivery, and the
underlying queue client:

| Option                              | Type     | Default           | Description                                                          |
| ----------------------------------- | -------- | ----------------- | -------------------------------------------------------------------- |
| `consumer_group`                    | `str`    | `dramatiq`        | Consumer group used for subscriptions and polling                    |
| `queue_name_prefix`                 | `str`    | No prefix         | Prefix applied to Dramatiq queue names before topic sanitization     |
| `retention`                         | duration | Service default   | Retention applied to published messages                              |
| `lease_duration`                    | duration | Service default   | Processing timeout for received messages                             |
| `requeue_delay_seconds`             | `int`    | Zero seconds      | Visibility delay used when Dramatiq requeues a message               |
| `push_retry_delay_seconds`          | `int`    | One second        | Visibility delay used when a push delivery finds no free worker slot |
| `push_handoff_wait_seconds`         | `float`  | 30 seconds        | Maximum request-time wait for worker readiness and settlement        |
| `use_message_id_as_idempotency_key` | `bool`   | `False`           | Publish the Dramatiq message ID as the Queues idempotency key        |
| `poll`                              | `bool`   | Push on Vercel    | Force poll delivery when `True` or push delivery when `False`        |
| `middleware`                        | `list`   | Dramatiq defaults | Middleware list passed to the base broker                            |

The broker also accepts `token`, `region`, `base_url`, `deployment`, `timeout`,
and `headers`, and forwards them to the queue client. See [client
options](/docs/queues/python-sdk#client-options).

Workers that share a topic and a consumer group compete for messages. Workers
that share a topic with different consumer groups each receive a copy of every
message. Set `queue_name_prefix` when other producers in the project publish to
topics with the same names as your Dramatiq queues.

> **💡 Note:** Enabling `use_message_id_as_idempotency_key` deduplicates repeated publishes
> of the same message. Dramatiq reuses the message ID when it retries an actor,
> so leave this off unless you understand how it interacts with retries.

## Retries and redelivery

Dramatiq's `Retries` middleware handles actor failures. When an actor raises,
the middleware republishes the message to the delay topic with exponential
backoff and acknowledges the original delivery. Configure it per actor:

```py filename="tasks.py"
@dramatiq.actor(max_retries=5, min_backoff=1_000, max_backoff=60_000)
def send_email(user_id: str) -> None:
    deliver_email(user_id)
```

Dramatiq defaults to 20 retries, a minimum backoff of 15 seconds, and a maximum
backoff of seven days. Set `max_backoff` so retries stay inside your message
retention window, because Vercel Queues can't deliver a message after it
expires.

If the function times out or crashes before the actor finishes, the processing
lease expires and Vercel Queues delivers the message again. Queues provides
[at-least-once delivery](/docs/queues/concepts#at-least-once-delivery), so
actors should be idempotent.

> **💡 Note:** Dramatiq's dead-letter list lives in the worker process, so the worker
> acknowledges a message that exhausts its retries and drops it when the
> function shuts down. Record those failures yourself with the
> `on_retry_exhausted` actor option or a custom middleware.

## Storing actor results

Vercel Queues acts as the Dramatiq broker, not a result backend. To return
values from actors, add the `Results` middleware with the Vercel Runtime Cache
backend:

```py filename="tasks.py"
import dramatiq
from dramatiq.results import Results

from vercel.integrations.dramatiq import (
    VercelQueueBroker,
    VercelRuntimeCacheBackend,
)

broker = VercelQueueBroker()
broker.add_middleware(Results(backend=VercelRuntimeCacheBackend()))
dramatiq.set_broker(broker)

@dramatiq.actor(store_results=True)
def add(left: int, right: int) -> int:
    return left + right
```

Producers then read results as they would with any Dramatiq result backend:

```py filename="main.py"
from dramatiq.composition import group

from tasks import add

result_group = group(add.message(x, x) for x in range(10)).run()
values = list(result_group.get_results(block=True, timeout=30_000))
```

`VercelRuntimeCacheBackend` accepts `namespace`, `name`, and `tags` to control
where results are stored. [Runtime Cache](/docs/caching/runtime-cache) is
ephemeral and regional, so treat results as short-lived. Store anything you
need to keep in a database.

Blocking on results holds the producer function open for as long as the actors
take, which counts against the function's maximum duration and its compute
cost. For long jobs, have the actor write to a database and poll from the
client instead.

## Splitting queues across functions

With no `topics` filter, the generated function consumes every queue the broker
declares. Add a filter to split queues across separate functions:

```toml filename="pyproject.toml"
[[tool.vercel.subscribers]]
entrypoint = "worker"
topics = ["emails*"]

[[tool.vercel.subscribers]]
entrypoint = "worker"
topics = ["reports*"]
```

A trailing `*` matches by prefix. Prefer the prefix form so each function also
subscribes to its delay topic. A filter of `topics = ["emails"]` excludes
`emails_DDQ`, which means delayed messages and retries for that queue are never
delivered.

## Limitations

Dramatiq actors run inside [Vercel Functions](/docs/functions), so all [Vercel
Functions limitations](/docs/functions/limitations) apply, including maximum
duration and bundle size.

- **Message arguments**: Actor arguments must be JSON-serializable. Vercel
  Queues supports messages up to [100 MB](/docs/queues/pricing#limits).
- **Long-running processes**: Vercel uses queue-triggered functions instead of a
  persistent `dramatiq` worker process. Worker control features that require
  persistent process state aren't available.
- **Queue management**: Vercel Queues doesn't support purging or joining
  queues, so `broker.flush()`, `broker.flush_all()`, and `broker.join()` raise
  `NotImplementedError`. Use Dramatiq's `StubBroker` in unit tests instead.

## More resources

For more about deploying Dramatiq on Vercel, see:

- [Dramatiq official documentation](https://dramatiq.io/)
- [Deploy a Celery app on Vercel](/docs/frameworks/backend/celery)
- [Vercel Queues documentation](/docs/queues)
- [Queues Python SDK reference](/docs/queues/python-sdk)
- [Python runtime documentation](/docs/functions/runtimes/python)


---

[View full sitemap](/docs/sitemap)
