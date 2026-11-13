# Mutation testing

Using small deliberate bugs to judge whether a suite would notice real ones. Covers P7, which means mutation testing on the code that earns it, not on every module. It is a technique for judging tests, not a kind of test, and it stays separate from [coverage.md](coverage.md) because it answers a different question. Running it, reading reports, and tool setup are in the [`testing-code` mutation-testing runbook](../../testing-code/references/runbooks/mutation-testing.md).

## What it does

A mutation tool copies the code, changes one small thing in the copy (flips a comparison, swaps an operator, removes a call, changes a constant), and runs the tests against it. Each changed copy is a mutant.

- If a test fails, the mutant is killed. The suite noticed the change.
- If every test still passes, the mutant survived. The suite could not tell the changed code from the original.

Coverage asks whether code ran. Mutation asks whether the tests would fail if the code were wrong. The Google Testing Blog post "Code Coverage Best Practices" names mutation testing as a better way to see whether the lines your tests cover are adequately asserted.

## What a mutation score means

The score is the share of mutants killed.

- A high score means the suite detects most of the small changes the tool tried. It is evidence of strong assertions in the code that was mutated.
- A low score in covered code means tests execute the code without checking it. That is the situation line coverage hides.
- The score depends on which mutations the tool generates, so it is comparable within one setup and not across tools. Denominators also differ by tool: some count no-coverage, timed-out and equivalent mutants and some drop them.
- Like coverage, it becomes a poor measure once it is a target (P7). A team chasing the score will write tests aimed at killing mutants rather than at protecting behavior.

## Surviving mutants

The survivors are the useful output. Each one is a concrete question about the suite.

| Why the mutant survived | What it says | Response |
|---|---|---|
| No test exercises the mutated code | A coverage gap | Decide whether a behavior test is needed (P7) |
| Code runs but nothing asserts on the affected result | A weak or missing assertion | Strengthen the assertion on the observable outcome |
| Boundary condition untested | Off-by-one or limit case unchecked | Add the boundary example |
| Mutant behaves the same as the original (an equivalent mutant) | No test could kill it | Ignore it, or exclude that mutation |
| Change only affects logging, timing, or other side detail | Probably not behavior | Judge whether anyone depends on it |

- Equivalent mutants are why a perfect score cannot be the goal.
- Read survivors for patterns. Many survivors in one module usually point to one habit, such as asserting only that a call did not raise.
- Fix the test, not the mutant. A test written only to kill one mutant, without a behavior behind it, adds maintenance with little protection.

## When it is worth the cost

Mutation testing is expensive. Each mutant needs a test run, so cost grows with code size and suite duration (P17).

Worth it when:

- The code is critical or costly to get wrong: money, permissions, parsing, core business rules.
- Line or branch coverage is already high and you doubt the assertions.
- A module changes often and the team relies on its tests to refactor safely.
- Tests were produced quickly, for example by an assistant, and their strength is unknown.

Usually not worth it when:

- The suite is slow or flaky. Slow runs make the cost prohibitive, and flaky failures register as false kills (P15).
- Coverage is low. Start by writing the missing tests; mutation would mostly report what coverage already shows.
- The code is thin glue, generated, or throwaway.

Scope it to the code that earns it, such as the changed files in a diff or one critical package, and run it outside the fast feedback loop.

## Relation to other techniques

- Coverage finds code no test touches. Mutation finds code a test touches but does not check.
- Property-based tests (see [property-based.md](property-based.md)) often kill mutants that example tests miss, because they vary inputs widely.
