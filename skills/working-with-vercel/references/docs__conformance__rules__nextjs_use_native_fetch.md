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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_use_native_fetch.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "738eff12fc847110d57e5d8ea494cfd5eaeeea062a37bd1b475ce8b0fcc4aa12"
---

# NEXTJS_USE_NATIVE_FETCH

> Conformance is available on Enterprise plans

> **💡 Note:** This rule is available from version 1.1.0.

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
