---
title: NEXTJS_NO_DYNAMIC_AUTO
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_DYNAMIC_AUTO
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_DYNAMIC_AUTO"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent usage of force-dynamic as a dynamic page rendering strategy.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_no_dynamic_auto.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "52e86abea51e9c264ed61e879f3b4d5d88fc93731bf7a304077a56c325c42664"
---

# NEXTJS_NO_DYNAMIC_AUTO

> Conformance is available on Enterprise plans

Changing the dynamic behavior of a layout or page using "force-dynamic" is
not recommended in App Router. This is because this will force only dynamic rendering
of those pages and opt-out "fetch" request from the fetch cache. Furthermore, opting
out will also prevent future optimizations such as partially static subtrees and
hybrid server-side rendering, which can significantly improve performance.

See [Next.js Segment Config docs](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
for more information on the different migration strategies that can be used and how
they work.

## How to fix

Usage of `force-dynamic` can be avoided and instead `no-store` or `fetch` calls
can be used instead. Alternatively, usage of `cookies()` can also avoid the need
to use `force-dynamic`.

```js
// Example of how to use `no-store` on `fetch` calls.
const data = fetch(someURL, { cache: 'no-store' });
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
