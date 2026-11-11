# Part 2: Code Review Playbooks

> Snapshot of [Code-Review-Guide-and-Playbooks.md](https://github.com/joeblackwaslike/ai-review-bot/blob/main/docs/Code-Review-Guide-and-Playbooks.md) in ai-review-bot, copied verbatim on 2026-11-07 (last source commit 6ea9ab3). Edit the source, not this copy.
>
> Per-kind-of-change checks. The guide's principles are in [guide-principles.md](guide-principles.md); language notes are in [language-notes.md](language-notes.md).


These playbooks are the companion to the code review guide in Part 1. The guide's principles and its four groups apply to every diff; some kinds of change also have their own failure modes and deserve a dedicated pass. Each playbook names the principles it leans on most, then lists what to check. Use every playbook that matches the diff: a pull request that adds an endpoint, a table and a migration gets three passes on top of the general review.

| Group | Playbooks | Use when the diff |
| --- | --- | --- |
| Intent | Reviewing code against its spec · Design specs and plans | Implements a spec, plan or ticket (nearly always), or is itself a spec |
| APIs | New API endpoints · Endpoint schema changes, versioning and deprecation · Code that validates user input · Authentication and authorization | Adds or changes an endpoint, a request or response model, a validator, or anything touching identity and permissions |
| Frontend | React components (JSX and TSX) · Next.js · Accessibility · CSS and styling · HTML artifacts | Adds or changes UI components, pages, styles, or standalone HTML files |
| Data | Data modeling · Queries and indexes · SQL files and raw queries · Migrations and deployment sequencing | Adds or changes tables, ORM models, queries, `.sql` files, indexes or migrations |
| Runtime | Code on the critical path · Background jobs, queues and events · Logging and error logging | Touches a hot or business-critical path, asynchronous work, or what gets logged |
| Infrastructure | Shell scripts (Bash and zsh) · Dockerfiles and container images · Infrastructure as code · Configuration files | Changes scripts, container images, Terraform, Kubernetes, Compose, CI or application config |
| Tests | Tests: levels, coverage, gaps and TDD · Test code itself | Adds or changes tests, fixtures or test helpers |
| Supporting changes | Documentation and Markdown · New dependencies | Changes docs or Markdown files, `package.json`, `pyproject.toml` or a lockfile |
| Agent and AI tooling | LLM prompts · Skills and instruction files · Agent rules files and subagents · Hooks and commands · Agent workflows · AI-generated and AI-assisted code | Changes prompts, `SKILL.md` files, `AGENTS.md` or `CLAUDE.md`, subagent definitions, hooks, commands or agent orchestration, or was largely written with an AI tool |

## Reviewing code against its spec

*Leans on: YAGNI and KISS (no more), Fail Fast (no less), Chesterton's Fence, least astonishment.*

The diff shows what was built; the spec, plan, ticket or design doc shows what was meant. A review without the spec can check that code is well written, but not that it is the right code. The standard is that what was specified is what was written: no more and no less.

**Use the spec to understand the code**

- **Read it before the diff.** The PR description should link the spec, ADR, design doc or ticket. If it doesn't, ask for it before reviewing in depth. Code with no stated intent can only be reviewed for style.
- **Learn the vocabulary.** Domain terms, states and rules in the spec should appear in the code as names, types and transitions. When the code uses different words for the same thing, that is a least-astonishment finding and often a sign of a misunderstanding.
- **Find the intended use.** The spec says who calls this, how often, with what data, and what matters most. That decides which review concerns dominate: an internal batch job and a public endpoint deserve different scrutiny.
- **Find what was deliberately left out.** Non-goals and out-of-scope sections matter as much as requirements. They tell you which missing features are not gaps.

**Check conformance: no less**

- **Trace each requirement.** Go through the spec's requirements or acceptance criteria and find, for each, the code that implements it and the test that proves it. The requirements table in the guide's PR description template makes this quick for both author and reviewer.
- **Edge cases and errors the spec names.** Specs often state behavior for invalid input, limits, permissions and failure. These are the easiest parts to skip in implementation.
- **Non-functional requirements.** Latency targets, data retention, audit logging, rate limits and access rules are requirements too.

**Check conformance: no more**

- **Everything in the diff traces to the spec.** Extra endpoints, fields, options, flags, configuration or abstractions not in the spec are YAGNI by definition, however reasonable they look. Either the spec should change to include them, or they come out.
- **Scope creep from the author's judgment.** "While I was in here" changes, a broader refactor, or a generalization for future features belong in a separate PR, or a spec update, with their own review.
- **No silent reinterpretation.** If the code does something different from the spec because the author found a better way, that may be right, but it must be stated, agreed and written back into the spec.

**Watch for drift**

Drift is when the spec and the code disagree and nobody decided they should. It accumulates quietly and makes the spec useless as a reference.

- **When code and spec disagree, decide which is right**, then fix the other in the same PR or with a linked follow-up. Don't leave both standing.
- **Specs are versioned with the code** where possible (ADRs and design docs in the repository), so a PR that changes behavior also shows the spec change in the same diff.
- **Check earlier decisions before reversing them.** Chesterton's Fence: if the code contradicts an ADR or a documented decision, find out whether the decision was superseded or the code is wrong.
- **Generated contracts help.** An OpenAPI schema, a database schema dump or a JSON schema checked into the repository turns some drift into a visible diff, and contract tests turn it into a failing build.

## Design specs and plans

*Leans on: Gall's Law, YAGNI, KISS, Conway's Law, Chesterton's Fence.*

Reviewing a spec before code exists is the cheapest review there is: a wrong boundary costs a comment instead of a rewrite. Apply the same four groups, one level up.

- **The problem before the solution.** Can you state the problem and who has it in one sentence? Are there measurable success criteria? A spec that opens with the solution often solves the wrong problem.
- **Goals and non-goals.** Explicit non-goals prevent scope creep in the implementation and give the code reviewer a way to say "no more" later.
- **Alternatives considered.** At least one simpler alternative, including "do nothing" or "use what we have", with a reason it was rejected. A spec that considers no alternatives hasn't been designed, just described.
- **Smallest working version.** Gall's Law: is there a thin vertical slice that delivers value first? Plans that need several new services, queues or databases before the first request works are a red flag.
- **Interfaces and data first.** The API contracts, data model and events are spelled out, since they are the expensive parts to change. Internal implementation detail can stay loose.
- **Failure and operations.** What happens when each dependency fails, how it is deployed and rolled back, how migrations are sequenced, what is monitored and who is paged.
- **Security and data.** Who can access what, what personal data is stored and for how long, and where trust boundaries are.
- **Ownership and boundaries.** Conway's Law: do the proposed service and module boundaries match the teams that will own them?
- **Earlier decisions.** Does it contradict an existing ADR or established pattern? If so, it should say so and why.
- **Testable requirements.** Each requirement can be checked by a test or a measurement. "Fast" and "scalable" aren't requirements; "p95 under 200 ms at 500 requests per second" is.
- **Open questions listed.** Unknowns are named with an owner, rather than hidden in confident prose.

Plans for a sequence of PRs get one more check: each step should leave the system working and deployable, as in expand and contract.

## New API endpoints

*Leans on: Hyrum's Law, least astonishment, separation of concerns, Parse Don't Validate, least privilege.*

An endpoint is a contract the moment a client calls it, so review it as an interface first and as code second. Start from the request and response schemas, not the handler body.

- **Resource and method.** The path names a resource, not an action (`POST /v1/orders/{id}/cancellations` or `POST /v1/orders/{id}:cancel`, consistently with the rest of the API, rather than `POST /cancelOrder`). `GET` is safe, `PUT` and `DELETE` are idempotent, `POST` is neither unless made so.
- **Status codes and errors.** Codes match outcomes: `201` with a `Location` header for creation, `204` for no body, `404` vs. `403` chosen deliberately, `409` for conflicts, `422` for valid JSON with invalid content. Errors use one shape across the API, ideally [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457), and never leak stack traces or SQL.
- **Explicit input and output models.** Separate request and response models, never the ORM entity. The request model forbids unknown fields (`extra="forbid"`, or .strict() on a zod object) so clients can't mass-assign `is_admin` or `owner_id`. The response model lists exactly what is exposed, so a new column doesn't leak by default.
- **Thin handler.** The route parses input, checks authorization, calls one command or query, and maps the result to a response. Business rules in the handler are a separation-of-concerns finding.
- **Collections.** Every list endpoint is paginated with a maximum page size. Prefer keyset (cursor) pagination for large or growing tables, because `OFFSET` gets slower with every page. Filters and sort fields are allowlisted, never passed through to SQL.
- **Idempotency for writes.** A `POST` that creates or charges something accepts an idempotency key, or is otherwise safe to retry, because clients and proxies will retry it.
- **Authentication and authorization** on every route, including the ones "only the frontend calls" (see the auth playbook).
- **Limits.** Request body size, rate limits on expensive or sensitive operations, and timeouts on everything the handler calls.
- **Consistency with the rest of the API.** Field naming (`snake_case` vs. `camelCase`), timestamp format (ISO 8601 with offset), id format, envelope or no envelope. A new endpoint that is locally sensible but different from its neighbors is a least-astonishment finding.
- **Documentation and tests.** The generated OpenAPI schema reflects reality (response models declared, error responses listed). Tests cover the happy path, each error code, unauthenticated and unauthorized callers, and pagination edges.

## Endpoint schema changes, versioning and deprecation

*Leans on: Hyrum's Law above all, then least astonishment and Chesterton's Fence.*

The question for any change to an existing endpoint's request or response is: does every client that works today still work after deploy, without changing? Classify the change first, then review accordingly.

| Change | Usually safe? | Notes |
| --- | --- | --- |
| Add an optional request field | Yes | Must have a default that preserves old behavior |
| Add a response field | Mostly | Breaks clients that validate strictly or deserialize into closed types; Hyrum's Law says someone does |
| Add a new endpoint or a new enum value in a request | Yes |  |
| Add a new enum value in a response | No | Clients with exhaustive `match` or switch statements break; document enums as open from the start |
| Make an optional request field required | No | Breaking |
| Remove or rename a field, or change its type or format | No | Includes `int` to `str` ids, changing date formats, `null` vs. absent |
| Change a default, sort order, status code or error shape | No | Behavior change even if the schema is identical |
| Tighten validation (shorter max length, stricter regex) | No | Previously accepted requests now fail |
| Loosen validation | Usually | Check downstream consumers can handle the new values |

**Additive changes** need a check that the new field has a sensible default, that it appears in the response model and the OpenAPI schema, and that the database can supply it for existing rows.

**Breaking changes** need a plan in the PR description, not just code:

- **Prefer not to break.** Often the breaking change can be made additive: add `full_name` alongside `name`, populate both, and deprecate `name`.
- **Version deliberately.** A new path version (`/v2/...`) or a version header, following whatever the API already does. Don't version a single field change if expand-and-contract can avoid it; don't fork the whole API for one endpoint either.
- **Run both versions from one implementation.** The old version becomes an adapter over the new domain logic, not a copy of it, so fixes land once.
- **Announce and measure.** Mark the old endpoint or field deprecated in the OpenAPI schema and send `Deprecation` and `Sunset` response headers ([RFC 9745](https://www.rfc-editor.org/rfc/rfc9745), [RFC 8594](https://www.rfc-editor.org/rfc/rfc8594)). The `Sunset` date can't be earlier than the `Deprecation` date. Log or meter usage of the deprecated path per client, so removal is based on data, not on a date someone guessed.
- **Remove last.** Removal is its own PR, after usage has reached zero or the sunset date has passed with notice given.

For internal-only endpoints the same rules apply, with a shorter window: the frontend and the backend usually deploy separately, so for some minutes both versions of each are live at once.

## Code that validates user input

*Leans on: Parse Don't Validate, Fail Fast, least privilege, KISS.*

Validation code should run once, at the boundary, and produce a type the rest of the code can trust. Review where it happens as much as what it checks.

- **Parse into a type, don't return a boolean.** `is_valid_email(s) -> bool` leaves every later caller holding an unchecked `str`. A Pydantic model, `EmailStr`, or a `NewType` built by a parsing function carries the proof with the value. In TypeScript, a zod schema and a branded type do the same.
- **Allowlist, don't denylist.** Accept known-good shapes (enums, `Literal`, constrained types) rather than rejecting known-bad ones. Denylists of characters or keywords are always incomplete.
- **Bound everything.** Maximum lengths on strings, maximum sizes on lists and request bodies, ranges on numbers, limits on nesting depth. Unbounded input is a denial-of-service vector.
- **Normalize, then validate.** Trim, Unicode-normalize (NFKC where appropriate) and case-fold before checking and storing, so two spellings of the same value can't bypass a uniqueness check.
- **Strictness.** Decide whether `"42"` should be accepted as `42`. Pydantic's lax mode coerces; strict mode at API boundaries avoids surprises. In zod, coercion is opt-in (z.coerce), which is the safer default.
- **Regexes.** Anchored (`fullmatch`, not `match` or `search`), and free of nested quantifiers that allow catastrophic backtracking (ReDoS). Prefer a parser or a library over a hand-written regex for emails, URLs and dates.
- **Cross-field rules.** "End date after start date" belongs in a model validator, so it is enforced wherever the model is built.
- **Context-specific encoding is separate.** Validation doesn't make data safe for SQL, HTML or shell. That is done at output: parameterized queries, template autoescaping, `subprocess` with a list of arguments.
- **Files and URLs.** Check uploaded files by content, not extension. Size-limit them and store them outside the web root under generated names. Fetching a user-supplied URL needs SSRF protection: an allowlist of schemes and hosts, and blocking private and metadata addresses after DNS resolution.
- **Error messages.** Say what was wrong with which field, without echoing back large or sensitive input.
- **Tests.** Each rule has a test at its boundary: the longest valid value and one longer, the empty value, wrong types, extra fields.

## Authentication and authorization

*Leans on: least privilege, Fail Fast (fail closed), explicit over implicit, KISS.*

Authentication proves who the caller is; authorization decides what they may do with a specific resource. Most real incidents are authorization bugs, so review that half hardest.

**Authorization**

- **Deny by default.** A new route without an explicit permission requirement should fail a test or a lint, not quietly be public. Prefer a dependency or decorator that every router applies, with an explicit opt-out for public routes.
- **Object-level checks.** "Logged in" is not "allowed". Every access by id checks that the caller owns or may access *that* object. Broken object-level authorization is the most common API vulnerability (first on the [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)). Scoping the query itself (`WHERE id = :id AND tenant_id = :tenant`) is safer than fetching and then checking.
- **Function-level checks.** Admin and internal operations check the role on the server, not by hiding a button.
- **Tenant isolation.** In multi-tenant code, the tenant filter is applied centrally (a repository base, a session-level filter, or row-level security), not remembered at each query.
- **One place for policy.** Permission logic lives in a policy module or service the handlers call, not scattered `if user.role == "admin"` checks.
- **Not found vs. forbidden.** Return `404` for objects the caller isn't allowed to know exist, so ids can't be enumerated.

**Authentication**

- **Don't roll your own.** Use the framework's or an established library's primitives for sessions, OAuth/OIDC and password hashing.
- **Tokens.** JWT verification pins the algorithm (never accepts `none`), checks signature, `exp`, `aud` and `iss`, and fetches keys from a trusted JWKS with caching. Tokens are short-lived, with refresh tokens rotated and revocable.
- **Passwords and secrets.** Hashed with Argon2id or bcrypt, never a plain or fast hash. Secret comparisons use `hmac.compare_digest` (crypto.timingSafeEqual in Node). Login, reset and verification endpoints are rate-limited and return the same response whether or not the account exists.
- **Sessions and cookies.** `HttpOnly`, `Secure`, `SameSite`; session id rotated on login and privilege change; CSRF protection for cookie-authenticated state changes.
- **Nothing sensitive in logs or URLs.** Tokens, passwords, reset links and session ids never appear in log lines or query strings.

**Tests.** Every protected endpoint has negative tests: unauthenticated, authenticated but wrong role, authenticated but another tenant's or user's object. These are the tests that catch real bugs and the ones most often missing.

## React components (JSX and TSX)

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

## Next.js

*Leans on: least privilege, separation of concerns, Parse Don't Validate, explicit over implicit.*

In the App Router, the line between server and client runs through the component tree, and the most serious Next.js bugs are data crossing it the wrong way. Review where each file runs before what it does. The [Next.js data security guide](https://nextjs.org/docs/app/guides/data-security) is the reference.

- **The `'use client'` boundary.** Placed as low in the tree as possible, so most of the page stays a Server Component. Props passed into a Client Component are serialized to the browser: check they carry only what the UI needs, never whole database records.
- **Server-only code stays on the server.** Modules that touch the database, secrets or internal APIs `import 'server-only'`, so importing them from client code fails the build. Data access and `process.env` reads live in one data access layer.
- **Environment variables.** Anything prefixed `NEXT_PUBLIC_` is inlined into the client bundle. A secret with that prefix is a leak even if no component uses it yet.
- **Server Actions are public endpoints.** Every exported action can be called with a direct POST, whether or not the UI exposes it. Each one validates its arguments, checks authentication and authorization (ownership of the specific resource) itself, and returns only what the UI needs. A page-level auth check does not cover the actions defined in that page.
- **Route handlers and the proxy.** `route.ts` handlers get the full API endpoint review. `proxy.ts` (`middleware.ts` in older versions) is powerful and easy to get wrong; don't rely on it alone for authorization.
- **Dynamic segments are user input.** `[param]` folders and `searchParams` are validated like any request input.
- **Caching and revalidation.** For each data fetch, check whether it's cached, for how long, and what invalidates it (`revalidatePath`, `revalidateTag`). Per-user data cached as if it were shared leaks between users; data that must be fresh but is cached goes stale silently.
- **No side effects during render.** Mutations (logout, writes, cache invalidation) happen in Server Actions or route handlers, never while rendering a page.
- **Rendering mode.** Know whether a route renders statically or dynamically and why; reading cookies or headers makes it dynamic. Use `next/image` and `next/font`, and check the client bundle size impact of new client-side dependencies.
- **Hydration.** Values that differ between the server and client render (current time, random ids, `window` checks) cause hydration errors. Use `useId`, and render client-only values after mount.

## Accessibility

*Leans on: least astonishment, Fail Fast, KISS.*

Accessibility bugs rarely show up in a screenshot, so review the markup and the interaction, not just the look. Target [WCAG 2.2](https://www.w3.org/TR/WCAG22/) level AA unless the project states otherwise.

- **Semantic HTML first.** `<button>` for actions, `<a href>` for navigation, headings in order, lists as lists, a `<label>` for every input, landmarks (`<main>`, `<nav>`). A `div` with an `onClick` is a finding: keyboards and screen readers can't use it.
- **ARIA only to fill gaps.** No ARIA is better than wrong ARIA. Roles and states (`aria-expanded`, `aria-selected`) match the behavior and update with it.
- **Keyboard.** Everything interactive is reachable and usable by keyboard, in a logical order, with a visible focus indicator. Dialogs move focus in, keep it there while open, close on Escape, and return focus when closed.
- **Names and text alternatives.** Icon-only buttons have an accessible name. Images have meaningful `alt` text, or `alt=""` when decorative.
- **Color and contrast.** Text contrast of at least 4.5:1 (3:1 for large text and UI components). Meaning is never carried by color alone.
- **Dynamic content.** Errors, toasts and async results are announced through live regions or by moving focus. Form errors are linked to their fields with `aria-describedby`.
- **Motion and zoom.** Animation respects `prefers-reduced-motion`, and the layout works at 200% zoom and at 320 px wide without horizontal scrolling.
- **Tooling, then a manual pass.** `eslint-plugin-jsx-a11y` and axe in component or end-to-end tests catch part of the problems. New interactive components also get a keyboard-only pass and a quick screen reader check.

## CSS and styling

*Leans on: KISS, high cohesion, least astonishment, explicit over implicit.*

- **Follow the system.** Colors, spacing, type and radii come from design tokens or the theme, not hard-coded hex values and pixel numbers. A new one-off value is a question.
- **Scope.** Styles are scoped to their component (CSS Modules, Tailwind utilities, CSS-in-JS) rather than global selectors that reach into other components. Changes to global CSS get extra scrutiny, because they touch every page.
- **Specificity.** No `!important` and no deep selector chains to win a specificity fight; fix the cascade instead, with cascade layers (`@layer`) where the codebase uses them.
- **Tailwind.** Class lists repeated across components become a component, not an `@apply` block. Conditional classes go through a helper (`clsx`, `cva`), and class names are written as complete strings so the build can find them.
- **Layout.** Flexbox and grid rather than absolute positioning and magic offsets. Responsive at the project's breakpoints and checked at narrow widths. Images and embeds reserve their space so the page doesn't shift as they load.
- **Themes.** Dark mode and other themes work through variables; no color that only works on one background.
- **Stacking.** `z-index` values come from a defined scale, not ever-escalating numbers.
- **Animation.** Animate `transform` and `opacity` rather than layout properties, and respect `prefers-reduced-motion`.
- **Dead styles.** Removed components take their styles with them.

## HTML artifacts

*Leans on: KISS, least privilege, explicit over implicit.*

Standalone HTML files (generated reports, dashboards, docs pages, one-off tools, pages an AI agent produced) are shared widely and reviewed lightly. Review them as small web apps.

- **Pinned dependencies.** External scripts and stylesheets load from trusted CDNs at exact versions, with Subresource Integrity (`integrity`) hashes where possible. A floating version such as `@latest` changes the page without a code change.
- **XSS.** Data inserted with `innerHTML`, template strings or `document.write` is escaped or sanitized; `textContent` and DOM APIs are preferred. Where the page is served, a Content Security Policy is set.
- **Nothing private embedded.** API keys, tokens, internal URLs and personal data in the HTML, inline JSON or comments are visible to anyone who has the file.
- **Semantic and accessible.** A `lang` attribute, a viewport meta tag, real headings, labels and sufficient contrast; the accessibility playbook applies.
- **Responsive and themed.** Works at phone width without horizontal scrolling, and respects `prefers-color-scheme` if it has a dark mode.
- **Offline when that's the point.** A report meant to be emailed or archived works without the network; otherwise, the page fails gracefully when a CDN is unreachable.
- **Size.** Embedded images and data are compressed; large `data:` URIs bloat the file.
- **Generated output.** When a script or template produces the HTML, review the generator and a sample of its output, and reject hand edits to generated files.

## Data modeling: tables, relationships and domain objects

*Leans on: make illegal states unrepresentable, separation of concerns, high cohesion, YAGNI.*

A schema outlives the code that first used it, so it gets the most careful design review of anything in a PR. Review the tables and the Python objects that represent them together, because mismatches between the two are where bugs live.

**The tables**

- **Start from the queries.** Ask the author for the main reads and writes this model serves. The schema, keys and indexes should follow from them, not from the shape of a JSON payload.
- **Keys.** Every table has a primary key. Choose surrogate ids (`bigint` identity or UUID; UUIDv7 if inserts should stay index-friendly) consistently with the rest of the schema. Natural uniqueness (email per tenant, one active subscription per account) is a `UNIQUE` constraint, partial if needed, not an application check.
- **Constraints carry the invariants.** `NOT NULL`, `CHECK`, foreign keys and unique constraints make illegal states impossible regardless of which code path writes. An invariant enforced only in Python will be violated by the next script, migration or service that writes to the table.
- **Foreign key behavior.** Each `ON DELETE` (`CASCADE`, `RESTRICT`, `SET NULL`) is a deliberate choice. Cascades on large or important tables can delete far more than intended.
- **Normalization.** Normalize by default. Denormalized copies need a stated reason (a measured read path) and a mechanism that keeps them in step.
- **Soft deletes, audit and tenancy.** If `deleted_at` exists, every unique constraint and every query must account for it, usually with partial indexes. Decide whether audit history belongs in the table or a separate log. Tenant ids appear on every tenant-scoped table.
- **Naming.** Plural or singular table names, `_id` suffixes, timestamp column names (`created_at`, `updated_at`) consistent with the existing schema.

**Column types.** Check that the database's types fit the data:

| Smell | Why it hurts | Prefer |
| --- | --- | --- |
| Money as `float` or `REAL` | Rounding errors accumulate | `Decimal` with `NUMERIC(p, s)`, or integer minor units plus currency in a `Money` type |
| Timestamps as strings, naive datetimes, or `TIMESTAMP` without time zone | Ambiguous across zones and daylight saving changes | Timezone-aware UTC `datetime`, stored as `TIMESTAMPTZ` |
| UUIDs, IP addresses or fixed value sets as `VARCHAR` | No validation, larger indexes | Native `UUID` and `INET`; an enum, check constraint or lookup table for fixed sets |
| JSONB holding fields that are queried, joined, filtered or constrained | No integrity, awkward queries, silent schema drift | Real columns or tables; JSONB only for payloads that are rarely filtered and genuinely vary |
| Nullable columns that are never null in practice | Every reader handles a case that can't occur | `NOT NULL` wherever the domain requires a value |
| A list of ids packed into one column | No foreign keys, no joins | A join table |
| `is_active`, `is_deleted` and `deleted_at` side by side | Contradictory states are possible | One representation of state, with the rest derived |

**Relationship shapes.** Choose the structure that matches how the data relates:

- **One-to-many.** A foreign key on the many side, indexed, with a deliberate `ON DELETE` behavior.
- **One-to-one.** A foreign key with a unique constraint. First ask whether it should simply be one table; split only for a different lifecycle, access pattern, or large and rarely read columns.
- **Many-to-many.** An association table with a composite unique key. If the link carries data of its own (a role, a quantity, a start date), it is an entity and deserves a name.
- **Polymorphic references** (`target_type` plus `target_id`). The database can't enforce them. Prefer separate foreign keys with a check constraint, or a join table per target.
- **Hierarchies.** An adjacency list with a recursive CTE works for shallow or rarely queried trees. Use `ltree` or a closure table when subtree queries are frequent.
- **True graphs.** Variable-depth traversal, path finding, and many-to-many links among the same kind of entity, with questions like "who is connected to whom within N hops". If a SQL schema keeps accumulating self-joins and recursive CTEs, a graph database may fit better. The reverse also happens: data in a graph store whose queries are filters, aggregates and transactions belongs in a relational database. The dominant queries decide.

**The domain objects**

- **Persistence model vs. domain model.** For CRUD, one SQLModel class may serve as both. Once the domain has behavior and invariants, keep the ORM model at the repository boundary and map to domain objects, so the domain doesn't depend on SQLAlchemy and table changes don't ripple into business logic. The same applies to Prisma or Drizzle in TypeScript: map to domain types at the repository boundary instead of passing generated client types everywhere.
- **Relationships in code match the database.** A non-nullable foreign key is a non-optional attribute; a `UNIQUE` link is one object, not a list. Type hints, nullability and defaults on the Python side agree with the columns.
- **Aggregates.** Decide which objects are loaded and saved together and which are referenced by id only. An aggregate that pulls in half the database on load is the wrong boundary.
- **Loading strategy declared.** Relationships specify how they load. In async SQLAlchemy, `lazy="raise"` on relationships turns accidental lazy loads into immediate errors instead of hidden queries. In Prisma or Drizzle, relations load only when the query asks for them (include, with), so check list queries fetch them in one query rather than per row.
- **Value objects.** Money, addresses, date ranges and similar groups are value types in code, mapped to columns with composites or explicit mapping, not loose fields.

## Queries and indexes

*Leans on: premature optimization (measure), Fail Fast (catch it before production), explicit over implicit.*

A missing index rarely fails a test. It fails in production, when the table is large and a page or a job does a sequential scan under load. Review every new query against the data it will meet, not the test fixtures.

**Finding missing indexes**

- **Every new query, every new filter.** For each `WHERE`, `JOIN`, `ORDER BY` and `GROUP BY` on a table that is or will be large, find the index that serves it. If there isn't one, it's a finding.
- **Foreign keys.** PostgreSQL indexes the referenced primary key but not the referencing column. Without an index on the foreign key, joins from the parent and every cascading delete scan the child table.
- **Composite order.** Columns used with equality come first, then the range or sort column. An index on `(tenant_id, created_at)` serves `WHERE tenant_id = ? ORDER BY created_at`; one on `(created_at, tenant_id)` mostly doesn't.
- **Read the plan.** For anything non-trivial, ask for `EXPLAIN (ANALYZE, BUFFERS)` against production-sized data. A `Seq Scan` on a large table, a large `Rows Removed by Filter`, or a sort spilling to disk are the things to look for.
- **Partial and covering indexes.** `WHERE deleted_at IS NULL` or `WHERE status = 'pending'` partial indexes are smaller and faster for hot queries; `INCLUDE` columns can make a query index-only.
- **Don't over-index.** Each index slows every write and costs storage. Redundant indexes (a prefix of another index) and indexes no query uses are findings too.

**String matching, prefixes and wildcards**

| Pattern | Can use a plain B-tree index? | What to use |
| --- | --- | --- |
| `col = 'abc'` | Yes | B-tree |
| `col LIKE 'abc%'` (prefix) | Only with `C` collation, or an index built with `text_pattern_ops` / `varchar_pattern_ops` | B-tree with a pattern operator class |
| `col LIKE '%abc'` (suffix) | No | Trigram GIN index (`pg_trgm`), or an index on `reverse(col)` |
| `col LIKE '%abc%'` (contains) | No | Trigram GIN index (`pg_trgm`) |
| `col ILIKE ...` or `lower(col) = ...` | No | Expression index on `lower(col)`, `citext`, or trigram for patterns |
| Words in prose | No | Full-text search (`tsvector` with a GIN index) or a search engine |

- **Escape user input in patterns.** `%` and `_` in user input are wildcards. Escape them (and the escape character) before building a `LIKE` pattern, or a search for `100%` matches everything, and a leading `%` from a user turns an indexed prefix search into a full scan.
- **Minimum lengths.** Contains-searches on one or two characters match most rows even with a trigram index. Require a minimum length or cap results.
- **Regex and functions on columns.** `WHERE lower(email) = ...`, `WHERE date(created_at) = ...` or `~` regex matches can't use a plain index on the column. Index the expression or rewrite as a range.

**N+1 and other ORM traps**

- **Spot the loop.** Any relationship attribute accessed inside a loop over query results is a query per row unless it was eager-loaded. Look at templates and serializers too; they are where N+1 hides.
- **Load explicitly.** `selectinload` for collections, `joinedload` for many-to-one, and `lazy="raise"` so a missed one fails in tests. In TypeScript ORMs, use include or one findMany with an in filter rather than a query per item; in GraphQL resolvers, batch per-request lookups with DataLoader.
- **Count queries in tests.** A test that asserts the number of queries for a list endpoint (via an SQLAlchemy `before_cursor_execute` event listener, for example) stays green as the fixture grows only if there is no N+1.
- **Unbounded reads.** `.all()` on a table that grows, with no `LIMIT`. Paginate, stream, or batch.
- **Deep `OFFSET`.** Page 10,000 still reads and discards all earlier rows. Use keyset pagination.
- **Writes in loops.** One `INSERT` or `UPDATE` per row inside a loop. Use bulk operations.

## SQL files and raw queries

*Leans on: Parse Don't Validate, Fail Fast, explicit over implicit, least privilege.*

SQL shows up as `.sql` files (migrations, views, functions, seed data, reporting queries), as raw strings inside application code, and as query-builder chains. Review it as code that runs against production data, often with more privilege than the application has. The SQL section of Part 3 has the idioms; this is the review pass.

- **Parameters, never interpolation.** Values reach the query as bound parameters. Identifiers that must be dynamic (a sort column, a table name) come from an allowlist and are quoted with the driver's identifier quoting, never from raw user input.
- **Read it against the schema.** Check join conditions against the actual keys: a missing or wrong condition multiplies rows, and `DISTINCT` added to hide duplicates is a sign of it. Check `NULL` handling in comparisons, `NOT IN`, outer joins and aggregates.
- **Correct results on edge data.** Empty tables, `NULL` columns, duplicate keys, time zone boundaries and the first and last page of a paginated query.
- **Performance on real data.** Every new query or changed predicate gets the queries and indexes playbook, and `EXPLAIN (ANALYZE, BUFFERS)` on production-sized data for anything that touches large tables.
- **Transactions and locking.** Multi-statement changes run in one transaction. Long-running statements, `SELECT ... FOR UPDATE`, and bulk `UPDATE` or `DELETE` are checked for how long they hold locks and what waits behind them; large changes run in batches.
- **Destructive statements.** `DELETE`, `UPDATE`, `TRUNCATE` and `DROP` in scripts have an explicit `WHERE` or scope, a matching `SELECT` that shows what will change, a row-count check or `RETURNING`, and a backup or rollback plan for production.
- **Views, functions and triggers.** Views used as an interface are versioned like an API. Functions declare their volatility and security (`SECURITY DEFINER` sets `search_path` explicitly). Triggers are a last resort, because they hide behavior from everyone reading the application code.
- **Least privilege.** Reporting and analytics queries run as read-only roles. Scripts run with the narrowest role that works, not the owner or superuser.
- **Idempotent scripts.** Seeds and one-off scripts can be re-run safely (`CREATE ... IF NOT EXISTS`, `INSERT ... ON CONFLICT`), or say clearly that they can't.
- **Readable and linted.** Formatted by SQLFluff or the project's formatter, with CTEs named for what they hold and comments explaining business rules the query encodes.
- **Tested.** Queries with logic in them (reports, aggregates, complex filters) have tests against a real database with known fixture data and expected results.

## Migrations and deployment sequencing

*Leans on: Hyrum's Law, Gall's Law (small steps), Fail Fast, Chesterton's Fence.*

During a deploy, old and new code run against the same database at the same time, and a migration that locks a busy table takes the site down with it. Review a migration as an operation on production, not as a diff to a schema file.

**Sequencing: expand, migrate, contract**

Any change that old code can't tolerate is split across releases, so that every intermediate state works with both the code before and the code after it:

1. **Expand.** Add the new column, table or index. Nullable or with a default. Old code ignores it.
2. **Write both.** Deploy code that writes old and new shapes, and reads the old.
3. **Backfill.** Copy existing data in batches, as a separate, resumable job, not inside the schema migration.
4. **Read new.** Deploy code that reads the new shape. Old shape still written as a fallback.
5. **Contract.** Stop writing the old shape, then drop it in a later release.

A PR that renames a column, changes a type or drops anything in one step, alongside the code that depends on it, is a finding. So is a PR whose migration and code must deploy in a particular order that the deploy pipeline doesn't guarantee. The PR description should say which step this is and what follows.

**Locking and long operations (PostgreSQL)**

| Operation | Risk | Safer approach |
| --- | --- | --- |
| `CREATE INDEX` | Blocks writes for the whole build | `CREATE INDEX CONCURRENTLY`, which can't run inside a transaction (in Alembic, use `autocommit_block()`); check for an `INVALID` index if it fails |
| Add a column with a default | Fast on PostgreSQL 11 and later | Fine for constant and stable defaults, including `now()`; a volatile default (`random()`, `gen_random_uuid()`, `clock_timestamp()`) still rewrites the table |
| Add `NOT NULL` to an existing column | Full scan under an exclusive lock | Add `CHECK (col IS NOT NULL) NOT VALID` and commit; then, in a separate transaction, `VALIDATE CONSTRAINT`, which takes only a `SHARE UPDATE EXCLUSIVE` lock; then `SET NOT NULL`, which PostgreSQL 12+ does without a scan. In one transaction, the `ACCESS EXCLUSIVE` lock from the first step is held through the validation scan, so Alembic needs separate migrations or `autocommit_block()` |
| Add a foreign key | Scans the table while holding locks on both tables | Add it `NOT VALID`, then `VALIDATE CONSTRAINT` separately |
| Change a column type | Usually rewrites the table | New column plus backfill, via expand and contract |
| Rename or drop a column or table | Breaks running old code instantly | Expand and contract; drop only after no deployed code references it |
| Any DDL on a hot table | Queues behind long transactions, then blocks everything queued behind it | Set `lock_timeout` (a few seconds) and retry, rather than waiting indefinitely |

**The migration itself**

- **Matches the model.** Autogenerated migrations (Alembic, Prisma Migrate, Drizzle Kit) are a draft. Check that the migration does exactly what the model change implies: constraints, indexes, server defaults, enum changes. Alembic's autogenerate misses some of these.
- **Reversible, or honestly not.** A `downgrade` that works, or one that raises with an explanation when data would be lost. A downgrade that silently drops data is worse than none.
- **Data migrations separate from schema migrations.** Backfills in batches, idempotent, resumable, and not holding a transaction open for the whole table.
- **Tested on realistic data.** Run against a copy or a production-sized dataset to measure duration and locks. A migration that takes 50 ms locally can take 40 minutes in production.
- **Linear history.** No merge conflicts in revision heads; one migration per logical change.
- **Chesterton's Fence for drops.** Before dropping a column, table or index, confirm nothing reads it: other services, reports, analytics jobs, and old app versions still running.

## Code on the critical path

*Leans on: premature optimization (measure), Fail Fast, KISS, Gall's Law.*

Critical-path code is anything that sits in every request, in checkout or login, or in a job the business depends on. The bar is higher: the change must not make the path slower, less available, or harder to roll back, and the reviewer should be able to say how they know.

- **What's new in the path.** List every added network call, query, lock, file read or third-party dependency. Each one is a new way for the path to be slow or down. Ask whether it can move off the path: precomputed, cached, or done asynchronously after the response.
- **Timeouts and budgets.** Every outbound call has a timeout well inside the path's latency budget. Retries have a cap and backoff, and the total retry time also fits the budget.
- **Failure of dependencies.** What happens when the new dependency is slow or down? Prefer degrading (a fallback value, a skipped enrichment, a circuit breaker) over failing the whole request, when the business allows it.
- **Work per request.** No queries in loops, no unbounded reads, no heavy serialization, regex compilation or object construction repeated per call. Async code doesn't block the event loop.
- **Caching.** A new cache key includes everything the value depends on (tenant, user, permissions, locale). Expiry is a deliberate TTL or an explicit invalidation rule. A hot key expiring shouldn't send every request to the database at once, and the path still works when the cache is empty or down. A cached value served across a permission boundary is a security bug.
- **Measured, not assumed.** A change claimed to be faster comes with a benchmark or a profile. A change that could be slower comes with a load test or a comparison of p95/p99 latency before and after.
- **Rollout.** Behind a feature flag or a percentage rollout, with a metric that would show a regression and a way to turn it off without a deploy.
- **Observability.** Latency, error rate and saturation for the path are measured, and the new code adds spans or metrics for the parts it introduces.
- **Simplicity matters more here.** Clever caching, custom concurrency and hand-rolled retry logic on the critical path need the strongest justification, because they fail in ways that are hard to see.

## Background jobs, queues and events

*Leans on: Fail Fast, Hyrum's Law, explicit over implicit, Gall's Law.*

Asynchronous work fails differently from a request. Nobody is waiting for the response, so failures are silent unless someone made them loud, and most queues deliver at least once, so every message may arrive twice, late or out of order.

- **Idempotent handlers.** Running the same message twice produces the same result. Use a deduplication key, an upsert, or a state check guarded by a unique constraint. A handler that charges, emails or increments on every delivery is a finding.
- **Retries and dead letters.** Retries have backoff and a maximum. A message that keeps failing goes to a dead-letter queue that someone is alerted about, instead of blocking the queue or vanishing.
- **Transient vs. permanent errors.** Retry timeouts and connection errors; don't retry validation errors or missing records forever.
- **Publishing with the transaction.** An event published before the database transaction commits can describe a write that rolled back; one published after can be lost if the process dies. Use a transactional outbox (write the event to a table in the same transaction, relay it afterward) when the event must match the data.
- **Payloads are contracts.** Event schemas are versioned like endpoints. Consumers tolerate unknown fields; adding a required field or changing a meaning is a breaking change. Prefer ids plus a small amount of data over whole serialized objects, which go stale and grow.
- **Ordering.** If the handler assumes messages arrive in order, check that the queue guarantees it for this key, or make the handler check a version or timestamp.
- **Time limits.** The job's maximum runtime is shorter than the queue's visibility or ack timeout, or the message is redelivered while still running. Long work is split into resumable batches with checkpoints.
- **Scheduled jobs.** A cron job that can overlap its previous run needs a lock. Schedules state their time zone, and a missed run is either caught up or deliberately skipped.
- **Observability.** Queue depth, age of the oldest message, processing time and failure rate are measured. A job that silently stops running is the most common failure, so alert on absence, not just on errors.
- **Tests.** Run the handler twice on the same message, fail it halfway through, and deliver an old payload version.

## Logging and error logging

*Leans on: Fail Fast (failures are visible), least privilege (logs leak), KISS, explicit over implicit.*

Logs exist for the person debugging production at the worst possible moment. Review each log line by asking whether that person would want it, could find it, and could act on it, and whether it leaks something it shouldn't.

**General logging**

- **Structured, not interpolated.** Events with fields (`log.info("order_created", order_id=..., tenant_id=...)` with `structlog`), not prose built with f-strings. In Node, pino does the same. Fields are searchable; sentences aren't. With the stdlib logger, pass arguments rather than pre-formatting, so work is skipped when the level is off.
- **Stable event names.** A short, greppable event name per log site. Changing it breaks dashboards and alerts, which is Hyrum's Law applied to logs.
- **Correlation.** A request id or trace id bound once (contextvars, middleware) and present on every line, so one request can be followed across services.
- **Levels mean something.** `ERROR` means someone should look; `WARNING` is unexpected but handled; `INFO` is a business-level event; `DEBUG` is off in production. An `ERROR` that fires on normal traffic trains people to ignore alerts.
- **Volume on hot paths.** No per-item logging inside loops or per-request `INFO` noise on high-traffic endpoints. Sample, aggregate, or use a metric instead.
- **No sensitive data.** No passwords, tokens, API keys, full request or response bodies, payment details or unnecessary personal data. Log ids, not payloads. Prefer a redaction processor over relying on every call site to remember.
- **Metrics vs. logs.** Counts and rates belong in metrics. Watch label cardinality: user ids or URLs as metric labels will overwhelm the metrics backend.

**Error logging**

- **Log once, at the boundary that handles it.** Code that catches, logs and re-raises at every layer produces the same stack trace five times. Lower layers raise with context; the top-level handler or job runner logs.
- **Keep the traceback.** Inside `except`, use `log.exception(...)` (or `exc_info=True`) so the stack trace is recorded. `log.error(str(e))` throws away where it happened. In TypeScript, log the error object itself, not err.message, so the stack and cause survive.
- **Chain, don't replace.** `raise DomainError(...) from err` preserves the original cause for the log.
- **Context that helps.** The ids and parameters needed to reproduce the failure, not the whole object graph.
- **Expected vs. unexpected.** A user's invalid input is not an `ERROR`; it is a `4xx` and maybe an `INFO`. A failed payment-provider call after retries is. Classify deliberately, because error rate drives alerting.
- **No swallowing.** `except Exception: log.warning(...)` followed by carrying on is a silent failure with a paper trail. If the code can't proceed correctly, it should raise.
- **User-facing errors stay generic.** Details go to the log under a correlation id that is also returned to the client, so support can find the entry without exposing internals.

## Shell scripts (Bash and zsh)

*Leans on: Fail Fast, KISS, least privilege, explicit over implicit.*

Shell scripts run with full user privileges, often unattended, and fail in quiet ways. Part 3 covers shell idioms and the differences between Bash and zsh; this is the review pass.

- **Should it be shell?** Glue around commands is fine. Past roughly a hundred lines, or once it needs data structures, JSON handling beyond `jq` one-liners, or careful error recovery, ask for Python or TypeScript.
- **Interpreter and strict mode.** A shebang for the shell the script is written for (`#!/usr/bin/env bash`, `#!/bin/zsh`), and strict mode at the top (`set -euo pipefail`). Know its gaps: `set -e` is ignored inside a function called from `if`, `&&` or `||`, and `local x=$(cmd)` hides a failed command.
- **Linted.** ShellCheck passes for Bash and POSIX sh, with each disabled check justified inline. ShellCheck doesn't support zsh, so zsh scripts get `zsh -n` and a closer read.
- **Quoting.** Every expansion quoted (`"$var"`, `"$@"`, `"${arr[@]}"`) unless splitting is intended and commented. An unquoted variable in `rm`, `mv` or `cp` is a blocker.
- **Destructive commands.** `rm -rf` guarded against empty or unset variables (`"${dir:?}"`), `--` before arguments that could start with a dash, and a dry-run mode for anything that deletes or rewrites many files.
- **Inputs and environment.** Arguments validated, with a usage message and a non-zero exit. Required environment variables checked up front. Scripts run by cron, launchd, systemd or CI don't get your interactive shell: `PATH`, `HOME` and tool locations are set explicitly.
- **Temp files and cleanup.** `mktemp` instead of fixed paths in `/tmp`, removed by `trap ... EXIT`.
- **Idempotent.** Running twice is safe: `mkdir -p`, `ln -sfn`, checks before creating, and appends that don't duplicate lines.
- **Structured data.** `jq` for JSON, never `grep`, `sed` or `awk` over JSON text, and no inline Python one-liners to parse it.
- **Secrets.** Not passed as command-line arguments (visible in `ps`), not echoed, not logged, and `set -x` is off around them.
- **Downloads.** No `curl ... | sh`. Download, verify a checksum or signature, then run.
- **Output and exit codes.** Diagnostics to stderr, data to stdout, meaningful exit codes, `--help`, and a `main` function for anything longer than a screen.
- **Tested.** Non-trivial scripts have Bats tests, or at least a CI job that runs them against a fixture.

## Dockerfiles and container images

*Leans on: least privilege, KISS, explicit over implicit, Fail Fast.*

- **Pinned base image.** A specific version tag at minimum, a digest (`@sha256:...`) for reproducible builds, and a slim or distroless base where it works. `latest` is a finding.
- **Multi-stage builds.** Compilers and build tools live in a build stage; the final image has only the runtime and the application.
- **Layer order for caching.** Copy the dependency manifest and lockfile, install, then copy the source. Copying the whole repository first reinstalls everything on every code change.
- **Installs from the lockfile.** `uv sync --locked`, `npm ci`, `pnpm install --frozen-lockfile` or `bun install --frozen-lockfile`, never a fresh resolve.
- **No secrets in layers.** Every layer is readable in the final image, so build secrets use BuildKit secret mounts (`RUN --mount=type=secret,...`), never `ARG`, `ENV` or a copied key file. A `.dockerignore` keeps `.env`, `.git` and local build output out of the build context.
- **Non-root.** The final stage runs as a non-root `USER`, with files copied at the right ownership (`COPY --chown`).
- **Signals and shutdown.** `CMD` and `ENTRYPOINT` in exec form (a JSON array) so the process receives signals and shuts down cleanly, with an init process (`tini`, or `--init`) when the app doesn't reap child processes.
- **Runtime behavior.** A health check (in the image or the orchestrator), configuration from environment variables, and logs to stdout and stderr.
- **Small attack surface.** Package caches, compilers and debugging tools don't reach the final image; package installs and their cleanup happen in the same `RUN`.
- **Scanned and linted.** An image scanner (Trivy, Grype, or the registry's) runs in CI with critical vulnerabilities as a blocker, and hadolint checks the Dockerfile.

## Infrastructure as code

*Leans on: least privilege, Gall's Law, Chesterton's Fence, Hyrum's Law, explicit over implicit.*

Terraform or OpenTofu, Kubernetes manifests, Helm charts and Compose files change production directly. Review the plan, not only the diff.

- **Read the plan.** The PR includes the `terraform plan` output (or `helm diff`, `kubectl diff`). Any destroy or replace of a stateful resource (databases, volumes, buckets, DNS records) is a blocker until explained. A one-line attribute change can force a replacement.
- **Blast radius.** One environment at a time, production last. Shared modules change carefully, because every consumer picks up the change. State is split so that one mistake can't touch everything.
- **Pinned versions.** Providers, modules, charts and images pinned, with `.terraform.lock.hcl` committed.
- **Least privilege.** No `*` actions or resources in IAM policies, no `0.0.0.0/0` on non-public ports, buckets private by default, and encryption at rest and in transit.
- **Secrets.** Not in variable files or committed plans; read from a secret manager. Reading from a secret manager doesn't keep a value out of state: anything passed to an ordinary resource argument is stored in state and saved plans in plain text, and `sensitive` only redacts it from displayed output. So state and saved plans need encryption at rest and restricted access. Where a secret must not persist at all, use an ephemeral value or a write-only argument if the provider supports one.
- **Kubernetes workloads.** Resource requests and limits, readiness and liveness probes, a non-root security context, a PodDisruptionBudget for anything with replicas, and pinned image tags.
- **Protection for stateful resources.** Production databases and buckets have deletion protection or `prevent_destroy`.
- **Drift.** Resources changed by hand in a console are imported or reverted, and every `ignore_changes` has a reason.
- **Policy and lint in CI.** `terraform validate`, `tflint`, and a policy scanner (Checkov, Trivy's misconfiguration scan, or OPA).
- **Tags and naming.** Resources follow the existing naming convention and carry owner, environment and cost tags.
- **Compose files.** Pinned images, no secrets in committed `environment:` blocks, health checks on dependencies, and named volumes for data that must survive a restart.

## Configuration files

*Leans on: explicit over implicit, Fail Fast, least privilege, YAGNI.*

Configuration changes deploy behavior without changing code, and they often skip the tests that code gets. Review them with that in mind: a one-character change in a YAML file can take production down.

- **Is it configuration at all?** Make something configurable only when it differs between environments or deployments. Everything else is a constant in code, with tests and types.
- **Typed and validated at startup.** Settings are loaded into a typed model (`pydantic-settings`, or a zod schema over process.env in TypeScript) that fails fast on missing or invalid values when the process starts, not at first use hours later.
- **Defaults are safe.** Debug off, verbose logging off, authentication on, permissions narrow. A missing value should fail or fall back to the safe choice, not the convenient one.
- **No secrets in config files or the repository.** Secrets come from a secret manager or the environment at runtime. Check `.env` files, Docker Compose files, CI workflows and Kubernetes manifests in the diff for anything that looks like a key or password.
- **Per-environment differences are deliberate.** Diff staging against production config for the changed keys. A value that differs by accident is how "it worked in staging" happens.
- **Least privilege in infrastructure config.** IAM policies, database roles, network rules, container users and CI permissions grant only what is needed. Wildcards (`*`) in permission policies are findings.
- **Pinned and reproducible.** Dependency versions are pinned with a lockfile (`uv.lock`), container images by version or digest, CI actions by version or SHA.
- **Tooling config.** Changes to Ruff, mypy, coverage or pre-commit settings that loosen a rule (adding ignores, lowering strictness, excluding paths) need a reason. Silencing a rule to make a PR pass is the config equivalent of `# type: ignore`.
- **Rollout and rollback.** Feature flags and runtime config have an owner, a default, and a plan for removal once the flag is fully rolled out. Stale flags are dead code with a switch.
- **Validated in CI.** Config files are linted and schema-checked (YAML lint, `kubeconform`, `actionlint`, a dry run of the settings model) so syntax and type errors fail the build instead of the deploy.

## Tests: levels, coverage, gaps and TDD

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

## Test code itself: helpers, fixtures and fakes

*Leans on: KISS above all, then high cohesion, Rule of Three, explicit over implicit.*

Test code is held to a different standard from production code, and confusing the two is a common source of bad test suites. Production code is optimized for change over years; test code is optimized for being obviously correct at a glance. Nobody tests the tests, so a test must be simple enough that it can't plausibly be wrong.

**How test code differs**

|  | Production code | Test code |
| --- | --- | --- |
| Logic | Whatever the problem needs | None, ideally: no loops, conditionals or computation in a test body. A test with an `if` can pass by taking the wrong branch. |
| Duplication | Deduplicate shared knowledge | Prefer repetition that keeps each test readable on its own (DAMP: descriptive and meaningful phrases over DRY). A reader should understand a failing test without opening five helpers. |
| Abstraction | Earned by a second real use | Even more reluctant. Helpers exist to remove noise, not to share logic. |
| Expected values | Computed | Literal. `assert total == Decimal("42.50")`, not `assert total == price * qty * (1 - discount)`, which just re-implements the code under test. |
| Naming | Domain names | Names describe the scenario and outcome: `test_refund_rejected_after_30_days` |
| Reuse | Matters | Matters much less than clarity |

**Helpers, factories, builders and fakes**

- **Simple, or tested.** A test helper must be trivially correct by inspection: build an object with defaults, make one request, assert one shape. Once a helper has real logic (branching, parsing, calculation), it either gets simplified or gets its own unit tests, because a bug there makes every test that uses it lie.
- **Factories for data.** Use a factory (for example `factory_boy` or `polyfactory`, or fishery in TypeScript) or a small builder that fills valid defaults, so each test states only the fields it cares about. `make_order(status="refunded")` says what the test is about; a 20-field literal hides it.
- **Fakes over mocks.** An in-memory implementation of a `Protocol` (`InMemoryUserRepository`) is simple, reusable and behaves like the real thing. Mocks that assert call sequences couple tests to implementation.
- **Where test code lives.** Keep a helper next to the tests that use it: in the test module, or in a `conftest.py` in the same directory. Promote it to a shared location only when several distant test packages need it. The same rule as production code applies: don't scatter cohesive code for imagined reuse. And as the guide's simplicity section says, a helper used by both production code and tests stays in the production module; the test imports it from there.
- **Fakes that mirror production contracts** (an in-memory repository, a fake clock, a fake payment gateway) can live in a dedicated `testing` module or package next to the code they fake, so they evolve with the interface. These are real code and get real tests, often the same contract tests the production implementation passes.

**Fixtures**

- **Explicit and local.** A fixture's purpose should be clear from its name, and a test's setup visible from its arguments. Deep chains of fixtures depending on fixtures, defined in distant `conftest.py` files, make a test impossible to understand on its own.
- **Narrow scope by default.** Function scope unless setup is genuinely expensive. Session- or module-scoped fixtures that hold mutable state leak between tests and cause order-dependent failures.
- **No `autouse` surprises.** An `autouse` fixture changes every test in its scope invisibly. Use it only for true global hygiene (resetting a clock, isolating the environment). The same applies to global beforeEach hooks and setup files in Vitest or Jest.
- **Parametrize, don't loop.** `pytest.mark.parametrize` with readable ids gives one test per case and reports which one failed. A loop inside a test stops at the first failure and hides the rest.

**In review, ask of each test**

- Can I tell what behavior it checks from its name and body alone?
- Would it fail if that behavior broke?
- Does it check one thing, with arrange, act and assert visible?
- Does it depend on anything it doesn't show: shared state, ordering, the clock, the network?

## Documentation and Markdown

*Leans on: least astonishment, KISS, Hyrum's Law, DRY (for knowledge).*

Documentation is reviewed like an interface: for whether a reader can act on it correctly. Wrong documentation is worse than none, because it is trusted.

- **Know the reader and the kind of doc.** A tutorial, a how-to, a reference and an explanation have different jobs. A README that mixes all four serves none well. Check the doc does the one job its reader needs.
- **Accurate against the code.** Commands run as written, code samples work against the current API, configuration keys exist, and defaults match. Where possible, examples are executed in CI (doctests or a docs build that runs snippets).
- **Updated in the same PR.** A change to behavior, an endpoint, a config key or a CLI flag updates the docs in the same diff. Missing doc changes are a finding, the same as missing tests.
- **One home for each fact.** The same setup steps in three READMEs will drift apart. Link to the authoritative place instead of copying.
- **Why, not only what.** Reference docs can be generated from code; the valuable hand-written parts are the reasons, constraints and trade-offs the code can't express.
- **Docstrings and comments.** Docstrings on public APIs describe the contract without repeating type hints. Comments explain why. Both are reviewed for accuracy whenever the code next to them changes.
- **Plain and short.** Specific, scannable, with examples. Remove filler and anything a reader can't act on.
- **Public docs are contracts.** Hyrum's Law: whatever the documentation promises, users depend on. Don't document behavior you don't intend to keep.

**Markdown files**

- **Renders where it's read.** GitHub, the docs site, or an agent's context: one H1, headings in order, fenced code blocks with a language, tables that actually render.
- **Links work.** Relative links to files that exist, anchors that exist, and a link checker in CI for docs sites.
- **Linted.** markdownlint, or the project's formatter, so style isn't reviewed by hand.
- **Front matter is valid.** Where files carry YAML front matter (docs sites, skills, subagents), it parses and has the expected fields.
- **Generated sections are regenerated.** Tables of contents and API references produced by a tool aren't edited by hand.
- **Executable Markdown gets its own playbook.** Skills, commands, rules files and prompts are instructions an agent follows; review them with the agent and AI tooling playbooks, not only as prose.

## New dependencies

*Leans on: YAGNI, KISS, least privilege.*

A new package is code you didn't write, running with your application's privileges, maintained on someone else's schedule. Each one should earn its place.

- **Is it needed?** Check whether the standard library or an existing dependency already does the job. A large package pulled in for one function is usually a finding; copying a small, well-understood function with attribution can be the better trade.
- **Is it healthy?** Recent releases, responsive maintainers, a real user base, more than one maintainer for anything critical, and a license compatible with how you ship.
- **Is it safe?** No known vulnerabilities (`pip-audit`, npm audit or pnpm audit, or the CI equivalent), a name you've verified against the real project to rule out typosquatting, and an understanding of what it pulls in transitively, including install scripts that run when it's installed.
- **Is it pinned?** Exact versions in the lockfile (`uv.lock`, pnpm-lock.yaml, package-lock.json or bun.lock) for applications; sensible lower bounds in `pyproject.toml` for libraries. The lockfile diff is reviewed, not skimmed: unexpected transitive changes are worth a question.
- **Is it typed?** Ships `py.typed` or has stubs (in TypeScript, bundled types or a maintained @types package), so `mypy --strict` keeps working without blanket ignores.
- **Is it contained?** A vendor SDK is wrapped behind a narrow interface at the boundary, so swapping it later touches one module. A utility library used throughout the codebase is fine unwrapped.
- **Removals count too.** Dropping a dependency is reviewed for anything that still imports it indirectly, including plugins, entry points and scripts.

## LLM prompts

*Leans on: explicit over implicit, Parse Don't Validate, least privilege, make it work (with evidence).*

A prompt that ships in a product or pipeline is code: behavior changes when its text changes, and nothing type-checks it. Review it with the same rigor and ask for evidence that it still works.

- **Versioned and findable.** Prompts live in files in the repository, or in a prompt registry with versions, not as strings scattered through code, so changes show up as reviewable diffs.
- **Evals for every change.** A prompt or model change comes with results on a fixed set of cases, before and after. "I tried it a few times" isn't evidence, because outputs vary from run to run.
- **Clear structure.** Task and role first, then context, constraints, output format and examples. Instructions don't contradict each other, and each one is something the model can act on.
- **Untrusted input stays data.** User text, documents, web pages and tool results are clearly delimited, and nothing in them can override the instructions. Wherever outside text reaches a model that can call tools, treat prompt injection as a real threat.
- **Structured output is validated.** Output consumed by code uses structured output or tool calling with a schema, is validated (Pydantic or zod), and has a defined path for when validation fails. No regexes over free text.
- **Model and parameters pinned.** Model id, temperature and token limits are explicit, and a model upgrade is reviewed like a dependency upgrade, with evals.
- **Cost and context.** Token counts for typical inputs are known, stable content is ordered so prompt caching works, and the context isn't padded with material the task doesn't need.
- **Representative examples.** Few-shot examples cover edge cases and don't contain answers the model will copy verbatim.
- **No secrets or personal data** in prompts or examples; logged prompts and responses follow the logging playbook.

## Skills and instruction files

*Leans on: KISS, YAGNI, least privilege, high cohesion, least astonishment.*

Skills (`SKILL.md` folders), custom commands and similar instruction files are executable prompts: an agent follows them, runs their scripts and acts on the user's machine. Review them as code that happens to be written in English. The [Claude Code skills docs](https://code.claude.com/docs/en/skills) describe the format.

- **The description is the trigger.** The frontmatter `description` decides when the skill loads, and it's always in context. It says what the skill does and when to use it, key use case first, specific enough not to fire on unrelated requests and broad enough to fire on the right ones.
- **Frontmatter is exactly right.** Field names match the documentation, hyphens included. Claude Code silently ignores a field it doesn't recognize, so a typo quietly disables a setting.
- **Least privilege.** `allowed-tools` grants only what the steps need. A skill that can run arbitrary shell commands without asking needs a stated reason.
- **One job.** A skill covers one kind of task. One that tries to cover several workflows triggers unpredictably and is hard to test.
- **Concise and actionable.** Steps say what to do, in order, rather than explaining why at length. Once loaded, the body stays in context, so every line is a recurring token cost. Keep `SKILL.md` short (the Claude Code docs suggest under 500 lines) and move reference material into supporting files that load only when needed.
- **No conflicts.** Instructions don't contradict the project's rules files, other skills, or themselves, and the skill doesn't overlap an existing one so much that the choice between them is ambiguous.
- **Bundled scripts are code.** Scripts the skill runs get the full shell, Python or TypeScript review, including what they delete, what they send over the network, and what secrets they touch.
- **Deterministic where it matters.** Steps that must happen the same way every time (formatting, validation, file layout) are scripts, not prose the model may follow loosely.
- **Tested on real requests.** The skill is tried on realistic prompts, including ones that should *not* trigger it, ideally as a small eval set kept with the skill.
- **No name collisions.** Personal, project and plugin skills with the same name shadow each other; check the new name is free.

## Agent rules files and subagents

*Leans on: KISS, least astonishment, least privilege, DRY (for knowledge).*

`AGENTS.md`, `CLAUDE.md`, editor rules files and subagent definitions shape every action an agent takes in a repository. They're standing configuration for a non-deterministic collaborator, and deserve the review a CI configuration gets.

**Rules files**

- **Always loaded, always paid for.** These files are in context for every task, so every line costs tokens on every turn and competes for the model's attention. Keep them short and specific to this repository; move rarely needed detail into skills or docs that load on demand.
- **Specific and verifiable.** "Run `just test` before committing" beats "make sure code is tested". Commands are copy-pasteable and actually work.
- **Accurate.** Build, test and lint commands, paths and conventions match the repository as it is now. Stale instructions are worse than none, because the agent follows them.
- **Precedence is intended.** Nested files and other tools' rules files don't conflict. For `AGENTS.md`, the file nearest the edited code wins and an explicit user prompt overrides it ([agents.md](https://agents.md/)); check that a nested override is deliberate.
- **One source of truth.** If both `AGENTS.md` and `CLAUDE.md` exist, one imports or points to the other instead of duplicating content that will drift.
- **Guidance, not enforcement.** "Never push to main" also belongs in branch protection and permission settings. A rules file guides the agent; it doesn't guarantee anything.
- **Safe to publish.** No secrets, and nothing that would be a problem if the file were public.

**Subagents**

The [Claude Code subagents docs](https://code.claude.com/docs/en/sub-agents) describe the format; the same points apply to other tools' agent definitions.

- **The description routes work.** The main agent delegates based on `description`, so it says clearly when to use this subagent. Descriptions are always in context; keep them short and put detail in the body.
- **Tools are scoped.** List `tools` explicitly: omitting the field inherits every available tool, which is rarely right. A reviewer or researcher gets read-only tools.
- **The model fits the job.** Routine, high-volume work on a cheaper model, hard reasoning on a stronger one, chosen explicitly.
- **Self-contained prompt.** A subagent doesn't see the conversation that started it. Its system prompt plus the delegation message carry everything it needs.
- **Output contract.** It returns a summary in a defined shape, not everything it read, because its result lands in the caller's context.

## Hooks and commands

*Leans on: Fail Fast, least privilege, explicit over implicit, KISS.*

Hooks in Claude Code and Codex are commands (and, in Claude Code, HTTP calls, tools or prompts) that run automatically at points in an agent's lifecycle: before or after a tool call, when a prompt is submitted, when the agent stops. They run with your permissions and environment, without asking. Review them as production scripts with a trigger attached. References: [Claude Code hooks](https://code.claude.com/docs/en/hooks), [Codex hooks](https://learn.chatgpt.com/docs/hooks).

- **Where it lives decides who runs it.** Claude Code reads hooks from user, project (`.claude/settings.json`, committed), local, managed, plugin, and skill or subagent settings. Codex reads `hooks.json` or `[hooks]` tables in `config.toml`, at user and project level. A committed project hook runs for everyone who trusts the repository, so it gets the strictest review.
- **Narrow matchers.** The matcher selects only the tools or events the hook needs. A catch-all matcher on `PreToolUse` runs before every tool call and slows every turn.
- **Exit codes mean specific things.** In both tools, exit code `2` blocks the action on events that can block, and stderr becomes the reason. In Claude Code, any other non-zero code, including `1`, is a non-blocking error and the action proceeds. A policy hook that exits `1` enforces nothing.
- **Failures fail open.** A missing script, crash or timeout lets the action proceed by default. Hard guarantees belong in the permission system or managed settings; both tools' docs describe hooks as a guardrail, not a complete enforcement boundary.
- **Parse the input properly.** Command hooks receive the event as JSON on stdin. Parse it with `jq` or a typed script, never with `grep`, and treat the tool inputs inside it as untrusted.
- **Fast and bounded.** Default timeouts are long (600 seconds for command hooks in both tools), so a hook on a frequent event sets a short `timeout` and does little work. A slow hook makes every turn slow.
- **Quoting and paths.** Paths built from `$CLAUDE_PROJECT_DIR` or similar variables are quoted, or passed in exec form (`args`) so the shell never interprets them.
- **Output that reaches the model.** Context a hook injects, and the reasons it gives for blocking, are saved in the transcript and read by the model. Write them as plain facts, with no secrets and nothing phrased as system instructions.
- **Trust and re-review.** Codex records trust against each hook's hash, so an edited hook is skipped until someone re-trusts it; say so in the PR. Claude Code project hooks follow the workspace trust prompt.
- **The shell playbook applies** to every command a hook runs: strict mode, quoting, no secrets in arguments, idempotence.

**Commands.** In Claude Code, a file in `.claude/commands/` and a skill both create a `/name` command and work the same way, so review commands with the skills playbook. Check that arguments passed into the command are treated as data, not instructions, and that any pre-approved tools are the minimum it needs.

## Agent workflows

*Leans on: Gall's Law, Fail Fast, separation of concerns, least privilege, make it work (with evidence).*

Multi-step agent workflows (a lead agent fanning out to subagents, pipelines of model calls and tools, scheduled agent runs) are distributed systems built from non-deterministic parts. Review them like a background-job system, and then some.

- **Simplest thing first.** One agent with good tools often beats an orchestration of five. Each added agent or step needs a reason: real parallelism, a context that would otherwise overflow, or a different tool set or model.
- **Contracts between steps.** Each step's input and output is defined, ideally as a schema, and validated before the next step consumes it. Free-text handoffs are where workflows drift.
- **Self-contained handoffs.** Each subagent or step gets everything it needs in its own prompt; nothing depends on context it can't see.
- **Bounded everything.** Every loop and retry has a limit (turns, iterations, tool calls, wall time, tokens or cost), and hitting one produces a clear failure, not a silent stop.
- **Idempotent side effects.** Steps that write files, open pull requests, send messages or call external APIs are safe to re-run, through idempotency keys or a check before acting. A retried run shouldn't post twice.
- **Human checkpoints for irreversible actions.** Deploys, deletions, payments, outbound messages and merges wait for approval unless they're deliberately automated with guardrails.
- **Least privilege per step.** Each agent gets only the tools, credentials and directories its step needs; a summarizer doesn't get a shell.
- **Untrusted content stays data.** Web pages, issues, emails and files read in one step can contain instructions; they mustn't change what later steps do or which tools they call.
- **Observable.** Every run leaves a trace: prompts, tool calls, outputs, and cost and duration per step, so failures can be debugged and costs attributed.
- **Evaluated before it runs unattended.** The workflow is tested end to end on representative tasks against stated success criteria, and changes to prompts, models or tools re-run those evals.
- **Cost and concurrency limits.** Fan-out width, the model used at each step and the expected cost per run are explicit, with hard limits.

## AI-generated and AI-assisted code

*Leans on: KISS, YAGNI, reviewing code against its spec, Chesterton's Fence.*

Code written with an AI tool is held to exactly the same standard as any other code, and the author owns every line of it: they should be able to explain any part when asked. What changes is where to look, because generated code fails in characteristic ways and tends to arrive in larger diffs.

- **Scope beyond the spec.** Extra options, helpers, abstractions, fallback paths and features nobody asked for. Check the diff against the spec strictly: no more, no less.
- **Plausible but wrong APIs.** Function names, parameters and library features that look right but don't exist, are deprecated, or behave differently in the version you pin. Confirm unfamiliar calls against the docs, or Cmd+click through to the installed source.
- **Invented or unvetted packages.** A dependency name suggested by a model may not exist, or may be a malicious package registered under that name. Apply the dependencies playbook to every new import.
- **Defensive noise.** `try`/`except` around everything, redundant `None` checks, and silent fallbacks that turn failures into wrong results. Fail Fast applies.
- **Comments that narrate.** Comments restating each line, docstrings that repeat the types, and section-header comments. Ask for them to be removed.
- **Duplicates of existing code.** A new helper that reimplements something the codebase already has. Search before accepting it.
- **Inconsistency with the codebase.** Different error handling, logging, naming, typing style or async model from the surrounding code.
- **Tests bent to pass.** Weakened assertions, new `skip` or `xfail` markers, expected values copied from the output, or mocks of the code under test. Read test changes in an AI-assisted PR especially closely.
- **Unexplained removals.** Deleted guards, retries or edge-case handling with no reason given. Apply Chesterton's Fence.

An AI reviewer can be a useful first pass on any PR, catching mechanical issues before a person looks. Its findings are suggestions to weigh, and a human still owns the verdict.

