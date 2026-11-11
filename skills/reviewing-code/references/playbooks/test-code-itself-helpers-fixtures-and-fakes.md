# Test code itself: helpers, fixtures and fakes

*Leans on: KISS above all, then high cohesion, Rule of Three, explicit over implicit.*

Test code is held to a different standard from production code, and confusing the two is a common source of bad test suites. Production code is optimized for change over years; test code is optimized for being obviously correct at a glance. Nobody tests the tests, so a test must be simple enough that it can't plausibly be wrong.

**How test code differs**

|  | Production code | Test code |
| --- | --- | --- |
| Logic | Whatever the problem needs | None, ideally: no loops, conditionals or computation in a test body. A test with an `if` can pass by taking the wrong branch. |
| Duplication | Deduplicate shared knowledge | Prefer repetition that keeps each test readable on its own (DAMP: descriptive and meaningful phrases over DRY). A reader should understand a failing test without opening five helpers. |
| Abstraction | Earned by a second real use | Even more reluctant. Helpers exist to remove noise, not to share logic. |
| Expected values | Computed | Literal. `assert total == Decimal("42.50")`, not `assert total == price * qty * (1 - discount)`, which just re-implements the code under test. |
| Naming | Domain names | Names describe the scenario and outcome: `test_refund_rejected_after_30_days` |
| Reuse | Matters | Matters much less than clarity |

**Helpers, factories, builders and fakes**

- **Simple, or tested.** A test helper must be trivially correct by inspection: build an object with defaults, make one request, assert one shape. Once a helper has real logic (branching, parsing, calculation), it either gets simplified or gets its own unit tests, because a bug there makes every test that uses it lie.
- **Factories for data.** Use a factory (for example `factory_boy` or `polyfactory`, or fishery in TypeScript) or a small builder that fills valid defaults, so each test states only the fields it cares about. `make_order(status="refunded")` says what the test is about; a 20-field literal hides it.
- **Fakes over mocks.** An in-memory implementation of a `Protocol` (`InMemoryUserRepository`) is simple, reusable and behaves like the real thing. Mocks that assert call sequences couple tests to implementation.
- **Where test code lives.** Keep a helper next to the tests that use it: in the test module, or in a `conftest.py` in the same directory. Promote it to a shared location only when several distant test packages need it. The same rule as production code applies: don't scatter cohesive code for imagined reuse. And as the `engineering-principles` skill's simplicity section says, a helper used by both production code and tests stays in the production module; the test imports it from there.
- **Fakes that mirror production contracts** (an in-memory repository, a fake clock, a fake payment gateway) can live in a dedicated `testing` module or package next to the code they fake, so they evolve with the interface. These are real code and get real tests, often the same contract tests the production implementation passes.

**Fixtures**

- **Explicit and local.** A fixture's purpose should be clear from its name, and a test's setup visible from its arguments. Deep chains of fixtures depending on fixtures, defined in distant `conftest.py` files, make a test impossible to understand on its own.
- **Narrow scope by default.** Function scope unless setup is genuinely expensive. Session- or module-scoped fixtures that hold mutable state leak between tests and cause order-dependent failures.
- **No `autouse` surprises.** An `autouse` fixture changes every test in its scope invisibly. Use it only for true global hygiene (resetting a clock, isolating the environment). The same applies to global beforeEach hooks and setup files in Vitest or Jest.
- **Parametrize, don't loop.** `pytest.mark.parametrize` with readable ids gives one test per case and reports which one failed. A loop inside a test stops at the first failure and hides the rest.

**In review, ask of each test**

- Can I tell what behavior it checks from its name and body alone?
- Would it fail if that behavior broke?
- Does it check one thing, with arrange, act and assert visible?
- Does it depend on anything it doesn't show: shared state, ordering, the clock, the network?
