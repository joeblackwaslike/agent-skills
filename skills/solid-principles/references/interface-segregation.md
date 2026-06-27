# Interface Segregation Principle (ISP)

> Clients should not be forced to depend on methods they do not use.

Prefer many small, **role-specific** interfaces over one large general-purpose one. When a class
depends on a fat interface but only calls two of its eleven methods, it's coupled to the nine it
ignores — a change to any of them can force a recompile, a re-test, or a broken implementation,
for no reason. Segregating the interface by *role* keeps each client coupled only to what it
actually needs.

## The smell

- An interface so big that implementers stub out methods with `throw new Error("unsupported")`
  or `pass` / `raise NotImplementedError` (note: this is also an LSP violation — the two travel
  together).
- A client that takes a big dependency but uses one slice of it.
- "Header interface" — one interface that mirrors every public method of one fat class, so it
  buys no decoupling at all.
- Adding a method to a shared interface forces edits in many unrelated implementers.

## Bad → Good in TypeScript

```ts
// ❌ One fat interface; the simple worker is forced to implement things it can't do.
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class HumanWorker implements Worker {
  work() {}
  eat() {}
  sleep() {}
}

class RobotWorker implements Worker {
  work() {}
  eat() { throw new Error("robots don't eat"); }   // refused — fat interface forced it
  sleep() { throw new Error("robots don't sleep"); }
}
```

```ts
// ✅ Role interfaces; each client depends only on the capability it needs.
interface Workable { work(): void; }
interface Feedable { eat(): void; }
interface Restable { sleep(): void; }

class HumanWorker implements Workable, Feedable, Restable {
  work() {}
  eat() {}
  sleep() {}
}

class RobotWorker implements Workable {   // implements ONLY what it can honor
  work() {}
}

// A scheduler that only assigns work depends on the narrowest thing that works:
function assign(tasks: Workable[]): void {
  tasks.forEach((t) => t.work());          // can't even see eat()/sleep()
}
```

TypeScript's **structural typing** makes this nearly free — a class satisfies `Workable` just by
having `work()`, no `implements` ceremony required. Define the narrow interface at the point of
*use* (the client owns the interface it needs), and existing classes fit it automatically.

## Bad → Good in Python

```python
# ❌ A fat "Machine" Protocol forces a simple printer to fake scan/fax.
from typing import Protocol


class Machine(Protocol):
    def print(self, doc: bytes) -> None: ...
    def scan(self) -> bytes: ...
    def fax(self, doc: bytes, number: str) -> None: ...


class OldPrinter:
    def print(self, doc: bytes) -> None: ...
    def scan(self) -> bytes:
        raise NotImplementedError("no scanner")     # forced no-op
    def fax(self, doc: bytes, number: str) -> None:
        raise NotImplementedError("no fax")
```

```python
# ✅ Segregated roles; a multifunction device composes them, a basic printer doesn't.
from typing import Protocol


class Printer(Protocol):
    def print(self, doc: bytes) -> None: ...


class Scanner(Protocol):
    def scan(self) -> bytes: ...


class Fax(Protocol):
    def fax(self, doc: bytes, number: str) -> None: ...


class OldPrinter:                 # satisfies Printer, and nothing it can't do
    def print(self, doc: bytes) -> None: ...


class MultiFunction:              # satisfies Printer, Scanner, AND Fax — structurally
    def print(self, doc: bytes) -> None: ...
    def scan(self) -> bytes: ...
    def fax(self, doc: bytes, number: str) -> None: ...


def print_all(printer: Printer, docs: list[bytes]) -> None:
    for d in docs:
        printer.print(d)          # depends on the smallest role it needs
```

Python `Protocol` gives you the same structural fit as TypeScript: `OldPrinter` *is a* `Printer`
without declaring it, and code that needs printing asks for the `Printer` role only.

## ISP and DIP are the same seam from two sides

DIP says "depend on an abstraction." ISP says "make that abstraction **as small as the client
needs**." A use case that only needs to *save* an order should depend on a one-method
`OrderSaver`, not a twenty-method `OrderRepository`. The narrowest interface is the most honest
statement of what a client actually requires — and the easiest to fake in a test.

## Nuance — don't shatter into one-method interfaces reflexively

ISP is about **not forcing unused dependencies**, not "every interface has exactly one method."
If five methods always travel together and every client uses all five (a cohesive `Money` value
object, a `Clock` with `now()`), keeping them in one interface is correct — splitting them is
noise. Segregate along the lines where clients **actually differ** in what they use. A good
heuristic: if you keep seeing implementers stub a method, or clients ignore one, that's the seam
to cut along.

## See also

- `references/dependency-inversion.md` — ISP shapes the abstraction; DIP points dependencies at
  it.
- `references/liskov-substitution.md` — fat interfaces cause refused-bequest LSP violations;
  segregation cures both.
- `references/typescript-examples.md` / `references/python-examples.md` — narrow `Notifier`,
  `Formatter`, and `DeliveryLog` roles instead of one fat channel interface.
