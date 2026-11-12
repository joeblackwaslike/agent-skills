# Outbox

## What it is and Problem it solves

The outbox pattern stores an event in an `outbox` table inside the same transaction as the data change, and a separate relay publishes it afterwards. It fixes the dual-write problem. Saving an order and publishing `order.placed` touch two systems, and if the process dies between them you either lose the event or announce an order that was rolled back.

## Do you need this?

Not if nothing downstream depends on the event or losing one is acceptable (a metrics ping). Calling the broker right after the commit is simpler, but a crash or broker failure at that moment loses the event unless something retries it.

You need the outbox when a lost event leaves the system wrong: an order saved but never sent to fulfillment, or a payment recorded with no receipt. The observable signal is records in your database with no matching message downstream after a crash or deploy. Publishing before the commit is worse, since it can announce data that never persisted.

## Python

`sqlite3` stands in for a database here, with a temporary file so two relays can compete. `place_order` writes both rows and leaves the commit to the caller. The relay runs on its own autocommit connection (`isolation_level=None`) and wraps each row in an explicit `BEGIN IMMEDIATE`. That statement takes SQLite's write lock before anything is read or published, so a second relay cannot start its own write transaction until the first commits. The relay rechecks the row inside the transaction, publishes, marks it and commits. SQLite has no per-row locks, so the lock is database-wide. A failure rolls back, records `attempts` and `last_error`, logs the row id, and the loop moves on, so one poison row cannot block the rest.

```python
import json
import logging
import sqlite3
import tempfile
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


def relay_connection(path: str) -> sqlite3.Connection:
    return sqlite3.connect(path, isolation_level=None, timeout=0)


def relay_once(conn: sqlite3.Connection, publish: Callable[[Message], None], batch: int = 10) -> int:
    ids: list[tuple[int]] = conn.execute(
        "SELECT id FROM outbox WHERE published = 0 AND attempts < ? ORDER BY id LIMIT ?", (MAX_ATTEMPTS, batch)
    ).fetchall()
    sent = 0
    for (row_id,) in ids:
        try:
            conn.execute("BEGIN IMMEDIATE")
        except sqlite3.OperationalError:
            continue
        try:
            row: Message | None = conn.execute(
                "SELECT id, topic, payload FROM outbox WHERE id = ? AND published = 0 AND attempts < ?",
                (row_id, MAX_ATTEMPTS),
            ).fetchone()
            if row is not None:
                publish(row)
                conn.execute("UPDATE outbox SET published = 1 WHERE id = ?", (row_id,))
                sent += 1
            conn.execute("COMMIT")
        except Exception as err:
            if conn.in_transaction:
                conn.execute("ROLLBACK")
            log.warning("outbox row %s failed: %s", row_id, err)
            conn.execute("UPDATE outbox SET attempts = attempts + 1, last_error = ? WHERE id = ?", (str(err), row_id))
    return sent


COUNTS = "SELECT (SELECT COUNT(*) FROM orders), (SELECT COUNT(*) FROM outbox)"
tmp = tempfile.TemporaryDirectory()
db = f"{tmp.name}/shop.db"
shop = sqlite3.connect(db)
shop.executescript(SCHEMA)
try:
    with shop:
        place_order(shop, "o-1", 1999)
        raise RuntimeError("crash before commit")
except RuntimeError:
    pass
assert shop.execute(COUNTS).fetchone() == (0, 0)

with shop:
    for order_id in ("o-1", "o-2", "o-3"):
        place_order(shop, order_id, 100)
assert shop.execute(COUNTS).fetchone() == (3, 3)

relay, rival = relay_connection(db), relay_connection(db)
delivered: list[int] = []
rival_sent: list[int] = []
seen: set[int] = set()
handled: list[str] = []
crashes = [True]


def consume(message: Message) -> None:
    if message[0] not in seen:
        seen.add(message[0])
        handled.append(message[2])


def publish(message: Message) -> None:
    assert relay.in_transaction
    rival_sent.append(relay_once(rival, lambda _: None))
    if message[0] == 2:
        raise ConnectionError("broker rejects this payload")
    delivered.append(message[0])
    consume(message)
    if crashes:
        crashes.pop()
        raise ConnectionError("relay died after the broker accepted the message")


assert [relay_once(relay, publish) for _ in range(4)] == [1, 1, 0, 0]
assert rival_sent and set(rival_sent) == {0}
assert delivered == [1, 3, 1] and len(handled) == 2
assert shop.execute("SELECT id, attempts FROM outbox WHERE published = 0").fetchall() == [(2, 3)]
for connection in (shop, relay, rival):
    connection.close()
tmp.cleanup()
```

The rollback test shows both rows disappear together. Inside `publish` the relay's transaction is open (`relay.in_transaction`), and a rival relay trying to claim a row at that moment gets nothing (`rival_sent` is all zeros) because its `BEGIN IMMEDIATE` fails. Row 1 reaches the broker, the relay "crashes" before marking it, and the next pass sends it again. That is at-least-once delivery, visible as `delivered == [1, 3, 1]`. Row 2 fails three times and then stays unpublished for an operator, while row 3 goes out on the first pass. The `seen` set stands in for consumer dedupe. A real consumer records the event id in its own database, in the same transaction as its side effect.

## TypeScript

`transaction` is a toy for synchronous work. It swaps a copy in only if `work` returns, and it would not roll back work that awaits. It covers the write side only. The TypeScript relay takes no lock, so it is safe for a single relay and shows the publish-then-mark order; several relays need the claim step from the Python sample or the Postgres notes below.

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

- Postgres locks per row, unlike the SQLite sample, which takes a database-wide write lock. With several relays, claim rows with `SELECT ... FOR UPDATE SKIP LOCKED` in a transaction that touches only outbox rows. That transaction holds the row lock across exactly one publish, as the Python sample does for the whole database, so cap the batch and set a publish timeout. The trade-off is a pinned connection and row lock for as long as the broker is slow, and a crashed relay releases the lock at once. The alternative is to claim by setting `locked_until` in a quick transaction, publish with no transaction open, then mark the row in a second quick one. The transactions stay short, but a relay that dies mid-publish leaves the row hidden until the lease expires, and the retry may duplicate the message. Either way, keep the relay's transaction apart from any business transaction.
- Delivery is at-least-once and ordering can break across retries. Consumers dedupe by event id or are idempotent by nature (see [Idempotency key](idempotency-key.md)).
- Delete or archive published rows on a schedule. Alert on the age of the oldest unpublished row and on rows past `MAX_ATTEMPTS`, since a stuck relay looks healthy everywhere else.
- Publish with [retry](retry-backoff.md) and [circuit breaker](circuit-breaker.md) policies, because the relay is where broker outages land.

## Smells and misuse

- Publishing to the broker inside the business transaction. It holds locks on business rows while waiting on the network and still is not atomic. The relay's own per-row transaction touches only outbox rows.
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
