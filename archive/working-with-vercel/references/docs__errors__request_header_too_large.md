---
title: REQUEST_HEADER_TOO_LARGE
product: vercel
url: /docs/errors/REQUEST_HEADER_TOO_LARGE
canonical_url: "https://vercel.com/docs/errors/REQUEST_HEADER_TOO_LARGE"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: Request header size exceeds the permissible limit.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/request_header_too_large.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9b68de36ee6278dbece5b40775e9f900ac99704884d6b1927a258b5e33e1f0d3"
---

# REQUEST_HEADER_TOO_LARGE

The `REQUEST_HEADER_TOO_LARGE` error occurs when the size of a request header exceeds the allowed limit. Specifically, an individual request header, including the header name, must not exceed 32 KB.

This issue often arises from excessively large headers in a request. On Vercel, applications may have custom headers, which, if overly large, can trigger this error during server request processing.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Limit header size:** Ensure that the size of each request header does not exceed 32 KB
2. **Review cookies:** A request carries all of its cookies in one `Cookie` header, so keep the combined size of your cookies within the 32 KB limit

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
