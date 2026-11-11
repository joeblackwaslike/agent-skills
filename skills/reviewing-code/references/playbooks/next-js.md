# Next.js

> Use when the diff: Adds or changes UI components, pages, styles, or standalone HTML files

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
