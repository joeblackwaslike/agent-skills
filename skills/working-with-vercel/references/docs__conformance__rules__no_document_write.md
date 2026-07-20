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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "f4db79a69af40cfda13eac89e8e178ea7a9c9b9ec25ca3da4ff8376af163b832"
---

# NO_DOCUMENT_WRITE

> **🔒 Permissions Required**: Conformance

Calls to `document.write()` or `document.writeln()` manipulate DOM directly without any sanitization and should be avoided.

Furthermore, these APIs can also cause performance issues and trigger will clear the page contents if used after page load.

## How to fix

Avoid usage of `document.write()` entirely in your application, and instead either use UI framework like React to handle writing to the document,
or use safer DOM APIs, such as `document.createElement()` instead.


---

[View full sitemap](/docs/sitemap)
