# Unit of Work

## What it is and Problem it solves

A unit of work tracks the changes made during one business operation and writes them together, so they all commit or none do. Placing an order that inserts an order row and a payment row must not leave the order behind if the payment insert fails.

## Do you need this?

Usually the database transaction you already have is enough. With one write there is nothing to coordinate; with several, open one transaction around them. A separate class is warranted only when several repositories must share a transaction and the callers should not manage it by hand. The signal is a bug report about half-written data, such as an order with no payment row.

## Python

SQLAlchemy's `Session` is a unit of work. It tracks objects you add or change, flushes them together and commits once. `session.begin()` as a context manager commits on success and rolls back on an exception.

```python
from sqlalchemy import Engine, ForeignKey, create_engine, func, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column


class Base(DeclarativeBase):
    pass


class OrderRow(Base):
    __tablename__ = "orders"
    id: Mapped[str] = mapped_column(primary_key=True)
    total_cents: Mapped[int]


class PaymentRow(Base):
    __tablename__ = "payments"
    id: Mapped[str] = mapped_column(primary_key=True)
    order_id: Mapped[str] = mapped_column(ForeignKey("orders.id"))
    amount_cents: Mapped[int]


def place_order(engine: Engine, order_id: str, total_cents: int, paid_cents: int) -> None:
    with Session(engine) as session, session.begin():
        session.add(OrderRow(id=order_id, total_cents=total_cents))
        session.add(PaymentRow(id=f"pay-{order_id}", order_id=order_id, amount_cents=paid_cents))
        session.flush()
        if paid_cents != total_cents:
            raise ValueError("payment does not match the order total")


def count(engine: Engine) -> tuple[int, int]:
    with Session(engine) as session:
        return (session.scalar(select(func.count(OrderRow.id))) or 0,
                session.scalar(select(func.count(PaymentRow.id))) or 0)


engine = create_engine("sqlite://")
Base.metadata.create_all(engine)

place_order(engine, "o-1", 1999, 1999)
assert count(engine) == (1, 1)

try:
    place_order(engine, "o-2", 1999, 500)
except ValueError:
    pass
else:
    raise AssertionError("mismatched payment must fail")
assert count(engine) == (1, 1)
```

In the failed call both rows were flushed inside the transaction, then rolled back, so `count` still sees one of each. Repositories that take the same `Session` join this transaction.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Conn = { exec(sql: string): Promise<void> };
async function rollback(conn: Conn, original: unknown): Promise<void> {
  try {
    await conn.exec("ROLLBACK");
  } catch (rollbackErr) {
    if (original instanceof Error) original.cause = rollbackErr;
  }
}

export async function withTransaction<T>(conn: Conn, work: (conn: Conn) => Promise<T>): Promise<T> {
  await conn.exec("BEGIN");
  let result: T;
  try {
    result = await work(conn);
  } catch (err) {
    await rollback(conn, err);
    throw err;
  }
  await conn.exec("COMMIT");
  return result;
}

function recordingConn(failOn?: string): Conn & { log: string[] } {
  const log: string[] = [];
  return {
    log,
    async exec(sql) {
      log.push(sql);
      if (sql === failOn) throw new Error(`${sql} failed`);
    },
  };
}

async function placeOrder(conn: Conn, paidCents: number, totalCents: number): Promise<void> {
  await conn.exec("INSERT INTO orders ...");
  await conn.exec("INSERT INTO payments ...");
  if (paidCents !== totalCents) throw new Error("payment does not match the order total");
}

async function main(): Promise<void> {
  const ok = recordingConn();
  await withTransaction(ok, (c) => placeOrder(c, 1999, 1999));
  assert.deepEqual(ok.log, ["BEGIN", "INSERT INTO orders ...", "INSERT INTO payments ...", "COMMIT"]);
  const bad = recordingConn();
  await assert.rejects(withTransaction(bad, (c) => placeOrder(c, 500, 1999)), /does not match/);
  assert.deepEqual([bad.log.at(-1), bad.log.includes("COMMIT")], ["ROLLBACK", false]);
  const brokenRollback = recordingConn("ROLLBACK");
  await assert.rejects(withTransaction(brokenRollback, (c) => placeOrder(c, 500, 1999)), (err: Error) =>
    /does not match/.test(err.message) && /ROLLBACK failed/.test(String(err.cause)));
  const brokenCommit = recordingConn("COMMIT");
  await assert.rejects(withTransaction(brokenCommit, (c) => placeOrder(c, 1999, 1999)), /COMMIT failed/);
  assert.ok(!brokenCommit.log.includes("ROLLBACK"));
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

node-postgres gives you `BEGIN` and `COMMIT` as plain queries, so a small function that takes the work as an argument does the job. `withTransaction` rolls back when `work` throws and rethrows the original error; a failing rollback rides along as `cause`. A failed `COMMIT` surfaces as it is, with no `ROLLBACK` after it.

## In production

- SQLAlchemy `Session` (above), with `session.begin()` as the commit-or-rollback scope. Use one session per request, never one shared by concurrent tasks.
- Nested units of work need savepoints. A wrapper that always issues `BEGIN` fails or commits early inside another one, so pass the open connection down.
- Keep the transaction short. Do not call an external API between `BEGIN` and `COMMIT`, since the locks stay held while you wait. Use an [Outbox](../resilience/outbox.md) for the follow-up call.

## Smells and misuse

- A hand-written `UnitOfWork` class that wraps `Session` and re-exposes `add`, `commit` and `rollback` with no added behavior.
- Catching the exception inside the `with` block, or sharing one global session across requests.

## Related

- [Repository](repository.md) is what you hand the transaction to.
- [Outbox](../resilience/outbox.md) writes an event inside the same unit of work.
