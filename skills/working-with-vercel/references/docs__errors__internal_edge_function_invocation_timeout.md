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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "dd92a2840f3d045720877a36b0ac44833a234e73446488d4dad468dff11fbd25"
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
