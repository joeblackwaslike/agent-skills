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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/middleware_invocation_timeout.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0e62ba6a56087832aa968d74073d11fc07830b78ed1218585151619a6c3d3e83"
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
