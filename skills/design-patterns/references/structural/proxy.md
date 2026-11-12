# Proxy

## What it is and Problem it solves

A proxy stands in for another object with the same interface and decides whether, when, and how a call reaches the real one. The caller does not know. Typical jobs are lazy creation (do not build the expensive client until it is used), caching, access checks, and standing in for something remote.

## Do you need this?

Not if a plain check at the call site does it. `if not user.can_refund: raise` before the call is shorter than a class that wraps the gateway.

The signal is that the same control has to apply to every method of an object and to every caller, and callers should not be able to forget it. A permission check repeated in six handlers will eventually be missing from a seventh; a proxy cannot be bypassed by a caller that only holds the proxy. Lazy creation is the other signal: the real object is costly to build and often never used, such as a client that opens a connection in its constructor.

Proxy and Decorator have the same shape. A decorator adds behavior to every call. A proxy controls access to the object, including whether the real one exists yet.

## Python

```python
from collections.abc import Callable
from decimal import Decimal
from typing import Protocol


class Gateway(Protocol):
    def charge(self, order_id: str, amount: Decimal) -> str: ...


class CardGateway:
    def charge(self, order_id: str, amount: Decimal) -> str:
        return f"card:{order_id}:{amount}"


class LazyGateway:
    def __init__(self, create: Callable[[], Gateway]) -> None:
        self._create = create
        self._real: Gateway | None = None

    def charge(self, order_id: str, amount: Decimal) -> str:
        if self._real is None:
            self._real = self._create()
        return self._real.charge(order_id, amount)


class PermissionDenied(Exception):
    pass


class RoleGatedGateway:
    def __init__(self, inner: Gateway, roles: frozenset[str]) -> None:
        self._inner = inner
        self._roles = roles

    def charge(self, order_id: str, amount: Decimal) -> str:
        if "cashier" not in self._roles:
            raise PermissionDenied(f"charge needs the cashier role, had {sorted(self._roles)}")
        return self._inner.charge(order_id, amount)


built: list[int] = []


def make() -> Gateway:
    built.append(1)
    return CardGateway()


lazy: Gateway = LazyGateway(make)
assert built == []
assert lazy.charge("o-1", Decimal("5.00")) == "card:o-1:5.00"
lazy.charge("o-2", Decimal("1.00"))
assert built == [1]

gated: Gateway = RoleGatedGateway(CardGateway(), frozenset({"viewer"}))
try:
    gated.charge("o-3", Decimal("5.00"))
except PermissionDenied:
    pass
else:
    raise AssertionError("viewer must not charge")
assert RoleGatedGateway(CardGateway(), frozenset({"cashier"})).charge("o-4", Decimal("2.00")) == "card:o-4:2.00"
```

Both proxies satisfy `Gateway`, so a caller holds one and cannot tell. The lazy one builds the real gateway on the first call only. A proxy built with `__getattr__` forwarding would work for any interface, but the type checker would see no methods on it. Writing the methods out keeps the contract checked.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Gateway = { charge(orderId: string, amountCents: number): string };

function lazy<T extends object>(create: () => T): T {
  let real: T | undefined;
  return new Proxy({} as T, {
    get(_target, prop) {
      if (prop === "then") return undefined;
      real ??= create();
      const value: unknown = Reflect.get(real, prop, real);
      return typeof value === "function" ? value.bind(real) : value;
    },
  });
}

export const roleGated = (inner: Gateway, roles: ReadonlySet<string>): Gateway => ({
  charge(orderId, amountCents) {
    if (!roles.has("cashier")) throw new Error("charge needs the cashier role");
    return inner.charge(orderId, amountCents);
  },
});

let built = 0;
const gateway = lazy<Gateway>(() => {
  built += 1;
  return { charge: (id, cents) => `card:${id}:${cents}` };
});
assert.equal(built, 0);
assert.equal(gateway.charge("o-1", 500), "card:o-1:500");
gateway.charge("o-2", 100);
assert.equal(built, 1);
const idle = lazy<Gateway>(() => {
  built += 1;
  return gateway;
});
assert.equal(await idle, idle);
assert.equal(built, 1);

assert.throws(() => roleGated(gateway, new Set(["viewer"])).charge("o-3", 500), /cashier/);
assert.equal(roleGated(gateway, new Set(["cashier"])).charge("o-4", 200), "card:o-4:200");
```

JavaScript has a built-in `Proxy` that intercepts property access with a handler such as `get`, and `Reflect.get` forwards the lookup to the real object. `lazy` traps only `get`, so it suits method-only interfaces: property writes, `in` and `Object.keys` would hit the empty stand-in, so add `set`, `has` and `ownKeys` traps before proxying data objects. It returns `undefined` for `then`, so `await`ing the proxy does not build the real object. The explicit closure in `roleGated` is simpler when you only guard a few methods, and it type-checks without a cast.

## In production

- Lazy loading of related rows in ORMs, where accessing an attribute triggers the query. Remote stubs (gRPC, RPC clients) are proxies that make a network call.
- Vue 3's `reactive()` objects are JavaScript Proxies that intercept property reads and writes to track dependencies.
- Caching proxies in front of a slow lookup. Give the cache an expiry or an invalidation path, since a proxy that serves stale prices or balances looks identical to a fresh one.

## Smells and misuse

- A proxy that changes the contract. `RoleGatedGateway` raises `PermissionDenied`, which `Gateway` does not declare, so callers must know to handle it; declare it or return a result type.
- Security enforced only in the proxy while the real object is still reachable by import. The check protects nothing if someone can get the unwrapped one.
- Lazy creation under concurrency. With threads (`LazyGateway`) or an async factory, two first calls can both build the object; guard it with a lock or a shared promise, or create it at startup. The synchronous `lazy` above cannot race in single-threaded JavaScript.
- Traps that hide errors (returning `undefined` for a missing method), or proxying when a plain guard would do.

## Related

- [Decorator](decorator.md) wraps with the same interface to add behavior.
- [Adapter](adapter.md) changes the interface.
- [Singleton](../creational/singleton.md) covers lazily created shared instances without a proxy.
- [Circuit Breaker](../resilience/circuit-breaker.md) is usually built as a decorator-style wrapper around the client; it controls access to a remote call, which is the proxy's job.
