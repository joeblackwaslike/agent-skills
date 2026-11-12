# Builder

## What it is and Problem it solves

A builder assembles an object across several calls and checks that it is complete in a final `build()` step. It helps when an object has many optional parts, when parts accumulate (line items, headers, query clauses), or when validity depends on several fields together and you want that check in one place.

## Do you need this?

Usually not. Python has keyword arguments with defaults, and TypeScript has an options object. `Order(items=items, coupon="SPRING")` already reads as well as a chain of method calls, and a frozen dataclass or `readonly` type validates in its constructor or a small `create` function.

The signal is accumulation or ordering. If callers add parts one at a time across several functions, or the final object cannot be valid until all parts are in, a builder pays for itself. If you can write every field in one expression, skip it.

## Python

```python
from collections.abc import Callable
from dataclasses import dataclass
from typing import Any, Self


@dataclass(frozen=True)
class LineItem:
    sku: str
    qty: int
    unit_cents: int


@dataclass(frozen=True)
class Order:
    items: tuple[LineItem, ...]
    coupon: str | None = None
    shipping_cents: int = 0

    @property
    def total_cents(self) -> int:
        return sum(i.qty * i.unit_cents for i in self.items) + self.shipping_cents


class OrderBuilder:
    def __init__(self) -> None:
        self._items: list[LineItem] = []
        self._coupon: str | None = None
        self._shipping_cents = 0

    def add(self, sku: str, qty: int, unit_cents: int) -> Self:
        if type(qty) is not int or qty < 1:
            raise ValueError("qty must be a whole number of at least 1")
        if unit_cents < 0:
            raise ValueError("unit_cents must not be negative")
        self._items.append(LineItem(sku, qty, unit_cents))
        return self

    def coupon(self, code: str) -> Self:
        self._coupon = code
        return self

    def shipping(self, cents: int) -> Self:
        if cents < 0:
            raise ValueError("shipping must not be negative")
        self._shipping_cents = cents
        return self

    def build(self) -> Order:
        if not self._items:
            raise ValueError("an order needs at least one item")
        return Order(tuple(self._items), self._coupon, self._shipping_cents)


order = OrderBuilder().add("tee", 2, 1500).add("cap", 1, 2000).shipping(500).build()
assert order.total_cents == 5500

direct = Order(items=(LineItem("tee", 2, 1500),), coupon="SPRING")
assert direct.total_cents == 3000

try:
    OrderBuilder().shipping(500).build()
except ValueError as err:
    assert "at least one item" in str(err)
else:
    raise AssertionError("empty order must not build")
fractional: Any = 1.5
bad_steps: list[Callable[[OrderBuilder], object]] = [lambda b: b.add("tee", fractional, 100), lambda b: b.add("tee", 0, 100), lambda b: b.add("tee", 1, -1), lambda b: b.shipping(-5)]
for step in bad_steps:
    try:
        step(OrderBuilder())
        raise AssertionError("invalid input must be rejected")
    except ValueError:
        continue
```

The builder is mutable and the `Order` it returns is frozen. `build()` copies the list into a tuple, so reusing the builder cannot change an order already built. Each step rejects negative amounts and a zero quantity, so a built order cannot have a negative total. The `direct` line shows the plain alternative; it is enough whenever the items are known up front.

## TypeScript

```typescript
import assert from "node:assert/strict";

type LineItem = { readonly sku: string; readonly qty: number; readonly unitCents: number };
type Order = { readonly items: readonly LineItem[]; readonly coupon: string | null; readonly shippingCents: number };

type OrderBuilder = {
  add(sku: string, qty: number, unitCents: number): OrderBuilder;
  coupon(code: string): OrderBuilder;
  shipping(cents: number): OrderBuilder;
  build(): Order;
};

export function orderBuilder(draft: Order = { items: [], coupon: null, shippingCents: 0 }): OrderBuilder {
  return {
    add(sku, qty, unitCents) {
      if (!Number.isInteger(qty) || qty < 1) throw new Error("qty must be a whole number of at least 1");
      if (!Number.isInteger(unitCents) || unitCents < 0) throw new Error("unitCents must be a non-negative integer");
      return orderBuilder({ ...draft, items: [...draft.items, { sku, qty, unitCents }] });
    },
    coupon: (code) => orderBuilder({ ...draft, coupon: code }),
    shipping(cents) {
      if (!Number.isInteger(cents) || cents < 0) throw new Error("shipping must be a non-negative integer");
      return orderBuilder({ ...draft, shippingCents: cents });
    },
    build() {
      if (draft.items.length === 0) throw new Error("an order needs at least one item");
      return { ...draft, items: Object.freeze(draft.items.map((item) => Object.freeze({ ...item }))) };
    },
  };
}

const base = orderBuilder().add("tee", 2, 1500);
const withShipping = base.shipping(500).build();
const plain = base.build();
assert.equal(withShipping.shippingCents, 500);
assert.equal(plain.shippingCents, 0);
assert.throws(() => orderBuilder().coupon("SPRING").build(), /at least one item/);
assert.throws(() => orderBuilder().add("tee", 1.5, 100), /whole number/);
assert.throws(() => orderBuilder().add("tee", Number.NaN, 100), /whole number/);
assert.throws(() => orderBuilder().add("tee", 1, -1), /non-negative/);
assert.throws(() => orderBuilder().shipping(-5), /non-negative/);
assert.ok(Object.isFrozen(withShipping.items) && Object.isFrozen(withShipping.items[0]));
```

Each call returns a new builder over a copied draft, so `base` can be branched without one branch leaking into the other, and `build()` freezes the items because `readonly` exists only at compile time. Checks reject non-integers and negatives, so a built order cannot have a negative total. In TypeScript the usual stand-in is an options object checked by a `createOrder(options)` function; use the chain only when parts arrive over time.

## In production

- SQL query builders chain clauses such as `.where()` and produce the statement at the end.
- Test data builders (`an_order().with_coupon("X").build()`) give tests a valid default and let each test override one field.
- Request construction in HTTP clients, where headers, params and body are added in separate steps.
- Config objects assembled from defaults, environment and flags.

## Smells and misuse

- A builder for a type with three fields. Use keyword arguments.
- `build()` that never validates. Then the builder is a bag of setters and the invalid object appears later, far from the cause.
- Reusing one mutable builder across calls and getting shared state. Copy on `build()` or return fresh builders.
- A "director" class that calls the builder in a fixed order. That is a function.
- Setters that can be called in the wrong order with different results. Make order not matter or enforce it with types.

## Related

- [Factory](factory.md) picks which type to make; Builder fills in one type.
- [Result / Option](../value-modeling/result-option.md) is an alternative to raising from `build()` when invalid input is expected.
- [Dependency Injection](dependency-injection.md) often wires builders into services; the builder itself should stay free of I/O.
