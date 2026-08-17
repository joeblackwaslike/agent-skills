---
title: Python SDK Reference
product: vercel
url: /docs/queues/python-sdk
canonical_url: "https://vercel.com/docs/queues/python-sdk"
last_updated: 2026-07-07
type: reference
prerequisites:
  - /docs/queues
related:
  - /docs/queues/sdk
  - /docs/queues/api
  - /docs/queues/poll-mode
summary: Publish and consume messages with the Vercel Queues Python SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/python-sdk.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1e540f9804e908d8147d6fa34457eb8cdc22fa4bcc43a3c267dd9c02011eadcf"
---

# Vercel Queues: Python SDK Reference

The `vercel-queue` package lets Python apps publish and consume Vercel Queues messages. It includes async and sync clients, typed topics, push delivery helpers, automatic polling loops, manual polling, and transports for JSON, text, binary, and streaming payloads.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Concepts](https://vercel.com/docs/queues/concepts?from=related) — Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.
- [Quickstart](https://vercel.com/docs/queues/quickstart?from=related) — Set up Vercel Queues with the SDK.
- [Slack](https://eve.dev/docs/channels/slack?from=related) — Reach your agent from Slack app mentions and DMs with Vercel Connect-managed credentials, threaded replies, and interact
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to build a Slack bot that manages files in Vercel Blob](https://vercel.com/kb/guide/slack-bot-vercel-blob?from=related) — Build a Slack bot using Chat SDK, AI SDK, and Files SDK that can list, read, upload, and delete files in Vercel Blob thr
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk?from=related) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Observability](https://vercel.com/docs/queues/observability?from=related) — Monitor queue throughput, message age, and consumer performance to optimize your queue-based workflows.
- [Workflows](https://vercel.com/docs/workflows?from=related) — Vercel Workflows is a fully managed platform for building durable, reliable, and observable applications and AI agents w

Full cross-link map for this page: [/docs/queues/python-sdk.graph.md](/docs/queues/python-sdk.graph.md)
<!-- /docsgraph:related -->

For JavaScript and TypeScript, see the [JS SDK Reference](/docs/queues/sdk).

## Installation

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i vercel-queue
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i vercel-queue
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i vercel-queue
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i vercel-queue
    ```
  </Code>
</CodeBlock>

For Pydantic-backed typed payloads, install the `typed` extra.

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i vercel-queue
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i vercel-queue
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i vercel-queue
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i vercel-queue
    ```
  </Code>
</CodeBlock>

## Top-level exports

Import top-level helpers from `vercel.queue` for route handlers, short scripts, polling workers, and tasks. Operation helpers such as `send`, `poll`, `poll_and_handle`, and `accept_and_handle` create a default async client for the call, so you don't need to construct a client first.

```python filename="api/orders.py"
from vercel.queue import (
    Message,
    QueueClient,
    Topic,
    accept_and_handle,
    asgi_app,
    poll,
    poll_and_handle,
    send,
    subscribe,
)
```

| Export              | Description                                                       |
| ------------------- | ----------------------------------------------------------------- |
| `send`              | Publish one message with the default async client                 |
| `subscribe`         | Register a function as a typed queue subscriber                   |
| `asgi_app`          | Create an ASGI app that dispatches push callbacks to subscribers  |
| `accept_and_handle` | Dispatch a push callback body and headers to subscribers          |
| `poll_and_handle`   | Run an async polling loop for one registered subscriber           |
| `poll`              | Poll one batch and yield `Delivery[T]` objects                    |
| `QueueClient`       | Configure region, authentication, headers, deployment, and URL    |
| `Topic`             | Declare a topic name and payload type contract                    |

### Custom client

Create a `QueueClient` when you need to configure region, headers, timeouts, deployment partitioning, or a custom queue service URL.

```python filename="lib/queue.py"
from vercel.queue import QueueClient

queue = QueueClient(region="sfo1")
```

Clients are lightweight and hold no open connections, so create one at module scope and share it across requests. `QueueClient` is not a context manager.

```python filename="api/orders.py"
from fastapi import FastAPI, Request
from vercel.queue import QueueClient

app = FastAPI()
queue = QueueClient(region="sfo1")


@app.post("/api/orders")
async def create_order(request: Request):
    body = await request.json()
    message_id = await queue.send("orders", body)
    return {"messageId": message_id}
```

### Client options

| Option                | Type                                    | Default              | Description                                             |
| --------------------- | --------------------------------------- | -------------------- | ------------------------------------------------------- |
| `token`               | `str`                                   | Resolved from Vercel | Bearer token for the Queues API                         |
| `region`              | `str`                                   | `VERCEL_REGION`      | Queue region, such as `iad1`, `fra1`, or `sfo1`         |
| `base_url`            | `str`, template, or callable            | Regional API URL     | Custom Queues API base URL                              |
| `deployment`          | `DeploymentOption`                      | Current deployment   | Deployment partition used for send and poll requests    |
| `headers`             | `Mapping[str, str]`                     | -                    | Custom non-protected headers                            |
| `timeout`             | `int`, `float`, `timedelta`, or `None`  | 10 seconds           | Request timeout                                         |
| `http_client_factory` | httpx-compatible client class           | `httpx.AsyncClient`  | Factory for the underlying HTTP client                  |

Set `deployment` to a deployment ID string to pin requests to one deployment, or to `ALL_DEPLOYMENTS` to send and poll across all deployments. The default targets the current deployment from `VERCEL_DEPLOYMENT_ID`.

The `base_url` value can be a fixed URL, a template containing a `{region}` placeholder, or a callable that takes a region name and returns a URL.

```python filename="lib/queue.py"
from vercel.queue import QueueClient

queue = QueueClient(base_url="https://proxy.example/queues/{region}")
```

## Publishing messages

Use `send` to publish a message to a topic. When you pass a `Topic[T]`, the SDK uses the topic's payload type and transport. Otherwise, the SDK infers a serializer from the payload type.

```python filename="api/orders.py"
from fastapi import FastAPI, Request
from vercel.queue import send

app = FastAPI()


@app.post("/api/orders")
async def create_order(request: Request):
    body = await request.json()
    message_id = await send(
        "orders",
        {"orderId": body["orderId"], "action": "process"},
    )
    return {"messageId": message_id}
```

### Send options

```python filename="api/orders.py"
from datetime import timedelta
from vercel.queue import send

message_id = await send(
    "orders",
    payload,
    retention=timedelta(hours=1),
    delay=60,
    idempotency_key="order-123",
    headers={"x-trace-id": "abc-123"},
)
```

| Option            | Type                                | Default            | Description                                      |
| ----------------- | ----------------------------------- | ------------------ | ------------------------------------------------ |
| `idempotency_key` | `str`                               | -                  | Deduplication key for the message                |
| `retention`       | `int`, `float`, or `timedelta`      | Service default    | Message retention duration                       |
| `delay`           | `int`, `float`, or `timedelta`      | No delay           | Delay before the message becomes visible         |
| `deployment`      | `DeploymentOption`                  | Current deployment | Deployment partition for this send request       |
| `headers`         | `Mapping[str, str]`                 | -                  | Custom non-protected headers for this send call  |

`send` returns the created message ID. It returns `None` when the service accepted the message but deferred ingestion. Deferred messages are still delivered.

## Topic types and message formats

The message format is part of the topic contract. Use `Topic[T]` to declare the payload type for a topic. `send()`, `poll()`, and subscribers use topic declarations or handler annotations to choose the normal transport automatically.

| Topic payload type                               | Default transport         | Message format               |
| ------------------------------------------------ | ------------------------- | ---------------------------- |
| JSON-compatible values, `dict[...]`, `list[...]` | `RawJsonTransport[Any]`   | JSON                         |
| Pydantic models and other structured annotations | `TypedJsonTransport[T]`   | JSON with receive validation |
| `bytes`                                          | `ByteBufferTransport`     | Buffered binary              |
| `str`                                            | `TextBufferTransport`     | Buffered UTF-8 text          |
| `Iterable[bytes]` or `AsyncIterable[bytes]`      | `ByteStreamTransport`     | Streaming binary             |
| `Iterable[str]` or `AsyncIterable[str]`          | `TextStreamTransport`     | Streaming UTF-8 text         |

```python filename="lib/topics.py"
from typing import TypedDict
from vercel.queue import Topic, send, subscribe


class Email(TypedDict):
    to: str
    subject: str


emails = Topic[Email]("emails")


async def queue_email(email: Email) -> None:
    await send(emails, email)


@subscribe(topic=emails)
async def receive_email(email: Email) -> None:
    await send_email(email)
```

You can specify a transport explicitly on the topic when the topic is untyped or when you need custom serialization. This keeps send and receive using the same message format.

```python filename="lib/large_file_stream.py"
from collections.abc import AsyncIterable, AsyncIterator
from vercel.queue import ByteStreamTransport, Topic, send, subscribe

large_file = Topic[AsyncIterable[bytes]](
    "large-file",
    transport=ByteStreamTransport(),
)


async def file_chunks() -> AsyncIterator[bytes]:
    with open("large.bin", "rb") as file:
        while chunk := file.read(1024 * 1024):
            yield chunk


async def send_file() -> None:
    await send(large_file, file_chunks())


@subscribe(topic=large_file)
async def archive_file(chunks: AsyncIterable[bytes]) -> None:
    async for chunk in chunks:
        await write_chunk(chunk)
```

Pydantic models can be sent directly. A typed topic infers typed JSON validation and deserialization on receive.

```python filename="lib/typed_orders.py"
from pydantic import BaseModel
from vercel.queue import Topic, send, subscribe


class Order(BaseModel):
    order_id: str
    total_cents: int


orders = Topic[Order]("orders")


async def queue_order() -> None:
    await send(orders, Order(order_id="ord_123", total_cents=2500))


@subscribe(topic=orders)
async def process_typed_order(order: Order) -> None:
    await process_order(order)
```

## Consuming messages in push mode

Push mode is the default for Python subscribers deployed to Vercel. Register a function with `@subscribe`, then declare its Python module import path under `[[tool.vercel.subscribers]]` in `pyproject.toml`.

```python filename="queues/orders.py"
from vercel.queue import Message, Topic, subscribe

orders = Topic[dict[str, object]]("orders")


@subscribe(topic=orders)
async def fulfill_order(message: Message[dict[str, object]]) -> None:
    await process_order(message.payload)
```

```toml filename="pyproject.toml"
[[tool.vercel.subscribers]]
entrypoint = "queues.orders"
```

At build time, Vercel imports the entrypoint module, reads every subscription it registers, and compiles the subscriber into a private queue-triggered function. You don't need to configure `experimentalTriggers` in `vercel.json`.

When `consumer_group` is omitted, the SDK derives a stable group name from the subscriber's fully qualified Python name. Multiple subscribers for the same topic create separate consumer groups, and each consumer group receives a copy of every message.

The SDK accepts the delivery, renews the processing lease while your handler is running, and acknowledges the message when the handler returns. If the handler raises an exception, Vercel redelivers the message according to queue retry behavior.

### Subscriber deployment configuration

The `entrypoint` value is a Python module import path. Use a dotted module path such as `queues.orders` for `queues/orders.py`. Don't use a filesystem path or include the `.py` suffix.

Each `[[tool.vercel.subscribers]]` entry identifies a Python module that registers one or more subscribers. The `module:object` format is also supported when you need to identify an object in the module.

When a module registers several subscribers, the generated function consumes all of them. Add a `topics` filter to split the module's subscribers across separate generated functions.

```toml filename="pyproject.toml"
[[tool.vercel.subscribers]]
entrypoint = "worker"
topics = ["orders"]

[[tool.vercel.subscribers]]
entrypoint = "refunds"
topics = ["refunds"]
```

Keep delivery configuration on the `@subscribe` decorator. Vercel reads `topic`, `consumer_group`, `retry_after`, `initial_delay`, `max_concurrency`, and `max_attempts` when it generates the queue trigger.

### Subscriber options

| Option            | Type                               | Default                        | Description                                                     |
| ----------------- | ---------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| `topic`           | `str \| SanitizedName \| Topic[T]` | Required                       | Topic filter. A trailing `*` matches by prefix, and `"*"` matches every topic |
| `consumer_group`  | `str \| SanitizedName`             | Derived from the function name | Consumer group override for this subscriber                     |
| `retry_after`     | `int`, `float`, or `timedelta`     | Service default                | Base retry delay for generated queue trigger configuration      |
| `initial_delay`   | `int`, `float`, or `timedelta`     | No delay                       | Deploy-time delay before generated consumers start processing   |
| `max_concurrency` | `int`                              | -                              | Push dispatcher concurrency cap                                 |
| `max_attempts`    | `int`                              | -                              | Push dispatcher delivery attempt cap                            |

Consumer group names can be any non-empty string. The SDK escapes them into queue-safe names automatically. Use `sanitize_name` to compute the stored name yourself, and pass a `SanitizedName` when a value is already queue-safe and must not be escaped again.

Subscribe to multiple topics with a wildcard pattern:

```python filename="api/queue/user_events.py"
from vercel.queue import subscribe


@subscribe(topic="user-*")
async def handle_user_event(event: dict[str, str]) -> None:
    await process_user_event(event)
```

### Push message metadata

Subscribers receive a `Message[T]`. Use `message.payload` for the deserialized payload, `message.message_id` for the message ID, and `message.metadata` for delivery metadata.

| Field                  | Type                | Description                                      |
| ---------------------- | ------------------- | ------------------------------------------------ |
| `message_id`           | `str`               | Opaque message ID assigned by the service        |
| `delivery_count`       | `int`               | Number of delivery attempts                      |
| `created_at`           | `datetime`          | Message creation timestamp                       |
| `topic`                | `str`               | Topic name                                       |
| `consumer_group`       | `str`               | Consumer group that owns this delivery           |
| `receipt_handle`       | `str \| None`      | Opaque delivery token for follow-up operations   |
| `content_type`         | `str \| None`      | Stored message content type                      |
| `region`               | `str \| None`      | Queue region for follow-up operations            |
| `expires_at`           | `datetime \| None` | Message expiration timestamp                     |
| `visibility_deadline`  | `datetime \| None` | Current processing deadline                      |

### Manual push handling

Use `asgi_app()` to create a standalone ASGI callback app that dispatches deliveries to registered subscribers.

```python filename="worker.py"
from vercel.queue import asgi_app, subscribe


@subscribe(topic="orders")
async def fulfill_order(order: dict[str, object]) -> None:
    await process_order(order)


app = asgi_app()
```

Use `accept_and_handle` when you need to route a callback through an existing ASGI framework. It accepts the callback body as bytes, a byte iterable, or a framework response object, plus the callback request headers. Pass `lease_duration` to change the processing timeout used while handlers run.

```python filename="api/queues/manual.py"
from fastapi import Request
from vercel.queue import accept_and_handle


async def handle_queue_callback(request: Request) -> None:
    body = await request.body()
    await accept_and_handle(body, request.headers, lease_duration=300)
```

It raises `UnhandledMessageError` when no registered subscription matches the delivered topic.

## Consuming messages with polling loops

Use `poll_and_handle()` to run a subscriber outside push mode, such as in a self-hosted worker, local process, or long-running script. The helper uses the subscriber's `@subscribe` metadata to pick the topic, consumer group, payload type, and receive transport.

```python filename="worker.py"
import asyncio
from vercel.queue import poll_and_handle, subscribe


@subscribe(topic="orders")
async def fulfill_order(order: dict[str, str]) -> None:
    await process_order(order)


async def main() -> None:
    async with asyncio.TaskGroup() as task_group:
        poller = task_group.create_task(
            poll_and_handle(fulfill_order, interval=1.0),
        )
        try:
            await wait_for_shutdown_signal()
        finally:
            poller.cancel()


asyncio.run(main())
```

`poll_and_handle()` polls each configured topic until no messages are available, then sleeps for `interval` before checking again. The loop acknowledges a message when the subscriber returns. If the subscriber raises, the SDK leaves the message unacknowledged so Vercel Queues can redeliver it according to retry behavior.

### Polling loop options

| Option           | Type                                    | Default   | Description                                                                 |
| ---------------- | --------------------------------------- | --------- | --------------------------------------------------------------------------- |
| `subscriber`     | `QueueSubscriber[..., Any]`             | Required  | Function registered with `@subscribe`                                       |
| `topics`         | `Iterable[str] \| None`                 | `None`    | Concrete topics to poll. Required for wildcard subscriber topic patterns    |
| `interval`       | `int`, `float`, or `timedelta`          | `1.0`     | Idle sleep duration when all configured topics are empty                    |
| `limit`          | `int \| None`                          | `None`    | Per-request maximum from 1 through 10. `None` drains until empty before idle |
| `lease_duration` | `int`, `float`, `timedelta`, or `None`  | 5 minutes | Processing timeout for received messages                                    |

Wildcard subscribers can run in a polling loop, but you must pass concrete topic names because wildcard topic patterns cannot be polled directly.

```python filename="analytics_worker.py"
from vercel.queue import poll_and_handle, subscribe


@subscribe(topic="events-*")
async def handle_event(event: dict[str, str]) -> None:
    await record_event(event)


await poll_and_handle(
    handle_event,
    topics=["events-user", "events-system"],
    interval=1.0,
)
```

### Polling loop client configuration

Use `QueueClient.poll_and_handle()` when the polling worker needs explicit region, authentication, headers, deployment partitioning, or a custom queue service URL.

```python filename="worker.py"
import asyncio
from vercel.queue import QueueClient, subscribe


@subscribe(topic="orders")
async def fulfill_order(order: dict[str, str]) -> None:
    await process_order(order)


async def main() -> None:
    queue = QueueClient(region="iad1")
    async with asyncio.TaskGroup() as task_group:
        poller = task_group.create_task(
            queue.poll_and_handle(fulfill_order, interval=1.0),
        )
        try:
            await wait_for_shutdown_signal()
        finally:
            poller.cancel()


asyncio.run(main())
```

### Polling regions

Messages can only be received from the region they were sent to. Use a fixed `region`, such as `iad1`, for both sending and polling. Avoid a changing runtime region for polling workers because that can distribute messages across regions unpredictably.

## Consuming messages with manual polling

Use `poll()` when you need direct control over delivery lifecycles or explicit consumer group behavior. `poll()` polls once for a specified consumer group and yields up to `limit` `Delivery[T]` objects. It can return no deliveries, so long-running workers usually use `poll_and_handle()` or add their own loop around `poll()`.

```python filename="lib/poll_worker.py"
from vercel.queue import QueueClient, Topic

orders = Topic[dict[str, object]]("orders")
CONSUMER_GROUP = "fulfillment"


queue = QueueClient(region="iad1")


async def poll_once() -> None:
    async for delivery in queue.poll(
        orders,
        CONSUMER_GROUP,
        limit=10,
        lease_duration=300,
    ):
        async with delivery as message:
            await process_order(message.payload)
```

Entering a delivery starts automatic lease renewal and returns the deserialized `Message[T]`. A clean exit acknowledges the message, while an exception leaves it available for retry according to queue behavior.

### Manual polling options

| Option           | Type                                  | Default   | Description                                  |
| ---------------- | ------------------------------------- | --------- | -------------------------------------------- |
| `topic`          | `str \| Topic[T]`                     | Required  | Topic object or topic name to receive from   |
| `consumer_group` | `str`                                | Required  | Consumer group to receive as                 |
| `limit`          | `int`                                | `1`       | Maximum messages to claim, from 1 through 10 |
| `lease_duration` | `int`, `float`, `timedelta`, or `None` | 5 minutes | Processing timeout for received messages     |

Use the same consumer group name in multiple pollers when those pollers should compete for work. Use different consumer group names when each group should receive its own copy of every message.

Use `acknowledge()`, `extend_lease()`, and `retry_after()` when you intentionally manage a delivery lifecycle yourself. Call `delivery.accept()` to take ownership of the message. Accepted deliveries skip automatic lease renewal and acknowledgement.

```python filename="lib/manual_lease.py"
from vercel.queue import QueueClient

CONSUMER_GROUP = "fulfillment"

queue = QueueClient(region="iad1")


async def process_batch() -> None:
    async for delivery in queue.poll("orders", CONSUMER_GROUP):
        message = delivery.accept()
        await queue.extend_lease(message, 600)
        await process_order(message.payload)
        await queue.acknowledge(message)
```

Pass zero to `extend_lease()` to release a message back to the queue immediately. Use `retry_after()` to schedule redelivery after a delay when your code owns the lifecycle. Handlers should usually raise `RetryAfter` instead.

## Retries and redelivery

Vercel Queues delivers messages at least once. When a subscriber raises an exception, the SDK leaves the message unacknowledged, and the message becomes visible again after the `retry_after` interval configured on `@subscribe`. Redelivery continues until the handler succeeds or the message expires.

Raise `RetryAfter` from a subscriber to control the next delivery time directly. The SDK stops lease renewal, makes the message visible again after the delay, and treats the delivery as handled. The default delay is 60 seconds, and a delay of zero requests immediate redelivery.

```python filename="api/queue/orders.py"
from vercel.queue import Message, RetryAfter, subscribe


@subscribe(topic="orders")
async def fulfill_order(message: Message[dict[str, str]]) -> None:
    try:
        await process_order(message.payload)
    except TemporaryError as exc:
        delay = min(300, 2**message.metadata.delivery_count * 5)
        raise RetryAfter(delay) from exc
```

Use `message.metadata.delivery_count` to add exponential backoff, as shown above.

Raise `Handoff` when your handler passed the delivery to another system that owns the rest of its lifecycle. The SDK stops lease renewal and leaves the lease open. The external system must acknowledge the message or change its visibility with the original message metadata, or the message is redelivered when the lease expires.

`RetryAfter` and `Handoff` both extend `QueueDirective`. They work in push mode, in `poll_and_handle()` loops, and inside entered `Delivery` context managers.

## Synchronous client

The sync API mirrors the async send and manual polling APIs under `vercel.queue.sync`. Use `vercel.queue.sync.QueueClient.poll_and_handle()` to run a subscriber in a background polling thread.

```python filename="worker.py"
from vercel.queue import subscribe
from vercel.queue.sync import QueueClient


@subscribe(topic="events")
def handle_event(event: dict[str, str]) -> None:
    process_event(event)


queue = QueueClient(region="iad1")
queue.send("events", {"type": "user.created"})
poller = queue.poll_and_handle(handle_event, interval=1.0)
try:
    wait_for_shutdown_signal()
finally:
    poller.cancel()
```

The sync polling loop runs in a daemon thread and returns a `concurrent.futures.Future[None]`. Calling `cancel()` asks the polling thread to stop. Calling `result()` surfaces polling errors, or raises `CancelledError` after cancellation.

## Error handling

The Python SDK exports typed error classes from `vercel.queue`.

```python filename="lib/send_order.py"
from vercel.queue import DuplicateIdempotencyKeyError, QueueError, send

try:
    await send("orders", payload, idempotency_key="order-123")
except DuplicateIdempotencyKeyError:
    # The idempotency key was already used.
    pass
except QueueError:
    # Handle other queue service failures.
    raise
```

Common errors include:

| Error                          | Description                                      |
| ------------------------------ | ------------------------------------------------ |
| `UnauthorizedError`            | Token is invalid or expired                      |
| `ForbiddenError`               | Token lacks permission for the operation         |
| `BadRequestError`              | Request data or headers are invalid              |
| `DuplicateIdempotencyKeyError` | Idempotency key already exists                   |
| `MessageNotFoundError`         | Message could not be found                       |
| `MessageLockedError`           | Message is leased by another consumer            |
| `MessageUnavailableError`      | Message is temporarily unavailable               |
| `PayloadValidationError`       | Transport failed to validate the payload         |
| `UnhandledMessageError`        | No registered subscriber matched a delivery      |
| `TokenResolutionError`         | No token was provided and OIDC resolution failed |
| `ThrottledError`               | The service throttled the request                |
| `QueueError`                   | Base class for queue SDK errors                  |

## Local development and testing

Use the embedded queue service to exercise the full send, dispatch, lease renewal, and acknowledgement path in one process without deploying.

```python filename="tests/test_queue.py"
from vercel.queue import subscribe
from vercel.queue.embedded import embedded_queue_service


@subscribe(topic="emails")
async def handle_email(email: dict[str, str]) -> None:
    await record_email(email)


async def send_one() -> None:
    async with embedded_queue_service() as service:
        client = service.get_async_client()
        await client.send("emails", {"subject": "Hi"})
```

For pytest, enable the bundled plugin and use the `embedded_queue_server` fixture. Each test gets isolated queue state.

```python filename="tests/conftest.py"
pytest_plugins = ["vercel.queue.testing.pytest"]
```

```python filename="tests/test_send.py"
async def test_send(embedded_queue_server):
    client = embedded_queue_server.get_async_client()
    message_id = await client.send("emails", {"subject": "Hi"}, retention=60)
    assert message_id is not None
```

For cross-process or cross-runtime local integration, install the `devserver` extra (`vercel-queue[devserver]`) and run a standalone queue API server:

```bash filename="Terminal"
python -m vercel.queue.devserver --port 8000
```

The command prints a JSON `baseUrl` for the local queue API. When `--port` is omitted, it picks a random available port. Point clients at the printed URL with the `VERCEL_QUEUE_BASE_URL` environment variable or the `base_url` client option.

## Environment variables

The SDK reads these variables when you don't pass the matching option explicitly:

| Variable                | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `VERCEL_REGION`         | Default queue region. Set automatically on Vercel              |
| `VERCEL_DEPLOYMENT_ID`  | Default deployment partition. Set automatically on Vercel      |
| `VERCEL_QUEUE_TOKEN`    | Bearer token override. The SDK resolves a Vercel OIDC token by default |
| `VERCEL_QUEUE_BASE_URL` | Fixed base URL or `{region}` template override                 |
| `VERCEL_QUEUE_DEBUG`    | Set to `1` or `true` to enable debug logging                   |

## Related

- [JS SDK Reference](/docs/queues/sdk)
- [API reference](/docs/queues/api)
- [Poll mode](/docs/queues/poll-mode)


---

[View full sitemap](/docs/sitemap)
