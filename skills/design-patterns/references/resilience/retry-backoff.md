# Retry with backoff

## What it is and Problem it solves

Retry repeats a call that failed for a transient reason, such as a timeout, a 503 or a connection reset, and waits longer between attempts. Backoff with jitter spreads retries out so a recovering service is not hit by every client at the same instant.

## Do you need this?

Only for calls that can fail transiently and are safe to repeat. A call you can let fail, surface to the user, or re-run from a queue needs no retry loop. Try the retry setting your HTTP client already has, or one immediate retry for connection resets. Write a backoff loop when failures cluster (deploys, rate limits) and fixed retries make them worse. A call that charges, sends or creates must carry an [idempotency key](idempotency-key.md) before it is retried, because a timeout does not tell you whether the first attempt ran.

## Python

Time and randomness are injected, so the asserts run instantly. Delays use full jitter: a random value between zero and the capped exponential.

```python
import random
from collections.abc import Callable


class TransientError(Exception):
    def __init__(self, message: str, retry_after: float | None = None) -> None:
        super().__init__(message)
        self.retry_after = retry_after


def call_with_retry[T](
    op: Callable[[], T], *, idempotent: bool, sleep: Callable[[float], None],
    rng: random.Random, budget: list[int], max_attempts: int = 4, base: float = 0.1, cap: float = 5.0,
) -> T:
    if not idempotent:
        return op()
    for attempt in range(1, max_attempts + 1):
        try:
            return op()
        except TransientError as err:
            if attempt == max_attempts or budget[0] <= 0:
                raise
            budget[0] -= 1
            delay = rng.uniform(0, min(cap, base * 2 ** (attempt - 1)))
            sleep(max(delay, err.retry_after or 0.0))
    raise AssertionError("unreachable")

charges: dict[str, int] = {}

def flaky_charge(script: list[TransientError]) -> Callable[[str, int], str]:
    def charge(key: str, cents: int) -> str:
        charges.setdefault(key, cents)
        if script:
            raise script.pop(0)
        return f"ch_{key}"
    return charge


def run(script: list[TransientError], *, idempotent: bool = True, tokens: int = 10) -> tuple[str, list[float]]:
    charges.clear()
    delays: list[float] = []
    charge = flaky_charge(script)
    try:
        result = call_with_retry(
            lambda: charge("order-1", 1999), idempotent=idempotent,
            sleep=delays.append, rng=random.Random(1), budget=[tokens],
        )
    except TransientError:
        result = "failed"
    return result, delays


result, delays = run([TransientError("timeout")] * 2)
assert result == "ch_order-1" and len(charges) == 1
assert 0 <= delays[0] <= 0.1 and 0 <= delays[1] <= 0.2
assert run([TransientError("busy", retry_after=2.0)])[1] == [2.0]
assert run([TransientError("down")] * 3, idempotent=False) == ("failed", [])
assert run([TransientError("down")] * 3, tokens=1)[0] == "failed"
```

The fake gateway records the charge before it fails, which is the dangerous case, since the work ran and only the response was lost. Retrying with the same key charges once. With `idempotent=False` the call runs once with no sleeping. The shared `budget` caps total retries across calls, so one bad dependency cannot multiply traffic. `Retry-After` sets a floor under the jittered delay.

## TypeScript

```typescript
import assert from "node:assert/strict";

class TransientError extends Error {
  constructor(message: string, readonly retryAfterMs?: number) { super(message); }
}

type Deps = { sleep(ms: number): Promise<void>; random(): number; budget: { tokens: number } };

export async function callWithRetry<T>(
  op: () => Promise<T>,
  opts: { idempotent: boolean; maxAttempts?: number; baseMs?: number; capMs?: number },
  deps: Deps,
): Promise<T> {
  if (!opts.idempotent) return op();
  const { maxAttempts = 4, baseMs = 100, capMs = 5000 } = opts;
  for (let attempt = 1; ; attempt++) {
    try {
      return await op();
    } catch (err) {
      if (!(err instanceof TransientError) || attempt >= maxAttempts || deps.budget.tokens <= 0) throw err;
      deps.budget.tokens -= 1;
      const jittered = deps.random() * Math.min(capMs, baseMs * 2 ** (attempt - 1));
      await deps.sleep(Math.max(jittered, err.retryAfterMs ?? 0));
    }
  }
}

function gateway(script: TransientError[]) {
  const charges = new Map<string, number>();
  return {
    charges,
    async charge(key: string, cents: number): Promise<string> {
      if (!charges.has(key)) charges.set(key, cents);
      const failure = script.shift();
      if (failure) throw failure;
      return `ch_${key}`;
    },
  };
}

async function main(): Promise<void> {
  const delays: number[] = [];
  const deps: Deps = { sleep: async (ms) => void delays.push(ms), random: () => 0.5, budget: { tokens: 10 } };
  const gw = gateway([new TransientError("timeout"), new TransientError("busy", 2000)]);
  const result = await callWithRetry(() => gw.charge("order-1", 1999), { idempotent: true }, deps);
  assert.deepEqual([result, gw.charges.size, delays], ["ch_order-1", 1, [50, 2000]]);
  const down = gateway([new TransientError("down")]);
  await assert.rejects(callWithRetry(() => down.charge("k", 1), { idempotent: false }, deps), /down/);
}

main().catch((err: unknown) => void (console.error(err), process.exit(1)));
```

## In production

- Python: tenacity provides `stop_after_attempt`, `retry_if_exception_type` and a pluggable `sleep`, so tests can pass a fake as above.
- TypeScript: p-retry takes `retries`, `factor`, `minTimeout`, `maxTimeout` and a `shouldRetry` callback. Its `randomize` option multiplies each delay by a factor between 1 and 2, which adds spread but is not full jitter. cockatiel has a retry policy with `ExponentialBackoff`.
- HTTP clients and cloud SDKs often retry by default. Stacking your loop on theirs multiplies attempts (3 x 3 = 9), so turn one off. Retry at one layer only, or load amplifies during an outage.
- `Retry-After` on 429 and 503 is the server saying when to come back. Stripe's SDKs can generate idempotency keys and retry automatically (see [Idempotency key](idempotency-key.md)).

## Smells and misuse

- Retrying non-idempotent calls without a key, which double-charges and double-sends.
- Retrying errors that will never succeed (400, 401, validation). Retry only the transient class.
- No cap on attempts, fixed delays with no jitter, real `sleep` in tests, or a retry loop inside a database transaction.

## Related

- [Idempotency key](idempotency-key.md) makes repeating a write safe.
- [Circuit Breaker](circuit-breaker.md) stops retries once the dependency is clearly down.
