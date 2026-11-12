# Decorator

## What it is and Problem it solves

A decorator wraps a function or object and adds behavior (logging, caching, timing, authorization) while keeping the same interface. The caller cannot tell it is there, and the wrapped code does not change. The name covers two things that look different: the wrapper-object pattern, and the `@decorator` syntax in Python and TypeScript. The syntax is a convenient way to apply the pattern to a function or method.

## Do you need this?

Not for behavior used in one place. Call `log(...)` inside the function.

The signal is the same cross-cutting step copied into three or more functions (every gateway call logs, times and audits), or a behavior you need to switch on and off per environment without editing the code. Wrapping is better than a base-class method when the behaviors combine in different ways: audit plus timing in one place, timing alone in another.

A wrapper stack on a request handler is Chain of Responsibility with the same shape.

## Python

```python
import functools
from collections.abc import Callable
from decimal import Decimal
from typing import Protocol


class Gateway(Protocol):
    def charge(self, order_id: str, amount: Decimal) -> str: ...


class CardGateway:
    def charge(self, order_id: str, amount: Decimal) -> str:
        if amount <= 0:
            raise ValueError("amount must be positive")
        return f"card:{order_id}:{amount}"


class AuditedGateway:
    def __init__(self, inner: Gateway, log: list[str]) -> None:
        self._inner = inner
        self._log = log

    def charge(self, order_id: str, amount: Decimal) -> str:
        self._log.append(f"charge {order_id} {amount}")
        try:
            result = self._inner.charge(order_id, amount)
        except Exception as err:
            self._log.append(f"failed {order_id} {type(err).__name__}")
            raise
        self._log.append(f"charged {order_id} {result}")
        return result


def audited[**P, R](log: list[str]) -> Callable[[Callable[P, R]], Callable[P, R]]:
    def decorate(fn: Callable[P, R]) -> Callable[P, R]:
        @functools.wraps(fn)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            log.append(f"call {fn.__name__}")
            return fn(*args, **kwargs)

        return wrapper

    return decorate


calls: list[str] = []


@audited(calls)
def refund(order_id: str, amount: Decimal) -> str:
    """Refund an order."""
    return f"refund:{order_id}:{amount}"


log: list[str] = []
gateway: Gateway = AuditedGateway(CardGateway(), log)
assert gateway.charge("o-1", Decimal("5.00")) == "card:o-1:5.00"
assert log == ["charge o-1 5.00", "charged o-1 card:o-1:5.00"]
try:
    gateway.charge("o-9", Decimal("0"))
except ValueError:
    assert log[-2:] == ["charge o-9 0", "failed o-9 ValueError"]
else:
    raise AssertionError("the error must propagate")

assert refund("o-1", Decimal("5.00")) == "refund:o-1:5.00"
assert calls == ["call refund"]
assert refund.__name__ == "refund" and refund.__doc__ == "Refund an order."
```

`AuditedGateway` is the wrapper object. It implements the same `Protocol` as the thing it wraps, so it can be stacked. It logs the attempt, then the result or the failure, and re-raises so callers still see the error. `refund` shows the syntax form for a single sync function; for `async def`, write an `async def wrapper` that awaits `fn`, or the sync wrapper logs and returns an un-awaited coroutine. `functools.wraps` copies the name and docstring, so tracebacks and `help()` still describe `refund` instead of `wrapper`, and the `ParamSpec` generics keep the original signature visible to the type checker.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Gateway = { charge(orderId: string, amountCents: number): string };

export const audited = (inner: Gateway, log: string[]): Gateway => ({
  charge(orderId, amountCents) {
    log.push(`charge ${orderId} ${amountCents}`);
    try {
      const result = inner.charge(orderId, amountCents);
      log.push(`charged ${orderId} ${result}`);
      return result;
    } catch (err) {
      log.push(`failed ${orderId} ${err instanceof Error ? err.name : "unknown"}`);
      throw err;
    }
  },
});

export function withLog<A extends unknown[], R>(
  fn: (...args: A) => R,
  log: string[],
  name: string,
): (...args: A) => R {
  return (...args) => {
    log.push(`call ${name}`);
    return fn(...args);
  };
}

const log: string[] = [];
const base: Gateway = {
  charge(id, cents) {
    if (cents <= 0) throw new RangeError("amount must be positive");
    return `card:${id}:${cents}`;
  },
};
assert.equal(audited(base, log).charge("o-1", 500), "card:o-1:500");
assert.deepEqual(log, ["charge o-1 500", "charged o-1 card:o-1:500"]);
assert.throws(() => audited(base, log).charge("o-9", 0), RangeError);
assert.deepEqual(log.slice(-2), ["charge o-9 0", "failed o-9 RangeError"]);

type AsyncGateway = { charge(orderId: string, amountCents: number): Promise<string> };

export const auditedAsync = (inner: AsyncGateway, log: string[]): AsyncGateway => ({
  async charge(orderId, amountCents) {
    log.push(`charge ${orderId} ${amountCents}`);
    try {
      const result = await inner.charge(orderId, amountCents);
      log.push(`charged ${orderId} ${result}`);
      return result;
    } catch (err) {
      log.push(`failed ${orderId} ${err instanceof Error ? err.name : "unknown"}`);
      throw err;
    }
  },
});

const asyncLog: string[] = [];
const remote: AsyncGateway = { charge: async (id) => Promise.reject(new RangeError(`declined ${id}`)) };
await assert.rejects(auditedAsync(remote, asyncLog).charge("o-7", 500), RangeError);
assert.deepEqual(asyncLog, ["charge o-7 500", "failed o-7 RangeError"]);

const calls: string[] = [];
const refund = withLog((id: string, cents: number) => `refund:${id}:${cents}`, calls, "refund");
assert.equal(refund("o-1", 500), "refund:o-1:500");
assert.deepEqual(calls, ["call refund"]);

const methodCalls: string[] = [];

function logged<This, A extends unknown[], R>(
  target: (this: This, ...args: A) => R,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: A) => R>,
) {
  return function (this: This, ...args: A): R {
    methodCalls.push(`call ${String(context.name)}`);
    return target.call(this, ...args);
  };
}

class Refunds {
  @logged
  refund(orderId: string): string {
    return `refund:${orderId}`;
  }
}

assert.equal(new Refunds().refund("o-1"), "refund:o-1");
assert.deepEqual(methodCalls, ["call refund"]);
```

A higher-order function plays the role of the decorator and needs no `@` syntax. The sync `audited` has the same async trap as the Python wrapper. Applied to an async gateway like the one in the adapter file, it would log "charged" with a pending `Promise` before it settles, and its `catch` would never see a rejection. `auditedAsync` is the awaited form: the wrapper is `async` and awaits the inner call inside the `try`, so a rejection is logged as a failure. The `@logged` form at the bottom is TypeScript's decorator syntax, which applies to classes and their members and not to a free function or an object literal, so the example needs a class only to have somewhere to put it. Reach for it when a framework you already use expects it. Otherwise wrap with a function. TypeScript 5 decorators like `@logged` are the standard form and need `experimentalDecorators` off; with it on you get the older legacy form, whose function signatures differ, so this `logged` would not compile.

## In production

- Python's `functools.cache` is a decorator in the standard library, and web frameworks use them to register routes and attach permission checks. A cache decorator needs an expiry or a clear path, because it serves stale values for the life of the process.
- HTTP clients wrapped to add retries, timeouts, tracing or auth headers around a base client with the same call signature.
- A caching layer around a repository or gateway that keeps the same interface.
- Middleware in Express, Koa and ASGI apps wraps the next handler, which is the decorator shape applied to requests. See [Chain of Responsibility](../behavioral/chain-of-responsibility.md).

## Smells and misuse

- A decorator that changes the signature or return type. Then it is an adapter, and callers cannot swap the wrapped and unwrapped versions.
- Forgetting `functools.wraps`, so logs and tracebacks say `wrapper`.
- Invisible order. Write `retry(breaker(op))` so each attempt counts toward the breaker; the reverse counts a whole retried call as one failure. Audit outside both logs the final result, inside logs every attempt. Define the stack in one place.
- Five stacked decorators on one function, so nobody can read what runs. Inline the logic, or compose them in one named function.
- A wrapper that swallows exceptions to be helpful.
- Stateful decorators with module-level state shared across calls, such as a cache that never expires.

## Related

- [Proxy](proxy.md) has the same shape and a different purpose: it controls access to the object, where a decorator adds behavior.
- [Adapter](adapter.md) changes the interface.
- [Retry with backoff](../resilience/retry-backoff.md) and [Circuit Breaker](../resilience/circuit-breaker.md) are usually applied as decorators.
- [Chain of Responsibility](../behavioral/chain-of-responsibility.md) is a stack of them on a request.
