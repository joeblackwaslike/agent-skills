# Distributed Data and Consistency

Once data lives in more than one place, you give up some of what a single database gave you for free. This reference covers which guarantees you can still have, and what replaces the ones you lose.

## Consistency models

Pick the weakest model your feature can tolerate, since stronger ones cost availability or latency.

| Model | What it promises | Notes |
| --- | --- | --- |
| Linearizable (strong) | Every operation appears atomic, in an order consistent with real time | Cannot stay available during a network partition |
| Causal | Operations that are causally related appear in the same order to everyone | Can stay available during a partition |
| Read your writes | A process's later read sees its own earlier write | Holds if the client stays on the same server |
| Eventual | Replicas converge if updates stop | Reads may be stale in the meantime |

A read replica is eventual by nature. It can lag the primary, so a user who saves a record and immediately reads from a replica may not see it. Fix that with read-your-writes: route a user's reads to the primary shortly after they write, or pin them to one server.

## CAP and PACELC, read correctly

"Pick two of three" is a misleading summary. Eric Brewer, who stated CAP, wrote that it prohibits only perfect availability and consistency while a network partition is happening, and partitions are rare. Two corrections follow.

- You do not choose "CA". Partitions can happen, so the real choice arises during one: stay available and accept inconsistency, or stay consistent and refuse some requests.
- The choice is made at fine grain. It can differ per operation, per data item and per user. Brewer recommends detecting the partition, running in an explicit partition mode, then recovering and compensating afterwards.

PACELC adds the part CAP leaves out. If there is a partition, trade availability against consistency. Else, when the system runs normally, trade latency against consistency. A system pays for stronger consistency in latency even with no failure.

## Why not distributed transactions

A transaction that spans services, usually two-phase commit, is rarely an option. Microservices.io states that 2PC is not an option for this reason, and notes that many NoSQL databases and brokers do not support it. Azure adds that ACID guarantees do not carry across separately owned data stores.

Without it, you get eventual consistency and design for it.

| Need | Use |
| --- | --- |
| A business process across services | A saga: local transactions with compensations. See [sagas.md](../event-driven/sagas.md) |
| Update a database and publish an event atomically | The transactional outbox, with a relay that may duplicate, so consumers are idempotent. See `design-patterns` [outbox.md](../../../design-patterns/references/resilience/outbox.md) |
| Make a retried message safe | An idempotent consumer. See [event-driven-architecture.md](../event-driven/event-driven-architecture.md) |
| Data that must change together atomically | Keep it in one service and one database |

Fowler describes the same stance: microservices favor transactionless coordination, accept eventual consistency, and fix mistakes with compensating operations. This is a business decision as much as a technical one, since someone must decide what a refunded order looks like to the customer in the meantime.

## Rules of thumb

- Decide per feature how stale a read may be, and write it down. "Eventually" is not a number.
- Give every record one owner. Other services hold copies fed by events, and never write to them.
- Make every message handler and every compensation idempotent.
- If two things must be consistent at every instant, they belong in one transaction, which means one service.
- Test the partition and the lag. Read your own writes against a lagging replica in a test before production does it for you.

## Sources

- [Linearizability (Jepsen)](https://jepsen.io/consistency/models/linearizable)
- [Causal consistency (Jepsen)](https://jepsen.io/consistency/models/causal)
- [Read your writes (Jepsen)](https://jepsen.io/consistency/models/read-your-writes)
- [CAP twelve years later: how the rules have changed (Eric Brewer, InfoQ)](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/)
- [Consistency tradeoffs in modern distributed database system design (Daniel Abadi, PACELC)](https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf)
- [Saga pattern (microservices.io)](https://microservices.io/patterns/data/saga.html)
- [Transactional outbox (microservices.io)](https://microservices.io/patterns/data/transactional-outbox.html)
- [Saga design pattern (Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)
- [Microservices (Martin Fowler and James Lewis)](https://martinfowler.com/articles/microservices.html)
