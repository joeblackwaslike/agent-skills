# Event Sourcing

Event sourcing (ES) changes **how you store an aggregate**. Instead of saving its current
state (one row that you overwrite), you store the **full sequence of domain events** that
brought it to that state. The events are the source of truth; current state is a *derived*
value you get by replaying them.

```
State-stored:   orders(id, status='shipped', total=4200)   ← overwrites history
Event-sourced:  OrderPlaced → OrderPaid → OrderShipped      ← append-only facts
                (replay these to learn "status = shipped")
```

ES is the highest-cost, highest-power option in this skill. Read the tradeoffs at the bottom
**before** adopting it. It is not required by DDD or CQRS, though all three compose well.

## Why store events?

- **Perfect audit trail.** You don't reconstruct "what happened" — the events *are* what
  happened. Compliance, debugging, and "why is this order in this state?" become trivial.
- **Temporal queries.** Replay to any point in time: "what did this order look like last
  Tuesday?"
- **New read models for free, retroactively.** Need a new projection? Replay the existing
  event history through it and it's populated with all historical data — something
  impossible when you only kept current state.
- **The domain already speaks in events.** If you're emitting domain events anyway (you
  should be), persisting them is a small step.

## An event-sourced aggregate

The shape changes in two ways:
1. State transitions are split into **decide** (validate the command, produce an event) and
   **apply** (mutate state from an event). The `apply` methods contain *no* validation —
   they just fold an event into state, and are reused during replay.
2. The aggregate can be **rehydrated** by replaying its events from an empty starting point.

**TypeScript**

```ts
type OrderEvent = OrderPlaced | OrderPaid | OrderShipped;

export class Order {
  private status: OrderStatus = "draft";
  private customerId!: CustomerId;
  private totalMinor = 0;
  private pending: OrderEvent[] = [];
  version = 0; // for optimistic concurrency on the event store

  /** Rebuild from history — no validation, just fold events into state. */
  static fromHistory(events: OrderEvent[]): Order {
    const order = new Order();
    for (const e of events) order.apply(e);
    return order;
  }

  // ---- decide: validate, then record (the invariant lives here) ----
  place(customerId: CustomerId, total: Money): void {
    if (this.status !== "draft") throw new Error("only a draft order can be placed");
    this.raise(new OrderPlaced(/* id */ OrderId.generate(), customerId, total));
  }

  pay(): void {
    if (this.status !== "placed") throw new Error("only a placed order can be paid");
    this.raise(new OrderPaid(this.orderId()));
  }

  ship(): void {
    if (this.status !== "paid") throw new Error("cannot ship an unpaid order");
    this.raise(new OrderShipped(this.orderId()));
  }

  pullEvents(): OrderEvent[] {
    const out = this.pending;
    this.pending = [];
    return out;
  }

  // ---- apply: fold an event into state, NO validation (reused on replay) ----
  private apply(e: OrderEvent): void {
    if (e instanceof OrderPlaced) {
      this.customerId = e.customerId;
      this.totalMinor = e.total.amountMinor;
      this.status = "placed";
    } else if (e instanceof OrderPaid) {
      this.status = "paid";
    } else if (e instanceof OrderShipped) {
      this.status = "shipped";
    }
    this.version++;
  }

  private raise(e: OrderEvent): void {
    this.apply(e);        // update our own state immediately...
    this.pending.push(e); // ...and queue it to be persisted
  }
}
```

**Python** (the same decide/apply split, using `match`)

```python
class Order:
    def __init__(self) -> None:
        self.status = "draft"
        self.customer_id: str | None = None
        self.total_minor = 0
        self.version = 0
        self._pending: list[object] = []

    @classmethod
    def from_history(cls, events: list[object]) -> "Order":
        order = cls()
        for e in events:
            order._apply(e)
        return order

    # decide — validation lives here
    def pay(self) -> None:
        if self.status != "placed":
            raise ValueError("only a placed order can be paid")
        self._raise(OrderPaid(order_id=self._id))

    def ship(self) -> None:
        if self.status != "paid":
            raise ValueError("cannot ship an unpaid order")
        self._raise(OrderShipped(order_id=self._id))

    def pull_events(self) -> list[object]:
        out, self._pending = self._pending, []
        return out

    # apply — no validation, reused on replay
    def _apply(self, e: object) -> None:
        match e:
            case OrderPlaced():
                self.customer_id, self.total_minor, self.status = e.customer_id, e.total_minor, "placed"
            case OrderPaid():
                self.status = "paid"
            case OrderShipped():
                self.status = "shipped"
        self.version += 1

    def _raise(self, e: object) -> None:
        self._apply(e)
        self._pending.append(e)
```

## The event store

An **event store** is an append-only log keyed by aggregate (stream) id. Its core operations:

- `append(streamId, events, expectedVersion)` — append new events, using `expectedVersion`
  for **optimistic concurrency** (reject if someone else appended since you loaded).
- `read(streamId)` — return the ordered events for one aggregate, to rehydrate it.

```ts
export interface EventStore {
  append(streamId: string, events: OrderEvent[], expectedVersion: number): Promise<void>;
  read(streamId: string): Promise<OrderEvent[]>;
}
```

The repository for an event-sourced aggregate is implemented on top of the event store:
`findById` reads the stream and calls `Order.fromHistory(events)`; `save` appends
`order.pullEvents()` at the expected version.

```ts
export class EventSourcedOrderRepository implements OrderRepository {
  constructor(private readonly store: EventStore) {}

  async findById(id: OrderId): Promise<Order | null> {
    const events = await this.store.read(id.value);
    return events.length ? Order.fromHistory(events) : null;
  }

  async save(order: Order): Promise<void> {
    const newEvents = order.pullEvents();
    if (newEvents.length === 0) return;
    // version - newEvents.length = the version we loaded at (optimistic check)
    await this.store.append(order.id.value, newEvents, order.version - newEvents.length);
  }
}
```

Notice the application layer **doesn't change**: it still calls `repo.findById`, an
aggregate method, and `repo.save`. ES is hidden behind the repository port — that's the
payoff of keeping persistence behind an interface (`application-architecture.md`).

## Snapshots

Replaying thousands of events on every load gets slow. A **snapshot** is a periodically
saved copy of an aggregate's state at version N. To rehydrate: load the latest snapshot,
then replay only the events *after* it. Snapshots are a pure optimization — they're derived
from events and can always be rebuilt or discarded. Add them only when replay actually
becomes a bottleneck; don't build them speculatively.

## Projections rebuilt from the stream

In an event-sourced system, your CQRS read models are projections over the event log. The
superpower: to add a new read model, you replay the **entire** history through the new
projection and it's instantly backfilled with all historical data. To fix a buggy
projection, you rebuild it from scratch from the events. The write side never has to know.

## Pitfalls — read before adopting

- **Events are immutable and forever.** You can't "fix" a bad event by editing it. To
  correct state you append a *compensating* event (`OrderCancelled`), never a delete or
  update. Designing good events up front matters more than with state storage.
- **Schema evolution / versioning.** Event shapes change over years. You need an
  **upcasting** strategy: transform old event versions into new ones on read. Plan for this
  on day one — `OrderPlacedV1` → `OrderPlacedV2`.
- **No ad-hoc queries on the write store.** "Find all orders over $500" isn't a query
  against an event log — it requires a projection. You *must* build read models; reads are
  never free.
- **Eventual consistency is usually in the mix.** Projections lag the write side. Your UX
  must tolerate it (or read certain views synchronously).
- **Higher cognitive load.** Every engineer on the team must understand decide/apply,
  replay, versioning, and projections. This is a real, ongoing tax.

## CRUD vs. event sourcing — choosing

| Use **state-stored CRUD** when | Use **event sourcing** when |
| --- | --- |
| Current state is all you need | History/audit is a first-class requirement |
| Simple lifecycle, few transitions | Rich lifecycle, many meaningful state changes |
| Team wants the lowest cognitive overhead | The business value justifies the complexity |
| Ad-hoc queries over current state dominate | "How did we get here?" and temporal queries matter |
| Regulatory audit is not a concern | Finance, healthcare, compliance, ledgers |

**Default to state-stored.** Adopt event sourcing for the specific aggregates where the
event history is itself valuable — often a *subset* of a system, not the whole thing. It's
perfectly normal to event-source the `Order` and `Account` aggregates while keeping the
product catalog as boring CRUD.
