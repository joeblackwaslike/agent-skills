# Command

## What it is and Problem it solves

Command turns an action into a value: an object or record that says what to do, with the data needed to do it. Once an action is a value you can queue it, log it, retry it, send it to another process, or undo it. It solves the problem of "do this later, or do this and possibly take it back."

## Do you need this?

Usually a function call is enough. If you run the action now and never undo or persist it, `refund(order_id)` beats a `RefundCommand` object.

Use Command when you need at least one of these: an undo stack, an audit log of requested actions, a job queue, or a replay. A pair of closures (`do`, `undo`) covers undo in a few lines. A frozen dataclass or plain object is the right shape when the command must be serialized and sent elsewhere.

## Python

```python
from dataclasses import dataclass, field
from typing import Protocol


class Ledger:
    def __init__(self) -> None:
        self.balances: dict[str, int] = {}

    def add(self, order_id: str, cents: int) -> None:
        self.balances[order_id] = self.balances.get(order_id, 0) + cents


class Command(Protocol):
    def execute(self) -> None: ...
    def undo(self) -> None: ...


@dataclass
class Charge:
    ledger: Ledger
    order_id: str
    cents: int

    def execute(self) -> None:
        self.ledger.add(self.order_id, self.cents)

    def undo(self) -> None:
        self.ledger.add(self.order_id, -self.cents)


@dataclass
class CommandRunner:
    done: list[Command] = field(default_factory=lambda: [])

    def run(self, command: Command) -> None:
        command.execute()
        self.done.append(command)

    def undo_last(self) -> None:
        if self.done:
            self.done.pop().undo()


ledger = Ledger()
runner = CommandRunner()
runner.run(Charge(ledger, "o-1", 500))
runner.run(Charge(ledger, "o-1", 250))
assert ledger.balances["o-1"] == 750
runner.undo_last()
assert ledger.balances["o-1"] == 500
```

The runner knows nothing about charges. It only calls `execute` and `undo`, so a new command type is a new class and no change to the runner.

## TypeScript

```typescript
type Command = { name: string; execute(): void; undo(): void };

function charge(balances: Map<string, number>, orderId: string, cents: number): Command {
  const add = (delta: number) =>
    balances.set(orderId, (balances.get(orderId) ?? 0) + delta);
  return {
    name: `charge:${orderId}:${cents}`,
    execute: () => add(cents),
    undo: () => add(-cents),
  };
}

function createRunner() {
  const done: Command[] = [];
  return {
    run(command: Command): void {
      command.execute();
      done.push(command);
    },
    undoLast(): void {
      done.pop()?.undo();
    },
    log: (): string[] => done.map((c) => c.name),
  };
}

const balances = new Map<string, number>();
const runner = createRunner();
runner.run(charge(balances, "o-1", 500));
runner.run(charge(balances, "o-1", 250));
runner.undoLast();
console.assert(balances.get("o-1") === 500);
console.assert(runner.log().length === 1);
```

A closure replaces the class. If commands need to cross a process boundary, switch to plain data (`{ type: "charge", orderId, cents }`) and a handler map that interprets it, because functions do not serialize.

## In production

- Job queues (Celery tasks, BullMQ jobs) are Commands: a named action plus arguments, executed later by a worker.
- Editors and design tools keep an undo stack of command objects.
- CQRS command handlers receive `PlaceOrder` or `RefundPayment` records and are the only code that changes state.
- Database migrations are commands with `up` and `down`.
- Redux actions are data describing a request; reducers are the handlers.

## Smells and misuse

- A command class that wraps one function call and is never queued, logged or undone.
- `undo` that is not a true inverse, such as refunding by creating a new charge with a negative amount while the original still shows. For payments, undo usually means a compensating action, and some actions (an email sent, a card charged at a third party) cannot be undone at all.
- Commands that hold live objects (database sessions, clients) and so cannot be serialized or replayed.
- Replaying a log without idempotency. A retried `Charge` double-charges unless it carries an [idempotency key](../resilience/idempotency-key.md).
- A command that returns data the caller depends on. Commands change state; queries read it.

## Related

- [Idempotency key](../resilience/idempotency-key.md) makes a replayed command safe.
- [Observer](observer.md) announces what happened; Command requests what should happen.
- [Strategy](strategy.md) is a function chosen by the caller; Command is an action captured for later.
- Memento (see the [catalog](../catalog.md)) snapshots state for undo instead of recording the inverse action.
