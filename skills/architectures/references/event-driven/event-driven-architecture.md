# Event-Driven Architecture

In an event-driven system, parts communicate by publishing facts about what happened and reacting to the ones they care about. The publisher does not know who is listening. That removes direct dependencies, but the flow of control is no longer readable in the code.

## Do you need it?

It pays off when several subsystems react to the same event, when work arrives in high volume or in real time, or when parts must scale and fail independently. It costs you eventual consistency, harder debugging, and extra work on ordering, duplicates and schema changes.

| Signal | Lean toward |
| --- | --- |
| One caller needs an answer from one callee, now | A direct call |
| Several parts must react to one thing and the publisher should not know them | Events |
| Parts live in one process | An in-process event bus or plain method calls, no broker |
| You need to trace exactly what happens after a request | Orchestration, or a direct call |
| The reaction can lag the cause by seconds without harm | Events |

If every event has exactly one consumer and the publisher waits on the result, it is a call.

## Four things people mean by "event-driven"

Martin Fowler separates four patterns that all get called event-driven. Decide which one you are building, since each has its own cost.

| Pattern | What it is | Cost |
| --- | --- | --- |
| Event notification | Publish a small event ("order placed"); receivers fetch details if they need them | The overall flow is not written down anywhere, so it is hard to debug and change |
| Event-carried state transfer | The event carries the data, so receivers keep their own copy | Many copies of the data, and more complexity in every receiver |
| Event sourcing | Store the events as the source of truth | See [event-sourcing.md](event-sourcing.md) |
| CQRS | Separate models for reads and writes | See [cqrs.md](../application/cqrs.md). It does not require events |

## Events and commands

An event says something already happened: `OrderPlaced`. Its name is in the past tense and its publisher expects nothing in return. A command asks for something to happen: `ReserveStock`. It has one intended recipient.

Naming a command as an event is an anti-pattern. If the publisher expects the receiver to act, and the system breaks when nobody does, it is a command and should be sent as one to a named recipient. Fowler calls the disguised version a passive-aggressive command.

## Choreography or orchestration

In choreography, each service reacts to events and emits its own, and no one holds the whole picture. In orchestration, a coordinator sends commands and waits for results. Choreography suits atomic fire-and-forget steps and loose coupling across bounded contexts. Its weaknesses are no single view of an in-flight operation, cyclic dependencies, and out-of-order or duplicate events. Prefer orchestration when the flow has more than a few steps, and see [sagas.md](sagas.md).

## Delivery guarantees

Brokers offer one of three guarantees.

- At-most-once: a message may be lost, and is never redelivered.
- At-least-once: a message is never lost, and may be delivered more than once.
- Exactly-once: processed once and only once. A broker can offer it inside its own boundary (Kafka's idempotent producer and transactions), not across an arbitrary consumer and database.

Plan for at-least-once. Duplicates also come from the sender, for example a relay that crashes after publishing and before recording that it did. So make the consumer an idempotent receiver: record the ids of messages you have processed, and skip repeats.

```python
import asyncio


class IdempotentConsumer:
    def __init__(self, handler) -> None:
        self._handler = handler
        self._seen: set[str] = set()

    async def handle(self, message_id: str, payload: dict) -> bool:
        if message_id in self._seen:
            return False
        await self._handler(payload)
        self._seen.add(message_id)
        return True


async def main() -> None:
    total = 0

    async def add(payload: dict) -> None:
        nonlocal total
        total += payload["amount"]

    consumer = IdempotentConsumer(add)
    await consumer.handle("evt-1", {"amount": 5})
    await consumer.handle("evt-1", {"amount": 5})
    assert total == 5


asyncio.run(main())
```

```ts
class IdempotentConsumer<T> {
  private seen = new Set<string>();
  constructor(private handler: (payload: T) => Promise<void>) {}

  async handle(messageId: string, payload: T): Promise<boolean> {
    if (this.seen.has(messageId)) return false;
    await this.handler(payload);
    this.seen.add(messageId);
    return true;
  }
}

let total = 0;
const consumer = new IdempotentConsumer<{ amount: number }>(async (p) => { total += p.amount; });
await consumer.handle("evt-1", { amount: 5 });
await consumer.handle("evt-1", { amount: 5 });
console.assert(total === 5);
```

In production the processed-id record and the handler's effects must commit in the same transaction. Otherwise a crash between the two reproduces the duplicate, as it does in this in-memory sketch, and two concurrent deliveries of the same id can both pass the check, so enforce uniqueness with a database constraint or a lock. See [idempotency-key.md](../../../design-patterns/references/resilience/idempotency-key.md).

## Ordering

Brokers order events within a partition, not across the whole topic. Choose the partition key so everything that must stay in order shares it, usually the aggregate id: all events for order 42 go to one partition. Competing consumers of one queue can break order unless each partition has one consumer. If you need a global order, you have a throughput ceiling.

## When processing fails

- Retry with backoff for transient failures. See [retry-backoff.md](../../../design-patterns/references/resilience/retry-backoff.md).
- After a bounded number of attempts, move the message to a dead-letter queue so one bad message does not block the queue or partition. In SQS this is the `maxReceiveCount` setting. Kafka has no built-in dead-letter queue, so consumers publish failed messages to a separate topic.
- Alert on dead-letter depth, and keep dead messages longer than the source queue keeps live ones so you can inspect and redrive them.
- A dead-letter queue breaks strict ordering for the messages it takes. Don't use one on a queue where exact order is the point.

## Evolving event schemas

Published events are a contract with consumers you may not know.

- Adding an optional field with a default is compatible. So is removing an optional field.
- Never rename a field or change its type in place. Add a new field, migrate consumers, and remove the old one later.
- Know your compatibility mode. Backward-compatible means new consumers can read old events, so upgrade consumers first. Forward-compatible means old consumers can read new events, so upgrade producers first. Full compatibility lets you upgrade either side first.
- For stored events, use upcasters. See [event-sourcing.md](event-sourcing.md).
- With a schema registry, enforce the chosen mode in CI so a breaking change fails the build.

## Making it observable

The flow is not in any one program, so build the view you lost. Put a correlation id on every event, carry it through every reaction, and use distributed tracing. Log each publish and each consume with the ids, and watch consumer lag.

## Sources

- [What do you mean by "Event-Driven"? (Martin Fowler)](https://martinfowler.com/articles/201701-event-driven.html)
- [Event-driven architecture style (Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)
- [Choreography pattern (Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography)
- [Idempotent consumer (microservices.io)](https://microservices.io/patterns/communication-style/idempotent-consumer.html)
- [Idempotent Receiver (Enterprise Integration Patterns)](https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html)
- [Kafka design: message delivery semantics](https://kafka.apache.org/documentation/#semantics)
- [SQS dead-letter queues (AWS)](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
- [Schema evolution and compatibility (Confluent)](https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html)
