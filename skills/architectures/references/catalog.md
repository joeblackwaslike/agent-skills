# Architecture catalog

Every architecture and style with a one-line summary and where it is covered. "Link" rows have a full reference. "Not yet written" rows are named so you recognize them; no reference file exists, so answer from the signal table in SKILL.md. "Catalog-only" rows say what you probably want instead. Default to a layered monolith until it hurts; see [SKILL.md](../SKILL.md).

## Application architecture

| Architecture | What it is | Link |
| --- | --- | --- |
| Hexagonal (ports and adapters), clean, onion | Domain at the center, dependencies point inward, infrastructure plugs in through ports | [application-architecture.md](application/application-architecture.md) |
| CQRS | Separate models for commands (writes) and queries (reads) | [cqrs.md](application/cqrs.md) |
| Dependency injection, composition root | Pass collaborators in and wire them once at the edge | covered in `design-patterns` [dependency-injection.md](../../design-patterns/references/creational/dependency-injection.md) and `solid-principles` [dependency-inversion.md](../../solid-principles/references/dependency-inversion.md) |
| Layered (n-tier) | Presentation, business and data layers, each calling the one below | catalog-only: you probably want hexagonal, which inverts the data-layer dependency |
| Microkernel (plugin) | A small core with features loaded as plugins | catalog-only: you probably want a plain plugin interface in one module |
| Pipes and filters | Data flows through a chain of independent steps | catalog-only: you probably want function composition or `chain-of-responsibility.md` in `design-patterns` |

## Event-driven architecture

| Architecture | What it is | Link |
| --- | --- | --- |
| Event sourcing | Store the sequence of events as the source of truth, derive state by replay | [event-sourcing.md](event-driven/event-sourcing.md) |
| Event-driven architecture | Parts communicate by publishing and reacting to events | [event-driven-architecture.md](event-driven/event-driven-architecture.md) |
| Saga | A long-running business transaction as local steps with compensations | [sagas.md](event-driven/sagas.md) |
| Outbox | Write state and event in one transaction, publish afterward | `design-patterns` [outbox.md](../../design-patterns/references/resilience/outbox.md) |

## Distributed architecture

| Architecture | What it is | Link |
| --- | --- | --- |
| Modular monolith | One deployable, strict internal module boundaries | not yet written |
| Microservices | Independently deployable services that own their data | not yet written |
| Service communication | Synchronous calls versus messaging, contracts, versioning | not yet written |
| Distributed data and consistency | Eventual consistency, no distributed transactions | not yet written |
| Serverless | Functions and managed services instead of long-running servers | catalog-only: you probably want the platform's own docs, such as `working-with-vercel` |
| Space-based | In-memory data grids to scale stateful workloads | catalog-only: you probably want a cache plus read replicas |
| Two-phase commit | Atomic commit across several databases | catalog-only: sagas and the outbox are not atomic across databases either; a saga gives eventual consistency with compensation, the outbox makes one database's write and event atomic. Keep data that must change together in one database |
| CRDTs | Data structures that merge without coordination | catalog-only: you probably want last-writer-wins or a collaboration library |
