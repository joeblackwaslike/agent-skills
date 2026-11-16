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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/no_dangerous_html.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e3a939787f8e4764ac28c63c00acaf13e4ed9917e99498f3fc862c502634ba6f"
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
