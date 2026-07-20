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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "97d34025df4204c8644b90a035290d229d538f1a1585f63f957a67560389794e"
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
