# Isolation failures

How one test's leftovers become another test's failure. This is a common and frustrating cause of flakes, because the test that fails is rarely the test that is wrong. Covers P13 and P15. The remedy table is in [categories.md](categories.md); the principle is in [../isolation.md](../isolation.md). Informed by Fowler's "Eradicating Non-Determinism in Tests".

## A patch that wasn't undone

A test replaces a name, an environment value, or a setting and does not restore it. Every later test in the same process sees the replacement.

- A test sets a region setting to a non-default value, restores it only on the success path, and an assertion fails first. Later tests that expect the default region fail, in a different file, and only when the first test fails.
- The symptom is a failure far from the cause, which appears or disappears with test order.
- Restoring by hand ("set, act, reset") is skipped by any exception. Undo has to be guaranteed by the mechanism that installed the patch (P12, P13). See [../patches.md](../patches.md).
- Assigning a replacement at module level is a patch with no undo.

## A row left in the database

A test inserts data and leaves it. The next test counts rows, expects an empty table, or inserts a value that must be unique.

- A test creates a user with a fixed email and never deletes it. The second run, or another test using the same email, hits a uniqueness error.
- Failures show up as unexpected counts, duplicate-key errors, or an "empty" list that is not.
- Prefer, in order (P13): fresh state per test, a transaction that is rolled back, then deletion of exactly what the test created with the deletion guaranteed to run. Fowler prefers rebuilding because the failing test is then the buggy one, while with cleanup the buggy test passes and a later one fails.
- Fixed identifiers (emails, names, ids) make collisions certain. Generate unique values per test.

## Shared state

State that lives for the whole process is shared by every test.

- Singletons, module-level caches, class-level attributes, registries, the logged-in user, and environment variables all persist between tests.
- A test that mutates one of these changes the starting point for every test after it.
- A shared fixture is shared state with a name. If tests write to it, they affect each other (see [../fixtures.md](../fixtures.md)).
- A frozen clock, a registered handler, or a toggled feature flag left in place are the same defect.
- Reset or replace shared state per test, or avoid it by passing dependencies in.
- An error thrown during teardown can pass its own test and still leave damage. Teardown failures must be loud (P13).

## Order dependence

A test that passes only after another has run is relying on that test's leftovers.

- The signs are: passes alone but fails in the suite, fails alone but passes in the suite, or changes result when files run in a different order or in parallel.
- Run the suite in shuffled order, and run single tests alone. A single failing pair points to a leak from one into the other.
- The cure is to make each test create its own preconditions (P13), not to fix the order. Fowler argues for isolation over enforced ordering, since it keeps subsets and parallel runs possible.
- A leak that only shows on parallel runs usually means a shared resource with one copy: a database, a port, a temp path.

## Handling

- Find the leaker. The failing test only shows where the damage landed.
- Fix the leak at its source with guaranteed undo or fresh state. Cleanup added to the victim leaves the leak in place.
- A suite that passes only because failures are retried hides leaks, and they grow (P15).
