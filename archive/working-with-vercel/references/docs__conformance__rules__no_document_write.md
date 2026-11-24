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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/no_document_write.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "cf700aa3087b628a87911fb5fab1275bfea6963d6b3ab1ac7f79fe33e0162c7d"
---

# NO_DOCUMENT_WRITE

> Conformance is available on Enterprise plans

Calls to `document.write()` or `document.writeln()` manipulate DOM directly without any sanitization and should be avoided.

Furthermore, these APIs can also cause performance issues and trigger will clear the page contents if used after page load.

## How to fix

Avoid usage of `document.write()` entirely in your application, and instead either use UI framework like React to handle writing to the document,
or use safer DOM APIs, such as `document.createElement()` instead.

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
