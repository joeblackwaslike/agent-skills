# Isolation

What it means for a test to stand alone. Covers P13. The cause-by-cause failure modes are in `flakes/isolation-failures.md`; the mechanics of cleanup and rollback live in the [`testing-code` fixtures runbook](../../testing-code/references/runbooks/fixtures.md).

## Hermetic tests

A hermetic test brings everything it needs and touches nothing it did not bring (P13).

- It builds its own state and does not read state another test, a previous run, or a developer's machine left behind.
- It does not reach outside the test's own resources unless the kind of test is built for that (see [test-kinds.md](test-kinds.md)). The network, the real clock and shared files are outside.
- Nothing it creates outlives it: no row, file, patch, environment variable, or running process.

The practical check is behavioral. A hermetic test passes in any order, alone or in a subset, and alongside its neighbors running in parallel.

## Degrees of isolation

There are three ways to give a test a known starting state. They differ in how much the test pays and how easy a failure is to trace. This follows Fowler's treatment in "Eradicating Non-Determinism in Tests".

| Degree | How | Cost | Debuggability |
|---|---|---|---|
| Fresh state | Build the starting state from scratch for each test | Highest setup time | Best. A bad setup fails the test that did it. |
| Rollback | Run inside a transaction or similar unit and discard it at the end | Low | Good, but only works when the test never commits. |
| Cleanup | Let the test change state, then undo the changes | Low | Worst. The test that forgot to clean up passes, and a later one fails. |

- Prefer the cheapest degree that fits. In-memory state and fakes are cheap enough for fresh state every time.
- Cleanup puts the failure far from the cause. If you rely on it, make cleanup run even when the test fails, and make a failure inside cleanup loud. A cleanup that throws and is swallowed leaves the next test to fail.
- Share long-lived state only to save time, and only for state tests never write to (see [fixtures.md](fixtures.md) and `performance.md`).

## Order independence

Tests that pass only in a particular order depend on state they did not create (P13).

- Each test creates the state it asserts on. It does not assume a prior test created it.
- Process-wide state counts: singletons, module-level caches, environment variables, the current user, the clock, registered handlers. Reset or avoid them.
- Fowler discusses isolation as an alternative to declared test ordering. Isolation lets you run a subset and run in parallel, and that reasoning applies here.
- A suite is only known to be order independent if it has been run in shuffled order. A suite that always runs in the same order can hide the dependency for years.

## Real collaborators are allowed

A test of a repository can use a real in-memory or throwaway database, as long as that database belongs to the test (P8; see [doubles.md](doubles.md)). Isolation requires that no test can observe another's effects, which leaves room for real collaborators and shared immutable state.
