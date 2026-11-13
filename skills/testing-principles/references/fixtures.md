# Fixtures

What a good fixture is. A fixture is the prepared state a test needs before it acts: data, a client, a configured double. This page covers the design. Scope choices, factories, builders, teardown mechanics and parametrized fixtures live in the [`testing-code` fixtures runbook](../../testing-code/references/runbooks/fixtures.md). Supports P3, P4, P13 and P18.

## One state change

A fixture does one thing: creates one record, starts one fake, installs one double. A reader who sees its name should be able to predict its body.

- A fixture that builds a user, a team, three orders and a feature flag is a scenario, not a fixture. Split it, and let the test list the pieces it needs.
- Composing small fixtures keeps each test's dependencies visible in its signature (P4).
- A fixture that changes state a test did not ask for is a hidden input. Remove it from tests that do not use it.

## Teardown follows setup

Whatever a fixture creates, it removes, in the same place that created it. Nothing it makes outlives the test (P13).

- Setup and cleanup sit together so they stay in sync when one changes.
- Prefer a fixture form where cleanup is guaranteed to run even when the test fails.
- If a fixture needs a long cleanup list, it is doing too much.

## Narrow scope

Create state per test by default. Widen the scope only when setup is measurably slow, and only for state the tests never mutate.

- Per-test state cannot leak between tests.
- Wider scope shares one instance, so one test's change reaches the next. That is the root of order-dependent failures (see `isolation.md`).
- Measure before widening (P17). A fixture measured as cheap does not need sharing.

## Meaningful names

The name says what the fixture is, not how it is built.

| Weak | Better |
|---|---|
| `data` | `expired_credential` |
| `mock1` | `email_sender_mock` |
| `setup_db` | `empty_order_repository` |

House convention: name stubs for the thing they stand for and mocks with a `_mock` suffix. A reader then knows from the signature which objects the test asserts on and which only supply data. This matters more when a fixture lives outside the test: a good name is the only context the reader gets.

## Fixtures house mocks and stubs

Putting doubles in fixtures keeps test bodies short: the body holds the call and the assertions, and the setup sits behind named fixtures. A well-named remote definition costs the reader less than a screen of inline setup, though it does add one hop. Keep the values the test depends on visible in the test as named constants (P4), and leave only the wiring behind the fixture.

Fixtures that build doubles may have side effects, such as installing a double in front of the code (see `patches.md`). That is expected, as long as the undo is automatic.

### Expected values as named constants

Define the values a test checks as named constants, then use the same constants in the stubs that feed the code and in the assertions. The test then reads as "the code took this input and produced that output", and no value is typed twice (P3, P4).

- Constants sit at the top of the test module or class, where a reader sees them with the test.
- A stub built from a constant and an assertion built from the same constant cannot drift apart.
- Do not compute an expected value from the formula the code uses. A constant keeps the check independent.

## Smells

- A fixture used by one test, with a body longer than the test: inline it.
- A fixture that returns different things depending on a flag: two fixtures.
- Fixtures that depend on each other in a long chain: flatten the chain, or the test is covering too much.
- A shared mutable fixture in a wide scope: see `isolation.md` and `flakes/isolation-failures.md`.

## Test infrastructure is code

Treat fixtures, builders and helpers as code (P18): review them, refactor them, and keep third-party calls behind thin facades so tests have one place to double.

## Related

- `doubles.md` for what to put in a mock or stub fixture.
- `patches.md` for fixtures that install a double.
- `test-structure.md` for the body order that follows fixtures.
