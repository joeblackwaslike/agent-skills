# Factory

## What it is and Problem it solves

A factory is a function (or a registry of functions) that turns a name or a config value into a ready-to-use object. Callers say what they want ("card", "bank") and get something that satisfies the contract, without importing every concrete type. It stops the `if provider == "card": ... elif provider == "bank": ...` chain from being copied into every place that needs a gateway.

## Do you need this?

Not if one place builds the object. Call the constructor there.

The signal is a second call site that has to make the same choice, or a name that arrives from outside (an environment variable, a request field, a config file) and has to be mapped to an implementation. Until then a direct `CardGateway(key)` is clearer, and your IDE can follow it.

The plain version of a factory is a dict from name to constructor plus one lookup function. A `GatewayFactory` class, an abstract factory, or a factory of factories adds nothing at that size.

## Python

```python
from collections.abc import Callable
from dataclasses import dataclass
from decimal import Decimal
from typing import Protocol


class Gateway(Protocol):
    def charge(self, order_id: str, amount: Decimal) -> str: ...


@dataclass(frozen=True)
class CardGateway:
    api_key: str

    def charge(self, order_id: str, amount: Decimal) -> str:
        return f"card:{order_id}:{amount}"


@dataclass(frozen=True)
class BankGateway:
    account: str

    def charge(self, order_id: str, amount: Decimal) -> str:
        return f"bank:{self.account}:{order_id}:{amount}"


GATEWAYS: dict[str, Callable[[str], Gateway]] = {
    "card": CardGateway,
    "bank": BankGateway,
}


def make_gateway(provider: str, credential: str) -> Gateway:
    build = GATEWAYS.get(provider)
    if build is None:
        raise ValueError(f"unknown provider {provider!r}, expected one of {sorted(GATEWAYS)}")
    return build(credential)


ChargeFn = Callable[[str, Decimal], str]


def stub_charge(prefix: str) -> ChargeFn:
    return lambda order_id, amount: f"{prefix}:{order_id}:{amount}"


CHARGERS: dict[str, Callable[[str], ChargeFn]] = {"card": stub_charge, "bank": lambda account: stub_charge(f"bank:{account}")}

assert make_gateway("card", "sk_test").charge("o-1", Decimal("5.00")) == "card:o-1:5.00"
assert make_gateway("bank", "acct-9").charge("o-1", Decimal("5.00")).startswith("bank:acct-9")
assert CHARGERS["card"]("card")("o-1", Decimal("5.00")) == "card:o-1:5.00"
assert CHARGERS["bank"]("acct-9")("o-1", Decimal("5.00")) == "bank:acct-9:o-1:5.00"
try:
    make_gateway("crypto", "sk_live_secret")
except ValueError as err:
    assert "crypto" in str(err) and "sk_live_secret" not in str(err)
else:
    raise AssertionError("unknown provider must raise")
```

The two dataclasses are there to show a registry of classes. When the implementations are stateless apart from a credential, the function version at the bottom (`ChargeFn` plus a closure) is what this skill recommends: no class, same registry, same lookup. The error names the provider and the allowed keys, and never echoes the credential.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Gateway = { charge(orderId: string, amountCents: number): string };
type GatewayFactory = (credential: string) => Gateway;

const gateways = new Map<string, GatewayFactory>([
  ["card", (apiKey) => ({ charge: (id, cents) => `card:${id}:${cents}:${apiKey.length}` })],
  ["bank", (account) => ({ charge: (id, cents) => `bank:${account}:${id}:${cents}` })],
]);

export function makeGateway(provider: string, credential: string): Gateway {
  const build = gateways.get(provider);
  if (build === undefined) {
    throw new Error(`unknown provider "${provider}", expected one of ${[...gateways.keys()].join(", ")}`);
  }
  return build(credential);
}

assert.equal(makeGateway("bank", "acct-9").charge("o-1", 500), "bank:acct-9:o-1:500");
assert.throws(() => makeGateway("constructor", "x"), /unknown provider/);
assert.throws(() => makeGateway("crypto", "sk_live_secret"), (err: Error) => !err.message.includes("sk_live_secret"));
```

Each entry is a function returning an object literal, so no class is involved. The registry is a `Map` because a plain object would answer `"constructor"` or `"__proto__"` with something inherited from `Object.prototype` instead of failing.

## In production

- `document.createElement(tagName)` builds a different element type depending on the string you pass.
- Python's `codecs.lookup(encoding)` maps an encoding name to its codec implementation.
- `requests.Session.get_adapter(url)` picks a transport adapter from a registry keyed by URL prefix, with the longest matching prefix winning.
- Payment code usually has one `make_gateway(settings)` called from the composition root (see [Dependency Injection](dependency-injection.md)), so only that one function knows which providers exist.

## Smells and misuse

- A factory with one product. Call the constructor.
- An `if/elif` ladder inside the factory that grows every release. Switch to the registry so adding a provider is one entry.
- A factory that returns a base type and every caller then does `isinstance` to reach the real one. The contract is too thin.
- User input used directly as the lookup key with no explicit failure for unknown names, or a failure message that includes the credential.
- Global mutable registry that tests and plugins both write to, so test order changes behavior.

## Related

- [Strategy](../behavioral/strategy.md) is what the factory usually hands back; the factory chooses once, Strategy is swapped per call.
- [Dependency Injection](dependency-injection.md) decides where the factory is called, which should be one place.
- [Builder](builder.md) is for objects with many optional parts; a factory is for choosing among types.
