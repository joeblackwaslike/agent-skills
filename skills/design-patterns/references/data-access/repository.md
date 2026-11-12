# Repository

## What it is and Problem it solves

A repository is a collection-like interface for loading and saving domain objects, such as `get(order_id)` and `save(order)`. The domain code talks to that interface and never sees SQL, an ORM session or an HTTP client. Without it, query details spread through the services, and every test needs a database.

## Do you need this?

Probably not yet. If one module reads and writes one table, call the query function or the ORM directly. A function `load_order(session, order_id)` is already a repository without the ceremony.

Add the interface when business logic you want to test without a database reads and writes the same objects in several places. A test that needs a running Postgres to check a cancellation rule is the observable signal, and so is a plan to change storage that would touch every service.

For aggregates (one repository per aggregate root, whole-aggregate load and save), follow [domain-driven-design](../../../domain-driven-design/SKILL.md). This file covers only the plain mechanism.

## Python

```python
from dataclasses import dataclass, replace
from enum import StrEnum
from typing import Protocol


class Status(StrEnum):
    PENDING = "pending"
    CANCELLED = "cancelled"
    PAID = "paid"


@dataclass(frozen=True)
class Order:
    id: str
    status: Status = Status.PENDING

    def cancel(self) -> "Order":
        if self.status is not Status.PENDING:
            raise ValueError(f"cannot cancel a {self.status} order")
        return replace(self, status=Status.CANCELLED)


class OrderRepository(Protocol):
    def get(self, order_id: str) -> Order | None: ...
    def save(self, order: Order) -> None: ...
    def pending(self) -> list[Order]: ...


class InMemoryOrderRepository:
    def __init__(self) -> None:
        self._rows: dict[str, Order] = {}

    def get(self, order_id: str) -> Order | None:
        return self._rows.get(order_id)

    def save(self, order: Order) -> None:
        self._rows[order.id] = order

    def pending(self) -> list[Order]:
        return [o for o in self._rows.values() if o.status is Status.PENDING]


def cancel_order(repo: OrderRepository, order_id: str) -> Order:
    order = repo.get(order_id)
    if order is None:
        raise LookupError(order_id)
    cancelled = order.cancel()
    repo.save(cancelled)
    return cancelled


repo = InMemoryOrderRepository()
repo.save(Order("o-1"))
repo.save(Order("o-2", Status.PAID))
assert [o.id for o in repo.pending()] == ["o-1"]
assert cancel_order(repo, "o-1").status is Status.CANCELLED
assert repo.pending() == []
assert repo.get("o-1") == Order("o-1", Status.CANCELLED)
try:
    cancel_order(repo, "o-2")
except ValueError:
    pass
else:
    raise AssertionError("paid orders must not cancel")
```

`cancel_order` runs against the in-memory fake in tests and against a SQL-backed class in production. Both satisfy the `Protocol` without inheriting from it. `pending` is a finder named for the domain. `Order` is a frozen dataclass, so the fake cannot hand out an object that later edits would change behind the repository's back.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Order = { readonly id: string; readonly status: "pending" | "paid" | "cancelled" };

export interface OrderRepository {
  get(id: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  pending(): Promise<Order[]>;
}

export function inMemoryOrders(): OrderRepository {
  const rows = new Map<string, Order>();
  return {
    async get(id) {
      return rows.get(id);
    },
    async save(order) {
      rows.set(order.id, order);
    },
    async pending() {
      return [...rows.values()].filter((o) => o.status === "pending");
    },
  };
}

export function cancel(order: Order): Order {
  if (order.status !== "pending") throw new Error(`cannot cancel a ${order.status} order`);
  return { ...order, status: "cancelled" };
}

export async function cancelOrder(repo: OrderRepository, id: string): Promise<Order> {
  const order = await repo.get(id);
  if (order === undefined) throw new Error(`order ${id} not found`);
  const cancelled = cancel(order);
  await repo.save(cancelled);
  return cancelled;
}

async function main(): Promise<void> {
  const repo = inMemoryOrders();
  await repo.save({ id: "o-1", status: "pending" });
  await repo.save({ id: "o-2", status: "paid" });
  assert.deepEqual((await repo.pending()).map((o) => o.id), ["o-1"]);
  assert.equal((await cancelOrder(repo, "o-1")).status, "cancelled");
  assert.deepEqual(await repo.pending(), []);
  await assert.rejects(cancelOrder(repo, "o-2"), /cannot cancel/);
  await assert.rejects(cancelOrder(repo, "constructor"), /not found/);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

The rows live in a `Map`, so a lookup for `"constructor"` returns `undefined` instead of an inherited function. Every method is async because a real implementation will be, and callers should not change when you swap it in. The cancel rule sits in the domain function `cancel`, as in the Python `Order.cancel`, so the repository only loads and saves.

## In production

- SQLAlchemy's `Session` is already repository-like. Wrap it only at the domain boundary.
- A SQL repository maps rows to domain objects inside its methods (see [DTO and Mapper](dto-mapper.md)) and takes its session or connection from the caller, so one [Unit of Work](unit-of-work.md) can span several repositories.
- Run the same contract tests against the fake and the real implementation so the fake cannot drift.
- Read-heavy screens often skip the repository and run a dedicated query. A repository earns its place on writes and rule checks.

## Smells and misuse

- Returning ORM entities. Lazy-loaded attributes, session state and `Query` objects leak into services, and a read after the session closes fails far from the cause. Map to domain types at the edge.
- A repository per table instead of per aggregate, with callers stitching the pieces together.
- Generic `Repository[T]` with `find_by(**filters)`. It forwards the query language to callers and removes the point of the interface.
- Methods named after the query (`select_where_status`) when the domain has a word for it (`pending`).
- A repository that commits on its own. Transaction scope belongs to the caller.
- Get-then-save with no concurrency check, so two requests overwrite each other (a lost update). Add a version column, or `SELECT ... FOR UPDATE`, and pass the loaded version to `save`.
- Mapping ORM rows to domain objects one lazy relationship at a time, which causes N+1 queries. Load what the aggregate needs eagerly inside the repository.
- An interface with one implementation and no tests that use a fake.

## Related

- [Unit of Work](unit-of-work.md) owns the transaction the repositories share.
- [DTO and Mapper](dto-mapper.md) does the row-to-domain conversion inside the SQL implementation.
- [Dependency Injection](../creational/dependency-injection.md) is how the repository reaches the service.
- [domain-driven-design](../../../domain-driven-design/SKILL.md) covers aggregate repositories.
