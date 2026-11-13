# Slow tests runbook

How to make a suite faster without making it flaky. The reasons suites slow down are in [performance](../../testing-principles/references/performance.md); this page is the procedure (P17). There is no threshold here for "slow". Your team's patience sets that, and the measurements show where the time goes.

## 1. Measure first

1. Run the full suite and record the total wall time, and where the tool allows it the time per test, per fixture setup and per teardown.
2. Record where it ran: machine or CI runner, number of workers, cold or warm cache.
3. Run it again. If two runs differ a lot, the noise is bigger than most fixes, so find that first (it is often a flake or a shared resource).
4. Keep the numbers. They are the "before" for step 6.

Do not start a change until you have this record. Guesses about slow tests are often wrong.

## 2. Find the outliers

1. Sort tests by duration and read the top of the list. A few tests often account for most of the time.
2. Sort setup and teardown time separately. A cheap test with an expensive fixture hides in the per-test list.
3. Group by file, fixture and kind of test. A whole directory that is slow points at a shared cause.
4. Compare wall time with the sum of test times. A large gap is startup, collection or serial waiting, not the tests.

Take one cause at a time, largest first.

## 3. Fix by cause

Match the outlier to a row, apply the fix, and measure again before moving on.

1. **Fixture scope cost.** Heavy setup repeated per test (database load, app boot, big builders).
   1. Make the setup cheaper first: smaller data, a lighter fake.
   2. If it is still too slow, widen the scope only for state that tests never mutate, and name what resets it. See [fixtures](runbooks/fixtures.md).
   3. A widened scope that tests write to buys speed and costs you order-dependent failures (P13).
2. **Real IO that should be a double.** Network calls, real services, the file system, a slow store.
   1. Put a double at the boundary and keep a contract test on it (P8, P11, P14).
   2. Use an in-memory or temp-dir stand-in for storage when the behavior under test is not the storage itself.
3. **Sleeps and fixed waits.** Replace each with an event, a callback, or a poll with a timeout; or inject the clock. Never shorten a sleep to save time, because that turns a slow test into a flaky one (P14).
4. **Serial work that can run in parallel.** Check the preconditions in [performance](../../testing-principles/references/performance.md#preconditions-for-parallelism) first: order independence, per-worker resources, unique names, no process-wide state. Then raise the worker count. A suite that fails after you do has an isolation problem to fix, not a parallelism problem; see [triage](flakes/triage.md).
5. **Oversized setup.** A test builds a whole scenario to check one branch.
   1. Build only the state the test names.
   2. Move the check to the narrowest kind of test that still proves what you need (P5: the kind follows from what the check must prove). Several narrow tests are usually faster than one broad one.
6. **Startup cost.** Containers, app processes, compilers. Start once per run, not per test.
7. **Broad tests used for narrow logic.** Move the logic into a function and test it directly; keep one broad test for the wiring.

## 4. Do not trade away determinism

1. Run the changed tests shuffled and in parallel after every speed change.
2. If a test newly fails or flakes, the speed change caused it. Revert it or fix the cause.
3. Do not mark a slow test as skipped to make the total look better. It leaves the suite less safe and the number meaningless.
4. Never delete a P6 journey for speed; move it to a scheduled run (see [runbooks/end-to-end.md](runbooks/end-to-end.md)).

## 5. Check the result matters

1. Compare the new total and the new top of the list with the "before" numbers from step 1.
2. A fix that did not move the number is not a fix. Revert it unless it improved something else you can name.
3. Check that tests still fail when they should. Introduce a known bug (or run [mutation testing](runbooks/mutation-testing.md)) on the area you touched, to confirm you did not speed things up by testing less.

## 6. Record before and after

Write down, in the pull request or the issue:

1. Total wall time before and after, same machine and same worker count.
2. The slowest few tests before and after.
3. The cause category and the change made.
4. Whether any test changed behavior, order sensitivity or failure rate.

Track the total and the slowest few over time, so a gradual slowdown shows up before it becomes a complaint.

## Common mistakes

- Optimizing before measuring: the fix lands on the wrong test.
- Shortening a sleep: the suite is faster and flakier ([bare sleeps](code-smells.md#bare-sleeps)).
- Widening a fixture scope that tests mutate: [shared mutable state](code-smells.md#shared-mutable-state).
- Turning on parallelism before order independence holds.
- Mocking the thing under test to make it fast: [over-specified or over-mocked setup](code-smells.md#over-specified-or-over-mocked-setup).
- Reporting "30% faster" with no before number, no machine and no worker count.

## Done check

- [ ] A before measurement exists, with the conditions it was taken under.
- [ ] The change targets the largest measured cause.
- [ ] After the change, the suite passes shuffled and in parallel.
- [ ] The after measurement is on the same conditions and shows the movement.
- [ ] Coverage of behavior did not shrink to get there.
- [ ] The before and after numbers are recorded where the team can find them.

## Sources

Informed by Fowler's "Eradicating Non-Determinism in Tests", the Google Testing Blog and Software Engineering at Google. Written in this skill's vocabulary.
