# Dependency Injection

## What it is and Problem it solves

A function or class receives the things it depends on (a gateway, a clock, a database handle) as arguments instead of creating or importing them itself. One place near the program's entry point, the composition root, builds the real ones and passes them in. The code under test never reaches for a global, so a test can hand it a fake without patching anything.

## Do you need this?

You already do this whenever a function takes a parameter. Use the plain version first: add an argument. Reach for a container or framework only if you can name the wiring that hurts, such as dozens of services whose construction order you keep getting wrong. If you cannot, a hand-written `build_app()` function is the whole mechanism.

The signal is a test that needs `mock.patch` on a module path, a monkeypatched environment variable, or a real network call. That dependency should have been an argument, and a clock or ID generator passed in is the usual fix for time- or randomness-dependent tests.

## Python

```python
from collections.abc import Callable, Mapping
from dataclasses import dataclass, field
from datetime import UTC, datetime
from decimal import Decimal
from typing import Protocol


class Gateway(Protocol):
    def charge(self, order_id: str, amount: Decimal) -> str: ...


@dataclass(frozen=True)
class StripeLikeGateway:
    api_key: str = field(repr=False)

    def charge(self, order_id: str, amount: Decimal) -> str:
        return f"live:{order_id}:{amount}"


@dataclass
class FakeGateway:
    charges: list[tuple[str, Decimal]]

    def charge(self, order_id: str, amount: Decimal) -> str:
        self.charges.append((order_id, amount))
        return f"fake:{order_id}"


@dataclass(frozen=True)
class CheckoutService:
    gateway: Gateway
    now: Callable[[], str]

    def pay(self, order_id: str, amount: Decimal) -> str:
        if amount <= 0:
            raise ValueError("amount must be positive")
        return f"{self.now()} {self.gateway.charge(order_id, amount)}"


class MissingConfig(Exception):
    pass


def compose(env: Mapping[str, str]) -> CheckoutService:
    api_key = env.get("PAYMENT_API_KEY")
    if not api_key:
        raise MissingConfig("PAYMENT_API_KEY is required")
    return CheckoutService(
        gateway=StripeLikeGateway(api_key),
        now=lambda: datetime.now(UTC).isoformat(),
    )


service = compose({"PAYMENT_API_KEY": "sk_test_1"})
assert service.pay("o-1", Decimal("5.00")).endswith("live:o-1:5.00")
assert "sk_test_1" not in repr(service)
try:
    compose({})
except MissingConfig as err:
    assert "PAYMENT_API_KEY" in str(err)

fake = FakeGateway(charges=[])
test_service = CheckoutService(gateway=fake, now=lambda: "T0")
assert test_service.pay("o-2", Decimal("9.00")) == "T0 fake:o-2"
assert fake.charges == [("o-2", Decimal("9.00"))]
```

`compose` is the composition root and the only place that reads the environment and names `StripeLikeGateway`. The test builds `CheckoutService` with a `FakeGateway` and a fixed clock directly. Nothing is patched. The `Protocol` means the fake needs no base class, and `field(repr=False)` keeps the key out of logs.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Gateway = { charge(orderId: string, amountCents: number): Promise<string> };
type Deps = { gateway: Gateway; now: () => string };

export function makeCheckout({ gateway, now }: Deps) {
  return {
    async pay(orderId: string, amountCents: number): Promise<string> {
      if (amountCents <= 0) throw new Error("amount must be positive");
      return `${now()} ${await gateway.charge(orderId, amountCents)}`;
    },
  };
}

function compose(env: Record<string, string | undefined>) {
  const apiKey = env["PAYMENT_API_KEY"];
  if (apiKey === undefined || apiKey === "") throw new Error("PAYMENT_API_KEY is required");
  const gateway: Gateway = { charge: async (id, cents) => `live:${id}:${cents}` };
  return makeCheckout({ gateway, now: () => new Date().toISOString() });
}

async function main(): Promise<void> {
  const real = compose({ PAYMENT_API_KEY: "sk_test_1" });
  assert.match(await real.pay("o-1", 500), /live:o-1:500/);
  assert.throws(() => compose({}), /PAYMENT_API_KEY is required/);

  const charged: string[] = [];
  const test = makeCheckout({
    gateway: {
      charge: async (id) => {
        charged.push(id);
        return `fake:${id}`;
      },
    },
    now: () => "T0",
  });
  assert.equal(await test.pay("o-2", 900), "T0 fake:o-2");
  assert.deepEqual(charged, ["o-2"]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

`makeCheckout` takes its dependencies as one object and returns plain functions, so a closure does the job of a class. `compose` checks that the secret is present at startup instead of at the first charge.

## In production

- FastAPI's `Depends` injects request-scoped dependencies into route functions, and `app.dependency_overrides` swaps them in tests by mapping the original callable to a replacement.
- Hand wiring in a `main.ts`, as above, is a common way to build TypeScript services. Check that a container solves a wiring problem you have before adding one.

## Smells and misuse

- Service locator: a function that calls `container.get("gateway")` from inside business code. The dependency is hidden again, and the container is now a global.
- Injecting pure helpers and constants. Inject things with I/O, time, randomness, or several implementations.
- Wiring spread across many modules, or constructors that open connections or read env. Keep wiring in one root and do the work in an explicit `start()`.

## Related

- [Singleton](singleton.md) is usually what you wanted when you reached for a global; inject one shared instance instead.
- [Factory](factory.md) is a function the composition root calls to pick an implementation from config. [Strategy](../behavioral/strategy.md) is the shape of most injected collaborators.
