---
title: BFCACHE_INTEGRITY_REQUIRE_NOOPENER_ATTRIBUTE
product: vercel
url: /docs/conformance/rules/BFCACHE_INTEGRITY_REQUIRE_NOOPENER_ATTRIBUTE
canonical_url: "https://vercel.com/docs/conformance/rules/BFCACHE_INTEGRITY_REQUIRE_NOOPENER_ATTRIBUTE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/rules/BFCACHE_INTEGRITY_NO_UNLOAD_LISTENERS
summary: "Requires that links opened with window.open use the noopener attribute to eliminate a source of eviction from the browser's Back-Forward Cache."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/bfcache_integrity_require_noopener_attribute.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e9cb3ef5fd993be64cee71cfa36b091e1fafbbfb162f7e5c62d6e10cd10065b2"
---

# BFCACHE_INTEGRITY_REQUIRE_NOOPENER_ATTRIBUTE

> Conformance is available on Enterprise plans

The Back-Forward Cache (bfcache) is a browser feature that allows pages to be cached in memory when the user navigates
away from them. When the user navigates back to the page, it can be loaded almost instantly from the cache instead of
having to be reloaded from the network. Breaking the bfcache's integrity can cause a page to be reloaded from the network
when the user navigates back to it, which can be slow and jarring.

Pages opened with `window.open` that do not use the `noopener` attribute can both be a security risk and also will
prevent browsers from caching the page in the bfcache. This is because the new window can access the `window.opener` property
of the original window, so putting the original page into the bfcache could break the new window when attempting to access it.

Using the `noreferrer` attribute will also set the `noopener` attribute to true, so it can also be used to ensure
the page is placed into the bfcache.

To learn more about the bfcache, see the [web.dev docs](https://web.dev/bfcache).

## Related Rules

- [BFCACHE\_INTEGRITY\_NO\_UNLOAD\_LISTENERS](/docs/conformance/rules/BFCACHE_INTEGRITY_NO_UNLOAD_LISTENERS)

## Example

Examples of when this check would fail:

```ts
window.open('https://example.com', '_blank');
window.open('https://example.com');
```

## How to fix

Instead, use the `noopener` or `noreferrer` attributes:

```ts
window.open('https://example.com', '_blank', 'noopener');
window.open('https://example.com', '_top', 'noreferrer');
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
