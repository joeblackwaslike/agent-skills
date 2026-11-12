# Microservices

Independently deployable services, each built around a business capability and owning its own data. Read [monolith-vs-microservices.md](monolith-vs-microservices.md) first to confirm you need them.

## Choosing boundaries

Split around business capabilities, not technical layers. Fowler's point is that microservices only work with good, stable boundaries, and finding those boundaries is the job of bounded contexts.

Azure's guidance gives a workable sequence: run domain analysis to find the bounded contexts, apply tactical DDD (entities, aggregates, domain services) inside each, then use the result to pick services. A bounded context is where one domain model applies, so a service that spans two contexts is usually two services. See `domain-driven-design`'s strategic-design reference for finding them.

Check each candidate against the tells in the monolith-or-microservices reference: if two services chat constantly or always change together, the boundary is wrong.

## Each service owns its data

Keep a service's persistent data private and reachable only through its API. Other services never read its tables. That lets the schema change, and the service deploy and scale, without touching anyone else.

A shared database defeats this. A schema change then affects every service that uses the database, and the services are coupled through it however separate their code is. Microservices.io offers three levels of separation, from least to most: private tables, a schema per service, and a database server per service.

The cost is real. A transaction across services is no longer a database transaction, and a join across services is no longer a join. See [distributed-data.md](distributed-data.md) and [sagas.md](../event-driven/sagas.md).

## Gateways and backends for frontends

An API gateway is the single entry point for clients. It routes a request to a service or fans it out to several, and it handles cross-cutting concerns such as authentication and logging. Without one, clients carry complex code, are coupled to how the system is split, and make more round trips. The costs are an extra hop and a component that can become a single point of failure.

A backend for frontend (BFF) is a separate gateway per kind of client. Newman's rule is one backend per user experience: a general-purpose gateway serving many UIs tends to become a bottleneck. Use a BFF from the start when mobile or third-party clients have their own needs. For a web-only product, add one only when there is heavy server-side aggregation.

## Migrating with the strangler fig

Do not rewrite a monolith in one go. A big-bang rewrite has requirements that are hard to pin down and delivers nothing for a long time. The strangler fig grows new services around the old system and moves behavior out gradually, for less risk and earlier value.

1. Put a facade or proxy in front of the monolith so requests can be routed.
2. Pick one capability with a clear boundary and build it as a service.
3. Route that capability's traffic to the service. Keep the monolith's version so you can switch back.
4. Repeat, then retire the monolith when nothing routes to it.

AWS names the three phases transform, coexist and eliminate. Watch for these costs: the facade must not become a single point of failure or a bottleneck, and shared data stores need an explicit plan.

When the new service must talk to legacy code, put an anti-corruption layer between them. It translates the legacy model into the new one so the old design's concepts do not leak into the new. It adds latency and one more thing to run.

## What you need in place first

Fowler observes that teams running microservices make extensive use of infrastructure automation and real-time monitoring. Services must also be designed to tolerate the failure of the services they call, which is the subject of [service-communication.md](service-communication.md). Without automated deployment and monitoring, each new service adds work faster than it adds value.

## Sources

- [Microservices (Martin Fowler and James Lewis)](https://martinfowler.com/articles/microservices.html)
- [Domain analysis for microservices (Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis)
- [Database per service (microservices.io)](https://microservices.io/patterns/data/database-per-service.html)
- [API gateway pattern (microservices.io)](https://microservices.io/patterns/apigateway.html)
- [Backends for frontends (Sam Newman)](https://samnewman.io/patterns/architectural/bff/)
- [StranglerFigApplication (Martin Fowler)](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Strangler fig (AWS Prescriptive Guidance)](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-decomposing-monoliths/strangler-fig.html)
- [Gateway Routing pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)
- [Strangler Fig pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
- [Anti-corruption layer pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)
