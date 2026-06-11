# Application Architecture

DDD's building blocks only pay off if the codebase is laid out so the **domain stays pure**.
This file covers the layering that makes that structural — hexagonal / ports & adapters,
clean, and onion architecture (three names for the same core idea) — plus where each block
lives, how use cases orchestrate, and where transactions belong.

## The one rule everything follows: dependencies point inward

```
        ┌───────────────────────────────────────────┐
        │            Infrastructure / Adapters         │   ← Postgres, HTTP, Kafka, Stripe
        │   ┌───────────────────────────────────────┐ │
        │   │            Application layer            │ │   ← use cases, command/query handlers
        │   │   ┌───────────────────────────────┐   │ │
        │   │   │            Domain               │   │ │   ← aggregates, VOs, events, domain
        │   │   │   (entities, value objects,     │   │ │      services, repository INTERFACES
        │   │   │    aggregates, domain events)   │   │ │
        │   │   └───────────────────────────────┘   │ │
        │   └───────────────────────────────────────┘ │
        └───────────────────────────────────────────┘
            Dependencies point INWARD only ───────▶
```

- The **domain** at the center depends on **nothing** — no ORM, no web framework, no broker.
- The **application** layer depends only on the domain.
- **Infrastructure** depends on both, implementing the interfaces (ports) the inner layers
  define.

This is the **Dependency Inversion Principle** applied at architectural scale. The domain
declares a port (`OrderRepository` interface); infrastructure provides the adapter (a
Postgres implementation). The arrow of dependency points *toward* the domain, so the domain
can be compiled, tested, and reasoned about with zero infrastructure present.

"Hexagonal," "ports & adapters," "clean," and "onion" all encode this same rule. Use
whichever vocabulary your team knows — the substance is identical.

## Ports and adapters

- A **port** is an interface owned by an inner layer, expressed in the ubiquitous language.
  Two kinds:
  - **Driven (outbound) ports** — things the domain *needs*: `OrderRepository`, `TaxPolicy`,
    `EventPublisher`. Defined inside, implemented outside.
  - **Driving (inbound) ports** — entry points *into* the application: the command/query
    handlers (use cases) that the outside world calls.
- An **adapter** is an infrastructure implementation of a port: a `PostgresOrderRepository`,
  an HTTP controller, a Kafka consumer.

```ts
// PORT (domain layer) — pure, our language.
export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

// ADAPTER (infrastructure layer) — knows SQL; maps rows ↔ aggregate.
export class PostgresOrderRepository implements OrderRepository {
  constructor(private readonly db: Db) {}

  async findById(id: OrderId): Promise<Order | null> {
    const row = await this.db.query("SELECT * FROM orders WHERE id = $1", [id.value]);
    return row ? OrderMapper.toDomain(row) : null; // map persistence → domain
  }

  async save(order: Order): Promise<void> {
    const row = OrderMapper.toPersistence(order); // map domain → persistence
    await this.db.upsert("orders", row);
  }
}
```

```python
class OrderRepository(Protocol):            # port — domain layer
    async def find_by_id(self, order_id: str) -> "Order | None": ...
    async def save(self, order: "Order") -> None: ...

class PostgresOrderRepository:              # adapter — infrastructure layer
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def find_by_id(self, order_id: str) -> "Order | None":
        row = await self._session.get(OrderRow, order_id)
        return OrderMapper.to_domain(row) if row else None

    async def save(self, order: "Order") -> None:
        self._session.merge(OrderMapper.to_persistence(order))
```

## The application layer: use cases

The application layer is **thin**. Each use case (command handler / query handler) does
exactly one transaction's worth of orchestration and holds **no business rules** — those
belong in the domain. Its job:

1. Accept a validated command (input already checked at the boundary).
2. Load the aggregate via a repository port.
3. Call a domain method that enforces the invariant.
4. Save the aggregate (one transaction, one aggregate).
5. Publish the domain events the aggregate recorded.

```ts
export class PlaceOrderHandler {
  constructor(
    private readonly orders: OrderRepository,
    private readonly uow: UnitOfWork,
    private readonly events: EventPublisher,
  ) {}

  async handle(cmd: PlaceOrder): Promise<{ orderId: string }> {
    return this.uow.run(async () => {       // transaction boundary lives in the app layer
      const order = Order.start(new CustomerId(cmd.customerId));
      for (const line of cmd.items) {
        order.addItem(new ProductId(line.productId), Money.fromMinor(line.unitPriceMinor, "USD"), Quantity.of(line.qty));
      }
      order.place();                         // domain enforces "no empty orders", etc.
      await this.orders.save(order);
      await this.events.publishAll(order.pullEvents());
      return { orderId: order.id.value };
    });
  }
}
```

If you find business rules creeping into a handler (an `if` that decides whether something
is *allowed*), that logic belongs on the aggregate. The handler should read like a
checklist, not a rulebook.

## Transaction boundaries

- **One transaction wraps one use case and commits one aggregate.** The boundary lives in
  the application layer (a `UnitOfWork` or framework-managed transaction), never in the
  domain — the domain must not know transactions exist.
- **Don't span aggregates in a transaction.** If a use case seems to need two aggregates
  updated atomically, that's a design smell. Either they're actually one aggregate, or they
  should be eventually consistent: update one, emit an event, let a handler update the other
  in its own transaction.
- **Publish events after the commit succeeds.** Publishing before commit risks telling the
  world about a change that then rolls back. For strong guarantees use the **transactional
  outbox**: write events to an `outbox` table *inside* the same transaction, then a separate
  relay publishes them — so the event and the state change commit atomically.

## The Unit of Work

A **Unit of Work** tracks changes within a use case and commits (or rolls back) them as one
atomic operation. It owns the transaction so handlers don't sprinkle commit/rollback logic.
With an ORM it often wraps the session; without one it's a thin transaction manager.

```python
class UnitOfWork(Protocol):
    async def __aenter__(self) -> "UnitOfWork": ...
    async def __aexit__(self, *exc: object) -> None: ...
    orders: OrderRepository

# usage in a handler
async def handle(self, cmd: PlaceOrder) -> dict:
    async with self._uow as uow:           # begins a transaction
        order = Order.start(cmd.customer_id)
        ...
        await uow.orders.save(order)
        # commit on __aexit__; rollback if an exception escapes
    await self._events.publish_all(order.pull_events())
    return {"order_id": order.id}
```

## Mapping domain ↔ persistence

The domain model and the database schema serve different masters: the model optimizes for
expressing behavior, the schema for storage and queries. Keep them separate and **map**
between them with a dedicated mapper (or your ORM's classical-mapping facility).

Resist the lure of letting an ORM entity *be* your domain aggregate (a base class, public
columns-as-fields, lazy-loaded relations). That welds persistence to the domain and is the
fast track to an anemic model — see `anti-patterns.md`. The small cost of a mapper buys you
a domain that doesn't know Postgres exists.

> In Python, async SQLAlchemy supports "imperative (classical) mapping" — you keep plain
> domain classes and map them to tables separately, instead of inheriting from
> `DeclarativeBase`. That preserves a clean domain. The pragmatic alternative is a thin
> `OrderRow` ORM model plus an `OrderMapper.to_domain/to_persistence` — explicit, obvious,
> and easy to test.

## Suggested package layout for one bounded context

```
ordering/                         # one bounded context
├── domain/                       # pure — no framework imports
│   ├── order.py / order.ts       # Order aggregate, LineItem
│   ├── value_objects.*           # Money, Quantity, Address
│   ├── events.*                  # OrderPlaced, OrderPaid, OrderShipped
│   └── repository.*              # OrderRepository PORT (interface)
├── application/                  # thin orchestration
│   ├── commands.*                # PlaceOrder, ShipOrder (+ handlers)
│   ├── queries.*                 # GetOrderSummary (+ handlers)
│   └── ports.*                   # EventPublisher, UnitOfWork, TaxPolicy
└── infrastructure/               # adapters — the only layer that imports frameworks
    ├── postgres_order_repo.*     # implements OrderRepository
    ├── mappers.*                 # domain ↔ row
    ├── http_controllers.*        # driving adapter; validates input (Zod/Pydantic)
    └── projections.*             # read-model projections
```

The dependency rule shows up as an import rule: `domain/` imports nothing from
`application/` or `infrastructure/`; `application/` imports only `domain/`; `infrastructure/`
may import both. A quick lint rule or import-linter check enforces it mechanically.

See the fully assembled version of this layout in `typescript-examples.md` and
`python-examples.md`.
