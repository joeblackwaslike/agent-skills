---
title: FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE
product: vercel
url: /docs/errors/FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE
canonical_url: "https://vercel.com/docs/errors/FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/functions/runtimes
summary: The function returned a response that is too large. This is a function error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/function_response_payload_too_large.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b1ed27181a960e936ae15710ef17d4cf85d26bdc3f14f05a0e27f4b1d74c149e"
---

# FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE

The `FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE` error occurs when the function returned a response that exceeds the maximum allowed size of 4.5 MB.

**Error Code:** `500`

**Name:** Response Payload Too Large

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review response payload size:** Check the size of the response payload being returned by the function to ensure it's within the allowed limits, and does not exceed the [limit of 4.5 MB](/docs/functions/runtimes#size-limits)
2. **Reduce response payload size:** If possible, reduce the size of the response payload being returned by the function


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
