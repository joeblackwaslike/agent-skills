# Dependency Injection

## What it is and Problem it solves

A function or class receives the things it depends on (a gateway, a clock, a database handle) as arguments instead of creating or importing them itself. One place near the program's entry point, the composition root, builds the real ones and passes them in. The code under test never reaches for a global, so a test can hand it a fake without patching anything.

## Do you need this?

You already do this whenever a function takes a parameter. The question is only whether a dependency should be a parameter or an import.

Use the plain version first: add an argument. Reach for a container or framework only if you can name the wiring that hurts, such as dozens of services whose construction order you keep getting wrong. If you cannot, a hand-written `build_app()` function is the whole mechanism.

The signal that you need injection at all is a test that needs `mock.patch` on a module path, a monkeypatched environment variable, or a real network call to run. That is a dependency that should have been an argument.

## Python

```python
from collections.abc import Callable, Mapping
from dataclasses import dataclass
from decimal import Decimal
from typing import Protocol


class Gateway(Protocol):
    def charge(self, order_id: str, amount: Decimal) -> str: ...


@dataclass(frozen=True)
class StripeLikeGateway:
    api_key: str

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


def compose(env: Mapping[str, str]) -> CheckoutService:
    return CheckoutService(
        gateway=StripeLikeGateway(env["PAYMENT_API_KEY"]),
        now=lambda: "2026-11-11T00:00:00Z",
    )


service = compose({"PAYMENT_API_KEY": "sk_test_1"})
assert service.pay("o-1", Decimal("5.00")).endswith("live:o-1:5.00")

fake = FakeGateway(charges=[])
test_service = CheckoutService(gateway=fake, now=lambda: "T0")
assert test_service.pay("o-2", Decimal("9.00")) == "T0 fake:o-2"
assert fake.charges == [("o-2", Decimal("9.00"))]
```

`compose` is the composition root and the only place that reads the environment and names `StripeLikeGateway`. The test builds `CheckoutService` with a `FakeGateway` and a fixed clock directly. Nothing is patched. The `Protocol` means the fake needs no base class.

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
  if (apiKey === undefined) throw new Error("PAYMENT_API_KEY is required");
  const gateway: Gateway = { charge: async (id, cents) => `live:${id}:${cents}:${apiKey.length}` };
  return makeCheckout({ gateway, now: () => "2026-11-11T00:00:00Z" });
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
- Wiring by hand in a `main.ts` or `server.ts`, as above, is a common way to build TypeScript services. Check that a container solves a wiring problem you have before adding one.
- Passing a clock and an ID generator as arguments is the common fix for tests that depend on the current time or on random IDs.
- Constructor arguments with Protocol or structural types are enough to let a test double stand in with no inheritance.

## Smells and misuse

- Service locator: a function that calls `container.get("gateway")` from inside business code. The dependency is hidden again, and the container is now a global.
- Injecting everything, including pure helpers and constants. Inject things with I/O, time, randomness, or several implementations.
- Wiring spread across many modules, so nobody can say what the app consists of. Keep it in one root.
- Constructors that do work (open connections, read env). Build objects cheaply and do the work in the root or an explicit `start()`.
- A mock framework that patches module attributes to compensate for hard-coded imports.

## Related

- [Singleton](singleton.md) is usually what you wanted when you reached for a global; inject one shared instance instead.
- [Factory](factory.md) is a function the composition root calls to pick an implementation from config.
- [Strategy](../behavioral/strategy.md) is the shape of most injected collaborators.
- `solid-principles` covers the dependency inversion principle behind this.
