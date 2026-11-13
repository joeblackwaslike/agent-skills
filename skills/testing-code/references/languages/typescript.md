# TypeScript testing mechanics

How to write the tests the [runbooks](../runbooks/unit.md) describe, in TypeScript with vitest. Standards are in [testing-principles](../../../testing-principles/SKILL.md); the shape of a test body is the [test body template](../test-body-template.md). The thirteen sections match the [Python page](python.md) in order, but this page is shorter: it spends its words where TypeScript differs.

## Toolchain and verified versions

Versions below were checked on 2026-11-13 against the npm registry and each tool's own docs. Re-check before you pin; the numbers move.

| Tool | Version | Needs | Used for |
|---|---|---|---|
| vitest | 5.1.0 | Node `^22.12 \|\| ^24 \|\| >=26` | runner, mocks, fake timers |
| jest | 30.5.2 | | the other runner, differences below |
| msw | 3.0.5 | Node 22.12+ | network boundary |
| fast-check | 4.10.2 | | property-based tests |
| @fast-check/vitest | 0.5.0 | vitest 4.1 or 5 | `test.prop` sugar (version checked only) |
| @stryker-mutator/core, @stryker-mutator/vitest-runner | 10.1.1 | Node 22+ | mutation testing (configuration read from docs, not run) |
| @vitest/coverage-istanbul, @vitest/coverage-v8 | 5.1.0 | | coverage providers |
| vitest-mock-extended | 6.0.1 | | generated typed mocks |
| TypeScript | 7.0.2 (npm `latest`); the examples were first written against 5.9.3 and also pass `tsc --noEmit --strict` on 7.0.2 with no errors | | `tsc --noEmit` over the tests |
| pnpm, Bun, Node | 11.0.8, 1.4.4, 26.13.0 | | the local toolchain these examples ran on |

Default to pnpm for dependencies and Bun as the runtime for application code unless the project already uses another toolchain. Run tools through `pnpm exec` or `bunx`. Run vitest and MSW on Node (see the next paragraph).

```sh
pnpm add -D vitest msw fast-check @vitest/coverage-istanbul   # plus vitest-mock-extended, typescript and @types/node as needed
pnpm exec vitest run
```

The runtime that runs the tests changes the result. The examples on this page passed on Node (`pnpm exec vitest run`: 15 passed, 1 expected fail, 1 todo). The same file under Bun (`bunx --bun vitest run`, forks and threads pools both) passed everything except the MSW tests: requests went out to the real network and failed with `ENOTFOUND`. The lead to look for is this stderr line: `Failed to replace a global value at "_wrapHandle": not a global value.` That is one observation on one machine and the cause is untested. A test that expects any rejection passes spuriously when interception is off, because the real network failure is also a rejection. Make the MSW smoke test assert the status the 404 handler returns, run it first, and trust the suite only once it passes on the runtime you chose. Until you have checked it on your own setup, run vitest on Node and keep Bun for the application. The vitest coverage docs also say the `v8` provider does not work on Bun, so use `istanbul` there.

A minimal config:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    coverage: { provider: 'istanbul', include: ['src/**/*.ts'], exclude: ['src/**/*.test.ts'] },
  },
})
```

`restoreMocks` calls `vi.restoreAllMocks()` before each test, which restores spies made with `vi.spyOn`. Per the docs it leaves mocks made with `vi.fn()` alone, so build those fresh in each test or fixture.

Vitest strips types and does not check them. Add the test files to your `tsconfig.json` and run `pnpm exec tsc --noEmit` in CI, because that check is what keeps a typed double honest (see the doubles section).

### Jest differences

Most vitest test files port to jest and back with these changes. Jest here is 30.5.2.

| Topic | vitest | jest |
|---|---|---|
| Mock namespace | `vi` | `jest` |
| Hoisting of the module-mock call | hoisted by vitest's own transform; `vi` must be imported from `vitest` | hoisted by `babel-jest`; `jest.doMock` is the non-hoisted form |
| Reaching the real module | `await importOriginal()` or `vi.importActual` (async) | `jest.requireActual` (sync) |
| Variables used in a mock factory | `vi.hoisted` | see the `jest.mock` docs (not verified here) |
| Typed mock helper | `vi.mocked(fn)` | `jest.mocked(fn)` and `jest.Mocked<T>` |
| Automock | none unless you call `vi.mock(path)` per module | `automock` config, `jest.createMockFromModule`, `__mocks__` folders |
| Restore | `restoreMocks` restores `vi.spyOn` spies | `jest.restoreAllMocks()` restores `spyOn` spies and `replaceProperty` only |
| Fake timers | `vi.useFakeTimers()`, `vi.advanceTimersByTime`, `vi.setSystemTime` | `jest.useFakeTimers()`, `jest.advanceTimersByTime`, `jest.setSystemTime` |
| One-call exact matcher | `toHaveBeenCalledExactlyOnceWith` | not in the jest docs; use `toHaveBeenCalledTimes(1)` plus `toHaveBeenCalledWith` |
| Expected failure | `test.fails` | `test.failing` |
| Retry-until assertion | `expect.poll`, `vi.waitFor` | not in the jest docs; Testing Library has `waitFor` |
| Parametrize | `test.each`, `test.for` | `test.each` |

Run jest through `pnpm exec jest`. fast-check has a jest connector, `@fast-check/jest`; MSW works with either runner.

## Layout and naming

```text
package.json
tsconfig.json
vitest.config.ts
src/orders/service.ts
src/orders/service.test.ts
test/setup.ts
test/integration/service.db.test.ts
```

- Name files `*.test.ts` and put unit tests beside the code they cover. Vitest finds `**/*.{test,spec}.?(c|m)[jt]s?(x)` by default; narrow it with `include`. Keep slower kinds in a separate directory or suffix (`*.db.test.ts`) so a config or a CLI filter can select them.
- Name each test for the behavior: `it('sends one receipt after a successful charge')`, not `it('works')`. `describe` blocks name the unit; `it` and `test` are the same function.
- Import `describe`, `it`, `expect` and `vi` from `vitest` rather than enabling `globals`. Vitest's `vi.mock` hoisting also depends on `vi` being imported from the package when you use it in a helper file.
- Shared helpers go in `test/` and are ordinary imports. Unlike Python's `conftest.py`, nothing is discovered by magic: a setup file runs only if `setupFiles` lists it.

## Fixtures, setup, teardown

Use `beforeEach` for per-test state. Returning a function from `beforeEach` registers it as that test's cleanup, so setup and teardown stay in one place.

```ts
beforeEach(() => {
  vi.useFakeTimers()
  return () => vi.useRealTimers()
})
```

For a named, typed dependency a test requests by parameter, use `test.extend`. The fixture runs only for tests that destructure it, and what runs after `await use(value)` is the teardown:

```ts
import { type Mock, expect, test, vi } from 'vitest'

const withGateway = test.extend<{ gateway: PaymentGateway & { charge: Mock<PaymentGateway['charge']> } }>({
  gateway: async ({}, use) => {
    const gateway = {
      charge: vi.fn<PaymentGateway['charge']>(),
      refund: vi.fn<PaymentGateway['refund']>(),
    } satisfies PaymentGateway
    await use(gateway)
  },
})

withGateway('starts with no calls', ({ gateway }) => {
  expect(gateway.charge).not.toHaveBeenCalled()
})
```

- The empty destructuring pattern in `async ({}, use)` is required by vitest, which reads the fixture names from the first parameter. It trips ESLint's `no-empty-pattern`, so disable that rule for the line.
- Each test gets its own fixture value, which is the default you want (P13). Create shared, expensive state in `beforeAll` and treat it as read-only.
- Expected values stay in the test or in `const` declarations at the top of its `describe`, not in a distant helper ([values defined far from the test](../code-smells.md#values-defined-far-from-the-test)).
- `setupFiles` is for things every test needs, such as starting the MSW server. Keep it small for the same reason an autouse fixture is small in Python.
- Use `os.tmpdir()` with `fs.mkdtemp`, and remove it in the cleanup. Never write inside the repository.

The [fixtures runbook](../runbooks/fixtures.md) has the steps for deciding what a fixture should build.

## Doubles: stub, mock, autospec equivalent, fake

Choose the double by what the test asserts (see [doubles](../../../testing-principles/references/doubles.md)). A stub supplies data, a mock is an object the test asserts calls on, a fake is a small working replacement.

### Stub

A stub is a plain object literal typed as the interface, so it can only hold what the type allows:

```ts
const charge: Charge = { id: 'ch_123', status: 'succeeded' }
```

Give a stub only the fields the code reads. A cast such as `{} as Charge` or `as unknown as Charge` silences the compiler and brings back the silent-typo failure that a bare `Mock()` has in Python; avoid it, and build the real shape instead.

### Mock and the autospec equivalent

TypeScript has no runtime autospec. The spec is the type system: a mock built from the real signature fails to compile when you pass the wrong arguments or name a method that no longer exists ([stale doubles](../code-smells.md#stale-doubles)). That only works if the tests are type-checked, so run `tsc --noEmit` over them.

Three ways to build a typed mock, in order of preference:

1. **Hand-built from the interface** with `vi.fn` given the method's own type and `satisfies` checking the object has every method:

```ts
const gateway = {
  charge: vi.fn<PaymentGateway['charge']>(),
  refund: vi.fn<PaymentGateway['refund']>(),
} satisfies PaymentGateway
gateway.charge.mockResolvedValue({ id: 'ch_123', status: 'succeeded' })
```

   `mockResolvedValue` is checked against `Promise<Charge>`, so a wrong return shape is a compile error. Add a method to the interface and `satisfies` fails until the mock has it.

2. **`vi.mocked`** to type a function you replaced through `vi.mock`:

```ts
import { sendEmail } from './mailer'
vi.mock('./mailer')

vi.mocked(sendEmail).mockResolvedValue({ queued: true })
```

   `vi.mocked` changes only the type. It does not mock anything. Pass `{ partial: true }` to allow a partial return and `{ deep: true }` to type nested members as mocks.

3. **`vitest-mock-extended`** (6.0.1), for an interface with many methods. `mock<PaymentGateway>()` returns an object whose every method is a mock, and it compiled and worked in the examples here. At runtime it answers any property name, so a typo is caught by the type checker, not by the mock; the compiler is again the spec. I did not check `ts-mockito` or the library's argument-matcher API, so this page does not cover them.

`vi.mockObject(obj)` (from 3.2) mocks every method of a real object and keeps its types; it suits a class you did not write.

Rules that carry over from the [Python page](python.md#doubles-stub-mock-autospec-equivalent-fake):

- Patch where the name is looked up. `vi.mock('./mailer')` replaces the module for every importer, which is blunt; prefer passing the dependency in as a parameter, as the examples do, and reserve `vi.mock` for modules you cannot inject.
- `vi.mock` is hoisted to the top of the file, above the imports. A variable the factory needs must come from `vi.hoisted(() => ...)`, or use `vi.doMock`, which is not hoisted and affects only later dynamic imports. `vi.mock` works only on modules loaded with `import`, not `require`.
- A mock created with `vi.fn()` is not undone by `restoreMocks`; `mockReset()` clears its history and implementation. Building the mock inside `beforeEach` avoids the question.
- `vi.fn(impl)` and `vi.spyOn(obj, 'method')` keep the real behavior until you override it. Use `spyOn` when the real method is fine and you only need to see the calls.
- `vi.when(spy).calledWith(1).thenReturn('one')` (new in vitest 5.0, per its docs) sets a return value per argument list. Use it to stub a lookup that is called with several different inputs.

### Asserting calls

The exact-call rule (P10): a mock assertion lists every call the mock received and fails on any extra one. Asserting only that something was called leaves the arguments and every other call unchecked ([tests that cannot fail](../code-smells.md#tests-that-cannot-fail)).

```ts
expect(gateway.charge).toHaveBeenCalledExactlyOnceWith(token, totalCents)
expect(mailer.sendReceipt).toHaveBeenCalledExactlyOnceWith(email, charge.id)
expect(gateway.refund).not.toHaveBeenCalled()
```

- `toHaveBeenCalledExactlyOnceWith(...args)` checks one call, with those arguments. It is in vitest's expect docs; jest has no matcher by that name.
- For several calls, assert the whole list from `mock.calls`, which is the equivalent of Python's `assert_calls_on(..., exact_count=True)`:

```ts
expect(gateway.charge.mock.calls).toEqual([
  [token, totalCents],
  [token, 100],
])
```

- `toHaveBeenCalledTimes(n)` plus `toHaveBeenNthCalledWith(1, ...)` (counting from 1) also pins every call. Use both together; either alone leaves a gap.
- `toHaveBeenCalledBefore(otherMock)` asserts the order between two mocks.
- `expect(mock).not.toHaveBeenCalled()` is the not-called assert from the template.
- To say a collaborator with several methods was untouched, assert each method, or check `mock.calls` on each. There is no whole-object matcher.

### Fake

A fake is a small working stand-in, such as an in-memory repository (`new Map()` behind `save` and `get`). Use one when the test cares about the outcome, not the calls ([change-detector tests](../code-smells.md#change-detector-tests)), and test it against the same contract as the real one when it stands in for a boundary.

## Parametrization

`test.each` and `describe.each` run one body over several rows. They replace a loop in a test (P3, [logic in tests](../code-smells.md#logic-in-tests)). Write the expected value as a literal in each row.

```ts
test.each([
  { cents: 0, expected: '$0.00' },
  { cents: 5, expected: '$0.05' },
  { cents: 123456, expected: '$1,234.56' },
])('formats $cents as $expected', ({ cents, expected }) => {
  expect(formatPrice(cents)).toBe(expected)
})
```

- Rows as objects let the title use `$field` names, so a failure names the case. Rows as arrays use printf placeholders (`%s`, `%d`, `%i`, `%j`, `%#` for the index).
- `test.for` is the alternative that passes the row as a single argument and gives access to the test context; `test.each` exists for jest compatibility. Pick one per project.
- A tagged template table (`` test.each`a | b | expected` ``) reads well for small tables.
- Do not compute the expected value from the inputs. When the combinations need an `if` in the assert, list explicit rows.

## Determinism: time, randomness, network, ordering

### Time

1. **Inject a clock.** Take `now: () => Date` as a parameter, pass a fixed one in the test. It needs no library and works under async code.
2. **Fake timers** when you cannot change the signature or you test `setTimeout` and `setInterval` behavior:

```ts
beforeEach(() => {
  vi.useFakeTimers()
  return () => vi.useRealTimers()
})

it('calls the function every interval until stopped', () => {
  const tick = vi.fn()
  const stop = startPolling(tick, 1000)

  vi.advanceTimersByTime(3000)
  stop()
  vi.advanceTimersByTime(3000)

  expect(tick).toHaveBeenCalledTimes(3)
})
```

   `vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))` sets what `Date` returns without firing timers. Called without fake timers it mocks only `Date`. `vi.useFakeTimers()` does not fake `process.nextTick` or `queueMicrotask`; opt in with `toFake`. Use the `*Async` variants (`advanceTimersByTimeAsync`) when the callbacks await promises.

   Always restore real timers in cleanup. A faked clock left on leaks into the next test in the file ([shared mutable state](../code-smells.md#shared-mutable-state)).

### Randomness

Inject the generator or seed it. `vi.spyOn(Math, 'random').mockReturnValue(0.5)` works for a stray `Math.random()` call. fast-check prints the seed of a failing run, and `fc.assert(property, { seed })` replays it.

### Network

Intercept at the network boundary with MSW so the code under test uses its real HTTP client. The MSW 3 migration notes move the handlers to entry points (`msw/http`, `msw/node`) and rename the unhandled option to `onUnhandledFrame`:

```ts
import { http, HttpResponse } from 'msw/http'
import { setupServer } from 'msw/node'

const server = setupServer()
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('throws on a 404', async () => {
  server.use(http.get('https://api.example.com/users/8', () => new HttpResponse(null, { status: 404 })))

  await expect(fetchProfile('https://api.example.com', '8')).rejects.toThrow('profile 8: 404')
})
```

`onUnhandledFrame: 'error'` makes a request with no handler fail the test instead of reaching the internet, which is the TypeScript counterpart of blocking sockets. Use handlers per test with `server.use`; `resetHandlers` removes them. Put the `listen`, `resetHandlers` and `close` lines in a `setupFiles` module so every test gets them. The rename matters. On msw 3.0.5 the 2.x name `onUnhandledRequest: 'error'` is still accepted but ignored: MSW prints a warning and the request goes to the network (checked against a local HTTP server, where it returned the real response, while `onUnhandledFrame: 'error'` threw). The migration notes list `msw/http` as the new home of `http` and `HttpResponse`, so this page imports from there. `import { http } from 'msw'` also works on 3.0.5 and is the same function, so the entry point is a style choice. See the Bun note in the first section before you rely on interception under Bun.

### Ordering

Shuffle to find tests that depend on their neighbors: `pnpm exec vitest run --sequence.shuffle --sequence.seed=1000`. Report the seed with a failure so the order can be replayed. Within a file tests run in order; across files they run in parallel in separate processes by default.

## Isolation and cleanup

- Each test file runs in its own isolated environment, in a forked child process by default (`pool: 'forks'`). State in module scope is shared by the tests in one file, not across files.
- `restoreMocks: true`, `unstubGlobals: true` and `unstubEnvs: true` in the config undo `vi.spyOn`, `vi.stubGlobal` and `vi.stubEnv` for you before each test. Without them call `vi.unstubAllEnvs()` and `vi.unstubAllGlobals()` in cleanup.
- Use `vi.stubEnv('NAME', 'value')` for environment variables instead of writing to `process.env`.
- Reset module-level caches in `beforeEach`, or call `vi.resetModules()` and re-import.
- Prefer self-cleaning helpers over `try/finally` in the test body. A listener or server started in a test needs a matching close in the cleanup returned from `beforeEach`.
- `server.close()` and `vi.useRealTimers()` are the two cleanups people forget; both leak across tests in the same file.

## Async

- Return or `await` the promise. A test that starts async work and does not await it passes before the work runs. Assert rejections with `await expect(promise).rejects.toThrow(...)`.
- Wait on a condition, not on time. `vi.waitFor(() => { if (!ready) throw new Error('not ready') })` retries the callback until it stops throwing or times out. `expect.poll(() => value).toBe(true)` retries the whole assertion and must be awaited; `.resolves`, `.rejects` and `toThrow` do not work with it. This is the fix for a [bare sleep](../code-smells.md#bare-sleeps).
- With fake timers enabled, `vi.waitFor` and `expect.poll` advance the fake clock between attempts, so they do not hang. They advance it one poll interval at a time, so the real time they cost grows with the fake delay. For an instant test, call `await vi.advanceTimersByTimeAsync(delayMs)` and assert after it.
- `test.concurrent` runs tests in one file at the same time. Use it only for tests that share nothing; sequential is the safe default.
- A hung test needs a limit: set `testTimeout` in the config. Treat a timeout as a failure to investigate, not a number to raise.
- Jest has no `vi.waitFor` or `expect.poll`; the Testing Library `waitFor` plays that role there.

## Performance

Measure first ([slow tests runbook](../slow-tests.md)). The vitest levers:

- Files run in parallel across workers by default; `maxWorkers` caps them. Tests inside a file run in order unless marked `concurrent`.
- `pool: 'forks'` is the default and the safest for native modules; `threads` is lighter but cannot use `process.chdir()` and some native libraries crash in it. The Stryker vitest runner defaults to threads.
- `isolate: false` skips the per-file environment and can speed up suites with no module-level side effects. Disable isolation only after a shuffled run passes.
- `vitest run --shard=1/3` splits a suite across CI machines.
- `vitest run --changed` or `related` runs only what the diff touches while iterating. Run the whole suite before you push.
- Do not buy speed with determinism: no real `setTimeout` waits to make a test pass faster, and no shared mutable fixtures.

## Coverage, mutation and property-based tools

**Coverage.** Two providers, selected with `coverage.provider`: `v8` (the default, native, faster, needs a V8 runtime) and `istanbul` (instrumented, works on any runtime). Install `@vitest/coverage-v8` or `@vitest/coverage-istanbul`, then `pnpm exec vitest run --coverage`. Set `coverage.include` so files no test imports still appear in the report. Branch coverage shows the `if` whose other side never ran. Coverage shows what the suite never executed, not whether the executed code is checked; use mutation testing for that.

**Mutation: Stryker** (10.1.1 with the vitest runner). Create `stryker.config.json`:

```json
{
  "testRunner": "vitest",
  "mutate": ["src/**/*.ts", "!src/**/*.test.ts"],
  "vitest": { "related": true }
}
```

Run `bunx stryker run` or `pnpm exec stryker run`, and do not add `bunx --bun` to it. This page did not test Stryker's vitest runner on Bun, and the Bun result above is a reason to keep mutation runs on Node. The runner is single-threaded per Stryker worker, bails on the first failing test for each mutant, and turns off vitest's own coverage; `vitest.related` (default true) runs only tests that import the mutated file, so turn it off when your tests reach the code through an HTTP call. A surviving mutant is a missing or weak assertion. The [mutation testing runbook](../runbooks/mutation-testing.md) has the procedure. This page read these options from the Stryker docs and did not run a mutation pass.

**Property-based: fast-check** (4.10.2). State a property that always holds and let it search for a counterexample, which it shrinks.

```ts
import fc from 'fast-check'

it('always has two decimals', () => {
  fc.assert(
    fc.property(fc.nat(10_000_000), (cents) => /\.\d{2}$/.test(formatPrice(cents))),
  )
})
```

`fc.assert` throws with the seed and the shrunk counterexample on failure; pass `{ seed, numRuns }` to replay or widen a run. `@fast-check/vitest` adds `test.prop`. The [property-based runbook](../runbooks/property-based.md) covers choosing properties.

## Integration and data: factories, databases, rollbacks

Build test data with a factory function that takes overrides for the one value the test cares about ([values defined far from the test](../code-smells.md#values-defined-far-from-the-test)):

```ts
let nextId = 0

export function makeUser(overrides: Partial<User> = {}): User {
  nextId += 1
  return { id: `user-${nextId}`, email: `user-${nextId}@example.com`, isMember: false, ...overrides }
}
```

Typing the return as `User` makes a renamed field a compile error in every factory call. Faker (`@faker-js/faker`) is an option for varied values; this page did not verify it.

Databases:

- **Rollback per test** is the fast default: open a transaction in `beforeEach`, hand the transaction to the code under test, roll it back in the cleanup. It works only when the code uses the connection you passed in.
- **Truncate after each test** when the code opens its own connections and a surrounding transaction cannot contain its writes.
- Run migrations once in `globalSetup` against a throwaway database, then rely on rollback or truncate per test.
- Under parallel files, give each worker its own database or schema. The vitest `setupFiles` docs name `process.env.VITEST_POOL_ID` as the per-worker value to build that name from; I did not run it here.
- Never rely on rows another test inserted.
- Keep database tests in a separate directory or suffix so a unit run can skip them.

The [integration runbook](../runbooks/integration.md) has the steps. For browsers see the [Playwright runbook](../runbooks/playwright.md) and the [React runbook](../runbooks/react.md).

## Anti-patterns

The shared list is in [code smells](../code-smells.md). The ones that show up most in TypeScript suites:

- Casting a double through `as unknown as T` or `as any` to make it compile ([stale doubles](../code-smells.md#stale-doubles)). Build the real shape, or use `satisfies`.
- Tests that are never type-checked, so a typed mock gives no protection.
- `expect(mock).toHaveBeenCalled()` alone, which leaves arguments and extra calls unchecked ([tests that cannot fail](../code-smells.md#tests-that-cannot-fail)).
- `vi.mock` of a module the test could have received as a parameter, plus mock setup longer than the behavior ([over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup)).
- A loop or conditional in the body to build the expected value ([logic in tests](../code-smells.md#logic-in-tests)).
- `await new Promise((r) => setTimeout(r, 500))` to wait for work ([bare sleeps](../code-smells.md#bare-sleeps)). Use `vi.waitFor` or `expect.poll`.
- Fake timers or a stubbed global left on after the test ([shared mutable state](../code-smells.md#shared-mutable-state)).
- A `.only` committed by accident. Vitest's `allowOnly` already defaults to false when the `CI` environment variable is set, so a run containing `.only` fails there. Set `allowOnly: false` explicitly if your CI does not export `CI`.
- `toThrow()` with no argument, which passes on any error including a typo.
- Snapshot assertions of a whole large object, which nobody reads when they change.
- A `skip` or `todo` with no reason, owner or date.

### Quarantining a flaky test

The [quarantine runbook](../flakes/quarantine.md) decides whether to quarantine and which mechanism to use. The syntax:

```ts
test.fails(
  'worker publishes event (flaky: depends on startup order, tracked in ORDERS-412, owner ada, review 2026-12-01)',
  async () => {
    // body unchanged
  },
)

test.skip(
  'retry gives up after three attempts (cost: hits paid API, tracked in ORDERS-418, owner ada, review 2026-12-01)',
  () => {},
)

test.todo('refunds when the receipt fails')
```

- `test.fails` expects the body to fail and reports a failure if it passes, with the failures counted in the run summary (vitest 4.1 and later). It suits a test that fails on every run, so the day the fix lands the marker must come off. It is an exact inverse, so it does not suit a test that only fails sometimes.
- For a test that is flaky, not always failing, `test.fails` will break the run on the passing days. Use the separate non-gating job instead: tag the tests and select by name pattern or a project, and run that job without gating the merge.
- `retry` (config or per test) reruns a failure. It hides a flake rather than quarantining it, so the runbook's tracking still applies.
- `test.skip` and `test.skipIf(cond)` remove the test from the run. Use them only when running it has a cost.
- `test.todo` lists an unwritten test in the report. It is a placeholder, not a quarantine.
- Jest's names differ: `test.failing` instead of `test.fails`.
- Vitest has no per-test reason argument; the title or a comment carries the owner, date and link, so make the title searchable.

## Further reading

- ECC has no TypeScript testing skill. Its [tdd-workflow](https://github.com/affaan-m/ECC/blob/main/skills/tdd-workflow/SKILL.md) and [e2e-testing](https://github.com/affaan-m/ECC/blob/main/skills/e2e-testing/SKILL.md) skills (MIT, Copyright Affaan Mustafa) cover the workflow and browser journeys. Nothing on this page is copied from them.
- In this skill: the [Playwright runbook](../runbooks/playwright.md), the [React runbook](../runbooks/react.md), the [fixtures runbook](../runbooks/fixtures.md) and the [patching runbook](../runbooks/patching.md).
- [Vitest mocking](https://vitest.dev/guide/mocking), [`vi` API](https://vitest.dev/api/vi), [`expect` API](https://vitest.dev/api/expect), [mock functions](https://vitest.dev/api/mock), [test API](https://vitest.dev/api/test), [timers](https://vitest.dev/guide/mocking/timers), [coverage](https://vitest.dev/guide/coverage) and [parallelism](https://vitest.dev/guide/parallelism).
- [Jest `jest` object](https://jestjs.io/docs/jest-object), [mock functions](https://jestjs.io/docs/mock-functions) and [timer mocks](https://jestjs.io/docs/timer-mocks).
- [MSW quick start](https://mswjs.io/docs/quick-start), [Node integration](https://mswjs.io/docs/integrations/node) and the [2.x to 3.x migration](https://mswjs.io/docs/migrations/2.x-to-3.x).
- [fast-check quick start](https://fast-check.dev/docs/tutorials/quick-start/) and [Stryker vitest runner](https://stryker-mutator.io/docs/stryker-js/vitest-runner/).
- [vitest-mock-extended](https://www.npmjs.com/package/vitest-mock-extended).

Where it comes from: the exact-call rule and test body order are this skill's house style, shown here with vitest matchers. The rest is paraphrased from the tool documentation linked above and checked on 2026-11-13; the examples on this page were run with vitest 5.1.0 on Node.
