# TypeScript: A Complete Bounded Context

One complete **Ordering** bounded context in plain TypeScript, assembled end to end:
value objects → aggregate → domain events → repository port → application service →
read-model projection → an event-sourced variant. It's framework-agnostic (no Nest, no
Express) so the patterns are visible; a note at the end shows where Zod and a web framework
plug in.

The code is organized as it would be on disk (see `application-architecture.md`), but reads
top-to-bottom as one coherent example. Everything here is self-consistent and type-checks
under `strict`.

## `domain/value-objects.ts`

```ts
// Value objects: immutable, self-validating, equal by value.

export class Money {
  private constructor(readonly amountMinor: number, readonly currency: string) {}

  static fromMinor(amountMinor: number, currency: string): Money {
    if (!Number.isInteger(amountMinor)) throw new Error("amountMinor must be an integer");
    if (!/^[A-Z]{3}$/.test(currency)) throw new Error(`invalid currency: ${currency}`);
    return new Money(amountMinor, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) throw new Error("currency mismatch");
    return new Money(this.amountMinor + other.amountMinor, this.currency);
  }

  multiply(qty: number): Money {
    return new Money(this.amountMinor * qty, this.currency);
  }

  equals(other: Money): boolean {
    return this.amountMinor === other.amountMinor && this.currency === other.currency;
  }
}

export class Quantity {
  private constructor(readonly value: number) {}

  static of(value: number): Quantity {
    if (!Number.isInteger(value) || value <= 0) throw new Error("quantity must be a positive integer");
    return new Quantity(value);
  }

  plus(other: Quantity): Quantity {
    return new Quantity(this.value + other.value);
  }
}

// Identity value objects — wrap ids so you can't pass a CustomerId where an OrderId is wanted.
export class OrderId {
  constructor(readonly value: string) {}
  static generate(): OrderId {
    return new OrderId(crypto.randomUUID());
  }
  equals(other: OrderId): boolean {
    return this.value === other.value;
  }
}

export class CustomerId {
  constructor(readonly value: string) {}
}

export class ProductId {
  constructor(readonly value: string) {}
  equals(other: ProductId): boolean {
    return this.value === other.value;
  }
}
```

## `domain/events.ts`

```ts
export interface DomainEvent {
  readonly occurredAt: string;
}

export class OrderPlaced implements DomainEvent {
  constructor(
    readonly orderId: OrderId,
    readonly customerId: CustomerId,
    readonly total: Money,
    readonly occurredAt: string,
  ) {}
}

export class OrderPaid implements DomainEvent {
  constructor(readonly orderId: OrderId, readonly occurredAt: string) {}
}

export class OrderShipped implements DomainEvent {
  constructor(readonly orderId: OrderId, readonly occurredAt: string) {}
}

export type OrderEvent = OrderPlaced | OrderPaid | OrderShipped;
```

## `domain/order.ts` — the aggregate

```ts
export type OrderStatus = "draft" | "placed" | "paid" | "shipped";

// LineItem is an entity INSIDE the Order aggregate — never referenced from outside.
class LineItem {
  constructor(
    readonly productId: ProductId,
    readonly unitPrice: Money,
    private qty: Quantity,
  ) {}

  increase(by: Quantity): void {
    this.qty = this.qty.plus(by);
  }

  subtotal(): Money {
    return this.unitPrice.multiply(this.qty.value);
  }
}

export class Order {
  private items: LineItem[] = [];
  private status: OrderStatus = "draft";
  private events: OrderEvent[] = [];

  // `clock` is injected so the domain stays pure & deterministic in tests.
  private constructor(
    readonly id: OrderId,
    readonly customerId: CustomerId,
    private readonly clock: () => Date,
  ) {}

  static start(customerId: CustomerId, clock: () => Date = () => new Date()): Order {
    return new Order(OrderId.generate(), customerId, clock);
  }

  addItem(productId: ProductId, unitPrice: Money, qty: Quantity): void {
    if (this.status !== "draft") throw new Error("order is no longer editable");
    const existing = this.items.find((i) => i.productId.equals(productId));
    if (existing) existing.increase(qty);
    else this.items.push(new LineItem(productId, unitPrice, qty));
  }

  place(): void {
    if (this.status !== "draft") throw new Error("only a draft order can be placed");
    if (this.items.length === 0) throw new Error("cannot place an empty order");
    this.status = "placed";
    this.record(new OrderPlaced(this.id, this.customerId, this.total(), this.now()));
  }

  markPaid(): void {
    if (this.status !== "placed") throw new Error("only a placed order can be paid");
    this.status = "paid";
    this.record(new OrderPaid(this.id, this.now()));
  }

  ship(): void {
    if (this.status !== "paid") throw new Error("cannot ship an unpaid order");
    this.status = "shipped";
    this.record(new OrderShipped(this.id, this.now()));
  }

  total(): Money {
    return this.items.reduce((sum, i) => sum.add(i.subtotal()), Money.fromMinor(0, "USD"));
  }

  currentStatus(): OrderStatus {
    return this.status;
  }

  pullEvents(): OrderEvent[] {
    const out = this.events;
    this.events = [];
    return out;
  }

  private record(e: OrderEvent): void {
    this.events.push(e);
  }

  private now(): string {
    return this.clock().toISOString();
  }
}
```

## `domain/repository.ts` — the port

```ts
export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}
```

## `application/ports.ts`

```ts
export interface EventPublisher {
  publishAll(events: readonly DomainEvent[]): Promise<void>;
}
```

## `application/place-order.ts` — command + handler

```ts
export interface PlaceOrder {
  readonly customerId: string;
  readonly items: ReadonlyArray<{ productId: string; unitPriceMinor: number; qty: number }>;
}

export class PlaceOrderHandler {
  constructor(
    private readonly orders: OrderRepository,
    private readonly events: EventPublisher,
  ) {}

  async handle(cmd: PlaceOrder): Promise<{ orderId: string }> {
    const order = Order.start(new CustomerId(cmd.customerId));
    for (const line of cmd.items) {
      order.addItem(
        new ProductId(line.productId),
        Money.fromMinor(line.unitPriceMinor, "USD"),
        Quantity.of(line.qty),
      );
    }
    order.place();                                 // invariant lives in the aggregate
    await this.orders.save(order);                 // one aggregate, one transaction
    await this.events.publishAll(order.pullEvents());
    return { orderId: order.id.value };
  }
}
```

## `application/ship-order.ts`

```ts
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
    if (!order) throw new Error(`order not found: ${cmd.orderId}`);
    order.ship();                                  // throws if unpaid — the core invariant
    await this.orders.save(order);
    await this.events.publishAll(order.pullEvents());
  }
}
```

## `infrastructure/in-memory-order-repository.ts`

A trivial adapter, useful for tests and to prove the port is honest. A real one maps to
Postgres rows behind the same interface.

```ts
export class InMemoryOrderRepository implements OrderRepository {
  private readonly store = new Map<string, Order>();

  async findById(id: OrderId): Promise<Order | null> {
    return this.store.get(id.value) ?? null;
  }

  async save(order: Order): Promise<void> {
    this.store.set(order.id.value, order);
  }
}
```

## `infrastructure/order-summary-projection.ts` — the read side (CQRS)

```ts
export interface OrderSummaryView {
  orderId: string;
  status: OrderStatus;
  totalMinor: number;
  currency: string;
  placedAt: string;
}

export interface OrderSummaryStore {
  upsert(view: OrderSummaryView): Promise<void>;
  setStatus(orderId: string, status: OrderStatus): Promise<void>;
  findById(orderId: string): Promise<OrderSummaryView | null>;
}

export class OrderSummaryProjection {
  constructor(private readonly views: OrderSummaryStore) {}

  async on(event: DomainEvent): Promise<void> {
    if (event instanceof OrderPlaced) {
      await this.views.upsert({
        orderId: event.orderId.value,
        status: "placed",
        totalMinor: event.total.amountMinor,
        currency: event.total.currency,
        placedAt: event.occurredAt,
      });
    } else if (event instanceof OrderPaid) {
      await this.views.setStatus(event.orderId.value, "paid");
    } else if (event instanceof OrderShipped) {
      await this.views.setStatus(event.orderId.value, "shipped");
    }
  }
}

// Query handler — reads the denormalized view directly, never an aggregate.
export class GetOrderSummaryHandler {
  constructor(private readonly views: OrderSummaryStore) {}
  get(orderId: string): Promise<OrderSummaryView | null> {
    return this.views.findById(orderId);
  }
}
```

## Wiring it together

```ts
async function demo(): Promise<void> {
  const orders = new InMemoryOrderRepository();
  const projection = new OrderSummaryProjection(/* a real OrderSummaryStore */ makeStore());
  const publisher: EventPublisher = {
    async publishAll(events) {
      for (const e of events) await projection.on(e);
    },
  };

  const place = new PlaceOrderHandler(orders, publisher);
  const { orderId } = await place.handle({
    customerId: "cust-1",
    items: [{ productId: "prod-1", unitPriceMinor: 1500, qty: 2 }],
  });

  // Trying to ship before paying throws — the invariant holds.
  const ship = new ShipOrderHandler(orders, publisher);
  await ship.handle({ orderId }).catch((e) => console.log("blocked:", e.message)); // "cannot ship an unpaid order"
}
```

## Event-sourced variant

Same aggregate, different persistence: store the events instead of the state. Only the
aggregate's internals (decide/apply split) and the repository change — the application
handlers above are **untouched**, because persistence stays behind the `OrderRepository`
port.

```ts
export interface EventStore {
  append(streamId: string, events: OrderEvent[], expectedVersion: number): Promise<void>;
  read(streamId: string): Promise<OrderEvent[]>;
}

// The repository adapts the event store to the same OrderRepository port.
export class EventSourcedOrderRepository implements OrderRepository {
  constructor(private readonly store: EventStore) {}

  async findById(id: OrderId): Promise<Order | null> {
    const events = await this.store.read(id.value);
    return events.length ? Order.fromHistory(events) : null;
  }

  async save(order: Order): Promise<void> {
    const newEvents = order.pullEvents();
    if (newEvents.length === 0) return;
    await this.store.append(order.id.value, newEvents, order.version - newEvents.length);
  }
}
```

For this to work, `Order` gains `version`, a `fromHistory(events)` factory, and private
`apply(event)` methods that fold each event into state with no validation (reused on
replay). See `event-sourcing.md` for that full shape — it's the same `Order`, refactored so
state transitions go through events.

## Where Zod and a web framework plug in

Keep validation **at the boundary** (the driving adapter), not in the domain. The controller
parses untrusted input with Zod into a typed command, then hands a clean command to the
handler:

```ts
import { z } from "zod";

const PlaceOrderSchema = z.object({
  customerId: z.string().min(1),
  items: z.array(z.object({
    productId: z.string().min(1),
    unitPriceMinor: z.number().int().nonnegative(),
    qty: z.number().int().positive(),
  })).min(1),
});

// Express/Nest/Hono controller (a driving adapter):
async function placeOrderRoute(body: unknown, handler: PlaceOrderHandler) {
  const cmd: PlaceOrder = PlaceOrderSchema.parse(body); // boundary validation
  return handler.handle(cmd);                            // domain trusts the command
}
```

The domain objects (`Money`, `Quantity`, `Order`) never import Zod or Express. Schemas guard
the edge; value objects guard the invariants. That separation is the whole point.
