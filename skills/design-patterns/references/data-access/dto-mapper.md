# DTO and Mapper

## What it is and Problem it solves

A DTO (data transfer object) is a plain record shaped for the wire or the database: JSON field names, string amounts, nullable columns. A mapper converts between that shape and the domain object. It keeps outside formats from leaking into business logic and gives you one place that checks untrusted input.

## Do you need this?

Not when the shapes match and the data is trusted. Returning a dict you built yourself, or passing a typed row straight through, needs no mapper.

Add one when the external shape differs from what the domain wants (strings to `Decimal`, snake_case to camelCase, a status string to an enum), or when the input is untrusted. The observable signal is `KeyError` or `undefined` surfacing three calls deep because nobody checked the payload where it arrived.

## Python

One function at the boundary turns `object` into a domain `Order` or raises. Nothing past it handles raw dicts.

```python
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation
from enum import StrEnum
from typing import cast

class Status(StrEnum):
    PENDING = "pending"
    PAID = "paid"

@dataclass(frozen=True)
class Order:
    id: str
    total: Decimal
    status: Status
    internal_note: str = ""

def parse_order(raw: object) -> Order:
    if not isinstance(raw, dict):
        raise ValueError("order must be an object")
    data = cast(dict[str, object], raw)
    order_id = data.get("id")
    total_text = data.get("total")
    status_text = data.get("status")
    if not isinstance(order_id, str) or not order_id:
        raise ValueError("id must be a non-empty string")
    if not isinstance(total_text, str):
        raise ValueError("total must be a decimal string")
    try:
        total = Decimal(total_text)
    except InvalidOperation:
        raise ValueError("total must be a decimal string") from None
    if not total.is_finite() or total < 0:
        raise ValueError("total must be a non-negative number")
    if not isinstance(status_text, str):
        raise ValueError("status must be a string")
    try:
        status = Status(status_text)
    except ValueError:
        raise ValueError(f"unknown status {status_text!r}") from None
    return Order(order_id, total, status)

def to_wire(order: Order) -> dict[str, str]:
    return {"id": order.id, "total": str(order.total), "status": order.status.value}

order = parse_order({"id": "o-1", "total": "19.99", "status": "paid", "extra": 1})
assert order.total == Decimal("19.99") and order.status is Status.PAID

wire = to_wire(Order("o-2", Decimal("5"), Status.PENDING, internal_note="vip"))
assert wire == {"id": "o-2", "total": "5", "status": "pending"}

for bad in [None, {"id": "o-3"}, {"id": "o-3", "total": "NaN", "status": "paid"},
            {"id": "o-3", "total": "1", "status": "refunded"}]:
    try:
        parse_order(bad)
    except ValueError:
        continue
    raise AssertionError(f"accepted {bad!r}")
```

`to_wire` lists the fields it exposes, so `internal_note` cannot reach the client by accident. Adding a field to `Order` changes nothing on the wire until you edit the mapper. Pydantic models do the parse step with less code, and the boundary keeps the same shape.

## TypeScript

```typescript
import assert from "node:assert/strict";

const statuses = ["pending", "paid"] as const;
type Status = (typeof statuses)[number];
type Order = { id: string; totalCents: number; status: Status; internalNote?: string };
type OrderDto = { id: string; total_cents: number; status: Status };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseOrder(raw: unknown): Order {
  if (!isRecord(raw)) throw new Error("order must be an object");
  const { id, total_cents: totalCents, status } = raw;
  if (typeof id !== "string" || id === "") throw new Error("id must be a non-empty string");
  if (typeof totalCents !== "number" || !Number.isSafeInteger(totalCents) || totalCents < 0) {
    throw new Error("total_cents must be a non-negative integer");
  }
  const known = statuses.find((s) => s === status);
  if (known === undefined) throw new Error("unknown status");
  return { id, totalCents, status: known };
}

export function toDto(order: Order): OrderDto {
  return { id: order.id, total_cents: order.totalCents, status: order.status };
}

const order = parseOrder(JSON.parse('{"id":"o-1","total_cents":1999,"status":"paid","extra":1}'));
assert.deepEqual(order, { id: "o-1", totalCents: 1999, status: "paid" });
assert.deepEqual(toDto({ ...order, internalNote: "vip" }), {
  id: "o-1",
  total_cents: 1999,
  status: "paid",
});
for (const bad of [null, [], { id: "o-2" }, { id: "o-2", total_cents: 1.5, status: "paid" }]) {
  assert.throws(() => parseOrder(bad));
}
assert.throws(() => parseOrder({ id: "o-2", total_cents: 1, status: "toString" }));
```

The status check searches a fixed array, so a payload value like `"toString"` or `"__proto__"` is simply unknown. Destructuring reads only the three keys the mapper names. Libraries such as Zod generate this parser from a schema.

## In production

- API layers (FastAPI with Pydantic, tRPC or Express with Zod) validate request bodies into typed objects before handlers run.
- ORMs have a second mapping step: row to entity. Keep it in the repository so entities do not escape (see [Repository](repository.md)).
- Versioned APIs map one domain object to several DTOs (`OrderV1`, `OrderV2`), which keeps old clients working.
- Money crosses the wire as integer cents or a decimal string. Binary floats lose cents.

## Smells and misuse

- A DTO that mirrors the domain class field for field, with a mapper that copies each one, in an app where both sides are trusted.
- Domain objects serialized directly to JSON, so every new field and internal note becomes public.
- Mapping scattered through handlers instead of one parse function per boundary.
- Parsing that silently coerces (`"abc"` to `0`) rather than rejecting.
- Mapper logic that makes business decisions. It converts shapes; rules live in the domain.

## Related

- [Repository](repository.md) uses a mapper to build domain objects from rows.
- [Adapter](../structural/adapter.md) wraps a foreign interface; a mapper converts a foreign data shape.
- [Result / Option](../value-modeling/result-option.md) returns parse failures as values instead of raising.
