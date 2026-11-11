# React components (JSX and TSX)

*Leans on: separation of concerns, make illegal states unrepresentable, least astonishment, KISS.*

A component is a function from props and state to UI. Most component bugs come from state that lives in the wrong place, effects that shouldn't exist, and props that promise more than the component needs.

- **One job per component.** Fetching, state management and presentation are separated once a component grows. A 400-line component with five `useState` calls and three effects is a god class.
- **Props are an interface.** Typed, narrow (pass the fields rendered, not the whole record), with required and optional chosen deliberately. A pile of boolean props (`primary`, `secondary`, `danger`) becomes one `variant: "primary" | "danger"`. Composition with `children` beats a growing list of configuration props.
- **State in the right place.** Derive what can be derived during render instead of storing it, and don't copy props into state. Lift state only as far as the nearest common owner. Server data belongs in a data-fetching cache (TanStack Query, SWR) or a Server Component, not a hand-rolled `useEffect` plus `useState`. Filters, tabs and pagination belong in the URL.
- **Illegal states.** Independent `isLoading`, `isError` and `data` flags allow "loading and failed" at once; a discriminated union on `status` doesn't.
- **Effects only synchronize with external systems.** Effects that compute derived values, respond to user events, or chain state updates are findings ([You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)). Each effect has complete dependencies (`eslint-plugin-react-hooks` enforces this), cleans up subscriptions, timers and requests (`AbortController`), and works when run twice in development Strict Mode.
- **Rules of Hooks.** Hooks are called unconditionally at the top level, and custom hooks start with `use`.
- **Lists and keys.** Keys are stable ids from the data, never the array index for lists that reorder, filter or insert.
- **Memoization on evidence.** `useMemo`, `useCallback` and `memo` are added for a measured problem, not sprinkled everywhere; the React Compiler, where the project uses it, handles most of it.
- **Every state is designed.** Loading, empty, error and success are each rendered deliberately. Error boundaries wrap sections that can fail independently, and Suspense fallbacks don't shift the layout.
- **Forms.** Every input has a label, errors are tied to their fields, double submits are prevented, and the server validates again, ideally with the same schema the client uses.
- **Security.** No `dangerouslySetInnerHTML` with unsanitized input (DOMPurify if HTML must be rendered), no user-controlled `href` that could be a `javascript:` URL, and no secrets in client code.
- **Tests.** React Testing Library queries by role and label, the way users find elements, and asserts behavior. Large snapshot tests are noise nobody can review.
