---
title: NEXTJS_USE_NATIVE_FETCH
product: vercel
url: /docs/conformance/rules/NEXTJS_USE_NATIVE_FETCH
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_USE_NATIVE_FETCH"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Requires using native `fetch` which Next.js provides, removing the need for third-party fetch libraries.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_use_native_fetch.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "5f098af285c9c5003928b01ee5d67e007b9e75dd2d979d7df1e2269a635dcbee"
---

# NEXTJS_USE_NATIVE_FETCH

> **🔒 Permissions Required**: Conformance

Next.js extends the native [Web `fetch` API](https://nextjs.org/docs/app/api-reference/functions/fetch)
with additional caching capabilities which means third-party fetch libraries are not needed.
Including these libraries in your app can increase bundle size and negatively impact performance.

This rule will detect any usage of the following third-party fetch libraries:

- `isomorphic-fetch`
- `whatwg-fetch`
- `node-fetch`
- `cross-fetch`
- `axios`

If there are more libraries you would like to restrict,
consider using a [custom rule](https://vercel.com/docs/conformance/custom-rules).

By default, this rule is disabled. You can enable it by
[customizing Conformance](/docs/conformance/customize).

For further reading, see:

- https://nextjs.org/docs/app/api-reference/functions/fetch
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch\_API

## Examples

This rule will catch the following code.

```tsx {1}
import fetch from 'isomorphic-fetch';

export async function getAuth() {
  const auth = await fetch('/api/auth');
  return auth.json();
}
```

## How to fix

Replace the third-party fetch library with the native `fetch` API Next.js provides.


---

[View full sitemap](/docs/sitemap)
