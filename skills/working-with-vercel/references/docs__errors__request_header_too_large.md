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
  - /docs/routing-middleware
summary: Request header size exceeds the permissible limit.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/request_header_too_large.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4a556d7ffa1930dfef7eda9b5a012c6b26ba6b74b29097b3fe210d56e25e085e"
---

# REQUEST_HEADER_TOO_LARGE

The `REQUEST_HEADER_TOO_LARGE` error occurs when the size of the request headers in your function and [Routing Middleware](/docs/routing-middleware) exceeds the allowed limits. Specifically, individual request headers must not exceed 16 KB, and the combined size of all headers, including the header names, must not exceed 32 KB.

This issue often arises from excessively large headers in a request. On Vercel, applications may have custom headers, which, if overly large, can trigger this error during server request processing.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Limit header size:** Ensure that the size of each request header does not exceed 16 KB
2. **Manage total header size:** Monitor and control the combined size of all headers, keeping it under 32 KB
3. **Review cookies:** Since cookies are included in the header, it's crucial to limit their size as part of the overall header size


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
