# Service Communication

How services call each other decides how they fail. Pick the style for each interaction, then protect every remote call.

## Synchronous or asynchronous

| | Synchronous (HTTP, gRPC) | Asynchronous (messaging) |
| --- | --- | --- |
| The caller | Waits for the answer | Sends and moves on |
| Coupling | The callee must be up right now | The broker holds the message until the callee is ready |
| Failure | Spreads up the call chain | Isolated, but you need a broker |
| Cost | Latency adds up along a chain | Duplicates, queue latency, awkward request-reply |
| Fits | A user is waiting on the answer | Work that can complete later, or fan-out to many readers |

The coupling in the synchronous column is temporal: the caller works only while the callee is available. In a chain (A calls B calls C), waiting on synchronous calls can add unacceptable latency, and one slow service slows everything above it. Fowler's microservices article carries a sidebar titled "Synchronous calls considered harmful" for this reason.

Prefer asynchronous messaging for anything the user is not waiting on. See [event-driven-architecture.md](../event-driven/event-driven-architecture.md) for delivery guarantees and idempotent consumers.

## Protecting every remote call

A call across a network can hang, fail, or succeed and still lose the reply. For each one:

- Set a timeout. AWS's rule is to put a timeout on any remote call, since a call without one can hold a thread forever.
- Retry only transient faults, a bounded number of times. Retries are selfish: a retrying client spends more of the server's time to improve its own odds. When every layer retries independently the load multiplies, and AWS's worked example multiplies the load on the database 243 times, so retry at one point in the stack.
- Back off with jitter. Use capped exponential backoff and add randomness so clients do not all retry at the same moment.
- Make the operation safe to repeat. GET, PUT and DELETE are idempotent by the HTTP specification, POST is not guaranteed to be, and Azure advises against retrying POST or PATCH, so give a retried POST an idempotency key.
- Stop calling a dependency that is failing. A circuit breaker (closed, open, half-open) rejects calls that are likely to fail, and retries must stop when the breaker opens.

The mechanics are in `design-patterns`: [retry-backoff.md](../../../design-patterns/references/resilience/retry-backoff.md), [circuit-breaker.md](../../../design-patterns/references/resilience/circuit-breaker.md) and [idempotency-key.md](../../../design-patterns/references/resilience/idempotency-key.md).

## Contracts between services

Treat an API as a contract. A consumer can only rely on what the provider promises, and the provider can only change what no consumer depends on.

- Consumer-driven contracts. Each consumer states what it uses, and the provider validates against the union of those contracts, which gives fast feedback on whether a change breaks anyone.
- Tolerant reader. Be conservative in what you send and liberal in what you accept. A consumer reads only the fields it needs and ignores the rest, so a provider can add fields freely.
- Backward-compatible changes first. Adding an optional field is safe if the service still accepts requests from older clients that omit it. Removing or renaming a field is not, and neither is adding a required one. For a breaking change, publish a new version and keep the old one running until its consumers move.

A tolerant reader takes the fields it needs, defaults the optional ones, ignores the rest, and still fails loudly when a required field is missing:

```python
def read_order_summary(payload: dict) -> dict:
    return {
        "id": payload["id"],
        "total_minor": payload["total_minor"],
        "currency": payload.get("currency", "USD"),
    }


v1 = {"id": "o-1", "total_minor": 1500}
v2 = {"id": "o-1", "total_minor": 1500, "currency": "EUR", "loyalty_tier": "gold"}
assert read_order_summary(v1)["currency"] == "USD"
assert read_order_summary(v2) == {"id": "o-1", "total_minor": 1500, "currency": "EUR"}

try:
    read_order_summary({"total_minor": 1500})
except KeyError:
    pass
else:
    raise AssertionError("a missing required field must fail")
```

```ts
import assert from "node:assert/strict";

type OrderSummary = { id: string; totalMinor: number; currency: string };

function readOrderSummary(payload: Record<string, unknown>): OrderSummary {
  const { id, total_minor: totalMinor, currency } = payload;
  if (typeof id !== "string" || typeof totalMinor !== "number") {
    throw new Error("order summary is missing id or total_minor");
  }
  return { id, totalMinor, currency: typeof currency === "string" ? currency : "USD" };
}

assert.equal(readOrderSummary({ id: "o-1", total_minor: 1500 }).currency, "USD");
assert.equal(readOrderSummary({ id: "o-1", total_minor: 1500, currency: "EUR", loyalty_tier: "gold" }).currency, "EUR");
assert.throws(() => readOrderSummary({ total_minor: 1500 }));
```

The same discipline applies to event schemas; see the schema evolution section of the event-driven reference.

## Keep calls few and coarse

RPC-style interfaces drift toward chatty APIs, where one screen needs a dozen round trips. Azure notes that chattiness can signal tight coupling. If a caller makes many calls to the same service per request, the boundary or the interface is wrong. Give the service one coarser operation, let the caller keep a copy of the data it keeps asking for (event-carried state transfer), or merge the two services.

## Sources

- [Interservice communication (Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/interservice-communication)
- [Microservices (Martin Fowler and James Lewis)](https://martinfowler.com/articles/microservices.html)
- [Timeouts, retries and backoff with jitter (AWS Builders' Library)](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)
- [Retry pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry)
- [Circuit Breaker pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)
- [Consumer-driven contracts (Martin Fowler)](https://martinfowler.com/articles/consumerDrivenContracts.html)
- [Tolerant Reader (Martin Fowler)](https://martinfowler.com/bliki/TolerantReader.html)
- [API design (Azure)](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/api-design)
