---
title: NO_DOCUMENT_WRITE
product: vercel
url: /docs/conformance/rules/NO_DOCUMENT_WRITE
canonical_url: "https://vercel.com/docs/conformance/rules/NO_DOCUMENT_WRITE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent unsafe usage of document.write() in your application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_document_write.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "9d0babe65aa084e1efa6fa665a09d169cf52b7fbc4253d9681325c2cc3d62dec"
---

# NO_DOCUMENT_WRITE

> **Availability**: Conformance is available on Enterprise plans

Calls to `document.write()` or `document.writeln()` manipulate DOM directly without any sanitization and should be avoided.

Furthermore, these APIs can also cause performance issues and trigger will clear the page contents if used after page load.

## How to fix

Avoid usage of `document.write()` entirely in your application, and instead either use UI framework like React to handle writing to the document,
or use safer DOM APIs, such as `document.createElement()` instead.


---

[View full sitemap](/docs/sitemap)
