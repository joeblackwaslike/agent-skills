# State

## What it is and Problem it solves

State models something whose allowed behavior depends on where it is in a lifecycle. An order can be shipped only after it is paid, and cancelled only while it is pending (after payment it is refunded). Without an explicit model, those rules end up as scattered `if order.status == ...` checks that drift apart.

## Do you need this?

If there are two or three statuses and one or two rules, a status field and an `if` is enough.

The first upgrade is a transition table: a dict from current status to allowed next statuses. It is data, so it is easy to read, test and print as a diagram. State classes or objects earn their keep when you branch on status inside three or more methods and the branches have different bodies, not just different permissions. Most order and payment lifecycles never need them.

## Python

```python
from dataclasses import dataclass, replace
from enum import StrEnum


class Status(StrEnum):
    PENDING = "pending"
    PAID = "paid"
    SHIPPED = "shipped"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class Event(StrEnum):
    PAY = "pay"
    SHIP = "ship"
    CANCEL = "cancel"
    REFUND = "refund"


TRANSITIONS: dict[tuple[Status, Event], Status] = {
    (Status.PENDING, Event.PAY): Status.PAID,
    (Status.PENDING, Event.CANCEL): Status.CANCELLED,
    (Status.PAID, Event.SHIP): Status.SHIPPED,
    (Status.PAID, Event.REFUND): Status.REFUNDED,
    (Status.SHIPPED, Event.REFUND): Status.REFUNDED,
}


class IllegalTransition(Exception):
    def __init__(self, status: Status, event: Event) -> None:
        super().__init__(f"cannot {event} an order that is {status}")
        self.status = status
        self.event = event


@dataclass(frozen=True)
class Order:
    id: str
    status: Status = Status.PENDING

    def apply(self, event: Event) -> "Order":
        next_status = TRANSITIONS.get((self.status, event))
        if next_status is None:
            raise IllegalTransition(self.status, event)
        return replace(self, status=next_status)


order = Order("o-1").apply(Event.PAY).apply(Event.SHIP)
assert order.status is Status.SHIPPED

try:
    order.apply(Event.CANCEL)
except IllegalTransition as err:
    assert err.status is Status.SHIPPED
else:
    raise AssertionError("shipped orders must not cancel")
```

Everything the lifecycle allows is in `TRANSITIONS`. Anything not in the table raises `IllegalTransition`, so a bad call fails loudly where it happens and does not write a nonsense status. `Order` is immutable; `apply` returns the next one.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Status = "pending" | "paid" | "shipped" | "cancelled" | "refunded";
type Event = "pay" | "ship" | "cancel" | "refund";

type Order = { readonly id: string; readonly status: Status };

const transitions: Record<Status, Partial<Record<Event, Status>>> = {
  pending: { pay: "paid", cancel: "cancelled" },
  paid: { ship: "shipped", refund: "refunded" },
  shipped: { refund: "refunded" },
  cancelled: {},
  refunded: {},
};

export class IllegalTransition extends Error {
  constructor(
    readonly status: Status,
    readonly event: Event,
  ) {
    super(`cannot ${event} an order that is ${status}`);
    this.name = "IllegalTransition";
  }
}

export function apply(order: Order, event: Event): Order {
  const row = Object.hasOwn(transitions, order.status) ? transitions[order.status] : undefined;
  const next = row !== undefined && Object.hasOwn(row, event) ? row[event] : undefined;
  if (next === undefined) throw new IllegalTransition(order.status, event);
  return { ...order, status: next };
}

const shipped = apply(apply({ id: "o-1", status: "pending" }, "pay"), "ship");
assert.equal(shipped.status, "shipped");
assert.throws(() => apply(shipped, "cancel"), IllegalTransition);
assert.throws(() => apply(shipped, "toString" as Event), IllegalTransition);
```

Lookups use `Object.hasOwn` so a key like `"toString"` cannot pick up an inherited function. The `Record<Status, ...>` type makes the compiler complain if you add a status and forget its row. A discriminated union (`{ status: "shipped"; trackingId: string }`) is the next step when some statuses carry data that others do not.

## In production

- Order, payment and subscription lifecycles. Stripe's PaymentIntent statuses are a published state machine.
- Workflow engines and libraries such as `transitions` (Python) and XState (TypeScript) formalize the table, add guards and actions, and can draw the diagram.
- TCP connection states, UI wizards and upload progress are the same shape.
- Database enums plus a check or trigger that enforces legal transitions at the storage layer.

## Smells and misuse

- Status compared with `==` in many files. Route every change through one transition function.
- Setting `order.status = "shipped"` directly. That bypasses every rule in the table.
- Missing terminal states, so cancelled orders can be paid.
- Guards and side effects tucked inside the table. Keep the table about shape; do emails and charges in the code that calls `apply`.
- State classes with one method each, when a table row would do.
- Concurrent updates. Two requests can both read `pending`; protect the write with a version column or `UPDATE ... WHERE status = 'pending'`.

## Related

- [Strategy](strategy.md) is chosen by the caller; State is changed by the object's own history.
- [Command](command.md) and [Observer](observer.md) usually surround it: a command asks for a transition, an event announces it.
- [Result / Option](../value-modeling/result-option.md) is an alternative to raising `IllegalTransition`.
- [Repository](../data-access/repository.md) is where the new status gets saved.
