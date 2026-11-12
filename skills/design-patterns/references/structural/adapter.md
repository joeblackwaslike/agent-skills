# Adapter

## What it is and Problem it solves

An adapter wraps something with the wrong interface so your code can use it through the interface it expects. The third-party SDK takes minor units and returns a dict; your code wants `Decimal` amounts and a typed result. The adapter does that translation in one module, so the vendor's shapes and quirks never spread into your domain. A Facade is the neighboring idea, covered at the end: one simple entry point in front of several moving parts.

## Do you need this?

Not for a one-off call. If a single function calls the vendor once, convert the arguments inline and move on.

The signal is a second call site, or a vendor type leaking into your domain (dict keys like `"state"`, cents as strings, vendor exceptions in your handlers). That tells you the translation belongs in one place. If you may swap the vendor, or you want tests that run without it, the adapter is also where the fake plugs in.

A plain function `to_domain(vendor_response)` is an adapter. Use a class only when the adapter holds a client or configuration.

## Python

```python
from collections.abc import Callable
from dataclasses import dataclass
from decimal import Decimal
from typing import Protocol


@dataclass(frozen=True)
class PaymentResult:
    paid: bool
    reference: str


class Gateway(Protocol):
    def charge(self, order_id: str, amount: Decimal) -> PaymentResult: ...


class VendorClient:
    def create_charge(self, *, amount_minor: int, currency: str, ref: str) -> dict[str, str]:
        state = "ok" if amount_minor > 0 else "declined"
        return {"id": f"ch_{ref}", "state": state, "currency": currency}


@dataclass(frozen=True)
class VendorGateway:
    client: VendorClient
    currency: str = "USD"

    def charge(self, order_id: str, amount: Decimal) -> PaymentResult:
        response = self.client.create_charge(
            amount_minor=int(amount * 100),
            currency=self.currency,
            ref=order_id,
        )
        return PaymentResult(paid=response["state"] == "ok", reference=response["id"])


gateway: Gateway = VendorGateway(VendorClient())
assert gateway.charge("o-1", Decimal("12.50")) == PaymentResult(True, "ch_o-1")
assert not gateway.charge("o-2", Decimal("0")).paid


@dataclass(frozen=True)
class Subsystems:
    reserve_stock: Callable[[str], bool]
    gateway: Gateway


def place_order(s: Subsystems, order_id: str, amount: Decimal) -> str:
    if not s.reserve_stock(order_id):
        return "out_of_stock"
    return "confirmed" if s.gateway.charge(order_id, amount).paid else "payment_failed"


facade = Subsystems(reserve_stock=lambda _id: True, gateway=gateway)
assert place_order(facade, "o-3", Decimal("5.00")) == "confirmed"
assert place_order(Subsystems(lambda _id: False, gateway), "o-4", Decimal("5.00")) == "out_of_stock"
```

`VendorGateway` is the adapter. Callers see `Gateway` and `PaymentResult` and never touch `create_charge` or the vendor's dict. `place_order` is the Facade: callers make one call and do not know about the stock and payment steps behind it. Converting money with `int(amount * 100)` truncates sub-cent amounts, so reject or round them at the edge if your inputs can have them.

## TypeScript

```typescript
import assert from "node:assert/strict";

type PaymentResult = { paid: boolean; reference: string };
type Gateway = { charge(orderId: string, amountCents: number): Promise<PaymentResult> };

type VendorResponse = { id: string; state: "ok" | "declined" };
type VendorClient = { createCharge(args: { amount: number; ref: string }): Promise<VendorResponse> };

export const vendorGateway = (client: VendorClient): Gateway => ({
  async charge(orderId, amountCents) {
    const res = await client.createCharge({ amount: amountCents, ref: orderId });
    return { paid: res.state === "ok", reference: res.id };
  },
});

type Subsystems = { reserveStock(orderId: string): Promise<boolean>; gateway: Gateway };

export async function placeOrder(s: Subsystems, orderId: string, cents: number): Promise<string> {
  if (!(await s.reserveStock(orderId))) return "out_of_stock";
  return (await s.gateway.charge(orderId, cents)).paid ? "confirmed" : "payment_failed";
}

async function main(): Promise<void> {
  const fakeVendor: VendorClient = {
    createCharge: async ({ amount, ref }) => ({ id: `ch_${ref}`, state: amount > 0 ? "ok" : "declined" }),
  };
  const gateway = vendorGateway(fakeVendor);
  assert.deepEqual(await gateway.charge("o-1", 1250), { paid: true, reference: "ch_o-1" });
  assert.equal((await gateway.charge("o-2", 0)).paid, false);

  assert.equal(await placeOrder({ reserveStock: async () => true, gateway }, "o-3", 500), "confirmed");
  assert.equal(await placeOrder({ reserveStock: async () => false, gateway }, "o-4", 500), "out_of_stock");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

A closure over the client is the whole adapter, and any object with a matching `createCharge` satisfies `VendorClient`, including the test fake.

## In production

- `requests` transport adapters: you mount an adapter on a `Session` for a URL prefix, and requests whose URLs start with that prefix go through it. `HTTPAdapter` is the one it ships with.
- ORM dialects and database drivers hide each database's wire differences behind one interface.
- An anti-corruption layer in domain-driven design is an adapter at a system boundary.
- Wrapping a vendor SDK is common for payments, email and storage, so that swapping the vendor changes one file.

## Smells and misuse

- Vendor types in your domain signatures. Then nothing was adapted.
- An adapter that grows business rules (discounts, retries). Keep it a translator and put rules in the domain.
- Adapting something you control. Change the interface instead.
- One adapter per vendor method with no shared type, which spreads the translation again.
- Facade that becomes the only way in, so callers who need one subsystem cannot reach it. Keep the pieces usable on their own.
- Lossy conversion (float money, dropped error codes) with no test that pins the mapping.

## Related

- [Decorator](decorator.md) keeps the same interface and adds behavior; Adapter changes the interface.
- [Proxy](proxy.md) also keeps the interface, to control access.
- [DTO and Mapper](../data-access/dto-mapper.md) is the same translation for stored and wire shapes.
- [Dependency Injection](../creational/dependency-injection.md) is how the adapter reaches the code that uses it.
