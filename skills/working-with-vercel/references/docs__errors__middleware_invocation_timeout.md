---
title: MIDDLEWARE_INVOCATION_TIMEOUT
product: vercel
url: /docs/errors/MIDDLEWARE_INVOCATION_TIMEOUT
canonical_url: "https://vercel.com/docs/errors/MIDDLEWARE_INVOCATION_TIMEOUT"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/functions/runtimes/edge
  - /docs/functions/streaming-functions
  - /docs/deployments/build-features
  - /docs/functions/limitations
summary: The Routing Middleware invocation timed out. This is an application error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/middleware_invocation_timeout.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b9fc3d4839dd1a73d314f700b8b4892e8ab13668d02c42be00f36ef478e86538"
---

# MIDDLEWARE_INVOCATION_TIMEOUT

The `MIDDLEWARE_INVOCATION_TIMEOUT` error occurs when an Routing Middleware takes [longer than the allowed execution time](/docs/functions/runtimes/edge#maximum-execution-duration) to complete or doesn't send a response chunk for a certain amount of time. This can be caused by long-running processes within the function or external dependencies that fail to respond in a timely manner.

If your backend API takes time to respond, we recommend [streaming the response](/docs/functions/streaming-functions) to avoid the idle timeout.

**Error Code:** `504`

**Name:** Gateway Timeout

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Routing Middleware being invoked. They can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view)
2. **Review function code:** Inspect the Routing Middleware code for any long-running operations or infinite loops that could cause a timeout
3. **Verify return value:** Ensure the function returns a response within the specified time limit of [25 seconds](/docs/functions/limitations#max-duration)
4. **Optimize external calls:** If the function makes calls to external services or APIs, ensure they are optimized and responding quickly. Consider specifying a fetch timeout for external calls using [`AbortSignal.timeout`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static).
5. **Consider streaming data**: If the function is processing large amounts of data, consider using a [streaming approach](/docs/functions/streaming-functions) to avoid timeouts
6. **Implement error handling:** Add error handling in the function to manage timeouts and other exceptions effectively


---

[View full sitemap](/docs/sitemap)
