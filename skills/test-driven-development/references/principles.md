# TDD Principles

The complete discipline. Read this once end-to-end; re-read the rationalization table
whenever you feel the urge to skip a step.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

If production code exists that no failing test demanded, it is unverified. Delete it and
let a test drive it back into existence. "Delete" means delete — not comment out, not keep
in a branch "for reference." If you keep it, you will copy from it, and copying from
untested code while writing the test *is testing after*, which the next section explains is
worthless.

## Red-Green-Refactor in detail

### RED — write one failing test

- **One behavior.** If the test name needs "and", split it.
- **Clear name** that states the behavior: `rejects empty email`, not `test1`.
- **Real code, real assertions.** Assert on the system's observable behavior, not on a mock.
- The test should read like the API you *wish* existed. Writing the test first is a design
  act: you're the first user of the code, and awkward setup is the design telling you it's
  hard to use.

### Verify RED — watch it fail (mandatory)

Run the single test. Confirm:

- It **fails**, not **errors**. A `ModuleNotFound`/`ReferenceError` means the test couldn't
  even run — fix that until you get a real assertion failure.
- The failure message is the one you expected (the assertion you care about, not an
  unrelated explosion).
- It fails because the **behavior is missing**, not because of a typo in the test.

If the test passes immediately, it tests something that already exists — you learned
nothing. Fix the test until it can fail.

### GREEN — minimal code to pass

Write the simplest thing that turns the test green. Resist:

- Adding parameters/options "you'll need later" (YAGNI).
- Refactoring unrelated code.
- Handling cases no test demands yet.

It's fine — encouraged early — to "fake it": return a hard-coded value that passes the one
test. The next test will force you to generalize (see **triangulation**).

### Verify GREEN — watch it pass (mandatory)

Run the test (then the whole file/suite). Confirm it passes, **all other tests still
pass**, and the output is pristine — no warnings, no stray logs, no unhandled-rejection
notices. A passing test buried in noise is a future debugging session.

### REFACTOR — clean up under green

Only once green. Remove duplication (between tests *and* production code), improve names,
extract helpers, collapse the fake into a real implementation. Re-run after each change;
stay green the entire time. Add **no** new behavior here — new behavior needs a new failing
test.

## Uncle Bob's Three Laws of TDD

A tighter restatement of the same loop, useful when you catch yourself getting ahead:

1. You may not write production code until you have written a failing test.
2. You may not write more of a test than is sufficient to fail (a compile/import error
   counts as failing).
3. You may not write more production code than is sufficient to pass the one failing test.

These force the cycle to spin in seconds-to-minutes, not hours. If your red phase produces
30 lines of test before you run it, you're batching — shrink the step.

## FIRST — properties of good tests

| Letter | Property | What it means |
| --- | --- | --- |
| **F** | Fast | Milliseconds. Slow tests don't get run, and TDD needs the loop tight. Push slow I/O to a small number of integration tests. |
| **I** | Isolated / Independent | No test depends on another's order or leftover state. Each sets up and tears down its own world. |
| **R** | Repeatable | Same result every run, every machine. No reliance on wall-clock, network, random seeds, or "Tuesday." Inject those (see `advanced-patterns.md`). |
| **S** | Self-validating | A clear pass/fail. No reading logs by eye to decide if it worked. |
| **T** | Timely | Written just before the code (test-first), not bolted on weeks later. |

## Structure: AAA and Given-When-Then

Every test has three parts. Make them visible.

- **Arrange / Given** — set up the system and inputs.
- **Act / When** — invoke the one behavior under test.
- **Assert / Then** — check the observable outcome.

```typescript
test('applies a 10% discount to orders over $100', () => {
  // Arrange
  const order = new Order([{ price: 60 }, { price: 60 }]);
  // Act
  const total = order.total();
  // Assert
  expect(total).toBe(108);
});
```

One **Act** per test. Multiple asserts are fine if they describe one behavior; if they
describe several, split the test.

## Strategies for getting to green

Kent Beck's three gears — shift down (toward fake-it) when unsure, up when confident:

- **Fake it** — return a constant that passes the test. Then write another test that the
  constant *can't* satisfy, forcing real logic. Smallest possible step; great when the path
  is murky.
- **Triangulation** — drive out the general rule with two or three concrete examples.
  `add(2,2)→4` lets you `return 4`; adding `add(2,3)→5` forces `return a+b`. Use
  `parametrize` (Python) / `test.each` (Vitest) to express the examples cheaply.
- **Obvious implementation** — when the real code is trivial and you're sure, just type it.
  But the moment you're surprised by a failure, shift back down to fake-it.

## What makes a test good vs bad

| Quality | Good | Bad |
| --- | --- | --- |
| Minimal | Tests one behavior | `test('validates email and domain and whitespace')` |
| Named for behavior | `retries 3 times then throws` | `test('it works')` |
| Tests behavior, not implementation | Asserts the returned value/effect | Asserts a private method was called |
| Tests real code | Calls the function | Asserts a mock was called N times |
| Stable under refactor | Survives internal rewrites | Breaks when you rename a private helper |

A test coupled to implementation details fails every time you refactor, training you to
distrust and delete tests. Test *what* the unit does, not *how*.

## The rationalization table

Every entry is a real thing an agent (or human) says to justify skipping the failing test.
All of them mean: **stop, delete the untested code, start over with a test.**

| Excuse | Reality |
| --- | --- |
| "Too simple to test." | Simple code breaks. The test takes 30 seconds and documents intent. |
| "I'll write the tests after." | Tests-after pass immediately and prove nothing. You never saw them catch anything. |
| "Tests-after achieve the same goal." | Tests-after answer "what does this do?" Tests-first answer "what *should* this do?" The second finds the bug. |
| "I already manually tested it." | Ad-hoc, unrecorded, unrepeatable. Gone the next time the code changes. |
| "Deleting hours of work is wasteful." | Sunk cost. The hours are spent either way; keeping unverified code is the waste. |
| "Keep it as reference while I write the test." | You'll copy from it — that's testing after. Delete means delete. |
| "I need to explore first." | Fine — spike it, then **throw the spike away** and start clean under TDD. |
| "The test is hard to write." | The design is hard to use. Listen to the test; simplify the interface. |
| "I have to mock everything." | The code is too coupled. Inject dependencies instead. |
| "TDD will slow me down." | TDD is faster than the debugging it prevents. |
| "It's about the spirit, not the ritual." | The ritual *is* the spirit. The watched-failure is the proof; there is no shortcut to it. |
| "This case is different because…" | It isn't. Write the test. |

## Red flags — STOP and start over

- Production code written before its test.
- A test that passes the first time you run it.
- You can't explain *why* the test failed in the red phase.
- "I'll add tests later."
- Asserting on a mock's call count instead of real behavior.
- Any "just this once" / "spirit not letter" / "already tested it manually."

## When stuck

| Problem | Move |
| --- | --- |
| Don't know how to test it | Write the assertion you wish were true first; let it pull the API into being. |
| Test is too complicated | The design is too complicated. Simplify the interface, then test. |
| Need to mock the world | Too much coupling — introduce dependency injection. |
| Setup is enormous | Extract test helpers/builders; if still huge, the unit is doing too much — split it. |

See `typescript-examples.md` and `python-examples.md` for every move above as runnable code,
and `why-tdd-with-ai-agents.md` for why this discipline pays off disproportionately when an
agent is at the keyboard.
