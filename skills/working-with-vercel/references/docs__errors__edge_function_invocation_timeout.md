---
title: EDGE_FUNCTION_INVOCATION_TIMEOUT
product: vercel
url: /docs/errors/EDGE_FUNCTION_INVOCATION_TIMEOUT
canonical_url: "https://vercel.com/docs/errors/EDGE_FUNCTION_INVOCATION_TIMEOUT"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/functions/streaming-functions
  - /docs/fluid-compute
  - /docs/deployments/build-features
  - /docs/functions/limitations
summary: The Edge Function invocation timed out. This is an application error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/edge_function_invocation_timeout.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "14786cd95383474f3a4b588768519a063fbd4fa2fe1f7f003817943d96677eac"
---

# EDGE_FUNCTION_INVOCATION_TIMEOUT

The `EDGE_FUNCTION_INVOCATION_TIMEOUT` error occurs when an Edge Function takes longer than the allowed execution time to complete or doesn't send a response chunk for a certain amount of time. This can be caused by long-running processes within the function or external dependencies that fail to respond in a timely manner.

If your backend API takes time to respond, we recommend [streaming the response](/docs/functions/streaming-functions) to avoid the idle timeout. For longer-running workloads, consider migrating to [Fluid compute](/docs/fluid-compute) which provides significantly longer durations and optimized performance.

**Error Code:** `504`

**Name:** Gateway Timeout

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Edge Function being invoked. They can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view)
2. **Review function code:** Inspect the Edge Function code for any long-running operations or infinite loops that could cause a timeout
3. **Verify return value:** Ensure the function returns a response within the specified time limit of [25 seconds](/docs/functions/limitations#max-duration)
4. **Optimize external calls:** If the function makes calls to external services or APIs, ensure they are optimized and responding quickly
5. **Consider streaming data**: If the function is processing large amounts of data, consider using a [streaming approach](/docs/functions/streaming-functions) to avoid timeouts
6. **Implement error handling:** Add error handling in the function to manage timeouts and other exceptions effectively


---

[View full sitemap](/docs/sitemap)
