# Adapter

## What it is and Problem it solves

An adapter wraps something with the wrong interface so your code can use it through the interface it expects. The third-party SDK takes minor units and returns a dict; your code wants `Decimal` amounts and a typed outcome. The adapter does that translation in one module, so the vendor's shapes and quirks never spread into your domain. A Facade is the neighboring idea, covered in the same examples. It is one simple entry point in front of several subsystems.

## Do you need this?

Not for a one-off call. If a single function calls the vendor once, convert the arguments inline and move on. The signal is a second call site, or a vendor type leaking into your domain (dict keys like `"state"`, cents as strings, vendor exceptions in your handlers). If you may swap the vendor, or you want tests that run without it, the adapter is also where the fake plugs in. A plain function `to_domain(vendor_response)` is an adapter. Skip the Facade when callers use only one of the subsystems, or when the "simple" call would need as many options as the parts it hides.

## Python

```python
from collections.abc import Callable
from dataclasses import dataclass
from decimal import Decimal
from typing import Literal


@dataclass(frozen=True)
class Outcome:
    status: Literal["paid", "declined", "pending"]
    detail: str


Gateway = Callable[[str, Decimal], Outcome]


class GatewayError(Exception):
    pass


class VendorClient:
    def create_charge(self, *, amount_minor: int, currency: str, ref: str) -> dict[str, str]:
        if amount_minor == 2:
            raise ConnectionError("vendor unreachable")
        state = {0: "declined", 1: "processing", 3: "frozen"}.get(amount_minor, "ok")
        return {"id": f"ch_{ref}", "state": state, "code": "card_declined"}


def to_minor(amount: Decimal) -> int:
    minor = amount * 100
    if minor != minor.to_integral_exact():
        raise ValueError(f"{amount} has sub-cent precision")
    return int(minor)


def vendor_gateway(client: VendorClient, currency: str = "USD") -> Gateway:
    def charge(order_id: str, amount: Decimal) -> Outcome:
        try:
            res = client.create_charge(amount_minor=to_minor(amount), currency=currency, ref=order_id)
        except ConnectionError as err:
            raise GatewayError("payment vendor unreachable") from err
        match res["state"]:
            case "ok":
                return Outcome("paid", res["id"])
            case "declined":
                return Outcome("declined", res["code"])
            case "processing":
                return Outcome("pending", res["id"])
            case other:
                raise GatewayError(f"unmapped vendor state {other!r}")

    return charge


gateway = vendor_gateway(VendorClient())
assert gateway("o-1", Decimal("12.50")) == Outcome("paid", "ch_o-1")
assert gateway("o-2", Decimal("0")) == Outcome("declined", "card_declined")
assert gateway("o-3", Decimal("0.01")) == Outcome("pending", "ch_o-3")
for amount, message in ((Decimal("0.02"), "unreachable"), (Decimal("0.03"), "unmapped"), (Decimal("0.295"), "sub-cent")):
    try:
        gateway("o-4", amount)
        raise AssertionError("must raise")
    except (GatewayError, ValueError) as err:
        assert message in str(err)


def place_order(reserve: Callable[[str], bool], release: Callable[[str], None], gw: Gateway, order_id: str, amount: Decimal) -> str:
    if not reserve(order_id):
        return "out_of_stock"
    outcome = gw(order_id, amount)
    if outcome.status == "declined":
        release(order_id)
    return {"paid": "confirmed", "pending": "payment_pending", "declined": "payment_declined"}[outcome.status]


released: list[str] = []
assert place_order(lambda _id: True, released.append, gateway, "o-5", Decimal("5.00")) == "confirmed"
assert place_order(lambda _id: True, released.append, gateway, "o-6", Decimal("0")) == "payment_declined" and released == ["o-6"]
```

`vendor_gateway` is the adapter, a closure over the client. The vendor's states are mapped one by one, so a pending charge is not reported as failed and no caller retries it into a double charge. An unknown state raises, and a vendor outage becomes `GatewayError` instead of a vendor exception in your handlers. Money converts exactly or fails: `Decimal("0.295")` is rejected, not truncated to 29 cents. `place_order` is the Facade, one call over stock and payment. It releases the stock when the charge is declined and leaves it reserved when the outcome is pending or an exception was raised, because the charge may still land.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Outcome = { status: "paid" | "declined" | "pending"; detail: string };
type Gateway = { charge(orderId: string, amountCents: number): Promise<Outcome> };
type VendorClient = { createCharge(args: { amount: number; ref: string }): Promise<{ id: string; state: string; code: string }> };

export const vendorGateway = (client: VendorClient): Gateway => ({
  async charge(orderId, amountCents) {
    const res = await client.createCharge({ amount: amountCents, ref: orderId }).catch((cause: unknown) => {
      throw new Error("payment vendor unreachable", { cause });
    });
    switch (res.state) {
      case "ok":
        return { status: "paid", detail: res.id };
      case "declined":
        return { status: "declined", detail: res.code };
      case "processing":
        return { status: "pending", detail: res.id };
      default:
        throw new Error(`unmapped vendor state "${res.state}"`);
    }
  },
});

const states = ["declined", "processing", "", "frozen"];
const gateway = vendorGateway({
  createCharge: async ({ amount, ref }) => {
    if (amount === 2) throw new Error("socket hang up");
    return { id: `ch_${ref}`, state: states[amount] ?? "ok", code: "card_declined" };
  },
});
assert.deepEqual(await gateway.charge("o-1", 1250), { status: "paid", detail: "ch_o-1" });
assert.deepEqual(await gateway.charge("o-2", 0), { status: "declined", detail: "card_declined" });
assert.deepEqual(await gateway.charge("o-3", 1), { status: "pending", detail: "ch_o-3" });
await assert.rejects(gateway.charge("o-4", 2), /unreachable/);
await assert.rejects(gateway.charge("o-4", 3), /unmapped vendor state "frozen"/);
```

## In production

- `requests` transport adapters are mounted on a `Session` for a URL prefix, and requests whose URLs start with that prefix go through the adapter. `HTTPAdapter` is the one it ships with.
- Wrapping a vendor SDK for payments, email or storage, so swapping the vendor changes one file.

## Smells and misuse

- Vendor types in your domain signatures, or a catch-all mapping (`state != "ok"` means failed) that erases pending and declined reasons.
- Business rules inside the adapter, or adapting something you control. Keep it a translator.
- A Facade that becomes the only way in, or hides a failure the caller must handle. Lossy conversion (float money, truncated cents) with no test pinning the mapping.

## Related

- [Decorator](decorator.md) keeps the same interface and adds behavior; [Proxy](proxy.md) keeps it to control access. Adapter changes the interface.
- [DTO and Mapper](../data-access/dto-mapper.md) is the same translation for stored and wire shapes. [Dependency Injection](../creational/dependency-injection.md) delivers the adapter to its callers.
