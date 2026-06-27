# Open/Closed Principle (OCP)

> Software entities should be **open for extension, but closed for modification**.

You should be able to add new behavior by **adding new code**, not by editing code that already
works. Every time a new requirement forces you to reopen and re-test a stable class, that class
wasn't closed against that kind of change. The lever is a **stable abstraction** (an interface
or base type) behind which new variants plug in.

## The smell

- A `switch (type)` / `if/elif isinstance(...)` chain that you **reopen for every new variant**
  — a new payment method, report format, shape, or channel means another `case`.
- "Shotgun surgery": adding one feature requires edits in five places that all branch on the
  same type tag.
- A growing enum plus parallel growing conditionals scattered across the codebase that must all
  stay in sync.

## Bad → Good in TypeScript

```ts
// ❌ Closed against nothing: every new shape reopens area() — and any other switch like it.
type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rectangle"; w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.r ** 2;
    case "rectangle":
      return s.w * s.h;
    // add "triangle"? edit this function — and perimeter(), and draw(), and ...
  }
}
```

```ts
// ✅ The abstraction is closed; new shapes are added, never edited in.
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private readonly r: number) {}
  area(): number {
    return Math.PI * this.r ** 2;
  }
}

class Rectangle implements Shape {
  constructor(private readonly w: number, private readonly h: number) {}
  area(): number {
    return this.w * this.h;
  }
}

// Adding a Triangle is a NEW file implementing Shape. area() callers never change.
function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}
```

## Bad → Good in Python — with a registry for the "which variant?" decision

The conditional usually doesn't vanish entirely — *something* maps input to a variant. The win
is concentrating that into a **registry** at the edge, leaving the core logic closed.

```python
# ❌ Reopened for every new exporter; the dispatch and the logic are tangled.
def export(report: Report, fmt: str) -> bytes:
    if fmt == "csv":
        return _to_csv(report)
    elif fmt == "json":
        return _to_json(report)
    elif fmt == "pdf":          # ...and next quarter, "xlsx", "html", "parquet"
        return _to_pdf(report)
    raise ValueError(f"unknown format: {fmt}")
```

```python
# ✅ Each exporter is a closed unit; new ones self-register without editing the dispatcher.
from typing import Protocol


class Exporter(Protocol):
    def export(self, report: "Report") -> bytes: ...


_REGISTRY: dict[str, Exporter] = {}


def register(fmt: str):
    def decorator(cls: type[Exporter]) -> type[Exporter]:
        _REGISTRY[fmt] = cls()
        return cls
    return decorator


@register("csv")
class CsvExporter:
    def export(self, report: "Report") -> bytes: ...


@register("json")
class JsonExporter:
    def export(self, report: "Report") -> bytes: ...


def export(report: "Report", fmt: str) -> bytes:
    try:
        return _REGISTRY[fmt].export(report)   # dispatcher never changes again
    except KeyError:
        raise ValueError(f"unknown format: {fmt}") from None
```

Adding a `PdfExporter` is a new class with a `@register("pdf")` decorator — the `export`
function, and everything that calls it, stays closed.

## OCP leans on its neighbors

- The seam (`Shape`, `Exporter`) only works if every implementation is genuinely
  **substitutable** — that's **LSP** (`liskov-substitution.md`). A variant that throws
  "not supported" silently breaks the closed caller.
- The seam should be a **narrow** interface — **ISP** (`interface-segregation.md`).
- Callers should depend on the abstraction, not the concretes — **DIP**
  (`dependency-inversion.md`).

## Nuance — closed against *likely* change, not all change

OCP does **not** mean "never edit code" or "wrap everything in an interface just in case." That
way lies abstraction astronomy (`anti-patterns.md`). You can't close a module against *every*
axis of change — closing it against one axis often opens it to another. The skill is predicting
**which** axis will actually vary (here: "we keep adding export formats") and closing against
*that* one. If a variant has appeared exactly once and shows no sign of multiplying, a plain
conditional is fine — apply OCP when the second or third variant arrives (the "rule of three").
Speculative OCP is a cost with no payoff.

## See also

- `references/liskov-substitution.md` — substitutability is what makes the closed seam safe.
- `references/anti-patterns.md` — the ever-growing `switch` (violation) and premature
  interfaces (over-application).
- `references/typescript-examples.md` / `references/python-examples.md` — adding a new
  notification channel without editing the dispatcher.
