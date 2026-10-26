---
title: INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT
product: vercel
url: /docs/errors/INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT
canonical_url: "https://vercel.com/docs/errors/INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/deployments/build-features
  - /docs/functions/limitations
  - /docs/functions/streaming-functions
summary: The Edge Function invocation timed out unexpectedly.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/internal_edge_function_invocation_timeout.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e195d441ebe33cb4f6f05572695b972908012ad4f285237ebb0664002651ec18"
---

# INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT

The `INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT` error occurs when an Edge Function takes longer than the allowed execution time to complete. This can be caused by long-running processes within the function or external dependencies that fail to respond in a timely manner.

**Error Code:** `504`

**Name:** Gateway Timeout

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Edge Function being invoked. They can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view)
2. **Review function code:** Inspect the Edge Function code for any long-running operations or infinite loops that could cause a timeout
3. **Verify return value:** Ensure the function begins responding within [25 seconds](/docs/functions/limitations#max-duration)
4. **Optimize external calls:** If the function makes calls to external services or APIs, ensure they are optimized and responding quickly
5. **Consider streaming data**: If the function is processing large amounts of data, consider using a [streaming approach](/docs/functions/streaming-functions) to avoid timeouts
6. **Implement error handling:** Add error handling in the function to manage timeouts and other exceptions effectively


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
