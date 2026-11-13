# Playwright runbook

How to drive a browser journey with Playwright Test so it stays stable. Use it together with the [end-to-end](end-to-end.md) runbook, which says which journeys to write. This page is the browser mechanics. Checked against the Playwright docs on 2026-11-13, when the current release was 1.65.

## 1. Locate by role first, test id when role is not enough

1. Try `getByRole` with a name, then `getByLabel` and `getByText`. These match what a user sees.
2. If the element has no stable role or text, add a `data-testid` to the markup and use `getByTestId`. Playwright reads `data-testid` by default and the attribute name is configurable.
3. Never use CSS class chains or XPath. A restyle breaks them.

## 2. Wrap pages in page objects

A page object holds locators and user-level actions for one page. The test holds the journey and the assertions.

```typescript
import { type Page, type Locator } from '@playwright/test'

export class ItemsPage {
  readonly searchInput: Locator
  readonly itemCards: Locator

  constructor(private readonly page: Page) {
    this.searchInput = page.getByRole('searchbox')
    // item cards have no role or text a user would name, so they carry a test id
    this.itemCards = page.getByTestId('item-card')
  }

  async goto() {
    await this.page.goto('/items')
  }

  async search(query: string) {
    await this.searchInput.fill(query)
  }
}
```

```typescript
import { test, expect } from '@playwright/test'
import { ItemsPage } from './pages/items-page'

const SEARCH_TERM = 'lamp'
const MATCHING_ITEMS = ['Brass lamp', 'Desk lamp']

test('search narrows the list to matching items', async ({ page }) => {
  const items = new ItemsPage(page)
  await items.goto()

  await items.search(SEARCH_TERM)

  await expect(items.itemCards).toHaveText(MATCHING_ITEMS)
})
```

`toHaveText` with an array checks every card and the count, so an unfiltered list fails the test. The two item names come from the data the journey seeds.

- Actions return nothing or the next page object. Assertions stay in the test, so a failure shows the expectation.
- Keep one page object per page or component. Share nothing mutable between them (P13).

## 3. Wait with auto-wait, never with sleeps

Locator actions wait for the element to be actionable, and web-first assertions (`await expect(locator)...`) retry until the condition holds or the timeout ends.

1. Perform the action on a locator.
2. Assert on the visible result with `await expect(...)`. The `await` goes before `expect`.
3. If the next step depends on a network response, wait for that response, started before the click that triggers it.
4. Do not read a value and compare it by hand (`expect(await el.isVisible()).toBe(true)`). That check does not wait.

Anti-pattern to remove on sight is `await page.waitForTimeout(5000)`. A fixed pause is too short on a slow runner and wastes time on a fast one (P14). Replace it with the assertion or response wait it was standing in for.

## 4. Isolate each test

Playwright gives each test a fresh browser context. Keep it that way (P13).

- Create the account and data a journey needs through the API or a setup fixture, not through another test.
- No test relies on another having run. See [fixtures](fixtures.md) for building and tearing down state.
- Double only third parties you cannot run. Intercept at the network edge with `page.route`, not inside the app.

## 5. Config for CI

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  forbidOnly: !!process.env.CI,
  failOnFlakyTests: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    trace: 'on-first-retry',
  },
})
```

- `forbidOnly` fails the run if a stray `test.only` is committed.
- `failOnFlakyTests` makes the run exit non-zero when a test passed only on retry. Without it a retried pass exits 0 and the flake disappears from the result, which P15 forbids.
- `retries` give you a trace of a failure and let the report count flaky tests. A test that passes on retry is flaky, so handle it with the steps in section 7 (P15), and record it as described in [flakes/tracking.md](../flakes/tracking.md).
- `workers: 1` on CI is a conservative start. Raise it once the journeys are isolated; the default is half the logical cores.
- `trace: 'on-first-retry'` records a trace on the first retry of a failed test only. With `retries: 0`, as on a developer machine, nothing is recorded. Open it with `bunx playwright show-trace trace.zip`, or from the HTML report.

## 6. Traces with context.tracing

Prefer the config option above. Use `context.tracing` only when you need a trace outside the test runner or around part of a test.

```typescript
await context.tracing.start({ screenshots: true, snapshots: true })
// actions
await context.tracing.stop({ path: 'artifacts/trace.zip' })
```

Do not use `browser.startTracing` for this; it records a Chromium performance trace, separate from the Playwright trace.

## 7. Check for flakes

1. Run the test many times: `bunx playwright test path/to/file.spec.ts --repeat-each=20`.
2. Run it again with several workers to expose shared state.
3. A failure in any run means a flake. Classify the cause with the [flake categories](../../../testing-principles/references/flakes/categories.md), fix the cause, and repeat.
4. If the fix cannot land now, quarantine the test by following [flakes/quarantine.md](../flakes/quarantine.md). It names the owner and the deadline; do not delete the test and do not retry it to green (P15). Mark it with `test.fail()`, which keeps running the test and reports when it unexpectedly passes. Use `test.fixme` (the test does not run) only as the dated-skip fallback that quarantine.md describes.

## Common mistakes

- Fixed sleeps in place of conditions: [bare sleeps](../code-smells.md#bare-sleeps).
- Selectors tied to markup structure: [change-detector tests](../code-smells.md#change-detector-tests).
- Journeys that share an account: [shared mutable state](../code-smells.md#shared-mutable-state).
- Raising retries until the suite is green: see the flake steps above (P15).

## Done check

- [ ] Locators use role, label, text or `data-testid`.
- [ ] Page objects hold actions; tests hold assertions.
- [ ] No fixed sleeps; assertions are awaited.
- [ ] `forbidOnly`, `failOnFlakyTests`, `retries`, `workers` and `trace: 'on-first-retry'` are set for CI, and flaky passes are recorded.
- [ ] The test passed `--repeat-each` runs, alone and in parallel.

More patterns, including report templates and CI wiring, in the ECC [e2e-testing skill](https://github.com/affaan-m/ECC/blob/main/skills/e2e-testing/SKILL.md).

Adapted in part from ECC e2e-testing (MIT, Copyright Affaan Mustafa): the page object shape, CI config and `--repeat-each` flake check.
