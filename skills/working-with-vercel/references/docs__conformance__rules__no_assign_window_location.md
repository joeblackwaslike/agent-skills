---
title: NO_ASSIGN_WINDOW_LOCATION
product: vercel
url: /docs/conformance/rules/NO_ASSIGN_WINDOW_LOCATION
canonical_url: "https://vercel.com/docs/conformance/rules/NO_ASSIGN_WINDOW_LOCATION"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent unsafe assignment to window.location.href in your application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_assign_window_location.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "aafc2ea9686dfe3feb3c94f8081da423a35ddf2a98c3c9ccbc7e4e4a5d2cee1d"
---

# NO_ASSIGN_WINDOW_LOCATION

> **Availability**: Conformance is available on Enterprise plans

Direct assignments to "window.location.href" or "window.location" should be avoided due to possible XSS attacks that can occur from lack
of sanitization of input to the "href".

## How to fix

The recommended approach for Next.js applications is to use a custom `redirectTo` function. This provides a clear way to use `router.push()`
or `window.location.href` to provide an experience that is best for the user (client-side navigation only, or a full page refresh).
Here's an example of how you might do this using Next.js:

Before:

```js filename="my-site.js"
windows.location.href = '/login';
```

After:

```js filename="my-site.js"
router.push('/login');
```


---

[View full sitemap](/docs/sitemap)
