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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/no_assign_window_location.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "977b10834e60215c8427acb82c5a4094f09c82caf3400548d372297d26d28011"
---

# NO_ASSIGN_WINDOW_LOCATION

> Conformance is available on Enterprise plans

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
