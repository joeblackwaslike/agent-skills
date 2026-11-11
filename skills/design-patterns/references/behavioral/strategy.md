# Strategy

## What it is and Problem it solves

Strategy lets the caller pick one of several interchangeable algorithms at runtime. The code that needs the algorithm depends on a small contract, usually one function signature, and does not know which implementation it got. It removes the `if provider == "stripe" ... elif provider == "adyen"` chain that grows a branch every time a new variant ships.

## Do you need this?

Probably not as a pattern. Start with a function argument or dict of functions. If the variants are stateless, a `Callable` parameter or a lookup table of callables is the whole thing, and calling it "Strategy" adds nothing.

Reach for a Protocol and one object per variant only when the variants carry their own state or configuration (an API key, a client, a retry policy) or need more than one method.

If there are two variants and no third in sight, an `if` is fine.

## Python

```python
from collections.abc import Callable
from dataclasses import dataclass
from decimal import Decimal
from typing import Protocol


@dataclass(frozen=True)
class Order:
    id: str
    subtotal: Decimal
    country: str


TaxRule = Callable[[Order], Decimal]


def no_tax(order: Order) -> Decimal:
    return Decimal(0)


TAX_RULES: dict[str, TaxRule] = {
    "US": lambda o: o.subtotal * Decimal("0.0875"),
    "DE": lambda o: o.subtotal * Decimal("0.19"),
}


def total(order: Order, tax: TaxRule | None = None) -> Decimal:
    rule = tax or TAX_RULES.get(order.country, no_tax)
    return order.subtotal + rule(order)


class Gateway(Protocol):
    def charge(self, order: Order, amount: Decimal) -> str: ...


@dataclass
class CardGateway:
    api_key: str

    def charge(self, order: Order, amount: Decimal) -> str:
        return f"card:{order.id}:{amount}"


@dataclass
class BankGateway:
    account: str

    def charge(self, order: Order, amount: Decimal) -> str:
        return f"bank:{self.account}:{order.id}:{amount}"


def checkout(order: Order, gateway: Gateway) -> str:
    return gateway.charge(order, total(order))


order = Order("o-1", Decimal(100), "DE")
assert total(order) == Decimal(119)
assert total(order, tax=no_tax) == Decimal(100)
assert checkout(order, BankGateway("acct-9")).startswith("bank:")
```

`total` takes a plain function. `checkout` takes a `Protocol` because each gateway holds configuration. Both are Strategy; only the second needs a type.

## TypeScript

```typescript
type Order = { id: string; subtotalCents: number; country: string };
type TaxRule = (order: Order) => number;

const noTax: TaxRule = () => 0;

const taxRules: Record<string, TaxRule> = {
  US: (o) => Math.round(o.subtotalCents * 0.0875),
  DE: (o) => Math.round(o.subtotalCents * 0.19),
};

export function totalCents(order: Order, tax?: TaxRule): number {
  const rule = tax ?? taxRules[order.country] ?? noTax;
  return order.subtotalCents + rule(order);
}

type Gateway = { charge(order: Order, amountCents: number): string };

export const cardGateway = (apiKey: string): Gateway => ({
  charge: (order, amountCents) => `card:${apiKey.slice(0, 4)}:${order.id}:${amountCents}`,
});

export function checkout(order: Order, gateway: Gateway): string {
  return gateway.charge(order, totalCents(order));
}

const order: Order = { id: "o-1", subtotalCents: 10_000, country: "DE" };
console.assert(totalCents(order) === 11_900);
console.assert(checkout(order, cardGateway("sk_test_1")).startsWith("card:"));
```

A closure over `apiKey` replaces the class. TypeScript's structural typing means any object with a matching `charge` is a `Gateway`, so no interface declaration is needed on the implementers.

## In production

- `sorted(key=...)` and `Array.prototype.sort(compareFn)` take a strategy for ordering.
- Passport.js strategies (local, OAuth, JWT) are interchangeable authenticators behind one `authenticate` contract.
- Django REST framework's authentication and permission classes are listed in settings and called through one interface.
- Payment code that supports several processors usually has a `Gateway` Protocol with one adapter per processor, chosen by config or by the order's region.

## Smells and misuse

- One-method class with no state, used once. It should be a function.
- A strategy chosen by an `if` right next to the call site, with the strategies themselves still branching on type. The branching moved; it did not go away.
- A Protocol with many methods so that every implementer stubs half of them. Split it, or you are looking at a different pattern.
- Strategy picked by a string key from user input with no allow-list. The dict lookup needs a default or an explicit error.
- Class hierarchy for the strategies when a dict of lambdas fit on one screen.

## Related

- [Factory](../creational/factory.md) picks which strategy to hand over from config.
- [Dependency Injection](../creational/dependency-injection.md) is how a strategy usually arrives at a service.
- [State](state.md) looks the same in code, but the object swaps its own behavior as its status changes, while a strategy is chosen by the caller.
- [Template Method](template-method.md) varies steps inside a fixed skeleton; Strategy replaces the whole algorithm.
