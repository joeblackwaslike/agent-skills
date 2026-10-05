---
title: NO_DANGEROUS_HTML
product: vercel
url: /docs/conformance/rules/NO_DANGEROUS_HTML
canonical_url: "https://vercel.com/docs/conformance/rules/NO_DANGEROUS_HTML"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent the unsafe creation of DOM via HTML methods in your application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_dangerous_html.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "119a1d18511945937074d78d9ced6a5f24a620d46eedcb6a60a15458f88349e9"
---

# NO_DANGEROUS_HTML

> **Availability**: Conformance is available on Enterprise plans

Unsafe creation of DOM can be done a variety of ways:

- `element.innerHTML`
- `element.outerHTML`
- `DOMParser.parseFromString()`
- `element.insertAdjacentHTML()`
- `srcdoc` on iframe elements
- `dangerouslySetInnerHTML` prop in React apps

Usage of these methods is deemed an unsafe coding practice as the HTML might result in security vulnerabilities.

## How to fix

It is recommended to instead use alternative approaches for HTML construction - such as `document.createElement()` or a HTML sanitizer.


---

[View full sitemap](/docs/sitemap)
