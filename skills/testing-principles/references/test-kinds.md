# Test kinds

A kind says what a test covers. The kinds are unit, integration, contract, functional, end-to-end, acceptance, behavioral and property-based. Coverage and mutation testing judge tests; they are not kinds (P7). Isolation comes in degrees (fresh state, cleanup, rollback), which is a separate axis from kind.

Pick by what you need to prove (P5), not by habit.

## The eight kinds

| Kind | Proves | Real parts | Doubles |
|---|---|---|---|
| Unit | Logic and branches of one piece behave correctly | The code under test | Its collaborators at boundaries |
| Integration | Parts work together across a seam (code and database, code and queue, module and module) | Both sides of the seam | Anything beyond the seam |
| Contract | Provider and consumer agree on the shape and meaning of an interface | The interface definition | Each side stubbed from the shared contract |
| Functional | One feature works through its entry point (an endpoint, a command) against the app wired up | The app and its stores | External third parties |
| End-to-end | A user-visible journey works through the whole running system | Everything the user touches | Only what cannot be run (paid third parties) |
| Acceptance | The system meets a requirement in the stakeholder's words | As the requirement demands | As needed |
| Behavioral | The system does what a scenario says, written as given/when/then | As the scenario demands | As needed |
| Property-based | A rule holds for many generated inputs, not just chosen ones | The code under test | As in unit |

Notes that stop the kinds blurring:

- Functional and end-to-end differ by reach. A functional test drives one entry point in-process. An end-to-end test drives the system as a user does, through the real front door.
- Acceptance and behavioral differ by source. Acceptance is anchored to a requirement. Behavioral is anchored to a scenario format. A single test can be both.
- A contract test is the answer to P11: it keeps a double honest by checking it against the real thing.

## Outcome to kind

| You need to be sure that... | Kind |
|---|---|
| A calculation, parser or branch returns the right value | Unit |
| A rule holds for every input, not just the three you thought of | Property-based |
| A query, mapping or migration works against a real store | Integration |
| Two services still agree after one of them changed | Contract |
| An endpoint or command returns the right result for a request | Functional |
| A user can complete a task from start to finish | End-to-end |
| A requirement from a ticket or spec is met | Acceptance |
| A scenario in domain language still plays out | Behavioral |
| A double still matches the real dependency | Contract |

## Which kinds for a feature

For every meaningful feature (P6):

1. Write at least a few end-to-end tests. One covers the happy path. The rest cover edge cases and error paths a user can reach.
2. Cover the branches around those journeys with unit tests, so an end-to-end failure points at a small area.
3. Add integration tests for each seam the feature adds (a new query, a new queue consumer).
4. Add a contract test wherever you double a boundary you do not own (P11).
5. Add property-based tests for rules that range over a large input space (parsers, serializers, ordering, arithmetic).

If one kind already proves a behavior cheaply and reliably, a second test of it in another kind adds cost and no information. Prove each behavior you care about somewhere, so a failure tells you where to look.

Google, Fowler and Microsoft advise few end-to-end tests. This skill departs from that (P6): a feature with no journey test can pass every lower test and still not work.

## Performance, load and chaos

These answer different questions: how fast, how much, what breaks under failure. They need their own tools, environments and baselines, and they are out of scope here. Treat them as separate work. Do not let a unit or end-to-end test double as a benchmark: timing assertions in ordinary tests are a flake source (P14, P15).

## Sources

Paraphrased from the ideas in Google's *Software Engineering at Google* chapters 11 to 14, Fowler's "The Practical Test Pyramid", and the Microsoft Engineering Playbook on automated testing, adjusted to this skill's vocabulary and to P6.
