# Pattern catalog

Every pattern with a one-line summary and how often it appears in production code. "Link" rows have a full reference; "catalog-only" rows are named so you recognize them, with what you probably want instead. Default to a plain function until it hurts; see [SKILL.md](../SKILL.md).

## Creational

| Pattern | What it is | Prevalence | Link |
|---|---|---|---|
| Factory | A function or registry that picks and builds an implementation from a name or config | common | [factory.md](creational/factory.md) |
| Builder | Step-by-step construction of an object with many optional parts | occasional | [builder.md](creational/builder.md) |
| Dependency Injection | Pass collaborators in, wire them once at a composition root | common | [dependency-injection.md](creational/dependency-injection.md) |
| Singleton | One shared instance; in Python and TS a module-level object or injected value does it | common | [singleton.md](creational/singleton.md) |
| Abstract Factory | A family of related factories | rare | catalog-only: you probably want one plain factory function, or DI |
| Prototype | Create objects by cloning an existing one | rare | catalog-only: you probably want `dataclasses.replace` or object spread |

## Structural

| Pattern | What it is | Prevalence | Link |
|---|---|---|---|
| Adapter | Wrap one interface so it matches another; Facade (a simple front for a subsystem) is covered here | common | [adapter.md](structural/adapter.md) |
| Decorator | Wrap an object or function to add behavior without changing it | common | [decorator.md](structural/decorator.md) |
| Proxy | A stand-in that controls access: lazy load, caching, permission, remote call | occasional | [proxy.md](structural/proxy.md) |
| Bridge | Split an abstraction from its implementation so each varies independently | rare | catalog-only: you probably want Strategy or DI |
| Composite | Treat a tree of objects and a single object through one interface | rare | catalog-only: you probably want a recursive function or a plain tree type |
| Flyweight | Share fine-grained immutable objects to save memory | rare | catalog-only: you probably want interning, `functools.cache`, or a plain shared constant |

## Behavioral

| Pattern | What it is | Prevalence | Link |
|---|---|---|---|
| Strategy | Swap an algorithm at runtime, usually a function passed in | common | [strategy.md](behavioral/strategy.md) |
| Observer | Subscribers get notified when something happens (pub/sub, event emitter) | common | [observer.md](behavioral/observer.md) |
| Command | An action captured as data so it can be queued, logged, undone or replayed | occasional | [command.md](behavioral/command.md) |
| Chain of Responsibility | A request passes through ordered handlers (middleware) | common | [chain-of-responsibility.md](behavioral/chain-of-responsibility.md) |
| State | Behavior changes with a lifecycle status; a state machine | occasional | [state.md](behavioral/state.md) |
| Template Method | A fixed algorithm skeleton with overridable steps | occasional | [template-method.md](behavioral/template-method.md) |
| Iterator | Produce items one at a time; generators and async iterators | common | [iterator.md](behavioral/iterator.md) |
| Memento | Snapshot and restore an object's state | rare | catalog-only: you probably want an immutable value you keep a copy of, or Command with undo |
| Mediator | One object coordinates how a group of objects interact | rare | catalog-only: you probably want Observer, or a plain orchestrating function |
| Visitor | Add operations to a type hierarchy without editing it | rare | catalog-only: you probably want a `match` statement or a discriminated union with a switch |
| Interpreter | Evaluate sentences of a small language via a class per grammar rule | rare | catalog-only: you probably want a parser library, or a dispatch table over a tagged union |

## Data access

| Pattern | What it is | Prevalence | Link |
|---|---|---|---|
| Repository | A collection-like interface that hides how domain objects are stored | common | [repository.md](data-access/repository.md) |
| Unit of Work | Track changes and commit or roll them back as one transaction | occasional | [unit-of-work.md](data-access/unit-of-work.md) |
| DTO and Mapper | Separate wire or database shapes from domain objects and convert between them | common | [dto-mapper.md](data-access/dto-mapper.md) |

## Resilience

| Pattern | What it is | Prevalence | Link |
|---|---|---|---|
| Retry with backoff | Repeat a failed call with growing, jittered delays and a cap | common | [retry-backoff.md](resilience/retry-backoff.md) |
| Circuit Breaker | Stop calling a failing dependency for a while, then probe | occasional | [circuit-breaker.md](resilience/circuit-breaker.md) |
| Idempotency key | A client-supplied key that makes a repeated request safe | common | [idempotency-key.md](resilience/idempotency-key.md) |
| Outbox | Write the event in the same transaction as the data, publish it afterwards | occasional | [outbox.md](resilience/outbox.md) |

## Value modeling

| Pattern | What it is | Prevalence | Link |
|---|---|---|---|
| Result / Option | Return success or failure, present or absent, as a value instead of raising or returning null; Null Object is covered here | common | [result-option.md](value-modeling/result-option.md) |
