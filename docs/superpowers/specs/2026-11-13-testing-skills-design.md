# Testing skills design

Two new skills, `testing-principles` and `testing-code`, plus a move of the existing `test-driven-development` skill into `testing-principles`.

## Intent

Agents write tests that pass today and cause trouble later. They read the real clock, leave a patch applied, mock everything, sleep to wait for async work, and retry a flaky test until it goes green. Testing is a large subject and no skill in this repo covers most of it.

The repo already has a pattern for large subjects. A principles skill states the standard, and a process skill applies it (`engineering-principles` with `reviewing-code`, `skill-principles` with `reviewing-skills`). This design follows it. `testing-principles` says what a good test and a good suite are. `testing-code` says how to write them, and how to diagnose a flaky or slow suite.

## Goals

- An agent that writes a test produces one that is isolated, deterministic and readable, of the right kind, using the right double, in the project's language.
- The standard is checkable. Each principle has an ID (P1 to P19) so a review, a reference file, or a code-smell entry can cite it.
- Detail loads on demand. `SKILL.md` carries the principles and routes to topic files; no file force-loads another.
- Joe's testing guide, his TDD skill, and the research below end up in one place.

## Non-goals

- Reviewing a test suite or a diff. That stays with `reviewing-code`.
- A third skill for diagnosing suites. Flake and slow-test runbooks live in `testing-code`.
- Languages beyond Python, TypeScript, Rust, shell and SQL, plus React and Playwright runbooks.
- Performance, load and chaos testing, beyond a short mention in `test-kinds.md`.

## Anti-goals

These would make the work a failure even if every file existed.

- Names or details from Joe's private repo leaking out of his guide. Examples keep the patterns and use neutral domain names.
- Text from external sources copied in. Google's book is reported as CC BY-NC-ND, so it is cited and paraphrased, never copied. ECC is MIT, so adapted content carries attribution.
- ECC tooling leaking in (`/plan`, `CLAUDE_PLUGIN_ROOT`, `.claude/tdd/`).
- Test sizing (small, medium, large) appearing anywhere. Joe's view is that size is not something a model should weigh while writing a test, and mentioning it distracts from things that matter more.
- A `SKILL.md` that loads everything up front.

## Vocabulary

- **Kind** is what a test covers: unit, integration, contract, functional, end-to-end, acceptance, behavioral, property-based. The words "level" and "layer" are not used for tests.
- Mutation testing and coverage are techniques for judging tests. They are not kinds.
- Isolation comes in degrees (fresh state, cleanup, rollback), not levels.

## Approaches considered

**Structure of the standard**

- A. One long `principles.md` plus per-framework notes, mirroring `engineering-principles`. Simple, but the topic list is much wider than engineering principles, and an agent would load all of it every time.
- B. A principles list in `SKILL.md` and one reference file per topic. More files and more links to keep consistent, but agents load only what they need. **Chosen.**
- C. Ship `testing-principles` alone and add `testing-code` later. Faster, but the process skill is what shows the standard can be used.

**What `testing-code` does**

Review a suite, write tests, or both. Joe chose writing. Diagnostic runbooks for flaky and slow suites sit in `testing-code` as procedures, while the taxonomy of where flakes come from sits in `testing-principles`.

**Where framework mechanics live**

An earlier draft had `frameworks/` in `testing-principles` and per-framework recipes in `testing-code`. That produced two overlapping sets. Framework mechanics are language mechanics, so they live on the `languages/` pages in `testing-code`. Playwright and React get runbooks because they are not languages.

## Placement rule

- `testing-principles` holds claims you can check on a finished test or suite: what good looks like and why. No steps, no tool commands, no language mechanics.
- `testing-code` holds anything you do: steps, decision procedures, tools, language mechanics, diagnostics.
- A topic that needs both gets one file in each, and the principles file links to the runbook.

## testing-principles

`SKILL.md` carries the principle list and routes to the references. The description is trigger-first, under 400 characters, with "Not for" lines pointing at `testing-code` (how to write and diagnose) and `reviewing-code` (diff review). It also carries the old TDD skill's triggers ("test first", "red green refactor", "write a failing test") so discovery does not regress.

### Principles

**What a test is for**

- **P1.** Test everything you don't want to break; a feature isn't done without tests.
- **P2.** Test behavior through the public interface, not methods or internals, so a refactor doesn't break the test.
- **P3.** One behavior per test, named for the behavior, shaped Arrange-Act-Assert, with no logic (loops, conditionals, computed expectations) in the test.
- **P4.** Tests are complete and concise: DAMP over DRY, with every value the test depends on visible in it.

**Choosing kinds**

- **P5.** Pick the kind from what you need to prove: unit for logic and branches, integration for the seams between parts, contract for provider and consumer agreement, end-to-end for the user-visible journey.
- **P6.** Every meaningful feature has at least a few end-to-end tests: one for the happy path and the rest for edge cases and errors. The lower kinds cover the branches around them.
- **P7.** Coverage is a signal, never a target. Judge a suite by the behaviors it protects, and test the tests with mutation testing.

**Doubles and patches**

- **P8.** Use the real thing when it is cheap and deterministic. Use a double at the boundaries: network, clock, third-party services, slow stores.
- **P9.** Pick the double by its job. A stub supplies data the code reads. A mock stands in for an effect the code causes, and the test asserts it. A fake is a small working stand-in (an in-memory repository) used when the dependency's behavior across several calls matters.
- **P10.** When a test uses a mock, assert the expected interactions: the calls the code made, their arguments and order, and that nothing else happened.
- **P11.** A double of a boundary is checked against the real thing (a contract test) or it goes stale.
- **P12.** Patch at the seam where the code looks the name up, only at boundaries, always auto-undone. Prefer injecting a dependency to patching it.

**Isolation and determinism**

- **P13.** Hermetic: tests pass in any order, any subset, in parallel, and nothing a test creates outlives it.
- **P14.** Deterministic: inject the clock, seed randomness, block the network by default, never bare-sleep (poll with a timeout).
- **P15.** A flaky test is a defect. Quarantine it with an owner and a deadline; never retry it to green silently.

**Test code is code**

- **P16.** Failure messages state expected, actual, and enough context to point at a cause.
- **P17.** Keep suites fast; measure to find slow tests rather than guessing.
- **P18.** Review, refactor and test your test infrastructure like production code. Build code to be testable, with seams and thin facades over third-party calls.
- **P19.** Red before green: see a new test fail for the intended reason first (see `test-driven-development.md`).

### Where Joe departs from the sources

Google, Fowler and Microsoft all recommend few end-to-end tests (P6 departs) and rank interaction verification last (P10 departs). Joe's position is that every meaningful feature needs at least a few end-to-end tests (a happy path plus edge cases and errors) and that asserting what a mock received is an essential part of a test. The skill states his position. The spec records the departure so nobody "fixes" it later by consulting the sources.

### References

| File | Holds |
|---|---|
| `test-kinds.md` | kind definitions, outcome to kind matrix, which kinds to write for a feature |
| `test-driven-development.md` | merged TDD background and runbook (below) |
| `test-structure.md` | Arrange-Act-Assert, naming, one behavior, no logic, DAMP, failure messages, argument ordering from Joe's guide, the standard shape of a test body |
| `doubles.md` | dummy, stub, fake, mock and spy by job; real versus double; exact-interaction assertions; contract checks for fakes; never nest mocks |
| `fixtures.md` | what a good fixture is: one state change, teardown after setup, narrow scope, meaningful names |
| `patches.md` | patch where the name is looked up, boundaries only, auto-undo, prefer injection |
| `isolation.md` | hermeticity, degrees of isolation, order independence |
| `flakes/categories.md` | taxonomy from cause to remedy: isolation, async, remote services, time, resources, environment, UI timing |
| `flakes/nondeterminism.md` | where flakes come from: time, randomness, network (why it is blocked in every test), concurrency, environment drift |
| `flakes/isolation-failures.md` | a patch that wasn't undone, a row left in the database, shared state, order dependence |
| `performance.md` | what makes tests slow, fixture scope cost, preconditions for parallelism |
| `coverage.md` | what coverage measures, branch versus line, why targets are harmful, how to read gaps |
| `mutation.md` | what a mutation score means, surviving mutants, when it is worth the cost |
| `property-based.md` | when a property beats an example, property families |

## testing-code

`SKILL.md` gives the workflow: pick the kind, read the language page, write with the body template, build fixtures and doubles, check isolation and determinism, run. It names the `testing-principles` files to load. Its "Not for" lines send diff review to `reviewing-code`.

### References

| File | Holds |
|---|---|
| `test-body-template.md` | Joe's annotated template: constants, mocks, act, expected, result asserts, mock asserts, not-called asserts |
| `code-smells.md` | test code smells, each as symptom, why it hurts, fix, and the principle it breaks. Covers change-detector tests, logic in tests, over-specified or over-mocked setup, shared mutable state, bare sleeps, values defined far from the test, assertion roulette, one test covering several behaviors, testing private internals, tests that cannot fail, stale doubles |
| `runbooks/` | one per kind: `unit.md`, `integration.md`, `contract.md`, `functional.md`, `end-to-end.md`, `acceptance.md`, `behavioral.md`, `property-based.md`, `mutation-testing.md` |
| `runbooks/` standard headings | every per-kind runbook has at least these headings, in this order, and may add its own after them. See "Standard runbook headings" below |
| `runbooks/fixtures.md` | choosing scope, factories and builders, teardown, parametrized and indirect fixtures |
| `runbooks/patching.md` | patching safely in practice, and refactoring untestable code to take an injected dependency |
| `runbooks/playwright.md` | page objects with `data-testid`, auto-wait instead of fixed sleeps, `context.tracing`, CI settings (retries, workers, forbidOnly, trace on first retry), a flake check with `--repeat-each`, quarantine. Links ECC `e2e-testing` |
| `runbooks/react.md` | Testing Library query priority, userEvent, MSW. Links ECC `react-testing` |
| `flakes/triage.md` | reproduce, narrow by cause category, fix, verify |
| `flakes/tracking.md` | record and rank flakes, rerun-rate metrics, ownership |
| `flakes/quarantine.md` | mechanics, caps by count and age, exit criteria, issue link |
| `slow-tests.md` | measure first, find outliers, fix by cause, measure again |
| `languages/index.md` | quick-map table across languages |
| `languages/python.md`, `typescript.md`, `rust.md`, `shell.md`, `sql.md` | one page per language, identical sections (below) |

### Standard runbook headings

The nine per-kind runbooks (`unit.md` through `mutation-testing.md`) share this minimum set, in this order. A runbook may add headings after them for what is specific to its kind (the end-to-end runbook adds journey selection, the property-based runbook adds property families). A runbook may not drop one; where a heading doesn't apply, it says why in a line.

1. **What it proves**: the question this kind answers, and the principle numbers behind it.
2. **When to write it**: the situations that call for this kind, and when another kind fits better.
3. **Setup**: what must exist first (fixtures, data, services, doubles allowed).
4. **Steps**: numbered, from picking the behavior to a passing test.
5. **Cases to cover**: the happy path, edge cases and errors expected for this kind. For end-to-end, one happy path plus edge cases and errors per feature (P6).
6. **Doubles and patches**: what to keep real and what to replace in this kind, with the mock-assertion rule (P10) where mocks appear.
7. **Determinism and isolation**: the flake risks specific to this kind and their mitigations (P13, P14).
8. **Common mistakes**: the smells that hit this kind, linking `code-smells.md`.
9. **Done check**: a short checklist the test must pass before it is finished.

### Language page sections

Every page has the same sections, in this order:

- Toolchain and verified versions
- Layout and naming
- Fixtures, setup, teardown
- Doubles: stub, mock, autospec equivalent, fake
- Parametrization
- Determinism: time, randomness, network, ordering
- Isolation and cleanup
- Async
- Performance
- Coverage, mutation and property-based tools
- Integration and data: factories, databases, rollbacks
- Anti-patterns
- Further reading, with the ECC testing skill for that language linked first (see below)

Content per language:

- **Python.** pytest, a `conftest.py` section (where it lives, what belongs in it versus a test module, fixture scoping across directories, shared fixtures and hooks, keeping it small), pytest-mock `mocker`, `pretend.stub`, `create_autospec`, the `assert_calls_on` helper from Joe's guide, `src/` layout with `--import-mode=importlib`, strict mode, `tmp_path`, hypothesis, mutmut. Indirect parametrization is documented as supported and marked advanced. Autospec belongs here, not in the principles.
- **TypeScript.** vitest first (Bun runtime), jest differences, MSW, fast-check, Stryker.
- **Rust.** cargo test, nextest, rstest, proptest, mockall. Links ECC `rust-testing`.
- **Shell.** bats-core, shellcheck, stubbing commands through `PATH`.
- **SQL.** pgTAP, rollback isolation, migration tests.

Every language page links the ECC testing skill for that language under "Further reading". ECC has `python-testing` and `rust-testing`. It has no TypeScript, shell or SQL testing skill, so those three pages say so in one line and link ECC's `tdd-workflow` and, for TypeScript, `e2e-testing`. The builder re-checks the ECC checkout for newly added `{language}-testing` skills when writing each page.

## test-driven-development.md

This file becomes the permanent home of the TDD skill.

- Merge Joe's `skills/test-driven-development/` (Iron Law, red-green-refactor, Three Laws, FIRST, Arrange-Act-Assert and Given-When-Then, rationalizations, red flags, the rationale for agents) with ECC `tdd-workflow` (verified-RED gate, per-stage checkpoint commits, evidence table, runner-detection matrix, plan handoff treated as untrusted data).
- Drop ECC-only tooling. Replace ECC's `waitForTimeout` example, which its own e2e skill calls an anti-pattern. Add an ECC (MIT) attribution line.
- Delete `skills/test-driven-development/`. Update every reference in this repo: `AGENTS.md`, `README.md`, `SKILLS.md`, `skills/engineering-principles/SKILL.md` and its `references/principles.md`, `skills/senior-engineering-best-practices/SKILL.md`, the 2026-11-11 engineering-principles spec, and the `reviewing-code` tests playbook.
- Outside this repo, and a separate follow-up: `agent-harness` README, `rules/ecc/common/testing.md`, `dist/CLAUDE.md`. List them in the PR description.
- The `feat/reviewing-skills` branch does not modify the TDD skill, so deleting it causes no merge conflict. The branch does add three files that mention it: `docs/superpowers/specs/2026-11-12-reviewing-skills-design.md`, `skills/reviewing-skills/references/playbooks/discipline-skill.md` and `skills/reviewing-skills/references/worked-example.md`. Whichever branch lands second runs `git grep test-driven-development` and updates what it finds. This work does not edit the other branch.

## Sources and how they are used

- Joe's Backend Testing Style Guidelines: house style, in `test-structure.md`, `doubles.md`, `test-body-template.md` and the Python page. The guide's examples were reconstructed from a private repo; patterns stay, domain names change.
- Google, Software Engineering at Google, chapters 11 to 14, and the Google Testing Blog: behavior over methods, DAMP, test doubles, flake causes. Cited and paraphrased.
- Fowler: Mocks Aren't Stubs, Eradicating Non-Determinism, the Practical Test Pyramid. Taxonomy of doubles and flake causes.
- Microsoft Engineering Playbook (automated testing) and pytest documentation (good practices, fixtures, parametrization, monkeypatch, tmp_path, marks).
- ECC (MIT, Copyright Affaan Mustafa): `tdd-workflow`, `e2e-testing`, `python-testing`, `rust-testing`, `react-testing`. ECC names follow `{language}-testing`.

## Source locations

A builder can read these directly.

- Joe's guide: `/Users/joe/github/joeblackwaslike/joes-tech-docs/Backend Testing Style Guidelines 1c5d530f29e480e5b0dcf9cdcc242ef4_with_inline_examples.md` (local, 2,463 lines). Its appendix defines `assert_calls_on`, so the Python page ships that helper as a documented snippet, not as importable code.
- Joe's TDD skill: `skills/test-driven-development/` in this repo.
- ECC checkout: `/Users/joe/github/affaan-m/ECC`, with `skills/tdd-workflow/SKILL.md`, `skills/e2e-testing/SKILL.md`, `skills/python-testing/`, `skills/rust-testing/` and `skills/react-testing/`. Remote: `github.com/affaan-m/ECC`.
- Web sources, fetched at build time:
  - Google: `https://abseil.io/resources/swe-book/html/ch11.html` through `ch14.html`, and `https://testing.googleblog.com/`
  - Fowler: `https://martinfowler.com/articles/mocksArentStubs.html`, `https://martinfowler.com/articles/nonDeterminism.html`, `https://martinfowler.com/articles/practical-test-pyramid.html`
  - Microsoft: `https://microsoft.github.io/code-with-engineering-playbook/automated-testing/`
  - pytest: `https://docs.pytest.org/en/stable/explanation/goodpractices.html`, plus its fixtures, parametrize, monkeypatch, tmp_path and mark pages

## Delivery

1. This spec is the first commit on `feat/testing-skills`, in the worktree `.worktrees/testing-skills`.
2. After Joe approves the spec, write a plan with `superpowers:writing-plans`, then run it with `superpowers:subagent-driven-development`. Implementers use Sonnet and each works in its own worktree.
3. Author each skill with `superpowers:writing-skills`. Baseline pressure scenarios run on fresh agents without the skill, then with it: a test that reads the real clock or the network, a leaked patch, a bare mock that accepts a wrong call, a `sleep` waiting for async work, and a flaky test retried to green.
4. Verify tool documentation at the time of writing: pytest 9.x (the exact patch version was not confirmed), pytest-mock, vitest, jest, bats, pgTAP, nextest, Playwright.
5. Register both skills in `SKILLS.md` and `README.md`. `make lint-descriptions` must pass (400-character target, 1536 hard cap). Check that every relative link resolves every language page has every section, and every per-kind runbook has the standard headings.
6. Ship as two stacked PRs. PR 1 is `testing-principles`, the TDD move and the reference updates. PR 2 is `testing-code`. Each goes through `/self-review` and `/pr-loop`, then merge, `wt-reap` and a plugin cache check.
7. Links between the two skills. PR 1 refers to `testing-code` runbooks by name in plain text, because those files do not exist yet. PR 2 turns each into a relative link. The link check in PR 1 covers only files that exist; the full check runs in PR 2.
8. ECC links use GitHub URLs (`https://github.com/affaan-m/ECC/blob/main/skills/<name>/SKILL.md`), not skill names, so they resolve for readers who don't have ECC installed. Confirm the default branch name when writing them.

## Acceptance

- `rg -i "test level|levels? of test|test size|small/medium/large"` over both skills finds nothing.
- `git grep test-driven-development` finds no stale skill path inside this repo.
- Each of the nine per-kind runbooks has all nine standard headings, and each language page links its ECC testing skill (or says none exists).
- On each baseline scenario, a fresh agent with the skills avoids the failure that an agent without them shows.
- The descriptions trigger on "write tests for X", "flaky test", "slow tests" and "red green refactor", and do not trigger on diff review.
- After merge, the new skills exist under `~/.claude/plugins/cache/<marketplace>/agent-skills/<sha>/skills/`.

## Open items to verify while building

- The SWE book license. The research reported CC BY-NC-ND 4.0; confirm on abseil.io before relying on it.
- The ECC default branch name, for the outward links.
- The current pytest patch version.

## Left to the builder

Exact topic boundaries within the reference files, wording of each rule, which baseline scenarios to run beyond the five listed, and runbook granularity.
