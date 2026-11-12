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


class DependencyError(TransientError):
    """What a circuit breaker raises, so the loop retries what the breaker counts."""


def call_with_retry[T](
    op: Callable[[], T], *, idempotent: bool, sleep: Callable[[float], None],
    rng: random.Random, budget: list[int], on_retry: Callable[[int, Exception, float], None],
    max_attempts: int = 4, base: float = 0.1, cap: float = 5.0,
) -> T:
    attempts = max_attempts if idempotent else 1
    for attempt in range(1, attempts + 1):
        try:
            return op()
        except TransientError as err:
            if attempt == attempts or budget[0] <= 0:
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


assert issubclass(DependencyError, TransientError)
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

The fake gateway records the charge before it fails, the dangerous case where the work ran and only the response was lost. Retrying with the same key charges once. With `idempotent=False` the loop allows one attempt and skips the backoff. The shared `budget` caps retries across calls, and `on_retry` keeps each intermediate error visible.

## TypeScript

`op` receives an `AbortSignal` that fires when the caller cancels or when the per-attempt timeout elapses. `sleep` takes the caller's signal too, so cancelling stops the wait. The tests use a fake sleep that records delays, apart from the cancellation checks. A timed-out attempt counts as transient and is retried when the call is idempotent. A non-idempotent call gets the same per-attempt timeout but only one attempt, so a timeout fails it and nothing is retried. The timer comes in through `deps.timeout`; production passes `AbortSignal.timeout`.

```typescript
import assert from "node:assert/strict";

class TransientError extends Error {
  constructor(message: string, readonly retryAfterMs?: number) { super(message); }
}

export class DependencyError extends TransientError {}

export function abortableSleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const onAbort = () => { clearTimeout(timer); reject(signal?.reason); };
    const timer = setTimeout(() => { signal?.removeEventListener("abort", onAbort); resolve(); }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

type Deps = {
  sleep(ms: number, signal?: AbortSignal): Promise<void>;
  random(): number;
  timeout(ms: number): AbortSignal;
  budget: { tokens: number };
  onRetry?(attempt: number, err: Error, delayMs: number): void;
};
type Opts = { idempotent: boolean; signal?: AbortSignal; attemptTimeoutMs?: number; maxAttempts?: number; baseMs?: number; capMs?: number };

export async function callWithRetry<T>(op: (signal?: AbortSignal) => Promise<T>, opts: Opts, deps: Deps): Promise<T> {
  const { baseMs = 100, capMs = 5000 } = opts;
  const maxAttempts = opts.idempotent ? (opts.maxAttempts ?? 4) : 1;
  for (let attempt = 1; ; attempt++) {
    opts.signal?.throwIfAborted();
    const timer = opts.attemptTimeoutMs === undefined ? undefined : deps.timeout(opts.attemptTimeoutMs);
    const signal = opts.signal && timer ? AbortSignal.any([opts.signal, timer]) : (opts.signal ?? timer);
    try {
      return await op(signal);
    } catch (raw) {
      const err = timer?.aborted && !opts.signal?.aborted ? new TransientError("attempt timed out") : raw;
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
  const timers: AbortController[] = [];
  const deps: Deps = {
    sleep: async (ms, signal) => { signal?.throwIfAborted(); delays.push(ms); },
    random: () => 0.5,
    timeout: () => { const ctl = new AbortController(); timers.push(ctl); return ctl.signal; },
    budget: { tokens: 10 },
  };

  const gw = gateway([new TransientError("timeout"), new TransientError("busy", 3_600_000)]);
  const result = await callWithRetry(() => gw.charge("order-1", 1999), { idempotent: true }, deps);
  assert.deepEqual([result, gw.charges.size, delays], ["ch_order-1", 1, [50, 5000]]);

  delays.length = 0;
  let tries = 0;
  const hung = (signal?: AbortSignal) => new Promise<string>((resolve, reject) => {
    if (++tries > 1) return resolve("ok");
    signal?.addEventListener("abort", () => reject(signal.reason));
    queueMicrotask(() => timers[0]?.abort(new Error("timer fired")));
  });
  assert.equal(await callWithRetry(hung, { idempotent: true, attemptTimeoutMs: 1000 }, deps), "ok");
  assert.deepEqual([tries, delays], [2, [50]]);

  const ctl = new AbortController();
  const cancelling: Deps = { ...deps, sleep: abortableSleep, onRetry: () => ctl.abort(new Error("cancelled")) };
  const flaky = gateway([new TransientError("down"), new TransientError("down")]);
  await assert.rejects(callWithRetry(() => flaky.charge("k", 1), { idempotent: true, signal: ctl.signal }, cancelling), /cancelled/);
  assert.equal(delays.length, 1);

  const stop = new AbortController();
  const stopped = abortableSleep(60_000, stop.signal);
  stop.abort(new Error("stopped"));
  await assert.rejects(stopped, /stopped/);
  assert.ok(new DependencyError("x") instanceof TransientError);

  timers.length = 0;
  let stuckCalls = 0;
  const stuck = (signal?: AbortSignal) => new Promise<string>((_, reject) => {
    stuckCalls++;
    signal?.addEventListener("abort", () => reject(signal.reason));
    queueMicrotask(() => timers[0]?.abort(new Error("timer fired")));
  });
  await assert.rejects(callWithRetry(stuck, { idempotent: false, attemptTimeoutMs: 1000 }, deps), /timed out/);
  assert.deepEqual([stuckCalls, timers.length, delays.length], [1, 1, 1]);

  const once = gateway([new TransientError("down")]);
  await assert.rejects(callWithRetry(() => once.charge("k", 1), { idempotent: false }, deps), TransientError);
  assert.equal(delays.length, 1);

  const dead = gateway(Array.from({ length: 4 }, () => new TransientError("down")));
  await assert.rejects(callWithRetry(() => dead.charge("k", 1), { idempotent: true }, deps), TransientError);
  assert.equal(delays.length, 4);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

The gateway fake records the charge before it fails, as in the Python version. `abortableSleep` is the real sleep to copy: a `setTimeout` plus an abort listener that clears the timer and rejects with the signal's reason, so a cancelled wait leaves no timer running. The test aborts a 60 second sleep and it rejects at once. In the cancelled run, `onRetry` aborts the signal and the real sleep rejects with that reason before waiting, so that run records no delay. The one entry left in `delays` comes from the earlier hung-timeout test.

## In production

- Python's tenacity provides `stop_after_attempt`, `retry_if_exception_type` and a pluggable `sleep`, so tests can pass a fake as above.
- p-retry takes `retries`, `factor`, `minTimeout`, `maxTimeout` and a `shouldRetry` callback, and accepts an `AbortSignal`. Its `randomize` option multiplies each delay by a factor between 1 and 2, which adds spread but is not full jitter. cockatiel has a retry policy with `ExponentialBackoff`.
- HTTP clients and cloud SDKs often retry by default, so stacking your loop on theirs multiplies attempts (3 x 3 = 9). Turn one off.
- Retry at one layer only. Retries at every layer of a call chain amplify load during an outage. If a [circuit breaker](circuit-breaker.md) is present, call it from inside the loop, as `retry(breaker(op))`, and treat `CircuitOpen` as final. The error types must line up: the breaker should raise a subclass of `TransientError` (`DependencyError` above), and since the TypeScript loop converts a per-attempt timeout outside the breaker, `op` should map its own timeout to a `DependencyError` before the breaker counts it.
- `Retry-After` on 429 and 503 says when to come back. Waiting less is rude and often counterproductive, and waiting longer than your own cap hands control of your latency to the server, which is why the code caps it.
- Stripe's SDKs can generate idempotency keys and retry automatically. If you retry across separate calls or restarts, persist the key (see [Idempotency key](idempotency-key.md)).

## Smells and misuse

- Retrying non-idempotent calls without a key, which double-charges and double-sends.
- Skipping the attempt timeout when retries are off. Turning retries off should limit a call to one attempt, and the attempt still needs its deadline, or a hung payment request waits forever.
- Retrying errors that will never succeed (400, 401, validation). Retry only the transient class.
- No cap on attempts or total time, so a dead dependency holds requests forever.
- Fixed delays with no jitter, which makes clients retry in lockstep.
- Trusting a huge `Retry-After` without a ceiling.
- No per-attempt timeout, so one hung attempt stalls the whole loop. Give each attempt its own `AbortSignal.timeout` and make the timeout a retryable failure, as the TypeScript version does.
- A retry loop inside a database transaction, or retries stacked on top of the SDK's own.
- Only the last error reported, so a flapping dependency looks like a single failure. Log every attempt.
- Real `sleep` in tests, which makes the suite slow and the timing assertions flaky.

## Related

- [Idempotency key](idempotency-key.md) makes repeating a write safe.
- [Circuit Breaker](circuit-breaker.md) stops retries once the dependency is clearly down.
- [Decorator](../structural/decorator.md) is how retry usually wraps a call.
