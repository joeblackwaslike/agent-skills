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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "1870b5b5069aea99943abe20e0eb34f70b5174770522f6aaf2edcedcec999750"
---

# NO_DANGEROUS_HTML

> Conformance is available on Enterprise plans

Unsafe creation of DOM can be done a variety of ways:

- `element.innerHTML`
- `element.outerHTML`
- `DOMParser.parseFromString()`
- `element.insertAdjacentHTML()`
- `srcdoc` on iframe elements
- `dangerouslySetInnerHTML` prop in React apps

Usage of these methods is deemed an unsafe coding practice as the HTML might result in security vulnerabilities.

## How to fix

It is recommended to instead use alternative approaches for HTML construction - such as `document.createElement()` or an HTML sanitizer.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
