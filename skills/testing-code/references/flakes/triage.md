# Flake triage runbook

How to take one flaky test from "fails sometimes" to fixed, or to quarantine when you cannot reproduce it. The taxonomy of causes is in [flake categories](../../../testing-principles/references/flakes/categories.md); this page is the procedure. A flaky test is a defect in the test or in the code (P15). Rerunning it until it passes is not a fix and is never done silently.

## 1. Capture the failure

Before you rerun anything, write down what you have. A rerun can erase it.

1. The test id, the failure message and the stack trace.
2. Which run failed: commit, job, machine, and the date and time.
3. The tests that ran before it on the same worker, if the runner reports order.
4. Logs, seeds, and any artifact the job saved (screenshots, traces, database dumps).

## 2. Reproduce

Run the test under each condition below and note which ones fail. The conditions that fail point at the cause. If several fail, expect more than one cause.

1. **In isolation.** Run the test alone. It fails alone: the test itself is the problem, not its neighbors.
2. **Many times in a row.** Loop it until it fails or you have enough evidence that it will not (step 5 says what enough means).
3. **In shuffled order.** Run the whole file, then the suite, with random order. It fails only here: another test leaves state behind.
4. **In the original failing order.** Reuse the seed or the order from the failing run.
5. **In parallel.** Run with the same number of workers CI uses, then more. It fails only here: a shared file, port, database or directory.
6. **Under load.** Run it while the machine is busy (a CPU burner, fewer cores, a throttled network). It fails only here: a timing assumption.
7. **With the CI environment.** Same container image, same environment variables, same locale and time zone, same core count. It fails only here: the host differs from your machine.

A test that fails on a certain date or hour: also run it with the clock set to that moment.

## 3. Narrow by cause category

Match what you saw in step 2 to a row of the [categories table](../../../testing-principles/references/flakes/categories.md).

1. It passes alone and fails in the suite or when shuffled. That is **isolation**. See [isolation failures](../../../testing-principles/references/flakes/isolation-failures.md).
2. It fails under load or after a fixed wait. That is **async**.
3. It fails when a service is slow, down or changed. That is **remote services**.
4. It fails at certain hours, dates or time zones. That is **time**.
5. A random test fails late in a long run. That is **resources**.
6. It fails only in CI, or only locally. That is **environment**.
7. It fails on a click, a render or a navigation, more often headless. That is **UI timing**.

Several can combine. A fixed sleep on a loaded runner is async plus environment. Fix the wait first, then recheck.

Sometimes the intermittent failure is a real race in the code under test. Then the test is right and the code is wrong. File it as a product defect and keep the test.

## 4. Fix by cause

Apply the remedy from the category row. Fix the cause, not the symptom.

1. Isolation: fresh state per test, a rollback, or a cleanup the tool guarantees to run (P13).
2. Async: wait on an event or callback, or poll with a timeout (P14). See [non-determinism](../../../testing-principles/references/flakes/nondeterminism.md#concurrency-and-async).
3. Remote services: put a double at the boundary and check it with a contract test (P8, P11).
4. Time: inject the clock and freeze it (P14). See [non-determinism](../../../testing-principles/references/flakes/nondeterminism.md#time).
5. Resources: close what the test opens; shrink the pool so the leaking test fails first.
6. Environment: pin the input, declare the dependency in the test, stop relying on the host.
7. UI timing: wait for an observable ready state, not for elapsed time.

These do not count as fixes: a retry, a longer sleep, a looser assertion, a skip with no owner. Each hides the defect from the signal the suite exists to give (P15).

## 5. Verify

You cannot prove a flaky test is fixed. You can collect evidence that is stronger than the failure evidence you started with.

1. Run the repaired test alone many times, then the original failing order, then shuffled, then in parallel. Use the conditions that failed in step 2.
2. Pick the run count from the failure rate you measured before the fix. A test that failed 3 runs in 10 needs far fewer clean runs to be convincing than one that failed 1 in 500. If you never measured a rate, measure it first on the broken version.
3. Judge by this: the number of clean runs should make it unlikely that a test with the old failure rate would have passed every time. If the old rate was 1 in 20, twenty clean runs would still happen about a third of the time with the defect present. Sixty would happen under 5% of the time.
4. Confirm the fix is the cause. Revert it or reintroduce the defect on purpose (a slower dependency, a fixed clock at midnight, a shuffled order) and see the test fail. A fix you cannot make fail again is a guess.
5. After merging, watch the next stretch of real CI runs. If the test fails again, reopen the record from [tracking](tracking.md).

Evidence to write in the commit or issue: the cause category, the condition that reproduced it, the failure rate before, the number of clean runs after.

## 6. If you cannot reproduce it

Time-box the effort, then stop guessing. A default is about two hours, or each condition in step 2 run once, whichever comes first. Extend it only when a condition has already narrowed the cause.

1. Add what the next failure would need: log the seed, the order, the clock and the resource state on failure.
2. Record the flake in the tracker (see [tracking](tracking.md)).
3. Quarantine it with an owner and a deadline (see [quarantine](quarantine.md)), so it stops blocking others and still gets looked at.
4. Do not delete the failure history. The next occurrence is your reproduction.

## Common mistakes

- Rerunning in CI until green and moving on. The defect stays and nobody knows.
- Lengthening a sleep instead of waiting on the event: [bare sleeps](../code-smells.md#bare-sleeps).
- Calling it an isolation flake without shuffling: state that leaks between tests is [shared mutable state](../code-smells.md#shared-mutable-state).
- Loosening the assertion until it cannot fail: [tests that cannot fail](../code-smells.md#tests-that-cannot-fail).
- Doubling a remote service and never checking the double: [stale doubles](../code-smells.md#stale-doubles).
- Declaring it fixed after three clean runs on a test that failed one run in fifty.

## Done check

- [ ] The failure was captured before any rerun.
- [ ] The cause is named as one or more categories, with the reproducing condition.
- [ ] The fix targets the cause; no retry, no longer sleep, no silent skip.
- [ ] The repaired test was run in the failing order, shuffled and in parallel.
- [ ] The run count was chosen from the measured failure rate, and the fix was shown to matter.
- [ ] Not reproducible: the test is quarantined with an owner and a date, and extra diagnostics are in place.

## Sources

Informed by Fowler's "Eradicating Non-Determinism in Tests" and the Google Testing Blog's posts on flaky tests. Written in this skill's vocabulary.
