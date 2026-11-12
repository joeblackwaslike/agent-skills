# Observer

## What it is and Problem it solves

Observer lets one piece of code announce that something happened without knowing who cares. Subscribers register a handler; the publisher calls every handler when the event occurs. It keeps `ship_order` from importing email, analytics, inventory and loyalty modules just to tell them an order shipped.

## Do you need this?

Often not. If there is one listener and it will always be there, call it directly. A function call is easier to trace, debug and test than an indirect notification.

Use Observer when a second subscriber appears from a package the publisher should not import, when the set of listeners varies by deployment or plugin, or when listeners are added by code you do not own. A plain list of callables is the whole mechanism; frameworks add naming and wildcards on top.

## Python

```python
import logging
from collections.abc import Callable
from dataclasses import dataclass
from itertools import count

log = logging.getLogger(__name__)


@dataclass(frozen=True)
class OrderPaid:
    order_id: str
    amount_cents: int


class EventBus[E]:
    def __init__(self) -> None:
        self._handlers: dict[int, Callable[[E], None]] = {}
        self._keys = count()

    def subscribe(self, handler: Callable[[E], None]) -> Callable[[], None]:
        key = next(self._keys)
        self._handlers[key] = handler

        def unsubscribe() -> None:
            self._handlers.pop(key, None)

        return unsubscribe

    def publish(self, event: E) -> None:
        for handler in list(self._handlers.values()):
            try:
                handler(event)
            except Exception:
                log.exception("handler %r failed for %r", handler, event)


bus = EventBus[OrderPaid]()
seen: list[str] = []


def broken(event: OrderPaid) -> None:
    raise RuntimeError("boom")


bus.subscribe(broken)
unsubscribe = bus.subscribe(lambda e: seen.append(e.order_id))
bus.publish(OrderPaid("o-1", 500))
assert seen == ["o-1"]

unsubscribe()
unsubscribe()
bus.publish(OrderPaid("o-2", 700))
assert seen == ["o-1"]
```

Each handler runs inside its own `try`. `broken` raises, the error is logged, the next handler still runs, and `publish` returns normally. Each subscription has its own key, so the same function can subscribe twice and each unsubscribe removes only its own entry; calling one twice is harmless. Publishing iterates over a snapshot, so a handler removed by another handler still runs for the current event and is gone from the next publish.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Handler<E> = (event: E) => void | Promise<void>;

export function createBus<E>(onError: (err: unknown, event: E) => void = console.error) {
  const handlers = new Set<Handler<E>>();

  const report = (err: unknown, event: E): void => {
    try { onError(err, event); } catch { return; }
  };

  const run = (handler: Handler<E>, event: E): Promise<void> => {
    try {
      return Promise.resolve(handler(event)).catch((err) => report(err, event));
    } catch (err) {
      report(err, event);
      return Promise.resolve();
    }
  };

  return {
    subscribe(handler: Handler<E>): () => void {
      handlers.add(handler);
      return () => handlers.delete(handler);
    },
    publish(event: E): void {
      for (const handler of [...handlers]) void run(handler, event);
    },
    async publishAsync(event: E): Promise<void> {
      await Promise.all([...handlers].map((handler) => run(handler, event)));
    },
  };
}

type OrderPaid = { orderId: string; amountCents: number };
const errors: unknown[] = [];
const bus = createBus<OrderPaid>((err) => {
  errors.push(err);
  throw new Error("error reporter is down");
});
const seen: string[] = [];
bus.subscribe(() => {
  throw new Error("boom");
});
bus.subscribe(async () => {
  throw new Error("async boom");
});
bus.subscribe((e) => {
  seen.push(e.orderId);
});

await bus.publishAsync({ orderId: "o-1", amountCents: 500 });
assert.deepEqual(seen, ["o-1"]);
assert.equal(errors.length, 2);
```

A rejected promise from an async handler is caught separately, because `try/catch` around a call does not see it. Forgetting that half is the usual way isolation is broken in TypeScript. The error callback gets its own guard too, so a throwing reporter cannot stop the remaining handlers or surface as an unhandled rejection. `publish` is fire-and-forget. It returns before async handlers finish, and nothing cancels a handler that is still running. `publishAsync` returns a promise that resolves once every handler has settled. If handlers must survive a restart, move to a queue.

## In production

- Node's `EventEmitter` and the DOM's `addEventListener` are both Observer. Note that `EventEmitter` calls listeners synchronously and an exception in one propagates to `emit`'s caller, so isolation is your job.
- Django signals (`post_save` and friends) with `send_robust`, which catches receiver exceptions and returns them instead of raising.

## Smells and misuse

- A handler that must succeed for the publisher to be correct. If the order is not valid without the inventory update, that is a call, not an event.
- Ceiling of the in-process version. Handlers run inline on the publisher's thread, so one slow handler slows every publish, and an event is lost if the process dies before handlers finish. When you need retries, durability, or handlers in other services, put a queue or an [outbox](../resilience/outbox.md) between them.
- Handlers that publish events that trigger the first handler. Cycles show up as stack overflows or silent loops.
- Never unsubscribing. Long-lived buses hold references to short-lived objects.

## Related

- [Outbox](../resilience/outbox.md) is the durable version when the event must not be lost.
- [Command](command.md) captures a request to act; Observer announces a fact that already happened.
- [Chain of Responsibility](chain-of-responsibility.md) passes one request through ordered handlers; Observer fans one event out to all of them.
