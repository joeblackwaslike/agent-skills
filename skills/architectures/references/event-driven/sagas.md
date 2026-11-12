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

This is an illustration, not a pattern copied from a reference implementation. An order moves through four services. Each step before the pivot has a compensation. The step after it has none and is retried instead.

| Step | Action | Compensation |
| --- | --- | --- |
| 1 | Create the order as pending | Cancel the order |
| 2 | Charge the payment | Refund the payment |
| 3 | Reserve stock (the pivot: after this, the order will ship) | Release the stock |
| 4 | Approve the order | None, retried until it succeeds |

An orchestrator runs the steps in order. On a failure it runs the compensations of the completed steps in reverse. The participants below are in-memory fakes so the example runs on its own.

```python
import asyncio
from collections.abc import Awaitable, Callable
from dataclasses import dataclass


@dataclass
class Step:
    name: str
    action: Callable[[], Awaitable[None]]
    compensate: Callable[[], Awaitable[None]] | None = None
    retries: int = 0  # more than 0 marks a retryable step after the pivot


async def attempt(step: Step) -> None:
    for tries in range(step.retries + 1):
        try:
            await step.action()
            return
        except Exception:
            if tries == step.retries:
                raise


async def run_saga(steps: list[Step]) -> dict:
    done: list[Step] = []
    for step in steps:
        try:
            await attempt(step)
        except Exception as exc:
            if step.retries:
                raise  # past the pivot: never compensate, escalate to an operator
            for prev in reversed(done):
                if prev.compensate:
                    await prev.compensate()
            return {"status": "compensated", "failed_at": step.name, "error": str(exc)}
        done.append(step)
    return {"status": "completed"}


class World:
    def __init__(self, stock: int, approve_failures: int = 0) -> None:
        self.stock = stock
        self.order = "none"
        self.paid = False
        self._approve_failures = approve_failures

    async def create_order(self) -> None: self.order = "pending"
    async def cancel_order(self) -> None: self.order = "cancelled"
    async def charge(self) -> None: self.paid = True
    async def refund(self) -> None: self.paid = False

    async def reserve(self) -> None:
        if self.stock < 1:
            raise RuntimeError("out of stock")
        self.stock -= 1

    async def release(self) -> None: self.stock += 1

    async def approve(self) -> None:
        if self._approve_failures:
            self._approve_failures -= 1
            raise RuntimeError("approval service unavailable")
        self.order = "approved"


def order_saga(w: World) -> list[Step]:
    return [
        Step("create_order", w.create_order, w.cancel_order),
        Step("charge_payment", w.charge, w.refund),
        Step("reserve_stock", w.reserve, w.release),  # the pivot
        Step("approve_order", w.approve, retries=3),
    ]


async def main() -> None:
    ok = World(stock=1)
    assert (await run_saga(order_saga(ok)))["status"] == "completed"
    assert ok.order == "approved" and ok.paid and ok.stock == 0

    flaky = World(stock=1, approve_failures=2)
    assert (await run_saga(order_saga(flaky)))["status"] == "completed"
    assert flaky.order == "approved" and flaky.stock == 0

    short = World(stock=0)
    result = await run_saga(order_saga(short))
    assert result["failed_at"] == "reserve_stock"
    assert short.order == "cancelled" and not short.paid


asyncio.run(main())
```

```ts
import assert from "node:assert/strict";

type Step = {
  name: string;
  action: () => Promise<void>;
  compensate?: () => Promise<void>;
  retries?: number; // above 0 marks a retryable step after the pivot
};

async function attempt(step: Step) {
  const retries = step.retries ?? 0;
  for (let tries = 0; tries <= retries; tries++) {
    try {
      return await step.action();
    } catch (err) {
      if (tries === retries) throw err;
    }
  }
}

async function runSaga(steps: Step[]) {
  const done: Step[] = [];
  for (const step of steps) {
    try {
      await attempt(step);
    } catch (err) {
      if (step.retries) throw err; // past the pivot: never compensate, escalate to an operator
      for (const prev of [...done].reverse()) await prev.compensate?.();
      return { status: "compensated", failedAt: step.name, error: String(err) };
    }
    done.push(step);
  }
  return { status: "completed" };
}

class World {
  order = "none";
  paid = false;
  constructor(public stock: number, private approveFailures = 0) {}
  createOrder = async () => { this.order = "pending"; };
  cancelOrder = async () => { this.order = "cancelled"; };
  charge = async () => { this.paid = true; };
  refund = async () => { this.paid = false; };
  reserve = async () => {
    if (this.stock < 1) throw new Error("out of stock");
    this.stock -= 1;
  };
  release = async () => { this.stock += 1; };
  approve = async () => {
    if (this.approveFailures > 0) {
      this.approveFailures -= 1;
      throw new Error("approval service unavailable");
    }
    this.order = "approved";
  };
}

const orderSaga = (w: World): Step[] => [
  { name: "create_order", action: w.createOrder, compensate: w.cancelOrder },
  { name: "charge_payment", action: w.charge, compensate: w.refund },
  { name: "reserve_stock", action: w.reserve, compensate: w.release }, // the pivot
  { name: "approve_order", action: w.approve, retries: 3 },
];

const ok = new World(1);
assert.equal((await runSaga(orderSaga(ok))).status, "completed");
assert.ok(ok.order === "approved" && ok.paid && ok.stock === 0);

const flaky = new World(1, 2);
assert.equal((await runSaga(orderSaga(flaky))).status, "completed");
assert.ok(flaky.order === "approved" && flaky.stock === 0);

const short = new World(0);
const result = await runSaga(orderSaga(short));
assert.equal(result.failedAt, "reserve_stock");
assert.ok(short.order === "cancelled" && !short.paid);
```

Two things this sketch leaves out that a real saga needs. The orchestrator's progress has to be stored, so a crash resumes instead of restarting. And a compensation that throws needs a retry policy, because it must run to completion. A retryable step that exhausts its retries is escalated to an operator, never compensated.

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
