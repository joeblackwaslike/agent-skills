# Anti-Patterns: Architecture Gone Wrong

## 1. CQRS / event-sourcing cargo-culting

**The tell:** A brand-new CRUD app already has separate command and query buses, an event
store, projections, and eventual consistency — for a domain whose read shape is identical to
its write shape and whose hardest invariant is "name is required." Months of infrastructure,
zero payoff, and every junior dev is lost.

**The fix:** These patterns have real, ongoing costs (cognitive load, eventual-consistency
bugs, event-versioning toil). Adopt them where they earn it:
- **CQRS** when read and write shapes genuinely diverge or reads must scale independently —
  and even then, start with plain read-only queries before full projections ([cqrs.md](application/cqrs.md)).
- **Event sourcing** when the event history is itself valuable (audit, temporal queries,
  compliance), often for a *subset* of aggregates, not the whole system ([event-sourcing.md](event-driven/event-sourcing.md)).

"It's the proper/rigorous way" is not a justification. Match the pattern to the problem.

## 2. Premature bounded contexts (distributed monolith)

**The tell:** A two-person team splits a greenfield system into eight microservices /
bounded contexts on day one, before the domain is even understood. The "boundaries" are
guesses; they're wrong; and now every feature requires a cross-service, cross-network change
— a distributed monolith with all the cost of microservices and none of the autonomy.

**The fix:** Start with a **modular monolith** — bounded contexts as modules in one
deployable, with clean interfaces between them. Let the boundaries prove themselves as you
learn the domain. Extract a context into its own service only when there's a real driver
(independent scaling, separate team ownership, isolation). Boundaries are cheap to move
inside a monolith and brutal to move across services. See [strategic-design.md](../../domain-driven-design/references/strategic-design.md).

## 3. Read concerns polluting the write model

**The tell:** The `Order` aggregate grows getters for every field, DTO-shaped methods, and
denormalized data "so the UI can render it." The write model's encapsulation erodes to serve
reads.

**The fix:** That's exactly what read models are for. Let the write model stay focused on
behavior and invariants; build a separate read model / projection shaped for the screen.
Even a lightweight read-only query against the same DB keeps the aggregate clean. See
[cqrs.md](application/cqrs.md).

## 4. Events that are really commands

**The tell:** `SendWelcomeEmail` is published as an "event", exactly one service consumes it, and the publisher breaks if that service is down. The flow lives in nobody's code, so changing it means searching every subscriber.

**The fix:** If the publisher expects the receiver to act, send a command to a named recipient, or call it directly. Keep events for facts the publisher is indifferent to. See [event-driven-architecture.md](event-driven/event-driven-architecture.md).

## 5. A saga without a pivot or compensations

**The tell:** A multi-service workflow is a chain of events with no record of which steps can be undone. A failure at step four leaves a charged customer and no stock, and nobody knows who cleans up.

**The fix:** Sort every step into compensable, pivot or retryable, write an idempotent compensation for each compensable step, store the saga's progress, and put the hardest-to-undo steps after the pivot. See [sagas.md](event-driven/sagas.md).
