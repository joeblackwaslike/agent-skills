# Fixtures runbook

How to build the state a test needs before it acts. The standard for what a good fixture is lives in [fixtures](../../../testing-principles/references/fixtures.md); this page is the procedure. Tool syntax (decorators, scopes, hooks, finalizers) is on the language pages: [python.md](../languages/python.md), [typescript.md](../languages/typescript.md), [rust.md](../languages/rust.md), [shell.md](../languages/shell.md) and [sql.md](../languages/sql.md).

## 1. Decide whether you need a fixture

1. Count the tests that need this state. One test with a short setup: inline it in the test.
2. Several tests share the same setup, or the setup is long enough to bury the act: write a fixture.
3. The setup is a scenario (many records, flags and users together): split it into one fixture per state change and let the test list the ones it needs (P4).

## 2. Choose the scope

Start with the narrowest scope the tool offers, which is per test. Widen it only when all three hold:

1. You measured the setup and it is slow enough to matter (P17).
2. No test mutates the state. Shared state that is only read cannot leak.
3. You can name what resets it if a test does change it by mistake.

If any answer is no, keep the fixture per test. A wider scope that a test writes to is the usual source of order-dependent failures (P13); see [isolation](../../../testing-principles/references/isolation.md).

## 3. Build with a factory or a builder

A fixture that returns one fixed object forces every test to use that object. Return a way to make objects instead.

- **Factory**: a function with sensible defaults and keyword overrides. `make_order(total=ORDER_TOTAL)`. Use it when tests differ in a few fields.
- **Builder**: a chain of calls for objects with many optional parts or an order of construction. `an_order().with_item(ITEM).shipped().build()`. Use it when a factory's override list is getting long.
- Defaults are valid and boring. Each test overrides only the field it is about, so the override tells the reader what matters.
- Unique fields (ids, emails) come from a per-test counter or a seeded generator, so two objects in one test cannot collide and a failure can be replayed (P14).
- Randomness in a factory is seeded or absent (P14).

## 4. Put teardown next to setup

1. Write the line that creates the thing.
2. Write the line that removes it in the same fixture, in the form your tool guarantees to run when the test fails.
3. If the removal can fail, make the failure loud. A swallowed cleanup error makes the next test fail for a reason it cannot explain.
4. If the cleanup list is longer than three lines, split the fixture.

Prefer a degree of isolation that needs no cleanup: fresh in-memory state, or a rollback of a transaction the test never commits. Plain cleanup is the weakest degree, because a test that forgets it still passes (P13).

## 5. Parametrize and indirect fixtures

Use a table when the same behavior is checked with different inputs. The decision is the same in every language.

1. One behavior, many input and expected pairs: a parametrized test. Each row gets a readable id.
2. The inputs are values passed straight to the act: parametrize the test itself.
3. Advanced: the inputs decide how the fixture is built (which database engine, which user role). Tools support this as indirect or parametrized fixtures, but it hides the input one hop away, so reach for it only when step 2 cannot express the case.
4. The rows need different assertions, not only different data: they are different behaviors. Write separate tests (P3).
5. Rows with branching logic in the test body, or a table too long to read at a glance (ten rows is a rule of thumb): move the cases to a data file or a property-based test.

## 6. Name them for what they are

- Name a stub for the thing it stands for: `expired_credential`, not `data`.
- Suffix mocks with `_mock`: `email_sender_mock`. The signature then shows which objects the test asserts on.
- Nothing named `mock1`, `setup_db` or `thing`.

## 7. House the doubles in fixtures

A fixture can hold the wiring of a mock or stub (building it against the real object, installing it, returning it) so the test body holds only the act and the assertions (P3).

1. Define the values the test depends on as named constants at the top of the test module.
2. Build the stub from those constants inside the fixture.
3. Assert against the same constants in the test.

The constant is visible where the test is read, and the stub and the assertion cannot drift apart (P4). Do not derive an expected value with the formula the code uses.

A fixture that installs a patch must undo it on exit. See [patching](patching.md).

## Common mistakes

- A fixture that builds a whole scenario: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).
- Wide-scope fixtures that tests modify: [shared mutable state](../code-smells.md#shared-mutable-state).
- Expected values buried in a fixture file far from the test: [values defined far from the test](../code-smells.md#values-defined-far-from-the-test).
- Expected values computed with the production formula: [logic in tests](../code-smells.md#logic-in-tests).

## Done check

- [ ] The scope is per test, or a measured reason is written down.
- [ ] Each fixture does one state change and has a name that predicts its body.
- [ ] Teardown sits with setup and runs on failure, or no cleanup is needed.
- [ ] Parametrized rows differ in data only.
- [ ] Expected values are named constants shared by stub and assertion.
