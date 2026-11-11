# Template Method

## What it is and Problem it solves

Template Method fixes the order of an algorithm in one place and lets variants fill in specific steps. A base class defines `process()` as validate, charge, record, notify, and subclasses override the steps that differ. It stops each variant from re-implementing, and subtly reordering, the shared skeleton.

## Do you need this?

Most of the time, pass the steps in. A function that takes callbacks (or an object of callbacks with defaults) does the same job without inheritance, and the variants stay independent of the base class.

Inheritance-based Template Method fits when a framework owns the skeleton and users plug in, and when the steps share a lot of state. If you find yourself writing a base class for two subclasses, write a function with two arguments.

## Python

```python
from abc import ABC, abstractmethod
from collections.abc import Callable
from dataclasses import dataclass


@dataclass(frozen=True)
class Payment:
    order_id: str
    cents: int


class PaymentProcessor(ABC):
    def process(self, payment: Payment) -> str:
        self.validate(payment)
        reference = self.charge(payment)
        self.record(payment, reference)
        return reference

    def validate(self, payment: Payment) -> None:
        if payment.cents <= 0:
            raise ValueError("amount must be positive")

    @abstractmethod
    def charge(self, payment: Payment) -> str: ...

    def record(self, payment: Payment, reference: str) -> None:
        pass


class CardProcessor(PaymentProcessor):
    def charge(self, payment: Payment) -> str:
        return f"card-{payment.order_id}"


class BankProcessor(PaymentProcessor):
    def validate(self, payment: Payment) -> None:
        super().validate(payment)
        if payment.cents > 1_000_000:
            raise ValueError("bank transfers are capped")

    def charge(self, payment: Payment) -> str:
        return f"bank-{payment.order_id}"


def process(
    payment: Payment,
    charge: Callable[[Payment], str],
    validate: Callable[[Payment], None] = lambda p: None,
) -> str:
    validate(payment)
    return charge(payment)


assert CardProcessor().process(Payment("o-1", 500)) == "card-o-1"
assert process(Payment("o-1", 500), lambda p: f"card-{p.order_id}") == "card-o-1"
```

`process` on the class is the template and subclasses never override it. The function version at the bottom covers the same ground with no hierarchy.

## TypeScript

```typescript
type Payment = { orderId: string; cents: number };

type Steps = {
  charge: (payment: Payment) => string;
  validate?: (payment: Payment) => void;
  record?: (payment: Payment, reference: string) => void;
};

function defaultValidate(payment: Payment): void {
  if (payment.cents <= 0) throw new Error("amount must be positive");
}

export function processPayment(payment: Payment, steps: Steps): string {
  (steps.validate ?? defaultValidate)(payment);
  const reference = steps.charge(payment);
  steps.record?.(payment, reference);
  return reference;
}

const recorded: string[] = [];

const card = (payment: Payment) =>
  processPayment(payment, {
    charge: (p) => `card-${p.orderId}`,
    record: (p, ref) => {
      recorded.push(`${p.orderId}:${ref}`);
    },
  });

console.assert(card({ orderId: "o-1", cents: 500 }) === "card-o-1");
console.assert(recorded.length === 1);
```

The skeleton lives in `processPayment`. Required steps are required properties; optional ones have defaults.

## In production

- Test frameworks: `unittest.TestCase` runs `setUp`, the test, then `tearDown` in a fixed order.
- Django class-based views call `dispatch`, then a method per HTTP verb, and expose hooks such as `get_queryset`.
- Abstract base classes in data pipelines (`extract`, `transform`, `load`).
- React class components' lifecycle methods were Template Method; hooks replaced it with functions.

## Smells and misuse

- Subclasses that override the template method itself. Mark it final in languages that can, and document it where they cannot.
- Many small hook methods, most no-ops, so no one can tell the real order from reading one subclass.
- Deep hierarchies, with a subclass of a subclass overriding one step.
- Steps that rely on state set by an earlier step in `self`. Pass values between steps as arguments.
- A base class created before there are two real variants.

## Related

- [Strategy](strategy.md) replaces a whole algorithm; Template Method varies steps inside a fixed one. Passing steps as functions blurs the two, which is fine.
- [Factory](../creational/factory.md) often chooses the processor subclass.
- [Chain of Responsibility](chain-of-responsibility.md) lets the caller assemble and reorder steps; Template Method does not.
- [SOLID principles](../../../solid-principles/SKILL.md) explains why composition tends to beat inheritance here.
