# Sagas

A saga runs a business transaction that spans services as a sequence of local transactions. Each service commits to its own database. If a later step fails, compensating transactions undo the earlier ones. It replaces a distributed transaction, which most brokers and databases can't offer across services.

A saga is not a rollback, and it is not isolated. Other requests can see the half-finished state, and a compensation can itself fail. Take one only when the work crosses a service boundary.

## Do you need a saga?

| Situation | Use |
| --- | --- |
| All the changes live in one database | A single local transaction. No saga. |
| Changes span services and must eventually agree, with a defined way to undo | A saga |
| Changes span services and must be atomic and isolated | Redraw the boundary so they share a database |
| The "undo" has no business meaning (an email already sent) | Order the steps so that step comes last, after the pivot |

If a saga's compensation logic is larger than the feature, the service boundary is probably in the wrong place. See [anti-patterns.md](../anti-patterns.md).

## Step types

Azure's saga guidance sorts steps into three kinds, and sorting yours is the first design task.

- Compensable steps can be undone by a transaction with the opposite effect, such as refunding a charge.
- The pivot transaction is the point of no return. Once it commits, the saga runs to the end.
- Retryable steps come after the pivot. They must be idempotent and are retried until they succeed.

Put steps that are hard to undo after the pivot, and keep as few steps as you can before it.

## Choreography or orchestration

| | Choreography | Orchestration |
| --- | --- | --- |
| How it runs | Each service publishes events that trigger the next step | A central orchestrator tells each service what to run |
| Fits | Simple flows with few services | Complex flows, or flows that gain steps over time |
| Strength | No coordinator, no single point of failure | The flow is written down in one place, no cyclic dependencies |
| Cost | The overall flow is hard to see, cycles are easy to create, integration tests need every service | You build the coordinator, and it is a point of failure |

Start orchestrated once a saga has more than about three steps. A choreographed flow with no code that states its shape is the hidden-flow problem from [event-driven-architecture.md](event-driven-architecture.md).

## A worked example

This is an illustration, not a pattern copied from a reference implementation. An order moves through four services. Steps before the pivot each have a compensation. The pivot is the point of no return: if it fails, the earlier steps are compensated, and once it commits nothing is undone. The step after it is retried until it succeeds.

| Step | Action | Compensation |
| --- | --- | --- |
| 1 | Create the order as pending | Cancel the order |
| 2 | Charge the payment | Refund the payment |
| 3 | Reserve stock | Release the stock |
| 4 | Book the carrier (the pivot: after this the order ships) | None |
| 5 | Approve the order | None, retried until it succeeds |

An orchestrator runs the steps in order. On a failure before or at the pivot it runs the compensations of the steps it started, in reverse, including the failed one, since a timeout leaves its outcome unknown and an idempotent compensation is safe to run anyway. Retries back off and apply only to transient errors. The participants below are in-memory fakes so the example runs on its own, and the stock reservation is keyed by an order id so a redelivered command changes nothing.

```python
import asyncio
from collections.abc import Awaitable, Callable
from dataclasses import dataclass

Action = Callable[[], Awaitable[None]]


class TransientError(Exception):
    pass


@dataclass
class Step:
    name: str
    action: Action


@dataclass
class Compensable(Step):
    compensate: Action  # must be idempotent


async def retry(action: Action, attempts: int = 3, base_delay: float = 0.1) -> None:
    attempts = max(1, attempts)
    for i in range(attempts):
        try:
            return await action()
        except TransientError:
            if i == attempts - 1:
                raise
            await asyncio.sleep(base_delay * 2**i)  # add jitter in production


async def run_saga(before: list[Compensable], pivot: Step, after: list[Step]) -> dict:
    done: list[Compensable] = []
    current = ""
    try:
        for step in before:
            current = step.name
            done.append(step)  # compensate it too: its outcome is unknown if the call times out
            await step.action()
        current = pivot.name
        await pivot.action()
    except Exception:
        for prev in reversed(done):
            await prev.compensate()
        return {"status": "compensated", "failed_at": current}
    for step in after:
        await retry(step.action)  # raises when exhausted: escalate, never compensate
    return {"status": "completed"}


class World:
    def __init__(self, capacity: int, carrier_up: bool = True, approve_failures: int = 0) -> None:
        self.capacity = capacity
        self.carrier_up = carrier_up
        self.order = "none"
        self.paid = False
        self.reserved: set[str] = set()
        self._approve_failures = approve_failures

    async def create_order(self) -> None: self.order = "pending"
    async def cancel_order(self) -> None: self.order = "cancelled"
    async def charge(self) -> None: self.paid = True
    async def refund(self) -> None: self.paid = False

    async def reserve(self) -> None:
        if "order-1" in self.reserved:
            return  # redelivery of the same command
        if len(self.reserved) >= self.capacity:
            raise RuntimeError("out of stock")
        self.reserved.add("order-1")

    async def release(self) -> None: self.reserved.discard("order-1")

    async def book_carrier(self) -> None:
        if not self.carrier_up:
            raise RuntimeError("carrier rejected the booking")

    async def approve(self) -> None:
        if self._approve_failures:
            self._approve_failures -= 1
            raise TransientError("approval service unavailable")
        self.order = "approved"


def order_saga(w: World) -> tuple[list[Compensable], Step, list[Step]]:
    return (
        [
            Compensable("create_order", w.create_order, w.cancel_order),
            Compensable("charge_payment", w.charge, w.refund),
            Compensable("reserve_stock", w.reserve, w.release),
        ],
        Step("book_carrier", w.book_carrier),  # the pivot
        [Step("approve_order", w.approve)],
    )


async def main() -> None:
    ok = World(capacity=1)
    assert (await run_saga(*order_saga(ok)))["status"] == "completed"
    assert ok.order == "approved" and ok.paid and ok.reserved == {"order-1"}

    flaky = World(capacity=1, approve_failures=2)
    assert (await run_saga(*order_saga(flaky)))["status"] == "completed"
    assert flaky.order == "approved" and flaky.reserved == {"order-1"}

    short = World(capacity=0)
    result = await run_saga(*order_saga(short))
    assert result["failed_at"] == "reserve_stock"
    assert short.order == "cancelled" and not short.paid

    refused = World(capacity=1, carrier_up=False)
    result = await run_saga(*order_saga(refused))
    assert result["failed_at"] == "book_carrier"
    assert refused.order == "cancelled" and not refused.paid and not refused.reserved


asyncio.run(main())
```

```ts
import assert from "node:assert/strict";

type Action = () => Promise<void>;
type Step = { name: string; action: Action };
type Compensable = Step & { compensate: Action }; // compensate must be idempotent
type SagaResult = { status: "completed" } | { status: "compensated"; failedAt: string };

class TransientError extends Error {}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(action: Action, attempts = 3, baseDelayMs = 100) {
  const total = Math.max(1, attempts);
  for (let i = 0; i < total; i++) {
    try {
      return await action();
    } catch (err) {
      if (!(err instanceof TransientError) || i === total - 1) throw err;
      await sleep(baseDelayMs * 2 ** i); // add jitter in production
    }
  }
}

async function runSaga(before: Compensable[], pivot: Step, after: Step[]): Promise<SagaResult> {
  const done: Compensable[] = [];
  let current = "";
  try {
    for (const step of before) {
      current = step.name;
      done.push(step); // compensate it too: its outcome is unknown if the call times out
      await step.action();
    }
    current = pivot.name;
    await pivot.action();
  } catch {
    for (const prev of [...done].reverse()) await prev.compensate();
    return { status: "compensated", failedAt: current };
  }
  for (const step of after) await retry(step.action); // throws when exhausted: escalate, never compensate
  return { status: "completed" };
}

class World {
  order = "none";
  paid = false;
  reserved = new Set<string>();
  constructor(private capacity: number, private carrierUp = true, private approveFailures = 0) {}
  createOrder = async () => { this.order = "pending"; };
  cancelOrder = async () => { this.order = "cancelled"; };
  charge = async () => { this.paid = true; };
  refund = async () => { this.paid = false; };
  reserve = async () => {
    if (this.reserved.has("order-1")) return; // redelivery of the same command
    if (this.reserved.size >= this.capacity) throw new Error("out of stock");
    this.reserved.add("order-1");
  };
  release = async () => { this.reserved.delete("order-1"); };
  bookCarrier = async () => {
    if (!this.carrierUp) throw new Error("carrier rejected the booking");
  };
  approve = async () => {
    if (this.approveFailures > 0) {
      this.approveFailures -= 1;
      throw new TransientError("approval service unavailable");
    }
    this.order = "approved";
  };
}

const orderSaga = (w: World): [Compensable[], Step, Step[]] => [
  [
    { name: "create_order", action: w.createOrder, compensate: w.cancelOrder },
    { name: "charge_payment", action: w.charge, compensate: w.refund },
    { name: "reserve_stock", action: w.reserve, compensate: w.release },
  ],
  { name: "book_carrier", action: w.bookCarrier }, // the pivot
  [{ name: "approve_order", action: w.approve }],
];

const ok = new World(1);
assert.equal((await runSaga(...orderSaga(ok))).status, "completed");
assert.ok(ok.order === "approved" && ok.paid && ok.reserved.has("order-1"));

const flaky = new World(1, true, 2);
assert.equal((await runSaga(...orderSaga(flaky))).status, "completed");
assert.ok(flaky.order === "approved" && flaky.reserved.has("order-1"));

const short = new World(0);
assert.deepEqual(await runSaga(...orderSaga(short)), { status: "compensated", failedAt: "reserve_stock" });
assert.ok(short.order === "cancelled" && !short.paid);

const refused = new World(1, false);
assert.deepEqual(await runSaga(...orderSaga(refused)), { status: "compensated", failedAt: "book_carrier" });
assert.ok(refused.order === "cancelled" && !refused.paid && refused.reserved.size === 0);
```

Three things this sketch leaves out that a real saga needs. The orchestrator's progress has to be stored, so a crash resumes instead of restarting. A compensation that throws needs a retry policy, because it must run to completion. And the result carries only the failed step's name: keep the exception text in logs under a correlation id, not in anything returned to a caller. A retryable step that exhausts its retries is escalated to an operator, never compensated.

## Writing compensations

- A compensation is a new transaction with the opposite business effect. It does not restore the earlier state, and the data may differ from where it started (a refund leaves a payment record behind).
- It need not run in exact reverse order, but reverse is the safe default.
- Make it an idempotent command, so a retry after a crash or timeout is harmless.
- It can fail. Record progress so the saga can resume, and give a blocked step a timeout.

## Handling the lack of isolation

Between steps, other requests see intermediate state. The reference catalogs these countermeasures, and the right ones depend on the business risk of an anomaly.

- Semantic lock: mark the record as in-progress (an order status of `pending`) so other flows treat it with care.
- Commutative updates: design updates that give the same result in any order, such as increments.
- Pessimistic view: reorder steps so updates that a dirty read could corrupt happen in retryable steps after the pivot.
- Reread value: read the record again before overwriting it, and abort if it changed.
- Version file: record the operations so out-of-order ones can be reordered.
- By value: choose the concurrency mechanism by the business risk of the request.

## Publishing the events and commands reliably

Each step must update its database and publish a message atomically, and a distributed transaction across the database and the broker is not available. Use the transactional outbox: write the message to an outbox table in the same transaction as the state change, and let a relay publish it. The relay can publish a message twice, so every participant must be idempotent. See [outbox.md](../../../design-patterns/references/resilience/outbox.md) and [idempotency-key.md](../../../design-patterns/references/resilience/idempotency-key.md).

## Operating a saga

- Carry a correlation id through every command and event so one order's flow can be traced across services.
- Store the saga's state (steps done, current step) so you can answer "where is order 42 stuck?".
- Alert on sagas older than their expected duration.
- Test the compensation paths as hard as the happy path. They run rarely and break quietly.

## Sources

- [Saga pattern (microservices.io)](https://microservices.io/patterns/data/saga.html)
- [Saga design pattern (Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)
- [Compensating Transaction pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)
- [Choreography pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography)
- [Transactional outbox (microservices.io)](https://microservices.io/patterns/data/transactional-outbox.html)
- [Saga pattern (AWS Prescriptive Guidance)](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/saga-pattern.html)
