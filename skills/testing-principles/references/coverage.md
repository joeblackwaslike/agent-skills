# Coverage

What a coverage number measures, what it leaves out, and how to use it. Covers P7. Mutation testing, the better check on assertion strength, is in [mutation.md](mutation.md). Coverage is a technique for judging tests, not a kind of test. Tool setup and report commands live on the `testing-code` language pages.

## What coverage measures

Coverage reports which parts of the code ran while the suite ran. It does not report whether anything checked the result.

- A line counts as covered when a test executed it, whether or not any assertion depended on it.
- A test with no assertions raises coverage exactly as much as a test with strong ones.
- Covered means executed. Tested means a check would fail if the behavior broke.

Google's testing guidance makes the same distinction: coverage shows that lines or branches were executed, not that they were checked correctly.

## Line versus branch

| Measure | Counts | Blind spot |
|---|---|---|
| Line (statement) | Lines executed at least once | A line with a condition counts as covered when only one outcome ran |
| Branch | Each outcome of each decision executed at least once | Does not cover combinations of conditions, or input values within a branch |

- Branch coverage is the stricter and more honest number. A one-line conditional can reach full line coverage while its `else` side never runs.
- Neither measure sees missing code. A guard that was never written has nothing to execute, so no report flags it.
- Neither measure sees edge cases inside a covered line, such as an off-by-one on a boundary value.

Prefer branch coverage when the tooling offers it.

## Why targets are harmful (P7)

A target turns a signal into a goal, and people then reach the goal by the cheapest route.

- Fowler notes that high numbers are easy to reach with low-quality tests, and that this pulls effort toward code that rarely fails and away from code that matters.
- Once a threshold exists, work above it stops even where more testing would be prudent. Google's guidance warns that engineers may treat a target as a checkbox.
- A suspiciously perfect number is a smell. Fowler would be suspicious of 100%, because it suggests tests written to please the report.
- A mandated number invites assertion-free tests, tests copied only to execute lines, and tests of trivial code.
- Google's guidance also holds that no single ideal number applies to every product. The right amount of testing depends on how critical the code is, how often it changes, and how long it will live.

The number still works as an alarm. Informed by Fowler's view, a very low one, below half, signals trouble. A high one says little.

## How to read gaps

The value of a coverage report is in what it shows is missing.

- Read the uncovered lines and branches, not the total. For each one, ask whether a bug there would matter.
- Uncovered code that handles money, authentication, data loss, or error recovery is a real gap. Uncovered debug logging usually is not.
- Look at the gaps in changed code first. Coverage shown beside a diff during review lets reviewers judge whether the untested lines are important.
- A gap is a prompt to write a behavior-focused test (P1) or to decide, on purpose, that the risk is acceptable.
- Code that frequently changes deserves more attention than code that has been stable for years.
- When a gap sits in code that is hard to reach from a test, the cause is often a missing seam (P18), and the fix is in the design.

## What coverage cannot tell you

- Whether assertions are strong enough to fail when the code is wrong. Mutation testing addresses this (P7).
- Whether the right behaviors were chosen. A suite can cover every line and still never check the requirement the user cares about.
- Whether tests are stable, fast, or readable.
- Whether the suite is sufficient. Fowler's measure is practical: bugs rarely escape to production, and people are rarely afraid to change code.

## Quick review checks

- Is the number being used to find gaps, or to pass a gate?
- Is it branch coverage or only line coverage?
- Do the uncovered regions include any code whose failure would be costly?
- Have the covered regions been checked for real assertions, for example with a mutation run on the critical modules?
