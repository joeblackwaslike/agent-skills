# Idempotency key

## What it is and Problem it solves

An idempotency key is a unique value the client sends so the server can recognize a repeat. The server runs the operation once, stores the outcome under the key, and replays it for duplicates. A client that times out cannot know whether the first attempt ran, so it resends the same key.

## Do you need this?

Not for reads or naturally repeatable writes. The plain alternative is a unique constraint on a natural business key (one payment per order id), when one exists. You need a key when a repeated request has a side effect, such as charging a card, and the signal is a duplicate row or double charge after a client timeout or double-click.

## Python

Keys are scoped per account, and the fingerprint covers method, path and body, so reusing a key for a different request is rejected. In-flight records carry a short lease and finished ones carry the TTL. The clock is injected.

```python
import hashlib
import json
from collections.abc import Callable
from dataclasses import dataclass
from unittest.mock import Mock

TTL, LEASE = 24 * 3600, 30


class InFlight(Exception): ...
class KeyReuse(Exception): ...
class NotExecuted(Exception): ...
class ReplayedFailure(Exception): ...


@dataclass
class Record:
    fingerprint: str
    expires_at: float
    response: str | None = None
    error: str | None = None


class IdempotencyStore:
    def __init__(self, clock: Callable[[], float]) -> None:
        self._clock = clock
        self._records: dict[tuple[str, str], Record] = {}

    def execute(self, account: str, key: str, request: object, work: Callable[[], str]) -> tuple[str, bool]:
        slot = (account, key)
        fingerprint = hashlib.sha256(json.dumps(request, sort_keys=True).encode()).hexdigest()
        record = self._records.get(slot)
        if record is not None and record.expires_at > self._clock():
            if record.fingerprint != fingerprint:
                raise KeyReuse("key was used with a different request")
            if record.error is not None:
                raise ReplayedFailure(record.error)
            if record.response is None:
                raise InFlight("original request is still running")
            return record.response, True
        record = self._records[slot] = Record(fingerprint, self._clock() + LEASE)
        try:
            response = work()
        except NotExecuted:
            if self._records.get(slot) is record:
                del self._records[slot]
            raise
        except Exception as err:
            record.error, record.expires_at = str(err), self._clock() + TTL
            raise
        record.response, record.expires_at = response, self._clock() + TTL
        return response, False


def failure(call: Callable[[], object]) -> Exception | None:
    try:
        call()
    except Exception as err:
        return err
    return None


now = 0.0
store = IdempotencyStore(lambda: now)
charge = Mock(return_value="ch_1")
timed_out = Mock(side_effect=TimeoutError("gateway timed out after the charge"))
invalid = Mock(side_effect=NotExecuted("amount must be positive"))


def run(key: str, work: Callable[[], str], path: str = "/charges", acct: str = "acct-1", cents: int = 1999) -> tuple[str, bool]:
    return store.execute(acct, key, ["POST", path, {"cents": cents}], work)


def reentrant() -> str:
    assert isinstance(failure(lambda: run("k2", charge)), InFlight)
    return "ch_2"


def stalled() -> str:
    global now
    assert isinstance(failure(lambda: run("k5", charge)), InFlight)
    now += LEASE + 1
    assert run("k5", charge)[1] is False
    return "ch_late"


assert (run("k1", charge), run("k1", charge)) == (("ch_1", False), ("ch_1", True)) and charge.call_count == 1
assert not run("k1", charge, acct="acct-2")[1] and charge.call_count == 2
assert isinstance(failure(lambda: run("k1", charge, path="/refunds")), KeyReuse)
assert isinstance(failure(lambda: run("k1", charge, cents=5)), KeyReuse)
assert run("k2", reentrant) == ("ch_2", False)
assert isinstance(failure(lambda: run("k3", timed_out)), TimeoutError)
assert isinstance(failure(lambda: run("k3", charge)), ReplayedFailure) and timed_out.call_count == 1
assert isinstance(failure(lambda: run("k4", invalid)), NotExecuted) and not run("k4", charge)[1]
assert run("k5", stalled) == ("ch_late", False) and run("k5", charge) == ("ch_1", True)
now = TTL + 1.0
assert not run("k1", charge)[1]
```

Only `NotExecuted`, which `work` raises before it acts, releases the key. Any other failure may have caused the effect, so the record keeps it and replays it, as Stripe does for `500` responses. The in-flight record exists before `work` runs, with an expiry of `LEASE`. If the worker dies, the next request after the lease reclaims the key (`stalled` shows it using the injected clock). The TTL starts only when the outcome is stored. The lease must exceed the slowest legitimate request, or a slow first attempt is reclaimed and runs twice. The dict has no lock, so `reentrant` and `stalled` show the states through re-entrancy and do not prove concurrency safety. Real concurrency needs the atomic insert described below.

## TypeScript

The TypeScript version follows the same rules, with account scoping, a fingerprint over method, path and body, an in-flight lease, a stored failure that replays, and `NotExecuted` as the only release.

```typescript
import assert from "node:assert/strict";

type Rec = { fingerprint: string; expiresAt: number; response?: string; error?: string };
export class InFlight extends Error {}
export class KeyReuse extends Error {}
export class NotExecuted extends Error {}
const TTL_MS = 24 * 3600 * 1000;
const LEASE_MS = 30_000;

export function idempotencyStore(now: () => number) {
  const records = new Map<string, Rec>();
  return {
    async execute(account: string, key: string, request: unknown, work: () => Promise<string>) {
      const slot = JSON.stringify([account, key]);
      const fingerprint = JSON.stringify(request);
      const rec = records.get(slot);
      if (rec !== undefined && rec.expiresAt > now()) {
        if (rec.fingerprint !== fingerprint) throw new KeyReuse("key reused with another request");
        if (rec.error !== undefined) throw new Error(`replayed failure: ${rec.error}`);
        if (rec.response === undefined) throw new InFlight("original request still running");
        return { response: rec.response, replayed: true };
      }
      const fresh: Rec = { fingerprint, expiresAt: now() + LEASE_MS };
      records.set(slot, fresh);
      try {
        const response = await work();
        Object.assign(fresh, { response, expiresAt: now() + TTL_MS });
        return { response, replayed: false };
      } catch (err) {
        if (!(err instanceof NotExecuted)) Object.assign(fresh, { error: String(err), expiresAt: now() + TTL_MS });
        else if (records.get(slot) === fresh) records.delete(slot);
        throw err;
      }
    },
  };
}

async function main(): Promise<void> {
  let [clock, runs] = [0, 0];
  const store = idempotencyStore(() => clock);
  const charge = async () => `ch_${++runs}`;
  const timedOut = async (): Promise<string> => { runs++; throw new Error("timeout after the charge"); };
  const invalid = async (): Promise<string> => { throw new NotExecuted("bad amount"); };
  const run = async (key: string, work = charge, cents = 1999, path = "/charges") =>
    (await store.execute("a", key, ["POST", path, { cents }], work)).replayed;

  assert.deepEqual([await run("k1"), await run("k1"), runs], [false, true, 1]);
  await assert.rejects(run("k1", charge, 5), KeyReuse);
  await assert.rejects(run("k1", charge, 1999, "/refunds"), KeyReuse);
  await store.execute("a", "k2", ["POST", "/charges", { cents: 1999 }], async () => (await assert.rejects(run("k2"), InFlight), "ch_x"));
  await assert.rejects(run("k3", timedOut), /timeout/);
  await assert.rejects(run("k3"), /replayed failure/);
  assert.equal(runs, 2);
  await assert.rejects(run("k4", invalid), NotExecuted);
  assert.equal(await run("k4"), false);

  await store.execute("a", "k5", ["POST", "/charges", { cents: 1999 }], async () => {
    await assert.rejects(run("k5"), InFlight);
    clock += LEASE_MS + 1;
    assert.equal(await run("k5"), false);
    return "ch_late";
  });
  assert.equal(await run("k5"), true);

  clock = TTL_MS + 1;
  assert.equal(await run("k1"), false);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

The fingerprint here is `JSON.stringify` of the request, so it depends on key order. Canonicalize the body first, or a retry that serializes fields in another order is rejected as key reuse. A late finish from a reclaimed worker writes to its own orphaned record, and the `records.get(slot) === fresh` check keeps it from deleting the new owner's record.

## In production

- Stripe API v1 saves the status code and body of the first request once execution begins and replays it, including `500` errors, for requests sent with an `Idempotency-Key` header. It does not save the result when parameters fail validation or the request conflicts with one still executing, and those can be retried. Keys can be removed after at least 24 hours, are up to 255 characters, and reusing one with different parameters is an error. Stripe suggests random V4 UUIDs and warns against sensitive data such as email addresses as keys. This sample keeps keys for exactly `TTL`, and `NotExecuted` plays the role of Stripe's validation case.
- In SQL, insert the key in the business transaction under a unique `(account, key)` index and treat a conflict as already seen. A crash rolls both back and concurrent duplicates serialize on the index. A separate key table needs the lease on in-flight rows (a `locked_until` column) so a dead process cannot block the key for the full TTL.
- Clients must reuse the key across attempts and restarts (see [Retry with backoff](retry-backoff.md)). Treat the key as client input, so cap its length and never use it as a file path.

## Smells and misuse

- A fresh key per retry, which defeats the pattern.
- Releasing the key on every exception, so a request whose effect landed runs twice.
- Global keys or no fingerprint check, so a reused key returns an unrelated response. Include the endpoint in the fingerprint or the slot.
- Expiry measured from the first attempt, so a slow request outlives its record.
- A lease shorter than the slowest legitimate request, so a slow first attempt is reclaimed and runs twice.
- A fingerprint built from an unstable serialization (key order, whitespace), so honest retries are rejected as key reuse.
- Replaying only successes, so the client retries a failure that already charged.
- Using the key as a bare lock and answering duplicates with a generic conflict, instead of storing the response and replaying it.
- Keys derived from sensitive data, or logged in full, since they travel through logs and proxies.

## Related

- [Retry with backoff](retry-backoff.md) is the main consumer.
- [Outbox](outbox.md) gives event consumers the same protection from duplicate deliveries.
- [Unit of Work](../data-access/unit-of-work.md) should wrap the key insert and the work in one transaction.
