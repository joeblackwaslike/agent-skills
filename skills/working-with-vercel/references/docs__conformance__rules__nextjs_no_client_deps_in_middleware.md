---
title: NEXTJS_NO_CLIENT_DEPS_IN_MIDDLEWARE
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_CLIENT_DEPS_IN_MIDDLEWARE
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_CLIENT_DEPS_IN_MIDDLEWARE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Disallows dependency on client libraries inside of middleware to improve performance of middleware.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_no_client_deps_in_middleware.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "7e462d7666ca5aae0aa760b8b13936da88ab4353d63790debcecc1074f6393a5"
---

# NEXTJS_NO_CLIENT_DEPS_IN_MIDDLEWARE

> **Availability**: Conformance is available on Enterprise plans

This check disallows dependencies on client libraries, such as `react` and
`next/router` in Next.js middleware. Since middleware runs on the server and
runs on every request, this code is not able to run any client side code and it
should have a small bundle size to improve loading and execution times.

## Example

An example of when this check could manifest is when middleware transitively
depends on a file that also uses `react` within the same file.

For example:

```ts filename="experiments.ts"
import { createContext, type Context } from 'react';

export function createExperimentContext(): Context<ExperimentContext> {
  return createContext<ExperimentContext>({
    experiments: () => {
      return EXPERIMENT_DEFAULTS;
    },
  });
}

export async function getExperiments() {
  return activeExperiments;
}
```

```ts filename="middleware.ts"
export async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
): Promise<Response> {
  const experiments = await getExperiments();

  if (experiments.includes('new-marketing-page)) {
    return NextResponse.rewrite(MARKETING_PAGE_URL);
  }
  return NextResponse.next();
}
```

In this example, the `experiments.ts` file both fetches the active experiments
as well as provides helper functions to use experiments on the client in React.

## How to fix

Client dependencies used or transitively depended on by middleware files should
be refactored to avoid depending on the client libraries. In the example above,
the code that is used by middleware to fetch experiments should be moved to a
separate file from the code that provides the React functionality.


---

[View full sitemap](/docs/sitemap)
