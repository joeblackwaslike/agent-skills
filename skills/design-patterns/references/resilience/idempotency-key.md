# Idempotency key

## What it is and Problem it solves

An idempotency key is a unique value the client sends so the server can recognize a repeat. The server runs the operation once, stores the outcome under the key, and replays it for duplicates. A client that times out cannot know whether the first attempt ran, so it resends the same key.

## Do you need this?

Not for reads or naturally repeatable writes. The plain alternative is a unique constraint on a natural business key (one payment per order id), when one exists. You need a key when a repeated request has a side effect, such as charging a card, and the signal is a duplicate row or double charge after a client timeout or double-click.

## Python

Keys are scoped per account, and the fingerprint covers method, path and body. The clock is injected.

```python
import hashlib
import json
from collections.abc import Callable
from dataclasses import dataclass
from unittest.mock import Mock

TTL = 24 * 3600


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
        record = self._records[slot] = Record(fingerprint, float("inf"))
        try:
            response = work()
        except NotExecuted:
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


def run(key: str, work: Callable[[], str], path: str = "/charges", acct: str = "acct-1") -> tuple[str, bool]:
    return store.execute(acct, key, ["POST", path, {"cents": 1999}], work)


assert (run("k1", charge), run("k1", charge)) == (("ch_1", False), ("ch_1", True)) and charge.call_count == 1
assert not run("k1", charge, acct="acct-2")[1] and charge.call_count == 2
assert isinstance(failure(lambda: run("k1", charge, path="/refunds")), KeyReuse)
assert isinstance(failure(lambda: run("k3", timed_out)), TimeoutError)
assert isinstance(failure(lambda: run("k3", charge)), ReplayedFailure) and timed_out.call_count == 1
assert isinstance(failure(lambda: run("k4", invalid)), NotExecuted) and not run("k4", charge)[1]
now = TTL + 1.0
assert not run("k1", charge)[1]
```

Only `NotExecuted`, which `work` raises before it acts, releases the key. Any other failure may have caused the effect, so the record keeps it and replays it, as Stripe does for `500` responses. Expiry starts when the outcome is stored. The in-flight record is created before `work` runs. The dict has no lock, so the TypeScript demo shows the in-flight state through re-entrancy without proving concurrency safety.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Rec = { expiresAt: number; response?: string; error?: string };
export class InFlight extends Error {}
export class NotExecuted extends Error {}
const TTL_MS = 24 * 3600 * 1000;

export function idempotencyStore(now: () => number) {
  const records = new Map<string, Rec>();
  return {
    async execute(account: string, key: string, work: () => Promise<string>) {
      const slot = JSON.stringify([account, key]);
      const rec = records.get(slot);
      if (rec !== undefined && rec.expiresAt > now()) {
        if (rec.error !== undefined) throw new Error(`replayed failure: ${rec.error}`);
        if (rec.response === undefined) throw new InFlight("original request still running");
        return { response: rec.response, replayed: true };
      }
      const fresh: Rec = { expiresAt: Infinity };
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

  const run = async (key: string, work = charge) => (await store.execute("a", key, work)).replayed;
  assert.deepEqual([await run("k1"), await run("k1"), runs], [false, true, 1]);
  await store.execute("a", "k2", async () => (await assert.rejects(run("k2"), InFlight), "ch_x"));
  await assert.rejects(run("k3", timedOut), /timeout/);
  await assert.rejects(run("k3"), /replayed failure/);
  assert.equal(runs, 2);
  await assert.rejects(run("k4", invalid), NotExecuted);
  assert.equal(await run("k4"), false);
  clock = TTL_MS + 1;
  assert.equal(await run("k1"), false);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

The TypeScript version drops the fingerprint check to stay short, so it would replay a response for a reused key on a different request. Add the Python version's fingerprint before using it.

## In production

- Stripe API v1 saves the status code and body of the first request once execution begins and replays it, including `500` errors, for requests sent with an `Idempotency-Key` header. Keys can be removed after at least 24 hours, and reusing one with different parameters is an error. This sample keeps keys for exactly `TTL`.
- In SQL, insert the key in the business transaction under a unique `(account, key)` index and treat a conflict as already seen. A crash rolls both back and concurrent duplicates serialize on the index. A separate key table needs a short lease on in-flight rows, or a dead process blocks the key for the full TTL.
- Clients must reuse the key across attempts (see [Retry with backoff](retry-backoff.md)). Cap key length and never use one as a file path.

## Smells and misuse

- A fresh key per retry, which defeats the pattern.
- Releasing the key on every exception, so a request whose effect landed runs twice.
- Global keys or no fingerprint check, so a reused key returns an unrelated response.
- Expiry measured from the first attempt, so a slow request outlives its record.

## Related

- [Retry with backoff](retry-backoff.md) is the main consumer.
