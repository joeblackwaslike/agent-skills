# Anti-Patterns: DDD Gone Wrong

DDD fails in two directions: applying its machinery where it isn't warranted, and applying
it in name only (the rituals without the substance). This file catalogs the common failure
modes, each with the tell and the fix. When you catch yourself or review someone else's
code, scan for these.

## Do you even need DDD? (a blunt checklist)

Before any of the patterns, answer honestly:

- [ ] Is the **business logic** the hard part — rich rules, workflows, invariants, domain
      experts who debate edge cases? (If the hard part is the UI, the data volume, or an
      integration, DDD is aimed at the wrong target.)
- [ ] Will this system **live and change** for years? (Throwaway scripts don't earn the
      modeling investment.)
- [ ] Is the lifecycle **more than CRUD** — meaningful state transitions, not just
      create/read/update/delete?
- [ ] Do **different parts** of the org mean different things by the same word? (If yes,
      you need bounded contexts. If no, you may not.)

If most boxes are unchecked, build a straightforward CRUD app and move on. **Misapplied DDD
is worse than none** — it adds indirection, ceremony, and cognitive load with no payoff.
Saying "this doesn't need DDD" is a senior move, not a cop-out.

## 1. Anemic Domain Model

**The tell:** Your "domain objects" are bags of public getters and setters with no behavior.
All the actual logic lives in `OrderService.processOrder()`, `OrderManager`,
`OrderHelper`. The objects are data; the services are procedures. This is procedural code
wearing OO clothes — Martin Fowler named it an anti-pattern for a reason.

```ts
// ❌ Anemic: the object can't protect itself; any caller can corrupt it.
class Order {
  status: string = "draft";
  items: LineItem[] = [];
}
// ...and elsewhere, the real logic, far from the data:
class OrderService {
  ship(order: Order) {
    order.status = "shipped"; // nothing stops shipping an unpaid order
  }
}
```

**The fix:** Move behavior onto the aggregate; make state private; expose intention-revealing
methods that enforce invariants. `order.ship()` *is* where "can't ship unpaid" lives. The
service becomes a thin orchestrator (load, call method, save) — see `tactical-patterns.md`.

> Nuance: a thin model isn't *always* wrong. For a genuinely CRUD subdomain, an anemic
> model + service is the *right* simple choice. It's an anti-pattern specifically when the
> domain is complex enough to warrant DDD but the logic ended up in services anyway.

## 2. Persistence / ORM leaking into the domain

**The tell:** Your aggregate `extends DeclarativeBase` / `extends Model` / has `@Entity`
and `@Column` decorators all over it. The domain now can't be instantiated without a
database, can't be unit-tested in isolation, and its shape is dictated by table columns
instead of business concepts.

```python
# ❌ The domain is now married to SQLAlchemy; persistence drives the model.
class Order(DeclarativeBase):
    __tablename__ = "orders"
    id: Mapped[str] = mapped_column(primary_key=True)
    status: Mapped[str]  # public, settable, no invariant protection
```

**The fix:** Keep domain classes pure (no framework imports) and map them to storage with a
separate mapper or SQLAlchemy's imperative mapping. The repository adapter does the
translation. The cost of a mapper is small; the payoff is a domain that doesn't know
Postgres exists. See `application-architecture.md`.

## 3. God aggregate

**The tell:** One aggregate root owns half the system — `Order` contains the customer, the
full product catalog, the payment history, and every shipment, all loaded together. Saving
it locks huge swaths of data; concurrency collapses; loads are slow.

**The fix:** Remember the aggregate is a **consistency** boundary, not a containment one.
Include only what must be transactionally consistent *together*. Reference other aggregates
**by id** (`Order` holds a `CustomerId`, not a `Customer`). Most aggregates should be small
— often a root plus a couple of value objects. When two clusters don't need to change in the
same transaction, they're two aggregates. See the aggregate design rules in
`tactical-patterns.md`.

## 4. Updating multiple aggregates in one transaction

**The tell:** A use case loads `Order` *and* `Inventory` *and* `Customer` and saves all
three atomically "to keep them consistent." You've coupled their lifecycles and created lock
contention across unrelated parts of the system.

**The fix:** One transaction modifies one aggregate. For cross-aggregate consistency, emit a
domain event and react asynchronously: `OrderShipped` → an inventory handler decrements stock
in its *own* transaction. Accept that the two are **eventually** consistent. If they truly
*must* be immediately consistent, that's evidence they're actually one aggregate.

## 5. Primitive obsession

**The tell:** Money is a `number`, an email is a `string`, a quantity is an `int`. Validation
is scattered (`if (qty <= 0)` in fifteen places), and nothing stops you from passing a
customer id where a product id is expected, or adding USD to EUR.

**The fix:** Wrap meaningful concepts in value objects (`Money`, `Email`, `Quantity`,
`OrderId`). Validate once in the constructor; the type then carries the guarantee everywhere.
This is the single highest-leverage habit in tactical DDD. See `tactical-patterns.md`.

## 6. Repository per entity (instead of per aggregate root)

**The tell:** `LineItemRepository`, `OrderAddressRepository` — repositories for objects that
live *inside* an aggregate. Now external code can load and mutate a `LineItem` directly,
bypassing the `Order` root and its invariants.

**The fix:** One repository **per aggregate root**, only. You load and save whole aggregates.
Internal entities are reached through the root's methods, never fetched independently.

## 7. CQRS / event-sourcing cargo-culting

**The tell:** A brand-new CRUD app already has separate command and query buses, an event
store, projections, and eventual consistency — for a domain whose read shape is identical to
its write shape and whose hardest invariant is "name is required." Months of infrastructure,
zero payoff, and every junior dev is lost.

**The fix:** These patterns have real, ongoing costs (cognitive load, eventual-consistency
bugs, event-versioning toil). Adopt them where they earn it:
- **CQRS** when read and write shapes genuinely diverge or reads must scale independently —
  and even then, start with plain read-only queries before full projections (`cqrs.md`).
- **Event sourcing** when the event history is itself valuable (audit, temporal queries,
  compliance), often for a *subset* of aggregates, not the whole system (`event-sourcing.md`).

"It's the proper/rigorous way" is not a justification. Match the pattern to the problem.

## 8. Premature bounded contexts (distributed monolith)

**The tell:** A two-person team splits a greenfield system into eight microservices /
bounded contexts on day one, before the domain is even understood. The "boundaries" are
guesses; they're wrong; and now every feature requires a cross-service, cross-network change
— a distributed monolith with all the cost of microservices and none of the autonomy.

**The fix:** Start with a **modular monolith** — bounded contexts as modules in one
deployable, with clean interfaces between them. Let the boundaries prove themselves as you
learn the domain. Extract a context into its own service only when there's a real driver
(independent scaling, separate team ownership, isolation). Boundaries are cheap to move
inside a monolith and brutal to move across services. See `strategic-design.md`.

## 9. Read concerns polluting the write model

**The tell:** The `Order` aggregate grows getters for every field, DTO-shaped methods, and
denormalized data "so the UI can render it." The write model's encapsulation erodes to serve
reads.

**The fix:** That's exactly what read models are for. Let the write model stay focused on
behavior and invariants; build a separate read model / projection shaped for the screen.
Even a lightweight read-only query against the same DB keeps the aggregate clean. See
`cqrs.md`.

## 10. Domain services as a dumping ground

**The tell:** Every piece of logic lands in a `*Service`, and the entities are anemic (see
#1). "Domain service" became the place to put code nobody bothered to put on an aggregate.

**The fix:** Default to putting behavior **on the aggregate** that owns the state. Reach for
a domain service only when logic genuinely spans multiple aggregates and forcing it onto one
would be arbitrary (e.g., pricing across catalog + promotions). A domain service should be a
rare, deliberate choice, not the default home for logic.

---

## Quick review heuristics

When reviewing domain code, these questions surface most problems fast:

- Can I construct an **invalid** object? (→ value objects, private constructors)
- Where does this **invariant** live — in the aggregate, or leaked into a service/controller?
- Does the domain layer **import** anything from infrastructure? (→ dependency rule)
- How many aggregates does this transaction touch? (Should be one.)
- Is this aggregate a **consistency** boundary, or did it become a containment dumping ground?
- Did we add CQRS/ES because the problem needed it, or because it sounded right?
- Would a **domain expert** recognize the names in this code?
