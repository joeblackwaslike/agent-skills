# Circuit Breaker

## What it is and Problem it solves

A circuit breaker watches calls to a dependency and, after enough failures, stops making them for a while. Callers fail immediately instead of waiting on timeouts, and the struggling service gets room to recover. After a delay it lets a single probe call through, and only that one, to see whether the dependency is back.

## Do you need this?

Probably not for one service with a short timeout. A timeout plus [retry with a cap](retry-backoff.md) already bounds the damage per request.

Add a breaker when a slow or dead dependency ties up your threads or connections and drags unrelated endpoints down with it. The observable signal is latency rising across the whole service while one downstream is failing, with every request waiting out the same timeout.

## Python

Closed passes calls and counts consecutive `DependencyError`s. Open rejects calls until `reset_after` seconds pass. Half-open admits one probe while everyone else gets `CircuitOpen`, and any exception from the probe reopens the circuit, so the probe should be a real dependency call and client errors should be filtered out upstream. In the closed state only `DependencyError` counts, so map timeouts into it before they reach the breaker. The clock is injected.

```python
from collections.abc import Callable
from typing import Literal

State = Literal["closed", "open", "half-open"]


class CircuitOpen(Exception): ...
class DependencyError(Exception): ...


class CircuitBreaker:
    def __init__(self, *, threshold: int, reset_after: float, clock: Callable[[], float]) -> None:
        self._threshold, self._reset_after, self._clock = threshold, reset_after, clock
        self.state: State = "closed"
        self._failures = 0
        self._opened_at = 0.0
        self._probing = False

    def call[T](self, op: Callable[[], T]) -> T:
        if self.state == "open":
            if self._clock() - self._opened_at < self._reset_after:
                raise CircuitOpen
            self.state = "half-open"
        probe = self.state == "half-open"
        if probe:
            if self._probing:
                raise CircuitOpen
            self._probing = True
        try:
            result = op()
        except Exception as err:
            self._failures += isinstance(err, DependencyError)
            if self.state == "half-open" or self._failures >= self._threshold:
                self.state, self._opened_at = "open", self._clock()
            raise
        else:
            self._failures, self.state = 0, "closed"
            return result
        finally:
            if probe:
                self._probing = False


now, calls, healthy = 0.0, 0, False
breaker = CircuitBreaker(threshold=3, reset_after=30.0, clock=lambda: now)


def charge() -> str:
    global calls
    calls += 1
    if not healthy:
        raise DependencyError("gateway down")
    return "ok"


def attempt(op: Callable[[], object] = charge) -> object:
    try:
        return breaker.call(op)
    except Exception as err:
        return err


during_probe: list[object] = []


def probe() -> str:
    during_probe.append(attempt())
    return charge()


first = [attempt() for _ in range(4)]
assert [type(r) for r in first] == [DependencyError] * 3 + [CircuitOpen] and calls == 3
now = 30.0
assert isinstance(attempt(probe), DependencyError) and breaker.state == "open" and calls == 4
assert isinstance(during_probe[0], CircuitOpen)
now = 60.0
assert isinstance(attempt(lambda: 1 / 0), ZeroDivisionError) and breaker.state == "open"
now, healthy = 90.0, True
assert attempt() == "ok" and breaker.state == "closed"
```

The second caller during the probe is rejected without reaching `charge` (`calls` stays at 4). A non-dependency error from the probe at t=60 reopens the circuit anyway. This version is single-threaded; a concurrent one needs a lock around the state changes.

## TypeScript

Async code overlaps by default. A generation counter stamps each call with the state it started in, so a late result from an earlier state cannot close a circuit that others just opened.

```typescript
import assert from "node:assert/strict";

type State = "closed" | "open" | "half-open";
class CircuitOpen extends Error {}
class DependencyError extends Error {}

export function circuitBreaker(opts: { threshold: number; resetAfterMs: number; now(): number }) {
  let state: State = "closed";
  let [failures, openedAt, generation, probing] = [0, 0, 0, false];
  return {
    state: (): State => state,
    async call<T>(op: () => Promise<T>): Promise<T> {
      if (state === "open") {
        if (opts.now() - openedAt < opts.resetAfterMs) throw new CircuitOpen("circuit open");
        [state, generation] = ["half-open", generation + 1];
      }
      const isProbe = state === "half-open";
      if (isProbe) {
        if (probing) throw new CircuitOpen("probe in flight");
        probing = true;
      }
      const started = generation;
      try {
        const result = await op();
        if (generation === started) [failures, state] = [0, "closed"];
        return result;
      } catch (err) {
        if (generation === started) {
          const counted = err instanceof DependencyError && ++failures >= opts.threshold;
          if (state === "half-open" || counted) [state, openedAt, generation] = ["open", opts.now(), generation + 1];
        }
        throw err;
      } finally {
        if (isProbe) probing = false;
      }
    },
  };
}

async function main(): Promise<void> {
  let [now, calls, healthy] = [0, 0, false];
  const charge = async (): Promise<string> => {
    calls++;
    if (!healthy) throw new DependencyError("gateway down");
    return "ok";
  };
  const breaker = circuitBreaker({ threshold: 3, resetAfterMs: 30_000, now: () => now });
  const attempt = (op = charge): Promise<unknown> => breaker.call(op).catch((err: unknown) => err);

  let failLate!: (reason: Error) => void;
  const staleFailure = breaker.call(() => new Promise<string>((_, reject) => (failLate = reject))).catch((err: unknown) => err);
  let release!: (value: string) => void;
  const slow = breaker.call(() => new Promise<string>((resolve) => (release = resolve)));
  for (let i = 0; i < 3; i++) assert.ok((await attempt()) instanceof DependencyError);
  assert.ok((await attempt()) instanceof CircuitOpen);
  release("ok");
  await slow;
  assert.equal(breaker.state(), "open");

  now = 30_000;
  const probe = attempt();
  assert.ok((await attempt()) instanceof CircuitOpen);
  assert.ok((await probe) instanceof DependencyError);
  assert.deepEqual([breaker.state(), calls], ["open", 4]);

  now = 60_000;
  assert.ok((await attempt(async () => { throw new TypeError("timeout"); })) instanceof TypeError);
  assert.equal(breaker.state(), "open");
  [now, healthy] = [90_000, true];
  assert.deepEqual([await attempt(), breaker.state()], ["ok", "closed"]);

  healthy = false;
  await attempt();
  await attempt();
  failLate(new DependencyError("late failure"));
  assert.ok((await staleFailure) instanceof DependencyError);
  assert.equal(breaker.state(), "closed");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

A late success from a call that started before the circuit opened is ignored, and so is a late failure that arrives after the circuit has closed again. Without the generation check, that stale failure would be the third and trip the breaker.

## In production

- pybreaker has `fail_max`, `reset_timeout` and `success_threshold` (consecutive successes needed in half-open), can exclude business exceptions, and is documented as thread-safe.
- cockatiel's `circuitBreaker(policy, { halfOpenAfter, breaker })` takes a `ConsecutiveBreaker`, `CountBreaker` or `SamplingBreaker` and throws `BrokenCircuitError` while open. Its docs say to reuse one breaker across requests.
- Keep one breaker per dependency, created once and shared. State is per process, so many instances each trip on their own, which is usually fine. Alert on state changes and log the reason each time the circuit opens.
- Build it as a decorator-style wrapper around the client (see [Decorator](../structural/decorator.md)) and put the retry loop outside it, as `retry(breaker(op))`, so each attempt is counted and `CircuitOpen` is treated as final.
- The two samples compose only if they agree on the error type. The loop in [Retry with backoff](retry-backoff.md) retries `TransientError`, so declare `class DependencyError(TransientError)` in Python and `class DependencyError extends TransientError` in TypeScript. The `op` you hand the breaker must also map its own per-attempt timeout to a `DependencyError`. Otherwise the breaker sees an abort error it does not count, and the loop sees one it does not retry.

## Smells and misuse

- Counting client errors (400, validation) as dependency failures, which lets one bad caller open the circuit for everyone.
- Retrying `CircuitOpen`, or putting the breaker outside the retry loop so a whole retried call counts as one failure.
- No timeout on the call, so a hung probe holds the half-open gate forever. Map the timeout into a dependency failure.
- One breaker shared by unrelated dependencies, so a flaky email provider blocks payments. Or one built per request or call site, so failures never accumulate.
- Open with no fallback, such as a cached value or a queued retry, so users only see faster errors.
- Thresholds and reset times guessed once and never checked against real traffic. A threshold of 3 on a low-volume endpoint flaps; a window that is too long keeps a healthy dependency out.
- Closing on a single probe success when the dependency is only partly back. Require several probe successes (pybreaker's `success_threshold`) if one lucky call is not enough.
- No signal when the state changes, so an open circuit is discovered from user complaints.

## Related

- [Retry with backoff](retry-backoff.md) handles brief blips; the breaker handles sustained outages.
- [Decorator](../structural/decorator.md) and [Proxy](../structural/proxy.md) are the wrapper shapes the breaker takes.
- [State](../behavioral/state.md) has the same shape, with transitions driven by failures and time.
- [Idempotency key](idempotency-key.md) matters for the probe too, because a probe that charges must be safe to repeat.
