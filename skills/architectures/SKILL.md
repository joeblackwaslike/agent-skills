---
name: architectures
description: >-
  Use when choosing or structuring how a system is built: hexagonal, clean or onion layering, CQRS, event sourcing, or whether to split a monolith into microservices. Not for aggregates and bounded contexts (use domain-driven-design), named code-level patterns (design-patterns), or whether to abstract at all (engineering-principles).
metadata:
  last_updated: "2026-11-11"
---

# Architectures

How a system is divided into parts, how those parts talk, and what each choice costs. This skill covers application architecture (layers, ports and adapters, CQRS), event-driven architecture (event sourcing, sagas), and distributed architecture (services, messaging, consistency). Examples are in TypeScript and Python and continue the Orders and Fulfillment domain from `domain-driven-design`.

## Default to the simplest shape that works

A single deployable with clean internal layers handles most systems. Each step below costs real operational and cognitive weight, so take it only when you can name the problem it solves.

| Signal | Lean toward |
| --- | --- |
| Domain logic tangled with framework, database or HTTP code | Layers with ports and adapters |
| Reads and writes need different shapes or scale | CQRS, starting with plain read-only queries |
| You need a full audit trail, or to rebuild state from history | Event sourcing, for the aggregates that need it |
| Parts must react to each other without importing each other | Domain events, then a broker only if they cross processes |
| Several teams must deploy on their own schedules | Separate services, along bounded-context lines |
| "Microservices are modern" | Stay with a modular monolith |

If the answer is a plain layered monolith, say so and stop. Adopting CQRS, event sourcing or services to look rigorous is the failure `references/anti-patterns.md` catalogs.

## What to load

Open only the file the task needs. [catalog.md](references/catalog.md) lists every architecture, what it is, and where it is covered.

| You are... | Read |
| --- | --- |
| Choosing an architecture, or refreshing what one is | [catalog.md](references/catalog.md) |
| Layering a codebase, placing ports and adapters, wiring a composition root, migrating a legacy service, testing each boundary | [application-architecture.md](references/application/application-architecture.md) |
| Splitting reads from writes, command and query handlers, read models and projections | [cqrs.md](references/application/cqrs.md) |
| Storing events as the source of truth, rebuilding state from a stream, snapshots, upcasting | [event-sourcing.md](references/event-driven/event-sourcing.md) |
| Recognizing and fixing CQRS and event-sourcing cargo-culting, premature service splits, read concerns in the write model | [anti-patterns.md](references/anti-patterns.md) |

Event-driven design, sagas, microservices, service communication and distributed data have no reference file yet. For those, answer from the signal table above and the bounded contexts from `domain-driven-design`, and say plainly that deeper guidance is not written yet.

## Related skills

- `domain-driven-design`: bounded contexts, aggregates, value objects and domain events. Read it first to find the boundaries these architectures divide along.
- `design-patterns`: the code-level patterns architectures lean on, including dependency injection, outbox, retry, circuit breaker and idempotency key.
- `solid-principles`: dependency inversion, the rule that makes ports and adapters work.
- `engineering-principles`: whether to abstract at all, and how much.

## Red flags

- "Let's use CQRS and event sourcing because it's the proper way." Justify each against the table above or skip it.
- "We'll split it into services now and sort out the boundaries later." Boundaries drawn wrong across a network are far costlier to move than inside a process.
- "The domain imports the ORM." The dependency rule is broken; see the application-architecture reference.
- "This handler updates three aggregates in one transaction." Use events and eventual consistency instead.

## Completion criteria

- The chosen architecture answers a problem you can state in one sentence.
- Dependencies point inward: domain and use cases import only their own types and ports.
- Every external dependency sits behind a port, wired in one composition root.
- Where CQRS or event sourcing was added, the cost was justified against the table at the top.
- Any code blocks you wrote parse and run.
