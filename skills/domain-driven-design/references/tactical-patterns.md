# Tactical Patterns

These are the building blocks you actually write code with inside a single bounded context.
They exist to do one thing: **keep the business rules in the domain, enforced in one place,
expressed in the ubiquitous language.** Every pattern below is a tool for protecting an
invariant or naming a concept precisely.

Examples here are deliberately small and focused on one block at a time. For the same
concepts assembled into a complete, runnable bounded context, see `typescript-examples.md`
and `python-examples.md`.

## Value Objects

A **value object** has no identity — it's defined entirely by its attributes. Two `Money`
of $5 USD are interchangeable. Value objects are **immutable** and **self-validating**: once
constructed, they're guaranteed valid, so the rest of the code never re-checks them. This is
how you "make illegal states unrepresentable."

Properties to enforce:
- **Immutable** — operations return new instances, never mutate.
- **Self-validating** — the constructor rejects invalid input.
- **Equality by value** — two VOs with equal attributes are equal.
- **Side-effect-free behavior** — methods like `add`, `withStreet` compute, never mutate.

**TypeScript**

```ts
export class Money {
  private constructor(
    readonly amountMinor: number, // store minor units (cents) — never floats for money
    readonly currency: string,
  ) {}

  static fromMinor(amountMinor: number, currency: string): Money {
    if (!Number.isInteger(amountMinor)) throw new Error("amountMinor must be an integer");
    if (!/^[A-Z]{3}$/.test(currency)) throw new Error(`invalid currency: ${currency}`);
    return new Money(amountMinor, currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor + other.amountMinor, this.currency);
  }

  multiply(qty: number): Money {
    if (!Number.isInteger(qty) || qty < 0) throw new Error("qty must be a non-negative int");
    return new Money(this.amountMinor * qty, this.currency);
  }

  equals(other: Money): boolean {
    return this.amountMinor === other.amountMinor && this.currency === other.currency;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(`currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }
}
```

**Python** (Pydantic v2 — `frozen=True` gives immutability + value equality for free)

```python
from pydantic import BaseModel, field_validator

class Money(BaseModel):
    model_config = {"frozen": True}  # immutable + __eq__/__hash__ by value

    amount_minor: int  # cents — never use float for money
    currency: str

    @field_validator("currency")
    @classmethod
    def _valid_currency(cls, v: str) -> str:
        if len(v) != 3 or not v.isupper():
            raise ValueError(f"invalid currency: {v}")
        return v

    def add(self, other: "Money") -> "Money":
        self._assert_same_currency(other)
        return Money(amount_minor=self.amount_minor + other.amount_minor, currency=self.currency)

    def multiply(self, qty: int) -> "Money":
        if qty < 0:
            raise ValueError("qty must be non-negative")
        return Money(amount_minor=self.amount_minor * qty, currency=self.currency)

    def _assert_same_currency(self, other: "Money") -> None:
        if self.currency != other.currency:
            raise ValueError(f"currency mismatch: {self.currency} vs {other.currency}")
```

> Prefer value objects over primitives. A function signature `ship(order, address)` where
> `address` is a validated `Address` VO is safer and clearer than `ship(order, str, str,
> str)`. Replacing bare strings/ints with VOs is the cure for "primitive obsession" — see
> `anti-patterns.md`.

## Entities

An **entity** has **identity** that persists through change. A customer with a new email is
still the same customer. Equality is by id, not attributes. Entities are mutable, but every
mutation should go through a method that preserves the entity's rules — never a public
setter that lets callers put the object into an invalid state.

```ts
export class Customer {
  constructor(
    readonly id: CustomerId,
    private email: Email,        // Email is a value object
    private status: CustomerStatus,
  ) {}

  changeEmail(newEmail: Email): void {
    if (this.status === "suspended") throw new Error("suspended customers cannot change email");
    this.email = newEmail;
  }

  equals(other: Customer): boolean {
    return this.id.equals(other.id); // identity, not attributes
  }
}
```

## Aggregates and aggregate roots

This is the most important — and most misused — pattern. An **aggregate** is a cluster of
entities and value objects treated as a single unit for data changes, with one **aggregate
root** as the sole entry point. The root guards the aggregate's **invariants**: rules that
must hold across the whole cluster at all times.

For our domain, `Order` is an aggregate root; its `LineItem`s are entities/VOs *inside* the
aggregate. Outside code never holds a `LineItem` and mutates it — it calls
`order.addItem(...)`, and the root enforces rules like "can't add items to a shipped order"
or "order total can't exceed the customer's credit limit."

**TypeScript**

```ts
export class Order {
  private items: LineItem[] = [];
  private status: OrderStatus = "draft";
  private events: DomainEvent[] = [];

  constructor(
    readonly id: OrderId,
    readonly customerId: CustomerId, // reference OTHER aggregates by id, not by object
  ) {}

  addItem(productId: ProductId, unitPrice: Money, qty: Quantity): void {
    this.assertMutable();
    const existing = this.items.find((i) => i.productId.equals(productId));
    if (existing) existing.increase(qty);
    else this.items.push(new LineItem(productId, unitPrice, qty));
  }

  place(): void {
    if (this.status !== "draft") throw new Error("only a draft order can be placed");
    if (this.items.length === 0) throw new Error("cannot place an empty order");
    this.status = "placed";
    this.record(new OrderPlaced(this.id, this.customerId, this.total()));
  }

  markPaid(): void {
    if (this.status !== "placed") throw new Error("only a placed order can be paid");
    this.status = "paid";
    this.record(new OrderPaid(this.id));
  }

  ship(): void {
    // the key invariant: you cannot ship what hasn't been paid for
    if (this.status !== "paid") throw new Error("cannot ship an unpaid order");
    this.status = "shipped";
    this.record(new OrderShipped(this.id));
  }

  total(): Money {
    return this.items.reduce(
      (sum, i) => sum.add(i.subtotal()),
      Money.fromMinor(0, "USD"),
    );
  }

  /** The application layer pulls events after a successful save and publishes them. */
  pullEvents(): DomainEvent[] {
    const out = this.events;
    this.events = [];
    return out;
  }

  private record(e: DomainEvent): void {
    this.events.push(e);
  }

  private assertMutable(): void {
    if (this.status !== "draft") throw new Error("order is no longer editable");
  }
}
```

### Aggregate design rules

These rules are what separate a healthy aggregate from a god object:

1. **Keep aggregates small.** The aggregate is a *consistency* boundary, not a *containment*
   boundary. Include only what must be transactionally consistent together. When in doubt,
   make it smaller.
2. **Reference other aggregates by identity, not by object reference.** `Order` holds a
   `CustomerId`, not a `Customer`. This keeps aggregates independently loadable and prevents
   one giant object graph.
3. **One transaction = one aggregate.** A single command modifies and saves exactly one
   aggregate instance. If you feel the urge to update two aggregates atomically, that's a
   signal — use a domain event and eventual consistency instead (see below).
4. **Enforce invariants synchronously inside the boundary; accept eventual consistency
   outside it.** "Order total ≤ credit limit" inside `Order` is immediate. "Decrement
   inventory when an order ships" crosses aggregates — handle it asynchronously via the
   `OrderShipped` event.

## Domain Events

A **domain event** records that something meaningful happened in the domain, in the past
tense (`OrderPlaced`, `OrderShipped`). Events are immutable value objects. The aggregate
*records* them as side effects of state changes; the application layer *publishes* them
after the aggregate is durably saved. They are the mechanism for decoupling a decision from
its consequences, and the foundation of both CQRS projections and event sourcing.

```ts
export interface DomainEvent {
  readonly occurredAt: string; // ISO timestamp, set by the caller/clock
}

export class OrderShipped implements DomainEvent {
  readonly occurredAt = new Date().toISOString();
  constructor(readonly orderId: OrderId) {}
}
```

```python
from dataclasses import dataclass, field

@dataclass(frozen=True)
class OrderShipped:
    order_id: str
    occurred_at: str  # caller supplies via a clock — keeps the event pure & testable
```

> Naming matters: events are **facts that already happened**, so past tense. A present-tense
> name (`ShipOrder`) is a *command* — an instruction that can be rejected — which is a
> different thing (see `cqrs.md`). Mixing the two up muddles the model.

## Domain Services

When a piece of domain logic doesn't naturally belong to a single entity or value object —
typically because it spans several — put it in a **domain service**. A domain service is
stateless and named with a verb from the ubiquitous language. It still lives in the domain
layer and stays free of infrastructure.

Use sparingly: most logic belongs *on* an aggregate. Reach for a domain service only when
forcing the behavior onto one entity would be arbitrary. Example: a `PricingService` that
computes an order total from a product catalog and an active promotions policy — it
coordinates inputs that no single aggregate owns.

```ts
export class PricingService {
  constructor(private readonly promotions: PromotionPolicy) {}

  priceFor(items: LineItem[], customer: CustomerId): Money {
    const subtotal = items.reduce((s, i) => s.add(i.subtotal()), Money.fromMinor(0, "USD"));
    return this.promotions.apply(subtotal, customer);
  }
}
```

Do **not** let "service" become a dumping ground for logic that belongs on aggregates —
that's the road to an anemic domain model (`anti-patterns.md`).

## Factories

When constructing an aggregate is complex — multiple invariants to satisfy, several
collaborating objects — a **factory** encapsulates that creation so the aggregate is born
valid. A factory can be a static method on the aggregate (`Order.start(customerId)`), a
standalone function, or a dedicated class for the gnarliest cases.

```ts
export class Order {
  static start(customerId: CustomerId, clock: () => Date): Order {
    const order = new Order(OrderId.generate(), customerId);
    // any initial invariants enforced here, in one place
    return order;
  }
}
```

## Repositories

A **repository** gives you the illusion of an in-memory collection of aggregates, hiding all
persistence. Critically, the repository **interface is part of the domain** (expressed in
the ubiquitous language); the **implementation lives in infrastructure**. The domain depends
on the interface; the database adapter implements it. This is the dependency-inversion seam
that keeps the ORM out of your model.

Rules:
- **One repository per aggregate root** — `OrderRepository`, not `LineItemRepository`. You
  load and save whole aggregates, never their internal parts.
- **Collection-oriented interface** — `add`, `save`, `findById`, domain-meaningful finders
  like `findOpenOrdersFor(customerId)`. Avoid leaking query-builder/SQL semantics.
- **Returns fully-formed aggregates**, ready to have their methods called.

**TypeScript** (port in the domain)

```ts
export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>; // upsert the whole aggregate
}
```

**Python** (`Protocol` — structural typing, no inheritance coupling)

```python
from typing import Protocol

class OrderRepository(Protocol):
    async def find_by_id(self, order_id: str) -> "Order | None": ...
    async def save(self, order: "Order") -> None: ...
```

The Postgres/Mongo/in-memory implementations of these interfaces belong in the
infrastructure layer and are wired in at the edge — see `application-architecture.md`.

## Putting the blocks together

A typical write: the application service loads an `Order` aggregate through the
`OrderRepository` port, calls a method (`order.ship()`) that enforces the invariant and
records an `OrderShipped` event, saves the aggregate, then publishes the pulled events.
Value objects (`Money`, `Quantity`, `Address`) keep the data valid throughout; a domain
service handles any logic that spans aggregates. See the full assembly in the language
example files.
