---
title: NO_FETCH_FROM_MIDDLEWARE
product: vercel
url: /docs/conformance/rules/NO_FETCH_FROM_MIDDLEWARE
canonical_url: "https://vercel.com/docs/conformance/rules/NO_FETCH_FROM_MIDDLEWARE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that any fetch call that is depended on transitively by Next.js middleware be reviewed and approved before use.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_fetch_from_middleware.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "70b76d44eaa0b4454e9c847642e1a3d80346427ed0410677cba4e813281cb5f9"
---

# NO_FETCH_FROM_MIDDLEWARE

> **🔒 Permissions Required**: Conformance

[Next.js middleware](https://nextjs.org/docs/advanced-features/middleware) runs
code at the Edge. This means that the code is globally distributed. When
middleware makes a `fetch` call, it may be to a backend that is not globally
distributed, in which case the latency of the middleware function will be
really slow. To prevent this, `fetch` calls that can be made from middleware are
flagged and reviewed to make sure that it looks like an appropriate use.

## Example

This check will fail when a `fetch` call is detected from Next.js middleware or
transitive dependencies used by the middleware file.

In this example, there are two files. An experiments file asynchronously
fetches experiments using `fetch`. The middleware file uses the experiments
library to fetch the experiments and then decide to rewrite the URL.

```ts filename="experiments.ts"
export async function getExperiments() {
  const res = await fetch('/experiments');
  return res.json();
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

## How to fix

The correct fix will depend on the specific situation. If the server that is
being called is globally distributed, then this asynchronous call may be okay.
If not, then the code should try to remove the `fetch` statement to avoid
making a request that would add latency to middleware.


---

[View full sitemap](/docs/sitemap)
