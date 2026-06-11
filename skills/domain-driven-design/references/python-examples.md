# Python: A Complete Bounded Context

The same **Ordering** bounded context as `typescript-examples.md`, in idiomatic modern
Python (3.11+): Pydantic v2 for value objects, plain classes for the aggregate, `Protocol`
for ports, `async` application services, an event-sourced variant, and a note on async
SQLAlchemy mapping. Framework-agnostic so the patterns stay visible.

Organized by module, but reads top-to-bottom as one coherent example. It's
`py_compile`-clean and type-annotated.

## `domain/value_objects.py`

```python
from __future__ import annotations

import uuid
from pydantic import BaseModel, field_validator


class Money(BaseModel):
    """Immutable, self-validating, equal by value (frozen gives __eq__/__hash__)."""
    model_config = {"frozen": True}

    amount_minor: int  # store cents — never float for money
    currency: str

    @field_validator("currency")
    @classmethod
    def _valid_currency(cls, v: str) -> str:
        if len(v) != 3 or not v.isupper():
            raise ValueError(f"invalid currency: {v}")
        return v

    def add(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("currency mismatch")
        return Money(amount_minor=self.amount_minor + other.amount_minor, currency=self.currency)

    def multiply(self, qty: int) -> "Money":
        return Money(amount_minor=self.amount_minor * qty, currency=self.currency)


class Quantity(BaseModel):
    model_config = {"frozen": True}

    value: int

    @field_validator("value")
    @classmethod
    def _positive(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("quantity must be a positive integer")
        return v

    def plus(self, other: "Quantity") -> "Quantity":
        return Quantity(value=self.value + other.value)


def new_order_id() -> str:
    return str(uuid.uuid4())
```

> Identity in Python is usually a typed `str`/`uuid` rather than a wrapper class — wrapping
> every id (as the TS example does) is possible with Pydantic but often more ceremony than
> it's worth. Use `NewType("OrderId", str)` if you want lightweight nominal typing.

## `domain/events.py`

```python
from __future__ import annotations
from dataclasses import dataclass


@dataclass(frozen=True)
class OrderPlaced:
    order_id: str
    customer_id: str
    total_minor: int
    currency: str
    occurred_at: str  # ISO string; the caller supplies it from a clock — keeps events pure


@dataclass(frozen=True)
class OrderPaid:
    order_id: str
    occurred_at: str


@dataclass(frozen=True)
class OrderShipped:
    order_id: str
    occurred_at: str


OrderEvent = OrderPlaced | OrderPaid | OrderShipped
```

## `domain/order.py` — the aggregate

```python
from __future__ import annotations

from collections.abc import Callable
from datetime import datetime, timezone

from .events import OrderEvent, OrderPaid, OrderPlaced, OrderShipped
from .value_objects import Money, Quantity, new_order_id


class _LineItem:
    """Entity inside the Order aggregate — never referenced from outside the boundary."""

    def __init__(self, product_id: str, unit_price: Money, qty: Quantity) -> None:
        self.product_id = product_id
        self.unit_price = unit_price
        self._qty = qty

    def increase(self, by: Quantity) -> None:
        self._qty = self._qty.plus(by)

    def subtotal(self) -> Money:
        return self.unit_price.multiply(self._qty.value)


class Order:
    def __init__(self, order_id: str, customer_id: str, clock: Callable[[], datetime]) -> None:
        self.id = order_id
        self.customer_id = customer_id
        self._clock = clock                 # injected for deterministic tests
        self._items: list[_LineItem] = []
        self._status = "draft"
        self._events: list[OrderEvent] = []

    @classmethod
    def start(
        cls,
        customer_id: str,
        clock: Callable[[], datetime] = lambda: datetime.now(timezone.utc),
    ) -> "Order":
        return cls(new_order_id(), customer_id, clock)

    def add_item(self, product_id: str, unit_price: Money, qty: Quantity) -> None:
        if self._status != "draft":
            raise ValueError("order is no longer editable")
        existing = next((i for i in self._items if i.product_id == product_id), None)
        if existing:
            existing.increase(qty)
        else:
            self._items.append(_LineItem(product_id, unit_price, qty))

    def place(self) -> None:
        if self._status != "draft":
            raise ValueError("only a draft order can be placed")
        if not self._items:
            raise ValueError("cannot place an empty order")
        self._status = "placed"
        total = self.total()
        self._record(OrderPlaced(self.id, self.customer_id, total.amount_minor, total.currency, self._now()))

    def mark_paid(self) -> None:
        if self._status != "placed":
            raise ValueError("only a placed order can be paid")
        self._status = "paid"
        self._record(OrderPaid(self.id, self._now()))

    def ship(self) -> None:
        if self._status != "paid":
            raise ValueError("cannot ship an unpaid order")  # the core invariant
        self._status = "shipped"
        self._record(OrderShipped(self.id, self._now()))

    def total(self) -> Money:
        out = Money(amount_minor=0, currency="USD")
        for item in self._items:
            out = out.add(item.subtotal())
        return out

    @property
    def status(self) -> str:
        return self._status

    def pull_events(self) -> list[OrderEvent]:
        out, self._events = self._events, []
        return out

    def _record(self, event: OrderEvent) -> None:
        self._events.append(event)

    def _now(self) -> str:
        return self._clock().isoformat()
```

## `domain/repository.py` — the port

```python
from typing import Protocol
from .order import Order


class OrderRepository(Protocol):
    async def find_by_id(self, order_id: str) -> Order | None: ...
    async def save(self, order: Order) -> None: ...
```

## `application/ports.py`

```python
from collections.abc import Sequence
from typing import Protocol
from ..domain.events import OrderEvent


class EventPublisher(Protocol):
    async def publish_all(self, events: Sequence[OrderEvent]) -> None: ...
```

## `application/place_order.py` — command + handler

```python
from __future__ import annotations
from dataclasses import dataclass

from ..domain.order import Order
from ..domain.repository import OrderRepository
from ..domain.value_objects import Money, Quantity
from .ports import EventPublisher


@dataclass(frozen=True)
class PlaceOrderItem:
    product_id: str
    unit_price_minor: int
    qty: int


@dataclass(frozen=True)
class PlaceOrder:
    customer_id: str
    items: tuple[PlaceOrderItem, ...]


class PlaceOrderHandler:
    def __init__(self, orders: OrderRepository, events: EventPublisher) -> None:
        self._orders = orders
        self._events = events

    async def handle(self, cmd: PlaceOrder) -> dict[str, str]:
        order = Order.start(cmd.customer_id)
        for line in cmd.items:
            order.add_item(
                line.product_id,
                Money(amount_minor=line.unit_price_minor, currency="USD"),
                Quantity(value=line.qty),
            )
        order.place()                                  # invariant in the aggregate
        await self._orders.save(order)                 # one aggregate, one transaction
        await self._events.publish_all(order.pull_events())
        return {"order_id": order.id}
```

## `application/ship_order.py`

```python
from __future__ import annotations
from dataclasses import dataclass

from ..domain.repository import OrderRepository
from .ports import EventPublisher


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
            raise LookupError(f"order not found: {cmd.order_id}")
        order.ship()                                   # throws if unpaid
        await self._orders.save(order)
        await self._events.publish_all(order.pull_events())
```

## `infrastructure/in_memory_order_repository.py`

```python
from ..domain.order import Order


class InMemoryOrderRepository:
    def __init__(self) -> None:
        self._store: dict[str, Order] = {}

    async def find_by_id(self, order_id: str) -> Order | None:
        return self._store.get(order_id)

    async def save(self, order: Order) -> None:
        self._store[order.id] = order
```

## `infrastructure/order_summary_projection.py` — the read side (CQRS)

```python
from __future__ import annotations
from dataclasses import dataclass
from typing import Protocol

from ..domain.events import OrderEvent, OrderPaid, OrderPlaced, OrderShipped


@dataclass
class OrderSummaryView:
    order_id: str
    status: str
    total_minor: int
    currency: str
    placed_at: str


class OrderSummaryStore(Protocol):
    async def upsert(self, view: OrderSummaryView) -> None: ...
    async def set_status(self, order_id: str, status: str) -> None: ...
    async def find_by_id(self, order_id: str) -> OrderSummaryView | None: ...


class OrderSummaryProjection:
    def __init__(self, views: OrderSummaryStore) -> None:
        self._views = views

    async def on(self, event: OrderEvent) -> None:
        match event:
            case OrderPlaced():
                await self._views.upsert(OrderSummaryView(
                    order_id=event.order_id,
                    status="placed",
                    total_minor=event.total_minor,
                    currency=event.currency,
                    placed_at=event.occurred_at,
                ))
            case OrderPaid():
                await self._views.set_status(event.order_id, "paid")
            case OrderShipped():
                await self._views.set_status(event.order_id, "shipped")


class GetOrderSummaryHandler:
    """Reads the denormalized view directly — never loads an aggregate."""

    def __init__(self, views: OrderSummaryStore) -> None:
        self._views = views

    async def get(self, order_id: str) -> OrderSummaryView | None:
        return await self._views.find_by_id(order_id)
```

## Wiring it together

```python
import asyncio
from collections.abc import Sequence

from .application.place_order import PlaceOrder, PlaceOrderHandler, PlaceOrderItem
from .application.ship_order import ShipOrder, ShipOrderHandler
from .domain.events import OrderEvent
from .infrastructure.in_memory_order_repository import InMemoryOrderRepository
from .infrastructure.order_summary_projection import OrderSummaryProjection


async def demo(store) -> None:  # `store` implements OrderSummaryStore
    orders = InMemoryOrderRepository()
    projection = OrderSummaryProjection(store)

    class _Publisher:
        async def publish_all(self, events: Sequence[OrderEvent]) -> None:
            for e in events:
                await projection.on(e)

    publisher = _Publisher()

    place = PlaceOrderHandler(orders, publisher)
    result = await place.handle(PlaceOrder(
        customer_id="cust-1",
        items=(PlaceOrderItem(product_id="prod-1", unit_price_minor=1500, qty=2),),
    ))

    # Shipping before payment raises — the invariant holds.
    ship = ShipOrderHandler(orders, publisher)
    try:
        await ship.handle(ShipOrder(order_id=result["order_id"]))
    except ValueError as e:
        print("blocked:", e)  # "cannot ship an unpaid order"


if __name__ == "__main__":
    ...  # asyncio.run(demo(SomeStore()))
```

## Event-sourced variant

Same aggregate, store events instead of state. The application handlers above are
**unchanged** — persistence stays behind the `OrderRepository` port. The aggregate gains a
`version`, a `from_history` classmethod, and `_apply` methods that fold events into state
with no validation (reused on replay).

```python
from typing import Protocol
from .domain.events import OrderEvent
from .domain.order import Order


class EventStore(Protocol):
    async def append(self, stream_id: str, events: list[OrderEvent], expected_version: int) -> None: ...
    async def read(self, stream_id: str) -> list[OrderEvent]: ...


class EventSourcedOrderRepository:
    """Adapts the event store to the same OrderRepository port."""

    def __init__(self, store: EventStore) -> None:
        self._store = store

    async def find_by_id(self, order_id: str) -> Order | None:
        events = await self._store.read(order_id)
        return Order.from_history(events) if events else None  # type: ignore[attr-defined]

    async def save(self, order: Order) -> None:
        new_events = order.pull_events()
        if not new_events:
            return
        version = getattr(order, "version", len(new_events))
        await self._store.append(order.id, new_events, version - len(new_events))
```

See `event-sourcing.md` for the full decide/apply `Order` shape, snapshots, and upcasting.

## async SQLAlchemy mapping note

Keep the domain `Order` free of ORM concerns. Two clean options:

1. **Imperative (classical) mapping** — define plain `Order` domain classes and map them to
   `Table` objects separately via `registry.map_imperatively(...)`, so the aggregate never
   inherits from `DeclarativeBase`. The domain stays pure; SQLAlchemy still loads/persists
   it.
2. **Separate ORM row + mapper** (often simpler to reason about) — a thin
   `OrderRow(DeclarativeBase)` plus an `OrderMapper.to_domain(row)` /
   `to_persistence(order)`. The repository adapter uses an `AsyncSession`:

```python
from sqlalchemy.ext.asyncio import AsyncSession


class SqlAlchemyOrderRepository:  # implements OrderRepository (structurally)
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def find_by_id(self, order_id: str) -> Order | None:
        row = await self._session.get(OrderRow, order_id)  # OrderRow: your DeclarativeBase model
        return OrderMapper.to_domain(row) if row else None

    async def save(self, order: Order) -> None:
        await self._session.merge(OrderMapper.to_persistence(order))
        # commit is owned by the Unit of Work / application layer, not here
```

The transaction (commit/rollback) belongs to the application layer's unit of work, not the
repository — see `application-architecture.md`. Validation belongs at the boundary
(FastAPI + Pydantic request models parse untrusted input into a `PlaceOrder` command before
it reaches the handler); the domain trusts the command it receives.
