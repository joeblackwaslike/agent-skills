# Monolith or Microservices

Start with a monolith whose inside is well divided. Move a part into its own service when a specific problem justifies the cost, not before.

## Why monolith first

Fowler observes that almost all the successful microservice stories began as a monolith that grew too big and was then broken up. He reports that many colleagues argue against starting a new project with microservices, even when you are sure it will grow big enough to justify them. His own view is more tentative: avoid them unless the team has built a microservices system before. Two reasons stand out.

- Microservices carry a premium: the cost of running and coordinating a suite of services. It slows a team down, and early on speed and short feedback cycles matter more.
- Boundaries are hard to get right before you understand the domain. Moving functionality between services is much harder than moving it between modules in one codebase. A monolith lets you find the right boundaries first.

Sam Newman makes the same point from the other side: wrong service boundaries cause more cross-service changes and tightly coupled components, and can leave you worse off than a single monolith.

## A modular monolith is not an unstructured one

The monolith still needs design. Draw module boundaries along the business capabilities or bounded contexts you found with `domain-driven-design`, keep each module's data private to it, and let modules talk only through explicit interfaces. Shopify took this route: one codebase, with boundaries between components defined and respected inside it.

Boundaries inside one process are cheap to move. Boundaries between services are not.

## What justifies a split

Azure's list of what microservices buy you maps to the real reasons to split.

| Reason | Question to ask |
| --- | --- |
| Teams need to ship on their own schedules | Is one team blocked by another team's release? |
| Parts scale very differently | Does one part need ten times the capacity of the rest? |
| A failure should not spread | Does an outage in one part take the rest down today? |
| Data must be isolated | Do schema changes in one part keep breaking another? |
| Different technology is needed | Does one part need a runtime the rest cannot use? |

If you cannot answer yes to one of these with a real example from your system, stay in the monolith.

## The distributed monolith

The failure to avoid is services that must still change and deploy together. Azure names the tells.

- Services chat constantly. Overly chatty communication between two services can be a sign of tight coupling and low cohesion.
- Functions that change together are deployed apart. They should be deployed together, or the services end up tightly coupled.

You pay for the network, the deployments and the monitoring and get none of the independence. If you see this, merge the services back, or move their shared data and logic into one of them.

## Decision guide

| Situation | Choose |
| --- | --- |
| New product, domain still being learned | Modular monolith |
| One team, one deploy cadence | Modular monolith |
| Several teams repeatedly blocked on each other's releases | Split along a bounded-context line, one service at a time |
| One part needs far more capacity than the rest | Extract that part, or scale the monolith horizontally first |
| Complexity is in the domain, not in the deployment | Better modeling (see `domain-driven-design`), not more services |

Extract the first service where the boundary is clearest and the data is most separable. See [microservices.md](microservices.md) for how.

## Sources

- [MonolithFirst (Martin Fowler)](https://martinfowler.com/bliki/MonolithFirst.html)
- [Microservice Premium (Martin Fowler)](https://martinfowler.com/bliki/MicroservicePremium.html)
- [Microservices for greenfield? (Sam Newman)](https://samnewman.io/blog/2015/04/07/microservices-for-greenfield/)
- [Deconstructing the monolith (Shopify Engineering)](https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity)
- [Microservices architecture style (Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)
