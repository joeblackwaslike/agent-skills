# Liskov Substitution Principle (LSP)

> Objects of a subtype must be **substitutable for their base type** without breaking the
> program.

Barbara Liskov's formal version: if `S` is a subtype of `T`, you can use an `S` anywhere a `T`
is expected and the program still behaves correctly. The key word is **behaviorally** — it's
not enough for the subclass to have the right method *signatures*. It must honor the base type's
**contract**: its preconditions, postconditions, invariants, and the exceptions callers expect.
A subclass that compiles but violates the contract is the most dangerous SOLID failure, because
it silently breaks code that was written against the base.

## The smell

- A subclass that overrides a method to **throw** "not supported" / `NotImplementedError`
  (a "refused bequest").
- A subclass that **strengthens a precondition** (rejects inputs the base accepted) or
  **weakens a postcondition** (returns less than the base promised).
- Callers that have to write `if (x instanceof Square)` — having to *check the subtype* means
  it isn't truly substitutable.
- A subclass that quietly changes a side effect the base guaranteed (e.g. base persists; subtype
  silently no-ops).

## The classic: Rectangle / Square

```ts
// ❌ A Square "is a" Rectangle mathematically, but not behaviorally.
class Rectangle {
  constructor(protected w: number, protected h: number) {}
  setWidth(w: number): void { this.w = w; }
  setHeight(h: number): void { this.h = h; }
  area(): number { return this.w * this.h; }
}

class Square extends Rectangle {
  setWidth(w: number): void { this.w = w; this.h = w; }   // mutates height too
  setHeight(h: number): void { this.w = h; this.h = h; }  // mutates width too
}

// Code written against Rectangle's contract now breaks for Square:
function grow(r: Rectangle): void {
  r.setWidth(5);
  r.setHeight(4);
  // Contract says area() === 20. For a Square it's 16. The caller is silently wrong.
  console.assert(r.area() === 20);
}
```

The fix isn't to patch `Square` — it's to recognize the hierarchy is wrong. A mutable `Square`
**is not** a behavioral `Rectangle`. Model them as separate `Shape` implementations (composition
over inheritance), or make them immutable so the precondition ("width and height vary
independently") never exists.

```ts
// ✅ No false hierarchy; both satisfy a Shape contract that promises only area().
interface Shape {
  area(): number;
}
class Rectangle implements Shape {
  constructor(private readonly w: number, private readonly h: number) {}
  area(): number { return this.w * this.h; }
}
class Square implements Shape {
  constructor(private readonly side: number) {}
  area(): number { return this.side ** 2; }
}
```

## The behavioral contract in Python — refused bequest

```python
# ❌ Penguin IS-A Bird by taxonomy, but it can't fly() — it refuses part of the contract.
class Bird:
    def fly(self) -> str:
        return "flap flap"

class Penguin(Bird):
    def fly(self) -> str:
        raise NotImplementedError("penguins can't fly")   # breaks every caller of Bird.fly()


def migrate(birds: list[Bird]) -> None:
    for b in birds:
        b.fly()   # explodes the moment a Penguin is in the list
```

```python
# ✅ Segregate the capability. Only things that actually fly implement Flyer.
from typing import Protocol


class Bird(Protocol):
    def eat(self) -> str: ...


class Flyer(Protocol):
    def fly(self) -> str: ...


class Sparrow:
    def eat(self) -> str: return "seeds"
    def fly(self) -> str: return "flap flap"


class Penguin:
    def eat(self) -> str: return "fish"   # no fly() — and no one expects it to


def migrate(flyers: list[Flyer]) -> None:
    for f in flyers:
        f.fly()   # type system guarantees every element actually flies
```

This is LSP and ISP working together: the base type only promises what *all* subtypes can
honor; capabilities not shared by all go into separate role interfaces
(`interface-segregation.md`).

## The contract rules (what "honor the base" means precisely)

A valid subtype:

- **Preconditions may be weakened, never strengthened.** It can accept *more* inputs than the
  base, never fewer. (A subtype that rejects negative numbers the base accepted breaks callers.)
- **Postconditions may be strengthened, never weakened.** It can promise *more* about its
  result, never less. (A subtype that returns an unsorted list where the base promised sorted
  breaks callers.)
- **Invariants of the base must be preserved.** It can't leave the object in a state the base
  forbade.
- **Exceptions:** it should throw only exception types the base's contract allows. A surprise
  exception type the caller doesn't catch is a contract break.
- **History constraint:** it must not allow state changes the base prohibited (e.g. making a
  base-immutable field mutable).

## Why LSP is the linchpin of OCP

OCP's promise — "add a new subtype, callers don't change" — is **only true if the new subtype is
substitutable**. An LSP violation turns every closed caller into a latent bug that fires when
the bad subtype shows up. If you find callers doing `instanceof`/`isinstance` checks to work
around a subtype, that's the alarm: the abstraction is leaking and OCP is already broken.

## Nuance

LSP is about the **contract**, which is often informal and undocumented — that's why violations
slip through. When you can't make a subtype substitutable, that's a signal to prefer
**composition over inheritance**, or to split the interface so no type is forced to implement
behavior it can't honor. "Favor composition" is frequently the concrete fix for an LSP problem.

## See also

- `references/open-closed.md` — LSP is what makes the closed seam trustworthy.
- `references/interface-segregation.md` — splitting capabilities so no subtype refuses a method.
- `references/anti-patterns.md` — "refused bequest" and `instanceof`-in-callers entries.
