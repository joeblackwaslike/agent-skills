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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "b6b6d472f9da275d1257421726e5867835eee6c7b4c24093c463ec0c52ab88c7"
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
