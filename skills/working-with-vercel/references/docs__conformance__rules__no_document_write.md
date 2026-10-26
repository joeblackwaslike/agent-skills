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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "12a5fa47d9da2d2eac0fb9ebb6e0357040b3f7536b09952125597ddf587a33c5"
---

# NO_DOCUMENT_WRITE

> Conformance is available on Enterprise plans

Calls to `document.write()` or `document.writeln()` manipulate DOM directly without any sanitization and should be avoided.

Furthermore, these APIs can also cause performance issues and trigger will clear the page contents if used after page load.

## How to fix

Avoid usage of `document.write()` entirely in your application, and instead either use UI framework like React to handle writing to the document,
or use safer DOM APIs, such as `document.createElement()` instead.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
