# Outbox

## What it is and Problem it solves

The outbox pattern stores an event in an `outbox` table inside the same transaction as the data change, and a separate relay publishes it afterwards. It fixes the dual-write problem: saving an order and publishing `order.placed` touch two systems, and if the process dies between them you either lose the event or announce an order that was rolled back.

## Do you need this?

Not if nothing downstream depends on the event or losing one is acceptable (a metrics ping). Calling the broker after the commit is simpler and rarely fails. You need it when a lost event leaves the system wrong: an order saved but never sent to fulfillment, or a payment recorded with no receipt. The observable signal is records in your database with no matching message downstream after a crash or deploy. Publishing before the commit is worse, since it can announce data that never persisted.

## Python

`sqlite3` stands in for any database. `place_order` writes both rows and leaves the commit to the caller, so one transaction covers them.

```python
import json
import sqlite3
from collections.abc import Callable
SCHEMA = """
CREATE TABLE orders (id TEXT PRIMARY KEY, total_cents INTEGER NOT NULL);
CREATE TABLE outbox (id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT NOT NULL,
                     payload TEXT NOT NULL, published INTEGER NOT NULL DEFAULT 0);
"""
Message = tuple[int, str, str]
def place_order(conn: sqlite3.Connection, order_id: str, total_cents: int) -> None:
    conn.execute("INSERT INTO orders (id, total_cents) VALUES (?, ?)", (order_id, total_cents))
    event = json.dumps({"order_id": order_id, "total_cents": total_cents})
    conn.execute("INSERT INTO outbox (topic, payload) VALUES (?, ?)", ("order.placed", event))
def relay_once(conn: sqlite3.Connection, publish: Callable[[Message], None], batch: int = 10) -> int:
    rows: list[Message] = conn.execute(
        "SELECT id, topic, payload FROM outbox WHERE published = 0 ORDER BY id LIMIT ?", (batch,)
    ).fetchall()
    for row in rows:
        publish(row)
        with conn:
            conn.execute("UPDATE outbox SET published = 1 WHERE id = ?", (row[0],))
    return len(rows)
COUNTS = "SELECT (SELECT COUNT(*) FROM orders), (SELECT COUNT(*) FROM outbox)"
conn = sqlite3.connect(":memory:")
conn.executescript(SCHEMA)
try:
    with conn:
        place_order(conn, "o-1", 1999)
        raise RuntimeError("crash before commit")
except RuntimeError:
    pass
assert conn.execute(COUNTS).fetchone() == (0, 0)

with conn:
    place_order(conn, "o-1", 1999)
    place_order(conn, "o-2", 500)
assert conn.execute(COUNTS).fetchone() == (2, 2)

delivered: list[int] = []
handled: list[str] = []
crashes = [True]


def publish(message: Message) -> None:
    delivered.append(message[0])
    if message[0] not in delivered[:-1]:
        handled.append(message[2])
    if crashes:
        crashes.pop()
        raise ConnectionError("relay died after the broker accepted the message")


try:
    relay_once(conn, publish)
except ConnectionError:
    pass
assert relay_once(conn, publish) == 2 and relay_once(conn, publish) == 0
assert delivered == [1, 1, 2] and len(handled) == 2
```

The rollback test shows both rows disappear together. The relay marks a message published only after `publish` returns, so a crash in between sends it again. That is at-least-once delivery, visible as `delivered == [1, 1, 2]`. The consumer side of `publish` drops the repeat by id and handles each event once.

## TypeScript

`transaction` copies the state and swaps it in only if `work` returns, standing in for a real transaction.

```typescript
import assert from "node:assert/strict";

type OutboxRow = { id: number; topic: string; payload: string; published: boolean };
type Db = { orders: Map<string, number>; outbox: OutboxRow[] };
type Message = { id: number; payload: string };

export function transaction<T>(db: Db, work: (tx: Db) => T): T {
  const tx: Db = { orders: new Map(db.orders), outbox: db.outbox.map((row) => ({ ...row })) };
  const result = work(tx);
  [db.orders, db.outbox] = [tx.orders, tx.outbox];
  return result;
}
export function placeOrder(tx: Db, orderId: string, totalCents: number): void {
  tx.orders.set(orderId, totalCents);
  const payload = JSON.stringify({ orderId, totalCents });
  tx.outbox.push({ id: tx.outbox.length + 1, topic: "order.placed", payload, published: false });
}
export async function relayOnce(db: Db, publish: (m: Message) => Promise<void>): Promise<number> {
  const pending = db.outbox.filter((row) => !row.published);
  for (const row of pending) {
    await publish({ id: row.id, payload: row.payload });
    row.published = true;
  }
  return pending.length;
}

async function main(): Promise<void> {
  const db: Db = { orders: new Map(), outbox: [] };
  assert.throws(() => transaction(db, (tx) => { placeOrder(tx, "o-1", 1999); throw new Error("crash"); }));
  assert.deepEqual([db.orders.size, db.outbox.length], [0, 0]);
  transaction(db, (tx) => { placeOrder(tx, "o-1", 1999); placeOrder(tx, "o-2", 500); });

  const seen = new Set<number>();
  const [handled, delivered]: [string[], number[]] = [[], []];
  let crashes = 1;
  const publish = async (m: Message): Promise<void> => {
    delivered.push(m.id);
    if (!seen.has(m.id)) { seen.add(m.id); handled.push(m.payload); }
    if (crashes-- > 0) throw new Error("relay died after the broker accepted the message");
  };
  await assert.rejects(relayOnce(db, publish), /relay died/);
  assert.deepEqual([await relayOnce(db, publish), await relayOnce(db, publish)], [2, 0]);
  assert.deepEqual([delivered, handled.length], [[1, 1, 2], 2]);
}

main().catch((err: unknown) => void (console.error(err), process.exit(1)));
```

## In production

- Poll as above, using `SELECT ... FOR UPDATE SKIP LOCKED` in Postgres when several relays run. Change data capture on the outbox table is the alternative when polling latency matters.
- Delivery is at-least-once, and ordering can break across retries. Consumers need dedupe by event id, stored in the same transaction as their own side effects, or must be idempotent by nature (see [Idempotency key](idempotency-key.md)).
- Delete or archive published rows on a schedule. Alert on the age of the oldest unpublished row, since a stuck relay looks healthy everywhere else.
- Publish with [retry](retry-backoff.md) and [circuit breaker](circuit-breaker.md) policies, because the relay is where broker outages land.

## Smells and misuse

- Publishing to the broker inside the database transaction. It holds locks while waiting on the network and still is not atomic.
- Marking a row published before the broker confirms, which turns at-least-once into at-most-once.
- A consumer that assumes exactly-once and has no dedupe, or large and secret payloads in the outbox row (store ids instead).

## Related

- [Unit of Work](../data-access/unit-of-work.md) provides the transaction that holds both writes.
- [Observer](../behavioral/observer.md) is the in-process version; the outbox is the durable one.
