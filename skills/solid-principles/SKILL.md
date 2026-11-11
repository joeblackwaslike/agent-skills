---
name: solid-principles
description: >-
  Use when designing or refactoring classes, modules, or interfaces and the user mentions SOLID,
  SRP, OCP, LSP, ISP, DIP or dependency injection, or code shows a god class, a growing type-tag
  switch, a subclass that throws "not supported", or a fat interface. TypeScript and Python
  examples. Skip throwaway scripts and simple CRUD glue. Not for choosing or
  implementing a named pattern (use design-patterns).
metadata:
  last_updated: "2026-06-25"
---

# SOLID Principles

Use this skill to make object-oriented code that **absorbs change** instead of resisting it:
classes with one job, new behavior added without editing what already works, parts that
substitute cleanly, narrow seams between collaborators, and dependencies that point at
abstractions rather than concrete details.

**Core principle:** SOLID is five facets of *one* goal — high cohesion and low coupling. The
acronym is a memory aid, not five unrelated rules. SRP gives you small, focused units; ISP
keeps the seams between them narrow; DIP points those seams at abstractions; OCP and LSP let
you add and swap implementations behind them without editing or breaking callers. Applied
together they make change *local* — the whole point.

One worked domain — a **notification dispatcher** (format → send → record, across email / SMS
/ push channels) — runs through the two integrated example files so the five principles
visibly compose instead of floating as disconnected snippets.

## Before you reach for this: do you even need it?

SOLID buys flexibility by adding abstraction, and abstraction has a cost (indirection,
more files, more to hold in your head). It pays off in code that **changes and grows**. It is
overkill for code that won't.

| Signal | Lean toward |
| --- | --- |
| A class/module that keeps growing, gets edited for unrelated reasons, or is hard to test in isolation | Apply SOLID — start with SRP |
| New variants keep arriving (payment types, report formats, channels) and each one edits the same `switch` | OCP + a polymorphic seam |
| You swap implementations in tests, or want to (real DB vs. fake, SMTP vs. capture) | DIP — inject an abstraction |
| A throwaway script, a spike, a one-off migration | Write it plain; don't abstract |
| Genuinely simple CRUD — store it, show it, edit it, no real rules | Plain handlers; an interface per dependency is ceremony |
| You're adding an interface that will have exactly one implementation forever | Stop — that's `anti-patterns.md`'s over-engineering trap |

If the answer is "this won't change," say so and keep it simple. **Misapplied SOLID is worse
than none** — see the over-applying section of `references/anti-patterns.md`.

## Route First

Pick the principle (or file) that matches the task. Read the most specific one first.

| Task | Read |
| --- | --- |
| A class doing too much / many reasons to change / god class — split by responsibility | `references/single-responsibility.md` |
| A growing `switch`/`if-isinstance` per feature — extend without editing existing code | `references/open-closed.md` |
| A subclass that breaks its base's contract, throws "not supported", or surprises callers | `references/liskov-substitution.md` |
| A fat interface forcing callers/implementers to depend on methods they don't use | `references/interface-segregation.md` |
| High-level policy welded to a concrete DB / mailer / client — invert and inject the dependency | `references/dependency-inversion.md` |
| Recognizing and fixing SOLID gone wrong — both violations AND over-engineering | `references/anti-patterns.md` |
| A complete, copy-paste-ready system honoring all five, in TypeScript | `references/typescript-examples.md` |
| A complete, copy-paste-ready system honoring all five, in Python | `references/python-examples.md` |

## The five, in one breath

1. **Single Responsibility (SRP)** — a class should have one reason to change: one actor, one
   axis of change. *Kills:* the god class that computes, formats, persists, and emails.
   *Gives you:* small units you can test, name, and change in isolation.

2. **Open/Closed (OCP)** — open for extension, closed for modification: add new behavior by
   adding code, not editing working code. *Kills:* the `switch (type)` you reopen for every
   new variant. *Gives you:* new variants behind a stable seam, existing code untouched.

3. **Liskov Substitution (LSP)** — a subtype must be usable anywhere its base is, honoring the
   base's *behavioral* contract (preconditions, postconditions, invariants, exceptions) — not
   just its signatures. *Kills:* `Square extends Rectangle`, `Penguin.fly()` throwing.
   *Gives you:* polymorphism you can trust; OCP that actually holds.

4. **Interface Segregation (ISP)** — clients shouldn't depend on methods they don't use; many
   small role interfaces beat one fat one. *Kills:* the `Worker`/`Machine` interface forcing
   `eat()`/`scan()` no-ops. *Gives you:* narrow seams that don't drag unrelated changes along.

5. **Dependency Inversion (DIP)** — high-level policy and low-level details should both depend
   on abstractions; details depend on the abstraction, not the reverse. *Kills:*
   `new SmtpMailer()` inside your service. *Gives you:* swappable implementations, testable
   policy, dependencies pointing inward (the same rule `domain-driven-design` enforces).

## How the five reinforce each other

They are one system, not a checklist:

```
SRP   → small, single-purpose classes ............ the units worth wiring together
ISP   → narrow role interfaces between them ....... the shape of each seam
DIP   → those interfaces are the dependencies ..... arrows point at abstractions, inward
OCP   → add a new implementation behind the seam .. without editing existing callers
LSP   → the new implementation is substitutable ... so OCP's promise actually holds
```

Skip SRP and your interfaces (ISP) describe blobs. Skip DIP and OCP has nowhere to plug new
variants in. Violate LSP and OCP's "just add a subclass" silently breaks callers. You rarely
apply one in isolation — a good refactor moves several at once, as the example files show.

## Red flags — stop and reconsider

- "I'll add the new case to the `switch`/`if-isinstance` again." → OCP/SRP; the type tag wants
  to be a polymorphic seam. See `references/open-closed.md`.
- "This class is named `*Manager`/`*Util`/`*Helper` and does five things." → god class; split
  by responsibility. See `references/single-responsibility.md`.
- "The subclass overrides this to throw `NotSupportedError`." → LSP violation (refused
  bequest); the hierarchy is wrong. See `references/liskov-substitution.md`.
- "Implementing this interface means stubbing six methods I don't need." → fat interface;
  segregate into roles. See `references/interface-segregation.md`.
- "My service does `new PostgresRepo()` / `new HttpClient()` in its constructor." → concrete
  dependency; invert and inject. See `references/dependency-inversion.md`.
- "I added an interface, a factory, and a DI binding for something with one implementation
  that never changes." → over-engineering; do the simple thing. See `references/anti-patterns.md`.

## Completion criteria

Before considering a class/module design done:

- Each class has **one reason to change** — you can name its single responsibility in a phrase.
- New variants can be added by **adding** a class/implementation, not editing a growing
  conditional in existing code.
- Every subtype is **substitutable** for its base: it strengthens no preconditions, weakens no
  postconditions, throws no surprises, breaks no invariants.
- Clients depend only on the **methods they use**; no implementer stubs out methods it doesn't
  need.
- High-level policy depends on **abstractions**, with concrete details injected — not
  `new`-ed inside.
- Every abstraction you introduced is **justified by real, expected change** — not a
  speculative interface around a thing with one forever-implementation.

## Related skills

- `design-patterns`: the named patterns (Strategy, Adapter, Repository, Circuit Breaker and others) with Python and TypeScript references, each starting from the plain alternative.
