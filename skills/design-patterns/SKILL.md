---
name: design-patterns
description: >-
  Use when a design calls for a named pattern or you are choosing between them: swapping behavior at runtime, adapting a service, decoupling producers and consumers, hiding persistence, or making calls resilient (retry, circuit breaker, outbox). Not for deciding whether to abstract at all (engineering-principles), SOLID depth (solid-principles), or DDD architecture (domain-driven-design).
metadata:
  last_updated: "2026-11-11"
---

# Design Patterns

A catalog of the patterns that show up in production code, with one reference per pattern in Python and TypeScript. Most are a function, a closure or a `Protocol` in these languages, not a class hierarchy.

## Default to no pattern

Start with a plain function, a dict of functions, or an `if`. A second CSV export format is a function argument. Reach for a pattern when the plain version has already hurt: the third `elif` on a provider name, a retry loop copied into four callers, a module that cannot be tested without the database. Every reference opens by naming its plain alternative and the signal that tips you over. If you cannot point at that signal, skip the pattern.

## What to load

Open only the file the task needs. [catalog.md](references/catalog.md) lists every pattern with a one-line summary and how common it is.

| You are... | Read |
|---|---|
| Choosing a pattern, or refreshing what one is | [catalog.md](references/catalog.md) |
| Picking an implementation by name or config (payment provider, exporter) | [factory.md](references/creational/factory.md) |
| Constructing an object with many optional parts | [builder.md](references/creational/builder.md) |
| Wiring dependencies, or making code testable without patching | [dependency-injection.md](references/creational/dependency-injection.md) |
| Tempted by a global instance | [singleton.md](references/creational/singleton.md) |
| Making a third-party API or legacy module fit your interface, or hiding a messy subsystem | [adapter.md](references/structural/adapter.md) |
| Adding logging, caching, auth or timing around a call without editing it | [decorator.md](references/structural/decorator.md) |
| Controlling access to an object: lazy load, remote stand-in, permission gate | [proxy.md](references/structural/proxy.md) |
| Swapping an algorithm at runtime (pricing, routing, sorting) | [strategy.md](references/behavioral/strategy.md) |
| Notifying other modules when something happens | [observer.md](references/behavioral/observer.md) |
| Queuing, undoing or replaying an action as data | [command.md](references/behavioral/command.md) |
| Passing a request through ordered handlers (middleware, validation) | [chain-of-responsibility.md](references/behavioral/chain-of-responsibility.md) |
| Behavior that depends on a lifecycle status (order or payment states) | [state.md](references/behavioral/state.md) |
| Fixed skeleton with steps that vary | [template-method.md](references/behavioral/template-method.md) |
| Walking a collection lazily or in pages | [iterator.md](references/behavioral/iterator.md) |
| Hiding persistence behind a domain-shaped interface | [repository.md](references/data-access/repository.md) |
| Several writes that must commit or roll back together | [unit-of-work.md](references/data-access/unit-of-work.md) |
| Separating wire or database shapes from domain objects | [dto-mapper.md](references/data-access/dto-mapper.md) |
| Calling something flaky | [retry-backoff.md](references/resilience/retry-backoff.md) |
| Stopping calls to a dependency that is down | [circuit-breaker.md](references/resilience/circuit-breaker.md) |
| Making a retried request safe to repeat | [idempotency-key.md](references/resilience/idempotency-key.md) |
| Writing to the database and publishing an event atomically | [outbox.md](references/resilience/outbox.md) |
| Returning errors or absence without exceptions or null checks | [result-option.md](references/value-modeling/result-option.md) |

Facade is described inside the adapter file and Null Object inside the result-option file. Abstract Factory, Prototype, Bridge, Composite, Flyweight, Memento, Mediator, Visitor and Interpreter are catalog-only; the catalog says what to use instead.

## Related skills

- `engineering-principles`: whether to abstract at all, and how much. Read it first if you are unsure a pattern is warranted.
- `solid-principles`: the SRP/OCP/LSP/ISP/DIP treatment that most patterns apply, plus the anti-patterns for needless indirection.
- `domain-driven-design`: aggregates, repositories inside aggregates, CQRS and event sourcing. Architecture-level material lives there, not here.
