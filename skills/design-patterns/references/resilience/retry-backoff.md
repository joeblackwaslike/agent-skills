# Retry with backoff

## What it is and Problem it solves

Retry repeats a call that failed for a transient reason, such as a timeout, a 503 or a connection reset, and waits longer between attempts. Backoff with jitter spreads retries out so a recovering service is not hit by every client at the same instant.

## Do you need this?

Skip it when the call can fail loudly, be surfaced to the user, or be re-run from a queue. Try the retry setting your HTTP client already has before writing a loop.

Write one when your logs show clusters of 429s or 503s, or connection resets during deploys, and the caller has no other way to recover. A call that charges, sends or creates must carry an [idempotency key](idempotency-key.md) first, because a timeout does not say whether the first attempt ran.

## Python

Time and randomness are injected, so the asserts run instantly. Delays use full jitter, a random value between zero and the capped exponential, and `Retry-After` sets a floor that is itself capped.

```python
import random
from collections.abc import Callable


class TransientError(Exception):
    def __init__(self, message: str, retry_after: float | None = None) -> None:
        super().__init__(message)
        self.retry_after = retry_after


def call_with_retry[T](
    op: Callable[[], T], *, idempotent: bool, sleep: Callable[[float], None],
    rng: random.Random, budget: list[int], on_retry: Callable[[int, Exception, float], None],
    max_attempts: int = 4, base: float = 0.1, cap: float = 5.0,
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
            delay = max(rng.uniform(0, min(cap, base * 2 ** (attempt - 1))), min(err.retry_after or 0.0, cap))
            on_retry(attempt, err, delay)
            sleep(delay)
    raise AssertionError("unreachable")


charges: dict[str, int] = {}
retries: list[tuple[int, str, float]] = []


def flaky_charge(script: list[TransientError]) -> Callable[[str, int], str]:
    def charge(key: str, cents: int) -> str:
        charges.setdefault(key, cents)
        if script:
            raise script.pop(0)
        return f"ch_{key}"
    return charge


def run(script: list[TransientError], *, idempotent: bool = True, tokens: int = 10) -> tuple[str | Exception, list[float]]:
    charges.clear()
    retries.clear()
    delays: list[float] = []
    charge = flaky_charge(script)
    try:
        result: str | Exception = call_with_retry(
            lambda: charge("order-1", 1999), idempotent=idempotent, sleep=delays.append, rng=random.Random(1),
            budget=[tokens], on_retry=lambda attempt, err, delay: retries.append((attempt, str(err), delay)),
        )
    except TransientError as err:
        result = err
    return result, delays


outcome, delays = run([TransientError("timeout")] * 2)
assert outcome == "ch_order-1" and len(charges) == 1
assert 0 <= delays[0] <= 0.1 and 0 <= delays[1] <= 0.2
assert [r[:2] for r in retries] == [(1, "timeout"), (2, "timeout")]
assert run([TransientError("busy", retry_after=2.0)])[1] == [2.0]
assert run([TransientError("pinned", retry_after=3600.0)])[1] == [5.0]
once, slept = run([TransientError("down")] * 3, idempotent=False)
assert isinstance(once, TransientError) and slept == []
out_of_attempts, slept = run([TransientError("down")] * 4)
out_of_budget, short = run([TransientError("down")] * 4, tokens=1)
assert isinstance(out_of_attempts, TransientError) and isinstance(out_of_budget, TransientError)
assert (len(slept), len(short)) == (3, 1)
```

The fake gateway records the charge before it fails, the dangerous case where the work ran and only the response was lost. Retrying with the same key charges once. With `idempotent=False` the call runs once. The shared `budget` caps retries across calls, and `on_retry` keeps each intermediate error visible.

## TypeScript

`op` and `sleep` both receive the caller's `AbortSignal`, so cancelling stops the in-flight attempt and the wait.

```typescript
import assert from "node:assert/strict";

class TransientError extends Error {
  constructor(message: string, readonly retryAfterMs?: number) { super(message); }
}

type Deps = { sleep(ms: number, signal?: AbortSignal): Promise<void>; random(): number; budget: { tokens: number };
  onRetry?(attempt: number, err: Error, delayMs: number): void };
type Opts = { idempotent: boolean; signal?: AbortSignal; maxAttempts?: number; baseMs?: number; capMs?: number };

export async function callWithRetry<T>(op: (signal?: AbortSignal) => Promise<T>, opts: Opts, deps: Deps): Promise<T> {
  if (!opts.idempotent) return op(opts.signal);
  const { maxAttempts = 4, baseMs = 100, capMs = 5000 } = opts;
  for (let attempt = 1; ; attempt++) {
    try {
      return await op(opts.signal);
    } catch (err) {
      if (!(err instanceof TransientError) || attempt >= maxAttempts || deps.budget.tokens <= 0) throw err;
      deps.budget.tokens -= 1;
      const jittered = deps.random() * Math.min(capMs, baseMs * 2 ** (attempt - 1));
      const delay = Math.max(jittered, Math.min(err.retryAfterMs ?? 0, capMs));
      deps.onRetry?.(attempt, err, delay);
      await deps.sleep(delay, opts.signal);
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
  const gw = gateway([new TransientError("timeout"), new TransientError("busy", 3_600_000)]);
  const result = await callWithRetry(() => gw.charge("order-1", 1999), { idempotent: true }, deps);
  assert.deepEqual([result, gw.charges.size, delays], ["ch_order-1", 1, [50, 5000]]);

  const down = gateway([new TransientError("down")]);
  await assert.rejects(callWithRetry(() => down.charge("k", 1), { idempotent: false }, deps), TransientError);
  assert.equal(delays.length, 2);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

## In production

- Python's tenacity provides `stop_after_attempt`, `retry_if_exception_type` and a pluggable `sleep`, so tests can pass a fake as above.
- p-retry takes `retries`, `factor`, `minTimeout`, `maxTimeout` and a `shouldRetry` callback. Its `randomize` option multiplies each delay by a factor between 1 and 2, which adds spread but is not full jitter. cockatiel has a retry policy with `ExponentialBackoff`.
- HTTP clients and cloud SDKs often retry by default, so stacking your loop on theirs multiplies attempts (3 x 3 = 9). Retry at one layer only, and call any [circuit breaker](circuit-breaker.md) from inside the loop, as `retry(breaker(op))`.

## Smells and misuse

- Retrying non-idempotent calls without a key, which double-charges and double-sends.
- Retrying errors that will never succeed (400, 401, validation). Retry only the transient class.
- No cap on attempts, fixed delays with no jitter, or trusting a huge `Retry-After`.
- No per-attempt timeout (for example `AbortSignal.timeout`), so one hung attempt stalls the loop.
- A retry loop inside a database transaction.

## Related

- [Idempotency key](idempotency-key.md) makes repeating a write safe.
- [Circuit Breaker](circuit-breaker.md) stops retries once the dependency is clearly down.
