# CQRS — Command Query Responsibility Segregation

CQRS is one idea: **use a different model to change state than the one you use to read
state.** Writes go through the rich domain model (aggregates enforcing invariants); reads
come from separate, denormalized **read models** shaped for the screen or report that needs
them. That's it. Everything else is variation on how far apart you push the two sides.

CQRS is **not** event sourcing, **not** two databases, and **not** eventual consistency.
Those are options you can layer on, not requirements. Plenty of useful CQRS is two sets of
classes against the same database.

## Why split at all?

In a single model, the same `Order` class is asked to do incompatible jobs:
- **Writes** need invariants, encapsulation, behavior — a `place()` method that rejects
  illegal transitions.
- **Reads** need fast, flat, joined data — "show me this customer's last 20 orders with
  product thumbnails and current shipment status," ideally one query, no domain logic.

Forcing both through one model makes the write model leak read concerns (getters for every
field so the UI can render) and makes reads slow (rehydrating full aggregates just to
display a list). Splitting lets each side be good at its one job.

## Commands vs. queries

| | Command | Query |
| --- | --- | --- |
| Intent | Change state | Return data |
| Names | Imperative: `PlaceOrder`, `ShipOrder` | `GetOrderSummary`, `ListOpenOrders` |
| Returns | Nothing meaningful (an id/ack at most) | A read model / DTO |
| Side effects | Yes — goes through an aggregate | None |
| Can be rejected | Yes (invariant violated) | No |

A **command** is a request to do something that the domain may refuse. A **query** never
changes anything and never touches an aggregate.

## The write side: command + handler

A **command** is a plain data object naming an intent. A **command handler** is a thin
application-layer use case: load the aggregate, call its method, save, publish events. The
handler holds *no* business rules — those live in the aggregate. It orchestrates.

**TypeScript**

```ts
// Command — a plain, validated data object (validate at the boundary with Zod).
export interface ShipOrder {
  readonly orderId: string;
}

export class ShipOrderHandler {
  constructor(
    private readonly orders: OrderRepository,
    private readonly events: EventPublisher,
  ) {}

  async handle(cmd: ShipOrder): Promise<void> {
    const order = await this.orders.findById(new OrderId(cmd.orderId));
    if (!order) throw new OrderNotFound(cmd.orderId);

    order.ship();                       // ← the invariant lives here, not in the handler
    await this.orders.save(order);      // ← one aggregate, one transaction
    await this.events.publishAll(order.pullEvents()); // ← OrderShipped goes out
  }
}
```

**Python**

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ShipOrder:
    order_id: str

class ShipOrderHandler:
    def __init__(self, orders: OrderRepository, events: EventPublisher) -> None:
        self._orders = orders
        self._events = events

    async def handle(self, cmd: ShipOrder) -> None:
        order = await self._orders.find_by_id(cmd.order_id)
        if order is None:
            raise OrderNotFound(cmd.order_id)

        order.ship()                       # invariant enforced in the aggregate
        await self._orders.save(order)     # one aggregate, one transaction
        await self._events.publish_all(order.pull_events())
```

## The read side: read models + projections

A **read model** is a denormalized representation built for a specific query — often a flat
table or document that needs no joins at read time. You keep it up to date with a
**projection**: a handler that listens to domain events and writes the read model.

**Read model** (just data — no behavior, no invariants):

```ts
export interface OrderSummaryView {
  orderId: string;
  customerName: string;
  status: string;
  totalMinor: number;
  currency: string;
  placedAt: string;
}
```

**Projection** (subscribes to events, maintains the view):

```ts
export class OrderSummaryProjection {
  constructor(private readonly views: OrderSummaryStore) {}

  async on(event: DomainEvent): Promise<void> {
    if (event instanceof OrderPlaced) {
      await this.views.upsert({
        orderId: event.orderId.value,
        customerName: await this.lookupName(event.customerId),
        status: "placed",
        totalMinor: event.total.amountMinor,
        currency: event.total.currency,
        placedAt: event.occurredAt,
      });
    } else if (event instanceof OrderShipped) {
      await this.views.setStatus(event.orderId.value, "shipped");
    }
  }
}
```

**Query handler** (reads the view directly — never loads an aggregate):

```ts
export class GetOrderSummaryHandler {
  constructor(private readonly views: OrderSummaryStore) {}

  // Returns the read model straight from the denormalized store. Fast. No domain logic.
  get(orderId: string): Promise<OrderSummaryView | null> {
    return this.views.findById(orderId);
  }
}
```

Python mirrors this exactly: a `@dataclass` (or Pydantic model) for `OrderSummaryView`, an
`async def on(self, event)` projection that `match`es on event type, and a query handler
that reads the store. See `python-examples.md` for the assembled version.

## Synchronous vs. asynchronous projections

You choose how the read model stays current:

| Mode | How | Consistency | Use when |
| --- | --- | --- | --- |
| **Synchronous** | Update the read model in the same transaction as the write | Read-your-writes immediately | Simplicity matters; same DB; modest scale |
| **Asynchronous** | Publish events to a bus; a separate consumer updates the view | **Eventually** consistent (ms–s lag) | Reads scale independently; separate store; high throughput |

Async projections are where "eventual consistency" enters. The UI may briefly show an order
as "placed" a beat before the projection flips it to "shipped." If your product can't
tolerate that on a given screen, read that screen synchronously — you can mix modes per
view.

## When CQRS helps — and when it's overkill

**Reach for it when:**
- Read and write shapes genuinely diverge (complex dashboards vs. transactional writes).
- Reads vastly outnumber writes and need to scale/cache independently.
- The write model is getting polluted with getters and DTOs purely to serve reads.
- You're already emitting domain events, so projections are cheap to add.

**Skip it when:**
- The read shape ≈ the write shape (basic CRUD). Two models that look identical is pure
  overhead — you've doubled the code for nothing.
- The team is small and the consistency reasoning isn't worth the cognitive load.
- You're adding it because it sounds architecturally serious. That's cargo-culting; see
  `anti-patterns.md`.

A pragmatic middle path: keep one rich write model, and for reads just run **plain
read-only queries** (raw SQL / a thin query object) that bypass the aggregate, against the
*same* database. You get most of CQRS's benefit (reads don't drag the domain model around)
with almost none of its cost (no separate store, no projections, no eventual consistency).
Escalate to full projections only when scale or shape demands it.

CQRS composes naturally with event sourcing — events are both your write-side source of
truth and the feed for projections — but neither requires the other. See
`event-sourcing.md`.
