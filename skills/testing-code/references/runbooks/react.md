# React runbook

How to test React components with Testing Library, user-event and MSW. Pick the kind first from the [unit](unit.md) or [functional](functional.md) runbook; use the [end-to-end](end-to-end.md) and [Playwright](playwright.md) runbooks when you need a real browser. Verified against the Testing Library docs, user-event 14 and MSW 3 docs on 2026-11-13.

## 1. Render and query like a user

1. Render with the providers the component has in production (router, query client, theme). Build one `renderWithProviders` helper; give it a fresh client per call so cache state cannot leak between tests (P13).
2. Find elements in this order, taking the first that works:
   1. `getByRole` with a `name`, the first choice for almost everything
   2. `getByLabelText` for form fields
   3. `getByPlaceholderText`, `getByText`, `getByDisplayValue`
   4. `getByAltText`, `getByTitle`
   5. `getByTestId`, only when nothing above fits
3. If no role query works, consider whether the UI is inaccessible. Fixing that is better than adding a test id.
4. Pick the variant by intent: `getBy` expects the element now, `queryBy` asserts absence (it returns null), `findBy` waits for an element that appears after async work.

## 2. Interact with userEvent

1. Create the session once per test: `const user = userEvent.setup()`.
2. `await` every call: `await user.type(...)`, `await user.click(...)`.
3. Prefer it over `fireEvent`, which dispatches one DOM event. `userEvent` runs the whole interaction, with the focus and key sequence a browser would produce. Use `fireEvent` only for an event `userEvent` cannot yet produce.

## 3. Wait on conditions

- Element that appears: `expect(await screen.findByText(LOADED_TEXT)).toBeInTheDocument()`.
- Side effect: `await waitFor(() => expect(...))`.
- Element that goes away: `await waitForElementToBeRemoved(...)`.
- No `setTimeout` waits (P14).

## 4. Mock the network with MSW

MSW intercepts requests at the network level, so the component, its hooks and its fetch library run unchanged. Double the server, not your own modules (P8, P12).

1. Define handlers for the happy path in one file and create the server with `setupServer(...handlers)`.
2. In the test setup file: `beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))`, `afterEach(() => server.resetHandlers())`, `afterAll(() => server.close())`.
3. `onUnhandledFrame: 'error'` makes a request with no handler fail the test. The default only warns. The option is `onUnhandledFrame` in MSW 3 (checked against 3.0.5 on 2026-11-13). Earlier MSW versions named it `onUnhandledRequest`; use whichever name your installed version documents.
4. A test that needs a different response calls `server.use(...)` with an override. `resetHandlers` removes it after the test, so it is undone automatically (P13).
5. Keep the response values as named constants shared by the handler and the assertion (P4).
6. Relative handler URLs such as `/api/users/1` need the test environment to supply a base URL. In jsdom the base is the URL the environment is configured with, so confirm yours sets one; without it, use absolute URLs.
7. Check the handlers against the real API with a [contract](contract.md) test, or they go stale (P11).

```tsx
import { http, HttpResponse } from 'msw'
import { server } from './server'
import { renderWithProviders, screen } from './test-utils'

const USER_ID = '1'
const USER_URL = `/api/users/${USER_ID}`
const SERVER_ERROR_STATUS = 500

test('shows the error state when the server fails', async () => {
  server.use(http.get(USER_URL, () => new HttpResponse(null, { status: SERVER_ERROR_STATUS })))

  renderWithProviders(<UserPage id={USER_ID} />)

  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
})
```

To assert the request a component sent, record it inside the handler and check it after the user action:

```tsx
import userEvent from '@testing-library/user-event'

const NEW_NAME = 'Alice'
const USERS_URL = '/api/users'
const CREATED_STATUS = 201

test('saving posts the entered name once', async () => {
  const bodies: unknown[] = []
  server.use(
    http.post(USERS_URL, async ({ request }) => {
      bodies.push(await request.json())
      return HttpResponse.json({ id: USER_ID }, { status: CREATED_STATUS })
    }),
  )
  const user = userEvent.setup()
  renderWithProviders(<UserForm />)

  await user.type(screen.getByLabelText('Name'), NEW_NAME)
  await user.click(screen.getByRole('button', { name: /save/i }))

  expect(await screen.findByText(/saved/i)).toBeInTheDocument()
  expect(bodies).toEqual([{ name: NEW_NAME }])
})
```

Recording every body in an array and comparing the whole array means a double submit fails the test (P10).

## 5. What stays out

- Do not assert on state, props passed to children, or render counts (P2).
- Do not mock React or your own child components by default.
- Do not use snapshot tests of rendered markup as a stand-in for assertions.
- Layout, scrolling, drag and drop and iframes need a real browser: see [Playwright](playwright.md).

## Common mistakes

- Querying by test id first, or by class: [change-detector tests](../code-smells.md#change-detector-tests).
- Waiting with timers: [bare sleeps](../code-smells.md#bare-sleeps).
- A shared query client or server handler left over from another test: [shared mutable state](../code-smells.md#shared-mutable-state).
- Mocking the component's own modules instead of the network: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).

## Done check

- [ ] Queries follow the priority order; test id only as a last resort.
- [ ] Interactions use `userEvent.setup()` and are awaited.
- [ ] MSW errors on unhandled requests and handlers reset after each test.
- [ ] No timers; waits poll a condition.
- [ ] Asserts cover what the user sees and the request sent.

More patterns (hooks, accessibility checks with axe, error and suspense boundaries) in the ECC [react-testing skill](https://github.com/affaan-m/ECC/blob/main/skills/react-testing/SKILL.md).

Adapted in part from ECC react-testing (MIT, Copyright Affaan Mustafa): the provider helper, MSW setup and per-test override pattern.
