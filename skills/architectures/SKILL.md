---
name: architectures
description: >-
  Use when choosing or structuring how a system is built: hexagonal layering, CQRS, event sourcing, event-driven design, sagas, microservices vs monolith, strangler-fig migration, service timeouts and contracts, CAP and eventual consistency. Not for aggregates or bounded contexts (domain-driven-design), one retry, breaker or outbox (design-patterns), or whether to abstract (engineering-principles).
metadata:
  last_updated: "2026-11-11"
---

# Architectures

How a system is divided into parts, how those parts talk, and what each choice costs. This skill covers application architecture (layers, ports and adapters, CQRS), event-driven architecture (event sourcing, events and commands, delivery guarantees, sagas), and distributed architecture (monolith or microservices, boundaries, service communication, consistency). Examples are in TypeScript and Python and continue the Orders and Fulfillment domain from `domain-driven-design`.

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
| Atomic writes needed across services | Keep that data in one service; otherwise a saga |

If the answer is a plain layered monolith, say so and stop. Adopting CQRS, event sourcing or services to look rigorous is the failure `references/anti-patterns.md` catalogs.

## What to load

Open only the file the task needs. [catalog.md](references/catalog.md) lists every architecture, what it is, and where it is covered.

| You are... | Read |
| --- | --- |
| Choosing an architecture, or refreshing what one is | [catalog.md](references/catalog.md) |
| Layering a codebase, placing ports and adapters, wiring a composition root, migrating a legacy service, testing each boundary | [application-architecture.md](references/application/application-architecture.md) |
| Splitting reads from writes, command and query handlers, read models and projections | [cqrs.md](references/application/cqrs.md) |
| Storing events as the source of truth, rebuilding state from a stream, snapshots, upcasting | [event-sourcing.md](references/event-driven/event-sourcing.md) |
| Publishing and reacting to events: events vs commands, choreography vs orchestration, at-least-once delivery, idempotent consumers, ordering, dead letters, schema evolution | [event-driven-architecture.md](references/event-driven/event-driven-architecture.md) |
| A business transaction across services: compensations, the pivot step, orchestration vs choreography, isolation countermeasures | [sagas.md](references/event-driven/sagas.md) |
| Deciding between a modular monolith and microservices, what justifies a split, how to spot a distributed monolith | [monolith-vs-microservices.md](references/distributed/monolith-vs-microservices.md) |
| Drawing service boundaries, database per service, gateway or BFF, strangler-fig migration | [microservices.md](references/distributed/microservices.md) |
| Sync vs async calls, timeouts and retries, contracts, versioning, chatty services | [service-communication.md](references/distributed/service-communication.md) |
| Consistency models, CAP and PACELC, why not distributed transactions, read-your-writes | [distributed-data.md](references/distributed/distributed-data.md) |
| Recognizing and fixing CQRS and event-sourcing cargo-culting, premature service splits, read concerns in the write model, events that are really commands, sagas without a pivot or compensations, chatty services, shared databases | [anti-patterns.md](references/anti-patterns.md) |

## Related skills

- `domain-driven-design`: bounded contexts, aggregates, value objects and domain events. Read it first to find the boundaries these architectures divide along.
- `design-patterns`: the code-level patterns architectures lean on, including dependency injection, outbox, retry, circuit breaker and idempotency key.
- `solid-principles`: dependency inversion, the rule that makes ports and adapters work.
- `engineering-principles`: whether to abstract at all, and how much.

## Red flags

- "Let's use CQRS and event sourcing because it's the proper way." Justify each against the table above or skip it.
- "We'll split it into services now and sort out the boundaries later." Boundaries drawn wrong across a network are far costlier to move than inside a process.
- "The domain imports the ORM." The dependency rule is broken; see the application-architecture reference.
- "This handler updates three aggregates in one transaction." Use events and eventual consistency instead, and a saga when the aggregates live in different services (see sagas.md).

## Completion criteria

- The chosen architecture answers a problem you can state in one sentence.
- Dependencies point inward: domain and use cases import only their own types and ports.
- If you chose ports and adapters, every external dependency sits behind a port, wired in one composition root.
- Where CQRS or event sourcing was added, the cost was justified against the table at the top.
- Where events or sagas were added, consumers are idempotent, each compensable step has an idempotent compensation, and the pivot is named.
- Where a service was split out, the split answered a problem you can name, the service owns its data, and every remote call has a timeout and is safe to retry.
- Any code blocks you wrote parse and run.
