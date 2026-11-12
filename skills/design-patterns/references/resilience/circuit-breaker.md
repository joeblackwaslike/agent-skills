# Circuit Breaker

## What it is and Problem it solves

A circuit breaker watches calls to a dependency and, after enough failures, stops making them for a while. Callers fail immediately instead of waiting on timeouts, and the struggling service gets room to recover. After a delay the breaker lets one probe call through to see whether the dependency is back.

## Do you need this?

Probably not for one service with a short timeout. A timeout plus [retry with a cap](retry-backoff.md) already bounds the damage per request.

Add a breaker when a slow or dead dependency ties up your threads or connections and drags unrelated endpoints down with it. The observable signal is latency rising across the whole service while one downstream is failing. If you can degrade without the dependency, such as showing a cached price, fast failure is what makes that possible.

## Python

Closed passes calls and counts consecutive failures. Open rejects calls until `reset_after` seconds pass. Half-open admits a probe: success closes the circuit, failure reopens it. The clock is injected.

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

    def call[T](self, op: Callable[[], T]) -> T:
        if self.state == "open":
            if self._clock() - self._opened_at < self._reset_after:
                raise CircuitOpen
            self.state = "half-open"
        try:
            result = op()
        except DependencyError:
            self._failures += 1
            if self.state == "half-open" or self._failures >= self._threshold:
                self.state, self._opened_at = "open", self._clock()
            raise
        self._failures, self.state = 0, "closed"
        return result


now, calls, healthy = 0.0, 0, False

def charge() -> str:
    global calls
    calls += 1
    if not healthy:
        raise DependencyError("gateway down")
    return "ok"


breaker = CircuitBreaker(threshold=3, reset_after=30.0, clock=lambda: now)

def attempt() -> str:
    try:
        return breaker.call(charge)
    except (DependencyError, CircuitOpen) as err:
        return type(err).__name__


assert [attempt() for _ in range(4)] == ["DependencyError"] * 3 + ["CircuitOpen"]
assert breaker.state == "open" and calls == 3
now = 30.0
assert attempt() == "DependencyError" and breaker.state == "open" and calls == 4
now, healthy = 60.0, True
assert attempt() == "ok" and breaker.state == "closed" and calls == 5
```

The fourth call never reaches `charge`. At t=30 the probe runs, fails and restarts the wait. At t=60 the probe succeeds and the circuit closes. Only `DependencyError` counts as a failure. This version is single-threaded; a concurrent one needs a lock and one probe at a time.

## TypeScript

```typescript
import assert from "node:assert/strict";
type State = "closed" | "open" | "half-open";
class CircuitOpen extends Error {}
class DependencyError extends Error {}
export function circuitBreaker(opts: { threshold: number; resetAfterMs: number; now(): number }) {
  let state: State = "closed";
  let [failures, openedAt] = [0, 0];
  return {
    state: (): State => state,
    async call<T>(op: () => Promise<T>): Promise<T> {
      if (state === "open") {
        if (opts.now() - openedAt < opts.resetAfterMs) throw new CircuitOpen("circuit open");
        state = "half-open";
      }
      try {
        const result = await op();
        failures = 0;
        state = "closed";
        return result;
      } catch (err) {
        if (err instanceof DependencyError && (state === "half-open" || ++failures >= opts.threshold)) {
          state = "open";
          openedAt = opts.now();
        }
        throw err;
      }
    },
  };
}

async function main(): Promise<void> {
  let [now, calls, healthy] = [0, 0, false];
  const charge = async (): Promise<string> => {
    calls += 1;
    if (!healthy) throw new DependencyError("gateway down");
    return "ok";
  };
  const breaker = circuitBreaker({ threshold: 3, resetAfterMs: 30_000, now: () => now });
  const attempt = () => breaker.call(charge).catch((err: Error) => err.constructor.name);
  const first: string[] = [];
  for (let i = 0; i < 4; i++) first.push(await attempt());
  assert.deepEqual(first, ["DependencyError", "DependencyError", "DependencyError", "CircuitOpen"]);
  assert.equal(calls, 3);
  now = 30_000;
  assert.equal(await attempt(), "DependencyError");
  assert.deepEqual([breaker.state(), calls], ["open", 4]);
  now = 60_000;
  healthy = true;
  assert.deepEqual([await attempt(), breaker.state()], ["ok", "closed"]);
}

main().catch((err: unknown) => void (console.error(err), process.exit(1)));
```

## In production

- Python: pybreaker exposes `fail_max`, `reset_timeout` and `success_threshold` (consecutive successes needed in half-open), can exclude business exceptions, and is documented as thread-safe.
- TypeScript: cockatiel's `circuitBreaker(policy, { halfOpenAfter, breaker })` takes a `ConsecutiveBreaker`, `CountBreaker` or `SamplingBreaker`, throws `BrokenCircuitError` while open, and its docs say to reuse one breaker across requests.
- Keep one breaker per dependency, created once and shared, or failures never accumulate. State is per process. Alert on state changes.

## Smells and misuse

- Counting client errors (400, validation) as dependency failures.
- Retrying around the breaker, so each rejected call is retried. Treat `CircuitOpen` as final.

## Related

- [Retry with backoff](retry-backoff.md) covers brief blips. The breaker covers sustained outages.
- [Decorator](../structural/decorator.md) is the usual way to wrap a client with a breaker.
