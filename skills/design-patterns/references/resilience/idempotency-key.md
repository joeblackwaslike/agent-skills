# Idempotency key

## What it is and Problem it solves

An idempotency key is a unique value the client sends with a request so the server can recognize a repeat. The server runs the operation once, stores the response under the key, and replays it for duplicates. A client that times out cannot know whether the first attempt ran, so it resends the same key and gets a safe answer.

## Do you need this?

Not for reads or naturally repeatable writes (`PUT` of a full resource, delete by id). You need one when a repeated request has a side effect: charging a card, creating an order, sending an email. The observable signal is a duplicate row or double charge after a client timeout or a double-click. The plain alternative is a unique constraint on a natural business key (one payment per order id), which works whenever such a key exists.

## Python

```python
import hashlib, json
from collections.abc import Callable
from dataclasses import dataclass

TTL = 24 * 3600
Response = dict[str, str]
class InFlight(Exception): ...
class KeyReuse(Exception): ...
@dataclass
class Record:
    fingerprint: str
    expires_at: float
    response: Response | None = None

class IdempotencyStore:
    def __init__(self, clock: Callable[[], float]) -> None:
        self._clock = clock
        self._records: dict[tuple[str, str], Record] = {}

    def execute(self, account: str, key: str, body: Response, work: Callable[[], Response]) -> tuple[Response, bool]:
        slot = (account, key)
        fingerprint = hashlib.sha256(json.dumps(body, sort_keys=True).encode()).hexdigest()
        record = self._records.get(slot)
        if record is not None and record.expires_at <= self._clock():
            del self._records[slot]
            record = None
        if record is not None:
            if record.fingerprint != fingerprint:
                raise KeyReuse("key was used with a different request")
            if record.response is None:
                raise InFlight("original request is still running")
            return record.response, True
        record = self._records[slot] = Record(fingerprint, self._clock() + TTL)
        try:
            record.response = work()
        except Exception:
            del self._records[slot]
            raise
        return record.response, False

def raises(exc: type[Exception], call: Callable[[], object]) -> bool:
    try:
        call()
    except exc:
        return True
    return False
now = 0.0
runs: list[str] = []
store = IdempotencyStore(lambda: now)
body = {"order": "o-1", "cents": "1999"}

def charge() -> Response:
    runs.append("charge")
    return {"charge": f"ch_{len(runs)}"}

def reentrant() -> Response:
    assert raises(InFlight, lambda: store.execute("acct-1", "key-2", body, charge))
    return {"charge": "ch_x"}

first, replayed = store.execute("acct-1", "key-1", body, charge)
again, replayed_again = store.execute("acct-1", "key-1", body, charge)
assert (replayed, replayed_again, again, len(runs)) == (False, True, first, 1)
assert not store.execute("acct-2", "key-1", body, charge)[1] and len(runs) == 2
assert raises(KeyReuse, lambda: store.execute("acct-1", "key-1", {"order": "o-9"}, charge))
store.execute("acct-1", "key-2", body, reentrant)
now = TTL + 1.0
assert not store.execute("acct-1", "key-1", body, charge)[1]
```

Keys are scoped per account, so one customer's key cannot replay another's response, and the body is fingerprinted to catch a reused key. Records expire against an injected clock. An exception releases the key. The record exists before the work runs, which is how a concurrent duplicate sees `InFlight`.

## TypeScript

The slot is `JSON.stringify([account, key])`, so no delimiter in either part can make two pairs collide. Add the fingerprint check from the Python version when clients may reuse keys.

```typescript
import assert from "node:assert/strict";

type Response = { readonly charge: string };
type Rec = { expiresAt: number; response?: Response };
export class InFlight extends Error {}
const TTL_MS = 24 * 3600 * 1000;

export function idempotencyStore(now: () => number) {
  const records = new Map<string, Rec>();
  return {
    async execute(account: string, key: string, work: () => Promise<Response>) {
      const slot = JSON.stringify([account, key]);
      let rec = records.get(slot);
      if (rec !== undefined && rec.expiresAt <= now()) rec = undefined;
      if (rec?.response !== undefined) return { response: rec.response, replayed: true };
      if (rec !== undefined) throw new InFlight("original request still running");
      const fresh: Rec = { expiresAt: now() + TTL_MS };
      records.set(slot, fresh);
      try {
        fresh.response = await work();
      } catch (err) {
        records.delete(slot);
        throw err;
      }
      return { response: fresh.response, replayed: false };
    },
  };
}

async function main(): Promise<void> {
  let [clock, runs] = [0, 0];
  const store = idempotencyStore(() => clock);
  const charge = async (): Promise<Response> => ({ charge: `ch_${++runs}` });
  const first = await store.execute("acct-1", "key-1", charge);
  const again = await store.execute("acct-1", "key-1", charge);
  assert.deepEqual([first.replayed, again.replayed, runs], [false, true, 1]);
  await store.execute("acct-1", "key-2", async () => {
    await assert.rejects(store.execute("acct-1", "key-2", charge), InFlight);
    return { charge: "ch_x" };
  });
  clock = TTL_MS + 1;
  assert.equal((await store.execute("acct-1", "key-1", charge)).replayed, false);
}

main().catch((err: unknown) => void (console.error(err), process.exit(1)));
```

## In production

- Stripe documents the pattern: clients send an `Idempotency-Key` header on `POST` requests, keys are kept for at least 24 hours, and a replayed response carries `Idempotent-Replayed: true`. It suggests a random UUID v4 or a key derived from a user-attached object such as a cart id.
- The check-and-insert must be atomic. In SQL, `INSERT` against a unique `(account, key)` index and treat a conflict as already seen. The dictionaries above only stand in for that.
- Retry clients must reuse the key across attempts and restarts (see [Retry with backoff](retry-backoff.md)). Treat keys as client input: cap their length and never use one as a file path.

## Smells and misuse

- A fresh key per retry, which defeats the pattern.
- Global keys, no fingerprint check, no in-flight state, or expiry before the client stops retrying.

## Related

- [Retry with backoff](retry-backoff.md) is the main consumer.
