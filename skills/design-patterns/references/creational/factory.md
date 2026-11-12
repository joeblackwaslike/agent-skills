# Factory

## What it is and Problem it solves

A factory is a function (or a registry of functions) that turns a name or a config value into a ready-to-use object. Callers say what they want ("card", "bank") and get something that satisfies the contract, without importing every concrete type. It stops the `if provider == "card": ... elif provider == "bank": ...` chain from being copied into every place that needs a gateway.

## Do you need this?

Not if one place builds the object. Call the constructor there.

The signal is a third provider or a third call site that makes the same choice, or a name that arrives from outside (an environment variable, a request field, a config file) and has to be mapped to an implementation. With two providers and one call site, an `if` next to the constructor is clearer, and your IDE can follow it.

The plain version of a factory is a dict from name to constructor plus one lookup function. A `GatewayFactory` class, an abstract factory, or a factory of factories adds nothing at that size.

## Python

```python
from collections.abc import Callable
from decimal import Decimal

ChargeFn = Callable[[str, Decimal], str]


def card_gateway(api_key: str) -> ChargeFn:
    if not api_key:
        raise ValueError("card gateway needs an api key")

    def charge(order_id: str, amount: Decimal) -> str:
        return f"card:{order_id}:{amount}"

    return charge


def bank_gateway(account: str) -> ChargeFn:
    def charge(order_id: str, amount: Decimal) -> str:
        return f"bank:{account}:{order_id}:{amount}"

    return charge


GATEWAYS: dict[str, Callable[[str], ChargeFn]] = {
    "card": card_gateway,
    "bank": bank_gateway,
}


def make_gateway(provider: str, credential: str) -> ChargeFn:
    build = GATEWAYS.get(provider)
    if build is None:
        raise ValueError(f"unknown provider {provider!r}, expected one of {sorted(GATEWAYS)}")
    return build(credential)


assert make_gateway("card", "sk_test")("o-1", Decimal("5.00")) == "card:o-1:5.00"
assert make_gateway("bank", "acct-9")("o-1", Decimal("5.00")) == "bank:acct-9:o-1:5.00"
try:
    make_gateway("crypto", "sk_live_secret")
except ValueError as err:
    assert "crypto" in str(err) and "sk_live_secret" not in str(err)
else:
    raise AssertionError("unknown provider must raise")
```

Each entry is a function that returns a function, so there is no class to write. Adding a provider is one dict entry. The lookup fails with the provider name and the allowed keys, and never echoes the credential. If the implementations carry several methods or state, return a `Protocol` object from the same registry; a dataclass holding a secret should declare it with `field(repr=False)` so it stays out of logs.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Gateway = { charge(orderId: string, amountCents: number): string };
type GatewayFactory = (credential: string) => Gateway;

const gateways = new Map<string, GatewayFactory>([
  ["card", (apiKey) => {
    if (apiKey === "") throw new Error("card gateway needs an api key");
    return { charge: (id, cents) => `card:${id}:${cents}` };
  }],
  ["bank", (account) => ({ charge: (id, cents) => `bank:${account}:${id}:${cents}` })],
]);

export function makeGateway(provider: string, credential: string): Gateway {
  const build = gateways.get(provider);
  if (build === undefined) {
    throw new Error(`unknown provider "${provider}", expected one of ${[...gateways.keys()].join(", ")}`);
  }
  return build(credential);
}

assert.equal(makeGateway("card", "sk_test").charge("o-1", 500), "card:o-1:500");
assert.equal(makeGateway("bank", "acct-9").charge("o-1", 500), "bank:acct-9:o-1:500");
assert.throws(() => makeGateway("constructor", "x"), /unknown provider/);
assert.throws(() => makeGateway("crypto", "sk_live_secret"), (err: Error) => !err.message.includes("sk_live_secret"));
```

The registry is a `Map` because a plain object would answer `"constructor"` or `"__proto__"` with something inherited from `Object.prototype` instead of failing.

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
