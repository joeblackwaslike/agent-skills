# Anti-Patterns: SOLID Gone Wrong

SOLID fails in two directions: **violating** the principles (rigid, tangled code) and
**over-applying** them (needless abstraction and indirection). Both are real failures. This file
catalogs each common mode with the tell, a code snippet, and the fix. When you write or review
code, scan for these.

## Part 1 — Violating SOLID

### 1. God class / blob

**The tell:** A class named `*Manager`, `*Util`, `*Helper`, `*Processor`, `*Service`, or
`*Controller` with hundreds of lines, a dozen unrelated fields, and methods that span
persistence, formatting, validation, networking, and business rules. Many actors force changes
to it; every feature touches it.

```ts
// ❌ One class, every reason to change.
class UserManager {
  validate(u: User) {}
  hashPassword(p: string) {}
  saveToDb(u: User) {}
  sendEmail(u: User) {}
  renderProfileHtml(u: User) {}
  exportCsv(users: User[]) {}
}
```

**The fix:** Split by responsibility (SRP). One reason to change per class: a validator, a
hasher, a repository, a mailer, a formatter. A thin use case orchestrates them. See
`single-responsibility.md`.

### 2. Shotgun surgery (the type tag)

**The tell:** Adding one feature (a new payment type, report format, channel) forces edits in
several places that all branch on the same `type`/`kind` string or enum. They drift out of sync.

```python
# ❌ The same enum is switched on in five different functions.
def fee(p):    return 0.03 if p.kind == "card" else 0.01 if p.kind == "ach" else ...
def label(p):  return "Card" if p.kind == "card" else "ACH" if p.kind == "ach" else ...
def settle(p): ...  # another switch on p.kind
```

**The fix:** Replace the type tag with polymorphism (OCP) — each variant is a class that owns
its `fee()`, `label()`, `settle()`. Adding a variant is one new class, not five edits. See
`open-closed.md`.

### 3. Refused bequest (LSP violation)

**The tell:** A subclass overrides an inherited method just to throw — `NotImplementedError`,
`throw new Error("unsupported")` — or quietly does nothing. The subtype isn't substitutable;
callers of the base break when it shows up.

```ts
// ❌ ReadOnlyList IS-A List by inheritance, but refuses half the contract.
class ReadOnlyList<T> extends ArrayList<T> {
  add(_: T): void { throw new Error("read only"); }     // breaks every caller of List.add
}
```

**The fix:** Fix the hierarchy. Prefer composition over inheritance, or split the interface so a
type only implements what it can honor (a `ReadableList` without `add`). See
`liskov-substitution.md` and `interface-segregation.md`.

### 4. `instanceof` / `isinstance` in callers

**The tell:** Code that's supposed to be polymorphic keeps checking the concrete subtype to
decide what to do. Each new subtype means another branch — OCP is already broken, and it usually
signals a hidden LSP problem (the subtypes aren't really substitutable).

```python
# ❌ The abstraction leaks; callers special-case subtypes.
def area(shape):
    if isinstance(shape, Circle):
        return 3.14159 * shape.r ** 2
    elif isinstance(shape, Square):
        return shape.side ** 2
```

**The fix:** Push the behavior onto the type (`shape.area()`); let polymorphism dispatch. If a
caller *needs* to branch on subtype, the interface is missing a method. See `open-closed.md`.

### 5. Fat interface

**The tell:** An interface with many methods where implementers stub several out, or clients use
a small slice. Changing any method ripples to every implementer.

```ts
// ❌ Anyone implementing Repository must provide 11 methods even to do one thing.
interface Repository<T> {
  save(t: T): void; delete(id: string): void; findById(id: string): T;
  findAll(): T[]; count(): number; exists(id: string): boolean;
  bulkInsert(ts: T[]): void; truncate(): void; /* ...and more */
}
```

**The fix:** Segregate into role interfaces (`Saver`, `Finder`, `Counter`); each client depends
on the narrowest one it needs. See `interface-segregation.md`.

### 6. Concrete dependency / `new` in the constructor

**The tell:** A high-level class constructs its own infrastructure (`new PostgresClient()`,
`new SmtpMailer()`, `new Date()`), so it can't be tested without the real thing and can't be
reconfigured without editing it.

```python
# ❌ Policy welded to details it builds itself.
class ReportJob:
    def __init__(self):
        self.db = PostgresClient("postgres://prod/...")
        self.clock = datetime  # can't freeze time in a test
```

**The fix:** Depend on abstractions and inject the concretes at a composition root (DIP). See
`dependency-inversion.md`.

### 7. Static / singleton coupling

**The tell:** Business logic calls `Database.getInstance()`, `Logger.instance`, or a global
function directly. It looks dependency-free but is hard-coupled to a global and unmockable.

```ts
// ❌ Hidden hard dependency on a global singleton.
class Checkout {
  pay(o: Order) { Database.getInstance().insert("payments", o); }
}
```

**The fix:** Inject the dependency through the constructor instead of reaching for a global. A
singleton is still a concrete dependency — DIP applies. See `dependency-inversion.md`.

### 8. Leaky abstraction (wrong-shaped interface)

**The tell:** An "abstraction" whose methods mirror the underlying detail — `repo.executeSql(...)`,
`mailer.openSmtpSocket(...)`. Swapping the implementation is impossible because the interface
leaks the very detail it was supposed to hide.

**The fix:** Shape the abstraction around what the **policy needs** (`repo.save(order)`), owned
by the high-level module — not around what the detail provides. See the "who owns the
abstraction" note in `dependency-inversion.md`.

## Part 2 — Over-applying SOLID (the senior half)

Every principle has a failure mode of *too much*. Misapplied SOLID adds indirection, files, and
cognitive load with no payoff — often worse than the violation it "fixed."

### 9. Interface with one forever-implementation

**The tell:** Every concrete class has a same-named interface (`UserService` /
`IUserService`, `EmailSender` / `IEmailSender`) with exactly one implementation that will never
have a second. The interface adds a hop and a file; it abstracts nothing.

**The fix:** Don't add the interface until there's a *second* implementation or a real test-fake
need. Modern tooling can extract an interface in seconds when the day comes. YAGNI. (Header
interfaces — an interface mirroring one class's entire public surface — buy zero decoupling.)

### 10. Abstraction astronomy / speculative OCP

**The tell:** Layers of factories, strategies, and abstract base classes built to handle
variation that has appeared **zero** times. A `PaymentStrategyFactoryProvider` for an app that
only ever takes credit cards.

**The fix:** Apply OCP when the *second or third* variant arrives (rule of three), not in
anticipation. A plain conditional for a one-off is correct. You can't predict every axis of
change; guessing wrong builds the wrong abstraction, which is harder to remove than no
abstraction.

### 11. Premature DI container

**The tell:** A small app wires everything through a heavyweight DI container with XML/decorator
configuration, magic auto-binding, and runtime resolution — turning a readable `new Service(new
Repo())` composition root into indirection nobody can trace.

**The fix:** DIP needs *injection*, not a *container*. Hand-wire at a composition root until the
graph is genuinely too large to manage by hand. Manual wiring is explicit and debuggable.

### 12. Anemic one-method-per-class explosion

**The tell:** SRP taken to absurdity: `UserNameValidator`, `UserEmailValidator`,
`UserAgeValidator`, each a single method, plus a coordinator to call them. Cohesion shattered;
you jump through ten files to read one workflow.

**The fix:** SRP is about **reasons to change**, not method count. Methods that serve one
responsibility and change together belong together. Keep cohesive things whole. See the nuance in
`single-responsibility.md`.

### 13. Config-monster "OCP"

**The tell:** To avoid ever editing code, behavior is pushed into giant configuration / rules
engines / feature-flag trees until the *config* becomes an untestable, untyped program of its
own.

**The fix:** Closing against change doesn't mean "no code changes ever." Sometimes adding a small
class is far clearer than another layer of config indirection. Match the mechanism to the actual
rate and shape of change.

## Quick review heuristics

Scanning a class or a diff, these surface most SOLID problems fast:

- **How many reasons would this class change?** More than one → SRP split.
- **Does adding the next variant edit this code, or add a new file?** Edit → OCP seam missing.
- **Is any subtype refusing or surprising part of its base's contract?** → LSP violation.
- **Do implementers stub methods, or clients use a slice of an interface?** → segregate (ISP).
- **Does this high-level class `new` its own DB/mailer/clock, or call a singleton?** → invert
  and inject (DIP).
- **And the other way:** Does this interface/factory/container have exactly one implementation
  and no test-fake need? → delete the abstraction; do the simple thing.
