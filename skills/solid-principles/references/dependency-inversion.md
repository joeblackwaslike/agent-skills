# Dependency Inversion Principle (DIP)

> High-level modules should not depend on low-level modules. **Both should depend on
> abstractions.** Abstractions should not depend on details; details should depend on
> abstractions.

The "inversion" is in the direction of the dependency arrow. Normally high-level policy (your
business logic) calls into low-level details (the database, the mailer, the HTTP client), so it
*depends* on them — change the detail, recompile the policy, and you can't test the policy
without the real thing. DIP flips it: define an **abstraction** that the policy owns and depends
on, and make the detail *implement* that abstraction. Now the arrow points from the detail to
the policy. The policy is insulated; the detail is swappable.

Note: **DIP** (a design principle about arrow direction) is the *why*; **dependency injection**
(passing collaborators in via constructor/parameters) is the most common *how*; a **DI
container** is just one mechanism for wiring — you don't need one to do DIP.

## The smell

- A service that does `new ConcreteDatabase()` / `new SmtpMailer()` / `new HttpClient()`
  **inside** itself (constructor or method).
- A `import`/`require` of a concrete infrastructure module at the top of a business-logic file.
- You can't unit-test the logic without a real database, network, or clock — because it
  constructs them itself.
- Swapping Postgres for SQLite, or SMTP for a queue, means editing the business logic.

## Bad → Good in TypeScript

```ts
// ❌ High-level policy depends directly on low-level details it constructs itself.
class SmtpMailer {
  send(to: string, body: string): void { /* opens a socket to an SMTP server */ }
}

class OrderService {
  private readonly mailer = new SmtpMailer();          // welded to SMTP
  private readonly db = new PostgresClient();           // welded to Postgres

  placeOrder(order: Order): void {
    this.db.insert("orders", order);                    // can't test without a real DB
    this.mailer.send(order.email, "Order confirmed");   // can't test without a real mailer
  }
}
```

```ts
// ✅ The policy owns the abstractions and depends only on them; details are injected.
interface OrderRepository {
  save(order: Order): void;
}
interface Mailer {
  send(to: string, body: string): void;
}

class OrderService {
  constructor(
    private readonly repo: OrderRepository,   // depends on abstraction, not Postgres
    private readonly mailer: Mailer,          // depends on abstraction, not SMTP
  ) {}

  placeOrder(order: Order): void {
    this.repo.save(order);
    this.mailer.send(order.email, "Order confirmed");
  }
}

// Details implement the policy's abstractions — the arrow now points inward:
class PostgresOrderRepository implements OrderRepository {
  save(order: Order): void { /* ...SQL... */ }
}
class SmtpMailer implements Mailer {
  send(to: string, body: string): void { /* ...SMTP... */ }
}

// Composition root wires concretes to the policy (the ONLY place that knows both):
const service = new OrderService(new PostgresOrderRepository(), new SmtpMailer());

// And a test injects fakes with zero infrastructure:
const captured: Order[] = [];
const test = new OrderService(
  { save: (o) => captured.push(o) },
  { send: () => {} },
);
```

## Bad → Good in Python

```python
# ❌ The use case constructs its own infrastructure; logic and details are fused.
class OrderService:
    def __init__(self) -> None:
        self._db = PostgresClient(dsn="postgres://prod/...")   # welded + hard to test
        self._mailer = SmtpMailer(host="smtp.prod")

    def place_order(self, order: "Order") -> None:
        self._db.insert("orders", order)
        self._mailer.send(order.email, "Order confirmed")
```

```python
# ✅ Depend on Protocols; inject implementations. The policy imports no infrastructure.
from typing import Protocol


class OrderRepository(Protocol):
    def save(self, order: "Order") -> None: ...


class Mailer(Protocol):
    def send(self, to: str, body: str) -> None: ...


class OrderService:
    def __init__(self, repo: OrderRepository, mailer: Mailer) -> None:
        self._repo = repo
        self._mailer = mailer

    def place_order(self, order: "Order") -> None:
        self._repo.save(order)
        self._mailer.send(order.email, "Order confirmed")


# Concrete details live elsewhere and satisfy the Protocols structurally:
class PostgresOrderRepository:
    def save(self, order: "Order") -> None: ...


class SmtpMailer:
    def send(self, to: str, body: str) -> None: ...


# Composition root:
service = OrderService(PostgresOrderRepository(), SmtpMailer())

# Test with a fake — no DB, no SMTP:
class InMemoryRepo:
    def __init__(self) -> None:
        self.saved: list["Order"] = []
    def save(self, order: "Order") -> None:
        self.saved.append(order)
```

## Who owns the abstraction matters

The critical, often-missed half: the **abstraction belongs to the high-level module**, not the
low-level one. `OrderRepository` is defined next to `OrderService` (in the domain/application
layer) and expresses what the *policy* needs — `save(order)`, not `executeSql(string)`. The
Postgres adapter, in the infrastructure layer, implements it. That's why it's *inversion*: the
detail conforms to the policy's terms, never the reverse. If your "interface" is shaped like the
database's API, you've abstracted the wrong direction.

## Nuance — don't invert dependencies that won't vary

DIP earns its keep where the detail genuinely **varies or needs faking**: databases, network
clients, mailers, clocks, the file system, anything that makes tests slow or flaky. It is *not*
a mandate to wrap every collaborator in an interface. Depending directly on the standard
library, a pure value object, or a stable utility is fine — inverting those adds indirection
with no payoff (see the over-engineering section of `anti-patterns.md`). Invert at the
boundaries between policy and volatile detail; stay concrete in the stable interior.

## See also

- `references/interface-segregation.md` — make the injected abstraction as small as the policy
  needs (an `OrderSaver`, not a fat repository).
- `references/single-responsibility.md` — the collaborators you inject are the seams an SRP
  split produces.
- `references/typescript-examples.md` / `references/python-examples.md` — a dispatcher depending
  only on `Notifier`/`Formatter`/`DeliveryLog` abstractions, wired in a composition root.
- `domain-driven-design` — DIP is the engine of hexagonal/ports-and-adapters architecture:
  domain owns the ports, infrastructure implements them, dependencies point inward.
