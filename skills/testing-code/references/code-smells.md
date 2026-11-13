# Test code smells

Each smell names what you see, why it hurts, how to fix it, and the principle it breaks (IDs from [testing-principles](../../testing-principles/SKILL.md)).
Attribution: the names Mystery Guest, Assertion Roulette and Eager Test come from Gerard Meszaros's xUnit Test Patterns, as catalogued at xunitpatterns.com. The change-detector and logic-in-tests entries take their names from two Google Testing Blog posts, "Change-Detector Tests Considered Harmful" and "Don't Put Logic in Tests"; the explanations, and every other entry, are this skill's own.

## Smells

### Change-detector tests

- **Symptom.** The test restates the implementation: it mocks every collaborator, then asserts the code called them in the way the code is written. Refactor the internals without changing behavior and the test fails; change the behavior and it still passes.
- **Why it hurts.** It blocks refactoring and proves nothing about whether the code works. Every change costs a test edit, so people stop trusting red.
- **Fix.** Assert an outcome visible through the public interface: a return value, a stored record, a message actually sent. Keep mock assertions only for effects that are the behavior (an email sent, a charge made). Use a fake for collaborators whose internals you don't care about.
- **Breaks.** P2.

### Logic in tests

- **Symptom.** A loop, an `if`, string building, or arithmetic that recomputes the expected value inside the test.
- **Why it hurts.** The test can have its own bug, and a recomputed expectation often repeats the bug in the code. A reader must run the test in their head to know what it demands.
- **Fix.** Write the expected value as a literal. Cover several inputs with parametrization, one case per row, rather than a loop. If a helper is truly needed, give it its own test.
- **Breaks.** P3.

### Over-specified or over-mocked setup

- **Symptom.** Twenty lines of arrangement for a three-line behavior: mocks for things the code never touches, stubbed values the test never reads, a fixture that builds a whole object graph.
- **Why it hurts.** The reader can't tell which values matter. Each extra double is another thing to go stale, and the test breaks when unrelated code changes.
- **Fix.** Keep only what the behavior needs. Use the real object when it is cheap and deterministic. Build the smallest fixture that exercises the behavior, and name the one value that matters.
- **Breaks.** P4, P8.

### Shared mutable state

- **Symptom.** A module-level list, a class attribute, a singleton, a shared database row or a cached object that tests modify. Tests pass alone and fail together, or pass only in file order.
- **Why it hurts.** Tests depend on each other, so a failure can point at the wrong test and parallel runs corrupt each other.
- **Fix.** Create state per test (fresh fixture, factory call, transaction rolled back at the end). Make shared constants immutable. Run the suite shuffled and in parallel to prove it.
- **Breaks.** P13.

### Bare sleeps

- **Symptom.** `sleep(2)` or an equivalent fixed wait before asserting on asynchronous work.
- **Why it hurts.** The wait is a guess. Too short and the test flakes on a slow machine; too long and the suite crawls on every run.
- **Fix.** Wait for the condition: poll with a timeout, await the event, or use the framework's auto-wait. Inject a clock when the code under test measures time.
- **Breaks.** P14, P17.

### Values defined far from the test

- **Symptom.** The test asserts against `"user-42"` or `1500`, and the reader has to open a fixture file, a base class or a conftest module to learn why those values are right. Known in the xUnit Test Patterns catalog as Mystery Guest.
- **Why it hurts.** Cause and effect are split across files, so the test no longer documents the behavior and an edit elsewhere breaks it silently.
- **Fix.** Put the values the test depends on in the test body or on its class, in the constants block of the [test body template](test-body-template.md). Share a builder, not a pre-baked record, and pass the one value that matters as an explicit argument.
- **Breaks.** P4.

### Assertion roulette

- **Symptom.** Many unlabeled assertions in one test. When it fails, the report doesn't say which assertion broke or what each was checking.
- **Why it hurts.** Diagnosis means rerunning with a debugger, and the first failed assertion hides the ones after it.
- **Fix.** Split the test so each checks one behavior, or compare one whole expected object instead of field by field. Where several assertions must stay, make each failure message state expected, actual and context.
- **Breaks.** P16, P3.

### One test covering several behaviors

- **Symptom.** A test named `test_user_flow` that creates, updates, and deletes, or a test with several act steps and an assert after each.
- **Why it hurts.** The first failure stops the rest from running, the name can't say what broke, and a change to one behavior breaks a test about another. Also known as an eager test in xUnit Test Patterns.
- **Fix.** One behavior per test, named for that behavior. Share arrangement through a fixture or a builder, not by chaining actions.
- **Breaks.** P3.

### Testing private internals

- **Symptom.** The test imports an underscore-prefixed function, reaches into an attribute, patches a private method, or makes a method public just to test it.
- **Why it hurts.** The test is welded to the structure. Any rename or split fails it even when behavior is unchanged, and the public interface may be untested.
- **Fix.** Drive the behavior through the public interface. If a private function holds logic worth its own tests, it is a separate unit: extract it to a module with its own interface.
- **Breaks.** P2.

### Tests that cannot fail

- **Symptom.** An assertion that is always true (`assert mock.called or True`, asserting a stub returns what you set), a test with no assertion, an assertion in a branch that never runs, or a test that passes with the production code deleted.
- **Why it hurts.** It adds coverage and false confidence, and it hides a real gap.
- **Fix.** See the test fail for the intended reason before trusting it (P19). Break the production code on purpose, or run mutation testing, and confirm the test goes red. Remove or rewrite any test that doesn't.
- **Breaks.** P19, P7.

### Stale doubles

- **Symptom.** A hand-written fake or a bare mock accepts calls the real dependency would reject: a renamed method, a changed signature, a removed field. Production fails while every test stays green.
- **Why it hurts.** The test verifies the double rather than the system, and the drift surfaces in production.
- **Fix.** Build mocks from the real signature so a mismatched call fails (autospec in Python; see [the Python page](languages/python.md)). Check boundary doubles against the real service with a contract test. Keep fakes small enough to review next to the real thing.
- **Breaks.** P11.
