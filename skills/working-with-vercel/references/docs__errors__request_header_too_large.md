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
source: "https://vercel.com/docs/errors/request_header_too_large.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "31fa38864cb563cd6dfbe220fba63431aa6b2b6fae6e229e25e6b2f77511da22"
---

# REQUEST_HEADER_TOO_LARGE

The `REQUEST_HEADER_TOO_LARGE` error occurs when the size of a request header exceeds the allowed limit. Specifically, an individual request header, including the header name, must not exceed 32 KB.

This issue often arises from excessively large headers in a request. On Vercel, applications may have custom headers, which, if overly large, can trigger this error during server request processing.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Limit header size:** Ensure that the size of each request header does not exceed 32 KB
2. **Review cookies:** A request carries all of its cookies in one `Cookie` header, so keep the combined size of your cookies within the 32 KB limit


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
