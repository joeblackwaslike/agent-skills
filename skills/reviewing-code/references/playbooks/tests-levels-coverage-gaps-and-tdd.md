# Tests: levels, coverage, gaps and TDD

> Use when the diff: Adds or changes tests, fixtures or test helpers

*Leans on: make it work, make it right, make it fast; Fail Fast; KISS.*

Review tests for what they would catch, not for how many there are. Each level of test answers a different question, and a gap usually means a question nobody asked.

**What each level should prove**

| Level | Question it answers | What to check in review |
| --- | --- | --- |
| Unit | Does this piece of logic do the right thing for each input? | Fast, isolated from I/O, one behavior per test, no mocks of the unit's own collaborators unless they are I/O |
| Functional / integration | Do the pieces work together through real seams: database, queue, HTTP layer? | Uses a real database (a container or transactional test database), not mocks of SQLAlchemy; exercises the endpoint through the app's test client |
| End-to-end | Does the deployed system work for a whole user flow? | Few of them, covering the critical journeys only; stable selectors; no fixed sleeps; independent of each other's data |
| Acceptance | Does it do what the spec or ticket asked, in the business's terms? | Each acceptance criterion in the spec maps to at least one test, written in domain language, ideally readable by the person who wrote the criteria |

Most logic belongs in unit tests; the seams belong in integration tests; end-to-end tests are kept to the flows that would cost the most if broken. A suite that is mostly end-to-end is slow and tells you little about where a failure is.

**Coverage and gaps**

- **Coverage is a pointer, not a target.** Use branch coverage (`coverage run --branch`) rather than line coverage (Vitest and Jest report branches too), and look at the uncovered lines *in this diff*. A low number shows untested code; a high number shows nothing about assertion quality.
- **Check the assertions.** For a feature, ask what small, wrong change to the code would still pass the tests: an off-by-one, a flipped condition, a removed line. If one exists, there is a gap. Mutation testing (for example `mutmut`) automates this question for critical modules; StrykerJS does the same for TypeScript.
- **Where gaps usually are.** Error paths, boundaries (empty, one, max, max + 1), authorization negatives, concurrency and retries, time zones, migrations and backfills, and the behavior of deprecated paths that must keep working.
- **Bug fixes.** The fix comes with a test that fails without it. If the PR doesn't show that, check out the branch, revert the fix locally, and run the test.
- **Determinism.** No wall-clock time, randomness without a seed, network, ordering assumptions, or shared state. A flaky test is fixed or deleted, not retried.

**Reviewing TDD work**

Test-driven development writes a failing test first (red), the least code that makes it pass (green), then cleans up with the test as a safety net (refactor). It is "make it work, make it right" at the scale of minutes, and it suits review well, because the tests become a readable specification of what the code was meant to do.

- **Read the tests as the spec.** In a TDD change, the tests should read as a list of behaviors in the spec's language. If they read as a list of internal function calls, they were written after the code or against the implementation.
- **The history can show the cycle.** Commits that add a test, then make it pass, then refactor make the review easier. Don't require it, but where it exists, review each step against its intent.
- **Green means the least code.** TDD's "simplest thing that passes" is KISS and YAGNI enforced by the process. Code in the diff that no test drives is either untested or unnecessary; ask which.
- **The refactor step happened.** Passing tests with duplicated or awkward code means the cycle stopped at green. Ask for the cleanup now, while the tests are fresh.
- **No design damage.** TDD can push code toward too many small injected seams just to make each unit testable in isolation. Prefer testing behavior through a stable public interface; that is the classic TDD style, and it keeps tests from breaking on every refactor.
- **Acceptance tests first, where it fits.** Starting from a failing acceptance test that encodes the spec, then driving the units underneath it, keeps the change exactly as large as the spec: no more, no less.
