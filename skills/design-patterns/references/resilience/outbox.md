# Outbox

## What it is and Problem it solves

The outbox pattern stores an event in an `outbox` table inside the same transaction as the data change, and a separate relay publishes it afterwards. It fixes the dual-write problem. Saving an order and publishing `order.placed` touch two systems, and if the process dies between them you either lose the event or announce an order that was rolled back.

## Do you need this?

Not if nothing downstream depends on the event or losing one is acceptable (a metrics ping). Calling the broker right after the commit is simpler, but a crash or broker failure at that moment loses the event unless something retries it.

You need the outbox when a lost event leaves the system wrong: an order saved but never sent to fulfillment, or a payment recorded with no receipt. The observable signal is records in your database with no matching message downstream after a crash or deploy. Publishing before the commit is worse, since it can announce data that never persisted.

## Python

`sqlite3` stands in for any database. `place_order` writes both rows and leaves the commit to the caller. The relay publishes and marks each row in one short transaction on outbox rows only. A failure records `attempts` and `last_error`, logs the row id, and the loop moves on, so one poison row cannot block the rest.

```python
import json
import logging
import sqlite3
from collections.abc import Callable

MAX_ATTEMPTS = 3
SCHEMA = """
CREATE TABLE orders (id TEXT PRIMARY KEY, total_cents INTEGER NOT NULL);
CREATE TABLE outbox (id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT NOT NULL, payload TEXT NOT NULL,
                     published INTEGER NOT NULL DEFAULT 0, attempts INTEGER NOT NULL DEFAULT 0, last_error TEXT);
"""
Message = tuple[int, str, str]
log = logging.getLogger("outbox")


def place_order(conn: sqlite3.Connection, order_id: str, total_cents: int) -> None:
    conn.execute("INSERT INTO orders (id, total_cents) VALUES (?, ?)", (order_id, total_cents))
    event = json.dumps({"order_id": order_id, "total_cents": total_cents})
    conn.execute("INSERT INTO outbox (topic, payload) VALUES (?, ?)", ("order.placed", event))


def relay_once(conn: sqlite3.Connection, publish: Callable[[Message], None], batch: int = 10) -> int:
    rows: list[Message] = conn.execute(
        "SELECT id, topic, payload FROM outbox WHERE published = 0 AND attempts < ? ORDER BY id LIMIT ?",
        (MAX_ATTEMPTS, batch),
    ).fetchall()
    sent = 0
    for row in rows:
        try:
            with conn:
                publish(row)
                conn.execute("UPDATE outbox SET published = 1 WHERE id = ?", (row[0],))
            sent += 1
        except Exception as err:
            log.warning("outbox row %s failed: %s", row[0], err)
            with conn:
                conn.execute("UPDATE outbox SET attempts = attempts + 1, last_error = ? WHERE id = ?", (str(err), row[0]))
    return sent


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
    for order_id in ("o-1", "o-2", "o-3"):
        place_order(conn, order_id, 100)
assert conn.execute(COUNTS).fetchone() == (3, 3)

delivered: list[int] = []
seen: set[int] = set()
handled: list[str] = []
crashes = [True]


def consume(message: Message) -> None:
    if message[0] not in seen:
        seen.add(message[0])
        handled.append(message[2])


def publish(message: Message) -> None:
    if message[0] == 2:
        raise ConnectionError("broker rejects this payload")
    delivered.append(message[0])
    consume(message)
    if crashes:
        crashes.pop()
        raise ConnectionError("relay died after the broker accepted the message")


assert [relay_once(conn, publish) for _ in range(4)] == [1, 1, 0, 0]
assert delivered == [1, 3, 1] and len(handled) == 2
assert conn.execute("SELECT id, attempts FROM outbox WHERE published = 0").fetchall() == [(2, 3)]
```

The rollback test shows both rows disappear together. Row 1 reaches the broker, the relay "crashes" before marking it, and the next pass sends it again. That is at-least-once delivery, visible as `delivered == [1, 3, 1]`. Row 2 fails three times and then stays unpublished for an operator, while row 3 goes out on the first pass. The `seen` set stands in for consumer dedupe. A real consumer records the event id in its own database, in the same transaction as its side effect.

## TypeScript

`transaction` is a toy for synchronous work. It swaps a copy in only if `work` returns, and it would not roll back work that awaits.

```typescript
import assert from "node:assert/strict";

type Row = { id: number; payload: string; published: boolean; attempts: number; lastError?: string };
type Db = { orders: Map<string, number>; outbox: Row[]; nextId: number };
type Message = { id: number; payload: string };
const MAX_ATTEMPTS = 3;

export function transaction(db: Db, work: (tx: Db) => void): void {
  const tx: Db = { ...db, orders: new Map(db.orders), outbox: db.outbox.map((row) => ({ ...row })) };
  work(tx);
  Object.assign(db, tx);
}

export function placeOrder(tx: Db, orderId: string, totalCents: number): void {
  tx.orders.set(orderId, totalCents);
  const payload = JSON.stringify({ orderId, totalCents });
  tx.outbox.push({ id: tx.nextId++, payload, published: false, attempts: 0 });
}

export async function relayOnce(db: Db, publish: (m: Message) => Promise<void>): Promise<number> {
  let sent = 0;
  for (const row of db.outbox.filter((r) => !r.published && r.attempts < MAX_ATTEMPTS)) {
    try {
      await publish({ id: row.id, payload: row.payload });
      row.published = true;
      sent++;
    } catch (err) {
      Object.assign(row, { attempts: row.attempts + 1, lastError: String(err) });
      console.warn(`outbox row ${row.id} failed: ${String(err)}`);
    }
  }
  return sent;
}

async function main(): Promise<void> {
  const db: Db = { orders: new Map(), outbox: [], nextId: 1 };
  assert.throws(() => transaction(db, (tx) => { placeOrder(tx, "o-1", 1999); throw new Error("crash"); }));
  assert.deepEqual([db.orders.size, db.outbox.length], [0, 0]);
  transaction(db, (tx) => ["o-1", "o-2", "o-3"].forEach((id) => placeOrder(tx, id, 100)));

  const seen = new Set<number>();
  const handled: string[] = [];
  const delivered: number[] = [];
  let crashes = 1;
  const publish = async (m: Message): Promise<void> => {
    if (m.id === 2) throw new Error("broker rejects this payload");
    delivered.push(m.id);
    if (!seen.has(m.id)) { seen.add(m.id); handled.push(m.payload); }
    if (crashes-- > 0) throw new Error("relay died after the broker accepted the message");
  };
  const sent = [await relayOnce(db, publish), await relayOnce(db, publish), await relayOnce(db, publish), await relayOnce(db, publish)];
  assert.deepEqual([sent, delivered, handled.length], [[1, 1, 0, 0], [1, 3, 1], 2]);
  assert.deepEqual(db.outbox.filter((r) => !r.published).map((r) => r.id), [2]);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

## In production

- With several relays on Postgres, claim rows with `SELECT ... FOR UPDATE SKIP LOCKED` inside a short transaction that touches only outbox rows, publish while holding the lock, then mark the rows published and commit. The claim and the update share one transaction, and a crashed relay releases its locks. Keep that transaction apart from any business transaction and never hold it across slow work. A `locked_until` lease column does the same job without a long lock.
- Delivery is at-least-once and ordering can break across retries. Consumers dedupe by event id or are idempotent by nature (see [Idempotency key](idempotency-key.md)).
- Delete or archive published rows on a schedule. Alert on the age of the oldest unpublished row and on rows past `MAX_ATTEMPTS`, since a stuck relay looks healthy everywhere else.
- Publish with [retry](retry-backoff.md) and [circuit breaker](circuit-breaker.md) policies, because the relay is where broker outages land.

## Smells and misuse

- Publishing to the broker inside the business transaction. It holds those locks while waiting on the network and still is not atomic.
- Marking a row published before the broker confirms, which turns at-least-once into at-most-once.
- A consumer that assumes exactly-once and has no dedupe.
- A relay that retries a poison row forever, or fails without logging the row id, so one bad message blocks or hides the ones behind it.
- Large or secret payloads in the outbox row. Store ids and let consumers fetch.
- Ordering assumed across rows when several relays or retries can reorder them. Carry a sequence number if consumers need order.
- An outbox table nobody prunes, or nobody alerts on, so a stuck relay shows up as a growing table weeks later.
- Using the outbox where the event is not tied to a database write, or where losing it is harmless.

## Related

- [Unit of Work](../data-access/unit-of-work.md) provides the transaction that holds both writes.
- [Observer](../behavioral/observer.md) is the in-process version; the outbox is the durable one.
- [domain-driven-design](../../../domain-driven-design/SKILL.md) for domain events and where they are raised.
